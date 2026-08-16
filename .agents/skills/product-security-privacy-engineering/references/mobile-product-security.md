# Mobile product security

## Model the complete mobile boundary

Identify Android and Apple versions, application IDs, signing and distribution, build variants, entitlements and permissions, app groups, local storage, key stores, network clients, WebViews, deep or universal links, IPC, notifications, widgets/extensions, background work, backups, screenshots, clipboard, keyboards, accessibility services, analytics SDKs, and backend APIs.

Treat the device and client as attacker-influenced. Server authorization must not depend on a hidden screen, local role flag, package contents, obfuscation, certificate pinning, or device-integrity signal alone. Use attestation or integrity signals only as risk inputs with fallback and recovery, not universal proof of a genuine user or untampered device.

## Protect product data and authority

- Minimize sensitive data and permissions. Request platform permission near the relevant action and preserve a usable denied/revoked path.
- Put small secrets in the platform keystore or Keychain with accessibility appropriate to the threat model. Do not invent custom cryptography or hard-code server secrets in the app.
- Classify files, databases, shared preferences/defaults, caches, thumbnails, temporary files, WebView storage, logs, crash reports, and offline queues. Define backup inclusion, device migration, logout, account deletion, and restored-backup behavior.
- Restrict exported components, intents, content providers, URL handlers, app links, pasteboard/clipboard, file sharing, and extension/app-group access. Validate caller, origin, route, parameters, and ownership.
- Keep WebView bridges narrow, load only intended content, validate navigation, and assume untrusted web content can attack exposed native interfaces.
- Protect tokens in memory and storage, bind sessions and transactions appropriately, handle refresh/revocation, and prevent replay across devices or installations where required.
- Remove sensitive data from mobile logs, notifications, screenshots, task switchers, crash reports, analytics, and support exports according to product risk.

## Verify on representative platforms

Use synthetic accounts and records. Test locked/unlocked device, fresh install, upgrade, restore, background/foreground, process death, offline queue, logout, permission denial/revocation, deep link from an untrusted source, shared-device behavior, and compromised-session containment. Validate Android and Apple independently; simulator-only checks do not prove physical-device, keystore, biometric, backup, screenshot, or platform behavior.

Static package inspection and MASTG tests provide evidence, not a pentest certificate. Resilience against reverse engineering is defense-in-depth and cannot make a client-held secret safe.

## Sources

- **Standard:** [OWASP MASVS](https://mas.owasp.org/MASVS/) for mobile control groups.
- **Testing guidance:** [OWASP MASTG](https://mas.owasp.org/MASTG/) for mobile verification techniques.
- **Platform guidance:** [Android security best practices](https://developer.android.com/privacy-and-security/security-best-practices) and [Android privacy checklist](https://developer.android.com/privacy-and-security/about).
- **Platform guidance:** [Apple Security](https://developer.apple.com/documentation/security/) and [Protecting the User's Privacy](https://developer.apple.com/documentation/uikit/protecting-the-user-s-privacy).

Record installed versions and device conditions. Platform guidance, empirical evidence, and engineering heuristics must remain distinguishable.
