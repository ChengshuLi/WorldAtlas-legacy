# XKX frozen 550-key source-applicability assessment

Date: 2026-10-25. This is a bounded source and legal-applicability assessment of original XKX issue #2629, not a geometry repair, current-owner update, accepted-ledger join, or credit decision.

## Frozen roster and retained source binding

The original package is pinned to queue commit `2d1fc6f430e756498908bf2c4e267356a13f5cc7`, queue row 173 (zero-based), in `coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json` (blob `9c9a9bc83627afd3e8435ff4009e39530543bf54`). Its frozen disposition binds 550 unique keys, 298 intervals, seven owners, and 13 source contacts. Reconstructed keyset SHA-256: `7188aa1fc57b8cf3e0e4c7aed38b362ae21c44cb675f83d1290754aaf536f44e`.

The frozen source-feature roster (queue commit; blob `e6e380ec13cd4bcc1d24399a76bfa85ca5805b26`) and retained physical-context record map each owner to one primary XKX feature. The exact retained `gb-XKX-ADM1-000.bin.gz` source-corpus payload at the queue commit is Git blob `b50655d702ad9047e78453e8679b7a3023d91367`; compressed size 25,216 bytes / SHA-256 `0e6393bae49b47412d6fbc19d729dd0a1a83756d8af3e55c454f99be52de0530`; decoded GeoJSON size 89,125 bytes / SHA-256 `f0976bb034347f9f6e41ad76a0fdb1586465a5df3120ff2c43feaa7670bc593c`. These match the retained catalogue entry (blob `09afab19371f0814da61e79e5f310c5fb2405b6d`). Read-only property inspection confirms the seven retained shape IDs/names below; it did not inspect polygon coordinates.

| Frozen owner | Keys | Feature index | Exact source ID / shape ID | Retained shape name |
|---|---:|---:|---|---|
| 48797 — District of Mitrovica | 243 | 65882 | `gb:XKX:ADM1:2360587B11570115914955` | District of Mitrovica |
| 48798 — District of Peja | 51 | 65883 | `gb:XKX:ADM1:2360587B15813948402025` | District of Peja |
| 48799 — District of Prishtina | 129 | 65881 | `gb:XKX:ADM1:2360587B5118871504069` | District of Prishtina |
| 48800 — District of Ferizaj | 23 | 65887 | `gb:XKX:ADM1:2360587B74553771763221` | District of Ferizaj |
| 48801 — District of Prizren | 22 | 65886 | `gb:XKX:ADM1:2360587B89959345704230` | District of Prizren |
| 48802 — District of Gjakova | 29 | 65885 | `gb:XKX:ADM1:2360587B9056373484571` | District of Gjakova |
| 48803 — District of Gjilan | 53 | 65884 | `gb:XKX:ADM1:2360587B95703323116719` | District of Gjilan |

An earlier, separately recorded center application against these exact seven retained features reported 243/243, 51/51, 129/129, 23/23, 22/22, 29/29, and 53/53 centers respectively inside the assigned feature, with no boundary/outside centers and no center contact with another of the seven. It used the frozen native latitude table (commit `5b32388df0501b013ac9a3ba97864932db493d59`, decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`) and project native longitude rule. The earlier application report states that its predicate was exact center-point-in-polygon testing against the retained source polygons; this note binds its reported result to the exact feature IDs and does not rerun or independently validate that computation. Its local source note is `/Users/chengshuli/Documents/Codex/2026-10-24/task-6/research/XKX/pinned-source-polygon-contact-20261025.md` (SHA-256 `06a6dc1ebbaafd054b709b6767e83bc6980dba0985a4885cd22ba60bb9211b16`); that note is outside this repository, so these counts remain prior-reported evidence rather than a result independently validated by this PR. The outcome establishes only consistency of the prior center tests with the retained source polygons. It is not positive eligibility, whole-cell coverage, legal assignment, or proof that the source feature represents a valid historical district.

The frozen physical context records 550 land cells, 0 inland-water cells, 0 unresolved-class cells, and 0 opposite-mask overlaps for the original package. This assessment preserves that existing result without rerunning physical support. It does not establish full-cell land coverage or contemporary ground conditions.

## What the dated legal evidence does and does not bridge

Law No. 03/L-041 on Administrative Municipal Boundaries was published in Official Gazette 26/2008 on 2008-06-02. Articles 2–3 set municipal territory/boundaries through settlements and assigned cadastral zones; Article 5 names municipalities; Appendix 1 / Article 6.1 lists cadastral zones by municipality. The Gazette record lists amendments in 2008 and 2012 and a 2025 consolidation record. The inspected schedule provides dated legal municipality-to-cadastral-zone names, but no seven-region/district tier, no district-to-municipality schedule, and no map or coordinates that assign these seven retained source polygons to those cadastral units.

The schedule contains material name/split caveats. The owner label “District of Mitrovica” is not a municipality name: Articles 5.4–5.5 split Mitrovica into North and South municipalities, and Article 3.3 identifies the Suhodoll/Suvi Do cadastral-zone split. “District of Prishtina” is likewise not a municipality name; Article 5.2 no. 17 and Appendix 1 code 19 name Prishtina cadastral units, while Article 3.2 records the Graçanica–Prishtina split involving Çagllavica. The other owner toponyms also occur as municipalities/cadastral-zone names (Pejë, Ferizaj, Prizren, Gjakova, Gjilan), but lexical overlap does not assign their full legal units to the named districts. The schedule is not a geographic crosswalk from the 550 keys or the seven feature IDs.

The source product itself is not a legal district certificate. The pinned `gb:XKX:ADM1` record (`data/administrative-sources.json`, commit `c6a26e1caba54e1b81a89fbda3a64fff56da323d`, blob `2747b845f0c5654765da3b951c9074e52f220077`) identifies boundary `XKX-ADM1-2360587`, represented year 2021, canonical unit “Municipalities,” advertised count 48, OSM source updated 2023-01-19, build date 2023-12-12, and geoBoundaries release pin `9469f09`. Only seven features are retained in this source-corpus member. Their properties are named “District of …,” which conflicts with the record's canonical-unit label and 48-unit advertised count. Identity of these seven properties to the frozen roster does not explain the 41 absent advertised units or establish an official historic district role.

Other regional naming evidence does not fill the bridge. KAS's December 2023 RKS 001–007 municipality lists call NUTS III statistical regions non-administrative. MIA Administrative Instruction 07/2019 uses the seven names for vehicle-registration regions but contains no component-municipality/cadastral schedule or boundary geometry. Neither is the required historical/legal district map.

## Source-specific terms and remaining uncertainty

The exact XKX metadata and retained source-corpus catalogue record “Creative Commons Attribution-ShareAlike 2.0” and cite the OSM copyright page. The exact source record has `licenseDetail: nan`; no item-specific license confirmation is present. geoBoundaries API documentation describes gbOpen as CC BY 4.0-compliant with attribution and defines its `boundaryLicense` field as the original primary-source license. OSM's copyright page distinguishes the OSM database (ODbL) from documentation (CC BY-SA 2.0). The retained fields identify provenance and reported terms, but do not resolve which terms govern this exact simplified polygon product or clear redistribution. Attribution alone does not resolve that conflict. No legal conclusion is made.

## Decision and exact missing bridge

Current evidence does **not** support positive eligibility for any of the seven groups. All remain **researched-unresolved** for source applicability: the source product identifies 48 municipalities, whereas the frozen owners and seven retained shape labels say districts; the dated law schedule enumerates municipalities and cadastral zones but does not link the seven feature IDs/550 keys to them; and source-specific reuse terms remain unresolved. The previous center-contact outcome remains preserved as a technical result, but it cannot substitute for the missing authority, lineage, or rights evidence.

The precise missing evidence is a dated authoritative district source or map that identifies these exact seven features (or an explicitly versioned equivalent), maps them to municipal/cadastral units under Law 03/L-041, and explains the source's relationship to the 48-unit product. A source-specific rights statement must also resolve applicable terms for these exact geometry bytes. No such bridge appears in the inspected law schedule or retained release/corpus record. No new source search, geometry computation, key/ledger reconciliation, owner change, credit, or claim is made by this assessment.

### Primary references

- [Official Gazette: Law No. 03/L-041](https://gzk.rks-gov.net/ActDetail.aspx?ActID=2518&langid=2); English full text with Appendix 1: [MLGA-hosted law](https://mapl.rks-gov.net/wp-content/uploads/2017/10/Law-On-Administrative-Municipal-Boundaries.pdf); 2025 consolidated-law record: [Official Gazette](https://gzk.rks-gov.net/ActDetail.aspx?ActID=107377).
- [geoBoundaries XKX ADM1 record](https://www.geoboundaries.org/api/current/gbOpen/XKX/ADM1/); [API field/release documentation](https://www.geoboundaries.org/api.html); pinned source files under [release 9469f09](https://github.com/wmgeolab/geoBoundaries/tree/9469f09/releaseData/gbOpen/XKX/ADM1).
- [OpenStreetMap copyright and license](https://www.openstreetmap.org/copyright).
- KAS [GDP by Statistical Regions 2018/2021, December 2023](https://askapi.rks-gov.net/Custom/54ab93a9-061e-4b12-b850-dff45dd32637.pdf); MIA [Administrative Instruction 07/2019 on Vehicle Registration](https://cps.rks-gov.net/wp-content/uploads/2020/09/UDH%C3%8BZIM_ADMINISTRATIV_MPB_NR._07_2019__P%C3%8BR_REGJISTRIMIN_E_MJETEVE.pdf).
