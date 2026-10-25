# Independent review of bounded source-free decision packet

Reviewer: `/root/ssd_sources`, a native worker distinct from the coordinator/assessment author. Review mode: internal, read-only. Reviewer did not access raw geometry or cell coordinates and did not alter package status or credit.

## Files and exact reviewed bytes

- `ARG380-source-application-assessment-v3.md` — original review pass: SHA-256 `7e7dd15b79d89b627331b3f983dda946b64722bdcfcd1b0511aa7bd5ca16201e` (5,687 bytes).
- `ARG380-source-application-assessment-v3.md` — focused follow-up at the current public head: SHA-256 `1ee789a7195d7fb2bd432d8248f9c639d86b30b695ffb8243f957f0af1ac4e7a` (5,982 bytes).
- `ARG380-BRA-22-native-center-application.json` — SHA-256 `2c06a25409c9e1682f7d13b88582cc10287e36928221e7e74508c5ad18e1b928`.
- `GBR640-source-free-decision-proposal-v2.md` — SHA-256 `a7453575c430f5840f87a4e21ff0e59430ef1a0fd0ec43247e1c8222f1108902`.
- `PER727-source-free-proposal-v5.md` — SHA-256 `bfe527d5553a4fe2b58f9d27576b67539929b18c10aa9b37bef1426948f386c0`.
- `CAF312-source-application-assessment-v2.md` — SHA-256 `6eac628756d1f384eb033d0f571ae809b2f5acc59f5e2260ee4d11801f7919cd`.
- `SSD93-source-relative-candidate-proposal-v2.md` — SHA-256 `548bad615d5769d0028650ef76c270c6b9e7b5864542aaa9d57bd22cbf293713`.
- `Coordinator-decision-matrix-2026-10-25-v3.md` — SHA-256 `8601c21eb77391b30361d3f0e2848bacb04674befdc46935fbf01b68eb41746d`.

## Review findings

The initial review pass found no specific defect or overstatement in the files it reviewed. The proposals include exact cohort accounting, source roles and vintages, methods, and bounded remaining issues. They distinguish center/roster evidence from legal, ownership, or positive conclusions and keep all proposed outcomes subject to root's science review.

A focused follow-up then inspected the current 5,982-byte ARG v3 file and found that its added partition summary is internally consistent with the previously recorded sanitized tuple-reconciliation result: 22 + 358 = 380; 358 = 350 + 8; the common-order original and union hash is `c9bd7cc1460216b95b577966743a25ed35a3c022b21533c5b641c7cd40fd9cd1`. The reviewer did not access or re-run the private tuples in this follow-up. The original review's stale `7e7dd15b…` pin referred to the prior 5,687-byte version; this record now distinguishes the two review scopes.

Arithmetic reconciles: ARG `350+8+22=380` and BRA feature counts `245+111+24=380`; ARG22 partitions `10+9+3=22`. GBR has 33 original members and 640 contacts, with City of London at zero/negative-only. PER splits `686+41=727`. CAF selects `181+131=312`, leaving 149 held keys outside the proposal. SSD owner strata total 93; 99 feature memberships reflect six UGA overlaps.

ARG private-tuple reconciliation was completed in the original review pass: the reviewer verified the 22-key set, the 350 same-name plus 8 different-department set, and the original 380-key set pairwise disjoint/complete by exact `(owner_pixel_index,x,y)` tuples. The union equals all 380 original keys, with zero duplicates, missing keys, or unassigned keys. The reviewer and coordinator independently confirm the original 380 set hash is `c9bd7cc1460216b95b577966743a25ed35a3c022b21533c5b641c7cd40fd9cd1` under sorted `[owner_pixel_index,x,y]`; the earlier source artifact’s `469eca5e...` is the same cohort hashed under sorted `[y,x,owner_pixel_index]`. Thus the apparent hash difference was an ordering convention, not a set mismatch. The reviewer verified private input file SHA-256 pins and reported no tuple values, coordinates, or geometry. The later focused follow-up checked only the updated public summary against this prior reconciliation; it did not repeat tuple access.

**Conclusion:** each packet is decision-ready as a candidate for root review only. This review does not accept science, change status or award credit.
