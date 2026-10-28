# JOR656 bounded original physical stage input

This stage is a literal parsed-feature projection of the retained full 2006 geoBoundaries JOR ADM2 source, restricted to the 16 source members with recorded owner associations in the exact JOR656 source-feature roster. It is input to the existing physical-comparison producer only; it does not itself establish land, water, political membership, or owner qualification.

## Source and selection

- Original feature body: `data/regional-review/regional-review-edbb8a26c777b89d/sources/geoBoundaries-JOR-ADM2.geojson` at source commit `b7a4628a0f92e4ffad8f64a242fd92bdf219524c`; 1267706 bytes; SHA-256 `d575a50ed8382a67aee5b716c9ca45b35447d857dadb2cf4af74ad936db8dc34`.
- Metadata body: `data/regional-review/regional-review-edbb8a26c777b89d/sources/geoBoundaries-JOR-ADM2-metaData.json` at the same commit; 787 bytes; SHA-256 `9e77bad84276c5c28a8d2c83c98acbec084c1e8199b0fe74f1aeb6d07436fd6c`.
- The source metadata identifies `boundaryYear=2006`, `boundaryType=ADM2`, `boundaryCanonical=Nahias`, and `boundaryLicense=Public Domain`; the geoBoundaries product's pinned citation notice requires CC BY 4.0 attribution and source citation. The source row memo preserves the malformed upstream `boundarySourceURL` and separate terms nuance.
- Exact roster input: `coordination/engineering/global-current-cell-work-queue-20261014/source-feature-roster.json.gz` at `b7a4628a0f92e4ffad8f64a242fd92bdf219524c`, 1844315 bytes, SHA-256 `87f2d47e104b3af640351e747d8300d0068a1be23caab9e80558c3f8914eb4aa`. Selection was `family_index=169` and exactly one associated owner in the original 656-key set. All 16 owners join one-to-one to 16 source features; no other feature was added.
- `target-owner-crosswalk.json` preserves exact owner/source-index/source-ID/name association and is not a legal/current administrative crosswalk.
- Each `consumed` feature preserves the parsed original source properties and full Polygon/MultiPolygon coordinate arrays without clipping, snapping, simplification, repair, reprojection, or other coordinate transformation. This is a source-derived subset, not the complete JOR family.

## Use and limits

The accepted physical comparison treats these 16 whole source targets against the complete retained GSHHG 2.3.7 hierarchy using its original reader and periodic-frame validity/intersection method. That physical context is heterogeneous in observation date and scale and has known invalid/out-of-date records and license wording conflict; it is not administrative evidence. Results must be read alongside the complete foreign-contact, original-source, physical and native predicates. The 25 inland-water cells remain intact and are not reclassified by this whole-target stage.
