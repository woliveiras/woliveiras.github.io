from __future__ import annotations

import json
import uuid
from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.orm import Session

from vetsupport.models import Document, DocumentChunk, Pet


@dataclass(frozen=True)
class ChunkSummary:
	pet_id: str
	documents: int
	inserted: int
	skipped: int


def chunk_pet_documents(session: Session, pet_id: str, max_chars: int = 800) -> ChunkSummary:
	pet = session.scalar(select(Pet).where(Pet.id == pet_id))
	if pet is None:
		raise ValueError(f"Pet not found: {pet_id}")
	if max_chars < 40:
		raise ValueError("max_chars must be at least 40")

	documents = list(
		session.scalars(select(Document).where(Document.pet_id == pet_id).order_by(Document.title))
	)

	inserted = 0
	skipped = 0
	for document in documents:
		for chunk_index, text in enumerate(split_text(document.body, max_chars=max_chars)):
			chunk_id = stable_chunk_id(document.id, chunk_index)
			existing = session.scalar(select(DocumentChunk).where(DocumentChunk.id == chunk_id))
			if existing is not None:
				skipped += 1
				continue

			metadata = {
				"document_title": document.title,
				"document_type": document.document_type,
				"chunk_strategy": "paragraphs-with-size-limit",
				"max_chars": max_chars,
			}
			session.add(
				DocumentChunk(
					id=chunk_id,
					document_id=document.id,
					pet_id=document.pet_id,
					chunk_index=chunk_index,
					text=text,
					source=document.source,
					document_date=document.document_date,
					metadata_json=json.dumps(metadata, sort_keys=True),
				)
			)
			inserted += 1

	session.flush()
	return ChunkSummary(
		pet_id=pet_id,
		documents=len(documents),
		inserted=inserted,
		skipped=skipped,
	)


def split_text(text: str, max_chars: int) -> list[str]:
	paragraphs = [paragraph.strip() for paragraph in text.split("\n\n") if paragraph.strip()]
	chunks: list[str] = []
	current = ""

	for paragraph in paragraphs:
		if not current:
			current = paragraph
			continue
		candidate = f"{current}\n\n{paragraph}"
		if len(candidate) <= max_chars:
			current = candidate
		else:
			chunks.extend(split_long_text(current, max_chars=max_chars))
			current = paragraph

	if current:
		chunks.extend(split_long_text(current, max_chars=max_chars))

	return chunks


def split_long_text(text: str, max_chars: int) -> list[str]:
	if len(text) <= max_chars:
		return [text]

	words = text.split()
	chunks: list[str] = []
	current_words: list[str] = []
	for word in words:
		candidate = " ".join([*current_words, word])
		if len(candidate) <= max_chars or not current_words:
			current_words.append(word)
			continue
		chunks.append(" ".join(current_words))
		current_words = [word]

	if current_words:
		chunks.append(" ".join(current_words))

	return chunks


def stable_chunk_id(document_id: str, chunk_index: int) -> str:
	return str(uuid.uuid5(uuid.NAMESPACE_URL, f"{document_id}:{chunk_index}"))
