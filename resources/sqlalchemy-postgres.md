# SQLAlchemy and PostgreSQL Resource Notes

## Metadata

- Source: SQLAlchemy documentation and PostgreSQL documentation.
- Official URL: https://docs.sqlalchemy.org/en/20/
- Checked on: 2026-06-28.
- Relevant posts: 3, 7, 8, 11, 14, 18, 21, 25-28.
- What to use this for: persistence, seed data, relational modeling, SQL retrieval, transactions, and permissions.
- What not to use this for: vector index implementation details; use `pgvector-retrieval.md` for that.

## Notes for VetSupport

Use PostgreSQL as the primary store for structured data:

- clinics;
- users/tutors;
- pets;
- documents;
- document chunks;
- veterinary events;
- vaccines;
- medications;
- weights;
- retrieval and agent run logs.

Use SQLAlchemy 2.x style consistently. Keep sessions short-lived and scoped to one harness command or unit of work.

For seed commands:

- reset deterministically;
- insert fixtures in a stable order;
- keep IDs stable enough for examples;
- avoid hidden external dependencies.

For SQL retrieval:

- use SQL for dates, counts, state, filters, permissions, and exact structured facts;
- use vector or lexical search for unstructured text;
- join retrieved facts back to document/source metadata for citations.

For transactions:

- commit only when a command succeeds;
- rollback on failures;
- avoid partially loaded document ingestion runs;
- log run IDs so failed ingestion can be debugged.

## Series Rules

- Treat SQL as part of RAG, not just application plumbing.
- Explain when SQL is better than embeddings.
- Include provenance columns where facts come from documents.
- Avoid designing a full SaaS schema in early posts.
- Re-check SQLAlchemy docs before publishing API-specific code.

## Useful Official Pages

- SQLAlchemy 2.0 docs: https://docs.sqlalchemy.org/en/20/
- ORM docs: https://docs.sqlalchemy.org/en/20/orm/
- Session basics: https://docs.sqlalchemy.org/en/20/orm/session_basics.html
- Transactions: https://docs.sqlalchemy.org/en/20/orm/session_transaction.html
- PostgreSQL docs: https://www.postgresql.org/docs/

