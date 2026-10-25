# SSD93 source-relative spatial-application proposal (source-free)

**Proposal state:** local source-free evidence note for root review. It is not an accepted documented exception, repair, boundary attribution, package status change, or credit. No raw geometry or cell coordinates are included.

## Proposed bounded outcome

For these **93 exact held keys only**, retain a proposal-only source-relative researched-unresolved disposition. The evidence now goes beyond source-index labels: exact local copies of the pinned foreign source payloads were verified and applied with the retained native-grid scanner. Every selected cell center is outside its corresponding original South Sudan ADM2 target polygon and inside at least one of the exact foreign candidate polygons recorded for that key. All 99 recorded foreign-feature memberships match the source-polygon center application exactly; no listed membership misses and no additional unrecorded membership occurs. The result is a specific spatial relationship under the retained raster-center rule, not proof of legal territorial causation.

## Exact key scope and partition

The selected set is exactly 93 distinct held rows from the original 502-key held ledger. Canonical key digest is SHA-256 `637b49965b44b06930ceb44a77004aab9e2eaaa8523b82e1954c8d71319d9507`, computed over compact JSON of sorted `[y,x,owner_index]` triples. Every selected row is recorded `land`; the disposition’s selected owner is zero and the key is still held.

| Owner | Held keys | Foreign source-center membership |
|---|---:|---|
| Yambio | 39 | COD ADM1 Upper Uele: 39 |
| Yei | 13 | COD ADM1 Upper Uele: 13 |
| Ibba | 8 | COD ADM1 Upper Uele: 8 |
| Maridi | 1 | COD ADM1 Upper Uele: 1 |
| **COD total** | **61** | **61 unique keys** |
| Magwi | 12 | UGA Northern Region: 6; UGA Kilak: 8 |
| Kajo-keji | 8 | UGA Northern Region: 6; UGA West Moyo: 1; UGA Aringa: 2 |
| Budi | 4 | UGA Northern Region: 4; UGA Dodoth: 3 |
| Ikotos | 3 | UGA Northern Region: 3 |
| **UGA total** | **27** | **27 unique keys; six keys occur in both an ADM1 and ADM2 feature** |
| Kapoeta East | 5 | KEN ADM1 Turkana: 5 |
| **Total** | **93** | **61 COD + 27 UGA + 5 KEN; no cross-country overlaps** |

The seven foreign source features account for 99 feature-key memberships because six UGA keys are present in both the UGA ADM1 and ADM2 polygons. This is not 99 cells. There are 93 distinct keys. The center test found zero selected-key boundary ties in either the foreign polygons or original target polygons, zero selected centers inside their corresponding SSD target polygons, and zero selected centers outside all recorded foreign candidate polygons.

## Exact source and method pins

The original held proposal is `/tmp/ssd-502-disposition.json`, 2,365,898 bytes, SHA-256 `7b530ca393c773ff90fc94298d2b27342adbcedb28b56d920a4698cd88912b64`. It preserves the 2,123-cell contract accounting: 1,621 previously supported plus 502 held. The selected 93 are a subset; the other 409 held keys are untouched. The source/target evidence input is `/tmp/ssd-source-evidence.json`, 178,108 bytes, SHA-256 `82fbf48353e389f782fa534d950e3e091b09e7130c63bb9c92728d37b270d05e`, pinned to source-evidence commit `d7658a69b156a361bb19a74cbcd7e8ff6ea4b413`, blob `825447acce47c9c75fca08b57ea6cabcd90a6cca`. Its primary target family is the retained geoBoundaries South Sudan ADM2 source (represented year 2020, CC BY 3.0 IGO); exact target IDs are carried in the pinned input, not reproduced here.

The native scanner is `nativePolygonIntervals` in `coordination/engineering/original-held-cell-exceptions-20261018/native-grid-pinned.mjs`, method `native-linear-evenodd-first-owner-v1`. The locally materialized code copy is 50,250 bytes, SHA-256 `66b453bbb2e001b9ff56bd754d55087f5919845dceeefd886016494cefa1d3e0`. The exact latitude table is pinned at commit `5b32388df0501b013ac9a3ba97864932db493d59`, path `coordination/engineering/native-grid-fidelity-1010-20261005-local15/results-v1/native-row-latitudes.f64le.gz`, blob `de6905e162dc031b1b93248fae91190c39c4ad53`. Its compressed bytes/SHA are 1,851,757 / `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`; decoded bytes/SHA are 2,097,328 / `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`. The application used the exact 262,166-row table; no analytic or substitute latitudes were used.

The foreign source corpus is pinned to commit `21984e9ec4ec7370bc807e2da23cea2228747698`. All four compressed source artifacts were already in local custody; each was verified against the original catalog’s Git blob OID and both compressed and decoded SHA-256 before use. Only hashes and metadata are recorded here; geometry remains private.

| Index | Feature | Source ID | Represented year / recorded licence | Original payload blob | Decoded payload SHA-256 | Selected centers |
|---:|---|---|---|---|---|---:|
| 18727 | Upper Uele | `gb:COD:ADM1:28894549B55881681467015` | 2017 / ODbL 1.0 | `9c044aab8159821ba629020dee2e787388d20b52` | `bf6096f1c16f2632be9c4d4c0305276024fd5b3f3b9b3e635b2e2018d02f0331` | 61 |
| 60391 | Northern Region | `gb:UGA:ADM1:17295835B80141219017784` | 2017 / ODbL 1.0 | `213c2301f14c296a40310030256a7b9d496c3afb` | `75e5442c33f7023bcd2d7d72928835723b557c1a9523f3b4c9afe36d0e73af93` | 19 memberships |
| 60395 | Dodoth | `gb:UGA:ADM2:47994165B4837390146164` | 2006 / Public Domain | `1f8672d7303051dd6425dc822598dd935bc3c61f` | `0a13e10b3bc6beeb02db4502c7f29a2ebbbb681a932307ccba4cd53e994feac7` | 3 |
| 60446 | Kilak | `gb:UGA:ADM2:47994165B70719248408693` | 2006 / Public Domain | `1f8672d7303051dd6425dc822598dd935bc3c61f` | `0a13e10b3bc6beeb02db4502c7f29a2ebbbb681a932307ccba4cd53e994feac7` | 8 |
| 60449 | West Moyo | `gb:UGA:ADM2:47994165B18082180372450` | 2006 / Public Domain | `1f8672d7303051dd6425dc822598dd935bc3c61f` | `0a13e10b3bc6beeb02db4502c7f29a2ebbbb681a932307ccba4cd53e994feac7` | 1 |
| 60451 | Aringa | `gb:UGA:ADM2:47994165B72229648359475` | 2006 / Public Domain | `1f8672d7303051dd6425dc822598dd935bc3c61f` | `0a13e10b3bc6beeb02db4502c7f29a2ebbbb681a932307ccba4cd53e994feac7` | 2 |
| 40425 | Turkana | `gb:KEN:ADM1:32016919B72266624462344` | 2020 / Public Domain | `9d55d677acfd305ab94dc04e4d337e33db8da970` | `4d9e1b8a6d305ee2b2bbeeeb4dd6ec3cc52e44884f0f6065d14d255810f9eae4` | 5 |

## Qualification limit and decision requested

This is an exact native **cell-center** comparison of the retained simplified source polygons. It does not test full cell footprints, edge slivers, legal boundaries, current administrative authority, sovereignty, or causal correctness of the original exclusion label. The source families and represented years differ; a candidate polygon’s presence at the center does not make that polygon an authoritative current boundary. The retained disposition itself warns that whole-target exclusion relations are not per-cell authority findings and that formal package acceptance is still required.

The evidence supports a bounded, exact 93-key source-relative-unresolved candidate because the recorded candidate indices resolve to pinned features and the native-center relation is reproduced for every selected key. It does not support positive ownership, clearance, a blanket conclusion for the other 409 held keys, acceptance of the existing exception packet, or any repair/documented-exception credit. Root’s science review and the original contract’s remaining acceptance gates still apply.

## Source-role and original-exclusion link review

The retained packet links each per-key candidate feature ID to the same target's `whole_target_foreign_exclusion_relations`. This ties the candidates to the original exclusion screen at **whole-target** granularity. It does not say the feature caused the held label for each specific key.

For the COD group (Yambio, Yei, Ibba, Maridi), cached metadata identifies the Upper Uele candidate as COD ADM1, boundary year 2017, source OpenStreetMap/Wambacher, with a 2023 metadata update/build. Its cited URLs are not official government sources. For the UGA groups (Magwi, Kajo-keji, Budi, Ikotos), the retained candidate records are geoBoundaries UGA ADM1 2017 and ADM2 2006 products; citation bodies and official source links are absent. Kapoeta East uses a geoBoundaries KEN ADM1 2020 record with the same citation limitation. The package target is SSD ADM2, represented year 2020.

This source-specific review did not find a retained first-party government citation or exact documented official route for the seven candidate features. It does not establish that any candidate generated the exact key's original territorial-exclusion label or is a current legally applicable boundary. The 93-key center application and whole-target candidate links are meaningful spatial/source evidence for a bounded unresolved proposal; they do not justify positive ownership, legal attribution, sovereignty, a blanket conclusion for the other 409 keys, or repair/documented-exception credit. The existing contract's remaining acceptance and history/rights checks still apply; no universal legal certificate is asserted as a prerequisite for recording this research result.
