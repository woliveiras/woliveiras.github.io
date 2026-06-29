import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from vetsupport.briefing import build_pre_consultation, render_briefing_markdown
from vetsupport.chunking import chunk_pet_documents
from vetsupport.embeddings import FakeEmbedder
from vetsupport.indexing import index_pet_chunks
from vetsupport.llm import FakeLLM
from vetsupport.models import Base
from vetsupport.safety import SafetyLevel
from vetsupport.seed import seed_basic_clinic

LUNA_ID = "30000000-0000-0000-0000-000000000001"


def indexed_session() -> Session:
	engine = create_engine("sqlite:///:memory:")
	Base.metadata.create_all(engine)
	session = Session(engine)
	seed_basic_clinic(session)
	chunk_pet_documents(session, pet_id=LUNA_ID)
	index_pet_chunks(session, pet_id=LUNA_ID, embedder=FakeEmbedder())
	session.commit()
	return session


def test_build_pre_consultation_assembles_sections() -> None:
	session = indexed_session()

	briefing = build_pre_consultation(
		session,
		pet_id=LUNA_ID,
		reason="vaccination history review",
		embedder=FakeEmbedder(),
		llm=FakeLLM(),
	)

	assert briefing.pet_name == "Luna"
	assert briefing.timeline
	assert briefing.documents_used
	assert briefing.points_to_confirm
	assert briefing.warning_signs
	assert briefing.safety_level is SafetyLevel.ok


def test_build_pre_consultation_flags_emergency_reason() -> None:
	session = indexed_session()

	briefing = build_pre_consultation(
		session,
		pet_id=LUNA_ID,
		reason="Luna is not breathing well",
		embedder=FakeEmbedder(),
		llm=FakeLLM(),
	)

	assert briefing.escalate is True
	assert any("urgent" in sign.lower() for sign in briefing.warning_signs)


def test_render_briefing_markdown_has_all_sections() -> None:
	session = indexed_session()
	briefing = build_pre_consultation(
		session,
		pet_id=LUNA_ID,
		reason="vaccination history review",
		embedder=FakeEmbedder(),
		llm=FakeLLM(),
	)

	markdown = render_briefing_markdown(briefing)

	for heading in (
		"## 1. Main reason",
		"## 2. Timeline",
		"## 3. Relevant history",
		"## 4. Documents used",
		"## 5. Suggested questions",
		"## 6. Points to confirm",
		"## 7. Warning signs",
	):
		assert heading in markdown


def test_build_pre_consultation_rejects_unknown_pet() -> None:
	session = indexed_session()

	with pytest.raises(ValueError, match="Pet not found"):
		build_pre_consultation(
			session,
			pet_id="missing",
			reason="check up",
			embedder=FakeEmbedder(),
			llm=FakeLLM(),
		)
