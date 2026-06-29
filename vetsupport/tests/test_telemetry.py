import json

from vetsupport.telemetry import log_event, span


def test_log_event_returns_valid_json() -> None:
	payload = log_event("unit_test", pet_id="abc", count=2)

	parsed = json.loads(payload)
	assert parsed["event"] == "unit_test"
	assert parsed["pet_id"] == "abc"
	assert parsed["count"] == 2


def test_span_is_a_noop_without_provider() -> None:
	# Without configure_telemetry(True) the span must not raise and must yield.
	with span("test_span", intent="general", evidence_count=3) as current:
		assert current is not None


def test_log_event_serializes_non_primitive_values() -> None:
	payload = log_event("unit_test", value={"nested": True})

	parsed = json.loads(payload)
	assert "nested" in parsed["value"]
