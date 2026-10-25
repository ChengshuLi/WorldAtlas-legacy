# Engineering acceptance reference — detailed acceptance guidance

GitHub Issues is the single source of truth for TODOs, status and dated work history: [open issues](https://github.com/ChengshuLi/WorldAtlas/issues?q=is%3Aissue+is%3Aopen+label%3Atype%3Aengineering). This file retains detailed scope/acceptance references; its legacy ENG/RES IDs identify migrated issues, not a live checklist.

This document defines engineering acceptance scope, not current tasks or system state. Historical-content research has separate criteria in [HISTORY_RESEARCH_ACCEPTANCE.md](HISTORY_RESEARCH_ACCEPTANCE.md). Use accepted `AGENTS.md` and current role/technical contracts; read live release state only when required for an authorized operation. No receipt or task note grants write permission or creates a baseline migration/rehearsal requirement.

Use GitHub Issues for current status. A source checkpoint, candidate, structural pass or inventory does not establish deployment or semantic completion. Completion requires retained evidence, validation and actual publication receipts when applicable.

## ENG-01 — dated footprint rendering and caches

- Connect reviewed immutable footprint versions and dated selection to the Worker/browser snapshot, resolver eligibility, grid loading, picking, fills, borders and cache keys. Verify the complete browser path and consumers against this acceptance before any release claim.
- Reuse the loaded canonical ownership assets during zoom, pan and resize. Change cached grid versions only when a sourced footprint/inventory change requires it. Prevent stale evidence or withdrawn records from returning across version changes.
- Verify dated transitions, missing/unavailable versions, withdrawal authority, whole-location values, and preservation of reference/predecessor geometry before publishing the capability.

**Why:** dated names or membership cannot establish a historical land shape; a changed footprint must not silently inherit evidence for a different territory.

**References:** [FOOTPRINT_VERSION_CONTRACT.md](FOOTPRINT_VERSION_CONTRACT.md), [HOSTED_TEMPORAL_GEOGRAPHY.md](HOSTED_TEMPORAL_GEOGRAPHY.md), `hosted/footprint-versions.js`, `src/data-client.js`, `data/validation/neon-final-publication.json`.

## ENG-02 — install three validated hierarchy candidates

- Install the prepared Monaco/Luxembourg grouping corrections and West Virginia duplicate-province correction through a coherent reviewed geographic release.
- Update every dependent hierarchy/catalog/grid-parent lookup and manifest; preserve all original IDs, predecessor relationships, geometry and historical evidence. Revalidate dependent prepared evidence explicitly rather than silently repinning it.
- Publish and verify matching map, inspector, parent boundaries, complete chains, migration accounting and before/after hashes.

**Why:** partial hierarchy/catalog/grid integration can make reference assets and parent lookups disagree.

**References:** [REFERENCE_HIERARCHY_CORRECTIONS.md](REFERENCE_HIERARCHY_CORRECTIONS.md), `data/reference-hierarchy-corrections/migration-receipt.json.gz`, `scripts/prepare-reference-hierarchy-corrections.py`.

## ENG-03 — geographic repairs and worldwide review closure

- Work continent → subcontinent → region → area → province → location, accounting for every branch and source profile. Retain the exhaustive current inventories; do not approve children merely because a parent's boundary is supported.
- Obtain source-backed decisions for flagged granularity, city fragments, administrative remainders, islands/land gaps, repeated tiers and physical boundary conventions. Historical researchers may supply evidence; maintainers own correction implementation and geographic release acceptance.
- Resolve the blocked Namibia replacement's neighboring-source conflicts and unexplained land before installing it. Keep unresolved cases visibly open; no arbitrary clipping, nearest-territory assignment or count quotas.
- For each accepted repair, preserve identities/history, crosswalk every changed unit, rebuild affected derived products, validate coverage/overlap and publish matching receipts. Close semantic reviews only with a sourced decision or justified exception.

**Why:** complete database chains and exhaustive screening do not prove globally sensible granularity or source completeness.

**References:** [GLOBAL_SEMANTIC_CLOSURE.md](GLOBAL_SEMANTIC_CLOSURE.md), [REGION_SEMANTIC_REVIEW.md](REGION_SEMANTIC_REVIEW.md), [NAMIBIA_REPAIR_MIGRATION.md](NAMIBIA_REPAIR_MIGRATION.md), `data/geographic-semantic-followup`, `data/global-semantic-closure.json.gz`.

## ENG-04 — physical mobile performance

- Measure initial load, decoded/GPU memory, frame times, pan/zoom, resize and fallback rendering on actual phones. Preserve device/browser specifications and measurements; viewport emulation is not physical-device evidence.
- Address measured bottlenecks while preserving fixed ownership, readable thin-local/bold-parent borders, selection correctness and zero navigation ownership recompilations/uploads.

**Why:** the ownership array is approximately 232 MB on the CPU, with a comparable GPU copy. Existing desktop/software-renderer tests cannot establish phone memory capacity or responsiveness.

**References:** [FINAL_GRID_ASSESSMENT.md](FINAL_GRID_ASSESSMENT.md), `data/final-grid-rendering-review.json`, `data/validation/neon-final-live-browser.json`.

## ENG-05 — operational limits and measured growth

- Confirm the actual Neon project plan, storage/compute allowances and backup/restore retention, and separately document object-storage limits. The configured 512 MiB guard is not the provider quota.
- Verify useful capacity warnings and recovery instructions. Measure representative import/query latency, row/index growth and backup performance before sustained expansion.
- Introduce partitioning, caching or larger-media multipart transport only when measured requirements warrant it, behind the existing stable IDs and content API. Keep all declared factual tables, owner-only migration state and object bytes covered by appropriate backups.

**Why:** research can exhaust finite storage or compute even though the provider scales. Content threads must not need infrastructure changes or UI rewrites to continue ordinary imports.

**References:** [CURRENT_POSTGRES_RECOVERY.md](CURRENT_POSTGRES_RECOVERY.md), [HOSTED_STORAGE_ARCHITECTURE.md](HOSTED_STORAGE_ARCHITECTURE.md), [STORAGE_EXPORT_V2.md](STORAGE_EXPORT_V2.md).
