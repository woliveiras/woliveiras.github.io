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

## Talks

Give each talk an English slug and use it as the folder name under
`src/content/talks/`. Put the English edition in `en.mdx`. It opens at
`/talks/<slug>/`. Add `pt-BR.mdx` or `es.mdx` in the same folder to serve
translations at `/talks/<slug>/pt-BR/` and `/talks/<slug>/es/`.

Set each edition’s `title`, `description`, `lang` and `published` in its
frontmatter. Match `lang` to the filename, including the capitalization of
`pt-BR`. The cover shows the title and author. The Talks catalog links to the
available languages. Start the MDX body with the next slide. Each
`<section>` is a slide and its `<aside class="notes">` holds the speaker notes.
Keep a new edition at `published: false` for local preview. The production build
includes only published editions and lists each talk once in the catalog.

`TalkLayout.astro` renders the cover and initializes Reveal.js for keyboard
navigation, slide numbers and presenter notes. The slide body can use the same
Astro components as a blog post. For translated charts, keep the numbers in a
file such as `benchmarks.ts` beside the editions and localize the labels in MDX
or the data module. The current talk imports `StaticBarChart.astro` this way.

The default theme is `dark-lime`. To change it for every edition of a talk,
add `talk.ts` in that talk’s folder and export `{ theme: "paper" }` as the
default. Shared slide styles live in `src/styles/talks/base.css`. Each palette
has its own stylesheet under `src/styles/talks/themes/`.

Keep the bibliography in an optional `references.md` beside the editions.
Astro serves it at `/talks/<slug>/references/` when the catalog includes an
edition. Import `$components/TalkReferencesLink.astro` in MDX and use
`<TalkReferencesLink>References</TalkReferencesLink>` on the closing slide.
Translate the link text in each edition. To point a slide citation at a single
entry, give the entry an HTML id and pass it as `sourceId` to the same component.

## Books

Export `book` from a `src/books/<name>.book.ts` file using
[`BookDefinition`](../src/books/design.ts), with a unique path such as
`/books/your-book/`. Put the book's Markdown or MDX files in
`src/content/books/<slug>/`, using the same slug as `path`. The shared routes
build the cover, table of contents, and reading pages from the definition and
files. Drafts appear in preview mode. Set `published: true` when the book is
ready to go live.

Each file supplies `title`, `description`, `module` (the zero-based part
number), and `order` (its position in reading order). Normal chapters use
`kind: chapter` by default. Set `kind` for a dedication, introduction, glossary,
or appendix. `pageSlug` overrides a chapter or appendix slug when needed.
Define part titles and descriptions in the book's `parts` array.

In *Hands-on Coding Assistants*, collect source links under a final
`## References` heading in each chapter or appendix. Keep download links and
links that guide readers through exercises in the body.

### Customize a book

- Set **colors** in `theme.light` and `theme.dark`. Use `paper` for the background,
  `ink` for body text, `muted` for secondary text, `accent` for links and the
  primary button, and `rule` for dividers. Omitted colors use the shared defaults.
- Set the **typeface** with `theme.fontFamily`, a CSS font stack for headings and
  body text.
- For an image **cover**, import the image from `src/assets/` and set `cover` to
  `{ image, alt }`. Use an empty `alt` for decorative artwork. Use
  `{ artwork: YourCoverArt }` for an Astro component, or omit `cover` for a
  text-only cover.

Run `pnpm dev --mode book-preview --port 4322` to preview a book. Use its `path`
for the cover. [See a working definition](../src/books/observability.book.ts).

### Book sharing cards

In preview mode, append `share-card/` to the book's path. This preview uses the
cover artwork, title, and author from the book definition. Set `share.subtitle`
if you want a short line below the title.

Capture the preview at 1200 × 630 and save the PNG under `src/books/cards/`.
Substitute the book's preview URL and filename in this command.

```sh
pnpm exec playwright screenshot --viewport-size '1200,630' \
  --wait-for-selector '.book-share-card' \
  http://127.0.0.1:4322/books/your-book/share-card/ \
  src/books/cards/your-book-share.png
```

Set `share.image.file` to the PNG's path and add a short description in
`share.image.alt`. The catalog serves the PNG at
`/open-graph/books/<slug>.png` for every eligible book with an image, and
`BookLayout` links to it from the cover and chapters. Capture a new PNG after
changing the card text or artwork.

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
