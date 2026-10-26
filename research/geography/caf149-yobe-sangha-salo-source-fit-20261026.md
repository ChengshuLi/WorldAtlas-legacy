# CAF149 Yobé-Sangha and Salo source-fit finding

**State:** source-free research finding for independent review. This covers only the 56 held keys under Yobé-Sangha and 20 under Salo within the previously reconciled 149-key subset. It changes no source adoption, package status, owner, accepted outcome, or repair credit.

## Exact cohort and retained-input pins

The two target groups are disjoint, together comprising 76 of the 149 held keys (and 76 of the original 461-key held denominator). Both groups remain held as `territorial_exclusion_cells`; all 76 are recorded as land. The subset hashes below use compact JSON encoding of the sorted `[y,x,owner_index]` triples, following the parent 149-key note's method. Raw key tuples are intentionally omitted.

| Target feature | Original target ID | Owner index | Held keys | Subset SHA-256 |
|---|---|---:|---:|---|
| Yobé-Sangha | `gb:CAF:ADM3:52401652B99363571212605` | 10668 | 56 | `e6eb54783845901eca03d0c9d69b9036cea45289184c24420b110723c56513c0` |
| Salo | `gb:CAF:ADM3:52401652B53216405573620` | 10567 | 20 | `e7f44136ea1c9fcccc6cc3ba7698cabd799bde1bffa9b263e190b0fb06de0909` |

The retained held ledger is `coordination/engineering/caf461-unresolved-proposal-20261020/caf461-held-keys.jsonl` at `b19e7d9861f0d68e87cbdc85cb9fde116c8c619e` (blob `31496443620872d18bfac6116f7ea9d4aaaacf3c`, 532,899 bytes, SHA-256 `faf14fbaf6457b07e9a731575bcf9aa0d5b32b5260cdf28bc351c3f72831c39a`). The candidate roster is `coordination/engineering/global-current-cell-work-queue-20261014/source-feature-roster.json.gz` at the same commit (blob `e6e380ec13cd4bcc1d24399a76bfa85ca5805b26`, 1,844,315 compressed bytes, SHA-256 `87f2d47e104b3af640351e747d8300d0068a1be23caab9e80558c3f8914eb4aa`). The following is a source-free join of retained rows to roster identity fields; no geometry was read or recomputed for this finding.

## Candidate feature assignments in the held rows

The ledger rows record source-feature indices as candidates. The counts below are row co-occurrences from those assignments, **not** geometric intersections, confirmed contacts, or direct source support for any held key.

| Target | Candidate index | Retained roster feature | Candidate-index occurrences |
|---|---:|---|---:|
| Yobé-Sangha | 9189 | CAF ADM1, Sangha-Mbaéré (`gb:CAF:ADM1:63714938B76474956810594`) | 39 |
| Yobé-Sangha | 9241 | CAF ADM2, Bayanga (`gb:CAF:ADM2:33826404B5322507148284`) | 16 |
| Yobé-Sangha | 9322 | CAF ADM3, Yobé-Sangha, target feature (`gb:CAF:ADM3:52401652B99363571212605`) | 56 |
| Yobé-Sangha | 18302 | Cameroon ADM1, East (`gb:CMR:ADM1:27767025B81519146961984`) | 16 |
| Yobé-Sangha | 18946 | Congo ADM1, Likouala (`gb:COG:ADM1:67827341B88704799146201`) | 28 |
| Yobé-Sangha | 18951 | Congo ADM1, Sangha (`gb:COG:ADM1:67827341B91073241467510`) | 12 |
| Salo | 9189 | CAF ADM1, Sangha-Mbaéré (`gb:CAF:ADM1:63714938B76474956810594`) | 20 |
| Salo | 9242 | CAF ADM2, Nola (`gb:CAF:ADM2:33826404B1885733015759`) | 20 |
| Salo | 9321 | CAF ADM3, Salo, target feature (`gb:CAF:ADM3:52401652B53216405573620`) | 20 |
| Salo | 18302 | Cameroon ADM1, East (`gb:CMR:ADM1:27767025B81519146961984`) | 20 |
| Salo | 18322 | Cameroon ADM2, Boumba-Et-Ngoko (`gb:CMR:ADM2:32672807B40314964499081`) | 1 |

All listed roster rows carry `raw-native-supported` as their source-feature geometry status. That roster status does not establish a candidate-to-target intersection. The retained candidate rows also include CAF parent and target features, so their indices are not themselves a foreign-contact list.

### Original target-level foreign exclusion records

The original CAF source-evidence record separately records foreign features excluded from each target feature's full polygon source construction. Its exact pin is commit `f1bc5e42011698f2593375991d59f4d1d692b910`, path `coordination/engineering/central-african-republic-original-repair-20261018-worker4/source-evidence-001/source-evidence.json`, blob `cc7b145215611327d1cb66489aa5740275fb0b7b`, 277,509 bytes, SHA-256 `80e4af2b6eaa22ed4785e5db42e771488a3ec6fd4dfbb19c50e0418cc47d6b8a`. It records 9 territorial-exclusion feature inputs for the Yobé-Sangha target and 6 for Salo:

| Target | Original target-level foreign exclusion input | Feature ordinal |
|---|---|---:|
| Yobé-Sangha | Cameroon ADM1 East (`gb:CMR:ADM1:27767025B81519146961984`) | 5 |
| Yobé-Sangha | Cameroon ADM2 Boumba-Et-Ngoko (`gb:CMR:ADM2:32672807B40314964499081`) | 15 |
| Yobé-Sangha | Cameroon ADM3 Yokadouma (`gb:CMR:ADM3:9386221B14880096394558`) | 35 |
| Yobé-Sangha | Cameroon ADM3 Mouloundou (`gb:CMR:ADM3:9386221B64770974028815`) | 40 |
| Yobé-Sangha | Cameroon ADM3 source `gb:CMR:ADM3:9386221B27515073075422` (roster display is `SalapoumbÃ©`) | 198 |
| Yobé-Sangha | Congo ADM1 Likouala (`gb:COG:ADM1:67827341B88704799146201`) | 4 |
| Yobé-Sangha | Congo ADM1 Sangha (`gb:COG:ADM1:67827341B91073241467510`) | 9 |
| Yobé-Sangha | Congo ADM2 Mayama (`gb:COG:ADM2:1427508B81001765289527`) | 39 |
| Yobé-Sangha | Congo ADM2 Ngabe (`gb:COG:ADM2:1427508B65710782923529`) | 41 |
| Salo | Cameroon ADM1 East (`gb:CMR:ADM1:27767025B81519146961984`) | 5 |
| Salo | Cameroon ADM2 Boumba-Et-Ngoko (`gb:CMR:ADM2:32672807B40314964499081`) | 15 |
| Salo | Cameroon ADM3 Yokadouma (`gb:CMR:ADM3:9386221B14880096394558`) | 35 |
| Salo | Cameroon ADM3 source `gb:CMR:ADM3:9386221B27515073075422` (roster display is `SalapoumbÃ©`) | 198 |
| Salo | Congo ADM1 Sangha (`gb:COG:ADM1:67827341B91073241467510`) | 9 |
| Salo | Congo ADM2 Mayama (`gb:COG:ADM2:1427508B81001765289527`) | 39 |

The source record pins these target-level inputs to the corresponding original source-feature geometry hashes. The source payload custody declares Cameroon ADM1/2/3 and Congo ADM1/2 arrays at source-corpus commit `21984e9ec4ec7370bc807e2da23cea2228747698`: CMR ADM1 blob `503fbafadf9464417f1b10f3d815292e59e2a0a3` (53,122 bytes; SHA-256 `8e53160cc0c1526534dbd7b243b6cffa329a8c5971dbbd7fe7342b9b546b0160`); CMR ADM2 blob `5ceb31a02b8f2faffddf10a1ef2f74e70d6ec43d` (55,495 bytes; SHA-256 `64d07feb58bba743bf2c04e2551ce4d1dc7b63d2079f1a877e45a6f1575bc77f`); CMR ADM3 blob `86468c8dc3cf7e2c8d9a1ff9239db92b18f0d2fd` (487,165 bytes; SHA-256 `27940ed46b46673a8b8593d3d246ddf747f17708860f1f866bd1e7c5101b9625`); COG ADM1 blob `c778c13f89d1f0b1f51e50043a1d76b440a7a0de` (54,037 bytes; SHA-256 `a4ecf3129d317d13214efef5fd461203443ef88f0d18be11800edb461dc0198b`); and COG ADM2 blob `2c0b2d12d91391c90b7b13fd3bc6eeafcef9a151` (95,986 bytes; SHA-256 `d16ed36ca657850044d6abe618958e16a36601ed687246761e44c5d964c8ac51`). The separate original source array record therefore confirms that several candidate IDs correspond to actual target-level exclusion inputs; it does **not** record how many exact held keys intersect each input.

The distinction is visible in the row counts: for Yobé-Sangha the held-row candidate list co-occurs 16 times with CMR East, 28 with COG Likouala, and 12 with COG Sangha; for Salo it co-occurs 20 times with CMR East and once with CMR Boumba-Et-Ngoko. Those are still only interval candidate-index occurrence counts. The original target-level exclusion list is a polygon-source construction record, not a per-cell application. In particular, Salo's target-level exclusion list includes Congo ADM1 Sangha, while the 20 held-row candidate lists do not carry that feature index. The retained source-evidence target records have 64 coverage rows for Yobé-Sangha and 33 for Salo, but do not provide a per-held-key foreign-source membership/negative-result table.

The pinned actual native summary is declared at commit `cb07c6f1a64654788f61cb9f0d483f72ac335f3b`, path `coordination/engineering/central-african-republic-original-repair-20261018-worker4/actual-native-result-summary.json`, blob `fb4c163f367adfe352a444d5780453570a577aac`, 2,682 bytes, SHA-256 `47f087eab85ae07afeff14267ae4a92926b421028b7871ba8d8cdee66056588d`. The exact pinned commit and then only this blob were recovered through the normal Git route; the body hash and size match the declared pin. Its schema contains package-level source/physical/native summary counts, but no per-key or target-by-source membership table for Yobé-Sangha or Salo. It therefore cannot turn the 16/28/12 or 20/1 candidate-index row co-occurrences into key-specific negative results. The corresponding whole-target physical receipt is declared at commit `1f655c379e938d7ecf0f044f2f01da0a49b21b4b`, path `coordination/engineering/central-african-republic-original-repair-20261018-worker4/physical-001/whole-target-support.json`, blob `28c87655ce6bc27ba8b53ec0d0c19552e0e7e25d`, 311,103 bytes, SHA-256 `686d41e172c55480b5c1192fafb6a82c4bce4feefce906e003acffa8b2ac9ce8`; it was not fetched or inspected. The held ledger's row-level land labels remain the available physical classifications for these keys; no per-key geometry was rerun.

## Administrative records and applicability

The official ICASEES page *Population de la République Centrafricaine en 2021 et 2024*, dated 21 October 2024, tabulates both target names in administrative context: Yobé-Sangha (Bayanga) under the Bayanga sub-prefecture, and Salo under Nola, both within Sangha-Mbaéré and the Équateur region. This supports current census-table naming and hierarchy; it is not a boundary act, a historical 2017 crosswalk, or a geospatial application to these held keys. A source-capture file/hash for this page was not retained in this workspace. [Official ICASEES table](https://www.icasees.org/index.php/actualites/rgph-4/207-population-de-la-republique-centrafricaine-en-2021-et-2024)

The CAR Ministry of Health and Population's May 2022 REDISSE IV CPPA/PPA report names Sangha-Mbaéré and discusses Nola-area localities. On PDF page 32 (footer/printed page 32), the map caption says it should be revised to reflect the new administrative division and attributes it to a 2019 PUSEB document citing LACCEG, University of Bangui. The ministry-hosted report is a project/social instrument, not a boundary source; the map caveat is material for both cohorts. The exact cited PDF returned HTTP 200, `application/pdf`, 6,558,102 bytes, last-modified 23 May 2022 09:42:26 UTC, ETag `641196-5dfaaa8698108`; the retained body is SHA-256 `26bf1056f12a48ddbf131487b6355dbef04765dba3e1c7060a5f07e57021548c` (PDF 1.5, 105 pages). [REDISSE IV report](https://www.sante.gouv.cf/sites/default/files/2022-05/P167817%20RCA%20REDISSE4%20CPPA%20%26%20PPA%20Version%20Finale%2019%20Mai%202022.pdf)

The official Ministry of Humanitarian Action and National Reconciliation *Textes Organiques* page, Article 22, places Sangha-Mbaéré within Regional Directorate 2 alongside Mambéré-Kadéï and Nana-Mambéré; Article 23 describes prefectural services. This establishes an administrative remit, not the prefecture's boundary or a crosswalk to these two source geometries. The exact page returned HTTP 200, `text/html; charset=UTF-8`, and 83,592 body bytes; the retained HTML body is SHA-256 `2e5baf15ec552120921e9c18238dc806de8404e465f1b1da16d2cfca6c454ff3`. [Official Ministry text](https://www.reconciliation.gouv.cf/article/38/textes-organiques)

## Bounded conclusion

The exact target identities and current census hierarchy are supported by an official statistical table, while the older ministry-hosted project map expressly needs revision. The original source-evidence does identify target-level foreign exclusion inputs for both target polygons, and several held-row candidate IDs correspond to those inputs. Neither evidence stream supplies a per-key source-membership or negative-overlay result for these 76 keys. Thus the original foreign inputs are relevant to the two target geometries but their causal applicability to any particular held key remains unproven. The keys remain unresolved proposals under the original hold; no positive finding, legal exclusion, package-status change, or credit is claimed.
