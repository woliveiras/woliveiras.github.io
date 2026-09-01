# Voice profile

Write in the repository's established authorial voice, not as a generic
technical publication. Preserve the point of view and relationship with the
reader while producing natural, grammatically correct English.

Voice comes from the supplied reasoning and details. It is not a layer of
first-person phrases added after a generic article has already been written.

## Core voice

Write beside the reader, not above them. Authority comes from specific
experience, technical work, research, and decisions that can be explained. The
prose is direct and conversational without becoming careless.

- Start from a concrete problem, observation, disagreement, failure, or lived
  moment. Do not spend the opening announcing the topic or praising it.
- Use `I` for supplied observations, attempts, beliefs, mistakes, and choices.
- Address the reader as `you` when giving a step, naming a likely doubt, or
  testing an assumption. Do not manufacture intimacy with constant questions.
- Use `we` only for a group the author can honestly belong to. Name the group
  when the boundary matters.
- Explain the reasoning that changed the decision. A result without the wrong
  assumption, failed attempt, constraint, or trade-off loses the voice.
- Prefer ordinary verbs and concrete nouns. Keep technical terms precise, but
  make the surrounding prose sound like one engineer talking to another.
- Let conviction and uncertainty coexist. State supported conclusions plainly;
  use `I think`, `I do not know`, or define the boundary when evidence is weak.
- Use dry humor or a brief aside only when it arises naturally from the event.
  Humor is usually self-aware or situational, not a prepared joke.
- Preserve direct recommendations and relevant personal constraints when the
  author supplies them. Do not soften a supported position into neutral advice.
- Keep the rhythm human. A paragraph may be brief, uneven, emphatic, or carry a
  self-correction when that shape follows the thought. Do not make every section
  equally polished or comprehensive.

## Start from the author's material

Before drafting authorial prose, identify the sentence the author could defend
in a conversation. It may be a result, a disagreement, a mistake, a practical
constraint, or a recommendation. Build outward from that sentence.

Definitions, industry context, and tool descriptions can follow when the reader
needs them. They should not replace the reason this author is writing now.

Compare these openings:

> A fantastic tool used by the JavaScript community to preserve code quality is
> jscpd. Using that tool, we can check if we have code duplication in our
> projects.

This praises and explains the tool before reaching the article's evidence. The
authorial material is the measured result and the decision it created:

> Our first jscpd report found 636 clones in production code. Reducing that
> number looked like the obvious goal, until we started asking whether every
> duplicate represented the same responsibility.

The second version does not sound personal because it says `our`. It sounds
specific because it begins with the supplied result and exposes the wrong first
reading.

The same rule applies to advice. A generic claim such as "pair programming
improves collaboration" says little about the author. A supplied constraint
such as "frequent role changes break my focus, so I agree on longer intervals"
changes the recommendation and belongs in the argument.

## Build the argument

1. Name the concrete situation or the assumption people usually make.
2. Show why that first reading is incomplete, misleading, or wrong.
3. Ground the correction in an example, result, source, or supplied experience.
4. Explain the practical consequence for the reader.
5. Make a recommendation when the evidence supports one.

Do not force this sequence when the text is a simple reference or tutorial. The
shape must follow the reader's job.

Use `but`, `however`, `so`, and `at the same time` for real turns in the
reasoning. Do not add transitions that merely announce the next section.

Vary sentence length. Longer sentences can carry context or a chain of
reasoning. A short sentence can expose the correction or consequence. Do not
turn every paragraph into the same polished three-sentence unit.

Parenthetical asides are part of the rhythm, but each aside must add context,
qualification, or honest reaction. Delete decorative asides.

## Choose the genre mode

### Technical tutorial

- Open with the failure, repetitive task, confusing behavior, or outcome the
  reader needs to reproduce.
- State prerequisites and versions when they affect the result.
- Move in small executable steps. Explain why each consequential command or
  code change exists.
- Show expected output or an observable checkpoint.
- Include mistakes, limitations, or edge cases that would otherwise waste the
  reader's time.
- Keep code close to its explanation. Never leave a large block to explain
  itself.
- End with the next useful action or remaining boundary, not just a recap of every
  step.

### Conceptual explainer

- Begin with the engineering problem that makes the concept necessary.
- Introduce terminology after the reader has a reason to care about it.
- Use one realistic scenario to make the model concrete.
- Explain trade-offs and state where the idea should or should not be used.
- Use history only when it explains current behavior or a design constraint.

### Career or advice post

- Name who the advice is for and the material constraints that change it.
- Ground recommendations in supplied experience, market evidence, or explicit
  engineering judgment.
- Reject motivational shortcuts. Effort matters, but access, money, time,
  health, family obligations, discrimination, and luck can alter the path.
- Give actions the reader can take without implying that everyone starts from
  the same position.
- Make the recommendation. Do not hide behind a symmetrical pros-and-cons list.

### Personal narrative

- Preserve chronology only when it helps the reader follow cause and effect.
- Use supplied decisions, costs, delays, wrong expectations, and consequences.
- Let practical detail and reflection share the page. Do not convert the story
  into a success formula.
- Connect a personal event to a wider observation only when the evidence
  supports that connection.

### Opinion or social critique

- State the position clearly and identify the event or pattern that produced
  it.
- Critique behavior, incentives, institutions, and power structures with
  evidence. Do not use personal attacks.
- Do not manufacture neutrality when the author has a supported position.
- Keep class, race, gender, sexuality, disability, migration, or inequality in
  the argument when the topic genuinely involves them. Do not paste this lens
  onto unrelated technical explanations.
- End with an implication, choice, or action. Anger can motivate the text, but
  it cannot replace the argument.

## Preserve evidence boundaries

Never invent a personal story, opinion, mistake, metric, employer detail,
identity claim, political position, or emotional reaction.

When a draft lacks the lived detail needed for this voice, keep the prose
factual and add a concise placeholder such as:

`[Author: add what happened when you tried this]`

Do not infer current opinions from a decade-old post. Use old articles as style
evidence, not automatic evidence of current beliefs.

Use primary sources for current technical behavior. Personal experience can
explain a decision, but it does not prove a universal claim.

Do not treat first person as evidence by itself. `I think`, `for me`, and `in my
experience` become generic when they introduce a claim with no supplied event,
decision, or consequence behind it.

## Write natural English

- Keep direct address, concrete examples, conversational pivots, and honest
  qualifications.
- Use natural English word order, articles, prepositions, punctuation, and
  idioms.
- Explain Brazilian terms or local context when an international reader needs
  it. Do not replace a real setting with a fictional US one.
- Preserve culturally specific references when they matter, with one short
  explanation if needed.
- Do not copy characteristic sentences from old posts. Recreate the reasoning
  pattern with the facts of the new text.
- Do not exaggerate non-native phrasing to make the voice seem personal.
- Correct grammar and unclear wording without replacing direct, simple language
  with magazine prose. Fluency should not erase the author's cadence, cultural
  setting, emphasis, or supplied choice of register.

## Avoid the generic assistant voice

Remove or rewrite:

- generic scene-setting about a fast-changing technology landscape;
- praise before evidence (`powerful`, `seamless`, `game-changing`);
- claims that something is important without showing the consequence;
- fake shared experience (`we have all been there`);
- generic personal claims (`I have always been passionate about...`);
- mechanical previews and section recaps;
- forced rhetorical questions, tricolons, symmetry, and inspirational endings;
- a table, list, anecdote, conclusion, or call to action added only because the
  format supposedly needs one;
- excessive bold text, emoji, exclamation marks, and polished slogans;
- tutorials that hide failure modes behind a clean happy path;
- advice that treats structural constraints as a lack of discipline;
- political commentary inserted into a topic that does not support it.

## Anti-generic pass

Run this pass on the complete draft, not only on the opening:

1. Find sentences that would still work in hundreds of articles after replacing
   the product or topic name. Remove them or rebuild the paragraph around a
   supplied fact, decision, example, constraint, or reaction.
2. Remove praise, definitions, topic announcements, section previews, and
   recaps that delay the actual point.
3. Check whether each substantial section contains source-specific material.
   Merge or delete sections that exist only to make the article look complete.
4. Break repeated paragraph shapes, forced groups of three, balanced
   pros-and-cons blocks, and rows of polished short sentences when the content
   does not require that rhythm.
5. Replace abstract importance claims with the visible consequence. Delete the
   claim if the source provides no consequence.
6. Inspect the ending separately. Keep it only when it adds a decision,
   implication, next action, honest uncertainty, or unresolved boundary.
7. Compare the revised text with the source. Restore any fact, opinion,
   uncertainty, emphasis, or useful irregularity that the polishing pass erased.

Do not humanize by blacklist. One em dash, transition, rhetorical question,
short sentence, or first-person phrase is not evidence of generic AI prose.
Look for several empty patterns working together and ask what information each
sentence contributes. Preserve a deliberate habit when it carries the author's
meaning or rhythm.

## Voice test

- Could the opening belong to hundreds of technical blogs? If yes, replace it
  with the actual problem, disagreement, or supplied moment.
- Could the same article have been generated from its title alone? If yes, the
  draft has not used enough author-supplied material.
- Is the author present through a real observation or decision, or has the text
  become an anonymous manual?
- Does `you` help the reader act or think, or is it filler?
- Does every `we` have an honest boundary?
- Does the argument show why the obvious answer was insufficient?
- Are recommendations explicit and proportional to the evidence?
- Are examples concrete enough to reproduce or evaluate?
- Are social constraints present when relevant and absent when unrelated?
- Does the ending add a consequence, decision, or next action?

## Loss test

Remove each sentence in turn. Keep it only if its removal loses a fact,
experience, argument, decision, example, constraint, necessary transition,
authorial reaction, or safe-execution detail.

Then remove each personal sentence in turn. Keep it only if it was supplied and
changes credibility, interpretation, stakes, or the reader's decision.
Personality alone is not evidence.
