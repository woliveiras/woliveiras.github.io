# Editorial Proposal: Hands-on Agentic RAG

## Working Title

**Hands-on Agentic RAG: building reliable agents for complex scenarios**

Subtitle:

**Developing AI agents with RAG for sensitive domains, with a focus on safety, traceability, and decision support.**

## Series Thesis

RAG in AI agents is not just semantic search. In sensitive domains, RAG is infrastructure for knowledge access, memory, safety, traceability, and decision support.

The series teaches this thesis through **VetSupport**, a local agent harness for veterinary clinics. VetSupport gives the reader a practical system they can run, inspect, and evolve without turning the series into a web application or SaaS build. The reader will seed realistic clinic data, ingest documents, retrieve evidence, run agents, evaluate outputs, and observe the system end to end.

The promise is practical and bounded:

> Teach readers how to build agents that retrieve knowledge, organize history, cite evidence, respect privacy, and support work without replacing professionals.

The series is not about building a chatbot that answers veterinary questions from memory. It is about building the retrieval, state, evaluation, and safety infrastructure around an agent so its answers are grounded, inspectable, and constrained.

## Audience

The primary audience is technical readers who already understand software engineering and want to go beyond simple RAG demos:

- AI Engineers.
- Software Engineers working with LLMs.
- Product Engineers building AI features.
- Developers experimenting with LangGraph, LlamaIndex, LangChain, or similar frameworks.
- Technical founders building pet tech, B2B SaaS for clinics, or products in regulated domains.
- Applied researchers interested in RAG, agents, and evaluation.

The reader should be comfortable with Python, APIs, databases, basic LLM concepts, embeddings, and software architecture. The series should not assume deep production experience with RAG, but it should also not slow down to teach programming fundamentals.

## Editorial Positioning

The series should feel like applied AI engineering, not a tool walkthrough.

The differentiation is:

> Learn to build reliable RAG agents for complex scenarios where context, safety, privacy, and traceability matter.

The veterinary clinic scenario gives the series a concrete domain with messy documents, structured records, timelines, privacy concerns, safety boundaries, and multiple user roles. It is specific enough to avoid generic examples, but familiar enough that readers can understand the value without domain training.

The tone should be technical but accessible. Each post should explain the architectural decision behind the implementation, not only the code. The writing should be direct, practical, and grounded in trade-offs. Personal experience can appear where it clarifies a decision, but the main voice should be engineering-focused.

Avoid hype. Avoid claims that agents are autonomous clinicians. Avoid drifting into human healthcare. The domain is veterinary clinics, and the technical lesson is Agentic RAG.

## Safety and Domain Limits

Every post must preserve this boundary:

> An agent for a veterinary clinic must not diagnose, prescribe, change medication, or replace veterinarians. It should organize information, retrieve evidence, cite sources, surface uncertainty, and support professional decision-making.

The system may:

- summarize documents;
- build timelines;
- retrieve relevant evidence;
- prepare consultation briefings;
- suggest questions to discuss with a veterinarian;
- flag missing information;
- escalate to urgent veterinary care when safety rules require it.

The system must not:

- confirm diagnoses;
- recommend treatments as definitive;
- prescribe medications;
- change dosage instructions;
- tell tutors to avoid professional care;
- hide uncertainty;
- retrieve documents the user or role would not be allowed to access manually.

Safety is not only a prompt. The series should repeatedly show safety as architecture: permissions before retrieval, narrow tools, explicit safety checks, validation, citations, auditability, and evaluation.

## Practical Project: VetSupport

VetSupport is the running project of the series.

It is a **local agent harness**, not a FastAPI backend, React UI, Next.js application, or SaaS product in the main path. The harness gives readers reproducible commands and visible outputs:

```sh
python -m agent_name.seed --scenario basic-clinic
python -m agent_name.ingest --pet-id luna ./samples/luna/
python -m agent_name.ask --pet-id luna "Which vaccines are overdue?"
python -m agent_name.pre_consultation --pet-id luna
python -m agent_name.eval --dataset prompt-injection
```

The harness should include:

- database schema;
- seed data for clinics, tutors, pets, documents, and events;
- reset and seed commands;
- document ingestion commands;
- retrieval commands;
- agent execution commands;
- evaluation commands;
- Markdown or text outputs for consultation briefings.

The main project is the **Veterinary Pre-Consultation Agent**. It transforms scattered information into a structured briefing for the veterinary team before the consultation.

Expected output:

```text
Veterinary consultation briefing
1. Main reason
2. Timeline
3. Relevant history
4. Documents used
5. Suggested questions
6. Points to confirm
7. Warning signs
```

Other practical projects support the same system:

- Veterinary History Agent.
- Internal Agent for Veterinary Clinics.
- Veterinary Education Agent.
- Roadmap from local prototype to product.

## Technical Stack

The stack should stay simple, realistic, and productive:

- Python.
- Pydantic.
- LangGraph for orchestration.
- SQLAlchemy.
- PostgreSQL.
- pgvector.
- Postgres full-text search.
- OpenAI as the LLM provider.
- OpenTelemetry and structured logs for observability.

The point is not to maximize tooling. The point is to teach durable patterns:

- SQL for structured facts, dates, state, and permissions.
- Vector search for semantic retrieval over chunks.
- Lexical search for exact terms and domain vocabulary.
- Metadata and provenance for traceability.
- LangGraph for explicit agent state, routing, and safety checks.
- Pydantic for typed inputs, outputs, and validation.
- OpenTelemetry for debuggable agent runs.

FastAPI, React, Next.js, hosted deployments, and SaaS concerns can appear only as future evolution. They should not be part of the main teaching path.

## Series Outline

### Part 1: Foundations of RAG and Agents

1. Why agents need RAG.
2. The classic RAG pipeline.
3. RAG is not just a vector database.
4. From simple RAG to Agentic RAG.

This part builds the mental model. The reader should understand why LLM knowledge is insufficient, what grounding means, why documents and private data matter, and how Agentic RAG differs from a simple search-then-answer pipeline.

### Part 2: Knowledge Design

5. Ingesting sensitive documents.
6. Domain-oriented chunking.
7. Metadata, temporality, and provenance.
8. Memory in AI agents.

This part turns messy veterinary clinic data into retrievable knowledge. It should emphasize that good RAG begins before retrieval: parsing, OCR, validation, chunking, dates, source tracking, confidence, and permissions.

### Part 3: Advanced Retrieval

9. Semantic, lexical, and hybrid search.
10. Reranking and context building.
11. RAG with structured data.
12. GraphRAG for relations, events, and timelines.
13. Multimodal RAG for PDFs, images, tables, charts, and OCR.

This part shows that retrieval is not one technique. The reader should learn when embeddings help, when SQL is better, when exact terms matter, how timelines change the answer, and why context construction is as important as search.

### Part 4: Agentic RAG Architecture

14. Agent architectures with RAG.
15. Routing sources and tools.
16. Safety layers and guardrails.
17. Veterinary pre-consultation agents.
18. Internal agents for clinics and teams.

This part turns retrieval into an agent workflow. The system should classify intent, route to the right retrieval source, build a compact context, apply safety checks, generate an answer, verify it, and return cited uncertainty-aware output.

### Part 5: Production, Evaluation, and Security

19. Evaluating RAG in sensitive domains.
20. Observability, tracing, and debugging.
21. Privacy, consent, and governance.
22. Prompt injection in documents.
23. Scalability, cost, and performance.
24. Common anti-patterns.

This part separates a demo from applied engineering. The focus is measurement, traces, privacy, document prompt injection, retrieval permissions, cost, and failure modes.

### Part 6: Practical Projects

25. Veterinary history agent.
26. Veterinary pre-consultation agent.
27. Veterinary education agent with trusted sources.
28. Roadmap from local prototype to real product.

This part consolidates the series into reusable projects and shows how the local harness could evolve into a product without making SaaS architecture the main path.

## Standard Post Shape

Most posts should follow this structure:

1. Problem.
2. Main concept.
3. Veterinary clinic scenario.
4. Architecture decision.
5. Implementation.
6. Risks.
7. Checklist.
8. Practical exercise.

Hands-on posts should include commands, expected output, what changed in the database or index, troubleshooting, and a conclusion. Conceptual posts should include a mental model, trade-offs, pitfalls, and a conclusion.

## Success Criteria

The series is successful if a reader can:

- explain why Agentic RAG requires more than vector search;
- ingest and model veterinary documents with metadata and provenance;
- combine vector, lexical, SQL, and timeline retrieval;
- build a local agent harness that runs reproducible commands;
- generate cited consultation briefings without diagnosis or prescription claims;
- evaluate retrieval and answer quality separately;
- trace agent runs and debug failures;
- defend the system against document prompt injection;
- explain how the prototype could evolve toward a product.

The series should leave the reader with a working local project and a stronger engineering model for building agents in domains where reliability matters.

