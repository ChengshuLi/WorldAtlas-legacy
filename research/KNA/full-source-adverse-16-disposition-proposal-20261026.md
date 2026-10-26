# KNA 16-key full-source adverse disposition proposal

Date: 2026-10-26
Status: **private source-free proposal for root science review; not accepted, not credited, no ownership or ledger mutation.**

## Exact scope and commitment

The frozen KNA repair evaluation is **305 unique keys in 125 original interval rows**, owner lineage `7119`, ten source-feature groups. The separately accepted Nevis subset has 57 keys and remains unchanged as researched-unresolved. The residual St Kitts subset has 248 keys. Within it, retained comparison evidence identifies **232** centers inside both source variants and **16** centers inside only the consumed simplified variant but outside its retained full-source counterpart. This proposal concerns those 16 only; it does not reopen or re-credit the 57 Nevis keys, include the 232 patch, or include the separate 154-cell companion.

Exact 16 tuples use canonical SHA-256 over UTF-8 compact JSON of numerically sorted `[owner,y,x,source_feature_index]` arrays, no trailing newline. Count: 16. SHA-256: `ac6cceb694727140cc427f9e881aa17a33c4e0033ec0704e2686d78bc6d64ff9`. These tuples match the retained `full-source-outside-16.json` commitment and map to the original inventory's exact interval rows below.

| source feature index | Source feature name | 16-key count | original interval rows containing these keys |
|---:|---|---:|---|
| 41036 | Saint Anne Sandy Point | 2 | 13, 15 |
| 41037 | Saint George Basseterre | 10 | 33, 34, 38, 41, 43, 46, 58, 72, 75, 84 |
| 41040 | Saint John Capisterre | 1 | 7 |
| 41047 | Saint Thomas Middle Island | 2 | 19, 20 |
| 41048 | Trinity Palmetto Point | 1 | 24 |

| owner | y | x | original source feature | source ID | original interval row | interval [y,x-start,x-end) |
|---:|---:|---:|---|---|---:|---|
| 7119 | 118206 | 85349 | `41040` | `gb:KNA:ADM1:52472329B65639645183115` | 7 | `[118206, 85349, 85353]` |
| 7119 | 118220 | 85304 | `41036` | `gb:KNA:ADM1:52472329B96254136738283` | 13 | `[118220, 85304, 85305]` |
| 7119 | 118229 | 85303 | `41036` | `gb:KNA:ADM1:52472329B96254136738283` | 15 | `[118229, 85303, 85304]` |
| 7119 | 118254 | 85319 | `41047` | `gb:KNA:ADM1:52472329B72200716330993` | 19 | `[118254, 85319, 85320]` |
| 7119 | 118255 | 85320 | `41047` | `gb:KNA:ADM1:52472329B72200716330993` | 20 | `[118255, 85320, 85321]` |
| 7119 | 118283 | 85356 | `41048` | `gb:KNA:ADM1:52472329B86967002358759` | 24 | `[118283, 85356, 85358]` |
| 7119 | 118295 | 85395 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 33 | `[118295, 85391, 85398]` |
| 7119 | 118296 | 85396 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 34 | `[118296, 85396, 85397]` |
| 7119 | 118298 | 85417 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 38 | `[118298, 85417, 85419]` |
| 7119 | 118308 | 85439 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 41 | `[118308, 85439, 85440]` |
| 7119 | 118323 | 85452 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 43 | `[118323, 85452, 85453]` |
| 7119 | 118328 | 85452 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 46 | `[118328, 85452, 85454]` |
| 7119 | 118338 | 85451 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 58 | `[118338, 85451, 85456]` |
| 7119 | 118344 | 85450 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 72 | `[118344, 85450, 85457]` |
| 7119 | 118345 | 85451 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 75 | `[118345, 85451, 85457]` |
| 7119 | 118353 | 85452 | `41037` | `gb:KNA:ADM1:52472329B55778484611891` | 84 | `[118353, 85452, 85456]` |

## Source-variant assessment

The consumed simplified payload is the retained geoBoundaries KNA ADM1 feature set (compressed SHA-256 `618711a0aee394b225561fa108794b4e2c7bd7530c52ed46f9c0e5b3d3f659ed`; decoded GeoJSON SHA-256 `5d94bc5303f78b68e4f0ba5783611f7c292540e72776aa236c53883560d1ebcd`). The distinct retained `gbOpen` `sourceData` archive is 153,021 bytes, SHA-256 `696004e61ce360245bd87372973f8420ecba6139299a2f9ae2105acde7ef1909`. Its ArcGIS lineage metadata identifies an OSM-Boundaries product processed 2021-06-14 (`OSMB-5769933f0a034e85bc4d672674692358a33729f8`), but does not pin the exact upstream OSM snapshot/version. Both variants join the same 14-feature KNA family; the exact 16 rows are assigned to their frozen own feature IDs in the original inventory. The retained all-14 comparison reports no boundary or other-feature contact for these 16.

For the 16, the qualification result is adverse and precise: point-in-polygon under the recorded native center method returns simplified `inside`, full `sourceData` `outside`, and no other full-feature contact. This is not evidence that the center lies in another parish; it is a cross-version disagreement. The simplified-only result can support a narrow source-relative description against that consumed derivative, but it does **not** resolve whether the derivative’s boundary generalization is acceptable for assignment where the retained full source excludes the same center. Because the current retained evidence does not choose which geometry variant controls this exact boundary case, I do not recommend a positive repair for any of the 16. I recommend a finite **researched-unresolved** disposition for these exact 16, pending a source-variant decision or a corrected/otherwise supported per-feature geometry that resolves these specific disagreements. No universal legal-boundary certificate is required for this recommendation.

## Other retained predicates and limits

- The original inventory marks the keys as land-class rows, but this is not a per-key physical-footprint predicate. The retained physical run is feature-level for ten target features; it does not give a separate physical qualification for each of these 16 centers. It records extra reconstruction findings for features 41039 and 41040 and a missing reconstruction finding for 41043; those whole-feature flags are preserved and not converted into per-key results here. Of the 16, only feature 41040 appears among those named flagged features.
- The recovered native diagnostic and partition document the 232 supported cohort, with 73 held in the full 305 partition; these 16 remain in the held complement rather than the 232 patch. The 57 accepted Nevis rows are carried through unchanged. A prior selected-owner observation at the e7aa pin returned effective selected owner 0 for the original 305 scope; it is not a current-owner positive for these 16. The later 232 current-target result does not cover them.
- Recorded rights evidence is mixed: 2021 archive `meta.txt` says CC BY-SA 2.0; the bundled OSM notice says OSM data is ODbL 1.0 and documentation is CC BY-SA 2.0; geoBoundaries separately states CC BY 4.0 for code/derivatives with attribution and source citation. The existing merged KNA232 notice at `research/KNA/scoped-odbl1-232-offer-20261026/SOURCE-NOTICE.md` (main commit `d50487a45d33b1ad20dc06de8032d7670b4b19f2`) provides scoped attribution text: “Contains OpenStreetMap data © OpenStreetMap contributors,” with <https://www.openstreetmap.org/copyright> and ODbL 1.0 <https://opendatacommons.org/licenses/odbl/1-0/>; geoBoundaries gbOpen KNA ADM1 (represented year 2021), with <https://www.geoboundaries.org/> and CC BY 4.0 <https://creativecommons.org/licenses/by/4.0/>; plus the archive conflict disclosure. That notice grants ODbL only to the 232-cell assignment table and schema; this 16-key dossier is not included in that two-file grant. This memo repeats the relevant attribution/terms context, makes no new license grant or clearance claim, and leaves any applicable public-use license for these 16 derived rows unresolved. The conflicting statements identify provenance and an unresolved applicability question, not a specific prohibition. No rights conclusion is inferred for these held keys.
- The compact-country owner contract concerns the country feature. This dossier does not demand parish-law geometry or a sovereignty certificate. It does require resolving the concrete retained source-variant disagreement before treating the 16 simplified-only centers as source-supported assignments.

## Retained exact evidence and provenance

No source/geometry processing was run for this proposal. Inputs reused:

- `frozen original inventory` — `original-key-inventory.json`; SHA-256 `19cb0bb0c1d5eb508b93459e07a18d15f97b222083833501f3e39b926dbe64ca`.
- `exact 16 tuple packet` — `private-conditional-release-bundle-20261026/inputs/full-source-outside-16.json`; SHA-256 `420f448eb724398e3d8f68572956f454686c7ea49b2f5205a2eb4e6c1b190897`.
- `retained 248 center comparison result` — `private-conditional-release-bundle-20261026/output/source-center-reproduction.json`; SHA-256 `9469153a90185a8679f6e63d04630ee8c8764b4756bc942c00a1be7db8271517`.
- `comparison execution receipt` — `private-conditional-release-bundle-20261026/output/source-center-reproduction-execution-receipt.json`; SHA-256 `fbad1257329f5015c34c9cf2faf5b5697b5f77c160f22a0409b4b074697c6514`.
- `full source ZIP SHA-256 (recorded)` — `parent/retained sourceData ZIP`; SHA-256 `696004e61ce360245bd87372973f8420ecba6139299a2f9ae2105acde7ef1909`.
- `consumed simplified payload SHA-256 (local file)` — `assets/gb-KNA-ADM1-000.bin.gz`; SHA-256 `618711a0aee394b225561fa108794b4e2c7bd7530c52ed46f9c0e5b3d3f659ed`.
- `native latitude table SHA-256 (recorded)` — `research/shared/native-row-latitudes.f64le.gz`; SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`.
- `accepted 232 patch SHA-256` — `private-conditional-release-bundle-20261026/output/native-requested-patch-232-reproduced.json`; SHA-256 `7aae92f5b3d3d8570c0910bbf0e8bc48f575f1f44e14e0adec85e32fd208601c`.
- `selected-owner observation (historical pin)` — `current-selected-owner-observation-e7aa-20261025.json`; SHA-256 `466ab32df42434c26528dae6b3b3705c8e034ba0d7376161d7bc8c1bae9efb84`.

The executed source-center comparison receipt states: original 305 = accepted Nevis 57 + both-variant interior 232 + simplified-only/full-source-outside 16; 248 St Kitts residual keys; 125 intervals; 232 patch assignments across 61 rows/79 runs; zero other-feature contacts for the comparison; 154 companion excluded. It records the exact method: binary64 native longitude, exact pinned latitude by row, exact boundary comparisons without epsilon, even-odd polygon-with-holes, and source-feature ID/name join. The result is source-center contact only; it does not prove full-cell physical support, current owner, ledger acceptance, legal effectiveness, license applicability, or credit.

**Requested root decision:** review whether the exact 16-key cross-version conflict is sufficient for a researched-unresolved recommendation while preserving the accepted Nevis 57 and the separately supported 232. No new status, acceptance, credit, ownership, PR, or public release is requested here.
