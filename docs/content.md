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

## Monday Brief

The Brief uses a separate collection in `src/content/brief/`, with its own
layout, archive, and RSS feed at `/brief/`. Its schema validates editorial
metadata; helpers in `src/brief/` check for duplicates and exclude drafts and
future issues from public output. Read the [editorial workflow](monday-brief.md)
before creating or correcting an issue. The template is `templates/brief.mdx`.

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

Custom MDX directives use the local `src/embeds/remark-embeds.ts` plugin,
registered directly in `unified()`. The plugin adds imports only for components
used by a document. It does not rely on Astro auto-import integrations.

Each embed has three files in `src/embeds/<name>/`:
1. `embed.ts` — Configuration (EmbedOption with componentName, urlMatcher, directiveName)
2. `matcher.ts` — URL matching logic
3. `<Component>.astro` — Rendering component

**Registered embeds:**
- `:youtube[id]` — YouTube videos
- `:link[url]` — Link preview cards
- `:excalidraw[url]` — Excalidraw diagrams

**To add new embeds:** Create the three files, export the component from
`src/embeds/index.ts`, and register its configuration in the `remarkEmbeds`
options in `astro.config.ts`. Registration order matters: YouTube must come
before the generic link card matcher.

Text, leaf, and container directives keep their attributes. A paragraph that
contains only a matching URL becomes an embed. Named links, inline URLs, and
code blocks stay as written. Explicit component imports also continue to work.
Component embeds are available in MDX; plain Markdown does not import them.
Unregistered colon sequences stay literal, so model names such as
`gemma3:270m`, arXiv identifiers, and ratios such as `1:1` are not consumed as
directives.

## Native Data Charts

MDX posts can import charts from `$components/charts/`. `StaticBarChart.astro`
renders horizontal bars; `StaticLineChart.astro` renders multiple series as SVG.
Both render at build time, follow the site's light and dark themes, and include
data tables for assistive technology. The line chart also exposes its table
through a keyboard-accessible disclosure.

Give each chart a unique `id`, `title`, `description`, and `source`. Keep source
links in the adjacent caption, and put measurement limits in `note`. Bar charts
accept `data` entries with `label`, `value`, and `displayValue`; optional `detail`
can retain exact counts alongside rounded labels.

Line charts accept `labels` and `series`, where each series has a `label` and a
`values` array with one finite number per period. Optional `tone` and
`labelPosition` control presentation; `tableLabel` provides a shorter visible
column heading while retaining the full accessible label. Set `min`, `max`, and `valueSuffix` to match
the measure; the defaults are 0, 100, and `%`. Labels are equally spaced, so use
regular periods. Missing observations must not be replaced with zero. The line
chart rejects incomplete series or values outside the chosen scale during the
build. On narrow screens its plot scrolls locally to keep labels readable.

Keep quantities with different units or meanings in separate charts, and state
their scales. Inline data props also remain available in the raw Markdown
endpoint, which does not render MDX components.

## Markdown Processing

**Remark plugins:** `remarkMath`, `remarkDirective`, and `remarkEmbeds`

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
