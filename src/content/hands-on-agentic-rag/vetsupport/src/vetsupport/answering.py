from __future__ import annotations

from datetime import date

from pydantic import BaseModel
from sqlalchemy.orm import Session

from vetsupport.embeddings import Embedder
from vetsupport.graph import build_agent_graph
from vetsupport.llm import EvidenceItem, LLMClient
from vetsupport.safety import SafetyLevel
from vetsupport.telemetry import log_event, span


class Citation(BaseModel):
	marker: int
	document_id: str
	document_title: str
	chunk_id: str
	document_date: date | None
	source: str


class AgentAnswer(BaseModel):
	query: str
	pet_id: str
	intent: str
	retrieval_mode: str
	safety_level: SafetyLevel
	escalate: bool
	used_evidence: bool
	summary: str
	questions_for_vet: list[str]
	uncertainty: str
	disclaimers: list[str]
	citations: list[Citation]


def answer_question(
	session: Session,
	pet_id: str,
	query: str,
	embedder: Embedder,
	llm: LLMClient,
	limit: int = 5,
) -> AgentAnswer:
	"""Answer one question about a pet with retrieved evidence and citations.

	The work runs through the VetSupport agent graph: assess safety, route and
	run retrieval, generate a grounded draft, then verify citations. The answer
	is evidence and questions, never a diagnosis or a prescription.
	"""
	agent = build_agent_graph(session, embedder, llm)
	with span("vetsupport.ask", pet_id=pet_id):
		state = agent.invoke({"query": query, "pet_id": pet_id, "limit": limit})

	safety = state["safety"]
	evidence: list[EvidenceItem] = state.get("evidence", [])
	draft = state["draft"]
	cited_markers = state.get("citations", [])
	citations = _build_citations(cited_markers, evidence)

	log_event(
		"agent_answer",
		pet_id=pet_id,
		intent=state["intent"],
		retrieval_mode=state["retrieval_mode"],
		safety_level=str(safety.level),
		escalate=safety.escalate,
		evidence_count=len(evidence),
		citations=len(citations),
	)

	return AgentAnswer(
		query=query,
		pet_id=pet_id,
		intent=state["intent"],
		retrieval_mode=state["retrieval_mode"],
		safety_level=safety.level,
		escalate=safety.escalate,
		used_evidence=bool(evidence),
		summary=draft.summary,
		questions_for_vet=draft.questions_for_vet,
		uncertainty=draft.uncertainty,
		disclaimers=safety.disclaimers,
		citations=citations,
	)


def _build_citations(markers: list[int], evidence: list[EvidenceItem]) -> list[Citation]:
	by_marker = {item.marker: item for item in evidence}
	citations: list[Citation] = []
	for marker in markers:
		item = by_marker.get(marker)
		if item is None:
			continue
		citations.append(
			Citation(
				marker=item.marker,
				document_id=item.document_id,
				document_title=item.document_title,
				chunk_id=item.chunk_id,
				document_date=item.document_date,
				source=item.source,
			)
		)
	return citations

