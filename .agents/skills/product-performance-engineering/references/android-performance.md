# Android performance

Use this reference for Android apps and the Android side of a cross-platform app. Measure a release-like, profileable build and record device, API level, thermal state, compilation mode, process state, and app data.

## Startup

Separate cold, warm, and hot startup because process, activity, and resident-state work differ. Measure both time to initial display (TTID), when the first frame is drawn, and time to full display (TTFD), which the app must signal when its meaningful initial state is actually ready. Inspect the Android App Startups interval in Perfetto and the work before each milestone: [App startup time](https://developer.android.com/topic/performance/vitals/launch-time).

Do not improve TTID by drawing a shell while delaying the product's real TTFD without reporting both. Profile initialization, class loading and compilation, dependency injection, content providers, disk and network I/O, serialization, first composition/layout/draw, and asynchronous gates. Preserve process recreation and saved-state behavior.

Use Macrobenchmark for end-to-end startup and critical user journeys. Record `StartupMode`, compilation mode, setup, iterations, and profile installation; these materially change results: [Macrobenchmark overview](https://developer.android.com/topic/performance/benchmarking/macrobenchmark-overview). Use Microbenchmark only for a sufficiently isolated hot code path; it does not prove app startup or user-journey performance.

Baseline Profiles can precompile code on critical paths, and Startup Profiles influence startup DEX layout. Generate them from representative journeys and benchmark the specific contribution against a comparable build and compilation state. Do not assume profile generation proves benefit: [Baseline Profiles overview](https://developer.android.com/topic/performance/baselineprofiles/overview) and [debugging profiles](https://developer.android.com/topic/performance/baselineprofiles/debug-baseline-profiles).

## Frames, jank, and rendering

Use frame timelines and Perfetto to identify slow and frozen frames, missed deadlines, scheduling, CPU/GPU contention, main-thread work, RenderThread, layout/draw, buffer timing, and system load. A fixed 16 ms assumption is not universal across refresh rates; use the actual frame timeline and platform definitions. Android vitals aggregates field signals, while a trace localizes a reproducible journey: [Slow rendering](https://developer.android.com/topic/performance/vitals/render) and [measuring performance](https://developer.android.com/topic/performance/measuring-performance).

For Compose, inspect composition, layout, and draw separately. Use composition tracing to localize unexpected recomposition, then verify state stability, read placement, lazy-layout keys, allocations, subcomposition, and release-mode configuration. Do not apply `remember` or `derivedStateOf` without a measured invalidation path: [Jetpack Compose performance](https://developer.android.com/develop/ui/compose/performance).

For Views, inspect hierarchy depth only in relation to measured layout/draw work. Check `RecyclerView` binding, diffing, item reuse, invalidation, overdraw, bitmap work, and custom drawing. A named component is not the cause until a trace connects it to late frames.

## ANRs and the main thread

Classify the ANR type and inspect the relevant trace, thread states, locks, binder calls, I/O, broadcasts/services, and system load. A stack snapshot can show where a thread was sampled but may not prove why it waited. Perfetto helps distinguish app work, scheduling, lock ownership, binder replies, and system-server behavior: [Diagnose and fix ANRs](https://developer.android.com/topic/performance/anrs/diagnose-and-fix-anrs).

Moving work off the main thread requires ordering, cancellation, lifecycle, backpressure, error propagation, and completion semantics. Do not convert an ANR into silent loss, duplicate work, stale UI, or uncontrolled background execution.

## CPU, GPU, memory, storage, network, and energy

Use Android Studio Profiler for targeted CPU, allocation, heap, network, and energy investigation and Perfetto for cross-system timing. Record profiler overhead and build configuration. For memory, distinguish Java/Kotlin heap, native allocations, graphics, code, stack, cache, allocation churn, garbage collection, retained objects, and low-memory kills. Exercise foreground/background, rotation, navigation, process recreation, trim callbacks, and repeated journeys: [Manage memory](https://developer.android.com/topic/performance/memory).

Trace storage and serialization on the caller's critical path; measure payload size, transactions, indexes, fsync/durability, contention, and cancellation without weakening integrity. For network, separate DNS/connection, server, transfer, parsing, retries, caching, radio wakeups, and offline/reconnect behavior.

For battery and wake locks, define the task and observation window, then inspect wakeups, location/sensor use, jobs, foreground services, radios, CPU/GPU, and background execution. Do not shift visible work into uncontrolled background work or relax platform restrictions to improve a foreground metric.

## Verify

Repeat the original benchmark and trace on representative physical devices, including a modest supported device where possible. Compare distributions, not the fastest iteration. Verify startup output, interaction correctness, scrolling, accessibility, process recreation, background/foreground, memory pressure, network changes, storage integrity, energy, and error recovery. State when Android vitals, Play population, or physical-device verification is unavailable.
