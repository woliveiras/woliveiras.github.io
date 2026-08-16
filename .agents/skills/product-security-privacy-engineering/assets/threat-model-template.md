# Product threat model

## Scope and authority

- Objective and requested artifact:
- Product, platforms, versions, and environments:
- Authorized implementation or verification:
- Remote, production, destructive, and external actions withheld:

## Evidence boundary

| Item | Class: fact observed, requirement, hypothesis, empirical evidence, engineering heuristic, or unavailable evidence | Location or source | Limitation |
| --- | --- | --- | --- |

Never paste secrets, tokens, credentials, personal records, private payloads, or canaries into this artifact.

## Actors, assets, and sensitive data

| Actor or service identity | Goal | Assets or data reached | Current privilege | Intended privilege |
| --- | --- | --- | --- | --- |

## Trust boundaries and entrypoints

| Boundary or entrypoint | From / to | Authentication | Authorization owner | Validation | Environment or third party |
| --- | --- | --- | --- | --- | --- |

## Abuse cases before controls

| Abuse case | Preconditions | Path across boundaries | Consequence | Existing control and evidence | Unknowns |
| --- | --- | --- | --- | --- | --- |

Cover cross-user and tenant crossing, IDOR, enumeration, replay, privilege escalation, administrative and service identities, recovery abuse, resource exhaustion, and unsafe third parties where applicable.

## Prioritized controls and verification

| Priority | Abuse case | Authoritative control | Defense-in-depth | Negative check or mutant | Detection, containment, and recovery | Residual risk |
| --- | --- | --- | --- | --- | --- | --- |

## Claim limits and external actions

- Confirmed findings:
- Hardening opportunities:
- External requirements needing an owner:
- Unknowns and unavailable evidence:
- External actions not executed:
- Security or compliance claims explicitly not established:
