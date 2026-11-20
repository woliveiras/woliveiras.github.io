import assert from "node:assert/strict";
import { test } from "node:test";
import { jsonRequest, startApp } from "../test/client.ts";

test("registration trims the name and normalizes the email", async t => {
	const request = await startApp(t);
	const response = await request("/registrations", jsonRequest("POST", {
		name: "  Ada Example  ", email: " Ada@Dev.Example.test ",
	}));
	assert.equal(response.status, 201);
	assert.deepEqual(await response.json(), { id: "1", name: "Ada Example", email: "ada@dev.example.test" });
});

test("invalid registrations return 400 and leave the next ID available", async t => {
	const request = await startApp(t);
	const invalid = [
		{ name: "  ", email: "ada@example.test" },
		{ name: "a".repeat(101), email: "ada@example.test" },
		{ name: 42, email: "ada@example.test" },
		{ name: "Ada", email: "ada.example.test" },
		{ name: "Ada", email: "a da@example.test" },
		{ name: "Ada", email: "a\tda@example.test" },
		{ name: "Ada", email: "ada@example" },
		{ name: "Ada", email: "ada.example@test" },
		{ name: "Ada", email: "ada@@example.test" },
		{ name: "Ada", email: "ada@example.test@extra" },
		{ name: "Ada", email: "@example.test" },
		{ name: "Ada", email: "ada@.test" },
		{ name: "Ada", email: null },
		{ name: "Ada" },
	];
	for (const body of invalid) {
		const response = await request("/registrations", jsonRequest("POST", body));
		assert.equal(response.status, 400, JSON.stringify(body));
		assert.deepEqual(await response.json(), { error: "invalid_registration" });
	}
	const response = await request("/registrations", jsonRequest("POST", { name: "Ada", email: "ada@example.test" }));
	assert.equal(response.status, 201);
	assert.equal((await response.json()).id, "1");
});
