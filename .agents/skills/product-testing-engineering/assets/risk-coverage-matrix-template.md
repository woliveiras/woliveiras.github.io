# Risk coverage matrix

Use one row per distinct behavioral claim. Split a risk when its seams or independent oracles differ.

| Risk and consequence | Likelihood / detectability / recovery | Public seam | Test level | Minimal synthetic fixture | Independent oracle | Evidence and environment | Residual risk / limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<risk>` | `<assessment and basis>` | `<observable boundary>` | `<unit, component, integration, contract, or end-to-end>` | `<controlled data and dependencies>` | `<expected result independent of implementation>` | `<fail-first and fresh result>` | `<unverified state or platform>` |

Record explicitly when a risk has no automated coverage, when human evaluation is required, or when execution was not authorized.
