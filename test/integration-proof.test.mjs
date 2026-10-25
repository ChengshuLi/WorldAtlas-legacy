import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {successfulGeographyJob} from '../scripts/integration-proof.mjs';
import {integrationProfile, COORDINATION_PATHS, candidateGeographyCode} from '../scripts/integration-profile.mjs';

test('agent entrypoint routes to the current canonical guides, not retired handoffs', () => {
  const guides = ['DEVELOPMENT.md', 'GEOGRAPHY.md', 'HISTORY.md', 'DATA_ARCHITECTURE.md', 'VALIDATION.md', 'OPERATIONS.md'];
  const entry = fs.readFileSync('AGENTS.md', 'utf8');
  for (const name of guides) {
    assert(fs.existsSync(`docs/${name}`), name);
    assert(entry.includes(`docs/${name}`), name);
  }
  const retired = ['WORKFLOW.md', 'WORKSPACES.md', 'RECOVERY_SECURITY.md', 'HANDOFF_STATUS.md', 'THREE_THREAD_START.md'];
  for (const name of retired) {
    assert(!fs.existsSync(`docs/${name}`), name);
    assert(!entry.includes(`docs/${name}`), name);
  }
  const current = [entry, ...guides.map(name => fs.readFileSync(`docs/${name}`, 'utf8'))].join('\n');
  assert.doesNotMatch(current, /review-issue-readiness\.mjs/);
  assert.match(current, /ordinary authoring does not require machine claim\/readiness/i);
  assert.match(current, /resume.{0,120}does not reload instructions/is);
  const development = fs.readFileSync('docs/DEVELOPMENT.md', 'utf8');
  const routingKeys = ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR',
    'GIT_OBJECT_DIRECTORY', 'GIT_ALTERNATE_OBJECT_DIRECTORIES'];
  const shellSanitizer = development.match(/for key in (GIT_DIR[^\n]+); do\n  unset "\$key"\ndone/);
  assert(shellSanitizer, 'bootstrap must clear inherited Git routing before its first Git command');
  for (const key of routingKeys) assert(shellSanitizer[1].includes(key), key);
  assert(development.indexOf(shellSanitizer[0]) < development.indexOf('git -C "$TASK_REPO"'),
    'routing cleanup must precede the bootstrap fetch');
  assert.match(development, /for key in \('GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR',[\s\S]*?'GIT_ALTERNATE_OBJECT_DIRECTORIES'\):\n\s+env\.pop\(key, None\)/);
  assert.match(development, /subprocess\.call\(\['node',[\s\S]*?\], env=env\)/);
  const validation = fs.readFileSync('docs/VALIDATION.md', 'utf8');
  const architecture = fs.readFileSync('docs/DATA_ARCHITECTURE.md', 'utf8');
  assert.match(architecture, /field-specific evidence priorities and then a stable record-ID tie-break/i);
  assert.doesNotMatch(architecture, /equal-precedence contradictions are rejected/);
  const operations = fs.readFileSync('docs/OPERATIONS.md', 'utf8');
  assert.match(operations, /Encryption provides confidentiality, not sender authentication/i);
  assert.match(operations, /sender-supplied hash alone does not establish origin/i);
  assert.match(operations, /authorized workflow and event, head commit, successful run and attempt, and the artifact/i);
  assert.match(operations, /restricted application database URL/i);
  assert.match(operations, /private recipient key outside Git in an owner-only `0600` file/i);
  assert.match(operations, /ciphertext is not `DATABASE_URL`/i);
  assert.match(operations, /explicit authorization for that exact live destination/i);
  assert.match(development, /account identity alone neither proves nor disproves independence/i);
  assert.match(validation, /selectedDataSelection[\s\S]*reviewedTestPlan/);
  assert.match(validation, /do not automatically require `complete`/i);
  const readme = fs.readFileSync('README.md', 'utf8');
  assert.match(readme, /does not connect to the hosted content API/i);
  assert.doesNotMatch(readme, /SQLite/i);
});

test('documented bootstrap ignores hostile inherited Git routing variables', () => {
  const development = fs.readFileSync('docs/DEVELOPMENT.md', 'utf8');
  const match = development.match(/for key in (GIT_DIR[^\n]+); do\n  unset "\$key"\ndone/);
  assert(match, 'bootstrap sanitizer is required');
  const block = [...development.matchAll(/```sh\n([\s\S]*?)\n```/g)].find(candidate => candidate[1].includes(match[0]));
  assert(block, 'documented bootstrap shell must be testable');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'worldatlas-bootstrap-routing-'));
  try {
    const remote = path.join(dir, 'origin.git');
    const repo = path.join(dir, 'task');
    const decoy = path.join(dir, 'decoy');
    fs.mkdirSync(repo); fs.mkdirSync(decoy);
    const clean = Object.fromEntries(Object.entries(process.env).filter(([key]) =>
      !['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR',
        'GIT_OBJECT_DIRECTORY', 'GIT_ALTERNATE_OBJECT_DIRECTORIES'].includes(key)));
    clean.GIT_NO_LAZY_FETCH = '1'; clean.GIT_NO_REPLACE_OBJECTS = '1';
    execFileSync('git', ['init', '--quiet', '--bare', remote], {env: clean});
    execFileSync('git', ['init', '--quiet', repo], {env: clean});
    execFileSync('git', ['init', '--quiet', decoy], {env: clean});
    fs.mkdirSync(path.join(repo, 'scripts'), {recursive: true});
    fs.mkdirSync(path.join(repo, 'coordination', 'example'), {recursive: true});
    fs.mkdirSync(path.join(decoy, 'tracked'), {recursive: true});
    for (const name of ['local-workspace.mjs', 'worker-identity.mjs'])
      fs.copyFileSync(`scripts/${name}`, path.join(repo, 'scripts', name));
    fs.writeFileSync(path.join(repo, 'coordination', 'example', 'input.json'), '{}\n');
    fs.writeFileSync(path.join(decoy, 'tracked', 'sentinel.txt'), 'leave this decoy untouched\n');
    for (const cwd of [repo, decoy]) {
      execFileSync('git', ['-C', cwd, 'config', 'user.name', 'Bootstrap Test'], {env: clean});
      execFileSync('git', ['-C', cwd, 'config', 'user.email', 'bootstrap@example.invalid'], {env: clean});
      execFileSync('git', ['-C', cwd, 'add', '.'], {env: clean});
      execFileSync('git', ['-C', cwd, 'commit', '--quiet', '-m', 'fixture'], {env: clean});
    }
    execFileSync('git', ['-C', repo, 'remote', 'add', 'origin', remote], {env: clean});
    execFileSync('git', ['-C', repo, 'push', '--quiet', 'origin', 'HEAD:main'], {env: clean});
    const refsBefore = execFileSync('git', ['-C', decoy, 'for-each-ref', '--format=%(refname) %(objectname)'],
      {env: clean, encoding: 'utf8'});
    const indexPath = path.join(decoy, '.git', 'index');
    const indexBefore = createHash('sha256').update(fs.readFileSync(indexPath)).digest('hex');
    const filesBefore = execFileSync('git', ['-C', decoy, 'ls-files', '-z'], {env: clean})
      .toString().split('\0').filter(Boolean).map(name => [name, createHash('sha256')
        .update(fs.readFileSync(path.join(decoy, name))).digest('hex')]);
    const poisoned = {...clean, TASK_REPO: repo,
      GIT_DIR: path.join(decoy, '.git'), GIT_WORK_TREE: decoy,
      GIT_INDEX_FILE: indexPath, GIT_COMMON_DIR: path.join(decoy, '.git'),
      GIT_OBJECT_DIRECTORY: path.join(decoy, '.git', 'objects'),
      GIT_ALTERNATE_OBJECT_DIRECTORIES: path.join(decoy, 'alternate-objects')};
    const script = block[1].replace('--include data/YOUR-REQUIRED-PATH',
      '--include coordination/example/input.json');
    execFileSync('bash', ['-c', script], {env: poisoned, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']});
    const refsAfter = execFileSync('git', ['-C', decoy, 'for-each-ref', '--format=%(refname) %(objectname)'],
      {env: clean, encoding: 'utf8'});
    const filesAfter = execFileSync('git', ['-C', decoy, 'ls-files', '-z'], {env: clean})
      .toString().split('\0').filter(Boolean).map(name => [name, createHash('sha256')
        .update(fs.readFileSync(path.join(decoy, name))).digest('hex')]);
    assert.equal(refsAfter, refsBefore, 'no decoy refs may be changed');
    assert.equal(createHash('sha256').update(fs.readFileSync(indexPath)).digest('hex'), indexBefore,
      'the inherited decoy index must remain unchanged');
    assert.deepEqual(filesAfter, filesBefore, 'no decoy worktree files may be changed');
    assert.equal(execFileSync('git', ['-C', repo, 'rev-parse', 'FETCH_HEAD^{commit}'],
      {env: clean, encoding: 'utf8'}).trim(), execFileSync('git', ['-C', repo, 'rev-parse', 'origin/main^{commit}'],
      {env: clean, encoding: 'utf8'}).trim(), 'fetch must target the task repository');
  } finally {
    fs.rmSync(dir, {recursive: true, force: true});
  }
});

test('reproducible review ledgers are not duplicated as generated documentation', () => {
  const reports = [
    'GLOBAL_GRANULARITY_REVIEW.md', 'SOURCE_POLICY_CORRECTIONS.md',
    ...['AFRICA', 'ASIA', 'EUROPE', 'NORTH_AMERICA', 'OCEANIA', 'SOUTH_AMERICA']
      .map(name => `review-decisions/${name}.md`),
    ...['AFRICA', 'AMERICAS', 'ASIA_OCEANIA', 'EUROPE']
      .map(name => `semantic-followup/${name}.md`)
  ];
  for (const name of reports) assert.equal(fs.existsSync(`docs/${name}`), false, name);
  const producers = [
    'scripts/review-granularity-global.py',
    'scripts/prepare-europe-source-policy-corrections.py',
    'scripts/audit-africa-semantic-followup.py',
    'scripts/audit-americas-semantic-followup.py',
    'scripts/audit-europe-semantic-followup.py'
  ].map(path => fs.readFileSync(path, 'utf8')).join('\n');
  assert.doesNotMatch(producers, /docs\/(?:GLOBAL_GRANULARITY_REVIEW|SOURCE_POLICY_CORRECTIONS|review-decisions|semantic-followup)/);
});

test('geography reuse requires one actual successful producer, independently of step projections', async () => {
  const geography = {id: 44, name: 'geography', status: 'completed', conclusion: 'success', steps: [
    'Checkout trusted geographic checker', 'Install trusted geographic dependencies',
    'Check proposed geography with trusted baseline code',
    'Run actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02'
  ].map(name => ({name, status: 'completed', conclusion: 'success'}))};
  for (const mutate of [job => {job.id = 0;}, job => {job.status = 'in_progress';},
    job => {job.conclusion = 'failure';}, job => {job.conclusion = 'skipped';},
    job => {job.conclusion = 'cancelled';}, job => {job.name = 'other';}]) {
    const job = structuredClone(geography); mutate(job); assert.equal(successfulGeographyJob([job]), null);
  }
  for (const steps of [undefined, [], [{name: 'old display name', status: 'in_progress', conclusion: null}]]) {
    assert.equal(successfulGeographyJob([{...geography, steps}])?.id, 44);
  }
  assert.equal(successfulGeographyJob([geography], '.github/workflows/foreign.yml'), null);
  assert.equal(successfulGeographyJob([geography, structuredClone(geography)]), null);
});

test('explicit coordination allowlist defaults full for unknown/application/data/schema/import/deploy/rename impact',()=>{
  for(const filename of COORDINATION_PATHS) assert.equal(integrationProfile('engineering/job',[{filename}]),'evidence',filename);
  for(const filename of ['src/attributes.js','hosted/a.mjs','drizzle/0001.sql','data/hierarchy.json',
    'scripts/import.mjs','scripts/build-cloudflare.mjs','docs/unknown.json',
    '.github/workflows/deploy.yml','test/application.test.mjs']) {
    assert.equal(integrationProfile('engineering/job',[{filename}]),'full',filename);
    assert.equal(integrationProfile('engineering/job',[{filename:'docs/DEVELOPMENT.md',previous_filename:filename}]),'full',filename);
  }
  assert.equal(integrationProfile('engineering/job',[{filename:'docs/prompts/reviewer.md'}]),'evidence');
  assert.equal(integrationProfile('engineering/job',[]),'full');
});


test('queue profile retains geography owned scope and full fallback outside it',()=>{
 const branch='geography/regional-review-example',owned='data/regional-review/regional-review-example/';
 const reservation={mode:'geography',owned_paths:[owned]};
 assert.equal(integrationProfile(branch,[{filename:owned+'finding.json'}],reservation),'evidence');
 for(const file of [{filename:'src/main.js'},{filename:owned+'finding.json',previous_filename:'src/main.js'}])assert.equal(integrationProfile(branch,[file],reservation),'full');
});

test('package verification, builders and runners stay full', () => {
  for (const filename of ['scripts/build-cloudflare.mjs', 'scripts/build-static.mjs', 'scripts/build-static-inner.mjs',

    'scripts/build-cloudflare-inner.mjs', 'src/main.js', 'data/hierarchy.json', 'drizzle/0002.sql']) {
    assert.equal(integrationProfile('engineering/example', [{filename}]), 'full', filename);
  }
});

test('geography software route is derived from changed checker inputs, retaining data and source-only routes', async () => {
 const changed = filename => [{filename, status: 'modified'}];
 const {CURRENT_REBIND_CODE} = await import('../coordination/engineering/selected-geography-effective-prevention-20261009/selected-neighbor-prevention.mjs');
 for (const name of CURRENT_REBIND_CODE) assert.equal(candidateGeographyCode('full', changed(name)), true, name);
 for (const name of ['scripts/run-geographic-check.py', 'scripts/check-effective-geographic-regression.mjs',
  'coordination/engineering/selected-geography-effective-prevention-20261009/selected-neighbor-prevention.mjs',
  'src/ownership-codec.js', 'src/native-grid.js', 'src/reference-metadata.js', 'requirements.txt']) {
  assert.equal(candidateGeographyCode('full', changed(name)), true, name);
  assert.equal(candidateGeographyCode('evidence', changed(name)), true, name);
  assert.equal(candidateGeographyCode('full', changed(name), 'selected-data'), false, name);
 }
 for (const name of ['data/geography/part-0.json', 'src/app.js', 'src/attributes.js',
  'research/geography/example/source.py', 'docs/DEVELOPMENT.md',
  'coordination/engineering/example/evidence-quality.json', 'scripts/native-ownership/verified-candidates.json']) {
  assert.equal(candidateGeographyCode('full', changed(name)), false, name);
 }
 assert.equal(candidateGeographyCode('full', [...changed('data/geography/part-0.json'),
  ...changed('coordination/engineering/example/source-adjudication.json')]), false);
 assert.equal(candidateGeographyCode('full', [{filename: 'docs/removed.txt', previous_filename: 'scripts/check-geographic-regression.py'}]), true);
});


test('a selected final-bank edit cannot choose its candidate checker',()=>{
 const accepted=new Map([['data/canonical-grid/current-startup/index.json',{type:'blob'}]]);
 const code={filename:'scripts/check-effective-geographic-regression.mjs',status:'modified'};
 assert.equal(candidateGeographyCode('full',[code],undefined,accepted),true,'Code-only upgrade remains an actual software test');
 for(const name of ['data/ownership-selection.json','data/canonical-grid/current-startup/index.json',
  'data/canonical-grid/current-startup/ownership/new.bin.gz']){
  for(const file of [{filename:name,status:'modified'},{filename:'retired.json',previous_filename:name,status:'renamed'}])
   assert.equal(candidateGeographyCode('full',[code,file],undefined,accepted),false,name);
 }
});
