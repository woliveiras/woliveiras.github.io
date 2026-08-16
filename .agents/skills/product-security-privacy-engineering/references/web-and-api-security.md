# Web and API security

## Map browser and API trust boundaries

Inventory pages, routes, API versions, GraphQL or RPC operations, WebSockets, webhooks, uploads, redirects, service workers, browser storage, cookies, caches, proxies, internal services, and third parties. Identify which boundary authenticates, authorizes, validates, rate-bounds, logs, and handles failure.

Verify server-side controls for every entrypoint, not only the primary UI path:

- object-, property-, and function-level authorization for reads, writes, lists, bulk operations, exports, and administration;
- session cookies, CSRF defenses, token storage, logout and revocation, origin/CORS policy, redirects, clickjacking protection, and sensitive caching;
- canonical parsing and allowlisted validation before SQL, template, shell, filesystem, header, deserialization, or browser sinks;
- output encoding and a proportionate Content Security Policy for XSS defense-in-depth;
- SSRF-resistant destination policy, DNS/IP interpretation, redirect handling, egress, credentials, and response limits;
- upload content, size, parser, storage, retrieval, active content, malware-handling, and deletion boundaries;
- bounded pagination, search, authentication, password recovery, invitations, resource-intensive queries, sensitive business flows, and webhook retries;
- inventory and lifecycle for old API versions, debug endpoints, generated docs, third-party callbacks, and shadow routes.

## Abuse, replay, and errors

Build abuse cases for IDOR/BOLA, cross-tenant lists or caches, mass assignment, enumeration, credential stuffing, recovery takeover, replayed payments or webhooks, duplicate side effects, resource exhaustion, unsafe redirects, third-party compromise, and inconsistent policy across sibling endpoints.

Make errors actionable without exposing stack traces, secrets, internal identifiers, policy details, or account/object existence. Log a bounded correlation identifier and security-relevant outcome rather than request bodies, tokens, or personal data.

## Verification

Use synthetic accounts and objects for at least two tenants and multiple roles. Verify positive and negative paths with the same endpoint and controlled identity/object changes. Include concurrency, retries, stale sessions, partial failure, rollback, and recovery. Static review, scanner output, and a passing happy path are insufficient.

External scanning or penetration testing requires explicit target, scope, rate, data, network, credential, time-window, and incident-contact authorization. Never point a test at production by implication.

## Sources

- **Standard:** [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) for verifiable web control requirements.
- **Engineering risk reference:** [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) for API abuse coverage; it does not perform product risk analysis.
- **Testing guidance:** [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) for test ideas and evidence collection.
- **Platform guidance:** inspect the current browser, framework, gateway, and deployment documentation actually used by the product.

Classify observed request results as empirical evidence and generalized patterns as engineering heuristics. Neither establishes legal compliance or absence of other vulnerabilities.
