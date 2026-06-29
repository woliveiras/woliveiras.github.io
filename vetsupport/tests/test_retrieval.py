import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from vetsupport.chunking import chunk_pet_documents
from vetsupport.embeddings import FakeEmbedder
from vetsupport.indexing import index_pet_chunks
from vetsupport.models import Base, ChunkEmbedding
from vetsupport.retrieval import search_chunks
from vetsupport.seed import seed_basic_clinic

LUNA_ID = "30000000-0000-0000-0000-000000000001"
VACCINATION_DOC_ID = "40000000-0000-0000-0000-000000000001"


def seeded_session() -> Session:
	engine = create_engine("sqlite:///:memory:")
	Base.metadata.create_all(engine)
	session = Session(engine)
	seed_basic_clinic(session)
	session.commit()
	return session


def test_index_pet_chunks_is_idempotent() -> None:
	session = seeded_session()
	chunk_pet_documents(session, pet_id=LUNA_ID)
	session.commit()
	embedder = FakeEmbedder()

	first = index_pet_chunks(session, pet_id=LUNA_ID, embedder=embedder)
	session.commit()
	second = index_pet_chunks(session, pet_id=LUNA_ID, embedder=embedder)
	session.commit()

	assert first.inserted > 0
	assert first.skipped == 0
	assert second.inserted == 0
	assert second.skipped == first.inserted
	assert session.query(ChunkEmbedding).count() == first.inserted

	embedding = session.query(ChunkEmbedding).first()
	assert embedding is not None
	assert embedding.model == embedder.model
	assert embedding.dimensions == embedder.dimensions
	assert len(embedding.embedding) == embedder.dimensions


def test_index_pet_chunks_rejects_unknown_pet() -> None:
	session = seeded_session()

	with pytest.raises(ValueError, match="Pet not found"):
		index_pet_chunks(session, pet_id="missing", embedder=FakeEmbedder())


def test_search_returns_relevant_chunk() -> None:
	session = seeded_session()
	chunk_pet_documents(session, pet_id=LUNA_ID)
	session.commit()
	embedder = FakeEmbedder()
	index_pet_chunks(session, pet_id=LUNA_ID, embedder=embedder)
	session.commit()

	results = search_chunks(
		session,
		pet_id=LUNA_ID,
		query="vaccination history",
		embedder=embedder,
		limit=3,
	)

	assert results
	top = results[0]
	assert top.document_id == VACCINATION_DOC_ID
	assert "Rabies vaccine" in top.text
	assert -1.0 <= top.score <= 1.0


def test_lexical_search_matches_keyword() -> None:
	session = seeded_session()
	chunk_pet_documents(session, pet_id=LUNA_ID)
	session.commit()
	embedder = FakeEmbedder()
	index_pet_chunks(session, pet_id=LUNA_ID, embedder=embedder)
	session.commit()

	results = search_chunks(
		session,
		pet_id=LUNA_ID,
		query="rabies",
		embedder=embedder,
		mode="lexical",
		limit=5,
	)

	assert results
	assert results[0].document_id == VACCINATION_DOC_ID
	assert all("rabies" in result.text.lower() for result in results)


def test_hybrid_search_ranks_vaccination_first() -> None:
	session = seeded_session()
	chunk_pet_documents(session, pet_id=LUNA_ID)
	session.commit()
	embedder = FakeEmbedder()
	index_pet_chunks(session, pet_id=LUNA_ID, embedder=embedder)
	session.commit()

	results = search_chunks(
		session,
		pet_id=LUNA_ID,
		query="vaccination history",
		embedder=embedder,
		mode="hybrid",
		limit=3,
	)

	assert results
	assert results[0].document_id == VACCINATION_DOC_ID


def test_search_rejects_unknown_mode() -> None:
	session = seeded_session()

	with pytest.raises(ValueError, match="Unknown search mode"):
		search_chunks(
			session,
			pet_id=LUNA_ID,
			query="vaccination",
			embedder=FakeEmbedder(),
			mode="graph",
		)


def test_search_rejects_unknown_pet() -> None:
	session = seeded_session()

	with pytest.raises(ValueError, match="Pet not found"):
		search_chunks(session, pet_id="missing", query="anything", embedder=FakeEmbedder())


def test_search_rejects_empty_query() -> None:
	session = seeded_session()

	with pytest.raises(ValueError, match="Query must not be empty"):
		search_chunks(session, pet_id=LUNA_ID, query="   ", embedder=FakeEmbedder())
