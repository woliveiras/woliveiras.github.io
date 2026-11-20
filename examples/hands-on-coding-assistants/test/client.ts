import { once } from "node:events";
import type { AddressInfo } from "node:net";
import type { TestContext } from "node:test";
import { createApp } from "../src/app.ts";

export async function startApp(t: TestContext) {
	const server = createApp().listen(0, "127.0.0.1");
	await once(server, "listening");
	t.after(() => new Promise<void>((resolve, reject) => {
		server.close(error => error ? reject(error) : resolve());
	}));
	const { port } = server.address() as AddressInfo;
	return (path: string, options?: RequestInit) => fetch(`http://127.0.0.1:${port}${path}`, options);
}

export function jsonRequest(method: string, data: unknown): RequestInit {
	return {
		method,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};
}
