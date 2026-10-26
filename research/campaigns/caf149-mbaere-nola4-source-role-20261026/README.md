# CAF149 exact four-key Mbaere/Nola source-role assessment

**Status:** Source-free assessment of four exact held keys from the CAF149 residual. It records original operand identity and retained primary-source context; it makes no status, owner, source-adoption, qualification, or credit change. No geometry was rerun and no raw coordinates, key tuples, or source geometry are included.

## Exact scope and identity-based exclusions

The retained 149-key machine receipt is `transfers/caf149/materialized/worldatlas-CAF149-USCB-LSIB-63-machine-receipt-20261026.json` (351,687 bytes; SHA-256 `1bd9d004ed32d8843548ab5ba4511d3ecf15ed688323cbdfec02f40f97ab8019`). The exact per-key contact comparison is `transfers/caf149/materialized/worldatlas-CAF461-effort-research-20261021/CAF461-exact-source-contact-comparison.json` (932,437 bytes; SHA-256 `0b4afb8980cb36fe1bad9ce1a132dda0c8e2767727ebdc81df6905563c0c49d2`). The comparison covers 461 original rows; the complete 149-key receipt joins by receipt-native `[owner,y,x]` identity.

Identity-based exclusion of the accepted 39-key Yobé-Sangha/COG cohort, the 18 Sido/TCD Moyen-Chari keys, the 22 Sud-Ubangi keys in PR #2900, and the reviewed USCB-interior 26 leaves 44 keys. Those 44 comprise the already scoped CAF37 cohort (37 keys, hash `ab9762dbcd35162a2db959b5419add3ad70bdbc0b3a687d415535e3293ff3fbf`) plus seven outside-USCB keys. To avoid duplicating that prior CAF37 work, the seven-key remainder is separately hashed as `9209ab17700a0d6c5e2816752c51fd9ab9a12efbac5e9d3d7889ab62c33b8171` over sorted compact JSON `[owner,y,x]` arrays. It partitions into four Likouala contacts (Mbaere 3, Nola 1), two TCD Moyen-Chari contacts (Dar El Kouti), and one COD Upper Uele contact (Lili).

The Dar El Kouti/TCD Moyen-Chari note included in this bundle covers a different two-key subset: those keys are drawn from the USCB-inside-63 partition, while the two Dar El Kouti keys in the outside-USCB seven-key remainder above are separate identities. The shared target and source labels do not make the two subsets overlap.

Together the four attached notes cover nine unique keys: Mbaere/Nola four (`8ab690f59bb0402f9509d07b8849ef46aa9f062f7b9701fd3f68e999274fe76d`), the distinct Dar El Kouti inside-63 pair (`d91bce54506264cb3451bcd8e900496934e861725d7c7b7e91f9b4881b29f470`), the Dar El Kouti outside-86 pair (`541086312c18eed3400d167a10a0fcc0e5d9351737c8d6b5fa1c5e112ea46e24`), and Lili one (`d5a9be419f03f65a9e970eea59c7dc0dae24dc99e3d4135dc1ea7104d315af37`). The outside-USCB seven-key remainder is Mbaere/Nola four, the outside Dar pair two, and Lili one. All nine remain held; the Dar key sets do not overlap.

The selected Mbaere/Nola subset contains four unique keys, hash `8ab690f59bb0402f9509d07b8849ef46aa9f062f7b9701fd3f68e999274fe76d`, over sorted compact JSON `[owner,y,x]` arrays. Its four actual-contact atoms hash to `af6e8dc0bc76009de2cac6c2a76c1aecebdfdc55733c93af3c7beb3b9f80058c` over sorted `[owner,y,x,positive_source_id,foreign_source_id,source_feature_ordinal,target_negative_ordinal,geometry_sha256,strict_interior,declared_negative]` rows. The four are disjoint by key identity from each previously listed cohort. The source feature ID is shared with the separate CAF39 Likouala cohort, but these four have different CAF target identities and are not added to or counted as CAF39.

## Original target and actual foreign-contact operands

The retained comparison records four original CAF target-positive intersections and four strict-interior declared-negative contacts to one COG ADM1 feature:

| Original CAF target | Target source ID | Target feature ordinal | Exact keys |
|---|---|---:|---:|
| Mbaere | `gb:CAF:ADM3:52401652B65052605957591` | 7 | 3 |
| Nola | `gb:CAF:ADM3:52401652B27659488729720` | 46 | 1 |

The foreign feature on each key is Likouala, `gb:COG:ADM1:67827341B88704799146201`, source-feature ordinal 4, retained geometry digest `87cdd75ecd99b913dd104604452d9fcace3439b5a4618cf3e410421865ea1760`. Its negative target ordinals are 0 for the three Mbaere keys and 3 for the Nola key. The source comparison—not a source-index occurrence count—records the actual per-key relation. It does not establish legal border placement or whole-cell location.

The source-corpus catalogue is pinned at commit `21984e9ec4ec7370bc807e2da23cea2228747698`, path `coordination/engineering/original-geography-source-corpus-20261006/catalogue.json`, blob `09afab19371f0814da61e79e5f310c5fb2405b6d`, 403,376 bytes, SHA-256 `d3da799558be1fcbe7f3ea90ba7033d312a65690984983cb008f2d72e32765f9`. The retained CAF ADM3 family payload is blob `58f9bea9c23c34f8bd6cb3336da582801656c889`, 230,764 bytes, SHA-256 `9888409cb3cc0f35d2e49e9e6877e2b1e548cece703c6b8553819ca80171b9b5`. Prior retained catalogue summaries describe it as the 2018 CAF municipal product from ACTED/OCHA, with CC BY 3.0 IGO metadata; those product fields are not a legal effective date.

The exact COG ADM1 payload is pinned at the same source-corpus commit, path `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-COG-ADM1-000.bin.gz`, blob `c778c13f89d1f0b1f51e50043a1d76b440a7a0de`, 54,037 compressed bytes, SHA-256 `a4ecf3129d317d13214efef5fd461203443ef88f0d18be11800edb461dc0198b`; decoded size 170,812 bytes, SHA-256 `2aea50c78d9c86139a73dfb72e20e59ae151d1c7d5c0e03bd0482f06e18d340b`. Its role in the original evidence is the COG ADM1 foreign exclusion operand, not an official boundary act. No source payload is redistributed.

## Primary-source context and limits

The already reviewed CAF39 source note cites the Republic of the Congo *Journal Officiel*, issue 42-2024, Law 31-2024 of 8 October 2024 (published 17 October 2024), printed pages 1307–1308: [official Gazette PDF](https://www.sgg.cg/JO/2024/congo-jo-2024-42.pdf). That instrument defines the territorial scope of Likouala and lists its communes and districts, including Impfondo, Bouaniéla, Epéna, Enyellé, Bétou, and Dongou. This is a later COG administrative-law comparator. It supplies no 2017 source-feature crosswalk, no spatial line that can be applied to these four recorded centers, and no linkage between the CAF target features Mbaere/Nola and a COG jurisdiction. The exact Gazette body was not recaptured for this four-key assessment; these instrument details are cited from the prior retained CAF39 reading, not represented as a new independent read.

The exact four keys also appear in retained USCB national-border context. `USCB-border-distance-context.json` is 157,739 bytes, SHA-256 `efca4a22dda6f4b0fd02cf26ad9eab055e3618e4aa8f0ccb2916eec364e21a17`; it records all four outside the USCB 2021 national polygon, with distances 311.647–351.202 m from that polygon and none in the descriptive 100 m band. The machine receipt records no 2003 or 2021 USCB ADM3 hits for these outside-partition rows. This is census/national-polygon context, not a legal boundary determination or replacement for the retained COG product.

The retained four-pair LSIB context is `LSIB-four-border-applicability-context.json` (5,167 bytes, SHA-256 `be85607c56350440ef283da4f8f83155c0f3219368be0f776a7dc1493550b23f`). It records the COG–CAF pair as rank 1, “International Boundary,” from a current US Department of State map-identify response; the service advertises v11.4, published 24 February 2025. It corroborates the international-boundary classification at the country-pair level, but does not apply an exact legal line to these four locations or establish equivalence with the historical COG feature.

## Bounded finding

For these four keys, the retained evidence establishes original CAF target-positive source membership and an actual declared-negative point contact with the original COG ADM1 Likouala feature. The official 2024 Likouala law and current USCB/LSIB context do not establish that the 2017 COG source line governs the recorded CAF target locations, nor do they provide a per-key legal crosswalk. Preserve the four original holds, target-positive records, foreign contacts, and physical/native predicates. No positive CAF assignment, boundary determination, source adoption, status change, or credit is proposed.
