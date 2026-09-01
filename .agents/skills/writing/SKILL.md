---
name: writing
description: "Plan, draft, revise, humanize, or review any prose for this repository in its established authorial voice. Use for blog posts, series, documentation, pages, UI copy, descriptions, announcements, and other written text. Apply the house voice by default unless the user explicitly requests a different voice. Do not use for code-only changes or text attributed to another author."
---

# Writing

Write every text in this repository in the established house voice unless the
user explicitly asks for another voice. Do not substitute a generic technical,
corporate, academic, or assistant voice.

## Required references

For every writing task, read [voice profile](./references/voice-profile.md).

When drafting a blog post, essay, opinion, announcement, or other authorial
prose from notes or a topic, also read [author brief](./references/author-brief.md).
Skip the briefing only when the supplied draft already contains enough
author-specific material or when the text is documentation, reference content,
or interface copy that should remain neutral.

For substantial technical prose, also read:

- [information density](./references/information-density.md)
- [technical blog structures](./references/technical-blog-structure.md)
- [quality checklist](./references/quality-checklist.md)

For Astro or MDX content, also read [Astro and MDX
posts](./references/astro-mdx.md).

When auditing or changing this skill, read [evaluation
cases](./references/evaluation-cases.md) and check the affected behavior against
them.

## Process

1. Read the request, source material, repository instructions, and relevant
   references above.
2. Identify the audience, reader problem, intended outcome, text type, evidence
   boundary, language, and publication status.
3. Find the authorial anchor: a supplied observation, decision, disagreement,
   failure, constraint, result, or example that gives the text a point of view.
4. For authorial prose, run the source-sufficiency gate below before drafting.
5. Choose a structure from the reader's job and the available material. Do not
   turn the structure reference into a template or invent sections to complete
   it.
6. Draft from the authorial anchor. Use concrete examples, exact commands and
   outcomes, visible trade-offs, necessary limitations, primary sources, and
   honest uncertainty.
7. Revise for the house voice after the content is technically and factually
   correct. Preserve useful irregularities in rhythm, emphasis, and directness;
   do not preserve grammatical mistakes merely to sound personal.
8. Run the anti-generic, voice, evidence, and loss tests in the voice profile.
9. Validate format, links, code fences, content schema, lint, and build as
   applicable to the target.

## Source-sufficiency gate

Do not hide missing authorship behind polished exposition.

For blog posts, essays, opinions, personal narratives, and announcements, a
topic alone is not enough. Before producing a publishable draft, require at
least one author-supplied anchor and the concrete detail needed to support it.
Use the author brief to derive these from unstructured notes or ask only for
the missing information that would materially change the text.

If the source has no authorial anchor:

- do not invent a personal opening, opinion, reaction, mistake, or outcome;
- do not produce a generic full article to keep the workflow moving;
- return a useful factual outline or partial draft with targeted placeholders;
- ask concise questions for the missing decisions, experiences, or evidence.

This gate does not require a personal anecdote in documentation, reference
material, interface copy, or a purely factual procedure. Those texts should be
clear and specific without pretending to be personal.

## Evidence and authority

Never invent lived experience, opinions, mistakes, measurements, credentials,
quotes, citations, project outcomes, or emotional reactions. If authorial
context is needed but missing, follow the source-sufficiency gate instead of
silently replacing it with generic prose.

Distinguish direct observation, inference, engineering judgment, external
evidence, and opinion. Current technical claims require current sources or
verification; old posts are style evidence, not proof of current behavior or
belief.

Drafting or editing does not authorize publishing, deployment, promotion, or a
change in publication status.
