from __future__ import annotations

from dataclasses import dataclass
from datetime import date

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from vetsupport.models import Base, Clinic, Document, Pet, Tutor, VetEvent


@dataclass(frozen=True)
class SeedSummary:
	scenario: str
	clinics: int
	tutors: int
	pets: int
	documents: int
	events: int


IDS = {
	"clinic": "10000000-0000-0000-0000-000000000001",
	"ana": "20000000-0000-0000-0000-000000000001",
	"marco": "20000000-0000-0000-0000-000000000002",
	"luna": "30000000-0000-0000-0000-000000000001",
	"bento": "30000000-0000-0000-0000-000000000002",
	"kassandra": "30000000-0000-0000-0000-000000000003",
}


def seed_basic_clinic(session: Session) -> SeedSummary:
	Base.metadata.drop_all(session.get_bind())
	Base.metadata.create_all(session.get_bind())

	clinic = Clinic(id=IDS["clinic"], name="North Star Veterinary Clinic")
	ana = Tutor(
		id=IDS["ana"],
		clinic_id=clinic.id,
		name="Ana Martins",
		email="ana@example.com",
	)
	marco = Tutor(
		id=IDS["marco"],
		clinic_id=clinic.id,
		name="Marco Silva",
		email="marco@example.com",
	)
	luna = Pet(
		id=IDS["luna"],
		clinic_id=clinic.id,
		tutor_id=ana.id,
		name="Luna",
		species="cat",
		breed="Domestic shorthair",
		birth_date=date(2020, 5, 12),
	)
	bento = Pet(
		id=IDS["bento"],
		clinic_id=clinic.id,
		tutor_id=marco.id,
		name="Bento",
		species="dog",
		breed="Mixed breed",
		birth_date=date(2019, 9, 3),
	)
	kassandra = Pet(
		id=IDS["kassandra"],
		clinic_id=clinic.id,
		tutor_id=ana.id,
		name="Kassandra",
		species="cat",
		breed="Siamese mix",
		birth_date=date(2018, 2, 20),
	)

	session.add_all([clinic, ana, marco, luna, bento, kassandra])
	session.flush()

	documents = [
		Document(
			id="40000000-0000-0000-0000-000000000001",
			clinic_id=clinic.id,
			pet_id=luna.id,
			title="Luna vaccination card",
			document_type="vaccination_record",
			source="clinic_record",
			document_date=date(2025, 3, 15),
			body="Vaccination record for Luna. Rabies vaccine administered on 2025-03-15.",
		),
		Document(
			id="40000000-0000-0000-0000-000000000002",
			clinic_id=clinic.id,
			pet_id=bento.id,
			title="Bento tutor note after food change",
			document_type="tutor_note",
			source="owner_note",
			document_date=date(2026, 4, 20),
			body="Tutor reports vomiting after a recent food change. No diagnosis recorded.",
		),
		Document(
			id="40000000-0000-0000-0000-000000000003",
			clinic_id=clinic.id,
			pet_id=kassandra.id,
			title="Kassandra scanned lab report",
			document_type="lab_report",
			source="scanned_pdf",
			document_date=date(2026, 5, 4),
			body="Scanned lab report for Kassandra. Values require veterinary interpretation.",
		),
		Document(
			id="40000000-0000-0000-0000-000000000004",
			clinic_id=clinic.id,
			pet_id=luna.id,
			title="Luna weight history",
			document_type="weight_record",
			source="clinic_record",
			document_date=date(2026, 1, 10),
			body="Luna weight record: 4.2kg on 2025-10-10, 4.4kg on 2026-01-10.",
		),
	]

	events = [
		VetEvent(
			id="50000000-0000-0000-0000-000000000001",
			clinic_id=clinic.id,
			pet_id=luna.id,
			event_date=date(2025, 3, 15),
			event_type="vaccination",
			source="clinic_record",
			summary="Rabies vaccine administered.",
		),
		VetEvent(
			id="50000000-0000-0000-0000-000000000002",
			clinic_id=clinic.id,
			pet_id=luna.id,
			event_date=date(2026, 1, 10),
			event_type="weight_record",
			source="clinic_record",
			summary="Weight recorded at 4.4kg.",
		),
		VetEvent(
			id="50000000-0000-0000-0000-000000000003",
			clinic_id=clinic.id,
			pet_id=bento.id,
			event_date=date(2026, 4, 18),
			event_type="feeding_change",
			source="owner_note",
			summary="Tutor changed Bento's food.",
		),
		VetEvent(
			id="50000000-0000-0000-0000-000000000004",
			clinic_id=clinic.id,
			pet_id=bento.id,
			event_date=date(2026, 4, 20),
			event_type="vomiting",
			source="owner_note",
			summary="Tutor observed vomiting after food change.",
		),
		VetEvent(
			id="50000000-0000-0000-0000-000000000005",
			clinic_id=clinic.id,
			pet_id=kassandra.id,
			event_date=date(2026, 5, 4),
			event_type="lab_report",
			source="scanned_pdf",
			summary="Lab report uploaded for veterinary review.",
		),
		VetEvent(
			id="50000000-0000-0000-0000-000000000006",
			clinic_id=clinic.id,
			pet_id=kassandra.id,
			event_date=date(2026, 5, 5),
			event_type="follow_up",
			source="clinic_record",
			summary="Follow-up consultation requested.",
		),
	]

	session.add_all(documents + events)
	session.flush()

	return SeedSummary(
		scenario="basic-clinic",
		clinics=count_rows(session, Clinic),
		tutors=count_rows(session, Tutor),
		pets=count_rows(session, Pet),
		documents=count_rows(session, Document),
		events=count_rows(session, VetEvent),
	)


def count_rows(session: Session, model: type[Base]) -> int:
	return len(session.scalars(select(model)).all())


def clear_all(session: Session) -> None:
	for model in [VetEvent, Document, Pet, Tutor, Clinic]:
		session.execute(delete(model))
