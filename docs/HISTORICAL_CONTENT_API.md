# Historical content API reference

This guide documents implemented read-side catalog, relationship/media paging and capacity interfaces in the hosted service. It is an API contract, not a live-deployment status, import authorization or worker workflow. Verify any live operation against the current accepted deployment and its explicit authorization.

## Discover existing identities

The bounded catalogs return complete stored rows, including parsed metadata:

| Route | Filters |
| --- | --- |
| `GET /api/catalog/sources` | `q`, `kind` (source status), `cursor`, `limit`, `examples` |
| `GET /api/catalog/categories` | `q`, `kind` (owner/culture/religion), `cursor`, `limit`, `examples` |
| `GET /api/catalog/entities` | `q`, `kind`, `active`, `cursor`, `limit`, `examples` |

`q` searches the stored identity name and stable ID as a literal, case-insensitive substring, with at most 256 characters. It does not interpret SQL wildcard characters. It searches the identity registry, not all historical aliases. A `kind` filter is exact. Limits are positive integers capped at 250; the default is 250. Responses contain `collection`, `records`, `next_cursor`, `revision` and an explicit identity-context explanation. Pass `next_cursor` unchanged until it is null; do not assume the first page is exhaustive.

Examples remain opt-in. Archived entities remain discoverable unless `active=1` is requested. Stored identity labels and parents are undated registry context. For the current reference parent chain, use the published geographic release/membership API; for historical names and attributes, use supported dated evidence. A catalog search does not establish an ancient label or transfer predecessor claims.

Reuse source IDs by checking their URL, supported interval, vintage, license and source metadata/digests, not just their display name. Reuse category/entity IDs across spelling changes. Create separate source identities when materially different evidence, vintages or support intervals warrant them; do not mutate an immutable source to broaden coverage.

## Exhaust graph and media links

`GET /api/entities/{id}/relationships?year=1000&limit=250&cursor=…` pages incoming and outgoing sourced relationships. `GET /api/entities/{id}/media?year=1000&limit=250&cursor=…` pages sourced media links and registered object metadata. Responses contain `entity_id`, `year`, `records`, `next_cursor` and `revision`. These routes complement the compact entity profile, whose relationship/media arrays may be truncated at 250.

Both readers keep the existing profile rules: half-open supported dates, no year zero, opt-in example evidence, permanent sourced withdrawals and hidden example endpoints. Undated associations are returned with `date_status: unknown`; dated associations use `dated`. No date is manufactured for an undated relationship. Media links to pending objects remain unavailable. Link records include source metadata; blob bytes use the existing `/api/media/{media_id}` route, which supports byte ranges.

Each catalog/graph page brackets its read with the ingestion revision. A concurrent import produces a retryable HTTP 409 rather than presenting an inconsistent page. When collecting a whole catalog, keep one revision across pages and retry if it changes. The technical publication pipeline owns stable snapshots for sustained concurrent research; contributors must not weaken withdrawal or revision checks to accelerate imports.

## Measure capacity independently of website assets

`GET /api/storage/capacity` is an administrative diagnostic. It reports counts for the original fourteen hosted collections and registered media objects/bytes. The production PostgreSQL adapter measures database bytes with `pg_database_size(current_database())` (`postgres-pg-database-size`). Legacy D1 uses query metadata (`size_after`) when available; SQLite previews fall back to `page_count × page_size`. The diagnostic counts are not a complete 23-table backup inventory; use the separate [v2 export contract](STORAGE_EXPORT_V2.md) for that scope. If the managed service supplies neither measurement, bytes remain null; row counts are not converted into invented storage estimates.

These measurements include database pages/indexes when the service reports them. They exclude prepared historical ownership/environmental products and canonical map/grid assets. Registered media bytes are metadata totals, not an exhaustive proof that every object exists: source/media read-back checks separately verify lengths and digests. The diagnostic may scan large tables, so it must not run on every map navigation.

Technical maintainers may configure an operational database budget in bytes through `ATLAS_DATABASE_BUDGET_BYTES`. This is an internal planning budget, **not a verified hosting quota**. The response identifies whether a measured database is below, approaching (80% by default), or at/above that budget. Without a valid configured budget and measured size, status remains unknown. Invalid budget configuration must not be silently interpreted as a provider capacity guarantee.

The repository implements PostgreSQL-plus-object-storage and legacy D1-plus-object-storage adapters. This reference does not identify which backend is currently deployed; read accepted deployment records for that. The bounded media upload accepts at most 20 MiB per object, separate from object-storage provider limits. Streaming/multipart transport and more database capacity remain technical maintainer responsibilities when needed.

## Growth without changing factual records or the website

Do not materialize a location/year/attribute cross product. A supported interval is one claim, whether it covers one year or several centuries. Unknown years do not require invented rows. Sources, stable entity/category identities and original claims remain immutable; corrections retain their predecessors.

Before large-scale expansion, technical maintainers measure representative row/index sizes, ingestion throughput, selected-year query latency, snapshot response size and storage use. The stable API must continue to separate three responsibilities:

1. Indexed source/identity/correction catalogs and bounded factual imports.
2. Compact published map summaries resolved from claims; full provenance and graph details retrieved separately on demand.
3. Versioned content-addressed source/media archives in object storage, with hashes and import receipts independent of deployment assets.

If measured indexed evidence outgrows the managed database, implement backend partitioning or a separately provisioned query service behind that contract. Preserve original claim IDs, intervals, source digests, correction history and ingestion idempotency. R2 archives alone do not provide indexed historical queries. A capacity warning must trigger maintainer work, not require Luna to rewrite the schema, UI or deployment.

The content API and capacity interfaces support bounded research preparation. Imports remain subject to current geographic approval and explicit operation authorization. Schema, capacity and provider changes belong to technical maintainers; see [HOSTED_STORAGE_ARCHITECTURE.md](HOSTED_STORAGE_ARCHITECTURE.md) and [CURRENT_POSTGRES_RECOVERY.md](CURRENT_POSTGRES_RECOVERY.md).

## Validation

`node --test test/research-catalog.test.mjs` uses the actual frozen migrations and import service. It exhausts catalogs, relationships and media with more than 250 results; tests both relationship directions, supported interval boundaries, examples, withdrawals, pending blobs, source metadata, immutable identities, revision races, measured capacity and unavailable service measurements. The module does not modify stored evidence or migrations.

The workflow and scientific boundaries for source research are in [HISTORY_RESEARCH_GUIDE.md](HISTORY_RESEARCH_GUIDE.md). This API reference does not authorize an import or infrastructure operation.
