export interface BaselineSkill {
	slug: string;
	summary: string;
	owns: string;
	when: string;
	input: string;
	output: string;
	stop: string;
	explicitOnly?: boolean;
	related: string[];
}

export interface BaselineSkillGroup {
	id: string;
	name: string;
	description: string;
	startWith: string;
	skills: BaselineSkill[];
}

export const baselineSkillGroups: BaselineSkillGroup[] = [
	{
		id: "foundation",
		name: "Project foundation",
		description:
			"Establish the repository-owned engineering contract without adding a Baseline runtime or overwriting stronger local rules.",
		startWith: "setup-baseline",
		skills: [
			{
				slug: "setup-baseline",
				summary: "Create or safely reconcile the project engineering contract.",
				owns: "Repository-root Baseline instruction foundation",
				when: "Use when you explicitly want to initialize, adopt, audit, or update Baseline project instructions.",
				input: "An explicit setup request and current repository evidence",
				output: "A created, reconciled, or confirmed root AGENTS.md",
				stop: "Instructions are evidence-backed, or a material conflict is waiting for a human decision",
				explicitOnly: true,
				related: ["measurer", "docs"],
			},
		],
	},
	{
		id: "change-workflow",
		name: "Change workflow",
		description:
			"Move from a governing request to a verified change with depth selected by risk, not ceremony or line count.",
		startWith: "measurer",
		skills: [
			{
				slug: "measurer",
				summary:
					"Classify risk and route only the engineering depth the work needs.",
				owns: "Proportional classification and routing",
				when: "Use at the start of software implementation, repair, review, or delivery work.",
				input: "The governing software task and nearby repository evidence",
				output:
					"Ephemeral JSON with size, drivers, refinement, documentation, and review depth",
				stop: "The highest risk and smallest necessary routing are selected",
				related: ["refine", "verify"],
			},
			{
				slug: "refine",
				summary:
					"Resolve materially incompatible interpretations without reopening clear decisions.",
				owns: "Material ambiguity",
				when: "Use only when behavior, scope, constraints, authority, or validation can still be interpreted incompatibly.",
				input: "Incompatible interpretations plus repository evidence",
				output: "Resolved choices and the smallest remaining open decision",
				stop: "The behavior, scope, constraints, authority, and verification seam are sufficient",
				related: ["measurer", "decision-framework"],
			},
			{
				slug: "tdd",
				summary:
					"Implement approved behavior through the smallest fail-first executable check.",
				owns: "Approved new or changed behavior",
				when: "Use when the governing input already defines the expected new behavior.",
				input: "A sufficient request, issue, contract, or accepted decision",
				output: "A fail-first check, minimal implementation, and fresh results",
				stop: "Focused and nearby checks pass without scope drift",
				related: ["measurer", "verify", "bugfix"],
			},
			{
				slug: "bugfix",
				summary:
					"Repair an existing defect from reproduction to causal fix and regression proof.",
				owns: "Existing incorrect, regressed, or intermittent behavior",
				when: "Use for a reported defect; do not relabel approved new behavior as a bug.",
				input: "A bug report and expected behavior",
				output:
					"Reproduction, regression check, causal repair, and focused review",
				stop: "The regression and nearest checks pass, with residual risk explicit",
				related: ["measurer", "verify", "tdd"],
			},
			{
				slug: "verify",
				summary:
					"Review the governing input, complete diff, evidence, risks, and limitations.",
				owns: "Proportional review",
				when: "Use at review or completion boundaries with the depth selected by measurer.",
				input:
					"Governing input, expected behavior, tests, complete diff, risks, and fresh results",
				output: "Findings, command results, residual risk, and limitations",
				stop: "Findings are reconciled or reported honestly",
				related: ["measurer", "security-review", "git-commit"],
			},
			{
				slug: "git-commit",
				summary:
					"Create one safe atomic local commit from a verified task-owned slice.",
				owns: "Atomic local Git commits",
				when: "Use only after the user explicitly authorizes a local commit.",
				input: "Explicit commit authority and reviewed task-owned changes",
				output: "One local Conventional Commit",
				stop: "The post-commit state is reported; no remote operation is inferred",
				explicitOnly: true,
				related: ["verify"],
			},
			{
				slug: "ci-workflow",
				summary:
					"Build or repair CI that produces traceable evidence with least privilege.",
				owns: "CI pipeline mechanics and results",
				when: "Use for test, lint, build, cache, artifact, release, deploy, fork, secret, or workflow-permission automation.",
				input: "Expected checks, scripts, platform, and trust boundaries",
				output: "The least-privilege workflow and a validation summary",
				stop: "Local syntax and available remote results are reported",
				related: ["security-review", "verify"],
			},
			{
				slug: "docs",
				summary:
					"Preserve only the knowledge that must outlive the current task.",
				owns: "Durable software knowledge",
				when: "Use for shipped behavior, stable boundaries, accepted decisions, operations, incidents, or non-obvious reasons.",
				input:
					"The durable behavior, boundary, decision, incident, or constraint",
				output: "The smallest appropriate documentation surface or an ENG-NOTE",
				stop: "Claims, links, timing, and examples have been checked",
				related: ["verify", "decision-framework"],
			},
		],
	},
	{
		id: "design-architecture",
		name: "Design and architecture",
		description:
			"Align language and boundaries, compare material options, or inspect architecture without turning routine work into ceremony.",
		startWith: "shape-domain",
		skills: [
			{
				slug: "shape-domain",
				summary:
					"Align domain language, invariants, scenarios, and ownership boundaries.",
				owns: "Semantic reconciliation",
				when: "Use when conflicting terms across APIs, persistence, tests, and product language affect behavior or design.",
				input: "Conflicting terms, invariants, scenarios, and integrations",
				output: "Reconciled vocabulary and ownership guidance",
				stop: "Meanings and boundaries are coherent or explicitly open",
				related: ["design-deep-modules", "refine"],
			},
			{
				slug: "design-deep-modules",
				summary:
					"Design high-leverage boundaries with small interfaces and hidden complexity.",
				owns: "Concrete module boundary options",
				when: "Use when the request asks for boundary or interface design, not a whole-architecture audit.",
				input: "Governing behavior, callers, state, failures, and contracts",
				output:
					"Concrete interfaces, trade-offs, migration seams, and adapters",
				stop: "Viable reversible options are explicit",
				related: ["shape-domain", "decision-framework"],
			},
			{
				slug: "improve-architecture",
				summary:
					"Audit a codebase for evidence-backed architecture improvements.",
				owns: "Architecture assessment",
				when: "Use when you explicitly request an architecture audit or assessment.",
				input: "The explicit audit request and current architecture",
				output:
					"Prioritized findings grounded in leverage, seams, locality, and reversibility",
				stop: "Findings remain separate from an unapproved redesign",
				explicitOnly: true,
				related: ["design-deep-modules", "decision-framework"],
			},
			{
				slug: "decision-framework",
				summary:
					"Choose among viable paths with evidence, uncertainty, and revisit triggers.",
				owns: "Material software decisions",
				when: "Use when several viable paths remain after ambiguity has been resolved.",
				input:
					"Viable options, decision drivers, evidence, uncertainty, and authority",
				output:
					"A transparent decision with dependencies and validation triggers",
				stop: "The selection is authorized or missing authority is explicit",
				related: ["refine", "docs", "premortem"],
			},
		],
	},
	{
		id: "deep-work",
		name: "Explicit deep work",
		description:
			"Open a deliberate exploration, forecast failure, investigate current evidence, or hand work to another session.",
		startWith: "brainstorming",
		skills: [
			{
				slug: "brainstorming",
				summary:
					"Explore materially different directions before selecting one.",
				owns: "Divergent problem exploration",
				when: "Use when you explicitly ask to explore alternatives, hidden assumptions, or opportunity space before choosing.",
				input: "An open software problem and its known constraints",
				output:
					"Materially different options, tensions, and useful experiments",
				stop: "The option space is useful enough to narrow",
				explicitOnly: true,
				related: ["decision-framework", "refine"],
			},
			{
				slug: "premortem",
				summary:
					"Forecast plausible failure chains and make mitigations observable.",
				owns: "Failure forecasting before a material change",
				when: "Use when you explicitly want to anticipate how a proposed change could fail.",
				input: "The proposed change, boundaries, assumptions, and consequences",
				output:
					"Ranked failure chains, mitigations, detection, and rollback signals",
				stop: "High-leverage risks have detection and response proposals",
				explicitOnly: true,
				related: ["decision-framework", "security-review"],
			},
			{
				slug: "session-bridge",
				summary:
					"Create a truthful compact handoff another session can resume.",
				owns: "Resumable software-engineering handoff",
				when: "Use whenever you explicitly ask to pause or transfer ongoing work.",
				input:
					"Governing inputs, current artifacts, real results, and open work",
				output: "A compact continuation record without invented completion",
				stop: "Another session can resume from the recorded state",
				explicitOnly: true,
				related: ["verify", "docs"],
			},
			{
				slug: "technical-research",
				summary:
					"Answer a technical question with primary sources and explicit limits.",
				owns: "Current external technical evidence",
				when: "Use when a standard, API, tool, empirical study, or unstable claim must be investigated.",
				input:
					"A concrete technical question and available repository evidence",
				output:
					"A sourced answer, reproducible searches, limitations, and derived rules",
				stop: "The decision question is answered or uncertainty is bounded",
				explicitOnly: true,
				related: ["decision-framework", "docs"],
			},
		],
	},
	{
		id: "safety",
		name: "Safety",
		description:
			"Inspect security, privacy, data-loss, trust, and authority boundaries without turning declarative guidance into an enforcement claim.",
		startWith: "security-review",
		skills: [
			{
				slug: "security-review",
				summary:
					"Review security, privacy, data-loss, trust, and authority risks.",
				owns: "Technology-neutral security and authority risk",
				when: "Use for untrusted input, secrets, sensitive data, permissions, privileges, destructive actions, or external authority.",
				input: "The security-relevant design, code, CI workflow, or data flow",
				output: "Prioritized findings, mitigations, and residual risk",
				stop: "Material threats are addressed or waiting for explicit authority",
				related: ["verify", "ci-workflow", "premortem"],
			},
		],
	},
];

export const baselineSkills = baselineSkillGroups.flatMap((group) =>
	group.skills.map((skill) => ({
		...skill,
		groupId: group.id,
		groupName: group.name,
	})),
);

export const getBaselineSkill = (slug: string) =>
	baselineSkills.find((skill) => skill.slug === slug);
