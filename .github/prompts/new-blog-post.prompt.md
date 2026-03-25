---
description: "Scaffold a new blog post with correct frontmatter, structure, and voice"
argument-hint: "Topic and post shape (how-to, conceptual, or short-note)"
agent: "agent"
---
Create a new blog post for this Astro blog.

**Read [AGENTS.md](../../AGENTS.md) before proceeding** — it contains all writing conventions, frontmatter rules, post shapes, and voice guidelines.

## Steps

1. **Determine the topic and post shape** from the user's input. If not specified, ask. The three shapes are:
   - **How-to / tutorial**: intro → requirements → steps → troubleshooting → conclusion → references
   - **Understanding X / conceptual**: intro → mental model → how it works → trade-offs → pitfalls → conclusion
   - **Short note / opinion**: intro → observations → what I do now → conclusion

2. **Choose a filename**: `kebab-case`, lowercase + hyphens, no filler words. Place it in `src/content/blog/`.

3. **Generate frontmatter** with all required fields:
   ```yaml
   ---
   title: "Clear, descriptive title"
   description: "1–2 sentences: what the reader will learn and why it matters."
   pubDate: "YYYY-MM-DD"
   published: true
   tags: ["tag-one", "tag-two", "tag-three"]
   ---
   ```
   - Use today's date for `pubDate`
   - Use 3–7 existing tags (search `src/content/blog/` for commonly used tags before creating new ones)

4. **Generate the post body** following the chosen shape:
   - Use `##` for main sections, `###` for subsections
   - Do NOT add `# Title` — the layout renders it from frontmatter
   - Write in English, technical but accessible
   - Include personal voice ("In my experience…", "What I usually do…")
   - Set language on all code fences
   - Include `## Conclusion` for long posts
   - Include `## References` for posts that use external tools

5. **Create the file** at `src/content/blog/<slug>.mdx`
