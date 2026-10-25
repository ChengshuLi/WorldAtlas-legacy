# KNA original-scope source qualification proposal

Date: 2026-10-25. Decision-support proposal for root review on the original package gb-KNA-ADM1--repair-evaluation. It proposes no owner change, disposition change, claim, credit, hold removal, import, or release. Root retains scientific acceptance and accounting.

## Exact scope and history

The frozen package contains **305 unique land keys**, **125 intervals**, one recorded owner (**7119**), and **10 target source features** in native block 028. The separate 154-cell gb-KNA-ADM1--physical-interpretation companion and source review #179 are excluded. The source package is coordination/engineering/kna-original-disposition-20261020/kna-disposition.json at merged PR #2610 commit 775f0a1eddf8964b81d217d01a801c2b338db9c6, decoded SHA-256 655601821aa5bd2089aa4b1b59397d701541744311d2326e89dfee893e277e7a. Its 125 immutable interval rows expand to exactly 305 keys.

The merged PR #2610 documented all 305 keys as unresolved, recorded zero repairs, owner changes, or native holds removed, and left acceptance/accounting to root. The current proposal classifies source evidence by group for review; it does not rewrite that historical stock result, change the current disposition, restore or erase credit, or claim a key-level current ledger comparison. This worker did not read the live accepted-key ledger or determine per-key historical accepted/suspended lineage.

The current worker is 01a171cf-f758-7230-8149-1bed6089a02f, branch geography/kna-source-qualification-20261025 from accepted main 20c049c492cc54d581729690249faf5a1d6969ec. Scope and checks were recorded on original issue #2609 in comment 6397545430. This package remains independent of the other Team 2 queues. Per the coordinator, no stock dispatch is to occur while SGP PR #2816 remains unsettled; keep this proposal prepared until root confirms the serialized queue is terminal.

## Proposed evidence classes

The terms below are **proposal classes for root review**, not accepted science or current boundary findings. A “source-relative candidate” means that the exact frozen center is inside its recorded provider polygon and its feature name has a textual match in the St. Christopher Act. It does not establish a current or statutory polygon, effective date, complete physical support, source rights, or ledger eligibility.

| Class | Frozen source feature | Feature index | Source feature ID | Keys | Evidence class and limit |
|---|---|---:|---|---:|---|
| Source-relative candidate | Saint Anne Sandy Point | 41036 | gb:KNA:ADM1:52472329B96254136738283 | 7 | All centers contact own recorded source feature; Cap. 23.03 §8 has a textual St. Anne, Sandy-Point name/description. No joinable statutory map or effective date. |
| Source-relative candidate | Saint George Basseterre | 41037 | gb:KNA:ADM1:52472329B55778484611891 | 191 | All centers contact own recorded source feature; Cap. 23.03 §2 has a textual St. George, Basseterre name/description. No joinable statutory map or effective date. |
| Source-relative candidate | Saint John Capisterre | 41040 | gb:KNA:ADM1:52472329B65639645183115 | 14 | All centers contact own recorded source feature; Cap. 23.03 §6 has a textual St. John, Capisterre name/description. No joinable statutory map or effective date. |
| Source-relative candidate | Saint Paul Capisterre | 41043 | gb:KNA:ADM1:52472329B35296791475509 | 11 | All centers contact own recorded source feature; Cap. 23.03 §7 has a textual St. Paul, Capisterre name/description. No joinable statutory map or effective date. |
| Source-relative candidate | Saint Thomas Middle Island | 41047 | gb:KNA:ADM1:52472329B72200716330993 | 3 | All centers contact own recorded source feature; Cap. 23.03 §9 has a textual St. Thomas, Middle-Island name/description. No joinable statutory map or effective date. |
| Source-relative candidate | Trinity Palmetto Point | 41048 | gb:KNA:ADM1:52472329B86967002358759 | 22 | All centers contact own recorded source feature; Cap. 23.03 §10 says “Trinity, Palmeto-Point” (statutory spelling difference). No joinable statutory map or effective date. |
| **Subtotal** | **Six St. Kitts groups** |  |  | **248** | **Source-relative only.** |
| Researched-unresolved | Saint James Windward | 41039 | gb:KNA:ADM1:52472329B16958301240037 | 8 | All centers contact own recorded source feature. Cap. 23.03 is St. Christopher-only; NIA parish line is on a working draft, not an adopted joinable boundary. |
| Researched-unresolved | Saint John Figtree | 41041 | gb:KNA:ADM1:52472329B19766585583682 | 31 | Same source-relative contact limit; no adopted effective Nevis boundary or joinable schedule was established by the bounded official-record checks. |
| Researched-unresolved | Saint Paul Charlestown | 41044 | gb:KNA:ADM1:52472329B33869241417022 | 1 | Same source-relative contact limit; no adopted effective Nevis boundary or joinable schedule was established by the bounded official-record checks. |
| Researched-unresolved | Saint Thomas Lowland | 41046 | gb:KNA:ADM1:52472329B68765441097226 | 17 | Same source-relative contact limit; no adopted effective Nevis boundary or joinable schedule was established by the bounded official-record checks. |
| **Subtotal** | **Four Nevis groups** |  |  | **57** | Exact key list: [nevis-57-key-subset.json](nevis-57-key-subset.json). |
| **Total** | **Ten source features** |  |  | **305** | **248 source-relative candidates; 57 researched-unresolved; 0 insufficiently researched in this proposal.** |

No key is split within a feature: the saved native center application reports the same source-contact class for every key in each feature. The exact 57-key subset is 57/57 identical to the four frozen feature groups expanded from the original 125 interval rows. Its canonical sorted-row SHA-256 is a5d723916b284e5561e563b9950174118cf362bb017da3200684f61f4135cc7e; the subset JSON SHA-256 is 562387c241c1e53bf1b5e3266f5bbad8eb7995194694f893eb4f51d97e4cbc1c.

## Source, vintage, and contact result

The retained source is the 14-feature geoBoundaries gb:KNA:ADM1 payload, represented year **2021**, with source-data update 2023-01-19 and build date 2023-12-12. The exact retained compressed payload SHA-256 is 618711a0aee394b225561fa108794b4e2c7bd7530c52ed46f9c0e5b3d3f659ed; decoded GeoJSON SHA-256 is 5d94bc5303f78b68e4f0ba5783611f7c292540e72776aa236c53883560d1ebcd; recorded Git blob is 4157d03fce6f43d7d16e98a83ef4df26c7709b1f. Those dates have different metadata meanings; none establishes an effective parish-boundary date.

The existing native-row-table contact result, saved in [evidence/source-polygon-contact-application.md](evidence/source-polygon-contact-application.md), applies each frozen (x,y) center to its exact recorded feature and the other 13 retained ADM1 features. It uses grid size 262166, longitude ((x + 0.5) * 360 / 262166) - 180, latitude from the exact pinned row table at y (commit 5b32388df0501b013ac9a3ba97864932db493d59, decoded SHA-256 66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23), exact binary64 comparisons and no epsilon. Result: **305 own-feature interiors, 0 boundaries, 0 own-feature outsiders, and 0 contacts with another retained ADM1 feature.** This is center contact with the recorded 2021-represented source polygons only; it does not test full-cell coverage, current physical land surface, territorial exclusions, complete competitors, current legal boundaries, or current owners.

The frozen interval manifest marks all 305 rows as land, and the earlier retained packet reports no water intersection. This proposal has no separate per-key physical-support result beyond those original package records and the center-contact result. It does not claim full cell support or demand it as a universal criterion.

## Legal and rights evidence

The official [Boundaries of Parishes (St. Christopher) Act, Cap. 23.03](https://lawcommission.gov.kn/wp-content/documents/Act02and09TOC/Ch-23_03-Boundaries-of-Parishes-St_-Christopher-Act.pdf) has textual descriptions for the nine St. Christopher parishes, including the six St. Kitts names above. The revised text is shown as at 31 December 2002; its front matter conflicts between “Act 6 of 1773” and “in force 1733.” The instrument text supplies no resolution, effective-date clause, map, coordinates, or joinable schedule. The names support only the bounded textual comparison shown in the table; they do not georeference the retained provider polygons.

The official [Nevis Island Administration proposed village/locality map](https://nia.gov.kn/wp-content/uploads/2026/07/Settlement-Map-3-Draft-1.pdf) depicts the four in-scope Nevis parish labels but identifies itself as a November 2025 working draft subject to verification and modification. The bounded official checks did not establish Assembly approval, an adopted effective parish schedule, or an authoritative spatial bridge to the four frozen source features. This index limit does not prove that no such record exists.

The retained catalogue says CC BY-SA 2.0 and cites the OpenStreetMap copyright page. That page distinguishes OSM data under ODbL 1.0 from OSM documentation under CC BY-SA 2.0; geoBoundaries describes its gbOpen data as CC BY 4.0. The exact upstream source/license mix and the rights applicable to this retained OSM-derived payload remain unresolved. This proposal does not redistribute raw geometry and does not claim rights clearance.

## Accounting and next evidence

The merged #2610 packet is a historical stock delivery/record, not evidence of newly accepted repair credit. The original package disposition remains the accounting object. This proposal has not reconciled all 305 keys to a current accepted-key ledger, determined per-key accepted/suspended ancestry, rerun the historical owner observation, changed original dispositions, or restored/removed credit. In particular, the source-relative classes do not erase any earlier accepted positive if one exists. Root decides accounting and acceptance from the canonical ledger.

Two bounded follow-ups could change the source assessment: (1) retrieve the exact 4.0.0 geoBoundaries KNA archive body through an already authorized binary-capable repository route, verify its digest, and compare the ten exact feature identities with the retained 2023 source; the reviewed record currently lacks that LFS body, and its distinct byte count alone does not prove geometry change; (2) obtain an official dated joinable map/vector/schedule tied to Cap. 23.03 for St. Kitts and an adopted Nevis instrument/map with effective date and an authenticated correspondence to the four exact Nevis features. Independently, any accounting decision requires root's current keyed-ledger reconciliation. None of these gaps is filled by a textual name, draft line, current owner-zero observation, or source-center contact.

Supporting records are in evidence/. Check details are in [verification.md](verification.md). The KNA geometry payload itself is not included because the exact source-rights mix remains unresolved.
