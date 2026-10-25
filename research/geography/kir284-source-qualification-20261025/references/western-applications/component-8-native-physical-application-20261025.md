# KIR component 8: retained native and physical application

Date: 2026-10-25. Bounded read-only application for the exact 19 held keys in source component 8 / owner 26615. No official-source research, claims, issue/PR, stock, disposition, credit, or release state was changed.

## Exact key binding

The source roster is `research/KIR/held-284-keys.json`, SHA-256 `889ae5dc339ed0f0132aa3ef1cdac5d846adada553fdab78b5fcb18d19806469`. Its pinned source disposition is from `ChengshuLi/WorldAtlas` commit `5c65b213d005607e769af66d39bf03d4554882d6`, path `coordination/engineering/kiribati-repair-delivery-20261016/scope-002/source-component-disposition.json`, Git blob `77a0083bce6d06a18c5b0ba60ce396521490b100`, SHA-256 `3762732e7a11262d7f41088ea5d6ad315b10988099286c52d533073ea2576452`.

The component-8 subset contains 19 rows. For its reproducible subset digest, serialize the manifest-order tuples `[y,x,source_index,source_component,owner]` as compact UTF-8 JSON with no trailing newline: 571 bytes, SHA-256 `79f0a202b4e63853773f8cbeefef95520a501fd43156c4e4b30ae78e8d4f4a09`.

| y | x | Source index | Component | Owner |
|---:|---:|---:|---:|---:|
| 130034 | 257132 | 41033 | 8 | 26615 |
| 130036 | 257129 | 41033 | 8 | 26615 |
| 130036 | 257130 | 41033 | 8 | 26615 |
| 130036 | 257134 | 41033 | 8 | 26615 |
| 130037 | 257133 | 41033 | 8 | 26615 |
| 130037 | 257134 | 41033 | 8 | 26615 |
| 130038 | 257132 | 41033 | 8 | 26615 |
| 130038 | 257133 | 41033 | 8 | 26615 |
| 130038 | 257134 | 41033 | 8 | 26615 |
| 130038 | 257135 | 41033 | 8 | 26615 |
| 130038 | 257136 | 41033 | 8 | 26615 |
| 130038 | 257137 | 41033 | 8 | 26615 |
| 130039 | 257132 | 41033 | 8 | 26615 |
| 130039 | 257133 | 41033 | 8 | 26615 |
| 130039 | 257134 | 41033 | 8 | 26615 |
| 130039 | 257135 | 41033 | 8 | 26615 |
| 130039 | 257136 | 41033 | 8 | 26615 |
| 130040 | 257134 | 41033 | 8 | 26615 |
| 130040 | 257135 | 41033 | 8 | 26615 |

## Retained native evidence and result

The `source-component-native-crosswalk.json` at the same pinned commit is Git blob `23aed23b0a2e92adb94a938953ac70fd8a40c806`, SHA-256 `284c38487a4a6c485d96b965e19aa2e00339bc0dc1ae0440bf3561af750a8e37`. Select the row by both `component: 8` and `owner: 26615`; it binds exactly 19 requested cells and source ID `gb:KIR:ADM1:97431129B36644055464690`. Its source-coordinate digest is `cf251456969a580808ddb29da9e62b8a4255ff2b233b6adffe4676b3ddf51858`, and `current_target_center_cells` is zero. Because this exact row's whole requested roster is the same 19 keys, all 19 have no current-target center membership. The distinct component-8 / owner-26616 row has 43 cells and is outside this held-key subset.

This crosswalk pins the native latitude table to commit `5b32388df0501b013ac9a3ba97864932db493d59`, path `coordination/engineering/native-grid-fidelity-1010-20261005-local15/results-v1/native-row-latitudes.f64le.gz`, blob `de6905e162dc031b1b93248fae91190c39c4ad53`. Compressed SHA-256 is `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`; decoded SHA-256 is `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23` (262,166 little-endian f64 values). The pinned scanner is `src/native-grid.js` at commit `e143ae59177efa2114e9075dac2d99008ed43894`, blob `df00192fbe3648dae8de2edd194f8c3183556ab4`, SHA-256 `fab520ead243d13efb9231fd8b15c567554274d343c3746dd5be06fb25ff20ee`.

## Retained physical evidence and per-key application

The retained `physical-001/whole-target-support.json` is blob `1fe2f786a667b0a8ca17c2650c5a84938afd4f02`, SHA-256 `1caa825840869441e4acc3dc427b2eff145bb252f12c61b2d88ef5690ede8624`. For the matching source ID above, its `mapped_land_support` is the GSHHG-derived support geometry. The record has 5,986 source-ID queries and 5,987 query relations (12 intersecting relations), plus `missing_reconstruction` and `extra_reconstruction` issue geometries.

For each of the 19 keys, the native center was reconstructed using the pinned latitude table and the pinned native longitude center rule `-180 + 360*(x+0.5)/262166`. Membership was tested against the retained GeoJSON polygons with exact rational comparisons of the f64 coordinates and no epsilon. Results: 19/19 centers inside `mapped_land_support`, zero boundary contacts, zero outside; all 19 are outside both the `missing_reconstruction` and `extra_reconstruction` difference geometries. The physical artifact's GSHHG source is source-relative and retains heterogeneous observation dates and physical-authority limits.

| y | x | Current-target center | Mapped GSHHG land support | Missing/extra reconstruction geometry |
|---:|---:|---|---|---|
| 130034 | 257132 | Outside | Inside | Outside both |
| 130036 | 257129 | Outside | Inside | Outside both |
| 130036 | 257130 | Outside | Inside | Outside both |
| 130036 | 257134 | Outside | Inside | Outside both |
| 130037 | 257133 | Outside | Inside | Outside both |
| 130037 | 257134 | Outside | Inside | Outside both |
| 130038 | 257132 | Outside | Inside | Outside both |
| 130038 | 257133 | Outside | Inside | Outside both |
| 130038 | 257134 | Outside | Inside | Outside both |
| 130038 | 257135 | Outside | Inside | Outside both |
| 130038 | 257136 | Outside | Inside | Outside both |
| 130038 | 257137 | Outside | Inside | Outside both |
| 130039 | 257132 | Outside | Inside | Outside both |
| 130039 | 257133 | Outside | Inside | Outside both |
| 130039 | 257134 | Outside | Inside | Outside both |
| 130039 | 257135 | Outside | Inside | Outside both |
| 130039 | 257136 | Outside | Inside | Outside both |
| 130040 | 257134 | Outside | Inside | Outside both |
| 130040 | 257135 | Outside | Inside | Outside both |

## Limits and remaining predicate

The native result is an exact crosswalk aggregate bound to these same 19 keys, not 19 stored row-level witness records. The physical application establishes center membership in a retained GSHHG-derived support geometry only. It does not establish whole-cell coverage, present-day physical truth, legal owner, current jurisdiction, territorial mandate, or a complete western-scope record. The exact held reason remains `no-current-component-intersection-and-no-affirmative-complete-western-scope-record`; no qualification, disposition, acceptance, credit, or hold change follows.
