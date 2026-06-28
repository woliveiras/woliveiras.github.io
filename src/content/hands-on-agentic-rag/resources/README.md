# Resources for the Hands-on Agentic RAG Series

This directory stores curated technical notes for the series. It is not a documentation mirror.

Use `../context/` for strategic context and use this directory when writing or implementing details that depend on external documentation.

## Metadata

- Source: Local resource index for the series.
- Official URL: N/A.
- Checked on: 2026-06-28.
- Relevant posts: all posts.
- What to use this for: routing agents to the right curated resource notes.
- What not to use this for: replacing official documentation or strategic context in `../context/`.

## Resource Policy

- Store concise, original notes written for this series.
- Prefer official documentation and primary sources.
- Include links instead of copying long documentation.
- Keep code snippets minimal and only when directly useful for VetSupport.
- Mark uncertain or fast-moving details as "needs verification".
- Re-check docs before publishing posts about fast-moving APIs.

## Resource Map

- `openai.md`: Responses API, embeddings, structured outputs, tool calling, evals, safety/guardrails.
- `langgraph.md`: graphs, nodes, state, routing, persistence, memory, agent orchestration.
- `pydantic.md`: models, validation, settings, typed inputs/outputs.
- `sqlalchemy-postgres.md`: SQLAlchemy 2.x, sessions, schema modeling, queries, transactions.
- `pgvector-retrieval.md`: pgvector, vector search, hybrid retrieval, indexes.
- `opentelemetry.md`: traces, spans, structured observability for agent runs.
- `security-and-prompt-injection.md`: document prompt injection, tool abuse, data exfiltration, retrieval permissions.
- `veterinary-domain.md`: domain vocabulary and safe non-diagnostic phrasing for veterinary examples.

## Task Routing

Writing a post about LLM calls or structured outputs:

- Read `openai.md`.

Writing a post about orchestration, routing, agent state, or memory:

- Read `langgraph.md`.

Writing a post about schemas, validation, typed agent I/O, or settings:

- Read `pydantic.md`.

Writing a post about persistence, seeds, SQL retrieval, or transactions:

- Read `sqlalchemy-postgres.md`.

Writing a post about vector, lexical, or hybrid retrieval:

- Read `pgvector-retrieval.md`.

Writing a post about tracing, debugging, or evaluation observability:

- Read `opentelemetry.md`.

Writing a post about prompt injection, unsafe tool use, or privacy boundaries:

- Read `security-and-prompt-injection.md`.

Writing veterinary examples, sample records, or safe tutor-facing language:

- Read `veterinary-domain.md`.

## Checked Date

Initial resource notes were created on 2026-06-28.
