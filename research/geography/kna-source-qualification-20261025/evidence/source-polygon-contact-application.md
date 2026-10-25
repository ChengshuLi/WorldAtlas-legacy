# KNA: frozen-key source-polygon contact application

Date: 2026-10-25. Read-only center-point application of the exact frozen 305-key inventory to its own retained source feature and the other 13 retained ADM1 source features. This tests contact with the original source polygons only; it is not a legal-boundary, ownership, current-ledger, or qualification result.

## Byte custody and identity checks

- Retained source archive `assets/gb-KNA-ADM1-000.bin.gz`: 3,557 compressed bytes; compressed SHA-256 `618711a0aee394b225561fa108794b4e2c7bd7530c52ed46f9c0e5b3d3f659ed` (matches parent-pinned value). Decompressed GeoJSON: 14,698 bytes; SHA-256 `5d94bc5303f78b68e4f0ba5783611f7c292540e72776aa236c53883560d1ebcd` (matches retained inventory and expected value). Recorded Git blob: `4157d03fce6f43d7d16e98a83ef4df26c7709b1f`.
- Native row-latitude table `research/shared/native-row-latitudes.f64le.gz`: 1,851,757 compressed bytes; compressed SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147` (matches parent-pinned value). Decompressed table: 2,097,328 bytes, 262,166 little-endian f64 rows; SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23` (matches parent-pinned value). Table commit: `5b32388df0501b013ac9a3ba97864932db493d59`.
- The decompressed source is a 14-feature GeoJSON FeatureCollection. Each of the ten frozen `shape_id` values matches one source `shapeID`; the ten `shapeName` values match the frozen inventory names. The source geometries are Polygon features.

## Method and results

For each inventory `(x,y)`, longitude was calculated in binary64 from the native grid as `((x + 0.5) * 360 / 262166) - 180`; latitude was taken exactly from the verified table at index `y`. A point-in-polygon test evaluated each center against its recorded source polygon and against all other 13 source polygons, honoring holes. The initial boundary predicate used a `1e-12` degree tolerance. I then reran only the predicate on the same verified centers/geometries with **exact binary64 comparisons**: segment cross-product must equal `0.0`, and coordinates must lie within exact segment bounds; no epsilon was used.

| Original source feature | Feature index | Frozen keys | Inside own polygon | On own boundary | Outside own polygon | Contact with any other feature |
|---|---:|---:|---:|---:|---:|---:|
| Saint Anne Sandy Point | 41036 | 7 | 7 | 0 | 0 | 0 |
| Saint George Basseterre | 41037 | 191 | 191 | 0 | 0 | 0 |
| Saint James Windward | 41039 | 8 | 8 | 0 | 0 | 0 |
| Saint John Capisterre | 41040 | 14 | 14 | 0 | 0 | 0 |
| Saint John Figtree | 41041 | 31 | 31 | 0 | 0 | 0 |
| Saint Paul Capisterre | 41043 | 11 | 11 | 0 | 0 | 0 |
| Saint Paul Charlestown | 41044 | 1 | 1 | 0 | 0 | 0 |
| Saint Thomas Lowland | 41046 | 17 | 17 | 0 | 0 | 0 |
| Saint Thomas Middle Island | 41047 | 3 | 3 | 0 | 0 | 0 |
| Trinity Palmetto Point | 41048 | 22 | 22 | 0 | 0 | 0 |
| **Total** | **10** | **305** | **305** | **0** | **0** | **0** |

No key exceptions were found: every frozen center falls inside its recorded source feature and outside the other 13 source features. The exact-comparison pass returned the same classification for every key as the tolerant pass: 305 inside own feature, 0 boundary, 0 outside, and 0 contact with another feature. Thus no center's classification changes under exact boundary semantics.

## Rights and scope limit

The retained KNA catalogue records CC BY-SA 2.0, citing OpenStreetMap's copyright page; that page distinguishes OSM data (ODbL 1.0) from OSM documentation (CC BY-SA 2.0), so the catalogue may conflate data and documentation licensing. geoBoundaries' general `gbOpen` page states CC BY 4.0, but this project-level statement does not by itself resolve the exact license mix or downstream rights for this OSM-derived retained source. The source-specific rights question remains unresolved.

This confirms that the exact frozen keys contact their recorded retained source polygons. It does not establish an official/legal parish boundary, effective date, current owner, accepted-ledger status, or entitlement to repair/researched-unresolved credit. No inventory, disposition, ownership, or claim was changed.
