# OpenTelemetry Resource Notes

## Metadata

- Source: OpenTelemetry documentation.
- Official URL: https://opentelemetry.io/docs/
- Checked on: 2026-06-28.
- Relevant posts: 14, 19, 20, 22, 23, 25-28.
- What to use this for: tracing, spans, structured observability, and debugging agent runs.
- What not to use this for: product analytics, veterinary domain decisions, or hosted observability vendor selection.

## Notes for VetSupport

Use observability to explain what the agent did, not just whether it returned an answer.

Trace one agent run as a tree of spans:

- harness command;
- intent classification;
- retrieval routing;
- vector search;
- lexical search;
- SQL lookup;
- context building;
- safety check;
- answer generation;
- verification;
- evaluation.

Add span attributes for useful debugging:

- run ID;
- pet ID;
- intent;
- retrieval source;
- document IDs;
- chunk IDs;
- score ranges;
- model name;
- token/cost estimates when available;
- safety decision;
- latency.

Use structured logs for events that are easier to search than visualize, such as seed runs, ingestion failures, validation errors, and evaluation summaries.

## Series Rules

- Show observability as part of engineering RAG, not as production polish.
- Do not log sensitive raw document text unless the example explicitly discusses redaction.
- Prefer IDs, counts, scores, and decisions in traces.
- Tie observability back to evaluation and debugging.
- Re-check Python OpenTelemetry docs before publishing instrumentation code.

## Useful Official Pages

- OpenTelemetry docs: https://opentelemetry.io/docs/
- Python docs: https://opentelemetry.io/docs/languages/python/
- Python instrumentation: https://opentelemetry.io/docs/languages/python/instrumentation/
- OpenTelemetry Python examples: https://opentelemetry-python.readthedocs.io/en/stable/examples/

