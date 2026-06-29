# OpenAI Resource Notes

## Metadata

- Source: OpenAI API documentation.
- Official URL: https://developers.openai.com/api/docs
- Checked on: 2026-06-28.
- Relevant posts: 2, 10, 14, 16, 19, 22, 23, 25-28.
- What to use this for: LLM calls, embeddings, structured outputs, tool calling, evals, and safety-oriented response patterns in VetSupport.
- What not to use this for: provider-neutral theory, veterinary clinical claims, or long copied examples from the docs.

## Notes for VetSupport

Use OpenAI as the default provider in the series. Keep a small abstraction only when it makes the examples cleaner; do not introduce provider switching as a central topic.

Use the Responses API as the main mental model for model calls. Treat tool calls and model output as events/items in an agent run, not as one opaque chat response.

Use embeddings for semantic retrieval over document chunks. Store embedding model name, dimensions, creation time, and source document metadata so indexes can be rebuilt when models or chunking change.

Use structured outputs when VetSupport needs stable machine-readable outputs, such as:

- extracted document fields;
- consultation briefing sections;
- safety classification;
- retrieval evaluation records;
- citation metadata.

Use tool calling for controlled access to retrieval tools:

- vector search;
- lexical search;
- SQL lookup;
- timeline lookup;
- graph lookup;
- curated source lookup.

Each tool should have a narrow schema and should return facts, citations, and uncertainty signals. The model should not directly access arbitrary database operations.

Use evals for repeatable checks before changing prompts, retrieval, models, or safety policies. For the series, local evaluation datasets are enough; do not make hosted eval infrastructure a requirement.

## Series Rules

- Model output that affects safety should be parsed or validated before use.
- Do not rely on prompting alone for safety boundaries.
- Preserve citations and source IDs through the full response path.
- Treat model refusals and uncertainty as normal outcomes, not errors.
- Re-check the official docs before publishing API-specific code.

## Useful Official Pages

- API docs: https://developers.openai.com/api/docs
- Structured outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- Function calling: https://developers.openai.com/api/docs/guides/function-calling
- Tools: https://developers.openai.com/api/docs/guides/tools
- Embeddings: https://developers.openai.com/api/docs/guides/embeddings
- Evals: https://developers.openai.com/api/docs/guides/evals

