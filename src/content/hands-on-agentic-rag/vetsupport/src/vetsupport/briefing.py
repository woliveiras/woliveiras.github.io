from __future__ import annotations

from datetime import date

from pydantic import BaseModel
from sqlalchemy.orm import Session

from vetsupport.answering import answer_question
from vetsupport.embeddings import Embedder
from vetsupport.llm import LLMClient
from vetsupport.queries import get_pet_details, get_pet_timeline
from vetsupport.safety import SafetyLevel

_DEFAULT_POINTS_TO_CONFIRM = (
	"Confirm the current medications and doses with the tutor.",
	"Confirm the vaccination status and any overdue vaccines.",
	"Confirm recent changes in appetite, weight, or behavior.",
)
_DEFAULT_WARNING_SIGNS = (
	"Trouble breathing, collapse, or seizures.",
	"Repeated vomiting or diarrhea, or refusal to eat or drink.",
	"Sudden pain, bleeding, or a swollen and hard abdomen.",
)


class BriefingTimelineItem(BaseModel):
	date: date | None
	kind: str
	title: str


class BriefingDocument(BaseModel):
	marker: int
	document_id: str
	document_title: str
	document_date: date | None
	source: str


class PreConsultationBriefing(BaseModel):
	pet_id: str
	pet_name: str
	main_reason: str
	safety_level: SafetyLevel
	escalate: bool
	timeline: list[BriefingTimelineItem]
	relevant_history: str
	documents_used: list[BriefingDocument]
	suggested_questions: list[str]
	points_to_confirm: list[str]
	warning_signs: list[str]
	disclaimers: list[str]


def build_pre_consultation(
	session: Session,
	pet_id: str,
	reason: str,
	embedder: Embedder,
	llm: LLMClient,
	limit: int = 5,
) -> PreConsultationBriefing:
	"""Turn scattered records into a structured briefing for the veterinary team.

	The briefing organizes evidence and questions. It does not diagnose, rank
	urgency clinically, or recommend treatment.
	"""
	pet = get_pet_details(session, pet_id)
	if pet is None:
		raise ValueError(f"Pet not found: {pet_id}")

	answer = answer_question(session, pet_id, reason, embedder, llm, limit=limit)
	timeline = [
		BriefingTimelineItem(date=item.date, kind=item.kind, title=item.title)
		for item in get_pet_timeline(session, pet_id)
	]
	documents = [
		BriefingDocument(
			marker=citation.marker,
			document_id=citation.document_id,
			document_title=citation.document_title,
			document_date=citation.document_date,
			source=citation.source,
		)
		for citation in answer.citations
	]

	warning_signs = list(_DEFAULT_WARNING_SIGNS)
	if answer.escalate:
		warning_signs.insert(
			0,
			"This consultation reason mentions possible emergency signs. "
			"Seek urgent in-person care now.",
		)

	return PreConsultationBriefing(
		pet_id=pet.id,
		pet_name=pet.name,
		main_reason=reason,
		safety_level=answer.safety_level,
		escalate=answer.escalate,
		timeline=timeline,
		relevant_history=answer.summary,
		documents_used=documents,
		suggested_questions=answer.questions_for_vet,
		points_to_confirm=list(_DEFAULT_POINTS_TO_CONFIRM),
		warning_signs=warning_signs,
		disclaimers=answer.disclaimers,
	)


def render_briefing_markdown(briefing: PreConsultationBriefing) -> str:
	lines = [
		f"# Veterinary consultation briefing for {briefing.pet_name}",
		"",
		f"- Pet ID: {briefing.pet_id}",
		f"- Safety level: {briefing.safety_level} (escalate: {str(briefing.escalate).lower()})",
		"",
		"## 1. Main reason",
		"",
		briefing.main_reason,
		"",
		"## 2. Timeline",
		"",
	]
	if briefing.timeline:
		for item in briefing.timeline:
			item_date = item.date.isoformat() if item.date else "unknown date"
			lines.append(f"- {item_date} [{item.kind}] {item.title}")
	else:
		lines.append("- No timeline items recorded.")

	lines += ["", "## 3. Relevant history", "", briefing.relevant_history]
	lines += ["", "## 4. Documents used", ""]
	if briefing.documents_used:
		for document in briefing.documents_used:
			doc_date = document.document_date.isoformat() if document.document_date else "unknown"
			lines.append(
				f"- [{document.marker}] {document.document_title} "
				f"({doc_date}, source: {document.source}, id: {document.document_id})"
			)
	else:
		lines.append("- No documents were cited.")

	lines += ["", "## 5. Suggested questions", ""]
	lines += _bullets(briefing.suggested_questions, "No suggested questions.")
	lines += ["", "## 6. Points to confirm", ""]
	lines += _bullets(briefing.points_to_confirm, "No points to confirm.")
	lines += ["", "## 7. Warning signs", ""]
	lines += _bullets(briefing.warning_signs, "No warning signs recorded.")
	lines += ["", "## Disclaimers", ""]
	lines += _bullets(briefing.disclaimers, "No disclaimers.")

	return "\n".join(lines) + "\n"


def _bullets(items: list[str], empty_message: str) -> list[str]:
	if not items:
		return [f"- {empty_message}"]
	return [f"- {item}" for item in items]
