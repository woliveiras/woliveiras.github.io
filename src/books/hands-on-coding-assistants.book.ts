import CodingAssistantsCoverArt from "./CodingAssistantsCoverArt.astro";
import type { BookDefinition } from "./design";

export const book = {
	title: "Hands-on Coding Assistants",
	author: "William Oliveira",
	path: "/books/hands-on-coding-assistants/",
	description:
		"Work through the Task API with OpenCode. Write a spec, review a patch, and use CI and the running service to decide whether a feature is ready to merge.",
	published: true,
	parts: [
		{
			number: 0,
			title: "Start from a Repository",
			description:
				"Set up OpenCode, trace the Task API, refine a change, and diagnose a regression.",
		},
		{
			number: 1,
			title: "Shape and Document a Change",
			description:
				"Break down an epic, map the system, discuss a proposal, and record an architecture decision.",
		},
		{
			number: 2,
			title: "Investigate a Production Incident",
			description:
				"Use Grafana to check evidence from a simulated outage and write the postmortem.",
		},
		{
			number: 3,
			title: "Build the Harness",
			description:
				"Add tests, merge checks, alerting, review, and agent controls for the problems the exercises surfaced.",
		},
		{
			number: 4,
			title: "Prove It on a Change",
			description:
				"Measure the work and use the harness to ship searchable task labels in the lab.",
		},
	],
	license: {
		name: "Creative Commons Attribution 4.0 International",
		href: "https://creativecommons.org/licenses/by/4.0/",
	},
	theme: {
		light: {
			paper: "#f3f8f2",
			ink: "#192a20",
			muted: "#486151",
			accent: "#17613e",
			rule: "#d2dfd2",
		},
		dark: {
			paper: "#131f17",
			ink: "#eaf4e9",
			muted: "#adc4b1",
			accent: "#98e9a5",
			rule: "#3a5542",
		},
	},
	cover: { artwork: CodingAssistantsCoverArt },
	share: {
		image: {
			file: "src/books/cards/hands-on-coding-assistants-share.png",
			alt: "Hands-on Coding Assistants by William Oliveira, with a terminal cursor on a green cover.",
		},
	},
} as const satisfies BookDefinition;
