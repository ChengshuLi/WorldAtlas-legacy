# CAF ADM1/2/3: original source archives versus consumed release products

24 October2026; worker `01a16f2d-8ad8-7352-a1b0-11757b3e40e7`. Source-method reading only; no geometry run, numerical vertex comparison, tolerance invention or acceptance credit.

## Definite consumed-product identity

All three native CAF families consume **simplified single-country GeoJSON**, not original ZIP shapefiles, full GeoJSON or CGAZ. The authenticated original-corpus catalogue explicitly records `releaseData/gbOpen/CAF/ADM{n}/geoBoundaries-CAF-ADM{n}_simplified.geojson` at release commit9469f09. Fresh read-only GitHub transport descriptors agree exactly with retained body hashes and byte counts:

| Family | Consumed bytes | Consumed SHA256 |
| --- | ---: | --- |
| CAF ADM1 | 115127 | f9180594ed02a19e423a94f226c489b128d755d306cdd5f00669019b6eb980e8 |
| CAF ADM2 | 597126 | 891357fe42dcc29a7c2ef847bef6422eea857602c515e0141ab015a78b1899bc |
| CAF ADM3 | 807513 | e368afac2f5c1ac7503a181e3e62541df88167cf9072a84c5453ffea999ee88a |

Descriptors are saved in `caf-simplified-transport-descriptors.json`. Retained catalogue blob09afab19371f0814da61e79e5f310c5fb2405b6d records contiguous raw-byte partitioning, without JSON geometry reserialization; original source audit already verified each retained body. No full/simplified geometry was redownloaded or compared in this task.

The original source ZIP hashes remain separate: ADM1 `8447fc91b0a2d42182781060f9dec6f57a98e3427d684c80c29026ea355f957a`; ADM2 `9edc1346fa069c2bc2cfe1bac54e1ab84e82f963167139e868690fa4ad9a7d64`; ADM3 `05beb18f60583c3c0b41fc5b8148a5f8aa66317387eef846c08caaa138e650f4`. Applying the documented source-ZIP hash modulo10^8 identity calculation yields63714938,33826404,52401652, matching the frozen boundaryIDs. This supports archive-family lineage; a truncated ID is not unique cryptographic proof and does not establish coordinate equality.

## Documented transformation, with historical limit

The [README at the exact consumed commit](https://github.com/wmgeolab/geoBoundaries/blob/9469f09/README.md) distinguishes high-precision single-country, simplified single-country and global composite products. It points to geoBoundaryBot for topology/simplification implementation. The current API documentation separately defines `gjDownloadURL` and `simplifiedGeometryGeoJSON`; the actual retained catalogue selects the latter.

I read the original builder code as source text, without executing it. The newest geoBoundaryBot commit returned before13December2023 is `9cb0769fc44210ccf98f6dc6a77f470d80d6edd3`, dated12December2023 20:34:58UTC. Its [geoBoundaryBuilder/builderClass.py](https://github.com/wmgeolab/geoBoundaryBot/blob/9cb0769fc44210ccf98f6dc6a77f470d80d6edd3/geoBoundaryBuilder/builderClass.py), Git blob4a6ac6641cb281b73a54ca09d6bfe9e1c67b6e5d, is retained as `geoboundarybot-9cb0769-builderClass.py`.

That historical code documents casting polygons to multipolygons, standardizing Name/ISO fields, assigning shapeIDs before output transformation, and retaining only canonical properties. Lines856–895 write an EPSG4326 intermediate and separate full and simplified outputs. Both outputs use cleaning with `gap-fill-area=500m2 snap-interval=.00001`. The simplified path adds `-simplify dp interval=100 keep-shapes`, calls a path naming mapshaper0.6.7, then rereads/rewrites GeoJSON with EPSG4326 specified. These are literal documented implementation settings, **not a demonstrated100m error bound**, local tolerance, registration uncertainty, or per-edge change measurement. The full output also has documented cleaning; it should not be equated to untouched source coordinates.

The retained release metadata says buildDate12December2023 but lacks the exact build execution time, builder commit, dependency lock and per-family execution receipt. The same-day historical code is therefore a concrete contemporaneous method, not authenticated proof that this exact revision generated all three frozen bodies. The older gbBuild.py also contains the simplification/cleaning pattern, but was not substituted as the actual2023 executor. No missing build receipt is claimed impossible to recover; none was present in the scoped materials read.

## What transfers and what remains unbound

The source archive/map evidence remains applicable **as provenance**: CAF ADM1 derives from the authenticated2006 Commons blank-map source with2022line-to-polygon work; CAF ADM2 explicitly digitizes2015UNHCR32968 with2021construction; CAF ADM3 carries ACTED/OCHA/SIGCAF archival methodology. The consumed outputs are subsequent simplified products. Original source metadata, original named-feature correspondence and source-method limits can be carried forward with this distinction.

Exact polygon-edge equivalence cannot be transferred from an archive shapefile, map outline, represented year or matching shapeID to the consumed simplified feature. The documented pipeline assigns shapeIDs before simplifying/cleaning, so shared IDs are not evidence that all versions share identical geometry. Neither simplification nor cleaning establishes territorial authority, repairs unknown source registration, or supplies an international river-channel convention. Conversely, their existence does not prove any specific disputed edge moved or became inaccurate.

For native contact assessment, the pinned consumed-product geometry and its reported predicates remain authoritative observations of that representation. The original source bodies explain provenance and reasonable qualification limits; they do not replace those observations. This method check is evidence supporting source interpretation and earns no additional researched-cell credit. All prior holds and access denials remain unchanged.

A first historical modules-directory lookup could not be read at the current layout; the historical root listing identified the then-existing `geoBoundaryBuilder/builderClass.py` path, which was read successfully. No denied source endpoint was retried, no clone/hydration occurred, and no builder was run.
