---
description: "Use when editing MDX blog posts or series content. Enforces frontmatter rules, voice/tone, tag conventions, heading structure, and embed syntax."
applyTo: "src/content/**/*.mdx"
---
# MDX Post Conventions

When editing blog posts, follow these rules:

## Frontmatter
- Required: `title`, `description`, `pubDate` (ISO YYYY-MM-DD), `published: true`, `tags` (3–7 items)
- Use existing tags — search other posts in `src/content/blog/` before creating new ones
- `heroImage` must start with `/src/assets/` if used

## Structure
- Do NOT add `# Title` — the layout renders it from frontmatter
- Use `##` for main sections, `###` for subsections
- Long posts need `## Conclusion`; posts with external tools need `## References`

## Voice
- English, technical but accessible
- Explain jargon when introduced
- Include personal voice ("In my experience…", "What I usually do…")

## Code
- Always set language on code fences: `sh`, `typescript`, `python`, etc.
- Commands must be copy-pastable

## Embeds & Links
- YouTube: `:youtube[id]`
- Link cards: `:link[url]`
- Excalidraw: `:excalidraw[url]`
- Internal posts: `/posts/<slug>/`
- Internal tags: `/tags/<tag>/`

## Security Posts
- Add disclaimer near the top: "educational purposes only, only on systems you own or have permission to test"
