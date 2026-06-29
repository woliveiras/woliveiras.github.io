from pathlib import Path

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from vetsupport.ingest import ingest_documents
from vetsupport.models import Base, Document
from vetsupport.queries import get_pet_details, get_pet_timeline
from vetsupport.seed import seed_basic_clinic

LUNA_ID = "30000000-0000-0000-0000-000000000001"


def seeded_session() -> Session:
	engine = create_engine("sqlite:///:memory:")
	Base.metadata.create_all(engine)
	session = Session(engine)
	seed_basic_clinic(session)
	session.commit()
	return session


def write_document(path: Path) -> None:
	path.write_text(
		"""---
title: Luna Dental Follow-up
document_type: consultation_note
source: clinic_note
document_date: 2026-02-14
---

Luna returned for a dental follow-up. No diagnosis is made by the harness.
""",
		encoding="utf-8",
	)


def test_ingest_documents_from_frontmatter(tmp_path: Path) -> None:
	session = seeded_session()
	write_document(tmp_path / "luna-dental-follow-up.md")

	summary = ingest_documents(session, pet_id=LUNA_ID, path=tmp_path)
	session.commit()

	assert summary.inserted == 1
	assert summary.skipped == 0
	assert summary.pet_id == LUNA_ID

	document = session.query(Document).filter_by(title="Luna Dental Follow-up").one()
	assert document.document_type == "consultation_note"
	assert document.source == "clinic_note"
	assert document.document_date is not None
	expected_body = "Luna returned for a dental follow-up. No diagnosis is made by the harness."
	assert document.body == expected_body

	luna = get_pet_details(session, LUNA_ID)
	timeline = get_pet_timeline(session, LUNA_ID)
	assert luna is not None
	assert luna.document_count == 3
	assert any(item.title == "Luna Dental Follow-up" for item in timeline)


def test_ingest_rejects_unknown_pet(tmp_path: Path) -> None:
	session = seeded_session()
	write_document(tmp_path / "unknown.md")

	with pytest.raises(ValueError, match="Pet not found"):
		ingest_documents(session, pet_id="missing", path=tmp_path)


def test_ingest_rejects_empty_directory(tmp_path: Path) -> None:
	session = seeded_session()

	with pytest.raises(ValueError, match="No supported documents"):
		ingest_documents(session, pet_id=LUNA_ID, path=tmp_path)
