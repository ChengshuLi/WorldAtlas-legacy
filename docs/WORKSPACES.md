# Owned local workspaces

Use `scripts/local-workspace.mjs` for managed author and review checkouts. Read its current CLI help and implementation for the exact arguments and guards; this document states the stable contract, not a second option specification. Use Node 24 and the task's actual repository binding. A workspace is owned by the worker identity and slot recorded by the allocator; retain its returned path and ownership token privately for the matching release.

The supported `allocate`, `resume`, `report`, `check`, `inspect` and `release` operations enforce repository, branch/commit and ownership constraints. `resume` recovers only the helper's eligible interrupted preparation; it is not a chat-instruction reload, rebase or refresh of active work. New author allocations fetch accepted `main` through the explicit tracked-main refspec, verify `FETCH_HEAD` equals `origin/main`, and freeze that commit. Exact-head review slots remain detached at the requested commit. Verify current accepted instructions separately before resuming a chat.

The common Git store contains shared objects, refs and allocator state; do not hand-edit its registry, borrow another worker's token, or remove another worker's checkout, ref or evidence. Sparse selection is storage, not permission to omit required inputs or weaken a check. Include exact packet/source/data inputs required by the task; missing selected objects must be acquired only through the supported exact-object path. Do not broadly hydrate unrelated history or data.

Use the helper's release operation only for the exact completed owned slot, with its recorded capability. Do not `reset`, clean, prune or delete shared storage to recover space. Remove a generated file only after operator review proves it is the exact reproducible duplicate, its current bytes/mode match its protected source, and no unique evidence depends on it. Preserve dirty primary checkouts and all other owners' work.

For stale-helper bootstrap, follow the versioned procedure implemented by the accepted helper and repository documentation; bind the task repository explicitly, fetch the current branch with the explicit main refspec, verify the fetched and tracked hashes match, then execute the pinned helper. Do not fall back to an old executable after refresh failure. Allocator mechanics and supported selections are authoritative in `scripts/local-workspace.mjs` and its tested contracts.
## Refresh a stale checkout without changing its files

The helper that starts an allocation runs before the new checkout exists. Running
an old primary checkout's script can therefore keep using a previously repaired
allocator. Before a new job, refresh `origin/main` with blob filtering, pin its
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
git -C "$TASK_REPO" -c fetch.negotiationAlgorithm=noop fetch --no-tags --no-recurse-submodules \
  --no-auto-maintenance --filter=blob:none origin +refs/heads/main:refs/remotes/origin/main || exit
fetched=$(GIT_NO_LAZY_FETCH=1 git -C "$TASK_REPO" rev-parse --verify 'FETCH_HEAD^{commit}') || exit
tracked=$(GIT_NO_LAZY_FETCH=1 git -C "$TASK_REPO" rev-parse --verify 'origin/main^{commit}') || exit
[ "$fetched" = "$tracked" ] || { echo 'Fetched main does not match origin/main' >&2; exit 1; }
base=$tracked
GIT_NO_LAZY_FETCH=1 python3 - "$TASK_REPO" "$base" inspect --commit "$base" \
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

