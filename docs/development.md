# Development Workflow

**Package manager:** pnpm (see `packageManager` in package.json)

## Commands

```bash
pnpm dev          # Development server
pnpm build        # Type-check with astro check, then build, then run pagefind
pnpm lint         # Run biome linter with auto-fix
pnpm lint:fix     # Run biome check and format
```

**Critical build sequence:** The build runs `astro check && astro build`, then `postbuild` runs `pagefind` to generate search indexes. Never skip the postbuild step.

## Deployment

**Platform:** GitHub Pages via GitHub Actions

**Workflow:** `.github/workflows/deploy.yml` runs on push to main, every 14 days (cron), or manual dispatch.

**Prerequisites:**
- Playwright must be installed (browsers + system deps) for OG image generation
- Uses `withastro/action@v4` for build/upload
- Requires pnpm (enabled via corepack)
