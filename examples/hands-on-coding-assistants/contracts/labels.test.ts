import assert from "node:assert/strict";
import { test } from "node:test";
import { jsonRequest, startApp } from "../test/client.ts";

test("labels are normalized, deduplicated, and searchable", async t => {
	const request = await startApp(t);
	const created = await request("/tasks", jsonRequest("POST", { title: "Review the spec" }));
	assert.equal(created.status, 201);
	assert.deepEqual(await created.json(), { id: "2", title: "Review the spec", labels: [] });
	const updated = await request("/tasks/1/labels", jsonRequest("PATCH", { labels: [" Urgent ", "Bug", "URGENT"] }));
	assert.equal(updated.status, 200);
	const task = { id: "1", title: "Write a spec", labels: ["urgent", "bug"] };
	assert.deepEqual(await updated.json(), task);
	assert.deepEqual(await (await request("/tasks?label=%20Urgent%20")).json(), [task]);
	assert.deepEqual(await (await request("/tasks?label=%20")).json(), []);
	assert.equal((await (await request("/tasks")).json()).length, 2);
	const cleared = await request("/tasks/1/labels", jsonRequest("PATCH", { labels: [] }));
	assert.equal(cleared.status, 200);
	assert.deepEqual(await cleared.json(), { ...task, labels: [] });
	assert.deepEqual(await (await request("/tasks?label=urgent")).json(), []);
});

test("bad labels leave a task unchanged, and unknown tasks return 404", async t => {
	const request = await startApp(t);
	const labelsUrl = "/tasks/1/labels";
	assert.equal((await request(labelsUrl, jsonRequest("PATCH", { labels: ["urgent"] }))).status, 200);
	for (const labels of ["urgent", [" "], [null], ["a".repeat(51)], Array.from({ length: 11 }, (_, i) => `label-${i}`)]) {
		const response = await request(labelsUrl, jsonRequest("PATCH", { labels }));
		assert.equal(response.status, 400);
		assert.deepEqual(await response.json(), { error: "invalid_labels" });
	}
	assert.deepEqual(await (await request("/tasks")).json(), [{ id: "1", title: "Write a spec", labels: ["urgent"] }]);
	const missing = await request("/tasks/999/labels", jsonRequest("PATCH", { labels: ["valid"] }));
	assert.equal(missing.status, 404);
	assert.deepEqual(await missing.json(), { error: "not_found" });
	const invalid = await request("/tasks/999/labels", jsonRequest("PATCH", { labels: [""] }));
	assert.equal(invalid.status, 400);
	assert.deepEqual(await invalid.json(), { error: "invalid_labels" });
});
