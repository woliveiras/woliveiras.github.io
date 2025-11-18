# Suggest Tags for Blog Post

Analyze a blog post and suggest appropriate tags based on the taxonomy in `.claude/context/content-guidelines.md`.

## Workflow

1. **Read** the post (title, description, headings, content)
2. **Check** tag taxonomy in `.claude/context/content-guidelines.md`
3. **Analyze** current tags (if any)
4. **Suggest** 3-5 tags following tag rules
5. **Provide** rationale for each tag

## Tag Rules

**3-5 tags total**:
1. Most specific tag first (primary topic)
2. At least one category tag (AI/ML, DevOps, etc.)
3. Technology tags (if applicable)
4. Concept/approach tags (if applicable)
5. Prefer existing tags from taxonomy in `.claude/context/content-guidelines.md`

**Format**: lowercase with hyphens (e.g., `ai-agents`)

See full taxonomy in `.claude/context/content-guidelines.md`

## Output Format

### Current Tags
```yaml
tags: ["current-tag-1", "current-tag-2"]
```

### Suggested Tags
```yaml
tags: ["tag-1", "tag-2", "tag-3"]
```

### Rationale
1. **tag-1** (Primary) - Why relevant
2. **tag-2** (Category) - Why relevant
3. **tag-3** (Technology/Concept) - Why relevant

### Changes
- Added/removed/reordered and why

### Related Posts
Search `src/content/blog/` and list posts with similar tags
