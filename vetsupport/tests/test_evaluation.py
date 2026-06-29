from vetsupport.embeddings import FakeEmbedder
from vetsupport.evaluation import (
	build_indexed_eval_session,
	evaluate_retrieval,
	evaluate_safety,
	run_default_evaluation,
)


def test_evaluate_retrieval_finds_expected_documents() -> None:
	embedder = FakeEmbedder()
	session = build_indexed_eval_session(embedder)

	metrics = evaluate_retrieval(session, embedder)

	assert metrics.cases == 4
	assert metrics.hits == metrics.cases
	assert metrics.hit_rate == 1.0
	assert metrics.mrr > 0.0
	assert metrics.misses == []


def test_evaluate_safety_classifies_cases() -> None:
	metrics = evaluate_safety()

	assert metrics.cases == 5
	assert metrics.correct == metrics.cases
	assert metrics.accuracy == 1.0
	assert metrics.failures == []


def test_run_default_evaluation_returns_both_metrics() -> None:
	retrieval, safety = run_default_evaluation()

	assert retrieval.hit_rate == 1.0
	assert safety.accuracy == 1.0
