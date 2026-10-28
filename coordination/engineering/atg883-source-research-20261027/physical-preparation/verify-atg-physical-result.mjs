import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

const root = process.cwd();
const dir = 'coordination/engineering/atg883-source-research-20261027/physical-preparation';
const resultDir = `${dir}/atg-whole-target-physical-20261027`;
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
const shaJson = value => sha(Buffer.from(JSON.stringify(canonical(value)) + '\n'));
const read = name => fs.readFileSync(path.join(root, name));
const json = name => JSON.parse(read(name));
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const expect = (ok, message) => { if (!ok) throw new Error(message); };

const pinned = [
  [`${dir}/original-stage-inputs.json`, '233bf1b48c74fbe4b9392c24272f66f65a0fbbe8b6e4b6ccfc36aff830c3556e'],
  [`${dir}/physical-config.json`, 'a221ee9bc47d81b221952a24a46e5352c4e1d9709ae3bbabf59306837689d620'],
  [`${resultDir}/whole-target-support.json`, '79e29a1c57df93a42a318119f34ca60c8ed000e946c12424fcb5f879109983a9'],
  [`${resultDir}/execution-receipt.json`, '0e62777446a28aa0d63d822776869561546901cf63b9216d38efafac3a65ef92'],
  [`${resultDir}/preparation.json`, '5ecb60b80c81e7c46a392715ed386bc5636ab76252677b864dfa269cf5691a63'],
];
for (const [name, digest] of pinned) expect(sha(read(name)) === digest, `Whole body hash differs: ${name}`);

const stage = json(`${dir}/original-stage-inputs.json`);
const manifest = json(`${dir}/source-feature-manifest.json`);
const config = json(`${dir}/physical-config.json`);
const product = json(`${resultDir}/whole-target-support.json`);
const execution = json(`${resultDir}/execution-receipt.json`);
const preparation = json(`${resultDir}/preparation.json`);

expect(stage.length === 8 && manifest.features.length === 8, 'Complete eight-member original roster required');
expect(equal(manifest.features.map(f => f.source_id).sort(), stage.map(s => s.target).sort()), 'Stage/manifest member roster differs');
expect(equal(manifest.features.map(f => f.source_id).sort(), manifest.canonical_target.source_member_ids.slice().sort()),
  'Accepted target source-member inventory differs');
expect(equal(manifest.features.filter(f => f.role.startsWith('positive source member')).map(f => f.source_feature_index).sort((a,b)=>a-b),
  [1274,1275,1276,1277,1278,1279,1280]), 'Original seven positive members changed');
expect(manifest.features.find(f => f.source_feature_index === 1273)?.role.includes('context only')
  && manifest.features.find(f => f.source_feature_index === 1273)?.name === 'Redonda', 'Redonda exclusion changed');
expect(stage.every(s => s.selected.id === 'atlas:territory:ATG'
  && shaJson(s.selected.geometry) === manifest.canonical_target.geometry_sha256
  && s.consumed?.properties?.shapeID === s.target.slice('gb:ATG:ADM1:'.length)),
  'Source-member consumed inputs or canonical selected target differ');

const targetIds = stage.map(s => s.target).sort();
expect(product.results.length === 8 && equal(product.results.map(r => r.target).sort(), targetIds), 'Physical result is incomplete or has foreign member targets');
const relations = product.results.flatMap(r => r.query_relations);
expect(relations.length === 33 && relations.every(q => q.status === 'checked'), 'All 33 actual source queries must remain checked');
const byFeature = new Map(manifest.features.map(f => [f.source_id, f.source_feature_index]));
const issues = product.results.flatMap(result => result.issues.map(issue => ({feature: byFeature.get(result.target), reason: issue.reason})));
const issueRows = issues.map(i => `${i.feature}:${i.reason}`).sort();
expect(equal(issueRows, ['1273:extra_reconstruction','1279:extra_reconstruction','1279:missing_reconstruction']),
  'Complete adverse physical issue roster differs');
expect(product.results.filter(r => byFeature.get(r.target) >= 1274).filter(r => r.issues.length).length === 1,
  'Positive member physical issues were omitted or broadened');
expect(product.source_member.record_count === 188612 && product.source_metadata_receipts.length === 18,
  'Complete retained physical source indexes differ');
expect(product.runtime.shapely === '2.1.2' && product.runtime.geos === '3.13.1'
  && product.elapsed_seconds < config.physical.resources.deadline_seconds,
  'Physical runtime or cooperative observation differs');

expect(preparation.binding.phase === 'physical'
  && preparation.binding.config_sha256 === sha(read(`${dir}/physical-config.json`))
  && preparation.binding.program_sha256 === execution.program.sha256,
  'Outer producer binding differs');
expect(execution.complete === true && execution.program.path === 'scripts/qualify-source-cohort.py'
  && execution.inputs.length === 25 && execution.fresh_admission.runtime_files.length === 209,
  'Fresh execution receipt is incomplete');
expect(execution.fresh_admission.config_sha256 === shaJson(config.physical), 'Physical phase configuration hash differs');
const inputByPath = new Map(execution.inputs.map(pin => [pin.path, pin]));
expect(inputByPath.size === config.physical.inputs.length && config.physical.inputs.every(pin => {
  const actual = inputByPath.get(pin.path);
  return actual && actual.commit === pin.commit && actual.bytes === pin.bytes && actual.sha256 === pin.sha256;
}), 'Physical input consumption differs from the full configured inventory');
expect(equal(execution.fresh_admission.runtime_files, config.runtime_inventory.files),
  'Runtime admission differs from the committed file identities');
expect(execution.outputs.length === 1 && execution.outputs[0].sha256 === sha(read(`${resultDir}/whole-target-support.json`)),
  'Raw whole-target support output is not bound by its producer receipt');
expect(fs.statSync(path.join(root, `${resultDir}/whole-target-support.json`)).size
  + fs.statSync(path.join(root, `${resultDir}/execution-receipt.json`)).size
  <= config.physical.resources.output_bytes, 'Actual producer output exceeds its declared byte budget');

console.log(JSON.stringify({stage_rows: stage.length, positive_members: 7, context_only_redonda: 1,
  unique_atlas_targets: 1, physical_source_records: product.source_member.record_count,
  source_metadata_fragments: product.source_metadata_receipts.length, query_relations: relations.length,
  checked_relations: relations.filter(q => q.status === 'checked').length,
  issue_rows: issueRows, physical_output_bytes: read(`${resultDir}/whole-target-support.json`).length,
  execution_receipt_bytes: read(`${resultDir}/execution-receipt.json`).length,
  elapsed_seconds: product.elapsed_seconds, source_relative_only: true}));
