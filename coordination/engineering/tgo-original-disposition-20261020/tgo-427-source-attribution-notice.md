# TGO and adjacent ADM1 attribution and license notice

This notice records the license and attribution fields for the Togo ADM2 source polygons embedded in the TGO candidate constructor result. It is source metadata, not a legal-boundary or upstream-source certification.

## Recorded source asset

- geoBoundaries record: `TGO-ADM2-56601680` (Togo, ADM2, “Prefectures”), represented year `2017`.
- `boundarySource`: `OpenStreetMap, Wambacher`.
- `boundaryLicense`: `Creative Commons Attribution-ShareAlike 2.0` (CC BY-SA 2.0), as recorded by geoBoundaries. License text: <https://creativecommons.org/licenses/by-sa/2.0/>.
- `boundarySourceURL`: <https://wambachers-osm.website/boundaries/>.
- `licenseSource`: <https://www.openstreetmap.org/copyright>.
- Exact retained metadata SHA-256: `63cdb283c7b1183106e4e79b1dffbbd80ed6835c21107b636fc615f3cfa0f762`.
- geoBoundaries release ref: `9469f09`; full-resolution geometry SHA-256 `f4e6ca4ba89a1d783c12a14335e99b28d34f23f6cff8c8dbbe52adecee9b9bff` (376,562 bytes); simplified geometry SHA-256 `f0b555060987b20814aaf807c156cecfbe91d822d62e1b1e2920930d910bc291` (151,571 bytes).

## Attribution for the candidate output

The pinned constructor result `.cache/delivery-handoff/tgo427-native-authority-001/constructor-result.json` (SHA-256 `2e8bca578a566ea131d9f999d0e5c6ad20b8aad8b55ea3a10e75da06ddfa1900`, 46,397 bytes) contains 18 `ledger_rows[*].base_geometry` polygons keyed by `target_id=gb:TGO:ADM2:<shapeID>`. The retained source-evidence join verifies these geometries against the corresponding TGO ADM2 source features. They are source-feature polygons, not native grid-cell geometries. The same 18 TGO source polygons are also carried in `.cache/tgo-private-source-evidence-427-adjacent-v1.json` (50,851 bytes; SHA-256 `df32677f12a0d5b4096b35c610ae6fa9b065b643f0f690b253b6431c453bfa2`), in its target `base_geometry` fields.

The 397/112 supported-input evidence at `.cache/delivery-handoff/tgo427-supported-inputs-397-v112-d13-v1/source-evidence.json` (50,059 bytes; SHA-256 `67ef56c920943d514e0feb678df39ace991cf92167e60863e16f6ee1c1b27166`) contains 17 TGO target `base_geometry` polygons and 33 whole-feature geometries attached as conservative bounding-box candidate exclusions from the complete BEN/BFA/GHA ADM1 products. These are screening operands, not asserted contacts or legal exclusions. The exact recorded catalogue products are:

| Family and asset | Represented year | Recorded source and license | Recorded product URL |
| --- | --- | --- | --- |
| `gb:BEN:ADM1`, `BEN-ADM1-11314189` | 2012 | geoBoundaries/Wikimedia Commons; Public Domain | <https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BEN/ADM1/geoBoundaries-BEN-ADM1_simplified.geojson> |
| `gb:BFA:ADM1`, `BFA-ADM1-92566538` | 2017 | World Bank; CC BY 4.0 | <https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BFA/ADM1/geoBoundaries-BFA-ADM1_simplified.geojson> |
| `gb:GHA:ADM1`, `GHA-ADM1-69750345` | 2021 | OpenStreetMap; CC BY-SA 2.0 | <https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/GHA/ADM1/geoBoundaries-GHA-ADM1_simplified.geojson> |

The catalogue records the respective license sources as Wikimedia Commons, the World Bank's CC BY license page, and OpenStreetMap copyright. Preserve those recorded attributions and license terms when redistributing the embedded product geometries; apply the stated share-alike terms to adapted material where required. These fields are catalogue metadata, not independent source certification. The evidence records complete product pins, but the original metadata does not provide asset-level `sourceDataURL` or `licenseDetail` for these products.

Attribution for those embedded polygons: **Togo ADM2 prefecture boundaries, geoBoundaries record TGO-ADM2-56601680, source OpenStreetMap/Wambacher, represented 2017; geoBoundaries metadata states CC BY-SA 2.0.** Preserve this attribution and the recorded license link when redistributing the polygons. If the polygons are adapted, identify the changes and apply the recorded share-alike terms to the adapted geometry as required by the license. This notice does not assert that unrelated WorldAtlas code or native-grid assignment data are derivatives of the TGO polygons.

## Provenance limit

The metadata has no `sourceDataURL`; `licenseDetail` is `nan`; no upstream capture/extract date is recorded. The Wambacher viewer URL is not an exact data-extract locator. `sourceDataUpdateDate` (2023-01-19) is the repository integration date, and `buildDate` (2023-12-12) is the geoBoundaries build date, not the source capture date. The record supplies an explicit CC BY-SA 2.0 claim and no asset-specific prohibition; the upstream extract lineage and capture date remain unverified.
