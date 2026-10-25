# Geographic eligibility for historical research

Approve continent, subcontinent and region boundaries globally, then release each complete regional branch independently for location-attribute research/imports. Luna never designs boundaries or hierarchy. See [TOP_DOWN_GEOGRAPHY_WORKFLOW.md](TOP_DOWN_GEOGRAPHY_WORKFLOW.md) for the dependency order and bounded worker scopes.

This document defines the approval contract, not a live status snapshot. Before acting on any region or campaign, read accepted-main `data/research-geography-gate.json`, the exact regional certificate and release pins, and any explicit current operation authorization; do not infer current approval from prose or dated receipts here. The global macro approval and fixed region inventory are documented in [MACRO_FOUNDATION_APPROVAL.md](MACRO_FOUNDATION_APPROVAL.md), `data/validation/global-macro-publication.json` and `data/macro-foundation/regional-handoffs.json.gz`. Regional interior audits may proceed inside those fixed scopes. Until the applicable approvals and operation authorization are verified, limit imports/writes to lawful evidence research and provisional staging; source-only work does not establish a location's territorial meaning. GitHub Issues holds current work scope, dependencies and completion evidence.

## Required approval before location-attribute imports

Engineering records approval in [research-geography-gate.json](../data/research-geography-gate.json) only through a reviewed PR with independently retained evidence. The version-2 gate schema retains `macro_boundaries` and `regions` certificates; inspect the accepted current instance to determine which are approved. Content work items declare `region_ids` and a scope manifest; regional certificates list `approved_location_ids` and `approved_subject_ids` against exact `approved_release` pins. Three layers are required:

1. **Global macro approval:** all six continents, every subcontinent and every region have approved own boundaries/associations and reconciled shared edges, tied to a published release. This does not approve their descendants.
2. **Regional branch approval:** the target region's entire area → province → location branch is reviewed, corrected or justified, validated and published. Its certificate names its stable region ID, exact permitted subject IDs, release/hierarchy/footprint pins, completed approval issue and retained evidence. An approved outer envelope alone cannot authorize London's attributes.
3. **Bounded campaign approval:** the work item names its region, exact subjects, source collection, supported interval and attributes, plus source-territory compatibility evidence. Imports must match the certificate and current release. Completing all worldwide descendants (#7) is no longer a prerequisite for an already approved branch.

The standard research import CLI enforces the recorded macro/regional gate and explicit subjects. A ready label, an open private API, a successful dry run or a complete structural chain cannot substitute for approval. The private service itself is not newly permission-isolated by this repository policy; workers must honor the reviewed workflow. Preserve existing live facts and completed research: this concerns new imports.

Source-only campaigns can run without approval or production credentials. Retain provisional IDs/pins and the source's actual subject. Never turn a settlement or different administrative territory into a whole-location scalar merely because names match. Before import, engineering must revalidate staged evidence against the approved branch; researchers must not silently repin completed bundles or move claims to replacement identities.

## Example: a population source and a geographic unit

A source's “city population” may describe the municipal core or wider settlement,
not an entire modern province or location footprint. Preserve the source's actual
unit and uncertainty; do not extend a narrower settlement observation to a larger
unit to make it fit. Before import, confirm the exact target identity, complete
approved regional branch, supported interval and explicit operation authorization.

## Changes during concurrent research

One designated engineering publisher integrates geographic releases. Regional engineers own disjoint approved outer envelopes and coordinate shared-edge changes before implementation. Publishing a changed global release does not silently approve unchanged branches or update research pins: the publisher explicitly revalidates certificates and affected campaigns, preserving old receipts and crosswalks. The current import contract uses exact global release pins; an unrelated regional edit may therefore require revalidation of an otherwise unchanged approved branch.

An engineer changing a released branch identifies affected IDs/ancestors, old/new pins, crosswalk, linked research campaigns and maintenance window. A change to a frozen outer boundary reopens the relevant macro/shared-edge approval. Researchers stop obsolete imports and preserve existing evidence; source collection elsewhere may continue. Higher-tier name reuse also requires compatible descendants and geometry. See [GEOGRAPHIC_RELEASES.md](GEOGRAPHIC_RELEASES.md), [GEOGRAPHIC_RELEASE_VALIDATION.md](GEOGRAPHIC_RELEASE_VALIDATION.md) and [WORKER_COORDINATION.md](WORKER_COORDINATION.md).
