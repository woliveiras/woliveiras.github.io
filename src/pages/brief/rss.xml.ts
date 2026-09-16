import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPublicBriefs } from "../../brief/content";
import {
	BRIEF_DESCRIPTION,
	BRIEF_TITLE,
	BRIEF_TOPICS,
	briefPath,
} from "../../brief/model";
import { BASE, SITE } from "../../config.json";

export const GET: APIRoute = async () => {
	const editions = await getPublicBriefs();
	return rss({
		title: BRIEF_TITLE,
		description: BRIEF_DESCRIPTION,
		site: new URL(`${BASE}/brief/`, SITE),
		customData: "<language>en</language>",
		items: editions.map(({ data }) => ({
			title: data.issue
				? `${BRIEF_TITLE} #${data.issue}: ${data.title}`
				: data.title,
			description: data.description,
			pubDate: data.pubDate,
			link: `${BASE}${briefPath(data.slug)}`,
			categories: data.topics.map((topic) => BRIEF_TOPICS[topic]),
		})),
	});
};
