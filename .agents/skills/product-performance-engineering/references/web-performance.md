# Web performance

Use this reference for browser products. Inspect the actual rendering architecture, route model, browser support, service worker, CDN/origin behavior, and field population before selecting a technique.

## Use metrics as signals

Core Web Vitals currently cover loading with LCP, interaction responsiveness with INP, and visual stability with CLS. They are Google web-ecosystem vendor metrics measurable in the field, not a complete usability or correctness model. Laboratory tools support reproduction and regression detection, but a synthetic run cannot establish field improvement, and Lighthouse is not certification: [Web Vitals](https://web.dev/articles/vitals) and [measurement guidance](https://web.dev/articles/vitals-measurement-getting-started).

Record navigation type, route, viewport, browser, device class, network, cache, consent state, user state, data size, and metric attribution. Segment field data before aggregating dissimilar tasks or populations. Treat TTFB as a diagnostic interval spanning redirects, connection, server, and transfer behavior—not an isolated root-cause verdict. When instrumenting browser marks and measures, preserve the specification's normative ordering and buffering contract and record its current publication status from the [W3C Performance Timeline](https://www.w3.org/TR/performance-timeline/); check browser support through [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance).

## Trace initial and subsequent navigation

For initial navigation, follow the critical rendering path from document request through HTML discovery, CSS, fonts, LCP resource, JavaScript, hydration or client rendering, layout, paint, and presentation. Break LCP into TTFB, resource-load delay, resource-load duration, and element-render delay where supported; then profile the dominant subpart: [Optimize LCP](https://web.dev/articles/optimize-lcp). Use the [Chrome DevTools Performance panel](https://developer.chrome.com/docs/devtools/performance) as a profiling surface, not an authority that supplies the product's causal conclusion.

For subsequent navigation, measure route intent to useful rendered state. Inspect data dependencies, chunk discovery, prefetch validity, cache reuse, client transitions, main-thread work, scroll/focus continuity, and stale-response handling. Do not assume a fast initial route implies fast client navigation.

## Diagnose responsiveness

Correlate an interaction with event handling, task queues, style/layout, paint, compositing, and next presentation. Inspect long tasks, repeated short tasks, third-party callbacks, synchronous storage, hydration, framework work, and garbage collection. INP field evidence captures a distribution of interactions; laboratory Total Blocking Time is only a proxy and cannot reproduce field INP without actual input: [Web Vitals](https://web.dev/articles/vitals).

Move work off the main thread only when the work is independent of DOM access and the serialization, transfer, cancellation, ordering, memory, and fallback costs are measured. Web Workers may reduce main-thread contention, but they are not an automatic fix: [Off-main-thread JavaScript](https://web.dev/articles/off-main-thread).

## Diagnose rendering and layout

Use performance traces and layout-shift attribution to identify the initiating DOM or resource change. Check intrinsic image/media dimensions, ad/embed reservations, font swaps, late injected content, animations, and framework updates. CLS is unitless and expected user-initiated shifts may be treated differently by the metric; preserve actual task continuity rather than optimizing only the number: [Optimize CLS](https://web.dev/articles/optimize-cls).

For dense lists and tables, measure data preparation, DOM count, component updates, style/layout, paint, accessibility-tree behavior, scrolling, keyboard navigation, selection, and editing. Virtualization is conditional: it can reduce rendered work but may break search, focus, semantics, print, measurement, or scroll anchoring.

## Inspect bytes and execution separately

For HTML, CSS, and JavaScript, distinguish transfer bytes from parse, compilation, execution, and retained memory. A smaller bundle may still execute later or more often; a split chunk may move delay into the interaction that needs it. Validate code splitting, lazy loading, dead-code removal, and prefetching against route transitions and representative caches.

For images, fonts, and media, inspect discovery, format support, responsive selection, dimensions, decoding, priority, quality, and reuse. Preload only evidence-backed critical resources; excessive preload or prefetch can contend with more important requests: [Preload critical assets](https://web.dev/articles/preload-critical-assets).

## Diagnose network, cache, and third parties

Trace redirects, DNS/connection/TLS reuse, request priority, compression, server timing, CDN/origin cache, validation, retries, streaming, and payload serialization. For service workers, compare controlled and uncontrolled navigation, install/update state, cache key, freshness, offline behavior, and failure fallback. Never add a cache without ownership, invalidation, consistency, capacity, privacy, and rollback rules.

Attribute third-party cost by execution, network contention, layout, memory, and task impact. Preserve required consent and functionality; do not remove a dependency solely from a score without product authority.

## Check memory and regressions

Reproduce a bounded lifecycle such as repeated route navigation or open/close. Compare heap snapshots, allocation timelines, detached DOM, listeners, observers, timers, workers, caches, decoded media, and framework retainers. Distinguish a leak from expected cache growth or delayed collection.

Verify before/after distributions for the original task plus accessibility, output equivalence, route history, focus, scroll, error recovery, cache correctness, memory, network, and lower-capability supported devices. Apparent gains from skipping content, delaying required code until interaction, or serving stale data are regressions, not improvements.
