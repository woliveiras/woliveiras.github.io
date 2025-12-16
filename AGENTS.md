# Guidelines for AI Agents When Creating Articles

This document defines the writing style, structure, and metadata for creating new blog posts. The goal is to maintain consistency and quality across all publications.

## 1. Metadata (Frontmatter)

Each post must start with a YAML `frontmatter` block.

```yaml
---
title: "A Concise, Informative Title in a 'How To' or 'Understanding X' Style"
description: "A short, clear 1–2 sentence summary of what the reader will learn."
pubDate: "YYYY-MM-DD"
published: true
tags: ["tag1", "another-tag", "one-more-tag"]
---
```

- **`title`**: The title should be clear, action-oriented, or explanatory.
  - **Examples of good titles**: "How to Do Effective Pair Programming", "Understanding the RAG Pattern with LLMs", "Guide to Migrating from NPM to PNPM".
- **`description`**: A 1–2 sentence summary describing what the post covers.
- **`pubDate`**: Publication date in `YYYY-MM-DD` format.
- **`published`**: Use `true` for all new posts.
- **`tags`**: A list of 3–5 relevant tags, in lowercase. Use hyphens to join words (e.g., `ai-agents`).

### Common Tags

Use existing tags whenever possible to maintain consistency.

- **AI & LLMs**: `llm`, `ai-engineering`, `ai-agents`, `rag`, `langchain`, `ollama`, `crewai`
- **Engineering Practices**: `engineering-practices`, `collaboration`, `pair-programming`, `productivity`, `testing`
- **Web/JS Development**: `javascript`, `typescript`, `react`, `astro`, `ssr`, `caching`
- **Tooling and Ecosystem**: `monorepo`, `pnpm`, `github-actions`, `dependabot`, `docker`
- **Hardware/DIY**: `raspberry-pi`, `pwnagotchi`, `sbc`
- **Guides and Tutorials**: `how-to`, `guide`, `tutorial`

## 2. Tone and Writing Style

- **Language**: English.
- **Tone**: Technical, but accessible and didactic. Writing should be clear and direct.
- **Personal Perspective**: Include personal experiences and opinions to make the content more authentic and engaging. Using "I think...", "In my experience...", "For me..." is encouraged.
- **Empathy**: Consider the reader’s pains and challenges, especially for beginners or when tackling complex topics.

## 3. Article Structure

A well-structured post makes reading and understanding easier.

1.  **Introduction**:
    - Start with a short introduction (2–3 paragraphs).
    - Present the problem or topic and explain why it matters.
    - If possible, add a personal touch that connects you to the subject.

2.  **Body**:
    - Split the content into logical sections using `##` for main headings and `###` for subheadings.
    - Use lists (`-` or `*`), **bold**, and `code` to highlight important information.
    - For structured data, use Markdown tables.
    - Keep paragraphs short and focused on a single idea.

3.  **Code Blocks**:
    - Always specify the code block language (e.g., ` ```typescript `).
    - Add comments in the code to explain complex parts.

4.  **Conclusion**:
    - End with a `## Conclusion` section.
    - Summarize the main points.
    - Offer a final reflection or an outlook on the topic’s future.

5.  **References** (if applicable):
    - If the post is based on external sources, include a `## References` section at the end with a list of links to the original materials.

## Example Article Structure

```markdown
---
title: "Post Title"
description: "Post description."
pubDate: "2025-12-16"
published: true
tags: ["example", "guide"]
---

Short, engaging introduction that presents the topic and why it matters. A personal touch is welcome here.

## First Section Title

Explain the first concept. Use short paragraphs.

- Use lists to break down points.
- **Bold** for emphasis.

## Second Section Title

Keep developing the topic.

```javascript
// Example code block with the language specified.
function helloWorld() {
  console.log("Hello, World!");
}
```

### Subtitle if needed

Go deeper on a specific topic.

## Conclusion

Summarize the key takeaways and offer a final message.

## References

- [Link to an interesting article](https://example.com)
- [Link to documentation](https://example.dev)
```
