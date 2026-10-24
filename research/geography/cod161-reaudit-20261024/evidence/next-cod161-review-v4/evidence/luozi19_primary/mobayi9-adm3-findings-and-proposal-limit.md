# Mobayi9: CAF ADM3 source findings and proposal limitation

Worker `01a16f2d-be76-72d7-bc46-8b89a6efb0f2`, 2026-10-24. Coordinator ownership remains unchanged. This note qualifies the tentative proposal SHA256 `c638e497d5878f5f5f5dd00b61dd3404fbe140e826e3e9ab28fd9d23ef58ace9`; the earlier proposal and assessment remain preserved as historical evidence, not current sufficient acceptance evidence.

## Material result

**The retained 537-feature center overlay did not include CAF ADM3.** It covers 537 features across ten families, not 537 families. Its family-body manifest lists AGO ADM1, BDI ADM1, CAF ADM1/ADM2, COD ADM1/ADM2, COG ADM1, TZA ADM1 and UGA ADM1/ADM2. Therefore its absence of additional center hits does not test any of Mobayi9's twelve ADM3 exclusion candidates. Even a valid tested center non-hit would not establish no full-cell contact.

The frozen physical/source join used in the tentative proposal is bound to the earlier candidate-source-center overlay. I subsequently read the complete537 report and verified its nine Mobayi rows are the same exact keys, but that larger report still excludes ADM3. The proposal field names containing `full_family_context` or `full_family_source_context` must be understood as **retained candidate/ten-family center context only**, not all native exclusions or all registered-source families. No all-operand completeness claim is supportable from those rows.

## Actual CAF ADM3 body and metadata inspection

Read the existing immutable Git blob `58f9bea9c23c34f8bd6cb3336da582801656c889` using read-only `cat-file` with lazy fetch and replacement objects disabled. Compressed bytes230,764, SHA256 `9888409cb3cc0f35d2e49e9e6877e2b1e548cece703c6b8553819ca80171b9b5`; decoded bytes807,513, SHA256 `e368afac2f5c1ac7503a181e3e62541df88167cf9072a84c5453ffea999ee88a`. The collection has175 features and declares CRS84. This is the pinned **simplified** CAF ADM3 GeoJSON, not an unsimplified original survey.

Read the pinned catalogue and the actual archived `data/administrative-sources.json` at commit `c6a26e1caba54e1b81a89fbda3a64fff56da323d`; the whole metadata file SHA256 matches its catalogue baseline pin `ed0051d2956271c72f8917e7da0c6f53e5dfb595bee5920cac489a65a747d633`. Canonical CAF ADM3 metadata hash matches `6465cbdbf80f983f7e35a95509d26cfc7792169d539cf2aadc6e4c6b1233032f`.

That actual metadata identifies `CAF-ADM3-52401652`, municipalities, represented2018, attributed to **ACTED and OCHA Central African Republic**, with recorded CC BY3.0 IGO terms and the HDX administrative-boundaries source URL. Its update/build fields are January/December2023, and its consumed geometry points to geoBoundaries release9469f09. These dates describe different fields; the represented-year claim remains2018. It has a different lineage from the CAF ADM1 2006 Commons-derived product. Gbadolite2's generic Commons-source limitation cannot establish the twelve ADM3 operands' limitation.

Joined each of the twelve native exclusions to its actual ordinal and `shapeID` in that authenticated body, and checked its actual geometry hash against the retained native record. All twelve match. Geometry hashing uses compact sorted JSON plus newline; an initial no-newline probe mismatched, then the correct serialization matched every record. This was byte/identity verification, not a new spatial computation.

| Native feature ordinal | Name in retained body |
| --- | --- |
| 77 | Mbeima |
| 79 | Mobaye |
| 100 | Kotto-Oubangui |
| 101 | Gambo |
| 112 | Siriki |
| 114 | Kembe |
| 116 | Bakou |
| 117 | Mboui |
| 118 | Yabongo |
| 119 | Cochio-Toulou |
| 161 | Kouango |
| 166 | Ouambe |

The feature records expose `shapeName`, `shapeISO`, `shapeID`, `shapeGroup`, `shapeType` and geometry. They contain no per-feature treaty or source citation. That observation does not disqualify their geometry or show their exclusion is wrong.

## Actual access limit and next action

The metadata's [HDX source page](https://data.humdata.org/dataset/central-african-republic-administrative-boundaries) returned **403 Forbidden** on the direct web read. No retry, alternate actor, credentials or access bypass followed. No live HDX resource body was read. The retained body/metadata were independently available immutable inputs, not a workaround fetch of the denied endpoint.

The lineage and overlay-membership questions in this bounded task are now answered. They do **not** resolve these twelve operands' actual cell applicability. Keep the researched-unresolved proposal tentative: the earlier factual support assessment did not examine this distinct source family and is not sufficient on its own for final disposition. The concrete next step is inspect available retained native per-key exclusion/qualification evidence for the twelve operands and establish whether it already addresses their relevance to these nine cells. If those retained records do not contain such evidence, state that specific gap and coordinate a bounded next qualification; do not silently infer ADM3 noncontact from the ten-family center result. No geometry rerun was performed in this task.

## Deliverable

`mobayi9-adm3-source-inspection.json`:162,988 bytes, SHA256 `f9a5c892ad3a9360f5a10f9bf7baf2b60d7cd24443d69b1048bdcaf7260f7bf4`. It preserves all twelve actual feature bodies, native exclusion records and verified geometry hashes; full metadata/catalogue record; ten-family manifest scope; nine retained complete537 rows; and exact input bindings. Local retained body/catalogue/metadata copies are in this same owned scratch directory. All nine holds, accepted2977/674 accounting, and pending254 remain unchanged; zero credit or acceptance.
