from __future__ import annotations

import json
from datetime import date, datetime

from pgvector.sqlalchemy import Vector
from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.engine import Dialect
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.types import TypeDecorator

from vetsupport.config import EMBEDDING_DIMENSIONS


class Base(DeclarativeBase):
	pass


class EmbeddingVector(TypeDecorator):
	"""Portable embedding column.

	Maps to a real pgvector ``vector`` column on PostgreSQL so retrieval can use
	the ``<=>`` cosine-distance operator. Falls back to JSON ``Text`` on other
	backends (such as the in-memory SQLite databases used in tests) so the same
	models load without pgvector.
	"""

	impl = Text
	cache_ok = True

	def __init__(self, dimensions: int) -> None:
		super().__init__()
		self.dimensions = dimensions

	def load_dialect_impl(self, dialect: Dialect):
		if dialect.name == "postgresql":
			return dialect.type_descriptor(Vector(self.dimensions))
		return dialect.type_descriptor(Text())

	def process_bind_param(self, value: list[float] | None, dialect: Dialect):
		if value is None:
			return None
		if dialect.name == "postgresql":
			return list(value)
		return json.dumps([float(item) for item in value])

	def process_result_value(self, value, dialect: Dialect) -> list[float] | None:
		if value is None:
			return None
		if dialect.name == "postgresql":
			return list(value)
		return json.loads(value)


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
	chunks: Mapped[list[DocumentChunk]] = relationship(
		back_populates="document",
		cascade="all, delete-orphan",
	)


class DocumentChunk(Base):
	__tablename__ = "document_chunks"

	id: Mapped[str] = mapped_column(String(36), primary_key=True)
	document_id: Mapped[str] = mapped_column(ForeignKey("documents.id"), nullable=False)
	pet_id: Mapped[str] = mapped_column(ForeignKey("pets.id"), nullable=False)
	chunk_index: Mapped[int] = mapped_column(Integer, nullable=False)
	text: Mapped[str] = mapped_column(Text, nullable=False)
	source: Mapped[str] = mapped_column(String(120), nullable=False)
	document_date: Mapped[date | None] = mapped_column(Date)
	metadata_json: Mapped[str] = mapped_column(Text, nullable=False, default="{}")

	document: Mapped[Document] = relationship(back_populates="chunks")
	embedding: Mapped[ChunkEmbedding | None] = relationship(
		back_populates="chunk",
		cascade="all, delete-orphan",
		uselist=False,
	)


class ChunkEmbedding(Base):
	__tablename__ = "chunk_embeddings"

	chunk_id: Mapped[str] = mapped_column(
		ForeignKey("document_chunks.id"),
		primary_key=True,
	)
	pet_id: Mapped[str] = mapped_column(ForeignKey("pets.id"), nullable=False)
	model: Mapped[str] = mapped_column(String(120), nullable=False)
	dimensions: Mapped[int] = mapped_column(Integer, nullable=False)
	embedding: Mapped[list[float]] = mapped_column(
		EmbeddingVector(EMBEDDING_DIMENSIONS),
		nullable=False,
	)
	created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

	chunk: Mapped[DocumentChunk] = relationship(back_populates="embedding")



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
