# Official INE census cartography: original COD Popokabaka18

Research date: 2026-10-24. Worker: `01a16f2d-8ad8-7352-a1b0-11757b3e40e7` (`uige18_lineage`).

The actual national INE Censo2014 report supplies a primary description of census cartography, but it does not identify the precise Maquela do Zombo and Quimbele polygons consumed as 2018 AGO ADM2 negatives. All eighteen cells remain held. This research contributes source evidence only; it adds no accepted cells, geometry observations, producer executions, or completion credit.

## Actual source and acquisition

Official source: https://www.ine.gov.ao/Arquivos/arquivosCarregados/Carregados/Publicacao_637981512172633350.pdf . Title printed in page footers: *Resultados Definitivos do Censo 2014*.

The web reader returned a content-size error (13,072,701 bytes). A default local request failed DNS before writing. Parent then explicitly authorized the precise one-source download under normal approval control. A `require_escalated` Python urllib request, normal TLS and a 16,000,001-byte read cap, passed PDF and size validation; execution session37927 exited0. No denial was bypassed. The file is `ine-census2014-national.pdf`, 13,072,701 bytes, SHA256 `6e1b96bec02071841fead38ba4832637d40a323e8021bfa7d303373bdc671899`.

Actual PDF text was extracted with bundled pdftotext. Printed/PDF pages20 and27 were rendered with bundled pdftoppm and visually inspected. This is document inspection, not georeferencing or geometry reconstruction.

## Findings and their limits

1. Page20, section4.4, says geographic extents in the report's cartograms were calculated in ArcGIS through vectorization of polygons of administrative hierarchy units from satellite images and topographic maps held by INE's cartography area. This is direct INE methodological evidence. The paragraph gives no imagery product/date, topographic sheet identifier, input map scale, control coordinates, or feature-specific construction record.
2. The preceding paragraph on page20 describes local guides assisting census collection by locating and identifying geographical areas and limits, including villages. It does not identify a border survey or adoption of the particular municipality edges at issue.
3. Page27 describes the census section hierarchy and distinguishes 161 municipalities at the time of cartographic updating from162 at report time. It does not identify the change there. Do not substitute the separately retained USCB2019 Lovua explanation for an INE statement.
4. Page27 actually displays a national administrative map, with provinces labelled, internal municipality/commune lines and a350km scale bar. It is not merely a statistical table. In the inspected rendering it lacks labelled Maquela/Quimbele municipal polygons, geographic coordinate grid, named input sheet citations, or positional control for the pending keys. The scale bar is not a statement of the original source-map scale.
5. The extracted204-page text contains zero occurrences of `Maquela`, `Quimbele`, `AO17148`, `AO17153`, and `GADM` (case insensitive). This describes the searchable text only; it does not prove that an unlabeled polygon or raster text is absent. The actual map was visually checked separately.

The retained 2018 source archive `ago-adm2-release9469-source.zip` (602,248 bytes, SHA256 `e8c91005399a78000aecf5e968ccc3ce4bb74441219312339975318c0497725f`) names GADM+INE and OCHA/HDX provenance. Its actual DBF has Maquela do Zombo ordinal145/pcodeAO17148 and Quimbele ordinal150/pcodeAO17153. See `ago-adm2-archive-findings.md` and `ago-adm2-archive-inspection.json` for consumed-input identity. The national census text is compatible with INE having constructed administrative polygons, but does not prove that those two 2018 source features derive from this precise report/cartographic edition. The shared count161 is not a source identity join.

## Bounded official search and independent attempt

Official-domain searches combined Maquela do Zombo, Quimbele, Uige, census2014, definitive results, cartography/limits, satellite imagery, map, and2018/GADM. These identified the national report, a Uige population projection catalogue and a2013 statistical-system activities report. They did not identify a precise accessible official municipal map or a2018 feature construction record for the two target features. This is a bounded search outcome, not proof that such a product does not exist.

The actually read official catalogue https://www.ine.gov.ao/publicacoes/detalhes/OTI= describes Uige projections based on the2014census and other demographic inputs, including municipality projections2014–2024. Its download https://www.ine.gov.ao/Arquivos/arquivosCarregados//Carregados/Publicacao_637586893839961044.pdf failed in the web reader. No local PDF body was read, and no municipal-map content is attributed to it.

The independently identified smaller report https://www.ine.gov.ao/arquivos/geral/sen2013.pdf timed out twice in the web reader. A separate approved precise urllib read (6MB cap, session57227) exited1 because the returned body did not pass the combined PDF/size validation. No file was saved or inspected. The retained result does not distinguish a non-PDF body from an oversized body; no methodology claim is based on its search snippet. This is a failed source-read attempt, not an access denial or a claim of source absence.

No denied HDX page, denied AGO ADM1 archive, or alternate route to that denied object was requested in this task. No2024 cartography or2019 LSIB comparator was substituted for the2018 source.

## Remaining precise gaps

The source-relative missing evidence is the named INE satellite/topographic input or municipality feature construction record actually used for the consumed2018 Maquela/Quimbele polygons, including any mapping between INE units and the archived AO17148/AO17153 features. The report names input classes but no specific sheet/product to pursue. This bounded official-source question therefore stops here rather than inventing another exact product or asserting exhaustive search.

Separately, retained native reports still do not attribute the per-cell whole-cell veto among the four actual negatives for these eighteen keys. That concrete observation gap is already described in `per-operand-machinery-request.md`; this census report does not fill it. Pool remains an actual negative; no nonexistent Kwango negative is reconstructed. All existing positives and accepted researched-unresolved cells remain intact.

## Supporting local artifacts

- `ine-census2014-national.txt`: 631,317 bytes, SHA256 `7eecc6e0fc5eab0488ebe55a693667f6ce63026c947b8e9d33c22b0871839e5f`.
- `ine-census2014-p20.png`: 178,853 bytes, SHA256 `8b9d02123cbface39ae1fbfc4fb8eb9496debad46c2c349dca88aedc363eec15`.
- `ine-census2014-p27.png`: 693,720 bytes, SHA256 `4d568dda9e46b430bbb4091fd56fae5540aadebb2b0e1bef0e33a51ec2287d5b`.

No Git mutation, population import, source deletion, new geometry, native scan, or stock producer/build occurred.
