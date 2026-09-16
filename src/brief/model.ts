import type { BriefData } from "./schema.ts";

export { BRIEF_TOPICS, type BriefData, type BriefTopicId } from "./schema.ts";

export const BRIEF_TITLE = "Monday Brief";
export const BRIEF_DESCRIPTION =
	"AI engineering in practice: reliable agents, local models, and efficient systems — from cloud to device.";
export const BRIEF_CADENCE =
	"Issues are planned for Mondays, as time, material and my depression allow.";

type BriefEntryLike = { id: string; data: BriefData };

export function briefPath(slug: string): string {
	return `/brief/${slug}/`;
}

export function briefArchivePath(page = 1): string {
	if (!Number.isInteger(page) || page < 1) {
		throw new Error("Archive page must be a positive integer.");
	}
	return page === 1 ? "/brief/" : `/brief/pages/${page}/`;
}

export function isBriefPublic(
	entry: BriefEntryLike,
	now = new Date(),
): boolean {
	return entry.data.published && entry.data.pubDate.getTime() <= now.getTime();
}

function newestFirst(a: BriefEntryLike, b: BriefEntryLike): number {
	const difference = b.data.pubDate.getTime() - a.data.pubDate.getTime();
	if (difference !== 0) return difference;
	return a.data.slug < b.data.slug ? -1 : a.data.slug > b.data.slug ? 1 : 0;
}

export function selectPublicBriefs<T extends BriefEntryLike>(
	entries: readonly T[],
	now = new Date(),
): T[] {
	return entries.filter((entry) => isBriefPublic(entry, now)).sort(newestFirst);
}

export function validateBriefEntries(entries: readonly BriefEntryLike[]): void {
	const slugs = new Map<string, string>();
	const issues = new Map<number, string>();
	for (const entry of entries) {
		const duplicateSlug = slugs.get(entry.data.slug);
		if (duplicateSlug !== undefined) {
			throw new Error(
				`Monday Brief: duplicate slug "${entry.data.slug}" in "${duplicateSlug}" and "${entry.id}".`,
			);
		}
		slugs.set(entry.data.slug, entry.id);
		if (entry.data.issue === undefined) continue;
		const duplicateIssue = issues.get(entry.data.issue);
		if (duplicateIssue !== undefined) {
			throw new Error(
				`Monday Brief: duplicate issue number ${entry.data.issue} in "${duplicateIssue}" and "${entry.id}".`,
			);
		}
		issues.set(entry.data.issue, entry.id);
	}
}

export function getBriefNeighbors<T extends BriefEntryLike>(
	publicEntries: readonly T[],
	slug: string,
): { previous: T | undefined; next: T | undefined } {
	const entries = [...publicEntries].sort(newestFirst);
	const index = entries.findIndex((entry) => entry.data.slug === slug);
	if (index === -1) return { previous: undefined, next: undefined };
	return { previous: entries[index + 1], next: entries[index - 1] };
}
