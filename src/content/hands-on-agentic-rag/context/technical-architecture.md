# Technical Architecture

## Main Implementation Decision

Build **VetSupport** as a local agent harness.

The main path should not build a FastAPI backend, React UI, Next.js app, or SaaS architecture. Those can appear only as future evolution. The series should teach Agentic RAG through a local harness with reproducible commands.

## Harness Commands

Use commands shaped like:

```sh
python -m agent_name.seed --scenario basic-clinic
python -m agent_name.ingest --pet-id luna ./samples/luna/
python -m agent_name.ask --pet-id luna "Which vaccines are overdue?"
python -m agent_name.pre_consultation --pet-id luna
python -m agent_name.eval --dataset prompt-injection
```

The reader should be able to run a command, inspect the database or output, and understand what changed.

## Stack

Use:

- Python.
- Pydantic.
- LangGraph for orchestration.
- SQLAlchemy.
- PostgreSQL.
- pgvector.
- Postgres full-text search.
- OpenAI as the LLM provider.
- OpenTelemetry and structured logs when discussing observability.

Avoid adding infrastructure unless a post needs it. Keep examples runnable and easy to reason about.

## Harness Responsibilities

VetSupport should include:

- Database schema.
- Seed data for clinics, tutors, pets, documents, and events.
- Harness commands for reset and seed operations.
- Harness commands for document ingestion from local `.md` and `.txt` files.
- Harness commands for deterministic document chunking.
- Harness commands for inspecting source documents and generated chunks.
- Harness commands for retrieval.
- Harness commands for agent execution.
- Harness commands for evaluation.
- Markdown or text outputs for consultation briefings.

Document ingestion should use frontmatter metadata for `title`, `document_type`, `source`, and `document_date`. The body after the frontmatter becomes the raw document text stored for later chunking and retrieval.

Document chunking should be deterministic and idempotent. The current local harness stores chunks in `document_chunks` with source metadata and stable IDs derived from the source document and chunk index. Embeddings and pgvector indexing come after this step, so early posts can teach the difference between ingesting raw documents, chunking them, and later indexing them for retrieval.

## Retrieval Architecture

Use different retrieval paths for different needs:

| Need | Best source |
| --- | --- |
| Retrieve passages from documents | Vector search |
| Retrieve exact terms | Keyword search / BM25 |
| Retrieve dates and values | SQL |
| Retrieve relations | Graph |
| Retrieve current state | API |
| Store history | Relational database / event store |
| Store original files | Object storage |

Recurring message:

> In real systems, RAG is an architecture for knowledge access, not just a vector query.

## Agent Architecture

Reference architecture:

```text
User
  ↓
Agent Orchestrator
  ↓
Intent Classifier
  ├── Emergency/Safety Check
  ├── Document Question
  ├── Timeline Analysis
  ├── Appointment Preparation
  ├── Medication/Vaccine History
  └── General Education
  ↓
Retriever Router
  ├── Vector Search
  ├── Keyword Search
  ├── SQL
  ├── Graph
  └── External Knowledge Sources
  ↓
Context Builder
  ↓
Safety Layer
  ↓
Answer Generator
  ↓
Verifier
  ↓
Response with citations and uncertainty
```

## Recurring Architecture Concepts

- RAG is more than vector search.
- Documents, structured data, timelines, graphs, and external sources serve different retrieval needs.
- Metadata, provenance, dates, and permissions are not optional in sensitive domains.
- Agents should decide when and where to retrieve, not blindly search every source.
- Context must be small, relevant, ordered, cited, and verifiable.
- Evaluation must measure retrieval quality separately from answer quality.
- Observability is required to debug RAG systems systematically.
- Prompt injection in documents is a real threat.
- Privacy and access control must be part of the retrieval layer.
