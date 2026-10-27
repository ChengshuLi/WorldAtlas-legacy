# HRV 180-key additive authority-composition preparation

This packet composes two already prepared, disjoint native-authority groups using the repository's existing `compose` operation. Its composition and source/physical/native evidence are preserved; a prior successful local finalizer attempt is historical and no current-bank delivery, hosted controls, or scientific acceptance is claimed.

## Scope and bindings

- Original HRV repair-evaluation denominator: 35,738 keys.
- Previously accepted: 32,928 keys (unchanged; not recounted here).
- Separate candidate groups: Zadar 77, Arta Vela 53, and Leveraka 50; exact disjoint union: 180 keys.
- The six strict-adverse keys remain outside this candidate. They are not absorbed into either group.
- Sorted `[owner,y,x]` tuple-union SHA-256: `3a9708cdb72a1acb088e6d252a48cbbfe15851a74f0b36c183d36b6c35050bae`.
- Composition selector was the accepted main snapshot `29e4d7c2d4215345f76cef695db93b4120e48114`, path `data/ownership-selection.json`, SHA-256 `524264e9b3e31ae09fbee2b5d8aafac7b8301109a7828fc3b57ef71228492dbd`.
- The prior owner observation was bound to that same 29e4 snapshot; all 180 had effective selected owner zero there. This is historical after the accepted MDV850 bank advance, not a current-owner claim, qualification, or credit.

## Separate source and qualification records

The Zadar 77 group retains its own source-evidence, native diagnostic and constructor outputs under `../../hrv-zadar77-native-qualification-20261027/`. Its original 560-feature source family is the complete 2021 HRV ADM2 simplified body; full-resolution geometry is not substituted. Family-level “Municipality/town” metadata and island-level primary context are retained as separate assertions; no modern legal crosswalk or semantic reclassification is claimed.

The Arta Vela/Leveraka 103 group retains source, physical, native diagnostic and constructor outputs in `../arta-vela-leveraka-103/`. The recorded original source IDs/index bindings are retained. Whole-target issue and mask context remain in the source packet. The 103 center issue-geometry application reports no witness hits for the queried centers; this is not whole-cell or whole-target clearance. The Act names Arta Vela and Levrnaka separately; no equivalence between exact source feature `Leveraka` and `Levrnaka` is asserted. The administrative-family role metadata remains open for root adjudication.

The composed authority registry has two entries, one per group. The original authority preimages, source bindings and completed constructor ledgers remain independently pinned; composition does not merge the source-role claims or turn either into accepted ownership.

Historical finalizer configs and attempts remain preserved. Attempt 009 successfully generated a local candidate against selector/bank snapshot `253b65b49aae9d04b57071a26a61cc46485e04e8`, recorded append-only in commit `94701f0393f26f8a51f641a6f5cf3a6b144a9a23` at `finalized-combined-180-current-253b-003/`. It is **not** a current-bank delivery: accepted MDV850 bank state advanced at `a8a5c2ee84b174bd7bd8177e34fc24d6d5fd8644`, so this candidate is retained as historical evidence only. The branch restored generated startup/index and selector preimages to accepted main `74b9bd2dcd63fe6578d107a1e32495456bc3ac76` (current bank identical to `a8a5`) and normally merged that main. Current refresh config `finalize-config-007-74b9.json` (SHA-256 `af639d048231130cd6baf68751c7f73a39b3220e4bdd099ddececc937eaf0ef9`) binds selector and package-input locators to `74b9`; it authenticates the accepted MDV850 prior-finalization pair at `a8a5`: preparation 1,156 B / SHA-256 `c2f23b2a32cece930e97e68deadd1da07a2d67b6fb8b26547b2054d80b5eddaa`, startup ownership 49,610 B / SHA-256 `b64a953f432c1d359407f1106cd65b3ca60d81744f4c53e8718067f664e78408`. The refreshed config has not yet been invoked; the 29e4 current-owner observation is historical and must not be reused as current. Current-bank owner observation and candidate refresh remain pending; there are no current hosted controls, delivery, or scientific acceptance claims. Details and private attempt receipts are recorded in `MANIFEST.json`. If accepted selector/package inputs advance again, regenerate the exact config against the actual current main before use.

## Required next controls

Before any candidate is delivered, run the bounded finalizer against the actual then-current accepted bank, verify exact roster and bidirectional tree/index equality, run the full native conservation comparator and applicable build/emitted controls, and obtain current-pair review. Do not reuse the 29e4 owner observation if main advances with an affected selector/bank. Preserve the prior accepted bank and all source/physical/native evidence. Root scientific acceptance is separate.
