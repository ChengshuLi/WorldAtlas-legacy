import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pinReader} from '../../../scripts/prepare-delivery-handoff.mjs';
import {scientificNativeSelection} from '../../../src/reference-metadata.js';

const root = process.cwd();
const base = 'coordination/engineering/atg883-source-research-20261027';
const output = `${base}/native-preparation`;
const acceptedMain = '81280722133858cbb26249210fed17b031d11d3d';
const originalSourceCommit = 'ea099024c1d175842e4d323db752b49d9f7a5825';
const physicalCommit = '8a1ebac563c994cc1242616d563a76dad6ad079a';
const stageCommit = '89ade469de81ae9676ebb3564ef25c7a0d6f08bb';
const sourceId = 'gb:ATG:ADM1';
const targetId = 'atlas:territory:ATG';
const owner = 7110;
const queueSha = 'a8699fd1c2fdc12a97aa592ac711c5674f232daf58ac86fba41aea0fcb2968f9';
const priorEvidenceConfigSha = 'ef31d37c4866588a6e91f4ca644402712f81dd327d2b5d4ddb660d9d21e6d813';
const proposalPath = `${base}/proposed-additive-delta-v1.json`;
const observationPath = `${base}/current-selected-owner-observation-001b1f9.json`;
const sourceStagePath = `${base}/physical-preparation/original-stage-inputs.json`;
const physicalPath = `${base}/physical-preparation/atg-whole-target-physical-20261027/whole-target-support.json`;
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
const jsonBytes = value => Buffer.from(JSON.stringify(canonical(value)) + '\n');
const same = (a, b) => jsonBytes(a).equals(jsonBytes(b));
const need = (ok, message) => { if (!ok) throw new Error(message); };
const localJson = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const reader = pinReader(root);
const pin = (commit, name) => reader.pin(commit, name);
const readJson = pointer => JSON.parse(reader.read(pointer));

const queue = localJson(`${base}/original-queue-record.json`);
const proposalBytes = fs.readFileSync(path.join(root, proposalPath));
const proposal = JSON.parse(proposalBytes);
const observationBytes = fs.readFileSync(path.join(root, observationPath));
const observation = JSON.parse(observationBytes);
const manifest = localJson(`${base}/physical-preparation/source-feature-manifest.json`);
const stage = localJson(sourceStagePath);

need(digest(fs.readFileSync(path.join(root, `${base}/original-queue-record.json`))) === queueSha,
  'Original queue bytes differ');
need(queue.record.package_id === 'gb-ATG-ADM1--repair-evaluation'
  && queue.record.native_cells === 883 && queue.record.land_cells === 883
  && queue.record.inland_water_cells === 0 && queue.record.source_relative_cells === 0
  && queue.record.interval_segments === 288 && queue.record.owners.length === 1
  && queue.record.owners[0] === owner && queue.record.source_families[0] === 12
  && same(queue.record.source_features, [1274,1275,1276,1277,1278,1279,1280]),
  'Frozen queue denominator or owner/source scope differs');
need(proposal.kind === 'atg883-proposed-additive-delta-v1'
  && proposal.target.owner_index === owner && proposal.target.owner_id === targetId
  && proposal.source_contract.primary_source === sourceId
  && proposal.source_contract.original_queue_record_sha256 === queueSha
  && proposal.current_observation.sha256 === digest(observationBytes),
  'Retained candidate proposal or original observation binding differs');
need(observation.original_intervals?.length === 1 && observation.original_intervals[0].block === 28,
  'Complete original block-28 interval input required');

const rowKey = row => [row.y,row.start,row.end_exclusive,row.target_owner_index,row.source_feature_index,row.physical_class].join(':');
const proposedRows = proposal.proposed_addition_rows;
const originalRows = observation.original_intervals.flatMap(block => block.rows.map(([y,start,end,owners,sids,physical]) => ({
  y, start, end_exclusive: end, target_owner_index: owners.length === 1 ? owners[0] : null,
  source_feature_index: sids.length === 1 ? sids[0] : null, physical_class: physical
})));
const ordered = rows => rows.map(rowKey).sort();
need(proposedRows.length === 288 && originalRows.length === 288 && same(ordered(proposedRows), ordered(originalRows)),
  'Proposal intervals differ from retained original 288-segment input');
let cellCount = 0;
for (const row of proposedRows) {
  need(Number.isSafeInteger(row.y) && Number.isSafeInteger(row.start) && Number.isSafeInteger(row.end_exclusive)
    && row.start < row.end_exclusive && row.target_owner_index === owner
    && [1274,1275,1276,1277,1278,1279,1280].includes(row.source_feature_index)
    && row.physical_class === 'land', 'Candidate row changes owner, source member or physical class');
  cellCount += row.end_exclusive - row.start;
}
need(cellCount === 883, 'Candidate key count differs from original denominator');

const sourceProductsPath = 'coordination/engineering/original-geography-source-corpus-20261006/catalogue.json';
const cataloguePin = pin(acceptedMain, sourceProductsPath);
const catalogue = readJson(cataloguePin);
const product = catalogue.products.find(item => item.key === sourceId);
need(product?.feature_count === 8 && product.parts.length === 1
  && product.original_bytes === 26215 && product.original_sha256 === '021f6ca73869807bcb04d3b71ea1f26d630eb11707522ff1a0db5f3d86e40c8d',
  'Complete retained original source-family catalogue differs');
const familyParts = product.parts.map(part => ({...pin(originalSourceCommit, part.path),
  decoded_bytes: part.uncompressed_bytes, decoded_sha256: part.uncompressed_sha256}));
const sourceProductRaw = reader.read(familyParts[0]);
const sourceProduct = JSON.parse((await import('node:zlib')).gunzipSync(sourceProductRaw));
need(sourceProduct.type === 'FeatureCollection' && sourceProduct.features.length === 8,
  'Original complete eight-feature ATG product differs');

const selectorPin = pin(acceptedMain, 'data/ownership-selection.json');
const selection = readJson(selectorPin);
const selected = scientificNativeSelection(selection);
const manifestPin = pin(acceptedMain, selected.manifest_path);
const nativeManifest = readJson(manifestPin);
need(manifestPin.sha256 === selected.sha256 && nativeManifest.size === 262166,
  'Current accepted native manifest differs');
const ownerRosterPin = pin(nativeManifest.original_assets.bounds.commit, nativeManifest.original_assets.bounds.path);
need(ownerRosterPin.sha256 === nativeManifest.original_assets.bounds.sha256,
  'Exact selected native owner roster differs');
const ownerRosterRaw = reader.read(ownerRosterPin);
const ownerRosterDecoded = (await import('node:zlib')).gunzipSync(ownerRosterRaw);
ownerRosterPin.decoded_bytes = ownerRosterDecoded.length;
ownerRosterPin.decoded_sha256 = digest(ownerRosterDecoded);

const targetPartPin = pin(acceptedMain, 'data/geography/part-28.json');
const targetPart = readJson(targetPartPin);
const targetFeatures = targetPart.features.filter(feature => feature.id === targetId || feature.properties?.id === targetId);
need(targetFeatures.length === 1 && targetFeatures[0].id === targetId
  && targetFeatures[0].geometry.type === 'MultiPolygon'
  && same(targetFeatures[0].properties.metadata.source_member_ids, manifest.canonical_target.source_member_ids),
  'Unique current canonical ATG target or complete membership differs');
need(manifest.canonical_target.geometry_sha256 === digest(jsonBytes(targetFeatures[0].geometry)),
  'Stage selected geometry differs from current accepted target');

need(stage.length === 8 && stage.every(member => member.selected.id === targetId),
  'Committed physical stage lacks the exact one-target selected binding');
const physicalPin = pin(physicalCommit, physicalPath);
const physicalProgram = pin(acceptedMain, 'scripts/qualify-source-cohort.py');
const physicalReceipt = readJson(pin(physicalCommit, `${base}/physical-preparation/atg-whole-target-physical-20261027/execution-receipt.json`));
need(physicalPin.sha256 === physicalReceipt.outputs.find(output => output.path === `${base}/physical-preparation/atg-whole-target-physical-20261027/whole-target-support.json`)?.sha256
  && physicalProgram.sha256 === physicalReceipt.program.sha256,
  'Physical result or reproducer code differs from its exact execution receipt');

const patchByY = new Map();
for (const row of proposedRows) {
  const item = patchByY.get(row.y) ?? {y: row.y, runs: []};
  item.runs.push([row.start,row.end_exclusive,owner]); patchByY.set(row.y,item);
}
const nativePatch = {rows: [...patchByY.values()].sort((a,b)=>a.y-b.y).map(row=>({
  y: row.y, runs: row.runs.sort((a,b)=>a[0]-b[0])
}))};
const coverageByY = new Map();
for (const row of proposedRows) {
  const item = coverageByY.get(row.y) ?? {y:row.y,runs:[]};
  item.runs.push([row.start,row.end_exclusive,'mapped_land_support']); coverageByY.set(row.y,item);
}
const coverageRows = [...coverageByY.values()].sort((a,b)=>a.y-b.y).map(row=>({
  y:row.y, runs:row.runs.sort((a,b)=>a[0]-b[0])
}));

const targets = manifest.features.filter(feature => feature.source_feature_index >= 1274 && feature.source_feature_index <= 1280)
  .sort((a,b)=>a.source_feature_index-b.source_feature_index).map(feature => {
    const sourceStage = stage.find(item => item.target === feature.source_id);
    need(sourceStage && same(sourceStage.selected.geometry, targetFeatures[0].geometry),
      `Source member ${feature.source_id} does not select the exact canonical base`);
    return {id:feature.source_id,target_id:targetId,pixelIndex:owner,source_family:sourceId,
      base_geometry:sourceStage.selected.geometry,source_receipt_sha256:physicalPin.sha256,
      coverage_classes:['mapped_land_support'],coverage_rows:coverageRows,territorial_exclusions:[]};
  });
const positiveMemberIds = new Set(manifest.features.filter(feature => feature.source_feature_index >= 1274
  && feature.source_feature_index <= 1280).map(feature => feature.source_id));
need(targets.length === 7 && targets.every(target => positiveMemberIds.has(target.id))
  && !positiveMemberIds.has('gb:ATG:ADM1:74100532B54294973205276'), 'Exactly the original seven positive members required');

const sourceEvidence = {version:1,kind:'source-target-native-evidence-v1',catalogue:cataloguePin,
  owner_roster:ownerRosterPin,physical_evidence:physicalPin,
  physical_input:pin(stageCommit,sourceStagePath),physical_reproduction:physicalProgram,
  families:[{source_id:sourceId,parts:familyParts}],
  source_membership:{index:pin(acceptedMain,'data/world-index.json'),
    lineage:pin(acceptedMain,'data/semantic-report.json'),parts:[targetPartPin]},targets};
const preparationConfig = {version:1,selector:{commit:acceptedMain,path:'data/ownership-selection.json'},source_evidence:sourceEvidence};

fs.mkdirSync(path.join(root,output),{recursive:true});
for (const [name,value] of [['native-patch-v1.json',nativePatch],['source-evidence-config.json',preparationConfig]]) {
  const body = jsonBytes(value), destination = path.join(root,output,name);
  if (fs.existsSync(destination)) {
    const prior = fs.readFileSync(destination);
    if (!prior.equals(body)) {
      need(name === 'source-evidence-config.json' && digest(prior) === priorEvidenceConfigSha,
        `Existing generated body differs: ${name}`);
      const priorConfig = JSON.parse(prior), revised = JSON.parse(body);
      const stripped = structuredClone(revised);
      delete stripped.source_evidence.owner_roster.decoded_bytes;
      delete stripped.source_evidence.owner_roster.decoded_sha256;
      need(same(priorConfig, stripped) && ownerRosterPin.decoded_bytes === 11096191
        && ownerRosterPin.decoded_sha256 === 'a8086008b7a072dd86483720a2a166785229753422769dbbe0749497d870f428',
        'Prior config is not the exact bounded-roster upgrade target');
      fs.writeFileSync(destination, body);
    }
  } else fs.writeFileSync(destination,body,{flag:'wx'});
}
console.log(JSON.stringify({accepted_main:acceptedMain,source_family:sourceId,source_features:targets.length,
  source_family_members:sourceProduct.features.length,redonda_context_members:1,native_patch_rows:nativePatch.rows.length,
  original_intervals:proposedRows.length,original_cells:cellCount,physical_receipt_sha256:physicalPin.sha256,
  physical_program_sha256:physicalProgram.sha256,native_manifest_sha256:manifestPin.sha256,
  owner_roster_sha256:ownerRosterPin.sha256,canonical_target_part_sha256:targetPartPin.sha256,
  output_files:[`${output}/native-patch-v1.json`,`${output}/source-evidence-config.json`]}));
