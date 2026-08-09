# Research Package: How to Build a Reliable Coding-Agent Harness

Audit date: 2026-08-04

Publishable article: `src/content/blog/how-to-build-a-reliable-coding-agent-harness.mdx`

This file is an editorial and evidence audit. It is not part of the publishable Astro content collection.

## 1. Recommended metadata

- Final title: How to Build a Reliable Coding-Agent Harness
- Social description: A reliable harness must optimize the repository for agent navigation and move verification from natural-language instructions into executable, independent, and measurable mechanisms.
- Suggested slug: `how-to-build-a-reliable-coding-agent-harness`
- Suggested tags: `ai-engineering`, `ai-agents`, `software-engineering`, `testing`, `automation`, `architecture`
- Estimated reading time: 26 minutes at 220 words per minute
- Publication date: 2026-08-04
- Publication state: `published: true`

## 2. Article outline

- The model is not the system
- Requirement one: give the agent a map, not merely more context
  - Cleaner code changed the journey, not the destination
  - Identifier names are part of the navigation interface
  - Semantic retrieval and structural navigation answer different questions
- Requirement two: instructions are not controls
- Requirement three: separate implementation from its oracle
  - Test-writing frequency is not a correctness metric
  - Tests written after implementation can inherit its mistake
  - The changed code may not be exercised
  - A green suite may still accept semantic mistakes
- Requirement four: challenge the suite, not only the patch
- Requirement five: evaluate trajectories, not only patches
- Requirement six: make the trajectory observable
- Requirement seven: measure efficiency and variance
- A reference architecture derived from the evidence
- Evaluate the harness like a software system
- A concise matrix of harness responsibilities
- What these studies do not prove
- Conclusion: from prompts to proof
- References

## 3. Source and version inventory

| arXiv ID | Verified version on 2026-08-04 | Current title | Status used in article |
|---|---|---|---|
| 2605.20049 | v1, submitted 2026-05-19 | Does Code Cleanliness Affect Coding Agents? A Controlled Minimal-Pair Study | arXiv preprint |
| 2602.20048 | v1, submitted 2026-02-23 | CodeCompass: Navigating the Navigation Paradox in Agentic Code Intelligence | arXiv preprint |
| 2602.07900 | v2, revised 2026-04-09 | Rethinking the Value of Agent-Generated Tests for LLM-Based Software Engineering Agents | arXiv preprint |
| 2607.05139 | v1, submitted 2026-07-06 | On the risk of coding before testing: An empirical study on LLM-based test generation workflow | arXiv preprint |
| 2604.01518 | v1, submitted 2026-04-02 | Are Benchmark Tests Strong Enough? Mutation-Guided Diagnosis and Augmentation of Regression Suites | arXiv preprint |
| 2607.18057 | v1, submitted 2026-07-20 | Test Coverage Analysis of Agentic Pull Requests | To appear at ICSME 2026; arXiv preprint |
| 2603.24755 | v2, revised 2026-05-07 | SlopCodeBench: Benchmarking How Coding Agents Degrade Over Long-Horizon Iterative Tasks | arXiv preprint |
| 2604.22750 | v2, revised 2026-04-29 | How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks | arXiv preprint |
| 2510.03178 | v1, submitted 2025-10-03 | When Names Disappear: Revealing What LLMs Actually Understand About Code | arXiv preprint |

The five supplied PDFs match the latest arXiv versions available at verification time. Four additional mandatory sources were downloaded from their latest official arXiv PDF links. The contextual video and two supplied secondary essays were inspected for framing only and do not appear in the published article or its references.

## 4. SOURCE AUDIT - DO NOT PUBLISH

Percentages labeled `pp` are absolute percentage-point differences. Other deltas are relative unless the source defines them otherwise.

| Published claim | Source | Exact section/table/figure | Evidence type | Caveat |
|---|---|---|---|---|
| Six minimal pairs, three primarily Java and three primarily Python; 33 tasks; 10 runs per side; 660 Claude Sonnet 4.6 trials; hidden public-surface tests | Trivedi and Schmitt, arXiv:2605.20049v1 | Sections 2.1, 2.2, and 3; Table 1 | direct measurement | Author-curated benchmark; one model and one harness |
| Cleaner 91.3% versus messier 92.1%, or -0.9 pp | Trivedi and Schmitt, arXiv:2605.20049v1 | Table 2; Section 4.1 | direct measurement | Pass rate is hidden-test pass rate, not proof of general correctness |
| Cleaner-side deltas: input -7.1%, output -8.5%, reasoning characters -11.1%, messages -7.0%, messages to first edit -3.6%, characters to first edit -4.6%, files read +3.2%, revisits -33.8%, lines edited -3.2% | Trivedi and Schmitt, arXiv:2605.20049v1 | Table 2; Section 4.1 | direct measurement | Micro-averaged after a median-threshold filter that dropped 9.7% of trials |
| Cleaner structure plausibly reduced uncertainty and repeated checking | Trivedi and Schmitt, arXiv:2605.20049v1 | Section 4.1 | engineering inference | Revisitation is a behavioral proxy; internal uncertainty was not measured |
| Multi-module: n=14, pass -2.6 pp, input -10.7%, files -0.6%, revisits -50.8%, lines +2.2% | Trivedi and Schmitt, arXiv:2605.20049v1 | Table 3; Section 4.2 | direct measurement | Track-specific, micro-averaged result |
| Cognitive-hotspot: n=13, pass +0.1 pp, input +1.8%, files +11.2%, revisits -20.2%, lines -9.3%; calibration n=6 | Trivedi and Schmitt, arXiv:2605.20049v1 | Table 3; Section 4.2 | direct measurement | Does not imply that helper extraction is generally harmful |
| BCEL case: input -35%, files -25%, lines -31%, turns -32% | Trivedi and Schmitt, arXiv:2605.20049v1 | Section 4.4, Case 1 | direct measurement | One task-level case study; authors attribute navigability to named grep targets |
| Genie case: input +8%; other deltas within a few percentage points of zero | Trivedi and Schmitt, arXiv:2605.20049v1 | Section 4.4, Case 2 | direct measurement | One task-level case study |
| GPT-4o ClassEval class summarization fell from 87.3% to 58.7% under identifier obfuscation | Le et al., arXiv:2510.03178v1 | Table 2; Section 4.2 | direct measurement | Rubric score from GPT-4o judge; not a direct repository-navigation experiment |
| Naming acts as both maintainability mechanism and retrieval interface | Le et al., arXiv:2510.03178v1; Trivedi and Schmitt v1 | Le et al. Section 4.2; cleanliness Section 4.4 | engineering inference | The studies measured summarization and trajectory footprint, not production retrieval recall |
| CodeCompass repository approximately 3,500 lines and 40 source files; 30 tasks; 270 planned and 258 completed; A=89, B=81, C=88; Claude Sonnet 4.5 | Paipuru, arXiv:2602.20048v1 | Sections 4.1, 4.3, and 5 | direct measurement | One Python web application; 12 trials missing due to API-credit exhaustion |
| Task taxonomy: ten G1 semantic, ten G2 structural, ten G3 hidden | Paipuru, arXiv:2602.20048v1 | Section 4.1 | direct measurement | Gold required-file sets were manually defined |
| Graph edge types were IMPORTS, INHERITS, and INSTANTIATES | Paipuru, arXiv:2602.20048v1 | Section 4.2 | direct measurement | Calls, DI, routes, events, schemas, ownership, and APIs were not evaluated |
| ACS is accessed required files divided by all required files and is not correctness | Paipuru, arXiv:2602.20048v1 | Section 4.4 | direct measurement | Access can be read or edit; a correct implementation was not measured |
| G1 ACS 90.0/100.0/88.9; G2 79.7/85.1/76.4; G3 76.2/78.2/99.4 for Vanilla/BM25/Graph | Paipuru, arXiv:2602.20048v1 | Section 5.1; Figure 2 | direct measurement | Group sample sizes vary because trials were incomplete |
| Overall ACS 82.0/87.1/88.3; complete coverage 54%/62%/66%; mean FCTC 1.67/1.36/1.93 | Paipuru, arXiv:2602.20048v1 | Sections 5.1 and 5.2 | direct measurement | FCTC lower is better; Graph reached complete coverage more often but started slower |
| Graph tool used in 37/88 (42.0%) and ignored in 51/88 (58.0%); ACS 99.5% used versus 80.2% ignored | Paipuru, arXiv:2602.20048v1 | Section 5.3; Figure 4 | direct measurement | Use/skip groups are observational, not randomly assigned |
| G1 adoption 6/27 (22.2%), G2 0/30, G3 31/31 after revised prompt | Paipuru, arXiv:2602.20048v1 | Section 5.3; Figure 3 | direct measurement | G3 figure reflects the improved prompt; adoption is prompt-sensitive |
| End-position checklist changed initial G3 adoption 30/35 (85.7%) to 31/31 (100%) and ACS 96.6% to 99.4% | Paipuru, arXiv:2602.20048v1 | Section 5.3 | direct measurement | Not a randomized head-to-head trial; prompt revision followed observation of the gap |
| Critical controls should have executable representations | Paipuru, arXiv:2602.20048v1 | Sections 5.3, 6.3, and 6.5 | engineering inference | Complete control architecture was not evaluated |
| Six models, all 500 SWE-bench Verified tasks per model, mini-SWE-agent | Chen et al., arXiv:2602.07900v2 | Sections 2.1, 2.2, and 2.4 | direct measurement | One lightweight agent scaffold and Python benchmark |
| Claude test writing 83.0%, resolved 74.4%; GPT-5.2 test writing 0.6%, resolved 71.8%; Kimi 97.4%; MiniMax 98.6% | Chen et al., arXiv:2602.07900v2 | Table 1; model selection in Section 2.2 | direct measurement | Test writing means creating test-like files detected from trajectories |
| Within-model resolved and unresolved test-writing frequencies were generally similar | Chen et al., arXiv:2602.07900v2 | Table 1; RQ1.1 result | author interpretation | Descriptive comparison; paper explicitly avoids causal interpretation |
| Resolved Claude tasks with tests averaged 25.00 value-revealing prints and 5.16 assertions; prints exceeded assertions across analyzed models | Chen et al., arXiv:2602.07900v2 | Table 4; Figure 2; RQ2.1 | direct measurement | AST/rule-based extraction; not all prints or assertions have equal strength |
| GPT-5.2 encouragement: resolved 71.8% unchanged, input +9.0%, output +19.8%; Kimi discouragement: input -49.0%, calls -35.4%, resolved -2.6 pp | Chen et al., arXiv:2602.07900v2 | Table 8; Sections 5.1 and 5.2 | direct measurement | Prompt interventions do not establish that tests never help |
| Independent specification-only tests detected about 25% of selected faulty implementations versus about 14% after faulty code | Konstantinou et al., arXiv:2607.05139v1 | Abstract; Introduction; Figure 4 | direct measurement | Controlled Python benchmarks with filtered, selected faulty implementations |
| Exposing implementation reduced fault detection for all five models; prompt-only averaged +13.2% over prompt+code | Konstantinou et al., arXiv:2607.05139v1 | Figure 2; Table II; Finding 1 | direct measurement | Percent differences are paper-reported relative comparisons, not pp |
| Test-driven workflow improvement ranged from 7.9% to 17.7%, average 11.7%, across five models | Konstantinou et al., arXiv:2607.05139v1 | Figure 4; Table IV; Finding 3 | direct measurement | Test-driven generation used fresh interaction and no implementation context |
| Summarization, CoT, and CoVe did not eliminate the fault-detection gap | Konstantinou et al., arXiv:2607.05139v1 | Figure 3; Table III; Finding 2 | direct measurement | Exact gaps vary by model and method |
| Configurations reached approximately 95-99% line coverage without corresponding fault detection; counts and coverage did not explain gap | Konstantinou et al., arXiv:2607.05139v1 | Tables V and VI; Finding 4 | author interpretation | Statement coverage, not branch coverage; oracle correctness not directly evaluated |
| Same-context implementation and tests can become mutually consistent | Konstantinou et al., arXiv:2607.05139v1 | Introduction; Findings 1-3 | author interpretation | Mechanism is inferred from aligned failures; no claim of intentional manipulation |
| 4,882 PRs: 532 Java and 4,350 Python, five agents | Dipongkor et al., arXiv:2607.18057v1 | Abstract; Section II | direct measurement | AIDev v3 dataset; language and project mix differ |
| Of 4,387 code-under-test PRs, 50.4% (2,211) had no test changes and 49.6% (2,176) did | Dipongkor et al., arXiv:2607.18057v1 | Section IV-A; Figure 1 | direct measurement | Presence of a test change does not measure its adequacy |
| Coverage subset: 213 Java and 1,664 Python PRs from 10 and 34 instrumentable repositories | Dipongkor et al., arXiv:2607.18057v1 | Section III-A | direct measurement | Merged and buildable subset may introduce sampling bias |
| Existing tests covered 61.5% of Java and 27.0% of Python changed executable lines; 64.8% of Python PRs had zero diff coverage | Dipongkor et al., arXiv:2607.18057v1 | RQ2a; Figure 2 | direct measurement | Coverage indicates execution, not oracle quality |
| Agent tests improved coverage in 35.9% (23/64) Java and 22.5% (136/605) Python Code + Tests PRs | Dipongkor et al., arXiv:2607.18057v1 | RQ2b; Table I | direct measurement | A test can add valuable assertions without raising line coverage; gain absence is not fully diagnosed |
| Try/catch miss rate 86.0% Java and 81.0% Python | Dipongkor et al., arXiv:2607.18057v1 | Table II; RQ2b | direct measurement | Syntactic-category coverage over added executable lines |
| STING evaluated 500 SWE-bench Verified instances | Li et al., arXiv:2604.01518v1 | Section 4, Evaluation | direct measurement | Python benchmark across 12 repositories |
| 385/500 (77.0%) admitted at least one surviving semantic variant | Li et al., arXiv:2604.01518v1 | Table 3; RQ1 | direct measurement | Does not mean 77% of accepted patches were wrong; surviving variants differ in realism and severity |
| STING generated 1,316 candidates and retained 1,014 tests across 211 instances | Li et al., arXiv:2604.01518v1 | RQ2 results | direct measurement | 1,014 retained after robustness filtering; 211 is affected-instance count with retained tests |
| Test validation required pass on reference, failure on a survivor, and robustness under behavior-preserving transformations | Li et al., arXiv:2604.01518v1 | Section 3.4 | direct measurement | Reference patch may not be the only correct implementation |
| Top-ten agent resolved rates fell 4.2-9.0 pp; ordering changed | Li et al., arXiv:2604.01518v1 | Table 7; RQ3 | direct measurement | Re-evaluation is specific to public patches and strengthened benchmark suites |
| Mutation and semantic-variant testing diagnose weak suites but do not prove correctness | Li et al., arXiv:2604.01518v1 | RQ1; Threats to Validity | engineering inference | Residual equivalent variants and oracle overfitting can remain |
| SlopCodeBench v2: 36 problems, 196 checkpoints, 15 agents; prior workspace carried forward | Orlanski et al., arXiv:2603.24755v2 | Sections 2, 2.2, and 3 | direct measurement | Python evaluation despite language-agnostic task design |
| No agent solved a full problem; best strict checkpoint pass rate 14.8% | Orlanski et al., arXiv:2603.24755v2 | Table 1; Section 3.1 | direct measurement | 14.8% uses fixed 196-checkpoint denominator; model is GPT-5.5 in v2 |
| Erosion rose in 77% and verbosity in 75.5% of trajectories | Orlanski et al., arXiv:2603.24755v2 | RQ2; Section 3.2; Figure 3 | direct measurement | Two proxy dimensions, not a full maintainability model |
| Against 473 repositories, agent code was 2.0x more eroded and 2.3x more verbose | Orlanski et al., arXiv:2603.24755v2 | RQ3; Section 3.3; Figure 4 | direct measurement | Cross-sectional agent checkpoints compared with repository panel and histories |
| Quality prompts reduced initial erosion up to 62.3% and verbosity up to 34.8%, but velocity stayed 1.3 pp/checkpoint; cost +12.1%; strict correctness -2.3 pp | Orlanski et al., arXiv:2603.24755v2 | RQ4; Section 3.4; Table 3 | direct measurement | Prompt effects vary by model and strategy; aggregate cost/correctness comparison |
| Per-task cleanliness effects may compound with long-horizon erosion | Trivedi and Schmitt v1; Orlanski et al. v2 | Cleanliness Section 6; SlopCodeBench Sections 3.2-3.4 | unresolved or version-sensitive | No study tested both effects together; article labels this an open question |
| Token study: eight models, SWE-bench Verified, OpenHands, four independent runs per task | Bai et al., arXiv:2604.22750v2 | Section 2 | direct measurement | One agent framework; eight models are a slice of the landscape |
| Abstract says about 1,000x; body reports 3,500x versus single-round reasoning and 1,200x versus multi-round coding chat | Bai et al., arXiv:2604.22750v2 | Abstract; Section 3; Figure 1 | direct measurement | Different reference task sets; article reports both summary and precise body comparisons |
| Same-task runs differed by up to 30x; typical per-model average max/min was about 2x | Bai et al., arXiv:2604.22750v2 | Abstract; Introduction; Section 3; Figure 2b | direct measurement | 30x is an extreme; approximately 2x is the average max/min pattern |
| Accuracy peaked at intermediate cost and saturated at higher cost | Bai et al., arXiv:2604.22750v2 | Section 3; Figure 3b | direct measurement | Mixed-effects association; more expensive tasks may also be harder |
| Self-prediction correlations peaked at Pearson r=0.39 and models systematically underestimated usage | Bai et al., arXiv:2604.22750v2 | Section 6; Figures 10 and 11 | direct measurement | Three prediction runs per model; one worked example in prompt |
| Cleanliness repetitions: typical input max/min about 2.5x; 72% groups above 2x; task deltas -47% to +44%; cleaner lower 16/27 and higher 11/27 | Trivedi and Schmitt, arXiv:2605.20049v1 | Section 4.3; Figure 2 | direct measurement | 27 non-calibration tasks; outlier filtering applies to aggregate analysis |
| Multiple runs, paired task comparisons, stratification, and calibration are required to evaluate harness changes | Bai et al. v2; Trivedi and Schmitt v1 | Token Sections 2-3; Cleanliness Sections 3-4.3 | engineering inference | Recommended evaluation design was not tested as a complete harness protocol |
| Reference architecture and risk taxonomy | All mandatory studies | Synthesis across navigation, adoption, oracle, coverage, mutation, evolution, and variance findings | engineering inference | No single study evaluated the complete architecture or routine/significant/critical taxonomy |

## 5. Claim-risk review - DO NOT PUBLISH

- [x] Causal-sounding claims were narrowed. Cleaner code is described as changing measured footprint; reduced uncertainty is labeled a defensible interpretation.
- [x] Single-model claims are identified. Cleanliness used Claude Sonnet 4.6 in Claude Code; CodeCompass used Claude Sonnet 4.5.
- [x] Single-repository claims are identified. CodeCompass used one approximately 3,500-line FastAPI application.
- [x] Preprint status is explicit in prose where the source first appears and in every reference entry. The coverage paper is described as accepted/to appear at ICSME 2026, matching arXiv metadata.
- [x] Proxy-dependent claims are bounded. ACS is navigation rather than correctness; SonarQube and cognitive complexity are cleanliness proxies; coverage measures exercise rather than oracle correctness; verbosity and erosion are partial maintainability dimensions.
- [x] Version-sensitive claims were checked against current arXiv metadata on 2026-08-04. Uploaded PDFs matched the latest versions. SlopCodeBench and agent-generated-tests use v2.
- [x] Engineering synthesis is labeled. Controls, risk classification, the reference architecture, and the ablation program were not directly evaluated as a complete system.
- [x] Percentage points and relative percentages were distinguished in the article and audit.
- [x] Denominators were preserved for tool adoption, PR coverage subsets, Code + Tests gains, mutation instances, and checkpoint results.
- [x] The CodeCompass internal inconsistency was not silently resolved: Section 5.3 and the conclusion report 42.0% used/58.0% skipped, while Section 6.3 contains stale 38%/61% language. The article uses the tabulated 37/88 and 51/88 values and discloses the inconsistency in its limitations.
- [x] The token paper's abstract-level 1,000x summary and body-level 3,500x/1,200x comparisons are both reported to avoid conflation.
- [x] No excluded person, video, secondary article, controversy, or private harness implementation appears in the publishable MDX.
- [x] No major empirical number remains unresolved after PDF and current-version verification.

## 6. Editorial boundary check

The article links internally only to the prior code-review and comprehension-debt articles. It does not reuse their central arguments; those links appear in the conclusion to position this article's system-level question. The article contains no reference to the contextual sources that motivated the topic.
