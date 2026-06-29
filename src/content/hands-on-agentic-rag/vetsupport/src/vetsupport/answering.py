from __future__ import annotations

import re
from datetime import date

from pydantic import BaseModel
from sqlalchemy.orm import Session

from vetsupport.embeddings import Embedder
from vetsupport.llm import AnswerDraft, EvidenceItem, LLMClient
from vetsupport.retrieval import search_chunks
from vetsupport.safety import SafetyLevel, assess_query

_CITATION_RE = re.compile(r"\[(\d+)\]")


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

	The flow is: assess safety, retrieve evidence, generate a grounded draft,
	then verify citations. The answer is evidence and questions, never a
	diagnosis or a prescription.
	"""
	safety = assess_query(query)
	results = search_chunks(session, pet_id, query, embedder, limit=limit, mode="hybrid")
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

	if evidence:
		draft = llm.draft_answer(query, evidence, safety)
	else:
		draft = AnswerDraft(
			summary=(
				"No indexed documents were found for this pet and query. "
				"Ingest and index documents before asking again."
			),
			questions_for_vet=[],
			uncertainty="No evidence was available to answer this question.",
		)

	citations = _verify_citations(draft.summary, evidence)
	return AgentAnswer(
		query=query,
		pet_id=pet_id,
		safety_level=safety.level,
		escalate=safety.escalate,
		used_evidence=bool(evidence),
		summary=draft.summary,
		questions_for_vet=draft.questions_for_vet,
		uncertainty=draft.uncertainty,
		disclaimers=safety.disclaimers,
		citations=citations,
	)


def _verify_citations(summary: str, evidence: list[EvidenceItem]) -> list[Citation]:
	"""Keep only citations that reference real evidence markers."""
	by_marker = {item.marker: item for item in evidence}
	cited_markers = sorted({int(marker) for marker in _CITATION_RE.findall(summary)})
	citations: list[Citation] = []
	for marker in cited_markers:
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
