// Prepare an exact full-original MNE1336 native diagnostic request using the
// repository's existing source-evidence and native-authority consumers.
// This creates inputs only; it does not qualify, emit authority, or claim credit.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';

const [repo, baseline, stageCommit, physicalCommit, outDir] = process.argv.slice(2);
const need = (v, m) => { if (!v) throw Error(m); };
const sha = b => createHash('sha256').update(b).digest('hex');
need(process.argv.length === 7 && /^[a-f0-9]{40}$/.test(baseline)
  && /^[a-f0-9]{40}$/.test(stageCommit) && /^[a-f0-9]{40}$/.test(physicalCommit),
  'Exact repository/baseline/stage/physical commits and output required');
const original = JSON.parse(fs.readFileSync('/workspace/shared/.worldatlas-MNE1336-original-keys.private.json'));
const joins = JSON.parse(fs.readFileSync('/workspace/shared/worldatlas-MNE1336-exact-scope-recovery-receipt-v3-20261027.json'));
const foreign = JSON.parse(fs.readFileSync('/workspace/shared/.mne3-albania-adverse-keys.private.json'));
const physicalSummary = JSON.parse(fs.readFileSync('/workspace/shared/worldatlas-MNE1336-whole-target-physical-receipt-20261027.json'));
const issueCenters = JSON.parse(fs.readFileSync('/workspace/shared/worldatlas-MNE1336-physical-issue-center-intersections-20261027.json'));
need(original.package_id === 'gb-MNE-ADM1--repair-evaluation' && original.tuples.length === 1336
  && original.scope.cells === 1336 && original.scope.interval_segments === 599, 'Original exact MNE scope differs');
need(joins.owner_target_join.length === 16 && foreign.held_keys.length === 3
  && physicalSummary.scope.all_16_original_targets_checked === true
  && issueCenters.results.length === 4
  && issueCenters.results.every(r => r.counts.cells === 0), 'Retained MNE source/physical custody incomplete');

const {pinReader} = await import(pathToFileURL(path.join(repo, 'scripts/prepare-delivery-handoff.mjs')));
const reader = pinReader(repo), pins = new Map();
function pin(commit, name) {
  const value = reader.pin(commit, name); pins.set(`${commit}:${name}`, value); return value;
}
function json(commit, name) { return reader.json(pin(commit, name)); }
const cataloguePath = 'coordination/engineering/original-geography-source-corpus-20261006/catalogue.json';
const catalogue = json(baseline, cataloguePath);
const source = catalogue.products.find(p => p.key === 'gb:MNE:ADM1');
const part = item => ({...pin(baseline, item.path), decoded_bytes: item.uncompressed_bytes,
  decoded_sha256: item.uncompressed_sha256});
need(source?.feature_count === 23 && source.original_sha256 === 'c9afe5300b402f75cf13b5d65341d849afd631af32b220be3f74c883cab36833',
  'Retained 2017 MNE original source differs');
const sourceParts = source.parts.map(part);

const stagePath = 'coordination/engineering/mne1336-qualification-20261027/physical-preparation/original-stage-inputs.json';
const physicalStage = json(physicalCommit, stagePath);
const nativeStagePath = 'coordination/engineering/mne1336-qualification-20261027/native-preparation/original-native-inputs.json';
const stage = json(stageCommit, nativeStagePath);
need(Array.isArray(stage) && stage.length === 16 && physicalStage.length === 16,
  'Exact MNE source/physical stage target set differs');
need(stage.every((item,i)=>item.target===physicalStage[i].target
  && JSON.stringify(item.consumed)===JSON.stringify(physicalStage[i].consumed)),
  'Native input does not preserve exact physical consumed source members');
const physicalPath = 'coordination/engineering/mne1336-qualification-20261027/physical-001/whole-target-support.json';
const physicalPin = pin(physicalCommit, physicalPath);
need(physicalPin.sha256 === physicalSummary.outputs.whole_target_support_sha256,
  'Committed MNE physical output differs from its receipt');
const canonicalPartPin = pin(baseline,'data/geography/part-15.json');
const canonicalPartValue = reader.json(canonicalPartPin);
const canonicalById = new Map(canonicalPartValue.features.map(f=>[f.id,f]));

// Convert the exact private original key intervals into ordinary native request
// and class-completeness rows; do not use the private raster as a new owner map.
const patchRuns = new Map(), classes = new Map(); let sourceCells = 0;
for (const [y, start, end, owners, sids, klass] of original.rows) {
  need(owners.length === 1 && sids.length > 0 && ['land', 'inland-water'].includes(klass), 'Malformed original interval');
  const owner = owners[0], run = [start, end, owner], prior = patchRuns.get(y) ?? [];
  prior.push(run);
  patchRuns.set(y, prior); sourceCells += end - start;
  const type = klass === 'land' ? 'mapped_land_support' : 'mapped_inland_water_support';
  const kinds = classes.get(owner) ?? new Map(), byY = kinds.get(type) ?? new Map(), rr = byY.get(y) ?? [];
  rr.push([start, end, type]);
  byY.set(y, rr); kinds.set(type, byY); classes.set(owner, kinds);
}
need(sourceCells === 1336, 'Original source row denominator differs');
for (const [y, runs] of patchRuns) {
  runs.sort((a,b)=>a[0]-b[0] || a[1]-b[1] || a[2]-b[2]);
  const merged=[];
  for (const run of runs) {
    need(!merged.length || merged.at(-1)[1] <= run[0], 'Overlapping original native request intervals');
    const last=merged.at(-1);
    if(last&&last[1]===run[0]&&last[2]===run[2])last[1]=run[1];else merged.push([...run]);
  }
  patchRuns.set(y,merged);
}
for (const kinds of classes.values()) for (const byY of kinds.values()) for (const [y, runs] of byY) {
  runs.sort((a,b)=>a[0]-b[0] || a[1]-b[1] || a[2].localeCompare(b[2]));
  const merged=[];
  for(const run of runs){
    need(!merged.length||merged.at(-1)[1]<=run[0],'Overlapping original land/water class intervals');
    const last=merged.at(-1);
    if(last&&last[1]===run[0]&&last[2]===run[2])last[1]=run[1];else merged.push([...run]);
  }
  byY.set(y,merged);
}
const nativePatch = {rows: [...patchRuns].sort((a,b)=>a[0]-b[0]).map(([y,runs])=>({y,runs}))};
const targets = stage.map(item => {
  // The existing stage selected identity is authoritative; join it by exact target ID
  // to the original receipt, never infer from a display name.
  const targetId = item.target;
  const join = joins.owner_target_join.find(r => r.id === targetId);
  const selected = canonicalById.get(targetId);
  need(join && item.selected?.id === targetId && item.consumed?.properties?.shapeID
    && targetId === `gb:MNE:ADM1:${item.consumed.properties.shapeID}`, 'Exact original source/current owner stage join differs');
  const owner = join.index, byClass = classes.get(owner);
  need(byClass && selected && JSON.stringify(item.selected.geometry)===JSON.stringify(selected.geometry),
    'Target lacks exact original native source rows or selected base geometry');
  const coverageRows = [];
  for (const [kind, rows] of byClass) for (const [y, runs] of rows) coverageRows.push({kind, y, runs});
  coverageRows.sort((a,b)=>a.y-b.y || a.kind.localeCompare(b.kind));
  const grouped = [];
  for (const r of coverageRows) {
    let row = grouped.find(x => x.y === r.y);
    if (!row) { row={y:r.y,runs:[]}; grouped.push(row); }
    row.runs.push(...r.runs);
  }
  for (const row of grouped) row.runs.sort((a,b)=>a[0]-b[0]);
  return {id:targetId,target_id:targetId,pixelIndex:owner,base_geometry:selected.geometry,
    source_family:'gb:MNE:ADM1',source_receipt_sha256:physicalPin.sha256,
    coverage_classes:[...byClass.keys()].sort(),coverage_rows:grouped,territorial_exclusions:[]};
});
need(targets.length === 16 && new Set(targets.map(t=>t.pixelIndex)).size === 16, 'Exact 16-owner target binding differs');

const worldIndex = pin(baseline,'data/world-index.json');
const lineage = pin(baseline,'data/semantic-report.json');
const canonicalPart = canonicalPartPin;
const physicalInput = pin(stageCommit,nativeStagePath);
const physicalMethod = pin(baseline,'scripts/qualify-source-cohort.py');
const sourceEvidence = {version:1,kind:'source-target-native-evidence-v1',catalogue:pin(baseline,cataloguePath),
  families:[{source_id:'gb:MNE:ADM1',parts:sourceParts}],physical_evidence:physicalPin,
  physical_input:physicalInput,physical_reproduction:physicalMethod,
  source_membership:{index:worldIndex,lineage,parts:[canonicalPart]},targets,
  // The selector's v2 native manifest binds this exact original identity/parent
  // context object. Pass the same pin under the consumer's required owner_roster
  // role rather than substituting a newly synthesized owner list.
  owner_roster:pin('913db0624b8aa79b188ff17a7f5c4ae0c0f63965','data/canonical-grid/bounds.json.gz')};
const config = {version:1,selector:{commit:baseline,path:'data/ownership-selection.json'},source_evidence:sourceEvidence,
  compact_territorial_exclusions:true,territorial_exclusion_families:['gb:ALB:ADM1']};
const account = {version:1,kind:'mne1336-exact-native-diagnostic-preparation',baseline,stage_commit:stageCommit,
  physical_commit:physicalCommit,package_id:original.package_id,original_cells:1336,original_intervals:599,
  target_owners:16,source_family:'gb:MNE:ADM1',source_features_complete:23,
  requested_native_cells:sourceCells,requested_rows:nativePatch.rows.length,
  class_cells:{land:1335,inland_water:1},known_albania_contact_keys:3,
  candidate_without_albania_contacts:1333,whole_target_physical_issue_count:4,
  exact_center_issue_intersections:0,negative_families:['gb:ALB:ADM1'],
  pins:{original_keyset_sha256:sha(fs.readFileSync('/workspace/shared/.worldatlas-MNE1336-original-keys.private.json')),
    source_body_sha256:source.original_sha256,physical_body_sha256:physicalPin.sha256,
    private_physical_overlay_sha256:issueCenters.private_artifact.sha256,
    canonical_mne_part:canonicalPart,world_index:worldIndex,lineage},
  limits:['This request preserves the full original denominator and class labels; 3 Albania contacts remain adverse inputs.','Whole-target physical issues remain in the evidence even where exact requested centres do not intersect their issue geometry.','Preparation and diagnostic are not territorial/legal approval, current-owner verification, final bank acceptance, or credit.','Separate 144 physical-interpretation keys and the one XKX source-conflict key remain outside this 1336 package.']};
fs.mkdirSync(outDir,{recursive:false});
const products={'source-evidence-config.json':config,'native-requested-patch.json':nativePatch,'native-request-accounting.json':account};
const outputs={};
for(const [name,value] of Object.entries(products)) {const b=Buffer.from(JSON.stringify(value)+'\n');fs.writeFileSync(path.join(outDir,name),b,{flag:'wx'});outputs[name]={bytes:b.length,sha256:sha(b)};}
fs.writeFileSync(path.join(outDir,'preparation.json'),JSON.stringify({version:1,complete:true,method_sha256:sha(fs.readFileSync(new URL(import.meta.url))),outputs},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({original_cells:sourceCells,owners:targets.length,source_features:source.feature_count,physical_issue_count:4,files:outputs},null,2));
