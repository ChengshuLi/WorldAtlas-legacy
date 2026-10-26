# TLS original 562-cell native diagnostic

Private diagnostic receipt; no owner or selected-bank write, qualification, acceptance, or credit is asserted.

## Request and custody

- Original package `gb-TLS-ADM2--repair-evaluation`: 562 land cells, 337 interval rows, 22 owner indices; original interval commitment `ac5206324585780f9b18140fd8affd94a327349c1747af468ec9b7869dfa7384`.
- Candidate patch at `../native-patch-original-001/native-patch.json`, SHA-256 `b134c0ba21f444501c095c34a7aeefec4084f1baa2ec09c6f68ba5078e78662a`: expansion conserves exactly 562 `(y,x,owner-index)` keys, with no duplicate, missing, or extra keys.
- Current selected-owner observation is kept distinct from the original request: observation SHA-256 `13b4b4c054ba2b769eab3862068c54a613f7caba40919086aa51ea6185eb32b8`; selector pin `f3876c7d7489fc1fee437ad904f9b54fffdc1366:data/ownership-selection.json`, SHA-256 `a6dfdc5018d123177b09d28f063055be8c038c88e4469d5f3371a311992bf957`; the 562 observed effective selected-owner values are zero.
- Source-evidence input `source-evidence-007/source-evidence.json`, SHA-256 `0bf82bbf3f79bd47725d3b6336a99095d48d04bcf21c833b8d11822f6a3a9eca`; it binds 22 exact TLS ADM2 target features, original owner indices, physical support and land-only coverage rows.
- The source-contact inventory `source-evidence-003/source-contact-inventory.json`, SHA-256 `f77cd1c241bf46631902713039cfb29b1facafda0f3da3244b19a2ae08b2d424`, retains all 31 source-feature identities and complete pins for TLS ADM2 (65 features), TLS ADM1 (13; parent-tier context), and IDN ADM1 (34; foreign comparator). Only TLS ADM2 is an active typed positive family in this diagnostic. The other families are preserved as complete context operands in the sidecar and are not asserted as reviewed territorial exclusions.

## Diagnostic result and limits

The accepted `native-diagnostic` phase reported 562 requested, 562 supported, 0 held, and `first_failure: null`. `physical_witness_kind_rows` is empty, meaning no requested native center was projected onto a recorded physical witness issue geometry. This does not clear whole-target physical issues.

The retained whole-target result `physical-001/whole-target-support.json` (SHA-256 `ea5172af4f5be965d92f4c287f7812d0148594c26cc49013dcefeb3d91fc3f93`) still records one `extra_reconstruction` issue for Hatu-Udo, owner index 42188, source ID `gb:TLS:ADM2:22284137B3809405900530`. All source-vintage, source-role, rights and lineage caveats remain. The recorded TLS ADM2 license is a source-level declaration, not independent rights clearance.

This phase emits diagnostic rows only. It does not produce constructor authority, current-owner-zero acceptance, a selected-output change, or scientific credit.
