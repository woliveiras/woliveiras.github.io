# Review Blog Post

Review an existing or draft blog post for quality, style consistency, and SEO optimization.

## Workflow

1. **Read** `.claude/context/content-guidelines.md` for current standards
2. **Read the post** completely to understand context and flow
3. **Check** against all quality criteria (see checklist below)
4. **Search** `src/content/blog/` for related posts to suggest internal links
5. **Provide** structured feedback with specific, actionable suggestions

## Quality Checklist

Review the post against these criteria from `.claude/context/content-guidelines.md`:

### Content Quality
- [ ] Introduction engaging and states value
- [ ] Main points well-explained with appropriate depth
- [ ] Code examples tested, functional, well-commented
- [ ] Conclusion effective with next steps
- [ ] Technical concepts explained clearly
- [ ] Content accurate and up-to-date

### Style Consistency
- [ ] Tone: Technical but accessible
- [ ] Voice: First person where appropriate
- [ ] Personal experiences/stories included
- [ ] Analogies used for complex concepts
- [ ] Language clear, avoids excessive jargon
- [ ] Shows empathy for reader's challenges

### Structure
- [ ] Frontmatter complete (title, description, pubDate, published, tags)
- [ ] Proper introduction section
- [ ] Descriptive section headings
- [ ] Conclusion section
- [ ] References/resources section
- [ ] Heading hierarchy (H2 → H3 → H4)

### SEO Optimization
- [ ] Title: 50-60 characters with primary keyword
- [ ] Description: 120-160 characters and compelling
- [ ] Tags: 3-5 relevant tags from taxonomy
- [ ] Internal links to related posts
- [ ] External links to authoritative sources
- [ ] File name: kebab-case, descriptive

### Technical Elements
- [ ] Code blocks with syntax highlighting
- [ ] Terminal commands clearly formatted
- [ ] Code includes helpful comments
- [ ] Output examples where helpful

### Tags
- [ ] Tags exist in taxonomy
- [ ] Correctly formatted (lowercase, hyphens)
- [ ] Most specific tag first
- [ ] At least one category tag

### Links and References
- [ ] All internal links functional
- [ ] External links valid and authoritative
- [ ] Descriptive link text
- [ ] References section complete

### Ethical Considerations (if applicable)
- [ ] Sensitive topics have disclaimers
- [ ] Responsible use emphasized
- [ ] Legal/ethical context provided
- [ ] Educational purpose clear

## Feedback Structure

Provide the review in this format:

### Overall Assessment
Brief summary: Ready to publish? Overall quality?

### Strengths
What the post does well

### Issues by Priority

**Critical (Must Fix)**
1. [Issue] - Location, problem, specific fix

**Important (Should Fix)**
1. [Issue] - Location, problem, specific fix

**Nice-to-Have**
1. [Suggestion] - Why and how

### SEO Recommendations
- Title: current → suggested
- Description: current → suggested
- Tags: current → suggested

### Related Posts to Link
Search `src/content/blog/` and suggest relevant posts

### Updated Sections
Provide rewritten versions of critical sections
