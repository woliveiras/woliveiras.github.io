import assert from "node:assert/strict";
import test from "node:test";
import {
	briefArchivePath,
	briefPath,
	getBriefNeighbors,
	isBriefPublic,
	selectPublicBriefs,
	validateBriefEntries,
} from "../src/brief/model.ts";
import { briefSchema } from "../src/brief/schema.ts";

const now = new Date("2026-09-16T12:00:00.000Z");

function metadata(overrides: Record<string, unknown> = {}) {
	return {
		title: "Test issue",
		slug: "test-issue",
		description: "Test content for the editorial model.",
		pubDate: "2026-09-14",
		period: { start: "2026-09-07", end: "2026-09-13" },
		published: true,
		topics: ["agents"],
		...overrides,
	};
}

function entry(slug: string, overrides: Record<string, unknown> = {}) {
	return {
		id: `${slug}.mdx`,
		data: briefSchema.parse(metadata({ slug, ...overrides })),
	};
}

test("metadata uses strict calendar dates and defaults to a draft", () => {
	const parsed = briefSchema.parse(
		metadata({ published: undefined, issue: 42 }),
	);
	assert.equal(parsed.published, false);
	assert.equal(parsed.issue, 42);
	assert.equal(parsed.pubDate.toISOString(), "2026-09-14T00:00:00.000Z");
	assert.equal(parsed.period.start.toISOString(), "2026-09-07T00:00:00.000Z");
	for (const pubDate of [
		"2026-2-03",
		"2026-02-30",
		"2025-02-29",
		"2026-09-14T00:00:00Z",
		"bad",
	]) {
		assert.equal(
			briefSchema.safeParse(metadata({ pubDate })).success,
			false,
			pubDate,
		);
	}
	assert.equal(
		briefSchema.safeParse(
			metadata({
				pubDate: "2024-02-29",
				period: { start: "2024-02-22", end: "2024-02-28" },
			}),
		).success,
		true,
	);
});

test("required metadata, topics, slugs, and issue numbers are validated", () => {
	for (const field of [
		"title",
		"description",
		"slug",
		"pubDate",
		"period",
		"topics",
	]) {
		assert.equal(
			briefSchema.safeParse(metadata({ [field]: undefined })).success,
			false,
			field,
		);
	}
	for (const title of ["", "   "]) {
		assert.equal(briefSchema.safeParse(metadata({ title })).success, false);
	}
	for (const slug of [
		"pages",
		"Uppercase",
		"nested/path",
		"two--hyphens",
		"-start",
		"end-",
		"rss.xml",
		"with space",
		"accénted",
	]) {
		assert.equal(
			briefSchema.safeParse(metadata({ slug })).success,
			false,
			slug,
		);
	}
	for (const issue of [0, -1, 1.5, "1"]) {
		assert.equal(briefSchema.safeParse(metadata({ issue })).success, false);
	}
	assert.equal(briefSchema.safeParse(metadata({ topics: [] })).success, false);
	assert.equal(
		briefSchema.safeParse(metadata({ topics: ["unknown"] })).success,
		false,
	);
	assert.equal(
		briefSchema.safeParse(metadata({ topics: ["agents", "agents"] })).success,
		false,
	);
	assert.equal(
		briefSchema.safeParse(metadata({ issue: undefined })).success,
		true,
	);
});

test("period and update dates follow publication chronology without requiring Monday", () => {
	assert.equal(
		briefSchema.safeParse(
			metadata({ period: { start: "2026-09-13", end: "2026-09-07" } }),
		).success,
		false,
	);
	assert.equal(
		briefSchema.safeParse(
			metadata({ period: { start: "2026-09-07", end: "2026-09-15" } }),
		).success,
		false,
	);
	assert.equal(
		briefSchema.safeParse(metadata({ updatedDate: "2026-09-13" })).success,
		false,
	);
	assert.equal(
		briefSchema.safeParse(
			metadata({ pubDate: "2026-09-16", updatedDate: "2026-09-17" }),
		).success,
		true,
	);
});

test("public selection excludes drafts and future editions, including the UTC day boundary", () => {
	const published = entry("published");
	const draft = entry("draft", { published: false });
	const future = entry("future", { pubDate: "2026-09-17" });
	const today = entry("today", { pubDate: "2026-09-16" });
	assert.equal(isBriefPublic(draft, now), false);
	assert.equal(isBriefPublic(future, now), false);
	assert.equal(
		isBriefPublic(today, new Date("2026-09-15T23:59:59.999Z")),
		false,
	);
	assert.equal(
		isBriefPublic(today, new Date("2026-09-16T00:00:00.000Z")),
		true,
	);
	assert.deepEqual(selectPublicBriefs([draft, published, future, today], now), [
		today,
		published,
	]);
	assert.deepEqual(selectPublicBriefs([], now), []);
});

test("selection is newest first, deterministic on the same date, and leaves input untouched", () => {
	const older = entry("older", { issue: 80 });
	const sameB = entry("same-b", { pubDate: "2026-09-15", issue: 4 });
	const sameA = entry("same-a", { pubDate: "2026-09-15", issue: 10 });
	const entries = [older, sameB, sameA];
	assert.deepEqual(selectPublicBriefs(entries, now), [sameA, sameB, older]);
	assert.deepEqual(entries, [older, sameB, sameA]);
	assert.deepEqual(
		entries.map((value) => value.data.issue),
		[80, 4, 10],
	);
});

test("duplicate slugs and issue numbers fail even when an edition is a draft", () => {
	const published = entry("published", { issue: 1 });
	const duplicateSlug = {
		...entry("other", { published: false }),
		data: { ...published.data, published: false },
	};
	assert.throws(
		() => validateBriefEntries([published, duplicateSlug]),
		/duplicate slug.*published/,
	);
	const duplicateIssue = entry("draft", { issue: 1, published: false });
	assert.throws(
		() => validateBriefEntries([published, duplicateIssue]),
		/duplicate issue number 1/,
	);
	assert.doesNotThrow(() =>
		validateBriefEntries([
			published,
			entry("without-number"),
			entry("also-without-number"),
		]),
	);
	assert.doesNotThrow(() => validateBriefEntries([]));
});

test("neighbors use public chronology, preserve stable URLs, and handle archive boundaries", () => {
	const older = entry("older");
	const middle = entry("middle", { pubDate: "2026-09-15" });
	const newest = entry("newest", { pubDate: "2026-09-16" });
	const draft = entry("draft", { published: false, pubDate: "2026-09-15" });
	const future = entry("future", { pubDate: "2026-09-17" });
	const entries = selectPublicBriefs(
		[middle, future, newest, draft, older],
		now,
	);
	assert.deepEqual(getBriefNeighbors(entries, "middle"), {
		previous: older,
		next: newest,
	});
	assert.deepEqual(getBriefNeighbors(entries, "newest"), {
		previous: middle,
		next: undefined,
	});
	assert.deepEqual(getBriefNeighbors(entries, "older"), {
		previous: undefined,
		next: middle,
	});
	assert.deepEqual(getBriefNeighbors(entries, "draft"), {
		previous: undefined,
		next: undefined,
	});
	assert.deepEqual(getBriefNeighbors([], "missing"), {
		previous: undefined,
		next: undefined,
	});
	assert.equal(briefPath("stable-slug"), "/brief/stable-slug/");
	assert.equal(briefArchivePath(), "/brief/");
	assert.equal(briefArchivePath(1), "/brief/");
	assert.equal(briefArchivePath(2), "/brief/pages/2/");
	for (const page of [0, -1, 1.5, Number.NaN]) {
		assert.throws(() => briefArchivePath(page), /positive integer/);
	}
});
