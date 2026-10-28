# JOR 93 ISR/SAU full-versus-simplified native contact comparison (candidate evidence)

This dated addition verifies the exact full-resolution ISR and SAU ADM1 source products against the 93 originally captured ISR/SAU contact keys. It preserves the original contract-recorded simplified product role and all 93 adverse contact rows; the full comparator is a separate corroborating source variant, not a substitute for the original simplified operand and not a reason to clear or reduce a hold.

## Exact source bodies and provenance

Both full files are from the public `wmgeolab/geoBoundaries` repository at release commit `9469f09`, and the downloaded byte hashes equal their Git LFS pointer OIDs:

- ISR ADM1: `releaseData/gbOpen/ISR/ADM1/geoBoundaries-ISR-ADM1.geojson`, 111,139 bytes, SHA-256/LFS OID `1ddf8523ef2074d658fd4a696fbb7ff82b73b77a0d69e620ed564f9a1b8c85d3`; public-domain attribution recorded.
- SAU ADM1: `releaseData/gbOpen/SAU/ADM1/geoBoundaries-SAU-ADM1.geojson`, 2,434,894 bytes, SHA-256/LFS OID `75abcfd5a61790e5e505974f04cbd1d869e58d81b6faba039b000987e659e840`; ODbL-1.0 applies.

The original simplified product bodies remain pinned in the JOR source corpus at commit `8258affc1130b492df2209c2dfc9093d8c50b89e`: ISR compressed SHA-256 `4ef84358ff0c8885bf857611a3cf2d537f33d7e2ecf9d34155778ff4b4e44989` (12,533 B), decoded SHA-256 `28fe2d4b800046000a33ea66b473f5502a6b7a4ad9d587cd059d63d5a4ccc5dc` (44,192 B); SAU compressed SHA-256 `7896c1305fa8747bc045ad367de8ae90d235b9ec3603c2cd0ca01e96b80f1e8a` (142,614 B), decoded SHA-256 `cf50a59ddcda0fc4539c12799c320b9936fd75f47c1b5562ef548436d9169e13` (443,440 B). These remain the original consumed simplified-source role. The full/simplified feature-ID rosters match exactly (six ISR and thirteen SAU features).

## Method and result

The 93 `[owner,y,x]` contact keys, source/target IDs, cohort labels and initial witnesses come from the original reconciliation at `../simplified-foreign-contact-native-reconciliation-001.json` (SHA-256 `048db1158bebf895c51a2d9180654bc5fdc578c51383ec94a2958838757ff603`). The comparison uses the accepted `native-linear-evenodd-first-owner-v1` kernel in `src/native-grid.js` (SHA-256 `0c35dbef6f88050970429ab08b22738d0aaac0afaa5f8d5e05b4e1cbefe41c91`): `nativeRuntimeIndex` and `nativePolygonIntervals`, with the retained exact native latitude table, size 262,166. Latitude input: commit `5b32388df0501b013ac9a3ba97864932db493d59`, `coordination/engineering/native-grid-fidelity-1010-20261005-local15/results-v1/native-row-latitudes.f64le.gz`, compressed SHA-256 `ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147`, decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`. Each of the 19 source features in each product was applied independently over the exact contact-row span, then mapped back to its original `gb:<group>:ADM1:<shapeID>`; this avoids sibling-feature first-owner masking while retaining the accepted center/rasterization rule.

Result: all 93 unique contact keys hit the exact originally recorded feature under both the simplified and full products: 72 ISR and 21 SAU; 90 are in the same-full-JOR-member stratum and three are in the full-JOR-member-miss stratum. There are zero native ties, and all 93 per-key full/simplified feature-hit sets are identical. The 93 therefore remain held and in the original 656 denominator. This is a source-relative exact-center result only, not a sovereignty, current-boundary, legal-status, or whole-cell clearance finding; it does not replace the original simplified role.

The earlier `full-foreign-application.json` claiming 0/93 is preserved as contradicted historical evidence: its pinned ISR/SAU hashes identify simplified payloads, not the full files above. The cause of that old report's contradictory computed result remains unestablished. This new comparison does not infer the cause or clear any contact. The report contains only derived keys and source feature IDs/hashes, not raw source geometry or geographic coordinate lists. Keep source attribution and ODbL obligations applicable.

## Artifact

`full-vs-simplified-native-comparison.json` (105,159 bytes, SHA-256 `9d4800a440b45849d34bf4cf12079598811ef7b6012803602890b4de4b8bc51d`) has all exact contact rows, full and simplified feature-hit identities, input pins, method pins and limitations.
