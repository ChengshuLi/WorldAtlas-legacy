# SOM original-source feature center check — 2026-10-25

This is a source-relative center-membership check for the frozen original roster only: 2,247 unique land keys, 1,645 intervals, 36 owners. It does not establish current authority, legal boundaries, territorial ownership, or rights clearance. No owner, disposition, or credit changed.

## Pinned source and terms

- Retained public payload at base commit [`8bb376b6b0125bfecfce5ac05e63b17c19d87ae9`](https://github.com/ChengshuLi/WorldAtlas/blob/8bb376b6b0125bfecfce5ac05e63b17c19d87ae9/coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-SOM-ADM2-000.bin.gz): `gb-SOM-ADM2-000.bin.gz`, 53,470 compressed bytes, SHA-256 `ea4a2af6d241350c0b4329eca66259e423f287a222bd0dfc72f8bf0311015278`. I fetched it via the public GitHub file API, decompressed the exact retained bytes, and verified 183,671-byte GeoJSON SHA-256 `fda57ec0acae5d43ab60523ba65283ce0923dfc52dbe2aebb2e600afe8015009` against the source catalog.
- Source catalog at the same pinned base, `data/administrative-sources.json`, identifies `gb:SOM:ADM2` as 118 ADM2 features, represented year **2022**, source “Global Polio Eradication Initiative (GPEI), Frank Salet,” and records **Creative Commons Attribution 4.0 (CC BY 4.0)** with detail “Licensed by originating party (Frank Salet) May 2022.” The upstream URL is pinned to geoBoundaries revision `9469f09`: [`geoBoundaries-SOM-ADM2_simplified.geojson`](https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/SOM/ADM2/geoBoundaries-SOM-ADM2_simplified.geojson). These are the retained catalog’s source and reuse terms; this check does not independently clear rights or source authority.
- Feature matching uses the exact recorded ID `gb:SOM:ADM2:<shapeID>` against GeoJSON `properties.shapeID`; all 36 original owner IDs resolve in the 118-feature payload.

## Method and aggregate result

Applied each roster `(key_x, key_y)` center using the pinned native grid size `N=262166`: longitude `-180 + 360*(x+0.5)/N`; latitude was read as `latitudes[key_y]` from the exact pinned little-endian Float64 table [`research/shared/native-row-latitudes.f64le.gz` at commit `5b32388df0501b013ac9a3ba97864932db493d59`](https://github.com/ChengshuLi/WorldAtlas/blob/5b32388df0501b013ac9a3ba97864932db493d59/research/shared/native-row-latitudes.f64le.gz). The verified table has 262,166 rows; compressed SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`, decoded 2,097,328-byte SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`. The pinned native grid code and `native-linear-evenodd-first-owner-v1` rule are in [`src/native-grid.js` at base commit `8bb376b6b0125bfecfce5ac05e63b17c19d87ae9`](https://github.com/ChengshuLi/WorldAtlas/blob/8bb376b6b0125bfecfce5ac05e63b17c19d87ae9/src/native-grid.js), file SHA-256 `3d20777f5896d28192e40428dd34cab89d47873a08bf073a17338c4ff97d43cd` (53,197 bytes; Git blob `add4cef02bb5a790f22a9078fdf9bd51679059d3`). For each point, tested all 118 source polygons with GeoJSON Polygon/MultiPolygon and hole semantics, even-odd ray crossing, exact rational comparisons over the binary64 point/vertex values, exact segment equality for boundaries, and no epsilon, snap, buffer, or geometry edit. The result below supersedes the earlier analytical-latitude run; counts by owner and all aggregate results are identical when recomputed from the pinned row table.

**Aggregate:** own recorded ADM2 feature: 2,247 inside, 0 boundary, 0 outside. Any other feature in the complete SOM ADM2 family: 0 contacts. Thus no center had a cross-feature contact or exception in this source-only check. ADM1 contacts are outside this calculation.

## Results by original owner

| Owner | Source feature ID | Keys | Intervals | Own inside | Boundary | Outside | Other ADM2 contacts | Exceptions |
|---|---|---:|---:|---:|---:|---:|---:|---|
| ABDUL AZIZ (`40010`) | `gb:SOM:ADM2:84685775B24635972964099` | 11 | 7 | 11 | 0 | 0 | 0 | none |
| ADALE (`39999`) | `gb:SOM:ADM2:84685775B13317235490488` | 42 | 42 | 42 | 0 | 0 | 0 | none |
| AFGOI (`40083`) | `gb:SOM:ADM2:84685775B82872988311402` | 13 | 9 | 13 | 0 | 0 | 0 | none |
| ALULA (`40087`) | `gb:SOM:ADM2:84685775B85704075811392` | 123 | 76 | 123 | 0 | 0 | 0 | none |
| BADHADHE (`40067`) | `gb:SOM:ADM2:84685775B71342338947416` | 119 | 82 | 119 | 0 | 0 | 0 | none |
| BADHAN (`40050`) | `gb:SOM:ADM2:84685775B5876262576033` | 1 | 1 | 1 | 0 | 0 | 0 | none |
| BALAD (`40063`) | `gb:SOM:ADM2:84685775B67470388371162` | 2 | 2 | 2 | 0 | 0 | 0 | none |
| BARGAAL (`40054`) | `gb:SOM:ADM2:84685775B61236699531309` | 75 | 74 | 75 | 0 | 0 | 0 | none |
| BENDER BAYLA (`40080`) | `gb:SOM:ADM2:84685775B8041620717241` | 186 | 164 | 186 | 0 | 0 | 0 | none |
| BOSSASO (`39998`) | `gb:SOM:ADM2:84685775B12579203226949` | 109 | 43 | 109 | 0 | 0 | 0 | none |
| BRAVA (`40048`) | `gb:SOM:ADM2:84685775B57970277493095` | 108 | 73 | 108 | 0 | 0 | 0 | none |
| BUHODLE (`40082`) | `gb:SOM:ADM2:84685775B82555432245075` | 1 | 1 | 1 | 0 | 0 | 0 | none |
| DANGOROYO (`40040`) | `gb:SOM:ADM2:84685775B50873713439527` | 45 | 42 | 45 | 0 | 0 | 0 | none |
| EL DHERE (`40035`) | `gb:SOM:ADM2:84685775B48124794142204` | 75 | 70 | 75 | 0 | 0 | 0 | none |
| ERIGAVO (`40020`) | `gb:SOM:ADM2:84685775B34990175799989` | 11 | 11 | 11 | 0 | 0 | 0 | none |
| EYL (`40068`) | `gb:SOM:ADM2:84685775B71976909807732` | 133 | 92 | 133 | 0 | 0 | 0 | none |
| HAFUN (`39997`) | `gb:SOM:ADM2:84685775B125480767078` | 289 | 203 | 289 | 0 | 0 | 0 | none |
| HAMAR JABJAB (`40047`) | `gb:SOM:ADM2:84685775B5791986723142` | 8 | 4 | 8 | 0 | 0 | 0 | none |
| HARADHERE (`40029`) | `gb:SOM:ADM2:84685775B45563576505649` | 54 | 52 | 54 | 0 | 0 | 0 | none |
| HELIWA (`40026`) | `gb:SOM:ADM2:84685775B37468249397520` | 5 | 5 | 5 | 0 | 0 | 0 | none |
| HOBYO (`40011`) | `gb:SOM:ADM2:84685775B25921172233623` | 100 | 87 | 100 | 0 | 0 | 0 | none |
| JAMAAME EAST (`40009`) | `gb:SOM:ADM2:84685775B22359262366449` | 2 | 2 | 2 | 0 | 0 | 0 | none |
| JARIBAN (`40086`) | `gb:SOM:ADM2:84685775B85139403123259` | 129 | 126 | 129 | 0 | 0 | 0 | none |
| JILIB EAST (`40031`) | `gb:SOM:ADM2:84685775B45912091310280` | 1 | 1 | 1 | 0 | 0 | 0 | none |
| KARAN (`40036`) | `gb:SOM:ADM2:84685775B48165620113230` | 9 | 6 | 9 | 0 | 0 | 0 | none |
| KISMAYO (`40089`) | `gb:SOM:ADM2:84685775B88570008116698` | 252 | 134 | 252 | 0 | 0 | 0 | none |
| KURTUNWAAREY (`40065`) | `gb:SOM:ADM2:84685775B70562611750423` | 37 | 31 | 37 | 0 | 0 | 0 | none |
| MADINA (`40064`) | `gb:SOM:ADM2:84685775B6942068492284` | 29 | 19 | 29 | 0 | 0 | 0 | none |
| MARKA (`40075`) | `gb:SOM:ADM2:84685775B78307821916269` | 126 | 79 | 126 | 0 | 0 | 0 | none |
| QANDALA (`40085`) | `gb:SOM:ADM2:84685775B84835917944928` | 9 | 6 | 9 | 0 | 0 | 0 | none |
| RABDURE (`40033`) | `gb:SOM:ADM2:84685775B46619978923687` | 2 | 2 | 2 | 0 | 0 | 0 | none |
| RAGA ELLE (`40084`) | `gb:SOM:ADM2:84685775B83703395559495` | 72 | 46 | 72 | 0 | 0 | 0 | none |
| RUNINGOD (`39993`) | `gb:SOM:ADM2:84685775B1037428019952` | 18 | 14 | 18 | 0 | 0 | 0 | none |
| WABERI (`40055`) | `gb:SOM:ADM2:84685775B61400607894578` | 8 | 7 | 8 | 0 | 0 | 0 | none |
| WARSHEIKH (`40007`) | `gb:SOM:ADM2:84685775B19685876664607` | 24 | 20 | 24 | 0 | 0 | 0 | none |
| ZEILA (`40049`) | `gb:SOM:ADM2:84685775B58560427797094` | 19 | 12 | 19 | 0 | 0 | 0 | none |

## Reproducibility references

- Frozen input roster: [original frozen proposal key roster](../som-original-disposition-20261020/som-disposition.json.gz), SHA-256 `05a809c1db2e0e08c01fffb9fba1a18c674e70c27f1e710af1ff0c668c2dd91c`.
- Machine-readable per-owner summary and exception lists: [`corrected-native-center-check.json`](corrected-native-center-check.json), SHA-256 `2b12071aff21b6fd0d854caa987766e467a5aef9f29545ed58a80b33eee56b59`.
- This is only a repeatable numerical contact result for the exact retained source vintage. It neither resolves the historical competitor/ancestry gaps nor makes a current or legal administrative assignment.
