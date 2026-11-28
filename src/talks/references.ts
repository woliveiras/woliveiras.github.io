import type { MarkdownInstance } from "astro";
import { talkPath } from "./catalog";

const documents = import.meta.glob<MarkdownInstance<Record<string, unknown>>>(
	"../content/talks/*/references.md",
);

export function getTalkReferences(slug: string) {
	return documents[`../content/talks/${slug}/references.md`];
}

export function referencesPath(slug: string) {
	return `${talkPath(slug, "en")}references/`;
}
