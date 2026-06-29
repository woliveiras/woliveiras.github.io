from pathlib import Path

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from vetsupport.chunking import chunk_pet_documents
from vetsupport.ingest import ingest_documents
from vetsupport.models import Base, DocumentChunk
from vetsupport.queries import get_document_details
from vetsupport.seed import seed_basic_clinic

LUNA_ID = "30000000-0000-0000-0000-000000000001"
DOCUMENT_ID = "40000000-0000-0000-0000-000000000001"


def seeded_session() -> Session:
	engine = create_engine("sqlite:///:memory:")
	Base.metadata.create_all(engine)
	session = Session(engine)
	seed_basic_clinic(session)
	session.commit()
	return session


def write_long_document(path: Path) -> None:
	path.write_text(
		"""---
title: Luna Longer Follow-up
document_type: consultation_note
source: clinic_note
document_date: 2026-03-01
---

First paragraph about Luna's follow-up visit and tutor observations.

Second paragraph adds timeline details that should become another chunk.

Third paragraph keeps the example deterministic without making clinical claims.
""",
		encoding="utf-8",
	)


def test_chunk_pet_documents_is_idempotent_and_preserves_metadata(tmp_path: Path) -> None:
	session = seeded_session()
	write_long_document(tmp_path / "luna-longer-follow-up.md")
	ingest_documents(session, pet_id=LUNA_ID, path=tmp_path)
	session.commit()

	first_summary = chunk_pet_documents(session, pet_id=LUNA_ID, max_chars=90)
	session.commit()
	second_summary = chunk_pet_documents(session, pet_id=LUNA_ID, max_chars=90)
	session.commit()

	assert first_summary.documents == 3
	assert first_summary.inserted > 3
	assert first_summary.skipped == 0
	assert second_summary.inserted == 0
	assert second_summary.skipped == first_summary.inserted

	chunk = session.query(DocumentChunk).filter_by(pet_id=LUNA_ID).first()
	assert chunk is not None
	assert chunk.document_id is not None
	assert chunk.source is not None
	assert chunk.document_date is not None
	assert chunk.text


def test_get_document_details_includes_chunks() -> None:
	session = seeded_session()
	summary = chunk_pet_documents(session, pet_id=LUNA_ID, max_chars=120)
	session.commit()

	details = get_document_details(session, DOCUMENT_ID)

	assert summary.inserted > 0
	assert details is not None
	assert details.title == "Luna vaccination card"
	assert details.pet_name == "Luna"
	assert len(details.chunks) == 1
	assert details.chunks[0].chunk_index == 0
	assert "Rabies vaccine" in details.chunks[0].text


def test_chunk_pet_documents_rejects_unknown_pet() -> None:
	session = seeded_session()

	with pytest.raises(ValueError, match="Pet not found"):
		chunk_pet_documents(session, pet_id="missing")

