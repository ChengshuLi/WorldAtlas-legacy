# CAF exact37 source-applicability decision and diagnostic result

## Scope and decision

This note records the parent-authorized, dated USCB/LSIB source-role decision for exactly 37 residual native cells: 20 owned by Salo (owner 10567) and 17 by Yobe-Sangha (owner 10668). The canonical unique-key set SHA-256 is `ab9762dbcd35162a2db959b5419add3ad70bdbc0b3a687d415535e3293ff3fbf`.

Those 37 keys have 38 already-recorded foreign negative incidences (canonical incidence-row SHA-256 `8b8483b90bc84ed4cda45a7a11b78a0897342339b748f0c25772aa276d9ec34c`). Salo has 21 incidences and Yobe-Sangha has 17. The preserved operands are 36 CMR ADM1 incidences (feature ordinal 5, geometry SHA-256 `906fad80db92160e7686b0140865e24805f32e2d1190a465adcbfedc73673818`), one CMR ADM2 incidence (ordinal 15, `7b4c77a55745435f8e43fa7b15b2b0d7fe4d94f0eb6b072c70c34e56df96865f`), and one COG ADM1 incidence (ordinal 4, `87cdd75ecd99b913dd104604452d9fcace3439b5a4618cf3e410421865ea1760`). Exact owner/key/negative-ordinal/operand-index bindings remain in `scope.json`; the original negative evidence is retained.

The adopted interpretation uses the USCB 2021 national population-mapping outline as dated context for those 38 incidences only. The product was cited 2023-02-24; its metadata records LSIB accessed 2022-12-14 and OCHA data downloaded 2017-07-20, with 2003 OCHA FISS boundaries reconfigured for 2021 census mapping. This is not a legal or de-facto-control boundary ruling, does not make a cell wholly CAF, does not replace the original CAF target geometry, and does not clear source rights or all 13 foreign exclusion families. It grants no positive adoption, credit, or status change. The 26 other inside candidates and 86 outside keys remain out of scope.

The original 2018 CAF target/source evidence, all 13 foreign exclusion families, and the 25 previously accepted cells (15 Salo, 10 Yobe-Sangha) are preserved. The source-application receipt's three centers within 100 m remain descriptive near-edge flags; that distance was not used as a decision threshold.

## Physical evidence and native diagnostic

The physical stage was run for all 34 target geometries in the retained source evidence, not only the two owners in this decision. The exact stage input is `physical-003/stages-current34.json` (105,977 bytes; SHA-256 `15b795492ff61497fa71e1ac26493f76b94a332539809c617bc9cd9b0e0ba5d3`). Its result is `physical-003-result/whole-target-support.json` (166,128 bytes; SHA-256 `ed44f4e8e48a240e18bd5453c0f1c600cdf05e7b96075263eec024c191aaa0d2`) with execution receipt `physical-003-result/execution-receipt.json` (122,960 bytes; SHA-256 `9d38f9cb515da6114b789a1a63fe0ee85c673e37776ba4b5eef066d8065935aa`). This whole-target mapped-land result does not itself establish a source-member-matched coverage span at each requested cell center.

The accepted exact37 native diagnostic requested 37 cells and supported 0; all 37 remain held, 20 for Salo and 17 for Yobe-Sangha. Every cell's reason is `unsupported_coverage_cells`; the first failure is `unique-source-target-coverage`. The diagnostic records 38 contextual negative contacts and no physical-witness rows. The candidate-only source-evidence projection retained both target records, all 13 negative families, and the existing source/physical provenance while limiting coverage rows to these 37 requested centers. Its result is `physical-003/native-diagnostic-exact37-result/native-diagnostic.json` (143,903 bytes; SHA-256 `25229b2973ed2dff13c48d791c811321bb9316b2c4199a6072e47b1493dab5ba`).

The failure means the native diagnostic lacks a positive coverage span, matched to the active source member, covering each requested center. The dated national-side interpretation contextualizes negative incidences; it does not create positive source coverage. No checker, geometry, original target, prior accepted cell, or status was changed to obtain this result.

## Retained pins

- `decision.json`: exact37 source-role decision; comparator product, date, role, and limitations.
- `scope.json`: 37-key and 38-incidence counts/hashes, owner split, source feature ordinals, and geometry hashes.
- `territorial-applicability.json` and `physical-003/territorial-applicability-correction-002.json`: original and corrected retained applicability records; correction changes the COG ADM1 decoded hash to the exact catalogue value.
- `physical-003/source-evidence-62-physical003-corrected-002.json`: full technical evidence view retaining both target owners, all 13 negative families, prior 25 plus exact37 coverage cells.
- `physical-003/source-evidence-exact37-diagnostic.json`: candidate-only diagnostic projection; SHA-256 `9b032e5f88cde3d7b7792ba4d9a2442928c56656293a79ed8beaea1f6c533f53`.
- `physical-003/native-diagnostic-exact37-result/native-diagnostic.json`: exact37 diagnostic output above.

This is a research and diagnostic record only. The 37 remain held pending the missing source-member-matched coverage evidence and any other required native predicates; no scientific acceptance or credit is claimed.
