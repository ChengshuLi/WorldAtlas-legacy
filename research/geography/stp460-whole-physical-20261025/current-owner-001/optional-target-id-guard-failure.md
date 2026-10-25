# Exact accepted-bank optional-target-ID mismatch

The stock `supported-inputs` invocation at CODE/DATA `2d568e7f795bada30acdfc2d2403e6214270d82a` terminated exit1 with `Supported source owner identity differs from accepted final bank`. It ran from01:20:49 to01:36:43 UTC on2026-10-25 and produced no completed destination. The actual command and terminal are retained in `current-owner-launch-001.json` and `.log`; no retry or helper edit occurred.

The supplied accepted selector is public main `53002fd1eca5114a82e45fec32bddfc3ab52aa35:data/ownership-selection.json`. Its selector and startup-index blobs equal the author's committed selected state. The source evidence is `4818be60cc22237cb7edce415868da8047e54734:research/geography/stp460-whole-physical-20261025/source-evidence-001/source-evidence.json`, SHA256 `24e383ab8cda328991181c21acb7ea07d35ea668fe020166b3199a362c022e7d`.

Its two targets have `id` and `pixelIndex`, with optional `target_id` absent:

- 40323: `gb:STP:ADM1:19237168B40253326356618`.
- 40324: `gb:STP:ADM1:19237168B82261817076051`.

The original native consumer resolves these direct members with `target.target_id ?? target.id` (selected-neighbor-prevention.mjs1615 and1866). The completed460-cell native diagnostic accepted this valid ordinary form. The accepted-bank preparation instead compares `identities.get(target.pixelIndex) === target.target_id` at prepare-delivery-handoff.mjs1548–1550. It therefore compares each real accepted ID to `undefined` and stops before the per-key ownership intersection.

The actual accepted context body was read using the current index's explicit offset/features declaration, not an index-to-source-part shortcut. Both accepted `id`/`pixelIndex` pairs exactly equal the two original source/native identities; the full encoded/decoded context binding and records are retained in `accepted-two-owner-context-read.json`. This evidence establishes a contract mismatch, not an observed owner remapping. It does not establish owner-zero by itself.

The coordinator is routing the mismatch to the existing machinery role. This geography worker has not changed shared code, added ad hoc source fields, rewritten the issued evidence, retried the failed stage, or relabeled its failure as success. A future engineering correction must retain rejection of a genuinely wrong explicit target_id; the missing optional field cannot become an unknown-owner exemption.

The existing `scripts/observe-selected-owners.mjs` supplies a separate documented literal owner-state observation. It derives the complete original package intervals, authenticates the selected index and original owner roster, and reads only required final row/run words. It explicitly emits scientific_qualification:false, current effective selected ownership, and null historical base/additive fields. Its source blob `6c5c2aa96eb79f39f64c7107b61616e3a0952356` is identical in the author checkout and accepted53002. The coordinator authorized one such read for `gb-STP-ADM1--repair-evaluation`, preserving the source/native input and this failed guard. It is not source/physical/native-predicate replay or a claim that the defective guard passed.
