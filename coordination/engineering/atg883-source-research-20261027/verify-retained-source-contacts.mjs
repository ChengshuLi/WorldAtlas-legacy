import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { gunzipSync } from 'node:zlib';

const repo = process.env.WORLDATLAS_REPO || process.cwd();
const packet = 'coordination/engineering/atg883-source-research-20261027';
const proposalPath = 'coordination/engineering/atg-original-repair-20261021/factual-disposition-proposal.json';
const observationPath = 'coordination/engineering/atg-original-repair-20261021/current-selected-owner-observation.json';
const queueCopyPath = packet + '/original-queue-record.json';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const readJson = (path) => JSON.parse(fs.readFileSync(repo + '/' + path, 'utf8'));
const gitShow = (commit, path) => execFileSync('git', ['-C', repo, 'show', commit + ':' + path], {
  maxBuffer: 32 * 1024 * 1024,
  env: { ...process.env, GIT_NO_LAZY_FETCH: '1', GIT_NO_REPLACE_OBJECTS: '1' }
});
const check = (ok, message) => { if (!ok) throw new Error(message); };

const queueCopyBytes = fs.readFileSync(repo + '/' + queueCopyPath);
const proposalBytes = fs.readFileSync(repo + '/' + proposalPath);
const observationBytes = fs.readFileSync(repo + '/' + observationPath);
check(hash(queueCopyBytes) === 'a8699fd1c2fdc12a97aa592ac711c5674f232daf58ac86fba41aea0fcb2968f9', 'Original queue copy SHA mismatch');
check(hash(proposalBytes) === '132e2e5162dd37b223b9533eb2182acef7aa17828122690d81381dc344d6a91e', 'Retained proposal SHA mismatch');
check(hash(observationBytes) === '4d520f8484608398659c54789cc65bee82fad45a3bf02fff77f24c7d70dec120', 'Retained owner observation SHA mismatch');

const queue = readJson(queueCopyPath);
const proposal = readJson(proposalPath);
const observation = readJson(observationPath);
const scope = queue.record;
const queuePins = new Map(proposal.evidence_pins.map(pin => [pin[0], pin]));
const getPinned = (path) => {
  const pin = queuePins.get(path);
  check(pin, 'Missing scoped evidence pin: ' + path);
  const [pinPath, commit, blob, bytes, sha256] = pin;
  const content = gitShow(commit, pinPath);
  check(content.length === bytes && hash(content) === sha256, 'Pinned evidence mismatch: ' + path);
  return { content, pin: { path: pinPath, commit, git_blob_oid: blob, bytes, sha256 } };
};
const candidatePath = 'coordination/engineering/global-current-cell-work-queue-20261014/source-candidates-block-028.json.gz';
const landPath = 'coordination/engineering/global-current-cell-work-queue-20261014/physical-support-block-028.json.gz';
const waterPath = 'coordination/engineering/global-current-cell-work-queue-20261014/inland-water-support-block-028.json.gz';
const candidateInput = getPinned(candidatePath);
const landInput = getPinned(landPath);
const waterInput = getPinned(waterPath);
const candidateRows = JSON.parse(gunzipSync(candidateInput.content));
const landRows = JSON.parse(gunzipSync(landInput.content));
const waterRows = JSON.parse(gunzipSync(waterInput.content));
const byY = rows => new Map(rows.map(row => [row.y, row.runs]));
const candidateByY = byY(candidateRows);
const landByY = byY(landRows);
const waterByY = byY(waterRows);
const containing = (runs, x) => (runs || []).find(run => run[0] <= x && x < run[1]);
const cells = proposal.cell_rows;
const intervals = proposal.interval_rows;
check(scope.package_id === proposal.package_id && scope.package_id === 'gb-ATG-ADM1--repair-evaluation', 'Package key mismatch');
check(scope.native_cells === 883 && scope.land_cells === 883 && scope.inland_water_cells === 0
  && scope.source_relative_cells === 0 && scope.interval_segments === 288, 'Original denominator changed');
check(scope.owners.length === 1 && scope.owners[0] === 7110, 'Original owner changed');
check(scope.source_features.join(',') === '1274,1275,1276,1277,1278,1279,1280', 'Original selected feature set changed');
check(!scope.source_features.includes(1273) && proposal.feature_dictionary['1273'][1] === 'Redonda',
  'Redonda selector exclusion changed');
check(scope.native_blocks.length === 1 && scope.native_blocks[0] === 28, 'Original block changed');
check(scope.source_family_index === 12 && scope.location_count === 1 && scope.locality_count === 1
  && scope.provinces.length === 1 && scope.provinces[0] === 'framework:province:antigua-and-barbuda:f0b1983e7530',
  'Original family/location/locality/province scope changed');
check(scope.evidence.source_domain_transform.length === 0, 'Original source-domain transform contract changed');
check(cells.length === 883 && intervals.length === 288, 'Proposal row counts changed');
check(new Set(cells.map(row => row[0] + ',' + row[1])).size === 883, 'Duplicate or missing exact cell key');
check(intervals.reduce((sum, row) => sum + row[2] - row[1], 0) === 883, 'Intervals do not cover exact denominator');
const exactKeySet = new Set(cells.map(row => row[0] + ',' + row[1]));
const intervalKeySet = new Set();
for (const row of intervals) for (let x = row[1]; x < row[2]; x++) {
  const key = row[0] + ',' + x;
  check(!intervalKeySet.has(key), 'Duplicate original interval key: ' + key);
  intervalKeySet.add(key);
}
check(intervalKeySet.size === 883 && [...intervalKeySet].every(key => exactKeySet.has(key)),
  'Original interval key set differs from proposal key rows');

let candidateMatches = 0;
let landMatches = 0;
let waterOverlaps = 0;
const perFeature = {};
for (const row of cells) {
  const [y, x, , feature, sourceStart, sourceEnd, landStart, landEnd] = row;
  const candidateRun = containing(candidateByY.get(y), x);
  const landRun = containing(landByY.get(y), x);
  const waterRun = containing(waterByY.get(y), x);
  check(candidateRun && candidateRun[2].length === 1 && candidateRun[2][0] === 7110
    && candidateRun[3].length === 1 && candidateRun[3][0] === feature
    && candidateRun[0] === sourceStart && candidateRun[1] === sourceEnd,
    'Candidate-run/owner/feature contact mismatch at ' + y + ',' + x);
  check(landRun && landRun[0] === landStart && landRun[1] === landEnd,
    'Land-mask contact mismatch at ' + y + ',' + x);
  check(!waterRun, 'Inland-water mask overlap at ' + y + ',' + x);
  candidateMatches++;
  landMatches++;
  if (waterRun) waterOverlaps++;
  perFeature[feature] = (perFeature[feature] || 0) + 1;
}
for (const row of intervals) {
  const [y, start, end, owners, features, physicalClass] = row;
  check(owners.length === 1 && owners[0] === 7110 && features.length === 1 && physicalClass === 'land',
    'Interval owner/feature/physical class mismatch');
  for (let x = start; x < end; x++) {
    const candidateRun = containing(candidateByY.get(y), x);
    const landRun = containing(landByY.get(y), x);
    check(candidateRun && candidateRun[2].length === 1 && candidateRun[2][0] === 7110
      && candidateRun[3].length === 1 && candidateRun[3][0] === features[0] && landRun && !containing(waterByY.get(y), x),
      'Interval does not match retained candidate and mask operands at ' + y + ',' + x);
  }
}

const selectedFeatures = new Set(scope.source_features);
const selectedCandidateKeys = new Set();
const selectedLandCandidateKeys = new Set();
const selectedWaterCandidateKeys = new Set();
const selectedOffMaskCandidateKeys = new Set();
const selectedPhysicalOverlapKeys = new Set();
for (const row of candidateRows) {
  for (const run of row.runs) {
    if (!run[3].some(feature => selectedFeatures.has(feature))) continue;
    for (let x = run[0]; x < run[1]; x++) {
      const key = row.y + ',' + x;
      check(!selectedCandidateKeys.has(key), 'Duplicate selected-feature candidate key: ' + key);
      selectedCandidateKeys.add(key);
      const landRun = containing(landByY.get(row.y), x);
      const waterRun = containing(waterByY.get(row.y), x);
      if (landRun) selectedLandCandidateKeys.add(key);
      if (waterRun) selectedWaterCandidateKeys.add(key);
      if (landRun && waterRun) selectedPhysicalOverlapKeys.add(key);
      if (!landRun && !waterRun) selectedOffMaskCandidateKeys.add(key);
    }
  }
}
check(selectedPhysicalOverlapKeys.size === 0, 'Selected-feature candidates overlap retained land and water masks');
check(selectedCandidateKeys.size === selectedLandCandidateKeys.size
  + selectedWaterCandidateKeys.size + selectedOffMaskCandidateKeys.size,
  'Selected candidate mask categories do not partition the candidate union');
check(selectedLandCandidateKeys.size === exactKeySet.size
  && [...selectedLandCandidateKeys].every(key => exactKeySet.has(key))
  && [...exactKeySet].every(key => selectedLandCandidateKeys.has(key)),
  'Selected-feature land-supported candidate set differs from the exact original 883 keys');

const sourcePin = queuePins.get('coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-ATG-ADM1-000.bin.gz');
check(sourcePin, 'Missing retained source payload pin');
const sourceBlob = gitShow(sourcePin[1], sourcePin[0]);
const sourceJsonBytes = gunzipSync(sourceBlob);
check(sourceBlob.length === proposal.raw_source.compressed_bytes && hash(sourceBlob) === proposal.raw_source.compressed_sha256,
  'Retained ATG payload compressed bytes/hash mismatch');
check(sourceJsonBytes.length === proposal.raw_source.decoded_bytes && hash(sourceJsonBytes) === proposal.raw_source.decoded_sha256,
  'Retained ATG payload decoded bytes/hash mismatch');
const sourceGeojson = JSON.parse(sourceJsonBytes);
check(sourceGeojson.type === 'FeatureCollection' && sourceGeojson.features.length === 8, 'Retained source feature collection changed');
check(sourceGeojson.crs?.properties?.name === 'urn:ogc:def:crs:OGC:1.3:CRS84', 'Retained source CRS differs');
const sourceIndices = scope.source_features;
const scanItems = sourceIndices.map(index => {
  const row = proposal.feature_dictionary[String(index)];
  const shapeId = row[0].split(':').at(-1);
  check(row[2].length === 1 && row[2][0] === 7110 && row[3].length === 1 && row[3][0] === 7110,
    'Selected source feature no longer maps to the single recorded owner: ' + index);
  const feature = sourceGeojson.features.find(item => item.properties?.shapeID === shapeId);
  check(feature && feature.properties?.shapeName === row[1], 'Retained source feature identity/name mismatch: ' + index);
  const geometry = feature.geometry;
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates]
    : geometry.type === 'MultiPolygon' ? geometry.coordinates : null;
  check(polygons, 'Unsupported retained source geometry: ' + index);
  return { index, polygons: polygons.map(polygon => polygon.map(ring => Float64Array.from(ring.flat()))) };
});

const latitudePin = observation.native_latitudes;
const latitudeBlob = gitShow(latitudePin.commit, latitudePin.path);
check(latitudeBlob.length === latitudePin.bytes && hash(latitudeBlob) === latitudePin.sha256, 'Pinned native latitude blob mismatch');
const latitudeBytes = gunzipSync(latitudeBlob);
check(latitudeBytes.length === latitudePin.decoded_bytes && hash(latitudeBytes) === latitudePin.decoded_sha256,
  'Pinned native latitude decoded bytes/hash mismatch');
check(latitudeBytes.length % 8 === 0, 'Native latitude payload is not f64le');
const latitudes = new Float64Array(latitudeBytes.length / 8);
for (let i = 0; i < latitudes.length; i++) latitudes[i] = latitudeBytes.readDoubleLE(i * 8);
const gridCode = gitShow(observation.code_commit, 'src/native-grid.js').toString('utf8');
const nativeModule = await import('data:text/javascript;base64,' + Buffer.from(gridCode).toString('base64'));
check(nativeModule.NATIVE_GRID_METHOD === 'native-linear-evenodd-first-owner-v1', 'Unexpected pinned native-grid method');
const gridBlobOid = execFileSync('git', ['-C', repo, 'rev-parse', observation.code_commit + ':src/native-grid.js'], {
  encoding: 'utf8', env: { ...process.env, GIT_NO_LAZY_FETCH: '1', GIT_NO_REPLACE_OBJECTS: '1' }
}).trim();
const blockRows = 4096;
const rowStart = scope.native_blocks[0] * blockRows;
const scan = nativeModule.nativePolygonIntervals(scanItems, {
  size: latitudes.length, rowStart, rowEnd: rowStart + blockRows, latitudes
});
let geometryMatches = 0;
let nativeBoundaryContacts = 0;
const geometryMismatches = [];
for (const row of cells) {
  const [y, x, , feature] = row;
  const runs = scan.rows.get(y) || [];
  const inside = runs.some(run => run.owner === feature && run.start <= x && x < run.end);
  if (inside) geometryMatches++;
  else geometryMismatches.push([y, x, feature]);
  const contact = scan.ties.some(tie => tie.owner === feature && tie.y === y
    && ('x' in tie ? tie.x === x : tie.start <= x && x < tie.end));
  if (contact) nativeBoundaryContacts++;
}
check(geometryMatches === 883 && geometryMismatches.length === 0, 'Retained source geometry does not cover the exact 883 keys');
check(nativeBoundaryContacts === 0, 'Unexpected exact native boundary contact in original 883-key slice');

const observerKeys = observation.keys;
const querySet = new Set(cells.map(row => row[0] + ',' + row[1]));
check(observerKeys.length === 883 && new Set(observerKeys.map(row => row.y + ',' + row.x)).size === 883
  && observerKeys.every(row => querySet.has(row.y + ',' + row.x)), 'Pinned observer query differs from original key set');
const ownerCounts = { base: 0, additive: 0, effective: 0, overlaps: 0 };
for (const key of observerKeys) {
  check(key.base_owner === 0 && key.accepted_additive_owner === 0 && key.effective_selected_owner === 0
    && key.existing_product_overlap === false, 'Pinned observer result mismatch at ' + key.y + ',' + key.x);
  ownerCounts.base++;
  ownerCounts.additive++;
  ownerCounts.effective++;
  ownerCounts.overlaps++;
}
const bindingPath = 'coordination/engineering/global-current-cell-work-queue-20261014/ownership-binding.json';
const bindingBlob = gitShow('ea099024c1d175842e4d323db752b49d9f7a5825', bindingPath);
const binding = JSON.parse(bindingBlob);
const selectorPin = observation.selector_pin;
check(hash(gitShow(selectorPin.commit, selectorPin.path)) === selectorPin.sha256, 'Owner-observer selector pin mismatch');
check(hash(bindingBlob) === 'b952192475435c8fbc74a84627994aff4f4e073c36c479d369554fc75251bc89',
  'Original queue ownership-binding SHA mismatch');
check(binding.method === 'Full native row occupied interval union plus selected additive rows, complemented over [0,size). No candidate polygon mask.',
  'Original queue owner method changed');
check(binding.selection.method === 'native-linear-evenodd-first-owner-v1' && binding.block_rows === blockRows
  && binding.size === latitudes.length && binding.current_commit === 'a61b6f9e7f88b1da380e3a834f89d7509132ed71',
  'Original queue native rule/grid dimensions changed');
check(binding.patch.path !== observation.patch_pin.path, 'Queue and observer additive-selection states unexpectedly identical');

process.stdout.write(JSON.stringify({
  kind: 'atg883-retained-source-contact-and-mask-check-v1',
  status: 'research-only-not-acceptance',
  original_scope: {
    package_id: scope.package_id,
    primary_source: scope.primary_source,
    owner_indices: scope.owners,
    source_feature_indices: scope.source_features,
    source_family_index: scope.source_family_index,
    native_block: scope.native_blocks[0],
    land_cells: scope.land_cells,
    inland_water_cells: scope.inland_water_cells,
    source_relative_cells: scope.source_relative_cells,
    interval_segments: scope.interval_segments,
    source_feature_count: scope.source_feature_count,
    location_count: scope.location_count,
    locality_count: scope.locality_count,
    provinces: scope.provinces,
    selected_features_are_separate_owners: false,
    redonda_feature_1273_in_repair_selector: scope.source_features.includes(1273)
  },
  exact_inputs: {
    original_queue_copy: { path: queueCopyPath, sha256: hash(queueCopyBytes) },
    retained_proposal: { path: proposalPath, sha256: hash(proposalBytes) },
    retained_owner_observation: { path: observationPath, sha256: hash(observationBytes), commit: observation.commit },
    source_payload: { path: sourcePin[0], commit: sourcePin[1], git_blob_oid: sourcePin[2], bytes: sourceBlob.length,
      sha256: hash(sourceBlob), decoded_bytes: sourceJsonBytes.length, decoded_sha256: hash(sourceJsonBytes) },
    native_grid_code: { commit: observation.code_commit, path: 'src/native-grid.js', git_blob_oid: gridBlobOid,
      method: nativeModule.NATIVE_GRID_METHOD },
    native_latitudes: { commit: latitudePin.commit, path: latitudePin.path, bytes: latitudeBlob.length,
      sha256: hash(latitudeBlob), decoded_sha256: hash(latitudeBytes), grid_size: latitudes.length },
    candidate_block: candidateInput.pin,
    physical_land_block: landInput.pin,
    inland_water_block: waterInput.pin
  },
  source_feature_crosswalk: Object.fromEntries(scope.source_features.map(index => {
    const row = proposal.feature_dictionary[String(index)];
    return [index, { source_id: row[0], name: row[1], recorded_owner_indices: row[2], lineage_owner_indices: row[3], exact_key_contacts: perFeature[index] }];
  })),
  checks: {
    exact_original_keys: cells.length,
    exact_original_interval_segments: intervals.length,
    proposal_intervals_cover_cells: 883,
    candidate_owner_and_source_feature_contacts: candidateMatches,
    exact_candidate_run_bounds_match_proposal: candidateMatches,
    retained_land_mask_contacts: landMatches,
    retained_inland_water_contacts: waterOverlaps,
    reverse_selected_feature_candidate_union_cells: selectedCandidateKeys.size,
    reverse_land_supported_candidate_cells: selectedLandCandidateKeys.size,
    reverse_inland_water_supported_candidate_cells: selectedWaterCandidateKeys.size,
    reverse_neither_land_nor_water_candidate_cells: selectedOffMaskCandidateKeys.size,
    reverse_land_water_mask_overlap_cells: selectedPhysicalOverlapKeys.size,
    reverse_land_supported_set_equals_original_key_set: true,
    source_geometry_contacts_by_native_rule: geometryMatches,
    source_geometry_mismatches: geometryMismatches.length,
    exact_native_boundary_contacts: nativeBoundaryContacts,
    cell_contacts_per_source_feature: Object.fromEntries(Object.entries(perFeature).sort((a, b) => Number(a[0]) - Number(b[0]))),
    historical_selected_owner_observation: {
      commit: observation.commit,
      scientific_qualification: observation.scientific_qualification,
      base_owner_zero: ownerCounts.base,
      accepted_additive_owner_zero: ownerCounts.additive,
      effective_selected_owner_zero: ownerCounts.effective,
      no_existing_product_overlap: ownerCounts.overlaps,
      not_current_main_reobservation: true
    },
    owner_selection_distinction: {
      original_queue_binding_sha256: hash(bindingBlob),
      original_queue_additive_patch_path: binding.patch.path,
      observer_selector_path: selectorPin.path,
      observer_additive_patch_path: observation.patch_pin.path,
      same_selection_claimed: false
    }
  },
  qualification_limits: [
    'The retained GeoJSON/native-grid check establishes geometry contacts for the exact original keys only; it does not establish source authority, effective legal applicability, rights, current physical classification, or source-date currency.',
    'Candidate and physical-support runs are retained raster/mask evidence, not a new physical adjudication.',
    'The reverse-scanned selected-feature candidates outside both retained masks remain outside the 883 land-only package and are not physically reclassified here.',
    'The historical owner observation is a literal selected-product observation at its pinned commit and different additive-selection state from the queue ownership binding; it is not current-main acceptance.',
    'Full/simplified files linked by newer API metadata were not obtained; this does not imply that the pinned original payload or masks are missing.',
    'Redonda remains outside the original repair selector; no companion physical-interpretation scope is counted or modified.'
  ]
}, null, 2) + '\n');
