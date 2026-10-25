# CAF 312-key source-application assessment (source-free, v2)

**State:** decision-support proposal only. This note does not change package status, accept an exception, assign a boundary or owner, or award credit. It supersedes the v1 statement that no per-key source contact was available: exact native cell-center applications have now been completed for the 312-key subset.

## Scope and exact-key lineage

The original CAF package is 2,130 land cells over 1,319 intervals and 46 owners. The retained accounting is 1,669 previously supported plus 461 held. This assessment concerns only two disjoint subsets of the held ledger: CAF181 (181 keys) and CAF131 (131 keys). Their intersection is empty; their union is 312 distinct keys, and the other 149 held keys are outside these subsets. The exact set reconciliation is preserved in `CAF181-131-exact-set-reconciliation.md`.

The 312 rows retain exact original interval/source-index lineage. Candidate indices are contextual operand identities; their presence alone does not prove contact or causation. The following native applications tested those candidates against the exact key centers, using the retained half-open grid row/interval key selection, the pinned 262,166-row latitude table, and the existing `native-linear-evenodd-first-owner-v1` point-in-polygon method. No raw coordinates or polygons are included here.

## Results

| Exact original candidate | Distinct selected keys | Center inside candidate feature | Outside | Ties | Overlap with another candidate in its group |
|---|---:|---:|---:|---:|---:|
| COD ADM1 Lower Uele (source index 18730) | 127 | 127 | 0 | 0 | 0 |
| COD ADM1 Nord-Ubangi (18732) | 54 | 54 | 0 | 0 | 0 |
| TCD ADM1 Salamat (57091) | 50 | 50 | 0 | 0 | 0 |
| TCD ADM1 Logone Oriental (57102) | 41 | 41 | 0 | 0 | 0 |
| CMR ADM1 Adamaoua (18301) | 40 | 40 | 0 | 0 | 0 |
| **Total** | **312** | **312** | **0** | **0** | **0** |

COD group: 181 distinct keys, all classified once against both candidate shapes; 127 are Lower-Uele-only and 54 Nord-Ubangi-only, with zero multi-feature, uncovered, or boundary keys. Canonical SHA-256 of all sorted `[y,x,owner_index]` keys is `29a17396d1556a41ff71cb86d723fac8828109badaf46ab361aacaf0de2d97f4`; Lower Uele hit-set hash `685a1d82f988badb0ce08bc51f4cfd1e1376ba7ec733ad612807ad9058a4da8a`; Nord-Ubangi hit-set hash `46f59f498066869c9962334f6cdd1a92ba35af9e6fe3f9e956356dffff6b1375`.

TCD/CMR group: 131 distinct keys, all classified once against their recorded candidate feature; no overlap between the three feature groups and no uncovered key. The group key hashes are Salamat `b1cfc8708b37adc7f58611adfd71013aaa1a0631c228c2b9883b35bf05fa8b1e`, Logone Oriental `4b220d67b7e182dc41f80caa0d7d1140972a24a27abb19b6ffe79cc2ac95a5d1`, and Adamaoua `bd9cc3fa7e832cb59a9872fef0461f0f28970579e06f5bf266f09f98339cee2f`. Their disjoint union hash is `60158a6f155d3d2e0f9de870e32db08f546c2e725e0e8d8cf3a11ef690f8eb17`.

The independently reconciled CAF181/CAF131 sets have hashes `1865e694452bb33e663478345b2f7e762d431cf961f05c15006acc39bef01e69` and `60158a6f155d3d2e0f9de870e32db08f546c2e725e0e8d8cf3a11ef690f8eb17`; empty intersection hash `4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945`; 312-key union hash `6c3f735389869f169d6d4a3b6791be97fce7361dfa718f24c2634fd5ae69c5f9`.

## Source identity and pins

The application used source-corpus commit `21984e9ec4ec7370bc807e2da23cea2228747698` and verified the locally retained original compressed payloads by both Git blob OID and SHA-256. The COD ADM1 blob is `9c044aab8159821ba629020dee2e787388d20b52` (compressed SHA-256 `a2e524c39c94b065d6ae76ca335730ef716d6378c050f1d11c15a1a40fe8b584`; decoded SHA-256 `bf6096f1c16f2632be9c4d4c0305276024fd5b3f3b9b3e635b2e2018d02f0331`). TCD ADM1 is blob `31a486ad80235863feb24188b975a2ffbdaa6a45` (compressed SHA-256 `c948cb873bfd84584334a48d31b2072d109aaf6b6c13e3ad6fc890a6929a925d`). CMR ADM1 is blob `503fbafadf9464417f1b10f3d815292e59e2a0a3` (compressed SHA-256 `8e53160cc0c1526534dbd7b243b6cffa329a8c5971dbbd7fe7342b9b546b0160`). The verified compressed payloads were materialized locally from the existing object store; no network fetch was made.

The retained metadata describes the COD feature family as 2017 ADM1 provinces, sourced from OpenStreetMap/Wambacher under ODbL 1.0; TCD as 2017 ADM1 under ODbL 1.0; and CMR as 2016 ADM1 under CC BY 3.0. The CAF package’s selected target context is geoBoundaries CAF ADM3, represented year 2018, source role “Commune,” CC BY 3.0 IGO. These are source/product identities and recorded vintages, not determinations of present legal authority.

The exact original held-key ledger SHA-256 is `faf14fbaf6457b07e9a731575bcf9aa0d5b32b5260cdf28bc351c3f72831c39a`. The native latitude table decoded SHA-256 is `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`; compressed SHA-256 is `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`. Source-free application summaries: CAF181 `caf181-center-application-summary.json`, SHA-256 `c10e13aa79c01d081d22801b463274d92f72998aeb5c6d3ba319ecccfbf22bcb`; CAF131 `caf131-native-apply-result.json`, SHA-256 `2feced451bd8f8beeae470e512872e03a470c0e4d1a5300442d444aeb860fc6d`.

## Interpretation and remaining question

This is an exact native cell-center relation between the selected held keys and the retained foreign candidate polygons. It establishes that these 312 key centers lie inside the corresponding recorded candidates. It does not test full cell footprints or edge slivers; establish which dated administrative boundary governs; prove that the candidate caused the original territorial-exclusion label; or resolve sovereignty, current legal applicability, source fitness, or the right repair. The candidate product vintages and source roles differ from the CAF target product. The broader retained qualification still found no narrowed unique source-target qualification for the entire 461-key remainder.

A source-relative researched-unresolved candidate is defensible for these exact 312 keys because both the source-index lineage and per-key spatial relationship are now tested against the corresponding retained source features. Keep the remaining 149 held keys and the 1,669 supported keys unchanged. Do not treat the 312 as positive ownership, accepted territorial exclusions, blanket CAF clearance, or repair/documented-exception credit. Root’s scientific review and original package acceptance gates remain required.
