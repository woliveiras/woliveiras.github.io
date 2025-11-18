# Blog Content Guidelines

This document provides guidelines for creating and maintaining content in `src/content/`.

## Author Profile

**William Oliveira** is a software engineer with expertise in:

- AI Engineering and Machine Learning (LLMs, AI Agents, RAG)
- Software Architecture and Design Patterns
- DevOps and Automation
- Frontend Development (JavaScript/TypeScript)
- Hardware and Maker Culture

## Writing Style

### Tone and Voice

- **Tone**: Technical but accessible, educational
- **Voice**: First person ("I", "we", "my")
- **Approach**: Didactic, sharing personal experience
- **Language**: Clear, direct, avoiding excessive jargon

### Key Characteristics

- Use analogies to explain complex concepts
- Share personal experiences and learning journeys
- Acknowledge limitations and uncertainties when appropriate
- Encourage readers with empathy and support
- Be honest about past mistakes as lessons learned
- Show empathy for beginners and their challenges

### Narrative Elements

- Personal learning stories
- Historical context (technology evolution)
- Real-world scenarios and use cases
- "Before vs after" comparisons
- Admissions of learning from errors

## Content Structure

### Frontmatter Format

```yaml
---
title: "Clear and Descriptive Title"
description: "A clear, objective description of the content (aim for 120-160 characters for SEO)"
pubDate: "Day Mon DD HH:MM:SS YYYY +TIMEZONE"
published: true
tags: ["primary-tag", "secondary-tag", "tertiary-tag"]
---
```

**Date Format Examples**:

- Full: `"Sat Jun 28 18:00:00 2025 +0200"`

### Standard Post Structure

1. **Introduction**
   - Contextualize the problem/topic
   - Explain personal or professional motivation
   - Establish relevance

2. **Main Body**
   - Sections with descriptive headings (`##`)
   - Subsections when needed (`###`)
   - Practical examples with code
   - Diagrams or tables when applicable

3. **Technical Elements**
   - Well-commented code blocks
   - Terminal/shell commands
   - Configuration examples
   - Line-by-line explanations when needed
   - Include output examples

4. **Conclusion**
   - Summarize main points
   - Reflect on the topic's future
   - Call-to-action or learning continuation

5. **Optional Sections** (use when relevant)
   - "How It Works"
   - "How to Run the Examples"
   - "Requirements" / "Prerequisites"
   - "Step-by-Step Guide"
   - "Troubleshooting"
   - "Ethical Considerations"
   - "Case Studies and Lessons Learned"
   - "Next Steps"

6. **References** (always include)
   - Academic articles
   - Official documentation
   - Relevant blog posts
   - GitHub repositories

## Tag Taxonomy

### Primary Tags (Most Used)

- `llm` - Large Language Models content
- `ai-engineering` - AI Engineering topics
- `ai-agents` - AI Agent development
- `engineering` - General software engineering
- `web-development` - General web development topics
- `security` - Security and cybersecurity
- `hacking` - Ethical hacking and pentesting
- `devops` - DevOps and CI/CD

### Category Tags

**AI/ML**: llm, ai-engineering, ai-agents, ollama, langchain, machine-learning, langgraph, rag

**DevOps/CI**: github-actions, devops, docker, automation, ci-cd

**Frontend/JS**: javascript, npm, yarn, pnpm, monorepos, react, typescript, vite, nx

**Hardware/Maker**: hardware, maker, hacking, edge-ai, raspberry-pi, pwnagotchi

**Architecture**: engineering, dependency-management, design-patterns, architecture

**Security**: security, hacking, pentesting, cybersecurity

**Career/Soft Skills**: career, learning, mentoring, soft-skills

### Tag Guidelines

- Use 3-5 tags per post
- Start with the most specific/relevant tag
- Include at least one category tag
- Keep tags lowercase with hyphens
- Be consistent with existing tags

## Content Types

### 1. Practical Tutorials (40%)

- Step-by-step guides
- Executable code examples
- "How to Run" sections
- Prerequisites listed clearly
- Expected output shown

**Example titles**:

- "How to [accomplish task]"
- "Building [project] with [technology]"
- "Step-by-step guide to [feature]"

### 2. Conceptual Guides (30%)

- Concept and pattern explanations
- Architecture analysis
- Technical comparisons
- Theory with practical applications

**Example titles**:

- "Understanding [concept]"
- "Introduction to [technology]"
- "[Technology A] vs [Technology B]"

### 3. Analysis Articles (20%)

- Technology pros and cons
- Case studies
- Trade-off discussions
- Critical evaluations

**Example titles**:

- "Advantages and disadvantages of [technology]"
- "When to use [approach]"
- "Lessons learned from [experience]"

### 4. Career/Soft Skills Guides (10%)

- Professional guidance
- Personal development
- Learning and growth strategies

**Example titles**:

- "Guide for [career aspect]"
- "Embracing [skill or mindset]"

## Code Formatting

### Code Blocks

- Use appropriate language syntax highlighting
- Include inline explanatory comments
- Format with consistent indentation
- Show command output when relevant

### Code Examples
```python
# Good example: well-commented and clear
def search_web(query: str) -> str:
    """Performs a web search using DuckDuckGo."""
    print(f"Executing search for '{query}'")
    with DDGS() as ddgs:
        results = list(ddgs.text(query=query, max_results=3))
    return json.dumps(results) if results else "[]"
```

### Terminal Commands

```sh
# Step 1: Install dependencies
npm install

# Step 2: Run development server
npm run dev
```

## Visual Elements

### Diagrams

- Use Mermaid for architecture diagrams
- ASCII art for directory trees
- Tables for comparisons
- Flow diagrams for processes

### Tables

Use markdown tables for:

- Feature comparisons
- Tool matrices
- Configuration options
- Pros and cons lists

## Internal Linking

- Link to related posts for context
- Create learning journey paths
- Reference previous articles when building on concepts
- Use descriptive link text

**Example**:

```markdown
In our [previous article on ReAct framework](/posts/understanding-the-react-framework-for-ai-agents/), we explored...
```

## Ethical Considerations

When writing about sensitive topics (security, AI, hacking):

- Include ethical disclaimers
- Discuss responsible use
- Provide legal context when necessary
- Emphasize educational purposes
- Warn about potential misuse

## SEO Best Practices

### Title

- Clear and descriptive (50-60 characters)
- Include primary keyword
- Make it compelling

### Description

- 120-160 characters
- Summarize value proposition
- Include primary keyword naturally
- Make it compelling for click-through

### Content

- Use headings hierarchically (H2, H3)
- Include keywords naturally
- Provide substantial, valuable content
- Link to internal and external resources

## Language

Posts are primarily written in **English**.

## File Naming

- Use kebab-case for filenames
- Be descriptive but concise
- Match the post slug/URL structure

**Examples**:

- `understanding-the-react-framework-for-ai-agents.mdx`
- `how-to-cache-npm-modules-speed-up-github-actions.mdx`
- `advantages-and-disadvantages-of-using-monorepos.mdx`

## Additional Notes

- Keep posts focused on a single topic
- Break complex topics into series if needed
- Update old posts when information becomes outdated
- Maintain consistency with existing content style
- Prioritize reader value over word count
- Use real-world examples from experience
- Test all code before publishing
