# Research bundle preparation and historical import contract

This file retains the previous Site 18 bundle/import contract as historical technical context; it is not a current live-operation runbook. Before any proposed import, inspect accepted-main `data/research-geography-gate.json`, the exact current regional/campaign certificate and pins, and a current accepted operation contract naming its authorized destination and procedure. Unless all authorize the exact action, remain in research/staging. Do not call the old private Site, request service credentials, or run import/resume commands from this document. See [TOP_DOWN_GEOGRAPHY_WORKFLOW.md](TOP_DOWN_GEOGRAPHY_WORKFLOW.md), [WORKER_COORDINATION.md](WORKER_COORDINATION.md) and [GEOGRAPHY_RESEARCH_READINESS.md](GEOGRAPHY_RESEARCH_READINESS.md) on current main.

The historical importer accepted `--regions REGION-ID[,REGION-ID]` and checked verified batch bytes against selected certificates. This is a record of past behavior, not a current invocation instruction. Regional imports used existing registered identities/classifications; new shared entity/category definitions and geographic writes required a separate engineering-approved operation. Corrections required certified target/replacement subject crosswalks. Preserve exact release pins; do not reuse this old route for a future campaign without a current accepted operating contract.


The preserved compiler contract describes how historical campaigns staged structured data for existing locations without application/schema/grid changes. Research and offline evidence staging are available within the assigned scope; any live write additionally requires the current gate, exact certificate/pins and explicit operation authorization described above. Root remains responsible for engineering, geographic footprint migrations and capacity upgrades. Sparse supported intervals represent evidence; do not generate a row for every year or fill unsupported gaps.

Start from latest accepted `main`, create an isolated `research/<campaign-id>` branch under [the parallel protocol](PARALLEL_WORK_PROTOCOL.md), and read `docs/HISTORY_HANDOFF.md`, `docs/LUNA_DATA_HANDOFF.md`, `docs/ATTRIBUTE_CONTRACT.md` and `docs/ENVIRONMENT_CLASSIFICATIONS.md`. This historical workflow does not authorize Site access or live import; use only an explicitly approved current operation route if one exists for the task. Use stable IDs from the assigned reviewed scope; names are labels. Current geographic membership is reference context unless separately dated evidence establishes otherwise.

The separately reviewed [retained settlement-population transfer](TYPED_MODULE_INTEGRATION.md#retained-settlement-population-transfer-2696) used the historical commands with identity-only typed observations. It did not change the location-research approval contract and does not authorize a new operation.

## Prepare a research collection

Historical input collections used arrays named `sources`, `entity_types`, `entities`, `categories`, `records`, `names`, `retirements`, `relationships` or `media_links`. Only include collections needed for assigned offline staging. The format cannot itself add geographic locations, change footprints or redefine geographic tiers. People, events, armies, routes and other nongeographic graph subjects historically used existing types or sourced type definitions. Media links referenced already uploaded immutable objects; uploads were separate operations. These schema notes do not grant present service access or write permission.

Historical claims used stable IDs, source IDs, valid supported intervals and disclosed method/uncertainty. Negative years are BC, year zero is forbidden, and intervals are `[valid_from, valid_to)`; `2027` was only an exclusive endpoint. Examples stayed explicitly opt-in. Unknown values used `null`. Fixed environmental classifications are documented in the classification guide; the former `/api/classifications` endpoint is not a current lookup route.

Compile with one command:

```sh
node scripts/prepare-research-bundle.mjs research.json geographic-release.json research-bundles/campaign-001
```

The retained compiler preserves exact input, pins supplied release/footprint/hierarchy hashes, checks source bounds/classifications, orders dependencies and emits content-addressed batches of at most 200 rows and 1 MiB. These checks do not fetch/certify a current release, approve a region or authorize import. Historical importer corrections kept a retirement and replacement atomic; original evidence was retained. Multiple retirements sharing one replacement stayed together, and chained corrections committed in dependency order. An atomic correction group larger than the batch budget was rejected rather than split unsafely.

Local preflight validates syntax, controlled classifications, input-source interval/method consistency and immutable bytes. It does **not** establish historical truth, source licensing, identity matches, service conflicts or source completeness. The historical hosted service checked identities, constraints, conflicts and transactional acceptance. Missing externally referenced identities/sources failed at import; do not invent identities to suppress an error. Do not widen original evidence periods to fill gaps.

Optionally supply a fourth argument pointing to a JSON list of licensed source files:

```json
[
  {"path":"sources/census.csv","source_id":"source:existing-stable-id","license":"CC BY 4.0","redistribution_permitted":true}
]
```

Historically, paths resolved relative to `research.json`; copies were preserved by SHA-256 in `source-files/`, with original basename, bytes, source ID and license. `redistribution_permitted:true` was an explicit researcher assertion, not automated license verification. Restricted materials must not be included; preserve their lawful URL/version/hash and research notes instead. This option did not upload source archives or bypass the former media endpoint's 20 MiB limit. Large archives need suitable licensed object storage and a restorable Git manifest; do not exceed repository/hosting file limits.

## Historical Site 18 import operation (not currently authorized)

The following operational behavior belonged to the historical owner-private Site. The old endpoint and credential path are intentionally not reproduced here: this historical document does not identify a current authorized destination or operation. Do not run import, retry, bootstrap or hosted-readback commands based on this section. No present destination or credential is implied.

Historical imports used atomic batches and receipts, and retained idempotency/source-preservation behavior. Preserve existing receipts as historical evidence; an old successful receipt is not current acceptance or permission to repeat a write. Never edit a completed bundle or reuse its IDs for different evidence. Corrections preserve original immutable claims.

Historical receipts establish accepted transactions, not independent factual or exhaustive read-back verification. Preserve any earlier claim IDs, read-back and limits with the original source and work date; they do not establish current deployment state. A newly authorized future import requires a current independent verification contract.

## Preserve progress for the next research thread

Keep assigned source inputs, generated offline manifests/batches, licenses/hashes and lawful source bytes/restoration manifests inside `research/campaigns/<campaign-id>/`. Preserve earlier import receipts as historical artifacts; do not create or imply new receipts. Post dated milestones, coverage, blockers and evidence on the linked GitHub issue. Keep closed issues as history; do not edit shared handovers. Push `research/<campaign-id>` and open a PR targeting **main**. Maintainers integrate serially and update global summaries. Do not commit credentials or dependency/cache/SQLite directories. A fresh thread must be able to recover the research from Git and licensed source locations without access to this workspace.

This workflow has bounded batches; it does not promise that one managed database supports billions of claims. The current compiler reads a campaign into memory; divide large research campaigns into manageable input collections. Sparse evidence intervals and stable APIs avoid materializing the conceptual location × year × attribute grid. Root owns measured query/storage capacity, compact map delivery and future partitioning. Stop on explicit service capacity errors and preserve the partial ledger; do not redesign infrastructure in a research-only thread.
