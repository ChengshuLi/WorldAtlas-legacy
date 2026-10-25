# TGO 60-key foreign-contact source-role proposal

## Scope and recommendation

This source-free proposal covers exactly 60 keys from the original 509-key TGO package. The current audit correction retains the **full 509-key package as pending/suspended in audit**. Root separately accepted the Akébou Q020 disposition for 13 keys; this does not reinstate any of the other 496, which remain pending. This proposal concerns a disjoint 60-key subset of those 496; the remaining 436 keys are outside this proposal and remain pending.

Recommend a **researched-unresolved documented exception** for these 60 keys. This is a proposal only. It does not alter the current ledger, remove any native hold, establish present ownership or a legal boundary, or claim repair credit.

The exact private owner/y/x roster is 60 tuples across 10 owners. Its canonical `owner<TAB>y<TAB>x<LF>` SHA-256 is `0240558df9bfcac6cdaf3b94ed74a385c1d43132e49c39a4078f6edcb5d6062d` (1,200 bytes). A separate private transfer binds each tuple to its original interval, ordinal, question group and retained foreign-contact feature identity; transfer SHA-256 `a92e4e9e6d7a7a4bb55cdb487531580895da7f436eeb2bbe2c0a235455ad5658`. The corresponding source-role receipt is SHA-256 `5a0e328a01bd75f7dfe506013dd5c446909d189e4a345c1f4b5a16bb6cde47c4`. These private row-level artifacts are not included here; no coordinates are published.

The source-free keyset check binds the 60 to the original 509 exact application keys and finds no overlap with the accepted 13-key Akébou cohort. The root’s remaining-496 roster is separately pinned at SHA-256 `24b57eacfd16a0d7c56fddde67947549f39ba1524accacffc0b849af47491824`. The original full509 disposition body is SHA-256 `ee1d291073c6c25a476b9a9e584c05e2142081ee4def27119a6faac95302b56e`. This note does not reclassify the other 496 as accepted or positive.

## What the exact source-role transfer establishes

The retained original contact table associates the 60-key set with seven foreign ADM1 feature identities:

| Country | Foreign ADM1 unit | Retained feature identity | Keys in this cohort |
|---|---|---|---:|
| Benin | Donga | `gb:BEN:ADM1:11314189B13023113934095` | 15 |
| Burkina Faso | Centre-Est | `gb:BFA:ADM1:92566538B37033565003987` | 1 |
| Ghana | North East | `gb:GHA:ADM1:69750345B94584643914501` | 1 |
| Ghana | Oti | `gb:GHA:ADM1:69750345B12045161590865` | 1 |
| Ghana | Northern | `gb:GHA:ADM1:69750345B37738609557703` | 5 |
| Ghana | Volta | `gb:GHA:ADM1:69750345B58204744476950` | 36 |
| Ghana | Upper East | `gb:GHA:ADM1:69750345B7467317238909` | 1 |
| **Total** | **7 identities** |  | **60** |

This resolves the identity of the retained foreign contact objects and their association to the exact original key records. It does not prove that any foreign administrative polygon is a legal border, that the feature was territorially applicable at the original target vintage, or that a key belongs to a foreign unit. All seven foreign operands remain visible; none is excluded by its label or by this proposal.

The retained original-source application CSV (`tgo-509-original-2017-source-application.csv`, SHA-256 `9d474cd5cf1655b97e31d0d02e9772910060c964e5021cc1948823cdeb271b48`) shows these 60 historical centers inside one of ten 2017 TGO ADM2 source features: Agou 8, Assoli 9, Cinkassé 1, Dankpen 4, Danyi 15, Kloto 14, Oti 1, Plaine de Mô 1, Tandjouare 1 and Tchamba 6. In the same original application, 59 have no ADM1 interior hit and one has a Savanes Region hit. These are results against the pinned 2017 source polygons using the native 262,166 grid and exact f64 row-latitude table (compressed table SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`; decoded table SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`). They describe historical source membership and a source-layer coverage difference, not the present boundary or ownership. The table is reused; no geometry or grid application was rerun.

## Official temporal and territorial context

The hash-bound source-role receipt records the following official context. These records help date and identify administrative roles; none supplies a coordinate-bearing legal-boundary match for an individual key in this cohort.

- Ghana Statistical Service’s 2021 PHC Field Operations Handbook (Figure 6) supplies a 2021 regional-map and census context. Ghana’s Ministry of Local Government 2021 Guan District inauguration records that Oti was carved from Volta under a 2019 Legislative Instrument. This is a temporal qualification when reading the 2017-represented source, not proof that any of these contacts was incorrect.
- Benin’s official 2012 TBS administrative map lists 12 departments and 77 communes, including Donga; a 2019 government report confirms Donga local-governance context. Neither record resolves the boundary relation of the 15 keys.
- Burkina Faso’s MATD 2020 Centre-Est material provides administrative-role and neighbor context. A 2021 Burkina Faso–Togo ministry notice says some pre-independence markers were difficult to identify and technical clarification was ongoing. The notice does not identify the single Centre-Est contact key.
- The 2021 Burkina Faso–Ghana Sapiliga/Paga commission notice is regional context, not a location match for the 44 Ghana contacts in this cohort. Burkina Faso’s Finance/DGDT regional profile identifies IGB/BNDT 2012 and DGDT 2021 as map sources; that documents administrative mapping context, not a legal attribution for these keys.

The source-role receipt retains the titles, dates, and source-specific limits above. The findings do not convert contextual documents into a per-key boundary determination.

## Original source, rights, vintage and physical limits

The original TGO target is the geoBoundaries TGO ADM2 payload at release commit `9469f09`, 37 features, CRS84, payload SHA-256 `f0b555060987b20814aaf807c156cecfbe91d822d62e1b1e2920930d910bc291`; the paired ADM1 payload is 5 features, CRS84, SHA-256 `743dc17ca6a926aafe4befc7a9c622149b9b499fbcae1fae150d42948a4a396a`. The ADM2 record represents 2017 and attributes its source to OSM/Wambacher. The geoBoundaries metadata carries a CC BY-SA 2.0 claim, a generic OSM copyright URL and `licenseDetail=nan`; its 2023 integration/build dates are not an OSM extraction date. OSM’s data terms and documentation terms differ: post-2012 OSM data is under ODbL 1.0 while OSM documentation is CC BY-SA. No asset-specific extraction timestamp or license basis has been established for this polygon payload. This is an unresolved lineage question, not a blanket license veto.

The separate geoBoundaries v3.0 TGO ADM2 2016/HDX item is recorded as “Other – Humanitarian.” It is a different source record and is not substituted for the Wambacher/OSM target.

The official Togo Géodata Prefectures file function was previously attempted through its app-defined API at `https://api.geodata.gouv.tg/app/1/get_couche_file` for Prefectures UUID `1fd2b7a3-329c-40f3-813f-7d3397d30ded`. It returned HTTP/2 403 with `{"detail":"Vous n'êtes pas autorisé à avoir accès à la fonctionnalité demandée"}` (response-body SHA-256 `82a20ee7fb89889f58be20fdc98df00812b1130eabd36f4fc0348a16d6c4abf6`); no geometry was returned. This function-access denial is not evidence of a license restriction, source absence or boundary result. No retry or alternative route was used; see the [full retained access record](current-suspended-13-key-proposal.md#official-candidate-access-record). The inherited 11-inside/2-outside comparison is scoped to the separate Akébou13 cohort and is not evidence about these 60 keys.

The historical 509-key packet records the zero-owner selected-native observation, 307 original interval segments, 20 owners, source-candidate and land/water witness joins, and zero water overlap. Those are historical package-level checks, not new measurements for this proposal or proof of present ownership. The exact transfer preserves these 60 rows’ native intervals and recorded physical/source holds; no native hold is removed. The frozen historical foreign-discovery screen retains 58 conservative bounds candidates across seven whole families (774 features), including three unsupported Fiji records. Those failures remain unresolved, and that screen has no per-key candidate-to-TGO target association or individual boundary intersection. The newly bound seven foreign contact identities do not repair that geometric or legal limitation.

## Remaining predicates and effect

For these 60 keys, exact historical TGO ADM2 source membership and per-key retained foreign contact identities are now hash-bound. The unresolved predicates are the applicable territorial role and vintage of the foreign contacts, any authoritative coordinate-bearing boundary evidence that matches the relevant source feature and key, and the original OSM/Wambacher asset’s extract date and rights basis. The named official records above are contextual, not that deciding evidence.

Keep the 60 under the researched-unresolved documented-exception recommendation, with all original foreign operands, physical evidence and native holds preserved. The 436 other keys in the post-Akébou residual are outside this proposal and remain pending. No source geometry, raw coordinate, positive repair, owner change, status change, accounting or credit is proposed.

## Custody references

- Original issue [#2574](https://github.com/ChengshuLi/WorldAtlas/issues/2574) and technical delivery [PR #2575](https://github.com/ChengshuLi/WorldAtlas/pull/2575); the 2017 native application was recorded in `tgo-akebou-native-source-application.md` with exact native table and source pins.
- Current audit correction: [issue #2649, comment 6399293265](https://github.com/ChengshuLi/WorldAtlas/issues/2649#issuecomment-6399293265), which retains the full 509 pending/suspended and recognizes no current accepted 496 rows.
- Exact60 source-role receipt SHA-256 `5a0e328a01bd75f7dfe506013dd5c446909d189e4a345c1f4b5a16bb6cde47c4`; private exact-transfer SHA-256 `a92e4e9e6d7a7a4bb55cdb487531580895da7f436eeb2bbe2c0a235455ad5658`; public canonical roster SHA-256 `0240558df9bfcac6cdaf3b94ed74a385c1d43132e49c39a4078f6edcb5d6062d`.

This file is a source-free authoring proposal. Root retains all acceptance and accounting decisions.
