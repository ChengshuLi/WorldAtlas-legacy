import {assertAuthorWorkerIdentity} from './worker-identity.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync, spawnSync} from 'node:child_process';
import {createHash, randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const support = ['docs', 'scripts', 'test', 'src', 'hosted', 'drizzle', '.github', '.agents', 'coordination/templates'];
const engineeringCode = name => name.startsWith('coordination/engineering/') && /\.(?:mjs|js|cjs|py|sh)$/.test(name);
const id = value => typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/.test(value);
const operatorReleaseAuthorization = 'team3-bra-tgo-orphaned-slots';
const partialRemovalBranch = 'geography/tls-original-repair-20261028-finalize021';
const safeInclude = value => typeof value === 'string' && /^(data|research|coordination)\/[a-zA-Z0-9_./-]+$/.test(value)
  && value.split('/').every(part => part && part !== '.' && part !== '..');

// No shell, background mutations, timeout retries, or automatic lock breaking.
export function workspaceManager(repo, {freeBytes, onStartupGuidance,
  acquisitionExecute, loadTree, inspectReaders} = {}) {
  // Every Git command is explicitly rooted with `-C`; inherited repository/index
  // selectors would override that path and mutate an unrelated checkout. Keep the
  // sanitized environment invocation-local; never rewrite the parent process.
  const noLazyFetch = {...process.env};
  for (const key of ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR',
    'GIT_OBJECT_DIRECTORY', 'GIT_ALTERNATE_OBJECT_DIRECTORIES']) delete noLazyFetch[key];
  noLazyFetch.GIT_NO_LAZY_FETCH = '1';
  noLazyFetch.GIT_NO_REPLACE_OBJECTS = '1';
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], {encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: noLazyFetch});
  const objectGit = (args, input, maxBuffer = 128 * 1024) => {
    const result = spawnSync('git', ['-C', repo, ...args], {input, encoding: 'utf8', maxBuffer, env: noLazyFetch});
    if (result.error) throw result.error;
    // Some Git object-info commands report corruption but still exit zero.
    // Never turn diagnostics or a failed read into an absent-object inventory.
    if (result.status !== 0 || result.stderr) throw Error(result.stderr?.trim() || 'Git object inspection failed');
    return result.stdout;
  };
  const probe = (oids, {objects = true, filter = 'tree:0', maxBuffer} = {}) => {
    // --missing disables fetch before revision parsing, including in Git 2.39.
    // GIT_NO_LAZY_FETCH alone can instead abort on a promised absent object.
    // Blob-only batches and the separate commit probe never walk descendants.
    const output = objectGit(['-c', 'core.commitGraph=false', 'rev-list', '--missing=print', '--ignore-missing',
      '--no-walk=unsorted', '--no-object-names', ...(objects ? ['--objects', `--filter=${filter}`] : []), '--stdin'],
    oids.join('\n') + '\n', maxBuffer);
    const rows = output.trimEnd().split('\n').filter(Boolean);
    if (rows.some(row => !/^\??[a-f0-9]{40,64}$/.test(row)) || new Set(rows).size !== rows.length) throw Error('Unknown object inventory');
    return rows;
  };
  const requireCommit = commit => {
    const rows = probe([commit], {objects: false});
    if (rows.length !== 1 || rows[0] !== commit) throw Error(`Exact commit unavailable locally: ${commit} (missing or not a commit); selected inventory cannot be enumerated`);
    return commit;
  };
  const common = fs.realpathSync(git('rev-parse', '--path-format=absolute', '--git-common-dir').trim());
  // Remote metadata belongs to the shared repository even when this manager
  // was invoked from one linked checkout. Worktree-local `FETCH_HEAD` is not
  // the allocator's base-selection state and must not be refreshed by allocate.
  const gitCommon = (...args) => execFileSync('git', ['--git-dir', common, ...args], {
    encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: noLazyFetch
  });
  const registry = path.join(common, 'worldatlas-local-workspaces');
  const root = path.resolve(common, '../../.worldatlas-workspaces', createHash('sha256').update(common).digest('hex').slice(0, 16));
  const stateFile = path.join(registry, 'state.json');
  const lock = path.join(registry, 'lock');
  const capabilityDirectory = path.join(registry, 'capabilities');
  const auditDirectory = path.join(registry, 'audit');
  const partialRemovalAuditDirectory = path.join(registry, 'partial-removal-audit');
  const partialArchivePath = (worker, slot, head, inventorySha256) => path.join(root, 'retained-partial-removals',
    createHash('sha256').update(`${worker}\0${slot}\0${head}\0${inventorySha256}`).digest('hex'));
  const state = () => {
    if (!fs.existsSync(stateFile)) return {version: 1, entries: []};
    if (!fs.lstatSync(stateFile).isFile() || fs.lstatSync(stateFile).isSymbolicLink()) throw Error('Registry must be an ordinary file');
    const value = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    if (value.version !== 1 || !Array.isArray(value.entries)) throw Error('Unknown workspace registry; inspect manually');
    for (const entry of value.entries) {
      if (!id(entry.worker) || !['work', 'review'].includes(entry.slot) || !id(entry.token)
        || entry.path !== slotPath(entry.worker, entry.slot) || !/^[a-f0-9]{40}$/.test(entry.head)) throw Error('Invalid workspace registry; inspect manually');
    }
    if (new Set(value.entries.map(entry => entry.path)).size !== value.entries.length) throw Error('Duplicate workspace registry entries');
    return value;
  };
  const save = value => {
    const temporary = `${stateFile}.${randomUUID()}.tmp`;
    let descriptor;
    let created = false;
    try {
      descriptor = fs.openSync(temporary, 'wx');
      created = true;
      fs.writeFileSync(descriptor, JSON.stringify(value, null, 2) + '\n');
      fs.closeSync(descriptor); descriptor = undefined;
      fs.renameSync(temporary, stateFile);
    } catch (error) {
      // The random temporary name was created exclusively by this operation;
      // remove only that exact incomplete file and preserve the prior registry.
      if (descriptor !== undefined) fs.closeSync(descriptor);
      if (created && fs.lstatSync(temporary, {throwIfNoEntry: false})) fs.unlinkSync(temporary);
      throw error;
    }
  };
  const slotPath = (worker, slot) => path.join(root, createHash('sha256').update(worker).digest('hex'), slot);
  const capabilityPath = (worker, slot) => path.join(capabilityDirectory,
    `${createHash('sha256').update(worker).digest('hex')}-${slot}.json`);
  const ordinaryDirectory = directory => {
    for (let current = directory; current !== path.dirname(current); current = path.dirname(current)) {
      if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw Error(`Symlink directory refused: ${current}`);
    }
  };
  const privateCapabilityDirectory = ({create = false} = {}) => {
    ordinaryDirectory(capabilityDirectory);
    if (create && !fs.existsSync(capabilityDirectory)) fs.mkdirSync(capabilityDirectory, {mode: 0o700});
    const stat = fs.lstatSync(capabilityDirectory);
    if (!stat.isDirectory() || stat.isSymbolicLink() || (stat.mode & 0o077) !== 0 ||
      typeof process.getuid === 'function' && stat.uid !== process.getuid()) {
      throw Error('Private capability directory is not owner-only; inspect manually');
    }
    return stat;
  };
  const readCapability = ({worker, slot, entry, requestedPath}) => {
    const expectedPath = capabilityPath(worker, slot);
    if (requestedPath !== undefined && path.resolve(requestedPath) !== expectedPath) {
      throw Error('Capability file must be the exact private file for this owner and slot');
    }
    privateCapabilityDirectory();
    ordinaryDirectory(expectedPath);
    const before = fs.lstatSync(expectedPath);
    if (!before.isFile() || before.isSymbolicLink() || (before.mode & 0o077) !== 0 || (before.mode & 0o600) !== 0o600 ||
      typeof process.getuid === 'function' && before.uid !== process.getuid()) {
      throw Error('Capability file is not a private ordinary owner file; inspect manually');
    }
    const bytes = fs.readFileSync(expectedPath);
    let record;
    try { record = JSON.parse(bytes); } catch { throw Error('Capability file is malformed; inspect manually'); }
    const keys = ['branch','head','observed_head','path','slot','token','version','worker'];
    if (!record || Object.keys(record).sort().join(',') !== keys.join(',') || record.version !== 1 ||
      record.worker !== worker || record.slot !== slot || record.path !== entry.path ||
      record.branch !== entry.branch || record.head !== entry.head ||
      !/^[a-f0-9]{40}$/.test(record.observed_head ?? '') || !id(record.token)) {
      throw Error('Capability file does not match the exact registered workspace; inspect manually');
    }
    const after = fs.lstatSync(expectedPath);
    if (['dev','ino','size','mode','mtimeMs','ctimeMs'].some(key => before[key] !== after[key]) ||
      !bytes.equals(fs.readFileSync(expectedPath))) {
      throw Error('Capability file changed while being checked; inspect manually');
    }
    return {path: expectedPath, token: record.token, bytes, stat: after, record};
  };
  const persistCapability = (record, expectedPath, previous) => {
    privateCapabilityDirectory({create: true});
    const temporary = `${expectedPath}.${randomUUID()}.tmp`;
    const bytes = Buffer.from(JSON.stringify(record, null, 2) + '\n');
    let descriptor;
    let created = false;
    try {
      descriptor = fs.openSync(temporary, 'wx', 0o600);
      created = true;
      fs.writeFileSync(descriptor, bytes);
      fs.fsyncSync(descriptor);
      fs.closeSync(descriptor); descriptor = undefined;
      // A prior file is replaced only after it was validated as the registered
      // current capability or a bound interrupted replacement.
      if (previous) {
        const before = fs.lstatSync(expectedPath);
        const current = fs.readFileSync(expectedPath);
        if (['dev','ino','size','mode','mtimeMs','ctimeMs'].some(key => previous.stat[key] !== before[key]) ||
          !previous.bytes.equals(current)) throw Error('Capability file changed before atomic replacement; inspect manually');
      } else if (fs.lstatSync(expectedPath, {throwIfNoEntry: false})) {
        throw Error('An unknown capability file appeared; inspect manually');
      }
      fs.renameSync(temporary, expectedPath);
      const directoryDescriptor = fs.openSync(capabilityDirectory, 'r');
      try { fs.fsyncSync(directoryDescriptor); } finally { fs.closeSync(directoryDescriptor); }
    } catch (error) {
      if (descriptor !== undefined) fs.closeSync(descriptor);
      if (created && fs.lstatSync(temporary, {throwIfNoEntry: false})) fs.unlinkSync(temporary);
      throw error;
    }
  };
  const removeUnregisteredCapability = saved => {
    if (state().entries.some(entry => entry.worker === saved.record.worker && entry.slot === saved.record.slot)) return false;
    const current = fs.lstatSync(saved.path, {throwIfNoEntry: false});
    if (!current) return true;
    if (!current.isFile() || current.isSymbolicLink()) return false;
    const bytes = fs.readFileSync(saved.path);
    const after = fs.lstatSync(saved.path);
    if (['dev','ino','size','mode','mtimeMs','ctimeMs'].some(key => saved.stat[key] !== after[key]) ||
      !saved.bytes.equals(bytes) || !bytes.equals(fs.readFileSync(saved.path))) return false;
    fs.unlinkSync(saved.path);
    const directoryDescriptor = fs.openSync(capabilityDirectory, 'r');
    try { fs.fsyncSync(directoryDescriptor); } finally { fs.closeSync(directoryDescriptor); }
    return true;
  };
  const recoverySnapshot = (worker, slot, entry, expectedPath, expectedBranch, expectedHead) => {
    if (!id(worker) || slot !== 'work' || entry.worker !== worker || entry.slot !== slot ||
      entry.status !== 'ready' || expectedPath !== slotPath(worker, slot) || entry.path !== expectedPath ||
      !expectedBranch || expectedBranch !== entry.branch || expectedBranch === 'main' ||
      !/^[a-f0-9]{40}$/.test(expectedHead ?? '')) {
      throw Error('Lost-capability recovery requires the exact existing owner work slot and path/branch/head');
    }
    ordinaryDirectory(entry.path);
    const directory = fs.lstatSync(entry.path);
    if (!directory.isDirectory() || directory.isSymbolicLink()) throw Error('Owned checkout path is not an ordinary directory');
    const localGit = (...args) => execFileSync('git', ['-C', entry.path, ...args],
      {encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: noLazyFetch});
    if (fs.realpathSync(localGit('rev-parse', '--show-toplevel').trim()) !== fs.realpathSync(entry.path) ||
      fs.realpathSync(localGit('rev-parse', '--path-format=absolute', '--git-common-dir').trim()) !== common ||
      localGit('rev-parse', 'HEAD').trim() !== expectedHead ||
      localGit('symbolic-ref', '--quiet', 'HEAD').trim() !== `refs/heads/${expectedBranch}` ||
      git(`rev-parse`, '--verify', `refs/heads/${expectedBranch}`).trim() !== expectedHead ||
      !worktrees(false).some(item => item.path === entry.path)) {
      throw Error('Owned checkout Git identity, branch, HEAD or registration changed; inspect manually');
    }
    const gitDirectory = path.resolve(localGit('rev-parse', '--absolute-git-dir').trim());
    const lockPaths = [path.join(gitDirectory, 'index.lock'), path.join(gitDirectory, 'HEAD.lock'),
      path.join(common, 'packed-refs.lock'), path.join(common, 'config.lock'),
      `${path.join(common, 'refs', 'heads', expectedBranch)}.lock`];
    if (lockPaths.some(file => fs.lstatSync(file, {throwIfNoEntry: false}))) {
      throw Error('Git writer lock exists for the owned checkout; preserve it for inspection');
    }
    const inProgress = ['MERGE_HEAD','CHERRY_PICK_HEAD','REVERT_HEAD','BISECT_LOG','rebase-apply','rebase-merge']
      .map(name => path.join(gitDirectory, name));
    if (inProgress.some(file => fs.lstatSync(file, {throwIfNoEntry: false}))) {
      throw Error('Git operation is in progress for the owned checkout; preserve it for inspection');
    }
    for (const row of localGit('ls-files', '-vz').split('\0').filter(Boolean)) {
      if (/[a-z]/.test(row[0]) || row[0] === 'S' && fs.lstatSync(path.join(entry.path, row.slice(2)), {throwIfNoEntry: false})) {
        throw Error('Index trust flags can hide edits; inspect materialized files before recovery');
      }
    }
    if (localGit('status', '--porcelain', '--untracked-files=all', '--ignored')) {
      throw Error('Owned checkout is dirty or contains ignored files; preserve it for inspection');
    }
    return {entry, localGit};
  };
  const locked = operation => {
    ordinaryDirectory(registry);
    fs.mkdirSync(registry, {recursive: true});
    try { fs.mkdirSync(lock); } catch (error) {
      if (error.code === 'EEXIST') throw Error('Workspace allocation is locked; retry later. Never break a lock without operator inspection.');
      throw error;
    }
    try { return operation(); } finally { fs.rmdirSync(lock); }
  };
  const worktrees = (measure = true) => {
    const output = git('worktree', 'list', '--porcelain', '-z');
    if (!output.endsWith('\0\0')) throw Error('Incomplete worktree inventory');
    return output.slice(0, -2).split('\0\0').map(block => {
      const [first, ...fields] = block.split('\0');
      const directory = first.startsWith('worktree ') ? first.slice(9) : null;
      if (!directory || !path.isAbsolute(directory) || fields.some(field => field.startsWith('worktree '))) throw Error('Incomplete worktree inventory');
      ordinaryDirectory(directory);
      if (!measure) return {path: directory};
      // Missing/prunable paths need explicit inspection; they are not zero-cost proof.
      const bytes = Number(execFileSync('du', ['-sk', directory], {encoding: 'utf8'}).split(/\s/)[0]) * 1024;
      if (!Number.isSafeInteger(bytes) || bytes < 0) throw Error('Unknown checkout usage');
      return {path: directory, bytes};
    });
  };
  const availableBytes = () => {
    const stats = fs.statfsSync(common);
    return freeBytes ? freeBytes() : stats.bavail * stats.bsize;
  };
  const report = ({worker = process.env.CODEX_THREAD_ID || undefined} = {}) => {
    // Reports are a per-worker view, never a registry dump. The worker selector
    // is bound to this process identity; callers cannot inspect another slot by
    // supplying an arbitrary owner ID. Capability tokens are intentionally not
    // part of the report schema.
    if (worker !== undefined && (!id(worker) || worker !== process.env.CODEX_THREAD_ID)) {
      throw Error('Workspace report is limited to the current CODEX_THREAD_ID');
    }
    const value = state();
    const inventory = worktrees();
    for (const item of inventory) {
      const entry = value.entries.find(entry => entry.path === item.path);
      item.managed = Boolean(entry);
    }
    const entries = worker ? value.entries.filter(entry => entry.worker === worker).map(entry => ({
      worker: entry.worker, slot: entry.slot, path: entry.path, head: entry.head, branch: entry.branch,
      profile: entry.profile, include: entry.include, reservation: entry.reservation,
      status: entry.status, createdAt: entry.createdAt
    })) : [];
    const ownedPaths = new Set(entries.map(entry => entry.path));
    const ownedWorktrees = inventory.filter(item => ownedPaths.has(item.path));
    const checkoutBytes = ownedWorktrees.reduce((sum, item) => sum + item.bytes, 0);
    return {root, registry, freeBytes: availableBytes(), checkoutBytes, entries, worktrees: ownedWorktrees};
  };
  const inputInventory = (head, profile, include) => {
    requireCommit(head);
    // Check metadata without blob reads before ls-tree can attempt to recover a
    // missing tree. Unknown descendants mean no complete selected inventory.
    const metadata = probe([head], {filter: 'blob:none', maxBuffer: 32 * 1024 * 1024});
    const missingTrees = metadata.filter(row => row.startsWith('?')).map(row => row.slice(1));
    if (missingTrees.length) throw Error(`Missing tree metadata: ${missingTrees.join(', ')}; selected inventory cannot be enumerated`);
    // Tree metadata needs no blob contents. Global -l sizing can fetch excluded
    // promisor blobs, or abort on them before sparse filtering on some Git versions.
    const tree = git('ls-tree', '--full-tree', '-rz', head).split('\0').filter(Boolean).map(line => {
      const separator = line.indexOf('\t');
      const [mode, type, oid] = line.slice(0, separator).split(' ');
      if (separator < 0 || !/^[0-7]{6}$/.test(mode) || !/^[a-f0-9]{40,64}$/.test(oid)) throw Error('Unknown tree entry');
      return {mode, type, oid, name: line.slice(separator + 1)};
    });
    // Shared entry points import retained engineering helpers. Include code, not
    // their adjacent scientific inputs/products, without parsing or running it.
    const code = profile === 'sparse' ? tree.filter(({name}) => engineeringCode(name)) : [];
    for (const {name, mode, type} of code) {
      if (!safeInclude(name) || type !== 'blob' || !['100644', '100755'].includes(mode)) {
        throw Error(`Engineering support code needs an ordinary file and safe literal path: ${name}`);
      }
    }
    const selected = [...support, ...include];
    const codePaths = new Set(code.map(({name}) => name));
    const inputs = tree.filter(({name}) => profile === 'full' || !name.includes('/')
      || codePaths.has(name) || selected.some(prefix => name === prefix || name.startsWith(prefix + '/')));
    for (const {type} of inputs) {
      if (type === 'commit') throw Error('Submodule inputs need a separate bounded plan');
      if (type !== 'blob') throw Error('Unknown input type');
    }
    let estimated = 0;
    const missing = new Map();
    // Bound each request/response, not the overall admitted input count. Repeated
    // OIDs still count once per selected path, matching materialized checkout bytes.
    for (let offset = 0; offset < inputs.length; offset += 1024) {
      const batch = inputs.slice(offset, offset + 1024);
      const oids = [...new Set(batch.map(({oid}) => oid))];
      const available = probe(oids);
      if (available.some(oid => !oids.includes(oid))) throw Error('Unknown object inventory');
      const sizes = available.length ? objectGit(['cat-file', '--batch-check=%(objectname) %(objecttype) %(objectsize)'],
        available.join('\n') + '\n').trimEnd().split('\n') : [];
      if (sizes.length !== available.length) throw Error('Unknown input size');
      const bytes = new Map();
      for (let index = 0; index < available.length; index++) {
        const [oid, type, size, extra] = sizes[index].split(' ');
        if (oid !== available[index] || extra !== undefined || type !== 'blob' || !/^\d+$/.test(size)
          || !Number.isSafeInteger(Number(size))) throw Error('Unknown input size');
        bytes.set(oid, Number(size));
      }
      for (const input of batch) {
        const {oid, name} = input;
        if (!bytes.has(oid)) {
          if (!missing.has(oid)) missing.set(oid, {oid, paths: []});
          missing.get(oid).paths.push(name);
          input.bytes = null;
          continue;
        }
        input.bytes = bytes.get(oid);
        estimated += input.bytes;
        if (!Number.isSafeInteger(estimated)) throw Error('Selected inputs must represent a safe finite byte count');
      }
    }
    const sparsePatterns = [...selected.map(prefix => `/${prefix}${tree.some(({name}) => name.startsWith(prefix + '/')) ? '/' : ''}`),
      ...codePaths.values().map(name => `/${name}`)];
    return {inputs, sparsePatterns, estimated, missing: [...missing.values()]};
  };
  const inspect = ({commit, profile = 'sparse', include = []}) => {
    if (!/^[a-f0-9]{40}$/.test(commit ?? '')) throw Error('Inspection needs an exact locally available 40-character commit');
    if (!['sparse', 'full'].includes(profile) || !Array.isArray(include) || !include.every(safeInclude)) throw Error('Use sparse/full profile and literal data/research/coordination paths without traversal or globs');
    const head = commit;
    const {inputs, estimated, missing} = inputInventory(head, profile, include);
    return {head, profile, include, inputCount: inputs.length, availableBytes: estimated,
      selectedBytes: missing.length ? null : estimated,
      inputs: inputs.map(({name, oid, bytes}) => ({path: name, oid, bytes})), missing};
  };
  const materialize = (entry, sparsePatterns) => {
    if (entry.profile === 'sparse') {
      execFileSync('git', ['-C', entry.path, 'sparse-checkout', 'set', '--no-cone', '--stdin'], {
        input: ['/*', '!/*/', ...sparsePatterns].join('\n') + '\n', encoding: 'utf8', env: noLazyFetch});
    }
    execFileSync('git', ['-C', entry.path, 'read-tree', '-mu', 'HEAD'], {env: noLazyFetch});
  };
  const selectedBytes = async (head, inventory) => {
    if (!inventory.missing.length) return inventory.estimated;
    const {createAcquisition, createGitHubTokenProvider, githubTree, deliveryAcquisitionExecute} = await import('./geography-prefetch.mjs');
    // Resolve only missing selected paths against the exact accepted commit tree.
    // githubTree supplies metadata only; descriptor() independently binds each
    // selected path/OID/mode to the local exact commit before any body is fetched.
    const getToken = createGitHubTokenProvider();
    const loadMetadata = loadTree ?? ((version, recursive) => githubTree(version, recursive, {getToken}));
    const acquisition = createAcquisition({repo, loadTree: loadMetadata,
      execute: acquisitionExecute ?? deliveryAcquisitionExecute({getToken}), token: ''});
    const missingInputs = inventory.inputs.filter(input => input.bytes === null);
    const paths = await Promise.all(missingInputs.map(input => acquisition.descriptor(head, input.name,
      {mode: input.mode, git_blob_oid: input.oid})));
    const byPath = new Map();
    const unique = new Map();
    for (let index = 0; index < missingInputs.length; index++) {
      const input = missingInputs[index], row = paths[index];
      if (row.oid !== input.oid) throw Error(`Selected input differs from exact tree: ${input.name}`);
      byPath.set(input.name, row);
      const previous = unique.get(row.oid);
      if (previous && previous.bytes !== row.bytes) throw Error('Conflicting selected object lengths');
      if (!previous) unique.set(row.oid, row);
    }
    let checkoutBytes = 0;
    for (const input of inventory.inputs) {
      const bytes = input.bytes ?? byPath.get(input.name)?.bytes;
      if (!Number.isSafeInteger(bytes) || bytes < 0 || !Number.isSafeInteger(checkoutBytes + bytes)) {
        throw Error('Unknown selected input size');
      }
      checkoutBytes += bytes;
    }
    const objectBytes = [...unique.values()].reduce((sum, row) => {
      if (!Number.isSafeInteger(sum + row.bytes)) throw Error('Selected objects must represent a safe finite byte count');
      return sum + row.bytes;
    }, 0);
    // Fetch packs retain object headers/indexes in the common store in addition
    // to their uncompressed bodies. Reserve a conservative 1% plus bounded
    // per-object/index overhead rather than assuming object storage is free.
    const objectStorage = objectBytes + Math.ceil(objectBytes / 100) + unique.size * 64 + 4096;
    const required = checkoutBytes + objectStorage;
    if (!Number.isSafeInteger(required) || availableBytes() < required) {
      throw Error('Insufficient free space for exact selected objects and checkout');
    }
    acquisition.acquire([...unique.values()]);
    // acquire() imports complete Git objects but deliberately leaves byte-level
    // validation to body(). Verify every unique object before re-inventorying or
    // making a reservation; failed/partial fetches remain retryable without refs.
    for (const row of unique.values()) acquisition.body(row);
    return checkoutBytes;
  };
  const readStartupGuidance = commit => {
    // The CLI passes its own directory (`scripts/`) as the repository selector.
    // Pin the root entry explicitly so pathspec interpretation cannot depend on
    // that invocation directory.
    const rows = git('ls-tree', '--full-tree', '-z', commit, '--', 'AGENTS.md').split('\0').filter(Boolean);
    if (rows.length !== 1) throw Error(`Verified origin/main ${commit} has no root AGENTS.md; refusing a fresh author allocation`);
    const separator = rows[0].indexOf('\t');
    if (separator < 0 || rows[0].slice(separator + 1) !== 'AGENTS.md') throw Error('Unknown root AGENTS.md tree entry');
    const [mode, type, oid] = rows[0].slice(0, separator).split(' ');
    if (!['100644', '100755'].includes(mode) || type !== 'blob' || !/^[a-f0-9]{40,64}$/.test(oid ?? '')) {
      throw Error('Verified origin/main AGENTS.md is not an ordinary pinned blob');
    }
    const result = spawnSync('git', ['-C', repo, '--no-replace-objects', 'cat-file', 'blob', oid], {
      encoding: null, maxBuffer: 4 * 1024 * 1024, env: noLazyFetch
    });
    if (result.error) throw result.error;
    if (result.status !== 0 || result.stderr?.length) {
      throw Error(`Pinned AGENTS.md blob ${oid} unavailable for verified origin/main ${commit}: ${result.stderr?.toString('utf8').trim() || 'read failed'}`);
    }
    let text;
    try { text = new TextDecoder('utf-8', {fatal: true}).decode(result.stdout); }
    catch { throw Error(`Pinned AGENTS.md blob ${oid} is not valid UTF-8`); }
    if (!text.trim()) throw Error(`Pinned AGENTS.md blob ${oid} is empty`);
    const guides = [...new Set([...text.matchAll(/\[[^\]]+\]\((docs\/[A-Za-z0-9_./-]+\.md)\)/g)].map(match => match[1]))];
    return {commit, path: 'AGENTS.md', gitBlobOid: oid,
      sha256: createHash('sha256').update(result.stdout).digest('hex'), text, guides};
  };
  const allocate = async ({worker, slot = 'work', branch, commit, profile = 'sparse', include = [], createCapabilityFile = false}) => {
    if (!id(worker) || !['work', 'review'].includes(slot)) throw Error('Supply a safe unique worker ID and work/review slot');
    if (!['sparse', 'full'].includes(profile) || !Array.isArray(include) || !include.every(safeInclude)) throw Error('Use sparse/full profile and literal data/research/coordination paths without traversal or globs');
    if (slot === 'work' && (typeof branch !== 'string' || !branch || branch.startsWith('-') || branch === 'main' || commit)) throw Error('Work needs a fresh branch; main is fetched by the allocator');
    if (slot === 'work') git('check-ref-format', `refs/heads/${branch}`);
    if (slot === 'review' && (branch || !/^[a-f0-9]{40}$/.test(commit ?? ''))) throw Error('Review needs an exact detached 40-character commit');
    let fetchedWorkHead, startupGuidance;
    if (slot === 'work') {
      if (git('for-each-ref', '--format=%(refname)', `refs/heads/${branch}`).split('\n').includes(`refs/heads/${branch}`)) {
        throw Error('Fresh branch already exists; choose a new branch without changing its history');
      }
      // Network interruption must not strand the registry lock. Freeze the
      // fetched commit before reserving; later ref movement cannot change it.
      // Request metadata only even from conventional clones; selected missing
      // blobs still need explicit acquisition before the inventory can pass.
      gitCommon('fetch', '--no-tags', '--no-recurse-submodules', '--no-auto-maintenance', '--filter=blob:none',
        'origin', '+refs/heads/main:refs/remotes/origin/main');
      const fetchedMain = gitCommon('rev-parse', '--verify', 'FETCH_HEAD^{commit}').trim();
      const trackingMain = gitCommon('rev-parse', '--verify', 'refs/remotes/origin/main^{commit}').trim();
      if (!/^[a-f0-9]{40}$/.test(fetchedMain) || fetchedMain !== trackingMain) {
        throw Error('Fetched origin/main did not match its remote-tracking ref; refusing a stale startup base');
      }
      // Pin the exact commit just obtained, rather than trusting a possibly stale
      // local branch or an origin/main ref left unchanged by unusual fetch config.
      fetchedWorkHead = fetchedMain;
    }
    const head = slot === 'work' ? fetchedWorkHead : commit;
    // Avoid network acquisition for an already-owned slot or unknown destination.
    // The same checks are repeated under lock immediately before reservation.
    const beforeAcquire = state();
    if (beforeAcquire.entries.some(entry => entry.worker === worker && entry.slot === slot)) throw Error('Slot occupied; finish and release it before allocating another checkout');
    const destinationBeforeAcquire = slotPath(worker, slot);
    ordinaryDirectory(destinationBeforeAcquire);
    if (fs.lstatSync(destinationBeforeAcquire, {throwIfNoEntry: false})) throw Error('Unregistered checkout directory exists; inspect instead of overwriting');
    const initial = inputInventory(head, profile, include);
    await selectedBytes(head, initial);
    // AGENTS.md is part of the selected root-file inventory; acquire and verify
    // it with that exact batch before reading guidance. Never consult the dirty
    // primary working tree or allow Git's lazy-fetch fallback.
    if (slot === 'work' && onStartupGuidance) startupGuidance = readStartupGuidance(fetchedWorkHead);
    const entry = locked(() => {
      const value = state();
      if (value.entries.some(entry => entry.worker === worker && entry.slot === slot)) throw Error('Slot occupied; finish and release it before allocating another checkout');
      const destination = slotPath(worker, slot);
      ordinaryDirectory(destination);
      if (fs.lstatSync(destination, {throwIfNoEntry: false})) throw Error('Unregistered checkout directory exists; inspect instead of overwriting');
      const capability = createCapabilityFile ? capabilityPath(worker, slot) : undefined;
      if (capability && fs.lstatSync(capability, {throwIfNoEntry: false})) {
        throw Error('An unregistered private capability file exists; preserve it for operator inspection');
      }
      const {sparsePatterns, missing, estimated} = inputInventory(head, profile, include);
      if (missing.length) throw Error(`Unknown input size; selected blobs must be available locally. Run inspect --commit ${head} with this same profile/include scope to list missing paths/OIDs.`);
      if (availableBytes() < estimated) throw Error('Insufficient free space for selected workspace checkout');
      const entry = {worker, slot, path: destination, token: randomUUID(), head, branch: branch ?? null,
        profile, include, reservation: 0, status: 'preparing', createdAt: new Date().toISOString()};
      let savedCapability;
      try {
        if (capability) {
          persistCapability({version: 1, worker, slot, path: entry.path, branch: entry.branch,
            head: entry.head, observed_head: head, token: entry.token}, capability);
          savedCapability = readCapability({worker, slot, entry, requestedPath: capability});
        }
        value.entries.push(entry);
        save(value);
      } catch (error) {
        if (savedCapability) {
          try {
            if (!removeUnregisteredCapability(savedCapability)) {
              throw Error('Allocation reservation failed and its exact capability file could not be safely removed; preserve for inspection');
            }
          } catch (inspectionError) {
            throw new AggregateError([error, inspectionError], 'Allocation reservation failed; capability cleanup requires operator inspection');
          }
        }
        throw error;
      }
      try {
        fs.mkdirSync(path.dirname(destination), {recursive: true});
        git('worktree', 'add', '--no-checkout', ...(slot === 'work' ? ['-b', branch] : ['--detach']), destination, head);
      } catch (error) {
        // Undo only our reservation when both filesystem and Git prove no checkout
        // was created. Any partial checkout, unknown state or hard interruption
        // remains recorded for operator inspection. Never remove files or refs.
        try {
          if (!fs.lstatSync(destination, {throwIfNoEntry: false}) && !worktrees(false).some(item => item.path === destination)) {
            value.entries = value.entries.filter(item => item !== entry);
            save(value);
            if (savedCapability && !removeUnregisteredCapability(savedCapability)) {
              throw Error('Allocation rollback left an unbound capability file; preserve it for operator inspection');
            }
          }
        } catch (inspectionError) {
          throw new AggregateError([error, inspectionError], 'Allocation failed; reservation recovery requires operator inspection');
        }
        throw error;
      }
      materialize(entry, sparsePatterns);
      entry.status = 'ready';
      save(value);
      return entry;
    });
    if (startupGuidance && onStartupGuidance) onStartupGuidance(startupGuidance);
    return entry;
  };

  const ensureCapabilityFile = ({worker, slot = 'work'}) => locked(() => {
    const value = state();
    const matches = value.entries.filter(item => item.worker === worker && item.slot === slot);
    if (matches.length !== 1 || matches[0].status !== 'ready') {
      throw Error('Capability-file output requires the exact ready owner slot');
    }
    const entry = matches[0];
    const file = capabilityPath(worker, slot);
    if (fs.lstatSync(file, {throwIfNoEntry: false})) {
      const current = readCapability({worker, slot, entry, requestedPath: file});
      if (current.token !== entry.token || current.record.observed_head !== entry.head) {
        throw Error('Current private capability does not match the exact ready owner slot; inspect manually');
      }
      return file;
    }
    const record = {version: 1, worker, slot, path: entry.path, branch: entry.branch,
      head: entry.head, observed_head: entry.head, token: entry.token};
    persistCapability(record, file);
    const saved = readCapability({worker, slot, entry, requestedPath: file});
    if (saved.token !== entry.token || saved.record.observed_head !== entry.head) {
      throw Error('Created capability file does not match the exact ready owner slot; inspect manually');
    }
    return file;
  });
  const capabilityFilePath = ({worker, slot = 'work'}) => {
    if (!id(worker) || !['work', 'review'].includes(slot)) throw Error('Supply an exact owner and work/review slot');
    return capabilityPath(worker, slot);
  };

  // Resume only an exact interrupted reservation. This deliberately refuses any
  // materialized/unknown state; a failed materialization is preserved for review.
  const resume = ({worker, slot = 'work', token, capabilityFile}) => locked(() => {
    if (token !== undefined && capabilityFile !== undefined) throw Error('Use either an owner token or its private capability file, not both');
    const value = state();
    const entry = value.entries.find(item => item.worker === worker && item.slot === slot);
    if (capabilityFile !== undefined) {
      if (!entry) throw Error('Exact current slot ownership token required');
      token = readCapability({worker, slot, entry, requestedPath: capabilityFile}).token;
    }
    if (!id(worker) || slot !== 'work' || !id(token)) throw Error('Resume requires an exact work-slot owner and token or capability file');
    if (!entry || entry.token !== token) throw Error('Exact current slot ownership token required');
    if (entry.status !== 'preparing') throw Error('Only an interrupted preparing workspace can be resumed');
    if (entry.path !== slotPath(worker, slot) || !entry.branch || entry.branch === 'main' || entry.branch.startsWith('-')
      || !/^[a-f0-9]{40}$/.test(entry.head) || !['sparse', 'full'].includes(entry.profile)
      || !Array.isArray(entry.include) || !entry.include.every(safeInclude)) {
      throw Error('Preparing reservation identity is incomplete or changed; inspect manually');
    }
    git('check-ref-format', `refs/heads/${entry.branch}`);
    ordinaryDirectory(entry.path);
    const directory = fs.lstatSync(entry.path, {throwIfNoEntry: false});
    if (!directory || !directory.isDirectory() || directory.isSymbolicLink()) throw Error('Preparing checkout path is missing or not an ordinary directory');
    const names = fs.readdirSync(entry.path).sort();
    if (names.length !== 1 || names[0] !== '.git') throw Error('Preparing checkout is not empty; preserve it for operator inspection');
    const dotGit = fs.lstatSync(path.join(entry.path, '.git'));
    if (!dotGit.isFile() || dotGit.isSymbolicLink()) throw Error('Preparing checkout Git link is not an ordinary file');
    const localGit = (...args) => execFileSync('git', ['-C', entry.path, ...args],
      {encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: noLazyFetch});
    if (fs.realpathSync(localGit('rev-parse', '--show-toplevel').trim()) !== fs.realpathSync(entry.path)
      || fs.realpathSync(localGit('rev-parse', '--path-format=absolute', '--git-common-dir').trim()) !== common) {
      throw Error('Preparing directory is not linked to the expected common Git repository');
    }
    if (localGit('rev-parse', 'HEAD').trim() !== entry.head
      || localGit('symbolic-ref', '--quiet', 'HEAD').trim() !== `refs/heads/${entry.branch}`
      || git('rev-parse', '--verify', `refs/heads/${entry.branch}`).trim() !== entry.head) {
      throw Error('Preparing checkout branch or HEAD changed; preserve it for operator inspection');
    }
    if (!worktrees(false).some(item => item.path === entry.path)) throw Error('Preparing directory is not a registered linked worktree');
    if (localGit('ls-files', '--stage', '-z')) throw Error('Preparing checkout index is not empty; preserve it for operator inspection');
    if (localGit('ls-files', '--others', '--exclude-standard', '-z')
      || localGit('ls-files', '--others', '--ignored', '--exclude-standard', '-z')) {
      throw Error('Preparing checkout contains untracked or ignored files; preserve it for operator inspection');
    }
    const {sparsePatterns, missing} = inputInventory(entry.head, entry.profile, entry.include);
    if (missing.length) throw Error('Preparing checkout selected inputs are unavailable; inspect without resuming');
    materialize(entry, sparsePatterns);
    if (localGit('rev-parse', 'HEAD').trim() !== entry.head
      || localGit('symbolic-ref', '--quiet', 'HEAD').trim() !== `refs/heads/${entry.branch}`
      || localGit('status', '--porcelain', '--untracked-files=all', '--ignored')) {
      throw Error('Resume materialization did not produce a clean checkout; preserve it for operator inspection');
    }
    entry.status = 'ready';
    save(value);
    return entry;
  });

  const recoverLostCapability = ({worker, slot = 'work', expectedPath, expectedBranch, expectedHead}) => locked(() => {
    // Unlike an ordinary bearer-token release, this exact-owner recovery cannot
    // be invoked without the current author's worker identity in the process.
    if (!process.env.CODEX_THREAD_ID || process.env.CODEX_THREAD_ID !== worker) {
      throw Error('Lost-capability recovery requires this author’s exact CODEX_THREAD_ID');
    }
    const value = state();
    const matches = value.entries.filter(item => item.worker === worker && item.slot === slot);
    if (matches.length !== 1) throw Error('Exact existing owner work slot is unavailable or ambiguous');
    const entry = matches[0];
    recoverySnapshot(worker, slot, entry, expectedPath, expectedBranch, expectedHead);
    const file = capabilityPath(worker, slot);
    let prior;
    let token;
    if (fs.lstatSync(file, {throwIfNoEntry: false})) {
      prior = readCapability({worker, slot, entry, requestedPath: file});
      if (prior.token === entry.token) {
        throw Error('A current private capability already exists; use it rather than rotating again');
      }
      if (prior.record.observed_head !== expectedHead) {
        throw Error('Interrupted capability replacement is bound to a different HEAD; inspect manually');
      }
      // A private, correctly-bound replacement written before a process
      // interruption can be committed idempotently after repeating every guard.
      token = prior.token;
    } else {
      token = randomUUID();
      const record = {version: 1, worker, slot, path: entry.path, branch: entry.branch,
        head: entry.head, observed_head: expectedHead, token};
      persistCapability(record, file);
      prior = readCapability({worker, slot, entry, requestedPath: file});
    }
    // Recheck Git ownership and byte-stable private capability immediately
    // before the one atomic registry replacement. If this fails, the old token
    // remains current and a valid private recovery record can be safely resumed.
    recoverySnapshot(worker, slot, entry, expectedPath, expectedBranch, expectedHead);
    const current = readCapability({worker, slot, entry, requestedPath: file});
    if (current.token !== token || current.record.observed_head !== expectedHead) {
      throw Error('Private replacement capability changed before registry update; inspect manually');
    }
    entry.token = token;
    save(value);
    return {recovered: true, worker, slot, path: entry.path, branch: entry.branch,
      head: expectedHead, capabilityFile: file, previousTokenInvalidated: true};
  });

  const releaseEntry = ({worker, slot = 'work', token, capabilityFile, operatorAuthorized = false}) => {
    const value = state();
    const entry = value.entries.find(entry => entry.worker === worker && entry.slot === slot);
    let savedCapability;
    if (capabilityFile !== undefined) {
      if (token !== undefined) throw Error('Use either an owner token or its private capability file, not both');
      if (!entry) throw Error('Exact current slot ownership token required');
      savedCapability = readCapability({worker, slot, entry, requestedPath: capabilityFile});
      token = savedCapability.token;
    }
    if (!entry || (!operatorAuthorized && entry.token !== token)) throw Error('Exact current slot ownership token required');
    if (entry.status !== 'ready') throw Error('Interrupted workspace needs operator inspection; automatic release refused');
    ordinaryDirectory(entry.path);
    const inventory = worktrees(false);
    if (!inventory.some(item => item.path === entry.path)) throw Error('Managed checkout missing; inspect registry');
    const localGit = (...args) => execFileSync('git', ['-C', entry.path, ...args], {encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: noLazyFetch});
    if (localGit('rev-parse', '--path-format=absolute', '--git-common-dir').trim() !== common) throw Error('Checkout Git identity changed');
    for (const row of localGit('ls-files', '-vz').split('\0').filter(Boolean)) {
      // Git status/remove can trust assume-unchanged and skip-worktree bits.
      // Absent uppercase S entries are normal sparse omissions, not dirty work.
      if (/[a-z]/.test(row[0]) || row[0] === 'S' && fs.lstatSync(path.join(entry.path, row.slice(2)), {throwIfNoEntry: false})) {
        throw Error('Index trust flags can hide edits; inspect materialized files and clear flags before cleanup');
      }
    }
    if (localGit('status', '--porcelain', '--untracked-files=all')) throw Error('Workspace contains uncommitted or untracked files; preserve unique work first');
    const head = localGit('rev-parse', 'HEAD').trim();
    const ignored = localGit('ls-files', '--others', '--ignored', '--exclude-standard', '-z').split('\0').filter(Boolean);
    let generatedDatabase;
    if (ignored.length) {
      const database = '.cache/package-atlas.sqlite', receiptPath = '.cache/package-input-build.json';
      const refuse = () => { throw Error('Workspace contains unbound or changed ignored files; preserve unique work and remove only verified generated artifacts first'); };
      if (ignored.sort().join('\0') !== [database, receiptPath].sort().join('\0')) refuse();
      ordinaryDirectory(path.join(entry.path, '.cache'));
      const file = path.join(entry.path, database), receiptFile = path.join(entry.path, receiptPath);
      const before = fs.lstatSync(file), receiptBefore = fs.lstatSync(receiptFile);
      if (!before.isFile() || before.isSymbolicLink() || !receiptBefore.isFile() || receiptBefore.isSymbolicLink()) refuse();
      const raw = fs.readFileSync(receiptFile), receipt = JSON.parse(raw), pin = receipt.generated_database;
      const definition = localGit('show', `${head}:.github/package-inputs.json`);
      if (receipt.version !== 1 || !['static','hosted','cloudflare'].includes(receipt.kind) || receipt.preflight?.passed !== true || receipt.preflight?.inputs?.head !== head
        || receipt.preflight.input_definition_sha256 !== receipt.input_definition_sha256 || receipt.input_definition_sha256 !== createHash('sha256').update(definition).digest('hex') || !JSON.parse(definition).generated_outputs?.includes(database)
        || !pin || Object.keys(pin).sort().join(',') !== 'bytes,git_blob_oid,path' || pin.path !== database || !Number.isSafeInteger(pin.bytes) || pin.bytes <= 0 || pin.bytes !== before.size || !/^[a-f0-9]{40}$/.test(pin.git_blob_oid ?? '')) refuse();
      const oid = localGit('-c', 'core.bigFileThreshold=0', 'hash-object', '--no-filters', '--', database).trim();
      const after = fs.lstatSync(file), receiptAfter = fs.lstatSync(receiptFile);
      if (oid !== pin.git_blob_oid || ['dev','ino','size','mode','mtimeMs','ctimeMs'].some(key => before[key] !== after[key] || receiptBefore[key] !== receiptAfter[key]) || !raw.equals(fs.readFileSync(receiptFile))) refuse();
      generatedDatabase = {...pin, producer_head: head, build_receipt_sha256: createHash('sha256').update(raw).digest('hex'), input_definition_sha256: receipt.input_definition_sha256};
    }
    // A release receipt returns this ref name. Never encode a live bearer token
    // in a value that is routinely printed or logged.
    const preservedRef = `refs/worldatlas-local-recovery/${createHash('sha256').update(entry.token).digest('hex')}`;
    git('update-ref', preservedRef, head);
    // Git's own dirty/in-use worktree guards remain enabled; no --force.
    git('worktree', 'remove', entry.path);
    value.entries = value.entries.filter(item => item !== entry);
    save(value);
    let capabilityFileRemoved;
    if (savedCapability) {
      const current = fs.lstatSync(savedCapability.path, {throwIfNoEntry: false});
      const currentBytes = current?.isFile() && !current.isSymbolicLink() ? fs.readFileSync(savedCapability.path) : null;
      if (current && currentBytes && !['dev','ino','size','mode','mtimeMs','ctimeMs'].some(key => savedCapability.stat[key] !== current[key]) &&
        savedCapability.bytes.equals(currentBytes)) {
        fs.unlinkSync(savedCapability.path);
        const directoryDescriptor = fs.openSync(capabilityDirectory, 'r');
        try { fs.fsyncSync(directoryDescriptor); } finally { fs.closeSync(directoryDescriptor); }
        capabilityFileRemoved = true;
      } else capabilityFileRemoved = false;
    }
    return {released: true, path: entry.path, preservedRef, head,
      ...(savedCapability ? {capability_file_removed: capabilityFileRemoved} : {}),
      ...(generatedDatabase ? {removed_generated_database: generatedDatabase} : {})};
  };
  const release = args => locked(() => releaseEntry(args));

  const writeAuditReceipt = (receipt, id) => {
    fs.mkdirSync(auditDirectory, {recursive: true, mode: 0o700});
    const dirStat = fs.lstatSync(auditDirectory);
    if (!dirStat.isDirectory() || dirStat.isSymbolicLink()) throw Error('Audit directory must be ordinary');
    fs.chmodSync(auditDirectory, 0o700);
    const destination = path.join(auditDirectory, `${id}.json`);
    const temporary = path.join(auditDirectory, `.${id}.${randomUUID()}.tmp`);
    const bytes = Buffer.from(JSON.stringify(receipt, null, 2) + '\n');
    const fd = fs.openSync(temporary, 'wx', 0o600);
    try { fs.writeFileSync(fd, bytes); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
    fs.renameSync(temporary, destination);
    const dirFd = fs.openSync(auditDirectory, 'r');
    try { fs.fsyncSync(dirFd); } finally { fs.closeSync(dirFd); }
    return {path: destination, sha256: createHash('sha256').update(bytes).digest('hex')};
  };
  const receiptDigest = value => {
    const body = Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'sha256').sort(([a], [b]) => a.localeCompare(b)));
    return createHash('sha256').update(JSON.stringify(body)).digest('hex');
  };
  const operatorRelease = ({operator, scope, authorizationRef, worker, slot = 'work', expectedPath,
    expectedBranch, expectedHead, reviewReceipt, keeperManifest}) => locked(() => {
    const operatorIdentity = process.env.CODEX_THREAD_ID;
    if (!id(operator) || operatorIdentity !== operator || worker === operator) {
      throw Error('Operator release requires this coordinator’s exact CODEX_THREAD_ID');
    }
    if (!['BRA', 'TGO'].includes(scope) || authorizationRef !== operatorReleaseAuthorization || !id(worker)
      || !['work', 'review'].includes(slot) || !/^[a-f0-9]{40}$/.test(expectedHead ?? '')
      || !expectedBranch || expectedPath !== slotPath(worker, slot)) {
      throw Error('Operator release requires an approved BRA/TGO scope and exact slot/path/branch/HEAD binding');
    }
    if (fs.existsSync(auditDirectory)) {
      ordinaryDirectory(auditDirectory);
      for (const name of fs.readdirSync(auditDirectory)) {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.json$/.test(name)) {
          throw Error('Operator audit contains an unrecognized receipt or interrupted write; inspect before retry');
        }
        const file = path.join(auditDirectory, name), fileStat = fs.lstatSync(file);
        if (!fileStat.isFile() || fileStat.isSymbolicLink() || fileStat.size > 256 * 1024) throw Error('Operator audit contains an unknown nonordinary receipt');
        const previous = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (previous.version !== 1 || previous.operation !== 'operator-release' || previous.id !== name.slice(0, -5)
          || !['pending', 'released', 'failed'].includes(previous.status) || !['BRA', 'TGO'].includes(previous.scope)
          || previous.authorizationRef !== operatorReleaseAuthorization || !id(previous.operator) || !id(previous.reviewer)
          || !id(previous.worker) || previous.operator === previous.worker || previous.operator === previous.reviewer
          || previous.worker === previous.reviewer || !['work', 'review'].includes(previous.slot)
          || previous.path !== slotPath(previous.worker, previous.slot) || typeof previous.branch !== 'string'
          || !/^[a-f0-9]{40}$/.test(previous.head ?? '') || !/^[a-f0-9]{64}$/.test(previous.reviewSha256 ?? '')
          || !/^[a-f0-9]{64}$/.test(previous.keeperManifestSha256 ?? '') || !Array.isArray(previous.keepers)
          || !/^refs\/worldatlas-local-recovery\/[a-f0-9]{64}$/.test(previous.preservedRef ?? '')
          || !Number.isFinite(Date.parse(previous.startedAt ?? ''))) {
          throw Error('Operator audit contains a malformed receipt; inspect before retry');
        }
        if (previous.status === 'pending') throw Error('Operator audit has a pending receipt; inspect before retry');
        if (previous.scope === scope && previous.status === 'released') {
          throw Error(`The ${scope} operator release authorization is already used`);
        }
      }
    }
    if (!reviewReceipt || reviewReceipt.result !== 'PASS' || !id(reviewReceipt.worker) || reviewReceipt.worker === operator
      || reviewReceipt.worker === worker || reviewReceipt.scope !== scope || reviewReceipt.worker_id !== worker
      || reviewReceipt.authorizationRef !== authorizationRef || reviewReceipt.slot !== slot || reviewReceipt.path !== expectedPath || reviewReceipt.branch !== expectedBranch
      || reviewReceipt.head !== expectedHead || !/^[a-f0-9]{64}$/.test(reviewReceipt.sha256 ?? '')
      || receiptDigest(reviewReceipt) !== reviewReceipt.sha256) {
      throw Error('Independent review receipt is missing, stale, or not bound to this exact slot');
    }
    const value = state();
    const entry = value.entries.find(item => item.worker === worker && item.slot === slot);
    if (!entry || entry.status !== 'ready' || entry.path !== expectedPath || entry.branch !== expectedBranch || entry.head !== expectedHead) {
      throw Error('Exact existing ready slot changed; operator release refused');
    }
    if (process.env.CODEX_THREAD_ID !== operatorIdentity) throw Error('Operator identity changed during release');
    if (value.entries.some(item => item !== entry && (item.path === entry.path || item.branch === entry.branch
      || item.dependencies?.some?.(dependency => dependency === entry.worker || dependency === entry.path || dependency === entry.branch)))) {
      throw Error('Another managed slot depends on this workspace; operator release refused');
    }
    const readers = inspectReaders ? inspectReaders(entry.path) : (() => {
      const probe = spawnSync('lsof', ['-t', '+D', entry.path], {encoding: 'utf8', env: noLazyFetch});
      if (probe.error || ![0, 1].includes(probe.status)) throw Error('Unable to prove the workspace has no open readers');
      return probe.stdout.trim().split(/\s+/).filter(Boolean);
    })();
    if (!Array.isArray(readers) || readers.length) throw Error('Workspace has active readers; operator release refused');
    const keeper = keeperManifest;
    if (!keeper || keeper.result !== 'PASS' || keeper.scope !== scope || keeper.worker_id !== worker
      || keeper.slot !== slot || keeper.path !== expectedPath || keeper.branch !== expectedBranch || keeper.head !== expectedHead
      || !Array.isArray(keeper.files) || !/^[a-f0-9]{64}$/.test(keeper.sha256 ?? '')
      || receiptDigest(keeper) !== keeper.sha256) {
      throw Error('Keeper/restoration manifest is missing, stale, or not bound to this exact slot');
    }
    if (reviewReceipt.keeperManifestSha256 !== keeper.sha256) {
      throw Error('Independent reviewer did not attest the exact keeper/restoration manifest');
    }
    const localGit = (...args) => execFileSync('git', ['-C', entry.path, ...args], {encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: noLazyFetch});
    if (localGit('rev-parse', 'HEAD').trim() !== expectedHead
      || localGit('symbolic-ref', '--quiet', 'HEAD').trim() !== `refs/heads/${expectedBranch}`
      || fs.realpathSync(localGit('rev-parse', '--show-toplevel').trim()) !== fs.realpathSync(entry.path)) {
      throw Error('Operator release live Git binding changed; preserve workspace for inspection');
    }
    if (localGit('status', '--porcelain', '--untracked-files=all').trim()) {
      throw Error('Tracked modifications or untracked non-ignored files need a verified keeper before release');
    }
    const ignored = localGit('ls-files', '--others', '--ignored', '--exclude-standard', '-z').split('\0').filter(Boolean).sort();
    const listed = keeper.files.map(file => file.path).sort();
    if (new Set(listed).size !== listed.length || ignored.join('\0') !== listed.join('\0')) {
      throw Error('Keeper manifest must cover every and only ignored workspace file');
    }
    const verifiedFiles = [];
    for (const file of keeper.files) {
      if (typeof file.path !== 'string' || path.isAbsolute(file.path) || file.path.split(/[\\/]/).some(part => !part || part === '.' || part === '..')
        || typeof file.keeperPath !== 'string' || !path.isAbsolute(file.keeperPath) || typeof file.restorationPath !== 'string'
        || !path.isAbsolute(file.restorationPath) || !Number.isSafeInteger(file.bytes) || file.bytes < 0
        || !/^[a-f0-9]{64}$/.test(file.sha256 ?? '') || !Number.isInteger(file.mode)) {
        throw Error('Keeper file descriptor is invalid');
      }
      const source = path.join(entry.path, file.path);
      ordinaryDirectory(path.dirname(source));
      const sourceRoot = fs.realpathSync(entry.path);
      for (const keeperPath of [file.keeperPath, file.restorationPath]) {
        const resolved = fs.realpathSync(keeperPath), relative = path.relative(sourceRoot, resolved);
        if (!relative || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))) {
          throw Error('Keeper and restoration copies must be outside the workspace');
        }
      }
      if (fs.realpathSync(file.keeperPath) === fs.realpathSync(file.restorationPath)) {
        throw Error('Keeper and restoration copies must be independent files');
      }
      const sourceStat = fs.lstatSync(source), keeperStat = fs.lstatSync(file.keeperPath), restoredStat = fs.lstatSync(file.restorationPath);
      const ordinary = stat => stat.isFile() && !stat.isSymbolicLink() && stat.size === file.bytes && (stat.mode & 0o777) === file.mode;
      if (![sourceStat, keeperStat, restoredStat].every(ordinary)) throw Error('Keeper/restoration file metadata mismatch');
      const digest = target => createHash('sha256').update(fs.readFileSync(target)).digest('hex');
      if (![source, file.keeperPath, file.restorationPath].every(target => digest(target) === file.sha256)) {
        throw Error('Keeper/restoration bytes do not match the ignored workspace file');
      }
      verifiedFiles.push({path: file.path, bytes: file.bytes, mode: file.mode, sha256: file.sha256,
        keeperPath: file.keeperPath, restorationPath: file.restorationPath});
    }
    const auditId = randomUUID();
    const pending = {version: 1, operation: 'operator-release', status: 'pending', id: auditId, scope, authorizationRef,
      operator, reviewer: reviewReceipt.worker, worker, slot, path: expectedPath, branch: expectedBranch,
      head: expectedHead, reviewSha256: reviewReceipt.sha256,
      keeperManifestSha256: keeper.sha256, keepers: verifiedFiles,
      preservedRef: `refs/worldatlas-local-recovery/${createHash('sha256').update(entry.token).digest('hex')}`,
      startedAt: new Date().toISOString()};
    const receiptFile = writeAuditReceipt(pending, auditId);
    let releaseResult;
    try {
      // Recheck all file bodies immediately before deletion; the existing ordinary release
      // still supplies Git's non-forced in-use/dirty guard and preserved recovery ref.
      for (const file of verifiedFiles) {
        const target = path.join(entry.path, file.path);
        if (createHash('sha256').update(fs.readFileSync(target)).digest('hex') !== file.sha256) {
          throw Error('Keeper source changed after audit receipt creation');
        }
      }
      for (const file of verifiedFiles) fs.unlinkSync(path.join(entry.path, file.path));
      const capPath = capabilityPath(worker, slot);
      const capStat = fs.lstatSync(capPath, {throwIfNoEntry: false});
      releaseResult = releaseEntry({worker, slot, operatorAuthorized: true,
        ...(capStat ? {capabilityFile: capPath} : {})});
      const terminal = {...pending, status: 'released', completedAt: new Date().toISOString(), preservedRef: releaseResult.preservedRef};
      const finalReceipt = writeAuditReceipt(terminal, auditId);
      return {...releaseResult, auditReceipt: finalReceipt.path, auditSha256: finalReceipt.sha256};
    } catch (error) {
      if (releaseResult?.released) throw Error(`Workspace was released, but the terminal audit receipt update failed; the pending receipt remains at ${receiptFile.path}`);
      // If Git refuses the ordinary non-forced removal, restore every removed
      // source from its already-verified external keeper before returning.
      for (const file of verifiedFiles) {
        try {
          const target = path.join(entry.path, file.path);
          const current = fs.lstatSync(target, {throwIfNoEntry: false});
          if (current) continue;
          ordinaryDirectory(path.dirname(target));
          const bytes = fs.readFileSync(file.keeperPath);
          if (bytes.length !== file.bytes || createHash('sha256').update(bytes).digest('hex') !== file.sha256) continue;
          fs.writeFileSync(target, bytes, {flag: 'wx', mode: file.mode});
          fs.chmodSync(target, file.mode);
        } catch { /* retain original failure and verified external keeper */ }
      }
      const failed = {...pending, status: 'failed', completedAt: new Date().toISOString(), failure: error.message};
      try { writeAuditReceipt(failed, auditId); } catch { /* retain original failure and pending receipt */ }
      throw error;
    }
  });

  // Reconcile only the narrow state left when ordinary `git worktree remove`
  // deleted the admin directory but could not remove the checkout directory.
  // The remaining tree is preserved as a whole; this path never cleans or
  // reconstructs Git metadata.
  const partialTreeInventory = directory => {
    const rows = [];
    let totalBytes = 0;
    const visit = (current, relative) => {
      const stat = fs.lstatSync(current);
      if (stat.isSymbolicLink() || (!stat.isDirectory() && !stat.isFile())) {
        throw Error('Partial checkout contains a symlink or special file; preserve it for inspection');
      }
      const row = {path: relative || '.', type: stat.isDirectory() ? 'directory' : 'file', mode: stat.mode & 0o777};
      if (stat.isDirectory()) {
        rows.push(row);
        const names = fs.readdirSync(current).sort();
        for (const name of names) {
          if (!name || name === '.' || name === '..' || name.includes('/') || name.includes('\\')) {
            throw Error('Partial checkout has an unsafe path name');
          }
          visit(path.join(current, name), relative ? `${relative}/${name}` : name);
        }
        const after = fs.lstatSync(current);
        if (!after.isDirectory() || after.isSymbolicLink()
          || ['dev','ino','mode','mtimeMs','ctimeMs'].some(key => stat[key] !== after[key])) {
          throw Error('Partial checkout directory changed during finite inventory; inspect before retry');
        }
      } else {
        const before = fs.lstatSync(current);
        if (!before.isFile() || before.isSymbolicLink() || !Number.isSafeInteger(before.size) || before.size < 0
          || before.size > 20 * 1024 * 1024 * 1024 - totalBytes) {
          throw Error('Partial checkout exceeds the bounded preservation inventory limit');
        }
        const fd = fs.openSync(current, 'r');
        const digest = createHash('sha256'), buffer = Buffer.alloc(1024 * 1024);
        let bytesRead = 0;
        try {
          while (true) {
            const count = fs.readSync(fd, buffer, 0, buffer.length, null);
            if (!count) break;
            bytesRead += count;
            digest.update(buffer.subarray(0, count));
          }
        } finally { fs.closeSync(fd); }
        const after = fs.lstatSync(current);
        if (bytesRead !== before.size || !after.isFile() || after.isSymbolicLink()
          || ['dev','ino','size','mode','mtimeMs','ctimeMs'].some(key => before[key] !== after[key])) {
          throw Error('Partial checkout changed during finite inventory; inspect before retry');
        }
        totalBytes += bytesRead;
        rows.push({...row, bytes: bytesRead, sha256: digest.digest('hex')});
      }
      if (rows.length > 100_000) throw Error('Partial checkout exceeds the bounded preservation entry limit');
    };
    visit(directory, '');
    rows.sort((a, b) => a.path.localeCompare(b.path));
    const body = JSON.stringify(rows);
    return {entries: rows, entryCount: rows.length, totalBytes,
      sha256: createHash('sha256').update(body).digest('hex')};
  };
  const partialReceiptDigest = value => {
    const body = Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'sha256').sort(([a], [b]) => a.localeCompare(b)));
    return createHash('sha256').update(JSON.stringify(body)).digest('hex');
  };
  const writePartialReceipt = receipt => {
    ordinaryDirectory(partialRemovalAuditDirectory);
    fs.mkdirSync(partialRemovalAuditDirectory, {recursive: true, mode: 0o700});
    fs.chmodSync(partialRemovalAuditDirectory, 0o700);
    const destination = path.join(partialRemovalAuditDirectory, `${receipt.id}.json`);
    const temporary = `${destination}.${randomUUID()}.tmp`;
    const bytes = Buffer.from(JSON.stringify(receipt, null, 2) + '\n');
    const fd = fs.openSync(temporary, 'wx', 0o600);
    try { fs.writeFileSync(fd, bytes); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
    fs.renameSync(temporary, destination);
    const dirFd = fs.openSync(partialRemovalAuditDirectory, 'r');
    try { fs.fsyncSync(dirFd); } finally { fs.closeSync(dirFd); }
    return {path: destination, sha256: createHash('sha256').update(bytes).digest('hex')};
  };
  const readPartialReceipts = () => {
    if (!fs.existsSync(partialRemovalAuditDirectory)) return [];
    ordinaryDirectory(partialRemovalAuditDirectory);
    return fs.readdirSync(partialRemovalAuditDirectory).map(name => {
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.json$/.test(name)) {
        throw Error('Partial-removal audit contains an unrecognized receipt; inspect before retry');
      }
      const file = path.join(partialRemovalAuditDirectory, name), stat = fs.lstatSync(file);
      if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 32 * 1024 * 1024 || (stat.mode & 0o077) !== 0
        || typeof process.getuid === 'function' && stat.uid !== process.getuid()) {
        throw Error('Partial-removal audit contains an unknown nonordinary receipt');
      }
      const receipt = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (receipt.version !== 1 || receipt.operation !== 'partial-removal-reconcile' || receipt.id !== name.slice(0, -5)
        || !['pending', 'failed', 'reconciled'].includes(receipt.status) || !id(receipt.worker)
        || receipt.slot !== 'work' || receipt.path !== slotPath(receipt.worker, receipt.slot)
        || receipt.branch !== partialRemovalBranch || !/^[a-f0-9]{40}$/.test(receipt.startHead ?? '')
        || !/^[a-f0-9]{40}$/.test(receipt.head ?? '')
        || !/^refs\/worldatlas-local-recovery\/[a-f0-9]{64}$/.test(receipt.preservedRef ?? '')
        || receipt.preservedPath !== partialArchivePath(receipt.worker, receipt.slot, receipt.head, receipt.manifestSha256)
        || !/^[a-f0-9]{64}$/.test(receipt.manifestSha256 ?? '') || !/^[a-f0-9]{64}$/.test(receipt.capabilitySha256 ?? '')
        || !/^[a-f0-9]{64}$/.test(receipt.reviewSha256 ?? '')
        || !Number.isSafeInteger(receipt.entryCount)
        || !Number.isSafeInteger(receipt.totalBytes) || !Number.isFinite(Date.parse(receipt.startedAt ?? ''))
        || !/^[a-f0-9]{64}$/.test(receipt.sha256 ?? '') || partialReceiptDigest(receipt) !== receipt.sha256) {
        throw Error('Partial-removal audit contains a malformed receipt; inspect before retry');
      }
      return receipt;
    });
  };
  const inspectPartialRemoval = ({worker, slot = 'work', expectedPath, expectedBranch, expectedHead}) => {
    if (!worker || process.env.CODEX_THREAD_ID !== worker || slot !== 'work' || expectedBranch !== partialRemovalBranch
      || !/^[a-f0-9]{40}$/.test(expectedHead ?? '')) {
      throw Error('Partial-removal inspection is limited to the exact TLS work slot and current owner identity');
    }
    const value = state(), entry = value.entries.find(item => item.worker === worker && item.slot === slot);
    if (!entry || entry.status !== 'ready' || entry.path !== expectedPath || entry.branch !== expectedBranch
      || !/^[a-f0-9]{40}$/.test(entry.head ?? '')
      || entry.branch !== partialRemovalBranch
      || entry.path !== slotPath(worker, slot)) throw Error('Exact ready slot binding changed; preserve for inspection');
    ordinaryDirectory(entry.path);
    const dotGitPath = path.join(entry.path, '.git'), dotGitStat = fs.lstatSync(dotGitPath, {throwIfNoEntry: false});
    if (!dotGitStat?.isFile() || dotGitStat.isSymbolicLink()) throw Error('Partial checkout has no ordinary Git link file');
    const dotGit = fs.readFileSync(dotGitPath, 'utf8');
    const match = /^gitdir: (.+)\n?$/.exec(dotGit);
    if (!match || !path.isAbsolute(match[1])) throw Error('Partial checkout Git link is malformed; preserve for inspection');
    const adminPath = path.resolve(match[1]);
    const worktreesRoot = path.join(common, 'worktrees');
    if (path.dirname(adminPath) !== worktreesRoot || fs.lstatSync(adminPath, {throwIfNoEntry: false})) {
      throw Error('Git admin directory still exists or is outside the registered common worktrees directory');
    }
    if (worktrees(false).some(item => item.path === entry.path)) throw Error('Git still registers the partial checkout; use ordinary release');
    if (git('rev-parse', '--verify', `refs/heads/${entry.branch}^{commit}`).trim() !== expectedHead) {
      throw Error('Preserved branch no longer points to the expected HEAD');
    }
    const capability = readCapability({worker, slot, entry, requestedPath: capabilityPath(worker, slot)});
    const preservedRef = `refs/worldatlas-local-recovery/${createHash('sha256').update(capability.token).digest('hex')}`;
    if (git('rev-parse', '--verify', `${preservedRef}^{commit}`).trim() !== expectedHead) {
      throw Error('Exact owner recovery ref is missing or changed');
    }
    if (value.entries.some(item => item !== entry && (item.path === entry.path || item.branch === entry.branch
      || item.dependencies?.some?.(dependency => dependency === worker || dependency === entry.path || dependency === entry.branch)))) {
      throw Error('Another managed slot depends on this workspace');
    }
    const readers = inspectReaders ? inspectReaders(entry.path) : (() => {
      const probe = spawnSync('lsof', ['-t', '+D', entry.path], {encoding: 'utf8', env: noLazyFetch});
      if (probe.error || ![0, 1].includes(probe.status)) throw Error('Unable to prove the partial checkout has no open readers');
      return probe.stdout.trim().split(/\s+/).filter(Boolean);
    })();
    if (!Array.isArray(readers) || readers.length) throw Error('Partial checkout has active readers');
    const inventory = partialTreeInventory(entry.path);
    return {version: 1, result: 'PASS', operation: 'partial-removal-inventory', worker, slot,
      path: entry.path, branch: entry.branch, startHead: entry.head, head: expectedHead, gitAdminPath: adminPath,
      preservedRef, entryCount: inventory.entryCount, totalBytes: inventory.totalBytes,
      entries: inventory.entries, inventorySha256: inventory.sha256};
  };
  const reconcilePartialRemoval = ({worker, slot = 'work', capabilityFile, expectedPath, expectedBranch,
    expectedHead, inventoryManifest, reviewReceipt}) => locked(() => {
    if (!worker || process.env.CODEX_THREAD_ID !== worker) throw Error('Partial-removal reconciliation requires the exact current owner identity');
    if (slot !== 'work' || !/^[a-f0-9]{40}$/.test(expectedHead ?? '') || expectedPath !== slotPath(worker, slot)
      || expectedBranch !== partialRemovalBranch || !capabilityFile || capabilityFile !== capabilityPath(worker, slot)) {
      throw Error('Partial-removal reconciliation requires the exact owner work-slot binding');
    }
    const inventory = inventoryManifest;
    if (!inventory || inventory.version !== 1 || inventory.result !== 'PASS' || inventory.operation !== 'partial-removal-inventory'
      || inventory.worker !== worker || inventory.slot !== slot || inventory.path !== expectedPath
      || inventory.branch !== expectedBranch || inventory.head !== expectedHead
      || !/^[a-f0-9]{40}$/.test(inventory.startHead ?? '') || !Array.isArray(inventory.entries)
      || typeof inventory.gitAdminPath !== 'string' || !path.isAbsolute(inventory.gitAdminPath)
      || typeof inventory.preservedRef !== 'string' || !/^refs\/worldatlas-local-recovery\/[a-f0-9]{64}$/.test(inventory.preservedRef)
      || inventory.entries.length !== inventory.entryCount || !Number.isSafeInteger(inventory.entryCount) || inventory.entryCount < 1
      || !Number.isSafeInteger(inventory.totalBytes) || inventory.totalBytes < 0 || !/^[a-f0-9]{64}$/.test(inventory.inventorySha256 ?? '')) {
      throw Error('Finite partial-checkout inventory is missing or stale');
    }
    const inventoryBody = JSON.stringify(inventory.entries);
    if (createHash('sha256').update(inventoryBody).digest('hex') !== inventory.inventorySha256) throw Error('Partial-checkout inventory digest mismatch');
    const reviewer = reviewReceipt;
    if (!reviewer || reviewer.result !== 'PASS' || reviewer.operation !== 'partial-removal-review'
      || !id(reviewer.reviewer) || reviewer.reviewer === worker || reviewer.worker !== worker || reviewer.slot !== slot
      || reviewer.path !== expectedPath || reviewer.branch !== expectedBranch || reviewer.startHead !== inventory.startHead
      || reviewer.head !== expectedHead
      || reviewer.gitAdminPath !== inventory.gitAdminPath || reviewer.preservedRef !== inventory.preservedRef
      || reviewer.entryCount !== inventory.entryCount || reviewer.totalBytes !== inventory.totalBytes
      || reviewer.inventorySha256 !== inventory.inventorySha256 || !/^[a-f0-9]{64}$/.test(reviewer.sha256 ?? '')
      || partialReceiptDigest(reviewer) !== reviewer.sha256) throw Error('Independent partial-checkout review is missing or stale');
    const pendingMatches = readPartialReceipts().filter(receipt => receipt.worker === worker && receipt.slot === slot
      && receipt.path === expectedPath && receipt.branch === expectedBranch && receipt.startHead === inventory.startHead
      && receipt.head === expectedHead
      && receipt.manifestSha256 === inventory.inventorySha256 && receipt.status === 'pending');
    if (pendingMatches.length > 1) throw Error('Multiple pending partial-removal receipts match; inspect before retry');
    const pendingReceipt = pendingMatches[0];
    if (pendingReceipt && pendingReceipt.reviewSha256 !== reviewer.sha256) {
      throw Error('Pending partial-removal receipt is bound to a different independent review');
    }
    if (pendingReceipt && (pendingReceipt.preservedRef !== inventory.preservedRef
      || pendingReceipt.entryCount !== inventory.entryCount || pendingReceipt.totalBytes !== inventory.totalBytes)) {
      throw Error('Pending partial-removal receipt does not match the reviewed inventory metadata');
    }
    if (pendingReceipt) {
      ordinaryDirectory(path.dirname(pendingReceipt.preservedPath));
      const sourceExists = Boolean(fs.lstatSync(expectedPath, {throwIfNoEntry: false}));
      const archiveExists = Boolean(fs.lstatSync(pendingReceipt.preservedPath, {throwIfNoEntry: false}));
      if (!sourceExists && archiveExists) {
        const archived = partialTreeInventory(pendingReceipt.preservedPath);
        if (archived.sha256 !== inventory.inventorySha256 || archived.entryCount !== inventory.entryCount
          || archived.totalBytes !== inventory.totalBytes) throw Error('Pending archive differs from the reviewed full inventory');
        if (git('rev-parse', '--verify', `${expectedBranch}^{commit}`).trim() !== expectedHead
          || git('rev-parse', '--verify', `${pendingReceipt.preservedRef}^{commit}`).trim() !== expectedHead
          || worktrees(false).some(item => item.path === expectedPath)) throw Error('Pending archive no longer matches the live Git bindings');
        const liveState = state(), liveEntry = liveState.entries.find(item => item.worker === worker && item.slot === slot);
        if (liveEntry && (liveEntry.path !== expectedPath || liveEntry.branch !== expectedBranch
          || liveEntry.head !== pendingReceipt.startHead || liveEntry.status !== 'ready')) {
          throw Error('Pending archive owner slot changed; preserve for inspection');
        }
        if (liveState.entries.some(item => item !== liveEntry && (item.path === expectedPath || item.branch === expectedBranch
          || item.dependencies?.some?.(dependency => dependency === worker || dependency === expectedPath || dependency === expectedBranch)))) {
          throw Error('Another managed slot depends on the pending archive');
        }
        const archivedReaders = inspectReaders ? inspectReaders(pendingReceipt.preservedPath) : (() => {
          const probe = spawnSync('lsof', ['-t', '+D', pendingReceipt.preservedPath], {encoding: 'utf8', env: noLazyFetch});
          if (probe.error || ![0, 1].includes(probe.status)) throw Error('Unable to prove the preserved archive has no open readers');
          return probe.stdout.trim().split(/\s+/).filter(Boolean);
        })();
        if (!Array.isArray(archivedReaders) || archivedReaders.length) throw Error('Preserved partial checkout has active readers');
        let capabilityFileRemoved = false;
        if (liveEntry) {
          const cap = readCapability({worker, slot, entry: liveEntry, requestedPath: capabilityFile});
          if (createHash('sha256').update(cap.bytes).digest('hex') !== pendingReceipt.capabilitySha256) {
            throw Error('Pending receipt capability binding changed; preserve for inspection');
          }
          liveState.entries = liveState.entries.filter(item => item !== liveEntry);
          save(liveState);
          const currentCap = fs.lstatSync(capabilityFile, {throwIfNoEntry: false});
          if (currentCap?.isFile() && !currentCap.isSymbolicLink() && currentCap.size === cap.bytes.length
            && fs.readFileSync(capabilityFile).equals(cap.bytes)) { fs.unlinkSync(capabilityFile); capabilityFileRemoved = true; }
        } else {
          const currentCap = fs.lstatSync(capabilityFile, {throwIfNoEntry: false});
          if (currentCap?.isFile() && !currentCap.isSymbolicLink()) {
            const bytes = fs.readFileSync(capabilityFile);
            if (createHash('sha256').update(bytes).digest('hex') === pendingReceipt.capabilitySha256) {
              fs.unlinkSync(capabilityFile); capabilityFileRemoved = true;
            }
          }
        }
        const terminal = {...pendingReceipt, status: 'reconciled', completedAt: new Date().toISOString(), capabilityFileRemoved};
        terminal.sha256 = partialReceiptDigest(terminal);
        const auditReceipt = writePartialReceipt(terminal);
        return {reconciled: true, worker, slot, path: expectedPath, preservedPath: pendingReceipt.preservedPath,
          preservedRef: pendingReceipt.preservedRef, head: expectedHead, entryCount: archived.entryCount,
          totalBytes: archived.totalBytes, inventorySha256: archived.sha256,
          auditReceipt: auditReceipt.path, auditSha256: auditReceipt.sha256, resumedPendingReceipt: true};
      }
      if (sourceExists === archiveExists) throw Error('Pending partial-removal receipt has ambiguous source/archive state; inspect without retry');
    }
    const value = state(), entry = value.entries.find(item => item.worker === worker && item.slot === slot);
    if (!entry || entry.status !== 'ready' || entry.path !== expectedPath || entry.branch !== expectedBranch
      || entry.head !== inventory.startHead) {
      throw Error('Exact existing ready owner slot changed; preserve partial checkout');
    }
    const cap = readCapability({worker, slot, entry, requestedPath: capabilityFile});
    const preservedRef = `refs/worldatlas-local-recovery/${createHash('sha256').update(cap.token).digest('hex')}`;
    if (inventory.preservedRef !== preservedRef) throw Error('Reviewed recovery ref does not match the exact owner capability');
    const recoveryHead = git('rev-parse', '--verify', `${preservedRef}^{commit}`).trim();
    if (recoveryHead !== expectedHead || git('rev-parse', '--verify', `refs/heads/${expectedBranch}^{commit}`).trim() !== expectedHead) {
      throw Error('Candidate branch or owner recovery ref changed; preserve the slot');
    }
    if (value.entries.some(item => item !== entry && (item.path === entry.path || item.branch === entry.branch
      || item.dependencies?.some?.(dependency => dependency === worker || dependency === entry.path || dependency === entry.branch)))) {
      throw Error('Another managed slot depends on this partial checkout');
    }
    const readers = inspectReaders ? inspectReaders(entry.path) : (() => {
      const probe = spawnSync('lsof', ['-t', '+D', entry.path], {encoding: 'utf8', env: noLazyFetch});
      if (probe.error || ![0, 1].includes(probe.status)) throw Error('Unable to prove the partial checkout has no open readers');
      return probe.stdout.trim().split(/\s+/).filter(Boolean);
    })();
    if (!Array.isArray(readers) || readers.length) throw Error('Partial checkout has active readers');
    const dotGitPath = path.join(entry.path, '.git'), dotGitStat = fs.lstatSync(dotGitPath, {throwIfNoEntry: false});
    if (!dotGitStat?.isFile() || dotGitStat.isSymbolicLink()) throw Error('Partial checkout Git link is missing or not ordinary');
    const match = /^gitdir: (.+)\n?$/.exec(fs.readFileSync(dotGitPath, 'utf8'));
    if (!match || !path.isAbsolute(match[1])) throw Error('Partial checkout Git link is malformed');
    const adminPath = path.resolve(match[1]);
    if (path.dirname(adminPath) !== path.join(common, 'worktrees') || fs.lstatSync(adminPath, {throwIfNoEntry: false})) {
      throw Error('Git admin directory exists or is outside the common worktrees directory');
    }
    if (inventory.gitAdminPath !== adminPath) throw Error('Reviewed Git admin path differs from the dangling worktree link');
    if (worktrees(false).some(item => item.path === entry.path)) throw Error('Git still registers the checkout; use ordinary release');
    const current = partialTreeInventory(entry.path);
    if (current.sha256 !== inventory.inventorySha256 || current.entryCount !== inventory.entryCount || current.totalBytes !== inventory.totalBytes) {
      throw Error('Partial checkout changed after independent inventory review');
    }
    const prior = readPartialReceipts().filter(receipt => receipt.worker === worker && receipt.path === entry.path
      && receipt.branch === entry.branch && receipt.startHead === entry.head && receipt.head === expectedHead
      && receipt.manifestSha256 === inventory.inventorySha256
      && receipt.status === 'pending');
    if (prior.length > 1) throw Error('Multiple pending partial-removal receipts match; inspect before retry');
    const receipt = prior[0] ?? {version: 1, operation: 'partial-removal-reconcile', status: 'pending', id: randomUUID(),
      worker, slot, path: entry.path, branch: entry.branch, startHead: entry.head, head: expectedHead, preservedRef,
      preservedPath: partialArchivePath(worker, slot, expectedHead, inventory.inventorySha256),
      manifestSha256: inventory.inventorySha256, entryCount: current.entryCount, totalBytes: current.totalBytes,
      capabilitySha256: createHash('sha256').update(cap.bytes).digest('hex'),
      reviewSha256: reviewer.sha256, startedAt: new Date().toISOString()};
    if (receipt.reviewSha256 !== reviewer.sha256) throw Error('Pending recovery receipt is bound to a different independent review');
    if (!receipt.sha256) { receipt.sha256 = partialReceiptDigest(receipt); writePartialReceipt(receipt); }
    try {
    ordinaryDirectory(path.dirname(receipt.preservedPath));
    fs.mkdirSync(path.dirname(receipt.preservedPath), {recursive: true, mode: 0o700});
    if (fs.lstatSync(receipt.preservedPath, {throwIfNoEntry: false})) {
      throw Error('Preserved partial-checkout destination already exists; inspect pending receipt');
    }
    // Recheck the byte-complete inventory immediately before the atomic move.
    const beforeMove = partialTreeInventory(entry.path);
    if (beforeMove.sha256 !== inventory.inventorySha256) throw Error('Partial checkout changed before preservation move');
    if (worktrees(false).some(item => item.path === expectedPath)) throw Error('Git registered the checkout again before preservation move');
    if (git('rev-parse', '--verify', `${expectedBranch}^{commit}`).trim() !== expectedHead
      || git('rev-parse', '--verify', `${preservedRef}^{commit}`).trim() !== expectedHead) {
      throw Error('Candidate branch or recovery ref changed before preservation move');
    }
    const finalReaders = inspectReaders ? inspectReaders(entry.path) : (() => {
      const probe = spawnSync('lsof', ['-t', '+D', entry.path], {encoding: 'utf8', env: noLazyFetch});
      if (probe.error || ![0, 1].includes(probe.status)) throw Error('Unable to prove the partial checkout has no open readers');
      return probe.stdout.trim().split(/\s+/).filter(Boolean);
    })();
    if (!Array.isArray(finalReaders) || finalReaders.length) throw Error('Partial checkout gained active readers before preservation move');
    fs.renameSync(entry.path, receipt.preservedPath);
    const moved = partialTreeInventory(receipt.preservedPath);
    if (moved.sha256 !== inventory.inventorySha256 || moved.entryCount !== inventory.entryCount || moved.totalBytes !== inventory.totalBytes) {
      throw Error('Preserved directory did not match the independently reviewed inventory; pending receipt retained');
    }
    const archivedReaders = inspectReaders ? inspectReaders(receipt.preservedPath) : (() => {
      const probe = spawnSync('lsof', ['-t', '+D', receipt.preservedPath], {encoding: 'utf8', env: noLazyFetch});
      if (probe.error || ![0, 1].includes(probe.status)) throw Error('Unable to prove the preserved archive has no open readers');
      return probe.stdout.trim().split(/\s+/).filter(Boolean);
    })();
    if (!Array.isArray(archivedReaders) || archivedReaders.length) throw Error('Preserved archive gained active readers');
    const currentValue = state(), currentEntry = currentValue.entries.find(item => item.worker === worker && item.slot === slot);
    if (!currentEntry || currentEntry.path !== expectedPath || currentEntry.branch !== expectedBranch
      || currentEntry.head !== receipt.startHead) {
      throw Error('Owner slot changed after preservation; pending receipt retained');
    }
    currentValue.entries = currentValue.entries.filter(item => item !== currentEntry);
    save(currentValue);
    let capabilityFileRemoved = false;
    const capabilityNow = fs.lstatSync(capabilityFile, {throwIfNoEntry: false});
    if (capabilityNow?.isFile() && !capabilityNow.isSymbolicLink() && capabilityNow.size === cap.bytes.length
      && fs.readFileSync(capabilityFile).equals(cap.bytes)) {
      fs.unlinkSync(capabilityFile);
      capabilityFileRemoved = true;
    }
    const terminal = {...receipt, status: 'reconciled', completedAt: new Date().toISOString(), capabilityFileRemoved};
    terminal.sha256 = partialReceiptDigest(terminal);
    const auditReceipt = writePartialReceipt(terminal);
    return {reconciled: true, worker, slot, path: expectedPath, preservedPath: receipt.preservedPath,
      preservedRef, head: expectedHead, entryCount: moved.entryCount, totalBytes: moved.totalBytes,
      inventorySha256: moved.sha256, auditReceipt: auditReceipt.path, auditSha256: auditReceipt.sha256,
      capabilityFileRemoved};
    } catch (error) {
      const sourceStillPresent = Boolean(fs.lstatSync(expectedPath, {throwIfNoEntry: false}));
      const archivePresent = Boolean(fs.lstatSync(receipt.preservedPath, {throwIfNoEntry: false}));
      // A failure before the atomic move is a terminal failed attempt. Once the
      // move may have happened, leave the receipt pending for exact-state resume.
      if (sourceStillPresent && !archivePresent) {
        const failed = {...receipt, status: 'failed', completedAt: new Date().toISOString(),
          failure: String(error?.message ?? error).slice(0, 2048)};
        failed.sha256 = partialReceiptDigest(failed);
        try { writePartialReceipt(failed); } catch { /* retain the pending receipt if terminal write fails */ }
      }
      throw error;
    }
  });
  const check = () => ({freeBytes: availableBytes()});
  return {report, check, inspect, allocate, ensureCapabilityFile, capabilityFilePath, resume, recoverLostCapability,
    release, operatorRelease, inspectPartialRemoval, reconcilePartialRemoval};
}

function isCliEntrypoint(argvPath, moduleUrl) {
  if (!argvPath) return false;
  try {
    return fs.realpathSync(argvPath) === fs.realpathSync(fileURLToPath(moduleUrl));
  } catch {
    return false;
  }
}

function cliSafeResult(action, value, capabilityFile) {
  const pick = (object, fields) => Object.fromEntries(fields
    .filter(field => Object.hasOwn(object, field))
    .map(field => [field, object[field]]));
  const slotFields = ['worker', 'slot', 'path', 'head', 'branch', 'profile', 'include', 'reservation', 'status', 'createdAt'];
  if (action === 'allocate' || action === 'resume') {
    return {...pick(value, slotFields), capabilityFile};
  }
  if (action === 'recover-lost-capability') {
    return pick(value, ['recovered', 'worker', 'slot', 'path', 'branch', 'head', 'capabilityFile', 'previousTokenInvalidated']);
  }
  if (action === 'report') {
    return {
      ...pick(value, ['root', 'registry', 'freeBytes', 'checkoutBytes']),
      entries: (value.entries ?? []).map(entry => pick(entry, slotFields)),
      worktrees: (value.worktrees ?? []).map(worktree => pick(worktree, ['path', 'bytes', 'managed']))
    };
  }
  return value;
}

function readOperatorReceipt(file) {
  if (!path.isAbsolute(file)) throw Error('Operator receipt paths must be absolute');
  const stat = fs.lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 32 * 1024 * 1024) throw Error('Receipt must be an ordinary file up to 32 MiB');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

if (isCliEntrypoint(process.argv[1], import.meta.url)) {
  try {
    const [action, ...args] = process.argv.slice(2);
    const options = {include: []};
    for (let index = 0; index < args.length; index += 2) {
      const key = args[index]?.replace(/^--/, '');
      if (!['repo', 'worker', 'slot', 'branch', 'commit', 'profile', 'include', 'token', 'capability-file', 'expected-path', 'expected-branch', 'expected-head',
        'operator', 'scope', 'authorization-ref', 'review-receipt', 'keeper-manifest', 'inventory-manifest'].includes(key) || !args[index + 1]) throw Error('Use a supported workspace action with documented --repo/--key value arguments');
      if (key === 'include') options.include.push(args[index + 1]);
      else {
        const option = key.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
        if (Object.hasOwn(options, option)) throw Error(`Duplicate ${key}`);
        options[option] = args[index + 1];
      }
    }
    if (['allocate', 'resume'].includes(action) && (options.slot ?? 'work') === 'work') assertAuthorWorkerIdentity(options.worker);
    if (action === 'report') {
      if (options.token !== undefined || options.capabilityFile !== undefined || options.slot !== undefined ||
          options.branch !== undefined || options.commit !== undefined || options.profile !== undefined ||
          options.include.length || options.expectedPath !== undefined || options.expectedBranch !== undefined ||
          options.expectedHead !== undefined) {
        throw Error('Report accepts only --repo and the current --worker identity');
      }
      if (options.worker !== undefined) assertAuthorWorkerIdentity(options.worker);
    }
    if (action === 'recover-lost-capability' && (!process.env.CODEX_THREAD_ID || options.worker !== process.env.CODEX_THREAD_ID)) {
      throw Error('Lost-capability recovery requires this author’s exact CODEX_THREAD_ID');
    }
    const repo = options.repo === undefined ? path.dirname(fileURLToPath(import.meta.url)) : options.repo;
    if (options.repo !== undefined && (!path.isAbsolute(repo) || !fs.statSync(repo).isDirectory())) {
      throw Error('Explicit --repo must be an absolute existing repository directory');
    }
    delete options.repo;
    const manager = workspaceManager(repo, {
      onStartupGuidance: ({commit, path: instructionPath, gitBlobOid, sha256, text, guides}) => {
        process.stderr.write(`Verified current-main startup instructions (${commit})\n`);
        process.stderr.write(`${instructionPath} Git blob ${gitBlobOid}; SHA-256 ${sha256}\n`);
        if (guides.length) process.stderr.write(`Domain guides: ${guides.join(', ')}\n`);
        process.stderr.write(`--- begin ${instructionPath} ---\n${text}${text.endsWith('\n') ? '' : '\n'}--- end ${instructionPath} ---\n`);
      }
    });
    const method = action === 'recover-lost-capability' ? 'recoverLostCapability' : action === 'operator-release' ? 'operatorRelease'
      : action === 'inspect-partial-removal' ? 'inspectPartialRemoval'
        : action === 'reconcile-partial-removal' ? 'reconcilePartialRemoval' : action;
    if (!['report', 'check', 'inspect', 'allocate', 'resume', 'recover-lost-capability', 'release', 'operator-release',
      'inspect-partial-removal', 'reconcile-partial-removal'].includes(action)) throw Error('Choose a supported workspace action with documented --key value arguments');
    if (action === 'operator-release') {
      if (!options.operator || options.operator !== process.env.CODEX_THREAD_ID) throw Error('Operator release requires this coordinator’s exact CODEX_THREAD_ID');
      options.reviewReceipt = readOperatorReceipt(options.reviewReceipt);
      options.keeperManifest = readOperatorReceipt(options.keeperManifest);
    }
    if (action === 'reconcile-partial-removal') {
      options.reviewReceipt = readOperatorReceipt(options.reviewReceipt);
      options.inventoryManifest = readOperatorReceipt(options.inventoryManifest);
    }
    if (action === 'resume' && options.token === undefined && options.capabilityFile === undefined) {
      options.capabilityFile = manager.capabilityFilePath({worker: options.worker, slot: options.slot ?? 'work'});
    }
    const result = action === 'report' ? await manager.report({worker: options.worker})
      : action === 'allocate' ? await manager.allocate({...options, createCapabilityFile: true})
        : await manager[method](options);
    const capabilityFile = ['allocate', 'resume'].includes(action)
      ? manager.ensureCapabilityFile({worker: result.worker, slot: result.slot})
      : undefined;
    console.log(JSON.stringify(cliSafeResult(action, result, capabilityFile), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
