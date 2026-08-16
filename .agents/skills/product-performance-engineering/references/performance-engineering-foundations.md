# Performance engineering foundations

Use this reference to turn a symptom into a bounded causal investigation. Do not begin with an optimization technique.

## Classify claims and evidence

Label important inputs and conclusions so guidance is not mistaken for proof:

- **Normative standard:** a specification that defines a platform contract, such as a W3C Recommendation. State the applicable version and conformance scope.
- **Platform guidance:** official engineering guidance for a browser, Android, or Apple platform. It is a strong default, not a product-specific requirement.
- **Vendor metric:** a metric, threshold, dashboard, or aggregation defined by a vendor. Preserve its population, window, eligibility, and aggregation rules.
- **Empirical evidence:** a field observation, experiment, benchmark, trace, or profile produced under recorded conditions.
- **Skill recommendation:** a reversible decision rule in this skill. Validate it against the inspected system.

Do not upgrade correlation, a tool warning, or platform guidance into empirical evidence about the product. Causality requires a supported mechanism and comparable observations that discriminate competing explanations.

## Define the measurement contract

Record:

1. the task, operation, start event, end event, and observable output;
2. build and release identity; framework/runtime version; device, OS, browser, CPU and memory class;
3. foreground/background, process, cache, compilation, authentication, data-volume, and network state;
4. cold, warm, or hot path and setup between iterations;
5. metric name, unit, collection point, clock, sample count, warmup, and aggregation;
6. baseline distribution, representative percentiles, variance, and known noise sources;
7. functional outcome and the affected user or system consequence.

Use the distribution appropriate to the question. A median can describe the center; tail percentiles can expose rare but damaging stalls; a rate can describe failures or missed frames. Report sample size and raw observations or an adequate summary. Never select only the best run.

## Reproduce and profile

Stabilize variables that are irrelevant to the reported regression without sanitizing away the behavior. Repeat the scenario enough to distinguish persistent change from noise. If field and laboratory results disagree, keep both and investigate differences in population, devices, releases, cache, data, and instrumentation. Profiling must observe the resource and interval named by the hypothesis.

Write competing hypotheses before changing code. For each, identify an observation that would support it and one that would falsify it. Select a profiler that observes the suspected resource:

- wall-clock trace for scheduling, blocking, network, storage, and critical-path order;
- sampled CPU profile for where CPU time accumulates;
- allocation/heap evidence for growth, retention, churn, or garbage collection;
- frame/render trace for missed deadlines, layout, paint, compositing, GPU, or view updates;
- request/waterfall evidence for discovery, priority, transfer, server, and dependency timing.

Correlate profile intervals with the affected task. A hot function outside the critical interval is not automatically the cause. A symptom disappearing after a change supports a causal claim only when the scenario, confounders, output, and repeated results remain comparable.

## Localize the critical path

Ask in order:

- Which dependency gates the observable end event?
- Is work necessary for the task, or can it be removed without changing output?
- Is necessary work placed too early, repeated, serialized, contended, blocked, or performed on a latency-sensitive thread?
- Is resource discovery or scheduling delayed?
- Is the task waiting on CPU, GPU, network, storage, memory pressure, synchronization, compilation, or another process?
- Does moving work change ordering, cancellation, consistency, or lifecycle semantics?

Use trace evidence to narrow the smallest causal seam before selecting an optimization.

## Preserve functional equivalence

Define equivalence before implementation: output values and ordering, error behavior, permissions, accessibility semantics, durability, cache freshness, synchronization, cancellation, lifecycle recovery, privacy, and security. Add a fail-first check for the performance regression and keep existing correctness tests. Reject an apparently faster candidate if it changes an invariant or merely skips required work.

## Prioritize

Prioritize by verified user or system impact, affected population, regression magnitude, tail severity, frequency, confidence in the causal path, implementation risk, reversibility, and validation cost. Do not prioritize solely by profiler percentage, file size, score, or ease of change.

Report one of four states for each conclusion:

- **Measured:** directly observed under the stated conditions.
- **Supported causal inference:** profile and controlled before/after evidence support the mechanism.
- **Hypothesis:** plausible but missing discriminating evidence.
- **Limitation:** the required environment, data, tool, field population, browser, or physical device was unavailable.
