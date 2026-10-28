# JOR656 original physical comparison — first completed run

This output applies the existing `scripts/qualify-source-cohort.py` physical producer to the 16 retained original 2006 geoBoundaries JOR ADM2 source features listed in `physical-input-001/target-owner-crosswalk.json`, using the complete pinned GSHHG 2.3.7 physical-source inputs. It is strictly whole-target source-relative physical context; it is not an administrative-membership result, native cell classification, land/water correction, owner-zero observation, or approval.

## Run custody

- Producer: `scripts/qualify-source-cohort.py`, SHA-256 `abc801b9a35d20c9f0dfe3bbc9bb2cb7dc107f1758414970d9cde11380574a18`.
- Exact physical stage input: `physical-input-001/original-stage-inputs.json`, 467,720 bytes, SHA-256 `e64d3754080cf744816ad1afb7e4a1805b6ac8bb7be63f9e999d7a32b03bc27f`.
- Producer output: `whole-target-support.json`, 681,328 bytes, SHA-256 `48babdf8f9cc8a441ba10f4eb1ea6d8cbf3675350a7fbfac81179578d1b23378`.
- Execution receipt: `execution-receipt.json`, 60,614 bytes, SHA-256 `31a9f7eea775a1ab9377f81edb1fa2df8a7104969dac9146e2a6d53d01f236b9`; it records exact input pins, program, output, runtime inventory digest, and completed execution.
- Actual attempt-003 stdout is retained privately in the owned workspace with exit status `0` and empty stderr. Earlier attempt-001 and -002 failures are separately preserved and were pre-admission failures; they are not represented as physical results.
- Runtime was Python 3.12.14, NumPy 2.3.5, Shapely 2.1.2, GEOS 3.13.1 using the verified official Shapely wheel. Runtime receipt/inventory remains in the owned local workspace; its inventory SHA-256 is `47137200d94c90dc7383240b611a58fb5e11e897ed504b346ff8a1666569114e`.

## Measured result and limitations

The completed run contains 16 whole-target results and 38 checked source relations. Eleven targets have no reported whole-target issue. Three targets have an `extra_reconstruction` issue, and four targets have a `contradictory_land_water_support` issue (one target has both types). These are target-level issue incidences, not per-key findings. No per-key inference should be made from a target-level issue alone; any later native qualification must preserve and explicitly handle applicable issue witnesses and the exact original cell classes.

The physical sources retain their heterogeneous observation dates/scales, known validity limitations, and licensing/attribution caveats recorded in the input README and source records. The 25 originally classified inland-water keys remain unchanged. This comparison neither resolves those source limitations nor asserts sovereignty, current administrative boundaries, or legal status.
