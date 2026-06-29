# Editorial Guidelines

## Voice and Style

Write in English.

Use a technical but accessible tone. Explain jargon when introduced. Favor a pragmatic engineering voice with concrete examples, implementation details, trade-offs, and expected outcomes.

Use personal experience sparingly when it clarifies a decision, for example: "In my experience..." or "What I usually do..."

Prefer continuous narrative over fragments. Use bullets for lists, not as the main writing style.

Avoid:

- Marketing language.
- Vague AI hype.
- Tool-only tutorials with no architecture reasoning.
- Claims that the system diagnoses, prescribes, or replaces veterinarians.
- Broad detours into human healthcare.

## Standard Post Shape

Most posts should follow this structure:

1. Problem.
2. Main concept.
3. Veterinary clinic scenario.
4. Architecture decision.
5. Implementation.
6. Risks.
7. Checklist.
8. Practical exercise.

Hands-on posts should include:

- Requirements.
- Commands to run.
- Expected output.
- What changed in the database, index, trace, or agent output.
- Troubleshooting.
- Conclusion.

Conceptual posts should include:

- A mental model.
- A diagram or table when useful.
- Trade-offs.
- Pitfalls.
- Conclusion.

## Blog and MDX Rules

When producing final series chapters:

- Series chapters live in `src/content/hands-on-agentic-rag/chapters/*.mdx` as the `agenticRagSeries` content collection, routed at `/hands-on-agentic-rag/`. They are not in the `blog` collection. Standalone, non-series posts still belong in `src/content/blog/*.mdx`.
- Chapter frontmatter uses `title`, `description`, `module` (number), and `order` (number). It does not use the blog frontmatter (`pubDate`, `published`, `tags`).
- Do not add a duplicate H1 in the body because the layout renders the title from frontmatter.
- Do not use Markdown autolinks like `<https://example.com>` in MDX; they parse as JSX and break the build. Use `[label](url)` instead.
- Use `##` for main sections and `###` for subsections.
- Always set a language on code fences.
- Prefer official documentation links in references.
- Include `## References` when a post depends on external tools, papers, or docs.
- Include `## Conclusion` for long posts.
- End each chapter with a "Next up" link to the following chapter.

## Quality Checklist

Before considering a post ready, verify:

- It teaches one clear concept or one practical step.
- It uses the veterinary clinic scenario consistently.
- It does not drift into human healthcare.
- It does not claim the agent can diagnose, prescribe, or replace a veterinarian.
- It includes concrete commands when implementation is involved.
- It explains expected outcomes.
- It calls out trade-offs and risks.
- It includes citations or references when relying on external sources.
- It keeps the local agent harness scope intact.
- It helps the reader build the next piece of VetSupport.

