# Build, publication, access and recovery

Repository code and runbooks describe supported capability, not live deployment state or permission. Before a live operation, verify the current accepted release, exact provider/account/destination, the operation-specific authorization, current inputs and limits. A historical command, receipt, issue comment, local bundle or successful preview does not authorize a new deployment or data write.

Ordinary builds and previews use the scripts declared by `package.json` and package inputs. Static, hosted and Cloudflare builds consume reviewed prepared assets; they do not replay historical geography construction or infer new facts. Use the trusted delivery helper and merge queue for repository delivery. Build/preview, merge, scientific acceptance, issue completion and production publication are separate events.

For Cloudflare, verify the selected Worker, account, environment, backend, read/write mode, audience, R2/object scope and exact release before deployment. Public builds must be explicitly read-only. A repository configuration is not proof that the live service has that configuration. Do not use a development/local fixture as production data.

For Neon/PostgreSQL or other hosted systems, use the reviewed migration/import path for the exact operation. Confirm the target and source/destination contract before executing any write. Protect existing records, local unique imports and backups. Current helper CLI, code and provider documentation are authoritative for exact options; do not maintain duplicate command transcripts here.

## Credentials and access

Use only credentials and provider access already authorized for the exact task and destination; keep them in supported local/provider stores. An allocator ownership token is a scoped filesystem capability, not a repository login credential. Honor actual source/provider denials; distinguish them from transport, timeout or unsupported-format failures. See [AGENTS.md](../AGENTS.md) for the universal credential and security boundary.

## Backup and recovery

PostgreSQL, Neon, Cloudflare object storage and local SQLite have separate data and recovery boundaries; none is an implicit replica of another. A retained object or hash proves only the bytes and scope it covers—not database restore, application validity, current deployment or production readiness. Before a recovery, verify exact source and target identities, object hashes, schema/version, row counts, restore result and operation authorization. Preserve existing records; use the versioned migration, immutable backup and restore contracts in code; validate in an isolated target. Stop before any live destructive action not explicitly authorized. Verify live provider state from an accepted release or direct operation record; this guide does not assert a current deployment or completed recovery.
