# Integration, contract, and API testing

## Put checks at ownership boundaries

Use an integration test when real collaborators must agree on serialization, persistence, transactions, authentication context, retries, or failure semantics. Use a contract test when a consumer and provider can verify the same externally governed request and response without duplicating an entire end-to-end environment.

OpenAPI is a machine-readable API description format. Treat the specification as a **normative standard** only for the contract it actually declares; a valid document does not prove provider behavior: [OpenAPI Specification](https://spec.openapis.org/oas/).

Cover, when applicable:

- documented success, validation, authentication, authorization, not-found, conflict, throttling, and dependency failure responses;
- forward and backward compatibility for required, optional, unknown, nullable, and versioned fields;
- provider and consumer assumptions, including headers, media types, pagination, ordering, and error bodies;
- timeout, cancellation, retry, duplicate delivery, replay, and partial failure;
- idempotency using an independent business outcome oracle rather than only matching an HTTP status;
- persistence and message-boundary behavior using synthetic data.

Do not use indiscriminate retries to make a failing API suite green. A retry policy is product behavior to test: control the failure sequence, assert the retry budget and backoff inputs, and verify that duplicate attempts do not duplicate the result.

Prefer local or hermetic providers for routine execution. External or production API testing requires explicit authority, safe accounts and data, bounded traffic, cleanup, and a stated limitation.
