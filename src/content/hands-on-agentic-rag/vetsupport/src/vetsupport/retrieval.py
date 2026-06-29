from __future__ import annotations

from dataclasses import dataclass
from datetime import date

from pgvector.sqlalchemy import Vector
from sqlalchemy import Float, bindparam, select
from sqlalchemy.orm import Session

from vetsupport.config import EMBEDDING_DIMENSIONS
from vetsupport.embeddings import Embedder
from vetsupport.models import ChunkEmbedding, Document, DocumentChunk, Pet


@dataclass(frozen=True)
class SearchResult:
	document_id: str
	document_title: str
	chunk_id: str
	chunk_index: int
	source: str
	document_date: date | None
	score: float
	text: str


def search_chunks(
	session: Session,
	pet_id: str,
	query: str,
	embedder: Embedder,
	limit: int = 5,
) -> list[SearchResult]:
	"""Return the most similar indexed chunks for one pet.

	Results are evidence, not clinical answers. On PostgreSQL the ranking uses
	the pgvector ``<=>`` cosine-distance operator. On other backends it falls
	back to an in-Python cosine similarity over the stored vectors.
	"""
	pet = session.scalar(select(Pet).where(Pet.id == pet_id))
	if pet is None:
		raise ValueError(f"Pet not found: {pet_id}")
	if not query.strip():
		raise ValueError("Query must not be empty")
	if limit < 1:
		raise ValueError("limit must be at least 1")

	query_vector = embedder.embed_query(query)
	dialect = session.get_bind().dialect.name
	if dialect == "postgresql":
		return _search_postgres(session, pet_id, query_vector, limit)
	return _search_python(session, pet_id, query_vector, limit)


def _search_postgres(
	session: Session,
	pet_id: str,
	query_vector: list[float],
	limit: int,
) -> list[SearchResult]:
	query_param = bindparam(
		"query_vector",
		value=query_vector,
		type_=Vector(EMBEDDING_DIMENSIONS),
	)
	distance = ChunkEmbedding.embedding.op("<=>", return_type=Float)(query_param)
	statement = (
		select(DocumentChunk, Document, distance.label("distance"))
		.join(ChunkEmbedding, ChunkEmbedding.chunk_id == DocumentChunk.id)
		.join(Document, Document.id == DocumentChunk.document_id)
		.where(DocumentChunk.pet_id == pet_id)
		.order_by(distance)
		.limit(limit)
	)
	return [
		_build_result(chunk, document, 1.0 - float(distance_value))
		for chunk, document, distance_value in session.execute(statement).all()
	]


def _search_python(
	session: Session,
	pet_id: str,
	query_vector: list[float],
	limit: int,
) -> list[SearchResult]:
	rows = session.execute(
		select(DocumentChunk, Document, ChunkEmbedding)
		.join(ChunkEmbedding, ChunkEmbedding.chunk_id == DocumentChunk.id)
		.join(Document, Document.id == DocumentChunk.document_id)
		.where(DocumentChunk.pet_id == pet_id)
	).all()

	scored = [
		(_cosine_similarity(query_vector, embedding.embedding), chunk, document)
		for chunk, document, embedding in rows
	]
	scored.sort(key=lambda item: (-item[0], item[1].document_id, item[1].chunk_index))
	return [
		_build_result(chunk, document, score)
		for score, chunk, document in scored[:limit]
	]


def _build_result(chunk: DocumentChunk, document: Document, score: float) -> SearchResult:
	return SearchResult(
		document_id=document.id,
		document_title=document.title,
		chunk_id=chunk.id,
		chunk_index=chunk.chunk_index,
		source=chunk.source,
		document_date=chunk.document_date,
		score=score,
		text=chunk.text,
	)


def _cosine_similarity(left: list[float], right: list[float]) -> float:
	dot = sum(a * b for a, b in zip(left, right, strict=True))
	left_norm = sum(a * a for a in left) ** 0.5
	right_norm = sum(b * b for b in right) ** 0.5
	if left_norm == 0.0 or right_norm == 0.0:
		return 0.0
	return dot / (left_norm * right_norm)
