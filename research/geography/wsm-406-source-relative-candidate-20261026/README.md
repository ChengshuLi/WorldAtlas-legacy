# WSM406 source-relative candidate table

**Proposed source-relative candidates only; not qualified repairs, accepted owner changes, or credit.** This packet publishes a 6,505-byte candidate patch with attribution and conservative CC BY-SA 3.0 adapted-material treatment. It does not publish raw source geometry, the private key CSV, or the held rows.

## Exact candidate table and denominator

`native-patch.json` is the exact supported 406-cell patch produced from the retained WSM preparation. SHA-256: `e6a33af6a31d595c232e36139502853e2258306a115fbec442b5a6a5f79f9ba1`; 153 native rows, 184 half-open x-runs, 406 cells, owner index 7134. It contains no polygon coordinate arrays. It is included for review as a candidate table only.

The full original package denominator is 469 keys / 212 intervals for compact Samoa owner 7134; frozen roster SHA-256 `dbeeff5c0903042d51c8c4df58444a8dc91b093e50c0d76b0ef54eb715b4c8fc`. The exact pinned full-vs-simplified comparison classifies 406 own-feature representative-point centers inside both variants and 63 simplified-only centers outside their own feature in the full variant. The 63 stay held (tuple commitment `279ce17037c043e03684cf2aa39cd62406f92af3933a2f1753df6ce06df7fe69`); they are not included in this patch. The separate 1,020-cell companion is excluded. The private row-level CSV and source geometries are not included.

Pinned geoBoundaries release: commit `9469f09592ced973a3448cf66b6100b741b64c0d`, ADM1 record `WSM-ADM1-40696546`, represented year 2018. Full GeoJSON is 753,337 bytes / SHA-256 `cbcb8c6b492f63f3a8bfe820eefeee3882288e31a629c5a5880298ddf256aaf7`; simplified GeoJSON is 47,246 bytes / SHA-256 `16bc5ba7994b7ad8407596db7f31f56c4a7bf7efdbbdf1064dddf43e8d9f7756`. There are eleven source lineage atoms within the one owner, not eleven separate owners. Candidate counts by feature (ordinal: cells) are 65870:75, 65871:4, 65872:81, 65874:4, 65875:14, 65876:70, 65877:20, 65878:35, 65879:2, 65880:101. Feature 65873 is companion-only context, not a repair target.

## Source and processing evidence

The exact sourceData archive pinned at the same release identifies [Samoa District borders (numbered).png](https://commons.wikimedia.org/wiki/File:Samoa_District_borders_(numbered).png) as the source for WSM ADM1. The 2011 image is uploaded by Jon Harald Søby; Commons identifies the artist work as MichaelBillington’s derivative based on Golbez and declares CC BY-SA 3.0 with attribution required. See [attribution-sharealike.md](./attribution-sharealike.md) and the source-free lineage record for full archive/member pins. This named district map plausibly supports source role across compact Samoa’s 11 ADM1 lineage units. It does not establish the digitizing chain from image to each exact vector polygon or a legal effective date for the 2018-represented geometry.

The source-relative native diagnostic is SHA-256 `c43ec1090292030bd01a31c36260684314e2a591ef92399dc30a8d5a0d80bd29`, with receipt `8748f76121e331c96cf14199791c1127a6b1d07714734b5ef5353cdd98ec4ec6`; it reports 406 requested / 406 supported / 0 held for the candidate cohort. This is source-center/native preparation, not final qualification. The supported-inputs constructor result is `29844e9132d2af81b72a012f82fc75a4fd1fce82992d9d29283f1e5058e30aa2`; its prior conservation output reports 469 = 406 candidate + 0 already present + 63 held. That prepared accounting result does not authorize an owner write or acceptance.

The retained whole-target physical inputs/result/receipt are SHA-256 `97e6785427473611e6faaba5bf36f579c95e82e9367533d0950dbdf0a5baf820`, `1b81d56580f2687b74a287548a69025493dd7a52cc2d59ece81ddd42e7fcbe59`, and `45b69d380280c82649d4191a4cecd73bfd84ca33e5d686d1baa71fe100300411`. They retain seven extra and three missing reconstruction issues, with two dual-issue targets: extra on 65870, 65872, 65874, 65875, 65876, 65877, 65880; missing on 65872, 65875, 65879. A separate retained center-vs-issue check found zero of 406 centers touch those ten issue geometries. That point result does not resolve whole-target physical issues or demonstrate whole-cell support; all flags remain adverse/unresolved.

## License and limits

This scoped candidate table is treated as adapted material under CC BY-SA 3.0; the accompanying notice gives the source-specific attribution. geoBoundaries separately states that its code and derivative works are CC BY 4.0 and requests geoBoundaries attribution plus citation of the boundary’s metadata source. The separate CC BY 4.0 statement does not override the source image’s CC BY-SA 3.0 terms.

The table makes no claim that the 2011 image is a legal/effective map for the exact 2018-represented vector, that a particular digitizing process links the image to each polygon, that physical issues are cleared, or that these cells are final qualified repairs. No owner changes, imports, acceptance, or credit are made by this proposal.
