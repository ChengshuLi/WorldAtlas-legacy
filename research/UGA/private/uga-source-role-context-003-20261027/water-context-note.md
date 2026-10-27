# Seven contextual contacts in the UGA inland-water cohort

This source-free annotation records the seven family-338/341 contact rows among the frozen UGA package's 23 inland-water keys. It reuses the retained contact matrix and water coverage projection; it does not inspect geometry, resolve territorial roles, establish source authority, or qualify any key.

## Exact scope and bindings

- Frozen UGA package: queue commit `23318dd9d70680495138297b9cc1a7533a466200`; 715 keys / 466 intervals / 28 owners, including 23 inland-water keys.
- Contact matrix: `research/UGA/private/uga715-contact-matrix-20261027.jsonl`, SHA-256 `36b568d1a4dad32a69ef384707ec8ac4b89ebed6fc8c4fe502789d8de4b78c3b`.
- Water partition manifest: `research/UGA/private/uga-water-stage-input-manifest-20261027.json`, SHA-256 `027c367e93f22371b811d053662855f8cf164bcece66b09b3f6bc7b953a2ca5d`.
- Existing center projection: `research/UGA/private/uga-water-coverage-centres-006-20261027.json`, SHA-256 `ffc149b659f7cd5f5fabc666325d72c5bd459d3a81bda244e4ebe97bc3020dfb`.
- The seven contact rows are exactly the 6 family-338 plus 1 family-341 subset of the 30 total source-contact tuples. Their compact sorted `[family_index,owner_index,y,x,source_feature_index]` commitment is `5374ba97b647c5220396f0a90b8f10217540eb3098d7700fa7738e71c59b3f79`. No key coordinates are reproduced here.
- All seven bind to the 22-row `coverage_centres` partition; none is the single held row. This only says the same owner-key center was found in its retained mapped-water-support projection. It does not mean that the contextual family geometry has a physical witness.

| Contact role | Family / source identity | Original owner binding | Contact count | Contact subset SHA-256 | Coverage-center / held |
|---|---|---|---:|---|---:|
| Neighboring-country competitor contact | Family 338, Tanzania ADM1 Mara, feature 60192, `gb:TZA:ADM1:36957248B94562559517692` | Owner 43877; owner-linked family-342 feature is UGA ADM3 Lake Victoria, feature 60682, `gb:UGA:ADM3:73843447B4000080097508` | 6 | `d0b2aa0573bf24c42c6c78433970ae61c69f4a0a3ebed92c7264994fdb1a4f01` | 6 / 0 |
| Parent/hierarchy contact | Family 341, UGA ADM2 Bukonjo, feature 60499, `gb:UGA:ADM2:47994165B33706557437921` | Owner 43943; owner-linked family-342 feature is UGA ADM3 Kasese, feature 60604, `gb:UGA:ADM3:73843447B81393255595253` | 1 | `1e1a0a90632167ef236e4d9090ce85d04a9ed3d52766cf8b69888e0ea5d2fc0f` | 1 / 0 |

## Role and evidence limits

The retained role matrix classifies family 338 as a neighboring-country competitor contact and family 341 as a parent/hierarchical contact. The cross-tab says contacts are not legal-boundary determinations. These are additional contact vectors on water-class keys; they do not replace the corresponding family-342 ADM3 owner-linked source contacts, and they do not adjudicate an international or internal boundary.

The water projection found 22 owner-specific center hits in retained `mapped_inland_water_support` and one held Buliisa key lacking that support. It reports zero center contacts with its issue geometries, but explicitly preserves whole-target physical issues. No physical witness is bound to the Mara or Bukonjo contact geometry by this seven-row join. A competitor/parent source-evidence configuration must retain these contacts as adverse/context inputs, rather than relabel them as owner source geometry or as physical proof.

No item-specific license or source authority for the Tanzania Mara and UGA ADM2 contact layers is established by these contact records. The UGA geoBoundaries product attribution notice (CC BY 4.0; name/link and metadata-source citation) is separate from underlying source rights and does not clear these contacts or authorize interpreting them as boundary evidence. Keep source-role, physical, current-owner, and water-coverage predicates separate. No qualification, acceptance, owner change, or credit is claimed.
