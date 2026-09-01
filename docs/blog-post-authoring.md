# Blog Post Authoring Guidelines

New posts live in `src/content/blog/*.mdx` and are validated by the schema in `src/content.config.ts`.

Write posts that match the existing house style: practical, structured, engineering-focused, with a personal voice and concrete examples.

## Where and How to Create a Post

- **Location**: create a new `*.mdx` file under `src/content/blog/`.
- **Filename/slug**: use `kebab-case` (lowercase + hyphens). Keep it readable; avoid filler words when possible.
- **No duplicate H1**: do not add `# Title` in the body; the layout renders the title from frontmatter.

## Frontmatter

Frontmatter must be valid YAML and match the blog collection schema. See [docs/content.md](content.md) for the full schema reference.

### Required fields

```yaml
---
title: "Clear, descriptive title"
description: "1–2 sentences: what the reader will learn and why it matters."
pubDate: "2025-12-18"
published: true
tags: ["tag-one", "tag-two", "tag-three"]
---
```

- `title` (string): Title Case is preferred; keep it explicit and searchable.
- `description` (string): Written for humans; avoid keyword stuffing.
- `pubDate` (date-like string): use ISO `YYYY-MM-DD` for consistency.
- `published` (boolean): use `true` for new posts.
- `tags` (string[]): required by convention for new posts (schema allows it to be optional, but don't omit it).

### Optional fields (use when relevant)

```yaml
---
shortDescription: "Shorter OG-friendly description (optional)."
updatedDate: "2025-12-18" # set when substantially updating an old post
disableComments: false     # omit unless you need to disable
disableLikes: false        # omit unless you need to disable
heroImage: "/src/assets/posts/<slug>/hero.png"
hideHero: false
noImage: false
useHeroAsOGImage: false
noTextInOGImage: false
---
```

- `heroImage` must point to a file under `/src/assets/` and must start with `/src/assets/`.
- Prefer omitting optional booleans unless you intentionally want to change behavior.

## Voice, Tone, and House Style

- **Language**: English.
- **Tone**: technical but accessible; explain jargon when you introduce it.
- **Personal voice**: include lived experience when it adds clarity ("In my experience…", "For me…", "What I usually do…").
- **Reader empathy**: assume the reader is busy; make the argument easy to
  follow without forcing every post into the same structure.
- **Actionable by default**: prefer step-by-step instructions, commands, expected outcomes, and trade-offs.

## Possible Post Shapes

These are starting points, not required outlines. Keep only the sections the
reader and source material need. A post does not need a conclusion, table,
troubleshooting section, or list merely because its category includes one.

### A) "How to" / tutorial (hands-on)

- Open with the actual problem, failed attempt, or outcome.
- Include requirements only when versions, OS details, accounts, or other
  prerequisites affect the result.
- Use numbered steps when order matters and show observable checkpoints.
- Include troubleshooting for failures the article can support.
- End with a useful consequence, next action, or remaining boundary. Omit a
  recap-only conclusion.
- Add references when the post relies on external material.

### B) "Understanding X" / conceptual (mental model + trade-offs)

- Start from the engineering problem that makes the concept necessary.
- Introduce a mental model and vocabulary after the reader has a reason to care.
- Explain the mechanism with an example, diagram, or comparison when useful.
- Include only the trade-offs and pitfalls that change how the concept should be
  used.
- Add a final implication and references when they add information.

### C) Short note / opinion (personal + practical)

- Start from supplied personal context and the tension that produced the
  position.
- Distinguish observations, external evidence, and opinion.
- State the current practice or recommendation and its boundary.
- End when the argument is complete. Do not add a generic takeaway.

## Markdown/MDX Conventions

### Headings

- Use `##` for main sections, `###` for subsections.
- For step-by-step posts, prefer `## Step N: ...` headings.

### Code blocks

- Always set the language: `sh`, `bash`, `typescript`, `javascript`, `python`, `yml`, `json`, etc.
- Prefer showing code that is runnable/copy-pastable.
- Use file labels when it helps:

```yml title=".github/dependabot.yml"
version: 2
```

- Fence options like `ins={3,4}` (highlight specific lines).
- Inline markers like `// [!code highlight]` when demonstrating diffs or important config.

### Diagrams and tables

- Use Mermaid when explaining flows or architecture.
- Use tables for comparisons (trade-offs, decision matrices).

### Links

- Prefer official docs for references.
- Cross-link internal content when relevant:
  - Posts: `/posts/<slug>/`
  - Tags: `/tags/<tag>/`

## Safety and Disclaimers (security/hacking posts)

If the post covers cracking, exploitation, or offensive security:

- Add a short disclaimer near the top ("educational purposes only", "only on networks/systems you own or have permission to test").
- Avoid instructions that meaningfully increase real-world harm without a defensive framing.

## Quality Checklist

- Frontmatter validates: required keys present; `pubDate` is ISO; `published: true`; `tags` has 3–7 items.
- The opening gives the reader a concrete problem, claim, result, or reason to
  continue. It does not need to preview the entire article.
- Commands are explicit (paths, filenames, placeholders) and use `sh` fences.
- Conclusions add an implication, next action, or unresolved boundary; omit
  them when they would only recap. Posts that rely on external material include
  `## References`.
- Tag names are consistent (no typos, no random singular/plural changes).

## Tags (use existing ones first)

Tags are free-form strings, but consistency is what makes tag pages useful. Prefer existing tags from the repository before introducing a new one.

Common existing tags (sample, not exhaustive):

- **AI/LLMs**: `llm`, `ai-engineering`, `ai-agents`, `ollama`, `langchain`, `langgraph`, `machine-learning`, `rag`
- **Web/Frontend**: `javascript`, `typescript`, `react`, `nextjs`, `frontend`, `ssr`, `performance`, `web`, `architecture`, `caching`
- **Tooling/DevOps**: `github-actions`, `devops`, `dependency-management`, `monorepos`, `pnpm`, `npm`, `yarn`, `docker`, `automation`
- **Hardware/Security**: `raspberry-pi`, `hardware`, `iot`, `maker`, `security`, `hacking`, `privacy`, `self-hosting`
- **Career/Collaboration**: `engineering-practices`, `collaboration`, `pair-programming`, `productivity`, `software-engineering`, `learning`
