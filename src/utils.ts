import { getCollection } from "astro:content";

export const getBlogPosts = async () => {
  const posts = (await getCollection("blog"))
    .filter((post: any) => post.data.published)
    .sort(
      (a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );

  return posts;
};
