# JOR656 measured-source / accepted-target identity join

This is a derived contextual join, not a second physical run. It preserves the exact `consumed` source features from `physical-input-001/original-stage-inputs.json` and adds the `selected` canonical target identity/geometry from the accepted source members in `data/geography/part-11.json`. The physical producer executed on `physical-input-001/original-stage-inputs.json` only; its run and actual input are bound by `physical-001/execution-receipt.json`. The added selected geometry is used by the source-target native evidence checker to bind a measured source member to the existing canonical owner. It did not affect physical computation.

- Context input rows: 16; exact source IDs are enumerated in `physical-input-001/target-owner-crosswalk.json`.
- Actual physical producer input SHA-256: `e64d3754080cf744816ad1afb7e4a1805b6ac8bb7be63f9e999d7a32b03bc27f`.
- Accepted canonical-part source: `data/geography/part-11.json`; every target ID has a direct same-ID canonical feature. This is an identity join, not a name or geographic crosswalk.
- Context input: `coordination/engineering/jor656-repair-evaluation-20261026/physical-context-001/source-physical-canonical-context.json`, 493522 bytes, SHA-256 `295e783a998c054071249ed5cd7d82efd27a0b6776a420a0adcdd60e8bce44f9`.

No physical results are recomputed or reassigned by this join. Target-level GSHHG issues remain exactly as reported in `physical-001/whole-target-support.json`; this file does not turn them into per-key clearances.
