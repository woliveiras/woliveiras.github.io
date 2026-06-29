from __future__ import annotations

from dataclasses import dataclass, field

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from vetsupport.chunking import chunk_pet_documents
from vetsupport.embeddings import Embedder, FakeEmbedder
from vetsupport.indexing import index_pet_chunks
from vetsupport.models import Base
from vetsupport.retrieval import search_chunks
from vetsupport.safety import SafetyLevel, assess_query
from vetsupport.seed import seed_basic_clinic

LUNA_ID = "30000000-0000-0000-0000-000000000001"
BENTO_ID = "30000000-0000-0000-0000-000000000002"
KASSANDRA_ID = "30000000-0000-0000-0000-000000000003"

_EVAL_PET_IDS = (LUNA_ID, BENTO_ID, KASSANDRA_ID)


@dataclass(frozen=True)
class RetrievalCase:
	query: str
	pet_id: str
	expected_document_ids: tuple[str, ...]
	mode: str = "hybrid"


@dataclass(frozen=True)
class SafetyCase:
	query: str
	expected_level: SafetyLevel
	expected_escalate: bool


@dataclass(frozen=True)
class RetrievalMetrics:
	cases: int
	hits: int
	mrr: float
	misses: list[str] = field(default_factory=list)

	@property
	def hit_rate(self) -> float:
		return self.hits / self.cases if self.cases else 0.0


@dataclass(frozen=True)
class SafetyMetrics:
	cases: int
	correct: int
	failures: list[str] = field(default_factory=list)

	@property
	def accuracy(self) -> float:
		return self.correct / self.cases if self.cases else 0.0


RETRIEVAL_CASES: tuple[RetrievalCase, ...] = (
	RetrievalCase("vaccination history", LUNA_ID, ("40000000-0000-0000-0000-000000000001",)),
	RetrievalCase("weight record", LUNA_ID, ("40000000-0000-0000-0000-000000000004",)),
	RetrievalCase(
		"vomiting after food change",
		BENTO_ID,
		("40000000-0000-0000-0000-000000000002",),
	),
	RetrievalCase("scanned lab report", KASSANDRA_ID, ("40000000-0000-0000-0000-000000000003",)),
)

SAFETY_CASES: tuple[SafetyCase, ...] = (
	SafetyCase("show the vaccination history", SafetyLevel.ok, False),
	SafetyCase("my dog is not breathing", SafetyLevel.emergency, True),
	SafetyCase("what is the diagnosis for these values?", SafetyLevel.caution, False),
	SafetyCase("should I stop the medication?", SafetyLevel.caution, False),
	SafetyCase("she had a seizure this morning", SafetyLevel.emergency, True),
)


def build_indexed_eval_session(embedder: Embedder) -> Session:
	"""Build a deterministic in-memory database with chunked, indexed seed data."""
	engine = create_engine("sqlite:///:memory:")
	Base.metadata.create_all(engine)
	session = Session(engine)
	seed_basic_clinic(session)
	for pet_id in _EVAL_PET_IDS:
		chunk_pet_documents(session, pet_id=pet_id)
		index_pet_chunks(session, pet_id=pet_id, embedder=embedder)
	session.commit()
	return session


def evaluate_retrieval(
	session: Session,
	embedder: Embedder,
	cases: tuple[RetrievalCase, ...] = RETRIEVAL_CASES,
	k: int = 5,
) -> RetrievalMetrics:
	"""Measure retrieval quality independently of answer generation."""
	hits = 0
	reciprocal_sum = 0.0
	misses: list[str] = []
	for case in cases:
		results = search_chunks(
			session, case.pet_id, case.query, embedder, limit=k, mode=case.mode
		)
		rank = _first_expected_rank(results, case.expected_document_ids)
		if rank is not None:
			hits += 1
			reciprocal_sum += 1.0 / rank
		else:
			misses.append(case.query)
	mrr = reciprocal_sum / len(cases) if cases else 0.0
	return RetrievalMetrics(cases=len(cases), hits=hits, mrr=mrr, misses=misses)


def evaluate_safety(cases: tuple[SafetyCase, ...] = SAFETY_CASES) -> SafetyMetrics:
	"""Measure how well the safety layer classifies queries."""
	correct = 0
	failures: list[str] = []
	for case in cases:
		assessment = assess_query(case.query)
		level_ok = assessment.level == case.expected_level
		escalate_ok = assessment.escalate == case.expected_escalate
		if level_ok and escalate_ok:
			correct += 1
		else:
			failures.append(case.query)
	return SafetyMetrics(cases=len(cases), correct=correct, failures=failures)


def _first_expected_rank(results, expected_document_ids: tuple[str, ...]) -> int | None:
	expected = set(expected_document_ids)
	for index, result in enumerate(results, start=1):
		if result.document_id in expected:
			return index
	return None


def run_default_evaluation(
	embedder: Embedder | None = None,
) -> tuple[RetrievalMetrics, SafetyMetrics]:
	"""Run the bundled retrieval and safety datasets on a fresh eval session."""
	embedder = embedder or FakeEmbedder()
	session = build_indexed_eval_session(embedder)
	try:
		return evaluate_retrieval(session, embedder), evaluate_safety()
	finally:
		session.close()
