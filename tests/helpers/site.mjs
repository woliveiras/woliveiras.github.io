import { execFile } from "node:child_process";
import {
	cp,
	mkdir,
	mkdtemp,
	readdir,
	readFile,
	rm,
	symlink,
} from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
export const repository = fileURLToPath(new URL("../../", import.meta.url));

export async function packageBinary(name, binary) {
	const path = fileURLToPath(import.meta.resolve(`${name}/package.json`));
	const data = JSON.parse(await readFile(path, "utf8"));
	return resolve(
		dirname(path),
		typeof data.bin === "string" ? data.bin : data.bin[binary],
	);
}

export async function command(workspace, binary, args, env = {}) {
	try {
		return await run(process.execPath, [binary, ...args], {
			cwd: workspace,
			env: {
				...process.env,
				ASTRO_TELEMETRY_DISABLED: "1",
				FORCE_COLOR: "0",
				CI: "1",
				...env,
			},
			timeout: 120_000,
			maxBuffer: 10 * 1024 * 1024,
		});
	} catch (error) {
		error.message += `\n${error.stdout ?? ""}\n${error.stderr ?? ""}`;
		throw error;
	}
}

export async function fixtureSite() {
	const workspace = await mkdtemp(join(tmpdir(), "blog-embeds-e2e-"));
	try {
		await Promise.all([
			...[
				"package.json",
				"astro.config.ts",
				"tsconfig.json",
				"tailwind.config.mjs",
				"pagefind.json",
				"add-mermaid-classname.ts",
				"shiki-title-transformer.ts",
			].map((file) => cp(join(repository, file), join(workspace, file))),
			cp(join(repository, "src"), join(workspace, "src"), {
				recursive: true,
				filter: (source) =>
					!["content", "pages", "assets"].includes(
						relative(join(repository, "src"), source).split(sep)[0],
					),
			}),
		]);
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
		await cp(join(repository, "public"), join(workspace, "public"), {
			recursive: true,
			filter: (source) =>
				relative(join(repository, "public"), source).split(sep)[0] !==
				"pagefind",
		});
		await mkdir(join(workspace, "src/pages"));
		await Promise.all(
			["posts", "open-graph", "index.astro"].map((path) =>
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
			].map((name) =>
				mkdir(join(workspace, "src/content", name), { recursive: true }),
			),
		);
		await cp(
			join(repository, "src/content/info"),
			join(workspace, "src/content/info"),
			{ recursive: true },
		);
		return workspace;
	} catch (error) {
		await rm(workspace, { recursive: true, force: true });
		throw error;
	}
}

export async function withStaticServer(dist, callback) {
	const types = {
		".html": "text/html",
		".js": "text/javascript",
		".wasm": "application/wasm",
		".json": "application/json",
		".css": "text/css",
		".png": "image/png",
		".svg": "image/svg+xml",
		".webp": "image/webp",
		".woff2": "font/woff2",
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
				types[extname(path)] ?? "application/octet-stream",
			);
			response.end(await readFile(path));
		} catch {
			response.writeHead(404).end();
		}
	});
	await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
	try {
		return await callback(`http://127.0.0.1:${server.address().port}`);
	} finally {
		await new Promise((done) => server.close(done));
	}
}
