# PER727: IBGE 2025 adverse-source review of the 44-key overlap

**Scope and disposition.** This memo isolates the 44 exact original owner-33741 MRC keys whose native centers are inside both the retained 2023 INEI Loreto department feature and IBGE’s 2025 Amazonas UF feature. The exact 44-key set is identified by the private recovery artifact’s sorted `[owner,y,x]` SHA-256 `41fd83002c8c7fcb63bdba62f5f116fcc13401c1db5b38fa1cb3c89d61f60c7f`; complete 727-key identity/classification data are in `/private/tmp/per727-ibge-amazonas-2025-perkey-recovery.json` (184,091 bytes, SHA-256 `d2b7e413f587e4e025f91fc2c633d22df2693fdf129742155794f5f46447ec31`). Keep these 44 held pending root’s source-role decision. Do not automatically award credit or change ownership.

## Exact partition

The recovered per-key partition is 727 unique keys, 80 inside / 647 outside Amazonas, and 677 inside / 50 outside Loreto department 16; no selected boundary ties. Sorted `[owner,y,x]` set hashes and counts:

- **44** Loreto-inside ∩ Amazonas-inside: `41fd83002c8c7fcb63bdba62f5f116fcc13401c1db5b38fa1cb3c89d61f60c7f`.
- **633** Loreto-inside ∩ Amazonas-outside: `abb508c3ab40ee43a7df168aba88dca644fa00abc933062c80e5fb6faa3515b7`.
- **36** Loreto-outside ∩ Amazonas-inside: `1804bdedbf1ffc7572881fa9cf18285d0f80faf660257188e5a91741ca13639c`.
- **14** outside both: `c1c5156e0d63d98cc61f727e74a26cf4cc691cf0290183f5983178692d3b5745`.

Within the exact adverse 44, **10** have the original Loreto ADM1 source-index contact and **34** have only the MRC target contact in the recorded source arrays (`{3523,48917,49039}` = 10; `{3523,49039}` = 34). Do not conflate this with the broader fact that 15 of all 41 Loreto ADM1-contact keys fall inside Amazonas: that 15 divides into 10 in the 44 and 5 in the separate 36. The 633 outside Amazonas remain a parent-level source-relative observation only; being outside a Brazilian statistical-reference polygon does not establish Peru assignment. The 36 remain among the 50 Loreto-parent-outside keys and held; the 14 outside both also remain held.

## Source role and evidence limits

The original adverse operand is geoBoundaries BRA ADM1 `gb:BRA:ADM1:14911670B46798344041190`, index 3523, whose retained lineage is the 2006 community-map/raster-conversion product rather than a boundary-agency product. It has recorded center contact for all 727 keys, including the 44 at issue. Its retained payload is pinned at commit `b7ca15f8d88241b088699396d3df0ca58a9e0803`, blob `f987c295c2f58f307a510290d692d76069a85c2a`, compressed SHA-256 `bdbbfe8237a365e295858164b70a574001de1fe8d80e1ca14d77297b69a1f9fe`. The original Brazil contact and negative operand remain preserved.

The additional comparator is IBGE’s official Malha Municipal Digital 2025, UF 13 Amazonas (AM), zero-based feature ordinal 18 of 27, geographic SIRGAS 2000 / EPSG:4674. Local archive SHA-256 is `cdbbf05f79153802cbfa74d0c29814cd76a9c0b925aea910c9f04dffc28e6167`; embedded SHP SHA-256 `23a9b54fc2dbfbe46298d3152ed4ccfdb60f9e7f178b00c50526741ecbe142d7`; DBF SHA-256 `4aab0c0312c79f20d42abf1fc4f3fbf6565cda03e288fd82b033ece18a018af6`. IBGE’s 2025 note is retained as PDF SHA-256 `bc88c44624c8852b4796b72b525f9092cd770415403c1a3486a8d48bcefc9e89` and text SHA-256 `fc55c5b182bd9b1a79dfa7a1cf99f67ce8ce1ddb6d4bc3c90013ba77fac6cc14`. It permits reuse/adaptation under CC BY 4.0 with attribution, while expressly limiting MMD to approximate statistical/reference use and disclaiming legal boundary demarcation/characterization.

Thus 44 native centers inside the IBGE 2025 Amazonas statistical-reference polygon are meaningful adverse context for the proposed 677 parent-supported subset, especially because the earlier source-role rationale treated the Brazil contact as historical/contextual. But this comparison is not a legal ruling or an MRC feature overlay; it does not establish current jurisdiction, whole-cell containment, or cell ownership. The other 633 Loreto-parent-inside keys outside Amazonas are not thereby proven Peruvian.

## Preserved limits and accounting

The exact MRC target remains the 2020 IGN/OCHA ADM2 province feature `gb:PER:ADM2:86281439B43857057528938`, owner 33741/Pcode PE1604. The official 2017 INEI roster places province 160400 under Loreto and lists districts 160401–160404; the 2023 INEI parent application still records 677 inside / 50 outside. The 41 original Loreto ADM1 contacts retain their 35-inside/6-outside Loreto parent split. All 727 physical land classifications and whole-target-only flags remain as before. The 50 Loreto-parent-outside keys and 722 other residuals remain held/untouched. The overall denominator remains **10,371 = 8,922 prior accepted + 1,449 residual**. No source, physical, geometry, bank, ownership, status, or credit state was changed by this memo.
