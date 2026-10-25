# DMA232: auxiliary USCB national exterior comparison

This bounded comparison identifies 26 representation-sensitive centers and 206 centers with a conditional inside result against the original USCB national outline. These are auxiliary source diagnostics, not accepted cells, physical classes or replacements for the completed DMA232 native qualification. The source geometry is invalid and every result explicitly retains that limitation. All 232 original keys and their retained source/land witnesses are preserved; the separate 174 original context records were not included or changed.

## Source and exact method

The held USCB ZIP is 501,920 bytes, SHA256 `b54490a499964114609f0ab668446c446c4c53505794ff48edb4337e11f894b4`. Its active ADM0 layer `DM_GEOG_ADM0_2011_uscb_202106`, OBJECTID 1 / GEO_MATCH DMA_00, was read with the approved task-local Pyogrio 0.13.0 / GDAL 3.12.4 OpenFileGDB reader. Its original WKB is 93,482 bytes, SHA256 `b0d5db3093454926a0244657e2b157a09c8b4ab81795d85db91323a132fc1170`. No repair, simplification, union, georeference or reprojection was applied.

The declared CRS is EPSG:4326. The exact retained `display-context232.json` supplies original observer latitudes and the original grid-rule longitudes; only those geographic literals were reused, not its CHARIM projected/display coordinates. The key set was checked against `dma232-physical-input-draft/exact232-original-keys.json`: exactly 232 unique keys, unchanged. The original observer and grid pins are in `comparison-summary.json`. The current original witness lookup was joined by the complete exact key; it records one original parish/owner and retained land per key, with no retained inland-water hit. These are existing raster/support witnesses, **not claims that every cell center lies inside the frozen vector polygon**.

The existing scientific environment was used read-only for this separately authorized auxiliary source comparison: Shapely 2.1.2 / GEOS 3.13.1. No stock module, source producer, physical producer, native observer or authority was run. The filegdb reader environment and the established scientific environment were not modified during comparison.

## Original topology prevents unqualified membership conclusions

The national MultiPolygon consists of one polygon with 5,836 exterior-ring coordinates and one interior ring. The original source reports `Ring Self-intersection[-61.2475446619999 15.4837471930001]`; its exterior is not simple. The first guarded comparison stopped with exit 1 at this check, before any per-key predicate. Its script remains preserved as `compare_centers.py`.

A distinct exploratory script, `compare_centers_conditional.py`, then queried the unchanged source and marked every result conditional on its invalidity. It ran once, exit 0. It used standard point contains/boundary intersection and nearest-boundary operations solely as source-reading diagnostics. As the [Shapely manual](https://shapely.readthedocs.io/en/stable/manual.html#polygons) explains, operations on invalid polygons can produce incorrect results or exceptions. No output here is a reliable polygon-membership certificate or grounds for replacing an accepted native method.

Inspection of the original ring identifies repeated exterior vertices at indices 0/3 and 22/25, excluding closure. The latter is the reported defect location; the neighboring original coordinates are preserved in `original-ring-detail.json`. The closest requested candidate to those two documented repeated vertices is [7115,119706,86474], about 0.05243 planar degrees away. This geographic separation prevents conflating the observed local coast differences with a candidate located directly at that defect; it does not certify topology elsewhere or validate the 206/26 split. No loop was deleted or repaired, and no interior ring was omitted.

## Actual conditional results

| Original parish context | Raw conditional inside | Raw conditional outside |
| --- | ---: | ---: |
| Saint Andrew | 14 | 1 |
| Saint David | 1 | 0 |
| Saint George | 3 | 1 |
| Saint John | 81 | 3 |
| Saint Joseph | 24 | 4 |
| Saint Luke | 16 | 8 |
| Saint Mark | 19 | 3 |
| Saint Patrick | 15 | 2 |
| Saint Paul | 28 | 2 |
| Saint Peter | 5 | 2 |

No query reported an exact boundary match. Of the previous 76 favorable CHARIM contexts, 75 returned conditional inside and one conditional outside. Of the 156 mixed contexts, 131 returned conditional inside and 25 conditional outside. Neither earlier context class was a per-key full-cell membership verdict.

The exceptional favorable-context key is **[7115,119591,86322]**, Saint John, at longitude -61.464034237849305 and latitude 15.584064971665436. It lies at the southern/landward end of the headland west of Stowe/Grange in the retained display context. The original USCB outline runs north of this center locally, while the frozen parish source and the coarse CHARIM mainland context portray the edge differently. This is a genuine representation-sensitive observation; the earlier broad favorable context must not be promoted to a precise edge agreement for this key.

The remaining 25 flagged centers occur in the northern Saint John coast (2), Batibou/Anse-de-Mai (1), Dublanc/Bioche/Colihaut (2), Saint Joseph/Layou (4), Canefield/River Estate coastal context (2), Roseau/Newtown (1), Pointe Michel (8), Bagatelle/Fond St Jean (2), and Scotts Head/adjoining coast (3). All exact keys, original coordinates, conditional query values and nearest original outline positions are in `representation-sensitive26.json`. The eight Pointe Michel and four Saint Joseph cases are the largest local concentrations; they warrant local coastline interpretation rather than a claim that entire parishes or all 156 mixed records disagree.

For the 26, the nearest-outline angular distances range from approximately 0.0000639 to 0.0009360 degrees. These are planar source-coordinate distances, **not meters, positional accuracy, uncertainty tolerances, or tests of native cell footprints**. No accuracy threshold was invented. The 206 inside-query centers can still straddle a line or have source uncertainty; they are not 206 newly cleared full cells.

## Reading the actual representations

`original-sources-comparison.png` draws the unchanged USCB outline in black and the original ten consumed parish ring coordinates in purple. Purple includes internal parish dividers: none was automatically treated as a coastline. Blue/orange dots use the already saved conditional query results, with no recomputation. The plots use explicit longitude/latitude degree frames, with different panel scales; they are not a new geographic data product. The ten-source input hash was checked against its prior receipt. No new predicate was run on those frozen parish vectors.

The viewed panels show the concrete representation differences: the southern edge of the Saint John headland differs around the singleton above; long straight frozen-source coastal segments versus the more articulated USCB line bracket the Pointe Michel and Layou cases; and the Scotts Head connection/northern-facing edge differs across three flagged centers. A separate panel retains the original self-touch detail. The prior Saint John CHARIM reading aid was also re-viewed: it supports headland/mainland context but does not resolve the exact source-outline difference at the singleton. This is source-relative evidence of line placement, not surveyed ground truth.

The frozen consumed source is the retained Commons-derived parish representation, with the previously documented 2005 map and 2022 construction lineage. The active USCB metadata instead binds HDX input accessed 11 May 2021, creation 12 May 2021, and modification 2 August 2021. It describes census-attribute linkage; only parish adjustment for settlement accommodation is explicit. The 2011 label is not a shoreline survey epoch, and these processing dates do not establish a coast capture date. Neither source supplies a demonstrated tidal convention or quantitative positional error for this comparison. More vertices or a later processing date do not by themselves establish superiority.

## Source-author disposition for independent review

Preserve the completed native232 qualification, its original physical/source inputs and the separate174 scope. Do not silently suppress the 26 differences, reclassify them as sea, or infer that USCB is correct because it is published by a government agency. Conversely, the invalid national feature is not an excuse to discard all its documentary or visible line-placement evidence.

The reviewable disposition is **206 auxiliary corroborative center indicators with invalid-source/whole-cell limits, plus 26 explicitly representation-sensitive centers needing consideration alongside the already-read CHARIM, frozen source and original land witnesses**. The singleton within the former favorable76 must be identified separately. This is a source-author recommendation about evidence weight; it does not alter held/qualified/accepted statuses or prescribe a new exception.

The concrete remaining decision is whether the already available multi-source evidence supports the intended source-relative delivery despite those local exterior differences. If a reviewer requires a quantitative USCB-based inclusion claim, an independently justified treatment of its original invalid topology and the appropriate claim scale would be needed first; this worker has not manufactured one. That is not a universal demand for a new coast survey, sovereignty certificate, or repeated stock run. All stated source epochs and uncertainty limits remain. No additional source acquisition, coordinate transform or generic search is necessary to understand the present comparison.

CDEMA TLS and other actual source-access stops remain stopped. No action is pending or uncertain. Normal owned-worktree Git push remains the only repository publication route; this auxiliary packet is currently local and the published DMA handoff remains unchanged.
