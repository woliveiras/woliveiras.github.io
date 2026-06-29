# Pydantic Resource Notes

## Metadata

- Source: Pydantic documentation.
- Official URL: https://docs.pydantic.dev/latest/
- Checked on: 2026-06-28.
- Relevant posts: 5, 6, 7, 14, 16, 19, 25-28.
- What to use this for: typed schemas, validation, settings, parsed document outputs, tool inputs, and structured agent outputs.
- What not to use this for: database persistence or clinical domain authority.

## Notes for VetSupport

Use Pydantic models at boundaries:

- CLI/harness command parameters;
- seed data structures;
- parsed document fields;
- retrieval query objects;
- tool input and output schemas;
- consultation briefing output;
- evaluation records;
- safety classifications.

Prefer explicit field names that match domain concepts, such as `pet_id`, `event_date`, `source_document_id`, `confidence`, and `citation_ids`.

Use strict validation where silent coercion could hide mistakes, especially for IDs, dates, enum-like values, and safety classifications.

Use Pydantic Settings for environment configuration, such as database URL, OpenAI API key, model names, and trace configuration. Keep secrets out of committed files.

Use `model_dump()` or JSON serialization for stable logs and evaluation artifacts. Keep schemas small enough to explain in the post where they appear.

## Series Rules

- Validate model outputs before using them as tool arguments or persisted facts.
- Separate extracted facts from model inferences.
- Include confidence or provenance when extraction can be uncertain.
- Do not let Pydantic schemas imply clinical certainty.
- Re-check docs before publishing code with newer Pydantic features.

## Useful Official Pages

- Pydantic docs: https://docs.pydantic.dev/latest/
- Why use Pydantic: https://docs.pydantic.dev/latest/why/
- Types: https://docs.pydantic.dev/latest/concepts/types/
- Settings management: https://docs.pydantic.dev/latest/concepts/pydantic_settings/
- Validation decorator: https://docs.pydantic.dev/latest/concepts/validation_decorator/

