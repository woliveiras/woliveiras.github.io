# Accessibility and inclusive design

Use this reference to design and review operability, perception, comprehension, and compatibility. Declare the applicable legal or organizational target separately; this guidance is not legal advice.

## Standards and evidence classes

[WCAG 2.2](https://www.w3.org/TR/WCAG22/) is the current W3C Recommendation for web-content conformance. Treat its success criteria as **normative** when WCAG 2.2 is the declared target. W3C Understanding pages are informative explanations, not additional requirements. Apple and Android documents are **platform guidance**. Usability studies and heuristics are empirical or advisory, not universal rules.

For web and web views, evaluate the complete process, not isolated screens. Include non-text alternatives, structure and relationships, meaningful sequence, use of color, contrast, reflow, text spacing, keyboard access, focus order and visibility, bypass/navigation, labels and instructions, errors, status messages, pointer gestures, target size, and accessible authentication as applicable.

## Input, focus, and semantics

- Support all applicable functions by keyboard without traps; preserve logical focus order and a visible, unobscured indicator. Use [WAI keyboard guidance](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) and the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) when a custom web widget is genuinely required.
- Prefer native semantic elements and platform controls. Expose accurate name, role, value, state, relationships, errors, and live status. DOM or accessibility order must match meaningful reading and interaction order.
- On route changes, dialogs, errors, async completion, and restored views, move or restore focus deliberately without surprising the user.
- Provide a single-pointer alternative to dragging and a non-gesture route for essential mobile actions.

## Perception and adaptation

- Meet the declared contrast target for text, meaningful graphics, controls, states, and focus. Never rely on color alone.
- Support browser zoom/reflow and OS text scaling without clipping, overlap, lost controls, or forced two-dimensional scrolling except where the content itself requires it.
- Test text-spacing overrides and localization expansion. Do not encode essential text in images.
- Respect reduced-motion settings; avoid flashing hazards; keep essential state and causality understandable without animation.
- Pair sound with visual or textual information and animation with a static/state alternative.
- Size and space touch targets for the platform and context. WCAG 2.2's normative minimum and exceptions differ from platform recommendations; [Apple accessibility guidance](https://developer.apple.com/design/human-interface-guidelines/accessibility) and [Android accessibility guidance](https://developer.android.com/guide/topics/ui/accessibility) inform native target and input choices.

## Screen readers and inclusive language

Test representative tasks with supported screen readers and browser/platform combinations. Confirm headings/landmarks, labels, descriptions, table relationships, reading order, announcements, errors, modal boundaries, and custom control behavior. Do not use placeholder text as the only label.

Use direct, respectful language; avoid unnecessary gender, ability, cultural, or technical assumptions. Let people state identity information only when the task requires it, explain why, and support the product's localization rules. Do not infer that one disabled participant represents all users; WAI recommends involving a range of users and contexts in [accessibility evaluation](https://www.w3.org/WAI/test-evaluate/involving-users/).

## Verification limits

Automated checks can detect some markup, contrast, labeling, and rule violations. They cannot determine overall accessibility, task usability, clarity, correct reading order in every context, or the quality of alternatives. WAI states that no tool alone determines conformance and knowledgeable human evaluation is required; see [Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/).

Report tested scope, standard/version/level, pages or flows, technologies, browsers/devices, assistive technologies, automation, manual checks, failures, exceptions, and untested areas. Say “no detected failures in the tested scope” rather than claiming compliance unless a valid conformance evaluation supports it.
