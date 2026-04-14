import { makeSafeGetter } from "@astro-community/astro-embed-utils";
import * as cheerio from "cheerio";

const safeGetDOM = makeSafeGetter(async (res: Response) => {
	const html = await res.text();
	return cheerio.load(html);
});

/** Helper to get the `content` attribute of an element. */
// biome-ignore lint/suspicious/noExplicitAny: cheerio internal node type
const getContent = (el: cheerio.Cheerio<any> | null) =>
	el?.attr("content");
/** Helper to filter out insecure or non-absolute URLs. */
const urlOrNull = (url: string | null | undefined) =>
	url?.slice(0, 8) === "https://" ? url : null;

/**
 * Loads and parses an HTML page to return Open Graph metadata.
 * @param pageUrl URL to parse
 */
export async function parseOpenGraph(pageUrl: string) {
	const $ = await safeGetDOM(pageUrl);
	if (!$) return;

	const getMetaProperty = (prop: string) =>
		getContent($(`meta[property=${JSON.stringify(prop)}]`));
	const getMetaName = (name: string) =>
		getContent($(`meta[name=${JSON.stringify(name)}]`));

	const title =
		getMetaProperty("og:title") || $("title").text();
	const description =
		getMetaProperty("og:description") || getMetaName("description");
	const image = urlOrNull(
		getMetaProperty("og:image:secure_url") ||
			getMetaProperty("og:image:url") ||
			getMetaProperty("og:image"),
	);
	const imageAlt = getMetaProperty("og:image:alt");
	const video = urlOrNull(
		getMetaProperty("og:video:secure_url") ||
			getMetaProperty("og:video:url") ||
			getMetaProperty("og:video"),
	);
	const videoType = getMetaProperty("og:video:type");
	const url =
		urlOrNull(
			getMetaProperty("og:url") ||
				$("link[rel='canonical']").attr("href"),
		) || pageUrl;

	return { title, description, image, imageAlt, url, video, videoType };
}
