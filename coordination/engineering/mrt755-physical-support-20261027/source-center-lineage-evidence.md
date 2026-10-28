# MRT755 source-center and target-lineage evidence

**Disposition:** all 755 original keys remain held. This packet records source-relative center contacts, a current-owner observation, and a comparison to the current canonical target geometries. It does not create a native patch, change the bank, accept a source, or claim repair qualification or credit.

## Frozen package

The scope is package `gb-MRT-ADM2--repair-evaluation`, from queue commit `23318dd9d70680495138297b9cc1a7533a466200`, path `coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json`, blob `9c9a9bc83627afd3e8435ff4009e39530543bf54`, 1,754,890 bytes, SHA-256 `78007430b6f9faedb188ef0619b7ff0a7a2cc7fff2ec9f1c41ee69936ec4ebd8`. The denominator is 755 unique native keys, canonical sorted key-set SHA-256 `37db3fac3d929f9a65a81959479c4fee6ef915500dce8aac10fe777d4f0d1e6e`, ten owners, 16 source-feature indices and 514 intervals. No key tuples or coordinates are included here.

The roster's candidate arrays came from source-candidate blocks 028 and 029, both at commit `09dc2346b2eb08916426cf0c7bbbada87ccb249d`: block 028 is blob `242c191e5cb4822c969247f4d4af99b56a5ec160`, 476,733 bytes, SHA-256 `2000877ef3d698ee43b6e1ae0d7bb0cb8cf505a94b21255076691311fb5c3ba4` (decoded 3,372,962 bytes, SHA-256 `1ea269bc51f49a00166c22ffcb3f875761fd98d7c9423b4dd96019b0d584774a`); block 029 is blob `3fc846f1a3a57841d82c695b97ad31b93af681e6`, 613,896 bytes, SHA-256 `7775f315311056808bfead2394034459a83a3590a201fe0deedb66fea1866528` (decoded 4,552,072 bytes, SHA-256 `a497602aa36f61e9d86b2078d6811e2362612fe7a11920f50df315b991106798`). The retained extractor is `source-batch-intervals.mjs`, blob `b42e2fed2890296d6d410047d942e4a407563638`, 7,200 bytes, SHA-256 `7c44cfe98557b5f58ae2ae50434bd4dbe8dd384bd23b777836d37a404ae25fbc`; it reads and joins precomputed arrays. The retained pins do not include a producer script hash and complete command proving those arrays were generated from the exact simplified geoBoundaries geometry. Therefore the RLE arrays establish candidate membership only. The actual center-contact receipts below are separate measurements against the pinned geometry payloads.

## Source-relative center contacts

The source-candidate association arrays were checked against the retained source polygon bodies using the original grid centers. The method uses size 262166, longitude `((x+0.5)/size)*360-180`, the exact pinned native row latitude, `geometry.contains(Point(lon,lat))` for interior, and `geometry.covers(Point(lon,lat))` after a false interior test for boundary. No tolerance, snapping, repair or coordinate transform was applied. Candidate-array membership alone is not treated as a contact.

| Result | Count | Interpretation |
|---|---:|---|
| Family 226 ADM2 strict-interior contacts | 755 | Each key is interior to exactly one mapped source ADM2 feature; no multiple, unlisted, or candidate-without-hit records were reported. |
| Family 225 ADM1 strict-interior contacts | 655 | Actual contacts across six parent features; 100 keys have no family 225 strict-interior contact. |
| Family 225 contact whose canonical target parent agrees | 365 | Source-parent context agrees with the canonical parent metadata. |
| Family 225 contact whose canonical target parent differs | 290 | 286 Chami keys contact Dakhlet Nouadhibou while canonical metadata names Inchiri; four Benichab keys contact Trarza while canonical metadata names Inchiri. |

Family 225 contacts by source feature are Assaba 64, Brakna 105, Dakhlet Nouadhibou 319, Gorgol 46, Inchiri 72, and Trarza 49. Family 226 contacts by source feature are 45880: 4, 45882: 26, 45885: 363, 45895: 44, 45896: 64, 45897: 40, 45901: 121, 45903: 4, 45909: 52, and 45914: 37. These are measured geometry contacts under the stated predicate; they do not settle legal authority or accepted ownership.

## Current owner observation and canonical-target comparison

The current selected-owner observer was run against data commit `a0b1d2d9164ffd61f9a8a20cb2eb7f259d47506f`. It queried all 755 keys (query-set SHA-256 `d9a08f619809f90f2c75729f8134777d30927e12fe1363c07d6c6901b2051661`) and returned selected-owner index zero for all 755. This is an observation at that snapshot only; it is not an ownership acceptance or qualification result.

The canonical target binding maps all ten owner IDs to the same feature IDs and names as the source family 226 roster. Yet the source and canonical target geometry hashes differ for 10/10 mapped features. Applying the same center predicate to the canonical target features gives 755 outside, zero interior, and zero boundary, while all 755 are interior to their mapped source ADM2 features. The comparison therefore records a source-versus-current-target geometry divergence; it does not indicate a key, owner, or feature-ID join mismatch.

The source payload is the geoBoundaries simplified product at release `9469f09`; the canonical part's metadata points to the non-simplified product at the same release tag and records reference year 2020. In `data/geography/part-16.json` (commit `f35dcd66352a441937c3cb9e894d28f247f63c4c`, blob `02d53ca01dc014a3c9481eb1017a89487fc2bd89`, 5,213,846 bytes, SHA-256 `b51719f7ff906a3c2c4dfdfea706ea51aa9541d550cc990b14191c046fb20797`), nine of these ten targets carry `topology_reconciled` metadata and the note that original source boundaries may differ. The four-key Benichab target has no such flag or original-geometry hash. For the nine targets with `metadata.original_geometry_sha256`, none equals the corresponding pinned source geometry digest. These facts make the simplified-source versus non-simplified/topology-reconciled target lineage the unresolved choice; they do not prove which geometry should govern the queue.

The source FeatureCollection declares OGC CRS84. The canonical part has no top-level `crs` declaration. Current repository consumers handle GeoJSON pairs as longitude/latitude: `src/pixel-grid.js` destructures each point as `[lon,lat]` and projects those values; `scripts/native-grid-inputs.mjs` validates the first ordinate within ±180 and the second within ±90, and retains that order. Thus the recorded `Point(lon,lat)` center method follows the repository's coordinate convention. No evidence in this packet supports an alternate target projection, swapped ordinate order, or transformation that would explain the comparison. The missing target-side CRS declaration and the geometry-lineage difference remain explicit limitations.

## Recorded source metadata and terms

The retained catalogue records these upstream sources and licence labels. The labels below reproduce the catalogue; this packet makes no legal clearance or derivative-rights determination.

| Family | Role and represented-year claim | Upstream source and recorded licence | Consumed geometry URL |
|---|---|---|---|
| 225 | ADM1 parents; 2015 | Princeton University Library, [metadata record](https://maps.princeton.edu/catalog/stanford-nw291zj7245/metadata); Creative Commons Attribution-ShareAlike 3.0 Unported ([licence text](https://creativecommons.org/licenses/by-sa/3.0/)) | [geoBoundaries MRT ADM1 simplified GeoJSON, release 9469f09](https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/MRT/ADM1/geoBoundaries-MRT-ADM1_simplified.geojson) |
| 226 | ADM2 targets; 2020 | World Food Programme/OCHA ROWCA, [dataset metadata](https://data.humdata.org/dataset/mauritania-administrative-boundaries); Creative Commons Attribution 3.0 Intergovernmental Organisations ([licence text](https://creativecommons.org/licenses/by/3.0/igo/)) | [geoBoundaries MRT ADM2 simplified GeoJSON, release 9469f09](https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/MRT/ADM2/geoBoundaries-MRT-ADM2_simplified.geojson) |

Both source payloads are bound to source-corpus commit `21984e9ec4ec7370bc807e2da23cea2228747698`. Family 225 is blob `0691d287998e6c5503cfcb3da8d5004e7b08b823`, 67,086 compressed bytes, SHA-256 `224e9c82e757986b87f3380bcbef9d9466515a851d0debe2cff82c965fab613f`; decoded size 194,417 bytes, SHA-256 `da1de144b4adc1e0dc6b87f4b332f6a25dcfe1f52ba88b142782c9b74d537ec7`. Family 226 is blob `b669bd78ea351194ea8bb254c6b862aadc189f9b`, 26,679 compressed bytes, SHA-256 `5904490f7780df89b31bff4dd7be6219c72fd7f93f515886340b2ad53899bf8c`; decoded size 124,489 bytes, SHA-256 `1902199c8a95554f6fc671b72445584e6b511a79223e0cd30399de2da6fb69da`. The retained metadata records sourceDataUpdateDate `2023-01-19` and buildDate `2023-12-12`; these are metadata dates, not retrieval dates.

The retained catalogue reports `licenseDetail: nan`; it contains no prescribed attribution phrase or full licence text. The catalogue labels are therefore recorded metadata, not a legal conclusion. The separate GSHHG-derived physical-support results and classifications are not included here because the retained GSHHG rights record lacks the required data copyright notice. This packet makes no physical-support finding.

## Evidence pins

| Evidence | Bytes | SHA-256 | Scope / limit |
|---|---:|---|---|
| Frozen original input receipt `/tmp/MRT755-original-input-receipt-23318.json` | 12,056 | `f7617dcf908479e01a12c1e346f03caaec042f5b890015655be253fd863d867f` | Original denominator, intervals and owner/source roster. |
| Original interval roster `/tmp/MRT755-original-interval-roster-23318.json` | 102,533 | `cd387dccb38acfda85c7034aff7db9aa56b8e5ffac1690c220e776da380b8e0f` | Exact original key roster; no current qualification claim. |
| Source-candidate membership join `/tmp/MRT755-source-candidate-membership-join-20261027-v2.json` | 450,551 | `9ebdb4a7b8de904c282bd461129b1128f32293ed84489af71b262d4989196145` | Frozen RLE candidate membership, distinct from actual contact. |
| Source feature attribute roster `/tmp/MRT755-selected-source-feature-attribute-roster-20261027.json` | 16,211 | `6391232e9d7f57e4c8cef5c5d95348f02e7c79af4d782f24d74e858ea4b210c4` | Source feature identities, payload pins, recorded terms and geometry digests; no coordinates. |
| Source-feature binding receipt `/tmp/MRT755-source-candidate-feature-binding-receipt-20261027.json` | 9,832 | `68a95a641664b826d7fcab2dcfa518219e93bd270102e93d0a146865829a1223` | Candidate/source ID and ordinal bindings; not itself contact evidence. |
| Family 225 actual center receipt `coordination/engineering/mrt755-physical-support-20261027/evidence/family225-actual-center-membership.json` | 377,414 | `ef76f875b393ce8cc4923249ad5d56946f4bf563c264869ecc422ce3a6639731` | Included source-free 755-row receipt; actual ADM1 contacts under the stated predicate. |
| Family 226 actual center receipt `coordination/engineering/mrt755-physical-support-20261027/evidence/family226-actual-center-membership.json` | 291,913 | `ba7855547fab36e60da8ccfeaa11cf837d80b6425434e5349fb0f94bc90c4921` | Included source-free 755-row receipt; actual ADM2 contacts under the stated predicate. |
| Canonical target binding `/tmp/MRT755-canonical-target-feature-binding-receipt-20261027.json` | 14,124 | `165d891c5fbf6caaa528abf337da19038467cea28fa1d2c6708aefe6537f553d` | Exact ten source-to-target ID/name/owner bindings and source/target hash comparison; no overlay. |
| Current-owner observation `.cache/mrt755-current-owner-observation-a0b1d2.json` | 185,694 | `0046120acadd1bae9bd3186414ce68804deb6f08efd9bbd4f1362f52f0e2f7ef` | 755 owner-zero observations at the pinned snapshot only. |
| Source-versus-canonical center comparison `coordination/engineering/mrt755-physical-support-20261027/evidence/canonical-target-center-comparison.json` | 369,171 | `143a475fb828b356c824717235aa5127718b26ae905dffb3ef996a173cabdeb0` | Included source-free 755-row receipt; no coordinates or geometries. |

The separate physical-center support receipt, whole-target physical output, execution receipt, and family225/physical cross-tab remain private and are not evidence included in this packet. Preserve those originals unchanged. No geometry replay, coordinate emission, native patch, ownership change, or bank mutation was performed for this packet.
