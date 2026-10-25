# CAF181 / CAF131 exact-set reconciliation (source-free)

**State:** local evidence synthesis for root scientific review only. No disposition, status, acceptance, owner change, repair credit, repository edit, or dispatch is made by this note.

## Exact set result

The retained held ledger `/tmp/caf461-held-keys.jsonl` (532,899 bytes; SHA-256 `faf14fbaf6457b07e9a731575bcf9aa0d5b32b5260cdf28bc351c3f72831c39a`) contains 461 unique held `[y,x,owner_index]` keys. Its source-index arrays were joined to the exact groups below. The independently retained proposal rows produce the same two sets with zero symmetric difference from the JSONL.

| Group | Source-feature index → recorded source | Exact keys |
|---|---|---:|
| CAF181 | 18730 → Lower Uele (`gb:COD:ADM1:28894549B47695765788779`) | 127 |
|  | 18732 → Nord-Ubangi (`gb:COD:ADM1:28894549B30663222433478`) | 54 |
| **CAF181 union** | two source-index sets are disjoint | **181** |
| CAF131 | 57091 → Salamat | 50 |
|  | 57102 → Logone Oriental | 41 |
|  | 18301 → Adamaoua | 40 |
| **CAF131 union** | three source-index sets are pairwise disjoint | **131** |

The cross-group intersection is **0**. The combined union is **312 distinct keys**, not an additive estimate: both exact key sets are subsets of the 461-row ledger, and their sorted-key canonical hashes are reproduced from the retained rows. The other **149** ledger keys are outside these five candidate-source groups. The separately discussed Lili held key, whose retained source-index set is `[9203,9330,18727]`, is in neither group.

Canonical-hash encoding: UTF-8 compact JSON of sorted `[y,x,owner_index]` triples (`json.dumps(..., separators=(',',':'))`).

- CAF181: `1865e694452bb33e663478345b2f7e762d431cf961f05c15006acc39bef01e69`
- CAF131: `60158a6f155d3d2e0f9de870e32db08f546c2e725e0e8d8cf3a11ef690f8eb17`
- Intersection (empty set): `4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945`
- Combined union (312): `6c3f735389869f169d6d4a3b6791be97fce7361dfa718f24c2634fd5ae69c5f9`
- Remaining other held keys (149): `1dc8525ec678eaaf48cf7025c1770d2ddada522f7ff6ec4ddf54a36383ca90e1`
- Full held ledger keys (461): `fbfcc5c0d247756b4bdfd871d04c97d8a7a9c41bad322bef3f141ec78d63a2bd`

## Original package accounting and limits

The retained evidence summary `/tmp/caf461-evidence-summary.json` (149,341 bytes; SHA-256 `576813f5a30318461fa913dff9be02dbfbdcbc14f0f4ff9e3584f07a4c4eeae6`) records the original package as 2,130 land cells, 1,319 intervals, and 46 owners, with 1,669 previously supported cells and 461 residual held cells. This reconciliation touches only the five named source-index groups inside the residual; it does not change that denominator or infer anything about the remaining 149 keys.

The exact proposal ledger `/tmp/caf461-proposed-unresolved-disposition.json` (775,539 bytes; SHA-256 `d3adaf387cc2f2ca66ebe41be33da6cf7c95b853f562187789d6b8cc2e1b5e14`) says every residual remains proposal-only, owner unchanged, credit zero, with an exact-key question whether an applicable retained foreign operand causally supports the recorded exclusion or a different source-supported repair. Candidate source indices / group contacts alone do not answer causation, source applicability, legal authority, or fitness. Therefore this note supports exact non-overlap and a bounded 312-key candidate accounting only; it does **not** support a positive, clearance, or repair-credit disposition for those keys. Any source-relative researched-unresolved proposal remains subject to root's science decision under the original package contract.
