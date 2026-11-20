import type { APIRoute } from "astro";
import { getBlogPosts } from "src/utils";
import { books } from "../books/catalog";
import { getPublicBriefs } from "../brief/content";
import { BRIEF_DESCRIPTION, briefPath } from "../brief/model";
import {
	BASE,
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

	const bookLines = books
		.filter(({ book }) => book.published)
		.map(({ book }) => `- [${book.title}](${new URL(`${BASE}${book.path}`, SITE)}): ${book.description}`)
		.join("\n");

	const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## Products

- [Baseline](${SITE}/baseline/): The portable minimum for disciplined, proportional software engineering with coding agents.

## Blog posts

${postLines}

## Books

${bookLines}

## Monday Brief

- [Monday Brief](${SITE}/brief/): ${BRIEF_DESCRIPTION}
- [Brief RSS feed](${SITE}/brief/rss.xml)

${briefLines}
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
