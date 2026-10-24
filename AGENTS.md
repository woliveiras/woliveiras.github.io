# AI Agent Instructions for William Oliveira's Blog

This repo is an Astro blog. Detailed documentation lives in `docs/`. **Read the
relevant document before working on a topic.** Keep this file focused on rules
that must apply across tasks; use the linked documentation for implementation
details and examples.

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
- Before modifying any file, first inspect the relevant files and explain the intended change.
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

## Blog posts

- **Location:** new `*.mdx` file under `src/content/blog/`
- **Filename/slug:** `kebab-case` (lowercase + hyphens); keep readable, avoid filler words
- **No duplicate H1:** the layout renders the title from frontmatter; do not add `# Title` in the body
- Frontmatter must match the schema in `src/content.config.ts`; see
  [docs/blog-post-authoring.md](docs/blog-post-authoring.md) for the supported
  fields and conventions.
- `published` is required. Use `false` for a new draft unless the user
  explicitly asks to publish it. Do not change an existing publication state
  without authorization. An example containing `published: true` in another
  document is not publication authorization.
- `pubDate`: use ISO `YYYY-MM-DD`
- `tags`: required by convention (3–7 items); **use existing tags first** before creating new ones
- `heroImage`: if used, must start with `/src/assets/` and point to a real file
- Always set language on code fences (`sh`, `typescript`, `python`, etc.)
- **Embeds:** `:youtube[id]`, `:link[url]`, `:excalidraw[url]`
- Cross-link: posts → `/posts/<slug>/`, tags → `/tags/<tag>/`
- Use Mermaid or a table only when it makes an important relationship easier
  to understand.
- Post shapes are guides, not required outlines. Do not add a section, table,
  list, or conclusion only to complete a template.

## References and source status

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

- Author or Organization. [Complete title](canonical-url). Publication venue or
  document type, identifier and version, publication/submission date, and
  verified editorial status.

## Safety for security and hacking posts

If a post covers cracking, exploitation, or offensive security, add this
disclaimer near the top: "For educational purposes only. Test only systems you
own or have explicit permission to assess."

Keep the post defensively framed and do not include details that meaningfully
increase real-world harm beyond the authorized educational purpose.
