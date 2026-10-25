# KNA license citation and geoBoundaries date fields

Read-only check of the official OSM copyright/license page and geoBoundaries own licensing/API documentation; no geometry retrieved.

## OSM license citation

The official [OpenStreetMap Copyright and License page](https://www.openstreetmap.org/copyright) expressly separates its terms: OSM **data** is licensed under the Open Data Commons Open Database License (ODbL), while OSM **documentation** is licensed CC BY-SA 2.0. Therefore, if the KNA catalogue's “CC BY-SA 2.0” field cites this OSM page as license source, the citation points to OSM documentation terms, not the page's stated OSM-data license. This identifies a data/documentation mismatch in the citation; it does not establish the provenance or rights of every input to the geoBoundaries KNA compilation and is not a legal conclusion.

## geoBoundaries open release and dates

geoBoundaries' [own license/use page](https://www.geoboundaries.org/) says its datasets are provided under CC BY 4.0 and requires acknowledgement/attribution. Its [API documentation](https://www.geoboundaries.org/api.html) specifically describes `gbOpen` as CC BY 4.0 compliant and requires attribution, while distinguishing `gbHumanitarian` and `gbAuthoritative` products, which may have less open terms. The API separately defines:

- `boundaryYearRepresented`: the year/range represented by the boundary layer;
- `sourceDataUpdateDate`: when source information was integrated into geoBoundaries; and
- `buildDate`: when source data was most recently standardized and built into a release.

These are distinct metadata fields. A KNA `boundaryYearRepresented=2021` does not by itself date the file's source-data integration or build. The retained KNA metadata cited in `research/KNA/findings.md` records a Jan 19, 2023 source-information update and Dec 12, 2023 build, which are consistent with the API's field meanings; these dates are not a verification of the boundary's represented year or legal effective date.

## Remaining uncertainty

The source catalogue's CC BY-SA 2.0 citation appears inconsistent with OSM's data license page, and geoBoundaries describes `gbOpen` as CC BY 4.0. These statements do not resolve whether every source component and version in the specific KNA artifact is covered by geoBoundaries' `gbOpen` terms, nor does this check determine whether the recorded source/license metadata fully reflects its upstream rights. Resolve that from the exact pinned KNA metadata/source lineage and applicable terms before making a rights determination. This note makes no legal conclusion and does not authorize use beyond the cited public statements.
