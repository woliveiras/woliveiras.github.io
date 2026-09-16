import { type CollectionEntry, getCollection } from "astro:content";
import { selectPublicBriefs, validateBriefEntries } from "./model.ts";

export type BriefEntry = CollectionEntry<"brief">;

export async function getBriefEntries(): Promise<BriefEntry[]> {
	const entries = await getCollection("brief");
	validateBriefEntries(entries);
	return entries;
}

export async function getPublicBriefs(): Promise<BriefEntry[]> {
	return selectPublicBriefs(await getBriefEntries());
}

export async function getBriefRouteEntries(): Promise<BriefEntry[]> {
	const entries = await getBriefEntries();
	return import.meta.env.DEV ? entries : selectPublicBriefs(entries);
}
