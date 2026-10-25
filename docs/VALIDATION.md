# Evidence, tests and acceptance

Validation is proportional to the changed behavior, but a passing test is not a source qualification, scientific acceptance, production authorization or proof of historical truth. Use the actual source and immutable inputs; independently assess applicability, scope, methodology, adverse results and uncertainty. Retain exact base/head, source/method pins, denominator, outputs and failed attempts. Do not treat hash agreement or repeatability as proof that a scientific join is correct.

## Engineering checks

Use the package/test contracts in `package.json`, `.github/package-inputs.json`, `.github/workflows/worker-merge.yml` and the trusted merge integration. The queue validates current base/head and derives applicable consumers from the actual changed paths. Follow the accepted planner's selected test/build route; do not omit tests or invent a roster. For schema or API changes, validate migrations and both existing/new consumers. For data or geography changes, preserve the complete selected bank and prove exact additions, removals, holds and no unintended reassignment against the accepted baseline.

Trusted CI authenticates the candidate commit and combined tree before checkout/execution, derives sparse inputs from the package and verification declarations, and runs the selected profile in a credential-limited environment. Missing or mismatched required inputs fail closed; they do not justify a broader unrelated checkout, a different profile, or silently skipping a consumer. Unknown, mixed or unsupported changes use the complete applicable regression route. Inspect the actual run's base, head, profile, tests, inputs, build and zero-skip result; a green label alone is insufficient.

Structural checks establish only their named invariants. `scripts/validate-structure.mjs` checks structure; source/evidence validators check declared bytes, identities and ledgers; geography and native-grid checks use the exact pinned operands; emitted-output checks compare actual artifacts. Review the implemented checker and schema for current fields and command syntax. Never run candidate code as evidence unless the trusted contract explicitly authorizes it.

Use `node --test` with the test files selected by the trusted profile. For relevant changes, inspect package declaration behavior in `scripts/integration-profile.mjs`, `scripts/merge-integration.mjs` and `test/ci-checkout.test.mjs`; these are the executable contract. The complete current test set is discovered from `test/*.test.mjs`; do not treat old shard counts, run timings, disk measurements or historical CI incidents as current capacity guarantees.

## Evidence review

Independent review is by a worker distinct from the author and addresses the exact public head. Review the actual source body, path/mode/hash, immutable inputs, output bodies, accounting and source rights; use a focused independent assessment rather than repeating unchanged expensive science. Preserve full original scope, all adverse/outside outcomes and held/pending cases. A source-free proposal can recommend a finite researched-unresolved cohort only when substantial relevant research and reasonable bounded qualification attempts are demonstrated; distinguish inaccessible/unlocated from not yet attempted, timeout from denial, and unresolved from accepted.

Record only checks actually run and their exact results. If a test is blocked by missing sparse inputs, recover only exact required accepted-base blobs through supported materialization and verify their object identity. Do not broaden checkout or hydrate unrelated history to make a test pass. See [WORKFLOW.md](WORKFLOW.md) for review/merge lifecycle.
