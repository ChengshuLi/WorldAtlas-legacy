# TGO ADM2 attribution and license notice

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

The pinned constructor result `.cache/delivery-handoff/tgo427-native-authority-001/constructor-result.json` (SHA-256 `2e8bca578a566ea131d9f999d0e5c6ad20b8aad8b55ea3a10e75da06ddfa1900`, 46,397 bytes) contains 18 `ledger_rows[*].base_geometry` polygons keyed by `target_id=gb:TGO:ADM2:<shapeID>`. The retained source-evidence join verifies these geometries against the corresponding TGO ADM2 source features. They are source-feature polygons, not native grid-cell geometries. The same 18 TGO source polygons are also carried in `.cache/tgo-private-source-evidence-427-adjacent-v1.json` (50,851 bytes; SHA-256 `df32677f12a0d5b409b6d35c610ae6fa9b065b643f0f690b253b6431c453bfa2`), in its target `base_geometry` fields. That JSON also records source and physical/native bindings plus references to the separate BEN/BFA/GHA source parts; it does not embed those neighboring source geometries.
The current-main constructor output .cache/delivery-handoff/tgo427-native-authority-current-main-001/constructor-result.json (45,039 bytes; SHA-256 a3ad7a15f4c5a3a432926af87a34b4e0547fe74d1b860bb5c1d3eb74a69cc241) contains 17 ledger_rows base_geometry polygons from the same pinned TGO source family. It is a candidate technical constructor output, not an acceptance or credit record; the attribution and recorded share-alike treatment above apply to these embedded polygons as well.
The supported-inputs projection .cache/delivery-handoff/tgo427-supported-inputs-current-main-002/source-evidence.json (50,059 bytes; SHA-256 67ef56c920943d514e0feb678df39ace991cf92167e60863e16f6ee1c1b27166) carries 17 of those target records with their embedded TGO source-feature polygons. It is a projection of the same recorded source asset, not a new capture; the attribution and recorded share-alike treatment above apply to those polygons as well.

The separate immutable physical-stage input `.cache/tgo-private-stage-input-427-canonical-targets-v2.json` (original commit `3282f407a164b1d581a640b9b8ba3b07cb76c15d`, blob `6bdb928c216dfb30e924942b2de3f9121911d151`, 103,859 bytes, SHA-256 `fd11fc7a43faba869241f58e428d7344adad5a6ff1961f643feccbc04555b409`) binds 18 consumed TGO source features by their recorded shape IDs to 18 selected target features. Its `consumed.geometry` entries are the same TGO source polygons covered by this notice; its separate `selected.geometry` entries are the selected WorldAtlas target geometries, not part of the TGO source asset. The stage input is included as an immutable evidence operand and does not represent a new source or a geometry rerun.

Attribution for those embedded polygons: **Togo ADM2 prefecture boundaries, geoBoundaries record TGO-ADM2-56601680, source OpenStreetMap/Wambacher, represented 2017; geoBoundaries metadata states CC BY-SA 2.0.** Preserve this attribution and the recorded license link when redistributing the polygons. If the polygons are adapted, identify the changes and apply the recorded share-alike terms to the adapted geometry as required by the license. This notice does not assert that unrelated WorldAtlas code or native-grid assignment data are derivatives of the TGO polygons.

## Physical support evidence (GSHHG)

The retained physical-support result also uses the separate GSHHG physical source, not the TGO ADM2 source. Its source member is `gshhs_f.b` from GSHHG v2.3.7 (June 15, 2017), by Paul Wessel and Walter H. F. Smith. The exact source archive is `https://www.soest.hawaii.edu/pwessel/gshhg/gshhg-bin-2.3.7.zip` (118,617,033 bytes; SHA-256 `28600e8f7a08645aab43079326df6504212ec5ccb2b4bcf3b5f4f12ed60e82bc`); the retained full-resolution member SHA-256 is `af9215d58ebc525b2d09654a89959829f09e6edc457f3666759cded37be4ecf6`. The original custody record is commit `f8f99612e4d83d561b370189a1969c3e4301a1e3`.

The physical diagnostic output is `coordination/engineering/tgo-original-disposition-20261026/private-physical-stage-prep-20261026/physical-run-002/whole-target-support.json` (original commit `1170b5b31650c720d78ce8be9a21368e68fd5073`, blob `961b7c95557feb6df41627d7e05fe47591997fae`, 113,596 bytes, SHA-256 `d91f86e4c3f51a083f4ae9e2a708612860bdaca5372f98945d429aa97edc869e`). It records 18 target results and five derived geometry fields; it is not the complete GSHHG database. Its GSHHG source-member and chunk receipts remain pinned in the artifact.

The NOAA NCEI shoreline page identifies GSHHG v2.3.7 and states that it is distributed under LGPL; the retained GSHHG `LICENSE.TXT` specifies LGPL version 3 or later. The exact license texts accompany this evidence at `coordination/engineering/global-physical-sources-20261006/LICENSE.TXT` (1,375 bytes; SHA-256 `dc53a4833bf9121360a5286917683f041439327353ffe0231206c6b746005b81`) and `COPYING.LESSERv3` (7,816 bytes; SHA-256 `ea7d049c7705dc13afc202dd18e1827f3484f8212fd3fa7b82fc4a0c363432c9`). Attribute the dataset to Paul Wessel and Walter H. F. Smith, and retain the license notices. The source notice asks authors to be notified if changes are made to the GSHHG dataset for commercial use; this work did not modify that dataset. Source information: <https://www.ngdc.noaa.gov/mgg/shorelines/shorelines.html>.

## Provenance limit

The metadata has no `sourceDataURL`; `licenseDetail` is `nan`; no upstream capture/extract date is recorded. The Wambacher viewer URL is not an exact data-extract locator. `sourceDataUpdateDate` (2023-01-19) is the repository integration date, and `buildDate` (2023-12-12) is the geoBoundaries build date, not the source capture date. The record supplies an explicit CC BY-SA 2.0 claim and no asset-specific prohibition; the upstream extract lineage and capture date remain unverified.
