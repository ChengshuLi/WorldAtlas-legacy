# UGA 692-land source evidence packet

## Scope and status

This packet binds source evidence for the **692 land keys** under consideration in `gb-UGA-ADM3--repair-evaluation`. The frozen full package remains **715 keys / 466 intervals / 28 owners**, partitioned as **692 land + 23 inland-water**. The 23 water keys remain distinct and are not in the land candidate. Nothing here reruns geometry, changes the source roster, qualifies keys, or records acceptance or credit.

The package's declared primary source family is 342, `gb:UGA:ADM3`, product `UGA-ADM3-73843447`, represented year 2020, level ADM3 / District, advertised count 137. The 692-land slice is a frozen physical-class subset, not a separate source product or a claim that all its keys are source-qualified.

## Pinned source and custody

The geoBoundaries release directory is commit `9469f09592ced973a3448cf66b6100b741b64c0d`. Its sourceData path `sourceData/gbOpen/UGA_ADM3.zip` is Git blob `23ac9e712a1808a3eb9de8a45732ceaa7f283513`, a 131-byte LFS pointer to archive SHA-256 `857470a2e0680d72af410478a88f06df7a141c122ef56b14dbc06d8c0f3f36f7` (306,510 bytes). The archive was recovered and verified in private custody. Only its metadata, notice captures, XML schema/lineage, and DBF non-geometric fields were inspected; no geometry member or image bytes were opened or published.

The DBF member `UGA_ADM3.dbf` is 19,205 bytes, SHA-256 `2189ed110400df1e39c4fcaef6ebe0d092731d6dcce6a7f0b07e24e2f43a120f`. It contains 137 records, 137 unique names, all `Level=ADM3`, and fields `Name`, `Level`, `Shape_Leng`, `Shape_Area`; it contains no source-feature IDs. A source-free record-order name roster is `research/UGA/uga-adm3-name-roster-20261027.json`, SHA-256 `79648892c56e3f9e85517444fc184da3caaeb5e702c65ca279c94df9a4baa273`.

## Source-item and rights evidence

The archive `meta.txt` (744 bytes; SHA-256 `71a8c992db7eec85985933ab955c2c51dfb93a118c9ed23d0c7f6fedf2487d6a`) names two Wikimedia Commons sources, links `File:Districts_of_Uganda_2020-07.png`, records CC0 1.0, and says digitization used a districts image plus a second image for the outer Lake Victoria border with a more restrictive license. The release metadata repeats two generic `Wikimedia Commons` source labels, one combined `boundaryLicense=CC0 1.0 Universal (CC0 1.0) Public Domain Dedication`, and `licenseDetail="The second license is Public Domain"`. That combined field does not map CC0 to both items, while the separate second-license phrase does not identify which file or public-domain instrument it means. These are recorded product/archive claims, not a resolved rights conclusion.

The exact first item linked by the archive is [Districts of Uganda 2020-07.png](https://commons.wikimedia.org/wiki/File:Districts_of_Uganda_2020-07.png): the page identifies Syanarion62, “own work,” CC0 1.0, and visible upload-history dates 21–22 September 2020. The archive's second notice image captures [Uganda Regionen 4.svg](https://commons.wikimedia.org/wiki/File:Uganda_Regionen_4.svg): the page identifies Slomox, says it is based on Uganda Bureau of Statistics data, and records a public-domain release with visible history dates in April 2006. The page describes a four-region map, not a districts map or Lake Victoria border. It is therefore a plausible second-item candidate, but neither the archive nor page explicitly binds it to the second-source/Lake Victoria-border role. The first page's CC0 claim and second page's public-domain claim are page-level declarations; they do not prove use of those images for all product features or assign rights feature by feature. Page snapshot oldids 1284766143 and 1236931776 are page revision identifiers, not file-upload revision identifiers. Direct history URLs were inaccessible to the reader; the earlier exact Commons API attempt returned HTTP 403. No exact upload revision IDs were obtained.

Separately, the retained geoBoundaries citation/use notice applies CC BY 4.0 to project code and derivative works, requests attribution/link to geoBoundaries, and asks users of individual files to cite metadata-listed sources. Candidate attribution for any use of this named product should identify geoBoundaries UGA ADM3, cite its metadata-listed source items, state the changes/use, and link CC BY 4.0. This product-level notice is distinct from the underlying image claims; it does not resolve the combined CC0/second-license ambiguity, source-image-to-feature mapping, or item-level rights applicability. These are recorded claims and attribution instructions, not license clearance or a blanket prohibition.

## SGP source-name join

The retained 57-row package contact inventory joins against the 137 DBF names as follows: **34 exact-name-only matches and 23 source records with no DBF-name match; zero exact-ID matches**. The 34 equal source records map to 28 distinct DBF names. Six names occur in both ADM2 and ADM3 contact rows (Lamwo, Koboko, Maracha, Ntoroko, Rukiga, Isingiro), so their ADM2 comparisons are ambiguous name-only matches. All 28 owner-linked UGA ADM3 contact names occur in the DBF, but none has a direct identifier match, and name presence does not associate a source feature or any key with a particular DBF record. The 57 source contacts are partial, not an exhaustive 137-feature manifest.

The 137 product-feature count also remains distinct from official aggregate counts: the Electoral Commission reports 146 districts as of September 2020; an official-site UBOS index excerpt reports 135 districts as of 1 January 2019, but the PDF body could not be inspected. No named official roster or source-feature crosswalk resolves these counts. These aggregates do not establish that a feature is missing or erroneous.

## Source-role conclusion and finite evidence gap

For this 692-land candidate, the retained evidence supports the **declared product/source-family identity**, product-level represented-year/ADM3/District metadata, the recorded Commons item notices above, and geoBoundaries attribution. It supports only **name-only** agreement for the 34 matching contacts. It does not provide a source/build record linking all source features to the two image items, their exact upload revisions, or the 692 keys to particular features. Source2's Lake Victoria-border role is not established, and the official count discrepancy is unreconciled.

The finite record that would resolve the item-specific role is the pinned producer source/build crosswalk for `UGA-ADM3-73843447`, mapping source-image page/revision and applicable notice to features or feature groups, plus key/interval-to-feature binding where required by the package contract. Until that record is available, this packet supports source-context documentation, not per-key source qualification. Keep the separate 23 inland-water keys and all other package predicates intact.

## Bound component files

| Component | Path | SHA-256 |
|---|---|---|
| Pinned source item trace | `research/UGA/source-item-trace-20261027.md` | `d4daed2d659556956a61c394e87ab7050282150c2c5bd2780411d2df43d8d1f9` |
| Source-license item audit | `research/UGA/source-license-item-audit-20261027.md` | `b194bcde6a0b0b1394d3666f540bf859f83fa0a3376f6f69ec118d8d719a53f5` |
| Direct Commons page/history result | `research/UGA/commons-source-item-page-check-20261027.md` | `0c04d3204b409b1dfe92c478c37e73f54a61646b8a5d11503de184fd4c6b7294` |
| 57-to-137 archive name join | `research/UGA/contact-to-archive-name-join-20261027.md` | `34a1476ee5b714166118c2c6100745662134ad8dac3a4bd8c96315ab9ef29fc8` |
| Exact 57-row contact-to-name crosswalk | `research/UGA/contact-to-archive-name-crosswalk-57-20261027.csv` | `453ecb6afb295adaa8783103ea474510b7690d50e9f62c02a4ba79c9024f7db0` |
| Crosswalk bindings/results note | `research/UGA/contact-to-archive-name-crosswalk-57-20261027.md` | `f29c1eb14896361060bca9fb981680723e0962f11ca1d58286151ca243b14557` |
| 692-land source-role disposition | `research/UGA/source-role-disposition-692-20261027.md` | `16c0c3cd49ba13c0f71025aa35cf2977663dfed56e5f145b8f03e8f8f2a6710e` |
| Official name lookup | `research/UGA/official-district-roster-lookup-20261027.md` | `cd4e5bf0804ffcbeac7056e056f40a11be9dd445ed8c0cd9292c3032dc800e59` |
| Official count context | `research/UGA/official-count-source-role-20261027.md` | `713adaf2b16070c81611ea494c201a4e0cd5f75ab5d8b007fd9a86591bb8af58` |
| Frozen source-family contact inventory | `research/UGA/source-contact-families-20261027.md` | `a09ada918b9da4f5366d55f89a2bbe04dfb217cbd08354169492ab2bf3002c42` |
| Frozen physical-class cross-tab | `research/UGA/source-contact-physical-cross-tab-20261027.md` | `0365c9f505ca325c3aaa79f721f8a977f2989b5c7fb06b40c48f690b7fcba1e4` |
| 715 / 692+23 land preflight | `research/UGA/land-pass-allocation-preflight-20261027.md` | `2568a248d0785aa14d1c85622878274681275f389190695574e1ea1d88bfa3c8` |
