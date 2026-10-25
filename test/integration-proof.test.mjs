import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
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
