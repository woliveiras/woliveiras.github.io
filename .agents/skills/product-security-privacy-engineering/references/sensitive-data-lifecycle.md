# Sensitive-data lifecycle

## Trace data, not only databases

For every sensitive data category, record the purpose, affected people, source, collection trigger, validation, processing, derived data, authoritative storage, encryption and key boundary, access and tenant policy, logs, telemetry, caches, devices, temporary files, search indexes, queues, exports, backups, third party sharing, retention trigger and duration, deletion path, and verification evidence.

Apply data minimization to fields, precision, frequency, audience, environments, copies, and retention. Do not collect or preserve data because it might become useful. A hash or pseudonym may remain personal or linkable data; state its threat model rather than calling it anonymous automatically.

## Consent and product preferences

Separate the external requirement from the technical state machine. Define purpose, version, actor, acquisition evidence, current choice, withdrawal, changed-purpose behavior, downstream effect, and failure recovery. `product-ui-ux-design` may own the consent interface and visible recovery; this skill owns the risk, data, authorization, propagation, and protection requirements.

Consent is not a substitute for minimization, security, contractual authority, or another required basis. Do not dark-pattern acceptance or make withdrawal technically ineffective.

## Secrets, logs, caches, backups, and third parties

- Keep credentials, API keys, signing keys, database strings, tokens, and recovery material in an appropriate secret boundary; scope, rotate, revoke, audit access, and prevent client or log exposure.
- Do not print secrets. Do not expose real sensitive data. Sensitive data is not evidence. Prefer bounded identifiers, categories, counts, and synthetic examples.
- Define a logging schema and redaction before collection. Treat logs, traces, crash reports, analytics, alerts, support bundles, and test artifacts as sensitive stores with access, retention, integrity, deletion, and incident paths.
- Give caches an owner, key scope, tenant scope, invalidation trigger, persistence classification, maximum lifetime, logout/deletion behavior, and stale-data failure policy.
- Define backup content, encryption/key recovery, restore authority, retention, legal or incident hold inputs, deletion delay, and post-restore reconciliation. Never claim immediate deletion when protected backups expire later.
- Inventory third parties, SDKs, subprocessors or integrations, transferred fields, purpose, environment, credentials, authorization, region if externally required, retention/deletion interface, failure behavior, and offboarding verification.

## Retention, export, and deletion

Make retention event-driven and bounded: creation or last required event, explicit duration, archive transition, hold owner, deletion trigger, retry, monitoring, and evidence. “Indefinite” is an unresolved high-exposure design, not a default.

Exports must authorize the requesting actor and scope, generate from the authoritative tenant boundary, protect staging and download, expire access, prevent enumeration, and report partial failure. Deletion must cover primary records, derived data, indexes, queues, caches, devices, integrations, analytics, logs where applicable, and backup expiry or tombstone/reconciliation. Verify retries, rollback, restored backups, and incomplete deletion without resurrecting ordinary access.

## Sources

- **Standard / privacy risk framework:** [NIST Privacy Framework](https://www.nist.gov/privacy-framework/privacy-framework) for identifying and managing privacy risk; confirm final versus draft status.
- **Standard:** [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) for data protection, logging, secrets, and lifecycle-related verification requirements.
- **Engineering guidance:** [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) for security logging and data exclusion.

These sources do not determine product purpose, retention law, or legal basis. Obtain authoritative external requirements and legal review separately.
