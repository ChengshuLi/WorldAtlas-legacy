# Historical content and dated evidence

This guide covers research and proposals for dated factual content. It does not authorize an import, hosted write or production operation. Preserve source identity, exact supported unit, vintage, retrieval/hash, license, method, uncertainty and date range. A research source is not an atlas observation until the exact subject and interval are supported and the relevant current gate and operation authorization are satisfied. Missing evidence stays unknown; do not infer it from a present-day label, nearby territory, regional percentage or another attribute.

## Temporal and identity model

Locations and geographic entities have stable IDs independent of names, ownership and time-specific membership. Name, parent membership, existence and factual attributes have their own dated, half-open intervals; use no year zero and do not overlap conflicting evidence. Splits and mergers require distinct identities and their own dated boundary/lifetime evidence. They do not automatically divide land, history or population. A missing record is unknown, not a negative observation.

Each location is an indivisible territory. A settlement's population applies only to that settlement and published date, never automatically to its host location. Climate normals, potential-natural vegetation and modern physical classifications are labeled reference context, not annual weather, observed land cover or ancient conditions. Political ownership is resolved from admissible whole-location evidence; conflicts, missing majorities and unsupported periods remain explicit unknowns.

## Import boundary

Before a content import, check accepted-main `data/research-geography-gate.json`, the exact approved regional certificate/release and hierarchy/footprint pins, permitted subjects and supported interval, source/territory compatibility and explicit current operation/destination authorization. A historic certificate, dry run, private endpoint access or complete structural chain is not a substitute. Stage proposals without production credentials when authorization is absent. Replaced geography does not silently transfer old records; preserve prior identities and revalidate affected evidence.

The authoritative field definitions and resolution rules are implemented in `src/attributes.js`, `src/temporal.js`, the current schema under `drizzle/`, and tested by the content/import tests. The hosted API and module registration are in `hosted/` and `src/observation-registry.js`. Follow those versioned contracts and current accepted release; do not reproduce every field list or historical campaign recipe here. Raw source, imports, immutable evidence and historical decisions stay at their existing pinned paths.
