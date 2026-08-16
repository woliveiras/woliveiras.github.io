# Identity, authorization, and tenancy

## Separate the decisions

Authentication is not authorization. Model each request as separate decisions:

- authentication: which human or service identity is presented, by which mechanism, at what assurance and session state;
- authorization: whether that identity may perform this action on this object now;
- ownership: how the authoritative object relationship is resolved without trusting a client-supplied owner or tenant;
- tenancy: which tenant boundary governs lookup, mutation, aggregation, jobs, caches, exports, logs, and administration;
- privilege: which user, administrator, worker, integration, or service role owns the minimum required capability.

Do not infer an authorization result from a valid token, hidden UI, route membership, opaque identifier, or tenant claim alone. Re-resolve server-side subject, object, action, tenant, state, and policy for every protected operation.

## Threat-model the lifecycle

Cover sign-up, invitation, login, federation, session renewal, logout, password/passkey or factor change, account linking, recovery, lockout, deactivation, deletion, administrator support, service identity rotation, and incident revocation. Test stale and concurrent sessions after role, ownership, tenant, and recovery changes.

For OAuth/OIDC, validate exact issuer, audience, redirect URI, client, nonce/state or equivalent transaction binding, PKCE where applicable, token lifetime, refresh rotation or sender constraint, and server-side privilege. Do not put bearer tokens in URLs or logs.

## Adversarial matrix

Test at least anonymous, wrong user, same tenant but non-owner, other tenant, suspended user, former owner, minimum role, administrator, service role, expired/revoked session, and replayed request where applicable. Cover reads, writes, lists, searches, aggregates, exports, file/object paths, background jobs, batch operations, and error responses.

- **IDOR / object authorization:** change direct and nested object identifiers while holding identity constant.
- **Tenant crossing / cross-tenant access:** vary tenant context, object ownership, cache keys, job payloads, and administrative paths. Tenant isolation requires test or runtime evidence, not a schema column.
- **Enumeration:** compare status, body shape, timing class, pagination, and recovery flows without leaking object or account existence.
- **Replay:** repeat transaction, callback, webhook, recovery, invitation, and privileged action inputs. Define idempotency, freshness, single-use state, and rollback.
- **Elevation of privilege:** mutate roles, claims, function paths, object properties, or service credentials; test deny-by-default and least privilege.
- **Service role:** scope secrets and runtime permissions to one purpose; reject service-role excess and client exposure.

## Sources

- **Standard:** [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) for authentication, session, and authorization verification requirements.
- **Standard / best current practice:** [IETF RFC 9700, Best Current Practice for OAuth 2.0 Security](https://datatracker.ietf.org/doc/rfc9700/) for redirect, replay, token privilege, and flow protections.
- **Engineering guidance:** [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). Apply it to the actual policy model and verify negative paths.

Platform guidance and engineering heuristics still require empirical evidence from the product. Tests do not prove universal isolation or security.
