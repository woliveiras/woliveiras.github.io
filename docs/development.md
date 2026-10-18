# Development Workflow

**Package manager:** pnpm (see `packageManager` in package.json)

## Commands

```bash
pnpm dev          # Development server
pnpm build        # Type-check with astro check, then build, then run pagefind
pnpm test         # Model and metadata tests
pnpm test:e2e     # Build isolated fixtures, then test rendering and browser interactions
pnpm lint         # Run Biome without modifying files
pnpm lint:fix     # Run biome check and format
```

**Critical build sequence:** The build runs `astro check && astro build`, then `postbuild` runs `pagefind` to generate search indexes. Never skip the postbuild step.

## Browser regression tests

Install Chromium with `pnpm exec playwright install chromium` before running
`pnpm test:e2e`. Linux hosts may also need browser system dependencies:
`pnpm exec playwright install --with-deps chromium` installs both.

The tests build isolated fixture sites using the real Astro configuration,
components, layouts, and assets. They generate Pagefind indexes and serve the
result to headless Chromium at desktop and mobile widths. Temporary content
does not enter the blog or its build output.

The embed tests cover directive attributes, automatic YouTube and link cards,
explicit component imports, SVGs, video activation by keyboard, unavailable
metadata, math, Mermaid, syntax highlighting, search, theme persistence, mobile
navigation, Open Graph images, and literal colon sequences in model names and
references. External metadata and browser services use
local fixtures; these tests do not verify playback on YouTube's servers.

Before changing a dependency or the embed processor, run this suite on the
current version. Run the same suite after the change. For a historical checkout
that still uses the legacy embed packages, `E2E_ALLOW_LEGACY_EMBEDS=1` disables
only the build warning assertion; the rendering and browser assertions still run.

Pull requests run the model tests, browser tests, and full build. Deployment
runs the tests before building and uploading the site.

## Deployment

**Platform:** GitHub Pages via GitHub Actions

**Workflow:** `.github/workflows/deploy.yml` runs on push to main, every 14 days (cron), or manual dispatch.

**Prerequisites:**
- Playwright must be installed (browsers + system deps) for Mermaid rendering and browser tests
- Uses a Playwright container, `pnpm/action-setup`, and `actions/setup-node`
- Requires pnpm (see `packageManager` in package.json)
