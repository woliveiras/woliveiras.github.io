from __future__ import annotations

import re
from typing import TypedDict

from langgraph.graph import END, START, StateGraph
from sqlalchemy.orm import Session

from vetsupport.embeddings import Embedder
from vetsupport.llm import AnswerDraft, EvidenceItem, LLMClient
from vetsupport.retrieval import search_chunks
from vetsupport.safety import SafetyAssessment, SafetyLevel, assess_query, detect_injection
from vetsupport.telemetry import span

_CITATION_RE = re.compile(r"\[(\d+)\]")

# Each intent maps to the retrieval mode that best fits it. Routing the source by
# intent is the point: the agent should not blindly run every search.
_INTENT_ROUTES = {
	"emergency": "hybrid",
	"vaccine_history": "lexical",
	"medication_history": "lexical",
	"timeline": "hybrid",
	"document_question": "vector",
	"general": "hybrid",
}


class AgentState(TypedDict, total=False):
	query: str
	pet_id: str
	limit: int
	intent: str
	retrieval_mode: str
	safety: SafetyAssessment
	evidence: list[EvidenceItem]
	flagged_chunk_ids: list[str]
	draft: AnswerDraft
	citations: list[int]


def classify_intent(state: AgentState) -> AgentState:
	"""Pick an intent and the retrieval source that fits it."""
	text = state["query"].lower()
	safety = assess_query(state["query"])

	if safety.level is SafetyLevel.emergency:
		intent = "emergency"
	elif "vaccin" in text:
		intent = "vaccine_history"
	elif any(term in text for term in ("medication", "medicine", "dose", "dosage")):
		intent = "medication_history"
	elif any(term in text for term in ("timeline", "history", "when", "evolution")):
		intent = "timeline"
	elif any(term in text for term in ("document", "report", "note", "exam", "lab")):
		intent = "document_question"
	else:
		intent = "general"

	retrieval_mode = _INTENT_ROUTES[intent]
	with span(
		"classify_intent",
		intent=intent,
		retrieval_mode=retrieval_mode,
		safety_level=str(safety.level),
		escalate=safety.escalate,
	):
		pass
	return {
		"intent": intent,
		"retrieval_mode": retrieval_mode,
		"safety": safety,
	}


def build_agent_graph(session: Session, embedder: Embedder, llm: LLMClient):
	"""Compile the VetSupport agent graph.

	The flow is explicit so each step is observable: classify intent, route
	retrieval, generate a grounded draft, then verify citations.
	"""

	def retrieve(state: AgentState) -> AgentState:
		results = search_chunks(
			session,
			state["pet_id"],
			state["query"],
			embedder,
			limit=state.get("limit", 5),
			mode=state["retrieval_mode"],
		)
		evidence = [
			EvidenceItem(
				marker=index,
				document_id=result.document_id,
				document_title=result.document_title,
				chunk_id=result.chunk_id,
				document_date=result.document_date,
				source=result.source,
				text=result.text,
			)
			for index, result in enumerate(results, start=1)
		]
		flagged = [item.chunk_id for item in evidence if detect_injection(item.text)]
		with span(
			"retrieve",
			retrieval_mode=state["retrieval_mode"],
			evidence_count=len(evidence),
			flagged_evidence=len(flagged),
		):
			pass
		return {"evidence": evidence, "flagged_chunk_ids": flagged}

	def generate(state: AgentState) -> AgentState:
		evidence = state.get("evidence", [])
		with span("generate", evidence_count=len(evidence)):
			if evidence:
				draft = llm.draft_answer(state["query"], evidence, state["safety"])
			else:
				draft = AnswerDraft(
					summary=(
						"No indexed documents were found for this pet and query. "
						"Ingest and index documents before asking again."
					),
					questions_for_vet=[],
					uncertainty="No evidence was available to answer this question.",
				)
		return {"draft": draft}

	def verify(state: AgentState) -> AgentState:
		markers = verify_citation_markers(state["draft"].summary, state.get("evidence", []))
		with span("verify", citations=len(markers)):
			pass
		return {"citations": markers}

	graph = StateGraph(AgentState)
	graph.add_node("classify_intent", classify_intent)
	graph.add_node("retrieve", retrieve)
	graph.add_node("generate", generate)
	graph.add_node("verify", verify)
	graph.add_edge(START, "classify_intent")
	graph.add_edge("classify_intent", "retrieve")
	graph.add_edge("retrieve", "generate")
	graph.add_edge("generate", "verify")
	graph.add_edge("verify", END)
	return graph.compile()


def verify_citation_markers(summary: str, evidence: list[EvidenceItem]) -> list[int]:
	"""Return the evidence markers that the summary actually cites."""
	valid_markers = {item.marker for item in evidence}
	cited = {int(marker) for marker in _CITATION_RE.findall(summary)}
	return sorted(marker for marker in cited if marker in valid_markers)
