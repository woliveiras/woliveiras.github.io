# VetSupport Local Agent Harness

VetSupport is the local agent harness for the Hands-on Agentic RAG series.

The first milestone is intentionally small: create a portable Python project, run PostgreSQL with pgvector through Docker, load deterministic seed data for a fictional veterinary clinic, and inspect the seeded data through harness commands.

## Requirements

- Python 3.12+
- uv
- Docker

## 1. Start the Database

```sh
docker compose up -d postgres
```

Check that the database is healthy:

```sh
docker compose ps
```

Expected service:

```text
vetsupport-postgres-1   pgvector/pgvector:pg17   ...   Up ... (healthy)
```

## 2. Install Dependencies

```sh
uv sync
```

## 3. Seed the Basic Clinic Scenario

```sh
uv run python -m vetsupport seed --scenario basic-clinic
```

Expected output:

```text
Seeded scenario 'basic-clinic'
Clinics: 1
Tutors: 2
Pets: 3
Documents: 4
Events: 6
```

The seed command resets the local database and loads deterministic fictional data.

## 4. List Seeded Pets

```sh
uv run python -m vetsupport list-pets
```

Expected output:

```text
30000000-0000-0000-0000-000000000002 | Bento | dog, Mixed breed | tutor: Marco Silva
30000000-0000-0000-0000-000000000003 | Kassandra | cat, Siamese mix | tutor: Ana Martins
30000000-0000-0000-0000-000000000001 | Luna | cat, Domestic shorthair | tutor: Ana Martins
```

## 5. Inspect One Pet

```sh
uv run python -m vetsupport show-pet --pet-id 30000000-0000-0000-0000-000000000001
```

Expected output:

```text
Pet: Luna
ID: 30000000-0000-0000-0000-000000000001
Species: cat
Breed: Domestic shorthair
Birth date: 2020-05-12
Tutor: Ana Martins <ana@example.com>
Documents: 2
Events: 2
```

## 6. Ingest Local Documents

Sample documents live under `samples/` and use frontmatter for metadata:

```md
---
title: Luna Dental Follow-up
document_type: consultation_note
source: clinic_note
document_date: 2026-02-14
---

Luna returned for a dental follow-up...
```

Ingest Luna's sample documents:

```sh
uv run python -m vetsupport ingest --pet-id 30000000-0000-0000-0000-000000000001 samples/luna/
```

Expected output:

```text
Ingested documents for pet 30000000-0000-0000-0000-000000000001
Files: 2
Inserted: 2
Skipped: 0
```

Re-running the same command is safe. The documents are skipped because their IDs are deterministic:

```text
Ingested documents for pet 30000000-0000-0000-0000-000000000001
Files: 2
Inserted: 0
Skipped: 2
```

You can ingest the other sample folders too:

```sh
uv run python -m vetsupport ingest --pet-id 30000000-0000-0000-0000-000000000002 samples/bento/
uv run python -m vetsupport ingest --pet-id 30000000-0000-0000-0000-000000000003 samples/kassandra/
```

## 7. Show a Pet Timeline

```sh
uv run python -m vetsupport timeline --pet-id 30000000-0000-0000-0000-000000000001
```

Expected output:

```text
Timeline for Luna (30000000-0000-0000-0000-000000000001)
- 2025-03-15 [document:vaccination_record] Luna vaccination card
  Source: clinic_record
  Vaccination record for Luna. Rabies vaccine administered on 2025-03-15.
- 2025-03-15 [event:vaccination] Vaccination
  Source: clinic_record
  Rabies vaccine administered.
- 2026-01-10 [document:weight_record] Luna weight history
  Source: clinic_record
  Luna weight record: 4.2kg on 2025-10-10, 4.4kg on 2026-01-10.
- 2026-01-10 [event:weight_record] Weight Record
  Source: clinic_record
  Weight recorded at 4.4kg.
- 2026-02-14 [document:consultation_note] Luna Dental Follow-up
  Source: clinic_note
  Luna returned for a dental follow-up. The clinic team recorded that the tutor should discuss ongoing dental care with the veterinarian.
- 2026-02-20 [document:tutor_note] Luna Appetite Note
  Source: owner_note
  Ana reported that Luna had a reduced appetite for one evening and returned to normal eating the next morning. No diagnosis is recorded in this note.
```

## 8. Run Checks

```sh
uv run pytest
uv run ruff check .
```

Expected result:

```text
5 passed
All checks passed!
```

## 9. Validate the Docker Harness

Build the harness image after changing Python code:

```sh
docker compose build harness
```

```sh
docker compose run --rm harness seed --scenario basic-clinic
```

You can run the same inspection commands through Docker:

```sh
docker compose run --rm harness ingest --pet-id 30000000-0000-0000-0000-000000000001 samples/luna/
docker compose run --rm harness list-pets
docker compose run --rm harness show-pet --pet-id 30000000-0000-0000-0000-000000000001
docker compose run --rm harness timeline --pet-id 30000000-0000-0000-0000-000000000001
```

## 10. Stop the Database

```sh
docker compose down
```

To remove the database volume and reset all persisted data:

```sh
docker compose down -v
```

## Current Scope

This is not a web app. FastAPI, React, Next.js, and SaaS concerns are intentionally outside the main path for now.

The harness will grow through the series:

1. seed clinic data;
2. ingest documents;
3. index chunks;
4. retrieve evidence;
5. run agents;
6. evaluate and trace runs.
