import type { APIRoute } from "astro";
import { getBlogPosts } from "src/utils";
import { getPublicBriefs } from "../brief/content";
import { BRIEF_DESCRIPTION, briefPath } from "../brief/model";
import {
	BASE,
	SERIES,
	SITE,
	SITE_DESCRIPTION,
	SITE_NAME,
} from "../config.json";

export const GET: APIRoute = async () => {
	const posts = await getBlogPosts();
	const briefs = await getPublicBriefs();
	const briefLines = briefs
		.map(
			({ data }) =>
				`- [${data.title}](${new URL(`${BASE}${briefPath(data.slug)}`, SITE)}): ${data.description}`,
		)
		.join("\n");

	const postLines = posts
		.map(
			// biome-ignore lint/suspicious/noExplicitAny: dynamic post structure
			(post: any) =>
				`- [${post.data.title}](${SITE}/posts/${post.id}/): ${post.data.description}`,
		)
		.join("\n");

	const seriesLines = SERIES.map(
		(series) => `- [${series.name}](${SITE}${series.href})`,
	).join("\n");

	const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## Products

- [Baseline](${SITE}/baseline/): The portable minimum for disciplined, proportional software engineering with coding agents.

## Blog posts

${postLines}

## Series

${seriesLines}

## Monday Brief

- [Monday Brief](${SITE}/brief/): ${BRIEF_DESCRIPTION}
- [Brief RSS feed](${SITE}/brief/rss.xml)

${briefLines}
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
