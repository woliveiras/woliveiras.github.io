# ERP product design

Use this reference for high-density, cross-module business processes whose correctness, authorization, and traceability matter more than visual minimalism.

## Business objects and end-to-end process

Start with master data, transaction document, organizational unit, role, currency, unit, status, and governing rules. Map upstream/downstream modules and handoffs: requester, buyer, approver, receiver, finance, inventory, and audit may see different views of the same process. Preserve document identity and links across requisition, order, receipt, invoice, payment, reversal, or the product's equivalent.

## Dense tables, forms, and bulk work

Retain fields needed for expert comparison, reconciliation, and repetitive entry. Improve scanability through column priority, alignment by data type, grouping, frozen identity/context, configurable views, keyboard navigation, validation summaries, and detail-on-demand. Do not turn every row into a card or hide critical columns merely to appear minimal.

For forms, expose company/entity, accounting period, currency, unit, tax, totals, derived values, defaults, source, and validation timing. Make local formatting distinct from stored meaning. For bulk operations, show population, eligibility, action scope, calculated impact, background progress, row-level failures, retry, and downloadable reconciliation.

SAP Fiori's [general pattern catalog](https://experience.sap.com/fiori-design-web/general-patterns/) is an official ERP-oriented example that coordinates action placement, draft handling, validation, navigation, and business-object handling. Translate the process principles rather than copying SAP terminology or layout.

## Approvals, permissions, and segregation of duties

Show why approval is required, current step, approver role, amount/threshold, policy exception, attachments, prior decisions, and deadline. Provide approve, reject, return/request changes, delegate, and escalate only when policy permits. Require a reason where audit rules demand it, not as arbitrary friction.

Enforce segregation of duties and effective permission at the operation boundary. Do not reveal restricted values in disabled controls or error messages. Cover substitute approvers, absence, changed authority, self-approval prohibition, and parallel versus sequential approval.

## Locks, exceptions, and irreversible actions

Represent blocked states explicitly: closed period, legal hold, missing master data, another user's lock, downstream posting, failed integration, insufficient stock, credit limit, or permission. Explain owner, cause, safe next action, and whether retry is useful. SAP Fiori's [general patterns](https://experience.sap.com/fiori-design-web/general-patterns/) catalog draft, message, navigation, and object handling as coordinated business-product concerns; their exact behavior remains product-specific.

Before post, release, close, cancel, reverse, delete, or pay, identify objects, ledger/inventory/financial effect, date/period, currency and units, dependencies, reversibility, and required authority. Prefer domain-valid reversal/correction over destructive deletion. Never imply that a technical success means downstream reconciliation succeeded.

## Traceability and verification

Expose actor, time, source, previous/new value, approval, integration, document chain, and reason according to audit/privacy rules. Test valid approval, rejected/returned path, permission denial, self-approval, closed period, lock/concurrency, partial bulk failure, exception resolution, duplicate action, irreversible confirmation, reversal, currency/date/unit localization, offline/degraded dependency, screen reader, keyboard-only dense operation, and printed/exported evidence when applicable.
