import type { APIRoute } from "astro";
import { SITE } from "../config.json";

// All crawlers, including AI agents, are welcome. Content signals declare that
// the content may be used for search, AI input (RAG/inference) and AI training.
const body = `# https://www.robotstxt.org/robotstxt.html
# Generated automatically by src/pages/robots.txt.ts

User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /

Sitemap: ${SITE}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
	new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
