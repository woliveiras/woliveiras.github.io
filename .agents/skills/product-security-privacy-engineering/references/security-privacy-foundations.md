# Security and privacy foundations

## Build the model before selecting controls

Start from product behavior, not a generic vulnerability list:

1. Define actors, assets, sensitive data, environments, entrypoints, trust boundaries, privileges, and third parties.
2. Trace intended and unintended actions across boundaries. State the attacker or accidental actor's prerequisites and the consequence for confidentiality, integrity, availability, privacy, safety, and recovery.
3. Record existing preventive, detective, containment, and recovery controls together with the evidence that they operate.
4. Rank concrete abuse paths before proposing defense-in-depth. Prefer an enforceable control at the authoritative boundary and keep client controls as supplementary protection.
5. Convert material abuse paths into observable positive, negative, cross-identity, tenant-crossing, replay, failure, rollback, and recovery checks.

Threat categories are prompts, not findings. STRIDE, attack trees, misuse cases, ASVS chapters, and API or mobile lists can improve coverage, but none establishes exploitability or product-specific risk without evidence.

## Classify evidence and guidance

- **Standard:** a published requirements or control baseline. Tailor applicability and record the version; a mapping is not certification.
- **Platform guidance:** behavior or recommendations from the platform owner. Verify the installed versions and local configuration.
- **Empirical evidence:** reproducible observations from the actual or representative product, such as a negative authorization result or device trace. Record conditions and limitations.
- **Engineering heuristic:** a useful design or review rule, such as minimize exposed authority. Validate it against product requirements and failure modes.

Keep facts observed, requirements, hypotheses, empirical evidence, engineering heuristics, and unavailable evidence separate. Source or test presence is not runtime proof. Absence of an observed exploit is not proof of security.

## Select proportional controls

For each abuse case, consider prevention, least privilege, secure defaults, input/output validation, isolation, replay resistance, resource bounds, observability without sensitive payloads, safe failure, containment, recovery, and deletion. State what the control protects, where it is enforced, how it can fail, and how the failure is detected and recovered.

Preserve usable recovery, accessibility, data integrity, and supported behavior. A control that locks out legitimate users, destroys recoverable data, or silently drops work introduces product risk that must be tested.

## Primary sources

- **Standard:** [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/) — current web-application control requirements; cite exact version and requirement when used.
- **Standard:** [NIST Secure Software Development Framework 1.1, SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final) — risk-based secure development practices. A newer draft must remain labeled draft until final.
- **Standard / privacy risk framework:** [NIST Privacy Framework](https://www.nist.gov/privacy-framework/privacy-framework) — voluntary privacy-risk outcomes; confirm whether a cited revision is final or a public draft.

These sources inform requirements and coverage. They do not replace product evidence, legal interpretation, or independent assurance.
