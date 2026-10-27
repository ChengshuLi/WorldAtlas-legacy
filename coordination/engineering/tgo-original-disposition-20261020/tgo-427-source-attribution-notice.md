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

The separate immutable physical-stage input `.cache/tgo-private-stage-input-427-canonical-targets-v2.json` (original commit `3282f407a164b1d581a640b9b8ba3b07cb76c15d`, blob `6bdb928c216dfb30e924942b2de3f9121911d151`, 103,859 bytes, SHA-256 `fd11fc7a43faba869241f58e428d7344adad5a6ff1961f643feccbc04555b409`) binds 18 consumed TGO source features by their recorded shape IDs to 18 selected target features. Its `consumed.geometry` entries are the same TGO source polygons covered by this notice; its separate `selected.geometry` entries are the selected WorldAtlas target geometries, not part of the TGO source asset. The stage input is included as an immutable evidence operand and does not represent a new source or a geometry rerun.

Attribution for those embedded polygons: **Togo ADM2 prefecture boundaries, geoBoundaries record TGO-ADM2-56601680, source OpenStreetMap/Wambacher, represented 2017; geoBoundaries metadata states CC BY-SA 2.0.** Preserve this attribution and the recorded license link when redistributing the polygons. If the polygons are adapted, identify the changes and apply the recorded share-alike terms to the adapted geometry as required by the license. This notice does not assert that unrelated WorldAtlas code or native-grid assignment data are derivatives of the TGO polygons.

## Provenance limit

The metadata has no `sourceDataURL`; `licenseDetail` is `nan`; no upstream capture/extract date is recorded. The Wambacher viewer URL is not an exact data-extract locator. `sourceDataUpdateDate` (2023-01-19) is the repository integration date, and `buildDate` (2023-12-12) is the geoBoundaries build date, not the source capture date. The record supplies an explicit CC BY-SA 2.0 claim and no asset-specific prohibition; the upstream extract lineage and capture date remain unverified.
