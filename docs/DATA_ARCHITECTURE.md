# Data and application architecture

WorldAtlas separates stable territorial identity, geographic reference, dated facts, source evidence and presentation. Application code and factual content are independent. `data/world-index.json` and `data/hierarchy.json` define the reference entities; geography is not rewritten by attribute imports. `src/attributes.js` and `src/temporal.js` resolve dated content. `hosted/` contains the service modules, `drizzle/` contains deployed immutable migrations, and current machine schemas/configuration remain the executable authority.

## Storage and compatibility

Stable entity IDs do not encode a display name or owner. Names, memberships, existence, categories, classifications and factual records have distinct identities and intervals. Imports are append-only where the schema enforces it; do not mutate or repurpose an applied migration, archived record or category identity. Unknown values are explicit and do not trigger silent substitution. Keep legacy local fixtures, hosted data, raw files and object/media storage distinct; a local SQLite database is not synchronized with the production service.

Typed observation modules are registered through the shared module registry and expose their versioned read/validation contract. Adding a module does not authorize research imports or alter geography. Forward schema/storage changes require a new reviewed migration and compatibility tests; preserve the original export format and migration history. Footprint and dated geographic products are versioned separately from factual records. Rebuild only products whose declared inputs changed, and preserve exact source/selector pins.

## Package and API boundaries

Package input declarations and verification policy are defined by `.github/package-inputs.json`; scripts consume declared inputs, not a worker's untracked local database or undeclared files. Hosted API schemas, module interfaces, migration definitions and package controls are maintained in code. Read those sources directly for exhaustive fields and current endpoints instead of copying generated inventories here. A documented repository capability is not proof of current deployment, audience, live endpoint or authorization.

Do not regenerate a historical catalog from current names/parents or reinterpret old rows to fit a new schema. Make an explicit versioned migration, retain backward compatibility where promised, and test old and new consumers. Content import gates and scientific evidence requirements are in [HISTORY.md](HISTORY.md); operational publication and recovery limits are in [OPERATIONS.md](OPERATIONS.md) and [RECOVERY_SECURITY.md](RECOVERY_SECURITY.md).
