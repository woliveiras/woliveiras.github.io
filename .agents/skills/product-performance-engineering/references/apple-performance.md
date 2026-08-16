# Apple platform performance

Use this reference for iOS, iPadOS, macOS, and the Apple side of a cross-platform app. Record product/platform version, device, OS, build configuration, thermal and power state, foreground/background state, data, network, and launch history.

## Follow the platform measurement cycle

Apple's guidance uses a cycle of gathering current data, prioritizing an issue, profiling, changing the implementation, and gathering data again. Instruments and Xcode Organizer cover launch, responsiveness, storage, memory, and energy; keep the product's own task and budget distinct from platform guidance: [Performance and metrics](https://developer.apple.com/documentation/xcode/performance-and-metrics) and [Improving app performance](https://developer.apple.com/documentation/xcode/improving-your-app-s-performance/).

Treat Apple numeric thresholds as platform guidance or vendor metrics, not automatically as a proven product requirement. Establish the supported-device distribution and the task consequence before setting a budget.

## Launch and first usable state

Measure launch to the first drawn screen and separately define the first state that is genuinely usable for the task. Profile multiple launch situations with the App Launch Instruments template, Time Profiler, and thread-state trace. Inspect dynamic library loading, initializers, main-thread work, storage, network, restoration, view construction, and asynchronous gates: [Reducing launch time](https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time).

Do not make the first frame faster by moving required work past it without reporting the later usable milestone. Verify foreground resume and background transition separately from fresh launch.

## Hangs, hitches, and frame pacing

A hang is an interval in which a discrete interaction cannot progress because the main run loop is unresponsive; a hitch is a late frame that interrupts continuous motion. Use the Hangs, Hitches, Time Profiler, CPU Profiler, and relevant rendering instruments to distinguish busy main-thread work, blocked work, render-server delay, CPU/GPU cost, and scheduling: [Understanding hangs](https://developer.apple.com/documentation/xcode/understanding-hangs-in-your-app), [Understanding hitches](https://developer.apple.com/documentation/xcode/understanding-hitches-in-your-app), and [Improving responsiveness](https://developer.apple.com/documentation/xcode/improving-app-responsiveness).

Use the actual display refresh behavior and Instruments timelines; do not impose one fixed frame budget on every device. Correlate the recorded interval to a real interaction and preserve gesture, animation, input, and output behavior.

## SwiftUI, UIKit, and AppKit

For SwiftUI, use the SwiftUI Instruments template to locate long view-body, platform-view, layout, text, and frequent update work. Then profile the code responsible and inspect observation dependencies, identity, invalidation, layout, and hosted UIKit/AppKit views. Do not equate a `body` call count with root cause without timing and task impact: [Understanding and improving SwiftUI performance](https://developer.apple.com/documentation/xcode/understanding-and-improving-swiftui-performance).

For UIKit or AppKit, inspect view/controller lifecycle, layout passes, drawing, image decoding, diffing, reuse, constraints, text, and main-thread callbacks. Change hierarchy or caching only when the profile shows the relevant cost and correctness can be preserved.

Use signposts to bracket product-specific intervals when existing Instruments events cannot identify the task. Keep signpost names free of sensitive values and avoid instrumentation whose overhead changes the path being measured: [Logging](https://developer.apple.com/documentation/os/logging).

## Field evidence with MetricKit

MetricKit supplies on-device performance metrics and diagnostics from real usage. Preserve report cadence, OS availability, population, release, and aggregation boundaries; a daily payload is not a request-level trace. Use field data to prioritize and laboratory Instruments traces to localize a reproducible cause: [MetricKit](https://developer.apple.com/documentation/metrickit).

Do not claim all-user improvement from a local Instruments run. Do not upload MetricKit payloads, hang diagnostics, or signpost content to an external service without privacy review and authorization.

## Memory, storage, network, and energy

Use Allocations, Leaks, Memory Graph, VM Tracker, and Organizer/MetricKit evidence as applicable. Distinguish heap growth, native/graphics memory, cache, retained objects, churn, pressure, background termination, and expected delayed release. Exercise repeated navigation, scene lifecycle, background/foreground, memory warnings, and restoration.

For storage, trace blocking, reads/writes, serialization, coordination, and durability on the critical path. For network, separate connection, server, transfer, decoding, retries, caching, and background-session behavior. For energy, inspect CPU/GPU, wakeups, timers, radios, location, sensors, media, and background tasks over a task-relevant window. Preserve background-task expiration and completion semantics.

## Verify on representative devices

Simulators are useful for functional debugging but do not prove physical-device CPU, GPU, memory pressure, thermal, radio, storage, or energy performance. Repeat before/after scenarios on representative physical devices, including a lower-capability supported device when possible. Verify output equivalence, accessibility, launch and resume, frames, memory, storage, network, energy, cancellation, and lifecycle recovery; declare unavailable field or physical-device evidence.
