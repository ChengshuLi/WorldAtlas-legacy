# UGA 715-key qualification-readiness and finite-unresolved proposal

**Status:** source-free readiness proposal for independent review. It is not an accepted disposition, source qualification, native assignment, legal-boundary finding, or credit record. It does not replay geometry or publish source payloads, key rows, or coordinates.

## Exact scope and preserved partition

The frozen package is `gb-UGA-ADM3--repair-evaluation`, primary family `gb:UGA:ADM3`, from queue commit `23318dd9d70680495138297b9cc1a7533a466200`. Its queue file is `coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json`, blob `9c9a9bc83627afd3e8435ff4009e39530543bf54`, SHA-256 `78007430b6f9faedb188ef0619b7ff0a7a2cc7fff2ec9f1c41ee69936ec4ebd8`. It contains **715 original keys / 466 intervals / 28 owners / 57 source-feature contacts**. The full key-tuple commitment is SHA-256 `f21622dec5516526e39c7e72e9ccaa6fbcf2dc42fdd65b1327a876362bf7e83b`; the ordered interval commitment is `cd3c5ba9b827785d6c19919fbd7d8e01c3e72c403b9f0196cea255cb9d77f69f`.

The frozen raster-class partition is **692 land keys / 451 intervals** and **23 inland-water keys / 15 intervals**; there are zero source-relative rows. The land owner/key tuple commitment is `f6f47ba3235807a4090b4cc1066dd80a3d7d648787e2ba4ced04d076b3379647`; the separate water tuple commitment is `16fbeb3305362f94e3740ffd9c37490de3f5f2ab8034d0c1f7a3c209f5642a69`. The water rows remain held and are not covered by the land proposal. Eight KEN/RWA cross-family conflict exclusions remain outside this package, with separate commitment `e40869d30151820dae2ffc9e629340db1aeca63d043ef352b1af95e686433c98`.

The retained source-contact union is preserved: 1 COD ADM1, 1 TZA ADM1, 3 UGA ADM1, 24 UGA ADM2, and 28 UGA ADM3 feature contacts. Those contacts are not legal findings or owner assignments. The source-corpus catalog and input blocks remain pinned to the frozen queue; the exact private source bodies are not included in this note or proposed for publication.

The five exact catalogue payloads used for the complete contact family were privately verified against the frozen source-corpus tree and its compressed/decoded catalogue identities. Only identities and hashes are recorded here:

| Product | Git blob | Compressed bytes / SHA-256 | Decoded bytes / SHA-256 |
|---|---|---|---|
| COD ADM1 | `9c044aab8159821ba629020dee2e787388d20b52` | 378,900 / `a2e524c39c94b065d6ae76ca335730ef716d6378c050f1d11c15a1a40fe8b584` | 1,153,436 / `bf6096f1c16f2632be9c4d4c0305276024fd5b3f3b9b3e635b2e2018d02f0331` |
| TZA ADM1 | `3c5016cc626f36fb17f6fa269b629317efcbe396` | 131,832 / `1594bd12d18f550af5eb9c0c7130d71ce57c400018070ef27b04db61f1a77f13` | 426,148 / `8b84f3f0a9e6e16322b777a5bba90c8e33c5e93c0dcb03ef1d3f6332036d066f` |
| UGA ADM1 | `213c2301f14c296a40310030256a7b9d496c3afb` | 85,208 / `3e0dc23da310870739bc742483875a3e9a9b1614d46d9a67c77aac6ccb427425` | 258,114 / `75e5442c33f7023bcd2d7d72928835723b557c1a9523f3b4c9afe36d0e73af93` |
| UGA ADM2 | `1f8672d7303051dd6425dc822598dd935bc3c61f` | 317,239 / `c16dc4723d4a48cbe5622bfe3f555cf46e0490a1a08324a22503696a5fc9389c` | 1,021,800 / `0a13e10b3bc6beeb02db4502c7f29a2ebbbb681a932307ccba4cd53e994feac7` |
| UGA ADM3 | `26b190b4e881505ee2c93df39acb84adb55e984c` | 135,186 / `03ff116b6759cf0e2a9852373618db3fdb46973332e5b0c8711a1d05f4c09126` | 476,279 / `890e30b471447ef093fe23c1ec1f803953518bcfb17c346e62681ee45280691c` |

## Current selected-owner observation

The supported `observe-selected-owners` run used exact data commit `d13ef9359af2b031bc0461700c2453dbcb861461` and package `gb-UGA-ADM3--repair-evaluation`. Its private row-level output is 178,692 bytes, SHA-256 `2a6bbb69e50a4dd2789ed365fd7b5834665455766c09a41fa730f9675c2bb8ac`; it reports 715 unique query keys and `scientific_qualification: false`. The full observation's query SHA-256 is `bb9f288ff9b3122e63b49d378076756b339857e7972ef5f67dde4705bfb55ff2`; its expanded original-interval SHA-256 is `b4745342d64cd936b13d048a24557b83ccc495d5cc97bbcc348121717a97cae6`.

Independent source-free joins verified that the 715 query keys equal the frozen interval mask: 692 land keys and 23 water keys, with no missing or duplicate keys. The sorted `[owner,y,x]` tuple commitments are `981cd171ed2f3f536c23e428929036b0051c8c733601bb67f7be2d494bf6f352` for all 715, `ad314f302c52a7063a14618cbf8fe399eef4ff99a2b673560eb8d524e7606ca7` for land, and `16fbeb3305362f94e3740ffd9c37490de3f5f2ab8034d0c1f7a3c209f5642a69` for water. The observed effective selected owner is 0 for all 715. This is current owner-state evidence only; it neither qualifies the source/target relationship nor establishes a new assignment or credit.

Selector pin: `data/ownership-selection.json` at d13, SHA-256 `a14af2f78d9967acf51ddb78be3e07c327036bd919db99c66bd8a2adfad3d553`. The selected startup index is 49,610 bytes, SHA-256 `fb232fc6b9e20e625ad8dd351dda61398360eed73fe3a40436b4a1b7601b81e2`; native manifest SHA-256 `d9954fa51d18e4ce785679f920e4b6ac1ebd3cf07ce03fa7e7e674cb2a42faba`. The private observation contains row-level details and remains private; only aggregate commitments are reproduced here.

## Source identity, lineage, and recorded terms

The retained `gb:UGA:ADM3` product is `UGA-ADM3-73843447`, a 2020 represented-year claim with 137 product features, from geoBoundaries release `9469f09592ced973a3448cf66b6100b741b64c0d`. Its retained metadata repeats “Wikimedia Commons” for two source entries, records one combined CC0 1.0 statement, and says “The second license is Public Domain.” The separate private geoBoundaries `sourceData/gbOpen/UGA_ADM3.zip` archive is 306,510 bytes, SHA-256 `857470a2e0680d72af410478a88f06df7a141c122ef56b14dbc06d8c0f3f36f7`; only its metadata, notice screenshots, XML, and non-geometric DBF fields were inspected, and none are published here. The archive identifies [Districts of Uganda 2020-07](https://commons.wikimedia.org/wiki/File:Districts_of_Uganda_2020-07.png) (Syanarion62; CC0 1.0; page history shows a September 2020 upload) and a separate image used for the Lake Victoria border. [Uganda Regionen 4.svg](https://commons.wikimedia.org/wiki/File:Uganda_Regionen_4.svg) (Slomox; based on UBOS data; public-domain claim) is a candidate second item, but the archive does not explicitly bind it to that second-source or Lake Victoria role. Exact image upload revisions and a source-role binding are not present.

The archive records the source-corpus attribution fields but does not identify an image/source item per feature. The 57-record contact-to-archive comparison produced 34 exact-name-only matches over 28 distinct DBF names, 23 unmatched names, and zero source-ID matches; six names are duplicated between ADM2 and ADM3 contact rows. A unique owner-linked ADM3 name-to-DBF-record match is not feature-to-geometry lineage and does not link any original package key to an image feature.

Previously retained official aggregate counts report 146 districts as of September 2020 and 135 as of 1 January 2019; these do not resolve the 137-feature product roster or create an exact key/feature crosswalk.

The geoBoundaries product notice separately states CC BY 4.0 attribution/citation expectations for geoBoundaries code and derivative works: attribute geoBoundaries and cite metadata-listed sources ([CC BY 4.0 deed](https://creativecommons.org/licenses/by/4.0/); [geoBoundaries](https://www.geoboundaries.org)). The product metadata's combined CC0 statement and “second license is Public Domain” detail remain unmapped to the two source items; CC0's recorded instrument is [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). This note reports recorded statements and source-page findings; it does not resolve license precedence, compatibility, or clearance, and adds no new legal or outreach requirement. The recorded UGA source-item audit is finite; it does not claim source absence.

## Exact qualification gaps and producer limit

1. **Target/source binding:** no accepted producer output currently binds the 57 source-feature contact records to exact source geometries, original package target IDs, native pixel indices, and per-key intervals. Name-only DBF joins do not satisfy that identity predicate.
2. **Land coverage:** no complete per-key `mapped_land_support` rows are pinned to matching target and source geometry for the 692 land keys.
3. **Physical evidence:** the retained 031/032 land-support inputs are x-run masks only. They contain no owner, target ID/pixel index, source-feature ID, physical witness kind, or residual/conflict issue identifier. The adjacent aggregate 65-phase summary is not a per-target receipt. No complete target-bound physical result and reproduction receipt with adverse residual/conflict witnesses is present.
4. **Native qualification:** no supported native patch/constructor result qualifies these 715 keys. The current observation is an owner-state check only. The 23 water keys require their own complete water evidence and remain held.
5. **Producer compatibility:** at the d13-merged code, `scripts/prepare-delivery-handoff.mjs` routes `source`/`physical` through `scripts/qualify-source-cohort.py`. That producer validates a fixed Indonesia/Malaysia/PNG/TLS family set and Indonesia ADM2 target schema; it rejects this UGA ADM3 57-feature family. The generic `source-evidence` phase prepares existing source-target records against the selected native baseline but does not parse source geometry or create UGA feature/target membership. No UGA-compatible supported stage was run, and no source/physical result is claimed.

The exact disposition proposed for decision is **researched-unresolved for the 692 land keys only**. Keep all 23 water keys separately held and preserve the eight external KEN/RWA exclusions outside the denominator. This is not acceptance: the complete 715-key package remains unqualified, with no new native assignment or credit. No evidence here establishes universal source absence, current legal boundaries, or source-rights clearance.

## Evidence references

- Frozen owner/contact and physical input inventory in the task evidence set: `research/UGA/source-physical-land-input-inventory-20261027.md`, SHA-256 `910613bb879572b3b094b22a42ee7df37e7b44c0a2b1438776aab3dfaee2561e`.
- Physical-mask limitation audit in the task evidence set: `research/UGA/land-physical-mask-audit-20261027.md`, SHA-256 `53de0c19693e9f74b5ecb1293b2600fdf72ab69d67a2c47818e863debb06c495`.
- UGA ADM3 source-item trace in the task evidence set: `research/UGA/source-item-trace-20261027.md`, SHA-256 `d4daed2d659556956a61c394e87ab7050282150c2c5bd2780411d2df43d8d1f9`.
- Source license/item audit in the task evidence set: `research/UGA/source-license-item-audit-20261027.md`, SHA-256 `b194bcde6a0b0b1394d3666f540bf859f83fa0a3376f6f69ec118d8d719a53f5`.
- Feature/source-lineage check in the task evidence set: `research/UGA/feature-source-lineage-check-20261027.md`, SHA-256 `d27afd5d6ea6f486534ae67704c9567a599ebda05941cf94f80924370fc819b8`.
- Previous land-only proposal and full contract/source evidence: `researched-unresolved-proposal-692-20261027.md`, SHA-256 `2c7254d75953cb1da60526ca464d9d2a8a48aa27e08d9400f8ad4f8c72c7fbc9`.
