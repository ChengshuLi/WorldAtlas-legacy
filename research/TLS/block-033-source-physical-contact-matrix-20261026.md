# TLS block-033 source and physical contact matrix

Read-only extraction from retained interval records. This is a source/native/contact audit only; it does not qualify repairs, establish current selected ownership, or change disposition. No geometry was rerun and no key coordinates or raw geometry are included.

## Exact scope and inputs

The immutable package row `gb-TLS-ADM2--repair-evaluation` in `coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json` records 562 land cells, 337 intervals, 22 owners, source families 152/327/328, block 033, and 31 source features. Encoded queue file: 1,754,890 bytes, SHA-256 `78007430b6f9faedb188ef0619b7ff0a7a2cc7fff2ec9f1c41ee69936ec4ebd8`.

The retained block 033 rows in `source-candidates-block-033.json.gz` (533,464 bytes, SHA-256 `dfd5c9e9e7aa5768b13d80799d8ec899fbaa64baf2a8fdf35d3bb7d8c9db3933`; decoded 3,858,744 bytes, SHA-256 `0be4dc8306171c5716223e2d9b6fc77ae47431d8fc63cdf69bb69ba276e06512`) were partitioned with the retained `source-batch-intervals.mjs` rules and package row. Result: **562 unique exact source-relative land keys in 337 emitted package intervals**, matching both package totals. The 31 feature list matches exactly, with no missing or extra IDs.

Physical membership was checked against `physical-support-block-033.json.gz` (431,020 bytes, SHA-256 `440955ea8d0654a1bc5367c4da0b9eb73df1e79c152ebc7c8576d9a2af9bb7a1`; decoded 1,946,502 bytes, SHA-256 `a34cfb604b26f9bc0769930e4bbcdff2dcd3ae53d4a74c33d1a6e5a9c7084f59`) and the pinned feature roster `source-feature-roster.json.gz` (1,844,315 bytes, SHA-256 `87f2d47e104b3af640351e747d8300d0068a1be23caab9e80558c3f8914eb4aa`; decoded 13,496,995 bytes, SHA-256 `7fa99cbf064121e0130b66758c212ae22b2a7be5649f2e250e9cda89a9bd595e`). **562/562** exact package keys are present in the retained physical-support rows. This confirms interval-mask membership, not physical source authority or current-owner acceptance.

## Source-family/feature roles in the 562-key set

| Family index | Source role from retained roster | Distinct package keys with contact | Feature contacts |
|---|---|---:|---|
| 152 | IDN ADM1 | 14 | 1 |
| 327 | TLS ADM1 | 511 | 8 |
| 328 | TLS ADM2 (package primary) | 562 | 22 |

All 22 TLS ADM2 features have one corresponding owner index in the retained roster. Their source-member contacts account for all 562 keys. The 8 TLS ADM1 features are ownerless coarse contacts in the retained roster; the single IDN ADM1 feature is also ownerless. These source indexes are feature-raster contacts, not an administrative crosswalk or legal finding.

The exact 562-key extraction conserves all 22 package owner indexes as follows (candidate-key counts): 42171=51; 42172=25; 42178=18; 42179=92; 42180=35; 42183=52; 42186=31; 42188=12; 42189=26; 42190=2; 42193=4; 42194=4; 42195=25; 42203=16; 42204=4; 42208=1; 42210=21; 42215=2; 42217=2; 42226=20; 42230=71; 42234=48. Their sum is 562.

| Family | Feature index | Feature | Package-key contacts |
|---|---:|---|---:|
| IDN ADM1 | 36248 | East Nusa Tenggara | 14 |
| TLS ADM1 | 58354 | Oecusse | 62 |
| TLS ADM1 | 58356 | Ainaro | 10 |
| TLS ADM1 | 58358 | Bobonaro | 4 |
| TLS ADM1 | 58359 | Cova Lima | 58 |
| TLS ADM1 | 58360 | Dili | 82 |
| TLS ADM1 | 58362 | Lautém | 148 |
| TLS ADM1 | 58365 | Manufahi | 47 |
| TLS ADM1 | 58366 | Viqueque | 100 |
| TLS ADM2 | 58369 | Alas | 31 |
| TLS ADM2 | 58370 | Atabae | 2 |
| TLS ADM2 | 58371 | Atauro | 51 |
| TLS ADM2 | 58374 | Balibo | 2 |
| TLS ADM2 | 58380 | Cristo Rei | 35 |
| TLS ADM2 | 58383 | Fatuberliu | 16 |
| TLS ADM2 | 58385 | Fatumean | 25 |
| TLS ADM2 | 58389 | Hatu-Udo | 12 |
| TLS ADM2 | 58390 | Iliomar | 18 |
| TLS ADM2 | 58402 | Lospalos | 52 |
| TLS ADM2 | 58404 | Maliana | 2 |
| TLS ADM2 | 58411 | Nitibe | 48 |
| TLS ADM2 | 58412 | Oesilo | 1 |
| TLS ADM2 | 58414 | Pante Macassar | 4 |
| TLS ADM2 | 58415 | Passabe | 20 |
| TLS ADM2 | 58419 | Same | 4 |
| TLS ADM2 | 58421 | Suai | 21 |
| TLS ADM2 | 58422 | Tilomar | 26 |
| TLS ADM2 | 58424 | Tutuala | 92 |
| TLS ADM2 | 58425 | Uato-Lari | 25 |
| TLS ADM2 | 58426 | Uatucarbau | 4 |
| TLS ADM2 | 58430 | Viqueque | 71 |

### Adverse/foreign contact

The retained block contains **14 distinct package keys** contacting the IDN ADM1 feature **East Nusa Tenggara**. They occur under five owner indexes: 42172 (1), 42194 (4), 42217 (2), 42226 (1), 42234 (6). This is a real foreign-family contact in the source raster and must remain visible in qualification. The interval record alone does not establish an Indonesian claim, source precedence, or a boundary conflict.

The TLS ADM1 contact family is a distinct coarser within-country comparator; its 511 key contacts do not substitute for the 562 fine TLS ADM2 source-member contacts.

## Vintage and geometry-version limits

Retained compatibility note `coordination/engineering/indonesia-adm2-current-cell-20261014/remaining474-source-refinement-001/sources/provenance/TLS-tls-adm2-source-compatibility.json` at immutable repository commit `98e61e00ba373b4278c3dfb44102ef94f70d3917` (Git blob `db9f8a36b01ee6d2e76c162dc874c9f53736d683`) identifies the TLS ADM2 product as 2020, WHO/OCHA ROAP, canonical “Administrative Posts,” CC BY 3.0 IGO, 65 features. It says the original and full-resolution releases have identical feature properties and that three TLS ADM2 geometries changed: Fatumean (feature 58385; 25 original package-key contacts), Tilomar (58422; 26), and Balibo (58374; 2). The note explicitly says no source/native predicate was executed and no hold changed. The counts above describe the retained original block only; they do not say whether the changed full geometries alter any of those memberships.

The separate retained `repairTLS2-retained-evidence-verification.json` records two full-vs-simplified foreign-contact cases, but tuple matching confirms those two keys are **outside** this exact 562-key package. Keep that evidence separate. For this package, the three changed fine features require a supported comparison binding both pinned source variants to these exact package intervals before asserting that the simplified-to-full distinction has no effect or creates particular new contacts.

## Required next-stage bindings

1. Preserve the exact package extraction and block/roster hashes above as source-free input receipts.
2. Bind the package's original interval/owner roster to current selected-owner state through the accepted observer; the source-candidate owner arrays are not a current-owner observation.
3. Keep the 14 IDN ADM1 contacts explicit and independently assess them against the exact source-role contract; do not treat ADM1 contact as automatic adverse territorial authority.
4. For the 562 exact rows, bind a supported original-simplified vs full TLS ADM2 comparison, prioritizing the three changed feature IDs 58385, 58422, and 58374. Retain the existing two-key TLS2 results separately because those keys are outside this package.
5. Preserve physical-support membership as a separate predicate. The 562/562 interval-mask result does not itself establish complete physical witness/source lineage, source applicability, present legal role, current selected ownership, or accepted credit.
