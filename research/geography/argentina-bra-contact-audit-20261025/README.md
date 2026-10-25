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
