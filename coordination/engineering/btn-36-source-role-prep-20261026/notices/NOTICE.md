# Source, attribution, and license notice

This notice covers the supported-input preparation outputs in this directory. It records provenance and source terms; it does not certify geometry accuracy, legal authority, acceptance, or credit.

## Administrative source geometry

The geometry-bearing outputs listed below contain the same two `base_geometry` features from the simplified geoBoundaries gbOpen Bhutan ADM1 product. The source corpus records reference year 2010 and the item-specific license as Creative Commons Attribution 3.0 (CC BY 3.0). It records the source as “geoBoundaries, Wikimedia Commons; credit to author ‘Babbage’,” with `commons.wikimedia.org/wiki/File` as the license source; the exact individual Wikimedia file page is not recorded in the retained metadata.

- Simplified source: https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BTN/ADM1/geoBoundaries-BTN-ADM1_simplified.geojson
- geoBoundaries project: https://www.geoboundaries.org/
- CC BY 3.0 legal code: https://creativecommons.org/licenses/by/3.0/legalcode
- Retained source-corpus catalogue: commit `e7aa5c46baa083697b662de51e177c7bf89f9014`, `coordination/engineering/original-geography-source-corpus-20261006/catalogue.json`, SHA-256 `d3da799558be1fcbe7f3ea90ba7033d312a65690984983cb008f2d72e32765f9`.
- Recorded source payload: 25,128 compressed bytes (SHA-256 `ff328427711ffb6c998389200155fad8df3605cab37fa47181cf16df6ec9e24b`); 100,517 decoded bytes (SHA-256 `a4e2e3f3267f3990bb918e880ba4e51e639a7fc7af8f7c2ec1489de3e1546351`).

The output is a selected, serialized subset of two source features, not the complete original source product. Preserve the attribution and identify modifications when redistributing. The evidence and source-relative physical comparison do not establish a legal boundary.

## Physical-evidence reference

The source-evidence output includes a locator to the separately committed physical-evidence aggregate at commit `af6230b014eaf647f7c811fdf4609cea8b3ad7fc`, path `coordination/engineering/btn-36-source-role-prep-20261026/physical-evidence-aggregate.json`, SHA-256 `a2ea7b237772256b614aa58ba03688edd5b7cb710b0292c93c33f5958247749b`. The aggregate records GSHHG 2.3.7 as the source for its derived physical-support products; the retained archive documentation states LGPL version 3 or later, with the README history also recording “v3 or any earlier version.” These terms are separate from the geoBoundaries CC BY terms. The current supported-input artifacts do not embed GSHHG geometry. The aggregate is a source-relative comparison, not a legal boundary, ground truth, or acceptance.

The accompanying GSHHG license/readme files are byte-for-byte retained source texts; they are included to preserve the terms for the referenced physical evidence.

## Geometry-bearing file in this preparation

| Repository path | Bytes | SHA-256 | Contents |
|---|---:|---|---|
| `supported-inputs-current-main-f8c5-001/source-evidence.json` | 10,314 | `a5ee07fd7ab0380c03d6b936332f81f5fede845289a7fcd0d257b10c09afdd60` | Two embedded geoBoundaries-derived base geometries |
| `supported-inputs-current-4828-001/source-evidence.json` | 10,314 | `a5ee07fd7ab0380c03d6b936332f81f5fede845289a7fcd0d257b10c09afdd60` | Same two embedded geoBoundaries-derived base geometries; byte-identical to prior source-evidence body, with current selector binding recorded in its preparation receipt |
| `native-authority-current-4810-001/constructor-result.json` | 7,667 | `1928930134b789fa7d659298ae82908c052986ed88324976e17144058edf5dc7` | Two constructor rows embed the same geoBoundaries-derived base geometries; output is native-authority construction evidence, not a legal boundary or acceptance |

No status, credit, source-year acceptance, or legal-boundary claim is implied by these artifacts.
