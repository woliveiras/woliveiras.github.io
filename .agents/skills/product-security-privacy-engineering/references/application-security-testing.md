# Application security testing

## Derive checks from abuse cases

For each material abuse case, define the precondition, controlled actor and data, operation, expected deny or safe failure, authoritative state to inspect, side effects that must not occur, detection signal, rollback, and recovery. Use synthetic identities and records; never expose production or real sensitive data for test convenience.

Create a layered verification set:

- unit or policy tests for pure decisions and deny-by-default behavior;
- integration tests at the real authorization, persistence, cache, queue, or third-party boundary;
- API/UI tests for positive, unauthenticated, unauthorized, wrong-owner, cross-tenant, minimum-role, admin, and service-role paths;
- property or fuzz tests for parsers, identifiers, state transitions, and bounded resource behavior;
- static review and SAST for source patterns; dependency, secret, IaC, and mobile package analysis for their specific surfaces;
- dynamic analysis or penetration testing only against an explicitly authorized target, scope, identity, data set, rate, time window, and recovery process.

## Required negative and adversarial paths

Cover negative tests for IDOR, tenant-crossing, privilege escalation, enumeration, replay, duplicate side effects, stale/revoked sessions, administrative paths, service-role excess, malformed input, injection, SSRF destination changes, resource exhaustion, sensitive logging, cache key isolation, incomplete export/deletion, error behavior, partial failure, rollback, and recovery as applicable.

A fail-first check must fail for the intended abuse before the control changes. Verify it rejects a no-op and at least one credible mutant, such as removing ownership, changing tenant scope, widening a role, logging a token, accepting a replay, skipping derived-data deletion, or replacing a bounded retention rule with indefinite storage.

## Interpret tools honestly

Tests do not prove security. A scanner does not prove security. Code review, SAST, DAST, dependency analysis, fuzzing, WSTG or MASTG procedures, and ASVS mappings each cover bounded surfaces with false positives, false negatives, configuration assumptions, and runtime limits.

Record tool and version, target and build, rules or tests, authenticated roles, data set, environment, network and production authority, findings reviewed, exclusions, unavailable evidence, and whether remediation was reverified. Treat scanner findings as candidate findings until a product-specific path and consequence are supported.

CI skills own scanner and gate execution. This skill owns threat-derived coverage, interpretation, negative scenarios, and claim limits. Do not install tools or upload source, traces, binaries, or data without authorization.

## Sources

- **Standard:** [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) for verifiable control requirements.
- **Testing guidance:** [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) and [OWASP MASTG](https://mas.owasp.org/MASTG/).
- **Standard:** [NIST SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final) for risk-based verification and vulnerability response practices.

Classify actual test results as empirical evidence, published control requirements as standard, vendor procedures as platform guidance, and generalized test ideas as engineering heuristic.
