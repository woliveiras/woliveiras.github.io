# CMS product design

Use this reference for structured content creation, review, publication, media, and governance.

## Content modeling and finding

Define content types, fields, relationships, validation, reuse, lifecycle, ownership, channels, locale behavior, and migration before shaping the editor. Present the author's domain model, not storage internals. Make content searchable/filterable by status, owner, type, locale, scheduled date, and relationship as tasks require.

WordPress Gutenberg's [block editor handbook](https://developer.wordpress.org/block-editor/) is an official example of modular content composition. It does not make block editing the right model for every CMS; structured records, long-form documents, and page composition have different needs.

## Create and edit

Show field purpose, content constraints, validation, required locale, inherited/default value, and where the content appears. Preserve hierarchy and context in nested or referenced content. Define undo/redo, concurrent editing, lock/conflict, and whether changes affect shared content elsewhere.

For autosave, expose saving, saved, offline/pending, conflict, and failed states; preserve recoverable drafts. Autosave does not replace explicit publish approval. WordPress documents local/server [autosave actions](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/), an implementation example rather than a universal interval or persistence rule.

## Preview, review, approval, and publication

- Preview the correct channel, device, locale, audience, permissions, and draft version; label preview limitations.
- Separate editorial comments/suggestions from publishable content.
- Show reviewer, requested changes, approval state, blocked requirements, and history.
- Enforce roles and permissions for edit, review, approve, publish, unpublish, archive, and restore without exposing restricted content.
- Before publication, summarize target, locale/channel, timing, dependencies, changed content, and validation warnings.
- For scheduling, show timezone, daylight-saving interpretation, effective state, conflicts, cancellation, missed job, and retry.
- After publication, show canonical destination, version, time, actor, channels, cache/propagation state, and next action.

## Versions, media, and localization

Make versions identifiable by actor/time/status; provide compare, restore-as-new-draft, and audit history. Do not silently overwrite published work. For media, cover upload progress, type/size, metadata, alt text, crop/derivatives, rights/credit, reuse, replacement impact, failure, and deletion dependencies.

Model locale fallback, translation status, source changes after translation, reviewer per locale, expansion, directionality, and publication independence. Do not equate machine translation with approved content.

## Verification

Test create, autosave interruption, offline recovery, invalid content, preview mismatch, requested changes, multi-role approval, scheduled publish across timezone changes, publish failure, concurrent edit, version restore, shared-media replacement, missing alternative text, and multi-locale update. Preserve an auditable distinction among draft, approved, scheduled, published, archived, and failed states.
