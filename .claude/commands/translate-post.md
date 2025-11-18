# Translate Blog Post

Translate a blog post to another language while maintaining style, tone, and technical accuracy from `.claude/context/content-guidelines.md`.

## Workflow

1. **Read** the source post completely
2. **Confirm** translation details:
   - Source language (usually English)
   - Target language
   - File naming convention (e.g., `post-title-pt.mdx`)
3. **Translate** following guidelines below
4. **Create** the translated file in `src/content/blog/`
5. **Provide** translation summary and notes

## What to Translate

**Translate**:
- Title and description
- All body text and headings
- Image alt text
- Code comments (if beneficial)

**Keep Unchanged**:
- Frontmatter field names
- Tag values (consistency)
- Code syntax
- URLs, file paths, commands
- Package/function names
- Technical acronyms

**Preserve**:
- Personal voice (first person)
- Conversational tone from `.claude/context/content-guidelines.md`
- Technical accuracy
- Code structure

## Quality Checklist

After translation:
- [ ] All text translated (except unchanged elements)
- [ ] Technical accuracy maintained
- [ ] Tone and style match original
- [ ] Code unchanged (except comments if helpful)
- [ ] Links work
- [ ] Formatting preserved
- [ ] Grammar correct in target language

## File Naming

Use language code suffix:
- `post.mdx` → `post-pt.mdx` (Portuguese)
- `post.mdx` → `post-es.mdx` (Spanish)
- `post.mdx` → `post-fr.mdx` (French)

## Output Format

After translation, provide:

**Translation Summary**:
- Source/target languages
- File path
- Word count

**Translation Notes**:
- Key terms kept in English and why
- Cultural adaptations made
- Challenges or decisions

**Next Steps**:
- Suggested file location
- Review recommendations
