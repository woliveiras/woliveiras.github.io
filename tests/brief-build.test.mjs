import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import {
	access,
	cp,
	mkdir,
	mkdtemp,
	readdir,
	readFile,
	rm,
	symlink,
	writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { load } from "cheerio";
import { chromium } from "playwright";

const run = promisify(execFile);
const repository = fileURLToPath(new URL("../", import.meta.url));
const config = JSON.parse(
	await readFile(join(repository, "src/config.json"), "utf8"),
);
const publicSlugs = Array.from(
	{ length: 7 },
	(_, index) => `fixture-${index + 1}`,
);
const privateSlugs = ["fixture-draft", "fixture-future"];

async function packageBinary(name, binary) {
	const packagePath = fileURLToPath(
		import.meta.resolve(`${name}/package.json`),
	);
	const packageData = JSON.parse(await readFile(packagePath, "utf8"));
	return resolve(
		dirname(packagePath),
		typeof packageData.bin === "string"
			? packageData.bin
			: packageData.bin[binary],
	);
}

// Resolve through the installed packages; no CLI downloads or global installs.
const astroBinary = await packageBinary("astro", "astro");
const pagefindBinary = join(
	dirname(fileURLToPath(import.meta.resolve("pagefind"))),
	"runner/bin.cjs",
);

async function command(workspace, binary, args) {
	try {
		return await run(process.execPath, [binary, ...args], {
			cwd: workspace,
			env: {
				...process.env,
				ASTRO_TELEMETRY_DISABLED: "1",
				FORCE_COLOR: "0",
				CI: "1",
			},
			timeout: 120_000,
			maxBuffer: 10 * 1024 * 1024,
		});
	} catch (error) {
		error.message += `\n${error.stdout ?? ""}\n${error.stderr ?? ""}`;
		throw error;
	}
}

async function exists(path) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

async function filesUnder(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const path = join(directory, entry.name);
			return entry.isDirectory() ? filesUnder(path) : [path];
		}),
	);
	return files.flat();
}

async function prepareWorkspace() {
	const workspace = await mkdtemp(join(tmpdir(), "monday-brief-test-"));
	try {
		const rootFiles = [
			"package.json",
			"astro.config.ts",
			"tsconfig.json",
			"tailwind.config.mjs",
			"pagefind.json",
			"add-mermaid-classname.ts",
			"shiki-title-transformer.ts",
		];
		await Promise.all(
			rootFiles.map((file) =>
				cp(join(repository, file), join(workspace, file)),
			),
		);
		await cp(join(repository, "src"), join(workspace, "src"), {
			recursive: true,
			filter: (source) =>
				!["content", "pages", "assets"].includes(
					relative(join(repository, "src"), source).split(sep)[0],
				),
		});
		// Share installed packages, but keep Astro/Vite caches inside the fixture workspace.
		await mkdir(join(workspace, "node_modules"));
		await Promise.all(
			(await readdir(join(repository, "node_modules")))
				.filter((name) => !name.startsWith("."))
				.map((name) =>
					symlink(
						join(repository, "node_modules", name),
						join(workspace, "node_modules", name),
						"dir",
					),
				),
		);
		await symlink(
			join(repository, "src/assets"),
			join(workspace, "src/assets"),
			"dir",
		);
		await mkdir(join(workspace, "src/pages"), { recursive: true });
		await Promise.all(
			["brief", "open-graph", "llms.txt.ts"].map((path) =>
				cp(
					join(repository, "src/pages", path),
					join(workspace, "src/pages", path),
					{ recursive: true },
				),
			),
		);
		await Promise.all(
			[
				"brief",
				"blog",
				"hands-on-coding-assistants",
				"observability-ai-agents",
			].map((collection) =>
				mkdir(join(workspace, "src/content", collection), { recursive: true }),
			),
		);
		await writeFile(
			join(workspace, "src/pages/blog-fixture.astro"),
			`<!doctype html><html lang="en"><head><title>Blog test fixture</title></head><body><main data-pagefind-body><h1>Blog test fixture</h1><p>sharedfixturetoken blogfixturetoken. Synthetic search fixture only.</p></main></body></html>\n`,
		);
		return workspace;
	} catch (error) {
		await rm(workspace, { recursive: true, force: true });
		throw error;
	}
}

function fixture({
	index = 1,
	slug = `fixture-${index}`,
	published = true,
	future = false,
	issue = index,
	lab,
} = {}) {
	const frontmatter = [
		`title: ${JSON.stringify(`Technical demonstration ${index}`)}`,
		`slug: ${JSON.stringify(slug)}`,
		`description: ${JSON.stringify(`Test fixture ${index} for issue summaries; no real news.`)}`,
		`pubDate: "${future ? "9999-01-01" : `2001-01-${String(index).padStart(2, "0")}`}"`,
		...(index === 7 ? ['updatedDate: "2001-02-07"'] : []),
		...(issue === null ? [] : [`issue: ${issue}`]),
		'period: { start: "2000-12-25", end: "2000-12-31" }',
		`published: ${published}`,
		'topics: ["agents", "local-ai"]',
	];
	return `---\n${frontmatter.join("\n")}\n---

import BriefTopic from "$components/brief/BriefTopic.astro";
import BriefLab from "$components/brief/BriefLab.astro";

This is synthetic content for local tests, not a real issue.

${published && !future ? "sharedfixturetoken publicfixturetoken" : slug === "fixture-draft" ? "privatedraftfixturetoken" : "privatefuturefixturetoken"}

<BriefTopic topic="agents">

### Architecture demonstration item

This fixture checks the presentation of sources, impact, and limitations without claiming any news.

</BriefTopic>

<BriefTopic topic="local-ai">

### Local models demonstration item

This text exists only to validate navigation anchors.

</BriefTopic>

${
	lab
		? `<BriefLab status="${lab}">

### Fixture question

This synthetic state tests the component. It does not represent an experiment or measurement by the author.

\`\`\`sh
printf 'local presentation fixture\\n'
\`\`\`

| Field | Demonstration value |
| --- | --- |
| Actual measurements | None |

</BriefLab>`
		: ""
}
`;
}

async function writeFixtures(workspace) {
	await Promise.all(
		publicSlugs.map((slug, offset) => {
			const index = offset + 1;
			return writeFile(
				join(workspace, "src/content/brief", `source-${8 - index}.mdx`),
				fixture({
					index,
					slug,
					issue: index === 3 ? null : index,
					lab: index === 7 ? "proposed" : index === 6 ? "completed" : undefined,
				}),
			);
		}),
	);
	await writeFile(
		join(workspace, "src/content/brief/draft.mdx"),
		fixture({ index: 8, slug: privateSlugs[0], published: false }),
	);
	await writeFile(
		join(workspace, "src/content/brief/future.mdx"),
		fixture({ index: 9, slug: privateSlugs[1], future: true }),
	);
}

async function parseHTML(dist, route) {
	return load(await readFile(join(dist, route, "index.html"), "utf8"));
}

function archiveLinks($) {
	return $(".brief-entry-title a[href]")
		.toArray()
		.map((element) => $(element).attr("href"));
}

async function withStaticServer(dist, callback) {
	const contentTypes = {
		".html": "text/html",
		".js": "text/javascript",
		".wasm": "application/wasm",
		".json": "application/json",
		".css": "text/css",
	};
	const server = createServer(async (request, response) => {
		try {
			const pathname = decodeURIComponent(
				new URL(request.url, "http://localhost").pathname,
			);
			const path = resolve(
				dist,
				`.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`,
			);
			if (!path.startsWith(`${dist}${sep}`)) {
				response.writeHead(403).end();
				return;
			}
			response.setHeader(
				"Content-Type",
				contentTypes[extname(path)] ?? "application/octet-stream",
			);
			response.end(await readFile(path));
		} catch {
			response.writeHead(404).end();
		}
	});
	await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
	try {
		await callback(`http://127.0.0.1:${server.address().port}`);
	} finally {
		await new Promise((done) => server.close(done));
	}
}

test("Monday Brief builds public routes, metadata and search from isolated fixtures", {
	timeout: 300_000,
}, async (t) => {
	const workspace = await prepareWorkspace();
	const dist = join(workspace, "dist");
	try {
		await writeFixtures(workspace);
		await command(workspace, astroBinary, ["build"]);

		await t.test(
			"archive is chronological, paginated, and has one latest-edition feature",
			async () => {
				assert.equal(
					config.POSTS_PER_PAGE,
					5,
					"Adjust fixture count if the shared page size changes.",
				);
				const first = await parseHTML(dist, "brief");
				const second = await parseHTML(dist, "brief/pages/2");
				assert.equal(first("html").attr("lang"), "en");
				assert.equal(second("html").attr("lang"), "en");
				assert.equal(first(".brief-entry-featured").length, 1);
				assert.equal(second(".brief-entry-featured").length, 0);
				assert.deepEqual(
					archiveLinks(first),
					[7, 6, 5, 4, 3].map((index) => `/brief/fixture-${index}/`),
				);
				assert.deepEqual(
					archiveLinks(second),
					[2, 1].map((index) => `/brief/fixture-${index}/`),
				);
				assert.equal(first('a[rel="next"]').attr("href"), "/brief/pages/2/");
				assert.equal(second('a[rel="prev"]').attr("href"), "/brief/");
				assert.equal(
					await exists(join(dist, "brief/pages/1/index.html")),
					false,
				);
				assert.equal(
					await exists(join(dist, "brief/pages/3/index.html")),
					false,
				);
				assert.equal(
					first('link[rel="alternate"][type="application/rss+xml"]').attr(
						"href",
					),
					"/brief/rss.xml",
				);
				assert.ok(
					first('header a[href="/brief/"]').length > 0,
					"Brief belongs to the shared navigation.",
				);
			},
		);

		await t.test(
			"individual editions have stable URLs, article metadata, anchors and optional sections",
			async () => {
				const $ = await parseHTML(dist, "brief/fixture-7");
				const canonical = new URL("/brief/fixture-7/", config.SITE).href;
				assert.equal($("html").attr("lang"), "en");
				assert.equal($("h1").length, 1);
				assert.equal($("h1").text(), "Technical demonstration 7");
				assert.equal($('link[rel="canonical"]').attr("href"), canonical);
				assert.equal($('meta[property="og:url"]').attr("content"), canonical);
				assert.equal($('meta[property="og:type"]').attr("content"), "article");
				assert.equal(
					$('meta[property="og:image"]').attr("content"),
					new URL("/open-graph/brief/fixture-7.png", config.SITE).href,
				);
				assert.equal(
					await exists(join(dist, "open-graph/brief/fixture-7.png")),
					true,
				);
				assert.equal(
					$('meta[property="article:published_time"]').attr("content"),
					"2001-01-07T00:00:00.000Z",
				);
				assert.equal(
					$(
						'.brief-publication-dates time[datetime="2001-01-07T00:00:00.000Z"]',
					).text(),
					"January 7, 2001",
				);
				assert.equal(
					$('meta[property="article:modified_time"]').attr("content"),
					"2001-02-07T00:00:00.000Z",
				);
				const structured = JSON.parse(
					$('script[type="application/ld+json"]').text(),
				);
				assert.equal(structured["@type"], "BlogPosting");
				assert.equal(structured.inLanguage, "en");
				assert.equal(structured.url, canonical);
				assert.equal(structured.mainEntityOfPage["@id"], canonical);
				assert.equal(
					structured.isPartOf.url,
					new URL("/brief/", config.SITE).href,
				);
				assert.equal(structured.dateModified, "2001-02-07T00:00:00.000Z");
				assert.equal($('[data-pagefind-meta="type"]').text(), "Brief");
				assert.equal($("[data-pagefind-body]").length, 1);
				for (const anchor of ["agents", "local-ai"]) {
					assert.equal($(`h2#${anchor}`).length, 1);
					assert.equal($(`nav a[href="#${anchor}"]`).length, 1);
				}
				assert.equal($("#laboratorio").length, 1);
				assert.match($(".brief-lab").text(), /Proposed experiment/);
				assert.match($(".brief-lab").text(), /No measurements to report/);
				assert.equal($(".brief-lab pre code").length, 1);
				assert.equal($(".brief-lab table").length, 1);
				const completed = await parseHTML(dist, "brief/fixture-6");
				assert.match(completed(".brief-lab").text(), /Completed experiment/);
				const minimal = await parseHTML(dist, "brief/fixture-3");
				assert.equal(minimal("#laboratorio").length, 0);
				assert.doesNotMatch(
					minimal(".brief-edition-header").text(),
					/Issue \d|undefined/,
				);
			},
		);

		await t.test(
			"neighbors follow public dates and do not cross unpublished editions",
			async () => {
				for (let index = 1; index <= 7; index++) {
					const $ = await parseHTML(dist, `brief/fixture-${index}`);
					assert.equal(
						$('.brief-neighbors a[rel="prev"]').attr("href"),
						index > 1 ? `/brief/fixture-${index - 1}/` : undefined,
					);
					assert.equal(
						$('.brief-neighbors a[rel="next"]').attr("href"),
						index < 7 ? `/brief/fixture-${index + 1}/` : undefined,
					);
				}
			},
		);

		await t.test(
			"drafts and future editions are absent from generated routes and distribution",
			async () => {
				for (const slug of privateSlugs) {
					assert.equal(
						await exists(join(dist, "brief", slug, "index.html")),
						false,
					);
					assert.equal(
						await exists(join(dist, "open-graph/brief", `${slug}.png`)),
						false,
					);
				}
				const textFiles = (await filesUnder(dist)).filter((path) =>
					[".html", ".xml", ".txt", ".js", ".mjs", ".json", ".md"].includes(
						extname(path),
					),
				);
				for (const file of textFiles) {
					const text = await readFile(file, "utf8");
					for (const marker of [
						...privateSlugs,
						"privatedraftfixturetoken",
						"privatefuturefixturetoken",
					]) {
						assert.equal(
							text.includes(marker),
							false,
							`${relative(dist, file)} must not contain ${marker}`,
						);
					}
				}
				const rss = load(await readFile(join(dist, "brief/rss.xml"), "utf8"), {
					xml: true,
				});
				assert.deepEqual(
					rss("item > link")
						.toArray()
						.map((item) => rss(item).text()),
					[...publicSlugs]
						.reverse()
						.map((slug) => new URL(`/brief/${slug}/`, config.SITE).href),
				);
				assert.equal(rss("channel > language").text(), "en");
				const sitemap = await readFile(join(dist, "sitemap-0.xml"), "utf8");
				const llms = await readFile(join(dist, "llms.txt"), "utf8");
				for (const slug of publicSlugs) {
					assert.ok(sitemap.includes(`/brief/${slug}/`));
					assert.ok(llms.includes(`/brief/${slug}/`));
				}
			},
		);

		await t.test(
			"Pagefind finds blog and Brief content with badges and canonical routes from either page",
			async () => {
				await command(workspace, pagefindBinary, ["--site", "dist"]);
				await withStaticServer(dist, async (origin) => {
					const browser = await chromium.launch({ headless: true });
					try {
						const page = await browser.newPage();
						await page.route("**/*", (route) =>
							route.request().url().startsWith(origin)
								? route.continue()
								: route.abort(),
						);
						for (const path of ["/blog-fixture/", "/brief/fixture-7/"]) {
							await page.goto(`${origin}${path}`, {
								waitUntil: "domcontentloaded",
							});
							const results = await page.evaluate(async () => {
								const pagefind = await import("/pagefind/pagefind.js");
								const shared = await pagefind.search("sharedfixturetoken");
								const draft = await pagefind.search("privatedraftfixturetoken");
								const future = await pagefind.search(
									"privatefuturefixturetoken",
								);
								return {
									shared: await Promise.all(
										shared.results.map(async (result) => {
											const data = await result.data();
											return {
												url: data.url,
												type: data.meta.type,
												title: data.meta.title,
											};
										}),
									),
									draft: draft.results.length,
									future: future.results.length,
								};
							});
							assert.equal(results.shared.length, 8, path);
							assert.ok(
								results.shared.some(
									(result) => result.url === "/blog-fixture/",
								),
							);
							const briefs = results.shared.filter(
								(result) => result.type === "Brief",
							);
							assert.deepEqual(
								briefs.map((result) => result.url).sort(),
								publicSlugs.map((slug) => `/brief/${slug}/`).sort(),
							);
							assert.equal(results.draft, 0);
							assert.equal(results.future, 0);
						}
					} finally {
						await browser.close();
					}
				});
			},
		);

		// Remaining builds exercise the real loader without rendering OG images again.
		await rm(join(workspace, "src/pages/open-graph"), {
			recursive: true,
			force: true,
		});
		await t.test(
			"the real loader rejects duplicate editorial slugs across different source files",
			async () => {
				await writeFile(
					join(workspace, "src/content/brief/collision.mdx"),
					fixture({ index: 8, slug: "fixture-7", published: false, issue: 98 }),
				);
				await assert.rejects(
					command(workspace, astroBinary, ["build"]),
					/duplicate slug.*fixture-7/,
				);
				await rm(join(workspace, "src/content/brief/collision.mdx"));
			},
		);
		await t.test(
			"duplicate issue numbers fail even when the colliding edition is a draft",
			async () => {
				await writeFile(
					join(workspace, "src/content/brief/collision.mdx"),
					fixture({
						index: 8,
						slug: "unique-collision",
						published: false,
						issue: 7,
					}),
				);
				await assert.rejects(
					command(workspace, astroBinary, ["build"]),
					/duplicate issue number 7/,
				);
				await rm(join(workspace, "src/content/brief/collision.mdx"));
			},
		);
		await t.test(
			"an empty collection builds an honest archive and a valid empty RSS feed",
			async () => {
				await rm(join(workspace, "src/content/brief"), { recursive: true });
				await mkdir(join(workspace, "src/content/brief"));
				await command(workspace, astroBinary, ["build"]);
				const $ = await parseHTML(dist, "brief");
				assert.match($("main").text(), /The first issue is still to come/);
				assert.equal($(".brief-pagination").length, 0);
				assert.equal(
					await exists(join(dist, "brief/pages/2/index.html")),
					false,
				);
				const rss = load(await readFile(join(dist, "brief/rss.xml"), "utf8"), {
					xml: true,
				});
				assert.equal(rss("item").length, 0);
				for (const slug of publicSlugs)
					assert.equal(
						await exists(join(dist, "brief", slug, "index.html")),
						false,
					);
			},
		);
	} finally {
		await rm(workspace, { recursive: true, force: true });
	}
});
