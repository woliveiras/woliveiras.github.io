# End-to-end and journey testing

## Reserve end-to-end checks for integrated risk

Use end-to-end coverage for a critical journey whose risk depends on real browser or application integration: routing, authentication handoff, cross-page state, deployment packaging, storage, or a small number of external boundaries. Keep the journey independent and recoverable; do not repeat every component and API assertion.

Playwright recommends testing observable user behavior, isolating tests, using resilient user-facing locators, and avoiding third-party dependencies. Its locators provide actionability checks and auto-wait behavior. These are **official tool guidance**, not proof that an arbitrary suite is reliable: [Playwright best practices](https://playwright.dev/docs/best-practices).

For each journey:

1. State the risk and independent outcome oracle.
2. Create unique synthetic identities and records.
3. Navigate through supported public interactions using role, label, or other stable locator.
4. Observe the durable result at an authoritative boundary.
5. Clean up only data owned by the test and preserve failure artifacts.

Diagnose a flaky check before changing it. Common causes include uncontrolled state, real time, ambiguous locators, animation, async work beyond the observed signal, external dependency variation, and parallel collisions. Do not add arbitrary sleeps or indiscriminate retries.

Browser automation proves only the tested browser, build, environment, and observation. Never claim an external, device-farm, or production end-to-end run unless it actually occurred with explicit authority. A local browser run does not prove physical mobile behavior.
