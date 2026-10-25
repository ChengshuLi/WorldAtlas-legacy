# GRD 562: island-context source applicability

24 October 2026. Worker `01a16f2d-8ad8-7352-a1b0-11757b3e40e7`. Supplement to preserved v1; all 562 remain held, accepted delta zero. No producer, observer, polygon containment, source geometry, full-cell, map registration or ownership operation was run.

## Useful result

Existing exact-key latitude records and the authenticated native longitude rule permit reproducible **broad geographic context**, not authenticated island containment. The original seven feature names alone would mislead: 78 of Saint Patrick's 99 keys are in the Ronde/northern-islet vicinity, while the remaining 21 are near northern mainland Grenada. The Southern Grenadine Islands feature's 169 keys divide into 107 Carriacou-vicinity and 62 Petite-Martinique-vicinity centers.

| Geographic context inferred from center coordinates and actual map graticule | Keys | Retained feature context |
| --- | ---: | --- |
| Grenada main-island and adjoining coastal vicinity, north of 12°N | 305 | Andrew30, David40, Mark34, John31, George149, Patrick21 |
| South of 12°N, coastal/small-islet identity uncertain | 10 | George10 |
| Ronde and nearby northern-islet vicinity | 78 | Patrick78 |
| Carriacou vicinity | 107 | Southern Grenadine Islands107 |
| Petite Martinique vicinity | 62 | Southern Grenadine Islands62 |
| Total original scope | 562 | All seven original identities preserved |

The first two rows together are 315 in the main Grenada/coastal area, **not 315 proven mainland cells**. Likewise, a named vicinity does not establish that every center lies on that island, much less that an entire cell does. The 78-key label does not distribute keys among Ronde, Caille, or smaller islets. The 1990 map shows Ronde and its neighboring islets positively; it does not provide an authenticated cell-by-cell name crosswalk.

Exact per-key contextual records, unmodified latitudes, rational longitude numerators/denominators, original source IDs and zero acceptance deltas are in `grd562-island-context-v2.json`, 347,109 bytes, SHA256 `8a5137d607791abff8726b2f136c971edf812e9a0016ba15f1eaa186447812aa`.

## Coordinate reference and method actually used

The original selected-owner receipt already supplies latitude for each of 562 unique (y,x) keys. Its key set matches the original proposal exactly. Latitudes were copied by that key join, not regenerated. The receipt pins its normative latitude table to compressed SHA256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147` and decoded SHA256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`.

Two original consumed inputs were read from the immutable Git database without lazy fetch:
- `src/native-grid.js`, blob `add4cef02bb5a790f22a9078fdf9bd51679059d3`, 53,197 bytes, SHA256 `3d20777f5896d28192e40428dd34cab89d47873a08bf073a17338c4ff97d43cd`.
- Native manifest blob `31d970d0fe2bf8c899f020aad09a3826ea451790`, 252,447 bytes, SHA256 `d9954fa51d18e4ce785679f920e4b6ac1ebd3cf07ce03fa7e7e674cb2a42faba`.

The manifest declares size262166 and method `native-linear-evenodd-first-owner-v1`. The pinned code explicitly defines ideal native longitude as `(360*x + 180 - 180*size)/size` (comment near line807 and expression near875). Only that arithmetic was evaluated; no scanner was imported or called. Every numerator/denominator is preserved, with a floating display value for geographic reading. Latitude is the retained native table value. The code also documents inverse-Mercator row construction, but that function was not executed.

This is a native lon/lat-degree contextual bridge; no external EPSG transformation was necessary or performed. The source archive declares WGS84, but that does not establish a datum for the 1990 paper map. The latter has geographic graticules, no datum/projection declaration visible in the inspected image, and was not georeferenced. These limitations preclude exact map-edge registration, not ordinary broad island-context interpretation.

Analyst grouping separators are latitude12°,12.25°,12.4° and longitude−61.42° for the northern cluster. They are transparent grouping cuts, not claimed administrative/coastal boundaries. The main/northern-islet groups have a substantial empty latitude interval (last mainland-vicinity center12.2336569°, first Ronde-vicinity12.2940397°); the island cluster begins12.4415835°. Carriacou-vicinity longitudes end−61.4283317°, while Petite-Martinique-vicinity begins−61.3940023°. The 12° cut is expressly an uncertainty flag, not a coastline. Original source-feature counts were not used to choose an island identity.

## Which actual source applies

**1990 cartographic witness.** The previously downloaded [map](https://maps.lib.utexas.edu/maps/americas/grenada_rel_1990.pdf), SHA256 `fec580d695375bca528f6e0e66dff8d831ad1f6b599e5e0eb9481c5f04b369a3`, was visually read again in full. Graticules12°00′,12°15′,12°30′ and61°45′/61°30′W, scale bars, parish-boundary legend, island names and outlines support the broad geographic contexts above. It depicts six named mainland parishes, Carriacou, Petit Martinique, Ronde, Caille, Diamond, Large, Frigate, Saline, Glover and smaller named/unlabelled islets. None of the four broad clusters requires an unportrayed remote region. Fine shoreline/islet identity can still be uncertain within the depicted area.

It is a dated map with printed identifier801602(546324)9-90. PDF metadata dates image conversion to2005; that does not update the 1990 map edition. Parish lines are cartographic evidence of that edition, not proof of exact frozen2017 OSM edges or present shoreline. Its marked separation near Petit Martinique/Petit Saint Vincent supports regional orientation, not a measured international-boundary predicate for any of the62 keys. Absence of a tiny feature or label in a general map could be cartographic generalization; this work establishes no particular omission.

**Official2011 census.** The retained [report](https://stats.gov.gd/wp-content/uploads/2021/03/Census-Report-2011-Revised-Final.pdf), SHA256 `f0504e65e1ac2c4fc94a39813de46f448862082091cca829fe8c72ec2fe91185`, was newly rendered at PDF29/printed8 and visually read. It explicitly combines Petit Martinique with Carriacou for the analysis and distinguishes town/rest of St George within one parish. This is positive support for using the same island-group source context across the107 and62 clusters; it does not require an eighth frozen feature merely because an alternative project separates those islands. It does not state that the exact “Southern Grenadine Islands” geometry equals the census analytical unit, nor assign Ronde or every small islet to a parish. A population-oriented table's lack of a separately named small island is not territorial exclusion. No population values were imported.

**Government-hosted National Land Policy.** The retained [policy](https://climateresilience.gov.gd/wp-content/uploads/2025/02/Grenada-National-Land-Policy.pdf), SHA256 `a4b35d898ae05764128f938377aeab504a433fc63ddda4d000efbaa6f1ccc05f`, PDF5/printed4 was visually reread. It expressly includes Ronde, Caille, Diamond, Large, Saline, Frigate and surrounding islets alongside Grenada, Carriacou and Petit Martinique. This applies substantively to the northern-islet context and rebuts blanket dismissal of offshore keys. It neither allocates every named island to a frozen parish nor establishes a coastline convention.

The policy's PDF creation/modification metadata are January/February2018, while its current hosting URL includes2025/02. Neither is an independently established adoption date or proof of a new survey. Its first-page title contains no edition date. Its illustrated island map has a different presentation from the1990 sheet and was not assumed independent or more accurate without a printed map-source identity. Existing2013 issue-paper and2015 coastal-policy references are historical policy context, not evidence that a new parish boundary survey occurred.

## All seven frozen identities remain distinct

The consumed feature properties were reread without processing geometry. Original ordinal, source feature index, ISO and shapeID remain:
- 0 /34627 /GD-01 /93511190B48408833278115 — Saint Andrew30.
- 1 /34628 /GD-02 /93511190B20758743929628 — Saint David40.
- 2 /34629 /GD-05 /93511190B55681603978518 — Saint Mark34.
- 3 /34630 /GD-04 /93511190B21658762393869 — Saint John31.
- 4 /34631 /GD-03 /93511190B82420517640996 — Saint George159.
- 5 /34632 /GD-06 /93511190B28979172348328 — Saint Patrick99.
- 6 /34633 /GD-10 /93511190B76376744251170 — Southern Grenadine Islands169.

All are owner7116. Broad island context does not change these original membership records. In particular, the off-mainland78 cannot be silently transferred to the Southern Grenadine feature based on that name. Official island membership and frozen parish representation answer different questions.

## What remains uncertain

This pass resolves which already-read sources are relevant geographically, and narrows a concrete question: for the78 northern-islet keys and10 southern coastal/islet keys, source qualification should distinguish positive island inclusion from precise original feature/coast contact. The same distinction applies to shoreline keys in the107/62 clusters. The existing native-contact dependency is unchanged; this packet cannot substitute contextual coordinates for full-cell predicates.

No additional geographic CRS transform is proposed. Exact map registration or present island containment would need an explicitly adopted suitable spatial witness/method and independent review; none was invented. The sources already establish useful island-group context and should not be dismissed merely because a modern exact shoreline is not supplied.

All original files and v1 remain unchanged. No HDX denial was retried, no network acquisition was needed, and no action is pending or uncertain.

