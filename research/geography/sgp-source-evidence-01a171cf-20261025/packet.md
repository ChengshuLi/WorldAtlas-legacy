# Singapore source-evidence packet for the original 215 keys

Date: 2026-10-25. Author worker: `01a171cf-e515-74b6-b889-79197dae3017`. Branch: `geography/sgp-source-evidence-01a171cf-20261025`.

This packet preserves evidence and limitations for the exact original SGP scope. It does not change issue, claim, source, owner, key disposition, acceptance, credit or release state.

## Scope and current status

The original frozen `gb-SGP-ADM1--repair-evaluation` proposal contains 104 interval rows expanding to 215 distinct `(x,y)` keys, source family 289 and candidate owner 7128. The five source-feature groups are North (feature 55519; 51 keys), West (55520; 87), North-East (55518; 44), East (55517; 20), and Central (55516; 13). The original proposal JSON at immutable ref `2138fe83d518ffd35708a8beda67e906f221772a`, path `coordination/engineering/singapore-adm1-repair-evaluation-20261020/evidence/proposed-unresolved-dispositions-d8fe956218a0.json`, has Git blob `cf9bf07ac8656fc9913856c077807cf418f3d9b7` and SHA-256 `25f0c4b6d36daf3d909c402b134eac6e2bd380672d763311fecc5c5d93522b6f`. Its expanded key set was compared to the preserved task inventory: 215 unique keys in each, exact set equality; inventory SHA-256 `d489de571134f654005518a059a97ef76eb84eea03b631dec17b18321e82623d`.

Issue [#2602](https://github.com/ChengshuLi/WorldAtlas/issues/2602) is closed. Its original proposal is retained as immutable evidence, not an open assignment. The later root audit [#2649](https://github.com/ChengshuLi/WorldAtlas/issues/2649) remains open and names SGP among suspended claims. Under the root's current handoff, this exact original 215-key scope is **suspended with no recertification**. No current accepted-key ledger comparison is asserted here. The historical selected-owner observation records owner-zero for the proposed keys; it is not an accepted-ledger reconciliation and was not repeated.

## Consumed source and stated lineage

The retained source is geoBoundaries `gb:SGP:ADM1`, source revision `9469f09592ced973a3448cf66b6100b741b64c0d`, with five features and decoded geometry SHA-256 `5299b0a39ce38c1749c25a73ac24a9768a9c00aa657d11a636317d0793383209` (40,687 bytes). The pinned source-corpus payload is `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-SGP-ADM1-000.bin.gz`, blob `8275985de4933231fb20a3ed65d8182baac44d69`, compressed SHA-256 `31ca8787df1c62cd77e89a8193cd212a61a4f5dd53068e00c47488c9beeeeec2`. The 924-byte geoBoundaries metadata body has SHA-256 `f46f18024a45b3f04e2321da9cb61e907df255ba0058fab29cc289844c9541bc`.

That metadata states represented year 2016, provider type ADM1, source “Urban Redevelopment Authority, derived from ADM 3,” and identifies URA's MP14 Subzone Boundary (No Sea), dataset `d_226cacceceff94f0c8b814962a5307c9`, as the source URL. Its canonical administrative field is blank/Unknown. The source record declares ODbL 1.0 and points to URA's Open Data Licence page. These are the retained metadata and terms labels, not an independent determination of underlying authority or grant.

The exact official URA MP14 subzone `poll-download` request returned HTTP 403 without geometry bytes. That denial remains stopped; no alternate route was used. The retained corpus contains no MP14 subzone payload or pinned dissolve/aggregation recipe. Thus the stated MP14 derivation remains unverified geometrically. Neither comparator below substitutes for that missing source artifact.

## Existing native representative-point and physical predicates

The same 215 frozen centers were checked against their own consumed source features using the pinned native latitude table (commit `5b32388df0501b013ac9a3ba97864932db493d59`; compressed SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`; decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`, 262,166 little-endian float64 rows), the pinned native longitude-center rule, and exact no-epsilon point-in-polygon predicates over the retained source vertices. All 215 centers are in their own source feature; there are zero boundary points, outside points, or other-feature contacts. This is representative-point contact under the recorded witness contract, not a current or legal assignment.

A separate exact run-membership check finds all 215 keys present in their rows in the retained GSHHG-derived support block. The block is `coordination/engineering/global-current-cell-work-queue-20261014/physical-support-block-031.json.gz` at source snapshot commit `2d1fc6f430e756498908bf2c4e267356a13f5cc7`, blob `ea10ba7f8cacba0d3ac4c4967d6f0f501afa1dbb`, compressed SHA-256 `045752377715c5b2ea0924f9c92e9b65f202b396fc0c585fb3c05831fb7e99ef`. Membership is 215 present / zero absent. It is source-relative support-mask evidence, not full-cell containment, current land truth, territorial assignment, or independent validation of GSHHG topology.

## Official URA planning comparators

| Product | Role, vintage and terms | Same-name centers | Outside all five |
|---|---|---:|---:|
| [MP08 Region Boundary (No Sea)](https://data.gov.sg/datasets/d_db9b98d7b681a83009baab639605a1ba/view), dataset `d_db9b98d7b681a83009baab639605a1ba` | Indicative planning regions; source geometry May 2016; Open Data Licence. GeoJSON SHA-256 `a28e59286850d404b553a9c6b4ee7a2a09c8e83565383d6add325649e795c026`. Planning boundaries may not coincide with existing developments. | 206/215 | 9 |
| [MP2025 Region Boundary (No Sea)](https://data.gov.sg/datasets/d_4ce0038f7ac689652350bb91b7fb92ed/view), dataset `d_4ce0038f7ac689652350bb91b7fb92ed` | Distinct indicative planning layer; source geometry December 2025; Open Data Licence. GeoJSON SHA-256 `532ab664dcb20c277e9800682a8383ca722e295a7819e377af302cbcd11f5c89`. | 207/215 | 8 |

The eight keys outside both vintages are West `(206579,130054)` `b31-049`, `(206644,130199)` `b31-092`, `(206620,130201)` `b31-094`, `(206630,130227)` `b31-102`; North-East `(206724,130043)` `b31-032`, `(206778,130045)` `b31-039`, `(206785,130059)` `b31-056`; and Central `(206709,130188)` `b31-085`. North-East `(206796,130049)` `b31-047` is outside MP08 but inside the same-named North-East MP2025 region. There are no comparator boundary contacts or other-region contacts. The eight-plus-one adverse center results remain explicit. They show comparator vintage sensitivity; they do not determine legal ownership, explain the outside results, or establish the consumed geometry's MP14 lineage.

These layers are planning comparators. Their five named regions are planning geography; this packet makes no claim that they are territorial administrative units. The identical May 2016 source dates for the candidate representation and MP08 are not proof of source identity. A separate polygon-level family comparison found substantial same-name overlap with both URA products but a nonzero difference in every region; the MP08 area comparison additionally required documented in-memory validity repair. That comparison supports family correspondence, not exact boundary identity or MP14 derivation.

## Limits and decision boundary

This packet preserves the full 215-key denominator, consumed-source representative-point result, physical-support membership, source metadata and terms caveat, MP14 HTTP 403, all MP08/MP2025 outside keys, and the `b31-047` vintage change. It does not claim full-cell coverage, current/legal ownership, complete competitor coverage, source authority, rights clearance, accepted-key overlap, positive repair, researched-unresolved completion, credit, or hold removal. No new source, geometry test, owner observation, or ledger was produced for this packet.

The remaining source-lineage question is narrow: an authorized, byte-identifiable MP14 subzone payload plus its pinned feature/aggregation rule (including region field, exclusions and processing) would be needed to verify the metadata-stated derivation. The official request returned 403 and remains stopped. All current suspension and hold states remain with root for decision.

## Evidence provenance

- Frozen proposal and exact roster: immutable #2602 proposal ref/blob above; the 104 interval rows and selected-owner observations are retained in the same evidence directory in the pinned repository.
- Consumed source bytes: the original geography source-corpus path/blob above; the catalog's source-candidate record is `coordination/engineering/global-current-cell-work-queue-20261014/source-candidates-block-031.json.gz` (blob `8c513fafe3d2754547cba8c3e8a4c812e8cc520d`; SHA-256 `9aa6e8ab65027095c27f43c2d15af0a3bb94c6af8fe19f342e3af37f5c3356e0`).
- Native coordinates and physical support: normative row table and exact block pins above.
- Comparator asset identities and hashes: official URA dataset pages linked in the table; the retained application records were reused without rerunning the geometry comparisons.
