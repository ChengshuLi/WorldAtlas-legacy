# Native territorial contacts: method interpretation

Read-only source interpretation at accepted commit `0eb64fbc65a9abec2c627ed2bc5dccaffc6f6239`. No executable changes, tests, geometry runs or new observations were performed.

**The native predicate samples cell centres and assigns integer cell keys. It does not calculate polygon intersection area with the geographic rectangle of a cell.** Calling its output a whole-cell assignment is correct in the discrete ownership sense; calling it an arbitrary geometric whole-cell intersection is not.

## Scan and edge convention

The normative row latitude is the inverse-Mercator latitude at `y + 0.5`. Longitude thresholds correspond to the native centre longitude `360*(x+0.5)/size - 180`. The scanner uses linear longitude/latitude polygon edges and even–odd paired crossings. It represents the actual finite binary64 coordinates and latitude as exact rationals for crossing thresholds; it adds no epsilon or snapping. Exact arithmetic does not imply original surveys or floating-point latitude generation are error-free. [Source lines49–95](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/native-grid-0eb64fbc.js:49)

Edges are scheduled with minimum latitude excluded and maximum latitude included. Paired crossing columns become half-open integer spans `[start,end)`. Horizontal edges do not enter crossing parity, but their exact centre contacts are retained separately. This convention handles shared vertices without pretending to measure the full area of a cell. [Source lines96–177](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/native-grid-0eb64fbc.js:96)

Three exact-centre tie names have distinct meanings:

- `horizontal-native-boundary-centres`: the row latitude equals a horizontal edge latitude, and one or more native centre longitudes lie on the closed segment.
- `excluded-native-lower-vertex-centre`: a lower-latitude endpoint excluded by the vertical half-open convention coincides with a native centre.
- `native-intersection-on-cell-centre`: an active edge crossing equals a native centre longitude exactly under the rational rule.

An edge merely crossing some other part of a cell does not by itself create one of these centre ties. [Source lines134–165](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/native-grid-0eb64fbc.js:134)

## Diagnostic contract

`diagnostic_territorial_rows` uses the existing complete exclusion scans and emits every requested half-open interval, with each original operand independently represented. Requests must be ordered, in-range, nonoverlapping integer intervals and name a target owner. Cuts at request, scan, existing-owner and tie endpoints ensure a constant result over each emitted interval. Adjacent intervals with identical owner and operand kinds may merge. There is no second geometry operator. [Source lines537–606](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/native-grid-0eb64fbc.js:537)

Here `interior` means membership in the exclusion's stock scan span. **It can coexist with a named tie**: this diagnostic explicitly collects every simultaneous kind. A reader must not assume that the string alone always means strict mathematical interior. Empty `kinds` means no contact under these native predicates within the requested interval, not absence of arbitrary geographic intersection or proof of source inapplicability. [Source lines593–606](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/native-grid-0eb64fbc.js:593); [documented contract lines494–507](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/DELIVERY_HANDOFF-0eb64fbc.md:494)

This territorial view differs from the physical witness helper, which normalizes a polygon boundary tie by removing its `interior` kind and uses generic `boundary`, `line` and `point` labels. Those helper semantics must not be substituted for territorial diagnostics. [Source lines817–876](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/native-grid-0eb64fbc.js:817)

The decision order is source domain, already owned, boundary, ambiguous owner, territorial veto, coverage, assignment. The territorial diagnostic remains independent of that priority and any adopted applicability: earlier failures do not conceal other operands. An adopted per-member/per-operand interpretation can contextualize only an interior contact at the named native centre; it cannot suppress a boundary tie. [Source lines437–466](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/native-grid-0eb64fbc.js:437); [source lines568–614](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/native-grid-0eb64fbc.js:568)

## Exact Kalemie30 consequence

The coordinator's completed original3905 diagnostic was read, not rerun. All30 exact pending keys have one original Kigoma operand, `gb:TZA:ADM1:36957248B11692782910073`, ordinal16 / negative ordinal0, and `kinds=["interior"]`; none reports an operand boundary tie. Their decision remains `territorial_exclusion_cells`. Thus the new evidence establishes the actual native exclusion contact at each key, not merely membership of an operand in a target's candidate list.

The frozen physical evidence classifies these30 as inland water. That does not make an administrative lake boundary irrelevant: jurisdiction can extend over water. Conversely, a native centre contact with a historical source polygon does not independently establish territorial entitlement. The inspected treaty, modern AU process records and original source/target archives still leave the relevant source-construction and spatial-applicability gap. This supports a bounded researched-unresolved proposal for independent assessment; it does not clear the veto, award acceptance or transfer a conclusion to Fizi/Moba.

The code itself labels scan membership as neither scientific approval nor native topology verification. [Source lines178–180](/Users/chengshuli/Documents/Codex/2026-10-24/task/kalemie30_delimitation/native-grid-0eb64fbc.js:178)
