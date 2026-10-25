# DMA original 232: scope recovered, source research completed, holds retained

Research worker: `01a16f2e-19a2-7470-acfd-59b39f3e90d1` (`/root/residual_land_west`), 2026-10-24. This is a source-research packet, not acceptance, a new native observation, or a whole-package researched-unresolved proposal.

The exact original denominator is **232 land cells in 109 intervals**, owner **7115**, block **29**, family **89**, ten original source features **21050–21059**. The original acceptance of 232 documented-unresolved cells is suspended; no positive repair was accepted in that claim. This packet preserves **232 pending / 0 newly accepted**, all original holds, and no new accounting credit.

## Claim, ownership and independent scope recovery

- Original claim: [WorldAtlas PR2604 comment6304450686](https://github.com/ChengshuLi/WorldAtlas/pull/2604#issuecomment-6304450686); original DATA/CODE `6dc935908f6397226445b1dc5acbd618c4a50a42`. The original root receipt states 232 land cells / 109 intervals / owner7115 / ten features, no repairs or holds removed. [Issue2649](https://github.com/ChengshuLi/WorldAtlas/issues/2649) suspends the package-completion claim. [Root continuation6389114289](https://github.com/ChengshuLi/WorldAtlas/issues/2649#issuecomment-6389114289) assigns DMA within Team2's disjoint priority33 continuation.
- Original author `01a154d0-6705-751e-b1db-445451157016` was read through the supported thread tool and is idle. Its later completed STP work records release of its author slot. Read-only filtering of its task-3 normal `worldatlas-local-workspaces/state.json` found no author/DMA entry. Task-4 normal registry likewise contains no DMA entry. No allocation, branch, token, or lease was taken. Old Team2 coordinator `01a1518e-f9aa-75b3-b37b-a151322d900d` was separately read as idle with stopped research/handoff.
- `reconcile_dma232.py` verifies actual Git object identities and SHA256s, then intersects the retained original candidate runs with the separately pinned retained physical support. **406** owner7115 candidate keys become exactly **232 land**, **0 inland-water**, with **174 nonland candidates excluded**. The resulting set exactly equals the original proposal and independently pinned selected-owner observation: **zero missing, extra or duplicate keys**. All 109 source/owner/mask interval tuples agree. This is a retained-table join, not a new physical classification.
- Each exact pending row preserves its original tuple, held status, source record and selected-owner observation. The old observation has all232 effective owners0 and no overlaps; it explicitly disclaims scientific qualification. That observation alone does not justify unresolved acceptance.
- Custody discrepancy preserved: actual proposal Git blob `260c4ccb0fba47f9286d72070cabbaf4b738abe7` is 320,218 bytes, SHA256 `b6a2c907537a78d1fb804576ab557f11cf7dca62b29116044e328ffd5af51cae`. The original README instead advertises `19b4f648159ed4d2080f9008480d63a01100270b9608643951fa484f77011c0c`. GitHub and local object identities agree on the actual blob; this packet does not silently certify the README hash.

| Original feature | Parish | Pending cells |
|---|---|---:|
|21050|Saint Andrew|15|
|21051|Saint Joseph|28|
|21052|Saint Patrick|17|
|21053|Saint David|1|
|21054|Saint Mark|22|
|21055|Saint Luke|24|
|21056|Saint George|4|
|21057|Saint Paul|30|
|21058|Saint John|84|
|21059|Saint Peter|7|

## Exact original source construction: actual archive and cited image read

The retained simplified source is `gb:DMA:ADM1`, 24,013 decoded bytes, SHA256 `0303b91c05bb5085708181ceb1a3d01d606d282c32fa1afb6c58e36e116678f9`. The ten original properties, IDs and ordinals match the retained roster; each original ZIP DBF row has Name, Level and ISO_Code only.

The exact [sourceData archive at9469f09](https://github.com/wmgeolab/geoBoundaries/blob/9469f09/sourceData/gbOpen/DMA_ADM1.zip) was downloaded and verified against its authenticated LFS descriptor: 60,439 bytes, SHA256 `8e50f8e3551622dc9a9ab8b616d3e666fab2ecc2282208b7dc4d2292b8b42525`. It is byte-identical by Git blob identity `b3caee0df8ca0f8966f1891c006e82766602c1a9` to the original upstream [PR2626](https://github.com/wmgeolab/geoBoundaries/pull/2626) head `88dc18afdf72892dbe639a6fe63dc38490729b1d`. That source submission's issue and review supply no additional transformation controls.

The archive's meta.txt identifies the [2005 blank parish image by Golbez](https://commons.wikimedia.org/wiki/File:Dominica_parishes_blank.png), under CC BY2.5. The embedded license screenshot confirms that exact page and license. Original image bytes (33,122) match the Commons SHA1 `a84903a07954dca8577fbd99da806e2cd29b8ae0`; the complete image was visually read. It shows ten unlabeled divisions within an island outline, with no coordinate grid, scale bar, datum, control points or explicit tidal shoreline rule.

The archive XML records creation of a WGS84 polyline on **28November2022**, conversion with FeatureToPolygon, addition of name/level/ISO fields, and export/deletion of length/area fields. Its process record does not state the raster registration, image control points, residuals or coastline fitting rule. Thus the source's **2005 represented year and 2022 digital construction are different facts**. The missing controls do not prove incorrect geometry; neither does a WGS84 .prj prove a surveyed coast. The read source supports named parish intent, while exact coastal placement still needs the actual retained contact/qualification context.

## Official parish and mapping evidence actually read

**Dominica CSO2011 preliminary census**, official [PDF](https://stats.gov.dm/wp-content/uploads/2019/06/Population_and_Housing_Census_2011.pdf), 1,013,845 bytes, SHA256 `4e036bc837f474bd97462c7f3899710a7efab2df09a5f0b424d13b45b67ed60a`: pages5 and12 were extracted and visually read; pages10–11 were read as text. Page5 describes household/visitation-record checks and correction of enumeration-district overlap. Page12 lists ten parish areas totaling289.5square miles; it gives no coordinate boundary or coastline method. These establish statistical geography and the scope of census validation. They do not establish that the geoBoundaries raster trace reproduces official boundaries, or that census ED corrections relocated a coastal cell.

**CDEMA/CHARIM Dominica Topography**, [official map](https://www.cdema.org/virtuallibrary/images/Dominica%20Topographic%20Map.pdf), 26,854,076 bytes, SHA256 `7d854063e8583ad1dd6638be218d529af3cae47b79147d99b9225e5fd99b35c2`: the complete one-page map and enlarged legend/credits were visually read. It is **April2016, 1:50,000**, with latitude/longitude grid, named parishes, bays, ports, rivers and a dashed parish-boundary legend. Credits name CeesvanWesten (ITC-UT) and KoertSijmons (Geomapa). The [publisher method page](https://www.cdema.org/virtuallibrary/index.php/charim-hbook/country-data/countrydocs-dom/dominica-maps) describes Pleiades-based road/building work and DEM-derived drainage; it does not specifically attribute the coastline or parish-boundary survey. This supplies a substantive independent cartographic context, but no cell comparison was run and the map is not an automatic replacement for the frozen source.

The official [Lands and Surveys Division](https://housing.gov.dm/en/lands-and-surveys-division) identifies itself as national mapping agency and government land-record custodian. This is a precise custody lead, not proof that a relevant survey is unavailable or that a universal certificate is required. No contact was made.

## Tested comparator: USCB geography is not automatically an untouched government boundary

The [Demobase technical report](https://www2.census.gov/programs-surveys/international-programs/mapping-files/time-series/Dominica-Technical-Document.pdf), section2.1, was actually read through the web PDF tool. It broadly describes government-supplied parish polygons. To test applicability rather than rely on that label, the exact public [2011 geography archive](https://www2.census.gov/programs-surveys/international-programs/mapping-files/time-series/dominica_2011_census_data.zip) was downloaded: **501,920 bytes**, SHA256 `b54490a499964114609f0ab668446c446c4c53505794ff48edb4337e11f894b4`.

Its ordinary **BoundariesNote.txt** explicitly attributes national and parish boundaries to the HDX `dominica-administrative-level-0-national-and-level-1-boundaries-form-gadm` dataset, accessed11May2021. It also documents parish adjustments to accommodate USCB-digitized settlement boundaries. This means the archive cannot be described as an unaltered, independent official shoreline survey solely from the report's general wording. The note does not identify which of these232 cells would be affected. Embedded XML strings corroborate the note, but their active FileGDB row association was not independently resolved; the ordinary note is the relied-on archive source. No feature coordinates were interpreted or population values imported.

## Outcome and finite remaining work

The old owner-zero rationale is not reinstated. The original source is now genuinely read, including its actual map image, full construction metadata, ten attributes and exact upstream archive identity; the official census validation context, independent CHARIM map and an available comparator's alteration history are also read. These are substantive source-specific results, but they **do not yet justify a blanket232 researched-unresolved proposal**.

The next decisive need is the coordinator's permitted original-cell contact/qualification context: identify what prevents each exact cell from qualifying against its actual source/physical/target operands. This worker has not rerun a producer or geometry. That context will determine whether the finite mapping question is image-to-vector coastal placement, a particular river-mouth/shoreline convention, a competing operand, or something else. Do not invent a border dispute or transfer parish-internal questions to all232 island-owner cells.

A further bounded source option is the actual HDX parent identified by the USCB note, or CHARIM's linked digital-map metadata, if the coordinator's contact context makes either relevant. They are **not claimed read or exhausted**. Conversely, no unavailable survey or universal sovereignty certificate is imposed as a prerequisite.

Access results: ordinary network commands failed DNS, then the supported one-source approval route completed the four primary downloads and comparator archive with exit0. The ReliefWeb population-map page returned **403** and was stopped without alternate-route fetch; it is not evidence of source absence. PhysicalPlanning's map-index page returned404, and its LandSurveyAct link returned a tool internal error; neither is treated as exhaustive evidence. CHARIM's web PDF size failure was recovered through local reading. No approval remains pending, no security settings or credentials changed, and no native holds changed.
