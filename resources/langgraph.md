# LangGraph Resource Notes

## Metadata

- Source: LangGraph documentation.
- Official URL: https://docs.langchain.com/oss/python/langgraph/overview
- Checked on: 2026-06-28.
- Relevant posts: 4, 8, 14, 15, 16, 17, 18, 25-28.
- What to use this for: graph structure, state, routing, persistence, memory, and agent orchestration.
- What not to use this for: LangGraph Platform deployment or hosted agent server architecture.

## Notes for VetSupport

Use LangGraph to make the agent flow explicit:

- state object carries the question, pet context, retrieved evidence, safety status, and final answer;
- nodes perform classification, retrieval, context building, safety review, answer generation, and verification;
- conditional edges route by intent and safety result;
- persistence/checkpointing can support debugging and replaying agent runs.

Keep the first implementation small. A useful graph for the series can start with:

```text
input
  -> classify_intent
  -> route_retrieval
  -> build_context
  -> safety_check
  -> generate_answer
  -> verify_answer
  -> output
```

Use state deliberately. Do not hide important behavior inside one large node. Each node should be explainable in a post and observable in traces.

Memory should be explicit:

- short-term memory for the current run;
- durable facts in SQL or events;
- source documents in storage and indexes;
- external knowledge as curated sources.

Do not teach production deployment through LangGraph Platform in the main path. The series uses a local agent harness.

## Series Rules

- Route retrieval tools based on intent.
- Keep safety checks as graph behavior, not just prompt text.
- Log node inputs, outputs, and decisions.
- Prefer deterministic validation around agent boundaries.
- Re-check docs before publishing code that depends on current LangGraph APIs.

## Useful Official Pages

- Overview: https://docs.langchain.com/oss/python/langgraph/overview
- Graph API: https://docs.langchain.com/oss/python/langgraph/graph-api
- Persistence: https://docs.langchain.com/oss/python/langgraph/persistence
- Add memory: https://docs.langchain.com/oss/python/langgraph/add-memory
- Workflows and agents: https://docs.langchain.com/oss/python/langgraph/workflows-agents
- Agentic RAG tutorial: https://docs.langchain.com/oss/python/langgraph/agentic-rag

