---
name: writing-technical-edit
description: "Rewrite blog drafts to remove AI writing patterns while preserving the author's voice. Use when editing technical posts. Do not use for academic papers or generating new content."
---


Rewrite blog drafts so they sound like a real technical author with lived context, not like a polished generic assistant.

Prioritize three checks:

1. **Voice**: does this sound like the author has a point of view?
2. **Evidence**: does the text contain concrete context, constraints, failures, and decisions?
3. **Shape**: does the post use the right structure for what it is trying to do?

## Information density

Match length to complexity, audience knowledge, and the post's job. Accuracy
outranks brevity: preserve every technical fact, constraint, command, source,
uncertainty boundary, and necessary caveat.

- Make each paragraph add a fact, opinion, decision, step, example, constraint,
  or necessary transition. Merge paragraphs that make the same contribution.
- Cut introductions that only announce the topic, transitions that narrate the
  outline, and conclusions that only recap.
- Use sections and lists when they improve navigation or comparison, not to
  manufacture structure or length.
- Keep examples that clarify a difficult point or make a procedure reproducible;
  remove decorative variants.
- Match explanations to the intended reader. Do not reteach prerequisites the
  post explicitly assumes.

Run a loss test on every sentence: if removing it preserves meaning, evidence,
voice, navigation, and safe execution, delete or merge it. Do not manufacture
facts, experience, examples, or certainty to make compressed prose feel vivid.

## What to eliminate

### Lexical tells

Remove or replace every instance of:

- The em dash character: use a comma, parentheses, colon, semicolon, or a new sentence instead
- Curly quotes and curly apostrophes (“ ” ‘ ’): use straight quotes (" ') so the text does not carry a copy-paste fingerprint
- "delve into", "dive deep", "dive into", "unpack", "tackle", "explore" (as a section opener), "demystify"
- "robust", "seamless", "powerful", "cutting-edge", "game-changing", "leverage" (verb), "harness" (verb), "utilize" (use "use")
- "crucial", "essential", "vital", "pivotal", "key" (when used as a filler adjective)
- AI-vocabulary nouns and verbs: "tapestry", "testament", "landscape" (as an abstract noun), "showcase", "underscore", "highlight" (as a filler verb), "foster", "garner", "intricate", "intricacies", "meticulous", "meticulously", "realm"
- Promotional / travel-guide vocabulary: "boasts", "vibrant", "rich" (as filler), "nestled", "in the heart of", "renowned", "profound", "bustling", "hidden gem", "stunning"
- "not just X, but Y" constructions - and the related "it's not X, it's Y", "X rather than Y", "no X, no Y, just Z": flatten into a direct claim
- "It's worth noting that", "It's important to remember that", "It goes without saying that", "Needless to say"
- "In the realm of", "In the world of", "In the landscape of", "When it comes to", "In today's X world", "In an era of"
- "Let's", "we'll" used to create false intimacy when the author is writing alone
- Forced tricolons (the rule of three): "fast, scalable, and reliable" - keep if each item is doing real work, cut if decorative
- "Happy coding!", "Let's get started!", "Stay tuned!" - remove closing platitudes

### Significance and puffery tells

LLMs inflate importance instead of stating facts. Remove or rewrite every instance of:

- **Significance and legacy padding**: "stands as a testament to", "plays a pivotal role", "marks a turning point", "reflects a broader shift", "cements its legacy", "leaves an indelible mark", "in an evolving landscape". State what the thing does, not how important it supposedly is.
- **Trailing present-participle analysis**: "-ing" clauses tacked onto the end of a sentence to editorialize, such as "...highlighting its importance", "...underscoring the significance", "...reflecting a broader trend", "...solidifying its role", "...contributing to the wider ecosystem". Cut the clause or turn it into a concrete, sourced claim.
- **Copula avoidance**: "serves as", "stands as", "functions as", "represents" where "is" is meant; "boasts", "features", "offers" where "has" is meant. Prefer the plain "is"/"has".
- **Vague attribution / weasel wording**: "experts argue", "observers note", "critics say", "studies show", "it is widely regarded" with no named source. Name the person or study, or delete the claim.
- **Manufactured debate**: "has sparked debate about", "raises important questions about", "situated within a broader discussion of". Only keep it if you can cite the actual debate.
- **Challenges-and-future-prospects formula**: "Despite its X, Y faces several challenges..." followed by a vaguely upbeat outlook. Replace with the specific problem and what actually happens next.

### Structural tells

Fix every instance of:

- **Generic opening paragraph**: the first paragraph must contain a thesis, a case, or a concrete fact - not context-setting prose about "why X matters nowadays"
- **Recapping conclusion**: if the conclusion only restates what was already said, cut the restatement and replace with an implication, a decision, or a next step the reader can take
- **Mechanical transitions**: "Now that we've covered X, let's move on to Y" → cut entirely or merge into the next paragraph's opening sentence
- **Bullets without a scanning job**: use a list for distinct steps, options, or
  repeated fields; use prose when the items form one continuous argument
- **Inline-header vertical lists**: `**Bold header:** description` bullets read like a slide deck. Rewrite as prose or use a plain list without the bold-colon prefix.
- **Title Case headings**: "How To Configure The Cache" → sentence case, "How to configure the cache".
- **Boldface overuse**: bolding every key term or writing "key takeaways" in bold is a strong AI tell. Reserve bold for the rare word that genuinely needs emphasis.
- **Decorative emoji**: emoji in front of headings or bullets. Remove unless the post's voice genuinely uses them.
- **Uniform paragraph length**: vary sentence and paragraph length. A short punch sentence after a dense technical block is a deliberate choice - use it.
- **Hedging that avoids commitment**: "may", "might", "could potentially", "it depends on many factors" where a concrete recommendation is possible → make the call

### Tonal tells

Fix every instance of:

- **No opinion**: if the text presents trade-offs without recommending, add the recommendation ("I use X here because Y")
- **Generic examples**: replace foo/bar/MyClass/arbitrary round numbers with realistic, specific examples drawn from the post's context
- **Missing lived experience**: preserve concrete costs, failure modes, and
  decision moments supplied by the author; otherwise leave a concise placeholder
  instead of inventing one
- **False modesty**: "This is just my experience", "Your mileage may vary" as boilerplate disclaimers - cut unless genuinely necessary

### Functional tells

Remove sentences whose only job is:

- Announcing the topic instead of saying something about it
- Praising a technology before explaining its behavior
- Creating suspense without a concrete catch
- Summarizing the previous paragraph
- Explaining that the next section will explain something
- Saying a topic is complex, important, evolving, or challenging without evidence
- Framing obvious advice as a discovery

## Authorial fingerprints

Preserve or add signals that a real person wrote the post:

- Specific stakes: what broke, what was annoying, what cost time, what changed after the decision
- Decision scars: the failed option, trade-off accepted, misleading assumption, or thing the author would not repeat
- Temporal anchors: when this happened, what changed after a release, migration, deploy, review, or debugging session
- Concrete constraints: team size, repo shape, dependency version, CI time, memory limit, deployment target, editor, OS, or exact error message
- Opinion with reason: "I use X here because Y" or "I would not use X in this case because Y"
- One uncomfortable detail when useful: the workaround, wrong assumption, misleading error, restart, flaky check, or manual step

Do not manufacture facts or lived experience. If the draft lacks concrete
context, preserve the gap or add a concise placeholder such as
`[add exact error message here]` when editing a draft.

## Anti-symmetry rules

Avoid artificial balance.

- Do not give equal weight to options when the author clearly prefers one.
- Replace "it depends" with the actual condition that changes the decision.
- Cut generic trade-off paragraphs unless they end with a recommendation.
- Avoid "pros and cons" framing for posts that are really about a hard-won lesson.
- Prefer "I choose X when Y is true" over neutral comparison.
- If one option is mostly bad, say so and explain the failure mode.

## Structural diagnosis

Before rewriting, identify the post's real shape and make the structure match it:

- Incident: something broke, here is the fix.
- Decision: I chose X over Y, here is why.
- Tutorial: do these steps, avoid these traps.
- Opinion: I believe X because of Y.
- Postmortem: this failed, here is what changed.
- Research note: here is what I observed and what it may mean.
- Release note: this changed, here is who should care.

Avoid defaulting to: introduction, what is X, why it matters, conclusion. Use that shape only when it genuinely serves the post.

## Technical voice

For technical posts:

- Prefer exact command outputs, config snippets, file paths, package names, versions, and failure messages.
- Keep technical nouns precise. Do not replace exact terms with softer synonyms.
- Do not over-explain beginner concepts unless the post is explicitly introductory.
- Do not soften criticism of tools when the behavior is objectively bad.
- When a claim is based on personal experience, state the boundary: project size, stack, environment, workflow, or time period.
- Preserve code blocks, command snippets, links, tables, and frontmatter exactly unless the user asks to change them.
- Never change a technical claim to make prose smoother.

## Rewrite rules

1. **Start with the point.** First sentence of any section: thesis or concrete case, not background.
2. **Cut anything that does not add a fact, opinion, or step.** If a sentence could be deleted without losing meaning, delete it.
3. **Replace hedge with choice.** "It's often better to use X" → "Use X. It avoids Y."
4. **Prefer specific.** Real dates, real numbers, real names, and real error messages outrank placeholders.
5. **Keep paragraphs coherent.** Split unrelated points and merge semantically duplicate paragraphs.
6. **Preserve technical substance.** Do not omit or soften facts, constraints, citations, or legitimate uncertainty to make prose shorter.
7. **Preserve the author's voice.** Make the text sound like this author, not a generic style guide.
8. **Keep useful roughness.** Do not polish away personality, irritation, uncertainty, or specificity.
9. **Prefer earned confidence.** Strong claims need concrete support; weak evidence should produce scoped claims.

## Output format

If the user provides a file path or asks to rewrite in place, edit the file directly with file editing tools. Overwrite the body content while preserving frontmatter exactly as-is.

If the user asks for feedback, return:

1. Prioritized findings with exact locations
2. A concise rewrite strategy
3. A rewritten excerpt only when requested or needed to clarify a difficult fix

Omit empty categories and do not restate the draft.

If the user pastes text in chat and asks for a rewrite, return the rewritten text directly unless they ask for diagnostics.

Same structure (headings, code blocks, links) as the original. If a section is clean and needs no changes, leave it unchanged.
