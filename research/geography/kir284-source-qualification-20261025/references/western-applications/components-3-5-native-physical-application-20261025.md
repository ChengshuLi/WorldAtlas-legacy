# KIR components 3 and 5: exact 48-key native/physical application

Date: 2026-10-25. Read-only source application for the 48 exact held keys in components 3 and 5. No legal qualification, ledger comparison, ownership/disposition change, credit, issue/PR action, stock action, or release.

## Exact scope and reproducibility

- Input `research/KIR/held-284-keys.json`, SHA-256 `889ae5dc339ed0f0132aa3ef1cdac5d846adada553fdab78b5fcb18d19806469`; filtered by `source_component in {3,5}` and owner 26615: 48 keys (component 3: 22; component 5: 26).
- Canonical roster SHA-256: `76cbd233d4362c76b169bd55151d5a91bb911431fef3cd69acf203e00b491e0a`. Serialization: sorted ascending by `(y,x)`; array of objects with keys `owner,source_component,source_index,x,y`; compact UTF-8 JSON with sorted object keys, no trailing newline. This digest is newly computed for this packet.
- Pinned source-component/native crosswalk: commit `5c65b213d005607e769af66d39bf03d4554882d6`, path `coordination/engineering/kiribati-repair-delivery-20261016/source-review/source-component-native-crosswalk.json`, blob `23aed23b0a2e92adb94a938953ac70fd8a40c806`, file SHA-256 `284c38487a4a6c485d96b965e19aa2e00339bc0dc1ae0440bf3561af750a8e37`.
- Exact interval expansion matches the 22 component-3 and 26 component-5 manifest keys with no missing or extra rows. Both crosswalk records identify source feature `gb:KIR:ADM1:97431129B36644055464690`, owner 26615; source-coordinate digests are `adb38b160fd81a590538e2e0e762e0d88c01882f5097ca19e502b4a5280a4fdb` (component 3) and `e39c4d87f610be4537f4406fbb49821f3c91d95f8fde64e8162489db1abdd856` (component 5). Their retained native current-target-centre counts are 0/22 and 0/26 respectively.
- Native row-latitude table: compressed SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`, decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`, 262,166 little-endian binary64 rows. Longitude center rule: `-180 + (x + 0.5) * 360 / 262166`; latitude is the exact table value at row `y`. Crosswalk-pinned scanner: `src/native-grid.js` SHA-256 `fab520ead243d13efb9231fd8b15c567554274d343c3746dd5be06fb25ff20ee`.
- Retained physical artifact: `coordination/engineering/kiribati-repair-delivery-20261016/physical-001/whole-target-support.json` at the same commit, blob `1fe2f786a667b0a8ca17c2650c5a84938afd4f02`, file SHA-256 `1caa825840869441e4acc3dc427b2eff145bb252f12c61b2d88ef5690ede8624`. Its declared scope is diagnostic GSHHG source-relative support for whole consumed targets with heterogeneous observation dates and physical-authority limits. It identifies `gshhs_f.b` SHA-256 `af9215d58ebc525b2d09654a89959829f09e6edc457f3666759cded37be4ecf6` (original ZIP SHA-256 `28600e8f7a08645aab43079326df6504212ec5ccb2b4bcf3b5f4f12ed60e82bc`). Producer runtime recorded Shapely 2.1.2 / GEOS 3.13.1.

## Result

I independently applied each exact representative point to the retained owner-26615 target’s `mapped_land_support`, `outside_mapped_L1_context`, `missing_reconstruction`, and `extra_reconstruction` geometries using binary64 coordinates, even-odd ring membership, explicit exact on-segment detection, and no epsilon. Per-key results: 48/48 centers contact `mapped_land_support`; 0/48 are boundary or outside it. All 48 are outside `outside_mapped_L1_context`; none contact `missing_reconstruction` or `extra_reconstruction`. The separate crosswalk result says 0/48 centers lie in the current whole target (0/22 component 3, 0/26 component 5).

| Component | y | x | Current-target center | Physical-support center predicate |
|---:|---:|---:|---|---|
| 5 | 130062 | 257160 | outside current target | mapped-land support contact |
| 5 | 130063 | 257159 | outside current target | mapped-land support contact |
| 5 | 130064 | 257159 | outside current target | mapped-land support contact |
| 5 | 130064 | 257160 | outside current target | mapped-land support contact |
| 5 | 130065 | 257160 | outside current target | mapped-land support contact |
| 5 | 130065 | 257161 | outside current target | mapped-land support contact |
| 5 | 130065 | 257162 | outside current target | mapped-land support contact |
| 5 | 130065 | 257163 | outside current target | mapped-land support contact |
| 5 | 130066 | 257160 | outside current target | mapped-land support contact |
| 5 | 130066 | 257161 | outside current target | mapped-land support contact |
| 5 | 130066 | 257162 | outside current target | mapped-land support contact |
| 5 | 130066 | 257163 | outside current target | mapped-land support contact |
| 5 | 130066 | 257164 | outside current target | mapped-land support contact |
| 5 | 130067 | 257161 | outside current target | mapped-land support contact |
| 5 | 130067 | 257162 | outside current target | mapped-land support contact |
| 5 | 130067 | 257163 | outside current target | mapped-land support contact |
| 5 | 130067 | 257164 | outside current target | mapped-land support contact |
| 5 | 130067 | 257165 | outside current target | mapped-land support contact |
| 5 | 130068 | 257162 | outside current target | mapped-land support contact |
| 5 | 130068 | 257163 | outside current target | mapped-land support contact |
| 5 | 130068 | 257164 | outside current target | mapped-land support contact |
| 5 | 130068 | 257165 | outside current target | mapped-land support contact |
| 5 | 130068 | 257166 | outside current target | mapped-land support contact |
| 5 | 130069 | 257163 | outside current target | mapped-land support contact |
| 5 | 130069 | 257164 | outside current target | mapped-land support contact |
| 5 | 130069 | 257165 | outside current target | mapped-land support contact |
| 3 | 130095 | 257020 | outside current target | mapped-land support contact |
| 3 | 130095 | 257021 | outside current target | mapped-land support contact |
| 3 | 130095 | 257022 | outside current target | mapped-land support contact |
| 3 | 130096 | 257015 | outside current target | mapped-land support contact |
| 3 | 130096 | 257018 | outside current target | mapped-land support contact |
| 3 | 130096 | 257019 | outside current target | mapped-land support contact |
| 3 | 130096 | 257020 | outside current target | mapped-land support contact |
| 3 | 130096 | 257021 | outside current target | mapped-land support contact |
| 3 | 130096 | 257022 | outside current target | mapped-land support contact |
| 3 | 130096 | 257023 | outside current target | mapped-land support contact |
| 3 | 130096 | 257024 | outside current target | mapped-land support contact |
| 3 | 130097 | 257023 | outside current target | mapped-land support contact |
| 3 | 130097 | 257024 | outside current target | mapped-land support contact |
| 3 | 130097 | 257025 | outside current target | mapped-land support contact |
| 3 | 130097 | 257026 | outside current target | mapped-land support contact |
| 3 | 130098 | 257025 | outside current target | mapped-land support contact |
| 3 | 130098 | 257026 | outside current target | mapped-land support contact |
| 3 | 130098 | 257027 | outside current target | mapped-land support contact |
| 3 | 130099 | 257027 | outside current target | mapped-land support contact |
| 3 | 130099 | 257028 | outside current target | mapped-land support contact |
| 3 | 130099 | 257029 | outside current target | mapped-land support contact |
| 3 | 130100 | 257030 | outside current target | mapped-land support contact |

## Limits

The physical predicate is a new representative-point application to the retained GSHHG-derived aggregate `mapped_land_support`; it is not a per-key field in physical-001. It establishes center contact only—not full-cell coverage, contemporaneous land truth, legal or council boundaries, or component qualification. The crosswalk’s zero current-target-center result is likewise limited to its pinned native target-center predicate. The retained physical artifact records two target-level issues for this target and heterogeneous source observation dates; this packet does not resolve them. Rights/source-mixture and administrative-authority questions remain open. No disposition or credit is changed.
