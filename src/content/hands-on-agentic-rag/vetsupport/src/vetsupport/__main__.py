import typer

from vetsupport.db import session_scope
from vetsupport.queries import get_pet_details, get_pet_timeline, list_pets
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


if __name__ == "__main__":
	app()
