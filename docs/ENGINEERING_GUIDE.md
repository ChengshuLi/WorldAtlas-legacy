# Engineering guide

Engineering owns application code, schema, infrastructure, geographic release integration, validation, and publication. Geography workers supply territorial source evidence and proposals; history workers supply factual evidence. Preserve both research lanes, source bytes, stable identities, predecessor geometry and original records. Application changes do not imply factual imports, and a technical check does not establish scientific acceptance.

## Code and data boundaries

`src/attributes.js` and `src/temporal.js` are shared resolvers; `hosted/` implements the content service; applied migrations in `drizzle/` are immutable. The reference identity registry in `data/hosted-catalog` must not be regenerated from current names or parents. Keep sparse supported intervals, no year zero, and explicit unknowns. Historical/modern reference context does not extend unsupported observation periods.

Geography researchers own coordinated evidence directories (`data/regional-review/<packet-id>/` or `research/geography/<campaign-id>/`); history researchers own `research/campaigns/<campaign-id>/`. Do not rewrite their source/results. Engineering writes executable migration and release outputs to its coordinated destination and retains every input, result, and limit.

## Current procedures

Use accepted-main `AGENTS.md` and [WORKER_COORDINATION.md](WORKER_COORDINATION.md) for author scope, identity, review and delivery. Use [LOCAL_WORKSPACES.md](LOCAL_WORKSPACES.md) for allocation and [MERGE_QUEUE_CLIENT.md](MERGE_QUEUE_CLIENT.md) for exact-head serialized integration. [ENGINEERING_ACCEPTANCE.md](ENGINEERING_ACCEPTANCE.md) is acceptance guidance; GitHub Issues hold current scope and status.

Ordinary code changes should be verified in an isolated local/preview environment against their actual behavior and applicable tests. Identify code/data/runtime pins and disclose unverified hosting or device behavior. Production reads, writes, migrations, owner maintenance, or deployments use only their distinct current accepted authorization and [PUBLICATION_RUNBOOK.md](PUBLICATION_RUNBOOK.md) or the relevant recovery contract. A normal merge does not deploy, migrate a provider or authorize imports.

Before any location-attribute import or hosted write, verify the accepted-main geography gate, exact regional certificate/release pins and explicit authorization for that operation. Without them, keep work to code/evidence research and staging. Do not invent credentials or bypass a real access denial. Preserve current and historical evidence; do not repeat a migration or large computation without a demonstrated acceptance need.
