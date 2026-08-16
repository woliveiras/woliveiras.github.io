# Incident containment and recovery

## Establish authority and safety

Separate a confirmed incident from a suspected exposure, unsafe condition, vulnerability report, or exercise. Identify the incident owner, affected product and environments, exact authority, communication boundary, safety constraints, how to preserve evidence, and the recovery objective before acting.

Do not execute production access, account suspension, session revocation, secret rotation, external scan, penetration test, traffic block, deployment, rollback, data deletion, or remote mutation without exact authorization. Prefer a reversible containment path and state expected user and operational impact.

## Contain proportionally

Choose the smallest control that limits the credible path while preserving evidence and critical recovery:

- disable or narrow the affected feature, endpoint, integration, role, service identity, token audience, or tenant path;
- revoke sessions or credentials at the authoritative issuer and identify stale/offline behavior;
- rotate an exposed secret with an overlap, consumer inventory, validation, revocation, and rollback plan;
- stop unsafe logging or sharing without destroying necessary evidence;
- isolate affected jobs, queues, caches, exports, or third parties and prevent replay or duplicate side effects;
- preserve timestamps, versions, bounded logs, hashes, and decisions without copying secrets or real sensitive payloads into reports.

Do not silently “fix forward” before deciding which evidence is needed. Do not preserve excessive personal data in the name of investigation.

## Eradicate, recover, and verify

Define the root-cause confidence separately from containment. Add fail-first regression checks for the confirmed or credible path, implement only when authorized, and verify authentication, authorization, tenancy, data integrity, replay, error, rollback, recovery, monitoring, and deletion consequences.

Recovery includes configuration and code, credentials and sessions, caches and queues, restored backups, third parties, affected user paths, administrative access, and a safe route to resume service. Validate rollback before rollout where feasible. Watch for re-entry, incomplete rotation, replayed work, resurrected data, and user lockout.

Report facts observed, timeline confidence, containment executed, actions withheld, evidence preserved, confirmed findings, hypotheses, affected-data uncertainty, residual risk, recovery checks, and follow-up owners. Never claim a production incident, compromise, eradication, or recovery that was not empirically verified.

## Source

- **Standard / incident guidance:** [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final) integrates incident response with cybersecurity risk management.

Platform guidance for revocation, rotation, rollback, and audit behavior must match the product's current identity, cloud, mobile, and deployment platforms. General containment patterns are engineering heuristics until validated in context.
