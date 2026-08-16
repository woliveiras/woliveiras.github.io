# Usability verification

Use this reference to select observable checks for a design, prototype, running product, or implementation. Verification depth follows task risk, exposure, and available evidence.

## Define the verification contract

For each critical task record actor/role, starting state, goal, representative data, device/input, completion signal, prohibited loss or side effect, and recovery. Separate design prediction from observed behavior. If the interface is not executable, limit findings to inspected artifacts and mark runtime interaction, responsive behavior, accessibility tree, timing, and recovery as unverified.

## Walkthrough and heuristic evaluation

In a cognitive walkthrough, traverse the task step by step and ask whether the actor can identify the next action, associate it with the goal, execute it, and understand feedback. Include alternative, error, cancellation, permission, and recovery paths rather than evaluating the happy path alone.

A heuristic evaluation can efficiently identify plausible issues, but label the heuristic, inspected scope, evidence, severity rationale, and uncertainty. Heuristics are expert review, not user evidence. Avoid counting guideline matches as a usability score.

## Task-based tests

Use realistic goals rather than click instructions. Define observable criteria before seeing the result: completion, correct outcome, critical error, recovery, abandonment, time/attempts when meaningful, assistance, and user explanation. Pilot the task and data. Protect participant privacy and do not claim representativeness the sample does not support.

Collect qualitative evidence (behavior, hesitation, misunderstanding, comments, recovery strategy) and quantitative evidence (completion, error, duration, retry, funnel/event measures) with definitions and denominators. Analytics shows recorded system events; it does not reveal intent by itself. Research with representative users can test hypotheses but does not turn one participant's preference into a universal rule.

WAI describes formal usability tests as representative users performing specific tasks and recommends involving a range of disabled users; see [Involving Users in Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/involving-users/).

## Browser and device verification

When tools and authorization permit, verify the running product rather than screenshots alone. Cover supported browser/OS/device combinations proportionally, viewport and orientation, browser zoom and OS text scaling, keyboard/touch/pointer, screen reader, reduced motion, localization expansion, refresh/back/deep link, multiple tabs, offline/reconnect, permission denial, interruption, slow/error responses, and destructive/financial protection.

Browser automation can repeat known observable paths but is not required by this skill and cannot judge clarity or overall usability. Device simulators increase breadth but do not fully represent physical touch, performance, safe areas, keyboards, assistive technology, or environmental interruption.

## Review an implementation

Compare the governing requirement and acceptance criteria with the actual interface, code semantics, design-system contract, content, states, responsive behavior, accessibility tree, and fresh task results. A visually matching screenshot can still fail focus, keyboard, text scaling, error recovery, permissions, or data integrity.

Report:

1. tested scope and environment;
2. verified observations and supplied evidence;
3. failures ordered by task/risk consequence;
4. decisions and accepted trade-offs;
5. hypotheses for further study;
6. limitations and required human review;
7. concrete acceptance checks for the next iteration.

For accessibility, automated tools assist but do not determine conformance; W3C states the limit explicitly in [Selecting evaluation tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/). Use human review and representative assistive-technology/task testing for claims beyond mechanically tested rules.
