# Web product design

Use this reference for products whose interaction contract includes browser navigation, URLs, windows, responsive viewports, and web semantics.

## Responsive structure

Design from content and task breakpoints, not named devices alone. Let layouts reflow, resize, reposition, reveal, or collapse while preserving task order and access. A dense desktop workspace may use persistent navigation, parallel detail, and wide tables; a reduced viewport may switch to staged details, summaries, horizontal containment, or explicit column selection. Do not discard essential data or actions merely to fit.

Test narrow and wide widths, short height, browser and OS zoom, text expansion, pointer and keyboard, touch-capable laptops, and high-density data. [MDN's responsive design overview](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) is web-platform guidance, not a fixed breakpoint prescription.

## Navigation and browser behavior

- Give meaningful destinations stable URLs and support deep links where permissions allow.
- Make back/forward restore a credible prior view, including query, filters, pagination, selection, and scroll when appropriate.
- Define refresh behavior for drafts, submitted actions, transient notices, stale data, and expired sessions.
- Treat multiple tabs as concurrent clients: prevent silent last-write-wins data loss, identify stale objects, and reconcile conflicts.
- Keep page titles, headings, landmarks, breadcrumbs, and active navigation consistent with location.
- Do not hijack standard link behavior or require a single linear path when the product supports exploration.

## Forms

Use one persistent label per control, group related inputs semantically, state required/optional rules, and select input types that match the data. Preserve user input across validation and recoverable failures. Place a concise error summary at the task level and specific guidance at the field; focus/announce it appropriately. Show units, formats, limits, dependencies, defaults, and financial consequences before submission.

Choose autosave only when its ownership, status, conflict, retry, undo, and offline behavior are clear. Otherwise use explicit save and warn before abandoning dirty state. The [GOV.UK Design System error-message pattern](https://design-system.service.gov.uk/components/error-message/) is an official system example; translate its principle rather than copying its presentation blindly.

## Search, filters, and tables

- Define searchable fields, matching, ranking, spelling, zero results, recent/history behavior, and permission filtering.
- Show active filters, result count, remove/reset actions, combination logic, applied-versus-draft behavior, and URL persistence.
- Make sort key and direction explicit and stable; preserve them on return.
- Use semantic tables for relational data. Keep row identity and column headers visible or programmatically available.
- For selection and bulk actions, expose selected scope, pages included, exclusions, permissions, partial failures, and recovery. Never imply “all” when only the current page is selected.
- When space contracts, prioritize identity, status, primary measure, and task actions; offer deliberate detail rather than arbitrary column disappearance.

## Async and distributed states

Differentiate initial loading, background refresh, empty collection, filtered-empty result, partial content, stale content, failure, rate limit, maintenance, and offline. Preserve usable content during background refresh when safe. Provide retry or alternative action, retain inputs, avoid duplicate submissions, and make eventual completion discoverable after navigation.
