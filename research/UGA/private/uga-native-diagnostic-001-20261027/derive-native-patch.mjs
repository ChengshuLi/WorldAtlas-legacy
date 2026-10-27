import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {packageIntervals} from '../../coordination/engineering/global-current-cell-work-queue-20261014/source-batch-intervals.mjs';
import {canonicalNativeJsonChunks} from '../../scripts/native-patch-store.mjs';
const repo=process.cwd();
const git='/Users/chengshuli/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/git';
const env={...process.env,GIT_NO_LAZY_FETCH:'1',GIT_NO_REPLACE_OBJECTS:'1',GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_GLOBAL:'/dev/null',GIT_TERMINAL_PROMPT:'0'};
for(const k of ['GIT_DIR','GIT_WORK_TREE','GIT_INDEX_FILE','GIT_COMMON_DIR','GIT_OBJECT_DIRECTORY','GIT_ALTERNATE_OBJECT_DIRECTORIES']) delete env[k];
const sha=b=>createHash('sha256').update(b).digest('hex');
const gitout=(...args)=>execFileSync(git,args,{cwd:repo,env,maxBuffer:128*1024*1024});
const rawAt=(commit,p)=>{
 const row=gitout('ls-tree','-z',commit,'--',p).toString();
 const m=/^100644 blob ([0-9a-f]{40})\t([^\0]+)\0$/.exec(row);
 if(!m||m[2]!==p) throw Error(`missing ordinary pinned path ${commit}:${p}`);
 const raw=gitout('cat-file','blob',m[1]); return {raw,oid:m[1],bytes:raw.length,sha256:sha(raw)};
};
const checked=(commit,p,bytes,digest)=>{const b=rawAt(commit,p);if(b.bytes!==bytes||b.sha256!==digest)throw Error(`pin mismatch ${p}: ${b.bytes}/${b.sha256}`);return b;};
const dataCommit='23318dd9d70680495138297b9cc1a7533a466200';
const queuePath='coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json';
const queueFile=rawAt(dataCommit,queuePath);
if(queueFile.oid!=='9c9a9bc83627afd3e8435ff4009e39530543bf54'||queueFile.bytes!==1754890)throw Error('frozen queue identity differs');
const queue=JSON.parse(queueFile.raw);
const packageId='gb-UGA-ADM3--repair-evaluation';
const pkg=queue.packages.find(x=>x.package_id===packageId);
if(!pkg||pkg.native_cells!==715||pkg.land_cells!==692||pkg.inland_water_cells!==23||pkg.interval_segments!==466||pkg.location_count!==28||pkg.source_feature_count!==57)throw Error('frozen UGA package scope differs');
function resolveLogical(name){
 const direct=gitout('ls-tree','-z',dataCommit,'--',`coordination/engineering/global-current-cell-work-queue-20261014/${name}`).toString();
 const logical=`coordination/engineering/global-current-cell-work-queue-20261014/${name}`;
 if(direct) return {path:logical,gzip:false};
 const gz=logical+'.gz'; if(gitout('ls-tree','-z',dataCommit,'--',gz).length)return {path:gz,gzip:true};
 throw Error(`declared frozen queue input missing: ${name}`);
}
const loaded=new Map();
function load(name){
 if(loaded.has(name))return loaded.get(name);
 const resolved=resolveLogical(name), body=rawAt(dataCommit,resolved.path);
 const content=resolved.gzip?gunzipSync(body.raw):body.raw;
 const expected=queue.input_sha256?.[name];
 if(expected&&sha(content)!==expected)throw Error(`declared queue input digest mismatch: ${name}`);
 loaded.set(name,name.endsWith('.json.gz')?body.raw:content);
 return loaded.get(name);
}
// packageIntervals expects decoded logical JSON metadata and compressed .gz block parts.
// The roster fallback retains its logical name in the queue package contract.
const originalLoad=load;
const packageLoad=name=>{
 if(name.endsWith('.json.gz'))return originalLoad(name);
 return originalLoad(name);
};
const extracted=packageIntervals(packageId,packageLoad);
if(extracted.cells!==715)throw Error(`packageIntervals cell total ${extracted.cells}`);
const rosterCommit='913db0624b8aa79b188ff17a7f5c4ae0c0f63965';
const rosterPath='data/canonical-grid/bounds.json.gz';
const rosterBlob=checked(rosterCommit,rosterPath,2663523,'b33f44b882b4a0c9b89c79fb079b766505a18f2ba0089fe2945ac9b5120fb78f');
const roster=JSON.parse(gunzipSync(rosterBlob.raw));
if(!Array.isArray(roster))throw Error('native owner roster must be an array');
const owners=new Map(roster.map(r=>[r.index,r]));
if(owners.size!==roster.length)throw Error('duplicate native owner indices');
const crosswalkPath='/Users/chengshuli/Documents/Codex/2026-10-24/task-6/research/UGA/part24-source-target-component-binding-28-20261027.json';
const crosswalkRaw=fs.readFileSync(crosswalkPath);
if(sha(crosswalkRaw)!=='a569b6bf3ad29cb86737719038af3442d8201f9c9101efa9699cd12616213eb5')throw Error('crosswalk pin changed');
const crosswalk=JSON.parse(crosswalkRaw);
const bindings=[...crosswalk.rows,crosswalk.lamwo_discrepancy];
if(bindings.length!==28)throw Error('crosswalk must bind all 28 owners');
const byOwner=new Map(bindings.map(r=>[r.owner_index,r]));
if(byOwner.size!==28)throw Error('duplicate crosswalk owner');
if(JSON.stringify([...byOwner.keys()].sort((a,b)=>a-b))!==JSON.stringify([...pkg.owners].sort((a,b)=>a-b)))throw Error('crosswalk owner set differs from frozen package');
const outputRows=new Map(), seen=new Set();
let segs=0,cells=0,land=0,water=0,ownerSourceMembership=0;
for(const block of extracted.blocks){
 for(const [y,x0,x1,ownerList,sids,physical] of block.rows){
  segs++;
  if(!Array.isArray(ownerList)||ownerList.length!==1)throw Error(`interval must have one exact owner at ${y}:${x0}-${x1}`);
  const ownerIndex=ownerList[0], rosterOwner=owners.get(ownerIndex), binding=byOwner.get(ownerIndex);
  if(!rosterOwner||!binding)throw Error(`owner missing from exact roster/crosswalk: ${ownerIndex}`);
  if(rosterOwner.id!==binding.selected_target_feature_id||binding.source_feature_id!==binding.selected_target_feature_id)throw Error(`owner/native/crosswalk identity mismatch ${ownerIndex}`);
  if(!Array.isArray(sids)||!sids.includes(binding.source_feature_index))throw Error(`source membership lacks owner-linked feature ${ownerIndex}/${binding.source_feature_index}`);
  ownerSourceMembership++;
  if(!Number.isSafeInteger(y)||!Number.isSafeInteger(x0)||!Number.isSafeInteger(x1)||x1<=x0)throw Error('invalid interval coordinates');
  if(physical==='land')land+=x1-x0; else if(physical==='inland-water')water+=x1-x0; else throw Error(`unsupported physical class ${physical}`);
  const target=outputRows.get(y)??[];
  if(target.length&&target.at(-1)[1]>x0)throw Error(`overlap/duplicate interval at row ${y}`);
  const run=[x0,x1,rosterOwner.index];
  if(target.length&&target.at(-1)[1]===x0&&target.at(-1)[2]===rosterOwner.index)target.at(-1)[1]=x1;
  else target.push(run);
  outputRows.set(y,target);
  for(let x=x0;x<x1;x++){
   const key=`${y},${x}`; if(seen.has(key))throw Error(`duplicate key ${key}`); seen.add(key); cells++;
  }
 }
}
if(segs!==466||cells!==715||land!==692||water!==23||ownerSourceMembership!==466)throw Error(`count mismatch segs=${segs} cells=${cells} land=${land} water=${water} membership=${ownerSourceMembership}`);
if(new Set([...seen].map(k=>k.slice(k.indexOf(',')+1))).size===0)throw Error('empty patch');
const patch={rows:[...outputRows.entries()].sort((a,b)=>a[0]-b[0]).map(([y,runs])=>({y,runs}))};
const patchBytes=Buffer.from([...canonicalNativeJsonChunks(patch)].join(''));
const patchRound=JSON.parse(patchBytes);
if(patchRound.rows.length!==outputRows.size)throw Error('canonical serialization roundtrip failed');
const outDir=path.join(repo,'.cache/delivery-handoff/uga-native-patch-001');
fs.mkdirSync(outDir,{recursive:true,mode:0o700});fs.chmodSync(outDir,0o700);
for(const [name,bytes] of [['native-patch.json',patchBytes]]){const p=path.join(outDir,name);fs.writeFileSync(p,bytes,{mode:0o600,flag:'wx'});fs.chmodSync(p,0o600);}
const summary={schema:'uga-native-patch-derivation-receipt-v1',diagnostic_only:true,scientific_qualification:false,queue:{commit:dataCommit,path:queuePath,blob:queueFile.oid,bytes:queueFile.bytes,sha256:queueFile.sha256},package:{id:packageId,segments:segs,expanded_cells:cells,land_cells:land,inland_water_cells:water,owners:byOwner.size,source_features:pkg.source_features.length,source_family_count:pkg.source_families.length},owner_roster:{commit:rosterCommit,path:rosterPath,blob:rosterBlob.oid,bytes:rosterBlob.bytes,sha256:rosterBlob.sha256,owner_records:roster.length},crosswalk:{path:crosswalkPath,bytes:crosswalkRaw.length,sha256:sha(crosswalkRaw),bindings:bindings.length},mapping:{every_interval_single_owner:true,owner_id_matches_crosswalk_target:true,interval_sids_contain_exact_owner_source_feature:true,intervals_with_verified_source_membership:ownerSourceMembership},patch:{path:'native-patch.json',bytes:patchBytes.length,sha256:sha(patchBytes),rows:patch.rows.length},inputs:Object.fromEntries([...loaded].map(([name,bytes])=>[name,{bytes:bytes.length,sha256:sha(bytes)}]))};
const summaryBytes=Buffer.from(JSON.stringify(summary,null,2)+'\n');
const summaryPath=path.join(outDir,'derivation-receipt.json');fs.writeFileSync(summaryPath,summaryBytes,{mode:0o600,flag:'wx'});fs.chmodSync(summaryPath,0o600);
console.log(JSON.stringify({summaryPath,summaryBytes:summaryBytes.length,summarySha256:sha(summaryBytes),patchPath:path.join(outDir,'native-patch.json'),patchBytes:patchBytes.length,patchSha256:sha(patchBytes),segments:segs,cells,land,water,owners:byOwner.size,intervalsWithExactMembership:ownerSourceMembership},null,2));
