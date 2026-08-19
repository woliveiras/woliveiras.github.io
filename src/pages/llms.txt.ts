import type { APIRoute } from "astro";
import { getBlogPosts } from "src/utils";
import { SERIES, SITE, SITE_DESCRIPTION, SITE_NAME } from "../config.json";

export const GET: APIRoute = async () => {
	const posts = await getBlogPosts();

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
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
