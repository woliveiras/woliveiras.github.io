# CRM product design

Use this reference for customer relationship workflows involving leads, contacts, accounts, opportunities, activity, ownership, and next actions.

## Model records and relationships

Preserve the product's definitions: a lead is not universally an unqualified contact, and account/opportunity models vary. Show record identity, relationship, source, lifecycle/status, owner, permissions, data quality, last activity, and next action. Prevent users from acting on the wrong similarly named record.

## Pipeline and timeline

Define stage meaning, entry/exit criteria, probability ownership, required fields, stale rules, permitted transitions, closed/reopened behavior, and forecast effects. A visual pipeline must retain an accessible non-drag alternative and expose why a move is blocked.

Unify calls, messages, meetings, notes, field changes, and system events in a timeline without erasing provenance. Support scan, filter, expand, deep link, time zone, and restricted-entry behavior. Distinguish planned next action from completed activity.

## Search, filters, density, and editing

- Search across the fields users actually know, handle duplicates and permissions, and identify the matched attribute.
- Support saved views, visible active filters, owner/team scope, stable sort, counts, and shareability according to permission.
- Preserve data density for comparison and repetitive work. Improve column priority, alignment, grouping, sticky context, keyboard movement, and detail-on-demand rather than replacing useful tables with sparse cards.
- For inline editing, show editability, validation, save scope, pending state, partial failure, conflict, undo, and audit result.
- For bulk actions, show selected population and excluded records, validate permission per record, preview consequences, report partial success, and provide a recovery/export of failures.

Salesforce's official `lightning-datatable` documents sorting, selection, inline editing, row actions, and a separate keyboard action mode in [datatable accessibility guidance](https://developer.salesforce.com/docs/platform/lwc/guide/data-table-a11y.html). These illustrate enterprise table concerns, not a universal component API.

## Import, export, deduplication, and ownership

Preview import mapping, formats, defaults, validation, create/update rule, deduplication key, ownership, permission, and error rows before mutation. Make imports idempotent or safely repeatable. For export, state fields, filters, row count, sensitivity, locale/encoding, delivery, expiry, and authority.

During merge/deduplication, identify master/survivor, conflicting fields, related records, ownership, irreversible effects, audit history, and recovery. For reassignment, cover queues, territories, inactive users, dependent tasks, notifications, and permission changes.

## Mobile capture and verification

Optimize mobile for capture near the event: identify/create the right record, enter minimum credible data, save offline/pending, attach context with consent, and surface the next action. Do not hide completeness or duplicate risk. Test low connectivity, interruption, duplicate submit, virtual keyboard, permission denial, screen reader, large text, conflict after reconnect, and cross-device continuation.
