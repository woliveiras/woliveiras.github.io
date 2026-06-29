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

The current local harness also implements embeddings and vector search:

- Embeddings live behind a small `Embedder` abstraction with two providers: an `OpenAIEmbedder` (default, `text-embedding-3-small`, 256 dimensions) and a deterministic `FakeEmbedder` that uses feature hashing and never calls an external API. The fake provider keeps tests and offline documentation runs reproducible.
- Chunk embeddings are stored in `chunk_embeddings` with the model name, dimension, and the vector itself. The vector column maps to a pgvector `vector(256)` column on PostgreSQL and falls back to portable JSON `Text` on SQLite, so the same models load in the in-memory test databases.
- The `index` command embeds a pet's chunks that are not indexed yet and is idempotent: re-running it inserts nothing new.
- The `search` command embeds the query and ranks chunks by relevance. It supports three modes: `vector` (pgvector `<=>` cosine distance), `lexical` (PostgreSQL full-text search), and `hybrid` (Reciprocal Rank Fusion of the vector and lexical rankings, the default). Other backends use in-Python fallbacks so the tests run on SQLite. Search returns evidence (document, chunk, date, source, score, and text), never a clinical answer.
- The seed command creates the pgvector extension (`CREATE EXTENSION IF NOT EXISTS vector`) before creating tables on PostgreSQL.

The harness also implements a first answer flow behind the `ask` command:

- A deterministic, rule-based safety layer (`safety.py`) classifies each query before any answer is generated. It detects possible emergency signs (escalates to urgent care), diagnosis requests, and medication-change requests, and it attaches the right disclaimers. It never blocks evidence retrieval; it constrains how the answer is framed.
- An LLM abstraction (`llm.py`) has two providers: an `OpenAILLM` (Responses API) and a deterministic `FakeLLM` that restates retrieved evidence with citations and never calls an external API. The system prompt forbids diagnosis and prescription, treats document text as untrusted content, and requires inline citation markers.
- The `answer_question` flow (`answering.py`) runs a LangGraph agent (`graph.py`) with explicit nodes: classify intent, route and run retrieval, generate a grounded draft, then verify that citation markers point to real evidence. The intent router chooses the retrieval source (lexical for vaccine and medication questions, vector for document questions, hybrid otherwise). The result is evidence, questions for the veterinarian, uncertainty, disclaimers, and verified citations, never a clinical answer.
- The `pre-consultation` command (`briefing.py`) reuses the agent to gather cited evidence, adds the pet timeline, and assembles a structured Markdown briefing with suggested questions, points to confirm, and warning signs. It organizes information and never diagnoses or triages clinically.
- The `eval` command (`evaluation.py`) measures retrieval quality (hit rate and MRR over labeled queries) separately from safety classification accuracy. It builds a fresh, deterministic in-memory database from the seed data and defaults to the offline embedder, so evaluation is reproducible without external calls.
- Observability (`telemetry.py`) wraps each agent node in an OpenTelemetry span and emits a structured `agent_answer` log. It is off by default (a no-op with no cost) and is enabled per run with `ask --trace`, which writes spans and logs to stderr while keeping command output on stdout. Traces carry IDs, counts, intent, retrieval mode, and the safety decision, not raw document text.
- Prompt injection defense (`safety.detect_injection`) scans retrieved evidence for hijack patterns. Flagged chunks are surfaced in the answer with a disclaimer, and the system prompt instructs the model to treat document text as untrusted content. Retrieval always filters by `pet_id`, so one pet's evidence never leaks into another pet's answer.

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
