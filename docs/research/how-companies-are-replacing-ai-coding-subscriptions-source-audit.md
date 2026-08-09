# Source audit: internal coding-agent platforms

Audit date: 2026-08-09

Publishable article: `src/content/blog/how-companies-are-replacing-ai-coding-subscriptions-with-internal-developer-platforms.mdx`

This file records the evidence boundary for the article. It is intentionally outside the publishable blog collection.

## Evidence labels

- **Primary company architecture:** technical material published by the implementing company.
- **Implementing-team paper:** research or experience report written by the engineers who built the system.
- **Vendor-reported customer deployment:** a supplier's description of a customer's deployment; useful but not independent confirmation.
- **Reported substitution:** reputable reporting based on sources rather than a public company architecture or procurement record.
- **Public implementation evidence:** source code or product documentation that establishes capabilities but not internal adoption.
- **Analysis:** architectural synthesis derived from multiple cases and labeled as such in the article.

## Claim-to-source matrix

| Case | Source checked | Supported claims | Important limits |
|---|---|---|---|
| Cloudflare | https://blog.cloudflare.com/internal-ai-engineering-stack/ | OpenCode discovery/auth flow; Access SSO; proxy Worker; AI Gateway; Workers AI; provider routing; config as code; MCP portal; dated adoption and traffic metrics; workload-specific cost estimate | Company-reported metrics; categories have different denominators; frontier inference remains dominant; planned background-agent layer is not treated as fully deployed |
| Samsung | https://news.samsung.com/global/samsung-electronics-hosts-samsung-developer-conference-korea-2024-unveils-its-improved-gen-ai-model | Gauss2 ownership; `code.i` internal use; November 2024 adoption and growth statements; use in DX business units and overseas institutes | No public serving topology; no named subscription cancellation; no public fallback policy |
| Samsung | https://news.samsung.com/global/samsung-ai-forum-2023-day-2-discussing-technological-trends-and-the-future-of-generative-ai | Samsung Research developed Gauss; Gauss Code powers `code.i`; code explanation and test generation | Product-level description, not a production architecture |
| Meta | https://arxiv.org/html/2305.12050 | InCoder fine-tuning; internal GPU inference tier; Rust LSP; IDE clients; caching/debouncing; 2023 deployment metrics | Primarily inline completion, not an autonomous agent; snapshot is historical; measurements come from implementing team |
| Ant Group | https://arxiv.org/html/2310.06266v2 | CodeFuse data, training, fine-tuning, evaluation, IDE integration, and several-month internal-feedback evaluation | No developer count; no subscription claim; no current internal-usage confirmation |
| CodeFuse current project | https://github.com/codefuse-ai | Continued open-source activity and component inventory in 2026 | Open-source activity does not prove continued internal deployment of CodeFuse-13B |
| Alibaba | https://www.investing.com/news/stock-market-news/alibaba-to-ban-claude-code-in-workplace-over-alleged-backdoor-risks-source-says-4775035 | Reuters report that employees were prohibited from using Claude Code and directed to Qoder; security/legal context; lack of company comment | One unnamed source; original Reuters page was not retrievable by the browsing tool, so the full Reuters-syndicated copy was checked; internal model routing and hosting remain unknown |
| Qoder | https://www.alibabacloud.com/help/en/model-studio/qoder-agent | Alibaba Cloud characterizes Qoder as an agentic coding platform with multiple clients and Model Studio connectivity | Public product documentation does not establish Alibaba's employee configuration |
| Qoder models | https://docs.qoder.com/en/cli/model and https://qoder.com/blog/qwen-coder-qoder | Public support for multiple model sources and a customized Qwen-Coder-Qoder model | Does not prove all internal Qoder traffic uses Qwen or privately hosted inference |
| Walmart | https://github.com/mpfaffenberger/code_puppy | Model-neutral agent; external and local endpoints; tools; MCP; `AGENTS.md`; direct-provider data flow | Public repository capabilities do not establish Walmart's hosting or internal routing policy |
| Walmart | https://www.businessinsider.jp/article/2606walmart-code-puppy-ai-anthropic-claude-code-openai-codex/ | Reported internal spread; provider-independence and cost motivations; model switching/rotation | Japanese edition of Business Insider reporting; no audited active-user count; no proof of subscription cancellation or self-hosted inference |
| Walmart | Suresh Kumar and Johnathan Williams LinkedIn posts linked inline | Company acknowledgment of broad scope; employee-reported program reach and event attendance | Informal social-media evidence; program reach is not monthly active usage |
| Zup | https://arxiv.org/html/2604.09805 | Internal CLI/backend/Maestro architecture; authentication/routing; state; audit timeline; tools and guardrails; daily internal use reported | Preprint; no adoption count, model hosting, or named product replacement |
| Mistral Code | https://mistral.ai/news/mistral-code/ | Continue-derived product; four workload models; deployment modes; RBAC/observability; ABANCA, Capgemini, and SNCF customer statements | Vendor source; announcement dated June 2025 and product was then private beta; ABANCA described as deployed, Capgemini as future deployment, SNCF as serverless |
| Infralovers | https://www.infralovers.com/blog/2026-03-03-company-ai-solved-mac-mini-opencode/ | Mac Mini/Ollama/Headscale/Tailscale/OpenCode design; local models; Anthropic fallback; observed concurrency limit | Explicit proof-of-concept; no team size; local/cloud split is a hypothesis, not measured |
| JetBrains | https://blog.jetbrains.com/ai/2025/04/mellum-how-we-trained-a-model-to-excel-in-code-completion/ | Motivation for a specialized completion model; FIM; training data/process/infrastructure; model size | JetBrains product/model case, not a company replacing an external coding-agent subscription |
| JetBrains enterprise deployment | https://www.jetbrains.com/help/ide-services/jetbrains-mellum.html | Shared machine/cluster options; air-gapped deployment; access-token requirement | Current product documentation, not a named customer deployment |
| GitLab | https://docs.gitlab.com/administration/gitlab_duo_self_hosted/ | Fully self-hosted, cloud, and hybrid topology; add-on and billing requirements; customer responsibility | Architecture reference, not evidence that a named company replaced subscriptions |
| GitLab/vLLM | https://docs.gitlab.com/administration/gitlab_duo_self_hosted/vllm_gpt_oss_120b/ | Context/concurrency/KV-cache capacity relationship | Example deployment, not a universal sizing rule |
| vLLM | https://docs.vllm.ai/en/latest/features/automatic_prefix_caching/ | Prefix-cache behavior and its limit to prefill computation | Implementation reference only |
| SGLang | https://docs.sglang.ai/advanced_features/hyperparameter_tuning.html | Batch, KV-cache, concurrency, throughput, and quantization trade-offs | Serving guidance only; no company adoption claim |

## Deliberately excluded or narrowed claims

- No company is said to have canceled all Copilot, Cursor, Claude Code, or Codex subscriptions.
- Cloudflare is not described as replacing proprietary inference; its published request split shows that frontier providers remained dominant in April 2026.
- Samsung is not claimed to host every Gauss2 component on-premises because its production topology is not public.
- Meta CodeCompose is not called an autonomous coding agent.
- Ant Group's current CodeFuse deployment scale is not inferred from GitHub activity.
- Alibaba's internal Qoder traffic is not assumed to run entirely on privately hosted Qwen models.
- Walmart's model hosting is not inferred from Code Puppy's ability to connect to local servers.
- Mistral's Capgemini statement is kept in future tense; it is not treated as a completed rollout.
- Infralovers is described as a proof of concept, not as an enterprise production replacement.
- No universal self-hosting break-even figure is proposed.
- “Open weight,” “self-hosted,” “private,” “on-premises,” and “free” are not used interchangeably.

## Research access notes

- All sources cited in the article were opened and inspected during the audit.
- The direct Reuters URL supplied as a starting point could not be retrieved by the browsing tool. A complete Reuters-syndicated copy on Investing.com was opened and checked instead, and the article links that accessible copy.
- The supplied Business Insider US URL could not be opened directly. The Business Insider Japan edition of the same reporting and the public Code Puppy repository were opened and checked; Walmart social posts were used only for clearly labeled company/employee-reported scope.
- Searches for first-party ABANCA and Capgemini technical architecture did not produce a more direct deployment account. Their status remains vendor-reported.
- Searches for recent Ant Group internal adoption did not produce a current developer count. Continued CodeFuse open-source activity is recorded separately from internal deployment evidence.

