/* Prepare exact Mary143 source-evidence and native-diagnostic inputs from pinned source/current roles. */
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {pinReader} from '../../../../scripts/prepare-delivery-handoff.mjs';
const [ROOT,OUT]=process.argv.slice(2),need=(v,m)=>{if(!v)throw Error(m)},sha=b=>createHash('sha256').update(b).digest('hex');
const root=fs.realpathSync(ROOT);need(root===ROOT,'canonical repo root required');const reader=pinReader(root);
const ACCEPTED='c61bfd2e6fda1eb6483f913b647a2808f6efcc5e';
const STAGE_COMMIT='1ddddf52ca62de5f5de0789c0eb28961741da2ed';
const PHYSICAL_COMMIT='6bd16a304b06ebbfbca943604066b0667cdad539';
const SOURCE='gb:TKM:ADM2:10190150B47066979897930', FAMILY='gb:TKM:ADM2', OWNER=42143;
const BASE='coordination/engineering/tkm-mary143-physical-001';
const dest=path.join(root,OUT);need(fs.statSync(path.dirname(dest)).isDirectory()&&!fs.existsSync(dest),'destination must be fresh');fs.mkdirSync(dest,{recursive:true});
const pin=(commit,p)=>reader.pin(commit,p),json=(commit,p)=>JSON.parse(reader.read(pin(commit,p)));
const selectorPin=pin(ACCEPTED,'data/ownership-selection.json'),selector=json(ACCEPTED,selectorPin.path);
const indexPin=pin(ACCEPTED,selector.prepared_bank.path),index=JSON.parse(reader.read(indexPin));
need(selector.native_selection.sha256==='d9954fa51d18e4ce785679f920e4b6ac1ebd3cf07ce03fa7e7e674cb2a42faba'&&index.preparedOwnership.owners===49625,'accepted current native selection changed');
const manifest=json(ACCEPTED,selector.native_selection.manifest_path),manifestPin=pin(ACCEPTED,selector.native_selection.manifest_path);
need(index.native_manifest_sha256===manifestPin.sha256&&manifestPin.sha256===selector.native_selection.sha256,'native manifest binding changed');
const ownerPin=pin(manifest.original_assets.bounds.commit,manifest.original_assets.bounds.path),ownerRaw=reader.read(ownerPin),ownerDecoded=gunzipSync(ownerRaw);
need(sha(ownerRaw)===manifest.original_assets.bounds.sha256,'owner roster encoded identity changed');
const ownerRoster={...ownerPin,encoding:'gzip',decoded_bytes:ownerDecoded.length,decoded_sha256:sha(ownerDecoded)};
const ownerPart=index.preparedOwnership.context_parts.find(p=>OWNER-1>=p.offset&&OWNER-1<p.offset+p.features);need(ownerPart,'accepted owner context missing');
const contextRaw=gunzipSync(reader.read(pin(ACCEPTED,path.posix.join(path.posix.dirname(selector.prepared_bank.path),ownerPart.path))),{maxOutputLength:ownerPart.decoded_bytes});
need(contextRaw.length===ownerPart.decoded_bytes&&sha(contextRaw)===ownerPart.decoded_sha256,'accepted Mary context body changed');
const selectedOwner=JSON.parse(contextRaw.toString('utf8'))[OWNER-1-ownerPart.offset];
need(selectedOwner?.id===SOURCE&&selectedOwner.pixelIndex===OWNER,'current selected owner identity differs');
const partPin=pin(ACCEPTED,'data/geography/part-23.json'),part=json(ACCEPTED,partPin.path);
const targetFeature=part.features.find(f=>f.id===SOURCE),sibling=part.features.find(f=>f.id==='gb:TKM:ADM2:10190150B21853413573592');
need(targetFeature&&sibling&&targetFeature.properties?.id===SOURCE&&sibling.properties?.id==='gb:TKM:ADM2:10190150B21853413573592','direct Mary/sibling identities missing');
const stagePin=pin(STAGE_COMMIT,`${BASE}/original-stage-inputs.json`),stages=json(STAGE_COMMIT,stagePin.path);
need(stages.length===1&&stages[0].target===SOURCE&&stages[0].selected?.id===SOURCE&&stages[0].consumed?.properties?.shapeID==='10190150B47066979897930','physical-stage role changed');
need(JSON.stringify(stages[0].selected.geometry)===JSON.stringify(targetFeature.geometry),'stage selected geometry differs from accepted current target');
const physicalPath=`${BASE}/result-001/whole-target-support.json`,physicalPin=pin(PHYSICAL_COMMIT,physicalPath),physical=json(PHYSICAL_COMMIT,physicalPath);
need(physical.results.length===1&&physical.results[0].target===SOURCE&&physical.results[0].issues.length===0,'physical support not complete/no-issue');
const appPath='/workspace/shared/worldatlas-TKM1759-qualification-20261026/.private/full-simplified-exact-center-application-v2.json';
const app=JSON.parse(fs.readFileSync(appPath,'utf8')),rows=app.per_key.filter(k=>k.owner===OWNER).sort((a,b)=>a.y-b.y||a.x-b.x);
need(rows.length===143&&rows.every(k=>k.physical==='land'&&k.candidate_source_ids.includes(SOURCE)&&k.full.includes(SOURCE)&&k.simplified.includes(SOURCE)&&!k.full_boundary_tie&&!k.simplified_boundary_tie),'original Mary key/source application changed');
const pairs=rows.map(k=>`${OWNER}\t${k.y}\t${k.x}\n`).join('');need(sha(Buffer.from(pairs))==='56bf20f91b3e2a1c08065469f180b2907b21d7661a995854eb8666ce2daa3ad8','Mary tuple commitment differs');
const byY=new Map();for(const k of rows){const a=byY.get(k.y)??[];a.push([k.x,k.x+1,'mapped_land_support']);byY.set(k.y,a);}
const requested=[...byY].map(([y,runs])=>({y,runs}));
const catalogPin=pin(ACCEPTED,'coordination/engineering/original-geography-source-corpus-20261006/catalogue.json'),catalog=json(ACCEPTED,catalogPin.path),product=catalog.products.find(p=>p.key===FAMILY);
need(product?.feature_count===59&&product.parts.length===1,'complete simplified TKM family absent');
const familyParts=product.parts.map(p=>({...pin(ACCEPTED,p.path),decoded_bytes:p.uncompressed_bytes,decoded_sha256:p.uncompressed_sha256}));
const world=pin(ACCEPTED,'data/world-index.json'),lineage=pin(ACCEPTED,'data/semantic-report.json'),projectionPin=pin(ACCEPTED,'data/macro-foundation/world-review-projection.json'),projection=json(ACCEPTED,projectionPin.path);
const cohortParts=projection.location_parts.map(p=>pin(ACCEPTED,'data/'+p));
const target={id:SOURCE,target_id:SOURCE,pixelIndex:OWNER,base_geometry:targetFeature.geometry,source_family:FAMILY,
 source_receipt_sha256:physicalPin.sha256,coverage_classes:['mapped_land_support'],coverage_rows:requested,territorial_exclusions:[]};
const sourceConfig={version:1,compact_territorial_exclusions:true,territorial_exclusion_families:['gb:AFG:ADM1','gb:KAZ:ADM1','gb:UZB:ADM1'],
 selector:{commit:ACCEPTED,path:'data/ownership-selection.json'},
 source_evidence:{version:1,kind:'source-target-native-evidence-v1',owner_roster:ownerRoster,catalogue:catalogPin,
  families:[{source_id:FAMILY,parts:familyParts}],physical_evidence:physicalPin,physical_input:stagePin,
  physical_reproduction:pin(ACCEPTED,'scripts/qualify-source-cohort.py'),
  source_membership:{index:world,lineage,parts:[partPin],cohort_inventory:{index:projectionPin,parts:cohortParts}},targets:[target]}};
const patch={rows:requested.map(({y,runs})=>({y,runs:runs.map(([a,b])=>[a,b,OWNER])}))};
const out={version:1,source_evidence:{commit:PHYSICAL_COMMIT,path:`${BASE}/source-evidence-001/source-evidence.json`},native_patch:{commit:PHYSICAL_COMMIT,path:`${BASE}/native-diagnostic-001/native-patch-input.json`}};
for(const [name,value] of [['source-evidence-config.json',sourceConfig],['native-patch-input.json',patch],['native-diagnostic-config.json',out]]){
 const bytes=Buffer.from(JSON.stringify(value)+'\n');fs.writeFileSync(path.join(dest,name),bytes,{flag:'wx'});
}
const result={version:1,kind:'TKM Mary143 native diagnostic input preparation',accepted_commit:ACCEPTED,selector:selectorPin,prepared_index:indexPin,native_manifest:manifestPin,target:{id:SOURCE,pixelIndex:OWNER,accepted_geometry_points:targetFeature.geometry.coordinates[0].length,sibling_id:sibling.id,sibling_pixelIndex:42130},source:{source_family:FAMILY,full_original_stage_points:stages[0].consumed.geometry.coordinates[0].length,simplified_complete_feature_count:product.feature_count,full_simplified_exact_center_application_sha256:'e7b49e43f8df1427e8ec03e669302e9f988d90cb4139d9f4f1016afd5527c09c',exact_keys:rows.length,keyset_sha256:'56bf20f91b3e2a1c08065469f180b2907b21d7661a995854eb8666ce2daa3ad8',coverage_rows:requested.length},physical:{pin:physicalPin,issues:physical.results[0].issues.length},foreign_families:sourceConfig.territorial_exclusion_families,outputs:Object.fromEntries(['source-evidence-config.json','native-patch-input.json','native-diagnostic-config.json'].map(name=>{const bytes=fs.readFileSync(path.join(dest,name));return[name,{bytes:bytes.length,sha256:sha(bytes)}]})),limits:['Input patch is a request generated from original exact candidate tuples, not authority or an additive published bank.','Physical execution and original center application remain separate evidence inputs; the native diagnostic still determines per-cell support and hold state.','The source stage preserves raw original consumed geometry and exact accepted current target selected geometry as separate roles.']};
fs.writeFileSync(path.join(dest,'preparation-receipt.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({destination:OUT,...result.outputs,key_count:rows.length,foreign_families:sourceConfig.territorial_exclusion_families}));
