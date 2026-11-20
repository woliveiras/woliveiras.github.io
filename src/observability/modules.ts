export const modules = [
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
] as const;
