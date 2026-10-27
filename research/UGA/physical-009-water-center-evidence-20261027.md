# UGA physical-009 water-center evidence

This note records the existing six-key Lake Victoria center application. No source, geometry, physical, native, or candidate run was repeated. It contains no raw polygon geometry. The exact per-key rows are in [`physical-009-water-center-application-20261027.json`](physical-009-water-center-application-20261027.json) (3,048 bytes; SHA-256 `51ae7e07001fdb956aa330e116708c600c7a436d806854e397029f870488ab67`), copied byte-for-byte from the reviewed local application record.

## Result and retained hold

The six Lake Victoria tuples for owner/pixelIndex `43877`, target/source ID `gb:UGA:ADM3:73843447B4000080097508`, are each classified `mapped_inland_water_support` with center relation `interior` under the recorded calculation. The tuples are `(y=131811, x=155628..155630)` and `(y=131812, x=155753..155755)`. They remain held because the separate TZA ADM1 Mara territorial contact is still an exclusion; this center result does not remove or adjudicate that contact. The target's whole-target flags `missing_reconstruction` and `contradictory_land_water_support` remain retained. Together with the separate family-69/COD land hold (owner 43898, feature `gb:UGA:ADM3:73843447B54071323482980`, `(y=128809,x=153507)`), the full original hold partition remains 1 land +6 water =7. No assignment, qualification, acceptance, or credit is asserted.

## Calculation and input pins

The per-key application record pins:

* Physical-009 config: `research/UGA/private/uga-physical-009-20261027/physical-config-009.json`, 66,664 bytes, SHA-256 `5cdd23e5f348c06bf05f174d089d9b53dc28a4487150332c58c2a376ccd91792`, Git blob `478f2f66575e7eebe3796ba63c55e2c3d9e0bdd0`.
* Physical execution receipt: 56,832 bytes, SHA-256 `5844d0d99ef737859d177350b0916c43576a31c131709824f0e0e2fb3f560600`; it binds the whole-target result bytes below and 25 configured inputs.
* Whole-target physical result: 844,915 bytes, SHA-256 `374843ca82fe94bf41f37b65736be2aa056e2a7cb9206337384190af32f8ce85`. This geometry-bearing output is not included in this packet.
* Native row-latitude input: compressed 1,851,757 bytes, SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`; decoded 2,097,328 bytes, SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`.
* Application script: `research/UGA/private/uga-lake-victoria-water-centers-physical-009.py`, SHA-256 `85bfc32205bd94fe96e02b67c8f63afd22a780a041d5d62fad6b765d8bd9441f`.

The recorded method uses exact-rational native longitude ` (360*x + 180 - 180*size) / size ` and the pinned binary64 latitude at `y`; polygon membership uses exact even-odd handling with holes, excludes a point exactly on a segment from interior, and uses no epsilon. The result is a per-center application to the withheld physical-009 support geometry, not a new source/geometry run or a public reproduction of the full physical output.

The source access record identifies geoBoundaries UGA ADM3 as the consumed simplified product; the separately recorded family-338/TZA contact remains negative context for these six keys. This note does not resolve source-item lineage or license questions. See [`effective-context-attribution-20261027.md`](effective-context-attribution-20261027.md) for geoBoundaries credit/citation and retained source-term caveats.
