import rss from "@astrojs/rss";
import { getBlogPosts } from "src/utils";
import { BASE, SITE_DESCRIPTION, SITE_TITLE } from "../config.json";

export async function GET(context) {
	const posts = await getBlogPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site + BASE,
		items: posts.map((post) => ({
			...post.data,
			link: `${BASE}/blog/${post.id}/`,
		})),
	});
}
