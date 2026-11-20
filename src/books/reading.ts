import { type CollectionEntry, getCollection } from "astro:content";
import type { BookDefinition } from "./design";

type BookChapter = CollectionEntry<"bookChapters">;

export function getBookSlug(book: BookDefinition) {
	return book.path.slice("/books/".length, -1);
}

function pagePath({ id, data }: BookChapter) {
	const slug = data.pageSlug ?? id.split("/").at(-1)?.replace(/^ch-\d+-/, "");
	if (data.kind === "chapter") return `chapters/${slug}`;
	if (data.kind === "appendix") return `appendices/${slug}`;
	return data.kind;
}

export async function getBookReadingOrder(book: BookDefinition) {
	const prefix = `${getBookSlug(book)}/`;
	const chapters = await getCollection("bookChapters", ({ id }) => id.startsWith(prefix));
	const pages = chapters.sort((left, right) => left.data.order - right.data.order).map((entry) => {
		const { data } = entry;
		const part = book.parts?.find(({ number }) => number === data.module);
		const chapter = data.kind === "chapter";
		const opening = data.kind === "dedication" || data.kind === "introduction";
		return {
			entry,
			slug: pagePath(entry),
			sourceSlug: entry.id.slice(prefix.length),
			section: chapter ? `Part ${data.module + 1}${part ? ` — ${part.title}` : ""}` : opening ? "Opening" : "Reference",
			sectionDescription: chapter ? part?.description : undefined,
			chapterNumber: chapter ? data.order : undefined,
		};
	});
	if (new Set(pages.map(({ slug }) => slug)).size !== pages.length) {
		throw new Error(`Two pages in ${book.title} use the same URL.`);
	}
	return pages;
}
