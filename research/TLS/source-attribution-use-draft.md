# TLS source attribution and use-note draft

**Status:** source-free attribution draft for the original TLS package (562 land keys, 337 intervals, 22 owners; 31 source features in source families 152/327/328). This records the retained metadata and proposed attribution elements. It is not a rights clearance, source-authority finding, or approval to change the package disposition.

## Sources and retained pins

### Fine source: TLS ADM2

The original retained product is `gb:TLS:ADM2`, boundary ID `TLS-ADM2-22284137`, canonical type “Administrative Posts.” The metadata claims represented year **2020**, 65 units/features, and names **WHO, OCHA ROAP** as source. The consumed locator is the geoBoundaries `gbOpen/TLS/ADM2/geoBoundaries-TLS-ADM2_simplified.geojson` file at upstream commit `9469f09`:

- URL: <https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/TLS/ADM2/geoBoundaries-TLS-ADM2_simplified.geojson>
- Retained corpus member: `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-TLS-ADM2-000.bin.gz`, 93,000 bytes, SHA-256 `0eafd96d14eb2084456da395b2acfcce26ee3a5a7a2e5cb3c2a7c9235f726359`.
- Decoded original payload: 335,036 bytes, SHA-256 `84106c050c23cb5cedee5f4bc4823c3d3bfcd2400754c67ba4244c6b4c347177`.
- Retained source sidecar: `coordination/engineering/indonesia-adm2-current-cell-20261014/remaining474-source-refinement-001/sources/full/geoBoundaries-TLS-ADM2-metaData.json`, 936 bytes, SHA-256 `fb8fa64988e99f1446cf3c26342941e73db5d25e1273f16c73d17e2a176bad30`.

The sidecar and original registry metadata record **CC BY 3.0 IGO**. `licenseDetail` is empty in the sidecar (`nan` in the registry). Its `licenseSource` and `boundarySourceURL` are recorded literally as `https//data.humdata.org/dataset/timor-leste-administrative-boundaries-levels-0-3` (the scheme separator is malformed); do not silently repair that stored value. The corpus catalog separately preserves the valid geoBoundaries consumed-file URL above.

The retained TLS comparison record also pins a full, unsimplified comparator: `coordination/engineering/indonesia-adm2-current-cell-20261014/remaining474-source-refinement-001/sources/full/geoBoundaries-TLS-ADM2.geojson.gz`, 1,413,120 bytes, SHA-256 `cb3ed8d51124be156295d92fe6abf3517afc4ee338fd8dbae20d24758633457f`. The source-session record describes its uncompressed worker input as 5,303,288 bytes, SHA-256 `a437e47041dcc708e55a76ede2b5db3beec31da3521fbd2a847bf372e1662911`. Keep this comparator distinct from the consumed simplified original; do not call it the original consumed asset.

### Separate coarse comparator: TLS ADM1

`gb:TLS:ADM1` is separately recorded as “Municipalities,” represented-year claim **2017**, 13 features, source **OpenStreetMap, Wambacher**, and **Open Data Commons Open Database License 1.0 (ODbL 1.0)**. It is coarse contextual/comparator material, not a substitute for the fine ADM2 source.

- Consumed locator: <https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/TLS/ADM1/geoBoundaries-TLS-ADM1_simplified.geojson>
- Retained compressed corpus member: `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-TLS-ADM1-000.bin.gz`, 14,233 bytes, SHA-256 `a4a0436700d416affa9ca45251047d2c3144493c7f74f728caff5e6ad46f1460`.
- Decoded payload: 49,457 bytes, SHA-256 `4d5aa62fe474123b5592e9f09aa119aefde6a004dca05ad1a3b1f20dddf21de1`.
- Recorded license source: `www.openstreetmap.org/copyright`; recorded boundary source URL: `wambachers-osm.website/boundaries/`. Both are stored without an `https://` scheme in the metadata.

The 562-key contact matrix actually uses both ADM1 comparator families: TLS ADM1 contacts cover 511 keys and IDN ADM1 East Nusa Tenggara contacts cover 14 keys. Any published source-contact matrix, source-evidence record, or proposal that carries those derived contact findings must attribute both comparator families as well as TLS ADM2. This is not a claim that all three families have identical terms or source roles.

### Foreign comparator: Indonesia ADM1

`gb:IDN:ADM1` is recorded as a 34-feature, represented-year-claim **2017** product derived from OpenStreetMap / Wambacher under **ODbL 1.0**. The exact whole decoded source is 3,397,843 bytes, SHA-256 `5a6be3d1484166132751fe535dd164e1491e657f2d38dced177f067a7bc00d8f`. Its retained compressed corpus member is `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-IDN-ADM1-000.bin.gz` at the frozen main tree; Git blob `bc32eef256449c5e2ccd671425463fb67c485559`, 1,057,546 bytes, compressed SHA-256 `0e8d4aece3a6467af68d9dcb2674697e7153b6109192ce44e5c268d68cdf37c7`. The URL and underlying OSM/Wambacher identity are recorded in the source metadata; source authority and effective applicability remain unverified. This family contributes the retained East Nusa Tenggara contact on 14 exact package keys.

## Attribution elements for any eventual output

The retained geoBoundaries citation file, `coordination/engineering/original-geography-source-corpus-20261006/CITATION-AND-USE-geoBoundaries-original.txt` (4,316 bytes; SHA-256 `f6ea7572bea6036c4cdcacf8c0ca7bf09098d4e600d19546d7432533e9a290d5`), says to name and link **geoBoundaries**, cite the source listed in each file’s metadata, and gives this academic citation: Runfola D et al. (2020), “geoBoundaries: A global database of political administrative boundaries,” *PLOS ONE* 15(4): e0231866, <https://doi.org/10.1371/journal.pone.0231866>. The file states that geoBoundaries code and derivative works are released under **CC BY 4.0** and attribution is required.

For an output derived from the fine TLS ADM2 product, carry, at minimum:

1. “Source: geoBoundaries, `gb:TLS:ADM2` / `TLS-ADM2-22284137`; represented-year claim 2020; underlying source named in metadata: WHO and OCHA ROAP.”
2. The recorded underlying license **CC BY 3.0 IGO**, with the dataset citation/URL once its malformed metadata locator is independently resolved; until then preserve and disclose the exact stored `https//…` string rather than silently correcting it.
3. geoBoundaries attribution with link to <https://www.geoboundaries.org>, the academic citation above where appropriate, and a description that the output was derived from the retained simplified boundary product (plus any actual transformation performed by the package).
4. Preserve the license distinction: source metadata says CC BY 3.0 IGO; the geoBoundaries citation says its generated code/derivative works are CC BY 4.0. This note does not determine which terms govern a particular redistributed output or resolve compatibility.

Because this package's retained contact evidence uses both ADM1 comparator families, carry their separate OSM/Wambacher/ODbL 1.0 notices and source links with any published derivative contact analysis. The source-corpus `individual-source-attribution.json` records those source-level terms; its `status: redistributable` field is a retained catalog entry, not an independent legal determination for this package.

### Whole-target physical diagnostic input

The whole-target physical diagnostic completed after this attribution draft was first prepared. Its accepted physical inputs include the retained GSHHG shoreline/source-member set, and its output includes source-relative derived support. NOAA NCEI's [Shoreline / Coastline Resources notice](https://www.ngdc.noaa.gov/mgg/shorelines/shorelines.html) describes GSHHG as assembled from World Vector Shorelines and CIA World Data Bank II, credits Paul Wessel (SOEST, University of Hawaiʻi) and Walter H. F. Smith (NOAA Laboratory for Satellite Altimetry), and states that GSHHG is released under the GNU Lesser General Public License. The page asks users to notify the developers if the GSHHG dataset itself is changed for commercial use.

For the retained physical evidence, preserve an attribution to GSHHG and both developers, identify the exact accepted physical input pins and the diagnostic transformation, and link the GNU LGPL notice. The output includes derived support geometry in all 22 target results and intersection-witness geometry in 9 of 23 relations, so those geometry-bearing rows require review as derived evidence before later public distribution. The upstream archive itself was not repackaged or modified, and this task did not undertake commercial use. The current sparse checkout lacks the original archive and byte-identifiable `LICENSE.TXT`, README, and `COPYINGv3` bodies. A retained `build_manifest.py` summary says that the archive `LICENSE.TXT` states “LGPLv3 or later” while its README states “v3 or earlier,” and records the original `COPYINGv3` as absent; the original bodies and hashes are unavailable here, so this is not a fresh byte-level license review. NOAA NCEI’s public page names GNU LGPL without a version. Do not assert a specific LGPL version or legal clearance from these records alone. If the physical output is later published, include the exact config, program/runtime receipt, input pins and applicable source notices, while retaining the TLS ADM2, geoBoundaries and OSM comparator notices described above.

## Provenance and limits

The exact source and metadata pins are in `coordination/engineering/original-geography-source-corpus-20261006/catalogue.json` and `individual-source-attribution.json`; retrieval observations are in `progress.json` under `archived_auxiliary_receipts/transport-provenance.json`. The TLS ADM2 row records a successful HTTP 200 from the geoBoundaries media URL on 2026-10-06, with matching 335,036-byte body SHA. That is a historical acquisition observation, not an effective-date claim or proof of current endpoint availability.

The retained corpus documentation says its task was byte custody: the represented year, license strings, source authority, effective applicability, political interpretation, and water/land interpretation remain source claims or unverified. The separate TLS source-session record is `coordination/engineering/indonesia-source-choice46-20261016/repairTLS2-retained-evidence-verification.json`; it preserves the TLS ADM1 and ADM2 source metadata and explicitly says neither proves country jurisdiction. This draft does not validate boundary authority, update the original data, or establish license clearance. No source-specific access denial is recorded in the inspected custody materials.

## Exact supporting record pins

Inspected in the task-owned worktree at the package’s current branch:

- `catalogue.json`: SHA-256 `d3da799558be1fcbe7f3ea90ba7033d312a65690984983cb008f2d72e32765f9`.
- `progress.json`: SHA-256 `44c969086073c44b892f4651cf6ab272ef57814d5e025118b7cf9c912b0be176`.
- `individual-source-attribution.json`: SHA-256 `7d8a3baf61f32e6e4398f24bec0d15bce32eafcd4309655edc2b12a2c33256bd`.
- `CITATION-AND-USE-geoBoundaries-original.txt`: SHA-256 `f6ea7572bea6036c4cdcacf8c0ca7bf09098d4e600d19546d7432533e9a290d5`.
- `repairTLS2-retained-evidence-verification.json`: SHA-256 `387a9783289bb0ca6fe459d578b8c7f854df473bcbb8162fdaaf8549d652a72c`.

The corpus reproduction documentation specifies concatenating decoded fragments in catalog order and checking whole-body hashes; it forbids JSON reserialization as a substitute. This attribution draft does not reproduce any geometry or change any scientific result.
