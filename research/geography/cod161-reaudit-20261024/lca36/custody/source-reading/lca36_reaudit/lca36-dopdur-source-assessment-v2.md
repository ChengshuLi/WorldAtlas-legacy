# LCA36: retained DoPDUR comparator methods, precision and acceptance limits

2026-10-24; `/root/residual_land_west`, `01a16f2e-19a2-7470-acfd-59b39f3e90d1`. Addendum to the original-map research. All 324 accepted positives remain preserved; all 36 pending holds remain. No transform, new geometry predicate, native observer/producer, comparison rerun, publication of raw DoPDUR geometry, or acceptance.

## What the accepted comparison actually meant

The actual [root acceptance in PR2659](https://github.com/ChengshuLi/WorldAtlas/pull/2659#issuecomment-6317859071), already retained in `authenticated-root-receipts.json`, accepts exactly 324 source-relative native repairs and explicitly excludes the historical 326 supersets. It leaves two precision-sensitive plus 34 adverse keys held. It expressly does not newly adopt or redistribute restricted raw comparison geometry, establish legal sovereignty, or grant whole-target physical clearance. Thus the comparator is an already-used corroborative source, not an independently certified government shoreline or permission to publish its body. This reading concerns scientific provenance and acceptance scope, not a renewed delivery/PR audit.

Actual retained scripts `native-precision-compare.mjs`, `native-screen-projected.mjs`, and `native-screen-rounded.mjs` were read but not executed. They select original owner-7120 candidates, intersect the frozen land mask, and test whether keys are hit by **any of the ten WFS features**. They do not require an original district feature to match a same-named DoPDUR district. The recorded counts therefore describe combined comparator coverage, not district assignment agreement:

- 324 keys occur in both representations and are the accepted stable set.
- `[7120,120729,86724]` (original Gros Islet) and `[7120,120852,86741]` (original Dennery) occur only in the transformed projected response's retained screen.
- 34 keys are outside all ten comparator features in both retained screens. This is not merely a mismatch to a different district name. It also does not identify whether the cause is a coast, island outline, gap, omitted area, temporal change, or source error.
- The retained screen reports zero exact boundary ties in both representations; there is no basis to relabel the two keys as an inclusive/exclusive boundary-tie issue.

These are meanings of existing results. No new geometric result is asserted.

## Actual retained response evidence

The existing task-local bodies were read for attributes and serialization. Raw geometry stays at its existing path under `task-4/lca-proposal-20261021/qualification/`; none was copied into this packet.

| Response | Bytes / SHA-256 | Response CRS / timestamp |
|---|---|---|
| `dopdur-projected-epsg32620.json` | 145385 / `3fd8bc95fd20ac0ad9d6b0a47899e693e5f9fa5ed1baaa61f941bfbf3ea70ec9` | EPSG:32620 / 2026-10-21T03:06:10.590Z |
| `dopdur-rounded-epsg4326.json` | 103335 / `86ee892b9839bdb95a55a364a94be84bbe049e687c1b5c04579f09a4cc651289` | EPSG:4326 / 2026-10-21T03:05:44.641Z |
| `dopdur-latest-epsg4326.json` | 103335 / `25a6f657ddcae0ebd7fb9409b314c60f711135fd2245d8ab80c05542e08385b4` | EPSG:4326 / 2026-10-21T03:28:25.256Z |

Each reports ten matched/returned features, named Anse-la-Raye, Canaries, Castries, Choiseul, Dennery, Gros Islet, Laborie, Soufri�re (the retained replacement-character spelling), Micoud and Vieux Fort. Their attributes are identical across projected and rounded responses. They label `type_1` and `engtype_1` as Quarter, `validfr_1` as Unknown, `validto_1` as Present; remarks are null. ID/HASC/name fields identify administrative records but give no survey method, imagery date, coastline convention, georeferencing residual, positional accuracy, or source citation. Response timestamps are acquisition/serialization times, not boundary vintages.

A literal serialization audit counted decimal places without transforming or publishing coordinates. Each body contains 10,472 coordinate-number tokens. Both projected and rounded responses have a maximum of **four decimal places**. The two rounded captures differ only in their top-level timestamp; their other JSON values are equal. Four decimal places in a projected metre reference and four decimal places in degrees have different representational granularity. This supplies a concrete source-response mechanism consistent with the two recorded representation-sensitive results. It does not identify the server's original numeric precision, prove a configured GeoJSON setting, or establish which side of a physical boundary those two cells should occupy. More printed digits or a projection transform cannot create survey accuracy.

The existing recorded transform is pyproj 3.7.2, EPSG:32620 to EPSG:4326, `always_xy=True`, with transformed body SHA-256 `75612d14d036353aafd261370339ecebf775f5e1ecef764d9c583773bc8befb4`. That historical transformation was not rerun. The already-retained screen provides the two-key outcome; this addendum supplies response documentation, not a replacement screen.

## Published methods and source-reference checks

The official [administrative-boundaries page](https://geoservices.govt.lc/maps/adm-boundries/) identifies DoPDUR and its stats WFS/WMS. The [About page](https://geoservices.govt.lc/about/) describes the Open Source GIS Stack's publishing architecture, not boundary compilation. The page's GeoNetwork catalogue link returned 404; no substitute catalogue path or administrative login was attempted.

The exact published [WFS capabilities](https://geoservices.govt.lc/geoserver/stats/wfs?service=WFS&version=2.0.0&request=GetCapabilities) were downloaded through the supported approved route and read: 97,850 bytes, SHA-256 `2556c6fc8798e3e09083435cd3e288259d94d1c4d7f185e968a9ef2e26865277`. Target `stats:boundries_level_1` declares default CRS EPSG:32620, empty Abstract, generic feature/name keywords, no MetadataURL. Service title, abstract, provider/contact, fees and access-constraint fields are empty. This verifies the projected response uses the advertised default reference; it does not certify its source accuracy.

The corresponding [WMS capabilities](https://geoservices.govt.lc/geoserver/stats/wms?service=WMS&version=1.3.0&request=GetCapabilities), 195,037 bytes, SHA-256 `5381371e655d27df77d268b1f02c8f697ac82ae501d544b483d80727b72930b9`, also give the target a generic title and empty Abstract, with no source attribution or metadata link. No GetFeature, map tile, map image, or additional raw geometry was requested. Successful metadata access does not resolve layer redistribution terms.

The attribute vocabulary was followed to the primary [GADM variable documentation](https://gadm.org/metadata.html). It defines corresponding ID, HASC, type and validity fields, and explicitly describes Unknown and Present/Current as validity defaults. That establishes schema compatibility and shows why these strings cannot independently prove modern survey currency. It **does not establish** that this DoPDUR body is an exact GADM edition, retains a particular GADM geometry, or has GADM's licensing conditions. No GADM geometry or alternative comparator was fetched; the metadata supplies no exact source/version binding.

A GeoServer documentation search described a configurable GML decimal setting; that is not a verified description of this server's GeoJSON configuration and was not used to infer its settings. The four-decimal finding comes from the actual retained bodies.

## Comparison with the original Commons construction

The original source archive and two maps were actually read in v1. Its 2022 digitization combines a 2005 map with an older national outline and a 2015 map with updated districts; no spatial control or shoreline survey statement was documented. DoPDUR differs in being a government-published service with projected default CRS and administrative record attributes, but the inspected body/capabilities do not document an independent surveyed coast, original source edition, compilation method, or a later physical observation. Its ten-quarter schema and Commons' ten updated districts agree at a broad administrative level; that does not establish identical line placement.

The original 2005-versus-2015 internal district revision alone cannot explain the 34 adverse results, because the retained test used the union of every DoPDUR feature rather than a same-district test. The four-decimal serialization explains why the two precision-sensitive cases deserve a separate stratum, but cannot eliminate the 34 stable adverse observations. Neither common names nor the provider's government identity supplies the missing source-specific physical cause.

## Result and finite remaining dependency

The two-versus-34 distinction now has an evidenced source-method explanation: a combined-coverage comparison, zero reported ties, response-unit/serialization sensitivity for two keys, and stable adverse combined-coverage results for 34. There is no readable coastline-method or survey-vintage statement in the inspected source bodies or published layer metadata that resolves those 34. This is not a universal source-absence or exhaustion claim.

Keep all 36 held and preserve all prior adverse physical context. No blanket researched-unresolved proposal is made here. The next qualification dependency remains the coordinator's authorized exact-36 native obstructing operand/physical context, or an existing retained report that covers those cells, followed by a bounded source question tied to that actual obstruction. The 324-positive acceptance cannot be transferred to the remainder. No legal shoreline certificate, external contact, or repeated generic search is required by this assessment.

`dopdur-retained-metadata-and-representation-v2.json` preserves the input identities, attribute summaries, decimal histograms, and script hashes without raw geometry. All downloads completed successfully; no action remains running. The GeoNetwork 404 is recorded, not retried by guessed routes. No CMR stopped endpoint was revisited.
