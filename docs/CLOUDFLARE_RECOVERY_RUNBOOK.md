# Cloudflare serving and retained recovery

This runbook describes recovery of the retained provider copy, not authorization to
serve or publish. Before any live action, use [PUBLICATION_RUNBOOK.md](PUBLICATION_RUNBOOK.md)
and the current accepted deployment/operation records to verify destination, served
version, issue holds and exact authorization. Do not infer current eligibility from
this runbook, a hostname, or historical receipts. The original ChatGPT Site is
retained as a recovery copy; ordinary visitors and publishers use only the currently
authorized destination.

The former latest-main Site builder, migration transport compiler and Site-only
budget commands are retired. Recovery uses the frozen provider copy and its original
Git revision, not a parallel latest-main build. No provider resource or retained
archive is deleted by this procedure.

## Retained resource identities and verification receipts

The current project, database, bucket, Worker and Site identities must be read from
authorized current deployment records, not inferred from this guide. Archive objects
and deployed Worker assets are different storage products. This procedure alone
authorizes no migration, factual rewrite, credential rotation or provider deletion.

Historical archive preservation and publication receipts remain on their originating
issues (#845 and #846); their exact inventories, pins and acceptance can support
reconstruction but do not establish present provider state. Before new work, verify
the current destination, release, asset inventory and served behavior through the
accepted operation records.

## Tested database recovery and current coverage

Use [CURRENT_POSTGRES_RECOVERY.md](CURRENT_POSTGRES_RECOVERY.md) for the recovery
procedure and its immutable source/target pins. Historical backup receipts establish
only their recorded capture and restore scope. Never load a raw dump directly into
production or change the frozen source catalog.

The retained directory `../coordination/engineering/cloudflare-retirement-847-20261007/`
contains immutable recovery comparisons and their original pins. Treat it as
historical evidence, not a live-state assertion; establish current records and
served behavior independently before acting. Its stated access limits remain: a
comparison that cannot read private registry/sequence rows does not prove those
values or server-global/provider physical backup.

## Recovery procedure and custody

Keep the original encrypted custom archive, backup-envelope.json, expected-context.json,
receipt.json and recipient acknowledgment in the existing private recovery directory
outside Git. Preserve recipient-private.pem separately with mode0600. The operator
has verified the existing local custody; another worker must obtain authorized
private access rather than assume these files exist in its checkout. Never commit
or print the key, database URL or plaintext dump. Actions artifacts expire; the
independent local copy must remain retained.

Verify raw hashes against private-custody-descriptors.json and the original receipt.
Use the reviewed CLI outside Git with a fresh exclusive output:

    node scripts/recovery-backup-envelope.mjs decrypt ENVELOPE CIPHERTEXT PRIVATE_KEY EXPECTED_CONTEXT NEW_OUTPUT

The CLI verifies exact recipient/context, ciphertext hash, AEAD authentication,
plaintext size/hash and restrictive key permissions. Restore the verified custom
archive only into an isolated PostgreSQL18 target with the exact native procedure
in CURRENT_POSTGRES_RECOVERY.md and its pinned original schema inputs. Recompare
all logical rows, compact state/catalog/ACLs, and prove target/source-lock cleanup.
Any later production restore requires a new scoped reviewed operation, current
source comparison, rollback and serialized provider window; this retirement does
not authorize overwriting Neon. Reuse current verified source reads if preparing
a new current-source backup; do not substitute an old marker for a live one.

Recover archived files from the retained original bucket or the verified current
worldatlas-archives bucket using their original object keys. Obtain the complete
inventories from #845's durable proof and compare whole bodies/metadata before any
copy. Use create-only copies, resolve collisions explicitly, and never overwrite
or regenerate a differing original. Neon media rows are the index/pointers; their
presence alone is not a backup of R2 bytes.

## Safe retirement and rollback

Before using a retained Site or provider copy for recovery, verify the exact current
code, assets, release and backend pins against accepted deployment records. A past
retirement or metadata operation does not make the retained copy an automatically
compatible serving fallback. Preserve original access and storage unless an explicit
current operation authorizes a change. For a rollback, register and settle the real
provider operation under [PUBLICATION_RUNBOOK.md](PUBLICATION_RUNBOOK.md), retaining
its current/previous deployment identities and actual checks. This guide does not
assert that a retirement, title change or current serving state is complete.
