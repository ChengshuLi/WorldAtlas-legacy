# PER 727-key source-application proposal (source-free)

**Disposition proposed:** retain these 727 residual keys as source-relative, researched-unresolved pending an exact feature-to-administrative-unit crosswalk. No key is cleared, repaired, assigned to a district, or credited by this note. This proposal is based only on already-retained artifacts; it is not a new source lookup or package status change.

## Scope and lineage

The exact target recorded in the retained amendment sidecar is `gb:PER:ADM2:86281439B43857057528938`. Its row states `whole_target_issue=True`, with reasons `contradictory_land_water_support, L2-outside-L1`, and target residual count `727`. The sidecar records `727` matching rows at target index `4`; all `727` `(y,x)` keys are unique. The sidecar is pinned to accepted original input commit `b7ca15f8d88241b088699396d3df0ca58a9e0803` and package issue #2440; sidecar SHA-256 is `5098898d03bead6493a8af6193c3339b19b4f2ddf0cfe93261956f3bca11ab73`.

Per-key source-index combinations are:

- `(3523, 49039)`: `686` keys.
- `(3523, 48917, 49039)`: `41` keys.

The source-index values are retained raster candidate/operand lineage. They establish which source candidates were associated with those exact rows under the retained application; they do not by themselves identify an INEI UBIGEO, select one district, prove source applicability, or establish a legal boundary. The whole-target flags/reasons are contextual target-level findings and must not be projected into per-cell findings.

## What the retained INEI list establishes

The already-retained official INEI 2017 publication *Perú: Crecimiento y distribución de la población total, 2017* (PDF URL: `https://www.inei.gob.pe/media/MenuRecursivo/publicaciones_digitales/Est/Lib1673/libro.pdf`; local PDF SHA-256 `cc9be78da7ebe7888ec697a237e1e42917aae95e5205772e18aba300b82250fa`) lists the MRC province and its four district UBIGEO/name pairs: 160401 Ramón Castilla, 160402 Pebas, 160403 Yavarí, and 160404 San Pablo. This is administrative-name/code context at the publication's 2017 vintage.

That roster does not include a crosswalk from the retained geoBoundaries target feature ID, its source indices, or the 727 `(y,x)` keys to any one of those district codes. The distinction matters: a province name and a district roster are not evidence that a same- or similar-named feature is one particular district; nor can the province roster assign individual held keys to district polygons. No retained feature-level correspondence or key-level UBIGEO field is present in the reviewed sidecar/receipt evidence.

## Limits and deciding input

The prior exact advertised INEI WFS attempts timed out; this note does not retry them. A timeout is an availability limit, not a denial and not evidence about the feature's code. The 2017 PDF is a name/code roster only and cannot resolve the target-feature or key-level join.

**Deciding evidence needed:** a dated, versioned feature-level correspondence that identifies the district feature using the provider’s own stable identifier and connects it to the retained target using documented source identity, name, parent, vintage, and geometry. A government provider does not need to publish a third-party geoBoundaries ID; that ID is retained here only as our own lineage label. If a per-key district assignment is proposed, also join the 727 held keys to the corresponding feature with exact conservation. No such correspondence or key-to-feature join is present in the retained evidence reviewed so far.

The bounded qualification work was source-specific: the official INEI 2017 district roster was inspected; INEI IDE documents a district WFS layer `Interoperabilidad:ig_distrito`; one `GetCapabilities`, one `DescribeFeatureType`, and the page-advertised 50-feature JSON `GetFeature` request each timed out at about 20 seconds; and an official viewer request for GEOPERÚ layer 43435 failed DNS. The documented 2023 district RAR download returned HTTP 400 (`application/x-rar-compressed`) and was not retried. The GeoIDEP catalog records an OGC WMS/WFS district service, but its exact service URL was not exposed in readable page/API text. These are bounded transport or representation failures, not source-access denials and not evidence that a feature cannot be matched. This supports a finite source-relative unresolved proposal for root review; it does not automatically establish research completion or satisfy the original repair/exception gate.

## Evidence pointers

- Original scope receipt: `/tmp/per-original-scope-receipt.json` (issue #2440); accepted original input commit `b7ca15f8d88241b088699396d3df0ca58a9e0803`.
- Exact retained key/source/physical sidecar: `/tmp/per-mrc-sidecar.json`; SHA-256 `5098898d03bead6493a8af6193c3339b19b4f2ddf0cfe93261956f3bca11ab73`.
- INEI 2017 PDF: `/tmp/per-inei-lib1673-libro.pdf`; SHA-256 `cc9be78da7ebe7888ec697a237e1e42917aae95e5205772e18aba300b82250fa`.

## Source-identity clarification and bounded route result

The retained local source roster and exact PER ADM2 payload identify the target feature itself: source index 49039, geoBoundaries source ID `gb:PER:ADM2:86281439B43857057528938`, local ordinal 121, owner 33741, feature name “Mariscal Ramon Castilla.” Its provider properties have no separate national ID or UBIGEO field; the product-level represented-year claim is 2020. The original target receipt records the parent as the framework Loreto province.

The already-retained official INEI 2017 roster identifies province UBIGEO 160400, Loreto — Mariscal Ramón Castilla, with four subordinate district codes 160401–160404. This is a direct name/parent/administrative-level correspondence for the named province at 2017, and it does **not** require INEI to publish the third-party geoBoundaries identifier. The source feature's own ID and geometry remain our lineage for the held rows. The roster does not make the 2017 and 2020 geometries equivalent, establish an effective boundary date for the geoBoundaries polygon, assign the 727 keys to individual districts, or resolve the target's retained `contradictory_land_water_support` / `L2-outside-L1` qualification flags.

The distinct official province-geometry route remains unavailable in retained records: the documented INEI district WFS calls timed out; the 2017 roster is not a polygon source; the INEI 2023 layer evidence is department-level; and no separate official province polygon URL is recorded. These are finite source-route limits, not proof of denial or a demand for an impossible government geoBoundaries-ID crosswalk. The remaining science question is whether the retained 2020 target polygon and exact source/physical/native evidence satisfy the original source-fitness and exception gate for these 727 keys. This identity clarification alone changes no package status or credit.

## Exact retained-candidate center application

A new bounded native-grid center application used the exact 727 owner-33741 keys and only the three recorded source indices: Brazil ADM1 Amazonas (3523), Peru ADM1 Loreto (48917), and the target Peru ADM2 Mariscal Ramon Castilla (49039). It classified 727/727 key centers inside the retained MRC target feature, 727/727 inside the Brazil Amazonas candidate, and 41/727 inside the Loreto candidate. The resulting exact combinations match the original arrays: `{3523,49039}` for 686 keys and `{3523,48917,49039}` for 41; zero source-array mismatches, uncovered keys, or boundary ties. Canonical key-set SHA-256 is `ffff89883c2274a88c627b7e0df2dc3167cf689aa8803d599ab2d278a9aa7b51`.

This application is source-relative center membership in retained source polygons; it does not establish current administrative applicability, legal authority, boundary fitness, or whole-cell containment. The result sharpens the unresolved question: the recorded 2020 MRC target and the retained Brazil candidate both include all 727 centers under the same native method. The 2017 official INEI roster anchors the province name/code but has no polygon or geometry crosswalk. This supports a bounded unresolved candidate for the exact 727-key cohort, subject to root’s decision under the original source-fitness/exception contract; it does not support clearance, district assignment, or repair credit.

The author initially used an exact `Fraction` mirror because that child checkout exposed Node 8.0.0. I then ran the pinned JavaScript scanner verbatim under the supported Node 24 runtime, using the exact local source blobs, the pinned latitude table, and the same 727-key set. It independently reproduced 727 MRC hits, 727 Amazonas hits, and 41 Loreto hits; zero source-array mismatches; and zero selected-key ties. Canonical key hash remained `ffff89883c2274a88c627b7e0df2dc3167cf689aa8803d599ab2d278a9aa7b51`. The verbatim result matches the rational mirror. Its source-free JSON is `PER727-native-verbatim-node24-result.json`, SHA-256 `dc6ce054d9662053c367abd62435133cf12ade40668f16d5fe40a6cd7884c158`.

This is still a center-only source-relative result. The scanner explicitly reports `scientific_approval=false` and `native_topology_verified=false`; the result does not establish legal applicability, whole-cell containment, or credit.
