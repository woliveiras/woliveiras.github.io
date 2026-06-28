# Post Briefs

## Part 1: Foundations of RAG and Agents

### 1. Why Agents Need RAG

Objective: explain the knowledge problem in LLMs.

Cover model knowledge limits, hallucination, private data, user documents, grounding, external knowledge, and why veterinary clinics are a good scenario for studying RAG.

Central example: a tutor or clinic team member sends exams, prescriptions, and observed signs. The agent needs to organize that information for a veterinary consultation without inventing a diagnosis.

### 2. The Classic RAG Pipeline

Objective: introduce the base flow from documents to grounded answers.

Cover parsing, OCR, normalization, embeddings, vector databases, retrieval, grounded answers, and citations.

Example question: "Which veterinary events happened after the feeding change?"

### 3. RAG Is Not Just a Vector Database

Objective: break the simplified view that RAG equals vector search.

Show when to use vector search, keyword search, SQL, graph retrieval, APIs, relational storage, event stores, and object storage.

Main message: in real systems, RAG is an architecture for knowledge access, not just a vector query.

### 4. From Simple RAG to Agentic RAG

Objective: show the difference between a chatbot with search and an agent with active retrieval.

Cover query rewriting, multi-hop retrieval, corrective RAG, adaptive RAG, agents that decide when to search, and agents that verify whether retrieval was sufficient.

## Part 2: Knowledge Design

### 5. Ingesting Sensitive Documents

Objective: handle real veterinary documents.

Cover vaccination cards, veterinary reports, consultation history, exams, prescriptions, weight records, feeding notes, and events such as vomiting, pain, diarrhea, and apathy.

Technical points: parsing, OCR, structured extraction, validation, date normalization, original file preservation, and secure storage.

### 6. Domain-Oriented Chunking

Objective: explain why token-based chunking is not enough.

Use examples such as lab exams and veterinary consultations. Show that good chunking preserves the domain decision unit.

### 7. Metadata, Temporality, and Provenance

Objective: handle time, source, and reliability.

Cover document date, event date, upload date, source, author, document type, language, related animal, extraction confidence, version, validity, and permissions.

Main message: in veterinary clinics, almost every important question depends on time, source, and context.

### 8. Memory in Agents for Veterinary Clinics

Objective: separate memory from documents.

Cover working memory, episodic memory, semantic memory, user memory, pet memory, and external knowledge. Explain why not every memory belongs in a vector database.

## Part 3: Advanced Retrieval

### 9. Semantic, Lexical, and Hybrid Search

Objective: compare retrieval strategies.

Cover dense retrieval, sparse retrieval, BM25, hybrid search, metadata filtering, query expansion, multi-query retrieval, HyDE, and temporal retrieval.

Example: "Does the report mention anemia?" may require keyword search, while "Which symptoms are similar to previous notes?" may require semantic search.

### 10. Reranking and Context Building

Objective: improve the quality of context sent to the model.

Cover reranking, cross-encoders, contextual compression, parent document retrieval, deduplication, ordering by relevance and time, token control, and citations.

### 11. RAG with Structured Data

Objective: show when SQL is better than embeddings.

Use veterinary examples such as monthly weight, vaccines, medications, feeding, clinical events, and veterinary visits.

Example question: "When was my cat's last vaccine?"

### 12. GraphRAG for Relations, Events, and Timelines

Objective: show how to represent relations.

Use a graph where a pet took vaccines, had clinical events, received medication, eats a food, and visited a veterinarian.

Example questions: "Which symptoms started after the food change?" and "Did the weight drop after the last treatment?"

### 13. Multimodal RAG

Objective: cover complex documents.

Cover PDFs, images, scanned exams, tables, charts, OCR, complex layouts, VLMs, multimodal embeddings, and citations of pages or regions.

## Part 4: Agentic RAG Architecture

### 14. Agent Architectures with RAG

Objective: present the reference architecture.

Cover orchestrator, intent classifier, safety check, retriever router, context builder, safety layer, answer generator, verifier, citations, and uncertainty.

### 15. Routing Sources and Tools

Objective: teach the agent to choose the right source.

Use examples such as document questions, vaccine date questions, timeline questions, veterinary term explanations, and urgent safety questions.

### 16. Safety Layers and Guardrails

Objective: design safe answers.

Cover urgent triage, scope limits, uncertainty, fact versus inference, no diagnosis, no prescription, no medication changes, escalation to a professional, and specialist review.

### 17. Veterinary Pre-Consultation Agents

Objective: show a high-value clinic use case with low risk when the system only organizes information and prepares the consultation.

Output should be a consultation briefing with reason, timeline, medications, relevant exams, recent changes, suggested questions, warning signs, and attached documents.

### 18. Internal Agents for Clinics and Teams

Objective: explore professional use inside clinics.

Cover reception, support for tutors, history search, consultation preparation, permissions, audit, multi-tenancy, logs, confidentiality, and role-based access.

## Part 5: Production, Evaluation, and Security

### 19. Evaluating RAG in Sensitive Domains

Objective: measure quality and safety.

Cover retrieval precision, retrieval recall, answer relevance, context relevance, groundedness, faithfulness, citation accuracy, latency, cost, hallucination rate, warning signs, unsafe recommendations, evidence insufficiency, and specialist evaluation.

### 20. Observability, Tracing, and Debugging

Objective: make the system debuggable.

Log original question, detected intent, generated queries, chosen source, retrieved documents, scores, final context, answer, citations, safety decision, cost, latency, and feedback.

### 21. Privacy, Consent, and Governance

Objective: handle sensitive data.

Cover consent, data minimization, encryption, user segregation, RBAC, ABAC, logs without PII, audit, retention, deletion, right to be forgotten, anonymization, pseudonymization, GDPR, LGPD, and professional sharing.

Core rule: the agent must never retrieve a document that the user could not manually open.

### 22. Prompt Injection in Documents

Objective: treat documents as untrusted data.

Use the scenario of a PDF that instructs the agent to ignore previous instructions and exfiltrate tutor or animal data.

Cover document prompt injection, malicious PDFs, contaminated OCR, data exfiltration, tool abuse, separation between instructions and content, allowlists, policy engines, and validation before external actions.

### 23. Scalability, Cost, and Performance

Objective: discuss production concerns.

Cover embedding cost, reranking cost, generation cost, caching, semantic cache, batch ingestion, queues, incremental indexing, embedding versioning, latency, cold starts, model choice, local versus cloud models, storage, and multi-tenancy.

### 24. Common Anti-Patterns

Objective: consolidate mistakes to avoid.

Cover putting everything in the vector database, token-only chunking, missing metadata, not evaluating retrieval separately, missing citations, missing safety layer, allowing diagnosis or prescription, ignoring prompt injection, missing permissions, not versioning documents, not measuring cost, not observing traces, and using an agent when a simple pipeline would be enough.

