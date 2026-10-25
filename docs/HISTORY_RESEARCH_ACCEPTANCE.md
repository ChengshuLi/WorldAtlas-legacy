# Historical research acceptance reference — detailed scope guidance

The location-content approval policy requires engineering's global macro approval and complete published regional branch before imports. Current eligibility is not specified by this historical scope guide: verify accepted-main `data/research-geography-gate.json`, the exact subject/certificate/release pins and explicit operation authorization. Unless those authorize the exact action, limit work to source research and staging. See [TOP_DOWN_GEOGRAPHY_WORKFLOW.md](TOP_DOWN_GEOGRAPHY_WORKFLOW.md), [WORKER_COORDINATION.md](WORKER_COORDINATION.md) and [GEOGRAPHY_RESEARCH_ELIGIBILITY.md](GEOGRAPHY_RESEARCH_ELIGIBILITY.md). Older descriptions of enabled transport describe capabilities, not geographic approval.

GitHub Issues is the single source of truth for TODOs, status and dated work history: [open issues](https://github.com/ChengshuLi/WorldAtlas/issues?q=is%3Aissue+is%3Aopen+label%3Atype%3Ahistory-research). This file retains detailed scope/acceptance references; its legacy ENG/RES IDs identify migrated issues, not a live checklist.

This file defines source-research and dataset-content acceptance scope, not current task status. Follow [HISTORY_RESEARCH_GUIDE.md](HISTORY_RESEARCH_GUIDE.md) and its linked scientific/data contracts. Engineering has separate acceptance guidance in [ENGINEERING_ACCEPTANCE.md](ENGINEERING_ACCEPTANCE.md). Do not edit code, schema, UI, infrastructure, reference geography or grid assets to complete a research campaign.

Prior receipts and prepared products are potential research inputs, not evidence of current write capability or permission. Inspect their retained provenance and declared coverage before reuse. Source research may propose bounded additions; unsupported years and unvalidated outputs remain unknown until separately qualified.

Choose bounded source/geography/time/attribute campaigns. Research all six inhabited continents systematically; maintain explicit coverage and open questions rather than repeatedly selecting only earlier regression examples. Store sparse supported intervals with stable IDs, per-attribute provenance, original hashes, license and uncertainty. Do not generate annual rows, invent missing facts or widen modern observations to ancient dates.

## RES-01 — source inventory and campaign coverage

- Discover reusable public sources by geography, attribute and supported interval; assess license, vintage, precision, spatial unit and uncertainty before importing.
- Inspect current public sources and assigned identity/scope evidence. Reuse stable IDs. Do not seek private API access or credentials from this historical scope guide; any write requires current accepted gates and explicit operation authorization.
- Select and document the next bounded campaign, including its uncovered territory/time/attributes and justified limitations. Continue incomplete campaigns using their retained inputs and receipts.

## RES-02 — historical names and aliases

- Research dated preferred names and aliases at every geographic tier, preserving language, source and supported intervals.
- Keep stable entity IDs through renames. Never rename reference geography or create a new location solely because its label changed. Unsupported historical names remain unknown; the existing UI handles present-day reference context.

## RES-03 — ownership evidence

- Extend or improve historical ownership using direct sourced location evidence and explicit uncertainty, without discarding the existing prepared reconstruction.
- Preserve stable polity/category IDs and precedence over derived evidence. Retain dated boundary collections as source evidence for maintainer preparation when spatial assignment is needed; do not write new geographic algorithms or paint independent polygons.

## RES-04 — population, habitation and rank

- Research censuses, demographic reconstructions and settlement histories. Mark modeled values as estimates, preserving supported precision, method and territorial scope.
- Keep settlement estimates separate from location totals. Do not infer population or rank solely from a modern administrative label.
- Research habitation and rank separately. Use `unsettled` only with evidence of no inhabitants; unknown habitation must not become rural settlement.
- Inspect retained GHSL sources/intermediate results before resuming; import only validated, correctly scoped products. If producer/code changes are required, record the blocker for a maintainer.

## RES-05 — primary culture

- Research supported population distributions or warranted primary-culture attestations with dated culture identities and source qualifications.
- Determine primary culture from supported population shares where available. Do not substitute geographic area shares unless the source warrants that interpretation, or fabricate shares from broad cultural labels.

## RES-06 — primary religion

- Extend the retained observation-year census evidence using supported historical/census sources and stable religion identities.
- Preserve source denominators, mixed/uncertain cases and observation dates. Primary religion requires the source's warranted interpretation; settlement religion is not automatically location-wide religion.

## RES-07 — environmental timeline coverage

- Research documented terrain, river and coastal changes for topography; historical land use/cover for vegetation; and dated observations/reconstructions for climate.
- Use the fixed classifications; preserve original source wording and uncertainty in metadata. Report an unsupported category to a maintainer instead of changing the registry.
- Investigate evidence gaps without widening original records just to remove Unknown. Keep labeled physical reference context separate from historical assertions; potential natural vegetation is not historical land cover.

## RES-08 — sourced memberships and existence

- Research dated parent membership and identity existence when sources support them, using the published `temporal_geography` contract and documented atomic campaign phases.
- Keep reference labels distinct from dated administrative claims. A membership record does not establish changed historical land geometry. Flag required splits/merges/new footprints for the maintainer; browser footprint support remains `datedFootprints:0`.

## RES-09 — interconnected historical subjects and media

- As later campaigns require, research people, events, places, armies, routes, artifacts and sourced relationships using existing generic identities and import collections.
- Retain lawful images/audio/source archives with hashes, licenses, attribution and supported links/intervals through the existing media workflow. Check the current API contract for object limits. New domain interfaces, geometry infrastructure or larger-file transport belong to engineering.

## Completion criteria for a campaign

A campaign is complete only for its explicitly documented scope: validated source input, accepted bounded imports, preserved receipts, claim/source/interval read-back, selected-year checks and recorded remaining uncertainty. A successful import is not proof of historical truth or global coverage. For task coordination, publication and issue lifecycle, use the current canonical workflow documents linked above; this acceptance reference does not duplicate their operating steps.
