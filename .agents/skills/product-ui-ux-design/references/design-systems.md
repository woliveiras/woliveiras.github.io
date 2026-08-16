# Design systems

Use this reference when a product already has a design system or when the request requires reusable tokens, components, patterns, or governance.

## Inspect before extending

Inventory the implemented tokens, components, variants, states, composition primitives, responsive behavior, accessibility semantics, content guidance, platform versions, documentation, and ownership. Inspect real consumers and tests; a design file or component name does not prove runtime behavior.

Prefer an existing component when its semantics, states, accessibility, density, responsiveness, and content contract fit. Compose existing primitives when the new pattern is a product-level arrangement. Extend a component when the same semantic control has a durable missing variant. Add a component only for a recurring interaction with a stable contract. Keep a local product solution when evidence for system-wide reuse is absent.

## Specify the contract

- **Tokens:** name by semantic role rather than raw value; include light/dark/high-contrast behavior where supported. [Atlassian's token guidance](https://atlassian.design/foundations/tokens/design-tokens/) is an official example of semantic naming and theming, not a universal token schema.
- **Component:** define purpose, anatomy, content constraints, size/density, variants, default and controlled properties, and prohibited uses.
- **States:** include default, hover when applicable, focus, active/pressed, selected, disabled, read-only, loading, success, warning, error, empty, and skeleton only where semantically valid. Material's [state guidance](https://m3.material.io/foundations/interaction/states/overview) demonstrates redundant state indicators.
- **Composition:** define spacing, alignment, hierarchy, overlays, focus ownership, scroll, nesting, and interaction between children.
- **Responsive behavior:** state what reflows, wraps, moves, reveals, collapses, scrolls, or changes presentation at content-driven constraints.
- **Accessibility:** define semantics, name/description, keyboard and touch behavior, focus, announcements, contrast, motion, and assistive-technology expectations.
- **Documentation:** include examples, counterexamples, content, supported states, acceptance checks, version, and migration path.

## Governance and change

Identify owner, proposal/review path, compatibility policy, adoption evidence, release/versioning, deprecation, migration, and usage measurement. Review a system change against multiple real consumers, not only a showcase. Keep design and code contracts synchronized without requiring any one design tool.

Vendor systems illustrate different contexts: Shopify Polaris [form guidance](https://shopify.dev/docs/apps/design/user-experience/forms) reflects merchant administration, WordPress Gutenberg reflects modular authoring, Salesforce Lightning's [base-component accessibility guidance](https://developer.salesforce.com/docs/platform/lwc/guide/base-components-accessibility.html) reflects enterprise web apps, and SAP Fiori's [general patterns](https://experience.sap.com/fiori-design-web/general-patterns/) reflect business objects and workflows. Extract transferable principles, then preserve the target product's vocabulary, technology, and constraints.
