# TLS ADM2 full-versus-consumed-source center membership: frozen 562 keys

This source-free reproducibility note records the completed comparison of the exact simplified TLS ADM2 product consumed by the frozen 562-key packet against the retained full-resolution TLS ADM2 source. It reports point-center membership only. It contains no key coordinates or raw geometry and makes no legal, administrative, full-cell, or credit claim. No repository file, owner assignment, disposition, or credit was changed for this comparison.

## Exact scope and interval custody

The frozen source packet is `coordination/engineering/tls-original-repair-20261026/current-selector-observation-002/observation.json`, receipt SHA-256 `13b4b4c054ba2b769eab3862068c54a613f7caba40919086aa51ea6185eb32b8`, 140,467 bytes, receipt commit `f3876c7d7489fc1fee437ad904f9b54fffdc1366`. Its `original_intervals` contains 337 block-033 interval rows, 562 distinct `(x,y,original-owner-index)` keys, and source-feature-index arrays retained per interval. The receipt declares interval digest `ac5206324585780f9b18140fd8affd94a327349c1747af468ec9b7869dfa7384`; recomputing SHA-256 over the compact JSON encoding of `original_intervals` plus LF yields the same digest. Its native owner query digest is `c433f52769c67d340f7a323b6b8b5ba43e1c2f1b5178ebbb65b4071ec8590c3c`. The separate selected-owner observation records effective selected owner zero for all 562 keys; this comparison groups keys by the immutable original interval owner index.

The frozen package row `gb-TLS-ADM2--repair-evaluation` binds 562 land cells, 337 intervals, 22 original owner indices, and 31 source-feature contacts. The queue's exact `source_features` list matches the union of all interval `source_feature_indices` exactly; all 31 indices resolve in the full pinned roster. The source-free 48-pair owner/source contact matrix (sorted `[owner-index,source-feature-index,interval-contact-count,key-contact-count]`, compact JSON plus LF) has SHA-256 `92d02d99bd1454241ca9f84f8144cf7376037fdb2c6da24bf95478514318219a`. The separately retained feature/key-count matrix is [block-033-source-physical-contact-matrix-20261026.md](block-033-source-physical-contact-matrix-20261026.md), SHA-256 `d129d2815a497cd683d16e49e0e3ba3642810ba293d0032c49856323cd5babc4`.

## Source and native pins

| Operand | Exact identity and bytes/hash |
|---|---|
| Consumed simplified product | `gb:TLS:ADM2`; immutable source-corpus commit `30519afd69a09b1234b77296b8578e5aafcc9b6c`; path `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-TLS-ADM2-000.bin.gz`; Git blob `2747286a6267610e084385055b70c6e6ac2b9e64`; 93,000 encoded bytes, SHA-256 `0eafd96d14eb2084456da395b2acfcce26ee3a5a7a2e5cb3c2a7c9235f726359`; decoded 335,036 bytes, SHA-256 `84106c050c23cb5cedee5f4bc4823c3d3bfcd2400754c67ba4244c6b4c347177`. |
| Full-resolution product | Release/source pin `9469f09`; retained archive path `/tmp/tls-full-source-9469.geojson.gz`; 1,413,120 encoded bytes, SHA-256 `cb3ed8d51124be156295d92fe6abf3517afc4ee338fd8dbae20d24758633457f`; decoded GeoJSON 5,303,288 bytes, SHA-256 `a437e47041dcc708e55a76ede2b5db3beec31da3521fbd2a847bf372e1662911`. |
| Source identity inventory | Both variants contain 65 `gb:TLS:ADM2:<shapeID>` features in the same order with identical properties; source-ID-set hash (sorted full IDs, compact JSON plus LF) `cac1c1cc208b2a18b93f92c49d9a27e20dc82bb17e24507ad87d04c1eecc86f8`. All 65 per-feature geometry JSON hashes differ between these two exact bodies. |
| Native center latitude table | `coordination/engineering/native-grid-fidelity-1010-20261005-local15/results-v1/native-row-latitudes.f64le.gz`; commit `5b32388df0501b013ac9a3ba97864932db493d59`; Git blob `de6905e162dc031b1b93248fae91190c39c4ad53`; 1,851,757 encoded bytes, SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`; decoded 2,097,328 bytes, SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23` (262,166 little-endian f64 rows). |
| Native ownership contract | `native-linear-evenodd-first-owner-v1`, size 262,166, coordinate bits 19; source-evidence record `coordination/engineering/tls-original-repair-20261026/source-evidence-006/source-evidence.json`, SHA-256 `6c6d581fce8cbdef32e70fcbdbb5a99f3a86d9c88fa6833e5f6efca2b5350c4d`; retained manifest SHA-256 `d9954fa51d18e4ce785679f920e4b6ac1ebd3cf07ce03fa7e7e674cb2a42faba`. |
| Membership implementation reference | `scripts/qualify-source-cohort.py`, SHA-256 `abc801b9a35d20c9f0dfe3bbc9bb2cb7dc107f1758414970d9cde11380574a18`; this comparison uses the same vectorized Shapely `covers` predicate at the exact native centers. |
| Runtime | Python 3.12.14; Shapely 2.1.2; GEOS 3.13.1; NumPy 2.3.5. |

For every frozen key, the native center was evaluated at `lon=(x+0.5)/262166*360-180`, `lat=native-row-latitudes.f64le[y]`. Results were grouped by the interval's original owner index and source IDs were preserved as the exact `gb:TLS:ADM2:<shapeID>` strings. The simplified hits reproduce the receipt's TLS ADM2 source-feature-index membership for 562/562 keys (zero mismatched keys). The raw full and simplified source-feature IDs are identical as sets/order; no cross-version renaming was used.

## Results and per-owner counts

Of the 562 keys, simplified geometry covered 562 owner-feature centers; the full-resolution geometry covered 491. The feature membership set was unchanged for 491 keys and changed for 71. All 71 changed keys lose one simplified-source feature contact in the full product; there are zero full-only contacts. Thus the source-relative contact tuple counts are 562 simplified and 491 full. These are point tests on the two source variants, not full-cell support.

| Original owner index / feature | Keys / intervals | Simplified hits | Full hits | Lost simplified contacts |
|---|---:|---:|---:|---:|
| 42171 Atauro | 51 / 30 | 51 | 45 | 6 |
| 42172 Fatumean | 25 / 15 | 25 | 20 | 5 |
| 42178 Iliomar | 18 / 8 | 18 | 15 | 3 |
| 42179 Tutuala | 92 / 64 | 92 | 87 | 5 |
| 42180 Cristo Rei | 35 / 11 | 35 | 35 | 0 |
| 42183 Lospalos | 52 / 34 | 52 | 40 | 12 |
| 42186 Alas | 31 / 19 | 31 | 29 | 2 |
| 42188 Hatu-Udo | 12 / 2 | 12 | 11 | 1 |
| 42189 Tilomar | 26 / 22 | 26 | 23 | 3 |
| 42190 Atabae | 2 / 2 | 2 | 1 | 1 |
| 42193 Same | 4 / 3 | 4 | 4 | 0 |
| 42194 Pante Macassar | 4 / 4 | 4 | 3 | 1 |
| 42195 Uato-Lari | 25 / 24 | 25 | 18 | 7 |
| 42203 Fatuberliu | 16 / 15 | 16 | 10 | 6 |
| 42204 Uatucarbau | 4 / 1 | 4 | 4 | 0 |
| 42208 Oesilo | 1 / 1 | 1 | 1 | 0 |
| 42210 Suai | 21 / 18 | 21 | 18 | 3 |
| 42215 Balibo | 2 / 2 | 2 | 2 | 0 |
| 42217 Maliana | 2 / 2 | 2 | 1 | 1 |
| 42226 Passabe | 20 / 15 | 20 | 16 | 4 |
| 42230 Viqueque | 71 / 25 | 71 | 64 | 7 |
| 42234 Nitibe | 48 / 20 | 48 | 44 | 4 |
| **Total** | **562 / 337** | **562** | **491** | **71** |

### The separately tracked 53-key subset

The 53 keys previously tracked against the three named full-versus-simplified features remain a subset of this comparison, not its total: feature index 58385 Fatumean (owner 42172) contributes 25 simplified hits and 20 full hits (5 lost); 58422 Tilomar (42189) contributes 26 and 23 (3 lost); 58374 Balibo (42215) contributes 2 and 2 (0 lost). They total 53 simplified contacts, of which 8 are absent in full. Another 63 of the 71 losses occur on 14 additional features. The earlier retained contact note singled out those three features; this measurement finds center-membership changes across 17 features for these exact full and simplified bodies, and all 65 per-feature geometry hashes differ. The new comparison preserves that distinction rather than assuming the earlier three-feature note exhausts the byte-different geometry inventory.

## Coordinate-free tuple hashes

All hashes below use sorted tuples, compact UTF-8 JSON, and one trailing LF. `y,x` are included only inside hashes; no coordinate values are emitted in this note.

| Set | Tuple shape | Count | SHA-256 |
|---|---|---:|---|
| Frozen key set | `[y,x,originalOwnerIndex]` | 562 | `8c8d97bac7e8dd9681ae2a4dd10776ff0c5b3eed308f11a6bc30f80a30d9b145` |
| Simplified membership | `[y,x,originalOwnerIndex,sourceID]` | 562 | `0bb2c1e9059f42dad8643aad785cd3d4150edcd9cafb4d13ed4e63a579838a5b` |
| Full membership | `[y,x,originalOwnerIndex,sourceID]` | 491 | `9c6313d1fbdd9676a6821ac8c1445bbeaf99bdd9a853ba8c49b5c52ae6bef8d6` |
| Changed key set | `[y,x,originalOwnerIndex]` | 71 | `b0beb44144874b81e09d727112c7771c85e75fff4e61a2a23a07a470bab0524c` |
| Full-only source contacts | `[y,x,originalOwnerIndex,sourceID]` | 0 | `37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570` |
| Simplified-only source contacts | `[y,x,originalOwnerIndex,sourceID]` | 71 | `3c0ecef5ad5e7fc5a029d1ba5bbdb3919892baad04b57ac58c6bbf49a1a55454` |
| 53-key subset, three source features | `[y,x,originalOwnerIndex,sourceFeatureIndex]` | 53 | `8f64ce35e425cfd4da43e1e7e2c1f838e6ec623cf642e5cec619cd8079117bbe` |
| Fatumean portion | `[y,x,originalOwnerIndex,sourceFeatureIndex]` | 25 | `dbb28656778fcedc24339026a6cb766acb1bf41fc7c8f03a59d28c10708f041a` |
| Tilomar portion | `[y,x,originalOwnerIndex,sourceFeatureIndex]` | 26 | `b71a9edd9f28da31cf71f789366bc4f76867cc770faec3d36f857cb4b989f0e4` |
| Balibo portion | `[y,x,originalOwnerIndex,sourceFeatureIndex]` | 2 | `7401015378d0c63648477fda106f725b46f73b417977a64533ef0ac426a74156` |

This comparison only establishes the center-membership difference between the two pinned source bodies on this frozen scope. It does not determine which product is more authoritative, whether any owner is correct, or whether an interval qualifies for any disposition.
