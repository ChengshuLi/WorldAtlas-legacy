# ARG380 source application assessment (source-free)

**Purpose and scope.** Decision support for the exact 380-key BRA-contact cohort within the wider ARG review (28,846 original keys; 6,149 held). This note adds native-grid center applications to the earlier IGN results. It does not change status, credit, ownership, or package accounting. No raw coordinates or geometries are included.

## Exact retained cohort and original foreign-source lineage

The original per-key application is `/tmp/arg-ign-contact-application.json`, 253,007 bytes, SHA-256 `e8b56c558e887334ef9127169c01812c48529c07d7bb545525e25488fe818589`. It contains 380 unique land keys, 350 centers inside the selected same-name IGN department and 30 outside that selected department. The exact 30-key follow-up `/tmp/arg-ign-30-neighbor-check.json`, 15,334 bytes, SHA-256 `0f71107e0adf5acfe0f5f07749a3089702e8b4bf9ebc94f146ca0a38f2236f89`, partitions those 30 into 8 centers in another Argentine department (General Manuel Belgrano; IGN `departamento.1493`) and 22 outside the 16-feature bounded IGN response. The 22 were not thereby classified outside all Argentine coverage.

The original held-ledger input is pinned at merge commit `0ae269650196956723d32b0c0e068f384b006b14`, path `coordination/engineering/argentina-repair-delivery-20261017/original-scope/preliminary-source-holds.json`, blob `aa03430390a00831ce354e11d92727966c9e7b8f`, SHA-256 `dac09326330a1b79396d0f6bd542e46a0f767a1e31752566a0cdf9599817759f`. Its ARG ADM2 payload pin is compressed SHA-256 `9b033d8e86946b8f14d9491ec51098e3c5c0e59785707058966d1fc77521546d`, decoded SHA-256 `cedee8710e49d9017327fc1d4b2dc536e95a82317dc94c3bac8d9404af6bf771`, 525 consumed features (catalog advertised 526). A separate verified source-feature roster resolves the original one-based indices: 675 is Buenos Aires parent; 701 is Pinamar; 1030 is Castelli. That identity result does not resolve the distinct Pinamar legal southern-edge cell question.

## New Brazilian ADM1 center application

The same three retained Brazilian ADM1 source features were applied to the exact 22-key cohort, then to the remaining 358-key cohort without recomputing the 22. Both applications used the existing pinned `native-linear-evenodd-first-owner-v1` method (Node v24.22.1), source code SHA-256 `66b453bbb2e001b9ff56bd754d55087f5919845dceeefd886016494cefa1d3e0`, and latitude table compressed SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147` / decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`.

The Brazilian source payload is the original retained geoBoundaries BRA ADM1 product, Git blob `f987c295c2f58f307a510290d692d76069a85c2a`, compressed SHA-256 `bdbbfe8237a365e295858164b70a574001de1fe8d80e1ca14d77297b69a1f9fe`, decoded SHA-256 `cf4541da2f999915e27147c68e6220b00ee2d19daa42d6eed451bfd131fd843b`. Its recorded role is 2006 ADM1; the catalog lists geoBoundaries/Wikimedia Commons lineage and CC BY 2.5. This is a candidate foreign source, not a Brazilian government boundary determination.

All 380 unique keys have exactly one point-center hit among the three candidate ADM1 polygons; zero selected boundary ties, no candidate misses, no multi-feature overlaps, and exact agreement with the retained source-index arrays. The exact partitions are:

| ARG/IGN stratum | Keys | Paraná (3545) | Santa Catarina (3546) | Rio Grande do Sul (3547) |
|---|---:|---:|---:|---:|
| 350 same-name IGN centers | 350 | 235 | 94 | 21 |
| 8 in another Argentine department | 8 | 0 | 8 | 0 |
| 22 outside the bounded IGN response | 22 | 10 | 9 | 3 |
| **Total BRA ADM1 center hits** | **380** | **245** | **111** | **24** |

The 22- and 358-key application hashes use sorted `[owner_pixel_index,x,y]` triples: `7ee13de6e269e59f82705ea84b36a5fc8cba8cc901dee234c5d37442336a41b5` and `cfadd8f1a47cde092bfd1e3530b48e4c06ec89f579e6102a741b779672c8494d`. The original 380-key IGN artifact’s earlier documented hash `469eca5eec1b390ef1daff322127e5eaed20e44de42917c1ceaacd18f836a734` uses sorted `[y,x,owner_pixel_index]` triples. To compare with the two new application hashes, the original 380-key set and the reconstructed union both hash to `c9bd7cc1460216b95b577966743a25ed35a3c022b21533c5b641c7cd40fd9cd1` under sorted `[owner_pixel_index,x,y]` triples.

Durable result artifacts:

- `ARG380-BRA-22-native-center-application.json`, SHA-256 `2c06a25409c9e1682f7d13b88582cc10287e36928221e7e74508c5ad18e1b928`.
- `ARG380-BRA-358-native-center-application.json`, SHA-256 `7ce0290e62907766f6347e11a64cfac29dd64511f95315a3d5a2180b5873355e`.

## Interpretation and bounded proposal

The 380-key record now has a source-specific candidate-center application across both the retained Argentine IGN response and the three BRA ADM1 candidates. For the 350 same-name ARG centers and the 22 outside the bounded IGN return, the BRA candidates supply a consistent foreign-center relation in the retained arrays. The eight centers in General Manuel Belgrano have both a different Argentine departmental center relation and a Brazilian ADM1 candidate center relation; preserve that ambiguity separately. These are point-center/source-array results only. They do not establish whole-cell coverage, legal jurisdiction, sovereign ownership, why each original held label was assigned, or that the 2006 third-party BRA product satisfies the original source-fitness contract.

A source-relative researched-unresolved proposal is supportable for root's consideration for these exact 380 keys, with the 350/8/22 strata intact. Do not propose positives or credit from this application. The substantive remainder is a bounded fitness decision on the retained 2006 candidate source and the original mixed-source relation; no specific unqueried primary Brazilian service/feature is established by retained evidence. The other 6,149-key ARG ledger remains outside this cohort. Final disposition and acceptance belong to root under the original contract.
