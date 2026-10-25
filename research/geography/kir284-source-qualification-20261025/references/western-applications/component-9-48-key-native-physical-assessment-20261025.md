# KIR source component 9 — 48-key native/physical evidence assessment

Date: 2026-10-25. This is a bounded read-only application of the retained held roster, source-component/native crosswalk, and physical-001 output. It does not repeat legal/source discovery or change a claim, owner, disposition, credit, issue, stock, or release.

## Exact subset and reproducible key binding

The 48 exact held keys are those rows in `held-284-keys.json` with `source_component == 9` **and** `owner == 26615`; owner disambiguates component numbering because another source owner also has a component numbered 9. All 48 carry source index 41033 and held reason `no-current-component-intersection-and-no-affirmative-complete-western-scope-record`.

- Complete held roster: task-local `held-284-keys.json`, SHA-256 `889ae5dc339ed0f0132aa3ef1cdac5d846adada553fdab78b5fcb18d19806469`. It pins original disposition at commit `5c65b213d005607e769af66d39bf03d4554882d6`, blob `77a0083bce6d06a18c5b0ba60ce396521490b100`, SHA-256 `3762732e7a11262d7f41088ea5d6ad315b10988099286c52d533073ea2576452`.
- Coordinate subset digest: SHA-256 `85b7d0510a7b9493ef41a5bea66e9bf2c4ad05ef3cd4091e98f31eebd0fcf0d3`, over the 48 `[y,x]` pairs in frozen roster order encoded as compact UTF-8 JSON with no trailing newline (769 bytes).
- Full-row subset digest: SHA-256 `4926de1b722d7480884b34a5a1db769ea6f277158418cbbe865ec40a7a710e65`, over compact UTF-8 JSON, no trailing newline, of each frozen row's `[y,x,source_index,source_component,owner,reason]` (5,521 bytes).
- Per-key crosswalk table: [`component-9-48-key-per-key-evidence-20261025.csv`](component-9-48-key-per-key-evidence-20261025.csv), 48 data rows, SHA-256 `313b64319a8200feda8875d19f3c33105141010965fcd438ffd76afe6012c165` (12,183 bytes). It reports the stored component-total result and explicitly marks per-key physical rows as absent.

The component-9 crosswalk intervals expand to exactly the same 48 `(y,x)` pairs; no geometry was recomputed. The crosswalk record has 21 intervals, `requested_cells: 48`, owner 26615, source feature `gb:KIR:ADM1:97431129B36644055464690`, and source-component coordinate digest `da5137766d597b17400ee28530fbccd8bde47f5cfb134689705f4d38a3bfb8aa`.

## What the native record establishes

The retained crosswalk is `coordination/engineering/kiribati-repair-delivery-20261016/source-review/source-component-native-crosswalk.json` at `5c65b213d005607e769af66d39bf03d4554882d6`, Git blob `23aed23b0a2e92adb94a938953ac70fd8a40c806`, SHA-256 `284c38487a4a6c485d96b965e19aa2e00339bc0dc1ae0440bf3561af750a8e37`.

It pins the 2017-represented original source payload (gzip SHA-256 `629aa7f89251bba5a44d36d95c6fbd81f3afc24d4e017dcd4b07daa73c08a74b`; decoded SHA-256 `a2e55d40d5a45738a1927b1c3c4334c9bae73466cca2f96c7f7a0aa440ed8f81`), the native row-latitude input (gzip SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`; decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`), the native scanner `src/native-grid.js` at baseline `e143ae59177efa2114e9075dac2d99008ed43894` (SHA-256 `fab520ead243d13efb9231fd8b15c567554274d343c3746dd5be06fb25ff20ee`), and the baseline current whole-part input `data/geography/part-13.json` (SHA-256 `90b032861ecae8a4df9a8b5386eccfb20a7243c264dbf79994b54c5297e6f6c1`).

For owner 26615/component 9, the retained aggregate says `current_target_center_cells: 0` over exactly these 48 requested cells. Therefore none of these 48 is counted as a current-target native-center match in that stored crosswalk. It is a component-total negative, not 48 separately retained point-witness rows. It supports keeping the component outside the current native target-center match; it does not establish present ownership, a Kanton council boundary, or source/legal eligibility.

## What physical-001 does not establish per key

The exact retained output is `coordination/engineering/kiribati-repair-delivery-20261016/physical-001/whole-target-support.json` at the same pinned commit, Git blob `1fe2f786a667b0a8ca17c2650c5a84938afd4f02`, SHA-256 `1caa825840869441e4acc3dc427b2eff145bb252f12c61b2d88ef5690ede8624` (1,930,368 bytes). Its scope states GSHHG source-relative support for whole consumed targets, with heterogeneous observation dates and physical-authority limits. It has three target-feature records; the owner-26615 feature record has 5,986 source-ID queries, 5,987 query relations, and two reconstruction issues (`missing_reconstruction` and `extra_reconstruction`). Its fields are target/source query relations and target-level geometries (`mapped_land_support`, `mapped_inland_water_support`, `outside_mapped_L1_context`, and related support); no row is keyed by these 48 `(y,x)` cells and no per-key land/water/outside predicate is present.

Thus the retained evidence supports the native component-total result above, but **does not itself contain a per-key physical application** for any of the 48 keys. The exact missing item is a physical support result/join keyed by the 48 native cells (or a separately run, pinned point/footprint-to-physical-support application using the retained physical polygons and pinned native latitude/longitude method). Center membership, if computed, would remain source-relative and would not establish whole-cell support or present-day ground truth. No such new computation was run here.

## Decision

Per key: source-component identity and membership in the 48-key native crosswalk interval set are confirmed; the stored crosswalk's 0/48 aggregate places none in the current-target center set; individual native witness rows are not retained; and physical per-key classification is unavailable in physical-001. The four/280 held-set partition remains untouched. No legal qualification, owner, disposition, or credit follows from this assessment.
