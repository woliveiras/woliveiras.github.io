import { execFileSync } from "node:child_process";
import type { APIRoute } from "astro";

const files = [
	".gitignore",
	".nvmrc",
	"AGENTS.md",
	"README.md",
	"opencode.jsonc",
	"package.json",
	"contracts/labels.test.ts",
	"contracts/mcp.test.ts",
	"contracts/registration.test.ts",
	"specs/registration-validation.md",
	"specs/task-labels.md",
	"src/app.ts",
	"src/server.ts",
	"test/app.test.ts",
	"test/client.ts",
	"tools/project-context.mjs",
];

export const GET: APIRoute = () => {
	const archive = execFileSync("tar", ["--format=ustar", "-czf", "-", "-C", "examples/hands-on-coding-assistants", ...files], {
		env: { ...process.env, COPYFILE_DISABLE: "1" },
	});
	return new Response(new Uint8Array(archive), {
		headers: { "Content-Type": "application/gzip" },
	});
};
