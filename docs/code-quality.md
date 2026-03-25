# Code Quality

## Linter: Biome (not ESLint/Prettier)

**Config notes:**
- Uses tabs for indentation
- Double quotes for JavaScript
- Special overrides for `.svelte`, `.astro`, `.vue` files disable `useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports`
- `biome-ignore` comments required for legitimate `any` usage (see `utils.ts`, `add-mermaid-classname.ts`)

**When to use `any`:** Dynamic post structures, AST manipulation — always add `biome-ignore lint/suspicious/noExplicitAny` with explanation.

## Style Guidelines

- Use descriptive biome-ignore comments when necessary
- Follow existing patterns for new embeds, components, or content types
- Maintain strict type safety except where dynamic content requires `any`
- Keep `config.json` as single source of truth for site settings
- Use path aliases (`$components`, `$layouts`, etc.) consistently

## Utility Functions

**`cn()`** in `src/style-utils.ts`: Combines clsx and tailwind-merge for conditional classes (common shadcn pattern).

**Asset handling:** Hero images use `import.meta.glob` pattern with validation (see `[...slug].astro`).
