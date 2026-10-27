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
