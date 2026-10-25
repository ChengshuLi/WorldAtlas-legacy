# SOM: historical refusals vs ownerless ADM1 contacts — retained-evidence reconciliation

Date: 2026-10-25. Read-only reconciliation of existing issue/PR artifacts and the frozen key roster. No diagnostic was rerun, no identity was inferred from the B/C research split, and no owner, claim, credit, disposition, or ledger was changed.

## Result

The records support an exact **key-to-contact-vector mapping for the 11 ADM1 contacts whose direct-owner arrays are empty**, but they do not establish legal/ancestral parentage for those contacts. The 11 named source contact IDs occur on **1,803 distinct frozen keys across 33 distinct original owner IDs** in the retained original roster. All 1,803 are mapped one-to-one to one of these 11 empty-owner ADM1 contact IDs in the roster's original vector; 444 of the 2,247 keys have none of these 11 contacts. The 1,803 contact relationships match the aggregate in the original #2577 re-audit comment (one ownerless ADM1 contact in the original vector); this reconciliation only exposes the exact retained key IDs and contact IDs behind that aggregate.

The **nine historical raw competitor refusals remain unmapped**. Public issue/PR records report nine but do not enumerate refusal IDs, exact keys, or their partition. No retained evidence proves these nine are any subset of the 11 ADM1 contacts. Thus all 20 historical events remain pending for causality/ancestry: 11 now have exact contact-to-key-vector indexing but no direct parent owner; nine have neither event IDs nor exact keys.

## Exact 11 empty-direct-owner ADM1 contacts

Source: `evidence-context.json` in the published SOM packet (ref `0831f7e5fbfcca228dda175f73b6d8449b35982f`), Git blob `844aa3c370d202cec4cf7ce1b51135fa151fa7a4`. Every row below has an empty `owners` array in that retained original contact roster. The accompanying contact-to-key rows are in [`som-11-ownerless-adm1-contact-key-map.csv`](som-11-ownerless-adm1-contact-key-map.csv), SHA-256 `67cd8bcc228dd7436ef9e17209d60e14e24d514d4625586618f9868b42e7a02e`.

| Source index | Exact ADM1 source ID / name | Frozen key count | Original owner groups with key counts |
|---:|---|---:|---|
| 55845 | `gb:SOM:ADM1:83879307B13610404434600` — Sanaag | 7 | ERIGAVO (40020): 7 |
| 55846 | `gb:SOM:ADM1:83879307B32896531038690` — Banadir | 39 | ABDUL AZIZ (40010): 10; HELIWA (40026): 5; KARAN (40036): 9; HAMAR JABJAB (40047): 8; WABERI (40055): 5; BALAD (40063): 2 |
| 55848 | `gb:SOM:ADM1:83879307B58207540839705` — Bakool | 1 | RABDURE (40033): 1 |
| 55850 | `gb:SOM:ADM1:83879307B5242146898757` — Middle Shebelle | 114 | RUNINGOD (39993): 12; ADALE (39999): 29; WARSHEIKH (40007): 17; RAGA ELLE (40084): 56 |
| 55853 | `gb:SOM:ADM1:83879307B66585548815331` — Nugaal | 76 | EYL (40068): 76 |
| 55854 | `gb:SOM:ADM1:83879307B26517451678825` — Mudug | 210 | HOBYO (40011): 84; HARADHERE (40029): 42; JARIBAN (40086): 84 |
| 55856 | `gb:SOM:ADM1:83879307B35519599536274` — Lower Shebelle | 271 | JILIB EAST (40031): 1; BRAVA (40048): 89; MADINA (40064): 24; KURTUNWAAREY (40065): 30; MARKA (40075): 116; AFGOI (40083): 11 |
| 55857 | `gb:SOM:ADM1:83879307B35818532110087` — Lower Juba | 273 | BADHADHE (40067): 97; KISMAYO (40089): 176 |
| 55858 | `gb:SOM:ADM1:83879307B20044253365087` — Galgaduud | 52 | EL DHERE (40035): 52 |
| 55860 | `gb:SOM:ADM1:83879307B19000204873860` — Bari | 745 | HAFUN (39997): 248; BOSSASO (39998): 94; DANGOROYO (40040): 40; BARGAAL (40054): 65; EYL (40068): 7; BENDER BAYLA (40080): 173; QANDALA (40085): 9; ALULA (40087): 109 |
| 55861 | `gb:SOM:ADM1:83879307B11376444747055` — Awdal | 15 | ZEILA (40049): 15 |
| **Total** | **11 distinct ADM1 contact records, all direct owners empty** | **1,803** | **33 distinct original owner IDs touched** |

These are contact-vector memberships in the proposal's retained source data. They do not mean the ADM1 feature directly owns an ADM2 owner/key, prove legal hierarchy/ancestry, or identify why any competitor was refused. In particular, province labels do not resolve FMS authority.

## Nine raw competitor refusals

The original issue body #2577 says the former task reported `physical-001` completed with exit 0 and that the stock authority refused nine raw competitor IDs “without direct owners or explicit ancestry.” It says their local body/public-availability bindings were being checked. The later public re-audit comment #2577/6357112565 explicitly says the public issue/PR record and the six published PR #2578 files **do not enumerate** the nine IDs or their per-key partition. The original packet README likewise preserves “nine raw competitor refusals” and “unknown held partition” without the identities.

Exact retained artifact pointers:

- Historical scope commit reference: `e21f7e4af69684efae22debce6d1ce3a6395aa26`.
- Historical physical result commit reference: `b478be96586f78b14e9344f83446b6f05bea127a` (`physical-001`, exit 0 in 18.5465 seconds as reported in the issue body). The prior public GitHub API lookup returned HTTP 422, “No commit found for SHA.” A later **read-only local custody check** found this commit in reachable local refs; no fetch or hydration was performed. It contains `coordination/engineering/somalia-original-repair-20261018/physical-001/whole-target-support.json` (Git blob `b78f848766049b8aeee11827678da501e0834853`, 867,059 bytes, SHA-256 `ccc47fbea6169ebc8f577c96305867920a91df45938bb69bad44a43f5c9e901f`) and its `execution-receipt.json` (Git blob `edbd3ae7b241f29553b2ebe759dc44de1945d2b9`, 122,950 bytes). The retained receipt says the physical run completed and binds the output hash above. The output is GSHHG source-relative support for 36 whole target geometries; it contains 11 missing/extra reconstruction geometry issues but no refusal/rejection field or nine raw refusal IDs. This is evidence for the historical physical run, **not** the missing stock-authority competitor-refusal diagnostic.
- Historical independent review reference: `8baee4cefba01128c87e523254d037bb24f2a614`.
- The local `physical-001` artifact above does not contain the nine refusal IDs or key bindings. No reachable local file in the referenced physical-run directory identifies them. The exact missing item is the stock-authority competitor-refusal diagnostic or binding receipt containing those nine identities and their key/ancestry links; its filename and SHA-256 remain **unknown** and must not be invented. The public API 422 remains a failed public lookup, not a source-access denial, and does not negate the exact local physical artifact found.
- The six-file PR #2578 packet paths are `README.md`, `evidence-context.json`, `input-output-bindings.json`, `som-disposition.json.gz`, `som-retained-witness-join.json.gz`, and `som-selected-owner-observation.json.gz` under `coordination/engineering/som-original-disposition-20261020/`. They preserve the frozen proposal and inputs, not the nine raw refusal IDs. The proposal gzip SHA-256 is `d9e87d1c360c3cfe21883b756bcd5da64bd4721abe91ac8c278c37c9e65075cf` (decoded SHA-256 `38835822455a95fa68d8e1392ce1b6470974a3b073061e315cb66d7e9c9a026c`); exact proposal blob `6aeeee41cb80370e816044e3513828c8a911ff1e`.

## Key-map provenance and limits

The exact source roster is [`som-2247-owner-interval-roster.csv`](som-2247-owner-interval-roster.csv), SHA-256 `05a809c1db2e0e08c01fffb9fba1a18c674e70c27f1e710af1ff0c668c2dd91c`; summary JSON SHA-256 `f2785dc7a6953396ce6702c6d746da1f8ca351b69360519d9877f5332822d93e`. It is sourced from proposal `som-disposition.json.gz` noted above. I selected roster rows only by matching the original ADM1 `source_feature_indices` to the 11 exact `source_index` values in `evidence-context.json`; the resulting CSV preserves key `(y,x)`, original interval/question group, original owner ID/name/source label, and matched contact index/ID/name. No geometric, diagnostic, owner, or ancestry computation was rerun.

This yields exact **contact-to-key** mapping for 11 records, not a mapping of nine refusal events. All eleven remain unresolved as direct-owner/ancestry observations; all nine remain pending and unmapped. No key from either category is removed from or assigned a new disposition in the original 2,247-key scope.
