# Field observability

Use this reference when laboratory evidence cannot represent the deployed population or when a regression is reported from production. Field signals prioritize and validate population effects; traces and profiles localize a reproducible causal path.

## Define the field contract

Before collecting or interpreting telemetry, record metric definition, start/end, unit, eligibility, aggregation window, sample rate, release, platform, device class, browser/OS, network class, route/task, cache/start state where observable, privacy basis, retention, and access controls.

Keep platform/vendor semantics intact:

- Web RUM can collect browser performance APIs and product task marks, but eligibility and browser support vary. Core Web Vitals are vendor metrics, and their field distributions should not be reconstructed from a single laboratory tool: [Web Vitals](https://web.dev/articles/vitals).
- Android vitals aggregates deployed-device signals for startup, rendering, ANRs, crashes, memory, and battery areas, with metric-specific populations and filters: [Android vitals](https://developer.android.com/topic/performance/vitals).
- MetricKit delivers Apple on-device metrics and diagnostics with platform-defined cadence and aggregation. It is not a per-request distributed trace: [MetricKit](https://developer.apple.com/documentation/metrickit).

## Segment before concluding

Compare meaningful cohorts: release, experiment, route/task, browser/OS, device capacity, app process/start state, geography or network class when privacy permits, authenticated state, data volume proxy, and feature configuration. Avoid tiny or identifying segments. Report sample size and missing populations.

A population aggregate can hide a severe regression in a modest device class or a rare but consequential tail. Conversely, a changed population mix can move an aggregate without a code regression. Compare like-for-like cohorts and keep release adoption effects visible.

## Sample and preserve privacy

Collect only fields needed for the stated performance question. Prefer numeric timing, bounded categories, opaque release/route identifiers, and locally redacted diagnostics. Do not capture request bodies, page content, typed text, account IDs, credentials, precise location, private URLs, or full traces by default.

Document sampling decision, client/server sampling interaction, dropped events, retries, offline queues, upload cost, and bias. Telemetry itself consumes CPU, network, storage, memory, and energy; measure overhead and provide kill/rollback controls.

Do not upload traces, profiles, heap dumps, MetricKit diagnostics, or user data to an external service without authorization and privacy/security review.

## Compare releases and experiments

Use a predeclared release window and adoption floor. Check instrumentation changes, browser/OS updates, traffic mix, cache warming, backend changes, feature flags, and incidents before attributing a shift to the release. A temporal correlation is a hypothesis until supported by segmentation, rollback/holdout, controlled experiment, or a traceable code path.

For experiments, define assignment, exposure, guardrails, sample size, stopping rule, and correctness metrics. Do not optimize a technical metric at the expense of errors, task completion, accessibility, data integrity, energy, or privacy.

## Correlate without inventing causality

Use release, route/task, coarse device/network attributes, and privacy-safe correlation IDs to connect field symptoms with reproducible laboratory scenarios. Then profile the scenario. A dashboard spike can establish scope and priority, but not a code-level root cause.

State separately:

- measured field movement;
- measured laboratory movement;
- profile-supported causal inference;
- unresolved differences between field and lab;
- populations, browsers, releases, or devices not observed.

Never claim field improvement from laboratory evidence alone. Never report an unavailable field dataset as zero regression.

## Monitoring output

When authorized, define metric owner, query/dashboard location, segments, alert or review threshold, minimum sample, release annotation, privacy/retention rules, instrumentation version, expected overhead, and response playbook. A monitoring plan does not authorize adding telemetry, changing production, or contacting an external vendor.
