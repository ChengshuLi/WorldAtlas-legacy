# Independent COD254 retained-accounting review

Reviewer: residual_land_west; own CODEX_THREAD_ID 01a16f2e-19a2-7470-acfd-59b39f3e90d1. Date:2026-10-24.

Result: PASS for exact retained-key accounting. Independently read the pinned diagnostic directly from commit:path through Git2.53 with lazy fetching and replace objects disabled. Matched its SHA256 and the retained ledger identity. Parsed all14 local source rosters independently, checked their byte lengths and SHA256 values, expanded half-open native intervals, and compared exact triples. The coordinator script was read but neither imported nor executed. No native producer or geometry was rerun.

- Original3905 =2977 supported positives +928 held, disjoint with no missing, duplicate or extra original keys.
- All14 retained groups total674 distinct keys wholly inside held; no group overlap and no accepted-positive overlap.
- Held minus group union independently yields254, exactly matching both retained ledger and coordinator partition.
- Pending partition has zero missing, extra, duplicate, incorrectly ordered triples or misplaced owner assignments. Each stream is canonically sorted [owner,y,x]. Counts18/19/30/32/42/35/78.
- All2977 positive keys are preserved in disjoint reassembly. None is pending or subtracted as researched-unresolved.
- Frozen physical join has930 distinct keys; exact pending subset has189 land and65 inland-water. This reuses source classifications without new observation.

The Lunda115 expanded native rows and Mahagi16 accepted-input list are not globally sorted by [owner,y,x], but their coordinate interpretation is correct, their keys are unique, and set subtraction is exact. These are not output-order defects.

Code review: reconcile_pending.py correctly checks original partition, authenticated input rosters,674-key union, exact residual, class split and stream coverage. Its ledger comparison converts pending_keys to a set, so the script alone would not detect duplicate or unsorted ledger entries; this independent review explicitly checked those and found none in the actual pinned ledger. No correction to the current output is necessary.

Important scope limit: several retained proposal files still say proposal-only/no root acceptance. This audit verifies the precise roster identities used by the supplied accepted-group ledger; it does not independently authenticate subsequent public acceptance decisions or certify substantive research completion. Preserve that distinction in delivery. No cell credit, disposition, hold change, whole-package reinstatement, or Git mutation occurs here.

Author artifacts reviewed:
- cod254-verified-partition.json SHA256 656ba6320dc96c390c91250ec4b0599e1fec8e19c5f3a924bc0c5653fc443f2f
- reconcile_pending.py SHA256 7bbd972bde1b1ebceb35fd1df6eede66eeaa8005f37a1b713e687cbaad0b352c

Final independent evidence: cod254-independent-audit-v2.json SHA256 9ffa503832e35dbb887d5ed04c463a26f7d2e74ed6d742704f940148f5a9a367. This version adds explicit per-stream owner-set comparison and supersedes the first audit JSON. Reproducer: audit254_independent.py (writes only a new file in this worker scratch directory; an existing output deliberately prevents rerun overwrite).

No denied, pending or uncertain tool action in this audit. Scientific acceptance provenance remains outside this bounded accounting review.
