import type { BookDefinition } from "./design";

const definitions = import.meta.glob<{ book: BookDefinition }>("./*.book.ts", {
	eager: true,
});
const slugs = new Set<string>();

export const books = Object.entries(definitions).map(([filename, { book }]) => {
	const slug = book?.path.match(/^\/books\/([^/?#]+)\/$/)?.[1];
	if (!slug) {
		throw new Error(`${filename} must export a book with a path like /books/your-book/.`);
	}
	if (slugs.has(slug)) {
		throw new Error(`${filename} uses the same book path as another definition: ${book.path}`);
	}
	slugs.add(slug);
	return { slug, book };
});
