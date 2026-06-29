from __future__ import annotations

import json
import logging
import sys
from collections.abc import Iterator
from contextlib import contextmanager

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor

_TRACER_NAME = "vetsupport"
_configured = False
_logger = logging.getLogger("vetsupport")


def configure_telemetry(enabled: bool = False) -> None:
	"""Enable tracing and structured logs.

	When disabled (the default), OpenTelemetry stays a no-op, so instrumentation
	adds no output or cost. When enabled, spans and structured logs are written
	to stderr to keep command output on stdout clean.
	"""
	global _configured
	if not enabled or _configured:
		return

	provider = TracerProvider()
	provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter(out=sys.stderr)))
	trace.set_tracer_provider(provider)

	if not _logger.handlers:
		handler = logging.StreamHandler(sys.stderr)
		handler.setFormatter(logging.Formatter("%(message)s"))
		_logger.addHandler(handler)
	_logger.setLevel(logging.INFO)
	_configured = True


def get_tracer() -> trace.Tracer:
	return trace.get_tracer(_TRACER_NAME)


@contextmanager
def span(name: str, **attributes: object) -> Iterator[trace.Span]:
	"""Start a span and attach non-null attributes.

	Without a configured provider this yields a non-recording span, so callers
	can instrument freely.
	"""
	tracer = get_tracer()
	with tracer.start_as_current_span(name) as current:
		for key, value in attributes.items():
			if value is not None:
				current.set_attribute(key, _as_attribute(value))
		yield current


def log_event(event: str, **fields: object) -> str:
	"""Emit one structured log line and return the serialized payload."""
	payload = json.dumps({"event": event, **fields}, sort_keys=True, default=str)
	_logger.info(payload)
	return payload


def _as_attribute(value: object) -> object:
	if isinstance(value, (str, bool, int, float)):
		return value
	return str(value)
