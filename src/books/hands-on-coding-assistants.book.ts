import CodingAssistantsCoverArt from "./CodingAssistantsCoverArt.astro";
import type { BookDefinition } from "./design";

export const book = {
	title: "Hands-on Coding Assistants",
	author: "William Oliveira",
	path: "/books/hands-on-coding-assistants/",
	description:
		"A developer's workflow for AI-assisted engineering, from writing the first spec to shipping a feature with review, security checks, and a way to measure the result.",
	published: true,
	parts: [
		{ number: 0, title: "Foundations & Philosophy", description: "Set up OpenCode, explore the Task API, and take a registration change from spec to tested diff." },
		{ number: 1, title: "Agent Customization", description: "Add a reviewer, project instructions, commands, and a skill to the same repository." },
		{ number: 2, title: "AI in the Daily Development Cycle", description: "Test generation, code review, debugging, refactoring, and documentation." },
		{ number: 3, title: "Extensibility & Integrations", description: "Connect a local MCP server and run repeatable checks with Git and OpenCode." },
		{ number: 4, title: "Security, Governance & Impact Measurement", description: "AI-first security, governance, IP policy, impact metrics, and continuous improvement." },
		{ number: 5, title: "Full Cycle", description: "Add searchable task labels and review the change against the feature contract." },
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
