#!/usr/bin/env node
// Verify the exact queued center-to-feature mapping against the retained,
// simplified 2022 geoBoundaries MLT ADM1 product. This is not a physical or
// legal/semantic qualification.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {gunzipSync} from 'node:zlib';
import {createGridIndex, rasterize} from '../../../src/pixel-grid.js';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..');
const commit = 'c61bfd2e6fda1eb6483f913b647a2808f6efcc5e';
const packageId = 'gb-MLT-ADM1--repair-evaluation';
const sourcePath = 'coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-MLT-ADM1-000.bin.gz';
const observationPath = 'coordination/engineering/malta1196-repair-evaluation-20261027/owner-observation-001/owner-observation.json';
const rosterPath = 'coordination/engineering/global-current-cell-work-queue-20261014/source-feature-roster.json.gz';
const physicalSummaryPath = 'coordination/engineering/global-current-cell-work-queue-20261014/physical-unassigned-summary.json';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const git = '/opt/codex/runtimes/codex-primary-runtime/dependencies/bin/fallback/git';
const env = {...process.env, GIT_NO_LAZY_FETCH: '1', GIT_NO_REPLACE_OBJECTS: '1', GIT_OPTIONAL_LOCKS: '0'};
const sourceGzip = fs.readFileSync(path.join(root, sourcePath));
assert.equal(sha(sourceGzip), '76d01c165a5242fbc6c7bb628617d65b9c40d06549aefece2ea60d8eb7803c02');
const sourceBytes = gunzipSync(sourceGzip);
assert.equal(sourceBytes.length, 76373);
assert.equal(sha(sourceBytes), '8989bbf2cd7685358c2abe4391dc7f9a67a38fea431c00ed1940e51b2190dfd6');
const source = JSON.parse(sourceBytes);
assert.equal(source.crs?.properties?.name, 'urn:ogc:def:crs:OGC:1.3:CRS84');
assert.equal(source.features.length, 68);

const observationBytes = fs.readFileSync(path.join(root, observationPath));
assert.equal(sha(observationBytes), '0cc0981dfce9c5cc2c86946bc657f506e1cca2b94d4fd48ebebde1b38c3ca331');
const observation = JSON.parse(observationBytes);
assert.equal(observation.commit, commit);
assert.equal(observation.original_package.package_id, packageId);
assert.equal(observation.query_count, 1196);
assert.equal(observation.keys.length, 1196);

const rosterOid = execFileSync(git, ['rev-parse', `${commit}:${rosterPath}`], {cwd: root, env, encoding: 'utf8'}).trim();
assert.equal(rosterOid, 'e6e380ec13cd4bcc1d24399a76bfa85ca5805b26');
const rosterGzip = execFileSync(git, ['cat-file', 'blob', rosterOid], {cwd: root, env, maxBuffer: 8 * 1024 * 1024});
assert.equal(rosterGzip.length, 1844315);
assert.equal(sha(rosterGzip), '87f2d47e104b3af640351e747d8300d0068a1be23caab9e80558c3f8914eb4aa');
const roster = JSON.parse(gunzipSync(rosterGzip));
const family = roster.filter(row => row.family_index === 215);
assert.equal(family.length, 68);
assert.ok(family.every((row, ordinal) => row.source_index === 44815 + ordinal && row.owners.length === 1 && row.owners[0] === 7124 && row.geometry_status === 'raw-native-supported'));
assert.equal(new Set(family.map(row => row.source_id)).size, 68);
for (let i = 0; i < source.features.length; i++) {
  const properties = source.features[i].properties, row = family[i];
  assert.equal(row.name, properties.shapeName);
  assert.equal(row.source_id, `gb:MLT:ADM1:${properties.shapeID}`);
}

function readPinnedGitBody(relativePath, expectedOid, expectedBytes, expectedSha) {
  const oid = execFileSync(git, ['rev-parse', `${commit}:${relativePath}`], {cwd: root, env, encoding: 'utf8'}).trim();
  assert.equal(oid, expectedOid);
  const bytes = execFileSync(git, ['cat-file', 'blob', oid], {cwd: root, env, maxBuffer: 8 * 1024 * 1024});
  assert.equal(bytes.length, expectedBytes);
  assert.equal(sha(bytes), expectedSha);
  return {oid, bytes};
}
const physicalSummaryPin = readPinnedGitBody(physicalSummaryPath,
  '0c934cdaf4b007a741e66d4a080890154bdae53c', 154672,
  'a82c56c1d92ff52c0b0e52c9bf329905a05bace4b6a27c12771509d419888501');
const physicalSummary = JSON.parse(physicalSummaryPin.bytes);
assert.match(physicalSummary.scope, /GSHHG levels1–4/);
assert.ok(physicalSummary.limits.some(text => text.includes('heterogeneous observation times')));
const phase25 = physicalSummary.phases.find(phase => phase.block === 25);
assert.ok(phase25);
const landPin = phase25.files.find(file => file.kind === 'physical-support');
const waterPin = phase25.files.find(file => file.kind === 'inland-water-support');
assert.ok(landPin && waterPin);
const landGzip = readPinnedGitBody(`coordination/engineering/global-current-cell-work-queue-20261014/${landPin.path}`,
  '7549ff877ffa8b9fad68d2e72beded008b5ad0fa', 401770, landPin.sha256).bytes;
const waterGzip = readPinnedGitBody(`coordination/engineering/global-current-cell-work-queue-20261014/${waterPin.path}`,
  '1bd541342b150ae6a945557e37fbc2ec9ad35276', 258, waterPin.sha256).bytes;
const landBytes = gunzipSync(landGzip), waterBytes = gunzipSync(waterGzip);
assert.equal(sha(landBytes), landPin.decoded_sha256);
assert.equal(sha(waterBytes), waterPin.decoded_sha256);
const landRows = JSON.parse(landBytes), waterRows = JSON.parse(waterBytes);
function covered(rows, x, y) {
  const row = rows.find(candidate => candidate.y === y);
  return Boolean(row?.runs.some(([start, end]) => start <= x && x < end));
}
const physicalMembership = {gshhg_land_support: 0, inland_water_support: 0, neither: 0, both: 0};
for (const key of observation.keys) {
  const land = covered(landRows, key.x, key.y), water = covered(waterRows, key.x, key.y);
  if (land && water) physicalMembership.both++;
  else if (land) physicalMembership.gshhg_land_support++;
  else if (water) physicalMembership.inland_water_support++;
  else physicalMembership.neither++;
}
assert.deepEqual(physicalMembership, {gshhg_land_support: 1196, inland_water_support: 0, neither: 0, both: 0});

const expected = new Map();
for (const block of observation.original_intervals) for (const row of block.rows) {
  const [y, start, end, owners, sourceIds, queueClass] = row;
  assert.deepEqual(owners, [7124]);
  assert.equal(queueClass, 'land'); // Original queue classification, not a physical recheck.
  assert.equal(sourceIds.length, 1);
  for (let x = start; x < end; x++) {
    const key = `${x}:${y}`;
    assert.ok(!expected.has(key), 'Duplicate original key');
    expected.set(key, sourceIds[0]);
  }
}
assert.equal(expected.size, 1196);
assert.equal(new Set(observation.keys.map(key => `${key.x}:${key.y}`)).size, 1196);

const keys = observation.keys;
const minX = Math.min(...keys.map(key => key.x)), maxX = Math.max(...keys.map(key => key.x));
const minY = Math.min(...keys.map(key => key.y)), maxY = Math.max(...keys.map(key => key.y));
const width = maxX - minX + 1, height = maxY - minY + 1;
const hitLists = keys.map(() => []), featureCounts = {};
for (let featureIndex = 0; featureIndex < source.features.length; featureIndex++) {
  const mask = rasterize(createGridIndex([source.features[featureIndex]], {ordered: true}),
    {x: minX, y: minY, width, height});
  let count = 0;
  for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
    const key = keys[keyIndex];
    if (mask[(key.y - minY) * width + key.x - minX] !== 0) {
      hitLists[keyIndex].push(featureIndex);
      count++;
    }
  }
  if (count) featureCounts[44815 + featureIndex] = count;
}
let queueMatches = 0;
const hitMultiplicity = {};
for (let i = 0; i < keys.length; i++) {
  const key = keys[i], hits = hitLists[i];
  hitMultiplicity[hits.length] = (hitMultiplicity[hits.length] ?? 0) + 1;
  const sourceId = expected.get(`${key.x}:${key.y}`);
  assert.equal(sourceId, 44815 + hits[0]);
  assert.equal(hits.length, 1, 'A center is uncovered or belongs to multiple source features');
  queueMatches++;
}
assert.equal(queueMatches, 1196);
assert.equal(Object.keys(featureCounts).length, 31);
assert.deepEqual(Object.keys(featureCounts).map(Number).sort((a,b) => a-b), observation.original_package.source_features);

const report = {
  version: 1, package_id: packageId, data_commit: commit,
  method: 'retained simplified geoBoundaries MLT ADM1 features individually rasterized with exact accepted src/pixel-grid.js createGridIndex/rasterize; compare every exact selected-owner observation key to original queue source_feature_index',
  inputs: [
    {path: sourcePath, bytes: sourceGzip.length, sha256: sha(sourceGzip), decoded_bytes: sourceBytes.length, decoded_sha256: sha(sourceBytes), role: 'retained simplified 2022 represented-year source product'},
    {path: observationPath, bytes: observationBytes.length, sha256: sha(observationBytes), role: 'exact 1,196-key selected-owner observation'},
    {path: rosterPath, git_blob_oid: rosterOid, bytes: rosterGzip.length, sha256: sha(rosterGzip), role: 'authenticated family/source-index roster'},
    {path: physicalSummaryPath, git_blob_oid: physicalSummaryPin.oid, bytes: physicalSummaryPin.bytes.length, sha256: sha(physicalSummaryPin.bytes), role: 'physical-input inventory and stated limitations'},
    {path: `coordination/engineering/global-current-cell-work-queue-20261014/${landPin.path}`, git_blob_oid: '7549ff877ffa8b9fad68d2e72beded008b5ad0fa', bytes: landGzip.length, sha256: sha(landGzip), decoded_sha256: sha(landBytes), role: 'GSHHG-derived complete land-support interval mask, block 25'},
    {path: `coordination/engineering/global-current-cell-work-queue-20261014/${waterPin.path}`, git_blob_oid: '1bd541342b150ae6a945557e37fbc2ec9ad35276', bytes: waterGzip.length, sha256: sha(waterGzip), decoded_sha256: sha(waterBytes), role: 'separate inland-water interval mask, block 25'},
    {path: 'src/pixel-grid.js', git_blob_oid: execFileSync(git, ['rev-parse', `${commit}:src/pixel-grid.js`], {cwd: root, env, encoding: 'utf8'}).trim(), role: 'accepted native projection/rasterization implementation'}
  ],
  source_scope: {features: 68, source_index_range: [44815, 44882], owner_rows: 68, owner_index: 7124, crs: 'OGC:CRS84'},
  result: {query_keys: keys.length, unique_query_keys: expected.size, feature_center_hit_multiplicity: hitMultiplicity, queue_source_index_matches: queueMatches, features_with_center_hits: Object.keys(featureCounts).length, counts_by_source_index: featureCounts, selected_center_physical_membership: physicalMembership},
  limits: [
    'This validates sampled native-center membership against the retained simplified source only; no full-resolution geoJSON was rasterized or compared.',
    'GSHHG support is retained source-relative physical evidence with heterogeneous observation times, not contemporary perfect ground truth; membership supports are not whole-target issue masks and no issue-center clearance is inferred.',
    'Source metadata records geoBoundaries CC-BY-4.0 derivative terms and underlying d-maps.com Public Domain metadata/email clarification; this computation does not resolve source authority, effective applicability, role, or political/legal interpretation.',
    'No repair patch, ownership change, acceptance, or publication decision is asserted.'
  ]
};
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
