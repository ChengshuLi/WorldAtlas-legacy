# BRA447 diagnostic custody note

**Scope:** custody and provenance only. This note does not change the original BRA package, diagnostic result, held status, assignment, or credit.

## Scope retained

The package denominator remains 24,525 cells: 24,078 supported and 447 held. The reviewed ARG/PER overlay contains 424 held keys; its disjoint complement contains 23. This note does not modify either cohort or make any disposition claim.

## What the cited addendum reports

Public PR #2931 (reviewed head `df606e5b2646dae2f7802a1f55def306592efc36`) contains a source-free addendum that reports a full-package diagnostic at:

`coordination/engineering/brazil-native-evaluation-20261021/native-diagnostic-447-001/result-full-24525-v7-trace/native-diagnostic.json`

The addendum attributes 15,170,590 bytes and SHA-256 `f2ba34db92b501e5b20875f286e38e758e4d4e8b2cfa4491b3036fad18c5145c` to that output. It also cites a configuration commit `8d9e74bd43593a71562082df9297bf07469b9b48`, blob `2d3edb35a0bf47584a7c263aa656562569585912`, 383 bytes, SHA-256 `00eb585d14a02680fee3b472b360aba64b926326ce7cf774e4cb0906412b30ab`.

The addendum reports 2,863 key-to-negative-tuple incidences, 90 distinct pinned tuples, and 1,313 split-source records with null ordinal on 132 keys. Those are claims preserved from the reviewed addendum; this custody note does **not** independently validate the cited full diagnostic bytes, its detailed counts, or the cited configuration.

## Custody checks and limits

In my later source-free review/custody work, I did not retrieve bytes matching the `f2ba…5145c` diagnostic pin. The recorded default-branch path lookup returned HTTP 404. A lookup for the cited configuration commit returned HTTP 422, “No commit found.” These results establish a retrieval gap on those routes, not that the diagnostic or configuration never existed.

The public PR and commit author name `ChengshuLi`; that metadata does not identify the internal diagnostic producer. I did not author the diagnostic or configuration and cannot attest to the execution identity from my task history. The separate retained held-cell-veto attribution artifact is not the same output and is not used here as a substitute.

Some original operands have independent retained locators: the full native patch is cited at commit `cb36096d479cda171354f338d68c3658b44a7742`, blob `23ae143e9f29eec95cea56737351fbeb6070109a`, SHA-256 `8675bdb3aaa861c265e95126b48095c4079c285accb328243988b71e30841835`; the 920-target/11-exclusion source-evidence operand is cited at commit `87215aece42739a2d72d045d0b085efb7e47b67a`, blob `49f862780b2f426b6ed9c5b046ca5ad9b3e5925a`, 9,558,563 bytes, SHA-256 `a9682171b4ed7d8a95ba9f894ef55169384691b86c0f949969ff812edcb09438`. Having those operands does not verify the missing diagnostic or config.

## Minimum custody handoff

The original producer or custodian should supply either (a) the immutable run/artifact identifier and exact artifact path that yields the diagnostic and configuration bytes, or (b) a public commit/blob locator for each. The recovered diagnostic must match the cited 15,170,590-byte length and SHA-256 above; the configuration must match its cited blob and SHA-256. A producer identity or execution record should identify which run/config produced the output. If the bytes differ, preserve them separately and reconcile the pins; do not substitute the 551-incidence artifact or rerun a different diagnostic as if it were the cited one.

Until that handoff is available, the addendum remains a record of previously reviewed claims with an explicit custody gap. This note neither rejects nor independently confirms its reported detailed counts, and it makes no qualification, acceptance, ownership, status, or credit change.

## Separate fresh diagnostic run

On 2026-10-27, a new full-package native diagnostic was run from the retained original 24,525-cell patch using a newly prepared source-evidence output and the accepted producer at main commit `d473d1767343795ae8302747b3694332fd5e2433` at run time. This is a separate execution; it does not recover or reproduce the historical v7 output or its cited configuration above.

The new diagnostic reports **24,525 requested = 24,078 supported + 447 held**. It reports all 447 held cells as `territorial_exclusion_cells`. A private exact join against the retained original interval roster matched all 447 keys uniquely by `(owner, y, x)`: 424 are in the previously reviewed overlay and 23 in its complement. All 424 and all 23 remain held; none is newly supported. This run records 10,452 territorial operand incidences across those 447 rows. The earlier 2,863 key-to-negative-tuple count remains a claim about the separately cited historical v7 output; the two totals are run-specific and are not combined or treated as the same measure.

The fresh output emitted zero physical-witness-kind rows. That means the diagnostic contains no such witness rows; it does not establish that physical contact is absent. The run is source/territorial diagnostic evidence only and does not bind the prior ARG/PER comparator decision, establish current owner selection, or qualify, accept, clear, or change any cell, status, ownership, or credit.

Fresh-run pins:

- New native diagnostic: 15,170,613 bytes; SHA-256 `9385309960f9e498af37b22669ff1604a2026b2e52cd7236cbfb06f9f5ed8398`.
- New diagnostic configuration: 406 bytes; SHA-256 `0314a3ede93e533001c5ad2e04554a4b1c8ff0a014ed2c2e700949895f88b5e0`.
- New source-evidence output: 9,558,496 bytes; SHA-256 `d585834fc2d67ed99272488792ae679684d4ebf1f34d479f18f0525a4b664b2d`; local commit `6667ef884fb0168e9836beb92608ee9ecb8715a2`, path `coordination/engineering/bra447-diagnostic-custody-limited-20261027/source-evidence-prep-001/output-rebound/source-evidence.json`, blob `37c4d1d5e5a296c2156d22ff6c642b25a091eefd`.
- The new diagnostic configuration pins this freshly prepared source-evidence output at the local commit/path above. The underlying source-evidence body and its historical provenance were not independently verified; this new run does not repair that custody gap.

The new diagnostic and detailed join remain private and are not included in this PR. The historical v7 artifact/config retrieval gap remains open. The new run is recorded here to distinguish it from those prior claims, not as a replacement or qualification decision.
