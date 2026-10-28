# London640 source and attribution closure

This packet carries the exact source-native artifacts directly read by the accepted London640 authority validator, with the original Git blob bytes unchanged. It is an evidence/provenance packet; it does not itself claim scientific qualification, selected-bank acceptance, or a public data release decision.

## Product and dates

Source product: Office for National Statistics, **Local Authority Districts (December 2019) Boundaries UK BFE**, item `3f6feb4ae1dc467ba238029217329540`. The product metadata records represented boundary date `2019-12-31` and edition `24/07/2020: Original`. The retained acquisition record has no receipt date. The attribution year `2020` below is used as the product's published/edition year under OGL copyright-notice guidance; it is not asserted as a supply date, survey date, or receipt date.

The ONS digital-boundary product terms state that digital boundary products are supplied under the Open Government Licence and require these acknowledgments:

> Source: Office for National Statistics licensed under the Open Government Licence v.3.0
>
> Contains OS data © Crown copyright and database right 2020

Official product listing: <https://www.data.gov.uk/dataset/687c7e75-e4f5-494f-a837-1d1a9ec45bdf/local-authority-districts-december-2019-boundaries-uk-bfe1> (the listing says “Licence: Not set” and records both OS and ONS IPR). The retained ONS item XML records OGL v3.0 and the edition above. ONS licence terms: <https://www.ons.gov.uk/methodology/geography/licences>. OGL v3 text: <https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>. OGL copyright-notice guidance: <https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/open-government-licence/copyright-notices-attribution-statements/>.

The item metadata does not state a separate OS licence class, licence number, or supply year. This packet uses the ONS digital-boundary OGL terms and their required OS acknowledgment; it does not infer a separate OS supply event. No PSGA membership or member-only terms are asserted.

## Exact validator inputs

The following original files are copied byte-for-byte at the exact paths consumed by the current authority validator. Source commits and blob identities identify their retained originals; SHA-256 values identify the complete file bytes.

| Path | Original commit | Git blob | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `coordination/engineering/uk-native-repair-20261017/private-ons-london640/authority-56f/original-rule-preimage.json` | `1b4253007d8e65a305a652491099c87223078816` | `77d1da74c31053bb73dbf262cbbe14e06e1e321f` | 750 | `c02582b3699dcc13bb4b7caee44c2d648550a5d17d88304c8dbf62154df381bb` |
| `coordination/engineering/uk-native-repair-20261017/private-ons-london640/authority-56f/authority-binding.json` | `1b4253007d8e65a305a652491099c87223078816` | `9d8c5abf7219acfec07ff6387496aa96f82b0949` | 753 | `0524c48b1a4fec370e5794c00d050544862229033a82c04ada64e6bd7ff17da6` |
| `coordination/engineering/uk-native-repair-20261017/private-ons-london640/authority-56f/constructor-result.json` | `1b4253007d8e65a305a652491099c87223078816` | `180f43efa7beded54d40c71e44f9f2e1a5d3f27a` | 5,637 | `4cea75ab52daa721aabefa85019b46ba81cad54b0b5dc8d499cb33fcb129401c` |
| `coordination/engineering/uk-native-repair-20261017/private-ons-london640/native-patch-640.json` | `9523110424b125dab4db8ac41e175f4c63321be4` | `f6a2c1ede6b5b65e5f5f728d1dd01cfcc152fbe9` | 2,411 | `a1391db88171d0855082bafc08015bef10d24cb5693de2184755b0d6a6af06ab` |
| `coordination/engineering/uk-native-repair-20261017/private-ons-london640/source-evidence-candidate-context-only.json` | `9523110424b125dab4db8ac41e175f4c63321be4` | `deed2b8bb9bc4ba5dce6931c6133042969f8c30e` | 70,743 | `b703ae407d9f62e12bad7f7a7a13c585f5009f8ed246ec596d332b353f0a1cca` |

The exact validator dereferences these five files, totaling 80,294 bytes, in addition to the already committed authority registry. The 70,743-byte source-evidence JSON and 5,637-byte constructor result contain embedded boundary geometry/coordinate data; these exact retained artifacts are included as the source-native validator inputs under the ONS digital-boundary OGL route and the acknowledgments above. The source-evidence JSON also retains a locator for the original ONS feature collection, but that collection is not copied here because the current accepted validator does not dereference that nested locator. No raw source ZIP or full GeoJSON feature collection is included in this packet.

## Derivation and limits

The source-evidence and native-patch files are retained original artifacts; their bytes and geometry/cell contents are not rewritten in this packet. The constructor/preimage/binding are also unchanged originals. This packet records the source attribution and makes the exact validator inputs available in the candidate tree. It does not claim the evidence proves legal boundary authority, does not resolve the 28 separately held keys, and does not convert a completed local finalization into scientific acceptance. Hosted validation and independent review remain separate controls.
