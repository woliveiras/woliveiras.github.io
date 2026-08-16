# Determinism, isolation, and flakiness

## Control variable inputs

Make nondeterminism an explicit dependency or harness control:

- inject or fake the clock, timezone, locale, and timer scheduler;
- seed randomness and record the seed for reproduction;
- generate unique IDs deterministically or expose them through the public result;
- control network response, delay, disconnection, ordering, and cancellation;
- orchestrate concurrency with barriers or events rather than timing guesses;
- allocate synthetic data per test, worker, tenant, and run;
- restore environment, global state, mocks, handlers, and storage during cleanup.

Isolation means a check can run alone, in a different order, and in parallel without shared state collision. Recoverability means a failed check leaves enough evidence to diagnose and cannot corrupt another run.

## Diagnose flakiness causally

First reproduce and classify the symptom. Vary order, parallel worker count, seed, clock, network schedule, process lifecycle, and environment one factor at a time. Capture the smallest discriminating evidence around the missing synchronization or leaked state.

Do not add an arbitrary sleep. It expands a race window and usually preserves the root cause. Do not use indiscriminate retry as a green-making mechanism. A bounded retry can be a temporary diagnostic signal only when the original failure remains visible and there is an owner and removal condition.

Do not rewrite assertions, lower thresholds, or delete tests to accept a flaky result. Repair the product synchronization, public readiness signal, fixture ownership, isolation, or harness control responsible for the failure. Re-run the original fail-first check and relevant order and parallel variants.

Vitest timer and mock facilities can control time and dependencies, while Playwright isolation and traces can expose browser causes; both are **official tool guidance**, not substitutes for empirical evidence from the actual failure: [Vitest mocking](https://vitest.dev/guide/mocking), [Playwright best practices](https://playwright.dev/docs/best-practices).
