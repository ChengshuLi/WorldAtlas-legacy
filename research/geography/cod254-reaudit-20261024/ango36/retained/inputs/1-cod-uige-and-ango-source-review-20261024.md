# COD pending source review: Uíge and Ango — 2026-10-24

## Accounting boundary

This is evidence and reconciliation only. It adds no repair, no accepted researched-unresolved outcome, no owner change, no hold removal, and no package-completion credit. Current COD accounting remains **2,977 positive + 674 accepted researched-unresolved + 254 pending = 3,905 original cells**. All 928 native holds remain: 674 accepted-unresolved plus 254 pending.

The exact 254-key roster is preserved separately in Library as `cod-pending-254-reconciliation-20261024.json` (Library ID `libfile_96411b3a86308191ae366ff2ceae955f`, 20,130 bytes, SHA-256 `58d503cf6804e37f3d9cd0b6945065051ea98b3da887b410a9a6a33018b99f66`). The Uíge 18 keys are a subset of that roster, not an additional scope.

## Uíge source check: exact archive comparison blocked

Official geoBoundaries history records that AGO ADM1 was moved into geoBoundaries Humanitarian and completed using OSM-sourced boundaries ([issue #67](https://github.com/wmgeolab/geoBoundaries/issues/67)); another official issue says an earlier submission had been placed in Humanitarian by mistake and should be resubmitted to gbOpen ([issue #1166](https://github.com/wmgeolab/geoBoundaries/issues/1166)). The exact [PR #1352](https://github.com/wmgeolab/geoBoundaries/pull/1352) merged one binary file, `sourceData/gbOpen/AGO_ADM1.zip`; its [pinned blob page](https://github.com/wmgeolab/geoBoundaries/blob/73b25f08642329bddaf77467db2766be13741adc/sourceData/gbOpen/AGO_ADM1.zip) reports approximately 1.21 MB.

The exact ZIP download link was attempted once through the browser and failed with a restricted-URL fetch error. No alternate endpoint or mirror was tried. Therefore archive contents, license, and identity against the pinned geoBoundaries feature remain unverified. The retained 9469f09 catalogue record identifies the pinned Uíge feature as `gb:AGO:ADM1:26408823B906914650007`, represented year 2021, Public Domain, source U.S. Census Bureau; that is metadata for the pinned product and does **not** identify PR #1352's archive. The existing independent reviewer concludes the history and metadata establish a provenance question, not source applicability; keep all 18 pending/held. The failed fetch is a route-specific access limitation, not evidence all lawful routes are exhausted.

## Owner 14459: exact 36-key Ango center-conflict crosswalk

### Pins and scope

- Original full COD diagnostic: commit `693ecabeb31f53f1cec6116df2f78624bba5181d`, path `coordination/engineering/congo-original-repair-20261018/uige-popokabaka-contextual-20261024/native-diagnostic-full-3905-generated-002/native-diagnostic.json`, 327,626 bytes, SHA-256 `a06c68b928bb6ce4f8c450712150d3e95a3284e7dbf9bcb12729b8c316fbda51`.
- Full source-evidence pin: commit `d3fff65b349a75b9cbfcaa40d15ade06e7f27770`, path `coordination/engineering/congo-original-repair-20261018/uige-popokabaka-contextual-20261024/native-diagnostic-source-evidence-full-3905.json`, 486,052 bytes, SHA-256 `db66ce1220ad16c5287de8ac29f135051e351ec71384eeb1aed9625a11ada77e`.
- Exact original target is `gb:COD:ADM2:63176286B24678106401017` (Ango), source family 2019 Référentiel Géographique Commun / OCHA DR Congo.
- The full 537-feature source-center overlay is `coordination/engineering/congo-original-repair-20261018/residual-930-20261019/complete-family-center-overlay-20261023.local.json`, SHA-256 `00fc57c3290d4d0cf1ef7df68860ac6d2c3ee82e67509d0ae2f9d1c550cdf24d`.
- The exact join covers all 36 still-pending owner-14459 keys; all 36 are retained held keys in the original diagnostic.

### Per-key result

The 36/36 source-center overlay rows are present and align with the exact target-level negative-operand IDs/hashes in the pinned full source-evidence record. For every key, the center falls inside both the 2019 COD Ango target and CAF ADM2 Zémio. For 28/36, it also falls inside CAF ADM1 Haut-Mbomou. No one of these 36 centers hits the five candidate CAF ADM3 features or either South Sudan candidate feature. The complete-family overlay reports no additional family hits and no recorded-vector candidate without a center hit for these rows.

This is a precise **center-source conflict**. It is not a full-cell footprint test, a current sovereignty finding, or proof that the CAF competitor is adopted for this COD target. The original package requires complete foreign-source applicability assessment and says source-relative contacts alone do not establish applicability; see [COD package issue #2453](https://github.com/ChengshuLi/WorldAtlas/issues/2453) and its governing [issue #1202](https://github.com/ChengshuLi/WorldAtlas/issues/1202). No stock diagnostic was rerun.

### Candidate-source identities and lineage

| Family | Candidate feature(s) and pinned IDs | Recorded vintage/source/license |
|---|---|---|
| CAF ADM1 | Mbomou `63714938B78522502559544`; Haut-Mbomou `63714938B95555008029378` | 2006; geoBoundaries/Wikimedia; CC BY 2.5 |
| CAF ADM2 | Bambouti `33826404B2470815195032`; Obo `33826404B40761150188578`; Zémio `33826404B4042011562142`; Rafaï `33826404B37622790924059` | 2015; geoBoundaries/UNHCR; recorded CC BY 3.0 |
| CAF ADM3 | Lili `52401652B67617163165287`; Zemio `52401652B60998928048694`; Obo `52401652B70517020130267`; Mboki `52401652B10274630546415`; Rafai `52401652B18967628609342` | 2018; ACTED/OCHA CAF; CC BY 3.0 IGO |
| SSD ADM1 | Western Equatoria `48771326B90797869503386` | 2020; IMWG/NBS/OCHA South Sudan; CC BY 3.0 IGO |
| SSD ADM2 | Ezo `79223893B74346966367837`; Tambura `79223893B47853667167464` | 2020; IMWG/NBS/OCHA South Sudan; CC BY 3.0 IGO |

Feature identities were read from the retained family bodies pinned to commit `923e9c210b59836e069c182d68daf85439096381`, and match the original target's 14 exact territorial-exclusion IDs and geometry-hash pins. The 2019 COD source and 2006/2015/2018/2020 competitor families have different scopes and vintages. These source records alone do not decide which boundary governs the overlap.

The original 2015 UNHCR record is titled “Central African Rep.: Sub-Prefectures 09 Jun 2015,” published/uploaded June 9, 2015, described as Maps and geodata, with a PDF listed at 638.33 KB ([UNHCR document page](https://data.unhcr.org/en/documents/details/32968)). Its portal states a default CC BY 4.0 license unless otherwise indicated; the pinned geoBoundaries metadata records CC BY 3.0 for the derivative CAF ADM2 family. Search-indexed map text names Zémio and says mapped boundaries/names/designations do not imply UN endorsement or acceptance. The exact public PDF was retrieved from that same official document URL and privately inspected. It is 653,647 bytes, SHA-256 `f4766eab7ee816a485423cf46c9c673d19c954b49fb31602886ca370d1fb7be9`, one page. PDF metadata names mapping@unhr.org, creation date 2015-06-09, ArcMap 10.2.1, and title “Central African Republic: Sub-Prefectures.” Its legend distinguishes Sub-Prefectures Boundary, International Boundary, and Undetermined Boundary. The map depicts Zémio on the CAR side of the international boundary, but is coarse and not georeferenced; it cannot prove exact equality to the pinned geoBoundaries Zémio geometry or place the 36 centers against its line. The private source copy is at `cod-uige-preserved-20261024/unhcr-caf-adm2-32968-20261024/source.pdf`. Do not redistribute it or its map geometry.

### Independent review and remaining decision

The existing `brn828_reviewer` reviewed the exact roster/crosswalk and the actual 2015 UNHCR PDF. It concludes that the map context is relevant but does not clear the CAF Zémio operand: it depicts Zémio on the CAR side, while its coarse/non-georeferenced content does not prove equality to the pinned polygon or locate these exact centers. No specific accessible primary-source step remains in the retained record that is likely to decide the feature-to-key relation. A narrowly scoped researched-unresolved proposal for these 36 is supportable only if it explicitly states the direct Ango/Zémio center conflict as adverse and unresolved, records both differing license records and all source-vintage/geometry limits, and preserves all 36 holds. It must not call cells clear, infer territorial authority from labels, or claim accepted credit. Root acceptance and canonical delivery remain outstanding.

Exact pending keys, represented as `[owner, y, x]`:
- `[14459, 127443, 149291]`
- `[14459, 127443, 149292]`
- `[14459, 127443, 149372]`
- `[14459, 127444, 149293]`
- `[14459, 127444, 149294]`
- `[14459, 127444, 149371]`
- `[14459, 127445, 149294]`
- `[14459, 127445, 149295]`
- `[14459, 127445, 149296]`
- `[14459, 127445, 149370]`
- `[14459, 127446, 149296]`
- `[14459, 127446, 149297]`
- `[14459, 127446, 149369]`
- `[14459, 127447, 149297]`
- `[14459, 127447, 149298]`
- `[14459, 127447, 149369]`
- `[14459, 127448, 149299]`
- `[14459, 127448, 149368]`
- `[14459, 127464, 149326]`
- `[14459, 127465, 149327]`
- `[14459, 127465, 149328]`
- `[14459, 127466, 149329]`
- `[14459, 127466, 149330]`
- `[14459, 127467, 149330]`
- `[14459, 127467, 149331]`
- `[14459, 127468, 149331]`
- `[14459, 127468, 149332]`
- `[14459, 127468, 149333]`
- `[14459, 127469, 149333]`
- `[14459, 127469, 149334]`
- `[14459, 127470, 149334]`
- `[14459, 127470, 149335]`
- `[14459, 127471, 149335]`
- `[14459, 127471, 149336]`
- `[14459, 127472, 149336]`
- `[14459, 127494, 149067]`
