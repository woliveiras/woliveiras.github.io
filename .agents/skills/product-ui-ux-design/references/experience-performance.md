# Experience performance

Use this reference when latency, loading, responsiveness, startup, constrained resources, or perceived performance affects a web or mobile product task. Own the experience contract under those conditions; do not turn this skill into a substitute for engineering performance diagnosis.

## Establish the task contract

Start with a critical task and define its actor, starting state, action, first acknowledgement, useful content or control, completion signal, failure and recovery. Include the supported device, input, network, data volume, cache state, and foreground/background state that materially change the experience.

Separate:

- verified observation from the running product;
- supplied field measurement, analytics, research, or feedback;
- laboratory or simulated measurement;
- platform or vendor metric;
- heuristic interpretation;
- hypothesis about a technical root cause.

Do not invent a universal wait threshold. Derive an experience objective from task consequence, current evidence, representative conditions, and product risk. Distinguish that objective from engineering budgets for code, network, rendering, storage, memory, or energy.

## Web experience contract

For loading, navigation, and interaction, specify what appears first, when controls become operable, whether existing content remains trustworthy during refresh, how concurrent responses are reconciled, and how layout stability, focus, selection, scroll, filters, drafts, and browser history are preserved.

Use Core Web Vitals as important signals, not as a complete usability score. The current set covers loading with LCP, interaction responsiveness with INP, and visual stability with CLS. Treat them as Google web-ecosystem guidance rather than a universal product requirement, and combine them with task completion, errors, abandonment, and recovery. The official guidance distinguishes field measurement from laboratory measurement and states that laboratory evidence does not replace real-user evidence: [Web Vitals](https://web.dev/articles/vitals) and [measuring Web Vitals](https://web.dev/articles/vitals-measurement-getting-started).

Test initial navigation, repeat navigation, deep links, back/forward, refresh, background refresh, multiple tabs, slow and intermittent connections, large representative data, narrow and wide viewports, and lower-capability supported devices. Do not infer bundle, main-thread, rendering, API, or database causes from an experience symptom.

## Mobile experience contract

Cover cold start, warm start, hot start, first visible frame, first usable state, foreground resume, process recreation, interrupted submission, offline work, reconnection, conflict, and permission transitions. Specify touch acknowledgement, scrolling and gesture continuity, virtual-keyboard behavior, pending work, truthful synchronization state, and recovery without duplication or data loss.

On Android, TTID describes initial display while TTFD includes the point at which the app is fully interactive; use both as platform signals and keep user-task readiness explicit. Android also distinguishes cold, warm, and hot starts: [Android app startup](https://developer.android.com/topic/performance/vitals/launch-time). Rendering and Android vitals can expose jank, frozen frames, ANRs, memory, battery, and other engineering evidence, but the UX decision remains tied to the affected task: [Android vitals](https://developer.android.com/topic/performance/vitals) and [slow rendering](https://developer.android.com/topic/performance/vitals/render).

On Apple platforms, distinguish a hang, where interaction becomes noticeably unresponsive, from a hitch, where visual motion misses its update. Treat Apple's numeric guidance as rough platform guidance and verify on representative physical devices, including lower-capability supported devices: [Improving app responsiveness](https://developer.apple.com/documentation/xcode/improving-app-responsiveness) and [Reducing launch time](https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time).

## Design waiting and recovery honestly

- Acknowledge an accepted action without implying completion.
- Keep prior content usable during background refresh only when it remains safe and label stale or pending state when consequential.
- Use determinate progress only when progress is meaningful and measured; otherwise communicate ongoing work without fabricating precision.
- Use a skeleton only when it preserves credible structure and does not create layout churn, inaccessible noise, or false readiness.
- Use optimistic UI only for bounded, reversible actions with a visible pending state, reconciliation, failure recovery, and duplicate prevention. Do not use it to imply completed payment, publication, approval, deletion, or another consequential result before confirmation.
- Preserve user input and context across timeout, cancellation, offline transition, retry, and partial failure.
- Announce relevant busy, progress, success, and failure state through applicable semantics; WAI-ARIA defines `aria-busy` as a normative web state, not a general loading design: [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria/#aria-busy).

Perceived performance may improve comprehension and control, but it must not conceal latency, uncertainty, failure, financial consequence, or destructive consequence. Animation and progress feedback cannot substitute for reducing a measured delay.

## Specify and verify

For each performance-sensitive task, record:

1. verified evidence and unavailable evidence;
2. observable start, acknowledgement, usable state, completion, and recovery;
3. supported conditions and representative data volume;
4. user-visible loading, stale, offline, timeout, partial, conflict, success, and failure states;
5. an experience objective and its evidence or explicit hypothesis status;
6. field measurement and laboratory checks appropriate to the platform;
7. accessibility behavior for focus, announcements, reduced motion, zoom or text scaling, and alternative input;
8. ownership of follow-up UX decisions versus engineering investigation.

Verify real critical tasks, not only metric dashboards. Segment field evidence by meaningful device, platform, connection, and journey conditions; use lab checks for reproducibility and regression detection. State when runtime, field, browser, or physical-device verification was not possible.

## Preserve the engineering boundary

This skill owns observable behavior, user control, state communication, task continuity, prioritization, and implementation-ready experience acceptance criteria. Engineering performance owns instrumentation, profiling, technical root cause, code and infrastructure optimization, runtime budgets, and causal regression tests.

Do not claim a technical root cause or prescribe a causal optimization without profiling evidence. If diagnosis or optimization is requested, compose optionally with `product-performance-engineering` when separately installed while keeping both skills independent. An audit-only request never authorizes either UX implementation or performance optimization.
