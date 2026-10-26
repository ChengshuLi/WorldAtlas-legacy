# SOM 548-key source-application proposal

Date: 2026-10-26. This private, source-free memo recommends **researched-unresolved** for the exact 548-key / 389-interval subset described below, for root review. It does not alter any owner, package disposition, acceptance, claim, hold, import, release, or credit. No source payload or key coordinates are included.

## Exact scope and binding

The source rows are bound to the frozen SOM original denominator of 2,247 unique land keys / 1,645 intervals / 36 owners. The source-derived local key-owner-interval roster contains exactly 2,247 unique `(owner,y,x)` rows; its SHA-256 and original-packet binding are recorded in `manifest.json`. Each selected row was checked against the retained owner/source matrix for owner ID, owner source ID/name, source-feature ID, and source-contact identity. The 1,102 rows in the accepted subset CSV were independently joined to the frozen roster by `(owner,y,x)`, interval identity, expanded sequence, question ID, source ID, and owner name with zero mismatches.

The new 548 subset is defined as the following 12 complete owner/source groups. Counts and IDs come from the frozen original rows and matrix; the CSV key/interval join itself is represented only by hashes in the manifest.

| Owner | Source feature ID | Question IDs | Keys | Intervals |
|---|---|---|---:|---:|
| ADALE (39999) | `gb:SOM:ADM2:84685775B13317235490488` | SOM-Q035, SOM-Q036 | 42 | 42 |
| WARSHEIKH (40007) | `gb:SOM:ADM2:84685775B19685876664607` | SOM-Q039, SOM-Q040 | 24 | 20 |
| JAMAAME EAST (40009) | `gb:SOM:ADM2:84685775B22359262366449` | SOM-Q060 | 2 | 2 |
| JILIB EAST (40031) | `gb:SOM:ADM2:84685775B45912091310280` | SOM-Q059 | 1 | 1 |
| RABDURE (40033) | `gb:SOM:ADM2:84685775B46619978923687` | SOM-Q029, SOM-Q031 | 2 | 2 |
| BRAVA (40048) | `gb:SOM:ADM2:84685775B57970277493095` | SOM-Q057, SOM-Q058 | 108 | 73 |
| BALAD (40063) | `gb:SOM:ADM2:84685775B67470388371162` | SOM-Q041 | 2 | 2 |
| KURTUNWAAREY (40065) | `gb:SOM:ADM2:84685775B70562611750423` | SOM-Q055, SOM-Q056 | 37 | 31 |
| BADHADHE (40067) | `gb:SOM:ADM2:84685775B71342338947416` | SOM-Q063, SOM-Q064 | 119 | 82 |
| MARKA (40075) | `gb:SOM:ADM2:84685775B78307821916269` | SOM-Q053, SOM-Q054 | 126 | 79 |
| AFGOI (40083) | `gb:SOM:ADM2:84685775B82872988311402` | SOM-Q051, SOM-Q052 | 13 | 9 |
| RAGA ELLE (40084) | `gb:SOM:ADM2:84685775B83703395559495` | SOM-Q037, SOM-Q038 | 72 | 46 |
| **Total** | **12 original source-feature groups** |  | **548** | **389** |

The selected source IDs and counts reconcile exactly to the frozen matrix rows. The accepted 1,102-key set and the 548-key set have zero exact `(owner,y,x)` overlap. The 75-key EL DHERE set (owner 40035; 70 intervals) is also disjoint. Together with the matrix-defined 522-key owner complement, the four source-roster sets account for all 2,247 rows with zero overlap. The owner-complement partition reproduces the provided local-draft group counts (522 keys / 344 intervals) across owners 40010, 40026, 40036, 40054, 40055, 40064, 40068, and 40089. **The exact 522-draft key bytes were not available here, so I did not compare them or claim exact row-level disjointness against that draft.** The owner-level complement proves the requested aggregate partition only; it cannot rule out an unknown within-owner mismatch in the inaccessible draft.

| Matrix-defined 522 owner complement | Keys | Intervals |
|---|---:|---:|
| ABDUL AZIZ (40010) | 11 | 7 |
| HELIWA (40026) | 5 | 5 |
| KARAN (40036) | 9 | 6 |
| BARGAAL (40054) | 75 | 74 |
| WABERI (40055) | 8 | 7 |
| MADINA (40064) | 29 | 19 |
| EYL (40068) | 133 | 92 |
| KISMAYO (40089) | 252 | 134 |
| **Total owner complement** | **522** | **344** |

## Evidence basis and source limits

The recommendation uses the five bounded, pre-researched group assessments supplied by the coordinator. They support district-level operational identity/name correspondence while leaving the source-to-feature and current/effective-boundary link unresolved:

- **Lower Shebelle — BRAVA, MARKA, KURTUNWAAREY (271 keys / 183 intervals).** The retained memo records 2012 OCHA maps for Baraawe, Kurtunwaarey, and Marka, WHO 2014 polio district data, and a WHO 2020 cholera district table. These support district-level operational/reporting context and documented name variants. The older UNDP 1998 map layers and the available operational tables do not establish lineage or a spatial join to the consumed 2022 feature IDs.
- **Lower Juba / South-West reporting — BADHADHE and AFGOI (132 / 91).** The retained assessment cites 2015–16 RAAS/ICRAF, WHO 2021, UNHNRP 2026 and OCHA 2022 context for Badhaadhe, and the 2013 polio report, WHO 2020 grouping, and OCHA 2012 map for Afgoi. These support operational district concordance but do not supply the consumed 2022 feature boundaries or exact feature lineage. The Badhaadhe coast/Kenya-context evidence and South-West reporting distinction remain adverse/contextual scope limits; neither is silently normalized into a current source boundary.
- **WARSHEIKH, RAGA ELLE, BALAD (98 / 68).** The verified parent owner-role assessment `worldatlas-SOM-WARSHEIKH24-RAGAELLE72-BALAD2-source-role-review-20261026.md` (SHA-256 `5a1439371166b84eb62e0a782832aa1c9299de2ad695dae776a6b43ca6645441`) records current e-NIMIS Middle Shabelle labels, a retained 2005 FAO/FSNAU Balad sheet, a 2009 humanitarian map, and a 2014 FSNAU district table. These are dated operational/name-role evidence, not an independent geometry application or a bridge to the consumed 2022 feature IDs. Preserve the Balad/Banadir ADM1 contact as adverse evidence; do not treat it as proof of a current feature boundary or ancestry.
- **Jamaame East / Jilib East / Rabdure (5 / 5).** WHO polio surveillance distinguishes Jamaame East/West and Jilib East/West, including a 2022 Jilib East reference; WHO 2022 and UN 2024 references include Rabdure. These sources support name/reporting context but supply no exact East-variant feature-to-polygon boundary link for these original keys. The verified parent memo `worldatlas-SOM-JAMAAMEEAST2-JILIBEAST1-RABDURE2-source-role-20261026.md` has SHA-256 `6e03cf79867a75174ef9564f93ce982a5b756a3a0e8af7703c54cacfda838393`.
- **ADALE (42 / 42).** WHO AFP 2013, WHO cholera 2021, and the current e-NIMIS listing support Adale as an operational district name in Middle Shebelle. They do not establish the 2022 geoBoundaries feature lineage or exact geometry relationship.

The shared GPEI/Frank Salet context records a 2022 represented-year claim for a 118-feature operational public-health source. It explains provider role and mapping method; it does not establish that each consumed feature descends from a particular redraw, a statutory/effective district boundary, or a current owner-to-feature crosswalk. The catalog's recorded CC BY 4.0 / May 2022 information is not a source-level legal clearance for the precise consumed vector or its intended derivative use. Existing source-rights, source-currency, and feature-lineage holds therefore remain.

Existing native-center results are reused only as source-relative contact evidence; no geometry, coordinates, or physical analysis was rerun. Center contact is not a positive repair predicate, legal boundary proof, or full-cell coverage. The retained physical mask is not an independent whole-cell physical qualification. The original `source_relative_cells=0` and all physical/native/competitor/rights holds remain unchanged.

Both exact SOM memo entries were read from the parent-supplied Library transfer `worldatlas-GBR28-SOM-cross-runtime-transfer-20261026.zip` (Library file `libfile_cbe45fb6c1a881919a064a15b3b52064`, version 0; archive SHA-256 `45caed8bfcb24166f29f450dad91e7e342fb214d469ce55d2c17cfab68bcf9d9`). The archive manifest binds the WARSHEIKH/RAGA ELLE/BALAD entry to SHA-256 `5a1439371166b84eb62e0a782832aa1c9299de2ad695dae776a6b43ca6645441` and the five-key entry to `6e03cf79867a75174ef9564f93ce982a5b756a3a0e8af7703c54cacfda838393`; both entry lengths and hashes match. The source-role and geometry limitations stated above remain unchanged.

The nine historical competitor-refusal IDs/keys remain unknown and are not assigned to these 548 keys. The 11 empty-owner ADM1 contacts are a separate vector observation and do not identify or partition the nine refusals. COD-AB v03 remains aggregate-only; its published hit/outside totals are not assigned to these keys or owners. No global absence claim is made.

## Recommendation and accounting boundary

Recommend **548 researched-unresolved, zero positive repairs** for only these 12 named owner/source groups. This classification reflects the specific operational evidence and the remaining source-to-feature/effective-boundary uncertainty, not a claim that the sources failed to match or that no authoritative geometry exists. The separate accepted 1,102, the owner-complement 522 draft, and EL DHERE 75 retain their distinct scopes and statuses. This memo makes no claim, acceptance, credit, package-release, or disposition change; root retains all accounting and hold decisions.

Supporting pre-researched assessment hashes and the exact roster/join bindings are listed in `manifest.json`. The exact 522 draft bytes remain the one outstanding artifact needed to verify equality and row-level non-overlap with that local proposal; until provided, only its owner-complement and aggregate counts are reconciled.
