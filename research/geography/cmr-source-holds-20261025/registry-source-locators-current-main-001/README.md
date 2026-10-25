# CMR accepted-original source locators

This bounded metadata correction follows the accepted `original_source_paths` locator contract. It does not add or alter source evidence, target geometry, native qualification, constructors, positive cells, or any held/pending/adverse row.

The prior final-bank geography check for request `3360ec3d-0fa6-4e67-82ad-46a623dad9ca` / run `40181028030` stopped at `New lazy target lacks its accepted original containing source`. The original CMR evidence has one source family but no `source_membership.parts`; therefore the accepted checker had no path hints from which to look up original target geometries.

Read-only exact comparison found 70 null-to-materialized target features in the changed effective-context body. All 70 match the CMR source-target evidence targets. The accepted original source roster already contains them: 51 in `data/geography/part-4.json` and 19 in `data/geography/part-5.json`. These two paths are the only new locator values. The registry entry retains its existing authority/source/constructor bytes and adds `original_source_paths` only. The accepted checker still resolves each path through the prior selected-geography roster and reads the pinned original bytes; the locator list supplies no bytes and makes no assertion beyond locating the previously accepted originals.

Exact accepted pins from the selected-geography bank at base `410a3cbb2ae965c2692053681ab35f611f1e21ee`:

- `data/geography/part-4.json`: blob `ccdefbb55c62b317f11e6078cd9291dae5339693`, 4,835,479 bytes, SHA-256 `e204a879e160f8b22ccfff698e8063a79d91cdba5ef7aa87df94661323b0bd3c` (51 exact CMR targets).
- `data/geography/part-5.json`: blob `cf59e69b02ab2c9ad7344ddbf309a221a8be587b`, 5,226,173 bytes, SHA-256 `20215ef8574bcf8958b3177868a7e7a8bbe206e4770ae7824915e233a90e7cbc` (19 exact CMR targets).

The original composition registry and all source/diagnostic/native/finalizer outputs remain unchanged historical records. This folder records only a path-locator bridge. It is not geography-check acceptance, scientific acceptance, or credit.
