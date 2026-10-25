# KIR component 10: retained native and physical application

Date: 2026-10-25. Read-only application to the exact 22 held keys in source component 10, source index 41033, owner 26615. No GSHHG fetch, claim/credit change, issue/PR action, or stock work.

## Exact keys and retained native result

- `research/KIR/held-284-keys.json` SHA-256: `889ae5dc339ed0f0132aa3ef1cdac5d846adada553fdab78b5fcb18d19806469`.
- Component-10 filter yields 22 unique keys. The exact subset SHA-256 is `894543bbbe7575a5a0a3ccd248a3a5d726b8bc1aa4a335393edab22f8e289886`, computed from manifest-order compact UTF-8 JSON of `[y,x,source_index,source_component,owner]` tuples, with no trailing newline (683 bytes).
- The pinned crosswalk is at commit `5c65b213d005607e769af66d39bf03d4554882d6`, path `coordination/engineering/kiribati-repair-delivery-20261016/source-review/source-component-native-crosswalk.json`, Git blob `23aed23b0a2e92adb94a938953ac70fd8a40c806`, SHA-256 `284c38487a4a6c485d96b965e19aa2e00339bc0dc1ae0440bf3561af750a8e37`.
- Its component-10/owner-26615 row binds source ID `gb:KIR:ADM1:97431129B36644055464690`, 22 requested cells in 11 intervals, and coordinate digest `b21d65d0423ff02ea9c476c860e3077319df84f97924798d1ae46a86dbe388bc`. Expanding the intervals matches the task-local roster exactly (22/22; no missing or extra keys). The retained `current_target_center_cells` result is 0/22, so none of these centers is in the current target under that native center predicate.
- Source-original geometry is pinned by SHA-256 `629aa7f89251bba5a44d36d95c6fbd81f3afc24d4e017dcd4b07daa73c08a74b` (decoded SHA-256 `a2e55d40d5a45738a1927b1c3c4334c9bae73466cca2f96c7f7a0aa440ed8f81`). The native latitude table is `research/shared/native-row-latitudes.f64le.gz`, commit `5b32388df0501b013ac9a3ba97864932db493d59`, compressed SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`, decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23` (262,166 little-endian float64 rows). The table value at index `y` was used directly.

## Retained mapped-land center application

The physical-001 result is `coordination/engineering/kiribati-repair-delivery-20261016/physical-001/whole-target-support.json`, pinned at the same commit, blob `1fe2f786a667b0a8ca17c2650c5a84938afd4f02`, SHA-256 `1caa825840869441e4acc3dc427b2eff145bb252f12c61b2d88ef5690ede8624`. The tested geometry is the exact JSON value at `/results[target=gb:KIR:ADM1:97431129B36644055464690]/support/mapped_land_support`, a 51-part MultiPolygon.

For each frozen key, longitude was computed in binary64 as `-180 + (x + 0.5) * 360 / 262166`; latitude was taken from the pinned native row table. Membership used even-odd ring crossings across exterior and hole rings, explicit exact on-segment detection, and no tolerance, following the documented component-11 application method. Each point was tested against the retained mapped-land MultiPolygon only.

| y | x | Result |
|---:|---:|---|
| 129975 | 257077 | inside |
| 129976 | 257073 | inside |
| 129976 | 257074 | inside |
| 129976 | 257075 | inside |
| 129976 | 257076 | inside |
| 129976 | 257077 | inside |
| 129977 | 257073 | inside |
| 129977 | 257074 | inside |
| 129977 | 257075 | inside |
| 129977 | 257076 | inside |
| 129977 | 257077 | inside |
| 129978 | 257075 | inside |
| 129978 | 257076 | inside |
| 129978 | 257077 | inside |
| 129979 | 257076 | inside |
| 129979 | 257077 | inside |
| 129980 | 257077 | inside |
| 129981 | 257077 | inside |
| 129989 | 257080 | inside |
| 129990 | 257080 | inside |
| 129991 | 257082 | inside |
| 129991 | 257083 | inside |

Result: **22 inside, 0 boundary, 0 outside** the retained mapped-land support polygon. This is representative-center contact only. The physical artifact is a source-relative, whole-target GSHHG result with heterogeneous observation dates and authority limitations; this application does not establish full-cell support, contemporaneous land truth, legal ownership, or qualification. The separate crosswalk 0/22 current-target-center result remains distinct from this 22/22 mapped-land center result. No held disposition or credit is changed.
