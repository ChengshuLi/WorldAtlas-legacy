# Niari/Tshela3 lineage addendum v2 — 24 October 2026

Worker `01a16f2e-19a2-7470-acfd-59b39f3e90d1`, native child `residual_land_west`. This continues research32.md without changing its findings or the unread Jentgen obstacle. No geometry, native observation, repair, accepted credit, ownership change, or hold removal.

## Exact identity and scope

The three pending keys are `[14500,134608,140827]`, `[14500,134609,140827]`, `[14500,134609,140828]`. Retained scope32.json already binds their source-center conflict. I decoded the retained COG ADM1 payload only to read feature properties and check whole-file identity, not to rerun geometry. Raw-byte SHA256 is `2aea50c78d9c86139a73dfb72e20e59ae151d1c7d5c0e03bd0482f06e18d340b`, matching the retained catalogue. The exact feature has `shapeID=67827341B58284401685335`, `shapeName=Niari`, `shapeISO=CG-9`, `shapeGroup=COG`, `shapeType=ADM1`. Its properties do not carry an OSM relation ID or extraction timestamp.

## New upstream verification

The official geoBoundaries current metadata endpoint was actually read on this date: https://www.geoboundaries.org/api/current/gbOpen/COG/ADM1/ . It identifies boundaryID COG-ADM1-67827341; represented year2017; source OpenStreetMap,Wambacher; ODbL1.0;12 units; source update19January2023; build12December2023; upstream Wambacher boundary service. Its download URLs still point to9469f09, the same abbreviated release used by the retained catalogue. Represented year, repository update and build dates are different fields; none identifies the original OSM snapshot instant.

GitHub's exact commit API resolved9469f09 to `9469f09592ced973a3448cf66b6100b741b64c0d`, dated2023-12-13T04:03:07Z, tree `88be27c1bb5428b5519b915fdccee7fe9863a6c0`: https://api.github.com/repos/wmgeolab/geoBoundaries/commits/9469f09 . No upstream branch/ref changes were made.

The source archive at that consumed release is a concrete, precisely identified primary archive lead:

https://github.com/wmgeolab/geoBoundaries/blob/9469f09592ced973a3448cf66b6100b741b64c0d/sourceData/gbOpen/COG_ADM1.zip

The authenticated GitHub file read returned Git blob `d772cf20e878c37fe4f56f2d1a7fa002acf4387c`, whose bytes are an LFS pointer, not the ZIP contents. It declares LFS SHA256 `731e08ee7fa47ea55f6393d1d8a4364851ca8c6bc65f3bbc875d57feeca7cc8d`, size440062 bytes. The release metadata JSON itself likewise returned an LFS pointer (Git blob `4cd352c8d1dcf2aa33836e25613a2e4b6b673b6d`, LFS SHA256 `8db0ec703d4d2f9778892e8786bbcd412811fd95f5d3f7eebfde5c611416ae99`,867 bytes). Do not hash these pointers as if they were scientific source bytes.

A bounded history read for `sourceData/gbOpen/COG_ADM1.zip` returned two entries: the19January2023 cleared-history commit `b7dd6a55701c76a330500ad9d9240f2b9997c6a8`, and22October2024 change `fc58a36136bf550fd0f244d7ab82ba5faa94ed4a`. The latter modifies that archive and reports Git blob `d52d0e60afe3a51ec9750496bd4a17e87ed3e973`. It postdates the consumed2023 release and cannot silently replace its source. This small path-history result is not a complete pre2023 provenance history.

## Independent primary archive catalogue lead

The publisher's historical release directory was actually read:
https://www.geoboundaries.org/data/1_3_0/geojson/COG/

It lists `COG_ADM1.zip`, modified2018-04-23 09:36, displayed size134K, alongside separate ADM0/ADM2 archives. The direct listed link is https://www.geoboundaries.org/data/1_3_0/geojson/COG/COG_ADM1.zip . Following that link returned `Unsupported content-type: application/zip` from the web reader. That is a reader-format limitation, not denial, source absence or proof that the archive is corrupt. No file bytes, member names, upstream IDs, license file or geometry equivalence were verified.

This2018 publisher archive offers a finite way to inspect a product near the represented2017 vintage, while the exact consumed-release source ZIP offers the preferred lineage anchor. Their names and dates alone do not prove they contain the same Niari feature.

## Additional checks and exclusions

The recorded Wambacher endpoint https://wambachers-osm.website/boundaries/ returned zero readable lines. The current replacement service https://osm-boundaries.com/ describes itself as a substitute after Wambacher closed in early2020; no current replacement geometry was retrieved or substituted.

A secondary Wikidata page suggested OSM relation3220593 for Niari. Direct OSM relation and history reads returned not accessible in the web reader. Therefore3220593 remains a discovery lead, not an authenticated original OSM identity for this geoBoundaries feature. No history, tags, version or2017 membership was inspected, and no geometric equality inferred.

## Decision and next eligible bounded step

Lineage is narrowed to a verified2017-attributed OSM/Wambacher product with an exact consumed-release LFS object descriptor. This does not establish that its boundary is authoritative at the Tshela3 conflict, and metadata work earns no acceptance credit.

The next bounded action is to obtain the exact440062-byte source ZIP through a supported binary transfer, verify the declared SHA256, and inspect only archive metadata/properties/license and extraction date or OSM identifiers. If an OSM identity/snapshot exists, inspect that exact historical source record; otherwise record the missing lineage field. The2018 publisher archive is a separate comparison lead whose bytes and identity must be independently verified. No side-of-line geometry is authorized by this source-lineage addendum.

All three remain pending/held. No managed slot was used, and no Git mutation occurred. The prior Jentgen DNS/reader obstacle remains unresolved; this independent lineage work did not retry it.
