# KIR 284-key native and physical reconciliation

**Source-free reconciliation note, 2026-10-26.** This records the results of two distinct reviewed per-key outputs without copying geometry, coordinates, or source payloads. It changes no package disposition, target, owner, credit, acceptance, or stock state.

## Reviewed per-key results

- Western remainder: reviewed JSON SHA-256 `9494e68a4344c5b2481713cf1b28d7ebae7c122b002b6c7f91cd67347cbcc388` reports **280/280 representative centers inside mapped-land support**, **0 contacts with the reported physical issue geometries**, and **0/280 centers in the current target**.
- Eastern Kanton: reviewed JSON SHA-256 `8ee6c33789f91d1e3f09298d98058e005be6fcdc69c9dae9cce94ef28b1881cc` reports **4/4 representative centers inside mapped-land support**, **0 contacts with the reported physical issue geometries**, and **0/4 centers in the current target**.

The parent handoff supplied these output hashes and reviewed counts, but not the JSON storage paths or commit pins. This note binds the outputs by digest and does not claim to reproduce or independently recalculate their geometry results.

## Original-scope reconciliation

The frozen held roster is `research/geography/kir284-source-qualification-20261025/references/team2-prior/held-284-keys.json`, SHA-256 `889ae5dc339ed0f0132aa3ef1cdac5d846adada553fdab78b5fcb18d19806469`. It contains 284 unique keys, all original owner `26615` and source index `41033`: four component-1 eastern keys plus 280 western keys in components 3, 5, 7, 8, 9, 10, and 11. Component 6 has zero candidate keys.

The immutable disposition is Git blob `77a0083bce6d06a18c5b0ba60ce396521490b100`, SHA-256 `3762732e7a11262d7f41088ea5d6ad315b10988099286c52d533073ea2576452`; the crosswalk is blob `23aed23b0a2e92adb94a938953ac70fd8a40c806`, SHA-256 `284c38487a4a6c485d96b965e19aa2e00339bc0dc1ae0440bf3561af750a8e37`. Their held intervals conserve the exact 284-key residual in 107 original intervals. This remains within the original **2,836-key / 1,000-interval** denominator, preserving the **2,552 previously accepted positives**.

The crosswalk binds the seven western components and component 1 to `gb:KIR:ADM1:97431129B36644055464690`, but reports zero native centers in that current target for every held component. The disposition records no direct source/current-polygon intersection for components 3, 5, 7, 8, 9, 10, or 11; only components 2→current part 1 (2 cells) and 4→current part 2 (94 cells) have the reviewed direct joins underlying the separate 96 western positives. Component 1 remains an eastern negative for the western target intent. All 45 original source components remain competitors.

The retained physical output is `physical-001/whole-target-support.json`, blob `1fe2f786a667b0a8ca17c2650c5a84938afd4f02`, SHA-256 `1caa825840869441e4acc3dc427b2eff145bb252f12c61b2d88ef5690ede8624`; its execution receipt is blob `b60eb5f56f0de4d38916c95932599a683af6ce73`. Native rows use the pinned latitude table (decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`) and native center rule. These physical results are representative-point contacts against mapped-land support, not full-cell coverage, current land truth, legal assignment, source-to-target lineage, or positive qualification. They do not override the adverse zero-current-target result.

## Relation to existing KIR proposal

The existing source-free KIR assessment already carries the western aggregate result—280/280 mapped-land center contacts and 0/280 current-target centers—in component-specific notes. The combined reconciliation is therefore not a new western geometry finding. The prior held-key assessment explicitly said physical-001 had no per-key physical witness for the four Kanton keys; the new Kanton output fills that evidence gap with a reviewed 4-key center application. The combined 0-issue-contact counts are likewise recorded here as reviewed-output results. No source/legal predicate has changed, and no held key is promoted.
