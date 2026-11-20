import { createInterface } from "node:readline";

const conventions = "Return HTTP 400 for invalid task input. Leave stored tasks unchanged when validation fails.";
const tool = {
	name: "get_task_conventions",
	description: "Return the Task API validation and state-change conventions.",
	inputSchema: { type: "object", properties: {}, additionalProperties: false },
};

function handle({ method, params }) {
	switch (method) {
		case "initialize":
			return {
				protocolVersion: "2025-11-25",
				serverInfo: { name: "task-api-context", version: "1.0.0" },
				capabilities: { tools: {} },
			};
		case "ping":
			return {};
		case "tools/list":
			return { tools: [tool] };
		case "tools/call":
			return params?.name === tool.name
				? { content: [{ type: "text", text: conventions }] }
				: { content: [{ type: "text", text: "Unknown tool" }], isError: true };
	}
}

for await (const line of createInterface({ input: process.stdin, crlfDelay: Infinity })) {
	let message;
	try {
		message = JSON.parse(line);
	} catch {
		process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } })}\n`);
		continue;
	}
	if (message?.id === undefined) continue;
	const result = handle(message);
	const reply = result ?? { code: -32601, message: "Method not found" };
	process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id: message.id, [result ? "result" : "error"]: reply })}\n`);
}
