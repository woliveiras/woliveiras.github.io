from __future__ import annotations

from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.orm import Session

from vetsupport.embeddings import Embedder
from vetsupport.models import ChunkEmbedding, DocumentChunk, Pet


@dataclass(frozen=True)
class IndexSummary:
	pet_id: str
	chunks: int
	inserted: int
	skipped: int


def index_pet_chunks(session: Session, pet_id: str, embedder: Embedder) -> IndexSummary:
	"""Embed one pet's chunks that are not indexed yet.

	The command is idempotent: chunks that already have an embedding are
	skipped, so re-running it inserts nothing new.
	"""
	pet = session.scalar(select(Pet).where(Pet.id == pet_id))
	if pet is None:
		raise ValueError(f"Pet not found: {pet_id}")

	chunks = list(
		session.scalars(
			select(DocumentChunk)
			.where(DocumentChunk.pet_id == pet_id)
			.order_by(DocumentChunk.document_id, DocumentChunk.chunk_index)
		)
	)

	pending: list[DocumentChunk] = []
	skipped = 0
	for chunk in chunks:
		existing = session.scalar(
			select(ChunkEmbedding).where(ChunkEmbedding.chunk_id == chunk.id)
		)
		if existing is not None:
			skipped += 1
			continue
		pending.append(chunk)

	if pending:
		vectors = embedder.embed_documents([chunk.text for chunk in pending])
		for chunk, vector in zip(pending, vectors, strict=True):
			session.add(
				ChunkEmbedding(
					chunk_id=chunk.id,
					pet_id=chunk.pet_id,
					model=embedder.model,
					dimensions=embedder.dimensions,
					embedding=vector,
				)
			)

	session.flush()
	return IndexSummary(
		pet_id=pet_id,
		chunks=len(chunks),
		inserted=len(pending),
		skipped=skipped,
	)
