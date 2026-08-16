# Mobile product design

Use this reference for native iOS/Android behavior or mobile-specific product flows. Adapt the task to the platform and context; do not reduce mobile to a smaller desktop canvas.

## Platform and device context

Inspect supported OS versions, device classes, windowing/multitasking, orientation policy, safe areas and system bars, text scaling, appearance modes, input methods, accessibility services, and existing native components. Apple Human Interface Guidelines are [platform guidance](https://developer.apple.com/design/human-interface-guidelines); Android's [adaptive layout guidance](https://developer.android.com/design/ui/mobile/guides/layout-and-content/adapt-layout) explicitly covers phones, foldables, tablets, resizable windows, and orientation.

Prioritize the task for intermittent attention, one-handed reach, touch imprecision, small viewports, and environmental interruption. Preserve parity of outcome across web and mobile without forcing identical layouts or navigation models.

## Touch, keyboard, and safe areas

- Use sufficiently large, spaced targets and provide alternatives to complex gestures.
- Keep active controls out of system gesture regions, display cutouts, and unsafe insets; Android documents these constraints in its [system bars guidance](https://developer.android.com/design/ui/mobile/guides/foundations/system-bars).
- When the virtual keyboard opens, keep the focused field, label, validation, and relevant action visible. Select an input configuration that matches the data without blocking valid international formats.
- Support external keyboard, pointer, switch, voice, and assistive input when claimed by the platform/product.
- Test portrait, landscape, split view, fold posture, and rotation during a draft when supported. Do not lock orientation without an evidenced essential reason.

## Navigation and back behavior

Use established iOS and Android conventions for hierarchy, tabs, modals, sheets, and system back. Define back for each state: dismiss transient UI, leave edit mode, return within hierarchy, or exit. Warn only when leaving would lose meaningful unsaved work. Android's [predictive back guidance](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture) illustrates why app state must cooperate with system navigation.

Preserve navigation context after authentication, permission settings, external payment, link handling, process death, and relaunch. Make deep links permission-aware and give a safe landing if the target is unavailable.

## Interruptions, offline, and permissions

- Save or checkpoint recoverable work before backgrounding when the domain allows; distinguish local pending, syncing, synced, conflicted, and failed states.
- Design offline entry, cached/read-only behavior, queued actions, retries, ordering, duplication, conflicts, and logout/data-removal consequences.
- Ask for a platform permission at the moment its benefit is understandable. Explain the task-specific reason before the system prompt when useful, handle denial without loops, and provide a path to settings only when necessary.
- Handle calls, notifications, app switching, biometric cancellation, low connectivity, expired sessions, and OS process termination without false success or silent data loss.

## Mobile verification

Run critical tasks on representative physical devices when possible, then cover simulators/emulators for breadth. Verify touch, virtual and hardware keyboard, screen reader, text scaling, display zoom, reduced motion, contrast/appearance modes, safe areas, orientation, background/resume, offline/reconnect, permission denial, deep links, system back, and interrupted submission. Record what was simulated rather than observed on hardware.
