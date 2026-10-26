# HRV DGU-context candidate: original-source physical qualification

This is preparation for the original `gb-HRV-ADM2--repair-evaluation` package, not accepted source adoption, assignment, credit, or a selected-bank change.

## Scope and role choice

The original positive source remains the complete 2021 geoBoundaries HRV ADM2 family. The 2025/26 Croatian DGU local-government register is a later, distinct administrative context used to select a candidate subset; it is not substituted as the positive provider. Of the original 35,738 land keys, 28,885 lie strictly inside a uniquely name-and-expected-county matched DGU 3rdOrder unit and have no original HUN/SVN source contact. The excluded cohorts remain explicit: 197 expected-unit keys with HUN/SVN contacts, 4,905 keys in other DGU units, and 1,751 outside/unmatched. DGU export completeness remains uncertain because the GML's `numberReturned`/`next` metadata conflicts with its actual member count. No DGU raw body or coordinates are included here.

## Original-source physical witness

`physical-001/whole-target-support.json` is the completed first-time whole-target physical comparison for the 167 original HRV ADM2 features associated with the 28,885 candidate keys. The exact original source shapes, not DGU geometries or synthetic mask polygons, were supplied to the accepted physical helper. Inputs and runtime are pinned in `config/physical.json` and `physical-preparation/input-bindings.json`; the accepted comparator and complete GSHHG operands remain pinned there. Output SHA-256: `96f764200423b1d67f7fb1cbfb2d1ad1ee227bf6a648dc80b0f3e0b239a4c88f`; execution-receipt SHA-256: `7b8466340bb91c71f09be072cd7f1aba6f6bdb502ddb8cf973c7f51b5f3c3f42`.

The 167 whole-target results include 123 with no reported issue and 44 with issue geometries (41 `extra_reconstruction`, 36 `missing_reconstruction`, 2 `contradictory_land_water_support`, 2 `L2-outside-L1`; reasons can co-occur). Among the candidate keys, 19,466 belong to targets with no reported issue and 9,419 belong to targets with issues. These counts do not resolve whether an issue intersects an exact requested center; the native diagnostic must apply the exact pinned issue/support geometry to candidate keys. No whole-target or package-wide clearance is claimed.

`physical-dgu-001` was also run before the source-role distinction was clarified. It is a separate, private contextual comparison on DGU polygons, not the physical witness used for the original-positive-source path. Its outputs remain local, are not inputs to the original-source constructor, and do not authorize DGU adoption.

## Candidate-only native input

`native-patch-001/native-patch.json` contains only the 28,885 exact original owner/y/x keys in the DGU expected-unit, no-foreign-contact subset. It is derived from the original interval scope and the private DGU application; key SHA-256 (sorted `[owner,y,x]`, no trailing newline): `e8cad624cd3434ffa4d007a86482a93aa86f8cb1fbbf640136ec4dc1804b5947`. Patch status is candidate-only. All other original rows and all HUN/SVN contacts remain outside this candidate patch and must remain in the full package denominator/holds.

DGU source-role context and limitations are recorded in the source-free assessment at `/workspace/shared/worldatlas-HRV-DGU-35738-source-application-20261026.md` (SHA-256 `ebce985821995558b85f21572c4649205655a772ce2df9050b054d58f0539266`). Its acquired geometry and full per-key DGU application remain private. No current selector, owner, source-contact, or bank state was changed.
