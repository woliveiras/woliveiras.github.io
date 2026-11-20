import type { BookDefinition } from "./design";
import ObservabilityCoverArt from "./ObservabilityCoverArt.astro";

export const book = {
	title: "Observability for AI Agents",
	author: "William Oliveira",
	path: "/books/observability-for-ai-agents/",
	description:
		"This book shows how to instrument AI agents in production and use traces, metrics, and evaluations to explain what an agent did and assess the outcome.",
	published: true,
	parts: [
		{
			number: 0,
			title: "Foundations",
			description:
				"The production framing, the telemetry structure, and the signals worth tracking first.",
		},
		{
			number: 1,
			title: "Safety, Privacy & Evaluation",
			description:
				"What not to capture, how PII leaks into telemetry, and how evaluation becomes an observability signal.",
		},
		{
			number: 2,
			title: "Security & Cost Controls",
			description:
				"Guardrail telemetry, security signals, cost attribution, budget limits, and loop controls.",
		},
		{
			number: 3,
			title: "Hands-on Implementation",
			description:
				"LangGraph, OpenTelemetry, Langfuse, LLM spans, tool spans, retrieval spans, and runtime hardening.",
		},
		{
			number: 4,
			title: "Langfuse Workflow",
			description:
				"Sessions, users, prompt management, Playground, scores, evaluators, annotation, datasets, and experiments.",
		},
		{
			number: 5,
			title: "Operations",
			description:
				"Telemetry tests, pipeline resilience, dashboards, alerts, release gates, and runbooks for operating AI agents day to day.",
		},
		{
			number: 6,
			title: "Advanced Workflows",
			description:
				"Subgraphs, subagents, handoff traces, streaming graph updates, and production-safe live workflow visibility.",
		},
	],
	license: {
		name: "Creative Commons Attribution 4.0 International",
		href: "https://creativecommons.org/licenses/by/4.0/",
	},
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
