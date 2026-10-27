# TKM combined 411-cell candidate: Tejen 207 + Ak Bugday 103 + Koytendag 101

**Status:** candidate evidence only; not root acceptance, hosted delivery, or resolution of the complete original package. This packet combines three disjoint land cohorts for a bounded current-bank candidate while preserving the original 1,759-cell package denominator and all remaining/pending scopes.

## Scope and accounting boundary

The original queue record is `coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json` (source commit `23318dd9d70680495138297b9cc1a7533a466200`; SHA-256 `78007430b6f9faedb188ef0619b7ff0a7a2cc7fff2ec9f1c41ee69936ec4ebd8`). It defines `gb-TKM-ADM2--repair-evaluation` as 1,759 native cells (1,622 land, 137 inland-water), 1,001 intervals and 45 owners. The accounting snapshot at `/workspace/shared/worldatlas-root-acceptance-after-TKM187-2946-20261027.json` (SHA-256 `d94a86153e80d615a5cbc4f8ab5bea41d1311d024afe1155878086a0eecc1ecf`) records 297 accepted (240 positive, 57 researched-unresolved) and 1,462 pending before these candidate additions. This is a historical snapshot, not the current global ledger. The three candidate cohorts total 411 cells and are disjoint from those accepted 297; they remain pending until root acceptance. If all 411 were later accepted, 1,051 cells would still remain outside these cohorts and the prior 297; no whole-package completion is claimed.

* **Tejen:** 207 land cells, owner index 42144, target `gb:TKM:ADM2:10190150B49022220136906`.
* **Ak Bugday:** 103 land cells, owner index 42135, target `gb:TKM:ADM2:10190150B31923585689840`.
* **Koytendag:** 101 proposed land cells; 26 additional contacts remain held due to exact AFG foreign-source contacts. The 101 candidate keys are not a clearance of the remaining Koytendag contacts.
* No water cells are included in the 411. Distinct unresolved Dostluk6 remains separate; other residual keys remain pending. No other owner reassignment is proposed beyond the stated targets.

## Source, contact, physical, and native evidence

The packet preserves distinct consumed source-geometry and selected current-target geometry roles, including full and simplified source variants; these are not interchangeable. For Ak Bugday the exact full and simplified source candidate sets agree on all 103 centers, with no ties. The complete AFG, KAZ, and UZB foreign source families are retained as negative/competitor evidence; absence of a captured foreign-center incidence is not clearance. Tejen/Ak Bugday source, physical, native, and constructor evidence is retained from the preceding reviewed work. Koytendag’s 127-key cohort partitions into 101 candidate and 26 held; its consumed simplified geometry has 96 points, same-edition full comparator 104 points, and selected accepted target geometry 129 points. Its physical result is whole-target context only—not per-key or whole-unit clearance. The 26 held keys remain associated with the AFG contact evidence. Exact paths, hashes, configurations, and receipts are enumerated in `MANIFEST.json`.

## Current candidate bank comparison

The current candidate was refreshed by the supported finalizer on exact accepted main `a0b1d2d9164ffd61f9a8a20cb2eb7f259d47506f`. The finalizer configuration is `coordination/engineering/tkm-411-combined-20261027/finalize-007/config.json` (SHA-256 `ea20fe44c9c34f06081a1435273bb6ce6837d18f2c1163d0a6de8752f5989725`); it pins selector/package inputs to that accepted base and has no prior-finalization inheritance. The resulting startup index SHA-256 is `5aee1cb64cb07fc034a724ee4fc7208a36f38d1c7cf85a88c0bc859847511b79` (49,610 bytes).

`coordination/engineering/tkm-411-combined-20261027/full-bank-comparison-002/raw-report.json` (115,552 bytes; SHA-256 `ee9d6e6849ac1a6de74075065de26c8f56f75de22631fd6244743c2781b7c5f2`) and `comparison-receipt.json` (2,089 bytes; SHA-256 `47ef519e1d878eb2e360660a7a1abbc7984b1228f3c92aee25ef3c11bd0ff08c`) record a trusted comparison from accepted base a0 to candidate commit `291a6a77aa9ef6109556419d166adeff4d496ab0`. It compared 262,166 rows: +411, 0 removed, 0 reassigned, 0 lost; status `no-new-native-loss`. The trusted execution-code inventory was unchanged. The helper’s `candidate_code_executed` flag reflects differing checkout HEAD metadata even though no trusted execution-code paths changed; it should not be read as candidate code having executed.

## Limits and next lifecycle steps

The current-owner-zero basis is derived—not a fresh literal query—from the pinned original 1,759-row observation and exact disjoint accepted additions since that observation. Full/simplified/source, physical, native, and constructor results are scoped as described; they are not independent legal identity, per-cell physical certainty, or root acceptance. Earlier failed and interrupted attempts remain in history and are not substituted for the current successful run.

The current reviewed hosted test/build/geography/emitted-control workflow has not yet run. The exact current-pair plan is seven tests: requested `final-bank-finalizer`, `final-bank-checkpoint`, `selected-owner-observation`, `selected-delivery-smoke`, and `map-cell-diagnosis`, plus helper-required `compact-ownership` and `prepared-parity`; full profile, build=true, 15 execution inputs, 74 checkout patterns, geography required=true/software=false. This candidate awaits independent exact-head review, the serialized hosted handoff, and root’s separate scientific/accounting decision. Preserve all other residual TKM classifications.
