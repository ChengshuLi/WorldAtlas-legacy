# WSM pinned sourceData lineage inspection

Bounded inspection of the exact geoBoundaries WSM ADM1 sourceData object at release commit `9469f09592ced973a3448cf66b6100b741b64c0d`; no catalog-wide search or geometry/overlay replay was performed.

## Pinned retrieval and custody

The release tree names `sourceData/gbOpen/WSM_ADM1.zip` as Git blob `49bd579a44b2c86d6a92fa5120af49cdf4b0829b` (131-byte LFS pointer). The pointer resolves to LFS SHA-256 `1bbb5198290e9eedfea1ceeed42b886e40499ce73216c4ecc6743a3077bf14e2`, size 189,680 bytes. The exact media URL returned HTTP 200; retrieved `/tmp/wsm-sourceData-lfs.zip` is 189,680 bytes with that exact SHA-256. ZIP integrity test passed. The separate ADM1 `all.zip` archive is a different object (`f311872955847d87a232f5fe3a4041dd6d9fe59b`, 560,450 bytes; SHA-256 `b9a265742e2ff37a22db69a44efa8d3248a54c64fd0de9d3ff6c921a87cede1c`) and was not treated as sourceData.

The sourceData ZIP contains exactly seven files:

| Member | Bytes | SHA-256 |
|---|---:|---|
| `WSM_ADM1.cpg` | 5 | `3ad3031f5503a4404af825262ee8232cc04d4ea6683d42c5dd0a2f2a27ac9824` |
| `WSM_ADM1.dbf` | 3,453 | `6bb4ddcffa5f5fa170c43cc63a93ed4738e29c6fa11e4db12867fda8586df0e7` |
| `WSM_ADM1.prj` | 143 | `98aaf3d1c0ecadf1a424a4536de261c3daf4e373697cb86c40c43b989daf52eb` |
| `WSM_ADM1.qpj` | 257 | `1de411dcdeedce3219242306fc29bfa1d7fa08883e4ff6779baf798ec50d1657` |
| `WSM_ADM1.shp` | 257,680 | `184201c7a156ad5688bc0165d7edd17d19e8d891b6a7a2ca8f73167bd6d238e0` |
| `WSM_ADM1.shx` | 188 | `3474478076fbbc61765cfec6ef835dc995c4f04a933e5bb7371eaf477e39ebc8` |
| `meta.txt` | 449 | `6b3f0addc15a0789dd09a4d2b835ac12f4d8441dbc1548361282258bc6e9da7d` |

`WSM_ADM1.prj` identifies WGS 84 geographic coordinates (the `.qpj` specifies EPSG:4326); `.cpg` says UTF-8. No extra lineage sidecar is present.

## Identified source asset

`meta.txt` identifies source 1 as Wikipedia, source 2 as `nan`, representative year 2018, release `gbOpen`, and CC BY-SA 3.0 Unported. `License Notes` is `nan`. Unlike the older generic catalog entry, both “License Source” and “Link to Source Data” identify the exact page `https://en.wikipedia.org/wiki/File:Samoa_District_borders_(numbered).png`.

The exact English Wikipedia image API response (retrieved 2026-10-26) identifies title `File:Samoa District borders (numbered).png`, file timestamp `2011-06-22T13:06:20Z`, uploader `Jon Harald Søby`, file SHA-1 `505188e10ab4a77566504d254324c5f6b013925a`, and API-reported dimensions 2000 × 935 / 99,415 bytes. The exact Commons file page reports current page revision `1136141864` (2025-12-24T20:48:36Z; page metadata revision, not the 2011 image timestamp). The exact image download was 99,415 bytes and SHA-1 matched; SHA-256 `b2e2e72ce05c4a65962d00ccdd343417b4e55933962d0ac4925d623b2bda7ac7`.

The Commons metadata declares CC BY-SA 3.0 (`LicenseShortName=CC BY-SA 3.0`, `License=cc-by-sa-3.0`, attribution required). Its artist field identifies a derivative by MichaelBillington based on Golbez; the credit field names `Samoa_districts_numbered.png` and `Samoa_districts_numbered2.png`. Original date is 2011-04-19. The image description calls it “Districts of Samoa” and says the higher-resolution version has more accurate district borders based on constituencies contained in districts. The displayed raster is a numbered map (labels 1–11) of Samoa's district areas. This is evidence for the source role and attribution chain; it is not a legal instrument or georeferenced boundary crosswalk.

The geoBoundaries `CITATION-AND-USE-geoBoundaries.txt` inside the separate `all.zip` (4,316 bytes, SHA-256 `f6ea7572bea6036c4cdcacf8c0ca7bf09098d4e600d19546d7432533e9a290d5`) separately states CC BY 4.0 for geoBoundaries code and derivative works and directs users to cite each file's metadata source. It does not replace the file-specific CC BY-SA 3.0 declaration. This inspection records the published terms and attribution but is not a legal opinion or blanket clearance for derived ownership-data redistribution.

## WSM scope implication and remaining predicates

For compact Samoa owner 7134, the newly identified 2011 Samoa district map is a plausible, specifically named source for the 11-unit ADM1 source family; the contract does not require a universal village-Fono/electoral certificate. The 406 keys remain the exact source-center members shared by pinned full and simplified variants; the 63 simplified-only keys remain a distinct adverse/held partition. This sourceData finding does not change those counts or the separate 1,020-cell companion exclusion.

The named map strengthens lineage evidence but does not establish that the geoBoundaries polygons were digitized from that raster without other changes, that their 2018 represented year is a legal/effective date, or that every source feature is the applicable current owner geometry. Ten whole-target physical reconstruction issues remain (seven extra and three missing, including the two dual-issue targets); center disjointness is not whole-target clearance. The separate source-family contacts, physical results, 63 hold, and all no-credit/no-acceptance limits remain in force. No finite-unresolved recommendation based solely on an unidentified source file is supported after this inspection; remaining decisions must be based on the unresolved physical/authority/effective-applicability predicates, not the superseded claim that the source asset is unidentified.
