# VUT 890-key Efate/Santo researched-unresolved proposal

## Proposed disposition

Recommend documenting the exact **890-key Efate/Santo complement** as a finite researched-unresolved exception under issue #2216, `gb-VUT-ADM1--repair-evaluation`, subject to independent review and root acceptance. This proposal records that the source-version question and the applicable physical, current-owner, and municipal-exclusion predicates remain unresolved. It does not qualify an additive repair, assign a different owner, establish legal inclusion or exclusion, clear a hold, award credit, or complete the original package.

The proposal follows the frozen contract’s completion rule: each exact interval is either a qualified additive repair to its recorded location or a documented exception. The 890 are proposed for the documented-exception path only. No current status or accounting has been changed.

## Exact scope and accounting

The frozen contract is issue #2216, `gb-VUT-ADM1--repair-evaluation`: 4,366 original land-support cells, 1,990 interval segments, six ADM1 source features and six owner IDs. Its pin is commit `b90b037def1e8f065483c3c342468a833c34a140`, `coordination/engineering/vanuatu-native-repair-evaluation-20261016/intervals/package.json`, blob `c06c60d6db0c8bf4784e25331b5ba39f9e1b8e0d`, SHA-256 `b54f16af8559425d16fb6e86579bb64629d4ce690f8bf440cc3eb639540e5995`.

This complement is exactly **530 Efate/Shefa keys** (owner 48791, feature 65868, shape `32282491B17169683382430`, source component 1; 165 intervals) plus **360 Santo/Sanma keys** (owner 48794, feature 65864, shape `32282491B7486560380604`, source component 11; 226 intervals). The exact 890-key set has 391 original intervals. The key commitment is `8fdc8c6ac00277c3779d9c6262d6c47ed5a77db0283aeb7d3e83c0813a7efbcc`, serialized as sorted compact JSON arrays `[owner_index,y,x]`; the key-to-interval commitment is `08fbaa20b23f4e19d1f1b949cd5970f44260eb70382ac4c35b6528a5ef8d6e9a`, serialized as sorted compact JSON arrays `[owner_index,y,x,interval_y,x_start,x_end]`.

Preserve the original denominator and adjacent cohorts:

| Cohort | Count | Treatment in this proposal |
|---|---:|---|
| Historical accepted VUT cells | 3,163 | Remain separate |
| Separate accepted Port Vila/Luganville cohort | 87 | Excluded from this proposal |
| Held Tanna cohort | 226 | Excluded; its Lenakel question remains separate |
| Efate/Santo complement covered here | 890 | Proposed researched-unresolved exception |
| **Original denominator** | **4,366** | **Unchanged** |

The 890, 87, and 226 key sets are disjoint subsets of the original 1,203 held-key roster. No interval expansion adds adjacent cells.

## Source-role evidence

The original reference is the simplified 2017 OSM/Wambacher VUT ADM1 source recorded for `gb:VUT:ADM1` (six features, 57 components; decoded source SHA-256 `63e1878b1a484787aafa029e3f2a8cb063d9d720b38e9d17884a999d28cd10f8`; compressed payload SHA-256 `d889dc7af3e004f12ad4bb9a49de443d09a4bfe34beaba4af999fb6a8dc13258`). The retained 1,203-row roster records exact selected-component membership for all 890. This is historical source membership, not current legal province geometry or a present-day ownership finding.

A separate per-key application of the full-resolution 2017 geoBoundaries body compared the same 890 keys against all six features in that body. The body is 1,094,439 bytes, SHA-256 `69f44b96d0690310c67a4a430488fb7a02d028bdec8bbc755436cdfb90962c8d`, release commit `9469f09592ced973a3448cf66b6100b741b64c0d`. The pinned method is `native-linear-evenodd-first-owner-v1`, `src/native-grid.js` blob `8542125e7b13d0151740660b1876b71041367a1e` at commit `a5f0214a899db981c5e5c0a6974aa8d3a76e1b41`; the latitude table’s decoded SHA-256 is `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`.

| Selected source feature | Simplified original exact matches | Full-source inside | Full-source outside | Full-source boundary | Interior/boundary in another full-source feature |
|---|---:|---:|---:|---:|---:|
| Efate / Shefa `32282491B17169683382430` | 530 | 504 | 26 | 0 | 0 |
| Santo / Sanma `32282491B7486560380604` | 360 | 322 | 38 | 0 | 0 |
| **Total** | **890** | **826** | **64** | **0** | **0** |

The **64 full-source misses** (26 Efate/Shefa and 38 Santo/Sanma) remain exact members of their selected feature in the original simplified reference. The full-source application found no alternative-feature interior or boundary membership for any of these 890 keys. The misses therefore identify a full-versus-simplified source-version difference; they do not assign another owner or establish a different current location. The application output is retained privately at `/tmp/vut-890-full-source-application.private.json` (489,690 bytes, mode 0600, SHA-256 `d92e5b3b84773691895b16c46e66a4c7520157c51fd9d17d728f0127cdc8c802`); the driver is `vut-890-full-source-application-driver.mjs` (6,420 bytes, SHA-256 `efc148063081a47f95d2d783348b4c2f56511b2607012145d927a3f9645944ae`). The source-version cross-tab is evidence only. It does not decide whether the full-resolution variant supersedes the original simplified operand.

## Predicates that remain unresolved

- **Current owner:** The retained VUT current-owner validation at commit `a5f0214a899db981c5e5c0a6974aa8d3a76e1b41` reports zero base-owner and zero accepted-additive intersections across the 4,366 package candidates, using 1,570 native rows. This is a pinned package-wide aggregate, not an 890-row current-owner receipt. The older roster observation, 0 of 1,203, is also aggregate and predates the selected snapshot. Neither is represented as a new per-key owner assignment here.
- **Physical and foreign contact:** The retained `physical-support.json` is target-level, not a per-key contact test. It reports 30 Efate queries (14 intersects, 16 disjoint) and 44 Santo queries (25 intersects, 19 disjoint). The stock screen reported no residual contacts across the 4,366 candidate centers, but no per-key foreign-contact witness is retained for these 890. Do not treat target-level relations or the aggregate screen as per-key clearance.
- **Municipal exclusion:** The original source-scope review conservatively held the Efate and Santo source components for the applicable municipal-exclusion question. The retained 2018 contextual probe reports no center contact for these keys, but explicitly does not establish that a key falls outside a legal municipal exclusion. No applicable current municipal geometry has been joined to the 890 keys. The next deciding evidence is the applicable operative municipal instrument and attributable boundary material, if any, joined to these exact keys with date, source lineage, and CRS. This is a scoped predicate for the held components, not a universal current-PGR legal-certificate prerequisite for all 4,366 cells.
- **Qualification and conservation:** The baseline native diagnostic marks the keys supported, which is screening evidence only. The original selected-native conservation, relevant source/physical witnesses, and all applicable territorial predicates must be established before any additive repair is qualified.

The source-scope review is pinned at the frozen contract commit as `evidence/source-scope-review.md`, blob `ba5111338038888ae18e0ca4b1e7e7e0845c9d05`. Its retained summary describes 3,163 separately corroborated-island cells as numerically qualified under the bounded historical reference scope and 1,203 Efate/Santo/Tanna cells held for relevant municipal-exclusion review; it does not find that every held cell lies inside a municipality.

## Finite follow-up proposed by this exception

Keep the exception bounded to the committed 890-key/391-interval set and the two source features above. First, resolve which 2017 ADM1 representation governs the original source-membership predicate from its recorded lineage: retain the simplified-source matches as the frozen baseline and record the full-resolution 826/64 comparison as a variant discrepancy unless an authoritative source-version decision changes that baseline. Second, for only these 890 keys, seek the operative municipal boundary instruments applicable to the Efate/Shefa and Santo/Sanma source areas and compare any attributable boundary geometry against the exact key locations. Record per key `inside`, `outside`, or `unresolved`, with instrument date, source, CRS, and boundary lineage; if no attributable applicable boundary is available, leave the municipal predicate unresolved. Third, obtain per-key current-owner and physical/foreign-contact witnesses for the same roster under the original package methods. The existing aggregate owner and target-level physical records do not satisfy those per-key checks. Stop this work item when those evidence sources are exhausted; do not expand beyond these 890 keys to any other cells, including the accepted87 or Tanna226, and do not convert missing evidence into a positive qualification.

## Effect if accepted

If root accepts this proposal, record only this exact 890-key, 391-interval complement as researched-unresolved under the contract’s documented-exception route. Keep the original 4,366 denominator, all existing source/native/physical/municipal holds, the 3,163 historical acceptances, the separate 87-key accepted cohort, and the distinct Tanna226 cohort. This proposal changes no owner, source assignment, acceptance, repair qualification, credit, interval count, or package-completion claim.
