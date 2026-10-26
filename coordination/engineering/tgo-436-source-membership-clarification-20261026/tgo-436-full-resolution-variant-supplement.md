# TGO 436 full-resolution variant supplement

## Scope and result

This supplement concerns only nine rows already contained in the exact 436-key remainder. It preserves the full 436 denominator and the existing unresolved proposal; it does not create a new cohort or change any disposition, status, owner, or credit.

The earlier retained 2017 application used the same-release simplified ADM2 body. Its result was 436 simplified-body ADM2 hits and 414 ADM1 hits / 22 ADM1 no-hits. A separate application of the pinned same-release full-resolution ADM2 body found 427 full-body ADM2 hits and nine no-hits. All 427 full-body hits retain the same ADM2 feature identity as in the simplified-body result. The exact cross-tab is:

| Full-resolution ADM2 | Original ADM1 hit | Original ADM1 no-hit | Total |
| --- | ---: | ---: | ---: |
| Interior hit | 407 | 20 | 427 |
| No hit | 7 | 2 | 9 |
| Total | 414 | 22 | 436 |

Thus 407 rows have hits in both original layers, 20 are ADM2-only, seven are ADM1-only relative to the full ADM2 body, and two have no hit in either layer. The other 427 rows retain their full-body ADM2 membership; the nine below are the simplified-only variant discrepancy.

## Exact nine-row group/source mapping

The original disposition resolves every row to its existing question group and TGO ADM2 owner/source atom. The contacts shown are the original packet's TGO source identities, not legal owners. The group counts below account for all nine rows without publishing key tuples or coordinates.

| Question group | Original TGO ADM2 owner/source ID | Original TGO ADM1 contact | Simplified-body hits / full-body hits | ADM1 result |
| --- | --- | --- | ---: | --- |
| Q027 | Kloto — `gb:TGO:ADM2:56601680B4042875560778` | Plateaux Region — `gb:TGO:ADM1:44829518B26250432968900` | 1 / 0 | Hit |
| Q031 | Lacs — `gb:TGO:ADM2:56601680B61332506890313` | Maritime Region — `gb:TGO:ADM1:44829518B32493797453601` | 2 / 0 | Hit |
| Q033 | Lome Commune — `gb:TGO:ADM2:56601680B89691125732498` | Maritime Region — `gb:TGO:ADM1:44829518B32493797453601` | 4 / 0 | Hit |
| Q034 | Lome Commune — `gb:TGO:ADM2:56601680B89691125732498` | No ADM1 contact recorded | 2 / 0 | No hit |
| **Total** |  |  | **9 / 0** | **7 hits / 2 no-hits** |

The original question-group records mark these groups documented-unresolved and retain TGO ADM2/ADM1 contact records only. No foreign source-feature ID is recorded for the 436 subset. This source-relative exception does not require inventing a crosswalk for unrecorded foreign contacts and does not treat their absence as proof that no external competitor exists.

## Physical/native disposition and owner-contract boundary

All nine rows are classed `land` in the retained 436 crosswalk. The original 509 disposition records 509 land cells, zero inland-water cells, 509 documented-unresolved proposals, zero new repairs, zero owner changes, and zero native holds removed. Joining the existing 509-row selected-owner observation to these nine rows yields base/additive/effective owner values of zero, `existing_product_overlap=false`, and null `owner_id` for all nine.

The observation explicitly says it is a literal selected-product observation, not scientific qualification; it does not establish current physical classification, source applicability, geometric overlay, repair acceptance, or publication approval. Therefore the `land` label and zero-owner/no-overlap observations do not convert a source hit into current ownership or clear a native hold.

Under the original issue #2574 contract, each interval must be either qualified for an additive repair or retained as a documented exception, and any additive patch must satisfy the selected-native/source/physical requirements. The nine can be documented precisely as simplified-body hits with no full-resolution ADM2 hit, while remaining unresolved under that exception route. They do not support a positive, version-independent ADM2 membership decision. The other 427 full-body hits support historical membership only in the pinned 2017 geoBoundaries layer; 407 also hit ADM1, while 20 are ADM2-only. None establishes present legal ownership.

## Source-role, version, and terms limits

The exact same-release simplified object is `geoBoundaries-TGO-ADM2_simplified.geojson`, 151,571 bytes, SHA-256 `f0b555060987b20814aaf807c156cecfbe91d822d62e1b1e2920930d910bc291`. The exact full-resolution object is `geoBoundaries-TGO-ADM2.geojson`, 376,562 bytes, SHA-256 `f4e6ca4ba89a1d783c12a14335e99b28d34f23f6cff8c8dbbe52adecee9b9bff`. Both are pinned at release ref `9469f09` and each contains 37 features.

The same-release metadata file is 818 bytes, SHA-256 `63cdb283c7b1183106e4e79b1dffbbd80ed6835c21107b636fc615f3cfa0f762`. It identifies TGO ADM2 / “Prefectures,” represents year 2017, names “OpenStreetMap, Wambacher,” and records a CC BY-SA 2.0 claim. It gives source integration date 2023-01-19 and build date 2023-12-12; neither supplies the source extract date. It has no `sourceDataURL`, its `boundarySourceURL` is a Wambacher viewer reference, and `licenseDetail` is empty. The metadata does not identify an upstream source-data object or asset-specific license basis that could arbitrate the two delivered representations. These are specific provenance limits, not a blanket rights veto.

## Remaining predicate and effect

The deciding source-relative predicate for the nine is a supported explanation of which same-release geometry representation is applicable to the original owner contract and whether the source's 2017 represented-year layer supports the relevant location membership. Until that is resolved, keep all nine documented-unresolved. A positive additive decision would additionally require the contract's unique current-location source qualification and selected-native/source/physical verification. No foreign crosswalk is invented or required for this narrow variant statement; no ownership, legal-boundary, acceptance, or credit claim follows.

## Immutable pins

- Original 509 application CSV: SHA-256 `9d474cd5cf1655b97e31d0d02e9772910060c964e5021cc1948823cdeb271b48`.
- Original 496-row private crosswalk, partitioned into this 436: SHA-256 `fe9bb058c5370e070c2782cfc6721311ec725976a7794dedaa374bdd394842e2`.
- Private 436-row full-resolution application output: SHA-256 `ca79c9fb5999e6e97fb1c374f34a15a238505cf36b3335ab64876dbabf01dc8c`.
- Private nine-row source/owner/physical/native mapping: SHA-256 `4276919718264c1ee5cccccdd48dfd3dc5c361af4ab160faf0a02ddc092e1f77`.
- Original 509 selected-owner observation: compressed SHA-256 `81ea8c0d1c0b9c4bd70cb98504923334ce15b7723c8ff7373472f49834d3ada2`; query count 509, query SHA-256 `344b0408fe688d51b7a8a7265142661cd502950297778db462cab64437636bb6`. Its recorded scientific qualification is false.
- Original disposition: blob `8dcc0c7f31ee3430ccddec1f4dfda4c4d98847c8`; compressed SHA-256 `657058cb900b708fadd122b9121a0f85829c968ef4c118dd03355bac6ddb8c8e`; decoded SHA-256 `ee1d291073c6c25a476b9a9e584c05e2142081ee4def27119a6faac95302b56e`.

No geometry, raw coordinates, or key tuples are included. No status, credit, or ownership changed.
