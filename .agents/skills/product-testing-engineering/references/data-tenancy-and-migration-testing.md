# Data, tenancy, and migration testing

## Test persistence at authoritative boundaries

Use synthetic records with explicit ownership and lifecycle. Verify persistence through a public repository, service, API, or database contract rather than private object shape alone. Cover constraints, defaults, nullability, ordering, pagination, transactions, rollback, retries, and failure recovery.

PostgreSQL defines observable transaction-isolation phenomena and serialization behavior. Treat this as **official platform guidance** for PostgreSQL, then verify the actual configured database and application retry contract: [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html).

## Tenancy

Construct at least two independent tenants and identities. For every sensitive operation, verify positive same-tenant access and negative cross-tenant access in both directions. Include list, direct identifier, search, export, background job, cache, object storage, and message boundaries where applicable. An empty result, denial, and absence of side effects can all be part of the independent oracle.

Never use production data or real data by default. Do not copy a real customer dataset to make a fixture realistic. Generate the minimum referentially valid data and keep canary values free of personal information.

## Migration and concurrency

For a migration, test supported old data, the new schema, malformed or boundary records, forward application, rollback or recovery, and mixed-version compatibility when relevant. Assert preserved business invariants and data, not only successful exit status.

For concurrency, orchestrate the interleaving instead of relying on timing. Verify lost-update, duplicate, serialization, lock, retry, and idempotency outcomes against the governing transaction contract. Make cleanup ownership explicit so parallel cases cannot remove each other's data.
