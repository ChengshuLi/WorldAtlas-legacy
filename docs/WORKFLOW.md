# Work, review and integration

Use this guide for ordinary repository work. Current accepted `main`, the task's explicit scope, and higher-priority user/safety limits govern. A prompt, old checkout, issue, label, branch name, or past handoff is not authority. Before resuming or declaring a procedural blocker, verify current `main` using the supported repository route and read its relevant `AGENTS.md` and domain contracts. Do not reset or overwrite a dirty primary checkout.

## Scope and ownership

The assigned worker owns its task branch, declared paths, and evidence. Record the exact task, worker identity, branch/head, scope, overlaps and planned checks in the existing task/PR/issue conversation. A GitHub account or shared checkout does not establish identity or independent review. Coordinate before expanding scope or changing a shared artifact; keep parallel work disjoint. A specific end-to-end package assignment may include engineering, science and delivery steps, while a general evidence-only geography assignment does not. Neither grants general production authority.

Issues track scope, dependencies, progress and acceptance history; PRs track implementation and review. Reuse an existing issue or PR when relevant; ordinary authoring does not require a machine claim/readiness step or an issue created solely for helper work. Labels and branch prefixes are navigation, not authorization. Distinguish research, unresolved recommendations, technical preparation, delivery, scientific acceptance, merge, live publication and issue completion.

## Evidence and review

Report useful milestones with exact branch/head, work/results, checks run, remaining work and concrete blockers. Preserve original denominators, source restrictions, uncertainty, adverse cases and immutable evidence pins. A timeout or transport failure is not a source denial; an actual denial must not be bypassed. Do not repeat expensive work without a material input or acceptance need.

Every PR needs a coherent scope and substantive independent review of its exact head. Review source applicability and actual changed behavior, not summaries alone; preserve caveats and failed outcomes. A review, test pass or merge does not grant scientific credit, source qualification, import permission or production authorization.

## CI and merge

Use the trusted worker-merge workflow and the documented `scripts/merge-integration.mjs` client for current-base checks, applicable test selection, preparation, dispatch and terminal reconciliation. Do not create a parallel queue, invent a test roster, or treat a preview as acceptance. Recheck the exact base/head immediately before request; reconcile the canonical terminal receipt and resulting accepted `main`. Report unrun checks and failures honestly. See [CI and validation](VALIDATION.md) and [workspace controls](WORKSPACES.md).

For routine read-only observation, use bounded provider reads and avoid rapid polling. The canonical read/watch forms are:

```sh
gh api --cache 60s repos/ChengshuLi/WorldAtlas/actions/runs/RUN-ID
gh api repos/ChengshuLi/WorldAtlas/pulls/PR-NUMBER
gh run watch RUN-ID --interval 60 --exit-status
```

The accepted helper owns request accounting, retry behavior and any operation deadline; these examples do not authorize a dispatch or additional retry.

## Role routing

- Engineering: application, schema, infrastructure and integration changes; apply the data and validation contracts.
- Geography: source-backed boundary, hierarchy or physical-reference research; an evidence-only role cannot change shared geography or import data.
- History: dated factual research and content proposals; absent evidence remains unknown.
- Issue intake: accurately record the user's request and provenance without claiming implementation or approval.
- Auditor: inspect already-merged work against its assigned scope; do not restart a completed campaign by default.
- Publisher/operations: perform only the specifically authorized live operation and destination, using [operations](OPERATIONS.md) and [recovery/security](RECOVERY_SECURITY.md).

Role boundaries describe ordinary lanes. Follow the explicit assigned task when it names a broader package, and combine the applicable engineering and scientific safeguards without granting broader authority.
