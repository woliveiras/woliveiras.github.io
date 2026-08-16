# Astro and MDX posts

Apply only when the target repository uses Astro content collections or MDX.

1. Read the repository's content schema before choosing frontmatter. Do not copy
   fields from another blog.
2. Follow the target slug, filename, publication, date, tags, image, and draft
   conventions.
3. Do not add a body H1 when the layout renders the frontmatter title.
4. Use `##`/`###` hierarchy, language-labelled code fences, and repository-owned
   component/embed syntax.
5. Prefer existing tags and internal-link formats.
6. Resolve referenced images/components and keep MDX expressions syntactically
   valid.
7. Run the target content/schema check and full build command when authorized;
   an isolated Markdown preview does not prove the post ships.

Publication state is an explicit user decision. Creating an MDX file does not
authorize changing `published`, deploying the site, or sending announcements.
