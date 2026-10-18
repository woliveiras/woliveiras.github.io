import assert from "node:assert/strict";
import { cp, readFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import {
	command,
	fixtureSite,
	packageBinary,
	repository,
	withStaticServer,
} from "./helpers/site.mjs";

const post = "/posts/embeds/";
const poster =
	'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="navy"/></svg>';

test("blog components render and work in the browser", {
	timeout: 180_000,
}, async (t) => {
	const workspace = await fixtureSite();
	try {
		await cp(
			join(repository, "tests/fixtures/embeds.mdx"),
			join(workspace, "src/content/blog/embeds.mdx"),
		);
		const preload = pathToFileURL(
			join(repository, "tests/fixtures/embed-fetch.mjs"),
		).href;
		const build = await command(
			workspace,
			await packageBinary("astro", "astro"),
			["build"],
			{
				NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ""} --import=${preload}`,
			},
		);
		const pagefind = join(
			dirname(fileURLToPath(import.meta.resolve("pagefind"))),
			"runner/bin.cjs",
		);
		await command(workspace, pagefind, ["--site", "dist"]);
		t.diagnostic(
			`Astro ${JSON.parse(await readFile(fileURLToPath(import.meta.resolve("astro/package.json")), "utf8")).version}`,
		);
		if (process.env.E2E_ALLOW_LEGACY_EMBEDS !== "1") {
			assert.doesNotMatch(
				build.stdout + build.stderr,
				/markdown\.remarkPlugins.*deprecated|astro-auto-import|astro-custom-embeds/,
			);
		}
		await withStaticServer(join(workspace, "dist"), async (origin) => {
			const browser = await chromium.launch({ headless: true });
			try {
				for (const viewport of [
					{ width: 1280, height: 900 },
					{ width: 390, height: 844 },
				]) {
					await t.test(
						`${viewport.width}px: embeds, Markdown, navigation and search`,
						async () => {
							// A desktop user agent keeps YouTube's iframe path deterministic at both widths.
							const context = await browser.newContext({
								viewport,
								colorScheme: "light",
							});
							try {
								const page = await context.newPage();
								const errors = [];
								const localFailures = [];
								page.on("pageerror", (error) => errors.push(error.message));
								page.on("response", (response) => {
									if (
										response.url().startsWith(origin) &&
										response.status() >= 400
									)
										localFailures.push(response.url());
								});
								await page.route("**/*", (route) => {
									const url = route.request().url();
									if (url.startsWith(origin)) return route.continue();
									if (url.includes("overlay-widget.js"))
										return route.fulfill({
											contentType: "text/javascript",
											body: "window.kofiWidgetOverlay = { draw() {} };",
										});
									if (route.request().resourceType() === "image")
										return route.fulfill({
											contentType: "image/svg+xml",
											body: poster,
										});
									if (url.startsWith("https://www.youtube-nocookie.com/embed/"))
										return route.fulfill({
											contentType: "text/html",
											body: "<!doctype html><title>Fixture player</title>",
										});
									return route.abort();
								});
								await page.goto(`${origin}${post}`, {
									waitUntil: "networkidle",
								});
								assert.equal(
									await page.locator("h1").textContent(),
									"Embed rendering fixture",
								);
								assert.equal(await page.locator("lite-youtube").count(), 8);
								assert.equal(
									await page.locator("lite-youtube iframe").count(),
									0,
								);
								const video = page.locator(
									'lite-youtube[title="Directive video"]',
								);
								assert.equal(
									await video.getAttribute("title"),
									"Directive video",
								);
								assert.equal(
									await page
										.locator('lite-youtube[title="Leaf video"]')
										.count(),
									1,
								);
								assert.equal(
									await page
										.locator('lite-youtube[title="Container video"]')
										.count(),
									1,
								);
								await video
									.getByRole("button", { name: "Play fixture video" })
									.press("Enter");
								await video.locator("iframe").waitFor();
								const playerURL = new URL(
									await video.locator("iframe").getAttribute("src"),
								);
								assert.equal(playerURL.hostname, "www.youtube-nocookie.com");
								assert.equal(playerURL.searchParams.get("start"), "5");
								assert.equal(playerURL.searchParams.get("autoplay"), "1");

								const card = page.locator("article#directive-card");
								assert.match(await card.textContent(), /Custom card title/);
								assert.match(
									await card.textContent(),
									/Custom card description/,
								);
								assert.equal(
									await card.locator("a").getAttribute("href"),
									"https://embed.test/article",
								);
								assert.equal(
									await card.locator("img").getAttribute("alt"),
									"Fixture poster",
								);
								assert.equal(
									await page
										.locator('article a[href="https://embed.test/automatic"]')
										.count(),
									1,
								);
								assert.equal(
									await page
										.locator('li article a[href="https://embed.test/list"]')
										.count(),
									1,
								);
								assert.match(
									await page.locator("#unavailable-card").textContent(),
									/https:\/\/embed.test\/unavailable/,
								);
								assert.equal(
									await page
										.locator("#video-card video source")
										.getAttribute("type"),
									"video/mp4",
								);
								assert.equal(
									await page.locator("#explicit-card a").getAttribute("href"),
									"https://embed.test/explicit",
								);

								assert.equal(
									await page
										.locator('.excalidraw-svg[aria-label="Fixture SVG"] svg')
										.count(),
									1,
								);
								assert.equal(
									await page
										.locator('.excalidraw-svg[aria-label="Explicit SVG"] svg')
										.count(),
									1,
								);
								assert.equal(
									(
										await page
											.locator("figure.fixture-diagram figcaption")
											.textContent()
									).trim(),
									"Diagram caption",
								);
								assert.equal(
									await page
										.getByRole("link", { name: "Named link", exact: true })
										.count(),
									1,
								);
								assert.equal(
									await page
										.locator('p > a[href="https://embed.test/inline"]')
										.count(),
									1,
								);
								assert.equal(
									await page
										.locator('p > a[href="https://youtu.be/dQw4w9WgXcQ"]')
										.count(),
									1,
								);
								assert.match(
									await page.locator("pre code").first().textContent(),
									/:youtube\[dQw4w9WgXcQ\]/,
								);
								const articleText = await page
									.locator("[data-pagefind-body]")
									.textContent();
								for (const text of [
									"gemma3:270m",
									"Llama-3.1:8B",
									"Qwen-2.5:7B",
									"arXiv:2605.20049",
									"1:1",
								]) {
									assert.ok(
										articleText.includes(text),
										`${text} must survive directive parsing`,
									);
								}
								assert.equal(
									(await page.locator(".code-title-text").textContent()).trim(),
									"fixture.ts",
								);
								assert.equal(await page.locator("table tbody tr").count(), 1);
								assert.equal(
									await page.locator("mjx-container svg").count(),
									1,
								);
								assert.equal(
									await page
										.locator('svg[aria-roledescription="flowchart-v2"]')
										.count(),
									1,
								);
								assert.ok(
									await page
										.locator(".fixture-diagram svg")
										.evaluate((el) => el.getBoundingClientRect().width > 0),
								);

								if (viewport.width < 768) {
									await page
										.getByRole("button", { name: "Open menu", exact: true })
										.click();
									await page
										.getByRole("button", { name: "Close menu", exact: true })
										.waitFor({ state: "visible" });
								}
								await page
									.locator("astro-island:not([ssr]) .search-button:visible")
									.click();
								await page.getByRole("combobox").fill("renderfixturetoken");
								const result = page
									.getByRole("dialog")
									.locator(`a[href="${post}"]`);
								await result.waitFor();
								await page.keyboard.press("Escape");
								await page.getByRole("dialog").waitFor({ state: "hidden" });
								if (viewport.width < 768)
									await page
										.getByRole("button", { name: "Open menu", exact: true })
										.click();
								await page.locator("[data-theme-toggle]:visible").click();
								if (viewport.width < 768)
									await page
										.getByRole("button", { name: "Close menu", exact: true })
										.click();
								assert.equal(
									await page
										.locator("html")
										.evaluate((el) => el.classList.contains("dark")),
									true,
								);
								await page.reload({ waitUntil: "networkidle" });
								assert.equal(
									await page
										.locator("html")
										.evaluate((el) => el.classList.contains("dark")),
									true,
								);
								assert.equal(
									await page.evaluate(
										() =>
											document.documentElement.scrollWidth <= window.innerWidth,
									),
									true,
								);
								assert.deepEqual(localFailures, []);
								assert.deepEqual(errors, []);
								const imageURL = await page
									.locator('meta[property="og:image"]')
									.getAttribute("content");
								const image = await sharp(
									join(workspace, "dist", new URL(imageURL).pathname),
								).metadata();
								assert.deepEqual([image.width, image.height], [1200, 630]);
							} finally {
								await context.close();
							}
						},
					);
				}
			} finally {
				await browser.close();
			}
		});
	} finally {
		await rm(workspace, { recursive: true, force: true });
	}
});
