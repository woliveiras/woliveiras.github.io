// Only external metadata is replaced; the real parser and components still run.
const realFetch = globalThis.fetch;
globalThis.fetch = async (input, options) => {
	const url = new URL(
		typeof input === "string" || input instanceof URL ? input : input.url,
	);
	if (url.hostname !== "embed.test") return realFetch(input, options);
	if (url.pathname === "/unavailable")
		return new Response("Unavailable", { status: 503 });
	return new Response(
		`<!doctype html><html><head>
		<title>Fixture fallback title</title>
		<meta property="og:title" content="Fixture ${url.pathname.slice(1)} title">
		<meta property="og:description" content="Fixture description">
		<meta property="og:url" content="${url.href}">
		<meta property="og:image" content="https://embed.test/poster.svg">
		<meta property="og:image:alt" content="Fixture poster">
		${url.pathname === "/video" ? '<meta property="og:video" content="https://embed.test/video.mp4"><meta property="og:video:type" content="video/mp4">' : ""}
	</head><body>Metadata fixture</body></html>`,
		{ headers: { "content-type": "text/html" } },
	);
};
