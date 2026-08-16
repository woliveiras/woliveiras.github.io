---
name: product-testing-engineering
description: Design, implement when authorized, review, and evolve risk-based test systems for web and mobile products across unit, component, integration, contract, end-to-end, accessibility, resilience, persistence, and platform boundaries. Use when selecting test seams, building deterministic fixtures, diagnosing flaky tests, designing coverage, or verifying APIs, state, offline behavior, concurrency, and tenant isolation. Do not use for implementing one approved behavior through TDD, ordinary CI wiring, performance benchmarking, security-only testing, game testing, or manual QA alone.
---

# Product Testing Engineering

Build the smallest trustworthy test system that can expose consequentially wrong product behavior. Work from observable risk, not test count or a universal test pyramid.

## Establish the testing problem

1. Inspect the governing behavior, contracts, risks, architecture, platforms, and failure history. Separate observed evidence, accepted requirements, engineering heuristics, and hypotheses.
2. Identify critical journeys, invariants, boundaries, states, and failure consequences. Include success, failure, boundary, replay, retry, duplication, offline, and recovery behavior where relevant.
3. Prioritize by risk using consequence, likelihood, detectability, and recovery difficulty. Do not maximize test count or treat a coverage percentage as proof.
4. Choose the cheapest public seam that preserves the behavior under risk. Prefer observable behavior over private implementation details.
5. Define an independent oracle that would reject a plausibly wrong implementation. Do not derive the expected result from the code under test.

Use [assets/risk-coverage-matrix-template.md](assets/risk-coverage-matrix-template.md) to map risk to seam, level, fixture, oracle, evidence, and residual risk. Use [assets/test-strategy-template.md](assets/test-strategy-template.md) for the complete deliverable.

## Design the test system

6. Allocate unit, component, integration, contract, and end-to-end checks without duplicating the same claim at every level. A pyramid is an engineering heuristic, never an automatic shape.
7. Control the clock, IDs, randomness, network, concurrency, and data. Make order, parallel execution, cleanup, and replay observable.
8. Keep fixtures minimal, readable, isolated, synthetic by default, and recoverable. Prefer a purposeful fake over excessive mocks; never mock everything.
9. Run the smallest fail-first check and confirm that it fails for the correct behavioral reason before implementation. If the request is strategy-only or diagnosis-only, do not change the product.
10. Exercise applicable positive and negative transitions, including success, failure, boundary, replay, retry, duplication, offline, reconnect, concurrency, and recovery.
11. Diagnose flakiness to a root cause. Do not rewrite assertions, add arbitrary sleeps, or use indiscriminate retries to hide nondeterminism.
12. Distinguish automated component or API evidence, browser evidence, simulator or emulator evidence, physical device evidence, assistive-technology and manual accessibility evaluation, performance evidence, and human judgment.
13. Report commands actually run, fresh evidence, unavailable checks, limitations, and residual risk. Never invent execution.

## Load only the needed guidance

- Read [references/risk-based-testing-foundations.md](references/risk-based-testing-foundations.md) when scoping risks, evidence classes, ownership, or test architecture.
- Read [references/unit-and-component-testing.md](references/unit-and-component-testing.md) when selecting public seams, test doubles, Vitest, or Testing Library practices.
- Read [references/integration-contract-and-api-testing.md](references/integration-contract-and-api-testing.md) for APIs, providers, consumers, idempotency, and integration contracts.
- Read [references/end-to-end-and-journey-testing.md](references/end-to-end-and-journey-testing.md) for browser journeys, Playwright, or external end-to-end limits.
- Read [references/mobile-offline-and-device-testing.md](references/mobile-offline-and-device-testing.md) for Android, Apple, React Native, offline, lifecycle, emulator, simulator, or physical device work.
- Read [references/data-tenancy-and-migration-testing.md](references/data-tenancy-and-migration-testing.md) for persistence, tenant isolation, migrations, transactions, and concurrent data changes.
- Read [references/determinism-isolation-and-flakiness.md](references/determinism-isolation-and-flakiness.md) for fixtures, clocks, randomness, parallelism, cleanup, or flaky-test diagnosis.
- Read [references/coverage-oracles-and-evidence.md](references/coverage-oracles-and-evidence.md) for behavioral coverage, independent oracles, mutants, fail-first calibration, and evidence claims.
- Read [references/accessibility-and-visual-testing.md](references/accessibility-and-visual-testing.md) for WCAG evaluation, keyboard, screen-reader, snapshot, and visual-testing limits.

## Preserve ownership boundaries

- Baseline TDD owns implementing one approved behavior through a fail-first check. This skill owns the broader risk-based test strategy and test architecture, and works independently; they may optionally compose.
- If optionally installed, `$ci-typescript` and `$ci-android` own workflow syntax, job matrix, cache, permissions, and execution wiring. Provide test commands and evidence requirements without taking CI ownership.
- If optionally installed, `$product-performance-engineering` owns metrics, profiling, benchmarks, budgets, and technical performance causality. This skill may consume an approved performance risk and make its regression check reliable.
- If optionally installed, `$product-security-privacy-engineering` owns threat models, trust boundaries, authorization policy, and abuse cases. This skill may translate approved security scenarios into deterministic checks.
- If optionally installed, `$product-ui-ux-design` owns experience and accessibility decisions. This skill verifies approved behavior and states; it does not redesign them.
- If optionally installed, `$game-dev-2d-testing` owns Phaser and Godot 2D game testing. Do not route Unity, PixiJS, 3D, or general product testing through this skill.

## Guardrails

- Do not use production data or real data by default, access protected data, run production or external end-to-end checks, or use a device farm without explicit authority and safety controls.
- Do not claim a simulator or emulator proves physical device behavior, or let a manual checklist replace suitable automation.
- Do not weaken thresholds or rewrite assertions to accept current behavior. Preserve an oracle that can distinguish a relevant defect.
- Do not change product code during strategy-only or diagnosis-only work. When implementation is authorized, make only the smallest behavior-preserving testability seam or requested product change.
- Report evidence by source and environment. Passing checks, snapshots, coverage, browser automation, and device evidence each prove only their bounded observations.
