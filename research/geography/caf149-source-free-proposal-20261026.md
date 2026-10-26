# CAF149 source-free scope and proposal draft

**State:** draft for independent review and root science decision only. This is a source-free accounting of the exact 149-key remainder outside the separately reconciled CAF181 and CAF131 cohorts. It changes no package status, owner, qualification, accepted outcome, or repair credit.

## Exact scope and conservation

The original CAF ADM3 package denominator remains 2,130 land cells: 1,669 previously supported plus 461 held. This draft addresses exactly 149 distinct keys from the held ledger, with canonical SHA-256 `1dc8525ec678eaaf48cf7025c1770d2ddada522f7ff6ec4ddf54a36383ca90e1`, encoded as compact JSON of sorted `[y,x,owner_index]` triples. The retained 461-key ledger has 461 unique keys and hash `faf14fbaf6457b07e9a731575bcf9aa0d5b32b5260cdf28bc351c3f72831c39a`.

The 149 set was recomputed by excluding the five source-index groups already accounted for in the CAF181/CAF131 reconciliation: 18730 and 18732 (CAF181), and 57091, 57102, and 18301 (CAF131). The complement exactly reproduces the retained 149-key hash. There is no key overlap with those two cohorts. The earlier reconciliation records CAF181 as 181 keys and CAF131 as 131 keys, disjoint, for 312 total; 312 + 149 = 461. This note does not repeat or reclassify the 181- or 131-key evidence.

All 149 rows retain their original held status and reason `territorial_exclusion_cells`; each is recorded as land. The ledger retains original owner IDs, interval row/ordinal, target context, and candidate source-feature indices. A key carries between two and five candidate feature indices (34 keys carry two, 89 carry three, 25 carry four, and one carries five), totaling 440 index occurrences across 44 distinct feature IDs. These are source-index assignments in the original interval rows; they are not a new geometric contact test.

### Owner partition

| Original target owner ID | Held keys |
|---|---:|
| `gb:CAF:ADM3:52401652B14361696899500` | 12 |
| `gb:CAF:ADM3:52401652B21565212342700` | 1 |
| `gb:CAF:ADM3:52401652B2286145520715` | 8 |
| `gb:CAF:ADM3:52401652B27659488729720` | 1 |
| `gb:CAF:ADM3:52401652B30715690483256` | 1 |
| `gb:CAF:ADM3:52401652B33074004162122` | 3 |
| `gb:CAF:ADM3:52401652B49227657461354` | 3 |
| `gb:CAF:ADM3:52401652B53216405573620` | 20 |
| `gb:CAF:ADM3:52401652B56175823548729` | 8 |
| `gb:CAF:ADM3:52401652B65052605957591` | 3 |
| `gb:CAF:ADM3:52401652B67617163165287` | 1 |
| `gb:CAF:ADM3:52401652B68266089784761` | 1 |
| `gb:CAF:ADM3:52401652B74333479476310` | 19 |
| `gb:CAF:ADM3:52401652B8260276568756` | 3 |
| `gb:CAF:ADM3:52401652B84569563404367` | 2 |
| `gb:CAF:ADM3:52401652B86682569461435` | 7 |
| `gb:CAF:ADM3:52401652B99363571212605` | 56 |
| **Total, 17 owners** | **149** |

### Recorded candidate feature-index occurrences

Counts below are index occurrences among the 149 held rows, not distinct key counts or direct spatial contacts. Feature IDs and names were joined from the retained global feature roster.

| Index | Recorded feature ID | Roster name | Occurrences |
|---:|---|---|---:|
| 9189 | `gb:CAF:ADM1:63714938B76474956810594` | Sangha-Mbaéré | 60 |
| 9190 | `gb:CAF:ADM1:63714938B93412376758102` | Mambéré-Kadéï | 4 |
| 9191 | `gb:CAF:ADM1:63714938B21760912511834` | Lobaye | 7 |
| 9193 | `gb:CAF:ADM1:63714938B70915793391768` | Ombella-M'Poko | 2 |
| 9194 | `gb:CAF:ADM1:63714938B19002536101711` | Ouham-Pendé | 1 |
| 9195 | `gb:CAF:ADM1:63714938B89906779781300` | Ouham | 8 |
| 9198 | `gb:CAF:ADM1:63714938B35477763827744` | Vakaga | 2 |
| 9199 | `gb:CAF:ADM1:63714938B6521805151082` | Bamingui-Bangoran | 2 |
| 9203 | `gb:CAF:ADM1:63714938B95555008029378` | Haut-Mbomou | 1 |
| 9241 | `gb:CAF:ADM2:33826404B5322507148284` | Bayanga | 16 |
| 9242 | `gb:CAF:ADM2:33826404B1885733015759` | Nola | 20 |
| 9244 | `gb:CAF:ADM2:33826404B15620845480465` | Gamboula | 7 |
| 9245 | `gb:CAF:ADM2:33826404B6437617730206` | Amada-Gaza | 2 |
| 9246 | `gb:CAF:ADM2:33826404B17315710707848` | Baboua | 6 |
| 9250 | `gb:CAF:ADM2:33826404B95792566341641` | Ngaoundaye | 2 |
| 9254 | `gb:CAF:ADM2:33826404B79989829713557` | Kabo | 1 |
| 9282 | `gb:CAF:ADM3:52401652B86682569461435` | Mongoumba | 7 |
| 9284 | `gb:CAF:ADM3:52401652B65052605957591` | Mbaere | 3 |
| 9288 | `gb:CAF:ADM3:52401652B8260276568756` | Kounde | 3 |
| 9310 | `gb:CAF:ADM3:52401652B68266089784761` | Mbili | 1 |
| 9311 | `gb:CAF:ADM3:52401652B21565212342700` | Kodi | 1 |
| 9321 | `gb:CAF:ADM3:52401652B53216405573620` | Salo | 20 |
| 9322 | `gb:CAF:ADM3:52401652B99363571212605` | Yobe-Sangha | 56 |
| 9323 | `gb:CAF:ADM3:52401652B27659488729720` | Nola | 1 |
| 9324 | `gb:CAF:ADM3:52401652B84569563404367` | Ridina | 2 |
| 9327 | `gb:CAF:ADM3:52401652B2286145520715` | Dar El Kouti | 8 |
| 9330 | `gb:CAF:ADM3:52401652B67617163165287` | Lili | 1 |
| 9337 | `gb:CAF:ADM3:52401652B14361696899500` | Bimbo | 12 |
| 9347 | `gb:CAF:ADM3:52401652B49227657461354` | Damara | 3 |
| 9411 | `gb:CAF:ADM3:52401652B74333479476310` | Sido | 19 |
| 9424 | `gb:CAF:ADM3:52401652B56175823548729` | Basse-Boumne | 8 |
| 9427 | `gb:CAF:ADM3:52401652B30715690483256` | Haute-Boumbe | 1 |
| 9428 | `gb:CAF:ADM3:52401652B33074004162122` | Baboua | 3 |
| 18302 | `gb:CMR:ADM1:27767025B81519146961984` | East | 41 |
| 18322 | `gb:CMR:ADM2:32672807B40314964499081` | Boumba-Et-Ngoko | 1 |
| 18324 | `gb:CMR:ADM2:32672807B29047919086815` | Kadei | 8 |
| 18325 | `gb:CMR:ADM2:32672807B76674513300734` | Lom-Et-Djerem | 2 |
| 18340 | `gb:CMR:ADM2:32672807B45774164265008` | Mayo-Rey | 2 |
| 18727 | `gb:COD:ADM1:28894549B55881681467015` | Upper Uele | 1 |
| 18740 | `gb:COD:ADM1:28894549B79448475719999` | Sud-Ubangi | 22 |
| 18946 | `gb:COG:ADM1:67827341B88704799146201` | Likouala | 32 |
| 18951 | `gb:COG:ADM1:67827341B91073241467510` | Sangha | 12 |
| 57092 | `gb:TCD:ADM1:23847190B78936858597948` | Sila | 2 |
| 57106 | `gb:TCD:ADM1:23847190B97640124965572` | Moyen-Chari | 27 |
| **Total occurrences** | **44 distinct features** |  | **440** |

## Source applicability and limits

This proposal is bounded to the exact 149-key complement and its retained candidate-index lineage. The original ledger records mapped-land context, and the package evidence summary records a whole-target physical receipt. Those aggregate records do not by themselves establish per-key physical witness, direct source intersection, legal boundary, current applicability, or why any original exclusion was assigned. The candidate indices are not an adjudication of contact or causation.

The prior source-role assessment identified source index 9189, Sangha-Mbaéré, as the leading candidate (60 source-index occurrences, not 60 geometric contacts). The CAR Ministry of Health's 2022 REDISSE IV project document names the prefecture and Nola/Bayanga, but its map caption calls for revision for the new administrative division; it supplies no consumed-feature or held-key crosswalk. The official Humanitarian Ministry “Textes Organiques” page lists Sangha-Mbaéré in a directorate's remit, not in a boundary instrument. These primary records provide administrative context only; they do not establish applicability to any of the 149 keys. The exact captures/pins for those earlier reads were not retained in the available artifact, so no capture hash or page-specific assertion is claimed here.

Sources identified in the prior assessment:

- CAR Ministry of Health, *REDISSE IV* project document (2022): <https://www.sante.gouv.cf/sites/default/files/2022-05/P167817%20RCA%20REDISSE4%20CPPA%20%26%20PPA%20Version%20Finale%2019%20Mai%202022.pdf>.
- CAR Ministry of Humanitarian Action and National Reconciliation, “Textes Organiques”: <https://www.reconciliation.gouv.cf/article/38/textes-organiques>.

No source geometry or primary record was re-read for this accounting. Pending recoverable source pins and independent review, the only defensible proposed wording is that these exact 149 remain held and unresolved as to whether a retained applicable source supports the original exclusion or a different source-supported repair. There is no positive, legal, clearance, or credit claim.

The 1,669 prior supported keys and all 461 held outcomes remain unchanged. Root's science review and the original acceptance gates remain required.

## Exact retained inputs

- Held-key/contact ledger: `coordination/engineering/caf461-unresolved-proposal-20261020/caf461-held-keys.jsonl`, retained at local `worldatlas-source` HEAD `78c18c3629c64b911c82b31ad2d1ee6e4db40e5e`, Git blob `31496443620872d18bfac6116f7ea9d4aaaacf3c`, 532,899 bytes, SHA-256 `faf14fbaf6457b07e9a731575bcf9aa0d5b32b5260cdf28bc351c3f72831c39a`.
- Original source-evidence manifest: `coordination/engineering/central-african-republic-original-repair-20261018-worker4/source-evidence-001/source-evidence.json`, pinned at commit `f1bc5e42011698f2593375991d59f4d1d692b910`, Git blob `cc7b145215611327d1cb66489aa5740275fb0b7b`, 277,509 bytes, SHA-256 `80e4af2b6eaa22ed4785e5db42e771488a3ec6fd4dfbb19c50e0418cc47d6b8a`.
- Candidate index/name registry: `coordination/engineering/global-current-cell-work-queue-20261014/source-feature-roster.json.gz`, retained at local HEAD `78c18c3629c64b911c82b31ad2d1ee6e4db40e5e`, Git blob `e6e380ec13cd4bcc1d24399a76bfa85ca5805b26`, 1,844,315 compressed bytes, SHA-256 `87f2d47e104b3af640351e747d8300d0068a1be23caab9e80558c3f8914eb4aa`; decoded size 13,496,995 bytes, SHA-256 `7fa99cbf064121e0130b66758c212ae22b2a7be5649f2e250e9cda89a9bd595e`.
- Prior cohort reconciliation: `deliverables/source-free/CAF181-131-exact-set-reconciliation.md`; it records CAF181 hash `1865e694452bb33e663478345b2f7e762d431cf961f05c15006acc39bef01e69`, CAF131 hash `60158a6f155d3d2e0f9de870e32db08f546c2e725e0e8d8cf3a11ef690f8eb17`, disjoint intersection, and the 149-key complement hash reproduced above.
