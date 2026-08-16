# Mobile, offline, and device testing

## Allocate evidence across mobile layers

Use fast host-side checks for pure logic, platform integration checks for framework and persistence boundaries, emulator or simulator checks for supported lifecycle and UI behavior, and a focused physical device matrix for hardware-, OS-, energy-, permission-, and lifecycle-sensitive risks.

Android describes a portfolio of test sizes and scopes rather than one mandatory shape. Treat its strategy as **official platform guidance**: [Android testing strategies](https://developer.android.com/training/testing/fundamentals/strategies). Apple's Xcode testing documentation covers unit, UI, performance, and device-oriented workflows as **official platform guidance**: [Apple testing](https://developer.apple.com/documentation/xcode/testing). React Native's overview distinguishes static analysis, unit, integration, component, and end-to-end evidence: [React Native testing overview](https://reactnative.dev/docs/testing-overview) (**official platform guidance**).

## Model lifecycle and connectivity

For offline-capable behavior, control and verify:

- initial offline launch and cached-data validity;
- local mutation, pending state, queue ordering, and visible acknowledgement;
- reconnect, retry budget, idempotent replay, duplicate delivery, and conflict resolution;
- background and foreground transitions, cancellation, and interrupted work;
- process death, persisted work restoration, partial writes, and recovery;
- permission denial, revocation, and OS-driven lifecycle changes;
- clock skew and delayed synchronization where the contract depends on time.

An emulator or simulator provides useful deterministic platform evidence but is not physical device proof. Record OS image, architecture, configuration, build, and network controls. Use physical devices for representative touch, keyboard, accessibility service, notification, camera, sensor, memory, storage, energy, background execution, and vendor-specific risk.

Do not use production data or a device farm without explicit authority. Synthetic accounts, bounded environments, cleanup, and privacy controls are required. Report unavailable physical-device evidence as a limitation, not as a pass.
