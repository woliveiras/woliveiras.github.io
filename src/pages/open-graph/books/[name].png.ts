import { readFile } from "node:fs/promises";
import type { APIRoute } from "astro";
import { books } from "../../../books/catalog";
import { isBookAvailable } from "../../../books/design";

export function getStaticPaths() {
	return books.flatMap(({ book, slug }) => {
		const image = book.share?.image;
		if (!image || !isBookAvailable(book, import.meta.env.MODE)) return [];

		return [{ params: { name: slug }, props: { file: image.file } }];
	});
}

export const GET: APIRoute = async ({ props }) => {
	const png = await readFile(props.file);
	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
};
