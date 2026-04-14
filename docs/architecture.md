# Architecture Overview

Static site built with **Astro 5**, TypeScript, Svelte, and Tailwind CSS. Deployed to GitHub Pages.

## Key Directories

- `src/content/blog/` — MDX blog posts (main content)
- `src/content/info/`, `src/content/projects/` — Other content collections
- `src/components/` — Astro and Svelte components (including search)
- `src/embeds/` — Custom MDX embed integrations (YouTube, Excalidraw, LinkCard)
- `src/layouts/` — Page layouts (`BlogPost.astro`, `BaseLayout.astro`, etc.)
- `src/pages/` — File-based routing with dynamic routes (`[...slug].astro`)

## Configuration

**Central config:** `src/config.json` — site metadata, social links, color scheme, and feature flags (SEARCH_ENABLED, SHOW_IMAGES, MANUAL_DARK_MODE, etc.)

**Path aliases** (see `astro.config.ts`):

| Alias | Path |
|---|---|
| `$components` | `./src/components` |
| `$layouts` | `./src/layouts` |
| `$pages` | `./src/pages` |
| `$assets` | `./src/assets` |
| `$content` | `./src/content` |

**Colors:** Configurable via `BASE_COLOR` and `ACCENT_COLOR` in config.json. Maps to Tailwind colors in `tailwind.config.mjs` and prose classes in `src/colors.ts`.
