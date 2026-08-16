# Product UX foundations

Use this reference to turn product context into a complete, prioritized experience rather than a list of generic heuristics.

## Discover proportionally

Match discovery depth to consequence and uncertainty. A low-risk copy fix may need the running screen, nearby components, and content rules. Billing, destructive actions, regulated data, complex permissions, or a cross-platform redesign also need governing requirements, real roles, representative data, research/feedback, analytics definitions, and operational constraints.

Record:

- actor, role, permission, knowledge, frequency, environment, device, and input method;
- job to complete, trigger, desired outcome, and business objective;
- current entry points, journey, handoffs, decisions, delays, failures, and exit;
- supplied evidence and its date/scope; unknowns that could reverse the design;
- vocabulary, data invariants, content ownership, localization, and privacy constraints.

Observation of a running product is stronger evidence of current presentation than a component name. Analytics can show where events occur, not why. Research can explain observed behavior within its sample, not prove every user behaves the same way.

## Model tasks and journeys

Write each critical task as `actor + context -> intent -> observable outcome`. Model the shortest credible primary path, then alternatives and recovery. Include entry, exit, loading, empty, partial data, stale data, validation failure, system error, unavailable dependency, offline, no permission, cancellation, confirmation, success, and next step.

At each step ask:

- What does the user know and need to decide?
- What data or permission is required, and when is it acquired?
- What can be undone, retried, resumed, or safely abandoned?
- What is saved, charged, submitted, published, approved, or deleted?
- What happens after refresh, back navigation, interruption, duplicate action, or concurrent editing?

## Shape information architecture and hierarchy

Group information by user task and domain meaning, not database table or organization chart. Give each location a clear scope, label, and route. Keep navigation depth proportional; provide search or cross-links when classification alone cannot support discovery.

Use hierarchy to answer in order: where am I, what is this, what matters now, what can I do, what happened, and what comes next. Progressive disclosure should defer secondary complexity without hiding prerequisites, costs, constraints, errors, or consequences.

## Design interaction and states

- Make the primary action specific to the task; keep alternatives discoverable but subordinate.
- Preserve context through filters, selection, scroll, unsaved work, and return navigation when appropriate.
- Validate at the earliest useful moment without interrupting normal input. Explain the problem, identify the field or object, and give a recovery action.
- Prevent predictable errors through constraints, previews, summaries, permission-aware actions, idempotency, and clear units.
- For destructive or financial actions, name the affected object, scope, timing, amount, reversibility, and recovery path.
- Use optimistic feedback only when failure can be reconciled honestly. Never report success before the system owns the result.

## Write content and microcopy

Use the product's terms and the user's language. Prefer concrete verbs and object names over generic “Continue”, “Submit”, or “Error”. Put instructions before the decision, not only after failure. Pair status with what changed and the next available action. Do not promise timing, availability, security, or reversibility without evidence.

## Prioritize findings

For each issue, record evidence, affected actor/task/state, consequence, frequency or exposure when known, confidence, and suggested direction. Rank first by blocked critical task, data/financial/safety/accessibility risk, then repeated friction and comprehension cost. Treat severity formulas as decision aids, not measurements when their inputs are guessed.

Separate:

- **Verified observation:** directly inspected behavior or artifact.
- **Supplied evidence:** analytics, research, support feedback, or requirement provided for the task.
- **Heuristic:** a reasoned usability principle that still needs contextual validation.
- **Decision:** the selected behavior and trade-off.
- **Hypothesis:** an expected effect to test.
- **Limitation:** evidence or human validation still missing.

[Nielsen Norman Group's heuristic evaluation overview](https://www.nngroup.com/articles/ten-usability-heuristics/) is recognized secondary heuristic guidance, not a normative standard or substitute for task evidence.
