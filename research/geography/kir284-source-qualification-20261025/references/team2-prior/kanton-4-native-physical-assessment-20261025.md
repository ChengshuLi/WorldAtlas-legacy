# KIR Kanton four: retained native and physical evidence

Date: 2026-10-25. Read-only assessment of the existing KIR held-key inventory and published source/native/physical evidence. No geometry or qualification program was rerun; no issue, claim, ledger, stock, credit, or release state changed.

## Exact held-key binding

The exact four keys are `(y,x)`: `(133102,6032)`, `(133102,6041)`, `(133170,6102)`, `(133171,6100)`. Each is owner 26615, source index 41033, source component 1. The 284-row held roster in `held-284-keys.json` has file SHA-256 `889ae5dc339ed0f0132aa3ef1cdac5d846adada553fdab78b5fcb18d19806469`; its pinned source disposition has SHA-256 `3762732e7a11262d7f41088ea5d6ad315b10988099286c52d533073ea2576452` and Git blob `77a0083bce6d06a18c5b0ba60ce396521490b100`.

For this four-key subset, I filtered the existing manifest's rows by `source_component == 1` and serialized the tuples `[y,x,source_index,source_component,owner]` in manifest order as compact UTF-8 JSON, with no trailing newline. The resulting 113-byte roster has SHA-256 `4c1cd77db59bc3558c2b7e94d61f8223e6094a8f3e547bca5b867706363822e`. This is a new digest of the pinned manifest subset, not a previously published key-set hash.

## Retained native evidence

The original source-component/native crosswalk is pinned at commit `5c65b213d005607e769af66d39bf03d4554882d6`, path `coordination/engineering/kiribati-repair-delivery-20261016/source-review/source-component-native-crosswalk.json`, Git blob `23aed23b0a2e92adb94a938953ac70fd8a40c806`, SHA-256 `284c38487a4a6c485d96b965e19aa2e00339bc0dc1ae0440bf3561af750a8e37`. It records 2,836 original native cells and all 45 complete source components as competitors. For component 1 / owner 26615, it records exactly these four original intervals and `current_target_center_cells: 0`; the source-component coordinate digest is `da26af36396b35d748799246943c75fa778423795b5f2af655e1a714cf368b19`. The crosswalk's source original is the 2017-represented KIR payload, SHA-256 `629aa7f89251bba5a44d36d95c6fbd81f3afc24d4e017dcd4b07daa73c08a74b` (decoded SHA-256 `a2e55d40d5a45738a1927b1c3c4334c9bae73466cca2f96c7f7a0aa440ed8f81`); native latitudes are pinned by decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`.

This component-level crosswalk binds the four original intervals to the historical source component and reports zero current-target center cells among them. It supports retaining their exclusion from the western target. It is not a present-day ownership finding and does not establish an effective Kanton council boundary.

The scope-002 qualification patch preparation binds a 2,552-key proposed patch and the 284-key hold set; its patch SHA-256 is `8a8aac6c1dded1586fb8a2f123d0aecde5bf815db12d58d3b773b5c30140db83`. The four keys remain outside that qualified patch. This historical artifact does not restore or expand the current accepted ledger.

## Retained physical evidence and limit

The physical-001 output `whole-target-support.json` is pinned at the same commit, Git blob `1fe2f786a667b0a8ca17c2650c5a84938afd4f02`, SHA-256 `1caa825840869441e4acc3dc427b2eff145bb252f12c61b2d88ef5690ede8624`. Its recorded scope is **GSHHG source-relative support for the three consumed target geometries**, with heterogeneous observation dates and physical-authority limits. Its output contains polygon-source query relations for those target features; it does not contain a per-key physical-support result for the four held Kanton keys. The separate native crosswalk aggregates the four as a component-level count rather than four individual witness rows. The execution receipt was prepared with the same physical-output hash and the retained `qualify-source-cohort.py` program. Therefore the target-level physical comparison cannot supply a missing per-key physical predicate for these four.

## Assessment

The exact native crosswalk confirms the original-component identity and the zero current-target-centre result for the four Kanton keys. The retained physical result does not independently classify those four keys. Their existing `eastern-component-outside-western-target-intent` hold remains supported; no positive eligibility or present-day legal-owner result follows. The separate bounded official-source work records the missing Kanton-specific warrant/order and effective geographic limits. No broader warrant search or alternate route was performed here. Independent review of this exact combined assessment has not yet occurred.
