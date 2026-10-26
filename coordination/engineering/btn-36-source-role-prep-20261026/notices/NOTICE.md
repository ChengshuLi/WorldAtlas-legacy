# Source, attribution, and license notice

This notice documents provenance and the source terms recorded for geometry-bearing files in this BTN preparation directory. It does not certify geometry accuracy, legal authority, acceptance, or credit. The files are research and diagnostic artifacts; the physical-coverage outputs are source-relative comparison products, not legal boundaries or ground truth.

## Administrative source and selected display geometry

The consumed simplified administrative source is **geoBoundaries gbOpen, Bhutan ADM1, reference year 2010**, recorded under the Creative Commons Attribution 3.0 License (CC BY 3.0). Source URL recorded in the original geography source corpus:

- Simplified source: <https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BTN/ADM1/geoBoundaries-BTN-ADM1_simplified.geojson>
- Related unsimplified product: <https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BTN/ADM1/geoBoundaries-BTN-ADM1.geojson>
- CC BY 3.0 legal code: <https://creativecommons.org/licenses/by/3.0/legalcode>
- Retained source corpus catalogue: commit `e7aa5c46baa083697b662de51e177c7bf89f9014`, `coordination/engineering/original-geography-source-corpus-20261006/catalogue.json`, SHA-256 `d3da799558be1fcbe7f3ea90ba7033d312a65690984983cb008f2d72e32765f9`.

The recorded simplified payload is 25,128 compressed bytes (SHA-256 `ff328427711ffb6c998389200155fad8df3605cab37fa47181cf16df6ec9e24b`) and 100,517 decoded bytes (SHA-256 `a4e2e3f3267f3990bb918e880ba4e51e639a7fc7af8f7c2ec1489de3e1546351`). The selected WorldAtlas display geometry is derived/modified geometry. Its preparation records describe reconciliation against Natural Earth reference borders followed by finer source geometry and caution that original source boundaries may differ. Natural Earth reference pin: <https://github.com/nvkelso/natural-earth-vector/tree/ca96624a56bd078437bca8184e78163e5039ad19>. The source-relative comparison and display role do not establish a legal boundary. Changes from the source are to be identified as modifications when redistributing under CC BY 3.0.

## Physical coverage source

Physical support polygons derive from the **Global Self-consistent, Hierarchical, High-resolution Geography Database (GSHHG) 2.3.7**, released June 15, 2017, using the high-resolution binary member `gshhs_f.b` from the retained original archive. Recorded original download: <https://www.soest.hawaii.edu/pwessel/gshhg/gshhg-bin-2.3.7.zip>.

- Original archive: 118,617,033 bytes; SHA-256 `28600e8f7a08645aab43079326df6504212ec5ccb2b4bcf3b5f4f12ed60e82bc`.
- `gshhs_f.b`: 95,809,336 bytes; SHA-256 `af9215d58ebc525b2d09654a89959829f09e6edc457f3666759cded37be4ecf6`.
- Retained source commit: `f8f99612e4d83d561b370189a1969c3e4301a1e3`; source catalogue `coordination/engineering/global-physical-sources-20261006/catalogue.json`, SHA-256 `4217ccadad0060ac4b1f150f94bba93af4204c567242cb30c324351cffb1c48a`.

The retained archive's `LICENSE.TXT` states “License (LGPL) version 3 or later.” Its `README.TXT` identifies version 2.3.7 and its history records “v3 or any earlier version.” Both source texts name version 3; this directory includes the exact retained `COPYING.LESSERv3` text. The archived quality record notes that the original 18-member ZIP did not contain `COPYINGv3`, although `LICENSE.TXT` refers to it. The three accompanying `GSHHG-*` files below are byte-for-byte copies from the retained source commit. This notice reports the source wording; it does not add terms to it.

The polygons below are modified/derived source-relative support outputs made from GSHHG input for the recorded comparison. They are not the unmodified GSHHG database, legal boundary claims, or a finding of physical truth. Their producer metadata and the source-relative limitations remain applicable. This notice does not claim CC BY applies to GSHHG.

## Geometry-bearing files in this package

This inventory covers all 17 geometry-bearing JSON files currently identified in the package, including the current-main revalidation copies/configuration. Revalidation source-evidence and constructor outputs embed the same pinned source/display geometry used by the earlier evidence; their inclusion does not represent a new source or geometry analysis. SHA-256 and byte counts below identify the committed file contents. “Administrative/display-derived” rows embed or carry geoBoundaries-derived source geometry and/or selected WorldAtlas display geometry; physical output rows contain derived GSHHG support geometry.

| Repository path | Bytes | SHA-256 | Geometry provenance |
|---|---:|---|---|
| `physical-stage-inputs.json` | 22,277 | `bbb05c31ddf905af3146e42a3c8390126c7b70d7c18b06c88d1893e0f617a88c` | Administrative source and selected display geometry; two physical targets |
| `physical-stage-inputs-full-9.json` | 89,368 | `81ed11c36c6077d554167248420f69d7131dadc8d21a08b34b5d5ebb51b69eb1` | Administrative source and selected display geometry; nine original targets |
| `physical-stage-inputs-remaining-7.json` | 67,093 | `aa8e67a905402f393aa5ee6b1d0eed57951f481c07f193a0f6360cfb7a5a422f` | Administrative source and selected display geometry; seven original targets |
| `source-evidence-input-config.json` | 26,179 | `66df51eecd98cceae417fa9835efa839b56d2ead2c2e8fe0bd38a3209dd2bfe6` | Embedded administrative source geometry |
| `source-evidence-input-config-full-9.json` | 89,879 | `0b7524ad5a006a7edced1ded5ffd36e7dd131ae5fd7380097652c4435a45432a` | Embedded administrative source geometry |
| `source-evidence-001/source-evidence.json` | 10,317 | `0d7080ff15b489269ba9faecda03993f930da14832bca32d727273975f34212a` | Embedded administrative source geometry |
| `source-evidence-002-full-9/source-evidence.json` | 27,097 | `517f92c0078bb350603456f2a27208def8b7a09619f62bd77c8de52e97bcb1a6` | Embedded administrative source geometry |
| `supported-inputs-001-full-original/source-evidence.json` | 10,314 | `a5ee07fd7ab0380c03d6b936332f81f5fede845289a7fcd0d257b10c09afdd60` | Embedded administrative source geometry |
| `supported-inputs-002-current-bank/source-evidence.json` | 10,314 | `a5ee07fd7ab0380c03d6b936332f81f5fede845289a7fcd0d257b10c09afdd60` | Embedded administrative source geometry |
| `native-authority-001-candidate-36/constructor-result.json` | 7,657 | `25af19c01c037d5466c87252cc01744910358328c1fde6e2a7b30682c5750c86` | Embedded administrative source geometry |
| `physical-run-001/whole-target-support.json` | 26,307 | `3ab0faeb5d5c6bf1baead2a7674f56a0522532fed9409292439db530f80d7169` | Derived GSHHG support polygons; two targets, four outputs each |
| `physical-run-002-remaining-7/whole-target-support.json` | 53,443 | `b5b36c03bc8fa542de9ac25e455ff11d594dff9ba7f2489dcad8c98bc3209342` | Derived GSHHG support polygons; seven targets, four outputs each |
| `physical-evidence-aggregate.json` | 67,926 | `a2ea7b237772256b614aa58ba03688edd5b7cb710b0292c93c33f5958247749b` | Aggregate of the two GSHHG-derived physical runs |
| `bridge-revalidation-source-evidence-config.json` | 89,879 | `3ca2ed3d426b623037734841f6059980ef79757f3591222661316eaae59e5ecd` | Embedded administrative/display source geometry; nine original targets, retaining the geoBoundaries 2010 source lineage and CC BY 3.0 notice above |
| `bridge-revalidation-source-evidence-001/source-evidence.json` | 27,097 | `517f92c0078bb350603456f2a27208def8b7a09619f62bd77c8de52e97bcb1a6` | Embedded administrative/display source geometry; nine original targets, byte-identical to the listed full-nine source-evidence product |
| `bridge-revalidation-supported-inputs-001/source-evidence.json` | 10,314 | `a5ee07fd7ab0380c03d6b936332f81f5fede845289a7fcd0d257b10c09afdd60` | Embedded administrative/display source geometry; two candidate targets, byte-identical to the listed supported-input source-evidence product |
| `bridge-revalidation-native-authority-001/constructor-result.json` | 7,670 | `fe200cd6cece59a9c31eb213724d3dd7a6a89cc3ef331eb08f55c679c80f71e2` | Constructor output embeds the same two pinned administrative/display target geometries; source lineage and limits are as described above |

Paths in the table are relative to `coordination/engineering/btn-36-source-role-prep-20261026/`. The source geometry may be separately licensed by its provider; this notice does not change upstream terms. No status, credit, or acceptance is implied by inclusion of these artifacts.
