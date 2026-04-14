/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/astro-jsx" />

// Bridge astroHTML.JSX → global JSX for TypeScript 6 compatibility.
// Astro's language server handles this natively, but the VS Code TS server
// needs the global JSX namespace to exist for `.astro` files.
declare namespace JSX {
	type Element = astroHTML.JSX.Element;
	type IntrinsicElements = astroHTML.JSX.IntrinsicElements;
}

// astro-embed-utils exports raw .ts — TS 6 can't resolve through pnpm symlinks.
declare module "@astro-community/astro-embed-utils" {
	export function makeSafeGetter<T>(
		handler: (res: Response) => T | Promise<T>,
	): (url: string) => Promise<T | undefined>;
	export const safeGet: (
		url: string,
	) => Promise<Record<string, any> | undefined>;
}
