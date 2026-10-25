# Build, publication, access and recovery

Repository code and runbooks describe supported capability, not live deployment state or permission. Before a live operation, verify the current accepted release, exact provider/account/destination, the operation-specific authorization, current inputs and limits. A historical command, receipt, issue comment, local bundle or successful preview does not authorize a new deployment or data write.

Ordinary builds and previews use the scripts declared by `package.json` and package inputs. Static, hosted and Cloudflare builds consume reviewed prepared assets; they do not replay historical geography construction or infer new facts. Use the trusted delivery helper and merge queue for repository delivery; a local preview does not publish a production release.

For Cloudflare, verify the selected Worker, account, environment, backend, read/write mode, audience, R2/object scope and exact release before deployment. Public builds must be explicitly read-only. A repository configuration is not proof that the live service has that configuration. Do not use a development/local fixture as production data.

For Neon/PostgreSQL or other hosted systems, use the reviewed migration/import path for the exact operation. Confirm the target and source/destination contract before executing any write. Protect existing records, local unique imports and backups. Current helper CLI, code and provider documentation are authoritative for exact options; do not maintain duplicate command transcripts here.

## Credentials and access

Use only credentials and provider access already authorized for the exact task and destination; keep them in supported local/provider stores. Before diagnosing a missing login, verify that the invocation inherited its already-authorized credential configuration; never print secrets or change global authentication. An allocator ownership token is a scoped filesystem capability, not a repository login credential. Honor actual source/provider denials; distinguish them from transport, timeout or unsupported-format failures. See [AGENTS.md](../AGENTS.md) for the universal security boundary.

### Encrypted credential handoffs

Encryption provides confidentiality, not sender authentication. Before decryption, independently authenticate the GitHub repository, authorized workflow and event, head commit, successful run and attempt, and the artifact. Take the ciphertext SHA-256 from a sanitized receipt bound to that authenticated run; a sender-supplied hash alone does not establish origin. Supply expected context from those trusted facts rather than copying it from the envelope, and verify the digest before decrypting.

The credential-envelope helper accepts only the restricted application database URL for its validated endpoint, database and TLS context. Use a least-privilege runtime role; never transport an owner-role URL or provider API key as the runtime credential. Keep the private recipient key outside Git in an owner-only `0600` file; decrypt only to a new owner-only `0600` file outside Git. Do not place plaintext credentials or private keys in Git, chat, logs or artifacts. Keep the authorized secret-store write separate: ciphertext is not `DATABASE_URL`, and installing plaintext through a secret-aware provider setter requires explicit authorization for that exact live destination. Ordinary repository publication or deployment authority does not grant credential-write authority. See `scripts/credential-envelope.mjs` and `test/credential-envelope.test.mjs` for exact validation and file-handling behavior.

## Backup and recovery

PostgreSQL, Neon, Cloudflare object storage and local SQLite have separate data and recovery boundaries; none is an implicit replica of another. A retained object or hash proves only the bytes and scope it covers—not a database restore. Before recovery, verify exact source/target identities, object hashes, schema/version, row counts and operation authorization; validate restore in an isolated target and preserve existing records. Use the exact current procedures in `scripts/current-postgres-recovery.mjs`, `scripts/recovery-backup-envelope.mjs`, `scripts/export-hosted-storage-v*.mjs` and `scripts/restore-postgres-storage-v*.mjs`. Cloudflare publication planning uses `scripts/publication-plan.mjs` and `scripts/publication-cloudflare.mjs`. These are capability contracts, not evidence of a current deployment or completed recovery.
