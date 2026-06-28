from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from vetsupport.models import Base, Clinic, Document, Pet, Tutor, VetEvent
from vetsupport.queries import get_pet_details, get_pet_timeline, list_pets
from vetsupport.seed import seed_basic_clinic


def test_seed_basic_clinic_counts() -> None:
	engine = create_engine("sqlite:///:memory:")
	Base.metadata.create_all(engine)

	with Session(engine) as session:
		summary = seed_basic_clinic(session)
		session.commit()

	assert summary.clinics == 1
	assert summary.tutors == 2
	assert summary.pets == 3
	assert summary.documents == 4
	assert summary.events == 6

	with Session(engine) as session:
		assert session.query(Clinic).count() == 1
		assert session.query(Tutor).count() == 2
		assert session.query(Pet).count() == 3
		assert session.query(Document).count() == 4
		assert session.query(VetEvent).count() == 6


def test_seed_basic_clinic_queries() -> None:
	engine = create_engine("sqlite:///:memory:")
	Base.metadata.create_all(engine)

	with Session(engine) as session:
		seed_basic_clinic(session)
		session.commit()

	with Session(engine) as session:
		pets = list_pets(session)
		luna = get_pet_details(session, "30000000-0000-0000-0000-000000000001")
		timeline = get_pet_timeline(session, "30000000-0000-0000-0000-000000000001")

	assert [pet.name for pet in pets] == ["Bento", "Kassandra", "Luna"]
	assert luna is not None
	assert luna.name == "Luna"
	assert luna.document_count == 2
	assert luna.event_count == 2
	assert len(timeline) == 4
	assert timeline[0].date is not None
