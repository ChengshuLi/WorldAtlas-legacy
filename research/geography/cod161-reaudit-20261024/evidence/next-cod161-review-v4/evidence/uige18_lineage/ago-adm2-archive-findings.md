# Original Popokabaka 18: AGO ADM2 archive inspection

2026-10-24, native child `01a16f2d-8ad8-7352-a1b0-11757b3e40e7`. The exact consumed-release AGO ADM2 source archive is now recovered and inspected. All 18 keys remain held, with zero acceptance or research credit. No geometry comparison, diagnostic, build or Git mutation ran.

## Exact distinct source object

The native family points to the **gbHumanitarian AGO ADM2** product. At consumed full release `9469f09592ced973a3448cf66b6100b741b64c0d`, [sourceData/gbHumanitarian/AGO_ADM2.zip](https://github.com/wmgeolab/geoBoundaries/blob/9469f09592ced973a3448cf66b6100b741b64c0d/sourceData/gbHumanitarian/AGO_ADM2.zip) has Git LFS pointer blob `13cd4bfa39ba47fc10a4cae3a7c9ee1ea7b16653`, identifying 602248 bytes and SHA-256 `e8c91005399a78000aecf5e968ccc3ce4bb74441219312339975318c0497725f`.

A narrow local search found retained 2019 and 2024 USCB comparator archives but no copy of this exact source ZIP in the supplied source/review directories. The separate public GitHub ADM2 archive had no prior denial. The coordinator-authorized one-source download passed ordinary escalation review and completed (session 75705, exit 0). Actual downloaded bytes match the recorded size and SHA-256 exactly.

The restricted PR1352 **AGO ADM1** object was not read or retried. The denied HDX `cod-ab-ago` page was not read or retried. No alternate path to either denied target was used.

## Actual archive contents and feature identity

The archive contains six members: `AGO_ADM2.cpg`, `.dbf`, `.prj`, `.shp`, `.shx`, and `meta.txt`. There is no XML processing history, methodology document, licence image or additional notes file.

`meta.txt` is 487 bytes, SHA-256 `0c75640223ea31597a05f0beb6ac58eda1b4a9ad374219950f3aa43aeba3b233`. It states represented year 2018, AGO ADM2, gbHumanitarian, GADM and Angola's Instituto Nacional de Estatistica as source 1, HDX as source 2, and Creative Commons Attribution for Intergovernmental Organisations. It refers to the methodology and the HDX dataset URL; canonical name, licence notes and Other Notes are blank. The source's methodology is not included in the actual ZIP. This archive text does not independently establish a versioned upstream licence beyond its retained declaration.

`AGO_ADM2.dbf` is 38931 bytes, SHA-256 `1ea8b012bb11c0b2a51414f7310f0a556704212b7cf43fc3599c2b45442e220f`. It has 161 rows and only three fields: `name`, `pcode`, `level`. Its header's last-update date is 2022-09-05; this is a file-processing marker, not a 2022 boundary survey.

| Original feature ordinal | Actual source DBF record | Native negative |
|---:|---|---|
| 145 | Maquela do Zombo; pcode `AO17148`; ADM2 | ordinal 1, `gb:AGO:ADM2:16411231B1695185499214` |
| 150 | Quimbele; pcode `AO17153`; ADM2 | ordinal 2, `gb:AGO:ADM2:16411231B94377396488260` |

The exact names match the previously verified native original-family properties at the same ordinals. Native geometry hashes remain respectively `62068c3083189911061d0878ae9c106fe79878eb37bf4c00770caa53ef01feab` and `855aafb3b0d7c228ff1ad92ca8ad92b446f6d9bf5371d9d57fee267eb8430751`. No coordinate-equality or contact test was run. The archive's pcodes are new retained identifiers, not evidence that either operand controls a pending cell.

## Finite construction and comparator checks

The retained official USCB 2019 comparator contains the same named municipalities, under Uige, with `GEO_MATCH` values `AGO_03_07` and `AGO_03_12`. It has 162 ADM2 rows and places these records at ordinals 146 and 151. Its metadata records the Chitato/Lovua split and alignment to the 2018 State Department LSIB boundary before output. Neither matching names nor the apparent one-row offset establishes that the current 161-row humanitarian source archive is unchanged from the original 2018 HDX download used by USCB. Its modified geometry cannot be substituted for the native operand without actual qualification. These prior processing findings are reused; no geometry comparison was repeated.

I checked the publisher's source-submission records to avoid importing the wrong construction story. [PR829](https://github.com/wmgeolab/geoBoundaries/pull/829) is a 2021 humanitarian submission that was not merged and had a metadata-check failure. It supplies no adopted feature construction details for the recovered object. [PR2533](https://github.com/wmgeolab/geoBoundaries/pull/2533) was merged in October 2022 and includes a digitizing review comment, but its exact head `6af400150a3f84407ebf1c3ec986fefd8df99ca0` changes **`sourceData/gbOpen/AGO_ADM2.zip`**. It is a different release product; its construction commentary and currency warning are not assigned to this gbHumanitarian archive. [Issue2018](https://github.com/wmgeolab/geoBoundaries/issues/2018) concerns casing and missing character symbols in gbOpen.

A bounded history query for the exact humanitarian source path returns the January 2023 commit labelled Cleared history. This does not recover the original feature-construction history and does not establish that earlier evidence is absent elsewhere.

## Remaining source-relative question

The exact source archive is no longer an access gap. The remaining source documentation gap is its detailed construction and international-edge treatment: the bundle cites GADM/INE and refers to methodology but exposes only names, pcodes and levels, with no feature-specific survey/adoption or source-line mapping. The known HDX page denial remains a genuine obstacle to that particular upstream source record; it was not bypassed.

For the 18 pending cells, the first necessary observation remains the already specified native per-key/per-operand attribution across **all four** negatives: Uige ADM1, Maquela ADM2, Quimbele ADM2 and Pool ADM1. The recovered ADM2 archive does not revive a nonexistent Kwango negative, clear the actual ADM2 operands, or justify repeating an unchanged diagnostic that omits attribution. It narrows the source question to two exact municipality records and their unprovided construction context. No unperformed step is described as exhausted.

`ago-adm2-archive-inspection.json` preserves all 18 exact keys, all four native negatives, the two source DBF records, archive/member hashes, original source descriptors, comparator processing text and acquisition status. The accepted positives and previously accepted unresolved cells remain unchanged.
