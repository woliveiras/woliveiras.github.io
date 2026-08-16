# SaaS product design

Use this reference for software-as-a-service experiences. Do not confuse SaaS with the Sass CSS preprocessor.

## Activation and onboarding

Define activation as the first evidenced value-producing outcome, not account creation or tour completion. Let the user enter a real task early; teach beside the control, accept action, then reveal the consequence. Use sample data only when clearly labeled and safely replaceable. Empty states should explain why the space is empty, what the user can do, prerequisites, permission limits, and the first useful action.

Model invite, sign-up, verification, workspace creation/join, initial configuration, import/integration, first result, return, and abandonment/recovery. Do not force a sequence of pop-ups or hide the product behind optional setup.

## Workspaces, multi-tenancy, and roles

Make the active workspace/tenant visible when confusion could cause cross-tenant action. Define switching, default tenant, invitations, pending/expired membership, offboarding, ownership transfer, and what happens to personal drafts. Separate tenant administration from ordinary product work; Microsoft describes these as control-plane and data-plane concerns in its [multitenant SaaS guidance](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/control-planes).

Show actions according to effective permission, but explain unavailable actions without leaking protected data. Model role changes, last-owner protection, license/seat constraints, elevated confirmation, and auditability. Never infer that the same named role has the same permission across products.

## Settings, collaboration, and notifications

Group settings by scope: personal, workspace, security, integration, billing, and platform administration. State who can change a value, whom it affects, when it takes effect, and whether it is reversible. For collaboration, define ownership, presence, comments/mentions, concurrent edits, conflict, handoff, and history.

Design notifications from user goals: event, recipient, channel, urgency, grouping, frequency, read state, deep link, mute/unsubscribe scope, and permission. Avoid making notification volume a proxy for engagement.

## Trial, billing, upgrade, downgrade, and cancellation

Show plan, price, currency, cadence, tax treatment, trial end, payment state, usage/seat basis, limits, proration, effective date, and next invoice before commitment. Separate feature discovery from coercive upgrade blocking. For failed payment, preserve safe access according to contract, identify the affected account, and provide retry/update/recovery without exposing sensitive payment data.

Make downgrade and cancellation findable. Before confirmation, explain timing, retained access, data/export effects, credits/refunds, dependent features, and recovery/reactivation. Stripe's [customer portal documentation](https://docs.stripe.com/customer-management) is an official implementation example that exposes payment methods, invoices, subscription changes, and cancellation; it is not a universal billing policy. Do not use false urgency, obstruction, guilt, or consent bundling.

## Administration verification

Test new and returning user, invited member, member without permission, workspace owner, billing admin, last admin, trial expired, limit reached, failed payment, downgrade, cancellation, data export, tenant switch, concurrent configuration, and service degradation. Verify that product, admin, and billing states agree after refresh and across web/mobile entry points.
