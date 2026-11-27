import { type CollectionEntry, getCollection } from "astro:content";
import { BASE } from "../config.json";

export const languageNames = {
	en: "English",
	"pt-BR": "Português (Brasil)",
	es: "Español",
} as const;

type Edition = CollectionEntry<"talks">;
type Language = keyof typeof languageNames;

export function talkPath(slug: string, lang: Language) {
	return `${BASE}/talks/${slug}/${lang === "en" ? "" : `${lang}/`}`;
}

export async function getVisibleTalks() {
	const groups = new Map<string, Map<Language, Edition>>();
	for (const talk of await getCollection("talks")) {
		const [slug] = talk.id.split("/");
		const { lang } = talk.data;
		if (
			!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
			talk.id !== `${slug}/${lang}`
		) {
			throw new Error(
				`Expected a talk at <english-slug>/${lang}.mdx, got ${talk.id}`,
			);
		}
		const editions = groups.get(slug) ?? new Map<Language, Edition>();
		editions.set(lang, talk);
		groups.set(slug, editions);
	}

	return Array.from(groups).flatMap(([slug, editions]) => {
		if (!editions.has("en"))
			throw new Error(`Missing English edition for talk ${slug}`);
		const visible = (Object.keys(languageNames) as Language[]).flatMap(
			(lang) => {
				const edition = editions.get(lang);
				return edition && (edition.data.published || import.meta.env.DEV)
					? [edition]
					: [];
			},
		);
		return visible.length ? [{ slug, editions: visible }] : [];
	});
}
