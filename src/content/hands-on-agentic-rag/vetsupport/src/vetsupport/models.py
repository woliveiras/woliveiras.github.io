from __future__ import annotations

from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
	pass


class Clinic(Base):
	__tablename__ = "clinics"

	id: Mapped[str] = mapped_column(String(36), primary_key=True)
	name: Mapped[str] = mapped_column(String(200), nullable=False)
	created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

	tutors: Mapped[list[Tutor]] = relationship(
		back_populates="clinic",
		cascade="all, delete-orphan",
	)
	pets: Mapped[list[Pet]] = relationship(back_populates="clinic", cascade="all, delete-orphan")


class Tutor(Base):
	__tablename__ = "tutors"

	id: Mapped[str] = mapped_column(String(36), primary_key=True)
	clinic_id: Mapped[str] = mapped_column(ForeignKey("clinics.id"), nullable=False)
	name: Mapped[str] = mapped_column(String(200), nullable=False)
	email: Mapped[str] = mapped_column(String(320), nullable=False)

	clinic: Mapped[Clinic] = relationship(back_populates="tutors")
	pets: Mapped[list[Pet]] = relationship(back_populates="tutor", cascade="all, delete-orphan")


class Pet(Base):
	__tablename__ = "pets"

	id: Mapped[str] = mapped_column(String(36), primary_key=True)
	clinic_id: Mapped[str] = mapped_column(ForeignKey("clinics.id"), nullable=False)
	tutor_id: Mapped[str] = mapped_column(ForeignKey("tutors.id"), nullable=False)
	name: Mapped[str] = mapped_column(String(120), nullable=False)
	species: Mapped[str] = mapped_column(String(80), nullable=False)
	breed: Mapped[str | None] = mapped_column(String(120))
	birth_date: Mapped[date | None] = mapped_column(Date)

	clinic: Mapped[Clinic] = relationship(back_populates="pets")
	tutor: Mapped[Tutor] = relationship(back_populates="pets")
	documents: Mapped[list[Document]] = relationship(
		back_populates="pet",
		cascade="all, delete-orphan",
	)
	events: Mapped[list[VetEvent]] = relationship(
		back_populates="pet",
		cascade="all, delete-orphan",
	)


class Document(Base):
	__tablename__ = "documents"

	id: Mapped[str] = mapped_column(String(36), primary_key=True)
	clinic_id: Mapped[str] = mapped_column(ForeignKey("clinics.id"), nullable=False)
	pet_id: Mapped[str] = mapped_column(ForeignKey("pets.id"), nullable=False)
	title: Mapped[str] = mapped_column(String(240), nullable=False)
	document_type: Mapped[str] = mapped_column(String(80), nullable=False)
	source: Mapped[str] = mapped_column(String(120), nullable=False)
	document_date: Mapped[date | None] = mapped_column(Date)
	body: Mapped[str] = mapped_column(Text, nullable=False)

	pet: Mapped[Pet] = relationship(back_populates="documents")


class VetEvent(Base):
	__tablename__ = "vet_events"

	id: Mapped[str] = mapped_column(String(36), primary_key=True)
	clinic_id: Mapped[str] = mapped_column(ForeignKey("clinics.id"), nullable=False)
	pet_id: Mapped[str] = mapped_column(ForeignKey("pets.id"), nullable=False)
	event_date: Mapped[date] = mapped_column(Date, nullable=False)
	event_type: Mapped[str] = mapped_column(String(80), nullable=False)
	source: Mapped[str] = mapped_column(String(120), nullable=False)
	summary: Mapped[str] = mapped_column(Text, nullable=False)

	pet: Mapped[Pet] = relationship(back_populates="events")
