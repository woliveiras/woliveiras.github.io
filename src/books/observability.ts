import type { CollectionEntry } from "astro:content";
import { modules } from "../observability/modules";
import { book } from "./observability.book";

export type ReadingPage = {
	slug: string;
	title: string;
	section: string;
	sourceId?: string;
	chapterNumber?: number;
};

const introductionId = "ch-00-before-you-start";
const glossaryId = "ch-99-references";
const chapterSlugs: Readonly<Record<string, string>> = {
	"ch-01-applying-observability-to-ai-agents": "why-agent-observability-is-different",
	"ch-02-structuring-telemetry-for-ai-agents": "the-telemetry-data-model",
};

export function getReadingOrder(entries: CollectionEntry<"observabilitySeries">[]): ReadingPage[] {
	const glossary = entries.find(({ id }) => id === glossaryId);
	if (!glossary || !entries.some(({ id }) => id === introductionId)) {
		throw new Error("The Observability book needs its introduction and glossary sources.");
	}

	const chapters = entries
		.filter(({ id }) => id !== introductionId && id !== glossaryId)
		.sort((a, b) => a.data.order - b.data.order)
		.map(({ id, data }) => {
			const part = modules.find(({ number }) => number === data.module);
			if (!part) throw new Error(`Unknown module ${data.module} in ${id}`);
			return {
				slug: `chapters/${chapterSlugs[id] ?? id.replace(/^ch-\d+-/, "")}`,
				title: data.title,
				section: `Part ${part.number + 1} — ${part.title}`,
				sourceId: id,
				chapterNumber: data.order,
			};
		});

	const order = [
		{ slug: "dedication", title: "Dedication", section: "Opening" },
		{ slug: "introduction", title: "Introduction", section: "Opening", sourceId: introductionId },
		...chapters,
		{ slug: "glossary", title: glossary.data.title, section: "Reference", sourceId: glossaryId },
		{ slug: "appendices/telemetry-placement", title: "Appendix A — Where Telemetry Belongs", section: "Reference" },
	];
	if (new Set(order.map(({ slug }) => slug)).size !== order.length) {
		throw new Error("Two pages in the Observability book use the same URL.");
	}
	return order;
}

export const contents = { slug: "contents", title: "Table of contents" } as const;

export function bookHref(slug?: string) {
	return slug ? `${book.path}${slug}/` : book.path;
}
