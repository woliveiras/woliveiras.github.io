from __future__ import annotations

import uuid
from dataclasses import dataclass
from datetime import date
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.orm import Session

from vetsupport.models import Document, Pet

SUPPORTED_EXTENSIONS = {".md", ".txt"}
REQUIRED_FRONTMATTER = {"title", "document_type", "source", "document_date"}


@dataclass(frozen=True)
class IngestSummary:
	pet_id: str
	inserted: int
	skipped: int
	files: int


@dataclass(frozen=True)
class ParsedDocument:
	title: str
	document_type: str
	source: str
	document_date: date
	body: str
	source_path: Path


def ingest_documents(session: Session, pet_id: str, path: Path) -> IngestSummary:
	pet = session.scalar(select(Pet).where(Pet.id == pet_id))
	if pet is None:
		raise ValueError(f"Pet not found: {pet_id}")

	files = supported_files(path)
	if not files:
		raise ValueError(f"No supported documents found in {path}")

	inserted = 0
	skipped = 0
	for file_path in files:
		parsed = parse_document(file_path)
		document_id = stable_document_id(pet_id=pet_id, file_path=file_path)
		existing = session.scalar(select(Document).where(Document.id == document_id))
		if existing is not None:
			skipped += 1
			continue

		session.add(
			Document(
				id=document_id,
				clinic_id=pet.clinic_id,
				pet_id=pet.id,
				title=parsed.title,
				document_type=parsed.document_type,
				source=parsed.source,
				document_date=parsed.document_date,
				body=parsed.body,
			)
		)
		inserted += 1

	session.flush()
	return IngestSummary(pet_id=pet_id, inserted=inserted, skipped=skipped, files=len(files))


def supported_files(path: Path) -> list[Path]:
	if not path.exists():
		raise ValueError(f"Path does not exist: {path}")
	if path.is_file():
		return [path] if path.suffix.lower() in SUPPORTED_EXTENSIONS else []
	return sorted(
		file_path
		for file_path in path.rglob("*")
		if file_path.is_file() and file_path.suffix.lower() in SUPPORTED_EXTENSIONS
	)


def parse_document(path: Path) -> ParsedDocument:
	raw = path.read_text(encoding="utf-8")
	metadata, body = parse_frontmatter(raw, path)
	missing = REQUIRED_FRONTMATTER - metadata.keys()
	if missing:
		missing_fields = ", ".join(sorted(missing))
		raise ValueError(f"{path} is missing required frontmatter: {missing_fields}")

	return ParsedDocument(
		title=metadata["title"],
		document_type=metadata["document_type"],
		source=metadata["source"],
		document_date=date.fromisoformat(metadata["document_date"]),
		body=body.strip(),
		source_path=path,
	)


def parse_frontmatter(raw: str, path: Path) -> tuple[dict[str, str], str]:
	lines = raw.splitlines()
	if not lines or lines[0].strip() != "---":
		raise ValueError(f"{path} must start with YAML-style frontmatter")

	metadata: dict[str, str] = {}
	for index, line in enumerate(lines[1:], start=1):
		if line.strip() == "---":
			body = "\n".join(lines[index + 1 :])
			return metadata, body
		if not line.strip():
			continue
		key, separator, value = line.partition(":")
		if not separator:
			raise ValueError(f"Invalid frontmatter line in {path}: {line}")
		metadata[key.strip()] = value.strip().strip('"').strip("'")

	raise ValueError(f"{path} has no closing frontmatter delimiter")


def stable_document_id(pet_id: str, file_path: Path) -> str:
	seed = f"{pet_id}:{file_path.resolve()}"
	return str(uuid.uuid5(uuid.NAMESPACE_URL, seed))
