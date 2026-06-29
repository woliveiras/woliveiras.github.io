from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import date

from pgvector.sqlalchemy import Vector
from sqlalchemy import Float, bindparam, func, select
from sqlalchemy.orm import Session

from vetsupport.config import EMBEDDING_DIMENSIONS
from vetsupport.embeddings import Embedder
from vetsupport.models import ChunkEmbedding, Document, DocumentChunk, Pet

SEARCH_MODES = ("vector", "lexical", "hybrid")
_RRF_K = 60
_TOKEN_RE = re.compile(r"[a-z0-9]+")


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
	mode: str = "hybrid",
) -> list[SearchResult]:
	"""Return the most relevant indexed chunks for one pet.

	Results are evidence, not clinical answers. ``mode`` selects the strategy:

	- ``vector``: semantic similarity over embeddings (pgvector on PostgreSQL).
	- ``lexical``: keyword search (PostgreSQL full-text search).
	- ``hybrid``: Reciprocal Rank Fusion of the vector and lexical rankings.

	Each backend other than PostgreSQL uses an in-Python fallback. The ``score``
	field carries each mode's native score (cosine similarity, lexical rank, or
	fused RRF score), so scores are only comparable within the same mode.
	"""
	pet = session.scalar(select(Pet).where(Pet.id == pet_id))
	if pet is None:
		raise ValueError(f"Pet not found: {pet_id}")
	if not query.strip():
		raise ValueError("Query must not be empty")
	if limit < 1:
		raise ValueError("limit must be at least 1")

	mode = mode.lower()
	if mode not in SEARCH_MODES:
		raise ValueError(f"Unknown search mode: {mode}. Use one of {', '.join(SEARCH_MODES)}.")

	if mode == "vector":
		return _vector_candidates(session, pet_id, embedder.embed_query(query), limit)
	if mode == "lexical":
		return _lexical_candidates(session, pet_id, query, limit)
	return _hybrid_search(session, pet_id, query, embedder, limit)


def _hybrid_search(
	session: Session,
	pet_id: str,
	query: str,
	embedder: Embedder,
	limit: int,
) -> list[SearchResult]:
	pool = max(limit * 4, 20)
	vector_results = _vector_candidates(session, pet_id, embedder.embed_query(query), pool)
	lexical_results = _lexical_candidates(session, pet_id, query, pool)

	fused: dict[str, float] = {}
	by_chunk: dict[str, SearchResult] = {}
	for ranked in (vector_results, lexical_results):
		for rank, result in enumerate(ranked):
			fused[result.chunk_id] = fused.get(result.chunk_id, 0.0) + 1.0 / (_RRF_K + rank)
			by_chunk.setdefault(result.chunk_id, result)

	ordered = sorted(
		fused.items(),
		key=lambda item: (-item[1], by_chunk[item[0]].document_id, by_chunk[item[0]].chunk_index),
	)
	return [_with_score(by_chunk[chunk_id], score) for chunk_id, score in ordered[:limit]]


def _vector_candidates(
	session: Session,
	pet_id: str,
	query_vector: list[float],
	limit: int,
) -> list[SearchResult]:
	if session.get_bind().dialect.name == "postgresql":
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
	return [_build_result(chunk, document, score) for score, chunk, document in scored[:limit]]


def _lexical_candidates(
	session: Session,
	pet_id: str,
	query: str,
	limit: int,
) -> list[SearchResult]:
	if session.get_bind().dialect.name == "postgresql":
		tsvector = func.to_tsvector("english", DocumentChunk.text)
		tsquery = func.plainto_tsquery("english", query)
		rank = func.ts_rank(tsvector, tsquery)
		statement = (
			select(DocumentChunk, Document, rank.label("rank"))
			.join(Document, Document.id == DocumentChunk.document_id)
			.where(DocumentChunk.pet_id == pet_id)
			.where(tsvector.op("@@")(tsquery))
			.order_by(rank.desc())
			.limit(limit)
		)
		return [
			_build_result(chunk, document, float(rank_value))
			for chunk, document, rank_value in session.execute(statement).all()
		]

	query_tokens = set(_TOKEN_RE.findall(query.lower()))
	if not query_tokens:
		return []
	rows = session.execute(
		select(DocumentChunk, Document)
		.join(Document, Document.id == DocumentChunk.document_id)
		.where(DocumentChunk.pet_id == pet_id)
	).all()
	scored: list[tuple[float, DocumentChunk, Document]] = []
	for chunk, document in rows:
		text_tokens = _TOKEN_RE.findall(chunk.text.lower())
		if not text_tokens:
			continue
		matches = sum(1 for token in text_tokens if token in query_tokens)
		if matches == 0:
			continue
		score = matches / len(text_tokens)
		scored.append((score, chunk, document))
	scored.sort(key=lambda item: (-item[0], item[1].document_id, item[1].chunk_index))
	return [_build_result(chunk, document, score) for score, chunk, document in scored[:limit]]


def _with_score(result: SearchResult, score: float) -> SearchResult:
	return SearchResult(
		document_id=result.document_id,
		document_title=result.document_title,
		chunk_id=result.chunk_id,
		chunk_index=result.chunk_index,
		source=result.source,
		document_date=result.document_date,
		score=score,
		text=result.text,
	)


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
