# TLS owner/source-role audit matrix

Read-only, source-free audit of the original compact-country `Administrative Posts` contract. This reconciles the retained 22-owner roster with the existing source-role and compatibility findings. It does not qualify geometry, change disposition, or claim credit.

## Evidence basis

- Frozen package: 562 keys / 337 intervals / 22 owners / 31 source features; queue content SHA-256 `78007430b6f9faedb188ef0619b7ff0a7a2cc7fff2ec9f1c41ee69936ec4ebd8`.
- Exact owner-to-feature and interval-contact table: `research/TLS/owner-feature-contact-mapping-20261026.md`, SHA-256 `9e79956298b3f4714b77aeb73aa457af6c5259cc2b9fd320221e8c0ea8edfb25`.
- Primary-source role/vintage assessment: `research/TLS/primary-source-role-roster-addendum-20261026.md`, SHA-256 `4d1d23c966637aeadcd634020f84f7c8efc031ee2e9aff54fdf992c10ce68297`.
- Retained source/contact and compatibility summary: `research/TLS/block-033-source-physical-contact-matrix-20261026.md`, SHA-256 `d129d2815a497cd683d16e49e0e3ba3642810ba293d0032c49856323cd5babc4`.
- Physical evidence for the separate Hatu-Udo issue: `coordination/engineering/tls-original-repair-20261026/physical-001/whole-target-support.json`, SHA-256 `ea5172af4f5be965d92f4c287f7812d0148594c26cc49013dcefeb3d91fc3f93`.

Shared source record: GeoBoundaries `gb:TLS:ADM2` / `TLS-ADM2-22284137`, represented 2020, 65 units, attributed to WHO/OCHA ROAP, canonical type “Administrative Posts,” with a source-level CC BY 3.0 IGO declaration. This establishes the recorded product role and attribution, not the legal identity or exact lineage of each selected shape. The 2023 census reports 67 posts; that count is later statistical context, not a feature crosswalk. Law 14/2023's post changes took effect 2024-01-01, but none of the 22 selected owner labels is one of the named split posts. Law 19/2023 changes Ataúro's administrative tier effective 2023-12-06.

The retained compatibility summary cites immutable commit `98e61e00ba373b4278c3dfb44102ef94f70d3917`, blob `db9f8a36b01ee6d2e76c162dc874c9f53736d683`, at `coordination/engineering/indonesia-adm2-current-cell-20261014/remaining474-source-refinement-001/sources/provenance/TLS-tls-adm2-source-compatibility.json`. It reports identical feature properties between original and full-resolution releases but changed geometries for Fatumean, Tilomar, and Balibo. The note says no source/native predicate was run and no hold changed. I could not independently reopen that blob in this checkout: the promisor fetch failed because `github.com` DNS resolution was unavailable. The retained matrix supplies the source-version details below; they remain a documented caveat, not a newly verified comparison.

## Owner/source matrix

Every row's source ID is the exact own `gb:TLS:ADM2` feature in the frozen roster. Key and interval counts are the retained original candidate contacts. “Shared role only” means the documented 2020 `Administrative Posts` product role and WHO/OCHA attribution apply, while no target-specific legal map/lineage record is in the reviewed evidence. It is not a finding that the source is invalid or that no such record exists.

| Owner | Feature | Source ID | Keys / intervals | Target-specific evidence and caveat |
|---:|---|---|---:|---|
| 42171 | Atauro | `gb:TLS:ADM2:22284137B11289182458696` | 51 / 30 | **Direct temporal/legal issue:** Law 19/2023 made Ataúro a first-tier circumscription covering the island, effective 2023-12-06. The source is a 2020 ADM2/post product. Law gives no polygon crosswalk; exact feature lineage/extent remains unverified. |
| 42172 | Fatumean | `gb:TLS:ADM2:22284137B11881161065747` | 25 / 15 | **Geometry-version caveat:** retained compatibility note says feature 58385 differs in full-resolution geometry; properties are reported identical. No membership comparison is documented. |
| 42178 | Iliomar | `gb:TLS:ADM2:22284137B19934279863207` | 18 / 8 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42179 | Tutuala | `gb:TLS:ADM2:22284137B2107732035789` | 92 / 64 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42180 | Cristo Rei | `gb:TLS:ADM2:22284137B23086342577141` | 35 / 11 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42183 | Lospalos | `gb:TLS:ADM2:22284137B26175223982630` | 52 / 34 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42186 | Alas | `gb:TLS:ADM2:22284137B36199594403094` | 31 / 19 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42188 | Hatu-Udo | `gb:TLS:ADM2:22284137B3809405900530` | 12 / 2 | Shared source role only. The physical report separately marks `extra_reconstruction`; this is a physical-support issue, not an administrative-source role conflict or legal-boundary result. |
| 42189 | Tilomar | `gb:TLS:ADM2:22284137B39285760424005` | 26 / 22 | **Geometry-version caveat:** retained compatibility note says feature 58422 differs in full-resolution geometry; properties are reported identical. No membership comparison is documented. |
| 42190 | Atabae | `gb:TLS:ADM2:22284137B39370724774054` | 2 / 2 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42193 | Same | `gb:TLS:ADM2:22284137B41872156490215` | 4 / 3 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42194 | Pante Macassar | `gb:TLS:ADM2:22284137B41915999739632` | 4 / 4 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42195 | Uato-Lari | `gb:TLS:ADM2:22284137B41938791268987` | 25 / 24 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42203 | Fatuberliu | `gb:TLS:ADM2:22284137B51170089916625` | 16 / 15 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42204 | Uatucarbau | `gb:TLS:ADM2:22284137B52677210689185` | 4 / 1 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42208 | Oesilo | `gb:TLS:ADM2:22284137B5780280326887` | 1 / 1 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42210 | Suai | `gb:TLS:ADM2:22284137B60263836524270` | 21 / 18 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42215 | Balibo | `gb:TLS:ADM2:22284137B63057021325797` | 2 / 2 | **Geometry-version caveat:** retained compatibility note says feature 58374 differs in full-resolution geometry; properties are reported identical. No membership comparison is documented. |
| 42217 | Maliana | `gb:TLS:ADM2:22284137B67837040381832` | 2 / 2 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42226 | Passabe | `gb:TLS:ADM2:22284137B78589082369873` | 20 / 15 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42230 | Viqueque | `gb:TLS:ADM2:22284137B80785204174249` | 71 / 25 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |
| 42234 | Nitibe | `gb:TLS:ADM2:22284137B96760248350473` | 48 / 20 | Shared role only; no target-specific legal map or lineage in reviewed evidence. |

## Audit result and limits

All 22 owner rows bind to distinct exact TLS ADM2 source IDs, and each has its own source atom present in the retained interval-contact extraction. The package also retains eight ownerless TLS ADM1 contacts and one ownerless East Nusa Tenggara ADM1 contact; they are contextual/competing contacts, not extra owners. No feature-property/source-role conflict is documented. The actionable target-specific concerns are Atauro's post-2023 tier change and the reported original/full geometry differences for Fatumean, Tilomar, and Balibo. Hatu-Udo's `extra_reconstruction` remains a separate physical issue. For the other 18 rows, evidence supports only the shared 2020 source-role description; no target-specific primary legal map/lineage was found in the reviewed record.

This is not a universal legal-map gate, a geometry or source-variant comparison, a qualification decision, or a credit change. The exact effect of the three geometry-version differences on package memberships is unresolved because the retained compatibility note explicitly did not run that predicate.
