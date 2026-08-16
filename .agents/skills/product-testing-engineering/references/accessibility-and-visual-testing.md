# Accessibility and visual testing

## Layer accessibility evidence

Automated component and browser checks can verify selected roles, accessible names, labels, states, focus transitions, contrast calculations, and rule-engine findings. Add keyboard traversal, zoom and text scaling, reduced motion, high contrast, dynamic type, and error-recovery scenarios according to the approved experience.

The W3C states that evaluation combines tools and human judgment. Treat WCAG as a **normative standard** and W3C evaluation guidance as authoritative interpretation; automated checks alone cannot establish conformance: [W3C evaluating web accessibility](https://www.w3.org/WAI/test-evaluate/).

Manual human evaluation should cover relevant keyboard-only flows, focus order and visibility, screen reader names, roles, states and announcements, content meaning, error recovery, and cognition-sensitive interactions. Record assistive technology, browser, OS, device, build, and scenario. A manual checklist does not replace stable automation for regressions it can detect.

## Visual testing

Use a visual snapshot for a bounded rendering risk with controlled viewport, fonts, theme, locale, content, animation, clock, platform, and rendering engine. Review the baseline as an artifact with ownership; never update snapshots automatically merely because they changed.

Visual diffs do not prove semantic accessibility, correct keyboard behavior, screen-reader output, responsive behavior outside sampled viewports, or physical device rendering. Simulator evidence is not physical device proof. Separate pixel variance from a product defect and preserve the diff used for judgment.

Testing Library and Playwright provide **official tool guidance** for user-facing queries and browser interaction: [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles), [Playwright best practices](https://playwright.dev/docs/best-practices). Results from the actual product build are **empirical evidence** and must name their environment and limitations.
