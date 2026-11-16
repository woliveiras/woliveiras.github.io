# Publishing Monday Brief

The Brief covers changes that affect people building, integrating, and operating AI systems. Its focus is: “AI engineering in practice: reliable agents, local models, and efficient systems — from cloud to device.”

Issues are planned for Mondays, as time and material allow. That convention does not prevent an issue or correction on another day. There is no automated news collection, email delivery, or publishing.

## Create and preview an issue

Copy the template into the Brief's own collection:

```sh
cp templates/brief.mdx src/content/brief/my-issue.mdx
pnpm dev
```

Fill in the frontmatter and open `/brief/<slug>/` on the local server. The `/brief/` archive also lists previews during development. The [November 16 edition](../src/content/brief/004-when-the-queue-keeps-growing.mdx) is an example of the newsletter format.

| Field | Rule |
| --- | --- |
| `title` | Issue title; the layout already generates the H1. |
| `slug` | Explicit, unique identifier in kebab-case. Sets the URL at `/brief/<slug>/`. |
| `description` | Summary that helps readers decide whether to read, without copying the opening. |
| `pubDate` | Actual publication date as a quoted `YYYY-MM-DD` string. |
| `updatedDate` | Optional correction date, on or after publication. |
| `issue` | Optional positive integer, unique across published issues and drafts. Never calculated from its position in the archive. |
| `period.start`, `period.end` | Coverage period as quoted `YYYY-MM-DD` strings. The start must not follow the end; the end must not follow publication. |
| `published` | Keep `false` while preparing the issue; change to `true` when publishing. |
| `topics` | Topics present in the body, with no duplicates. Use the identifiers below. |

You can rename a file without changing its URL: the address comes from `slug`. After publishing, preserve the slug and issue number so links and references keep working. Reserved slugs and duplicate slugs or issue numbers fail the build, including those in drafts.

## Write the issue

Use the previous seven days as the usual coverage window. Distinguish the source's publication date from the date the change happened. Prefer documentation, changelogs, repositories, papers, and technical reports from the people responsible. Select updates for their effect on implementation decisions; popularity alone is not a reason to include one.

Open with the most consequential story. Start with a concrete finding or change, then give it enough room to explain the result and its significance. Follow it with short notes. A paragraph is usually enough for a note that explains what was found or announced, why it matters, and what limits the claim. Attribute benchmarks and distinguish vendor claims, independent results, and editorial interpretation.

End each summary with descriptive links to the full primary sources. Link text such as “Full ToolTurns study” or “ExecuTorch 1.6.0 release notes” tells readers what the link opens. List the same sources under `## References` with the details required by the [reference guidelines](../AGENTS.md#references-and-source-status).

Omit the Lab section from new issues.

| Identifier | Topic |
| --- | --- |
| `agents` | AI engineering and agent architecture |
| `local-ai` | Local AI |
| `security` | AI security and privacy |
| `edge-ai` | Edge AI |
| `mobile-ai` | Mobile AI |
| `reliability` | Reliability, evaluation, and observability |
| `efficiency` | Hybrid architectures, efficiency, and operating cost |

Each `<BriefTopic topic="local-ai">` generates an H2 and a stable anchor such as `#local-ai`. Use H3 for individual updates. Give each update one main topic and use internal links when it touches another. List `topics` in the same order as the corresponding blocks so the issue's navigation follows the reading order.

Voice, vision, and multimodal systems fit within the existing topics. Coding assistants, AI IDEs, coding agents, code generation and review, and comparisons of programming tools are outside the scope. The architecture of agents used in products remains in scope. Exclude generic investment news, company disputes, and predictions without concrete technical consequences.

When an issue uses figures, give images alt text and provide accessible descriptions and data for charts. Use a caption and identified headers for complex HTML tables. Label code fences with the language.

## Publish and correct an issue

1. Replace all placeholders and example URLs. Confirm that every summary links to its full source and that the dates, topics, and references match the issue.
2. Choose an unused number if you want to number the issue. Adding drafts does not change existing numbers.
3. Change `published` to `true` and confirm `pubDate`.
4. Run the checks and inspect the local output:

```sh
pnpm test
pnpm test:brief:build
pnpm exec biome lint src/brief src/components/brief src/layouts/BriefArchive.astro src/layouts/BriefEdition.astro src/pages/brief tests
pnpm build
pnpm preview
```

The build includes Astro's type check and Pagefind index generation. The integration test uses synthetic issues in a temporary directory; they do not enter the real collection or get published.

To correct an issue, preserve `slug`, `issue`, and `pubDate`, add `updatedDate`, and explain any correction that changes the interpretation in the body. Review the sources and run the same checks before using the repository's publishing workflow.

## What becomes public

The Brief collection generates public pages only when `published: true` and `pubDate` has arrived in UTC at build time. Future issues, even with `published: true`, stay out of the archive, issue navigation, RSS, sitemap, social images, `llms.txt`, and search. Draft previews exist only in `pnpm dev`, with `noindex`; `pnpm preview` serves the public build output without drafts.

A date does not schedule publication. This is a static site: a future issue only goes live after another build and deployment through the existing workflow. This implementation adds no cron job and leaves deployment unchanged. Regular posts retain their existing publication rule.

The archive uses five issues per page, following `POSTS_PER_PAGE`. Its first page features the latest issue; later pages use `/brief/pages/2/`, `/brief/pages/3/`, and so on. The homepage continues to list regular posts. Search includes public issues with a “Brief” label and preserves their `/brief/` URLs.

The dedicated feed at `/brief/rss.xml` includes each issue's title, summary, date, topics, and link. Readers can subscribe in their RSS apps; the existing `/rss.xml` stays unchanged. Brief pages use English, the site's existing visual themes, canonical URLs, Open Graph, and `BlogPosting` structured data for individual issues.

Public Brief issues share the site's existing English Pagefind index, so search can find regular posts and Brief issues from any page.
