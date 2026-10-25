# KIR component 9: retained physical-support center application

Date: 2026-10-25. Bounded application of only the frozen 48 component-9 keys to the retained `mapped_land_support` geometry for target `gb:KIR:ADM1:97431129B36644055464690`. No new GSHHG fetch, legal/source search, claim, issue/PR, owner/disposition, credit, stock, or release action.

## Frozen key subset

Input key rows were reused from [`component-9-48-key-per-key-evidence-20261025.csv`](component-9-48-key-per-key-evidence-20261025.csv), 48 rows, SHA-256 `313b64319a8200feda8875d19f3c33105141010965fcd438ffd76afe6012c165`. The exact coordinate-set digest remains SHA-256 `85b7d0510a7b9493ef41a5bea66e9bf2c4ad05ef3cd4091e98f31eebd0fcf0d3` over compact UTF-8 JSON pairs `[y,x]` in frozen roster order, no trailing newline. Each row is owner 26615, source index 41033, source component 9. The pinned component-9 crosswalk has the same 48 keys in 21 half-open intervals and records `current_target_center_cells: 0`; that is a separate native target-center result.

## Pinned inputs and method

- Retained physical output: `coordination/engineering/kiribati-repair-delivery-20261016/physical-001/whole-target-support.json`, commit `5c65b213d005607e769af66d39bf03d4554882d6`, Git blob `1fe2f786a667b0a8ca17c2650c5a84938afd4f02`, SHA-256 `1caa825840869441e4acc3dc427b2eff145bb252f12c61b2d88ef5690ede8624`. The selected record is the exact source ID above, field `support.mapped_land_support`, type `MultiPolygon` (51 polygons, 624 vertices total).
- Native row-latitude input: `research/shared/native-row-latitudes.f64le.gz`, commit `5b32388df0501b013ac9a3ba97864932db493d59`, 262,166 little-endian binary64 rows; compressed SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`, decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23` (2,097,328 bytes).
- Longitude used the pinned native center rule `-180 + (x + 0.5) * 360 / 262166`; latitude was read from `latitudes[y]` in the pinned table. Polygon membership used even-odd ring membership across exterior and hole rings, explicit exact on-segment detection, and no tolerance/epsilon. Binary64 point/vertex values were compared as their exact rational values. No source geometry was fetched or modified.

## Result

**48 centers inside `mapped_land_support`; 0 boundary; 0 outside.** The per-key outcomes are in [`component-9-48-key-physical-center-results-20261025.csv`](component-9-48-key-physical-center-results-20261025.csv), 48 rows, SHA-256 `f756914f744147849435ceb8bb6ce51c32773c5b74a9057a222ce93d93947dbc` (6,023 bytes). Every row records the same exact target ID and its individual `inside` result.

This is a new per-key representative-point predicate against retained GSHHG-derived mapped-land support. It does not override the crosswalk's zero current-target native-center result, because these are different geometries/predicates. It establishes only source-relative center contact: not full-cell containment, current ground conditions, legal/council boundary, source eligibility, or permission to release the existing hold. The retained physical artifact remains whole-target evidence with heterogeneous observation dates and target-level reconstruction issues.
