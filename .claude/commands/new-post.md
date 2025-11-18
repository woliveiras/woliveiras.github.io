# Create New Blog Post

Create a new blog post following the content guidelines in `.claude/context/content-guidelines.md`.

## Workflow

1. **Ask for post details**:
   - Topic or title idea
   - Content type (tutorial, conceptual guide, analysis, or career/soft skills)
   - Target audience level (beginner, intermediate, advanced)
   - Key points to cover (if known)

2. **Generate a post outline** including:
   - Suggested title (SEO-optimized, 50-60 characters)
   - Suggested description (120-160 characters)
   - Appropriate tags (3-5 tags from taxonomy in `.claude/context/content-guidelines.md`)
   - Section structure based on content type
   - Suggested references or resources

3. **Wait for user approval** of the outline before proceeding

4. **Generate the complete post**:
   - Proper frontmatter (use current date in format "Day Mon DD HH:MM:SS YYYY +0200")
   - Full content following writing style from `.claude/context/content-guidelines.md`
   - Code examples (if applicable)
   - Internal links to related posts (search `src/content/blog/` for relevant posts)
   - References section

5. **Create the file** in `src/content/blog/`:
   - Kebab-case filename matching the post slug
   - `.mdx` extension

6. **Provide summary**:
   - File location
   - Suggested next steps (review, test code, add images, etc.)

## Key Reminders

- **Always read** `.claude/context/content-guidelines.md` for current style guidelines, tag taxonomy, and content structure
- **Search** `src/content/blog/` for related posts to reference internally
- **Test** any code examples before including them
- **Follow** the writing style: first person, personal experiences, analogies, empathy for beginners
- **Consider** ethical implications for sensitive topics (security, AI, hacking)
