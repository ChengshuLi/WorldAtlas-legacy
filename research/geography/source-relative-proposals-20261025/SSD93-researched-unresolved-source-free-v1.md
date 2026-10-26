# SSD93 source-relative researched-unresolved proposal (source-free)

**Purpose and disposition.** This is a bounded source-relative researched-unresolved candidate for root review, covering exactly 93 selected rows from the existing South Sudan (SSD) held set. It is not a legal-boundary determination, positive assignment, accepted exception, package-status change, or credit claim. No coordinates, raw geometries, private key tuples, or source PDF bodies are reproduced here.

## Exact scope and conservation

The original SSD contract is 2,123 unique cells: 1,621 previously supported and 502 held (`2,123 = 1,621 + 502`). The held class is `territorial_exclusion_cells`; each held row is land and unassigned. The selected nine-owner subset is 93 distinct held keys, identified privately by SHA-256 `637b49965b44b06930ceb44a77004aab9e2eaaa8523b82e1954c8d71319d9507` over sorted `[y,x,owner_index]` tuples. Local set reconciliation against the pinned disposition gives: 93/93 selected keys are in held 502; 0 intersect the prior supported 1,621; 409 held keys remain outside this proposal. The selected rows preserve original status `documented_unresolved_proposed`; their repair, owner-change, and exception credit values are all zero.

The source/target and disposition inputs are retained locally:

- `/private/tmp/ssd-502-disposition.json`: 2,365,898 bytes; SHA-256 `7b530ca393c773ff90fc94298d2b27342adbcedb28b56d920a4698cd88912b64`. Its embedded source-evidence pin is commit `d7658a69b156a361bb19a74cbcd7e8ff6ea4b413`, blob `825447acce47c9c75fca08b57ea6cabcd90a6cca`.
- `/private/tmp/ssd-source-evidence.json`: 178,108 bytes; SHA-256 `82fbf48353e389f782fa534d950e3e091b09e7130c63bb9c92728d37b270d05e`.
- `/private/tmp/ssd93-native-center-application.json`: 9,762 bytes; SHA-256 `328b98af7d4ef83b694c84908163bc661c2070f85401650cc3594c32d796163`.
- `/private/tmp/ssd93-native-application-verify.json`: 2,589 bytes; SHA-256 `b34118a66bd1cd7d930a9bf88ed16d235a2b4b1684defeb887d7624a0891ec31`.
- `/private/tmp/ssd93-native-review.md`: 5,232 bytes; SHA-256 `d40ec65d1e83114839518074a7f42dc0d549278c9bb3596c3b2d32f2a4e9def8`. This prior review checked cohort selection, pins and counts; it records that it did not independently reproduce the geometry application.

The target family is `gb:SSD:ADM2`, a geoBoundaries 2020 represented-year claim; recorded contributors are South Sudan IMWG, National Bureau of Statistics (NBS) and OCHA South Sudan, with CC BY 3.0 IGO. Its recorded consumed URL is `https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/SSD/ADM2/geoBoundaries-SSD-ADM2_simplified.geojson`. The exact target source payload is corpus commit `21984e9ec4ec7370bc807e2da23cea2228747698`, blob `cf428b617b41849c3534349b080175e1e9db90f3`, compressed 84,873 bytes/SHA-256 `185cc3302ad30874cf1e5f2fb13f059a509b9bb517db062a233f7b554b028ff9`, decoded 317,281 bytes/SHA-256 `c873ae91e1109a727d17aa75eb7d4f604ec8cb990ece3eac3c73b2c2ab45efee`.

## Candidate membership and source role

The retained source-index arrays and the pinned foreign source-feature center application match for all 93 selected keys: every selected center is outside its corresponding SSD target polygon and inside at least one listed foreign candidate polygon; all 99 recorded feature memberships match; no candidate membership is missing and no additional membership is unrecorded. There are 93 distinct keys: 61 COD, 27 UGA and 5 KEN. Six UGA keys occur in both an ADM1 and ADM2 feature; the 99 memberships must not be read as 99 distinct cells.

| SSD owner | Held keys | Candidate source-index membership | NEC table name-level mention |
|---|---:|---|---|
| Yambio | 39 | 18727, COD ADM1 Upper Uele | PDF p. 9: Yambio Town Constituency No. 5; “All payams of Yambio” |
| Yei | 13 | 18727, COD ADM1 Upper Uele | PDF p. 3: Yei Town, Yei West and Yei South constituencies; named payams |
| Ibba | 8 | 18727, COD ADM1 Upper Uele | PDF p. 9: Ibba Town Constituency No. 4; “Boundaries of Ibba county” |
| Maridi | 1 | 18727, COD ADM1 Upper Uele | PDF p. 9: Maridi Town Constituency No. 3; “All Payams of Maridi” |
| Magwi | 12 | 60391 UGA ADM1 Northern Region (6); 60446 UGA ADM2 Kilak (8) | PDF p. 5: Magwi Constituency No. 10; Magwi, Pajok and Lobone |
| Kajo-keji | 8 | 60391 UGA ADM1 Northern Region (6); 60449 UGA ADM2 West Moyo (1); 60451 UGA ADM2 Aringa (2) | PDF p. 3: Kajo-keji West and Kajo-keji Town; named payams |
| Budi | 4 | 60391 UGA ADM1 Northern Region (4); 60395 UGA ADM2 Dodoth (3) | PDF p. 5: Budi Constituency No. 8; named residential units |
| Ikotos | 3 | 60391 UGA ADM1 Northern Region | PDF p. 5: Ikotos Constituency No. 9; named payams |
| Kapoeta East | 5 | 40425 KEN ADM1 Turkana | PDF p. 5: Kapoeta East 1 and 2 constituencies; named residential units |

These are source-index candidate joins, not causal assignment. Source products differ in role and represented vintage. The catalogue records:

- `COD ADM1` Upper Uele: 2017 OpenStreetMap/Wambacher, ODbL 1.0; recorded consumed URL `https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/COD/ADM1/geoBoundaries-COD-ADM1_simplified.geojson`; payload blob `9c044aab8159821ba629020dee2e787388d20b52`, decoded SHA-256 `bf6096f1c16f2632be9c4d4c0305276024fd5b3f3b9b3e635b2e2018d02f0331`.
- `UGA ADM1` Northern Region: 2017 OpenStreetMap/Wambacher, ODbL 1.0; recorded consumed URL `https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/UGA/ADM1/geoBoundaries-UGA-ADM1_simplified.geojson`; payload blob `213c2301f14c296a40310030256a7b9d496c3afb`, decoded SHA-256 `75e5442c33f7023bcd2d7d72928835723b557c1a9523f3b4c9afe36d0e73af93`.
- `UGA ADM2` Kilak, West Moyo, Aringa and Dodoth: 2006 geoBoundaries/Wikimedia Commons, recorded Public Domain; recorded consumed URL `https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/UGA/ADM2/geoBoundaries-UGA-ADM2_simplified.geojson`; common payload blob `1f8672d7303051dd6425dc822598dd935bc3c61f`, decoded SHA-256 `0a13e10b3bc6beeb02db4502c7f29a2ebbbb681a932307ccba4cd53e994feac7`.
- `KEN ADM1` Turkana: 2020 RCMRD/Africa GeoPortal, recorded Public Domain; recorded consumed URL `https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/KEN/ADM1/geoBoundaries-KEN-ADM1_simplified.geojson`; payload blob `9d55d677acfd305ab94dc04e4d337e33db8da970`, decoded SHA-256 `4d9e1b8a6d305ee2b2bbeeeb4dd6ec3cc52e44884f0f6065d14d255810f9eae4`.

These are geometry-product catalogue labels and recorded licenses, not proof of legal/current boundary authority. The original SSD held reason remains: `territorial_exclusion_cells`; the current evidence does not establish dated, current per-key administrative applicability or legal authority.

## Retained physical/native evidence

All 93 selected rows are physically classified `land`. The source-evidence record pins the whole-target physical witness to `coordination/engineering/south-sudan-original-repair-20261018/physical-001/whole-target-support.json`, commit `b8ef92f8720581c94c32f2ad51cbc4c8d4544b55`, blob `ac0135a5c0afd90afd6e89d51bc330d1cab0dcd5`, 199,238 bytes, SHA-256 `03a9ba2d67fdc74cbdbc8d852d6d2def57ff4d46275c47f5a706e24dada638f9`. The associated input is `coordination/engineering/south-sudan-original-repair-20261018/source-stage-001/original-stage-inputs.json`, same commit, blob `95284537a81e6a79f0a6eea61a28eed3c6be25dc`, 269,679 bytes, SHA-256 `9dc9642410b31562bd0effbbc91437b72009a6699d81c944d5ef9aac5240e677`. Its grain is whole target/feature relation, not per-key authority or applicability.

The 93-key application used `native-linear-evenodd-first-owner-v1`, grid size 262,166, the pinned native latitude file at commit `5b32388df0501b013ac9a3ba97864932db493d59`, path `coordination/engineering/native-grid-fidelity-1010-20261005-local15/results-v1/native-row-latitudes.f64le.gz`, blob `de6905e162dc031b1b93248fae91190c39c4ad53`, 1,851,757 compressed bytes/SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`. The application reports 93/93 centers outside their retained SSD target and inside at least one listed candidate feature; zero selected-key boundary ties; no center outside every candidate. It is a center-only comparison of retained simplified polygons. Native topology and whole-cell containment are not verified; a center hit is not legal causation.

## Primary materials: contextual name/legal evidence, not crosswalks

### South Sudan NEC constituency statement

The locally retained scan `/private/tmp/ssd-nec-constituencies.pdf` is 7,661,720 bytes, SHA-256 `c34946ff7ab4c0a66803c2128dd8a492b104955c52aae2a8c609d4aa4a774c70`. Its cover is an NEC Chairperson statement dated 22 December 2025; page 2 says the NEC declares 102 geographical constituencies across ten states and three administrative areas, and cites the National Elections Act 2012 as amended in 2023. Pages 3–14 list constituency names, “Description of Geographical Boundaries,” and “Constituencies Residential units.” The retained PDF runs through printed “Page 12 of 16”; four internal pages are missing. It contains tables, not maps. Some listed residential units/payams and occasional county-name descriptions correspond by name to these nine target owners, as tabulated above. No exact source-feature ID or cell/key crosswalk is present in the pages held. The displayed letterhead and contact site identify NEC, but this copy has no retained HTTP headers or canonical download URL.

### South Sudan Local Government Act 2009

The local PDF `/private/tmp/ssd-local-government-act-2009.pdf` is 352,248 bytes, SHA-256 `aaaa27de7cd778da192795cce8b26e30a168df7f70b4ee1330f492fa12dbfcb0`, 79 pages. The prior task named the official NEC landing route `https://nec.gov.ss/download/local-government-act-2009/`; `/private/tmp/nec-act-landing.headers` is empty and no PDF response headers or Git commit/blob pin are retained. PDFKit text extraction is `/private/tmp/ssd_pdf_inspect_act.txt`, 20,883 bytes, SHA-256 `9114851034eb1dd9aef210a27109fba8507a320382840c1040011913b46eaba2`. It describes local-government powers, functions, duties, structures, composition and administration; readable provisions concern County Council seats and County Executive Directors. Searchable extraction found no occurrences of boundary/boundaries, delimitation, demarcation, territory, payam, administrative area, or constituency. Early section text has garbled font extraction, so that is a bounded search result, not a complete legal opinion. No target-specific delimitation instrument or 93-key crosswalk was identified.

### Kenya Turkana primary-source receipt (parent-supplied; no raw-source replay)

This evidence is included exactly at the source-free fact level supplied by the parent; I did not retrieve or reread its private source files. It applies only to the five Kapoeta East candidates associated with the retained Turkana source feature; it does not create a South Sudan boundary finding.

1. IIBRC 2010 report, official IEBC PDF `https://iebc.or.ke/uploads/resources/oep20PEuYn.pdf`, 10,738,374 bytes, SHA-256 `f0ffc12651832ff6987656f13bf219421507328eec77e47e9c73d00b53d0566e`; parent receipt names local private file `/tmp/kenya-turkana-primary-20261025/iebc-turkana-map.pdf`. Appendix 16 (printed p. 113/PDF p. 123) records community-reported concerns around Turkana North at Kenya–South Sudan, Kenya–Ethiopia and Kenya–Uganda borders, plus an internal Turkana/Pokot dispute. Appendix 19 (printed/PDF p. 195) is a six-constituency electoral map titled “TURKANA CONSTITUENCIES.” The report’s concerns are not adjudications; its electoral map is not a current Turkana county polygon and has no feature identifier linking it to the retained 2020 ADM1 shape.
2. Local Government (County of Turkana) Order, 2007, official Kenya Law PDF `https://kenyalaw.org/kl/fileadmin/pdfdownloads/LegalNotices/2007/285-LocalGovernmentAct_CountyofTurkana__2007.pdf`. Parent receipt says it declares Turkana County from Turkana District excluding the scheduled Lodwar municipality area, establishes the County Council and lists 45 electoral areas. Clause 3 references Boundary Plan REA(33(a)) as the delineation, deposited with the Electoral Commission; that plan is absent. The receipt supplies no file hash/size for this order.
3. Constitution of Kenya (2010), official Ministry of Defence page `https://www.mod.go.ke/the-constitution-of-kenya-2010-online/`: Articles 6/First Schedule list Turkana as County 23 and Article 188 sets a county-boundary alteration process. Articles 88/89 address electoral-unit delimitation and do not by themselves show that an electoral map defines the current ADM1 polygon. The receipt supplies no captured body hash.
4. KNBS Turkana County Statistical Abstract locator map, described in the receipt as the official 2015 publication using 2009 census: its caption says “This map is not an authority on delineation of boundaries.” Direct PDF request reportedly returned HTTP 502; only indexed publication text/image was available, not a full local body. No exact PDF URL/hash was supplied in the receipt.

These Kenya materials add legal and historical context but do not establish that the five candidate centers fall on a particular side of a legally demarcated international boundary or explain the original SSD exclusion. The exact missing instrument identified by the receipt is the 2007 Order’s Boundary Plan REA(33(a)), or another authoritative county-boundary record demonstrably tied to the 2020 Turkana feature. No status, positive, ownership or credit conclusion follows.

## Bounded proposal and remaining question

The retained evidence supports a finite source-relative researched-unresolved **candidate** for exactly these 93 keys because they are conserved within the original held denominator, have recorded feature-specific source-index joins, and the pinned native-center application reproduces the candidate relation for every selected key. It does not establish that the source polygons caused the original territorial exclusions, that any candidate boundary was legally authoritative/current, or that a target key belongs to another country. NEC constituency tables and Turkana electoral materials are not administrative source geometry. Whole-target physical support, the target’s recorded 2020 vintage, and candidate center membership do not settle exact boundary applicability. The concrete unresolved issue is source-specific administrative applicability/lineage at the relevant target cells, especially the missing Turkana Boundary Plan connection for the five Kenyan candidates; for the 88 COD/UGA candidates, the retained evidence identifies source features and vintages but supplies no matching dated official per-key boundary instrument/crosswalk.

This proposal leaves the other 409 held keys untouched, preserves the previous 1,621 supported positives, and assigns no positive or legal ownership. Root review and the original package acceptance process remain required before any status or credit decision.
