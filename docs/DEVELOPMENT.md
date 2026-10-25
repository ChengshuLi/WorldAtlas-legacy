# Development, workspaces and delivery

Use this guide after the repo-level [entrypoint](../AGENTS.md) for an assigned task through PR integration.

## Start and own the work

Use the accepted `scripts/local-workspace.mjs` allocator for managed author and exact-head review checkouts. It fetches `main` with the explicit remote-tracking refspec, verifies `FETCH_HEAD` matches `origin/main`, and freezes that commit for a new author branch. A review slot is detached at the requested commit. Read the helper's current CLI and implementation for arguments and guards; do not maintain a second option specification here.

The allocator binds each slot to a worker identity, path, branch/head, selected inputs and private ownership token. Keep the returned token private and use it only for your own slot. `resume` recovers only an interrupted empty `preparing` allocation; it does not reload instructions, refresh a conversation, rebase active work, or repair an uncertain checkout. Inspect actual state and preserve uncertain or dirty work. Sparse selection is a storage optimization, not permission to omit scientific or execution inputs. Use the supported selected-input path; do not hydrate unrelated history or mutate the shared allocator registry, refs, or another owner's checkout.

Preserve the primary checkout and shared Git store. Do not force-reset, clean, prune or delete shared content to solve a stale checkout, disk, or object problem. Remove a generated duplicate only after comparing its path, mode and bytes against its protected source and confirming no unique evidence depends on it. Release a completed slot only through the helper with its exact owner capability.

## Scope, roles and issue/PR records

Own only the assigned deliverable and declared paths; coordinate before overlapping a shared artifact or expanding scope. Keep parallel work disjoint. A specific package-repair assignment may authorize its named research, engineering, and delivery steps; it does not grant general production authority. An evidence-only geography role may publish scoped evidence or a recommendation, not change shared geography, import data, or write production. Engineering integrates accepted evidence. History research supports dated factual claims and proposals. An auditor reviews already-merged work only within its assignment; do not restart an old campaign by default. Issue intake records the request and provenance without claiming implementation or approval.

Use the relevant existing issue or PR to record scope, ownership, overlaps, progress and acceptance. Issues track work and decisions; PRs contain the exact proposed changes and review. Ordinary authoring does not require machine claim/readiness labels or a new issue solely for helper work. Labels, issue state and branch names do not grant scope.

## Review and trusted integration

Keep each PR coherent, push normally, and obtain a substantive review of the exact public head from a worker distinct from the author. The author and reviewer may share a GitHub account: account identity alone neither proves nor disproves independence. Record the review as a PR review or clearly anchored PR comment, with its exact-head binding and reviewer-worker provenance. Review actual changed bytes and behavior, source applicability, immutable pins, result accounting, scope, adverse cases and stated limitations—not summaries alone. Reuse unchanged evidence when it still binds; do not repeat expensive science without a material input or acceptance need.

Use the trusted `worker-merge.yml` workflow and `scripts/merge-integration.mjs` for current-base validation, request preparation, dispatch and terminal reconciliation. Its automatic selected-data route is a strict eligibility optimization, not a judgment of review sufficiency. Select `auto`, an exact reviewed plan, or the complete suite using the criteria in [VALIDATION](VALIDATION.md). Revalidate exact base/head immediately before a request. Use the stock route; do not directly merge or fabricate a terminal result. Read the canonical terminal receipt and resulting accepted `main`, then report checks actually run, failures, unrun work and remaining limits.

For routine read-only observation, use bounded provider reads and avoid rapid polling:

```sh
gh api --cache 60s repos/ChengshuLi/WorldAtlas/actions/runs/RUN-ID
gh api repos/ChengshuLi/WorldAtlas/pulls/PR-NUMBER
gh run watch RUN-ID --interval 60 --exit-status
```

These examples do not authorize dispatches, writes, extra retries, a review, or a merge. The accepted helper owns request accounting and retry behavior. Preserve a known failed request and inspect uncertain outcomes before deciding whether any same-operation retry is valid.

## Progress and completion

Send useful progress at substantive milestones: exact branch/head, work completed, evidence or tests, next action and a concrete blocker. Report only checks actually performed and distinguish observed failures from work not done.
## Refresh a stale checkout without changing its files

The helper that starts an allocation runs before the new checkout exists. Running
an older helper version from the primary checkout can therefore pin stale main.
Before a new job, refresh `origin/main` with blob filtering, pin its
commit, and read that pin's `AGENTS.md` and this guide. Do not pull, reset, switch
or overwrite a checkout holding active work.

The following code-only bootstrap loads both allocator modules from one exact
locally available main commit. It uses an exclusive temporary directory inside
the task repository's shared Git store and removes only its generated helper copies
afterward. Git reads and helper execution do not depend on the shell's cwd. A failed main refresh or
commit lookup stops without using a cached older pin. Missing helper blobs
stop before execution; acquire those exact pinned objects through the coordinated
route below rather than falling back to an old executable. Use Node 24.

```sh
(
: "${TASK_REPO:?Use the repository path supplied by this task}"
case "$TASK_REPO" in /*) ;; *) echo 'Absolute task repository required' >&2; exit 1;; esac
for key in GIT_DIR GIT_WORK_TREE GIT_INDEX_FILE GIT_COMMON_DIR GIT_OBJECT_DIRECTORY GIT_ALTERNATE_OBJECT_DIRECTORIES; do
  unset "$key"
done
export GIT_NO_LAZY_FETCH=1 GIT_NO_REPLACE_OBJECTS=1
git -C "$TASK_REPO" -c fetch.negotiationAlgorithm=noop fetch --no-tags --no-recurse-submodules \
  --no-auto-maintenance --filter=blob:none origin +refs/heads/main:refs/remotes/origin/main || exit
fetched=$(git -C "$TASK_REPO" rev-parse --verify 'FETCH_HEAD^{commit}') || exit
tracked=$(git -C "$TASK_REPO" rev-parse --verify 'origin/main^{commit}') || exit
[ "$fetched" = "$tracked" ] || { echo 'Fetched main does not match origin/main' >&2; exit 1; }
base=$tracked
python3 - "$TASK_REPO" "$base" inspect --commit "$base" \
  --include data/YOUR-REQUIRED-PATH <<'PYTHON'
import os, re, subprocess, sys, tempfile
from pathlib import Path
repo, base, *args = sys.argv[1:]
if not Path(repo).is_absolute():
    raise SystemExit('Absolute task repository required')
repo = str(Path(repo).resolve(strict=True))
if not re.fullmatch('[a-f0-9]{40}', base):
    raise SystemExit('Exact accepted commit required')
env = dict(os.environ, GIT_NO_LAZY_FETCH='1', GIT_NO_REPLACE_OBJECTS='1')
for key in ('GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR',
            'GIT_OBJECT_DIRECTORY', 'GIT_ALTERNATE_OBJECT_DIRECTORIES'):
    env.pop(key, None)
def git(*args, **kwargs):
    return subprocess.check_output(['git', '-C', repo, '--no-replace-objects', *args], env=env, **kwargs)
common = Path(git('rev-parse', '--path-format=absolute', '--git-common-dir').decode().strip()).resolve(strict=True)
sources = {}
for name in ('local-workspace.mjs', 'worker-identity.mjs'):
    row = git('ls-tree', '-z', base, '--', 'scripts/' + name).rstrip(b'\0')
    metadata, member = row.split(b'\t')
    mode, kind, oid = metadata.decode().split()
    if mode not in ('100644', '100755') or kind != 'blob' or member != ('scripts/' + name).encode():
        raise SystemExit('Ordinary pinned helper required')
    present = git('-c', 'core.commitGraph=false', 'rev-list', '--objects', '--filter=tree:0',
                  '--missing=print', '--ignore-missing', '--no-walk=unsorted', '--no-object-names',
                  '--stdin', input=oid.encode() + b'\n').decode().strip()
    if present != oid:
        raise SystemExit('Pinned helper missing; coordinate exact-object acquisition')
    status = git('cat-file', '--batch-check=%(objectname) %(objecttype) %(objectsize)', input=oid.encode() + b'\n').decode().split()
    if len(status) != 3 or status[0] != oid or status[1] != 'blob' or not status[2].isdigit():
        raise SystemExit('Pinned helper missing; coordinate exact-object acquisition')
    sources[name] = git('cat-file', 'blob', oid)
with tempfile.TemporaryDirectory(prefix='worldatlas-helper-', dir=common) as directory:
    for name, body in sources.items():
        with (Path(directory) / name).open('xb') as output:
            output.write(body)
    result = subprocess.call(['node', str(Path(directory) / 'local-workspace.mjs'), *args], env=env)
sys.exit(result)
PYTHON
)
```

Keep every original `--include` value, including new owned output paths. Replace
`inspect --commit "$base" ...` with the documented `check`, `allocate` or `release`
arguments when needed. The current helper still enforces the shared registry,
ownership, locks and storage policy. A later main refresh during author allocation
may add required inputs; inspect its new exact head rather than reusing old OIDs.

