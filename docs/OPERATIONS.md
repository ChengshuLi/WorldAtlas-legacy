# Build, publish and operate

Repository code and runbooks describe supported capability, not live deployment state or permission. Before a live operation, verify the current accepted release, exact provider/account/destination, the operation-specific authorization, current inputs and limits. A historical command, receipt, issue comment, local bundle or successful preview does not authorize a new deployment or data write.

Ordinary builds and previews use the scripts declared by `package.json` and package inputs. Static, hosted and Cloudflare builds consume reviewed prepared assets; they do not replay historical geography construction or infer new facts. Use the trusted delivery helper and merge queue for repository delivery. Build/preview, merge, scientific acceptance, issue completion and production publication are separate events.

For Cloudflare, verify the selected Worker, account, environment, backend, read/write mode, audience, R2/object scope and exact release before deployment. Public builds must be explicitly read-only. A repository configuration is not proof that the live service has that configuration. Do not use a development/local fixture as production data.

For Neon/PostgreSQL or other hosted systems, use the reviewed migration/import path for the exact operation. Confirm the target and source/destination contract before executing any write. Protect existing records, local unique imports and backups. Follow [RECOVERY_SECURITY.md](RECOVERY_SECURITY.md) for credentials, backup and restore. Current helper CLI, code and provider documentation are authoritative for exact options; do not maintain duplicate command transcripts here.
