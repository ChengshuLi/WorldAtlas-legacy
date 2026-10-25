# ETH ADM2/ADM3 license provenance supplement

**Result: the conflict remains unresolved, but it is now grounded in the exact original archives and an archived publisher declaration.** It was not introduced by WorldAtlas's metadata transcription. No inspected passage documents a data-versus-documentation split, an original-versus-adaptation license split, or a provider-edition change that explains the two fields.

This supplements the SDN full17-source notice and the existing review handoff. It does not replace any original declaration, choose a license, clear redistribution, change a source role or alter geographic/physical/native/authority inputs. All source-policy and special Halaib/Fashaga/Abyei distinctions remain intact.

## Exact original bodies inspected

The authenticated geoBoundaries `9469f09` sourceData descriptors and downloaded ZIP bodies match byte-for-byte:

| Original archive | Bytes | SHA256 |
|---|---:|---|
| ETH ADM1 | 349,880 | `2c6f3e29af991644ca2cb23e11cd4153780eeaa50f4f0553998c56e383b178e6` |
| ETH ADM2 | 402,912 | `068dbf1674006bc43000f7078c08bba7e2ec0e9e5aa4e9efd69dc556c04c93b9` |
| ETH ADM3 | 1,028,628 | `cbfea4415a67ea34c7df0bf437f28a1d435d80d449642460fd947ae2b15950e3` |

Paths are `sourceData/gbOpen/ETH_ADM1.zip`, `ETH_ADM2.zip` and `ETH_ADM3.zip` in [wmgeolab/geoBoundaries at the consumed revision](https://github.com/wmgeolab/geoBoundaries/tree/9469f09/sourceData/gbOpen). This establishes the exact source archive edition, not equality between its shapefile and the consumed simplified GeoJSON. Actual DBF record counts are 11, 74 and 690. No shape was transformed or tested.

ADM2 and ADM3 each contain nine members: shapefile components, XML and `meta.txt`; neither has a separate license file or screenshot. Their literal `meta.txt` contains:

- `License: Open Data Commons Open Database License 1.0`
- `License Notes: http://opendefinition.org/licenses/cc-by/`
- The same Open Africa/Code for Ethiopia attribution and `https://africaopendata.org/dataset/ethiopia-shapefiles` publisher link.

ADM1 contains ten members, including `license.PNG`. Its `meta.txt` instead declares CC BY4.0, with the same license-notes and publisher links. All three record represented year2016. The downstream consumed declarations faithfully preserve this difference; it is not a later WorldAtlas field join.

## Actual archived publisher statement

The ADM1 archive's `license.PNG` was visually read. It shows the exact OpenAFRICA “Ethiopia shapefiles” dataset, organization Code for Ethiopia, and four resources: Regions, Zones, Woredas, and all administrative boundaries. A dataset-level sidebar labels the license **Creative Commons Attribution**. Its visible catalogue created/updated times are29January2016,04:21/04:26UTC−05:00.

The screenshot does not show a license version or a per-resource license exception. It also does not separate documentation from geometry. Its capture date and the exact original publisher resource checksums are unknown; catalogue timestamps must not be promoted to a proven capture or boundary observation date. The presence of Zones and Woredas on the same captured page is relevant affirmative evidence against assuming the CC BY label concerns only ADM1, but it does not prove that the ODbL entries were erroneous or authorize silently correcting them.

The actual linked [Open Definition CC BY page](https://opendefinition.org/licenses/cc-by/) was read. It is a general CC BY overview, lists multiple versions, and describes content/data applicability. It does not identify the ETH resource's chosen version, supply a second grant, or say that the archive's CC BY reference concerns documentation only. That general page cannot resolve the archive conflict by itself.

## Processing and edition evidence

The original XML files retain related OCHA woreda-processing ancestry and4October2017 assignments of region/zone/woreda names to ADM1/2/3. ADM1 additionally records a24January2018 projection operation. No licensing or redistribution clause appeared in the inspected XML rights/source text, and none of those processing entries documents an ODbL relicensing or a rights split. An adaptation step alone is not evidence of a different license grant.

A bounded GitHub path-history query for the exact ADM2 archive at9469f09 returns the19January2023 `b7dd6a55701c76a330500ad9d9240f2b9997c6a8` commit labelled “Cleared history.” It does not explain why ODbL was selected or expose a resource-specific license-change record. This is a limit of the performed exact-path query, not proof that no older history or maintainer explanation exists anywhere.

## Access outcome and finite remaining question

The first web read of the publisher URL reported a tool-access limitation without an HTTP denial. One ordinary authorized GET to that exact cited URL followed its server redirect to `https://open.africa/dataset/ethiopia-shapefiles` and returned **HTTP403**, terminal session51754 exit22. That route is stopped. No API endpoint, mirror, alternate host retrieval or retry was used to get around the denial. The three GitHub archive downloads completed separately and were verified; no operation is pending or uncertain.

The remaining question is specific: **does an original resource-specific publisher declaration or an explicit geoBoundaries correction establish the intended license for the exact Zones/Woredas edition used in these archives?** No such readable record has been authenticated in this bounded pass. The inspected archived page supports CC Attribution at dataset level, while the original archive metadata still states ODbL. Do not describe these as a documented dual license or a resolved data/documentation distinction. Further broad searching is not necessary to preserve this finite result.

Suggested notice addition: “Original ETH ADM2/ADM3 source archives themselves record ODbL1.0 alongside a CC BY notes link. The companion ADM1 archive preserves the same publisher dataset listing Regions, Zones and Woredas under Creative Commons Attribution. No resource-specific or adaptation-specific license distinction was found in the inspected bodies; both original declarations remain visible and the provenance conflict remains unresolved.”

`original-license-inspection.json` preserves literal declarations, archive/member hashes, XML search limits, actual screenshot observations, source URLs and terminal access outcomes. `ADM2-bounded-path-history.json` preserves the bounded history result. Raw ZIPs and the publisher screenshot remain local research evidence and are not included in the distributable notice supplement. No scientific output or existing Library review bundle was modified.
