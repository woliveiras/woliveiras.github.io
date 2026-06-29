from __future__ import annotations

from dataclasses import dataclass
from datetime import date

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from vetsupport.models import Document, DocumentChunk, Pet, Tutor, VetEvent


@dataclass(frozen=True)
class PetSummary:
	id: str
	name: str
	species: str
	breed: str | None
	tutor_name: str


@dataclass(frozen=True)
class PetDetails:
	id: str
	name: str
	species: str
	breed: str | None
	birth_date: date | None
	tutor_name: str
	tutor_email: str
	document_count: int
	event_count: int


@dataclass(frozen=True)
class TimelineItem:
	date: date | None
	kind: str
	source: str
	title: str
	description: str


@dataclass(frozen=True)
class DocumentChunkDetails:
	id: str
	chunk_index: int
	text: str
	source: str
	document_date: date | None
	metadata_json: str


@dataclass(frozen=True)
class DocumentDetails:
	id: str
	title: str
	document_type: str
	source: str
	document_date: date | None
	body: str
	pet_id: str
	pet_name: str
	chunks: list[DocumentChunkDetails]


def list_pets(session: Session) -> list[PetSummary]:
	statement = (
		select(Pet, Tutor)
		.join(Tutor, Pet.tutor_id == Tutor.id)
		.order_by(Pet.name)
	)
	return [
		PetSummary(
			id=pet.id,
			name=pet.name,
			species=pet.species,
			breed=pet.breed,
			tutor_name=tutor.name,
		)
		for pet, tutor in session.execute(statement).all()
	]


def get_pet_details(session: Session, pet_id: str) -> PetDetails | None:
	statement = select(Pet, Tutor).join(Tutor, Pet.tutor_id == Tutor.id).where(Pet.id == pet_id)
	row = session.execute(statement).one_or_none()
	if row is None:
		return None

	pet, tutor = row
	document_count = session.scalar(
		select(func.count()).select_from(Document).where(Document.pet_id == pet_id)
	) or 0
	event_count = session.scalar(
		select(func.count()).select_from(VetEvent).where(VetEvent.pet_id == pet_id)
	) or 0

	return PetDetails(
		id=pet.id,
		name=pet.name,
		species=pet.species,
		breed=pet.breed,
		birth_date=pet.birth_date,
		tutor_name=tutor.name,
		tutor_email=tutor.email,
		document_count=document_count,
		event_count=event_count,
	)


def get_pet_timeline(session: Session, pet_id: str) -> list[TimelineItem]:
	events = [
		TimelineItem(
			date=event.event_date,
			kind=f"event:{event.event_type}",
			source=event.source,
			title=event.event_type.replace("_", " ").title(),
			description=event.summary,
		)
		for event in session.scalars(
			select(VetEvent).where(VetEvent.pet_id == pet_id).order_by(VetEvent.event_date)
		)
	]
	documents = [
		TimelineItem(
			date=document.document_date,
			kind=f"document:{document.document_type}",
			source=document.source,
			title=document.title,
			description=document.body,
		)
		for document in session.scalars(
			select(Document).where(Document.pet_id == pet_id).order_by(Document.document_date)
		)
	]

	return sorted(
		events + documents,
		key=lambda item: (item.date or date.min, item.kind, item.title),
	)


def get_document_details(session: Session, document_id: str) -> DocumentDetails | None:
	statement = (
		select(Document, Pet)
		.join(Pet, Document.pet_id == Pet.id)
		.where(Document.id == document_id)
	)
	row = session.execute(statement).one_or_none()
	if row is None:
		return None

	document, pet = row
	chunks = [
		DocumentChunkDetails(
			id=chunk.id,
			chunk_index=chunk.chunk_index,
			text=chunk.text,
			source=chunk.source,
			document_date=chunk.document_date,
			metadata_json=chunk.metadata_json,
		)
		for chunk in session.scalars(
			select(DocumentChunk)
			.where(DocumentChunk.document_id == document_id)
			.order_by(DocumentChunk.chunk_index)
		)
	]

	return DocumentDetails(
		id=document.id,
		title=document.title,
		document_type=document.document_type,
		source=document.source,
		document_date=document.document_date,
		body=document.body,
		pet_id=pet.id,
		pet_name=pet.name,
		chunks=chunks,
	)
