# Risk-based testing foundations

## Start from consequences

Map each critical journey, invariant, state, and boundary to a failure consequence. Prioritize using consequence, likelihood, detectability, and recovery difficulty. These factors are an engineering heuristic, not a universal numeric formula. Record the evidence behind each rating and keep uncertainty visible.

A test pyramid is also an engineering heuristic. It can suggest cheaper feedback below slower journey checks, but it is not a universal test pyramid or an automatic quota. Select the cheapest public seam that preserves the risk and use an independent oracle capable of rejecting a plausibly wrong result.

Distinguish source classes:

- **Normative standard:** a specification that defines a conformance requirement.
- **Official platform guidance:** vendor documentation about a platform's supported testing model.
- **Official tool guidance:** maintainers' documentation about a testing tool's behavior.
- **Empirical evidence:** observed failures, measurements, experiments, and results from the actual product or representative fixture.
- **Engineering heuristic:** a reversible rule of thumb such as a pyramid shape or risk score.

## Ownership and composition

This skill works independently and can optionally compose with focused capabilities:

- **Baseline TDD** owns implementing one approved behavior through a fail-first check. Product Testing Engineering owns the wider risk model, test seams, fixtures, oracles, levels, and reliability architecture.
- `$ci-typescript` and `$ci-android` own workflow files, job matrix, cache, permissions, and CI execution. Supply stable commands and evidence expectations without owning the pipeline.
- `$product-performance-engineering` owns metrics, profiling, benchmark design, budgets, and causal performance diagnosis.
- `$product-security-privacy-engineering` owns threat modeling, trust boundaries, abuse cases, authorization, and privacy decisions. Convert an approved security scenario into a test only after those decisions exist.
- `$product-ui-ux-design` owns experience and accessibility decisions. Testing verifies their approved observable behavior.
- `$game-dev-2d-testing` owns Phaser and Godot 2D testing. It is not a route for Unity, PixiJS, 3D, or non-game product suites.

Do not let a manual checklist replace automatable evidence. Do not invent results or mutate product code during strategy-only or diagnosis-only work.
