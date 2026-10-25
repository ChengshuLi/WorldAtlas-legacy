# Agent guidance

## Start or resume

Verify the repository's latest accepted `main` through a supported read/fetch. Read that commit's `AGENTS.md` and the current guides/contracts relevant to the assigned lane before treating an older prompt, checkout, task note or issue comment as procedure, and before declaring a procedural blocker. Accepted code and current documentation govern, subject to higher-priority user and safety constraints. Never reset, clean or overwrite a dirty primary checkout to refresh it. Preserve useful historical evidence and scientific pins without inheriting obsolete process rules.

Do not invent readiness/claim prerequisites, disk floors, credentials, rebuilds, ceremonies or unsupported tool behavior. Identify the current code/document and actual failure. Honor real source-access denials and security restrictions; do not route around them.

## Project and evidence

WorldAtlas is a world-history atlas with stable territorial locations, a six-tier hierarchy, whole-location map modes and sparse dated evidence. Preserve original sources, licenses, hashes, methods, identities, predecessor geometry and explicit uncertainty. Use supported half-open intervals with no year zero; do not materialize annual records, infer unsupported facts or silently transfer evidence after a geography change. Application code and factual content are independent.

Geographic reference structure is in `data/world-index.json` and `data/hierarchy.json`; `src/attributes.js` and `src/temporal.js` are shared resolvers; `hosted/` implements the content service; deployed schema migrations in `drizzle/` are immutable. Never regenerate `data/hosted-catalog` from current names/parents. Antarctica is excluded; EU5 counts are scale references, not quotas.

## Authoritative project procedures

- [Worker entry points](docs/WORKER_ENTRYPOINTS.md) indexes the role guides and prompts. It is not a status report.
- [Worker coordination](docs/WORKER_COORDINATION.md) is the sole general workflow for scope, identity, coordination, proportionate verification, review and merge queue.
- [Local workspaces](docs/LOCAL_WORKSPACES.md) defines supported allocation, storage, and guarded release.
- [Merge queue client](docs/MERGE_QUEUE_CLIENT.md) defines supported integration and terminal readback.
- [Pre-merge evidence review](docs/PREMERGE_EVIDENCE_REVIEW.md) and `.github/evidence-policy.json` define applicable review and scientific-evidence contracts.
- Geography proposals do not authorize shared-boundary changes or imports. Check the accepted-main gate, exact certificates/pins and explicit operation authorization; current production/recovery actions use their specific runbook.

GitHub Issues hold current scope, ownership coordination, progress and acceptance history. They do not require a machine claim/readiness workflow for ordinary authoring. Labels and branch prefixes are navigation aids, not authority. Preserve closed issues and original dates; record facts actually verified, and distinguish scientific acceptance, merge, publication and issue completion.

## Validation

Use project-defined validation commands for the changed behavior. `docs/STRUCTURAL_VALIDATION.md` maps validation phases and `scripts/validate-structure.mjs` validates the structural contract. Match prepared products, grid, release and build before publication checks. A source check or green CI is not geographic or historical acceptance. Report unrun checks and limits honestly; do not claim checks that were not performed.
