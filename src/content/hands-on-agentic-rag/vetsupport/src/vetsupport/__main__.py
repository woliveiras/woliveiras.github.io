from pathlib import Path
from typing import Annotated

import typer

from vetsupport.answering import answer_question
from vetsupport.briefing import build_pre_consultation, render_briefing_markdown
from vetsupport.chunking import chunk_pet_documents
from vetsupport.config import get_settings
from vetsupport.db import session_scope
from vetsupport.embeddings import get_embedder
from vetsupport.evaluation import (
	build_indexed_eval_session,
	evaluate_retrieval,
	evaluate_safety,
)
from vetsupport.indexing import index_pet_chunks
from vetsupport.ingest import ingest_documents
from vetsupport.llm import get_llm
from vetsupport.queries import get_document_details, get_pet_details, get_pet_timeline, list_pets
from vetsupport.retrieval import search_chunks
from vetsupport.seed import seed_basic_clinic
from vetsupport.telemetry import configure_telemetry

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


@app.command("ask")
def ask_command(
	question: Annotated[str, typer.Argument(help="Question about the pet.")],
	pet_id: Annotated[str, typer.Option(help="Pet ID the question is about.")],
	limit: Annotated[int, typer.Option(help="Maximum evidence chunks to use.")] = 5,
	embedder: Annotated[
		str | None,
		typer.Option(help="Embedding provider override: openai or fake."),
	] = None,
	llm: Annotated[
		str | None,
		typer.Option(help="LLM provider override: openai or fake."),
	] = None,
	trace: Annotated[
		bool,
		typer.Option(help="Emit OpenTelemetry spans and structured logs to stderr."),
	] = False,
) -> None:
	"""Answer a question with cited evidence. This never diagnoses or prescribes."""
	settings = get_settings()
	configure_telemetry(enabled=trace)
	try:
		embedder_impl = get_embedder(settings, provider=embedder)
		llm_impl = get_llm(settings, provider=llm)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	try:
		with session_scope() as session:
			answer = answer_question(
				session,
				pet_id=pet_id,
				query=question,
				embedder=embedder_impl,
				llm=llm_impl,
				limit=limit,
			)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	if answer.escalate:
		typer.echo("URGENT: Possible emergency signs. Seek in-person veterinary care now.")
		typer.echo("")

	typer.echo(f"Question: {answer.query}")
	typer.echo(f"Pet: {answer.pet_id}")
	typer.echo(f"Intent: {answer.intent} (retrieval: {answer.retrieval_mode})")
	typer.echo(f"Safety: {answer.safety_level} (escalate: {str(answer.escalate).lower()})")
	typer.echo("")
	typer.echo("Summary")
	typer.echo(answer.summary)

	if answer.questions_for_vet:
		typer.echo("")
		typer.echo("Questions for the veterinarian")
		for item in answer.questions_for_vet:
			typer.echo(f"- {item}")

	if answer.uncertainty:
		typer.echo("")
		typer.echo("Uncertainty")
		typer.echo(answer.uncertainty)

	typer.echo("")
	typer.echo("Disclaimers")
	for disclaimer in answer.disclaimers:
		typer.echo(f"- {disclaimer}")

	typer.echo("")
	typer.echo("Citations")
	if not answer.citations:
		typer.echo("- none")
	for citation in answer.citations:
		citation_date = citation.document_date.isoformat() if citation.document_date else "unknown"
		typer.echo(
			f"[{citation.marker}] {citation.document_title} | "
			f"{citation.document_id} | {citation_date} | {citation.source}"
		)


@app.command("pre-consultation")
def pre_consultation_command(
	reason: Annotated[str, typer.Argument(help="Main reason for the consultation.")],
	pet_id: Annotated[str, typer.Option(help="Pet ID the briefing is about.")],
	output: Annotated[
		Path | None,
		typer.Option(help="Optional path to write the Markdown briefing to."),
	] = None,
	limit: Annotated[int, typer.Option(help="Maximum evidence chunks to use.")] = 5,
	embedder: Annotated[
		str | None,
		typer.Option(help="Embedding provider override: openai or fake."),
	] = None,
	llm: Annotated[
		str | None,
		typer.Option(help="LLM provider override: openai or fake."),
	] = None,
) -> None:
	"""Build a structured pre-consultation briefing. This never diagnoses."""
	settings = get_settings()
	try:
		embedder_impl = get_embedder(settings, provider=embedder)
		llm_impl = get_llm(settings, provider=llm)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	try:
		with session_scope() as session:
			briefing = build_pre_consultation(
				session,
				pet_id=pet_id,
				reason=reason,
				embedder=embedder_impl,
				llm=llm_impl,
				limit=limit,
			)
	except ValueError as error:
		typer.echo(str(error))
		raise typer.Exit(code=1) from error

	markdown = render_briefing_markdown(briefing)
	if output is not None:
		output.write_text(markdown, encoding="utf-8")
		typer.echo(f"Wrote briefing to {output}")
		return
	typer.echo(markdown)


@app.command("eval")
def eval_command(
	dataset: Annotated[
		str,
		typer.Option(help="Dataset to evaluate: retrieval, safety, or all."),
	] = "all",
	embedder: Annotated[
		str,
		typer.Option(help="Embedding provider for retrieval eval: fake (default) or openai."),
	] = "fake",
) -> None:
	"""Run reproducible retrieval and safety evaluations on bundled datasets."""
	if dataset not in {"retrieval", "safety", "all"}:
		typer.echo("dataset must be one of: retrieval, safety, all")
		raise typer.Exit(code=1)

	settings = get_settings()

	if dataset in {"retrieval", "all"}:
		try:
			embedder_impl = get_embedder(settings, provider=embedder)
		except ValueError as error:
			typer.echo(str(error))
			raise typer.Exit(code=1) from error
		session = build_indexed_eval_session(embedder_impl)
		try:
			metrics = evaluate_retrieval(session, embedder_impl)
		finally:
			session.close()
		typer.echo("Retrieval evaluation")
		typer.echo(f"Cases: {metrics.cases}")
		typer.echo(f"Hits: {metrics.hits}")
		typer.echo(f"Hit rate: {metrics.hit_rate:.2f}")
		typer.echo(f"MRR: {metrics.mrr:.2f}")
		if metrics.misses:
			typer.echo(f"Misses: {', '.join(metrics.misses)}")

	if dataset == "all":
		typer.echo("")

	if dataset in {"safety", "all"}:
		safety_metrics = evaluate_safety()
		typer.echo("Safety evaluation")
		typer.echo(f"Cases: {safety_metrics.cases}")
		typer.echo(f"Correct: {safety_metrics.correct}")
		typer.echo(f"Accuracy: {safety_metrics.accuracy:.2f}")
		if safety_metrics.failures:
			typer.echo(f"Failures: {', '.join(safety_metrics.failures)}")


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
