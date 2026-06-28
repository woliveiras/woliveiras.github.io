# pgvector and Retrieval Resource Notes

## Metadata

- Source: pgvector documentation.
- Official URL: https://github.com/pgvector/pgvector
- Checked on: 2026-06-28.
- Relevant posts: 2, 3, 9, 10, 11, 12, 13, 23, 25-28.
- What to use this for: vector search, approximate indexes, hybrid retrieval, and retrieval trade-offs in PostgreSQL.
- What not to use this for: model provider guidance or clinical source quality.

## Notes for VetSupport

Use pgvector to keep the learning project simple: PostgreSQL can hold structured facts, document metadata, chunks, embeddings, and retrieval logs in one place.

Represent each chunk with:

- chunk ID;
- source document ID;
- pet ID;
- event/document dates;
- text;
- metadata;
- embedding vector;
- extraction confidence when available.

Use vector search for semantic similarity. Use PostgreSQL full-text search for exact terms and lexical matching. Use SQL filters for tenant, pet, document type, date, role, and permissions.

Teach hybrid retrieval as a controlled composition:

1. filter candidates by metadata and permissions;
2. run vector and/or lexical search;
3. merge or rerank results;
4. build a small cited context.

For indexes, explain the trade-off:

- exact search is simpler and useful for small local demos;
- HNSW and IVFFlat are approximate index options for larger datasets;
- index choice affects build cost, query speed, memory, and recall.

Do not over-optimize early. Start with correctness, citations, and evaluation before performance tuning.

## Series Rules

- Always preserve source metadata with retrieved chunks.
- Evaluate retrieval separately from answer generation.
- Do not retrieve documents the user or role cannot access.
- Prefer small, relevant, ordered context over large context.
- Re-check pgvector docs before publishing index DDL.

## Useful Official Pages

- pgvector GitHub: https://github.com/pgvector/pgvector
- PostgreSQL full-text search: https://www.postgresql.org/docs/current/textsearch.html
- PostgreSQL indexes: https://www.postgresql.org/docs/current/indexes.html

