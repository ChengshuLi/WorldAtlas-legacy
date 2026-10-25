# KIR component 11: retained native and physical application

Date: 2026-10-25. Read-only research on the 111 held keys in source component 11 (source index 41033, owner 26615). No boundary/legal qualification, current-ledger comparison, owner/disposition change, credit, issue/PR action, or release.

## Exact subset and pins

- Filtered `research/KIR/held-284-keys.json` by `source_component == 11`: 111 rows. The inventory file SHA-256 is `889ae5dc339ed0f0132aa3ef1cdac5d846adada553fdab78b5fcb18d19806469`.
- Exact subset SHA-256: `22618a4281e0f73a10aa42ef0477360e5d48cb5d354506dc1c07ee8c6fe1b5b4`. Serialization is compact UTF-8 JSON, no newline, manifest-order array of `[y,x,source_index,source_component,owner]` tuples. All rows have source index 41033, component 11, owner 26615. The exact rows are recoverable by the stated filter; y spans 129893–129972 and x spans 257037–257073.
- Pinned source-component/native crosswalk at commit `5c65b213d005607e769af66d39bf03d4554882d6`, path `coordination/engineering/kiribati-repair-delivery-20261016/source-review/source-component-native-crosswalk.json`, blob `23aed23b0a2e92adb94a938953ac70fd8a40c806`, file SHA-256 `284c38487a4a6c485d96b965e19aa2e00339bc0dc1ae0440bf3561af750a8e37`.
- Its component 11 record for owner 26615 has 111 requested cells; its half-open requested intervals expand to exactly the 111 held-manifest keys (zero missing/extra), coordinate digest `b0e94fdf54185b7a6b57a1f70c82acf21bb6bf6ffc4762e6e7901212c45a376f`, and `current_target_center_cells: 0`. Do not confuse this with the separate component-11 record for owner 26616 (17 keys).
- Crosswalk current target input: `data/geography/part-13.json`, commit `e143ae59177efa2114e9075dac2d99008ed43894`, blob `44f886df47aa3e313f0c2ce98faea045e2eba8ed`, SHA-256 `90b032861ecae8a4df9a8b5386eccfb20a7243c264dbf79994b54c5297e6f6c1`. Original source payload: `gb-KIR-ADM1-000.bin.gz`, SHA-256 `629aa7f89251bba5a44d36d95c6fbd81f3afc24d4e017dcd4b07daa73c08a74b`; decoded SHA-256 `a2e55d40d5a45738a1927b1c3c4334c9bae73466cca2f96c7f7a0aa440ed8f81`. Crosswalk latitude table decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`; the retained local copy matches that hash and contains 262,166 rows. Scanner `src/native-grid.js` is pinned by the crosswalk to SHA-256 `fab520ead243d13efb9231fd8b15c567554274d343c3746dd5be06fb25ff20ee`.

## Native result

The exact crosswalk intervals and held-key subset are identical. Its zero-count result for `current_target_center_cells` therefore gives the same component-level result for each of these 111 keys: **0/111 centers in the current target; each is outside under this native target-center predicate**. This is not current legal ownership, island identity, full-cell exclusion, or a new qualification result.

## Physical-support result

The retained `physical-001/whole-target-support.json` is blob `1fe2f786a667b0a8ca17c2650c5a84938afd4f02`, file SHA-256 `1caa825840869441e4acc3dc427b2eff145bb252f12c61b2d88ef5690ede8624`. Its scope is diagnostic GSHHG source-relative support for whole consumed targets with heterogeneous observation dates and physical-authority limits. GSHHG member `gshhs_f.b` is identified by SHA-256 `af9215d58ebc525b2d09654a89959829f09e6edc457f3666759cded37be4ecf6` (original ZIP SHA-256 `28600e8f7a08645aab43079326df6504212ec5ccb2b4bcf3b5f4f12ed60e82bc`).

I applied the 111 exact centers to the retained `mapped_land_support` MultiPolygon for target `gb:KIR:ADM1:97431129B36644055464690`, the source ID on the owner-26615 component-11 crosswalk row. For each key, longitude used the pinned native center rule `-180 + (x + 0.5) * 360 / 262166`; latitude came directly from the pinned 262,166-row table. Polygon membership used even-odd ring membership with holes, explicit on-segment detection, and no tolerance. Result: **111 inside, 0 boundary, 0 outside** the retained GSHHG mapped-land support geometry.

This is a newly applied representative-point predicate against the retained physical-support geometry, not an existing per-key field in physical-001. That artifact itself records source-polygon relations for whole targets (including target-level GSHHG queries), not native cells. The application establishes center contact only: no whole-cell containment, present-day land truth, temporal/legal status, or independent validation of GSHHG topology. Component 11 remains held for the original unresolved western-scope/source qualification; this result does not clear it.
