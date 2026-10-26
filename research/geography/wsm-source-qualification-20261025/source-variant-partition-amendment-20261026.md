# WSM full-versus-simplified source partition amendment

Date: 2026-10-26. This source-free amendment records a key-level join of a parent-provided classification against the frozen WSM roster. It supplements the prior source assessment; it does not change the original scope, source data, physical or native results, disposition recommendation, ownership, acceptance, or credit.

## Exact partition and roster binding

The original denominator remains 469 unique keys, 212 original intervals, and owner 7134. The frozen key roster is `original-key-roster.csv`, SHA-256 `dbeeff5c0903042d51c8c4df58444a8dc91b093e50c0d76b0ef54eb715b4c8fc`.

The parent-provided cloud receipt classifies all 469 exact source-center rows against the pinned geoBoundaries WSM ADM1 release: 406 contacts are present in both the full and simplified versions; 63 are present in the simplified version only. The receipt reports no boundary, full-only, outside-both, or other-feature hits, and says all eleven feature identities match. The 63 tuple list was supplied separately in the parent handoff. I joined each tuple `[owner,y,x,source_feature_index]` to the frozen roster: all 63 are unique and present, with matching owner, feature index and original interval ordinal. Its compact-JSON, numerically sorted tuple SHA-256 recomputes to `279ce17037c043e03684cf2aa39cd62406f92af3933a2f1753df6ce06df7fe69`. The exact complement of the frozen roster contains 406 unique keys and has compact-JSON tuple SHA-256 `0e3c17124ac1a3fe960b7eab47ab2b0d80b0a8d470dd1c9496b6e5bb23d489c6`.

| Source feature index | Total roster keys | Both full and simplified | Simplified only |
|---:|---:|---:|---:|
| 65870 | 90 | 75 | 15 |
| 65871 | 6 | 4 | 2 |
| 65872 | 88 | 81 | 7 |
| 65874 | 5 | 4 | 1 |
| 65875 | 20 | 14 | 6 |
| 65876 | 81 | 70 | 11 |
| 65877 | 22 | 20 | 2 |
| 65878 | 42 | 35 | 7 |
| 65879 | 2 | 2 | 0 |
| 65880 | 113 | 101 | 12 |
| **Total** | **469** | **406** | **63** |

The eleven-member family context includes feature 65873, which is companion-only and is not in the 469-key repair roster. The retained family candidate summary is 1,489 candidate cells: 469 in the original repair denominator and 1,020 in the separate physical-interpretation companion. The 1,020 companion remains excluded from this partition and the repair proposal. No key coordinates or raw geometry are included here.

## Provenance, method boundary, and limits

The parent-provided release evidence identifies a 753,337-byte full immutable release body (SHA-256 `cbcb8c6b492f63f3a8bfe820eefeee3882288e31a629c5a5880298ddf256aaf7`) and per-key CSV (SHA-256 `9710e6dd73c101713e151cc562e86abe7ec8e160d78eff7172d97352e7b0f640`). The local Library transfer for `wsm-original469-full-vs-simplified-private-transfer-20261026.zip` was not completed: the Library materialization returned no local path, and fetching its returned signed URL failed with DNS resolution error `curl: (6) Could not resolve host: sdmntprwestus.oaiusercontent.com`. Accordingly, I did not locally inspect the ZIP, manifest, script, or those release-body/CSV bytes. The 63 tuple membership and complement arithmetic are independently reproducible from the supplied tuple list and frozen roster; the full-versus-simplified classification itself is attributed to the parent-provided cloud receipt and has not been independently replayed here.

This is a source-center variant classification only. It does not establish physical support, whole-cell coverage, current or legal administrative ownership, source fitness, rights clearance, positive repair eligibility, or credit. The existing physical/native outputs and adverse whole-target issues remain as previously recorded. Source lineage, vintage, and exact reuse uncertainty remain unresolved. The source-specific terms declaration is not converted into a redistribution clearance. The original contract still preserves all foreign, physical, native, rights, and competing-source holds; nothing in this partition clears them. No geometry was rerun, no source bytes were published, and no claim, accounting, or stock state was changed.

## Read-only physical-witness diagnostic interpretation

The retained physical stage contains ten source-feature target rows, one for each repair feature (65870–65872, 65874–65880); the ten stage target IDs and ten result target IDs match exactly. Companion-only feature 65873 is not a target. The physical execution receipt is complete. In `source-evidence-001/source-evidence.json`, the physical-evidence, stage-input, and reproduction-code pins bind respectively to:
- `physical-003/whole-target-support.json`, SHA-256 `1b81d56580f2687b74a287548a69025493dd7a52cc2d59ece81ddd42e7fcbe59`;
- `physical-input/stages-source-features-003.json`, SHA-256 `97e6785427473611e6faaba5bf36f579c95e82e9367533d0950dbdf0a5baf820`;
- `scripts/qualify-source-cohort.py`, SHA-256 `abc801b9a35d20c9f0dfe3bbc9bb2cb7dc107f1758414970d9cde11380574a18`.

The source-target native diagnostic is `native-diagnostic-001/native-diagnostic.json`, SHA-256 `38bb6999e353066ad8092f3f5ce9b845e6f46f468f2ad37cedda43fdadc5a9bb`. Its `original_pins.source_evidence` binds to the source-evidence file SHA-256 `46a7205ec2b917cbf505be83faa78ddfc6d5a1d716cbc80f7a5ede0e4d39841a`; `original_pins.native_patch` binds to the full 469-key patch SHA-256 `321984ac48a8f55b4089c5593b470924847d4d56adf0125628ef8a1029d2fe97`. The diagnostic reports `requested_cells=469`, `supported_cells=469`, `held_cells=0`, `first_failure=null`, and `physical_witness_kind_rows=[]`.

Here, an empty `physical_witness_kind_rows` means no retained physical-witness geometry hit any of the 469 requested native cell witnesses in this diagnostic. It does **not** mean that physical evidence was absent: the diagnostic input binds ten real result rows and a complete physical receipt. The result still contains seven `extra_reconstruction` issue geometries and three `missing_reconstruction` issue geometries; two feature results contain both issue kinds. Those whole-target adverse geometries remain retained and unresolved. The diagnostic also does not certify all 469 cells as physically true or current. It reports a native diagnostic partition under its source/owner/coverage rules, not physical, legal, rights, current-owner, or credit acceptance.

The schema semantics are consistent with `selected-neighbor-prevention.mjs` (file SHA-256 `aa3e8ea5fc0fde2b9e3ba8b6e75d70c8417dab8e58afec8a75050dc66b94ffdf`): each source target must bind exactly one matching physical result and its receipt; candidate physical witnesses are projected against the exact requested native rows; the diagnostic's bit-coded witness rows list only actual projected contacts. Its regression tests include “witness attribution is absent from authority and empty without contacts” and assert an empty array when no witness contacts the requested cells. No validator was rerun for this interpretation; no toolchain gap blocks this read-only finding.

This 469-cell diagnostic predates and is separate from the parent-provided full/simplified partition above. It does not encode the 406/63 split or release its 63 simplified-only hold. The 1,020-cell companion exclusion, all issue geometries, rights/vintage/source-applicability limitations, and other package holds remain unchanged.
