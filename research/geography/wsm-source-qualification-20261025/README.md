# WSM original 469-key package — source qualification evidence

Date: 2026-10-25. Author worker: `01a171d0-0ac3-75f0-be9a-dbdcdcc39027`. Scope: only the original `gb-WSM-ADM1--repair-evaluation` denominator (469 land keys, 212 intervals, owner 7134, ten source features 65870–65872 and 65874–65880). The separate 1,020-cell physical-interpretation companion, feature 65873, regional source review #134/#617, other countries and all product edits are excluded.

The exact source-package contract is pinned at queue commit `2d1fc6f430e756498908bf2c4e267356a13f5cc7`, path `coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json`, blob `9c9a9bc83627afd3e8435ff4009e39530543bf54` (zero-based row 178). The prior WSM packet in `coordination/engineering/wsm-original-disposition-20261020/` preserves the exact original interval rows, group identities, retained mask join, accepted-key comparison and historical selected-owner observation. This work does not repeat that observation or treat the current-owner-zero result as historical credit proof.

## Candidate source and exact point contact

The frozen source record identifies geoBoundaries `WSM-ADM1-40696546`, an 11-feature ADM1 product represented as 2018, source `Wikipedia`, source-data update 2023-01-19 and build date 2023-12-12. The pinned source is `wmgeolab/geoBoundaries@9469f09592ced973a3448cf66b6100b741b64c0d`, `releaseData/gbOpen/WSM/ADM1/geoBoundaries-WSM-ADM1_simplified.geojson`. Its LFS object is 47,246 bytes, SHA-256 `16bc5ba7994b7ad8407596db7f31f56c4a7bf7efdbbdf1064dddf43e8d9f7756`. The pointer content itself is 130 bytes, SHA-256 `abed4bee09266f44f10c8faff5daa3b603f64218b5ff84d56f7c6d9bf05d6c1d` (Git blob SHA-1 `217ba5bf9324431d6580b312b3ba5f8ac88ded28`). Only this exact public LFS object was fetched. The retained PR #1240 custody member already on main, `coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-WSM-ADM1-000.bin.gz`, has compressed SHA-256 `5f86f0c734f8e94db91efc19c1f4b4c48df8f7cce6e122c899656317431b2e62`; gzip decoding gives the same 47,246-byte source digest. No raw source geometry is added to this packet.

The packet includes `original-key-roster.csv` (SHA-256 `dbeeff5c0903042d51c8c4df58444a8dc91b093e50c0d76b0ef54eb715b4c8fc`; 469 data rows plus header), expanded from the frozen 212 half-open intervals with y, x, owner 7134, source-feature ID and original interval ordinal. Using those exact keys, I applied their native cell centers to the source's 11 original features. The native rule is N=262166, longitude `-180 + 360*(x+0.5)/N`, and latitude from row y of the retained little-endian float64 table (decoded SHA-256 `66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23`, retained at the native-grid-fidelity input pin). Polygon exteriors and holes use even-odd point-in-polygon; exact binary64 segment contact is boundary, with no epsilon or snapping.

| Frozen source feature | Feature ID | geoBoundaries shapeID | Original keys | Own source polygon: inside / boundary / outside | Other-feature center contacts |
|---|---:|---|---:|---:|---:|
| A'ana | 65870 | 40696546B36446689180219 | 90 | 90 / 0 / 0 | 0 |
| Aiga-i-le-Tai | 65871 | 40696546B9385579031596 | 6 | 6 / 0 / 0 | 0 |
| Atua | 65872 | 40696546B40781349975951 | 88 | 88 / 0 / 0 | 0 |
| Gaga'emauga | 65874 | 40696546B45584224409911 | 5 | 5 / 0 / 0 | 0 |
| Gaga'ifomauga | 65875 | 40696546B1701315009328 | 20 | 20 / 0 / 0 | 0 |
| Palauli | 65876 | 40696546B72194673836531 | 81 | 81 / 0 / 0 | 0 |
| Satupa'itea | 65877 | 40696546B5747120083880 | 22 | 22 / 0 / 0 | 0 |
| Tuamasaga | 65878 | 40696546B29543190564601 | 42 | 42 / 0 / 0 | 0 |
| Va'a-o-Fonoti | 65879 | 40696546B90373058224054 | 2 | 2 / 0 / 0 | 0 |
| Vaisigano | 65880 | 40696546B98223692696505 | 113 | 113 / 0 / 0 | 0 |
| **Total** |  |  | **469** | **469 / 0 / 0** | **0** |

This establishes only representative-point contact with the retained source's own geometry. It is not a full-cell intersection/coverage test, no repair test, no owner assignment, no proof of source applicability, and no inference from point contact to physical or legal status.

## Official legal/Fono evidence and adverse outcomes

The official Attorney General consolidation of the Electoral Constituencies Act 2019, No. 11 (version as at 2023-12-31; PDF SHA-256 `5711f7cff46a7acdb64a2699e6f5396b733ebbc193c83f220d431a8ea633e515`) names 51 electoral constituencies and lists their villages/sub-villages in §2 and the Schedule. Section 3 provides a process to review electoral-constituency boundaries; §5 confines transitional use to electoral-roll and candidate-nomination purposes. The 2020 amendment notes list changes to §§1, 2 and 5, not a Schedule map. The Schedule is a dated name list, not a general administrative polygon source or a key-level crosswalk.

Specific adverse name-level results: A'ana is split across Aana Alofi 1–4; Gagaemauga across 1–2; Gagaifomauga across 1–3; Palauli across 1–3; and Vaisigano across 1–2. Aiga i le Tai, Satupaitea and Vaa o Fonoti have near-matching electoral labels with orthographic differences. The Schedule has no exact constituency named `Atua` (its Anoamaa entries are not assigned to the frozen Atua feature) or `Tuamasaga`. It also lists a village named Vaisigano under Vaimauga 3. No similar spelling, subdivision, or same-name occurrence is treated as a boundary join. See the cited primary PDF and prior schedule application in the task evidence.

The official Village Fono Act 1990, No. 3, consolidated as at 2023-12-31 (Attorney General PDF SHA-256 `3720db996e9fb5ce05ccd67578e92ab33becbdd0ee7981982a0a1f963d142419`), §3(1) requires the Ministry CEO to keep an up-to-date register naming villages where a Village Fono is functioning; §3(5) makes a CEO certificate prima facie evidence of an entry. The checked official text contains no names, schedule, boundary description, map or coordinate annex. The AG consolidation index links the Act but not the §3 roster. The distinct §5D public register concerns village rules/resolutions, not Fono village boundaries. The bounded official-domain index queries recorded in the prior source note surfaced no §3 register/catalog item. The recorded index queries were `site:mwcsd.gov.ws "village register" Samoa Fono`, `site:ag.gov.ws "register of all villages" "Village Fono"`, and `site:parliament.gov.ws "village fono" register Samoa`; none identified the roster. This means the ten labels' actual §3 register status cannot be determined from the checked sources, including for Atua and Tuamasaga; it does not establish register absence or non-recognition.

The retained official MNRE Spatial Information Agency page identifies the Mapping Section as maintainer of the National Base Map, lists official 1:50,000 base maps and a Political Map, and names Geographic Names Board functions concerning administrative boundaries. It did not expose an item-level Political Map file/layer, geographic-unit definition, vintage/effective date, native CRS or reuse statement. Thus this is evidence of a competent map service, not a joinable current or historical district/Fono layer. The previously identified 2011 census-boundary catalog page returned HTTP 403; that denied route was not retried or replaced. No other census geometry is inferred.

## Rights, physical evidence, and recommendation

The frozen source metadata records CC BY-SA 3.0 Unported, source Wikipedia, represented year 2018; `licenseSource` and `boundarySourceURL` are generic Wikipedia File links and `licenseDetail` is `nan`. The geoBoundaries CC BY 4.0 derivative/code notice does not substitute for the source-specific grant. The exact underlying Wikimedia file, rights holder and complete source-level permission chain remain unverified. Preserve the recorded terms/attribution as a declaration, not independently verified legal clearance. The represented year does not establish a legal effective date.

The prior packet's retained block-34 mask join records all 469 original keys as land/physical-support and zero water overlap; it is a retained product-mask result, not independent physical-target evidence or a current whole-cell source coverage result. No independent WSM physical-target or whole-cell-support analysis was performed here. The prior full-package owner observation remains at its historical pinned commit and is not rerun or presented as current-main evidence.

**Proposed disposition for root review:** keep the existing 469-key/212-interval denominator and propose documented-unresolved for all 469, with zero new repairs, owner changes, hold removals or credit. The bounded candidate geometry check is positive at all key centers, but the available sources do not support the package contract's source applicability, legally meaningful crosswalk/current effective status, complete territorial/competitor treatment, or physical whole-cell interpretation. The electoral Schedule is not a substitute, §3 register contents are unavailable in checked official materials, and the recorded source rights/lineage remain unverified. This is a reasoned, bounded qualification failure on this exact package—not a claim that no official layer/register exists anywhere, and not a universal-modern-authority certificate requirement. Root retains acceptance/accounting; nothing in this proposal changes live state.

Primary citations: [Electoral Constituencies Act 2019, No. 11, official AG PDF](https://www.ag.gov.ws/wp-content/uploads/2024/02/Electoral-Constituencies-Act-2019.pdf); [Village Fono Act 1990, No. 3, official AG PDF](https://www.ag.gov.ws/wp-content/uploads/2024/02/Village-Fono-Act-1990.pdf); [AG Consolidation of Laws of Samoa 2023](https://www.ag.gov.ws/consolidation-of-laws-of-samoa/); [MNRE Spatial Information Agency](https://www.mnre.gov.ws/?page_id=260).

Refs #2617

