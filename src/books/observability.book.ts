import type { BookDefinition } from "./design";
import ObservabilityCoverArt from "./ObservabilityCoverArt.astro";

export const book = {
	title: "Observability for AI Agents",
	author: "William Oliveira",
	path: "/books/observability-for-ai-agents/",
	description:
		"This book shows how to instrument AI agents in production and use traces, metrics, and evaluations to explain what an agent did and assess the outcome.",
	published: false,
	theme: {
		light: {
			paper: "#fbf8f3",
			ink: "#282123",
			muted: "#67595e",
			accent: "#8c2945",
			rule: "#dfd2d2",
		},
		dark: {
			paper: "#1e191b",
			ink: "#f4eeeb",
			muted: "#c0aeb5",
			accent: "#f1a7bb",
			rule: "#4e4147",
		},
	},
	cover: { artwork: ObservabilityCoverArt },
	share: {
		subtitle: "Traces, metrics, and evaluation in production",
		image: {
			file: "src/books/cards/observability-share.png",
			alt: "Observability for AI Agents by William Oliveira, with six trace bars on a burgundy book cover.",
		},
	},
} as const satisfies BookDefinition;
