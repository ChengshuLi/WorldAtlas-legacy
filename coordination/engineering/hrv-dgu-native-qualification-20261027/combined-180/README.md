# HRV 180-key additive authority-composition preparation

This packet composes two already prepared, disjoint native-authority groups using the repository's existing `compose` operation. It is preparation evidence only: it does not contain a finalized startup bank, a conservation result, hosted controls, scientific acceptance, or a delivery claim.

## Scope and bindings

- Original HRV repair-evaluation denominator: 35,738 keys.
- Previously accepted: 32,928 keys (unchanged; not recounted here).
- Separate candidate groups: Zadar 77, Arta Vela 53, and Leveraka 50; exact disjoint union: 180 keys.
- The six strict-adverse keys remain outside this candidate. They are not absorbed into either group.
- Sorted `[owner,y,x]` tuple-union SHA-256: `3a9708cdb72a1acb088e6d252a48cbbfe15851a74f0b36c183d36b6c35050bae`.
- Composition selector is the exact accepted main snapshot `29e4d7c2d4215345f76cef695db93b4120e48114`, path `data/ownership-selection.json`, SHA-256 `524264e9b3e31ae09fbee2b5d8aafac7b8301109a7828fc3b57ef71228492dbd`.
- The current-owner observation is bound to that same accepted main snapshot; all 180 have effective selected owner zero in that observation. This is a snapshot observation, not scientific qualification or credit, and must be refreshed if the accepted selector/bank changes.

## Separate source and qualification records

The Zadar 77 group retains its own source-evidence, native diagnostic and constructor outputs under `../../hrv-zadar77-native-qualification-20261027/`. Its original 560-feature source family is the complete 2021 HRV ADM2 simplified body; full-resolution geometry is not substituted. Family-level “Municipality/town” metadata and island-level primary context are retained as separate assertions; no modern legal crosswalk or semantic reclassification is claimed.

The Arta Vela/Leveraka 103 group retains source, physical, native diagnostic and constructor outputs in `../arta-vela-leveraka-103/`. The recorded original source IDs/index bindings are retained. Whole-target issue and mask context remain in the source packet. The 103 center issue-geometry application reports no witness hits for the queried centers; this is not whole-cell or whole-target clearance. The Act names Arta Vela and Levrnaka separately; no equivalence between exact source feature `Leveraka` and `Levrnaka` is asserted. The administrative-family role metadata remains open for root adjudication.

The composed authority registry has two entries, one per group. The original authority preimages, source bindings and completed constructor ledgers remain independently pinned; composition does not merge the source-role claims or turn either into accepted ownership.

A finalizer config was prepared but not invoked: `finalize-config-001-29e4.json` (SHA-256 `6f2c8552c6afef827df245cb32d5585a6aa5cd3f30669d3ad4c2402c2ece2f3d`). It binds selector and package-input pins at accepted main `29e4d7c2d4215345f76cef695db93b4120e48114` and the composed registry at commit `515ce42248bd8334fc6f1391187fc7089e55283f`. If accepted selector/package inputs advance, regenerate and verify the exact config against the actual current main before use. The composition and config hashes are recorded in `MANIFEST.json`.

## Required next controls

Before any candidate is delivered, rerun the bounded finalizer against the actual then-current accepted bank, verify exact roster and bidirectional tree/index equality, run the full native conservation comparator and applicable build/emitted controls, and obtain current-pair review. Do not reuse the 29e4 owner observation if main advances with an affected selector/bank. Preserve the prior accepted bank and all source/physical/native evidence. Root scientific acceptance is separate.
