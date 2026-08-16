# Sensitive-data lifecycle

## Scope and classification

- Product capability and purpose:
- Actors and affected people:
- Data categories and sensitivity:
- Source requirements and owners:
- Environments and third parties:

Use categories and synthetic examples. Do not include real records, secrets, tokens, or identifiers.

## Lifecycle map

| Data category | Collection and purpose | Processing and derivation | Storage and encryption boundary | Logs and telemetry | Caches and devices | Backups | Sharing and third parties | Retention trigger and duration | Export | Deletion and verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Authorization and consent

| Action | Actor | Authentication | Authorization, ownership, and tenant rule | Consent or preference state | Revocation effect |
| --- | --- | --- | --- | --- | --- |

## Failure and recovery paths

| Event | Immediate protection | Retry or rollback | User-visible recovery owner | Derived data or backup consequence | Verification evidence |
| --- | --- | --- | --- | --- | --- |

Cover interrupted deletion, stale caches, delayed backup expiry, export partial failure, consent withdrawal, third-party failure, restored backups, and incident containment.

## Evidence limits

- Facts observed:
- Requirements:
- Hypotheses:
- Unavailable runtime, production, legal, or organizational evidence:
- External operations not executed:
