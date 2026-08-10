import type { APIRoute } from "astro";
import { getBlogPosts } from "src/utils";

export async function getStaticPaths() {
	const posts = await getBlogPosts();

	// biome-ignore lint/suspicious/noExplicitAny: dynamic post structure
	return posts.map((post: any) => ({
		params: { slug: post.id },
		props: post,
	}));
}

export const GET: APIRoute = ({ props }) => {
	// biome-ignore lint/suspicious/noExplicitAny: dynamic post structure
	const post = props as any;
	const { title, description, pubDate, updatedDate, tags } = post.data;

	const header = [
		`# ${title}`,
		"",
		description,
		"",
		`Published: ${pubDate.toISOString().split("T")[0]}`,
		updatedDate ? `Updated: ${updatedDate.toISOString().split("T")[0]}` : null,
		tags?.length ? `Tags: ${tags.join(", ")}` : null,
		"",
		"---",
		"",
	]
		.filter((line: string | null) => line !== null)
		.join("\n");

	const body = `${header}${post.body ?? ""}`;

	return new Response(body, {
		headers: { "Content-Type": "text/markdown; charset=utf-8" },
	});
};
