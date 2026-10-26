# VUT 87-key Port Vila and Luganville source-free proposal

## Scope and proposed disposition

This private, source-free proposal covers exactly 87 keys within the historical Vanuatu held subset: 85 recorded Port Vila contacts and 2 recorded Luganville contacts. Recommend a researched-unresolved documented disposition for these 87 existing holds only. This is a proposal for distinct review and root acceptance; it makes no positive repair, owner change, hold removal, credit, or legal-boundary determination.

Preserve the original package denominator of 4,366, with the historical 3,163 accepted cells separate from all 1,203 held cells. The proposed 87 remain inside the 1,203 held subset; the other 1,116 held keys remain outside this proposal. No package completion is claimed. The separate Tanna/Tafea 226-key memo is expressly outside scope.

## Exact subset and custody

The retained source is the 1,203-key factual roster `vut-1203-per-key-factual-disposition-roster-20261019.json` (SHA-256 `60c3a6214ee369f2820afbe6b0ed62d6ab3596de9e78056ee1659ca63cc9c774`) and interval matrix `vut-1203-interval-disposition-matrix-20261019.json` (SHA-256 `8c53b42702590cc875f6c8565ed13e2ac4e08b9d943b65aa1284461f6806325c`). The original source/physical screen is `vut-1203-source-physical-screen-20261019.json` (SHA-256 `4c9adfdb04457348d6348f4f3150d23fb2c75f114586459921f3c70e6eabf355`), from evidence commit `c7fa96a44f39310e0d070ca883c5c3593c8dfdfc`; its contextual probe is pinned at blob `7426970a8db81f77a5f6f28a7f26575a6d1058b7`.

Filtering only the retained per-key 2018-context labels yields 87 unique held keys: 85 Port Vila in 20 original intervals, plus 2 Luganville in 2 intervals, for 22 distinct intervals total. Their exact private key commitment is SHA-256 `4a62cc54002830baff3ebff9a9cb1681f577ea7b3d87bb70d99619de3038aa98` over UTF-8 lines sorted by `(owner_index,y,x)`, encoded `owner_index<TAB>y<TAB>x<LF>` (1,740 bytes). The separate exact key-to-interval commitment is SHA-256 `aa52e73fde01aff1e6dd14620b0d4107e6df2241c37ee8a9594a65fc0c66f39b` over compact UTF-8 JSON, sorted arrays `[owner_index,y,x,interval_y,x_start,x_end]` (3,742 bytes). No key tuples or coordinates are reproduced here.

The two cohorts bind to separate original VUT ADM1 source-owner groups in the roster: Port Vila/Efate is owner index 48791, source feature 65868, shape `32282491B17169683382430` (85 keys); Luganville/Santo is owner index 48794, source feature 65864, shape `32282491B7486560380604` (2 keys). These are source-packet identities, not present legal ownership findings. The exact subsets are disjoint by their retained context label and owner/source component.

## Port Vila 85: comparison evidence and limits

Parent supplied the complete VUT87 v2 source-role memo as forwarded assessment text, SHA-256 `18cbf07b9d743241f37ede51c7c8fd889eeb6b816ce74acd177b0c19abfeefef`, and the Port Vila 85 GeoPDF comparison text, SHA-256 `00c8afbd2399eddd9d55cbb436bcd89ccefb0668080e4f1851b39b477e89fde3`. These are the provenance hashes of forwarded assessment text; the source GeoPDF, per-key distance JSON, and Library ZIP were not materialized or hash-verified locally for this note.

The forwarded comparison identifies the public DUAP link [Port Vila City Council](https://duap.gov.vu/index.php/what-we-do/municipalities/port-vila-city-council) and its linked [Existing Map of Port Vila (2016–2030)](https://duap.gov.vu/images/docs/Map%20of%20Port%20Vila.pdf). The supplied comparison records a one-page A1 QGIS GeoPDF (author Sharon Rose Boe; created 2025-02-17) whose legend calls the magenta line “Port Vila Municipal Boundary (1979).” Its viewport uses a custom Transverse Mercator projection based on Bellevue / International 1924; the documented Bellevue-to-WGS84 operation has 35 m stated accuracy. The image is a raster, not an editable boundary feature layer, and the map does not establish boundary-data lineage or current legal effect.

The supplied source-free comparison reports 7 centers within 35 m, 11 within 50 m, 11 within 75 m, 12 within 100 m, and 73 farther than 100 m from the nearest visible magenta raster ink. The 75 m envelope is a cautious comparison threshold based on the datum-operation accuracy and raster stroke/sampling, not a hard positional bound. These are proximity measurements to rendered ink only. They do not establish inside, outside, boundary, or municipal inclusion for any center. This proposal retains all 85 as held; it does not convert distances into point-in-polygon or legal results. The forwarded comparison identifies its source-text SHA-256 as `00c8afbd2399eddd9d55cbb436bcd89ccefb0668080e4f1851b39b477e89fde3`; that text and its underlying map/distance bytes were not independently materialized here.

The earlier bounded legal-source review identified Port Vila Order No. 19/1980 in an official court judgment, but no applicable schedule/map was available for comparison to these keys. A georeferenced scanned plan comparison cannot by itself establish the current operative legal extent without an applicable legal instrument, reliable map lineage, and point-to-boundary result.

## Luganville 2: separate historical context

The two Luganville keys are a distinct cohort. The forwarded source-role materials describe a 2013–2016 Luganville municipal context, but provide no CRS/GIS crosswalk for point application. The retained SPC/OCHA ADM2 2018 layer also records two Luganville center contacts; it is historical contextual evidence, not a certified legal municipal boundary. These records are not merged into the Port Vila GeoPDF comparison, whose CRS/datum controls do not extend to Luganville.

Earlier bounded searches of official public material did not yield an applicable schedule/map for cited Luganville Orders No. 41/1982 or No. 2/1999. This proposal makes no claim about their operative dates, current status, mapped extent, or intersection with the two centers. A 2013–2016 or 2018 contextual layer cannot establish current legal inclusion or exclusion.

## Preserved source, native, physical, and legal limits

- The retained SPC/OCHA ADM2 2018 layer records 87 contacts (Port Vila 85, Luganville 2) and 1,116 held-key no-contacts across the full 1,203 subset. Its metadata description/copyright field is blank. Contacts are adverse historical context; no-contact is not clearance.
- All 1,203 held rows were members of the pinned native diagnostic's supported rows, but that is screening support, not territorial or package acceptance. The original 3,163 accepted rows remain untouched.
- The package records all 4,366 original centers as land-classified; this is a frozen package attribute, not current ground truth. Existing physical checks are aggregate/target-level and do not provide per-key physical or foreign-boundary clearance. No physical hold is removed.
- The selected-owner observation for the held scope is an older aggregate 0 of 1,203 assignment result without persisted individual rows; it is not a fresh per-key current-main owner-zero result.
- Decentralization Act [CAP. 230], 2025 consolidation, s. 4A describes an order-based process for dividing or altering Area Council divisions ([official consolidation](https://dla.gov.vu/images/legislation/Decentralization%20Act%20CAP%20230.pdf)). Section 4A does not itself establish a Port Vila or Luganville municipal boundary. The retained official-source review did not establish a specific in-force municipal extent applicable to these 87 points. Neither census/statistical geography, a current roster, nor context contacts substitute for that missing legal/source binding.
- The exact Port Vila comparison’s cited distance counts and map-control details are retained only as supplied assessment text. The source rights, native scan bytes, complete transformation metadata, and distance-output bytes were not independently examined here. No redistribution or rights conclusion is made.

## Remaining evidence and effect

The narrow unresolved question is the legal and source applicability of municipal extent to the exact historical keys. For Port Vila, the key evidence is the uncertain proximity comparison without a retained applicable schedule/map that can resolve the line. For Luganville, there is no CRS/GIS crosswalk for the 2013–2016 context and no applicable boundary map from the cited order history in the retained reviewed evidence. A bounded, attributable legal instrument/map and permitted point application could narrow these specific questions; this proposal does not claim universal source exhaustion.

Keep all 87 as held under the proposed researched-unresolved disposition pending distinct review and root acceptance. Preserve the remaining 1,116 held rows, every native and physical hold, all original adverse source context, the 3,163 prior accepted cells, and the 4,366 denominator. No status, ownership, stock, or accounting change is made.

## Provenance and task-local artifact hash

Forwarded-evidence provenance (not local source-byte verification): VUT87 v2 memo SHA-256 `18cbf07b9d743241f37ede51c7c8fd889eeb6b816ce74acd177b0c19abfeefef`; Port Vila85 comparison SHA-256 `00c8afbd2399eddd9d55cbb436bcd89ccefb0668080e4f1851b39b477e89fde3`.

This task-local source-free proposal's SHA-256 is recorded separately after save. It is not a digest of either forwarded evidence text, the GeoPDF, distance JSON, or Library ZIP.
