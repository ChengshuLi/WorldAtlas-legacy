#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = rel => fs.readFileSync(path.join(root, rel));
const json = rel => JSON.parse(read(rel));
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const pin = rel => {const b=read(rel);return {path:rel,bytes:b.length,sha256:sha(b)}};
const assert = (condition, message) => {if(!condition) throw new Error(message)};
const tupleKey = ([x,y,o]) => `${y},${x},${o}`;
const digestTuples = rows => {
  const sorted = rows.map(r=>[...r]).sort((a,b)=>a[1]-b[1]||a[0]-b[0]||a[2]-b[2]);
  return {count:sorted.length,unique:new Set(sorted.map(tupleKey)).size,sha256:sha(Buffer.from(JSON.stringify(sorted)))};
};
const expand = rows => {
  const out=[];
  for(const row of rows) for(const [start,end,owner] of row.runs)
    for(let x=start;x<end;x++) out.push([x,row.y,owner]);
  return out;
};
const pp='physical-preparation-002/';
const np='native-preparation-003/';
const frozen=json(pp+'frozen-queue-record.json');
const queue=frozen.record;
const audit=json(pp+'input-assembly-audit.json');
const obs=json(pp+'owner-observation.json');
const patch=json(pp+'original-native-patch.json');
const sourceTargets=json(pp+'source-targets.json');
const source=json('source-evidence-003/source-evidence.json');
const diag=json('native-diagnostic-003/native-diagnostic.json');
const ctor=json('native-authority-001/constructor-result.json');
const whole=json(pp+'whole-target-support.json');
const center=json(pp+'center-physical-application.json');

const original=[]; const ownerToSource=new Map(); const sourceToOwner=new Map(); let intervalCount=0;
for(const block of obs.original_intervals){
  for(const row of block.rows){
    intervalCount++;
    const [y,x0,x1,owners,features,klass]=row;
    assert(klass==='land'&&x1>x0&&owners.length===1&&features.length===1,'unexpected original interval schema/class');
    const owner=owners[0], feature=features[0];
    assert(!ownerToSource.has(owner)||ownerToSource.get(owner)===feature,'owner maps to multiple original source features');
    assert(!sourceToOwner.has(feature)||sourceToOwner.get(feature)===owner,'source feature maps to multiple owners');
    ownerToSource.set(owner,feature); sourceToOwner.set(feature,owner);
    for(let x=x0;x<x1;x++) original.push([x,y,owner]);
  }
}
const patchRows=expand(patch.rows);
const observed=obs.keys.map(k=>[k.x,k.y,ownerToSource.get(k.owner_id ?? k.effective_selected_owner) ?? null]);
// The owner observation is a coordinate query; its owner_id is null and effective_selected_owner is zero.
// Compare its coordinate set independently; owner attribution comes from original intervals, not the current E observation.
const observedCoords=obs.keys.map(k=>[k.x,k.y,0]);
const originalCoords=original.map(([x,y])=>[x,y,0]);
const diagnostic=expand(diag.supported_rows);
const ctorRows=ctor.ledger_rows.flatMap(r=>expand(r.native_rows));
const targetByPixel=new Map(sourceTargets.map(r=>[r.pixelIndex,r.target_id]));
const targetsByCtor=ctor.ledger_rows.map(r=>({target_id:r.target_id,pixelIndex:r.pixelIndex,native_cells:r.native_cells}));
const originalDigest=digestTuples(original), patchDigest=digestTuples(patchRows), diagDigest=digestTuples(diagnostic), ctorDigest=digestTuples(ctorRows);
const coordinateDigest=digestTuples(originalCoords), observedDigest=digestTuples(observedCoords);
const keyset = rows => new Set(rows.map(tupleKey));
const sameSet=(a,b)=>{const A=keyset(a),B=keyset(b); return A.size===B.size&&[...A].every(x=>B.has(x));};
assert(queue.package_id==='gb-MHL-ADM1--repair-evaluation'&&queue.land_cells===1019&&queue.interval_segments===456&&queue.source_family_index===210,'queue scope mismatch');
assert(queue.owners.length===18&&queue.source_features.length===18&&queue.native_cells===1019,'queue denominator mismatch');
assert(intervalCount===456&&original.length===1019&&originalDigest.unique===1019,'original interval expansion mismatch');
assert(ownerToSource.size===18&&sourceToOwner.size===18&&[...ownerToSource.keys()].every(o=>queue.owners.includes(o)),'positive owner/source mapping mismatch');
assert(patchDigest.count===1019&&patchDigest.unique===1019&&sameSet(original,patchRows),'patch is not exact original owner-key set');
assert(observedDigest.count===1019&&observedDigest.unique===1019&&sameSet(originalCoords,observedCoords),'literal observer coordinates do not match original keys');
assert(obs.keys.every(k=>k.effective_selected_owner===0&&k.base_owner===null&&k.accepted_additive_owner===null),'observer has nonzero current owner or non-null base/additive owner');
assert(diag.requested_cells===1019&&diag.supported_cells===1019&&diag.held_cells===0&&sameSet(patchRows,diagnostic),'diagnostic differs from exact original patch');
assert(ctor.kind==='existing-source-target-native-constructor-result'&&ctor.ledger_rows.length===18&&sameSet(patchRows,ctorRows),'constructor rows differ from exact original patch');
assert(ctor.ledger_rows.every(r=>r.disposition==='assigned'&&r.target_id in Object.fromEntries(sourceTargets.map(t=>[t.target_id,true]))),'constructor target binding mismatch');
assert(ctor.ledger_rows.every(r=>targetByPixel.get(r.pixelIndex)===r.target_id),'constructor pixel/target binding mismatch');
assert(ctor.ledger_rows.reduce((a,r)=>a+r.native_cells,0)===1019,'constructor native cell count mismatch');
assert(source.targets.length===18&&source.families.length===1&&source.families[0].source_id==='gb:MHL:ADM1','source evidence target/family mismatch');
assert(audit.complete_original_family.feature_count===24&&audit.complete_original_family.context_only_count===6&&audit.complete_original_family.positive_ids.length===18,'complete family context mismatch');
assert(whole.results.length===18&&whole.results.reduce((n,r)=>n+r.issues.length,0)===14,'whole-target physical issue inventory mismatch');
assert(center.original_tuple_count===1019&&center.source_member_count===18&&center.separate_companion_source_relative_members_excluded===6,'center application original-scope binding mismatch');
assert(center.center_application.source_geometry_center_cover_count===1019&&center.center_application.physical_support_center_counts.mapped_land_support===1019&&center.center_application.physical_support_center_counts.mapped_inland_water_support===0&&center.center_application.issue_contact_point_count===0&&center.center_application.unique_original_keys_with_issue_contact===0,'center application predicate counts mismatch');
assert(center.whole_target_physical.targets_with_issues===9&&center.whole_target_physical.issues_by_reason.missing_reconstruction===5&&center.whole_target_physical.issues_by_reason.extra_reconstruction===9,'whole-target physical issues were changed or omitted');

const paths={
  frozen_queue:pin(pp+'frozen-queue-record.json'),
  assembly_audit:pin(pp+'input-assembly-audit.json'),
  original_intervals_owner_observation:pin(pp+'owner-observation.json'),
  original_patch:pin(pp+'original-native-patch.json'),
  source_targets:pin(pp+'source-targets.json'),
  physical_whole_target:pin(pp+'whole-target-support.json'),
  physical_center_application:pin(pp+'center-physical-application.json'),
  source_evidence:pin('source-evidence-003/source-evidence.json'),
  source_evidence_config:pin('source-evidence-003-config.json'),
  native_diagnostic:pin('native-diagnostic-003/native-diagnostic.json'),
  native_diagnostic_config:pin('native-diagnostic-003-config.json'),
  native_constructor_result:pin('native-authority-001/constructor-result.json'),
  native_authority_binding:pin('native-authority-001/authority-binding.json'),
  native_rule_preimage:pin('native-authority-001/original-rule-preimage.json'),
  native_authority_config:pin('native-authority-001-config.json')
};
const result={
  version:1,
  kind:'mhl1019-original-key-conservation-v1',
  status:'preparation-only; constructor/diagnostic succeeded, no final-bank result, acceptance, or credit claimed',
  scope:{package_id:queue.package_id,original_queue_commit:frozen.pin.commit,source_family:queue.primary_source,source_family_index:queue.source_family_index,native_cells:queue.native_cells,land_cells:queue.land_cells,inland_water_cells:queue.inland_water_cells,source_relative_cells:queue.source_relative_cells,interval_segments:queue.interval_segments,positive_owners:queue.owners.length,positive_source_features:queue.source_features.length,native_blocks:queue.native_blocks},
  original_key_set:{interval_count:intervalCount,cell_count:originalDigest.count,unique_count:originalDigest.unique,owner_x_y_tuple_sha256:originalDigest.sha256},
  exact_conservation:{
    patch:{...patchDigest,exactly_equals_original_owner_x_y:true},
    literal_selected_owner_observation:{query_count:obs.query_count,query_sha256:obs.query_sha256,coordinate_tuple_sha256:observedDigest.sha256,exactly_equals_original_coordinate_set:true,effective_selected_owner_values:[...new Set(obs.keys.map(k=>k.effective_selected_owner))],base_owner_values:[...new Set(obs.keys.map(k=>k.base_owner))],accepted_additive_owner_values:[...new Set(obs.keys.map(k=>k.accepted_additive_owner))]},
    native_diagnostic:{requested_cells:diag.requested_cells,supported_cells:diag.supported_cells,held_cells:diag.held_cells,supported_tuple_sha256:diagDigest.sha256,exactly_equals_original_owner_x_y:true},
    native_constructor:{kind:ctor.kind,targets:ctor.ledger_rows.length,native_cells:ctor.ledger_rows.reduce((a,r)=>a+r.native_cells,0),tuple_sha256:ctorDigest.sha256,exactly_equals_original_owner_x_y:true,target_bindings:targetsByCtor}
  },
  source_family:{source_id:'gb:MHL:ADM1',complete_original_family_features:24,positive_targets:18,context_only_targets:audit.complete_original_family.context_only_ids,companion_physical_interpretation_cells:4110,companion_included:false,current_selected_part:audit.current_membership.part,source_current_geometry_differences:audit.current_membership.source_to_current_geometry_differences},
  source_rights_and_evidence_limits:{source:'geoBoundaries MHL ADM1 simplified release; represented-year claim 2017 as recorded; source OpenStreetMap, Wambacher; canonical boundary Unknown; ODbL 1.0 attribution/license preserved',rights:'No independent rights-compliance certification; no outreach, settlement/population import, alternate gated source, or access-control bypass.',geometry:'2017 source geometries and selected current part-15 target geometries remain distinct. Source-to-owner joins are recorded lineage, not legal-boundary authentication.',physical:{whole_target_issues:14,missing_issues:5,extra_issues:9,affected_targets:9,exact_centers:1019,center_contacts_with_recorded_issues:0,center_support:'all original centers within corresponding source feature and mapped-land support; zero mapped-water/outside-L1/hierarchy/contradictory/issue-center contacts',qualification_limit:'Center contacts do not erase whole-target physical issues or establish whole-parent/current legal certification.'},native:'The existing source-target constructor is candidate preparation. Its result is not a final selected-bank patch or root acceptance.'},
  checks:{original_interval_expansion:true,original_patch_equality:true,observer_coordinate_equality:true,diagnostic_supported_equality:true,constructor_native_row_equality:true,one_to_one_positive_owner_source_target_binding:true,complete_24_feature_family_preserved:true},
  inputs:paths
};
const output=path.join(here,'original-key-conservation.json');
fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({output,bytes:fs.statSync(output).size,sha256:sha(fs.readFileSync(output)),original:originalDigest,patch:patchDigest,observer:observedDigest,diagnostic:diagDigest,constructor:ctorDigest,owners:ownerToSource.size,features:sourceToOwner.size,targets:ctor.ledger_rows.length,wholeTargetIssues:whole.results.reduce((n,r)=>n+r.issues.length,0)},null,2));
