# UGA source-role companion for native diagnostic 002

Private, source-free interpretation of the existing 715-key contact matrix and source-evidence-002 output. No new search, geometry operation, or source-feature remapping was performed. This note assigns roles to retained contacts; it does not change the generated diagnostic, establish authority, qualify keys, or grant credit.

## Frozen source/contact inventory

The frozen package is `gb-UGA-ADM3--repair-evaluation`: 715 keys / 466 intervals / 28 owners, partitioned 692 land + 23 inland water. The queue declares source families `[69,338,340,341,342]`. The private exact source-contact inventory records 57 contacted features and 2,025 key-to-feature contact edges; edge and family key counts overlap and are not additive partitions.

Pinned inputs:

- `research/UGA/private/source-contact-inventory-57-20261027.json`, SHA-256 `082f2affdfd09209499b048bf71fa48974d4670e91d57532ca14f0c7782a6139` (57 features / 2,025 contact edges, all five family IDs).
- `research/UGA/private/uga715-contact-matrix-20261027.jsonl`, SHA-256 `36b568d1a4dad32a69ef384707ec8ac4b89ebed6fc8c4fe502789d8de4b78c3b` (715 exact owner-key rows).
- `research/UGA/source-contact-families-20261027.md`, SHA-256 `a09ada918b9da4f5366d55f89a2bbe04dfb217cbd08354169492ab2bf3002c42` (feature identities, overlapping counts, recorded product vintages/terms).
- `research/UGA/source-contact-role-interpretation-20261027.md`, SHA-256 `47d644e0928f30bf7df98dc77446a28ace92698ec44bcacbfe422ef44b6f64b3` (package-level role classification).
- `research/UGA/source-role-water-context-7-20261027.md`, SHA-256 `cb49323731b41893da4b60ab94b012f0b77271ddc0f4a3078301fb60c90f1433` (seven water-cohort contextual contacts).
- `research/UGA/source-evidence-packet-692-20261027.md`, SHA-256 `299ae8d9f4f0b45d33c8e3eca4994376d89cad52b77c9e732de2176cfd576a9d`, and `research/UGA/source-license-item-audit-20261027.md`, SHA-256 `b194bcde6a0b0b1394d3666f540bf859f83fa0a3376f6f69ec118d8d719a53f5` (UGA ADM3 source-item and attribution limits).

## Role table

| Family | Product/contact role in this cohort | Feature count | Contact keys / intervals | Treatment in a native diagnostic |
|---:|---|---:|---:|---|
| 69 `gb:COD:ADM1` | DRC Ituri; foreign competing territorial contact; represented-year claim 2017, catalog-recorded ODbL 1.0 | 1 | 1 / 1 | Preserve as an actual foreign competitor/negative contact. It is contact evidence, not a legal cross-border claim. |
| 338 `gb:TZA:ADM1` | Tanzania Mara; foreign competing territorial contact; represented-year claim 2015, catalog-recorded ODbL 1.0 | 1 | 6 / 2 | Preserve as an actual foreign competitor/negative contact. It is contact evidence, not a legal cross-border claim. |
| 340 `gb:UGA:ADM1` | Three Uganda regions; higher-level internal hierarchy/context; represented-year claim 2017, catalog-recorded ODbL 1.0 | 3 | 681 / 449 | Preserve as hierarchy/context. Do not treat as a territorial veto by default: it is not a district-level substitute or an independent ownership decision. |
| 341 `gb:UGA:ADM2` | 24 Uganda ADM2 features; parent/hierarchical contact; represented-year claim 2006, catalog-recorded Public Domain | 24 | 622 / 400 | Preserve as parent/hierarchy context. Do not treat as a competing territorial negative without an explicit accepted role/veto rule. |
| 342 `gb:UGA:ADM3` | Declared primary UGA ADM3 source family; 2020 represented-year claim | 28 | 715 / 466 | Preserve as the declared owner-linked source family, while keeping its upstream Commons/image lineage and per-feature source attribution unresolved. |

The UGA ADM3 product record has a combined CC0 1.0 claim and separate “second license is Public Domain” detail, without item-to-license mapping. The geoBoundaries product notice separately requires CC BY 4.0 attribution/link and citation of metadata-listed sources. These are recorded product/source claims and attribution instructions, not clearance of underlying inputs. The queue requires the five-family context; it does not make all five families negative masks. The original contract requires relevant competitor/territorial evidence. The retained role interpretation distinguishes foreign competitor families 69/338 from internal hierarchy/context families 340/341. The current generated `territorial-exclusion-provenance.json` lists all four families 69/338/340/341 as `negative_families` (SHA-256 `fda37980971446933872cf4cd57c1d3fac79a422ef9a402352fd8c02dd3eb2f0`). That classification is broader than the role evidence supports unless a separately accepted rule explicitly makes internal ADM1/ADM2 contacts vetoes. Preserve all rows and geometries; represent the family role separately from veto/negative status. This note does not itself remove or relabel generated operands.

## Water-context contacts

The seven contextual contacts remain part of the 57-feature/2,025-edge inventory, not an independent positive or exclusion set:

- Family 338: six Tanzania Mara contacts on six water-cohort keys (source feature 60192, `gb:TZA:ADM1:36957248B94562559517692`; subset SHA-256 `d0b2aa0573bf24c42c6c78433970ae61c69f4a0a3ebed92c7264994fdb1a4f01`).
- Family 341: one UGA ADM2 Bukonjo contact on one water-cohort key (source feature 60499, `gb:UGA:ADM2:47994165B33706557437921`; subset SHA-256 `1e1a0a90632167ef236e4d9090ce85d04a9ed3d52766cf8b69888e0ea5d2fc0f`).

The retained water note classifies Mara as neighboring-country competitor context and Bukonjo as parent/hierarchy context. It reports these as contacts only; neither is a physical witness bound to the corresponding contact geometry, a legal boundary conclusion, or a reason to erase either contact. Keep all 23 water keys separate from the 692-land cohort.

## Diagnostic and limits

Source-evidence-002 is pinned at `research/UGA/private/uga-source-evidence-002-20261027/source-evidence.json`, SHA-256 `18d47d4be41fd0507b6300a358f07181915e76a41996b8c990107e31283120fc`; its territorial-exclusion provenance is pinned above. The source evidence says the consumed positive product is simplified geoBoundaries UGA ADM3 while target-feature metadata names the non-simplified product; that mismatch remains unresolved. It also preserves unresolved Commons image/item/revision-to-feature and applicable-license lineage, the unattributed historical Lamwo digest, and whole-target physical issue records despite zero center issue hits. These contacts do not prove source authority, complete key-to-feature lineage, or legal ownership. No rights clearance, qualification, acceptance, or credit follows from this role classification.
