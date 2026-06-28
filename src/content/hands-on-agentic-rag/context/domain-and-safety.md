# Domain and Safety

## Domain Boundary

The domain is veterinary clinics.

Use examples involving:

- Pets.
- Tutors or owners.
- Veterinarians.
- Veterinary clinic teams.
- Vaccination records.
- Lab reports.
- Consultation history.
- Prescriptions.
- Weight records.
- Feeding changes.
- Events such as vomiting, pain, diarrhea, apathy, medication changes, and veterinary visits.

Do not shift the series into human healthcare. Do not use human medical examples as the main comparison. If a general safety principle applies across domains, explain it generically and bring it back to veterinary clinics.

## Core Safety Boundary

Every post should preserve this boundary:

> An agent for a veterinary clinic must not diagnose, prescribe, change medication, or replace veterinarians. It should organize information, retrieve evidence, cite sources, surface uncertainty, and support professional decision-making.

## Allowed Agent Behavior

The system may:

- Summarize documents.
- Build timelines.
- Retrieve relevant evidence.
- Prepare consultation briefings.
- Suggest questions to discuss with a veterinarian.
- Flag missing information.
- Escalate to urgent veterinary care when safety rules require it.

## Disallowed Agent Behavior

The system must not:

- Confirm diagnoses.
- Recommend treatments as definitive.
- Prescribe medications.
- Change dosage instructions.
- Tell tutors to avoid professional care.
- Hide uncertainty.
- Use documents the user or role would not be allowed to access manually.

## Safety Patterns

Useful response pattern:

```text
Based on the documents provided, I found these facts...
One point to discuss with the veterinarian is...
I cannot confirm a diagnosis.
Seek urgent veterinary care if...
Useful questions for the consultation...
```

System design patterns:

- Separate facts from inference.
- Cite evidence.
- Surface uncertainty.
- Use a safety layer before answer generation and before external actions.
- Escalate risky cases to a professional.
- Log safety decisions for debugging and evaluation.

