# Argentina BRA ADM1 contact reconciliation

This source-only audit reconciles the exact BRA ADM1 contact records in Argentina’s retained foreign-contact ledger against the accepted supported baseline. It makes no ownership change, clears no hold, and assigns no repair or researched-unresolved credit.

## Results

- The original foreign-contact screen has 1,025 rows. Filtering by the three exact BRA ADM1 source IDs yields **380 unique `(y, x, pixelIndex)` rows**: 245, 111, and 24 respectively. All 380 occur in the 6,149-key held ledger.
- The merged PR #2399 delivery contains the **22,697-key accepted positive patch**. Its expanded `(y, x, owner)` set exactly matches the nonzero `accepted_additive_owner` set in the pinned PR #2566 selected-owner observation. Both sets have 22,697 unique coordinates. The 380 BRA contact coordinates have **zero overlap** with those positives.
- The earlier **383-row** figure comes from a broader difference between BRA-exclusion target-coverage candidates in source-evidence inputs 001 and 002. It includes the 380 direct BRA contacts plus three candidate-only tuples. Their original foreign-contact rows list only Paraguay ADM1 source IDs, so they are not direct BRA ADM1 contacts.

This is exact key and source-ID accounting. It does not establish the legal applicability, current boundary, lineage, or whole-cell fitness of the BRA source polygons. The original 380 rows remain held under the existing disposition.

## Reproduction

Run `python3 research/geography/argentina-bra-contact-audit-20261025/reproduce.py` from the repository root. It verifies the pinned Git blobs and byte hashes, reconstructs the source and positive sets from the retained packet, checks conservation and overlap, and prints the result JSON. Inputs and immutable pins are in `pins.json`.

The accepted baseline is grounded in the merged [PR #2399](https://github.com/ChengshuLi/WorldAtlas/pull/2399) delivery and [PR #2566](https://github.com/ChengshuLi/WorldAtlas/pull/2566) readback. PR #2382 is closed and unmerged; its target-coverage candidate difference is used only to explain the 383-versus-380 discrepancy, not as evidence that its proposed patch was accepted.

## Separate source-index resolution for four retained fitness holds

The original source-feature roster uses a one-based global `source_index` and explicitly records each source family, source ID, zero-based local `ordinal`, name, and owners. The four retained fitness-held keys map as follows: owner 7771's `(159121, 89292)` uses source indices 675 and 1030; owner 8259's `(160221, 89685)`, `(160237, 89674)`, and `(160253, 89665)` use indices 675 and 701. Index 675 resolves to the Buenos Aires ADM1 parent; 701 resolves to Pinamar ADM2; 1030 resolves to Castelli ADM2. The exact roster rows and file hashes are in `source-index-mapping.json`.

The mapped local ADM2 ordinals (Pinamar 3 and Castelli 332) match the corresponding features in the pinned 525-feature consumed source payload. This resolves source-feature identity only. It does not establish the seven-component source-fitness criterion, boundary applicability, or any disposition change for the four held keys.

## Pinamar held-cell comparison against official IGN captures

`pinamar-source-capture-comparison.json` records a point-level comparison for owner 8259's held key `(160253, 89665)`. The key is inside the consumed simplified geoBoundaries Pinamar polygon and outside both the captured IGN `departamento.1085` polygon and the IGN IVSD 2024 Pinamar polygon. A distinct worker independently reproduced the grid center and outside result from the pinned row and raw response digests. The other three held Castelli/Pinamar keys were inside all compared polygons.

The source roles and dates differ: the consumed geoBoundaries ADM2 item is an administrative-registry product with a 2020 represented-year claim; its retained source record gives a CC BY 3.0 IGO licence and the exact consumed payload pin. The current IGN department WFS capture identifies ARBA as feature capture source and IGN as authority but does not establish an effective date. The separate IGN IVSD 2024 layer is a risk indicator product whose official metadata says departmental boundaries correspond to CNPHyV 2010. The two IGN response captures have distinct URLs, byte lengths, SHA-256 digests and capture times in the JSON. Raw geometry bodies remain local and are not published in this source-free record.

The outside result is a source-geometry disagreement for this cell; it does not select the legally applicable boundary or satisfy the seven-component fitness criterion. The key remains held. The earlier 53.5 m distance estimate was invalid because it cosine-scaled latitude as well as longitude; independent corrected local distance calculations are about 56.0–56.1 m. No status, clearance, or credit change follows.

The official Decree-Law 9024/1978 page (HTTP 200, 16,982 bytes, SHA-256 in the comparison JSON) describes Pinamar's bounds; Article 3's southern line refers to a Dirección de Geodesia survey for Estancia Cariló. Its retrieved HTML exposes no attached map, survey identifier, implementing-decree identifier, or feature crosswalk. Decree-Law 9949/1983 (HTTP 200, 4,301 bytes, hash pinned in the JSON) only changes municipal names and provides promulgation/publication text. The next qualifying evidence is the referenced survey/plan and any implementing instrument, explicitly crosswalked to IGN `in1=06644`, plus the effective date/lineage of the live IGN department feature and any later boundary amendments. A complete scale-aware legal/current polygon comparison and the remaining source-fitness components are still needed before reconsidering disposition.
