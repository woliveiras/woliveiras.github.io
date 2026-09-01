# Writing skill evaluation cases

Use these cases when changing or auditing the writing skill. Evaluate decisions
and preservation of source material, not exact wording or headings.

## Case 1: a topic without authorial material

Request:

> Write a blog post about why Git worktrees matter for coding agents.

Expected behavior:

- Do not produce a polished full article from the topic alone.
- Ask for the event, decision, result, or disagreement that motivated the post.
- Ask for a concrete example or boundary the author encountered.
- A factual outline is acceptable if its missing authorial parts are explicit.
- Do not invent first-person experience or hide the gap with an industry-trend
  introduction.

## Case 2: rough notes with a usable anchor

Source notes:

> We ran jscpd and found 636 clones. At first, reducing the number looked like
> the goal. Some duplicated authorization and navigation code needed to remain
> visible. We finished with 168 classified clones. The lesson is to share code
> only when it has the same responsibility and reason to change.

Expected behavior:

- Draft without asking the author to complete a form; the notes contain a
  result, tension, decision, and recommendation.
- Start from the result or changed assumption, not a definition or praise of
  jscpd.
- Preserve `636`, `168`, the authorization/navigation examples, and the final
  recommendation.
- Do not add tools, measurements, team details, emotions, or project outcomes.
- Do not add a balanced advantages-and-disadvantages section unless the
  argument requires it.

## Case 3: revision of a personal draft

Source:

> In my case, I prefer to not swap too often to maintain focus. Changing roles
> every 20-30 minutes makes me really uncomfortable, so we adapt to what works
> best for both. Please, don't be the guy using Vim while your partner is using
> VS Code with a GUI.

Expected behavior:

- Improve grammar and clarity without removing the focus constraint or turning
  it into generic accessibility advice.
- Preserve the direct recommendation and situational humor when they still fit
  the surrounding text.
- Do not add a diagnosis, universal claim, statistic, or motivational takeaway.
- Do not replace the paragraph with a neutral list of pair-programming best
  practices.

## Case 4: neutral documentation

Request:

> Document the `DATABASE_URL` environment variable, including its expected
> format and the error shown when it is missing.

Expected behavior:

- Skip the author brief.
- Ask only for missing technical behavior that cannot be inspected or inferred
  safely.
- Use direct reference prose without first person, personality, an anecdote, or
  an article-style conclusion.

## Case 5: anti-generic revision

Source:

> In today's rapidly evolving software landscape, code quality has become more
> important than ever. Powerful tools can help teams identify issues, improve
> collaboration, and build maintainable systems. In this article, we will
> explore how duplication analysis can transform your development workflow.

Expected behavior:

- Remove the paragraph when no concrete claim would be lost.
- Do not patch it by swapping `rapidly evolving`, `powerful`, or `transform`
  for milder synonyms.
- Begin with the first source-supported problem, result, decision, or example
  that follows it.
- If no such material exists, return to the author brief instead of inventing a
  hook.

## Evaluation questions

For every case, ask:

1. Did the response use all supplied facts and preserve their boundaries?
2. Did it invent any experience, opinion, fact, result, or source?
3. Could the response have been generated from the title alone?
4. Did editing remove a useful personal constraint, reaction, or decision?
5. Did structure follow the reader's task, or did it follow a blog template?
