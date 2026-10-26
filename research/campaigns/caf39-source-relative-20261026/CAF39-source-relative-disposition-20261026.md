# CAF39 source-relative disposition proposal

**State:** source-free, decision-ready research proposal for a strict subset of CAF149. This is not a root acceptance, status change, source adoption, positive repair, or credit claim. All 39 keys retain their original held state and source/physical/native predicates.

## Exact scope and partition

The retained 149-key held ledger has SHA-256 `a105ad39ce44650e47000c673e819180f466995a9a2aeb3dcf1ab35307d86b11` and canonical full-set hash `1dc8525ec678eaaf48cf7025c1770d2ddada522f7ff6ec4ddf54a36383ca90e1`. Owner 10668 (Yobé-Sangha) contributes 56 keys; that subset reproduces the retained finding hash `e6eb54783845901eca03d0c9d69b9036cea45289184c24420b110723c56513c`. The 17 owner-10668 keys in the separately scoped/reconciled CAF37 37-key cohort remain held. Subtracting those 17 keys from the 56 leaves 39 unique held keys, disjoint from that cohort.

All key-set hashes below use compact JSON for sorted `[y,x,owner]` triples. Raw tuples and coordinates are omitted.

| Residual cohort | Keys | Key-set SHA-256 | Contact evidence |
|---|---:|---|---|
| Likouala source contact, all | 27 | `aa9cb4f8f3997d52551b6e987897a1fd635dd644b9349442a1311f645a30c09b` | 27 strict-interior declared-negative center incidences |
| Likouala, more than 100 m from USCB ADM0 edge (descriptive band) | 26 | `eebce28d6f21119702a1d033e5aa97e510e858ebed7e20fc1dd28a1629232c09` | 26 incidences |
| Likouala, within 100 m contextual band | 1 | `508e11e4a831fbb13e4e0781d5fd504c40a5a3f0e66486893272391658241fb6` | 1 incidence; recorded distance 71.949 m |
| Sangha source contact | 12 | `19b13df2ddbfedd350b4f97f2b361dd11e5ee86644d2e7d813478641ec46cc9b` | 12 strict-interior declared-negative center incidences |
| Combined more-than-100 m contextual subset | 38 | `4b7c4e8f1a87b111c44b18bb36bd0aeb67c959a9a93f52fa3c1ab19e14bc2915` | 38 incidences |
| Full residual | 39 | `d933df217e2e4cade2d1500fdc9e4ae4c3e3a10ea5baffa26884237d2169f26f` | 39 incidences |

Contact-incidence hashes cover sorted `[y,x,owner,source_id,family,feature_ordinal,strict_interior,declared_negative_for_target]` rows, not unique-key tuples:

- All 39 incidences: `865d419f82c9789689a79e56aad029340833ab2dfba7f29d19013fe95e3bd6b4`.
- The 38 more-than-100 m contextual incidences: `d5cca2fe1e32479e1953310651c4ce6c0d19ebd470d247e0a56bf9eee22919c9`.
- The single near-edge Likouala incidence: `bdd0edc74debd38a2d0d251a941ed5961b187e8bb29bd6f4b787a40ea9f299b8`.

## Recorded source application

The exact retained center-contact comparison is `CAF461-exact-source-contact-comparison.json` (932,437 bytes, SHA-256 `0b4afb8980cb36fe1bad9ce1a132dda0c8e2767727ebdc81df6905563c0c49d2`). It matches all 39 keys and records, for each, an original CAF target-positive match plus one strict-interior foreign negative center contact. It reports 27 contacts with COG ADM1 Likouala (`gb:COG:ADM1:67827341B88704799146201`) and 12 with COG ADM1 Sangha (`gb:COG:ADM1:67827341B91073241467510`). The exact comparison is a point predicate at retained native centers, not a whole-cell overlay or legal-boundary test.

`retained-negative-identity-join.json` (63,781 bytes, SHA-256 `238dec2aaa8bc073ea6f3f47dfca2ed50e9cd39762aa898a2c8f7f5d0e9aa56d`) binds the Yobé-Sangha target `gb:CAF:ADM3:52401652B99363571212605` to:

- Likouala: target negative ordinal 5, feature ordinal 4, geometry SHA-256 `87cdd75ecd99b913dd104604452d9fcace3439b5a4618cf3e410421865ea1760`.
- Sangha: target negative ordinal 6, feature ordinal 9, geometry SHA-256 `6cfdbe1c7373b245df02a68a1e48c434a2e53c15461901a3b97bae13aea2426c`.

The joined source-evidence record is `source-evidence-original.json` (277,509 bytes, SHA-256 `80e4af2b6eaa22ed4785e5db42e771488a3ec6fd4dfbb19c50e0418cc47d6b8a`). Original COG ADM1 payload custody is pinned at source-corpus commit `21984e9ec4ec7370bc807e2da23cea2228747698`, path `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-COG-ADM1-000.bin.gz`, blob `c778c13f89d1f0b1f51e50043a1d76b440a7a0de`, 54,037 bytes, SHA-256 `a4ecf3129d317d13214efef5fd461203443ef88f0d18be11800edb461dc0198b`. The payload is not included here. Its role is the original foreign ADM1 exclusion input, not an official boundary instrument.

## National-border context and bounded proposal

`USCB-original461-key-comparison.json` (631,304 bytes, SHA-256 `6e0ffae096750793ce3f8955eba8ec3390df1ef1d4da9508f76000a05f92c11c`) records all 39 centers outside both the USCB 2003 and 2021 commune layers (177 and 181 features, respectively). The retained `USCB-border-distance-context.json` (157,739 bytes, SHA-256 `efca4a22dda6f4b0fd02cf26ad9eab055e3618e4aa8f0ccb2916eec364e21a17`) uses the USCB 2021 ADM0 layer `CF_GEOG2_ADM0_2021_uscb_202303`: all 39 centers are outside the national polygon. The 38 farther than 100 m are 26 Likouala plus 12 Sangha; distances span 337.002–1417.825 m. The one edge-sensitive point is in the Likouala group at 71.949 m.

The 100 m band is descriptive accuracy context only. The retained receipt explicitly says it is not a qualification threshold or a guaranteed error bound, and its distances do not assert equality with current LSIB. The USCB source layers are census-geography variants, not sovereign legal authority. The captured USCB geodatabase is 3,043,043 bytes, SHA-256 `0a0861591a1aecc325d92d596240e3b9c80963ec2b4798c816eefc54c6d1f244`; embedded metadata is 17,400 bytes, SHA-256 `3316026137a9a029d57dd73b4c35d1d58d8aeaaa3991a306726868f998547812`. The metadata identifies LSIB as accessed 14 December 2022 and OCHA as downloaded 20 July 2017, and notes OCHA boundary use under CC BY-IGO.

The retained official US Department of State LSIB context reports the COG–CAF pair as rank 1, “International Boundary,” from a 21 October 2026 map-identify response. The service is version 11.4, published 24 February 2025; its rounded current response does not apply the exact line to these 39 centers or bind it to the 2017 COG polygons. The stored response is `fresh-primary/LSIB-map-identify-COG-v2.json` (10,789 bytes, SHA-256 `7bd7c3ccb503f0112c72268d145c8bd5bbaf175398f55910d66b5d0f00316c7b`).

The official Congo Journal Officiel, issue 42-2024, contains Law 31-2024 of 8 October 2024 redefining the territorial scope of Likouala (published 17 October 2024, printed pp. 1307–1308). It lists the commune of Impfondo and districts Impfondo, Bouaniéla, Epéna, Enyellé, Bétou, and Dongou; it provides no Sangha boundary, line geometry, map, historical 2017 crosswalk, or feature-level linkage. [Official Gazette PDF](https://www.sgg.cg/JO/2024/congo-jo-2024-42.pdf)

### Proposed source-relative disposition

- **38-key subset:** label as *corroborated source-relative foreign contact / outside-USCB-context*. Each exact center is recorded within its original COG ADM1 negative feature, and neither retained USCB commune vintage nor the national polygon places the center in CAF. This is source-relative evidence only; it does not establish a legal line or the full cell’s location.
- **One-key subset:** label as *border-distance-sensitive source-relative contact; unresolved*. The original Likouala center contact remains, but the retained national-polygon distance is within the descriptive 100 m band.
- Keep all 39 original holds, exclusions, target-positive records, and physical/native predicates unchanged. Do not infer a positive CAF assignment from names, administrative membership, USCB outside status, or the LSIB label. No status, credit, or qualification change is proposed here.

The exact retained comparisons and source notes above require no geometry replay. No raw source geometry, key tuples, coordinates, or GIS bodies are included in this note.
