import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION, BASE } from "../config.json";
import { getBlogPosts } from "src/utils";

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
