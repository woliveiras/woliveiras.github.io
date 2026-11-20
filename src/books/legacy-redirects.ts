import { type BookDefinition, isBookAvailable } from "./design";
import { getBookReadingOrder } from "./reading";

export async function getBookRedirects(
	book: BookDefinition,
	mode: string,
	aliases: Readonly<Record<string, string>> = {},
) {
	if (!isBookAvailable(book, mode)) return [];
	const pages = await getBookReadingOrder(book);
	const destinations = new Map(pages.filter(({ sourceSlug }) => sourceSlug.startsWith("ch-")).map(
		({ sourceSlug, slug }) => [sourceSlug, `${book.path}${slug}/`],
	));

	for (const [alias, slug] of Object.entries(aliases)) {
		const destination = destinations.get(slug);
		if (!destination) throw new Error(`Missing book page for legacy alias ${alias}`);
		destinations.set(alias, destination);
	}

	return [
		{ params: { slug: undefined }, props: { destination: book.path } },
		...Array.from(destinations, ([slug, destination]) => ({
			params: { slug },
			props: { destination },
		})),
	];
}
