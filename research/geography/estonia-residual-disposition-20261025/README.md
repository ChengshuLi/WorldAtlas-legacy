# Estonia exact-date application for the 2,672 identity-held cells

Recorded 2026-10-25. This is an aggregate-only source-application supplement and differentiated disposition proposal. It is not an acceptance, ownership change, authoritative geometry repair, selected-owner observation, or request to restore credit.

## Preserve original accounting

The original Estonia package denominator is **34,461 native cells**. Root-accepted prior positive credit is **30,621** and remains untouched. The previously held residual is **3,840**, divided here into **2,672 identity-held cells** addressed by this supplement and **1,168 territorial-conflict cells not tested here**. The 1,168 remain separate and pending. This note must not turn a 2,672-cell supplement into blanket disposition of the 3,840 residual.

Exact 2,672 key-set SHA-256: `6bce773f0ad7e38594bd8d289e7bfa5ee3af808ce6e029c30d8af2226a3f3a01`; key coordinates and per-key rows remain private and are not included. Group counts are Maidla 45, Kaarma 1,101, and Laane-Saare 1,526. The prior 34,461-cell native observation and its 30,621/3,840 accounting were not rerun; the observation is ownership evidence, not source qualification.

## Source route and exact-date method

The source input remains the original geoBoundaries Estonia ADM2 simplified source, represented as 2017/CRS84 in its existing assessment, not silently repaired or reinterpreted. Original decoded source SHA-256 is `2e69faa7fd86ebf7e6299e6cb5cf613979406d8310a5a98ce6cd485824bc72bd`. Existing assessments, source bytes and prior physical/source-family findings remain preserved in #2394's evidence at `coordination/engineering/estonia-native-repair-20261017/`.

The deciding route used the official Estonian Maa-amet historical WFS layer `ms:omavalitsused_2017`, “Municipality 01.01.2017”. Public discovery context: [Maa-amet historical administrative-division data](https://geoportaal.maaruum.ee/est/ruumiandmed/haldus-ja-asustusjaotus/ajalooline-haldusjaotus-p827.html) and [Maa-amet map-layer catalogue](https://geoportaal.maaamet.ee/est/kaardirakendused/maainfo-x-gis-2/rakenduse-kirjeldus/kaardikihtide-kataloog-p912.html). The official 2013 merger act is [Regulation 103](https://www.riigiteataja.ee/akt/104072013014); the 2014 merger act is [Regulation 15](https://www.riigiteataja.ee/akt/129082014015).

Only the two exact successor features needed for these original groups were requested in January 2017 GML; no second full-country layer or broad quota search was performed. Lüganuse's Jan 1 feature is valid Polygon, 54,695 bytes, SHA-256 `556e32fa3d25dba82bf6e5e05e1d52a1a57a23ffcd30f701b71a3c25a6fcde3f`. Lääne-Saare's Jan 1 feature is valid MultiPolygon, 2,025,467 bytes, SHA-256 `dc8b1fe2e50feab42e573fb145822462caa46b6845958b1109225c215cdde128`. Both GML bodies explicitly declare `srsName="urn:ogc:def:crs:EPSG::3301"`. Their XSD metadata, body pins and independent aggregate comparison are retained in the local research handoff; this public note intentionally excludes raw feature geometries and exact keys.

Native cell centres use the existing 262,166-grid longitude definition and pinned binary64 row-latitude table from commit `5b32388df0501b013ac9a3ba97864932db493d59` (compressed SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`; decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`). Centre points were transformed from traditional GIS EPSG:4326 longitude/latitude to EPSG:3301 using GDAL/PROJ, while the official GML polygons were left in their explicitly declared native CRS. Datum-operation/grid details were not separately pinned; this is not survey-grade or legal boundary adjudication.

## Results, kept distinct by group

| Original source feature | Exact official 01.01.2017 successor tested | Centre containment in successor | Exact-date negative within same target |
|---|---|---:|---:|
| Maidla vald (45 cells) | Lüganuse vald | 22/45 | 23 outside the successor (neither Contains nor Intersects) |
| Kaarma vald (1,101 cells) | Lääne-Saare vald | 1,026/1,101 | 75 outside the successor (neither Contains nor Intersects) |
| Laane-Saare (1,526 cells) | Lääne-Saare vald | 1,428/1,526 | 98 outside the successor (neither Contains nor Intersects) |
| **Total** | | **2,476/2,672** | **196/2,672** |

For corroboration, the previous 15.10.2017 official layer `ms:omavalitsused_2017_ref` yields matching center counts after treating its invalid raw Lääne-Saare geometry only as a sensitivity case. That full response contains 213 official features, of which 64 have invalid original geometry; raw Contains on Lääne-Saare was not meaningful. A separate MakeValid sensitivity gave the same counts (1,026/1,101 and 1,428/1,526), but is not treated as authoritative. The 01.01.2017 valid GML features are the primary result here; no MakeValid was applied to them. The 15 October response additionally found no contact with any of its 213 local features for the respective 23/75/98 unmatched centres. These comparisons preserve the distinction between raw invalidity and repaired sensitivity.

Existing source-to-successor planar intersection-area ratios (not geodetic area) are 99.846% Maidla/Lüganuse, 99.446% Kaarma/Lääne-Saare, and 99.248% Laane-Saare/Lääne-Saare. They are context, not a pointwise decision or authority.

## Differentiated proposal and limits

1. **2,476 exact-date successor-contained centres:** retain their existing identity holds pending an affirmative target-semantic decision. The official 2017 successor geometry establishes a specific spatial crosswalk for these centres, but does not establish that the Atlas's historical target owner should be replaced by the successor, that a current successor is the requested 2017 identity, or that cells may be transferred. Offer this group for root's source-relative review as a resolved geographic overlap with unresolved target semantics, not as accepted support.
2. **196 exact-date non-contained centres:** retain as a distinct finite source-relative negative result (23/75/98 by group). The exact official-date comparison found no containing/intersecting successor, and the full 15 October comparison found no contact with its local official municipal polygons. This is a concrete, differentiated unresolved candidate only if root independently confirms that the comparison addresses the applicable target semantics and that the existing source/physical evidence plus reasonable qualification routes are otherwise exhausted. No automatic unresolved credit is asserted.
3. **1,168 territorial-conflict cells:** not part of this test or proposal; keep pending, unchanged.

The original issue acceptance remains incomplete. Root's separate review support is recorded at [#2649 comment 6394085120](https://github.com/ChengshuLi/WorldAtlas/issues/2649#issuecomment-6394085120); that support is not science acceptance or ledger credit. Preserve the 30,621 previously accepted cells, all 3,840 residual holds, all owner identities and the complete original 34,461 denominator unless and until root records an actual accepted disposition. No location/owner or geometry mutation is proposed. No selected-owner observation, source qualification rerun, broad national sweep, agency outreach, or denied-source retry was performed. The previously observed HTTP 403 on the Maa-amet landing-page refresh remains preserved; WFS content had been obtained via the originally verified public endpoint, and no bypass or alternate restricted route was used.
