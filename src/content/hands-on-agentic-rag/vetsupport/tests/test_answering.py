from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from vetsupport.answering import answer_question
from vetsupport.chunking import chunk_pet_documents
from vetsupport.embeddings import FakeEmbedder
from vetsupport.indexing import index_pet_chunks
from vetsupport.llm import AnswerDraft, FakeLLM
from vetsupport.models import Base
from vetsupport.safety import SafetyLevel
from vetsupport.seed import seed_basic_clinic

LUNA_ID = "30000000-0000-0000-0000-000000000001"
BENTO_ID = "30000000-0000-0000-0000-000000000002"
VACCINATION_DOC_ID = "40000000-0000-0000-0000-000000000001"


def seeded_session() -> Session:
	engine = create_engine("sqlite:///:memory:")
	Base.metadata.create_all(engine)
	session = Session(engine)
	seed_basic_clinic(session)
	session.commit()
	return session


def indexed_session() -> Session:
	session = seeded_session()
	chunk_pet_documents(session, pet_id=LUNA_ID)
	index_pet_chunks(session, pet_id=LUNA_ID, embedder=FakeEmbedder())
	session.commit()
	return session


def test_answer_question_returns_citations() -> None:
	session = indexed_session()

	answer = answer_question(
		session,
		pet_id=LUNA_ID,
		query="vaccination history",
		embedder=FakeEmbedder(),
		llm=FakeLLM(),
	)

	assert answer.used_evidence is True
	assert answer.safety_level is SafetyLevel.ok
	assert answer.citations
	assert any(citation.document_id == VACCINATION_DOC_ID for citation in answer.citations)
	assert all(f"[{citation.marker}]" in answer.summary for citation in answer.citations)


def test_answer_question_without_evidence_is_safe() -> None:
	session = seeded_session()  # no chunks indexed

	answer = answer_question(
		session,
		pet_id=LUNA_ID,
		query="vaccination history",
		embedder=FakeEmbedder(),
		llm=FakeLLM(),
	)

	assert answer.used_evidence is False
	assert answer.citations == []
	assert "No indexed documents" in answer.summary


def test_answer_question_flags_emergency() -> None:
	session = indexed_session()

	answer = answer_question(
		session,
		pet_id=LUNA_ID,
		query="my cat is not breathing, what should I do?",
		embedder=FakeEmbedder(),
		llm=FakeLLM(),
	)

	assert answer.safety_level is SafetyLevel.emergency
	assert answer.escalate is True


def test_verification_drops_unknown_citation_markers() -> None:
	session = indexed_session()

	class CitesMissingMarker:
		model = "test"

		def draft_answer(self, query, evidence, safety):  # noqa: ANN001, ARG002
			return AnswerDraft(summary="Unrelated claim [9].", questions_for_vet=[])

	answer = answer_question(
		session,
		pet_id=LUNA_ID,
		query="vaccination history",
		embedder=FakeEmbedder(),
		llm=CitesMissingMarker(),
	)

	assert answer.citations == []
