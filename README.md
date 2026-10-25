# WorldAtlas

A polygon-based world history atlas with a six-level spatial hierarchy, fourteen map modes, and a timeline from 3000 BC to 2026 AD.

Parallel worker roles start at [THREE_THREAD_START.md](docs/THREE_THREAD_START.md): engineering implements code/migrations/publication, [geography research](docs/GEOGRAPHY_HANDOFF.md) supplies scoped territorial evidence/proposals, and history research supplies dated facts for approved territories. Either research role can run on Luna when selected by the user. All coordinate bounded issue scopes and use serialized squash PRs; ordinary work has no machine claim/readiness prerequisite.

## Run

Requires Node.js 24 or later. Prepared geography is committed; Python and data downloads are **not** needed to run the app.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The local preview creates `data/atlas.sqlite` from bundled geography and examples. Subsequent server launches preserve existing local imports, including archived historical states and boundary records during reference migrations. This ignored local database is not synchronized with Neon. Preserve any unique local records until they have been reconciled; starting the server does not publish them. Set `PORT` to change the port.

`localhost` is reachable only on the machine running the server. For a static preview, use `npm run build:static` and serve `dist/`. Package builds consume declared source inputs, not the persistent local database, and replace one generated comparison database at `.cache/package-atlas.sqlite` per checkout. Keep it through the SQL parity and static-history tests; the [normal completed-task release](docs/LOCAL_WORKSPACES.md#finish-and-release) removes it with the checkout only when its build receipt still matches the exact file and producer. Do not archive this verified generated pair as unique evidence. They never overwrite `data/atlas.sqlite` or import content into Neon. `npm run build` retains the normal server-backed build. Keep the hosting audience appropriate for the packaged records.

The retained Site build uses `npm run build:hosted`: a Worker API with explicit D1 or PostgreSQL content-backend selection, R2 for media/source bytes, and independently cached map assets in `dist/client`. **Historical checkpoint:** owner-private Site 18 was recorded with Neon PostgreSQL and retained R2 (environment revision 3; deployment `appgdep_6abf573be0948191a5517d0b2cbe7948`, succeeded 2026-10-02 07:03:34.504 UTC). Production migration runs 36973747147 and 36974831053 were verified then; the read-back covered 23 factual tables, seven dates, and 3,984 claims plus 28 archives (16,199,861 bytes), at ingestion revision 1321. Recorded capabilities were `mapSnapshots:1`, `datedGeography:1`, `datedFootprints:0`, `storageExport:2`. These dated receipts do not establish a current endpoint, deployment, audience or write permission. The former private Site is retained for recovery; consult current accepted Cloudflare publication guidance for the active destination and its limits. Read [the Luna handoff](docs/LUNA_DATA_HANDOFF.md), [engineering checkpoint](docs/HANDOFF_ENGINEERING_CHECKPOINT.md) and [reproducible checkpoint](docs/REPRODUCIBLE_CHECKPOINT.md) as historical evidence and recheck current accepted instructions. Before any content import, verify the accepted-main geography gate, the exact campaign certificate/pins and explicit current operation authorization; absent that evidence, do source research and staging only. Luna must not infer authorization from the old Site.

Package builds consume the accepted current prepared assets directly. They do not replay historical geography construction or migrate temporal buckets on every build. See [current prepared assets](docs/PREPARED_CURRENT_ASSETS.md) for explicit update and historical reproduction paths.

Generate schema migrations with `npm run db:generate`; never edit a migration after it has been applied. `npm run data:hosted-catalog` prepares resumable reference identity imports separately from deployment assets. Local production API verification uses `scripts/verify-hosted-local.mjs` with a local Wrangler D1/R2 instance. Its marked test examples are restricted to localhost and are never seeded into production. Future factual boundary imports invalidate prepared assignments until regenerated; that geometry workflow requires the Python preparation dependencies.

```sh
npm run build
npm start
npm test
npx playwright install chromium
npm run test:ui
npm run build:static
npm run test:static
```

The browser tests launch a separate development server on port 3198. `npm test` validates the full geography, hierarchy, dates, imports, and temporal resolution using an in-memory database.

## Geography and coverage

The seed uses named administrative and physical territories across six continents, excluding Antarctica. The ongoing sourced framework rebuild and its acceptance criteria are documented in [HIERARCHY_REBUILD.md](docs/HIERARCHY_REBUILD.md); its semantic review queue remains open. Country-specific source roles replace the former mean-area heuristic. Compact city territories and published metropolitan groupings consolidate wards; named rural groupings and physical regions refine the opposite scale problem. EU5 counts are rough reference only. See [the complete granularity policy, evidence and exceptions](docs/GRANULARITY.md) and [the current per-location audit](data/granularity-audit.json).

Regions/areas use the published WGSRPD geographic scheme, adapted to six continents, independently of political ownership. Large countries can span regions; small countries/territories can share a region. Whole-territory provinces and geographic portions are explicitly labeled where necessary. These are reference atlas groups, not verified historical administrations. Current counts are generated in the audit and shown in the interface.

The political timeline includes **13,378 dated Cliopatria territory records**, covering portions of 3000 BC–2024 AD, adapted under CC BY 4.0. These are coarse reconstructed political polygons. They are evidence for prepared location ownership: same-polity polygons are unioned, and an owner requires more than half the entire location land area with no contradictory claims. Every political fill comes from that single resolved record. Missing majorities and conflicting claims remain unknown. No historical coverage is extrapolated into 2025–2026. In 2026, modern source polity ownership is available as a labeled reference, not a verified current political snapshot.

Dated population, culture, religion, location rank, topography, vegetation, and climate remain unknown without supported records. Separately labeled environmental reference context can be displayed without extending an observation into unsupported historical years. Optional London and Paris examples demonstrate the attributes and temporal transitions; their values are illustrative. No population interpolation or demographic inference is performed. Imported dated boundary overrides replace reference location geometry only for their validity intervals; dated entity names, membership, existence and independent settlement records are supported, with source-required imports. Missing historical names stay unknown and present-day reference labels remain visibly separate.

Duplicate source collections are retired and shared polygon interiors are reconciled before rendering. Existing databases archive retired locations and preserve their imported history. The worldwide overlap audit is in [data/topology-report.json](data/topology-report.json).

Read [source research and limitations](docs/DATA_SOURCES.md) for selection methodology, alternative datasets, licenses, attribution, and remaining gaps.

## Content imports and local fixture data

Topography, vegetation and climate use [fixed classifications](docs/ENVIRONMENT_CLASSIFICATIONS.md), with stable IDs, display labels and explicit legacy aliases. Historical imports rejected unsupported text; unknown uses JSON null. Existing evidence remains immutable.

Lawful research and staging may proceed within an owned scope. Before a location-attribute import or hosted write, verify the accepted-main regional gate, exact subject/release certificate and current operation authorization/destination. The retained [research preparation/import workflow](docs/RESEARCH_IMPORT_WORKFLOW.md), old Site receipts and local bundles are historical context, not authorization or current hosted delivery instructions. Follow the current Cloudflare publication contract for destination and read/write limits.

The obsolete local-only `data:import` command is retired. The [retained local temporal schema](docs/TEMPORAL_IMPORTS.md) documents existing fixtures and archived records; its payload is not interchangeable with the hosted contract. Existing local imports may be unique and must not be discarded or automatically promoted. Reviewed geography and immutable source evidence remain versioned inputs, not a second editable production database.

`GET /api/geography` returns reference polygons, hierarchy, and the temporal entity catalog shared with static exports. `GET /api/snapshot?year=1444&examples=1` returns applicable field records, legacy states and boundary overrides. Historical source polygons are available separately with `source_evidence=1`; they do not paint the normal map. The UI loads reference geography once and requests small temporal snapshots on year changes, cancels stale requests, and debounces the slider. Leaflet hosts a fixed-grid WebGL2 renderer (with a Canvas fallback) without a remote basemap dependency. A Web Mercator grid at canonical resolution 10 (about 153 m per cell at the equator) assigns one integer location ID to each covered land cell. Fill, hover and click selection share this ID buffer; parent memberships come only from the location hierarchy. The published build precompiles the canonical ownership grid and loads it as compressed assets; a background Web Worker handles development data or dated geometry changes, storing equal-ID row runs to avoid a dense multi-gigabyte bitmap. Zoom, pan, and resize only read that grid; they never rasterize polygons again. The compressed ownership tables and map-mode palettes stay on the GPU. Navigation changes view uniforms, with no cell buffers, border paths, or texture uploads rebuilt on the main thread. The existing canvas scales during zoom animation. Every zoom uses the original grid: cells naturally become subpixel when viewed from far away, without the previous forced four-screen-pixel blocks. Province and location borders are styled in screen pixels independently of cell resolution. Devices without WebGL2 use the cached Canvas renderer at screen resolution. Only geographic footprint/lifetime changes rebuild the location grid; changing the year selects prepared ownership attributes. Location borders fade out below zoom 7, while thicker province borders remain. Ownership borders are highlighted only in Political mode; geographic modes highlight geographic groups. The exhaustive fixed-grid assessment represents all 49,589 current locations; that does not certify complete real-world source coverage. Background cells denote water or uncovered source coverage.

## Rebuild source geography

Only needed to change the seed. Requires Python 3 and the pinned Shapely dependency; the checked-in provenance records the pinned Natural Earth revision and source hashes.

```sh
python -m pip install -r scripts/requirements.txt
npm run data:prepare
npm run data:history
python test/geography.py
python scripts/audit-granularity.py
```

In environments with an HTTP proxy, use `node --use-env-proxy scripts/prepare.mjs`. Downloaded inputs are cached in `.cache/`. Rebuilding writes seed files. On next launch the bundled reference migration backs up the database, installs new coverage, archives replaced source IDs, and retains their historical records. Custom locations are retained. Replaced source IDs and their historical records are archived; new territories receive new IDs with source-member provenance. geoBoundaries metadata is cached from its current API, with downloaded layer hashes recorded for audit. Preserve existing databases and imported work when regenerating. For a fresh development database, move the old `data/atlas.sqlite` aside while the server is stopped, then restart.

Natural Earth is [public domain](https://www.naturalearthdata.com/about/terms-of-use/); geoBoundaries licenses vary by original source; Cliopatria is CC BY 4.0. The global hierarchy audit is recorded in [data/hierarchy-report.json](data/hierarchy-report.json). See [data/sources.json](data/sources.json), [data/administrative-sources.json](data/administrative-sources.json), and [data/cliopatria/index.json](data/cliopatria/index.json) for attribution and provenance. The interface optionally loads Google Fonts and falls back to system fonts when unavailable.

## Dated names, memberships and settlements

The local/server/static contract below supports these fields. Historical Site 18 receipts recorded hosted dated membership/existence routes and production forward migrations using stable geographic IDs and sourced claims rather than edits to the reference release. Do not infer current hosted availability from those receipts. The versioned footprint scaffold is implemented, while browser version selection/cache integration remains maintainer work (`datedFootprints:0`). See [the hosted contract](docs/HOSTED_TEMPORAL_GEOGRAPHY.md) and [safe campaign phases](docs/TEMPORAL_GEOGRAPHY_CAMPAIGNS.md) for technical background, subject to current approval and operation gates.

See [docs/TEMPORAL_IMPORTS.md](docs/TEMPORAL_IMPORTS.md) for the import contract. `entity_history` uses `field: name | parent | existence | attributes`, a typed `value`, source, half-open interval, and optional example flag. Names also accept `language` and `name_role: preferred | alias`. All geographic tiers keep stable IDs across renames. Split/merge events link distinct IDs and require their own lifetime/boundary evidence; they do not automatically subdivide land or infer populations.

Every settlement has `kind: settlement` and a location parent. Its rank does not overwrite its host location's rank. Missing habitation is not uninhabited. Imported absent lifetimes suppress nonexistent geographic entities in the applicable year; dated membership also updates province borders and map-mode grouping. Higher boundaries derive from location membership, preserving one parent chain per covered cell.

The current implementation and top-down audit scope are recorded in [docs/IMPLEMENTATION_PROGRESS.md](docs/IMPLEMENTATION_PROGRESS.md). Field precedence and source constraints are documented in [docs/ATTRIBUTE_CONTRACT.md](docs/ATTRIBUTE_CONTRACT.md).
