# Content Schema

Blog posts use Astro Content Collections with strict Zod schemas (see `src/content.config.ts`).

## Required Fields

- `title`, `description`, `pubDate`, `published`

## Optional Fields

- `heroImage` — Must start with `/src/assets/` and exist in assets glob
- `tags` — Array of strings
- `shortDescription` — For OG images
- `useHeroAsOGImage`, `noTextInOGImage`, `hideHero`, `noImage` — Display controls
- `disableComments`, `disableLikes` — Feature toggles

**Publishing:** Only posts with `published: true` are included via `getBlogPosts()` in `src/utils.ts`.

## Dynamic Routing

Use `getStaticPaths()` with `getBlogPosts()`:

```typescript
export async function getStaticPaths() {
  const posts = await getBlogPosts(); // Filters published posts, sorts by date
  return posts.map((post: any) => ({
    params: { slug: post.id },
    props: post,
  }));
}
```

See `src/pages/posts/[...slug].astro` for reference.

## Custom Embeds

Custom MDX directives powered by `astro-custom-embeds`.

Each embed has three files in `src/embeds/<name>/`:
1. `embed.ts` — Configuration (EmbedsOption with componentName, urlMatcher, directiveName)
2. `matcher.ts` — URL matching logic
3. `<Component>.astro` — Rendering component

**Registered embeds:**
- `:youtube[id]` — YouTube videos
- `:link[url]` — Link preview cards
- `:excalidraw[url]` — Excalidraw diagrams

**To add new embeds:** Create the three files, export from `src/embeds/index.ts`, register in `astro.config.ts` embeds array.

## Markdown Processing

**Remark plugins:** `remarkMath`

**Rehype plugins:**
- `addMermaidClass` (custom, see `add-mermaid-classname.ts`) — Adds class to mermaid diagrams
- `rehypeMermaid` — Renders mermaid diagrams
- `rehypeMathjax` — Math rendering

**Syntax highlighting:** Shiki with dual themes (github-light/dark), transformers for meta-highlight and notation-highlight.

## Search

Powered by Pagefind (generated in postbuild):
- Svelte store in `src/components/search/CommandPaletteStore.ts`
- Command palette UI in `src/components/search/CommandPalette.svelte`
- `data-pagefind-body` attribute marks indexed content (see `BlogPost.astro` layout)
