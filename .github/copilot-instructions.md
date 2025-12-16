# AI Agent Instructions for William Oliveira's Blog

## Architecture Overview

This is a static site built with **Astro 5**, TypeScript, Svelte, and Tailwind CSS. It's a personal blog/notes site deployed to GitHub Pages.

**Key directories:**
- `src/content/blog/` - MDX blog posts (main content)
- `src/content/info/`, `src/content/projects/`, `src/content/devlog/` - Other content collections
- `src/components/` - Astro and Svelte components (including search)
- `src/embeds/` - Custom MDX embed integrations (YouTube, Excalidraw, LinkCard)
- `src/layouts/` - Page layouts (`BlogPost.astro`, `BaseLayout.astro`, etc.)
- `src/pages/` - File-based routing with dynamic routes (`[...slug].astro`)

## Development Workflow

**Package manager:** pnpm (v10.14.0 - see `packageManager` in package.json)

**Commands:**
```bash
pnpm dev          # Development server
pnpm build        # Type-check with astro check, then build, then run pagefind
pnpm lint         # Run biome linter with auto-fix
pnpm lint:fix     # Run biome check and format
```

**Critical build sequence:** The build runs `astro check && astro build`, then `postbuild` runs `pagefind` to generate search indexes. Never skip the postbuild step.

## Configuration System

**Central config:** `src/config.json` contains site metadata, social links, color scheme, and feature flags (SEARCH_ENABLED, SHOW_IMAGES, MANUAL_DARK_MODE, etc.)

**Path aliases** (see `astro.config.ts`):
```typescript
$components -> ./src/components
$layouts -> ./src/layouts
$pages -> ./src/pages
$assets -> ./src/assets
$content -> ./src/content
```

**Colors:** Configurable via `BASE_COLOR` and `ACCENT_COLOR` in config.json. Maps to Tailwind colors in `tailwind.config.mjs` and prose classes in `src/colors.ts`.

## Content Schema

Blog posts use Astro Content Collections with strict Zod schemas (see `src/content.config.ts`):

**Required fields:**
- `title`, `description`, `pubDate`, `published`

**Optional fields:**
- `heroImage` - Must start with `/src/assets/` and exist in assets glob
- `tags` - Array of strings
- `shortDescription` - For OG images
- `useHeroAsOGImage`, `noTextInOGImage`, `hideHero`, `noImage` - Display controls
- `disableComments`, `disableLikes` - Feature toggles

**Publishing:** Only posts with `published: true` are included via `getBlogPosts()` in `src/utils.ts`.

## Custom Embeds System

Custom MDX directives powered by `astro-custom-embeds`:

**Pattern:** Each embed has three files in `src/embeds/<name>/`:
1. `embed.ts` - Configuration (EmbedsOption with componentName, urlMatcher, directiveName)
2. `matcher.ts` - URL matching logic
3. `<Component>.astro` - Rendering component

**Registered embeds:**
- `:youtube[id]` - YouTube videos
- `:link[url]` - Link preview cards
- `:excalidraw[url]` - Excalidraw diagrams

**To add new embeds:** Create the three files, export from `src/embeds/index.ts`, register in `astro.config.ts` embeds array.

## Markdown Processing

**Remark plugins:** `remarkMath`

**Rehype plugins:** 
- `addMermaidClass` (custom, see `add-mermaid-classname.ts`) - Adds class to mermaid diagrams
- `rehypeMermaid` - Renders mermaid diagrams
- `rehypeMathjax` - Math rendering

**Syntax highlighting:** Shiki with dual themes (github-light/dark), transformers for meta-highlight and notation-highlight.

## Code Quality

**Linter:** Biome (not ESLint/Prettier)

**Biome config notes:**
- Uses tabs for indentation
- Double quotes for JavaScript
- Special overrides for `.svelte`, `.astro`, `.vue` files disable `useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports`
- `biome-ignore` comments required for legitimate 'any' usage (see utils.ts, add-mermaid-classname.ts)

**When to use `any`:** Dynamic post structures, AST manipulation, but always add `biome-ignore lint/suspicious/noExplicitAny` with explanation.

## Search Functionality

Powered by Pagefind (generated in postbuild):
- Svelte store in `src/components/search/CommandPaletteStore.ts`
- Command palette UI in `src/components/search/CommandPalette.svelte`
- `data-pagefind-body` attribute marks indexed content (see `BlogPost.astro` layout)

## Dynamic Routing

**Pattern:** Use `getStaticPaths()` with `getBlogPosts()`:

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

## Utility Functions

**`cn()`** in `src/style-utils.ts`: Combines clsx and tailwind-merge for conditional classes (common shadcn pattern).

**Asset handling:** Hero images use `import.meta.glob` pattern with validation (see `[...slug].astro` lines 28-35).

## Deployment

**Platform:** GitHub Pages via GitHub Actions

**Workflow:** `.github/workflows/deploy.yml` runs on push to main, every 14 days (cron), or manual dispatch.

**Prerequisites:** 
- Playwright must be installed (browsers + system deps) for OG image generation
- Uses `withastro/action@v4` for build/upload
- Requires pnpm (enabled via corepack)

## Style Guidelines

- Use descriptive biome-ignore comments when necessary
- Follow existing patterns for new embeds, components, or content types
- Maintain strict type safety except where dynamic content requires `any`
- Keep config.json as single source of truth for site settings
- Use path aliases ($components, $layouts, etc.) consistently
