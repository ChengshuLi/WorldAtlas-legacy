# JOR656 original simplified-source physical application

This is the required separate physical comparison of the original simplified catalogue source product used by the JOR656 source-evidence family. It does not replace the prior full-resolution 2006 geoBoundaries comparison in `physical-input-001` / `physical-001`; the two operands are distinct and both results remain preserved.

## Exact source and execution

- Product: complete pinned original `gb:JOR:ADM2` catalogue product (52 features), encoded 133,556 B / SHA-256 `835c08b7e50fbf131bbd664f3dab4bd740663db771e1245991287be0c7ba8444`, decoded 454,171 B / SHA-256 `a68a61fe1ee44e85560946b961fe4ea4867983e94d98eb85043ef43103cba571`; source payload path `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-JOR-ADM2-000.bin.gz` at commit `e48581f92e523d64376a1b3a057751b764a80424`.
- The exact 16-row physical stage is `physical-input-002/original-source-physical-inputs.json`, 168,213 B / SHA-256 `b5071ceae5627ae2f9d3681339d6cccfcbddcd77b6404ad74cac47edcb82e0e2`, introduced at commit `1657870e210107380d978ed7b008328b8c296510`. It selects only the 16 source members with recorded owner associations and binds their direct canonical selected target geometry; it does not change source identity, clip/simplify geometry, or replace the complete 52-member family. The catalogue path and full-source family pin are recorded in the source-input configuration; source stage joins are identity bindings, not name/geographic crosswalks.
- Producer: `scripts/qualify-source-cohort.py`, SHA-256 `abc801b9a35d20c9f0dfe3bbc9bb2cb7dc107f1758414970d9cde11380574a18` at the resulting current-main-merged commit `8e44066993491563dc069c5df9f0a6674a52b7bf`.
- Exact physical configuration SHA-256 `a9530c004c65d5bbfee420fa35af6254d5d0fe02b393b203a15aaff1766098de`; runtime admission SHA-256 `98b8bb8cca27bd87fce0c4e129ca35792cefeac806e385689c7a88f2131c7d20`; runtime inventory SHA-256 `47137200d94c90dc7383240b611a58fb5e11e897ed504b346ff8a1666569114e`. Runtime: Python 3.12.14, NumPy 2.3.5, Shapely 2.1.2, GEOS 3.13.1.
- Successful attempt-002 ran in 11.96 s, exit 0, with `complete=true`; stdout/stderr/exit records remain in the owner-only `.jor-physical-runtime` path and are individually pinned in `preparation.json`. Attempt-001 is separately preserved: admission omitted three loaded runtime files (`bz2.py`, `lzma.py`, `shutil.py`), failed before creating an output, and is not represented as a result.

## Measured whole-target result

- 16 targets; 38 checked source relations; 18 source metadata receipts. Eleven targets had no reported whole-target issue. Issue incidences were: 1 `missing_reconstruction`, 3 `extra_reconstruction`, and 4 `contradictory_land_water_support`; incidences overlap (five unique issue-bearing targets). The missing and extra reconstruction findings share one target; issue geometries are retained in `whole-target-support.json`.
- These are target-level relations, not per-key clearance. In particular, no whole-target issue is not itself an individual cell qualification. The 25 originally classified inland-water keys remain unchanged.

## Limits

This producer output is source-relative physical context only. It is not a native-grid comparison, administrative/sovereignty determination, current-boundary proof, land/water truth, qualification or repaired credit. Preserve the complete GSHHG physical inputs, heterogeneous dates/scales, known validity issues, original foreign contacts, and all full-versus-simplified mismatches.
