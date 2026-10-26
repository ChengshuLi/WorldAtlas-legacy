# TGO 436-key original-source linkage clarification

This source-free clarification applies only to the 436-key remainder after excluding accepted Q020/Akébou 13 and the separate TGO60 60-key proposal from the original 509-key packet. It reports original packet/source-layer membership only. No disposition, acceptance, or accounting changes.

## Exact row and question-group join

All 436 rows join one-to-one from the retained original application/crosswalk to one original disposition interval row (253 distinct interval rows) and one question group (22 groups). The interval join was checked using native block, interval ordinal, row, and x-range, plus exact question ID and owner index. Each group’s `original_cells` equals its 436-subset key count. All 18 owner records have one `source_atoms` entry, equal to the row’s TGO ADM2 source identity. For all 22 groups, the union of interval source-feature indices exactly equals the group’s `original_source_contact_records`; no mismatch was found. No raw tuple or coordinate is included.

## Original 2017 ADM1 results

| ADM1 source member | Shape ID | Interior-hit rows |
|---|---|---:|
| Centrale Region | `44829518B22237151485853` | 18 |
| Kara Region | `44829518B37847489557890` | 107 |
| Maritime Region | `44829518B32493797453601` | 62 |
| Plateaux Region | `44829518B26250432968900` | 154 |
| Savanes Region | `44829518B73084759902551` | 73 |
| No ADM1 interior hit recorded | — | 22 |

Total: 414 interior hits across five ADM1 features and 22 ADM1 no-hits. The 22 are differences between the pinned source layers; each still has its recorded ADM2 membership. They do not establish a foreign location, wrong ADM2 membership, or legal boundary.

## Original TGO ADM2 feature membership

| Feature ordinal | ADM2 source shape ID | Name | Keys | ADM1 hit | ADM1 no-hit | ADM1 parent for hit subset |
|---:|---|---|---:|---:|---:|---|
| 2 | `56601680B59731994726086` | Assoli | 12 | 4 | 8 | Kara Region (`44829518B37847489557890`) |
| 3 | `56601680B44914344892125` | Binah | 1 | 1 | 0 | Kara Region (`44829518B37847489557890`) |
| 12 | `56601680B48376088277440` | Wawa | 17 | 17 | 0 | Plateaux Region (`44829518B26250432968900`) |
| 13 | `56601680B83789166363061` | Blitta | 1 | 1 | 0 | Centrale Region (`44829518B22237151485853`) |
| 14 | `56601680B24632394959352` | Sotouboua | 2 | 2 | 0 | Centrale Region (`44829518B22237151485853`) |
| 16 | `56601680B12249670822801` | Dankpen | 102 | 102 | 0 | Kara Region (`44829518B37847489557890`) |
| 17 | `56601680B41562196478781` | Ave | 2 | 2 | 0 | Maritime Region (`44829518B32493797453601`) |
| 19 | `56601680B98633254865748` | Agou | 102 | 102 | 0 | Plateaux Region (`44829518B26250432968900`) |
| 20 | `56601680B28886338508193` | Danyi | 17 | 17 | 0 | Plateaux Region (`44829518B26250432968900`) |
| 25 | `56601680B48471181858151` | Ogou | 1 | 1 | 0 | Plateaux Region (`44829518B26250432968900`) |
| 27 | `56601680B17683608517106` | Oti | 16 | 12 | 4 | Savanes Region (`44829518B73084759902551`) |
| 28 | `56601680B89112535430785` | Tandjouare | 28 | 28 | 0 | Savanes Region (`44829518B73084759902551`) |
| 29 | `56601680B4810153335262` | Tone | 27 | 27 | 0 | Savanes Region (`44829518B73084759902551`) |
| 30 | `56601680B64387003159978` | Cinkassé | 6 | 6 | 0 | Savanes Region (`44829518B73084759902551`) |
| 31 | `56601680B47682688566924` | Plaine de Mô | 15 | 15 | 0 | Centrale Region (`44829518B22237151485853`) |
| 34 | `56601680B4042875560778` | Kloto | 17 | 17 | 0 | Plateaux Region (`44829518B26250432968900`) |
| 35 | `56601680B61332506890313` | Lacs | 34 | 26 | 8 | Maritime Region (`44829518B32493797453601`) |
| 36 | `56601680B89691125732498` | Lome Commune | 36 | 34 | 2 | Maritime Region (`44829518B32493797453601`) |

These are identities in the pinned 2017 source application, not current administrative or legal determinations.

## Question-group owner and source-contact identity

The original disposition resolves the historical owner and source atom for this subset. These 22 question groups cover exactly 436 rows. The contacts shown are those in the original interval/question-group payload; all are TGO ADM1 and/or ADM2 feature identities, with no non-TGO feature identity in these rows/groups.

| Question group | Original owner ID/name | Keys | ADM1 hit / no-hit | Original source-contact records (ID; name) |
|---|---|---:|---:|---|
| TGO-Q002 | 41176 / Cinkassé | 6 | 6 / 0 | `gb:TGO:ADM1:44829518B73084759902551`; Savanes Region; `gb:TGO:ADM2:56601680B64387003159978`; Cinkassé |
| TGO-Q003 | 41168 / Tone | 27 | 27 / 0 | `gb:TGO:ADM1:44829518B73084759902551`; Savanes Region; `gb:TGO:ADM2:56601680B4810153335262`; Tone |
| TGO-Q004 | 41179 / Tandjouare | 28 | 28 / 0 | `gb:TGO:ADM1:44829518B73084759902551`; Savanes Region; `gb:TGO:ADM2:56601680B89112535430785`; Tandjouare |
| TGO-Q006 | 41156 / Oti | 4 | 0 / 4 | `gb:TGO:ADM2:56601680B17683608517106`; Oti |
| TGO-Q007 | 41156 / Oti | 12 | 12 / 0 | `gb:TGO:ADM1:44829518B73084759902551`; Savanes Region; `gb:TGO:ADM2:56601680B17683608517106`; Oti |
| TGO-Q009 | 41151 / Dankpen | 102 | 102 / 0 | `gb:TGO:ADM1:44829518B37847489557890`; Kara Region; `gb:TGO:ADM2:56601680B12249670822801`; Dankpen |
| TGO-Q010 | 41166 / Binah | 1 | 1 / 0 | `gb:TGO:ADM1:44829518B37847489557890`; Kara Region; `gb:TGO:ADM2:56601680B44914344892125`; Binah |
| TGO-Q013 | 41173 / Assoli | 8 | 0 / 8 | `gb:TGO:ADM2:56601680B59731994726086`; Assoli |
| TGO-Q014 | 41173 / Assoli | 4 | 4 / 0 | `gb:TGO:ADM1:44829518B37847489557890`; Kara Region; `gb:TGO:ADM2:56601680B59731994726086`; Assoli |
| TGO-Q016 | 41167 / Plaine de Mô | 15 | 15 / 0 | `gb:TGO:ADM1:44829518B22237151485853`; Centrale Region; `gb:TGO:ADM2:56601680B47682688566924`; Plaine de Mô |
| TGO-Q018 | 41157 / Sotouboua | 2 | 2 / 0 | `gb:TGO:ADM1:44829518B22237151485853`; Centrale Region; `gb:TGO:ADM2:56601680B24632394959352`; Sotouboua |
| TGO-Q019 | 41178 / Blitta | 1 | 1 / 0 | `gb:TGO:ADM1:44829518B22237151485853`; Centrale Region; `gb:TGO:ADM2:56601680B83789166363061`; Blitta |
| TGO-Q021 | 41169 / Wawa | 17 | 17 / 0 | `gb:TGO:ADM1:44829518B26250432968900`; Plateaux Region; `gb:TGO:ADM2:56601680B48376088277440`; Wawa |
| TGO-Q022 | 41170 / Ogou | 1 | 1 / 0 | `gb:TGO:ADM1:44829518B26250432968900`; Plateaux Region; `gb:TGO:ADM2:56601680B48471181858151`; Ogou |
| TGO-Q023 | 41158 / Danyi | 17 | 17 / 0 | `gb:TGO:ADM1:44829518B26250432968900`; Plateaux Region; `gb:TGO:ADM2:56601680B28886338508193`; Danyi |
| TGO-Q027 | 41160 / Kloto | 17 | 17 / 0 | `gb:TGO:ADM1:44829518B26250432968900`; Plateaux Region; `gb:TGO:ADM2:56601680B4042875560778`; Kloto |
| TGO-Q028 | 41187 / Agou | 102 | 102 / 0 | `gb:TGO:ADM1:44829518B26250432968900`; Plateaux Region; `gb:TGO:ADM2:56601680B98633254865748`; Agou |
| TGO-Q030 | 41161 / Ave | 2 | 2 / 0 | `gb:TGO:ADM1:44829518B32493797453601`; Maritime Region; `gb:TGO:ADM2:56601680B41562196478781`; Ave |
| TGO-Q031 | 41174 / Lacs | 26 | 26 / 0 | `gb:TGO:ADM1:44829518B32493797453601`; Maritime Region; `gb:TGO:ADM2:56601680B61332506890313`; Lacs |
| TGO-Q032 | 41174 / Lacs | 8 | 0 / 8 | `gb:TGO:ADM2:56601680B61332506890313`; Lacs |
| TGO-Q033 | 41181 / Lome Commune | 34 | 34 / 0 | `gb:TGO:ADM1:44829518B32493797453601`; Maritime Region; `gb:TGO:ADM2:56601680B89691125732498`; Lome Commune |
| TGO-Q034 | 41181 / Lome Commune | 2 | 0 / 2 | `gb:TGO:ADM2:56601680B89691125732498`; Lome Commune |

Across these groups there are 18 distinct owner records and 23 distinct TGO source-contact feature IDs (18 ADM2 source atoms and five ADM1 contacts), with zero non-TGO contact records. The original packet has a separate packet-level set of 32 source-contact identities; that is distinct from the 23 TGO contact IDs joined to this 436-key subset (18 ADM2 source atoms and five ADM1 contacts). No non-TGO contact ID appears in the 436 rows or their 22 question-group/interval records. This is limited to the original packet records; it is not a negative search for other candidate sources and does not prove external sources inapplicable.

## Correction and remaining limits

The earlier description that owner/contact identities “remain opaque” for these 436 is overbroad. The original disposition and per-key crosswalk identify the historical owner/source atom and TGO ADM2/ADM1 membership. No non-TGO candidate contact is present in these rows’ exact interval or question-group records; therefore the packet does not associate a foreign candidate with any of these keys. This corrects the source-record description without making a territorial or legal inference.

Preserve source vintage and rights limits: the geoBoundaries 2017 represented-year/OSM-Wambacher record lacks the upstream extraction date; its CC BY-SA 2.0 metadata claim is not reconciled by the generic OSM licensing reference, and asset-specific geometry terms remain unverified. The separate 2020 geoBoundaries/HDX record is humanitarian-only and not a substitute. The 2022+ GeoData comparison is scoped to excluded Q020. No source geometry or candidate comparison is repeated here.

Preserve all original native, physical, interval, source-candidate, and foreign-contact holds. This note clears no predicate and claims no credit. Current accounting remains: only Q020/13 is accepted; TGO60/60 and this 436-key proposal remain pending separate acceptance.

## Immutable evidence pins

- Original disposition: commit `8bb376b6b0125bfecfce5ac05e63b17c19d87ae9`, path `coordination/engineering/tgo-original-disposition-20261020/tgo-disposition.json.gz`, blob `8dcc0c7f31ee3430ccddec1f4dfda4c4d98847c8`, size 7,379 compressed bytes; compressed SHA-256 `657058cb900b708fadd122b9121a0f85829c968ef4c118dd03355bac6ddb8c8e`; decoded SHA-256 `ee1d291073c6c25a476b9a9e584c05e2142081ee4def27119a6faac95302b56e`.
- Original 509-row 2017 application CSV: SHA-256 `9d474cd5cf1655b97e31d0d02e9772910060c964e5021cc1948823cdeb271b48` (private source-custody artifact; no rows/coordinates reproduced).
- Exact 496-row per-key crosswalk: SHA-256 `fe9bb058c5370e070c2782cfc6721311ec725976a7794dedaa374bdd394842e2` (private; 436 selected by its recorded partition label).
- 436 canonical keyset fingerprint: `d9f10ce680d96836bd90803de4e1e6eb4d53e585d88f5c90fe444d756f2407db`.
