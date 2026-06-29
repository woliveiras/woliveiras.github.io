from pathlib import Path
from typing import Annotated

import typer

from vetsupport.chunking import chunk_pet_documents
from vetsupport.config import get_settings
from vetsupport.db import session_scope
from vetsupport.embeddings import get_embedder
from vetsupport.indexing import index_pet_chunks
from vetsupport.ingest import ingest_documents
from vetsupport.queries import get_document_details, get_pet_details, get_pet_timeline, list_pets
from vetsupport.retrieval import search_chunks
from vetsupport.seed import seed_basic_clinic

app = typer.Typer(help="VetSupport local agent harness.")


@app.callback()
def main() -> None:
	"""Run VetSupport harness commands."""


@app.command()
def seed(scenario: str = typer.Option("basic-clinic", help="Seed scenario to load.")) -> None:
	"""Reset and seed the local database with deterministic fictional data."""
	if scenario != "basic-clinic":
		raise typer.BadParameter("Only the 'basic-clinic' scenario exists for now.")

	with session_scope() as session:
		summary = seed_basic_clinic(session)

	typer.echo(f"Seeded scenario '{summary.scenario}'")
	typer.echo(f"Clinics: {summary.clinics}")
	typer.echo(f"Tutors: {summary.tutors}")
	typer.echo(f"Pets: {summary.pets}")
	typer.echo(f"Documents: {summary.documents}")
	typer.echo(f"Events: {summary.events}")


@app.command("ingest")
def ingest_command(
	path: Annotated[Path, typer.Argument(help="File or directory containing documents to ingest.")],
	pet_id: Annotated[str, typer.Option(help="Pet ID that owns the documents.")],
) -> None:
	"""Ingest local Markdown or text documents with frontmatter metadata."""
	try:
		with session_scope() as session:
			summary = ingest_documents(session, pet_id=pet_id, path=path)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	typer.echo(f"Ingested documents for pet {summary.pet_id}")
	typer.echo(f"Files: {summary.files}")
	typer.echo(f"Inserted: {summary.inserted}")
	typer.echo(f"Skipped: {summary.skipped}")


@app.command("chunk")
def chunk_command(
	pet_id: Annotated[str, typer.Option(help="Pet ID whose documents should be chunked.")],
	max_chars: Annotated[int, typer.Option(help="Maximum characters per chunk.")] = 800,
) -> None:
	"""Create deterministic text chunks for one pet's documents."""
	try:
		with session_scope() as session:
			summary = chunk_pet_documents(session, pet_id=pet_id, max_chars=max_chars)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	typer.echo(f"Chunked documents for pet {summary.pet_id}")
	typer.echo(f"Documents: {summary.documents}")
	typer.echo(f"Inserted: {summary.inserted}")
	typer.echo(f"Skipped: {summary.skipped}")


@app.command("index")
def index_command(
	pet_id: Annotated[str, typer.Option(help="Pet ID whose chunks should be indexed.")],
	embedder: Annotated[
		str | None,
		typer.Option(help="Embedding provider override: openai or fake."),
	] = None,
) -> None:
	"""Embed one pet's chunks into pgvector for similarity search."""
	settings = get_settings()
	try:
		embedder_impl = get_embedder(settings, provider=embedder)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	try:
		with session_scope() as session:
			summary = index_pet_chunks(session, pet_id=pet_id, embedder=embedder_impl)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	typer.echo(f"Indexed chunks for pet {summary.pet_id}")
	typer.echo(f"Chunks: {summary.chunks}")
	typer.echo(f"Inserted: {summary.inserted}")
	typer.echo(f"Skipped: {summary.skipped}")


@app.command("search")
def search_command(
	query: Annotated[str, typer.Argument(help="Search query text.")],
	pet_id: Annotated[str, typer.Option(help="Pet ID whose chunks should be searched.")],
	mode: Annotated[
		str,
		typer.Option(help="Retrieval mode: vector, lexical, or hybrid."),
	] = "hybrid",
	limit: Annotated[int, typer.Option(help="Maximum number of results.")] = 5,
	embedder: Annotated[
		str | None,
		typer.Option(help="Embedding provider override: openai or fake."),
	] = None,
) -> None:
	"""Retrieve evidence chunks for a query. This does not produce clinical answers."""
	settings = get_settings()
	try:
		embedder_impl = get_embedder(settings, provider=embedder)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	try:
		with session_scope() as session:
			results = search_chunks(
				session,
				pet_id=pet_id,
				query=query,
				embedder=embedder_impl,
				limit=limit,
				mode=mode,
			)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	typer.echo(f"Search results for pet {pet_id}")
	typer.echo(f"Query: {query}")
	typer.echo(f"Mode: {mode}")
	if not results:
		typer.echo("")
		typer.echo("No matching chunks found. Run the index command first.")
		return

	for rank, result in enumerate(results, start=1):
		typer.echo("")
		typer.echo(f"{rank}. {result.document_title}")
		typer.echo(f"   Document: {result.document_id}")
		typer.echo(f"   Chunk: {result.chunk_id}")
		typer.echo(f"   Date: {result.document_date or 'unknown'}")
		typer.echo(f"   Source: {result.source}")
		typer.echo(f"   Score: {result.score:.4f}")
		typer.echo(f"   Text: {result.text}")


@app.command("list-pets")
def list_pets_command() -> None:
	"""List pets available in the local harness database."""
	with session_scope() as session:
		pets = list_pets(session)

	if not pets:
		typer.echo("No pets found. Run the seed command first.")
		raise typer.Exit(code=1)

	for pet in pets:
		breed = f", {pet.breed}" if pet.breed else ""
		typer.echo(f"{pet.id} | {pet.name} | {pet.species}{breed} | tutor: {pet.tutor_name}")


@app.command("show-pet")
def show_pet_command(pet_id: str = typer.Option(..., help="Pet ID to inspect.")) -> None:
	"""Show details for one pet."""
	with session_scope() as session:
		pet = get_pet_details(session, pet_id)

	if pet is None:
		typer.echo(f"Pet not found: {pet_id}")
		raise typer.Exit(code=1)

	typer.echo(f"Pet: {pet.name}")
	typer.echo(f"ID: {pet.id}")
	typer.echo(f"Species: {pet.species}")
	typer.echo(f"Breed: {pet.breed or 'unknown'}")
	typer.echo(f"Birth date: {pet.birth_date or 'unknown'}")
	typer.echo(f"Tutor: {pet.tutor_name} <{pet.tutor_email}>")
	typer.echo(f"Documents: {pet.document_count}")
	typer.echo(f"Events: {pet.event_count}")


@app.command("timeline")
def timeline_command(pet_id: str = typer.Option(..., help="Pet ID to inspect.")) -> None:
	"""Show a simple date-ordered timeline for one pet."""
	with session_scope() as session:
		pet = get_pet_details(session, pet_id)
		items = get_pet_timeline(session, pet_id) if pet else []

	if pet is None:
		typer.echo(f"Pet not found: {pet_id}")
		raise typer.Exit(code=1)

	typer.echo(f"Timeline for {pet.name} ({pet.id})")
	if not items:
		typer.echo("No timeline items found.")
		return

	for item in items:
		item_date = item.date.isoformat() if item.date else "unknown-date"
		typer.echo(f"- {item_date} [{item.kind}] {item.title}")
		typer.echo(f"  Source: {item.source}")
		typer.echo(f"  {item.description}")


@app.command("show-document")
def show_document_command(
	document_id: str = typer.Option(..., help="Document ID to inspect."),
) -> None:
	"""Show one document and its indexed chunks."""
	with session_scope() as session:
		document = get_document_details(session, document_id)

	if document is None:
		typer.echo(f"Document not found: {document_id}")
		raise typer.Exit(code=1)

	typer.echo(f"Document: {document.title}")
	typer.echo(f"ID: {document.id}")
	typer.echo(f"Pet: {document.pet_name} ({document.pet_id})")
	typer.echo(f"Type: {document.document_type}")
	typer.echo(f"Source: {document.source}")
	typer.echo(f"Date: {document.document_date or 'unknown'}")
	typer.echo(f"Chunks: {len(document.chunks)}")
	if not document.chunks:
		typer.echo("No chunks found. Run the chunk command first.")
		return

	for chunk in document.chunks:
		typer.echo(f"- Chunk {chunk.chunk_index}: {chunk.id}")
		typer.echo(f"  Source: {chunk.source}")
		typer.echo(f"  Date: {chunk.document_date or 'unknown'}")
		typer.echo(f"  {chunk.text}")


if __name__ == "__main__":
	app()
