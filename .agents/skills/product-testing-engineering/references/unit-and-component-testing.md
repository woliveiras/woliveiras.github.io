# Unit and component testing

## Select observable seams

Test a unit or component through the narrowest public seam that preserves the behavior under risk. Prefer observable behavior such as returned values, emitted events, rendered roles and names, public state transitions, or documented side effects. Avoid coupling assertions to a private implementation detail when a stable public seam exists.

Testing Library's guiding principle is to make tests resemble how software is used. Treat this as **official tool guidance**, not a guarantee that a particular query establishes accessibility or product correctness: [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles).

Vitest documents module, function, date, and timer mocking. Use a test double only at a meaningful boundary, restore it after each check, and retain at least one integration check for important collaboration. Prefer a small in-memory fake when stateful behavior matters; use a stub for a controlled response and a mock when the interaction itself is the contract. Do not mock everything or reproduce the implementation inside the test: [Vitest mocking](https://vitest.dev/guide/mocking) (**official tool guidance**).

## Component checks

For web or native UI components, verify user-visible state and interaction:

- role, accessible name, label, value, error, and focus;
- loading, empty, permission, offline, success, and recovery states;
- keyboard or touch interaction through the supported public surface;
- cleanup of global listeners, timers, storage, and subscriptions.

A component test does not prove browser integration, network contracts, physical-device behavior, or WCAG conformance. Escalate only the uncovered risk to integration or end-to-end testing.
