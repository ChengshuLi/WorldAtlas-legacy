# KIR residual source research — 2026-10-25

## Scope and retained disposition

The current root handoff assigns Team 2 KIR only within its seven-package scope. The exact original claim is [WorldAtlas issue #2257](https://github.com/ChengshuLi/WorldAtlas/issues/2257): `gb-KIR-ADM1--repair-evaluation`, 2,836 original land cells across 1,000 intervals, three owners (26614–26616), source family 180, source indices 41032–41034. The current handoff states 2,552 prior positive outcomes plus 284 held outcomes. I did not change or re-count that ledger.

The latest accepted KIR cohort breakdown already recorded in #2257 comment [6225339643](https://github.com/ChengshuLi/WorldAtlas/issues/2257#issuecomment-6225339643) is:
- 669 Line Islands and 1,787 Gilbert Islands previously qualified;
- 96 of the western source remainder previously qualified;
- 284 still held: four eastern cells from source component 1 near Kanton, and 280 western cells from components 3, 5 and 7–11;
- source component 6 had zero original candidates and remains excluded.

The earlier 2,832-cell candidate and any superseded proposals are archival only. The current root handoff explicitly clarifies the 284 split as four eastern cells in one component plus 280 western cells. The separate 6,216-cell physical companion remains outside this scope.

## New primary-source review

I read the official [Kiribati National Statistics Office district page](https://nso.gov.ki/kiribati-districts/) and the NSO-hosted [Kiribati Census Atlas 2022](https://nso.gov.ki/download/117/other-reports/2022/kiribati-census-atlas-2022.pdf), published by SPC and KINSO in July 2022 and based on the November 2020 census.

The currently accessible NSO district page states that Kiribati islands are grouped in five districts, with Phoenix and Line Islands combined in one district. It lists Kanton alongside Kiritimati, Tabuaeran and Teraina in that group. The page gives no effective date or data vintage, so this is page-current district context only; it does not establish a geometric or identity bridge from the historic three-feature simplified geoBoundaries 2017 source to the current retained source-target feature.

The Atlas supplies statistical mapping context rather than the missing source-component lineage:
- It presents maps of population by island/village and census enumeration areas, including maps for Betio and the northern rural islands.
- The Atlas says 2020 enumeration areas were delineated for census administration, are not based on recognized neighborhoods, local communities or villages, and are combined to build village/island data.
- It also says buffers were generated around small island and village boundaries to make them visible on the maps. The maps therefore cannot be treated as exact polygons for the original 2017 source-component or current-target join.

The Atlas is published by SPC/KINSO and allows partial reproduction for scientific, educational or research purposes with attribution; the same notice reserves commercial/for-profit reproduction and says original artwork may not be altered or separately published without permission. I used only the source text and citations here and did not redistribute the PDF or map artwork.

## Exact held-key inventory

I fetched the already-merged `scope-002/source-component-disposition.json` directly at commit `5c65b213d005607e769af66d39bf03d4554882d6` through the connected GitHub file API and expanded its half-open held intervals into [the exact 284-key inventory](held-284-keys.json). The pinned source is [`coordination/engineering/kiribati-repair-delivery-20261016/scope-002/source-component-disposition.json`](https://github.com/ChengshuLi/WorldAtlas/blob/5c65b213d005607e769af66d39bf03d4554882d6/coordination/engineering/kiribati-repair-delivery-20261016/scope-002/source-component-disposition.json), blob `77a0083bce6d06a18c5b0ba60ce396521490b100`, SHA-256 `3762732e7a11262d7f41088ea5d6ad315b10988099286c52d533073ea2576452`.

Expansion yields 284 unique `(y,x)` keys: component 1 has 4 eastern keys; components 3, 5, 7, 8, 9, 10 and 11 have 22, 26, 32, 19, 48, 22 and 111 western keys respectively (280 total). Component 6 has zero. Every row remains owner 26615 / source index 41033 with its prior precise hold reason. This indexes the old retained hold set; it makes no new current-owner, current-ledger, qualification or credit assertion.

## Access and remaining qualification

The Ministry of Culture and Internal Affairs' [Local Government Division page](https://internalaffairs.gov.ki/lgd/) states that it supports 23 councils: three urban councils and 20 island councils under the Local Government Act 1984. This is a current official governance-role reference, but it does not define the five NSO statistical districts or provide a polygon layer/crosswalk to the three historic source components. It strengthens the conclusion that the NSO district grouping is context rather than evidence for the exact historic ADM1 lineage.

The [Local Government Act 1984 text](https://faolex.fao.org/docs/pdf/kir74395.pdf) specifies that councils are established by ministerial warrants (s.3); each warrant must define the council's area limits and may be amended, varied or cancelled by order (ss.3–4). It therefore points to the exact legal instrument needed for a council-based boundary claim: the applicable warrant and later orders, with their map/schedule and effective date. The Act text itself supplies no current council polygon or warrant-to-NSO-district crosswalk, so it cannot place these 284 held keys into a lawful current council.

The Ministry of Culture and Internal Affairs now has an official [Establishment Warrant index](https://www.mcia.gov.ki/establishment-warrants). It explains that section 4 warrants specify the council, effective date and geographic limits, and links PDFs for named councils including Kiritimati and Tabuaeran, among others. The visible index has no Teraina or Kanton listing; because the page does not say that the linked files are an exhaustive list of current warrants, these are bounded index observations, not proof either island lacks a council or relevant instrument. The separate [Local Government Division page](https://internalaffairs.gov.ki/lgd/) says the division supports 23 councils (three urban and 20 island) and names the three urban councils, but gives no rural-council roster and does not mention Kanton. It does provide a concrete official custodian and the correct instrument class to request/search for, but the visible pages do not expose a Kanton instrument, amendment order, boundary schedule, or geographic crosswalk to the historic source components. The linked [Kiritimati warrant PDF](https://www.mcia.gov.ki/sites/default/files/2026-09/KUC_0.pdf) and [Tabuaeran warrant PDF](https://www.mcia.gov.ki/sites/default/files/2026-09/Tabuaeran_1.pdf) confirm that the index links warrant documents; I did not treat those other-island instruments as Kanton evidence.

A second official-source lead was checked. Kiribati's Ministry of Environment, Lands and Agricultural Development (MELAD) describes the Land Management Division GIS unit as maintaining cadastral mapping and government lease/sublease diagrams, updating infrastructure and coastline data, and using old aerial imagery to compare with current baselines. This confirms national GIS capacity and custody of land-survey products, but does not identify administrative district boundaries or provide a public district geometry download. The page is [MELAD Land Survey and GIS RS](https://www.melad.gov.ki/index.php?Itemid=401&id=64&option=com_quix&view=page).

The NSO census portal links the 2022 Census Atlas and census material by island and village, but no district GIS release or historical component crosswalk was identified in that catalog. The official [Kiribati Map Portfolio](https://storymaps.arcgis.com/collections/b49e0c786b2d41549873275a09882d13) links a stable public “Kiribati Cities & Communities” Web Map, item `a306e380545e4450a5d50f1e11cb4e44`. Its configuration uses a generic global administrative-divisions layer and an EEZ layer; it supplies no Kiribati council/district service, effective date or local component crosswalk. The inspected ArcGIS item metadata gives no reuse license. This portfolio is a thematic lead only, not a primary administrative-boundary source; see [the bounded item check](map-portfolio-item-check-20261025.md).

### Targeted Kanton warrant/Gazette check (2026-10-25)

An independent bounded check of the [MCIA Establishment Warrant index](https://www.mcia.gov.ki/establishment-warrants) and the Office of Te Beretitenti [Gazettes & Instruments index](https://www.president.gov.ki/resources/gazettes-instruments.html) found no Kanton-named warrant, boundary schedule/map, amendment order or Gazette entry in the visible records. The Gazette page exposes 2025–2026 entries; the visible year range does not establish that older or unlisted instruments do not exist. Targeted official-domain discovery queries for a Kanton establishment warrant and a Kiribati legislation/Gazette record returned no matching result. This is a bounded failed source lookup, not proof of nonexistence. The specific remaining source is the Kanton (also styled Canton/Abariringa) Island Council warrant with its official number/date, effective period, attachments and subsequent orders; no custodian contact was made.

The public Pacific Data Hub record surfaced as “2018_Kiribati_HHL_Admin_Boundaries” and describes village/island boundaries used to build Kiribati PopGIS3. Opening that exact record returned HTTP 403. I did not retry that URL or seek an alternate copy/mirror. The earlier KIR PDH GeoJSON 403 in the root handoff remains stopped as directed.

No new exact polygon lineage, original-key/current-owner join, positive repair or stock qualification was established in this source-only pass. The official GIS office and map portfolio leads do not substitute for the required historic component-to-current-target evidence.

## Blocked next step

The fresh task directory has no Git checkout. The installed Node 24.19.0 and Git 2.53.0 binaries are available, and a supported escalated read-only `git ls-remote --symref origin HEAD` succeeded at `de9e9663f9bf3ef6d39a3618734d1539e810a49a`; escalated `gh auth status` confirmed the existing account has `repo` and `workflow` scopes. No login or credential change occurred.

The first allocator invocation used Node 24 but inherited system Git 2.39.5 on `PATH`. After verifying Node PID 32860 and Git child PID 32887, I cancelled through the existing command session (exit 130). Both PIDs exited, but the allocator lock remains. A filtered read of only this worker's non-secret registry fields returned an empty list, and no worktree was created. The current-main helper's `resume` requires an exact preparing entry and token; its report emits every reservation entry. There is no supported worker-filtered stale-lock cleanup in the inspected helper. Auto-review rejected a full registry dump because it could expose other workers' reservation tokens; I did not retry it. The lock and registry were not edited, and no allocation retry was started.

Read-only canonical reservation inspection returned `null` for KIR issue #2257 and root audit issue #2649. #2257's one-PR budget was consumed by merged PR #2260; #2649 is an open audit issue without a work contract or ready label. The root assignment authorizes the current package scope but does not supply a claimable bounded work item. No claim, issue mutation, authoring, PR, package credit or release was made. The exact next blocker is supported cleanup/recovery for the stale allocator lock and a reviewed current work-item contract with exact evidence subjects and pins.
