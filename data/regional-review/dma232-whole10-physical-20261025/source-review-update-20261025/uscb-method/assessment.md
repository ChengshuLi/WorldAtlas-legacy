# DMA232: active USCB FileGDB source reading

The documentary reader limitation is resolved. A fresh task-local environment, created from the same selected bundled Python, successfully read the already-held FileGDB through Pyogrio 0.13.0 / GDAL 3.12.4 OpenFileGDB. The original archive was not reacquired, extracted or modified. No geometry arrays, spatial filters, predicates, native observations or qualification reruns were used.

## Actual setup and custody

The coordinator expressly authorized a separate source-reader dependency environment. The selected interpreter was `/Users/chengshuli/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`, Python 3.12.14 arm64, and the actual author identity was `01a16f2d-8ad8-7352-a1b0-11757b3e40e7`. The new environment is `dma232-filegdb-reader/venv`; its `sys.base_prefix` still points to that selected runtime. No shared/global or stock scientific environment was modified.

The [official installation documentation](https://pyogrio.readthedocs.io/en/latest/install.html) states that PyPI wheels bundle GDAL and commonly include OpenFileGDB. Exact [Pyogrio 0.13.0](https://pypi.org/project/pyogrio/0.13.0/) was selected. Only binary wheels were permitted; source builds were excluded. The first ordinary pip call failed before package download because pypi.org could not resolve (Errno 8); its final no-matching-distribution message was not evidence that this release was unavailable. The supported require_escalated call then ran as session 5329 and completed exit 0. The tool exposed no separate approval ID and no denial. The pip logs/report preserve both outcomes. Installed wheels and all dependency versions/hashes are captured in `wheel-provenance.json` and `reader-requirements.lock`.

The reader itself subsequently ran under `-I -B`. Its OpenFileGDB driver was available. Read-only `/vsizip/` access targeted the retained `2011 census data/Dominica.gdb` within the original 501,920-byte ZIP, SHA256 `b54490a499964114609f0ab668446c446c4c53505794ff48edb4337e11f894b4`.

## Active records and documentary binding

The actual catalogue contains three spatial layers, all reported as MultiPolygon / EPSG:4326:

| Active layer | Actual records | Identity/purpose |
| --- | ---: | --- |
| DM_GEOG_ADM0_2011_uscb_202106 | 1 | DOMINICA, GEO_MATCH DMA_00, national boundary |
| DM_GEOG_ADM1_2011_uscb_202106 | 10 | The ten named parishes with GENC/FIPS/NSO names |
| DM_GEOG_ADM2_2011_uscb_202106 | 102 | Settlement groupings and ten rest-of-parish records |

A fourth nonspatial age/sex table contains 11 records; its schema was inspected, but its population values were not read or imported. `list_layers` and `read_info` supplied the catalogue, schema and driver-provided counts/stored bounds with their default, non-forcing options. Attributes for the three spatial layers were read with `read_geometry=False`; the returned geometry objects were asserted to be None. No coordinates were exported or evaluated.

The driver's documented [GetLayerMetadata / GetLayerDefinition requests](https://gdal.org/en/stable/drivers/vector/openfilegdb.html) returned the active attached XML for all three layers. These show creation 12 May 2021 and modification 2 August 2021, resolving which metadata the reader associates with the active layers. Earlier March/April modification strings extracted from system-table bytes are not the active metadata returned here; no further claim about their historical/free-row origin is needed.

The layer definitions explicitly bind WGS 1984, WKID/LatestWKID 4326, degree units, XY origin -400/-400, scale approximately 1e9, and XYTolerance 8.983152841195215e-09. The tolerance and storage precision are database settings, not boundary survey accuracy. The layer extents are nearly equal; neither this fact nor matching names establishes equality of geometry or of the national polygon and parish union.

## What the actual source construction establishes

The active national and parish metadata both identify the HDX administrative-boundary product accessed 11 May 2021. The active parish credit describes slight adjustments to accommodate settlement boundaries digitized by USCB. The national credit states its HDX source without an equivalent alteration statement. This does not prove either an altered or unchanged national coastline relative to another source; no source equality comparison was performed.

The active abstracts and purpose describe boundary feature classes used to link USCB-prepared attributes for USAID humanitarian-assistance population work. This is affirmative evidence of a useful statistical mapping product, not a new coastline survey or independent verification of the Commons-derived frozen source. The 2011 label is census content, while 2021 creation/modification and HDX access dates are processing/documentary dates. No coastline capture epoch, tidal convention or positional error was established by the inspected metadata.

The active settlement attributes corroborate the note's ten rest-of-parish records. Five other comments record combined census areas: Stock Farm includes Tarish Pit, Yam Piece and Bellevue Rawle; Salisbury/Grand Savanne includes Mero; Grand Bay includes Hagley/Picodeau; Berricoa includes Ravine Banane; Tete Morne/Cottage includes Montine. Thus missing standalone settlement names do not demonstrate missing geographical coverage. In particular, Mero's inclusion is directly relevant to interpreting the existing Mero context without pretending to locate any exact native key from its name. The rest-area unpopulated labels remain census-purpose annotations, not ownership, physical-class or shoreline evidence.

The source layer names, original record IDs and all read attributes are preserved. No parish ID was substituted for a WorldAtlas runtime ordinal; no new source equality or cell-membership assertion follows from these documentary joins.

## DMA application and remaining bounded question

All ten frozen parish members belong to selected aggregate owner 7115 / atlas:territory:DMA. Internal administrative-divider adjustment alone cannot alter that aggregate's ownership. A different external national outline could be a useful representation check in the already-read 156 mixed coastal contexts; the 76 favorable contexts and all existing positive source/physical evidence remain preserved. Mixed is not an adverse class.

This reading closes the actual active-layer, source-purpose and declared-CRS dependency. It does not show a new contradiction with any of the qualified 232 keys. If a particular exterior-coast question remains material for independent review, this authenticated ADM0 layer is now technically readable for a separately scoped source comparison using the declared CRS and original key-coordinate bindings. That comparison remains **unperformed**, not technically impossible, denied, exhausted, or already required for every candidate. No new native/physical/authority run or geometric test is proposed automatically.

The earlier materiality-followthrough packet remains an honest record of the then-missing reader. Its blocker and active-metadata uncertainty are superseded by this successful supported read. The published DMA232 qualification/handoff remains unchanged, as do the separate 174 original nonland-context records and all independent-review/acceptance responsibilities. Actual CDEMA TLS, World Bank and other retained access stops remain unchanged; this FileGDB reading was not a route around them.

No operation remains pending. The fresh reader environment is retained for this bounded documentary purpose; it is not a replacement stock scientific environment and must not be committed. Ordinary public evidence in any arbitrary format remains authorized through existing access, while repository publication remains normal owned-worktree Git push only.
