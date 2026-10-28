import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import childProcess, {execFileSync, spawn, spawnSync} from 'node:child_process';
import {syncBuiltinESMExports} from 'node:module';
import {workspaceManager} from '../scripts/local-workspace.mjs';

// Tests that need allocator internals read the fixture registry directly. The
// public report intentionally exposes only the current worker's safe metadata.
function registryEntries(manager) {
  const report = manager.report();
  const statePath = path.join(report.registry, 'state.json');
  if (!fs.existsSync(statePath)) return [];
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  return state.entries;
}

function fixture(t, overrides = {}) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-storage-test-'));
  t.after(() => fs.rmSync(temporary, {recursive: true, force: true}));
  const repo = path.join(temporary, 'repo');
  fs.mkdirSync(repo);
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], {encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe']});
  git('init', '-b', 'main');
  git('config', 'user.email', 'fixture@example.org');
  git('config', 'user.name', 'Fixture');
  for (const [file, bytes] of Object.entries({'AGENTS.md': '# Fixture startup instructions\n- [DEVELOPMENT](docs/DEVELOPMENT.md): fixture guide\n',
    'README.md': 'root', 'scripts/tool.mjs': 'tool', 'docs/guide.md': 'guide',
    'data/needed/input.json': 'input', 'data/other/large.json': 'unrelated', 'data/one.json': 'individual',
    'research/campaigns/old/source.txt': 'old', '.gitignore': '.scratch/\n'})) {
    fs.mkdirSync(path.dirname(path.join(repo, file)), {recursive: true});
    fs.writeFileSync(path.join(repo, file), bytes);
  }
  git('add', '.'); git('commit', '-m', 'fixture'); git('remote', 'add', 'origin', repo);
  const head = git('rev-parse', 'HEAD').trim();
  const manager = workspaceManager(repo, overrides);
  return {repo, git, manager, head, temporary};
}

function cliHelper(repo, directory = path.join(repo, '.git', 'worldatlas-helper-test')) {
  fs.mkdirSync(directory, {recursive: true});
  for (const name of ['local-workspace.mjs', 'worker-identity.mjs', 'geography-prefetch.mjs'])
    fs.writeFileSync(path.join(directory, name), fs.readFileSync(new URL('../scripts/' + name, import.meta.url)));
  return path.join(directory, 'local-workspace.mjs');
}

test('allocator CLI binds its helper Git store, never an unrelated or missing cwd repository', async t => {
  const intended = fixture(t), ambient = fixture(t);
  fs.writeFileSync(path.join(intended.repo, 'README.md'), 'intended repository only');
  intended.git('add', 'README.md'); intended.git('commit', '-m', 'distinct intended commit');
  intended.head = intended.git('rev-parse', 'HEAD').trim();
  const registry = intended.manager.report().registry;
  const before = ambient.git('show-ref');
  for (const directory of [path.join(intended.repo, 'scripts'), path.join(intended.repo, '.git', 'worldatlas-helper-test')]) {
    const helper = cliHelper(intended.repo, directory);
    for (const cwd of [ambient.repo, ambient.temporary]) {
      const run = (...args) => JSON.parse(execFileSync(process.execPath,
        [helper, args[0], '--repo', intended.repo, ...args.slice(1)], {cwd, encoding: 'utf8'}));
      assert.equal(run('report').registry, registry);
      assert.ok(Number.isFinite(run('check').freeBytes));
      assert.deepEqual(run('inspect', '--commit', intended.head), intended.manager.inspect({commit: intended.head}));
    }
  }
  const helper = cliHelper(intended.repo);
  const inheritedIdentity = 'parent-review-coordinator';
  const allocate = spawnSync(process.execPath, [helper, 'allocate', '--repo', intended.repo, '--worker', 'independent-fixture-review',
    '--slot', 'review', '--commit', intended.head], {cwd: ambient.repo, env: {...process.env, CODEX_THREAD_ID: inheritedIdentity}, encoding: 'utf8'});
  assert.equal(allocate.status, 0, allocate.stderr);
  const entry = JSON.parse(allocate.stdout);
  assert.equal(entry.head, intended.head);
  assert.ok(entry.path.startsWith(intended.manager.report().root + path.sep));
  assert.ok(entry.capabilityFile);
  assert.equal(Object.hasOwn(entry, 'token'), false);
  assert.doesNotMatch(allocate.stdout, /\"token\"\s*:/);
  const released = JSON.parse(execFileSync(process.execPath, [helper, 'release', '--repo', intended.repo, '--worker', entry.worker,
    '--slot', entry.slot, '--capability-file', entry.capabilityFile], {cwd: ambient.repo, encoding: 'utf8'}));
  assert.equal(released.released, true);
  assert.equal(intended.git('rev-parse', released.preservedRef).trim(), intended.head);
  // A relocated executable outside a Git store must refuse, not fall back to cwd.
  const outside = cliHelper(intended.repo, path.join(intended.temporary, 'unbound-helper'));
  const refused = spawnSync(process.execPath, [outside, 'report'], {cwd: ambient.repo, encoding: 'utf8'});
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /not a git repository/);
  assert.equal(refused.stdout, '');
  assert.equal(ambient.git('show-ref'), before);
  assert.deepEqual(registryEntries(intended.manager), []);
  assert.ok(!fs.existsSync(ambient.manager.report().registry));
});

test('CLI entrypoint detection canonicalizes macOS /var and /private/var paths', async t => {
  const {repo, manager} = fixture(t);
  const helper = cliHelper(repo, path.join(repo, 'scripts'));
  const requestedPath = path.resolve(helper);
  const canonicalPath = fs.realpathSync(helper);
  if (!requestedPath.startsWith('/var/') || !canonicalPath.startsWith('/private/var/')) {
    t.skip('requires the macOS /var to /private/var temporary-path alias');
    return;
  }
  assert.notEqual(requestedPath, canonicalPath);

  const result = spawnSync(process.execPath, [requestedPath, 'report'], {
    cwd: repo, encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).registry, manager.report().registry);
  assert.equal(result.stderr, '');

  const imported = spawnSync(process.execPath, ['--input-type=module', '-e',
    `import(${JSON.stringify(pathToFileURL(helper).href)});`], {encoding: 'utf8'});
  assert.equal(imported.status, 0, imported.stderr);
  assert.equal(imported.stdout, '', 'importing the CLI module does not invoke its command handler');
});

test('ordinary branch names need only Git validity and fresh isolated ownership', async t => {
  const {manager}=fixture(t);
  const entry=await manager.allocate({worker:'worker-one',branch:'feature/Map.Errors_2026'});
  assert.equal(entry.branch,'feature/Map.Errors_2026');
  manager.release({worker:'worker-one',slot:'work',token:entry.token});
  for(const branch of ['bad..name','../escape','x:bad','bad name','-option'])
    await assert.rejects(()=>manager.allocate({worker:'worker-two',branch}));
  assert.equal(registryEntries(manager).length,0);
});

test('sparse work is isolated and contains required directories and individual inputs only', async t => {
  const {manager, head, git} = fixture(t);
  const entry = await manager.allocate({worker: 'worker-one', branch: 'geography/first', include: ['data/needed', 'data/one.json']});
  assert.equal(entry.head, head);
  assert.equal(fs.readFileSync(path.join(entry.path, 'data/needed/input.json'), 'utf8'), 'input');
  assert.ok(fs.existsSync(path.join(entry.path, 'data/one.json')));
  assert.ok(fs.existsSync(path.join(entry.path, 'scripts/tool.mjs')));
  assert.ok(!fs.existsSync(path.join(entry.path, 'data/other')));
  assert.ok(!fs.existsSync(path.join(entry.path, 'research/campaigns/old')));
  await assert.rejects(() => manager.allocate({worker: 'worker-one', branch: 'geography/second'}), /occupied/);
  const review = await manager.allocate({worker: 'worker-one', slot: 'review', commit: head});
  assert.notEqual(review.path, entry.path);
  assert.throws(() => manager.release({worker: 'worker-one', token: review.token}), /ownership/);
  const result = manager.release({worker: 'worker-one', token: entry.token});
  assert.equal(git('rev-parse', result.preservedRef).trim(), head);
  assert.ok(!fs.existsSync(entry.path));
  const next = await manager.allocate({worker: 'worker-one', branch: 'research/second', include: ['research/campaigns/new']});
  assert.equal(next.path, entry.path);
  assert.notEqual(next.token, entry.token);
  assert.throws(() => manager.release({worker: 'worker-one', token: entry.token}), /ownership/);
  const file = path.join(next.path, 'research/campaigns/new/result.json');
  fs.mkdirSync(path.dirname(file), {recursive: true}); fs.writeFileSync(file, '{}');
  execFileSync('git', ['-C', next.path, 'add', 'research/campaigns/new/result.json']);
  assert.match(execFileSync('git', ['-C', next.path, 'status', '--porcelain'], {encoding: 'utf8'}), /A  research\/campaigns\/new\/result.json/);
});

test('sparse inspection and checkout share the engineering code-only selection', async t => {
  const {repo, git, manager} = fixture(t);
  const files = {
    'package.json': '{"type":"module"}',
    'scripts/cold-entry.mjs': "import {answer} from '../coordination/engineering/shared/nested/helper.mjs'; console.log(answer());",
    'coordination/engineering/shared/nested/helper.mjs': "import {base} from '../base.js'; export const answer = () => base + 2;",
    'coordination/engineering/shared/base.js': "import {answer} from './nested/helper.mjs'; export const base = 40; export const cycle = () => answer();",
    'coordination/engineering/shared/runtime.cjs': 'module.exports = 42;',
    'coordination/engineering/shared/producer.py': 'print(42)\n',
    'coordination/engineering/shared/runner.sh': '#!/bin/sh\nexit 0\n',
    'coordination/engineering/shared/catalogue.json': '{"not":"automatic input"}',
    'coordination/engineering/shared/nested/large.json.gz': Buffer.alloc(1024 * 1024, 7),
    'research/geography/unrelated/reproduce.py': 'print("explicit scope")\n',
    'data/unrelated/reproduce.mjs': 'throw Error("explicit scope");'
  };
  for (const [name, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(repo, name)), {recursive: true});
    fs.writeFileSync(path.join(repo, name), body);
  }
  fs.chmodSync(path.join(repo, 'coordination/engineering/shared/runner.sh'), 0o755);
  git('add', '.'); git('commit', '-m', 'shared engineering imports and excluded products');
  const head = git('rev-parse', 'HEAD').trim(), scope = {commit: head, include: ['data/one.json', 'coordination/engineering/new-owned-output']};
  const inventory = manager.inspect(scope);
  const selected = inventory.inputs.map(row => row.path).sort();
  const expectedCode = Object.keys(files).filter(name => /\.(mjs|js|cjs|py|sh)$/.test(name) && name.startsWith('coordination/engineering/'));
  assert.deepEqual(selected.filter(name => name.startsWith('coordination/engineering/')), expectedCode.sort());
  const entry = await manager.allocate({worker: 'code-only', slot: 'review', ...scope});
  assert.equal(inventory.selectedBytes, inventory.inputs.reduce((sum, row) => sum + fs.statSync(path.join(entry.path, row.path)).size, 0));
  const materialized = execFileSync('git', ['-C', entry.path, 'ls-files', '-t', '-z'], {encoding: 'utf8'})
    .split('\0').filter(row => row && row[0] !== 'S').map(row => row.slice(2)).sort();
  assert.deepEqual(materialized, selected);
  assert.equal(execFileSync(process.execPath, ['scripts/cold-entry.mjs'], {cwd: entry.path, encoding: 'utf8'}).trim(), '42');
  for (const name of ['coordination/engineering/shared/catalogue.json', 'coordination/engineering/shared/nested/large.json.gz',
    'research/geography/unrelated/reproduce.py', 'data/unrelated/reproduce.mjs']) {
    assert.ok(!fs.existsSync(path.join(entry.path, name)), name);
  }
  manager.release({worker: 'code-only', slot: 'review', token: entry.token});
});

test('cold stock delivery and selected-check entries resolve imports before ordinary input refusal', async t => {
  const {repo, git, manager} = fixture(t);
  // Use the stock current code inventory, not a second maintained import list.
  // Copy JavaScript and the checker's Python sources, without scientific inputs
  // or installed modules. Both languages are in the focused CI code checkout.
  const source = path.resolve(import.meta.dirname, '..');
  const head = execFileSync('git', ['--no-lazy-fetch', '-C', source, 'rev-parse', 'HEAD'],
    {encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}}).trim();
  const files = workspaceManager(source).inspect({commit: head}).inputs
    .filter(({path: name}) => /\.(?:mjs|js|cjs|py)$/.test(name));
  for (const {path: name} of files) {
    fs.mkdirSync(path.dirname(path.join(repo, name)), {recursive: true});
    fs.writeFileSync(path.join(repo, name), fs.readFileSync(new URL('../' + name, import.meta.url)));
  }
  fs.writeFileSync(path.join(repo, 'package.json'), '{"type":"module"}');
  git('add', '.'); git('commit', '-m', 'actual stock entry fixture');
  const entry = await manager.allocate({worker: 'stock-entry', slot: 'review', commit: git('rev-parse', 'HEAD').trim()});
  const run = name => spawnSync(process.execPath, [name], {cwd: entry.path, encoding: 'utf8', timeout: 10000,
    env: {PATH: process.env.PATH, HOME: repo, GIT_NO_LAZY_FETCH: '1'}});
  for (const [name, expected] of [['scripts/prepare-delivery-handoff.mjs', /Use prepare-delivery-handoff\.mjs/],
    ['scripts/check-effective-geographic-regression.mjs', /Use python -I -B scripts\/run-geographic-check\.py/]]) {
    const result = run(name);
    assert.equal(result.error, undefined);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, expected);
    assert.doesNotMatch(result.stderr, /ERR_MODULE_NOT_FOUND|Cannot find module/);
  }
  // Removing a genuinely imported helper must fail before the ordinary guard.
  const helper = path.join(entry.path, 'scripts/native-patch-store.mjs'), bytes = fs.readFileSync(helper);
  fs.unlinkSync(helper);
  try {
    const result = run('scripts/prepare-delivery-handoff.mjs');
    assert.equal(result.error, undefined);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /ERR_MODULE_NOT_FOUND/);
    assert.match(result.stderr, /native-patch-store\.mjs/);
    assert.doesNotMatch(result.stderr, /Use prepare-delivery-handoff\.mjs/);
  } finally { fs.writeFileSync(helper, bytes); }
  assert.ok(!fs.existsSync(path.join(entry.path, 'data')));
  assert.ok(!fs.existsSync(path.join(entry.path, '.cache')));
  assert.ok(!fs.existsSync(path.join(entry.path, 'node_modules')));
  manager.release({worker: 'stock-entry', slot: 'review', token: entry.token});
});

test('automatic engineering code rejects unsafe sparse patterns and nonordinary modes before allocation', async t => {
  for (const [name, mode] of [['coordination/engineering/unsafe/[glob].mjs', '100644'],
    ['coordination/engineering/unsafe/new\nline.py', '100644'],
    ['coordination/engineering/unsafe/symlink.mjs', '120000'],
    ['coordination/engineering/unsafe/submodule.mjs', '160000']]) {
    const {repo, git, manager, head} = fixture(t);
    const oid = mode === '160000' ? head : git('rev-parse', 'HEAD:README.md').trim();
    execFileSync('git', ['-C', repo, 'update-index', '-z', '--index-info'], {input: `${mode} ${oid}\t${name}\0`});
    git('commit', '-m', 'unsafe automatic code fixture');
    const commit = git('rev-parse', 'HEAD').trim(), before = git('worktree', 'list', '--porcelain');
    assert.throws(() => manager.inspect({commit}), /ordinary file and safe literal path/);
    await assert.rejects(() => manager.allocate({worker: 'unsafe-code', branch: 'engineering/unsafe-code'}), /ordinary file and safe literal path/);
    assert.equal(git('worktree', 'list', '--porcelain'), before);
    assert.throws(() => git('rev-parse', '--verify', 'engineering/unsafe-code'));
    assert.deepEqual(registryEntries(manager), []);
    assert.ok(!fs.existsSync(path.join(manager.report().registry, 'state.json')));
  }
});

test('small work and review checkouts need no fixed free-space floor or reservation', async t => {
  const {manager, git, head} = fixture(t, {freeBytes: () => 128 * 1024});
  assert.deepEqual(manager.check(), {freeBytes: 128 * 1024});
  const work = await manager.allocate({worker: 'one', branch: 'engineering/low-free-space'});
  const review = await manager.allocate({worker: 'two', slot: 'review', commit: head});
  for (const entry of [work, review]) {
    assert.equal(entry.status, 'ready');
    assert.equal(entry.reservation, 0, 'old clients require the inert registry field');
    assert.equal(fs.readFileSync(path.join(entry.path, 'README.md'), 'utf8'), 'root');
    const released = manager.release({worker: entry.worker, slot: entry.slot, token: entry.token});
    assert.equal(git('rev-parse', released.preservedRef).trim(), head);
  }
  assert.deepEqual(registryEntries(manager), []);
});

test('removed reserve CLI option is rejected before any slot or branch mutation', async t => {
  const {repo, git, manager, head} = fixture(t);
  const result = spawnSync(process.execPath, [cliHelper(repo),
    'allocate', '--repo', repo, '--worker', 'legacy-options', '--slot', 'review', '--commit', head, '--reserve-gib', '1'],
  {cwd: repo, encoding: 'utf8'});
  assert.equal(result.status, 1);
  assert.match(result.stderr, /documented --repo\/--key value arguments/);
  assert.deepEqual(registryEntries(manager), []);
  assert.equal(git('worktree', 'list', '--porcelain').match(/^worktree /gm).length, 1);
});

test('legacy reservations neither inflate measured usage nor require registry migration', async t => {
  const {manager, head} = fixture(t);
  const priorWorker = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = 'legacy';
  t.after(() => { if (priorWorker === undefined) delete process.env.CODEX_THREAD_ID; else process.env.CODEX_THREAD_ID = priorWorker; });
  const legacy = await manager.allocate({worker: 'legacy', slot: 'review', commit: head});
  const stateFile = path.join(manager.report().registry, 'state.json');
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  state.entries[0].reservation = 51 * 1024 ** 3;
  fs.writeFileSync(stateFile, JSON.stringify(state));
  const before = fs.readFileSync(stateFile);
  const report = manager.report();
  assert.deepEqual(fs.readFileSync(stateFile), before, 'report is read-only');
  assert.equal(report.checkoutBytes, report.worktrees.reduce((sum, row) => sum + row.bytes, 0));
  assert.ok(report.checkoutBytes < state.entries[0].reservation);
  const next = await manager.allocate({worker: 'new', slot: 'review', commit: head});
  assert.deepEqual(manager.report().entries[0], {
    worker: 'legacy', slot: 'review', path: state.entries[0].path, head: state.entries[0].head,
    branch: state.entries[0].branch, profile: state.entries[0].profile, include: state.entries[0].include,
    reservation: state.entries[0].reservation, status: state.entries[0].status, createdAt: state.entries[0].createdAt
  }, 'report exposes safe metadata for this worker only');
  manager.release({worker: 'new', slot: 'review', token: next.token});
  assert.deepEqual(registryEntries(manager), state.entries);
  manager.release({worker: 'legacy', slot: 'review', token: legacy.token});
});

test('allocation and free-space checks skip legacy usage traversals while report scopes live diagnostics to owner', async t => {
  let available = 128 * 1024;
  const {manager, git, head, temporary} = fixture(t, {freeBytes: () => available});
  for (let index = 0; index < 16; index++) {
    git('worktree', 'add', '--detach', '--no-checkout', path.join(temporary, `legacy-${index}`), head);
  }
  const calls = [];
  const execute = childProcess.execFileSync;
  t.mock.method(childProcess, 'execFileSync', (command, args, ...options) => {
    calls.push({command, args});
    return execute(command, args, ...options);
  });
  syncBuiltinESMExports();
  t.after(() => {
    t.mock.restoreAll();
    syncBuiltinESMExports();
  });
  const observe = async action => {
    calls.length = 0;
    const result = await action();
    return {result, operations: {
      du: calls.filter(({command}) => command === 'du').length,
      worktreeList: calls.filter(({command, args}) => command === 'git'
        && args.slice(2).join(' ') === 'worktree list --porcelain -z').length
    }};
  };
  const reported = await observe(() => manager.report());
  assert.deepEqual(reported.operations, {du: 17, worktreeList: 1});
  assert.deepEqual(reported.result.entries, []);
  assert.deepEqual(reported.result.worktrees, []);
  assert.equal(reported.result.checkoutBytes, 0, 'no identity yields no cross-worker checkout totals');
  const checked = await observe(() => manager.check());
  assert.deepEqual(checked.operations, {du: 0, worktreeList: 0});
  assert.deepEqual(checked.result, {freeBytes: available});

  const allocated = await observe(() => manager.allocate({worker: 'one', slot: 'review', commit: head}));
  t.diagnostic(`allocation diagnostic operations: ${JSON.stringify(allocated.operations)}`);
  assert.deepEqual(allocated.operations, {du: 0, worktreeList: 0});
  assert.equal(allocated.result.head, head);
  assert.equal(fs.readFileSync(path.join(allocated.result.path, 'README.md'), 'utf8'), 'root');
  const priorWorker = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = 'one';
  t.after(() => { if (priorWorker === undefined) delete process.env.CODEX_THREAD_ID; else process.env.CODEX_THREAD_ID = priorWorker; });
  const after = await observe(() => manager.report());
  assert.deepEqual(after.operations, {du: 18, worktreeList: 1});
  assert.equal(after.result.freeBytes, available);
  assert.equal(after.result.entries.length, 1);
  assert.equal(after.result.entries[0].worker, 'one');
  assert.equal(Object.hasOwn(after.result.entries[0], 'token'), false);
  assert.equal(JSON.stringify(after.result).includes(allocated.result.token), false);
  assert.equal(after.result.worktrees.length, 1);
  assert.equal(after.result.worktrees.find(row => row.path === allocated.result.path).managed, true);
  assert.equal(after.result.checkoutBytes, after.result.worktrees.reduce((sum, row) =>
    sum + row.bytes, 0));

  fs.renameSync(path.join(temporary, 'legacy-0'), path.join(temporary, 'legacy-0-moved'));
  assert.throws(() => manager.report(), /Command failed: du/);
  available = 0;
  const empty = await observe(() => manager.check());
  assert.deepEqual(empty.operations, {du: 0, worktreeList: 0});
  assert.equal(empty.result.freeBytes, 0, 'check reports actual capacity without imposing a policy');
});

test('report CLI is current-worker scoped and never serializes capabilities', async t => {
  const {repo, manager, head} = fixture(t);
  const mine = await manager.allocate({worker: 'report-owner', slot: 'review', commit: head});
  const other = await manager.allocate({worker: 'other-owner', slot: 'review', commit: head});
  const helper = cliHelper(repo);
  const run = (worker, extra = []) => spawnSync(process.execPath,
    [helper, 'report', '--repo', repo, ...(worker ? ['--worker', worker] : []), ...extra],
    {cwd: repo, env: {...process.env, CODEX_THREAD_ID: 'report-owner'}, encoding: 'utf8'});
  const result = run('report-owner');
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.deepEqual(report.entries.map(({worker, slot}) => ({worker, slot})), [{worker: 'report-owner', slot: 'review'}]);
  assert.ok(report.worktrees.every(row => row.path === mine.path));
  assert.equal(result.stdout.includes(mine.token), false);
  assert.equal(result.stdout.includes(other.token), false);
  assert.doesNotMatch(result.stdout, /\"token\"\s*:/);
  const foreign = run('other-owner');
  assert.equal(foreign.status, 1);
  assert.match(foreign.stderr, /Worker identity mismatch/);
  assert.equal(foreign.stdout, '');
  const capabilityArg = run('report-owner', ['--token', mine.token]);
  assert.equal(capabilityArg.status, 1);
  assert.match(capabilityArg.stderr, /Report accepts only/);
  assert.equal(capabilityArg.stdout, '');
  const noIdentity = spawnSync(process.execPath, [helper, 'report', '--repo', repo],
    {cwd: repo, env: {...process.env, CODEX_THREAD_ID: ''}, encoding: 'utf8'});
  assert.equal(noIdentity.status, 0, noIdentity.stderr);
  assert.deepEqual(JSON.parse(noIdentity.stdout).entries, []);
  manager.release({worker: 'other-owner', slot: 'review', token: other.token});
  manager.release({worker: 'report-owner', slot: 'review', token: mine.token});
});

test('workspace CLI allocation prints safe metadata but keeps the token private in storage', async t => {
  const {repo, manager, head, git} = fixture(t);
  const helper = cliHelper(repo, path.join(repo, 'scripts'));
  const result = spawnSync(process.execPath, [helper, 'allocate', '--repo', repo, '--worker', 'cli-allocation-owner',
    '--slot', 'review', '--commit', head], {cwd: repo, env: {...process.env, CODEX_THREAD_ID: 'inherited-review-coordinator'}, encoding: 'utf8'});
  assert.equal(result.status, 0, result.stderr);
  const metadata = JSON.parse(result.stdout);
  assert.equal(Object.hasOwn(metadata, 'token'), false);
  assert.equal(metadata.worker, 'cli-allocation-owner');
  assert.equal(metadata.head, head);
  assert.ok(metadata.capabilityFile);
  const stored = registryEntries(manager).find(entry => entry.worker === metadata.worker && entry.slot === metadata.slot);
  assert.ok(stored?.token, 'allocation capability remains stored for guarded lifecycle operations');
  assert.equal(fs.statSync(metadata.capabilityFile).mode & 0o777, 0o600);
  assert.equal(result.stdout.includes(stored.token), false);
  assert.doesNotMatch(result.stdout, /\"token\"\s*:/);
  const released = manager.release({worker: stored.worker, slot: stored.slot, capabilityFile: metadata.capabilityFile});
  assert.equal(released.released, true);
  assert.equal(released.capability_file_removed, true);
  assert.equal(git('rev-parse', released.preservedRef).trim(), head);
  assert.deepEqual(registryEntries(manager), []);
});

test('interrupted CLI allocation resumes its preparing slot through the owner capability file', async t => {
  const {repo, manager, head, git} = fixture(t);
  const worker = 'cli-interrupted-owner';
  const branch = 'engineering/cli-interrupted-owner';
  const helper = cliHelper(repo, path.join(repo, 'scripts'));
  const realGit = execFileSync('which', ['git'], {encoding: 'utf8'}).trim();
  const wrapperDir = path.join(repo, '.git', 'cli-interruption-bin');
  fs.mkdirSync(wrapperDir);
  const wrapper = path.join(wrapperDir, 'git');
  fs.writeFileSync(wrapper, `#!/bin/sh\nprevious=''\nfor argument do\n  if [ "$previous" = read-tree ] && [ "$argument" = -mu ]; then\n    echo 'injected allocation materialization interruption' >&2\n    exit 73\n  fi\n  previous="$argument"\ndone\nexec ${JSON.stringify(realGit)} "$@"\n`, {mode: 0o755});
  fs.chmodSync(wrapper, 0o755);
  const interrupted = spawnSync(process.execPath, [helper, 'allocate', '--repo', repo, '--worker', worker,
    '--branch', branch], {cwd: repo, encoding: 'utf8', timeout: 10000,
    env: {...process.env, CODEX_THREAD_ID: worker, PATH: `${wrapperDir}${path.delimiter}${process.env.PATH}`}});
  assert.equal(interrupted.status, 1, interrupted.stderr);
  assert.match(interrupted.stderr, /injected allocation materialization interruption/);
  assert.equal(interrupted.stdout, '');
  assert.doesNotMatch(interrupted.stderr, /\"token\"\s*:/);
  const [preparing] = registryEntries(manager).filter(entry => entry.worker === worker && entry.slot === 'work');
  assert.equal(preparing.status, 'preparing');
  assert.equal(fs.existsSync(path.join(manager.report().registry, 'lock')), false, 'the caught interruption releases the allocator lock');
  const capabilityFile = manager.capabilityFilePath({worker, slot: 'work'});
  assert.equal(fs.statSync(capabilityFile).mode & 0o777, 0o600);
  const capability = fs.readFileSync(capabilityFile, 'utf8');
  assert.ok(capability.includes(preparing.token), 'the private file is bound to the preparing reservation');

  const resumed = spawnSync(process.execPath, [helper, 'resume', '--repo', repo, '--worker', worker, '--slot', 'work'], {
    cwd: repo, encoding: 'utf8', env: {...process.env, CODEX_THREAD_ID: worker}
  });
  assert.equal(resumed.status, 0, resumed.stderr);
  const metadata = JSON.parse(resumed.stdout);
  assert.equal(Object.hasOwn(metadata, 'token'), false);
  assert.equal(metadata.status, 'ready');
  assert.equal(metadata.capabilityFile, capabilityFile);
  assert.equal(resumed.stdout.includes(preparing.token), false);
  assert.doesNotMatch(resumed.stdout, /\"token\"\s*:/);
  assert.equal(registryEntries(manager).find(entry => entry.worker === worker).token, preparing.token);

  const released = spawnSync(process.execPath, [helper, 'release', '--repo', repo, '--worker', worker,
    '--slot', 'work', '--capability-file', capabilityFile], {cwd: repo, encoding: 'utf8'});
  assert.equal(released.status, 0, released.stderr);
  assert.equal(JSON.parse(released.stdout).capability_file_removed, true);
  assert.ok(!fs.existsSync(capabilityFile));
  assert.equal(git('rev-parse', `refs/heads/${branch}`).trim(), head);
  assert.deepEqual(registryEntries(manager), []);
});

test('workspace CLI resume prints safe metadata while preserving the stored capability', async t => {
  const {repo, manager, head, git} = fixture(t);
  const worker = 'cli-resume-owner';
  const branch = 'engineering/cli-resume-owner';
  const entry = await manager.allocate({worker, branch});
  const capabilityFile = manager.ensureCapabilityFile({worker, slot: 'work'});
  execFileSync('git', ['-C', entry.path, 'read-tree', '--empty']);
  for (const name of fs.readdirSync(entry.path)) {
    if (name !== '.git') fs.rmSync(path.join(entry.path, name), {recursive: true, force: true});
  }
  const stateFile = path.join(manager.report().registry, 'state.json');
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  state.entries[0].status = 'preparing';
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');

  const helper = cliHelper(repo, path.join(repo, 'scripts'));
  const result = spawnSync(process.execPath, [helper, 'resume', '--repo', repo, '--worker', worker, '--slot', 'work',
    '--capability-file', capabilityFile], {cwd: repo, env: {...process.env, CODEX_THREAD_ID: worker}, encoding: 'utf8'});
  assert.equal(result.status, 0, result.stderr);
  const metadata = JSON.parse(result.stdout);
  assert.equal(Object.hasOwn(metadata, 'token'), false);
  assert.equal(metadata.worker, worker);
  assert.equal(metadata.head, head);
  assert.equal(metadata.capabilityFile, capabilityFile);
  assert.equal(result.stdout.includes(entry.token), false);
  assert.doesNotMatch(result.stdout, /\"token\"\s*:/);
  assert.equal(registryEntries(manager)[0].token, entry.token);
  assert.equal(registryEntries(manager)[0].status, 'ready');
  const released = manager.release({worker, slot: 'work', capabilityFile});
  assert.equal(git('rev-parse', released.preservedRef).trim(), head);
  assert.deepEqual(registryEntries(manager), []);
});

test('disk write failure propagates and preserves interrupted allocation and other workers', async t => {
  const {manager, head, git} = fixture(t);
  const existing = await manager.allocate({worker: 'existing', slot: 'review', commit: head});
  const execute = childProcess.execFileSync;
  t.mock.method(childProcess, 'execFileSync', (command, args, ...options) => {
    if (command === 'git' && args.slice(2).join(' ') === 'read-tree -mu HEAD') {
      throw Object.assign(new Error('ENOSPC: no space left on device'), {code: 'ENOSPC'});
    }
    return execute(command, args, ...options);
  });
  syncBuiltinESMExports();
  t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports(); });
  await assert.rejects(() => manager.allocate({worker: 'interrupted', slot: 'review', commit: head}), {code: 'ENOSPC'});
  const report = manager.report();
  assert.deepEqual(registryEntries(manager)[0], existing);
  const interrupted = registryEntries(manager)[1];
  assert.equal(interrupted.status, 'preparing');
  assert.ok(fs.existsSync(interrupted.path));
  assert.throws(() => manager.release({worker: 'interrupted', slot: 'review', token: interrupted.token}), /inspection/);
  assert.equal(fs.readFileSync(path.join(existing.path, 'README.md'), 'utf8'), 'root');
  assert.equal(git('rev-parse', 'HEAD').trim(), head);
  assert.ok(!fs.existsSync(path.join(report.registry, 'lock')));
});

test('dirty tracked, untracked and ignored work cannot be discarded', async t => {
  const {manager} = fixture(t);
  const entry = await manager.allocate({worker: 'one', branch: 'engineering/dirty'});
  const release = () => manager.release({worker: 'one', token: entry.token});
  fs.writeFileSync(path.join(entry.path, 'README.md'), 'valuable');
  assert.throws(release, /uncommitted/);
  fs.writeFileSync(path.join(entry.path, 'README.md'), 'root');
  fs.writeFileSync(path.join(entry.path, 'new.txt'), 'unique');
  assert.throws(release, /untracked/);
  fs.unlinkSync(path.join(entry.path, 'new.txt'));
  fs.mkdirSync(path.join(entry.path, '.scratch'));
  fs.writeFileSync(path.join(entry.path, '.scratch/result.txt'), 'ignored unique');
  assert.throws(release, /ignored/);
  assert.equal(fs.readFileSync(path.join(entry.path, '.scratch/result.txt'), 'utf8'), 'ignored unique');
});

test('large sparse indexes release only clean owned work and preserve recovery', async t => {
  const {repo, git, manager} = fixture(t);
  const blob = git('rev-parse', 'HEAD:README.md').trim();
  const rows = Array.from({length: 9000}, (_, i) =>
    `100644 ${blob}\tdata/large-index/${String(i).padStart(5, '0')}-${'x'.repeat(120)}.json\n`).join('');
  execFileSync('git', ['-C', repo, 'update-index', '--index-info'], {input: rows});
  git('commit', '-q', '-m', 'large sparse index fixture');
  const head = git('rev-parse', 'HEAD').trim();
  const entry = await manager.allocate({worker: 'large-index', branch: 'engineering/large-index'});
  const inventory = execFileSync('git', ['-C', entry.path, 'ls-files', '-vz'], {maxBuffer: 32 * 1024 * 1024});
  assert.ok(inventory.length > 1024 * 1024, 'fixture reproduces the real repository inventory size');
  assert.ok(!fs.existsSync(path.join(entry.path, 'data/large-index')));
  assert.throws(() => manager.release({worker: 'large-index', token: 'wrong-token'}), /ownership/);
  fs.mkdirSync(path.join(entry.path, '.scratch'));
  const valuable = path.join(entry.path, '.scratch/valuable.txt');
  fs.writeFileSync(valuable, 'preserve');
  assert.throws(() => manager.release({worker: 'large-index', token: entry.token}), /ignored/);
  assert.equal(fs.readFileSync(valuable, 'utf8'), 'preserve');
  fs.unlinkSync(valuable);
  const result = manager.release({worker: 'large-index', token: entry.token});
  assert.equal(git('rev-parse', result.preservedRef).trim(), head);
  assert.ok(!fs.existsSync(entry.path));
});

test('lost-capability recovery rotates only the exact clean author slot and releases through its private file', async t => {
  const {git, manager, head} = fixture(t);
  const worker = 'recovery-author';
  const branch = 'engineering/recovery-author';
  const entry = await manager.allocate({worker, branch});
  const oldToken = entry.token;
  const oldIdentity = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = worker;
  t.after(() => oldIdentity === undefined ? delete process.env.CODEX_THREAD_ID : process.env.CODEX_THREAD_ID = oldIdentity);

  const result = manager.recoverLostCapability({worker, slot: 'work', expectedPath: entry.path,
    expectedBranch: branch, expectedHead: head});
  assert.deepEqual(Object.keys(result).sort(), ['branch','capabilityFile','head','path','previousTokenInvalidated','recovered','slot','worker'].sort());
  assert.equal(result.recovered, true);
  assert.equal(result.previousTokenInvalidated, true);
  assert.equal(result.path, entry.path);
  assert.equal(result.branch, branch);
  assert.equal(result.head, head);
  assert.ok(!JSON.stringify(result).includes(oldToken));
  assert.ok(fs.statSync(path.dirname(result.capabilityFile)).mode & 0o700);
  assert.equal(fs.statSync(path.dirname(result.capabilityFile)).mode & 0o077, 0);
  assert.equal(fs.statSync(result.capabilityFile).mode & 0o777, 0o600);
  const active = registryEntries(manager)[0];
  assert.notEqual(active.token, oldToken);
  assert.throws(() => manager.release({worker, token: oldToken}), /ownership/);
  assert.throws(() => manager.recoverLostCapability({worker, expectedPath: entry.path,
    expectedBranch: branch, expectedHead: head}), /capability already exists/);
  assert.equal(fs.readFileSync(path.join(entry.path, 'README.md'), 'utf8'), 'root');
  assert.equal(git('rev-parse', 'HEAD').trim(), head);
  const released = manager.release({worker, slot: 'work', capabilityFile: result.capabilityFile});
  assert.equal(released.released, true);
  assert.equal(released.capability_file_removed, true);
  assert.ok(!fs.existsSync(result.capabilityFile));
  assert.equal(git('rev-parse', released.preservedRef).trim(), head);
  assert.deepEqual(registryEntries(manager), []);
  assert.ok(!fs.existsSync(entry.path));
});

test('lost-capability recovery fails closed for identity, binding, dirty state and unknown private files', async t => {
  const {manager, head} = fixture(t);
  const worker = 'recovery-guarded';
  const branch = 'engineering/recovery-guarded';
  const entry = await manager.allocate({worker, branch});
  const oldToken = entry.token;
  const oldIdentity = process.env.CODEX_THREAD_ID;
  t.after(() => oldIdentity === undefined ? delete process.env.CODEX_THREAD_ID : process.env.CODEX_THREAD_ID = oldIdentity);
  const request = overrides => manager.recoverLostCapability({worker, slot: 'work', expectedPath: entry.path,
    expectedBranch: branch, expectedHead: head, ...overrides});

  process.env.CODEX_THREAD_ID = 'different-author';
  assert.throws(() => request({}), /exact CODEX_THREAD_ID/);
  process.env.CODEX_THREAD_ID = worker;
  assert.throws(() => request({expectedPath: `${entry.path}-other`}), /exact existing owner work slot/);
  assert.throws(() => request({expectedBranch: 'engineering/other'}), /exact existing owner work slot/);
  assert.throws(() => request({expectedHead: '0'.repeat(40)}), /branch, HEAD or registration changed/);
  assert.equal(registryEntries(manager)[0].token, oldToken);

  const gitDirectory = execFileSync('git', ['-C', entry.path, 'rev-parse', '--absolute-git-dir'], {encoding: 'utf8'}).trim();
  const indexLock = path.join(gitDirectory, 'index.lock');
  fs.writeFileSync(indexLock, 'preserve active lock');
  assert.throws(() => request({}), /Git writer lock exists/);
  assert.equal(fs.readFileSync(indexLock, 'utf8'), 'preserve active lock');
  fs.unlinkSync(indexLock);

  execFileSync('git', ['-C', entry.path, 'update-index', '--assume-unchanged', 'README.md']);
  assert.throws(() => request({}), /Index trust flags can hide edits/);
  execFileSync('git', ['-C', entry.path, 'update-index', '--no-assume-unchanged', 'README.md']);
  assert.equal(registryEntries(manager)[0].token, oldToken);

  fs.writeFileSync(path.join(entry.path, 'untracked.txt'), 'keep me');
  assert.throws(() => request({}), /dirty or contains ignored/);
  assert.equal(fs.readFileSync(path.join(entry.path, 'untracked.txt'), 'utf8'), 'keep me');
  assert.equal(registryEntries(manager)[0].token, oldToken);
  fs.unlinkSync(path.join(entry.path, 'untracked.txt'));

  const capabilityDirectory = path.join(manager.report().registry, 'capabilities');
  fs.mkdirSync(capabilityDirectory, {mode: 0o700});
  const capabilityPath = path.join(capabilityDirectory, `${createHash('sha256').update(worker).digest('hex')}-work.json`);
  const unknown = Buffer.from('preserve unknown file\n');
  fs.writeFileSync(capabilityPath, unknown, {mode: 0o600});
  assert.throws(() => request({}), /malformed/);
  assert.deepEqual(fs.readFileSync(capabilityPath), unknown);
  fs.unlinkSync(capabilityPath);
  const capabilityTarget = `${capabilityPath}.target`;
  fs.writeFileSync(capabilityTarget, unknown, {mode: 0o600});
  fs.symlinkSync(capabilityTarget, capabilityPath);
  assert.throws(() => request({}), /Symlink directory refused/);
  assert.deepEqual(fs.readFileSync(capabilityTarget), unknown);
  assert.equal(registryEntries(manager)[0].token, oldToken);
});

function sealOperatorReceipt(value) {
  const body = Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'sha256').sort(([a], [b]) => a.localeCompare(b)));
  return {...body, sha256: createHash('sha256').update(JSON.stringify(body)).digest('hex')};
}

test('audited operator release binds approval, independent review, keeper bytes and the live slot', async t => {
  const {repo, manager, head, temporary} = fixture(t, {inspectReaders: () => []});
  const worker = 'brazil-orphan', operator = 'team-three-coordinator', reviewer = 'team-three-reviewer';
  const branch = 'engineering/brazil-orphan';
  const entry = await manager.allocate({worker, branch});
  execFileSync('git', ['-C', entry.path, 'commit', '--allow-empty', '-m', 'owner advanced the live slot']);
  const liveHead = execFileSync('git', ['-C', entry.path, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();
  assert.notEqual(liveHead, entry.head);
  assert.equal(execFileSync('git', ['-C', entry.path, 'merge-base', '--is-ancestor', entry.head, liveHead]).toString(), '');
  const source = path.join(entry.path, '.scratch/unique.txt');
  fs.mkdirSync(path.dirname(source), {recursive: true});
  fs.writeFileSync(source, 'unique evidence\n', {mode: 0o600});
  const bytes = fs.readFileSync(source), mode = fs.statSync(source).mode & 0o777;
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const keeperPath = path.join(temporary, 'keeper', 'unique.txt');
  const restorationPath = path.join(temporary, 'restored', 'unique.txt');
  fs.mkdirSync(path.dirname(keeperPath), {recursive: true});
  fs.mkdirSync(path.dirname(restorationPath), {recursive: true});
  fs.writeFileSync(keeperPath, bytes, {mode});
  fs.writeFileSync(restorationPath, bytes, {mode});
  let reviewReceipt = sealOperatorReceipt({result: 'PASS', worker: reviewer, scope: 'BRA', worker_id: worker,
    slot: 'work', path: entry.path, branch, head: liveHead});
  const keeperManifest = sealOperatorReceipt({result: 'PASS', scope: 'BRA', worker_id: worker,
    slot: 'work', path: entry.path, branch, head: liveHead,
    files: [{path: '.scratch/unique.txt', keeperPath, restorationPath, bytes: bytes.length, mode, sha256}]});
  reviewReceipt = sealOperatorReceipt({...reviewReceipt, authorizationRef: 'team3-bra-tgo-orphaned-slots', keeperManifestSha256: keeperManifest.sha256});
  const oldIdentity = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = operator;
  t.after(() => oldIdentity === undefined ? delete process.env.CODEX_THREAD_ID : process.env.CODEX_THREAD_ID = oldIdentity);

  const result = await manager.operatorRelease({operator, scope: 'BRA', authorizationRef: 'team3-bra-tgo-orphaned-slots',
    worker, slot: 'work', expectedPath: entry.path, expectedBranch: branch, expectedHead: liveHead,
    reviewReceipt, keeperManifest});
  assert.equal(result.released, true);
  assert.equal(fs.existsSync(entry.path), false);
  assert.equal(fs.readFileSync(keeperPath, 'utf8'), 'unique evidence\n');
  assert.equal(fs.readFileSync(restorationPath, 'utf8'), 'unique evidence\n');
  assert.deepEqual(registryEntries(manager), []);
  const audit = JSON.parse(fs.readFileSync(result.auditReceipt, 'utf8'));
  assert.equal(audit.status, 'released');
  assert.equal(audit.worker, worker);
  assert.equal(audit.head, liveHead);
  assert.equal(execFileSync('git', ['-C', repo, 'rev-parse', result.preservedRef], {encoding: 'utf8'}).trim(), liveHead);
  assert.equal(audit.keepers[0].sha256, sha256);
  assert.equal(Object.hasOwn(audit, 'token'), false);
  assert.ok(!JSON.stringify(result).includes(entry.token));
  await assert.rejects(() => manager.operatorRelease({operator, scope: 'BRA', authorizationRef: 'team3-bra-tgo-orphaned-slots',
    worker, slot: 'work', expectedPath: entry.path, expectedBranch: branch, expectedHead: liveHead,
    reviewReceipt, keeperManifest}), /already used/);
});

test('audited operator release refuses an unrelated live head', async t => {
  const {repo, head, temporary} = fixture(t, {inspectReaders: () => []});
  const worker = 'unrelated-head-orphan', operator = 'team-three-coordinator', reviewer = 'team-three-reviewer';
  const branch = 'engineering/unrelated-head-orphan';
  const manager = workspaceManager(repo, {inspectReaders: () => []});
  const entry = await manager.allocate({worker, branch});
  const tree = execFileSync('git', ['-C', entry.path, 'rev-parse', 'HEAD^{tree}'], {encoding: 'utf8'}).trim();
  const unrelatedHead = execFileSync('git', ['-C', repo, 'commit-tree', tree, '-m', 'unrelated owner tip'], {encoding: 'utf8'}).trim();
  execFileSync('git', ['-C', entry.path, 'reset', '--hard', unrelatedHead]);
  assert.notEqual(spawnSync('git', ['-C', repo, 'merge-base', '--is-ancestor', entry.head, unrelatedHead]).status, 0);
  assert.equal(execFileSync('git', ['-C', entry.path, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim(), unrelatedHead);
  const reviewReceipt = sealOperatorReceipt({result: 'PASS', worker: reviewer, scope: 'BRA', worker_id: worker,
    slot: 'work', path: entry.path, branch, head: unrelatedHead, authorizationRef: 'team3-bra-tgo-orphaned-slots',
    keeperManifestSha256: '0'.repeat(64)});
  const keeperManifest = sealOperatorReceipt({result: 'PASS', scope: 'BRA', worker_id: worker,
    slot: 'work', path: entry.path, branch, head: unrelatedHead, files: []});
  const boundReview = sealOperatorReceipt({...reviewReceipt, keeperManifestSha256: keeperManifest.sha256});
  const oldIdentity = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = operator;
  t.after(() => oldIdentity === undefined ? delete process.env.CODEX_THREAD_ID : process.env.CODEX_THREAD_ID = oldIdentity);
  await assert.rejects(manager.operatorRelease({operator, scope: 'BRA', authorizationRef: 'team3-bra-tgo-orphaned-slots',
    worker, slot: 'work', expectedPath: entry.path, expectedBranch: branch, expectedHead: unrelatedHead,
    reviewReceipt: boundReview, keeperManifest}), /not a descendant/);
  assert.ok(fs.existsSync(entry.path));
  assert.equal(execFileSync('git', ['-C', entry.path, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim(), unrelatedHead);
  assert.deepEqual(registryEntries(manager).map(item => item.worker), [worker]);
  assert.equal(fs.existsSync(path.join(manager.report().registry, 'audit')), false);
  const recovery = spawnSync('git', ['-C', repo, 'show-ref', '--verify', '--hash',
    `refs/worldatlas-local-recovery/${createHash('sha256').update(entry.token).digest('hex')}`], {encoding: 'utf8'});
  assert.notEqual(recovery.status, 0);
  assert.equal(head, entry.head);
});

test('operator release refuses a tip advanced between review and ref locking', async t => {
  const {repo, temporary} = fixture(t, {inspectReaders: () => []});
  const realGit = execFileSync('which', ['git'], {encoding: 'utf8'}).trim();
  const bin = path.join(temporary, 'race-bin'); fs.mkdirSync(bin);
  const wrapper = path.join(bin, 'git');
  const branch = 'engineering/raced-head-orphan', worker = 'raced-head-orphan';
  const common = execFileSync('git', ['-C', repo, 'rev-parse', '--path-format=absolute', '--git-common-dir'], {encoding: 'utf8'}).trim();
  const pathFile = path.join(temporary, 'race-worktree-path');
  fs.writeFileSync(wrapper, `#!/bin/sh\nif [ "$1" = "--git-dir" ] && [ "$2" = "${common}" ] && [ "$3" = "update-ref" ] && [ "$4" = "--stdin" ]; then\n  race_worktree=$(cat "$WORLDATLAS_TEST_RACE_PATH_FILE")\n  "$WORLDATLAS_TEST_REAL_GIT" -C "$race_worktree" commit --allow-empty -m 'concurrent owner tip' >&2 || exit 91\nfi\nexec "$WORLDATLAS_TEST_REAL_GIT" "$@"\n`, {mode: 0o700});
  const oldPath = process.env.PATH, oldRealGit = process.env.WORLDATLAS_TEST_REAL_GIT, oldPathFile = process.env.WORLDATLAS_TEST_RACE_PATH_FILE;
  process.env.PATH = `${bin}:${oldPath}`; process.env.WORLDATLAS_TEST_REAL_GIT = realGit; process.env.WORLDATLAS_TEST_RACE_PATH_FILE = pathFile;
  t.after(() => {
    if (oldPath === undefined) delete process.env.PATH; else process.env.PATH = oldPath;
    if (oldRealGit === undefined) delete process.env.WORLDATLAS_TEST_REAL_GIT; else process.env.WORLDATLAS_TEST_REAL_GIT = oldRealGit;
    if (oldPathFile === undefined) delete process.env.WORLDATLAS_TEST_RACE_PATH_FILE; else process.env.WORLDATLAS_TEST_RACE_PATH_FILE = oldPathFile;
  });
  const manager = workspaceManager(repo, {inspectReaders: () => []});
  const entry = await manager.allocate({worker, branch});
  fs.writeFileSync(pathFile, entry.path);
  execFileSync('git', ['-C', entry.path, 'commit', '--allow-empty', '-m', 'reviewed live tip']);
  const reviewedHead = execFileSync('git', ['-C', entry.path, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();
  const reviewReceipt = sealOperatorReceipt({result: 'PASS', worker: 'team-three-reviewer', scope: 'BRA', worker_id: worker,
    slot: 'work', path: entry.path, branch, head: reviewedHead, authorizationRef: 'team3-bra-tgo-orphaned-slots'});
  const keeperManifest = sealOperatorReceipt({result: 'PASS', scope: 'BRA', worker_id: worker,
    slot: 'work', path: entry.path, branch, head: reviewedHead, files: []});
  const boundReview = sealOperatorReceipt({...reviewReceipt, keeperManifestSha256: keeperManifest.sha256});
  const oldIdentity = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = 'team-three-coordinator';
  t.after(() => oldIdentity === undefined ? delete process.env.CODEX_THREAD_ID : process.env.CODEX_THREAD_ID = oldIdentity);
  await assert.rejects(manager.operatorRelease({operator: 'team-three-coordinator', scope: 'BRA',
    authorizationRef: 'team3-bra-tgo-orphaned-slots', worker, slot: 'work', expectedPath: entry.path,
    expectedBranch: branch, expectedHead: reviewedHead, reviewReceipt: boundReview, keeperManifest}),
  /expected|changed while locking/);
  const actualHead = execFileSync(realGit, ['-C', entry.path, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();
  assert.notEqual(actualHead, reviewedHead);
  assert.ok(fs.existsSync(entry.path));
  assert.equal(registryEntries(manager)[0].path, entry.path);
  const ref = `refs/worldatlas-local-recovery/${createHash('sha256').update(entry.token).digest('hex')}`;
  assert.equal(execFileSync(realGit, ['-C', repo, 'rev-parse', ref], {encoding: 'utf8'}).trim(), reviewedHead);
  const auditFile = fs.readdirSync(path.join(manager.report().registry, 'audit'))[0];
  const audit = JSON.parse(fs.readFileSync(path.join(manager.report().registry, 'audit', auditFile), 'utf8'));
  assert.equal(audit.status, 'failed');
  assert.equal(audit.head, reviewedHead);
  assert.equal(audit.preservedRef, ref);
});

test('audited operator release refuses stale identity, dirty work, open readers and changed keeper data', async t => {
  let readers = [];
  const {manager, head, temporary} = fixture(t, {inspectReaders: () => readers});
  const worker = 'togo-orphan', operator = 'team-three-coordinator', reviewer = 'team-three-reviewer';
  const branch = 'engineering/togo-orphan';
  const entry = await manager.allocate({worker, branch});
  const source = path.join(entry.path, '.scratch/unique.txt');
  fs.mkdirSync(path.dirname(source), {recursive: true});
  fs.writeFileSync(source, 'unique evidence\n', {mode: 0o600});
  const bytes = fs.readFileSync(source), mode = fs.statSync(source).mode & 0o777;
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const keeperPath = path.join(temporary, 'keeper', 'unique.txt');
  const restorationPath = path.join(temporary, 'restored', 'unique.txt');
  fs.mkdirSync(path.dirname(keeperPath), {recursive: true});
  fs.mkdirSync(path.dirname(restorationPath), {recursive: true});
  fs.writeFileSync(keeperPath, bytes, {mode}); fs.writeFileSync(restorationPath, bytes, {mode});
  let reviewReceipt = sealOperatorReceipt({result: 'PASS', worker: reviewer, scope: 'TGO', worker_id: worker,
    slot: 'work', path: entry.path, branch, head});
  const keeperManifest = sealOperatorReceipt({result: 'PASS', scope: 'TGO', worker_id: worker,
    slot: 'work', path: entry.path, branch, head,
    files: [{path: '.scratch/unique.txt', keeperPath, restorationPath, bytes: bytes.length, mode, sha256}]});
  reviewReceipt = sealOperatorReceipt({...reviewReceipt, authorizationRef: 'team3-bra-tgo-orphaned-slots', keeperManifestSha256: keeperManifest.sha256});
  const oldIdentity = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = operator;
  t.after(() => oldIdentity === undefined ? delete process.env.CODEX_THREAD_ID : process.env.CODEX_THREAD_ID = oldIdentity);
  const request = overrides => manager.operatorRelease({operator, scope: 'TGO', authorizationRef: 'team3-bra-tgo-orphaned-slots',
    worker, slot: 'work', expectedPath: entry.path, expectedBranch: branch, expectedHead: head,
    reviewReceipt, keeperManifest, ...overrides});

  await assert.rejects(request({authorizationRef: 'unapproved-reference'}), /approved BRA\/TGO scope/);
  await assert.rejects(request({slot: 'review'}), /approved BRA\/TGO scope/);
  await assert.rejects(request({operator: 'different-coordinator'}), /exact CODEX_THREAD_ID/);
  await assert.rejects(request({worker: operator}), /exact CODEX_THREAD_ID/);
  await assert.rejects(request({reviewReceipt: undefined}), /Independent review receipt is missing, stale/);
  await assert.rejects(request({reviewReceipt: sealOperatorReceipt({...reviewReceipt, keeperManifestSha256: '0'.repeat(64)})}),
    /did not attest the exact keeper/);
  await assert.rejects(request({expectedHead: '0'.repeat(40)}), /Independent review receipt is missing, stale/);
  assert.equal(registryEntries(manager)[0].head, head);
  const auditDirectory = path.join(manager.report().registry, 'audit');
  fs.mkdirSync(auditDirectory, {mode: 0o700});
  const pendingId = '11111111-1111-4111-8111-111111111111';
  const pendingReceipt = {version: 1, operation: 'operator-release', status: 'pending', id: pendingId,
    scope: 'BRA', authorizationRef: 'team3-bra-tgo-orphaned-slots', operator, reviewer, worker, slot: 'work',
    path: entry.path, branch, head, reviewSha256: reviewReceipt.sha256, keeperManifestSha256: keeperManifest.sha256,
    keepers: [], preservedRef: `refs/worldatlas-local-recovery/${createHash('sha256').update(entry.token).digest('hex')}`,
    startedAt: new Date().toISOString()};
  const pendingFile = path.join(auditDirectory, `${pendingId}.json`);
  fs.writeFileSync(pendingFile, JSON.stringify(pendingReceipt), {mode: 0o600});
  await assert.rejects(request({}), /pending receipt/);
  fs.unlinkSync(pendingFile);
  const malformedFile = path.join(auditDirectory, 'malformed.json');
  fs.writeFileSync(malformedFile, '{}', {mode: 0o600});
  await assert.rejects(request({}), /unrecognized receipt/);
  fs.unlinkSync(malformedFile);
  fs.rmdirSync(auditDirectory);
  fs.writeFileSync(source, 'source changed');
  await assert.rejects(request({}), /Keeper\/restoration file metadata mismatch/);
  fs.writeFileSync(source, bytes, {mode}); fs.chmodSync(source, mode);
  fs.writeFileSync(path.join(entry.path, 'README.md'), 'changed tracked content');
  await assert.rejects(request({}), /Tracked modifications or untracked/);
  fs.writeFileSync(path.join(entry.path, 'README.md'), 'root');
  const dependent = await manager.allocate({worker: 'dependent-slot', slot: 'review', commit: head});
  const registryFile = path.join(manager.report().registry, 'state.json'), originalRegistry = fs.readFileSync(registryFile, 'utf8');
  const registryState = JSON.parse(originalRegistry);
  registryState.entries.find(item => item.worker === dependent.worker).dependencies = [worker];
  fs.writeFileSync(registryFile, JSON.stringify(registryState, null, 2) + '\n');
  await assert.rejects(request({}), /depends on this workspace/);
  fs.writeFileSync(registryFile, originalRegistry);
  manager.release({worker: dependent.worker, slot: 'review', token: dependent.token});
  readers = ['999'];
  await assert.rejects(request({}), /active readers/);
  readers = [];
  fs.writeFileSync(keeperPath, 'changed backup');
  await assert.rejects(request({}), /Keeper\/restoration/);
  assert.equal(fs.readFileSync(source, 'utf8'), 'unique evidence\n');
  assert.equal(registryEntries(manager)[0].head, head);
});

test('operator-release CLI releases the exact authorized slot and prints no capability', async t => {
  const {repo, manager, head, temporary} = fixture(t);
  const worker = 'brazil-cli-orphan', operator = 'team-three-coordinator', reviewer = 'team-three-reviewer';
  const branch = 'engineering/brazil-cli-orphan';
  const entry = await manager.allocate({worker, branch});
  let reviewReceipt = sealOperatorReceipt({result: 'PASS', worker: reviewer, scope: 'BRA', worker_id: worker,
    slot: 'work', path: entry.path, branch, head});
  const keeperManifest = sealOperatorReceipt({result: 'PASS', scope: 'BRA', worker_id: worker,
    slot: 'work', path: entry.path, branch, head, files: []});
  reviewReceipt = sealOperatorReceipt({...reviewReceipt, authorizationRef: 'team3-bra-tgo-orphaned-slots', keeperManifestSha256: keeperManifest.sha256});
  const reviewFile = path.join(temporary, 'review.json'), keeperFile = path.join(temporary, 'keeper.json');
  fs.writeFileSync(reviewFile, JSON.stringify(reviewReceipt));
  fs.writeFileSync(keeperFile, JSON.stringify(keeperManifest));
  const helper = cliHelper(repo, path.join(repo, '.git', 'operator-helper'));
  const oldIdentity = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = operator;
  t.after(() => oldIdentity === undefined ? delete process.env.CODEX_THREAD_ID : process.env.CODEX_THREAD_ID = oldIdentity);
  const run = spawnSync(process.execPath, [helper, 'operator-release', '--repo', repo, '--operator', operator,
    '--scope', 'BRA', '--authorization-ref', 'team3-bra-tgo-orphaned-slots', '--worker', worker, '--slot', 'work',
    '--expected-path', entry.path, '--expected-branch', branch, '--expected-head', head,
    '--review-receipt', reviewFile, '--keeper-manifest', keeperFile], {cwd: repo, encoding: 'utf8'});
  assert.equal(run.status, 0, run.stderr);
  assert.doesNotMatch(run.stdout, /"token"\s*:/);
  assert.ok(!run.stdout.includes(entry.token));
  const result = JSON.parse(run.stdout);
  assert.equal(result.released, true);
  assert.equal(fs.existsSync(entry.path), false);
  const audit = JSON.parse(fs.readFileSync(result.auditReceipt, 'utf8'));
  assert.equal(audit.status, 'released');
  assert.equal(audit.worker, worker);
  assert.ok(!JSON.stringify(audit).includes(entry.token));
});

test('operator release restores keeper-backed source files when ordinary Git removal refuses', async t => {
  const {repo, manager, head, temporary, git} = fixture(t, {inspectReaders: () => []});
  const worker = 'togo-preserved-orphan', operator = 'team-three-coordinator', reviewer = 'team-three-reviewer';
  const branch = 'engineering/togo-preserved-orphan';
  const entry = await manager.allocate({worker, branch});
  const source = path.join(entry.path, '.scratch/unique.txt'), bytes = Buffer.from('preserve after refusal\n'), mode = 0o600;
  fs.mkdirSync(path.dirname(source), {recursive: true}); fs.writeFileSync(source, bytes, {mode});
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const keeperPath = path.join(temporary, 'keeper-refusal', 'unique.txt');
  const restorationPath = path.join(temporary, 'restored-refusal', 'unique.txt');
  fs.mkdirSync(path.dirname(keeperPath), {recursive: true}); fs.mkdirSync(path.dirname(restorationPath), {recursive: true});
  fs.writeFileSync(keeperPath, bytes, {mode}); fs.writeFileSync(restorationPath, bytes, {mode});
  let reviewReceipt = sealOperatorReceipt({result: 'PASS', worker: reviewer, scope: 'TGO', worker_id: worker,
    slot: 'work', path: entry.path, branch, head});
  const keeperManifest = sealOperatorReceipt({result: 'PASS', scope: 'TGO', worker_id: worker,
    slot: 'work', path: entry.path, branch, head,
    files: [{path: '.scratch/unique.txt', keeperPath, restorationPath, bytes: bytes.length, mode, sha256}]});
  reviewReceipt = sealOperatorReceipt({...reviewReceipt, authorizationRef: 'team3-bra-tgo-orphaned-slots', keeperManifestSha256: keeperManifest.sha256});
  const oldIdentity = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = operator;
  t.after(() => oldIdentity === undefined ? delete process.env.CODEX_THREAD_ID : process.env.CODEX_THREAD_ID = oldIdentity);
  const execute = childProcess.execFileSync;
  t.mock.method(childProcess, 'execFileSync', (command, args, ...options) => {
    if (command === 'git' && args[args.indexOf('worktree') + 1] === 'remove') {
      throw new Error('injected ordinary worktree removal refusal');
    }
    return execute(command, args, ...options);
  });
  syncBuiltinESMExports();
  t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports(); });
  await assert.rejects(() => manager.operatorRelease({operator, scope: 'TGO', authorizationRef: 'team3-bra-tgo-orphaned-slots',
    worker, slot: 'work', expectedPath: entry.path, expectedBranch: branch, expectedHead: head,
    reviewReceipt, keeperManifest}), /injected ordinary worktree removal refusal/);
  assert.equal(fs.readFileSync(source, 'utf8'), 'preserve after refusal\n');
  assert.equal(fs.statSync(source).mode & 0o777, mode);
  assert.equal(registryEntries(manager)[0].path, entry.path);
  assert.equal(git('rev-parse', `refs/worldatlas-local-recovery/${createHash('sha256').update(entry.token).digest('hex')}`).trim(), head);
  const receipts = fs.readdirSync(path.join(manager.report().registry, 'audit'));
  assert.equal(receipts.length, 1);
  const audit = JSON.parse(fs.readFileSync(path.join(manager.report().registry, 'audit', receipts[0]), 'utf8'));
  assert.equal(audit.status, 'failed');
  assert.ok(audit.preservedRef);
  assert.ok(!JSON.stringify(audit).includes(entry.token));
});

test('interrupted private-token recovery resumes only its bound pending replacement', async t => {
  const {manager, head} = fixture(t);
  const worker = 'recovery-interruption';
  const branch = 'engineering/recovery-interruption';
  const entry = await manager.allocate({worker, branch});
  const oldToken = entry.token;
  const oldIdentity = process.env.CODEX_THREAD_ID;
  process.env.CODEX_THREAD_ID = worker;
  t.after(() => oldIdentity === undefined ? delete process.env.CODEX_THREAD_ID : process.env.CODEX_THREAD_ID = oldIdentity);
  const recovery = {worker, slot: 'work', expectedPath: entry.path, expectedBranch: branch, expectedHead: head};
  const stateFile = path.join(manager.report().registry, 'state.json');
  const originalRename = fs.renameSync;
  t.mock.method(fs, 'renameSync', (source, target) => {
    if (target === stateFile) throw Object.assign(new Error('injected registry persistence failure'), {code: 'EIO'});
    return originalRename(source, target);
  });
  assert.throws(() => manager.recoverLostCapability(recovery), {code: 'EIO'});
  assert.equal(registryEntries(manager)[0].token, oldToken);
  const capabilityFile = path.join(manager.report().registry, 'capabilities', `${createHash('sha256').update(worker).digest('hex')}-work.json`);
  const pending = JSON.parse(fs.readFileSync(capabilityFile, 'utf8'));
  assert.notEqual(pending.token, oldToken);
  assert.equal(pending.observed_head, head);
  assert.equal(fs.readdirSync(manager.report().registry).some(name => name.endsWith('.tmp')), false);
  t.mock.restoreAll();

  const result = manager.recoverLostCapability(recovery);
  assert.equal(result.capabilityFile, capabilityFile);
  assert.equal(registryEntries(manager)[0].token, pending.token);
  assert.throws(() => manager.release({worker, token: oldToken}), /ownership/);
});

test('workspace CLI recovery and token-file release never print the capability', async t => {
  const {repo, manager, head} = fixture(t);
  const worker = 'recovery-cli-owner';
  const branch = 'engineering/recovery-cli-owner';
  const entry = await manager.allocate({worker, branch});
  const helper = cliHelper(repo, path.join(repo, 'scripts'));
  const args = ['recover-lost-capability', '--repo', repo, '--worker', worker, '--slot', 'work',
    '--expected-path', entry.path, '--expected-branch', branch, '--expected-head', head];
  const denied = spawnSync(process.execPath, [helper, ...args], {cwd: repo, encoding: 'utf8',
    env: {...process.env, CODEX_THREAD_ID: 'other-worker'}});
  assert.notEqual(denied.status, 0);
  assert.equal(denied.stdout, '');
  assert.match(denied.stderr, /exact CODEX_THREAD_ID/);
  assert.equal(registryEntries(manager)[0].token, entry.token);

  const accepted = spawnSync(process.execPath, [helper, ...args], {cwd: repo, encoding: 'utf8',
    env: {...process.env, CODEX_THREAD_ID: worker}});
  assert.equal(accepted.status, 0, accepted.stderr);
  const recovered = JSON.parse(accepted.stdout);
  assert.equal(recovered.recovered, true);
  assert.equal(Object.hasOwn(recovered, 'token'), false);
  assert.ok(recovered.capabilityFile, 'safe capability-file locator remains available for guarded release');
  const newToken = registryEntries(manager)[0].token;
  assert.notEqual(newToken, entry.token);
  assert.ok(!accepted.stdout.includes(newToken));
  assert.doesNotMatch(accepted.stdout, /\"token\"\s*:/);
  const release = spawnSync(process.execPath, [helper, 'release', '--repo', repo, '--worker', worker,
    '--slot', 'work', '--capability-file', recovered.capabilityFile], {cwd: repo, encoding: 'utf8'});
  assert.equal(release.status, 0, release.stderr);
  assert.equal(JSON.parse(release.stdout).capability_file_removed, true);
  assert.ok(!release.stdout.includes(newToken));
  assert.deepEqual(registryEntries(manager), []);
});

test('invalid scopes and identities are rejected', async t => {
  const {manager} = fixture(t);
  for (const include of ['data/../outside', '/tmp', 'data/*', 'data//two', 'data']) {
    await assert.rejects(() => manager.allocate({worker: 'one', branch: 'engineering/scoped', include: [include]}), /literal/);
  }
  await assert.rejects(() => manager.allocate({worker: '../other', branch: 'engineering/a'}), /worker/);
  await assert.rejects(() => manager.allocate({worker: 'one', slot: 'extra', branch: 'engineering/a'}), /worker/);
  await assert.rejects(() => manager.allocate({worker: 'one', branch: 'main'}), /fresh branch/);
  await assert.rejects(() => manager.allocate({worker: 'one', slot: 'review', commit: 'main'}), /exact detached/);
});

test('an existing branch fails before fetching or reserving and preserves its history', async t => {
  const {manager, git, head, repo} = fixture(t);
  git('branch', 'engineering/already-exists');
  git('remote', 'set-url', 'origin', path.join(repo, 'unavailable'));
  await assert.rejects(() => manager.allocate({worker: 'one', branch: 'engineering/already-exists'}), /already exists/);
  assert.equal(git('rev-parse', 'engineering/already-exists').trim(), head);
  assert.deepEqual(registryEntries(manager), []);
  assert.ok(!fs.existsSync(manager.report().registry));
  git('remote', 'set-url', 'origin', repo);
  const entry = await manager.allocate({worker: 'one', branch: 'engineering/new'});
  manager.release({worker: 'one', token: entry.token});
});

test('author refresh does not acquire new excluded blobs in a conventional clone', async t => {
  const source = fixture(t);
  source.git('config', 'uploadpack.allowFilter', 'true');
  const repo = path.join(source.temporary, 'conventional');
  execFileSync('git', ['clone', '--no-checkout', pathToFileURL(source.repo).href, repo], {stdio: 'pipe'});
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], {
    encoding: 'utf8', stdio: 'pipe', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
  });
  assert.equal(spawnSync('git', ['-C', repo, 'config', '--get', 'remote.origin.promisor']).status, 1);
  const name = 'data/other/new-archive.bin';
  fs.writeFileSync(path.join(source.repo, name), Buffer.alloc(1024 * 1024, 7));
  source.git('add', name); source.git('commit', '-m', 'new unselected archive');
  const head = source.head = source.git('rev-parse', 'HEAD').trim(), oid = source.git('rev-parse', `HEAD:${name}`).trim();
  const manager = workspaceManager(repo, {
    loadTree: async treeOid => {
      const actualTree = source.git('rev-parse', `${source.head}^{tree}`).trim();
      assert.equal(treeOid, actualTree);
      const tree = source.git('ls-tree', '-rlz', source.head).split('\0').filter(Boolean).map(line => {
        const [metadata, file] = line.split('\t'), [mode, type, sha, size] = metadata.trim().split(/\s+/);
        return {path: file, mode, type, sha, size: Number(size)};
      });
      return {sha: treeOid, truncated: false, tree};
    },
    acquisitionExecute: (command, args, options = {}) => execFileSync(command,
      args.map(arg => arg === 'https://github.com/ChengshuLi/WorldAtlas.git' ? pathToFileURL(source.repo).href : arg), options)
  });
  const entry = await manager.allocate({worker: 'conventional', branch: 'engineering/filtered-refresh'});
  assert.equal(entry.head, head);
  assert.equal(git('rev-parse', 'origin/main').trim(), head);
  assert.equal(fs.readFileSync(path.join(entry.path, 'README.md'), 'utf8'), 'root');
  assert.ok(!fs.existsSync(path.join(entry.path, name)));
  // Probe absence without triggering a promisor fetch, including on older Git.
  const available = execFileSync('git', ['-C', repo, '-c', 'core.commitGraph=false', 'rev-list', '--objects',
    '--filter=tree:0', '--missing=print', '--ignore-missing', '--no-walk=unsorted', '--no-object-names', '--stdin'], {
    input: oid + '\n', encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
  });
  assert.equal(available, '', 'main refresh must not acquire the unselected archive');
  manager.release({worker: 'conventional', token: entry.token});

  // A later selected edit is discovered on the freshly fetched head and acquired
  // exactly from its bound source tree before the normal ready checkout.
  fs.writeFileSync(path.join(source.repo, 'README.md'), 'changed selected input');
  source.git('add', 'README.md'); source.git('commit', '-m', 'new required blob');
  const latest = source.head = source.git('rev-parse', 'HEAD').trim();
  const recovered = await manager.allocate({worker: 'conventional', branch: 'engineering/missing-selected'});
  assert.equal(git('rev-parse', 'origin/main').trim(), latest);
  assert.equal(fs.readFileSync(path.join(recovered.path, 'README.md'), 'utf8'), 'changed selected input');
  assert.deepEqual(manager.inspect({commit: latest}).missing, []);
  assert.deepEqual(registryEntries(manager), [recovered]);
  assert.equal(git('rev-parse', 'refs/heads/engineering/missing-selected').trim(), latest);
  manager.release({worker: 'conventional', token: recovered.token});
});

test('author allocation pins fetched origin/main even without a configured fetch refspec', async t => {
  const source = fixture(t);
  const remote = path.join(source.temporary, 'remote.git');
  const repo = path.join(source.temporary, 'client');
  execFileSync('git', ['clone', '--bare', source.repo, remote], {stdio: 'pipe'});
  execFileSync('git', ['clone', '--no-checkout', remote, repo], {stdio: 'pipe'});
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], {encoding: 'utf8', stdio: 'pipe'}).trim();
  const oldMain = git('rev-parse', 'refs/remotes/origin/main');

  fs.writeFileSync(path.join(source.repo, 'README.md'), 'fresh remote main');
  source.git('add', 'README.md'); source.git('commit', '-m', 'advance remote main');
  const latestMain = source.git('rev-parse', 'HEAD').trim();
  source.git('push', remote, 'main');
  git('update-ref', 'refs/remotes/origin/main', oldMain);
  git('config', '--unset-all', 'remote.origin.fetch');
  assert.equal(git('rev-parse', 'main'), oldMain, 'the local branch remains stale');
  assert.equal(git('rev-parse', 'refs/remotes/origin/main'), oldMain, 'the tracking ref begins stale');

  const manager = workspaceManager(repo);
  const entry = await manager.allocate({worker: 'no-fetch-refspec', branch: 'engineering/fresh-main'});
  assert.equal(entry.head, latestMain);
  assert.equal(git('rev-parse', 'refs/remotes/origin/main'), latestMain);
  assert.equal(git('rev-parse', 'main'), oldMain, 'allocation does not advance the caller worktree branch');
  assert.equal(fs.readFileSync(path.join(entry.path, 'README.md'), 'utf8'), 'fresh remote main');
  manager.release({worker: 'no-fetch-refspec', token: entry.token});
});

test('author startup guidance is bound to freshly fetched main and never reads a dirty primary file', async t => {
  const source = fixture(t);
  source.git('config', 'uploadpack.allowFilter', 'true');
  const remote = path.join(source.temporary, 'remote.git');
  const repo = path.join(source.temporary, 'client');
  execFileSync('git', ['clone', '--bare', source.repo, remote], {stdio: 'pipe'});
  execFileSync('git', ['clone', '--no-checkout', remote, repo], {stdio: 'pipe'});
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], {encoding: 'utf8', stdio: 'pipe', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}}).trim();
  const staleMain = git('rev-parse', 'main');
  const staleTracking = git('rev-parse', 'refs/remotes/origin/main');
  const updated = '# Fresh accepted startup instructions\n- [DEVELOPMENT](docs/DEVELOPMENT.md): exact current guide\n';
  fs.writeFileSync(path.join(source.repo, 'AGENTS.md'), updated);
  source.git('add', 'AGENTS.md'); source.git('commit', '-m', 'advance startup guidance');
  const latestMain = source.git('rev-parse', 'HEAD').trim();
  source.git('push', remote, 'main');
  const dirtyPrimary = '# Uncommitted primary contents; never show this as accepted guidance\n';
  fs.writeFileSync(path.join(repo, 'AGENTS.md'), dirtyPrimary);
  const beforeStatus = git('status', '--porcelain');
  assert.equal(git('rev-parse', 'main'), staleMain);
  assert.equal(git('rev-parse', 'refs/remotes/origin/main'), staleTracking);

  let guidance;
  const manager = workspaceManager(repo, {onStartupGuidance: value => { guidance = value; }});
  const entry = await manager.allocate({worker: 'fresh-guidance', branch: 'engineering/fresh-guidance'});
  assert.equal(entry.head, latestMain);
  assert.equal(git('rev-parse', 'main'), staleMain, 'allocation must not move the caller primary branch');
  assert.equal(git('rev-parse', 'refs/remotes/origin/main'), latestMain);
  assert.deepEqual(git('status', '--porcelain'), beforeStatus, 'the dirty primary checkout remains unchanged');
  assert.equal(fs.readFileSync(path.join(repo, 'AGENTS.md'), 'utf8'), dirtyPrimary);
  assert.equal(fs.readFileSync(path.join(entry.path, 'AGENTS.md'), 'utf8'), updated);
  assert.equal(guidance.commit, latestMain);
  assert.equal(guidance.path, 'AGENTS.md');
  assert.equal(guidance.gitBlobOid, git('rev-parse', `${latestMain}:AGENTS.md`));
  assert.equal(guidance.sha256, createHash('sha256').update(updated).digest('hex'));
  assert.equal(guidance.text, updated);
  assert.deepEqual(guidance.guides, ['docs/DEVELOPMENT.md']);
  manager.release({worker: 'fresh-guidance', token: entry.token});
});

test('allocation refreshes shared fetch metadata without changing linked-worktree state', async t => {
  const source = fixture(t);
  source.git('config', 'uploadpack.allowFilter', 'true');
  const remote = path.join(source.temporary, 'remote.git');
  const repo = path.join(source.temporary, 'client');
  execFileSync('git', ['clone', '--bare', source.repo, remote], {stdio: 'pipe'});
  execFileSync('git', ['clone', '--no-checkout', remote, repo], {stdio: 'pipe'});
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], {encoding: 'utf8', stdio: 'pipe'}).trim();
  const linked = path.join(source.temporary, 'linked');
  git('worktree', 'add', '-b', 'primary/linked', linked);
  const linkedGit = (...args) => execFileSync('git', ['-C', linked, ...args], {encoding: 'utf8', stdio: 'pipe'}).trim();
  const localFetchHead = linkedGit('rev-parse', '--git-path', 'FETCH_HEAD');
  const localIndex = linkedGit('rev-parse', '--git-path', 'index');
  fs.writeFileSync(localFetchHead, 'primary checkout sentinel\n');
  fs.writeFileSync(path.join(linked, 'README.md'), 'staged and unstaged primary bytes');
  linkedGit('add', 'README.md');
  fs.writeFileSync(path.join(linked, 'README.md'), 'staged and unstaged primary bytes plus unstaged edit');
  const beforeHead = linkedGit('rev-parse', 'HEAD');
  const beforeBranch = linkedGit('symbolic-ref', 'HEAD');
  const beforeIndex = fs.readFileSync(localIndex);
  const beforeStatus = linkedGit('status', '--porcelain=v2');
  const beforeFetchHead = fs.readFileSync(localFetchHead);

  fs.writeFileSync(path.join(source.repo, 'AGENTS.md'), '# Linked checkout refresh\n');
  source.git('add', 'AGENTS.md'); source.git('commit', '-m', 'advance linked checkout main');
  const latest = source.git('rev-parse', 'HEAD').trim();
  source.git('push', remote, 'main');

  const common = git('rev-parse', '--path-format=absolute', '--git-common-dir');
  const commonFetchHead = path.join(common, 'FETCH_HEAD');
  const manager = workspaceManager(linked);
  const entry = await manager.allocate({worker: 'linked-refresh', branch: 'engineering/linked-refresh'});
  assert.equal(entry.head, latest);
  assert.equal(execFileSync('git', ['--git-dir', common, 'rev-parse', '--verify', 'FETCH_HEAD^{commit}'], {encoding: 'utf8'}).trim(), latest);
  assert.equal(linkedGit('rev-parse', 'HEAD'), beforeHead);
  assert.equal(linkedGit('symbolic-ref', 'HEAD'), beforeBranch);
  assert.deepEqual(fs.readFileSync(localIndex), beforeIndex);
  assert.equal(linkedGit('status', '--porcelain=v2'), beforeStatus);
  assert.deepEqual(fs.readFileSync(localFetchHead), beforeFetchHead);
  assert.ok(fs.existsSync(commonFetchHead), 'the shared Git directory carries the allocator fetch result');
  assert.equal(fs.readFileSync(path.join(linked, 'README.md'), 'utf8'), 'staged and unstaged primary bytes plus unstaged edit');
  manager.release({worker: 'linked-refresh', token: entry.token});
});

test('CLI keeps stdout as one allocation JSON object and presents exact pinned AGENTS on stderr', async t => {
  const {repo, git, manager} = fixture(t);
  const helper = cliHelper(repo);
  const result = spawnSync(process.execPath, [helper, 'allocate', '--repo', repo, '--worker', 'cli-guidance',
    '--branch', 'engineering/cli-guidance'], {
    cwd: repo, encoding: 'utf8', env: {...process.env, CODEX_THREAD_ID: 'cli-guidance'}
  });
  assert.equal(result.status, 0, result.stderr);
  const entry = JSON.parse(result.stdout);
  assert.equal(Object.keys(entry).sort().join(','), 'branch,capabilityFile,createdAt,head,include,path,profile,reservation,slot,status,worker');
  assert.doesNotMatch(result.stdout, /\"token\"\s*:/);
  const agents = git('show', `${entry.head}:AGENTS.md`);
  assert.match(result.stderr, new RegExp(`Verified current-main startup instructions \\(${entry.head}\\)`));
  assert.match(result.stderr, /AGENTS\.md Git blob [a-f0-9]{40}; SHA-256 [a-f0-9]{64}/);
  assert.match(result.stderr, /Domain guides: docs\/DEVELOPMENT\.md/);
  assert.ok(result.stderr.includes(agents), 'stderr presents the exact immutable instruction body');
  assert.doesNotMatch(result.stdout, /Verified current-main startup instructions/);
  manager.release({worker: entry.worker, capabilityFile: entry.capabilityFile});
});

test('actual scripts-directory CLI reads root AGENTS from freshly fetched main and validates its exact blob', async t => {
  const source = fixture(t);
  source.git('config', 'uploadpack.allowFilter', 'true');
  const remote = path.join(source.temporary, 'remote.git');
  const repo = path.join(source.temporary, 'client');
  execFileSync('git', ['clone', '--bare', source.repo, remote], {stdio: 'pipe'});
  execFileSync('git', ['clone', '--no-checkout', remote, repo], {stdio: 'pipe'});
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], {
    encoding: 'utf8', stdio: 'pipe', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
  }).trim();
  const staleMain = git('rev-parse', 'main');
  const staleTracking = git('rev-parse', 'refs/remotes/origin/main');
  assert.equal(staleTracking, staleMain);
  const latestAgents = '# Fresh root instructions from fetched main\n- [DEVELOPMENT](docs/DEVELOPMENT.md): verified root guidance\n';
  fs.writeFileSync(path.join(source.repo, 'AGENTS.md'), latestAgents);
  source.git('add', 'AGENTS.md'); source.git('commit', '-m', 'advance root startup guidance');
  const latestMain = source.git('rev-parse', 'HEAD').trim();
  source.git('push', remote, 'main');
  assert.notEqual(latestMain, staleMain);

  const helper = cliHelper(repo, path.join(repo, 'scripts'));
  const result = spawnSync(process.execPath, [helper, 'allocate', '--repo', repo, '--worker', 'scripts-guidance',
    '--branch', 'engineering/scripts-guidance'], {
    cwd: source.temporary, encoding: 'utf8', env: {...process.env, CODEX_THREAD_ID: 'scripts-guidance'}
  });
  assert.equal(result.status, 0, result.stderr);
  const entry = JSON.parse(result.stdout);
  assert.equal(entry.head, latestMain);
  assert.equal(git('rev-parse', 'FETCH_HEAD'), latestMain);
  assert.equal(git('rev-parse', 'refs/remotes/origin/main'), latestMain);
  assert.equal(git('rev-parse', 'main'), staleMain, 'the primary branch remains untouched');
  const agentsBlob = git('rev-parse', `${latestMain}:AGENTS.md`);
  const agentsSha = createHash('sha256').update(latestAgents).digest('hex');
  assert.match(result.stderr, new RegExp(`Verified current-main startup instructions \\(${latestMain}\\)`));
  assert.ok(result.stderr.includes(`AGENTS.md Git blob ${agentsBlob}; SHA-256 ${agentsSha}`));
  assert.ok(result.stderr.includes(latestAgents), 'the CLI presents the exact fetched root instruction bytes');
  assert.equal(fs.readFileSync(path.join(entry.path, 'AGENTS.md'), 'utf8'), latestAgents);

  const manager = workspaceManager(repo);
  manager.release({worker: entry.worker, capabilityFile: entry.capabilityFile});
});

test('missing fetched-main AGENTS fails before reservation, branch or worktree creation', async t => {
  const {git, repo, head} = fixture(t);
  const manager = workspaceManager(repo, {onStartupGuidance: () => {}});
  git('rm', 'AGENTS.md'); git('commit', '-m', 'missing startup instructions');
  const missingMain = git('rev-parse', 'HEAD');
  const beforeWorktrees = git('worktree', 'list', '--porcelain');
  assert.notEqual(missingMain, head);
  await assert.rejects(() => manager.allocate({worker: 'missing-guidance', branch: 'engineering/missing-guidance'}),
    /Verified origin\/main .* has no root AGENTS\.md/);
  assert.equal(git('worktree', 'list', '--porcelain'), beforeWorktrees);
  assert.equal(git('for-each-ref', '--format=%(refname)', 'refs/heads/engineering/missing-guidance'), '');
  assert.deepEqual(registryEntries(manager), []);
  assert.ok(!fs.existsSync(path.join(manager.report().registry, 'state.json')));
});

test('missing fetched-main AGENTS body is acquired with the selected root inventory before guidance read', async t => {
  const {repo, manager, git, run, checkUnfetched, sourceRepo, source: sourceValue} = partialFixture(t, 'AGENTS.md');
  const inspected = await run({}, 'inspect');
  assert.deepEqual(inspected.missing.flatMap(row => row.paths), ['AGENTS.md']);
  const beforeWorktrees = git('worktree', 'list', '--porcelain');
  const entry = await run({slot: 'work', branch: 'engineering/missing-guidance-blob', commit: undefined});
  assert.equal(git('worktree', 'list', '--porcelain').match(/^worktree /gm).length, beforeWorktrees.match(/^worktree /gm).length + 1);
  assert.equal(git('for-each-ref', '--format=%(refname)', 'refs/heads/engineering/missing-guidance-blob').trim(), 'refs/heads/engineering/missing-guidance-blob');
  assert.equal(fs.readFileSync(path.join(entry.path, 'AGENTS.md'), 'utf8'), execFileSync('git', ['-C', sourceRepo, 'show', `${entry.head}:AGENTS.md`], {encoding: 'utf8'}));
  manager.release({worker: 'partial', token: entry.token});
  checkUnfetched(true, true);
});

test('exact detached review allocation keeps its requested commit and does not become a main-based checkout', async t => {
  const {git, repo, head} = fixture(t);
  fs.writeFileSync(path.join(repo, 'AGENTS.md'), '# Dirty primary only\n');
  const status = git('status', '--porcelain');
  git('remote', 'set-url', 'origin', path.join(repo, 'unavailable-origin'));
  let guidance;
  const manager = workspaceManager(repo, {onStartupGuidance: value => { guidance = value; }});
  const review = await manager.allocate({worker: 'pinned-review', slot: 'review', commit: head});
  assert.equal(review.head, head);
  assert.equal(fs.readFileSync(path.join(review.path, 'AGENTS.md'), 'utf8'), '# Fixture startup instructions\n- [DEVELOPMENT](docs/DEVELOPMENT.md): fixture guide\n');
  assert.equal(guidance, undefined, 'exact review allocation does not fetch or substitute current-main guidance');
  assert.equal(git('status', '--porcelain'), status);
  manager.release({worker: 'pinned-review', slot: 'review', token: review.token});
});

test('failed fetch never acquires a registry lock and keeps other workers intact', async t => {
  const {repo, head} = fixture(t);
  let guidance;
  const manager = workspaceManager(repo, {onStartupGuidance: value => { guidance = value; }});
  const existing = await manager.allocate({worker: 'existing', slot: 'review', commit: head});
  const {registry} = manager.report(), before = fs.readFileSync(path.join(registry, 'state.json'));
  const execute = childProcess.execFileSync;
  t.mock.method(childProcess, 'execFileSync', (command, args, ...options) => {
    if (command === 'git' && args.slice(2).join(' ') === 'fetch --no-tags --no-recurse-submodules --no-auto-maintenance --filter=blob:none origin +refs/heads/main:refs/remotes/origin/main') {
      assert.ok(!fs.existsSync(path.join(registry, 'lock')));
      throw Error('interrupted fetch');
    }
    return execute(command, args, ...options);
  });
  syncBuiltinESMExports();
  t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports(); });
  await assert.rejects(() => manager.allocate({worker: 'one', branch: 'engineering/fetch-failure'}), /interrupted fetch/);
  assert.equal(guidance, undefined, 'failed fetch must not present stale or unverified instructions');
  assert.ok(fs.readFileSync(path.join(registry, 'state.json')).equals(before));
  assert.deepEqual(registryEntries(manager), [existing]);
  assert.ok(!fs.existsSync(path.join(registry, 'lock')));
});

test('hard process interruption during fetch leaves no allocator lock or reservation', async t => {
  const {manager, repo, git, head} = fixture(t);
  const moduleURL = new URL('../scripts/local-workspace.mjs', import.meta.url).href;
  const code = `import fs from 'node:fs';import cp from 'node:child_process';import {syncBuiltinESMExports} from 'node:module';
    import {workspaceManager} from ${JSON.stringify(moduleURL)};
    const execute=cp.execFileSync;
    cp.execFileSync=(command,args,...options)=>{
      if(command==='git'&&args.slice(2).join(' ')==='fetch --no-tags --no-recurse-submodules --no-auto-maintenance --filter=blob:none origin +refs/heads/main:refs/remotes/origin/main'){
        fs.writeFileSync(${JSON.stringify(path.join(repo, 'fetch-started'))},'started');process.kill(process.pid,'SIGTERM');
      }
      return execute(command,args,...options);
    };syncBuiltinESMExports();workspaceManager(${JSON.stringify(repo)}).allocate({worker:'interrupted',branch:'engineering/interrupted-fetch'});`;
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', code]);
  assert.equal(result.signal, 'SIGTERM');
  assert.equal(fs.readFileSync(path.join(repo, 'fetch-started'), 'utf8'), 'started');
  assert.ok(!fs.existsSync(manager.report().registry));
  assert.deepEqual(registryEntries(manager), []);
  assert.equal(git('rev-parse', 'HEAD').trim(), head);
});

test('allocation freezes its fetched head before taking the registry lock', async t => {
  const {manager, git, head, repo} = fixture(t);
  fs.writeFileSync(path.join(repo, 'README.md'), 'later main');
  git('add', '.'); git('commit', '-m', 'later main');
  const later = git('rev-parse', 'HEAD').trim();
  git('reset', '--hard', head);
  const {registry} = manager.report(), mkdir = fs.mkdirSync;
  let moved = false;
  t.mock.method(fs, 'mkdirSync', (directory, ...options) => {
    if (directory === path.join(registry, 'lock')) {
      git('update-ref', 'refs/remotes/origin/main', later);
      moved = true;
    }
    return mkdir(directory, ...options);
  });
  const entry = await manager.allocate({worker: 'one', branch: 'engineering/pinned'});
  assert.ok(moved);
  assert.equal(entry.head, head);
  assert.equal(git('rev-parse', 'origin/main').trim(), later);
  assert.equal(fs.readFileSync(path.join(entry.path, 'README.md'), 'utf8'), 'root');
  manager.release({worker: 'one', token: entry.token});
});

for (const scenario of ['before-add', 'created-branch', 'branch-race', 'partial-checkout', 'git-entry-only', 'unknown-inventory', 'dangling-path']) {
  test(`failed initial allocation recovers only proven absent checkout: ${scenario}`, async t => {
    const {manager, head, git} = fixture(t);
    const existing = await manager.allocate({worker: 'existing', slot: 'review', commit: head});
    const {registry} = manager.report(), stateFile = path.join(registry, 'state.json');
    const execute = childProcess.execFileSync;
    let destination, failed = false;
    t.mock.method(childProcess, 'execFileSync', (command, args, ...options) => {
      if (command === 'git' && args[2] === 'worktree' && args[3] === 'add') {
        destination = args.at(-2); failed = true;
        assert.ok(fs.existsSync(path.join(registry, 'lock')));
        if (scenario === 'created-branch' || scenario === 'branch-race') git('branch', 'engineering/failure');
        if (scenario === 'branch-race') return execute(command, args, ...options);
        if (scenario === 'partial-checkout' || scenario === 'git-entry-only') {
          execute(command, args, ...options);
          if (scenario === 'git-entry-only') fs.rmSync(destination, {recursive: true});
        }
        if (scenario === 'dangling-path') fs.symlinkSync(destination + '-absent', destination);
        throw Error('initial add failed');
      }
      if (failed && scenario === 'unknown-inventory' && args.slice(2).join(' ') === 'worktree list --porcelain -z') throw Error('inventory unreadable');
      return execute(command, args, ...options);
    });
    syncBuiltinESMExports();
    t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports(); });
    await assert.rejects(() => manager.allocate({worker: 'one', branch: 'engineering/failure'}));
    const entries = JSON.parse(fs.readFileSync(stateFile)).entries;
    assert.deepEqual(entries[0], existing);
    assert.equal(fs.readFileSync(path.join(existing.path, 'README.md'), 'utf8'), 'root');
    assert.ok(!fs.existsSync(path.join(registry, 'lock')));
    const absent = ['before-add', 'created-branch', 'branch-race'].includes(scenario);
    assert.equal(entries.length, absent ? 1 : 2);
    if (!absent) {
      assert.equal(entries[1].status, 'preparing');
      assert.equal(entries[1].path, destination);
      assert.throws(() => manager.release({worker: 'one', token: entries[1].token}), /inspection/);
    }
    if (scenario === 'created-branch' || scenario === 'branch-race') assert.equal(git('rev-parse', 'engineering/failure').trim(), head);
    t.mock.restoreAll(); syncBuiltinESMExports();
    if (absent) {
      const retry = await manager.allocate({worker: 'one', branch: 'engineering/retry'});
      assert.equal(retry.head, head);
      manager.release({worker: 'one', token: retry.token});
    }
  });
}

test('a registered checkout under a newline-containing parent prevents reservation rollback', async t => {
  const fixtureState = fixture(t), parent = path.join(fixtureState.temporary, 'line\nbreak"\\tab\t');
  fs.mkdirSync(parent);
  const repo = path.join(parent, 'repo'); fs.renameSync(fixtureState.repo, repo);
  const manager = workspaceManager(repo), execute = childProcess.execFileSync;
  let destination;
  t.mock.method(childProcess, 'execFileSync', (command, args, ...options) => {
    const result = execute(command, args, ...options);
    if (command === 'git' && args[2] === 'worktree' && args[3] === 'add') {
      destination = args.at(-2);
      fs.rmSync(destination, {recursive: true});
      throw Error('initial add interrupted after Git registration');
    }
    return result;
  });
  syncBuiltinESMExports();
  t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports(); });
  await assert.rejects(() => manager.allocate({worker: 'one', slot: 'review', commit: fixtureState.head}), /interrupted/);
  const inventory = execFileSync('git', ['-C', repo, 'worktree', 'list', '--porcelain', '-z'], {encoding: 'utf8'});
  assert.ok(inventory.includes('worktree ' + destination + '\0'));
  assert.ok(!fs.existsSync(destination));
  const entries = JSON.parse(fs.readFileSync(path.join(repo, '.git/worldatlas-local-workspaces/state.json'))).entries;
  assert.equal(entries.length, 1);assert.equal(entries[0].path, destination);assert.equal(entries[0].status, 'preparing');
  assert.throws(() => manager.release({worker: 'one', slot: 'review', token: entries[0].token}), /inspection/);
});

for (const malformed of ['unterminated', 'empty', 'duplicate-path-field']) {
  test(`uncertain worktree inventory preserves the failed reservation: ${malformed}`, async t => {
    const {manager, head, repo} = fixture(t), execute = childProcess.execFileSync;
    t.mock.method(childProcess, 'execFileSync', (command, args, ...options) => {
      if (command === 'git' && args[2] === 'worktree' && args[3] === 'add') throw Error('initial add failed');
      if (command === 'git' && args.slice(2).join(' ') === 'worktree list --porcelain -z') {
        if (malformed === 'empty') return '';
        return 'worktree ' + repo + (malformed === 'unterminated' ? '\0HEAD ' + head : '\0worktree /unknown\0\0');
      }
      return execute(command, args, ...options);
    });
    syncBuiltinESMExports();
    t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports(); });
    await assert.rejects(() => manager.allocate({worker: 'one', slot: 'review', commit: head}), /operator inspection/);
    const entries = JSON.parse(fs.readFileSync(path.join(repo, '.git/worldatlas-local-workspaces/state.json'))).entries;
    assert.equal(entries.length, 1);assert.equal(entries[0].status, 'preparing');
  });
}

test('symlink root cannot redirect allocation or release outside the managed directory', async t => {
  const {manager, temporary} = fixture(t);
  const {root} = manager.report();
  fs.mkdirSync(path.dirname(root), {recursive: true});
  const outside = path.join(temporary, 'outside'); fs.mkdirSync(outside);
  fs.symlinkSync(outside, root);
  await assert.rejects(() => manager.allocate({worker: 'one', branch: 'engineering/escape'}), /Symlink/);
  assert.deepEqual(fs.readdirSync(outside), []);
});

test('two simultaneous allocation processes cannot acquire the same worker slot', async t => {
  const {repo, manager} = fixture(t);
  const moduleURL = new URL('../scripts/local-workspace.mjs', import.meta.url).href;
  const run = branch => new Promise(resolve => {
    const source = `import {workspaceManager} from ${JSON.stringify(moduleURL)};
      try {await workspaceManager(${JSON.stringify(repo)}).allocate({worker:'parallel',branch:${JSON.stringify(branch)}});}
      catch(error){process.exitCode=1;}`;
    const child = spawn(process.execPath, ['--input-type=module', '-e', source], {stdio: 'ignore'});
    child.on('exit', code => resolve(code));
    child.on('error', () => resolve(1));
  });
  const exits = await Promise.all([run('engineering/parallel-one'), run('engineering/parallel-two')]);
  assert.deepEqual(exits.sort(), [0, 1]);
  assert.equal(registryEntries(manager).length, 1);
  assert.equal(registryEntries(manager)[0].status, 'ready');
});

test('assume-unchanged cannot hide unique tracked bytes from cleanup', async t => {
  const {manager} = fixture(t);
  const entry = await manager.allocate({worker: 'one', branch: 'engineering/hidden-edits'});
  execFileSync('git', ['-C', entry.path, 'update-index', '--assume-unchanged', 'README.md']);
  fs.writeFileSync(path.join(entry.path, 'README.md'), 'unique hidden work');
  assert.equal(execFileSync('git', ['-C', entry.path, 'status', '--porcelain'], {encoding: 'utf8'}), '');
  assert.throws(() => manager.release({worker: 'one', token: entry.token}), /trust flags/);
  assert.equal(fs.readFileSync(path.join(entry.path, 'README.md'), 'utf8'), 'unique hidden work');
});

// Actual local blobless clone: commit/tree objects arrive via Git's promisor
// protocol; selected fixture blobs are seeded locally without warming exclusions.
function partialFixture(t, missing, {packSource = false, configureSource, treeFault, fetchFault, freeBytes, onFetch} = {}) {
  const source = fixture(t);
  if (configureSource) {
    configureSource(source);
    source.head = source.git('rev-parse', 'HEAD').trim();
  }
  if (packSource) {
    source.git('repack', '-ad');
    assert.match(source.git('count-objects', '-v'), /^count: 0$/m, 'packed source has no loose objects');
  }
  source.git('config', 'uploadpack.allowFilter', 'true');
  source.git('config', 'uploadpack.allowAnySHA1InWant', 'true');
  const repo = path.join(source.temporary, 'partial');
  execFileSync('git', ['clone', '--filter=blob:none', '--no-checkout', pathToFileURL(source.repo).href, repo], {stdio: 'pipe'});
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], {
    encoding: 'utf8', stdio: 'pipe', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
  });
  assert.equal(git('config', '--get', 'remote.origin.promisor').trim(), 'true');
  const absent = (Array.isArray(missing) ? missing : [missing]).map(name => source.git('rev-parse', `HEAD:${name}`).trim());
  for (const line of source.git('ls-tree', '-rz', 'HEAD').split('\0').filter(Boolean)) {
    const oid = line.slice(0, line.indexOf('\t')).split(' ')[2];
    if (absent.includes(oid)) continue;
    // Git may pack source objects during ordinary maintenance. Transfer the
    // exact blob bytes through Git rather than assuming loose-object storage.
    const env = {...process.env, GIT_NO_LAZY_FETCH: '1'};
    const bytes = execFileSync('git', ['-C', source.repo, 'cat-file', 'blob', oid], {env});
    const written = execFileSync('git', ['-C', repo, 'hash-object', '-w', '--stdin'], {
      input: bytes, encoding: 'utf8', env
    }).trim();
    assert.equal(written, oid, 'seeded blob preserves its exact object identity');
  }
  const objectState = () => fs.readdirSync(path.join(repo, '.git/objects'), {recursive: true}).sort();
  const selectedFetches = {count: 0};
  const trace = path.join(source.temporary, 'partial-git-trace.log');
  const checkUnfetched = (allowMainFetch = false, allowSelectedFetch = false, additionalSelected = []) => {
    const expectedAttempts = allowSelectedFetch === true ? 1 : Number(allowSelectedFetch || 0);
    assert.equal(selectedFetches.count, expectedAttempts, 'only the explicitly expected exact-object batch is attempted');
    if (allowMainFetch) {
      assert.equal(git('rev-parse', 'FETCH_HEAD').trim(), source.head, 'work allocation performs one normal current-main refresh');
      assert.equal(git('rev-parse', 'refs/remotes/origin/main').trim(), source.head);
    } else assert.ok(!fs.existsSync(path.join(repo, '.git/FETCH_HEAD')), 'inspect/review acquisition does not update FETCH_HEAD');
    const allowedPaths = new Set(allowSelectedFetch === true ? [...(Array.isArray(missing) ? missing : [missing]).filter(name => name !== 'data/other/large.json'), ...additionalSelected] : []);
    const allowedOids = new Set([...allowedPaths].map(name => source.git('rev-parse', `${source.head}:${name}`).trim()));
    const response = execFileSync('git', ['-C', repo, '-c', 'core.commitGraph=false', 'rev-list', '--objects',
      '--filter=tree:0', '--missing=print', '--ignore-missing', '--no-walk=unsorted', '--no-object-names', '--stdin'], {
      input: absent.join('\n') + '\n', encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
    });
    const returned = response.trim().split('\n').filter(Boolean);
    assert.deepEqual(returned, absent.filter(oid => allowedOids.has(oid)), 'only explicitly selected bodies may become available');
  };
  const treeMetadata = treeOid => {
    const actualTree = source.git('rev-parse', `${source.head}^{tree}`).trim();
    assert.equal(treeOid, actualTree, 'tree metadata request is pinned to the exact source commit tree');
    const selectedPaths = new Set(Array.isArray(missing) ? missing : [missing]);
    const tree = source.git('ls-tree', '-rz', source.head).split('\0').filter(Boolean).map(line => {
      const [metadata, name] = line.split('\t'), [mode, type, sha] = metadata.trim().split(/\s+/);
      return {path: name, mode, type, sha, size: 0};
    });
    const selectedRows = tree.filter(row => selectedPaths.has(row.path));
    if (selectedRows.length) {
      for (const row of selectedRows) {
        assert.equal(row.type, 'blob');
        row.size = Number(execFileSync('git', ['-C', source.repo, 'cat-file', '-s', row.sha], {encoding: 'utf8'}).trim());
      }
    }
    if (treeFault === 'wrong-oid') {
      const selected = tree.find(row => row.path === (Array.isArray(missing) ? missing[0] : missing));
      if (selected) selected.sha = '0'.repeat(40);
    }
    if (treeFault === 'wrong-size') {
      const selected = tree.find(row => row.path === (Array.isArray(missing) ? missing[0] : missing));
      if (selected) selected.size++;
    }
    return {sha: treeOid, truncated: false, tree};
  };
  const acquisitionExecute = (command, args, options = {}) => {
    if (args.includes('--stdin')) { selectedFetches.count++; onFetch?.(); }
    if (fetchFault && args.includes('--stdin')) throw Error(fetchFault);
    const rewritten = args.map(arg => arg === 'https://github.com/ChengshuLi/WorldAtlas.git'
      ? pathToFileURL(source.repo).href : arg);
    return execFileSync(command, rewritten, options);
  };
  const acquisitionOptions = {loadTree: async treeOid => treeMetadata(treeOid), acquisitionExecute};
  const manager = workspaceManager(repo, {...acquisitionOptions, freeBytes});
  fs.writeFileSync(trace, '');
  const run = async (options, action = 'allocate') => {
    const workerId = 'partial';
    return await manager[action]({worker: workerId, slot: 'review', commit: source.head, ...options});
  };
  return {...source, sourceRepo: source.repo, repo, git, trace, run, checkUnfetched, manager, treeMetadata, selectedFetches};
}

test('actual promisor clone allocates selected sparse inputs without sizing or fetching excluded missing blobs', async t => {
  const {run, repo, manager, checkUnfetched} = partialFixture(t, 'data/other/large.json');
  const entry = await run({include: ['data/needed', 'data/one.json']});
  assert.equal(fs.readFileSync(path.join(entry.path, 'data/needed/input.json'), 'utf8'), 'input');
  assert.equal(fs.readFileSync(path.join(entry.path, 'data/one.json'), 'utf8'), 'individual');
  assert.equal(fs.readFileSync(path.join(entry.path, 'scripts/tool.mjs'), 'utf8'), 'tool');
  assert.ok(!fs.existsSync(path.join(entry.path, 'data/other')));
  checkUnfetched();
  manager.release({worker: 'partial', slot: 'review', token: entry.token});
  assert.equal(execFileSync('git', ['-C', repo, 'worktree', 'list', '--porcelain'], {encoding: 'utf8'}).match(/^worktree /gm).length, 1);
});

test('packed-source promisor fixture preserves selected blobs and leaves excluded blobs missing', async t => {
  const {run, manager, checkUnfetched} = partialFixture(t, 'data/other/large.json', {packSource: true});
  const entry = await run({include: ['data/needed', 'data/one.json']});
  assert.equal(fs.readFileSync(path.join(entry.path, 'data/needed/input.json'), 'utf8'), 'input');
  assert.equal(fs.readFileSync(path.join(entry.path, 'data/one.json'), 'utf8'), 'individual');
  assert.ok(!fs.existsSync(path.join(entry.path, 'data/other')));
  checkUnfetched();
  manager.release({worker: 'partial', slot: 'review', token: entry.token});
});

test('actual promisor clone acquires selected root, support and explicit blobs but not excluded bodies', async t => {
  for (const missing of ['README.md', 'scripts/tool.mjs', 'data/one.json']) {
    const {run, repo, manager, git, checkUnfetched} = partialFixture(t, [missing, 'data/other/large.json']);
    const refs = git('show-ref');
    const entry = await run({include: ['data/one.json']});
    assert.equal(fs.readFileSync(path.join(entry.path, missing), 'utf8'),
      missing === 'README.md' ? 'root' : missing === 'scripts/tool.mjs' ? 'tool' : 'individual');
    assert.equal(git('show-ref'), refs);
    const excluded = git('rev-parse', `${entry.head}:data/other/large.json`).trim();
    const response = execFileSync('git', ['-C', repo, '-c', 'core.commitGraph=false', 'rev-list', '--objects',
      '--filter=tree:0', '--missing=print', '--ignore-missing', '--no-walk=unsorted', '--no-object-names', '--stdin'], {
      input: excluded + '\n', encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
    });
    assert.equal(spawnSync('git', ['-C', repo, 'cat-file', '-e', excluded], {env: {...process.env, GIT_NO_LAZY_FETCH: '1'}}).status, 1, 'excluded body remains missing after the exact selected acquisition');
    assert.equal(registryEntries(manager).length, 1);
    manager.release({worker: 'partial', slot: 'review', token: entry.token});
    checkUnfetched(false, true);
  }
});

test('missing automatic engineering code is inventoried and acquired for author allocation without lazy fetch', async t => {
  const name = 'coordination/engineering/shared/nested/helper.mjs';
  const {run, manager, git, checkUnfetched} = partialFixture(t, [name, 'data/other/large.json'], {configureSource: ({repo, git}) => {
    fs.mkdirSync(path.dirname(path.join(repo, name)), {recursive: true});
    fs.writeFileSync(path.join(repo, name), 'export const required = true;');
    git('add', name); git('commit', '-m', 'missing shared code');
  }});
  const inventory = await run({}, 'inspect');
  assert.equal(inventory.selectedBytes, null);
  assert.deepEqual(inventory.missing.flatMap(row => row.paths), [name]);
  const entry = await run({slot: 'work', commit: undefined, branch: 'engineering/missing-code'});
  assert.equal(fs.readFileSync(path.join(entry.path, name), 'utf8'), 'export const required = true;');
  manager.release({worker: 'partial', token: entry.token});
  checkUnfetched(true, true);
});

test('author allocation refreshes main and recovers missing selected code before ready checkout', async t => {
  const {run, manager, git, checkUnfetched} = partialFixture(t, 'scripts/tool.mjs');
  const entry = await run({slot: 'work', commit: undefined, branch: 'engineering/missing-selected'});
  assert.equal(fs.readFileSync(path.join(entry.path, 'scripts/tool.mjs'), 'utf8'), 'tool');
  assert.equal(entry.status, 'ready');
  manager.release({worker: 'partial', token: entry.token});
  checkUnfetched(true, true);
});

test('full profile acquires all selected promisor blobs but leaves a successful ready checkout', async t => {
  const {repo, run, manager, git, checkUnfetched} = partialFixture(t, 'data/other/large.json');
  const entry = await run({profile: 'full'});
  assert.equal(fs.readFileSync(path.join(entry.path, 'data/other/large.json'), 'utf8'), 'unrelated');
  assert.deepEqual(manager.inspect({commit: entry.head, profile: 'full'}).missing, []);
  assert.equal(entry.status, 'ready');
  manager.release({worker: 'partial', slot: 'review', token: entry.token});
  assert.equal(spawnSync('git', ['-C', repo, 'cat-file', '-e', `${entry.head}:data/other/large.json`], {env: {...process.env, GIT_NO_LAZY_FETCH: '1'}}).status, 0);
  checkUnfetched(false, true, ['data/other/large.json']);
});

test('bounded selected batches count duplicate blob paths, empty files and full-profile bytes exactly', async t => {
  const {repo, git, manager} = fixture(t);
  const blob = git('rev-parse', 'HEAD:README.md').trim();
  const rows = Array.from({length: 2100}, (_, i) => `100644 ${blob}\tscripts/duplicate-${i}.txt\n`).join('');
  execFileSync('git', ['-C', repo, 'update-index', '--index-info'], {input: rows});
  fs.writeFileSync(path.join(repo, 'empty.txt'), '');
  git('add', 'empty.txt'); git('commit', '-m', 'multiple size batches');
  const head = git('rev-parse', 'HEAD').trim();
  for (const profile of ['sparse', 'full']) {
    const include = ['data/needed', 'data/one.json'];
    const expected = git('ls-tree', '-rlz', head).split('\0').filter(Boolean).reduce((total, line) => {
      const [metadata, name] = line.split('\t');
      return total + (profile === 'full' || !name.includes('/') || name.startsWith('scripts/') || name.startsWith('docs/')
        || name.startsWith('data/needed/') || name === 'data/one.json' ? Number(metadata.trim().split(/\s+/)[3]) : 0);
    }, 0);
    const inventory = manager.inspect({commit: head, profile, include});
    assert.deepEqual(inventory.missing, []);
    assert.equal(inventory.availableBytes, expected);
    assert.equal(inventory.selectedBytes, expected);
    assert.equal(inventory.inputs.reduce((sum, row) => sum + row.bytes, 0), expected);
    const entry = await manager.allocate({worker: profile, slot: 'review', commit: head, profile, include});
    assert.equal(fs.readFileSync(path.join(entry.path, 'scripts/duplicate-2099.txt'), 'utf8'), 'root');
    if (profile === 'full') assert.ok(fs.existsSync(path.join(entry.path, 'data/other/large.json')));
    manager.release({worker: profile, slot: 'review', token: entry.token});
  }
});

test('selected submodules remain refused while excluded submodule metadata is harmless', async t => {
  const {repo, git, manager, head} = fixture(t);
  execFileSync('git', ['-C', repo, 'update-index', '--add', '--cacheinfo', `160000,${head},data/vendor`]);
  git('commit', '-m', 'submodule fixture');
  const commit = git('rev-parse', 'HEAD').trim();
  const entry = await manager.allocate({worker: 'excluded', slot: 'review', commit});
  manager.release({worker: 'excluded', slot: 'review', token: entry.token});
  for (const options of [{include: ['data/vendor']}, {profile: 'full'}]) {
    assert.throws(() => manager.inspect({commit, ...options}), /Submodule/);
    await assert.rejects(() => manager.allocate({worker: 'selected', slot: 'review', commit, ...options}), /Submodule/);
    assert.deepEqual(registryEntries(manager), []);
  }
});


test('read-only inspection retains required scopes and creates no registry, lock, branch or checkout', async t => {
  const {manager, git, head} = fixture(t);
  const before = git('worktree', 'list', '--porcelain');
  const refs = git('show-ref');
  const scope = {commit: head, include: ['data/needed', 'data/one.json', 'research/new-owned-path']};
  const result = manager.inspect(scope);
  assert.equal(result.head, head);
  assert.deepEqual(result.include, scope.include);
  assert.deepEqual(result.inputs.map(row => row.path).sort(), [
    '.gitignore', 'AGENTS.md', 'README.md', 'data/needed/input.json', 'data/one.json', 'docs/guide.md', 'scripts/tool.mjs'
  ]);
  assert.equal(result.inputCount, 7);
  assert.deepEqual(result.missing, []);
  assert.equal(result.selectedBytes, result.inputs.reduce((sum, row) => sum + row.bytes, 0));
  const {registry, root} = manager.report();
  assert.ok(!fs.existsSync(registry));
  assert.ok(!fs.existsSync(root));
  assert.equal(git('worktree', 'list', '--porcelain'), before);
  assert.equal(git('show-ref'), refs);
  assert.throws(() => manager.inspect({commit: 'main'}), /exact locally available/);
  assert.throws(() => manager.inspect({commit: head, include: ['data/../foreign']}), /literal/);
  assert.throws(() => manager.inspect({commit: head, profile: 'other'}), /sparse\/full/);
});

test('promisor inspection lists every missing required path while leaving excluded missing blobs untouched', async t => {
  const {run, manager, git, head, checkUnfetched} = partialFixture(t, [
    'README.md', 'scripts/tool.mjs', 'data/one.json', 'data/other/large.json'
  ]);
  const before = git('worktree', 'list', '--porcelain');
  const refs = git('show-ref');
  const result = await run({include: ['data/needed', 'data/one.json']}, 'inspect');
  assert.equal(result.head, head);
  assert.equal(result.selectedBytes, null);
  assert.deepEqual(result.missing.flatMap(row => row.paths).sort(), ['README.md', 'data/one.json', 'scripts/tool.mjs']);
  assert.equal(result.missing.length, 3);
  assert.equal(result.inputs.filter(row => row.bytes === null).length, 3);
  assert.equal(result.availableBytes, result.inputs.reduce((sum, row) => sum + (row.bytes ?? 0), 0));
  assert.ok(!result.inputs.some(row => row.path === 'data/other/large.json'));
  assert.equal(git('worktree', 'list', '--porcelain'), before);
  assert.equal(git('show-ref'), refs);
  assert.ok(!fs.existsSync(manager.report().registry));
  assert.ok(!fs.existsSync(manager.report().root));
  checkUnfetched();
});

test('full promisor inspection includes excluded missing inputs and CLI exposes the same exact inventory', async t => {
  const {repo, run, head, checkUnfetched} = partialFixture(t, 'data/other/large.json');
  const result = await run({profile: 'full'}, 'inspect');
  assert.equal(result.selectedBytes, null);
  assert.deepEqual(result.missing.flatMap(row => row.paths), ['data/other/large.json']);
  const cli = execFileSync(process.execPath, [cliHelper(repo),
    'inspect', '--repo', repo, '--commit', head, '--profile', 'full'], {
    cwd: repo, encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '0'}
  });
  assert.deepEqual(JSON.parse(cli), result);
  checkUnfetched();
});


test('inspection groups missing duplicate OIDs without omitting materialized paths', async t => {
  const {run, checkUnfetched} = partialFixture(t, 'README.md', {configureSource: ({repo, git}) => {
    const oid = git('rev-parse', 'HEAD:README.md').trim();
    execFileSync('git', ['-C', repo, 'update-index', '--add', '--cacheinfo', `100644,${oid},data/needed/alias.txt`]);
    git('commit', '-m', 'required path alias');
  }});
  const result = await run({include: ['data/needed']}, 'inspect');
  assert.equal(result.missing.length, 1);
  assert.deepEqual(result.missing[0].paths, ['README.md', 'data/needed/alias.txt']);
  assert.equal(result.inputs.filter(row => row.bytes === null).length, 2);
  assert.equal(result.selectedBytes, null);
  checkUnfetched();
});

test('missing selected OIDs stay complete across batches without invoking cat-file on absent objects', async t => {
  const {run, checkUnfetched} = partialFixture(t, ['README.md', 'scripts/tool.mjs'], {configureSource: ({repo, git}) => {
    const oid = git('rev-parse', 'HEAD:README.md').trim();
    const rows = Array.from({length: 2100}, (_, i) => `100644 ${oid}\tscripts/missing-alias-${i}.txt\n`).join('');
    execFileSync('git', ['-C', repo, 'update-index', '--index-info'], {input: rows});
    git('commit', '-m', 'missing aliases across batches');
  }});
  const result = await run({}, 'inspect');
  assert.equal(result.missing.length, 2);
  assert.equal(result.missing.flatMap(row => row.paths).length, 2102);
  assert.equal(result.inputs.filter(row => row.bytes === null).length, 2102);
  assert.equal(result.selectedBytes, null);
  assert.equal(result.availableBytes, result.inputs.reduce((sum, row) => sum + (row.bytes ?? 0), 0));
  checkUnfetched();
});

test('old-Git promisor fatal is avoided even when every selected blob is absent', async t => {
  const {repo, git, run, trace, checkUnfetched} = partialFixture(t, [
    '.gitignore', 'AGENTS.md', 'README.md', 'docs/guide.md', 'scripts/tool.mjs', 'data/one.json'
  ]);
  const absent = git('rev-parse', 'HEAD:README.md').trim();
  const legacy = spawnSync('git', ['-C', repo, 'cat-file', '--batch-check'], {
    input: absent + '\n', encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '1', GIT_TRACE: trace}
  });
  if (legacy.status === 0) assert.equal(legacy.stdout, absent + ' missing\n');
  else {
    assert.equal(legacy.status, 128);
    assert.match(legacy.stderr, /lazy fetching disabled[\s\S]*could not fetch .* from promisor remote/);
  }
  fs.writeFileSync(trace, '');
  const result = await run({include: ['data/one.json']}, 'inspect');
  assert.equal(result.inputCount, 6);
  assert.equal(result.missing.length, 6);
  assert.equal(result.availableBytes, 0);
  assert.equal(result.selectedBytes, null);
  assert.ok(result.inputs.every(row => row.bytes === null));
  assert.doesNotMatch(fs.readFileSync(trace, 'utf8'), /cat-file/);
  checkUnfetched();
});

// Build an actually incomplete object store regardless of Git's packing policy.
// Only synthetic fixture objects are rewritten; retain commit-graph metadata.
function removeFixtureObject(repo, git, missing) {
  const rows = git('cat-file', '--batch-all-objects', '--batch-check=%(objectname) %(objecttype)')
    .trim().split('\n').map(row => row.split(' '));
  assert.ok(rows.some(([oid]) => oid === missing));
  const retained = rows.filter(([oid]) => oid !== missing).map(([oid, type]) => ({oid, type,
    bytes: execFileSync('git', ['-C', repo, 'cat-file', type, oid])}));
  const objects = path.join(repo, '.git/objects');
  for (const name of fs.readdirSync(objects)) {
    if (name !== 'info') fs.rmSync(path.join(objects, name), {recursive: true, force: true});
  }
  for (const {oid, type, bytes} of retained) {
    assert.equal(execFileSync('git', ['-C', repo, 'hash-object', '-w', '-t', type, '--stdin'],
      {input: bytes, encoding: 'utf8'}).trim(), oid);
  }
  assert.notEqual(spawnSync('git', ['-C', repo, 'cat-file', '-e', missing],
    {env: {...process.env, GIT_NO_LAZY_FETCH: '1'}}).status, 0);
}

test('unavailable exact commit fails without fetching or claiming a complete selected inventory', async t => {
  const {repo, git, manager, head} = fixture(t);
  git('repack', '-ad');
  git('commit-graph', 'write', '--reachable');
  removeFixtureObject(repo, git, head);
  const trace = path.join(repo, 'commit-inspection.trace');
  const before = fs.readdirSync(path.join(repo, '.git/objects'), {recursive: true}).sort();
  const result = spawnSync(process.execPath, [cliHelper(repo),
    'inspect', '--repo', repo, '--commit', head], {cwd: repo, encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '0', GIT_TRACE: trace}});
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, new RegExp(`Exact commit unavailable locally: ${head}`));
  assert.doesNotMatch(fs.readFileSync(trace, 'utf8'), /(?:built-in: git|run_command:) .*fetch/);
  assert.deepEqual(fs.readdirSync(path.join(repo, '.git/objects'), {recursive: true}).sort(), before);
  assert.ok(!fs.existsSync(manager.report().registry));
  assert.ok(!fs.existsSync(manager.report().root));
});

test('exact commit inspection refuses non-commits and ignores replacement-object bytes', async t => {
  const {repo, git, manager, head} = fixture(t);
  const oid = git('rev-parse', 'HEAD:README.md').trim();
  assert.throws(() => manager.inspect({commit: oid}), /missing or not a commit/);
  const replacement = execFileSync('git', ['-C', repo, 'hash-object', '-w', '--stdin'], {
    input: 'foreign replacement contents', encoding: 'utf8'
  }).trim();
  git('replace', oid, replacement);
  const inspected = manager.inspect({commit: head});
  const root = inspected.inputs.find(row => row.path === 'README.md');
  assert.equal(root.oid, oid);
  assert.equal(root.bytes, 4);
  for (const profile of ['sparse', 'full']) {
    const entry = await manager.allocate({worker: profile, slot: 'review', commit: head, profile});
    assert.equal(fs.readFileSync(path.join(entry.path, 'README.md'), 'utf8'), 'root');
    manager.release({worker: profile, slot: 'review', token: entry.token});
  }
  git('replace', '-d', oid);
  fs.writeFileSync(path.join(repo, 'README.md'), 'foreign replacement commit tree');
  git('add', 'README.md'); git('commit', '-m', 'replacement commit fixture');
  git('replace', head, git('rev-parse', 'HEAD').trim());
  assert.equal(manager.inspect({commit: head}).inputs.find(row => row.path === 'README.md').bytes, 4);
  for (const profile of ['sparse', 'full']) {
    const entry = await manager.allocate({worker: profile, slot: 'review', commit: head, profile});
    assert.equal(fs.readFileSync(path.join(entry.path, 'README.md'), 'utf8'), 'root');
    const released = manager.release({worker: profile, slot: 'review', token: entry.token});
    assert.equal(released.head, head);
    assert.equal(git('rev-parse', released.preservedRef).trim(), head);
  }
});

test('missing root and descendant tree metadata are classified before any blob sizing', async t => {
  for (const treePath of ['', 'scripts', 'data/other']) {
    const {repo, git, manager, head} = fixture(t);
    const oid = git('rev-parse', treePath ? `HEAD:${treePath}` : 'HEAD^{tree}').trim();
    git('repack', '-ad');
    removeFixtureObject(repo, git, oid);
    const trace = path.join(repo, 'tree-inspection.trace');
    const refs = git('show-ref');
    const before = fs.readdirSync(path.join(repo, '.git/objects'), {recursive: true}).sort();
    const result = spawnSync(process.execPath, [cliHelper(repo),
      'inspect', '--repo', repo, '--commit', head], {cwd: repo, encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '0', GIT_TRACE: trace}});
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, new RegExp(`Missing tree metadata:.*${oid}`));
    assert.match(result.stderr, /selected inventory cannot be enumerated/);
    assert.doesNotMatch(fs.readFileSync(trace, 'utf8'), /cat-file|(?:built-in: git|run_command:) .*fetch/);
    assert.deepEqual(fs.readdirSync(path.join(repo, '.git/objects'), {recursive: true}).sort(), before);
    assert.equal(git('show-ref'), refs);
    await assert.rejects(() => manager.allocate({worker: 'missing-tree', slot: 'review', commit: head}), /Missing tree metadata/);
    assert.ok(!fs.existsSync(path.join(manager.report().registry, 'state.json')));
    assert.ok(!fs.existsSync(manager.report().root));
  }
});

test('unreadable and corrupt selected objects remain read failures, never missing-blob inventories', async t => {
  for (const fault of ['permission', 'corrupt']) {
    const {repo, git, run, manager, trace} = partialFixture(t, 'data/other/large.json');
    const oid = git('rev-parse', 'HEAD:README.md').trim();
    const object = path.join(repo, '.git/objects', oid.slice(0, 2), oid.slice(2));
    const original = fs.readFileSync(object);
    fs.chmodSync(object, fault === 'permission' ? 0 : 0o644);
    if (fault === 'corrupt') fs.writeFileSync(object, 'corrupt git object bytes');
    try {
      await assert.rejects(() => run({}, 'inspect'), error => {
        // Older Git may report an unreadable existing loose object as corrupt.
        // Preserve that read failure rather than reclassifying it as absent.
        assert.match(error.message, /Permission denied|corrupt|inflate|unable to unpack/i);
        assert.doesNotMatch(error.message, /selected inventory cannot be enumerated|Unknown input size/);
        return true;
      });
      assert.doesNotMatch(fs.readFileSync(trace, 'utf8'), /(?:built-in: git|run_command:) .*fetch/);
      assert.ok(!fs.existsSync(manager.report().registry));
      assert.ok(!fs.existsSync(manager.report().root));
    } finally {
      fs.chmodSync(object, 0o644);
      fs.writeFileSync(object, original);
    }
  }
});

test('allocator batches exact selected missing blobs, verifies them, and never imports an excluded body', async t => {
  const {repo, git, run, manager, head, checkUnfetched} = partialFixture(t, [
    'README.md', 'scripts/tool.mjs', 'data/one.json', 'data/other/large.json'
  ]);
  const scope = {include: ['data/needed', 'data/one.json']};
  const before = await run(scope, 'inspect');
  checkUnfetched();
  const refs = git('show-ref');
  const fetchHead = path.join(repo, '.git/FETCH_HEAD');
  assert.ok(!fs.existsSync(fetchHead));
  const entry = await run(scope);
  assert.equal(git('show-ref'), refs);
  assert.ok(!fs.existsSync(fetchHead));
  const after = await run(scope, 'inspect');
  assert.deepEqual(after.missing, []);
  assert.equal(after.inputs.length, before.inputs.length);
  assert.equal(after.selectedBytes, after.inputs.reduce((sum, row) => sum + row.bytes, 0));
  const excluded = git('rev-parse', `${head}:data/other/large.json`).trim();
  const response = execFileSync('git', ['-C', repo, 'rev-list', '--objects', '--filter=tree:0', '--missing=print',
    '--ignore-missing', '--no-walk=unsorted', '--no-object-names', '--stdin'], {
    input: excluded + '\n', encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
  });
  assert.equal(response, '');
  assert.equal(fs.readFileSync(path.join(entry.path, 'README.md'), 'utf8'), 'root');
  assert.equal(fs.readFileSync(path.join(entry.path, 'scripts/tool.mjs'), 'utf8'), 'tool');
  assert.equal(fs.readFileSync(path.join(entry.path, 'data/one.json'), 'utf8'), 'individual');
  assert.ok(!fs.existsSync(path.join(entry.path, 'data/other')));
  checkUnfetched(false, true);
  manager.release({worker: 'partial', slot: 'review', token: entry.token});
});

test('capacity refusal precedes acquisition and a verified batch is reused after locked capacity changes', async t => {
  let free = 0;
  const {git, run, manager, selectedFetches} = partialFixture(t, 'data/one.json', {
    freeBytes: () => free, onFetch: () => { free = 0; }
  });
  const branch = 'engineering/acquisition-retry';
  await assert.rejects(() => run({slot: 'work', commit: undefined, branch, include: ['data/one.json']}), /Insufficient free space for exact selected objects and checkout/);
  assert.equal(selectedFetches.count, 0, 'capacity is checked before network acquisition');
  assert.equal(git('for-each-ref', '--format=%(refname)', `refs/heads/${branch}`), '');
  assert.ok(!fs.existsSync(path.join(manager.report().registry, 'state.json')));
  free = 1_000_000;
  await assert.rejects(() => run({slot: 'work', commit: undefined, branch, include: ['data/one.json']}), /Insufficient free space for selected workspace checkout/);
  assert.equal(selectedFetches.count, 1, 'only one exact selected batch was acquired');
  assert.equal(git('for-each-ref', '--format=%(refname)', `refs/heads/${branch}`), '');
  assert.ok(!fs.existsSync(path.join(manager.report().registry, 'state.json')));
  assert.deepEqual((await run({include: ['data/one.json']}, 'inspect')).missing, []);
  free = 1_000_000;
  const entry = await run({slot: 'work', commit: undefined, branch, include: ['data/one.json']});
  assert.equal(entry.status, 'ready');
  assert.equal(selectedFetches.count, 1, 'retry reuses the already verified immutable object');
  assert.equal(fs.readFileSync(path.join(entry.path, 'data/one.json'), 'utf8'), 'individual');
  manager.release({worker: 'partial', token: entry.token});
});

test('tree descriptor mismatches and failed or denied exact fetches leave no slot or ref', async t => {
  for (const failure of ['wrong-oid', 'wrong-size', 'missing-upstream', 'denied']) {
    const {repo, git, run, manager, checkUnfetched} = partialFixture(t, 'data/one.json', {
      treeFault: failure === 'wrong-oid' ? failure : failure === 'wrong-size' ? failure : undefined,
      fetchFault: failure === 'missing-upstream' ? 'remote missing requested object' : failure === 'denied' ? 'HTTP 403 authorization denied' : undefined
    });
    const refs = git('show-ref');
    if (failure === 'wrong-oid') await assert.rejects(() => run({include: ['data/one.json']}), /Remote descriptor differs from actual immutable Git tree/);
    else if (failure === 'wrong-size') await assert.rejects(() => run({include: ['data/one.json']}), /does not match tree/);
    else await assert.rejects(() => run({include: ['data/one.json']}), /object acquisition failed/);
    assert.equal(git('show-ref'), refs);
    assert.ok(!fs.existsSync(path.join(repo, '.git/FETCH_HEAD')));
    assert.deepEqual(registryEntries(manager), []);
    assert.ok(!fs.existsSync(path.join(manager.report().registry, 'state.json')));
    if (failure === 'wrong-size') {
      assert.deepEqual(manager.inspect({commit: git('rev-parse', 'HEAD').trim(), include: ['data/one.json']}).missing, []);
      checkUnfetched(false, true);
    } else if (failure === 'wrong-oid') {
      assert.ok(manager.inspect({commit: git('rev-parse', 'HEAD').trim(), include: ['data/one.json']}).missing.length > 0);
      checkUnfetched();
    } else {
      assert.ok(manager.inspect({commit: git('rev-parse', 'HEAD').trim(), include: ['data/one.json']}).missing.length > 0);
      checkUnfetched(false, 1);
    }
  }
});

test('documented pinned bootstrap binds its task repository and preserves stale working files', async t => {
  const {repo, git, manager} = fixture(t);
  const ambient = fixture(t);
  const helper = fs.readFileSync(new URL('../scripts/local-workspace.mjs', import.meta.url));
  const identity = fs.readFileSync(new URL('../scripts/worker-identity.mjs', import.meta.url));
  const prefetch = fs.readFileSync(new URL('../scripts/geography-prefetch.mjs', import.meta.url));
  fs.writeFileSync(path.join(repo, 'scripts/local-workspace.mjs'), helper);
  fs.writeFileSync(path.join(repo, 'scripts/worker-identity.mjs'), identity);
  fs.writeFileSync(path.join(repo, 'scripts/geography-prefetch.mjs'), prefetch);
  git('add', 'scripts'); git('commit', '-m', 'accepted helpers');
  const head = git('rev-parse', 'HEAD').trim();
  git('repack', '-ad');
  const stale = "throw Error('stale helper must not execute');\n";
  fs.writeFileSync(path.join(repo, 'scripts/local-workspace.mjs'), stale);
  fs.writeFileSync(path.join(repo, 'scripts/worker-identity.mjs'), stale);
  const before = git('status', '--porcelain');
  const refs = git('show-ref');
  const docs = fs.readFileSync(new URL('../docs/DEVELOPMENT.md', import.meta.url), 'utf8');
  const bootstrap = docs.split("<<'PYTHON'\n")[1].split('\nPYTHON')[0];
  const run = () => execFileSync('python3', ['-', repo, head, 'inspect', '--commit', head, '--include', 'data/one.json'], {
    cwd: ambient.repo, input: bootstrap, encoding: 'utf8', stdio: 'pipe', env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
  });
  const result = JSON.parse(run());
  assert.deepEqual(result, manager.inspect({commit: head, include: ['data/one.json']}));
  assert.equal(git('status', '--porcelain'), before);
  assert.equal(git('show-ref'), refs);
  assert.equal(fs.readFileSync(path.join(repo, 'scripts/local-workspace.mjs'), 'utf8'), stale);
  assert.equal(fs.readFileSync(path.join(repo, 'scripts/worker-identity.mjs'), 'utf8'), stale);
  assert.ok(!fs.readdirSync(path.join(repo, '.git')).some(name => name.startsWith('worldatlas-helper-')));
  assert.ok(!fs.existsSync(manager.report().registry));
});

test('documented cold bootstrap allocates from a linked partial clone with exact selected acquisition', async t => {
  const {repo, sourceRepo, git, head, trace, manager} = partialFixture(t, [
    'scripts/local-workspace.mjs', 'scripts/geography-prefetch.mjs', 'data/needed/input.json', 'data/other/large.json'
  ], {
    configureSource: ({repo, git}) => {
      for (const name of ['local-workspace.mjs', 'worker-identity.mjs', 'geography-prefetch.mjs'])
        fs.writeFileSync(path.join(repo, 'scripts', name), fs.readFileSync(new URL('../scripts/' + name, import.meta.url)));
      git('add', 'scripts'); git('commit', '-m', 'accepted promisor helpers');
    }
  });
  const sourceGit = (...args) => execFileSync('git', ['-C', sourceRepo, ...args], {encoding:'utf8',stdio:'pipe'}).trim();
  const primary = path.join(path.dirname(repo), 'linked-primary');
  git('worktree', 'add', '--detach', '--no-checkout', primary, head);
  const primaryGit = (...args) => execFileSync('git', ['-C', primary, ...args], {
    encoding: 'utf8', stdio: 'pipe', env: {...process.env, GIT_NO_LAZY_FETCH:'1', GIT_NO_REPLACE_OBJECTS:'1'}
  }).trim();
  primaryGit('sparse-checkout', 'init', '--no-cone');
  primaryGit('sparse-checkout', 'set', '--no-cone', '/AGENTS.md', '/README.md');
  primaryGit('read-tree', '-mu', 'HEAD');
  assert.equal(primaryGit('status', '--porcelain'), '', 'linked primary starts clean');
  const primaryIndex = primaryGit('rev-parse', '--path-format=absolute', '--git-path', 'index');
  const primaryFetchHead = primaryGit('rev-parse', '--path-format=absolute', '--git-path', 'FETCH_HEAD');
  fs.writeFileSync(primaryFetchHead, 'primary-worktree-fetch-head-sentinel\n');
  const before = {
    head: primaryGit('rev-parse', 'HEAD'), refs: primaryGit('show-ref'),
    status: primaryGit('status', '--porcelain=v2'), index: fs.readFileSync(primaryIndex),
    files: ['AGENTS.md','README.md'].map(name => [name, fs.readFileSync(path.join(primary,name))]),
    fetchHead: fs.readFileSync(primaryFetchHead)
  };
  const rootTree = sourceGit('rev-parse', `${head}^{tree}`);
  const treeRows = sourceGit('ls-tree', '-r', '-t', '-z', head).split('\0').filter(Boolean).map(line => {
    const [metadata, name] = line.split('\t'), [mode, type, sha] = metadata.split(' ');
    return {path:name, mode, type, sha, ...(type === 'blob' ? {size:Number(sourceGit('cat-file','-s',sha))} : {})};
  });
  const mockTree = path.join(path.dirname(repo), 'github-tree.json');
  fs.writeFileSync(mockTree, JSON.stringify({sha:rootTree,truncated:false,tree:treeRows}));
  const preload = path.join(path.dirname(repo), 'mock-github-tree.mjs');
  fs.writeFileSync(preload, `import fs from 'node:fs';\nconst originalFetch=globalThis.fetch;\nglobalThis.fetch=async(input,init)=>{\n const url=String(input);\n if(url.startsWith('https://api.github.com/repos/ChengshuLi/WorldAtlas/git/trees/')){\n  const value=JSON.parse(fs.readFileSync(process.env.WA_TEST_TREE,'utf8'));\n  if(!url.includes('/'+value.sha)) throw Error('unexpected fixture tree request');\n  return new Response(JSON.stringify(value),{status:200,headers:{'content-type':'application/json'}});\n }\n return originalFetch(input,init);\n};\n`);
  const fakeBin = path.join(path.dirname(repo), 'fake-bin'); fs.mkdirSync(fakeBin);
  const fakeGh = path.join(fakeBin, 'gh');
  fs.writeFileSync(fakeGh, '#!/bin/sh\n[ "$1" = auth ] && [ "$2" = token ] || exit 2\nprintf fixture-token\n', {mode:0o755});
  fs.chmodSync(fakeGh, 0o755);
  git('config', '--add', `url.${pathToFileURL(sourceRepo).href}.insteadOf`, 'https://github.com/ChengshuLi/WorldAtlas.git');
  const docs = fs.readFileSync(new URL('../docs/DEVELOPMENT.md', import.meta.url), 'utf8');
  const bootstrap = docs.split("<<'PYTHON'\n")[1].split('\nPYTHON')[0];
  const refs = git('for-each-ref', '--format=%(refname) %(objectname)', 'refs/heads', 'refs/tags', 'refs/remotes').split('\n').filter(Boolean);
  const workspaceOid = git('rev-parse', `${head}:scripts/local-workspace.mjs`).trim();
  const workerOid = git('rev-parse', `${head}:scripts/worker-identity.mjs`).trim();
  const prefetchOid = git('rev-parse', `${head}:scripts/geography-prefetch.mjs`).trim();
  const selectedOid = git('rev-parse', `${head}:data/needed/input.json`).trim();
  const unrelatedOid = git('rev-parse', `${head}:data/other/large.json`).trim();
  const result = execFileSync('python3', ['-', primary, head, 'allocate', '--worker', 'bootstrap-author',
    '--branch', 'engineering/cold-bootstrap-fixture', '--profile', 'sparse', '--include', 'data/needed'], {
    cwd: path.dirname(repo), input: bootstrap, encoding: 'utf8', stdio: 'pipe',
    env: {...process.env, TASK_REPO:primary, CODEX_THREAD_ID:'bootstrap-author',
      PATH:`${fakeBin}:${path.dirname(process.execPath)}:${process.env.PATH}`,
      NODE_OPTIONS:`--import=${pathToFileURL(preload).href}`, WA_TEST_TREE:mockTree,
      GIT_NO_LAZY_FETCH:'1', GIT_NO_REPLACE_OBJECTS:'1', GIT_TRACE:trace}
  });
  const entry = JSON.parse(result);
  assert.equal(entry.head, head);
  assert.equal(entry.worker, 'bootstrap-author');
  assert.equal(fs.readFileSync(path.join(entry.path, 'data/needed/input.json'), 'utf8'), 'input');
  for (const oid of [workspaceOid, workerOid, prefetchOid, selectedOid]) {
    assert.equal(git('cat-file', '-t', oid).trim(), 'blob');
    assert.doesNotThrow(() => git('cat-file', '-e', oid));
  }
  const unrelated = spawnSync('git', ['-C', repo, 'cat-file', '-e', unrelatedOid], {
    encoding: 'utf8', env: {...process.env, GIT_NO_LAZY_FETCH: '1', GIT_NO_REPLACE_OBJECTS: '1'}
  });
  assert.notEqual(unrelated.status, 0, 'the unrelated promised body remains unavailable');
  assert.equal(primaryGit('rev-parse', 'HEAD'), before.head);
  assert.equal(primaryGit('rev-parse', 'refs/heads/main'), head, 'the primary branch ref remains unchanged');
  const afterRefs = primaryGit('for-each-ref', '--format=%(refname) %(objectname)', 'refs/heads', 'refs/tags', 'refs/remotes');
  assert.deepEqual(afterRefs.split('\n').filter(Boolean).filter(row => !row.startsWith('refs/heads/engineering/cold-bootstrap-fixture ')),
    refs, 'all pre-existing refs remain unchanged; only the expected allocator branch is added');
  assert.equal(primaryGit('status', '--porcelain=v2'), before.status);
  assert.deepEqual(fs.readFileSync(primaryIndex), before.index);
  for (const [name, bytes] of before.files) assert.deepEqual(fs.readFileSync(path.join(primary,name)), bytes);
  assert.deepEqual(fs.readFileSync(primaryFetchHead), before.fetchHead, 'common metadata refresh leaves linked-primary FETCH_HEAD untouched');
  assert.ok(!fs.readdirSync(path.join(repo, '.git')).some(name => name.startsWith('worldatlas-helper-')));
  manager.release({worker: entry.worker, capabilityFile: entry.capabilityFile});
  assert.deepEqual(registryEntries(manager), []);
});

test('inspection and allocation share every support prefix without suppressing an existing allocation lock', async t => {
  const {repo, git, manager} = fixture(t);
  const required = ['src/main.js', 'hosted/api.mjs', 'drizzle/0001.sql', '.github/workflows/check.yml',
    '.agents/skills/example/SKILL.md', 'coordination/templates/example.json'];
  for (const name of required) {
    fs.mkdirSync(path.dirname(path.join(repo, name)), {recursive: true});
    fs.writeFileSync(path.join(repo, name), name);
  }
  git('add', '.'); git('commit', '-m', 'every support prefix');
  const head = git('rev-parse', 'HEAD').trim();
  const result = manager.inspect({commit: head});
  for (const name of required) assert.ok(result.inputs.some(row => row.path === name), name);
  const {registry} = manager.report();
  const lock = path.join(registry, 'lock');
  fs.mkdirSync(lock, {recursive: true});
  assert.deepEqual(manager.inspect({commit: head}), result);
  await assert.rejects(() => manager.allocate({worker: 'one', slot: 'review', commit: head}), /locked/);
  assert.ok(fs.existsSync(lock));
  fs.rmdirSync(lock);
  const entry = await manager.allocate({worker: 'one', slot: 'review', commit: head});
  for (const row of result.inputs) assert.ok(fs.existsSync(path.join(entry.path, row.path)), row.path);
  assert.ok(!fs.existsSync(path.join(entry.path, 'data/other')));
  manager.release({worker: 'one', slot: 'review', token: entry.token});
});


test('complete documented shell bootstrap refuses failed refresh instead of executing cached main', async t => {
  const {repo, git} = fixture(t);
  for (const name of ['local-workspace.mjs', 'worker-identity.mjs', 'geography-prefetch.mjs'])
    fs.writeFileSync(path.join(repo, 'scripts', name), fs.readFileSync(new URL('../scripts/' + name, import.meta.url)));
  git('add', 'scripts'); git('commit', '-m', 'cached accepted helpers');
  const head = git('rev-parse', 'HEAD').trim();
  git('update-ref', 'refs/remotes/origin/main', head);
  git('remote', 'set-url', 'origin', path.join(repo, 'unavailable-origin'));
  const refs = git('show-ref');
  const status = git('status', '--porcelain');
  const docs = fs.readFileSync(new URL('../docs/DEVELOPMENT.md', import.meta.url), 'utf8');
  const block = docs.split('## Refresh a stale checkout without changing its files')[1].split('```sh\n')[1].split('\n```')[0]
    .replace('data/YOUR-REQUIRED-PATH', 'data/one.json');
  assert.throws(() => execFileSync('bash', ['-c', block], {cwd: repo, encoding: 'utf8', stdio: 'pipe', env: {...process.env, TASK_REPO: repo}}), error => {
    assert.doesNotMatch(error.stdout, /inputCount|selectedBytes/);
    assert.match(error.stderr, /unavailable-origin|not a git repository|repository .* does not exist/);
    return error.status !== 0;
  });
  assert.equal(git('show-ref'), refs);
  assert.equal(git('status', '--porcelain'), status);
  assert.ok(!fs.readdirSync(path.join(repo, '.git')).some(name => name.startsWith('worldatlas-helper-')));
  git('remote', 'set-url', 'origin', repo);
  git('config', 'uploadpack.allowFilter', 'true');
  const result = JSON.parse(execFileSync('bash', ['-c', block], {cwd: repo, encoding: 'utf8', stdio: 'pipe', env: {...process.env, TASK_REPO: repo}}));
  assert.equal(result.head, head);
  assert.ok(result.inputs.some(row => row.path === 'data/one.json'));
  assert.ok(!fs.readdirSync(path.join(repo, '.git')).some(name => name.startsWith('worldatlas-helper-')));
  git('config', '--unset-all', 'remote.origin.fetch');
  git('update-ref', '-d', 'refs/remotes/origin/main');
  const explicitRefspec = JSON.parse(execFileSync('bash', ['-c', block], {cwd: repo, encoding: 'utf8', stdio: 'pipe', env: {...process.env, TASK_REPO: repo}}));
  assert.equal(explicitRefspec.head, head);
  assert.equal(git('rev-parse', 'origin/main').trim(), head);
  assert.equal(git('rev-parse', 'FETCH_HEAD').trim(), head);
  assert.equal(git('status', '--porcelain'), status);
  assert.ok(!fs.readdirSync(path.join(repo, '.git')).some(name => name.startsWith('worldatlas-helper-')));
});
