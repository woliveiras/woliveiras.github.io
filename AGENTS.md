# AI Agent Instructions for William Oliveira's Blog

This repo is an Astro blog. Detailed documentation lives in `docs/`. **Read the relevant doc before working on a topic.**

## Writing voice

- Every text written or revised in this repository must load the `writing`
  skill and use the house voice defined in
  [`.agents/skills/writing/SKILL.md`](.agents/skills/writing/SKILL.md). The only
  exception is when the user explicitly requests a different voice.
- This applies to blog posts, series, documentation, pages, UI copy,
  descriptions, announcements, and any other prose.
- Do not replace the house voice with generic technical, corporate, academic,
  or assistant prose.
- Never invent personal experience, opinions, project outcomes, measurements,
  or emotional reactions to make text sound more personal.

## Confidence and verification rules

- Do not present uncertain assumptions as facts. Say when something is inferred, unverified, or needs confirmation.
- Before modifying code, first inspect the relevant files and explain the intended change.
- Before the first write operation, run one of these verification steps:
  - use a subagent/reviewer for non-trivial changes, or
  - perform a deeper self-review that checks assumptions, affected files, tests, and risks.
- For risky, broad, or ambiguous changes, stop and ask for confirmation before editing.
- After editing, verify with the smallest relevant test, build, typecheck, lint, or manual inspection.
- In the final answer, report what was changed, what was verified, and any remaining uncertainty.

## Documentation Index

| Topic | File |
|---|---|
| Blog post authoring (voice, tone, frontmatter, post shapes, markdown, tags) | [docs/blog-post-authoring.md](docs/blog-post-authoring.md) |
| Architecture overview (directories, config, path aliases) | [docs/architecture.md](docs/architecture.md) |
| Development workflow (commands, build, deployment) | [docs/development.md](docs/development.md) |
| Content schema (collections, embeds, markdown processing, search) | [docs/content.md](docs/content.md) |
| Monday Brief (issues, drafts, Lab, RSS, and publishing) | [docs/monday-brief.md](docs/monday-brief.md) |
| Code quality (Biome, style guidelines, utilities) | [docs/code-quality.md](docs/code-quality.md) |

---

### Creating a Post

- **Location:** new `*.mdx` file under `src/content/blog/`
- **Filename/slug:** `kebab-case` (lowercase + hyphens); keep readable, avoid filler words
- **No duplicate H1:** the layout renders the title from frontmatter; do not add `# Title` in the body

### Frontmatter (required)

```yaml
---
title: "Clear, descriptive title"
description: "1–2 sentences: what the reader will learn and why it matters."
pubDate: "2025-12-18"
published: true
tags: ["tag-one", "tag-two", "tag-three"]
---
```

- `pubDate`: always use ISO `YYYY-MM-DD`
- `tags`: required by convention (3–7 items); **use existing tags first** before creating new ones
- `heroImage`: if used, must start with `/src/assets/` and point to a real file

### Post Shapes

| Shape | When to use |
|---|---|
| **How-to / tutorial** | Hands-on work: problem → necessary requirements → executable steps → relevant failures and boundaries |
| **Understanding X / conceptual** | Mental model: engineering problem → mechanism → concrete example → relevant trade-offs |
| **Short note / opinion** | Supplied personal context → clear position → evidence or limits → current recommendation |

These shapes are guides, not required outlines. Do not add a section, table,
list, or conclusion only to complete a template. End when the reader has the
necessary consequence, action, or remaining boundary.

### Markdown/MDX

- Use `##` for main sections, `###` for subsections
- Always set language on code fences (`sh`, `typescript`, `python`, etc.)
- Use Mermaid for flows/architecture; tables for comparisons
- **Embeds:** `:youtube[id]`, `:link[url]`, `:excalidraw[url]`
- Cross-link: posts → `/posts/<slug>/`, tags → `/tags/<tag>/`

### References and source status

When a post relies on external evidence:

- Link the source near the claim it supports and include it again under
  `## References`.
- Prefer primary sources, official documentation, original research, and
  first-party publications.
- Each reference must identify, when available:
  - the author, first author, or responsible organization;
  - the complete title;
  - the publication venue or publisher;
  - the publication or submission date;
  - the document type and editorial status;
  - the version, report number, DOI, or other stable identifier.
- For arXiv papers, link to `https://arxiv.org/abs/<id>` instead of the PDF or
  HTML view. Include the arXiv identifier, version, submission or revision date,
  and any venue or review status declared on the arXiv record.
- Distinguish clearly between:
  - peer-reviewed or formally published work;
  - work accepted at a conference or workshop;
  - work under review;
  - preprints with no publication venue listed;
  - company or industry research publications.
- Do not describe a preprint as published or peer-reviewed unless a primary
  source confirms that status. “Accepted at,” “under review,” and “published
  in” are not interchangeable.
- For long author lists, name the first author followed by `et al.`. For
  organization-authored material, use the organization or the authors provided
  by its official citation.
- Add a short description of what the source supports only when that connection
  is not already clear in the body. Do not duplicate a summary that the post
  already provides.
- Verify titles, authors, dates, versions, and publication status against the
  source before writing the reference. If a field cannot be verified, omit it
  or state that it is not listed instead of inferring it.

Use this shape:

- First Author et al. [Complete title](canonical-url). Publication venue or
  document type, identifier and version, publication/submission date, and
  verified editorial status.

### Tags (use existing first)

Common existing tags (not exhaustive):

- **AI/LLMs:** `llm`, `ai-engineering`, `ai-agents`, `ollama`, `langchain`, `langgraph`, `machine-learning`, `rag`
- **Web/Frontend:** `javascript`, `typescript`, `react`, `nextjs`, `frontend`, `architecture`, `performance`, `web`
- **Backend/Python:** `python`, `fastapi`, `uvicorn`, `asgi`, `backend`
- **Tooling/DevOps:** `github-actions`, `devops`, `docker`, `monorepos`, `pnpm`, `automation`
- **Hardware/Security:** `raspberry-pi`, `hardware`, `security`, `hacking`, `self-hosting`
- **Career:** `engineering-practices`, `collaboration`, `pair-programming`, `productivity`

### Safety (security/hacking posts)

Add a disclaimer near the top: "educational purposes only, only on systems you own or have permission to test."
