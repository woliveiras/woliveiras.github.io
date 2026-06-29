# Instructions for Agents Working on the Hands-on Agentic RAG Series

Use this file as the minimal entrypoint for work on the series.

Do not load `brainstorming.md` by default. It is historical source material. Use the modular context files under `context/` instead.

## First Step

Always read `context/README.md` after this file. It explains which context files to load for writing, reviewing, planning implementation, or checking whether an idea fits the series.

When a task needs external documentation details, read `resources/README.md` and then the specific resource file for that technology or topic.

## Mission

Help create the **Hands-on Agentic RAG** blog series.

The series teaches how to design, build, evaluate, and operate Agentic RAG systems through **VetSupport**, a local agent harness for veterinary clinics.

The goal is to teach reliable AI engineering, not to build a production SaaS in the main path.

## Non-Negotiable Rules

- Write final blog posts in English.
- Keep the domain focused on veterinary clinics.
- Do not drift into human healthcare as a series scope.
- Do not claim that the agent diagnoses, prescribes, changes medication, or replaces veterinarians.
- Keep the main implementation path centered on a local agent harness.
- Do not introduce FastAPI, React, Next.js, or SaaS architecture as the core path; mention them only as future evolution when relevant.
- Use concrete commands, expected outcomes, trade-offs, and safety constraints when writing hands-on content.

## Context Routing

Load only the files needed for the task:

- Writing a post: `context/series-positioning.md`, `context/editorial-guidelines.md`, `context/domain-and-safety.md`, `context/series-outline.md`, and the relevant section in `context/post-briefs.md`.
- Reviewing a post: `context/editorial-guidelines.md`, `context/domain-and-safety.md`, and `context/series-outline.md`.
- Planning or implementing VetSupport: `context/technical-architecture.md`, `context/domain-and-safety.md`, and `context/project-briefs.md`.
- Planning the series roadmap: `context/series-positioning.md`, `context/series-outline.md`, and `context/writing-roadmap.md`.

If a task seems to require `brainstorming.md`, first check whether the needed information already exists in `context/`.

If a task needs library/API details, first check whether the needed information already exists in `resources/`.
