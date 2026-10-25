# Verification record

Date: 2026-10-25. Read-only comparison and packet integrity checks for this proposal.

## Frozen scope and 57-key subset

- Original source: coordination/engineering/kna-original-disposition-20261020/kna-disposition.json, source commit 775f0a1eddf8964b81d217d01a801c2b338db9c6, decoded SHA-256 655601821aa5bd2089aa4b1b59397d701541744311d2326e89dfee893e277e7a.
- The immutable disposition declares 305 original land keys, 125 interval rows, owner 7119, and ten source features. Expanding the exact half-open interval rows yields 305 unique keys.
- The four Nevis feature IDs (indices 41039, 41041, 41044, 41046) expand to exactly the 57 rows in nevis-57-key-subset.json: 8 Saint James Windward, 31 Saint John Figtree, 1 Saint Paul Charlestown, 17 Saint Thomas Lowland; 40 interval rows; owner 7119; zero missing or additional keys.
- The 57-row canonical sorted roster SHA-256 is a5d723916b284e5561e563b9950174118cf362bb017da3200684f61f4135cc7e. The adjusted subset JSON file SHA-256 is 562387c241c1e53bf1b5e3266f5bbad8eb7995194694f893eb4f51d97e4cbc1c.

## Evidence reused and output integrity

The four notes under evidence/ were copied byte-for-byte from the KNA task's previously retained research. Their original file hashes are not reproduced as separate output descriptors; Git binds these committed copies. No geometry, legal-source, rights, owner-observation, or ledger analysis was rerun. No raw geometry payload or source coordinates were copied into this packet.

The proposal's feature counts sum to 248 St Kitts source-relative candidate keys plus 57 Nevis researched-unresolved keys, exactly 305. These are proposal classes only; this work changes no owner, disposition, claim, credit, hold, import, release, or historical acceptance. Current per-key accepted/suspended lineage remains unresolved and root-controlled.

## Procedure boundaries

This task read the repository instructions at accepted main 20c049c492cc54d581729690249faf5a1d6969ec, used the pinned current-main allocator with Node v24.19.0 and Git 2.53.0, and posted #2609 scope comment 6397545430 before authoring. No code changed, so no software tests were run. The exact staged diff passed git diff --cached --check. No code changed, so no software tests were run. Stock dispatch is deferred until the coordinator confirms the SGP #2816 native queue is terminal.
