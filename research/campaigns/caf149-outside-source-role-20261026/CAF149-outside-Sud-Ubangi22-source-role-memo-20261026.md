# CAF149 outside-USCB: Sud-Ubangi 22-key source-role memo

**Purpose:** Source-role assessment of the largest actual foreign-contact group remaining in the outside-USCB 86 after excluding the previously reviewed 39-key Yobé-Sangha/COG and 18-key Sido/TCD groups. This memo records retained evidence and one official-source locator. It changes no qualification, owner, hold, source adoption, or credit.

## Exact scope and conservation

The retained machine receipt `worldatlas-CAF149-USCB-LSIB-63-machine-receipt-20261026.json` is 351,687 bytes, SHA-256 `1bd9d004ed32d8843548ab5ba4511d3ecf15ed688323cbdfec02f40f97ab8019`. It records 149 residual keys: 63 USCB-inside and 86 outside the USCB 2021 national outline with no 2003/2021 USCB ADM3 hits. The outside set is 86 keys, canonical hash `096db1f1df021f5d3b9c986526b578259b9c171ffa89abddd207f60da0b8270c`, using the receipt's stored `[owner,y,x]` arrays.

The exact original contact comparison `CAF461-exact-source-contact-comparison.json` is 932,437 bytes, SHA-256 `0b4afb8980cb36fe1bad9ce1a132dda0c8e2767727ebdc81df6905563c0c49d2`; it has 461 rows and is the per-key actual-contact evidence. Rejoining the selected machine-receipt rows to this comparison by owner/y/x yields 22 of 22 rows; every one records an original positive CAF target intersection and exactly one strict-interior, declared-negative foreign contact.

After excluding the exact 39-key Yobé-Sangha/COG pair and the exact 18-key Sido/TCD Moyen-Chari pair by their original target/source identities, 29 outside-USCB keys remain, hash `387e364e7d31af2da501550ca0dedac0450f2d30fdfbe42408e679f1bf76768c` over stored `[owner,y,x]` arrays. The largest source group is 22 keys contacting one COD ADM1 feature, key-set hash `49d43118c549e5fce8230beb55a267c128bcdadcf8079d01fd1be18ad673e276` over the same representation. Its 22 contact-atom digest is `b2072241038ff8cd9e7d1a045b170a2261120955782b6038abfe090ef030f4e9` over sorted `[owner,y,x,positive_target_id,foreign_source_id,source_feature_ordinal,target_negative_ordinal,geometry_sha256,strict_interior,declared_negative]` rows. The 22 are disjoint from both excluded groups. The seven other outside-USCB keys partition as four additional COG Likouala contacts, two additional TCD Moyen-Chari contacts, and one COD Upper Uele contact; together these seven and the Sud-Ubangi 22 conserve the remaining 29.

The selected 22 target/source counts are:

- CAF Bimbo, `gb:CAF:ADM3:52401652B14361696899500`: 12 keys (original target ordinal 60).
- CAF Damara, `gb:CAF:ADM3:52401652B49227657461354`: 3 keys (ordinal 70).
- CAF Mongoumba, `gb:CAF:ADM3:52401652B86682569461435`: 7 keys (ordinal 5).
- Foreign source on each: Sud-Ubangi, `gb:COD:ADM1:28894549B79448475719999`, feature ordinal 13; retained geometry digest `c20b374d77e6012887d0583d3cf91b28af997630c09830f084f4d1964f672398`. All 22 are outside the retained USCB national polygon and have no 2003/2021 USCB ADM3 hits.

No key tuples, coordinates, or geometry bodies are included here.

## Original source role and custody

The original source-corpus catalogue is pinned at commit `21984e9ec4ec7370bc807e2da23cea2228747698`, path `coordination/engineering/original-geography-source-corpus-20261006/catalogue.json`, blob `09afab19371f0814da61e79e5f310c5fb2405b6d`, 403,376 bytes, SHA-256 `d3da799558be1fcbe7f3ea90ba7033d312a65690984983cb008f2d72e32765f9`. Its COD ADM1 entry records 26 features, represented-year claim 2017, and Open Data Commons Open Database License 1.0. The recorded consumed URL is `https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/COD/ADM1/geoBoundaries-COD-ADM1_simplified.geojson`.

The exact COD ADM1 family payload is bound at the same source-corpus commit and path `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-COD-ADM1-000.bin.gz`, blob `9c044aab8159821ba629020dee2e787388d20b52`, 378,900 compressed bytes, SHA-256 `a2e524c39c94b065d6ae76ca335730ef716d6378c050f1d11c15a1a40fe8b584`; decoded size 1,153,436 bytes, SHA-256 `bf6096f1c16f2632be9c4d4c0305276024fd5b3f3b9b3e635b2e2018d02f0331`. The payload is not redistributed in this memo.

For the CAF side, the catalogue describes the retained ADM3 product as represented year 2018, Municipalities, sourced from ACTED/OCHA Central African Republic, with metadata license CC BY 3.0 IGO. The different product roles and represented-year fields do not by themselves prove which legal line governed the 22 cells or establish a crosswalk between this 2017 COD feature and the CAF targets.

## Official-source locator and limits

A bounded search for official DRC administrative context surfaced the Ministry of Interior's “Provinces et territoires” page: [interieur.gouv.cd/ministere/territoires](https://interieur.gouv.cd/ministere/territoires). The indexed search excerpt displayed “Sud-Ubangi. Capitale: Gemena.” This is recorded only as an official-page locator and current name/capital context, not as a body read or captured. Opening the page returned 502 Bad Gateway; a single exact-URL CLI request failed before HTTP with `curl: (6) Could not resolve host: interieur.gouv.cd` (HTTP 000, zero bytes). The page body, publication date, map, and legal text were therefore unavailable for direct inspection.

The available locator does not establish the legal boundary, effective date, historical administrative roster, or exact identity/applicability of feature ordinal 13 in the 2017 source payload. It does not resolve whether any of the original foreign contacts caused the CAF hold.

## Bounded finding

The retained per-key receipts support a finite source-relative fact: these exact 22 held keys have an original CAF positive intersection and one original strict-interior declared-negative point contact to the 2017 geoBoundaries COD ADM1 Sud-Ubangi feature. The source corpus identifies product vintage/role/license and exact feature identity; the official ministry locator provides only unverified current name/capital context. The 22 remain held with all original positive, negative, physical, and native evidence intact. No legal boundary, whole-cell location, sovereignty, positive CAF reassignment, source adoption, qualification, status change, or credit is claimed. No geometry was rerun.
