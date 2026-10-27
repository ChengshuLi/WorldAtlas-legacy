#!/usr/bin/env node
// Compare original selected-center attribution against both the retained
// simplified source and the separately downloaded full geoBoundaries product.
// This is a source-version comparison, not a legal or physical clearance.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {gunzipSync} from 'node:zlib';
import {createGridIndex, rasterize} from '../../../src/pixel-grid.js';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..');
const commit = 'c61bfd2e6fda1eb6483f913b647a2808f6efcc5e';
const fullPath = process.env.MLT_FULL_SOURCE_GEOJSON;
assert.ok(fullPath, 'Set MLT_FULL_SOURCE_GEOJSON to the pinned full geoBoundaries comparator product');
const fullBytes = fs.readFileSync(fullPath);
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
assert.equal(fullBytes.length, 313611);
assert.equal(sha(fullBytes), '7d7f4853b270c3afbbef522b54fc3ea1bcedf27e3912a33574024b5cdd304fe3');
const full = JSON.parse(fullBytes);

const observationPath = 'coordination/engineering/malta1196-repair-evaluation-20261027/owner-observation-001/owner-observation.json';
const observationBytes = fs.readFileSync(path.join(root, observationPath));
assert.equal(sha(observationBytes), '0cc0981dfce9c5cc2c86946bc657f506e1cca2b94d4fd48ebebde1b38c3ca331');
const observation = JSON.parse(observationBytes);
assert.equal(observation.commit, commit);
assert.equal(observation.original_package.locality_count, 1);
assert.equal(observation.original_package.location_count, 1);
assert.deepEqual(observation.original_package.owners, [7124]);
assert.equal(observation.query_count, 1196);

const simplePath = 'coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-MLT-ADM1-000.bin.gz';
const simpleGzip = fs.readFileSync(path.join(root, simplePath));
assert.equal(sha(simpleGzip), '76d01c165a5242fbc6c7bb628617d65b9c40d06549aefece2ea60d8eb7803c02');
const simpleBytes = gunzipSync(simpleGzip);
assert.equal(sha(simpleBytes), '8989bbf2cd7685358c2abe4391dc7f9a67a38fea431c00ed1940e51b2190dfd6');
const simple = JSON.parse(simpleBytes);
assert.equal(full.features.length, 68);
assert.equal(simple.features.length, 68);
assert.ok(full.features.every((feature, i) => feature.properties.shapeID === simple.features[i].properties.shapeID));

const git = '/opt/codex/runtimes/codex-primary-runtime/dependencies/bin/fallback/git';
const env = {...process.env, GIT_NO_LAZY_FETCH: '1', GIT_NO_REPLACE_OBJECTS: '1', GIT_OPTIONAL_LOCKS: '0'};
const candidatePath = 'coordination/engineering/global-current-cell-work-queue-20261014/source-candidates-block-025.json.gz';
const candidateOid = execFileSync(git, ['rev-parse', `${commit}:${candidatePath}`], {cwd: root, env, encoding: 'utf8'}).trim();
assert.equal(candidateOid, '778c6a09c3eb47686c21ed993d3b10d8f875bec9');
const candidateGzip = execFileSync(git, ['cat-file', 'blob', candidateOid], {cwd: root, env, maxBuffer: 4 * 1024 * 1024});
assert.equal(candidateGzip.length, 463017);
const candidateJson = gunzipSync(candidateGzip);
assert.equal(candidateJson.length, 3239363);
const candidates = new Map(JSON.parse(candidateJson).map(row => [row.y, row.runs]));

const expected = new Map();
for (const block of observation.original_intervals) for (const row of block.rows) {
  const [y, start, end, owners, ids, physicalClass] = row;
  assert.deepEqual(owners, [7124]);
  assert.equal(physicalClass, 'land');
  assert.equal(ids.length, 1);
  for (let x = start; x < end; x++) expected.set(`${x}:${y}`, ids[0]);
}
assert.equal(expected.size, 1196);
assert.equal(new Set(observation.keys.map(key => `${key.x}:${key.y}`)).size, 1196);

// The repair package contract is one country-level owner. The canonical
// territory's explicit membership list, rather than a 31-council inference,
// is the aggregation scope for this source comparison.
const aggregate = JSON.parse(fs.readFileSync(path.join(root, 'data/geography/part-28.json')))
  .features.find(feature => feature.properties.id === 'atlas:territory:MLT');
assert.ok(aggregate, 'Current canonical Malta territory is absent');
const aggregateMembers = aggregate.properties.metadata.source_member_ids;
const sourceIds = simple.features.map(feature => `gb:MLT:ADM1:${feature.properties.shapeID}`);
const candidateSourceIds = [...new Set(observation.original_package.source_features.map(index =>
  `gb:MLT:ADM1:${simple.features[index - 44815].properties.shapeID}`))];
assert.equal(aggregate.properties.reference_owner, 'Malta');
assert.equal(aggregate.properties.name, 'Malta');
assert.equal(aggregateMembers.length, 68);
assert.equal(new Set(aggregateMembers).size, 68);
assert.equal(new Set(sourceIds).size, 68);
assert.deepEqual([...aggregateMembers].sort(), [...sourceIds].sort());
assert.equal(candidateSourceIds.length, 31);
assert.ok(candidateSourceIds.every(id => aggregateMembers.includes(id)));

const candidateOwnerHistogram = {}, candidateSourceHistogram = {};
for (const key of observation.keys) {
  const hits = (candidates.get(key.y) ?? []).filter(([start, end]) => start <= key.x && key.x < end);
  assert.equal(hits.length, 1, 'A queued key has zero or multiple source-candidate runs');
  const [, , owners, sourceIds] = hits[0];
  assert.deepEqual(owners, [7124]);
  assert.deepEqual(sourceIds, [expected.get(`${key.x}:${key.y}`)]);
  const ownerKey = owners.join(',');
  const sourceKey = sourceIds.join(',');
  candidateOwnerHistogram[ownerKey] = (candidateOwnerHistogram[ownerKey] ?? 0) + 1;
  candidateSourceHistogram[sourceKey] = (candidateSourceHistogram[sourceKey] ?? 0) + 1;
}

const keys = observation.keys;
const minX = Math.min(...keys.map(key => key.x)), maxX = Math.max(...keys.map(key => key.x));
const minY = Math.min(...keys.map(key => key.y)), maxY = Math.max(...keys.map(key => key.y));
const width = maxX - minX + 1, height = maxY - minY + 1;
function apply(source) {
  const hits = keys.map(() => []);
  for (let featureIndex = 0; featureIndex < source.features.length; featureIndex++) {
    const mask = rasterize(createGridIndex([source.features[featureIndex]], {ordered: true}),
      {x: minX, y: minY, width, height});
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      const key = keys[keyIndex];
      if (mask[(key.y - minY) * width + key.x - minX] !== 0) hits[keyIndex].push(featureIndex);
    }
  }
  const histogram = {}, featuresHit = new Set(), wrongSourceHits = [];
  const perSource = {};
  for (let i = 0; i < hits.length; i++) {
    const matched = hits[i], key = keys[i], expectedSource = expected.get(`${key.x}:${key.y}`);
    histogram[matched.length] = (histogram[matched.length] ?? 0) + 1;
    const sourceIndex = expectedSource;
    const feature = source.features[sourceIndex - 44815];
    const stats = perSource[sourceIndex] ??= {name: feature.properties.shapeName, shapeID: feature.properties.shapeID, total: 0, hitOnce: 0, miss: 0, multiple: 0, wrongSource: 0};
    stats.total++;
    if (matched.length === 0) stats.miss++;
    else if (matched.length > 1) stats.multiple++;
    else {
      stats.hitOnce++;
      featuresHit.add(matched[0]);
      if (source.features[matched[0]].properties.shapeID !== feature.properties.shapeID) {
        stats.wrongSource++;
        wrongSourceHits.push({sourceIndex, matchedIndex: matched[0]});
      }
    }
  }
  return {histogram, featuresHit: featuresHit.size, perSource, wrongSourceHits};
}
const fullResult = apply(full), simpleResult = apply(simple);
assert.deepEqual(simpleResult.histogram, {'1':1196});
assert.deepEqual(simpleResult.wrongSourceHits, []);
assert.deepEqual(fullResult.histogram, {'0':61,'1':1135});
assert.deepEqual(fullResult.wrongSourceHits, []);

const tuples = keys.map(key => [key.x, key.y, expected.get(`${key.x}:${key.y}`)]).sort((a,b) => a[1]-b[1] || a[0]-b[0]);
const fullMissTuples = tuples.filter(([x,y]) => {
  const i = keys.findIndex(key => key.x === x && key.y === y);
  return fullResult.perSource[expected.get(`${x}:${y}`)].miss && (() => {
    const featureIndex = expected.get(`${x}:${y}`) - 44815;
    const mask = rasterize(createGridIndex([full.features[featureIndex]], {ordered: true}), {x:minX,y:minY,width,height});
    return mask[(y-minY)*width+x-minX] === 0;
  })();
});
const shaJson = value => sha(Buffer.from(JSON.stringify(value)));

const metadataBytes = fs.readFileSync(path.join(root, 'data/administrative-sources.json'));
const metadata = JSON.parse(metadataBytes)['gb:MLT:ADM1'];
assert.equal(metadata.sha256, '8989bbf2cd7685358c2abe4391dc7f9a67a38fea431c00ed1940e51b2190dfd6');
assert.equal(metadata.boundaryYearRepresented, '2022');
assert.equal(metadata.admUnitCount, '68');
assert.equal(metadata.boundaryCanonical, 'Local Council');
const citationPath = 'coordination/engineering/original-geography-source-corpus-20261006/CITATION-AND-USE-geoBoundaries-original.txt';
const citationOid = execFileSync(git, ['rev-parse', `${commit}:${citationPath}`], {cwd: root, env, encoding: 'utf8'}).trim();
assert.equal(citationOid, '7f16c1c4aa7d11ddf25c6a6434630272a4c45459');
const citationBytes = execFileSync(git, ['cat-file', 'blob', citationOid], {cwd: root, env, maxBuffer: 8192});
assert.equal(citationBytes.length, 4316);
assert.equal(sha(citationBytes), 'f6ea7572bea6036c4cdcacf8c0ca7bf09098d4e600d19546d7432533e9a290d5');

process.stdout.write(JSON.stringify({
  version: 1,
  package_id: 'gb-MLT-ADM1--repair-evaluation',
  data_commit: commit,
  target_contract: {owner_index: 7124, owner_scope: 'Malta country-level target; the exact package declares locality_count=1 and location_count=1', requested_cells: 1196, original_candidate_source_features: 31, source_feature_list_is_not_31_owners: true},
  canonical_aggregation: {feature_id:'atlas:territory:MLT', reference_owner:'Malta', source_member_count:aggregateMembers.length,
    source_members_are_exactly_all_68_consumed_geoBoundaries_adm1_features:true,
    candidate_source_member_count:candidateSourceIds.length, candidate_source_members_subset_of_canonical_68:true,
    sorted_source_member_ids_sha256:shaJson([...aggregateMembers].sort()),
    sorted_candidate_source_member_ids_sha256:shaJson([...candidateSourceIds].sort()),
    interpretation:'One country-level owner with an explicit 68-member source aggregation; 31 candidate-side local-council features are components, not 31 owners or separate council adjudications.'},
  product_identity: {same_68_shape_ids_and_order: true, full_url: 'https://github.com/wmgeolab/geoBoundaries/raw/9469f09592ced973a3448cf66b6100b741b64c0d/releaseData/gbOpen/MLT/ADM1/geoBoundaries-MLT-ADM1.geojson', full_lfs_bytes: fullBytes.length, full_lfs_sha256: sha(fullBytes), simplified_path: simplePath, simplified_compressed_sha256: sha(simpleGzip), simplified_bytes: simpleBytes.length, simplified_sha256: sha(simpleBytes)},
  input_pins: {observation_path: observationPath, observation_sha256: sha(observationBytes), candidate_block_path: candidatePath, candidate_block_blob: candidateOid, candidate_block_compressed_bytes: candidateGzip.length, candidate_block_compressed_sha256: sha(candidateGzip), candidate_block_decoded_bytes: candidateJson.length, candidate_block_decoded_sha256: sha(candidateJson), administrative_sources_path: 'data/administrative-sources.json', administrative_sources_blob: '2747b845f0c5654765da3b951c9074e52f220077', administrative_sources_bytes: metadataBytes.length, administrative_sources_file_sha256: sha(metadataBytes), source_metadata_sha256: metadata.sha256, boundary_id: metadata.boundaryID, represented_year_claim: metadata.boundaryYearRepresented, source_data_update_date: metadata.sourceDataUpdateDate, build_date: metadata.buildDate, boundary_canonical: metadata.boundaryCanonical, boundary_license: metadata.boundaryLicense, license_detail: metadata.licenseDetail, geoboundaries_citation_path: citationPath, geoboundaries_citation_blob: citationOid, geoboundaries_citation_bytes: citationBytes.length, geoboundaries_citation_sha256: sha(citationBytes)},
  queue_candidate_result: {keys: 1196, singleton_candidate_owner_histogram: candidateOwnerHistogram, singleton_source_feature_histogram: Object.fromEntries(Object.entries(candidateSourceHistogram).map(([source, count]) => [source, count])), competitors_outside_frozen_candidate_block_not_tested: true},
  selected_center_application: {tuple_format: '[x,y,source_feature_index]', tuple_count: tuples.length, tuple_set_sha256: shaJson(tuples), simplified: simpleResult, full: fullResult, full_miss_count: fullMissTuples.length, full_miss_tuple_set_sha256: shaJson(fullMissTuples)},
  source_status_limits: [
    'The package source contract is one Malta country-level target/owner 7124. The canonical atlas:territory:MLT source_member_ids enumerate exactly all 68 consumed ADM1 features; the 31 candidate-side local-council features are members/components, not 31 owners or separate council adjudications.',
    'All 1,196 cells match the exact retained simplified-product raster and the frozen global source-candidate block. The separately downloaded full product has identical feature IDs/order but misses 61 selected centers; this is preserved as a version-specific adverse comparator, not overwritten with a full-resolution result.',
    'The frozen queue candidate block establishes singleton candidate owner/source IDs only within that pinned queue’s candidate-generation universe; no independent full-world all-source competitor search is claimed.',
    'No full-resolution product was added to the public repository. The compared body is privately retained by hash at /workspace/shared/worldatlas-MLT-ADM1-full-9469f09-comparator-20261027.geojson.',
    'The per-product administrative metadata reports Public Domain based on an email clarification and refers to a License PNG; neither the exact email nor a Malta-specific License PNG is retained here, so the receipt preserves the metadata claim but does not independently verify its basis. The pinned geoBoundaries citation/use notice says geoBoundaries computer code and derivative works are CC BY 4.0 with required attribution and asks users of individual boundary files to cite source metadata. The d-maps conditions page, checked 2026-10-27, says its maps are copyrighted, modifiable/free (including commercial) subject to exact-source-URL attribution and a 10-map cap per publication, and disclaims official recognition/acceptance and precision for some scientific uses. These statements have distinct product, source, and temporal scopes; this work does not reconcile them, infer unrestricted redistribution, override the recorded clarification, or create a new obligation.',
    'This comparison does not resolve effective date, official role/authority, legal boundary status, physical issue masks, native qualification, repair, or acceptance.'
  ]
}, null, 2) + '\n');
