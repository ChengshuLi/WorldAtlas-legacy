import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createAcquisition} from '../scripts/geography-prefetch.mjs';

test('immutable descriptor verification resolves repository-root paths from a subdirectory', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'geography-prefetch-subdirectory-'));
  const repository = path.join(directory, 'repository');
  const env = {...process.env, GIT_NO_LAZY_FETCH: '1', GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_TERMINAL_PROMPT: '0', GIT_AUTHOR_NAME: 'fixture', GIT_AUTHOR_EMAIL: 'fixture@example.invalid',
    GIT_COMMITTER_NAME: 'fixture', GIT_COMMITTER_EMAIL: 'fixture@example.invalid'};
  const git = args => execFileSync('git', ['-C', repository, ...args], {env, stdio: ['ignore', 'pipe', 'pipe']});
  try {
    fs.mkdirSync(repository);
    git(['init']);
    fs.mkdirSync(path.join(repository, 'docs'));
    fs.writeFileSync(path.join(repository, 'docs', 'DEVELOPMENT.md'), 'current repository guide\n');
    git(['add', 'docs/DEVELOPMENT.md']);
    git(['commit', '-m', 'fixture']);
    const version = git(['rev-parse', 'HEAD']).toString().trim();
    const root = git(['rev-parse', 'HEAD^{tree}']).toString().trim();
    const [entry] = git(['ls-tree', '--full-tree', '-z', version, '--', 'docs/DEVELOPMENT.md'])
      .toString().split('\0').filter(Boolean);
    const match = entry.match(/^(\d{6}) (blob) ([a-f0-9]{40})\tdocs\/DEVELOPMENT\.md$/);
    assert(match, 'fixture contains the expected root-relative tree entry');
    const row = {path: 'docs/DEVELOPMENT.md', mode: match[1], type: match[2], sha: match[3],
      size: Number(git(['cat-file', '-s', match[3]]).toString().trim())};
    const scripts = path.join(repository, 'scripts');
    fs.mkdirSync(scripts);
    const acquisition = createAcquisition({repo: scripts, loadTree: async sha => {
      assert.equal(sha, root);
      return {sha, truncated: false, tree: [row]};
    }});
    const descriptor = await acquisition.descriptor(version, row.path);
    assert.deepEqual(descriptor, {version, path: row.path, oid: row.sha, bytes: row.size});
  } finally {
    fs.rmSync(directory, {recursive: true, force: true});
  }
});
