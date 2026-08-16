# Regulated data and compliance claims

## Separate external requirements from engineering evidence

LGPD, GDPR, HIPAA, contracts, internal policies, regulator guidance, and sector rules can supply external requirements. Record the exact source, jurisdiction or scope, owner, version or effective date, interpretation authority, and technical acceptance criteria. Ask qualified legal, privacy, compliance, security, and domain owners to resolve interpretation.

Do not declare that a product is LGPD, GDPR, or HIPAA compliant. Do not certify a product, provide legal certification, or convert a checklist into legal advice. This skill is not legal advice. A technical control, test, scanner result, ASVS mapping, privacy-framework profile, or absence of findings does not establish compliance.

## Produce bounded technical outputs

Acceptable outputs include:

- a sensitive-data lifecycle and trust-boundary map;
- technical controls traced to explicitly supplied external requirements;
- gaps between observed implementation and technical acceptance criteria;
- evidence available, evidence unavailable, and owner-required decisions;
- retention, consent-state, export, deletion, access, logging, incident, and recovery tests;
- wording such as “this bounded technical check passed under these conditions,” never an organizational or legal conclusion.

Separate four categories in the report:

1. confirmed technical finding supported by observed evidence;
2. hardening opportunity or engineering heuristic;
3. external requirement awaiting authoritative interpretation or ownership;
4. unknown or unavailable legal, organizational, vendor, runtime, production, audit, or assurance evidence.

Avoid collecting regulated or personal data as evidence. Use categories, schemas, synthetic fixtures, counts, hashes where appropriate, and redacted locations. Do not paste records, patient or customer details, secrets, identifiers, or incident payloads into prompts or reports.

## Framework interpretation

- **Standard / privacy risk framework:** [NIST Privacy Framework](https://www.nist.gov/privacy-framework/privacy-framework) supports voluntary privacy-risk management and does not create a legal certification.
- **Standard:** [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) can structure web-control requirements and verification, not legal compliance.
- **Standard:** [NIST SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final) supplies secure-development practices, not product certification.

Label final standards, drafts, platform guidance, empirical evidence, and engineering heuristic accurately. Confirm current versions before making a time-sensitive claim.
