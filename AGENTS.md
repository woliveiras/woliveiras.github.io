# AI Agent Instructions for William Oliveira's Blog

This repo is an Astro blog. Detailed documentation lives in `docs/`. **Read the relevant doc before working on a topic.**

## Documentation Index

| Topic | File |
|---|---|
| Blog post authoring (voice, tone, frontmatter, post shapes, markdown, tags) | [docs/blog-post-authoring.md](docs/blog-post-authoring.md) |
| Architecture overview (directories, config, path aliases) | [docs/architecture.md](docs/architecture.md) |
| Development workflow (commands, build, deployment) | [docs/development.md](docs/development.md) |
| Content schema (collections, embeds, markdown processing, search) | [docs/content.md](docs/content.md) |
| Code quality (Biome, style guidelines, utilities) | [docs/code-quality.md](docs/code-quality.md) |

---

## Stack & Development

- **Stack:** Astro 5, TypeScript, Svelte, Tailwind CSS
- **Package manager:** pnpm
- **Linter/formatter:** Biome — **tabs** for indentation, **double quotes** for JS/TS (not ESLint/Prettier)
- **Deploy:** GitHub Pages via GitHub Actions

```bash
pnpm dev          # Development server
pnpm build        # Type-check + build + pagefind
pnpm lint         # Biome linter with auto-fix
pnpm lint:fix     # Biome check and format
```

> **Build note:** `pnpm build` runs `astro check && astro build`, then `postbuild` runs `pagefind` to generate search indexes. Never skip the postbuild step.

## Architecture Essentials

- **Content:** MDX blog posts in `src/content/blog/`
- **Config:** `src/config.json` is the single source of truth for site metadata, colors, feature flags, and social links
- **Key directories:** `src/components/`, `src/layouts/`, `src/pages/`, `src/embeds/`
- **Path aliases:** `$components`, `$layouts`, `$pages`, `$assets`, `$content` (defined in `astro.config.ts`)
- **Series collections:** `src/content/hands-on-coding-assistants/`, `src/content/building-with-supabase/`

## Code Style

- Biome enforces tabs + double quotes; run `pnpm lint:fix` before committing
- Use path aliases (`$components`, `$layouts`, etc.) consistently
- When `any` is necessary (dynamic posts, AST), add `biome-ignore lint/suspicious/noExplicitAny` with a reason
- Follow existing patterns for new embeds, components, or content types

---

## Writing Blog Posts

**Read [docs/blog-post-authoring.md](docs/blog-post-authoring.md) for the full guide.** Below is the essential summary.

### Language & Voice

- **Language:** English
- **Tone:** technical but accessible; explain jargon when introduced
- **Personal voice:** include lived experience ("In my experience…", "What I usually do…")
- **Actionable:** prefer step-by-step instructions, commands, expected outcomes, and trade-offs

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
| **How-to / tutorial** | Hands-on steps: intro → requirements → steps → troubleshooting → conclusion → references |
| **Understanding X / conceptual** | Mental model + trade-offs: intro → model → how it works → trade-offs → pitfalls → conclusion |
| **Short note / opinion** | Personal + practical: intro → observations → what I do now → conclusion |

### Markdown/MDX

- Use `##` for main sections, `###` for subsections
- Always set language on code fences (`sh`, `typescript`, `python`, etc.)
- Use Mermaid for flows/architecture; tables for comparisons
- **Embeds:** `:youtube[id]`, `:link[url]`, `:excalidraw[url]`
- Cross-link: posts → `/posts/<slug>/`, tags → `/tags/<tag>/`

### Tags (use existing first)

Common existing tags (not exhaustive):

- **AI/LLMs:** `llm`, `ai-engineering`, `ai-agents`, `ollama`, `langchain`, `langgraph`, `machine-learning`, `rag`
- **Web/Frontend:** `javascript`, `typescript`, `react`, `nextjs`, `frontend`, `architecture`, `performance`
- **Tooling/DevOps:** `github-actions`, `devops`, `docker`, `monorepos`, `pnpm`, `automation`
- **Hardware/Security:** `raspberry-pi`, `hardware`, `security`, `hacking`, `self-hosting`
- **Career:** `engineering-practices`, `collaboration`, `pair-programming`, `productivity`

### Safety (security/hacking posts)

Add a disclaimer near the top: "educational purposes only, only on systems you own or have permission to test."

### Quality Checklist

- [ ] Frontmatter validates: required keys, ISO date, `published: true`, 3–7 tags
- [ ] Intro answers: **what**, **why**, **who it's for**
- [ ] Commands are explicit with `sh` fences
- [ ] Long posts have `## Conclusion`; external-tool posts have `## References`
- [ ] Tag names match existing tags (no typos, consistent singular/plural)
