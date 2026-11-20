import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

test("the project context server implements the stdio handshake and returns task conventions", () => {
	const requests = [
		{ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-11-25" } },
		{ jsonrpc: "2.0", method: "notifications/initialized" },
		{ jsonrpc: "2.0", id: 2, method: "tools/list" },
		{ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "get_task_conventions", arguments: {} } },
	];
	const output = execFileSync(process.execPath, [fileURLToPath(new URL("../tools/project-context.mjs", import.meta.url))], {
		input: `${requests.map(request => JSON.stringify(request)).join("\n")}\n`,
		encoding: "utf8",
		timeout: 5000,
	});
	const replies = output.trim().split("\n").map(line => JSON.parse(line));
	assert.deepEqual(replies.map(reply => reply.id), [1, 2, 3]);
	assert.equal(replies[0].result.protocolVersion, "2025-11-25");
	assert.equal(replies[1].result.tools[0].name, "get_task_conventions");
	assert.match(replies[2].result.content[0].text, /Leave stored tasks unchanged/);
});
