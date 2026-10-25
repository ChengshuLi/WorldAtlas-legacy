# Historical-content handover for Luna

This lane researches dated attributes for approved territories. Boundary/hierarchy/source suitability research uses [GEOGRAPHY_HANDOFF.md](GEOGRAPHY_HANDOFF.md) and `type:geography`; it can also run on Luna if the user chooses. Engineering owns executable geographic migrations and publication. Neither research lane bypasses complete published regional approval for location-attribute imports.

Give a Luna thread this document and [its prompt](prompts/LUNA_HISTORY.txt). They explain current source-research scope, preserved content contracts and historical import context. **GitHub Issues is the single source of truth for TODOs, status and work history**: [open historical-research issues](https://github.com/ChengshuLi/WorldAtlas/issues?q=is%3Aissue+is%3Aopen+label%3Atype%3Ahistory-research). This document contains no live task checklist.

M engineering and N history workers must read [WORKER_COORDINATION.md](WORKER_COORDINATION.md), choose one bounded work item and record worker ID, branch and scope in an ordinary issue comment, and use the merge queue. Umbrellas are split into bounded children and never reserved by one worker.

Repository: https://github.com/ChengshuLi/WorldAtlas, integration branch **main**. Verify latest accepted main on start/resume and follow current `AGENTS.md` and [worker coordination](WORKER_COORDINATION.md) before applying any saved handoff. The former owner-private Site is retained for recovery, not the normal serving/import target. Read [scope guidance](HISTORICAL_RESEARCH_TODO.md), [LUNA_DATA_HANDOFF.md](LUNA_DATA_HANDOFF.md), [RESEARCH_IMPORT_WORKFLOW.md](RESEARCH_IMPORT_WORKFLOW.md), [ATTRIBUTE_CONTRACT.md](ATTRIBUTE_CONTRACT.md) and [PARALLEL_WORK_PROTOCOL.md](PARALLEL_WORK_PROTOCOL.md) for preserved research contracts and history; dated platform notes do not authorize current operations.

## Current gate and operation authorization

Engineering audits and publishes completely reviewed regional branches inside the fixed scopes in `data/macro-foundation/regional-handoffs.json.gz`. The accepted-main `data/research-geography-gate.json`, exact regional certificates/release pins and current operation authorization determine eligibility; read them for the assigned subjects before deciding whether any import is authorized. Until all applicable approvals and operation authorization are verified, do lawful research and owned evidence staging only—do not run live imports, use private service credentials or treat a dry run as approval. Content imports require explicit region IDs and closed macro/regional approval dependencies. Do not design geography or bypass the gate. Read [GEOGRAPHY_RESEARCH_READINESS.md](GEOGRAPHY_RESEARCH_READINESS.md) from current main.

## Preserved starting point and content contract

The dated Site 18 checkpoint recorded production Neon PostgreSQL/R2 capabilities, bounded validation, immutable claims and idempotent imports; it is historical, not a current connection or import instruction. It retains ownership/environmental products, 3,588 dated names, 396 religion records, 9,301 separate-settlement estimates and original archives. Preserve completed research. Interrupted GHSL preparation is not validated import content. Never infer current service, target or write permission from that checkpoint.

Store supported sparse half-open intervals, not annual snapshots. Keep stable entity IDs, original source bytes/hashes, licenses, methods, uncertainty and fixed classifications. Missing evidence remains unknown. Present-day physical reference context is separately labeled; it is not historical evidence and cannot justify widening observation intervals. Research gaps such as 2025 using actual sources.

## Select a campaign and preserve evidence

1. Inspect labeled GitHub Issues, comments, active PRs and campaign directories before choosing a disjoint geography/time/attribute/source scope. Post your worker ID, branch, bounded scope and sources in the existing issue discussion; the parent coordinates overlap, and ordinary authoring needs no machine claim workflow. Worldwide objectives remain open until their complete coverage is evidenced; use linked child issues when useful.
2. Create a unique **`research/<campaign-id>`** branch from fresh `origin/main` in an isolated checkout/worktree. You own **only `research/campaigns/<campaign-id>/`**. Do not edit shared handovers, code, schema, infrastructure, category registries, grid assets or geographic releases. Research factual JSON and notes using existing tools; refer engineering blockers to a linked engineering issue.
3. Keep original inputs, lawful source bytes/restoration manifests, bundles, release pins, partial/final receipts and read-back in the campaign directory. Record progress in the existing issue/PR discussion; no duplicate progress JSON is required.
4. Unless the accepted-main gate, exact certificate/pins and operation authorization permit the exact action, assignments are evidence research/staging only; do not obtain private API access or credentials based on this handoff. Preserve exact source vintage, IDs, scope and limitations in the owned evidence directory.
5. Stage supported factual proposals and any offline validation output without importing. Keep unsupported territory/interval conclusions pending, preserve partial work and report uncovered scope honestly.

Offline staging example after saving factual input and any already-retained release file required by that assigned task:

```sh
node scripts/prepare-research-bundle.mjs research/campaigns/CAMPAIGN/input.json research/campaigns/CAMPAIGN/geographic-release.json research/campaigns/CAMPAIGN/bundle
```

Replace `CAMPAIGN` with your unique ID only when offline staging is part of the assigned scope. The compile step does not establish a current release, regional approval, import permission or truth. No live import command is provided here; a live operation must use a separately accepted, current operation contract. Dated endpoint/import commands in the legacy platform handoff are not current instructions.

## Incremental PRs and preserved import history

Push evidence frequently and open a focused PR to **main** addressing a coherent outcome. Related issues may share a PR. Link related issues as useful; close only acceptance actually completed. Include source/import/read-back evidence and unresolved questions. Follow applicable Codex PR attachment instructions. Maintainers integrate validated PRs serially with **squash merges using the PR title as commit title**. After each merge, branch afresh from current main; preserve earlier campaign directories and link them rather than modifying another campaign's files.

Historical import receipts and Git merges are separate records; do not infer a current write or repeat a historical operation. Preserve old receipts and exact pins. Any operation needs an explicitly approved region/campaign and a current accepted operational contract naming its authorized route. Do not silently repin or weaken constraints.

## Work history and handover

Update the issue at milestones with dates, actual coverage, evidence, blockers and next action. Retain closed issues and original raised/recorded/completed dates. Human work dates use America/Los_Angeles; receipts retain exact UTC timestamps. Unknown earlier dates remain unknown; completing one batch does not close a worldwide objective.

Before ending, push every source note, input and staging artifact needed by a fresh thread. Report issue, branch/commit/PR, research evidence and remaining questions; cite historical import/read-back only where relevant, without implying a new operation. Keep this document as instructions, not a parallel TODO tracker. Original records are preserved in [the pre-Issues archive](archive/pre-github-issues-20261002/README.md).

<div hidden aria-hidden="true">

<!-- Empty legacy markers retained for the trusted pre-migration PR guard only. No tasks are tracked here. -->
<!-- RESEARCH-CAMPAIGNS:START -->
| ID | Scope | Status | Raised | Recorded | Completed | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
<!-- RESEARCH-CAMPAIGNS:END -->

</div>

## Issue lifecycle accuracy

Read [ISSUE_LIFECYCLE.md](ISSUE_LIFECYCLE.md). Authors reconcile original acceptance and next actions before moving on; reviewers check closure/continuation independently of merging. Dependency owners maintain direct dependents. Coordinate encountered overlap and remaining work on the original issue; preserve scientific/publication gates. No readiness script or routine queue-triage pass is required. Existing chats refresh before their next job; Main handles exceptional decisions.

Read docs/AUDIT_FAILURE_PREVENTION.md on current main before the next job or review. Identify the consequential acceptance claims and independently test applicable consumed-input/code, identity/join, source/method, safe-reproduction, nonvacuous-control and operating-limit invariants. Use shared evidence helpers or an explicitly reviewed equivalent; reviewers derive expectations from original acceptance and independent records before relying on author tests. Exercise real entry points and adjacent paths for corrective PRs; record unexecuted proof as a limit. Keep exact-head review, original evidence, scientific/publication gates and focused research CI. Adoption requires actual subsequent handoffs, not just this prompt edit.

## Prepare for the first review

Follow [AUTHOR_PREFLIGHT.md](AUTHOR_PREFLIGHT.md) before the next job and before
requesting its first review. Select the checks implicated by the original acceptance
and changed behavior from the start; preserve source-only focused CI. Resolve quick
ownership/evidence errors before review, while long regressions and substantive
independent review may proceed in parallel. The guide supplies practical helper and
command details, meaningful adverse cases and existing-chat refresh text; author
preflight does not replace independently derived reviewer expectations.
