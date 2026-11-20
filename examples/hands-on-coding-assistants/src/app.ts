import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

type Task = { id: string; title: string };
type Registration = { id: string; name: string; email: string };

function send(response: ServerResponse, status: number, data: unknown) {
	response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
	response.end(JSON.stringify(data));
}

async function readObject(request: IncomingMessage) {
	const chunks: Buffer[] = [];
	let bytes = 0;
	for await (const chunk of request.iterator({ destroyOnReturn: false })) {
		bytes += chunk.length;
		if (bytes > 4096) {
			request.resume();
			return undefined;
		}
		chunks.push(chunk);
	}
	try {
		const data: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
		if (data && typeof data === "object" && !Array.isArray(data)) {
			return data as Record<string, unknown>;
		}
	} catch (error) {
		if (!(error instanceof SyntaxError)) throw error;
	}
	return undefined;
}

export function createApp() {
	const tasks: Task[] = [{ id: "1", title: "Write a spec" }];
	const registrations: Registration[] = [];

	return createServer(async (request, response) => {
		try {
			const url = new URL(request.url ?? "/", "http://localhost");
			const { method } = request;

			if (method === "GET" && url.pathname === "/health") {
				return send(response, 200, { status: "ok" });
			}
			if (method === "GET" && url.pathname === "/tasks") {
				return send(response, 200, tasks);
			}
			if (method === "POST" && url.pathname === "/tasks") {
				const data = await readObject(request);
				const title = typeof data?.title === "string" ? data.title.trim() : "";
				if (!title || title.length > 120) return send(response, 400, { error: "invalid_task" });
				const task = { id: String(tasks.length + 1), title };
				tasks.push(task);
				return send(response, 201, task);
			}
			if (method === "POST" && url.pathname === "/registrations") {
				const data = await readObject(request);
				if (!data) return send(response, 400, { error: "invalid_registration" });
				const registration = {
					id: String(registrations.length + 1),
					name: String(data.name ?? ""),
					email: String(data.email ?? ""),
				};
				registrations.push(registration);
				return send(response, 201, registration);
			}
			return send(response, 404, { error: "not_found" });
		} catch {
			return send(response, 500, { error: "unexpected_error" });
		}
	});
}
