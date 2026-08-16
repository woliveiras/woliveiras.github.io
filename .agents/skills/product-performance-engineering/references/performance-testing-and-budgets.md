# Performance testing and budgets

Use this reference to convert a measured regression into a durable, interpretable check. A performance test must fail for the intended behavior, remain sensitive to a relevant mutant, and avoid rewarding a faster wrong result.

## Choose the test level

- Use a focused microbenchmark for an isolated stable operation whose inputs and output are representative.
- Use a component or integration benchmark when scheduling, serialization, storage, network substitution, rendering, or framework lifecycle is part of the cost.
- Use an end-to-end journey benchmark for startup, navigation, interaction, scrolling, or other user-visible critical paths.
- Use field monitoring when population diversity, real networks, long lifecycle, background behavior, or rare tails cannot be reproduced in a laboratory.

Do not use a microbenchmark to prove whole-product improvement. Keep correctness tests alongside performance tests.

## Control the environment

Record hardware and capacity, OS/browser, runtime/framework, build and optimization mode, compilation/profile state, thermal/power state, foreground/background, cache, data, credentials, network shaping, fixture version, setup/teardown, and tool versions. Do not silently compare debug and release, emulator and physical device, different data, or cold and warm paths.

Warmup must match the metric. Warmup can stabilize JIT compilation or caches but can also erase the cold-start behavior under test. Reset only state that the scenario contract says should reset.

## Repeat and summarize

Collect repeated samples after declared warmup. Record the repetition count and preserve the raw sample set or a reviewable summary with count, exclusions, reason for exclusions, center, tail, dispersion, and confidence method when used. Compare distributions and representative percentiles, not only means or the best run.

Investigate noise before increasing tolerance. Common sources include background load, thermal throttling, power mode, compilation, cache, network, shared CI hosts, browser updates, device farm variability, profiler overhead, and fixture drift.

## Set thresholds and budgets

Derive a budget from an observed baseline, product objective, supported population, field distribution, platform guidance, and acceptable regression risk. Record:

- metric, unit, start/end, population or environment, and aggregation;
- current baseline distribution and date/release;
- target or maximum and why it is meaningful;
- allowed noise or statistical comparison rule;
- consequence of warning/failure and owner;
- review cadence and conditions for an intentional change.

Never lower a budget or relax a threshold merely to make a test pass. An intentional budget change is a product/engineering decision requiring new evidence and review; retain the prior value and rationale in Git history.

Avoid universal thresholds copied from another product. A platform vendor metric may inform a budget, but it does not replace the product's task, population, and risk.

## Design regression checks

Start fail-first against the known regression or a representative mutant. Then calibrate the check against:

1. the original slow behavior;
2. the causal candidate;
3. a no-op;
4. a functionally incorrect faster mutant;
5. repeated runs under expected noise;
6. a materially slower mutant near the decision boundary.

Require output equivalence, ordering, error behavior, data integrity, accessibility, and lifecycle invariants before evaluating speed. Fail closed when required measurement data is absent or malformed.

## Use CI proportionally

Prefer deterministic structural/correctness gates and stable focused benchmarks in ordinary CI. Run noisy device/browser suites in controlled hardware or scheduled pipelines with explicit baselines. Separate warnings from blocking failures only through an explicit policy; never label missing or unstable evidence as a pass.

Shard without changing scenario state. Pin fixture inputs and relevant tool/runtime versions. Store bounded results and environment fingerprints, not secrets, user payloads, full private traces, or credentials. CI is a regression signal, not a substitute for field evidence or representative physical-device validation.

## Prevent flaky conclusions

- Do not rerun until green or discard slow samples without a predeclared rule.
- Do not compare a single before run with a single after run.
- Do not mix different cache, compilation, startup, release, or device conditions.
- Do not average away failures, ANRs, hangs, or out-of-memory events.
- Do not claim improvement when confidence intervals, noise analysis, or sample overlap make the result inconclusive.
- Do not preserve a fragile benchmark merely because it once caught a regression; redesign its environment or oracle.

Report `pass`, `fail`, or `inconclusive` with the actual samples, comparison rule, correctness result, environment, and limitations.
