# Coverage, oracles, and evidence

## Define behavioral coverage

Coverage is a map from material risks and behaviors to exercised seams, fixtures, independent oracles, and fresh evidence. A line or branch coverage percentage is supporting evidence, not proof of product correctness. Do not maximize test count or treat 100% as a completion claim.

An oracle must be independent enough to reject a plausibly wrong implementation. Good oracles derive from a governing contract, invariant, authoritative state transition, approved example, standard, or separately computed relation. A snapshot is an oracle only when reviewed content is stable, meaningful, and capable of exposing the target defect.

Calibrate with fail-first evidence: the new or repaired check fails for the correct behavioral reason before the implementation passes it. When practical, use a targeted mutant to show that the test rejects a realistic wrong status, missing authorization filter, duplicate write, dropped state, weakened accessibility name, or altered migration result.

## Report claims proportionally

For each claim record:

- the risk and governing expectation;
- public seam, level, fixture, and oracle;
- command and environment actually used;
- fresh result and retained artifact;
- limitation and residual risk.

Passing tests alone are not proof. Coverage is not proof. A browser result is not device proof, a simulator is not physical-device proof, automation is not WCAG conformance, and a performance regression check is not causal profiling.

Never invent execution. If a test, external service, production environment, device farm, assistive technology, or physical device was unavailable or unauthorized, state that limitation. Preserve failed evidence rather than rewriting assertions or lowering thresholds.

Source classification in this guide: coverage shapes are an **engineering heuristic**; mutation results, fail-first failures, and fresh command output are **empirical evidence**.
