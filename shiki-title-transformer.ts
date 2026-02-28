/**
 * Shiki transformer that extracts `title="..."` from the code-fence meta
 * string and exposes it as a `data-title` attribute on the rendered `<pre>`
 * element. Also adds `data-language` with the fenced language identifier so
 * both values are available to client-side scripts and CSS.
 *
 * Usage in astro.config.ts:
 *   transformers: [transformerCodeMeta(), ...]
 */
// biome-ignore lint/suspicious/noExplicitAny: Shiki transformer type comes from mismatched resolution paths under pnpm; a plain object avoids the conflict.
export function transformerCodeMeta(): any {
	return {
		name: "transformer-code-meta",
		// biome-ignore lint/suspicious/noExplicitAny: Shiki node type
		pre(node: any) {
			// biome-ignore lint/suspicious/noExplicitAny: Shiki context type
			const raw = (this as any).options?.meta?.__raw;
			if (raw) {
				const titleMatch = raw.match(/title="([^"]+)"/);
				if (titleMatch) {
					node.properties["data-title"] = titleMatch[1];
				}
			}
			// biome-ignore lint/suspicious/noExplicitAny: Shiki context type
			const lang = (this as any).options?.lang;
			if (lang && lang !== "plaintext") {
				node.properties["data-language"] = lang;
			}
		},
	};
}
