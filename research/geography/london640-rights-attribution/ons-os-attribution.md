# GBR London 640: source-rights and attribution facts

Scope: this source-free memo records the exact ONS 2019 BFE item’s published rights statements and the project’s retained acquisition metadata. It does not modify the owner-13 candidate, make a legal determination, or claim permission/prohibition beyond the cited terms.

## Product-specific record

The official Open Geography Portal item is [Local Authority Districts (December 2019) Boundaries UK BFE](https://open-geography-portalx-ons.hub.arcgis.com/datasets/ons::local-authority-districts-december-2019-boundaries-uk-bfe-2), corresponding to ArcGIS item `3f6feb4ae1dc467ba238029217329540`. The portal landing page resolves but returned no readable page text in this lookup. The [official data.gov.uk listing](https://www.data.gov.uk/dataset/687c7e75-e4f5-494f-a837-1d1a9ec45bdf/local-authority-districts-december-2019-boundaries-uk-bfe1) identifies the same item as full-resolution boundaries at 31 December 2019, says “Contains both Ordnance Survey and ONS Intellectual Property Rights,” and reports `Licence: Not set`. Its Harvest GUID is the exact ArcGIS item above.

Retained ArcGIS item JSON: `/tmp/gbr28-official-current-20261026/item.json`, 5,119 bytes, SHA-256 `b3db0c04c9da156ac4d542c88d43149aadd41e1954f78a85b91f67df24d992d9`. Its `licenseInfo` links only the general ONS licences page; its description repeats the dual- IPR statement. Retained item metadata XML: `/tmp/gbr28-official-current-20261026/item-metadata.xml`, 17,122 bytes, SHA-256 `a41c49b178a05c4eb59780155d3c6073dd3ec79d9a5d035f881682bbe5696c19`; it records edition `24/07/2020: Original` and metadata date stamp `2017-10-09`, but no OS data class, applicable OS licence, OS copyright year, or project supply date. The retained service-layer metadata `/tmp/gbr28-official-current-20261026/ons-layer.json` (13,461 bytes; SHA-256 `ed9b0b1494db0713794449321e34d8ff07bd975e88280d797e41456e03d2ae85`) has empty `copyrightText`.

The retained project provenance receipt is `coordination/engineering/uk-native-repair-20261017/private-ons-london640/source-provenance.json` at commit `24e371af8d58934937d1570499badce5744ff200`, blob `09278c3a058812f09e9ccd268985f9279bc97e88`; 3,804 bytes, SHA-256 `055ca962d41458e60950e2d7c066511467c1045f7cf886c0ce809059ee0473f8`. It binds the item ID/title, represented boundary date `2019-12-31`, edition `24/07/2020: Original`, and response/collection pins. It records `receipt_date: null` and `os_license_and_copyright_year_unresolved: true`.

## Published terms

ONS’s [geography licences notice](https://www.ons.gov.uk/methodology/geography/licences) says digital boundary products are supplied under the Open Government Licence and requires these statements when the material is reproduced or used:

- `Source: Office for National Statistics licensed under the Open Government Licence v.3.0`
- `Contains OS data © Crown copyright and database right [year]`

The notice also says ONS products can include other organisations’ IPR and that the appropriate third-party rights and attribution apply. It does not identify the OS product class or assign the placeholder year for this BFE item.

OS’s [copyright acknowledgment guidance](https://www.ordnancesurvey.co.uk/customers/public-sector/public-sector-licensing/copyright-acknowledgments) is expressly for PSGA members and distinguishes OS OpenData from other OS data: OpenData uses OGL; where that acknowledgment is inapplicable, the stated form includes the member’s year and licence number. The retained evidence does not establish this project’s PSGA membership or OS licence route, so that member-specific guidance’s applicability here is unestablished. OS’s [co-branding guidelines](https://www.ordnancesurvey.co.uk/documents/OS-Co-BrandingGuidelines-Accessible-PSGA.pdf), page 4, say the year in OS copyright statements is the year the digital data was received (or publication date for paper/printed products), and say the licence number is found in the contract or invoices. These materials do not classify the BFE item as OS OpenData or provide this project’s receipt year/licence number.

## Separate scientific evidence and remaining rights fact

The separately retained scientific application receipt reports all 640 owner-13 keys uniquely interior to six ONS 2019 borough features, with City of London at zero contacts; the later native physical-center result reports 640 land and zero water, outside, ties, or ambiguous cases. Those geometry/native results address the exact candidate’s scientific predicates. They do not establish the OS product class, applicable OS licence, or attribution year.

The precise unresolved facts are the OS data class/licensing terms applicable to the embedded OS component in this BFE product, and—if the required ONS notice is used—the project’s actual year of receipt/supply of the digital data. Neither the represented boundary date nor the 2020 edition/publication date is evidence of that receipt year. This memo therefore records no OS permission or prohibition and does not supply a guessed year.
