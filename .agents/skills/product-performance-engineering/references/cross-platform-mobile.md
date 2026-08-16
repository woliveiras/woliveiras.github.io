# Cross-platform mobile

Load this reference only after confirming React Native or Kotlin Multiplatform is present. Identify framework/runtime versions, renderer, JavaScript engine when applicable, native modules, build mode, platform integrations, and which layer owns the affected task. Always verify Android and iOS separately.

## Separate shared and native costs

Trace from user action through the shared layer, bridge or interop boundary, native platform, network/storage, rendering, and presentation. Attribute time and memory to the observed layer instead of calling the framework itself the cause. Inspect serialization volume, copies, batching, queueing, thread hops, synchronization, cancellation, error propagation, object lifetime, and native resource ownership.

A shared-code change may have different Android and iOS effects because scheduling, rendering, startup, compilation, storage, network, lifecycle, and device populations differ. Preserve platform-specific baselines and budgets.

## React Native

Measure a release build and distinguish JavaScript, UI/main, render, and native-module work. Correlate JS tasks, React render/commit, native view updates, input, navigation, lists, images, serialization/interop, and memory with the affected frames or task. Current official profiling guidance describes inspecting the UI, JS, native modules, and render threads; use it as platform guidance rather than proof of the inspected app's cause: [React Native profiling](https://reactnative.dev/docs/profiling) and [performance overview](https://reactnative.dev/docs/performance.html).

Do not assume every modern React Native configuration uses the same legacy bridge path. Inspect the actual architecture and versions before describing bridge, JSI, Fabric, TurboModules, or engine behavior. Validate Android and iOS traces independently.

## Kotlin Multiplatform

Identify what is shared: domain logic, data, networking, persistence, Compose Multiplatform UI, or another layer. Profile Android with Android tooling and Apple targets with Instruments, then correlate shared call stacks and interop boundaries. Inspect serialization, dispatchers/threads, object ownership, native calls, memory, cancellation, and lifecycle translations. Do not infer iOS behavior from an Android benchmark or the reverse.

## Measure common product paths

For every applicable runtime, measure:

- cold/warm startup and first truly usable state;
- first render, input acknowledgement, navigation, animation, and frame pacing;
- long and paged lists with representative data and images;
- network, serialization, persistence, offline/reconnect, and cancellation;
- memory growth across repeated navigation and background/foreground;
- process recreation, restoration, permission transitions, and plugin failure;
- Android and iOS output equivalence and platform-specific regressions.

Do not treat a simulator, emulator, desktop host, debug build, hot reload, or a single platform as physical-device proof. State which shared and native layers were not observable.
