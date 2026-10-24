# Songololo 25 / Zaire: retained feature lineage

2026-10-24. Native child `01a16f2d-8ad8-7352-a1b0-11757b3e40e7`. All 25 owner-14467 keys remain held, with no acceptance or new geography credit. This pass reads retained source attributes and processing history; no geometry test, producer, build, native observation or Git mutation ran.

The official 2019 Census archive establishes a named-feature relationship to native Zaire, but does **not** establish unchanged geometry or sourceData byte identity for Zaire. The native feature's `shapeName=Zaire`, `shapeISO=AO-ZAI`, and the Census feature's `ADM1_NAME=ZAIRE`, `GENC_CODE=AO-ZAI` agree. The original native negative remains a simplified geoBoundaries operand, and its source lineage must not be cleared by the shared name/code.

## Exact retained identities

- Scope is the 25 exact keys in `residual_land_west/songololo25-source-assessment.json`, 82708 bytes, SHA-256 `277833cdd068af19e85b1786becf950e260168c7dc0f327e41eba01cdad874a0`. Target is owner 14467, `gb:COD:ADM2:63176286B29097498682851`.
- Native Zaire is `gb:AGO:ADM1:26408823B68708736810578`, whole-family zero-based feature ordinal 17, target negative ordinal 1. Consumed geometry SHA-256 is `873b52d6e777675277b48e05d1189036804cb13a3ee6a9dad0179ff24c12ec41`.
- I read the exact original family blob `1206ddaf2ff1c1a4b40db92ddfe79bccfb0f0ce8`: compressed 179282 bytes, SHA-256 `a54aaaf45c85240aba8b99cf98126350cc070306e6da12b746259168e6a6ee71`; decoded 574816 bytes, SHA-256 `71796d87bc112f7969b92ca4c8beb2fa60a4e0a37c3a5e7801ee51a3e7e58c76`. Feature 17 properties are Zaire, AO-ZAI, shapeID 26408823B68708736810578, AGO, ADM1.
- Original `data/administrative-sources.json`, blob `2747b845f0c5654765da3b951c9074e52f220077`, identifies the AGO ADM1 source as USCB, represented year 2021, Public Domain, 18 provinces; it binds the above decoded hash and points to geoBoundaries release `9469f09` simplified output. The 2023 update/build timestamps are not the source observation year.
- Retained official archive `angola-adm1-adm2-uscb-oct19.zip`: 6042844 bytes, SHA-256 `c700d2f72d3c32dda77a89308930443eadd79005d5cb32d674ee681dadabe4af`. No new download occurred.
- `Angola_adm1_uscb_2019.dbf`: 19214 bytes, SHA-256 `bce05ba856545371b89a6841db48389c2ffb85fb3232557efee6c3305ddbcb71`. Zaire is DBF record 17 / OBJECTID 18, AREA_NAME and ADM1_NAME ZAIRE, GEO_CONCAT ANGOLA_ZAIRE, GEO_MATCH AGO_02, GENC_CODE AO-ZAI, FIPS_CODE AO16. The same ordinal alone is not an identity proof.
- `Angola_adm1_uscb_2019.shp.xml`: 24229 bytes, SHA-256 `7b256bc2288267557449c5eab5be0aa78f8c887934d26afc0c7780be388c37e1`.

## What the official processing history establishes

The XML credits HDX archive `ago_admbnda_adm2_gadm_ine_ocha_20180904.zip`, accessed 2019-09-09. Its supplemental information describes a sequence: start with 161 ADM2 polygons; split Chitato to accommodate Lovua in Lunda Norte; align the shapefile's boundaries to the State Department's 2018 LSIB polygon file; dissolve the aligned shapes into 18 ADM1 provinces. Its credits explicitly disclaim guaranteed boundary-placement accuracy. The DBF's Zaire row contains no feature-specific lineage or local border adjudication field.

This is substantive evidence that the 2019 comparator is a processed boundary product. It does not say whether the particular Songololo/Zaire segment changed during alignment, nor does the Lunda Norte district edit imply a Zaire edit. No segment-specific shift or cell effect is inferred.

The previously retained Uige crosscheck records that release `9469f09/sourceData/gbOpen/AGO_ADM1.zip` (1269371 bytes, SHA-256 `28a8197080eec7270453478bef6fc403e20b455de61a1e04830caafabd302d77`) contains processing history naming the 2019 Census shapefile. It also records byte-identical ordered coordinates for **Uige** between sourceData and official 2019 Census. That is a useful family-level lead, and a specific Uige result; it does not establish Zaire sourceData coordinates or the relation of simplified Zaire to the 2019 feature. The prior Lunda Norte comparison is similarly not transferred to Zaire.

## Remaining bounded step and limitations

The concrete missing source step is a retained or lawfully recovered exact release sourceData Zaire feature record and its relation to the official 2019 Zaire feature, plus the retained full-to-simplified representation relation if needed. No Zaire-specific crosswalk was found in the supplied Songololo packet or the inspected local Uige review/lineage directories. This is a bounded absence finding, not an assertion about all storage.

The inherited restricted raw archive request remains blocked; it was not retried or routed around. The archive is unread here, not proven absent. Its recorded SHA is prior retained evidence, not a newly verified archive byte stream. The HDX source-page HTTP 403 remains preserved. A supported existing Library/archive transfer, if available and authorized through the ordinary workflow, could supply the missing exact object without repeating geometry observations.

The target has five actual native negatives: Uige, Zaire, and three AGO ADM2 features. This lineage pass does not attribute the 25 native holds exclusively to Zaire, and does not construct a territorial decision. The prior Jentgen Noqui–Kwango annex obstacle remains separate; this source history cannot substitute for that historical border control.

Machine-readable source excerpts, exact DBF row, native properties and all 25 keys are preserved in `zaire25-lineage-audit.json`. No settlement population data were imported or accepted.
