# BRA447 diagnostic and applicability crosswalk addendum

This source-free addendum supplements `bra-447-source-free-delivery-proposal.md` and `bra-447-source-physical-predicate-assessment.md`. It records the completed full-package diagnostic and its crosswalk to the previously reviewed ARG/PER comparator decision. It contains no cell keys, coordinates, or raw geometry. It does not change disposition, status, ownership, acceptance, or credit.

## Full-package diagnostic partition

The exact original BRA denominator remains **24,525 cells**: **24,078 supported + 447 held**. The full diagnostic held all 447 residual cells as `territorial_exclusion_cells`; each had an interior contact. The diagnostic’s separate `first_failure` summary is not a replacement for those per-cell territorial-exclusion reasons. The 24,078 supported cells remain unchanged.

The held-cell negative-family unions overlap and must not be summed as a partition:

| Negative family | Held-key union |
|---|---:|
| ARG ADM1 | 254 |
| ARG ADM2 | 254 |
| BOL ADM1 | 104 |
| BOL ADM2 | 102 |
| PER ADM1 | 191 |
| PER ADM2 | 191 |
| PRY ADM1 | 6 |
| PRY ADM2 | 5 |
| SUR ADM1 / ADM2; URY ADM1 | 0 |

The diagnostic records 51 distinct negative member IDs and 90 distinct pinned `(source member, feature ordinal, negative ordinal)` tuples. Per-key family contacts overlap; those totals describe the recorded negative evidence, not separate cell cohorts.

## Crosswalk to the prior ARG/PER comparator decision

The reviewed comparator scope contains 424 exact held keys; the disjoint complement contains 23. Each of the 424 scoped keys has exactly one matching prior decision at the exact key and negative source-member / feature-ordinal / negative-ordinal tuple. Across the held diagnostic there are 2,863 key-to-negative-tuple incidences: 424 exact prior-decision matches, 2,277 additional pinned negative incidences on keys inside the 424-key scope, and 162 incidences on the 23-key complement. Therefore, the prior decision does not exhaust the negative evidence on its covered keys.

The four exact source-member / feature-ordinal / negative-ordinal groups bound by the prior decision are:

| Family and feature ordinal | Negative ordinal | Held keys in group | Exact prior-decision matches | Other in-scope incidences | Complement incidences |
|---|---:|---:|---:|---:|---:|
| ARG ADM1, feature 6 | 0 | 6 | 6 | 0 | 0 |
| ARG ADM1, feature 12 | 0 | 250 | 233 | 2 | 15 |
| PER ADM1, feature 14 | 0 | 130 | 126 | 0 | 4 |
| PER ADM1, feature 18 | 3 | 102 | 59 | 40 | 3 |

The four decision groups account for 239 ARG and 185 PER exact matches. The other 86 of the 90 pinned tuples have no exact prior decision. The comparator adoption is source-relative and comparator-only. It is not a territorial or legal boundary finding, ownership proof, or blanket clearance of the 424 keys or their sibling source-member bindings.

The full diagnostic has no applicability-decision pointer or `territorial_contacts` input. Thus the prior comparator decision is not bound into the diagnostic and does not alter its retained veto: all 447 remain held. No conclusion here releases or qualifies a cell.

## Split-source records and physical evidence

A separate 1,313 diagnostic records on 132 held keys have `negative_ordinal=null`, empty contact kinds, and no original-source pin. Of those keys, 126 are in the 424-key comparator scope and six are in its complement. These are split-source records, not pinned negative-family contacts; they cannot be matched to the prior negative-source decision and are not included in the 2,863 pinned negative-tuple incidences.

The retained physical evidence is target-level support context. It does not establish per-key physical status for the held 447: the diagnostic reports no per-key physical-context hits or physical-witness-kind rows. The physical evidence therefore does not resolve the territorial-exclusion veto or change the full-package partition.

## Evidence pins

- Full diagnostic output: `coordination/engineering/brazil-native-evaluation-20261021/native-diagnostic-447-001/result-full-24525-v7-trace/native-diagnostic.json`; 15,170,590 bytes; SHA-256 `f2ba34db92b501e5b20875f286e38e758e4d4e8b2cfa4491b3036fad18c5145c`.
- Full diagnostic configuration: commit `8d9e74bd43593a71562082df9297bf07469b9b48`, blob `2d3edb35a0bf47584a7c263aa656562569585912`; 383 bytes; SHA-256 `00eb585d14a02680fee3b472b360aba64b926326ce7cf774e4cb0906412b30ab`.
- Original full-patch operand: commit `cb36096d479cda171354f338d68c3658b44a7742`, blob `23ae143e9f29eec95cea56737351fbeb6070109a`; SHA-256 `8675bdb3aaa861c265e95126b48095c4079c285accb328243988b71e30841835`.
- Complete 920-target / 11-exclusion source-evidence operand: commit `87215aece42739a2d72d045d0b085efb7e47b67a`, blob `49f862780b2f426b6ed9c5b046ca5ad9b3e5925a`; 9,558,563 bytes; SHA-256 `a9682171b4ed7d8a95ba9f894ef55169384691b86c0f949969ff812edcb09438`.
- Prior comparator scope: `bra-424-territorial-applicability-scope.private.json`, SHA-256 `fbb0327fb55373a30b5bbcf79d79fa10b734b92ec7d9bb2821280abb171197b0`.
- Prior exact application join: `bra-424-original-negative-applicability-exact-join.private.json`, SHA-256 `ed9d940b861d88c948d624b5763aa534c32d23e5917e21702230de9101da28a2`.
- Prior comparator adoption: `bra-424-territorial-applicability-adoption.private.json`, SHA-256 `91413b728c89716aafc029eccb640915ecec651f54c4851489cf4239ff8ee64b`.
- The 2,057-row retained-veto sibling-binding join remains preserved: SHA-256 `ac6c601db7f60986360673edae619c58a1d50d4895b5a772967744b927bf1b3a`.
- Retained whole-target physical support: commit `25c222f99df290f5d10fbea49fa8376f61ce9b78`, blob `0f3b52ccedb9ede9f625b22cbd835d896f5d5c8e`; 23,982,880 bytes; SHA-256 `b3194f057414988318e74917ccd81fac49b52cd7fa8c7b957ea84fb39ea6bff6`.

No geometry or source application was recomputed for this addendum. The claims above are limited to the pinned diagnostic, prior comparator records, and retained physical evidence.
