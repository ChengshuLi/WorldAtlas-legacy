import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {pinReader,finalizeDelivery,prepareFinalizedStartupOwnership} from '../scripts/prepare-delivery-handoff.mjs';

const registryPath='coordination/engineering/tls-original-repair-20261026/compose-003/authority-registry.json';
const priorRegistryPath='coordination/engineering/tls-original-repair-20261026/compose-002/authority-registry.json';

function withPriorSelector(reader,commit,selection,historicalPins=[],acquisitionRecord={}){
 const path='data/ownership-selection.json',raw=Buffer.from(JSON.stringify(selection)+'\n');
 const oid=createHash('sha1').update(`blob ${raw.length}\0`).update(raw).digest('hex');
 const pin={commit,path,mode:'100644',git_blob_oid:oid,bytes:raw.length,
  sha256:createHash('sha256').update(raw).digest('hex')};
 const historical=new Map(historicalPins.map(value=>[`${value.commit}\0${value.path}`,value]));
 let overlay;
 overlay=new Proxy(reader,{get(target,key){
  if(key==='pin')return (at,name)=>at===commit&&name===path?pin:
   historical.get(`${at}\0${name}`)??target.pin(at,name);
  if(key==='read')return value=>{
   if(value===pin)return raw;
   if(value?.commit&&value.commit!==commit){
    const current=target.pin(commit,value.path);
    assert.equal(current.mode,value.mode,`shallow fixture mode for ${value.path}`);
    assert.equal(current.git_blob_oid,value.git_blob_oid,`shallow fixture blob for ${value.path}`);
    assert.equal(current.bytes,value.bytes,`shallow fixture length for ${value.path}`);
    assert.equal(current.sha256,value.sha256,`shallow fixture digest for ${value.path}`);
    return target.read(current);
   }
   return target.read(value);
  };
  if(key==='json')return value=>JSON.parse(overlay.read(value).toString());
  if(key==='acquire')return async pins=>{
   acquisitionRecord.calls=(acquisitionRecord.calls??0)+1;
   const verified=[];
   for(const pin of pins){
    if(pin.commit!==commit){
     const declared=historical.get(`${pin.commit}\0${pin.path}`);
     assert(declared,`test acquisition must use a declared historical source-evidence pin: ${pin.path}`);
     assert.deepEqual({mode:pin.mode,git_blob_oid:pin.git_blob_oid,bytes:pin.bytes,sha256:pin.sha256},
      {mode:declared.mode,git_blob_oid:declared.git_blob_oid,bytes:declared.bytes,sha256:declared.sha256},
      `test acquisition pin identity for ${pin.path}`);
    }
    const current=target.pin(commit,pin.path);
    assert.deepEqual({mode:current.mode,git_blob_oid:current.git_blob_oid,bytes:current.bytes,sha256:current.sha256},
     {mode:pin.mode,git_blob_oid:pin.git_blob_oid,bytes:pin.bytes,sha256:pin.sha256},
     `test acquisition requires byte-identical declared current-tree fixture for ${pin.path}`);
    target.read(current);
    verified.push({path:pin.path,mode:current.mode,git_blob_oid:current.git_blob_oid,
     bytes:current.bytes,sha256:current.sha256});
   }
   acquisitionRecord.verifiedCalls??=[];
   acquisitionRecord.verifiedCalls.push(verified);
   return {scope:'test-local-byte-verified-pins',verifiedPins:pins.length,remoteFetches:0};
  };
  const value=target[key];return typeof value==='function'?value.bind(target):value;
 }});
 return overlay;
}

function currentTreeAliases(reader,currentCommit,...roots){
 const pending=[],seen=new Set(),aliases=new Map();
 const collect=value=>{
  if(Array.isArray(value)){value.forEach(collect);return;}
  if(!value||typeof value!=='object')return;
  if(/^[a-f0-9]{40}$/.test(value.commit??'')&&typeof value.path==='string'
   &&value.mode==='100644'&&/^[a-f0-9]{40}$/.test(value.git_blob_oid??'')
   &&Number.isSafeInteger(value.bytes)&&/^[a-f0-9]{64}$/.test(value.sha256??'')){
   const key=`${value.commit}\0${value.path}`;
   if(!seen.has(key)){seen.add(key);pending.push(value);}
  }
  for(const child of Object.values(value))collect(child);
 };
 roots.forEach(collect);
 while(pending.length){
  const declared=pending.shift(),current=reader.pin(currentCommit,declared.path);
  assert.deepEqual({mode:current.mode,git_blob_oid:current.git_blob_oid,bytes:current.bytes,
   sha256:current.sha256},{mode:declared.mode,git_blob_oid:declared.git_blob_oid,bytes:declared.bytes,
   sha256:declared.sha256},`shallow fixture historical pin must match ${declared.path}`);
  if(declared.commit!==currentCommit)aliases.set(`${declared.commit}\0${declared.path}`,
   {...current,commit:declared.commit,path:declared.path});
  if(declared.path.endsWith('.json')){
   try{collect(JSON.parse(reader.read(current).toString()));}catch(error){
    assert.fail(`shallow fixture cannot inspect declared JSON pin ${declared.path}: ${error.message}`);
   }
  }
 }
 return [...aliases.values()];
}

test('source-evidence refresh prepares the exact 20 TLS members without changing the selected bank',async()=>{
 const root=process.cwd(),reader=pinReader(root),latest=reader.git('rev-parse','HEAD').toString().trim();
 const registry=reader.json(reader.pin(latest,registryPath)),priorRegistryValue=reader.json(reader.pin(latest,priorRegistryPath)),refresh=reader.pin(latest,registryPath);
 const priorRegistry=reader.pin(latest,priorRegistryPath),selected=reader.pin(latest,'data/ownership-selection.json');
 const oldSelection={...reader.json(selected),change_evidence:priorRegistry};
 const authorityPin=reader.pin(latest,registry.entries[0].source_authority.path);
 assert.deepEqual({mode:authorityPin.mode,git_blob_oid:authorityPin.git_blob_oid,bytes:authorityPin.bytes,
  sha256:authorityPin.sha256},{mode:'100644',git_blob_oid:'ca94368b92d6aa883c03b5c1acbf8b3df5d7bea3',
  bytes:730,sha256:'61ff1ea871cb5612930fb27af0495b108357c71084ccfdfca94fb2d6297cbc41'},
  'the current authority-binding fixture must equal the accepted historical pin');
 const acquisitionRecord={calls:0,verified:[]};
 const priorReader=withPriorSelector(reader,latest,oldSelection,
  currentTreeAliases(reader,latest,priorRegistryValue,registry),acquisitionRecord);
 assert.equal(registry.entries.length,1);
 const binding=priorReader.json(registry.entries[0].source_authority),evidence=priorReader.json(binding.source_evidence);
 assert.equal(evidence.targets.length,20);
 const config={version:2,selector:{commit:latest,path:selected.path},
  package_inputs:{commit:latest,path:'.github/package-inputs.json'},
  source_evidence_refresh:{commit:latest,path:registryPath}};
 const outputs=await finalizeDelivery(config,priorReader);
 assert(acquisitionRecord.calls>=1,'source membership must pass through the local declared-pin fixture boundary');
 const requestedMembershipPins=[evidence.source_membership.index,evidence.source_membership.lineage,
  ...evidence.source_membership.parts];
 assert(acquisitionRecord.verifiedCalls.some(call=>requestedMembershipPins.every(pin=>
  call.some(value=>value.path===pin.path&&value.git_blob_oid===pin.git_blob_oid
   &&value.bytes===pin.bytes&&value.sha256===pin.sha256))),
  'source-membership acquisition must verify every declared exact pin locally');
 await prepareFinalizedStartupOwnership(outputs,root);
 const next=JSON.parse(outputs['ownership-selection.json']),startup=JSON.parse(outputs['startup-ownership.json']);
 const expected={...oldSelection,change_evidence:refresh};
 assert.deepEqual(next,expected,'Only the change-evidence pin may change in the selector');
 assert.equal(startup.files.length,79);
 assert.deepEqual(outputs['package-inputs.json'],reader.read(reader.pin(latest,'.github/package-inputs.json')));
 assert.deepEqual(outputs['startup-ownership.json'],reader.read(reader.pin(latest,'data/canonical-grid/current-startup/index.json')),
  'The prepared startup bank must remain byte-identical');
});

test('source-evidence refresh rejects a missing accepted bank body before preserving it',async()=>{
 const root=process.cwd(),reader=pinReader(root),latest=reader.git('rev-parse','HEAD').toString().trim();
 const registry=reader.json(reader.pin(latest,registryPath)),priorRegistryValue=reader.json(reader.pin(latest,priorRegistryPath));
 const priorRegistry=reader.pin(latest,priorRegistryPath),selected=reader.pin(latest,'data/ownership-selection.json');
 const priorReader=withPriorSelector(reader,latest,{...reader.json(selected),change_evidence:priorRegistry},
  currentTreeAliases(reader,latest,priorRegistryValue,registry));
 const guardedReader=new Proxy(priorReader,{get(target,key,receiver){
  if(key==='read')return pin=>{
   if(pin.path.startsWith('data/canonical-grid/current-startup/')&&!pin.path.endsWith('/index.json'))
    throw Error('fixture accepted bank body unavailable');
   return target.read(pin);
  };
  return Reflect.get(target,key,receiver);
 }});
 const config={version:2,selector:{commit:latest,path:selected.path},
  package_inputs:{commit:latest,path:'.github/package-inputs.json'},
  source_evidence_refresh:{commit:latest,path:registryPath}};
 const outputs=await finalizeDelivery(config,guardedReader);
 await assert.rejects(prepareFinalizedStartupOwnership(outputs,root),/fixture accepted bank body unavailable/);
});

test('finalizeDelivery awaits source membership acquisition before rejecting a missing target',async()=>{
 const root=process.cwd(),reader=pinReader(root),latest=reader.git('rev-parse','HEAD').toString().trim();
 const registry=reader.json(reader.pin(latest,registryPath)),priorRegistryValue=reader.json(reader.pin(latest,priorRegistryPath));
 const priorRegistry=reader.pin(latest,priorRegistryPath),selected=reader.pin(latest,'data/ownership-selection.json');
 const authority=registry.entries[0].source_authority,authorityPin=reader.pin(latest,authority.path);
 assert.deepEqual({mode:authorityPin.mode,git_blob_oid:authorityPin.git_blob_oid,bytes:authorityPin.bytes,
  sha256:authorityPin.sha256},{mode:'100644',git_blob_oid:'ca94368b92d6aa883c03b5c1acbf8b3df5d7bea3',
  bytes:730,sha256:'61ff1ea871cb5612930fb27af0495b108357c71084ccfdfca94fb2d6297cbc41'},
  'the current authority-binding fixture must equal the accepted historical pin');
 const priorReader=withPriorSelector(reader,latest,{...reader.json(selected),change_evidence:priorRegistry},
  currentTreeAliases(reader,latest,priorRegistryValue,registry));
 assert.equal(registry.entries.length,1);
 const binding=priorReader.json(authority);
 const evidence=priorReader.json(binding.source_evidence),membership=evidence.source_membership;
 assert(membership?.parts?.length>0);
 const sourceEvidencePin=binding.source_evidence,sourcePartPin=membership.parts[0];
 const originalPart=priorReader.json(sourcePartPin),missingId=evidence.targets[0].target_id??evidence.targets[0].id;
 const alteredRaw=Buffer.from(JSON.stringify({...originalPart,
  features:originalPart.features.filter(feature=>(feature?.properties?.id??feature?.id)!==missingId)})+'\n');
 const alteredPartPin={...sourcePartPin,bytes:alteredRaw.length,
  git_blob_oid:createHash('sha1').update(`blob ${alteredRaw.length}\0`).update(alteredRaw).digest('hex'),
  sha256:createHash('sha256').update(alteredRaw).digest('hex')};
 let markAcquire;
 const acquireEntered=new Promise(resolve=>{markAcquire=resolve;});
 let releaseAcquire;
 const acquireGate=new Promise(resolve=>{releaseAcquire=resolve;});
 const gatedReader=new Proxy(priorReader,{get(target,key,receiver){
  if(key==='acquire')return async pins=>{
   assert(pins.some(pin=>pin.path===sourcePartPin.path),
    'the delayed acquisition must cover the exact source-membership parts');
   markAcquire();
   await acquireGate;
   return {acquired: pins.length};
  };
  if(key==='json')return pin=>{
   if(pin.commit===sourceEvidencePin.commit&&pin.path===sourceEvidencePin.path){
    const value=target.json(pin);
    return {...value,source_membership:{...value.source_membership,
     parts:value.source_membership.parts.map(part=>part.path===sourcePartPin.path?alteredPartPin:part)}};
   }
   if(pin.commit===alteredPartPin.commit&&pin.path===alteredPartPin.path)return JSON.parse(alteredRaw.toString());
   return target.json(pin);
  };
  return Reflect.get(target,key,receiver);
 }});
 const config={version:2,selector:{commit:latest,path:selected.path},
  package_inputs:{commit:latest,path:'.github/package-inputs.json'},
  source_evidence_refresh:{commit:latest,path:registryPath}};
 let settled=false,returned;
 const pending=finalizeDelivery(config,gatedReader).then(value=>{settled=true;returned=value;return value;},error=>{settled=true;throw error;});
 await acquireEntered;
 assert.equal(settled,false,'finalizeDelivery must remain pending while membership pins are being acquired');
 assert.equal(returned,undefined,'no finalization outputs may escape before source validation settles');
 releaseAcquire();
 await assert.rejects(pending,/Source membership does not contain every exact candidate target/);
 assert.equal(settled,true);
 assert.equal(returned,undefined,'a rejected membership acquisition must produce no adoptable outputs');
});

test('source-evidence refresh cannot be combined with additive or unrelated selector changes',async()=>{
 const root=process.cwd(),reader=pinReader(root),latest=reader.git('rev-parse','HEAD').toString().trim();
 const base={version:2,selector:{commit:latest,path:'data/ownership-selection.json'},
  package_inputs:{commit:latest,path:'.github/package-inputs.json'},source_evidence_refresh:{commit:latest,path:registryPath}};
 for(const extra of [
  {change_evidence:{commit:latest,path:registryPath}},
  {reference_projection:{commit:latest,path:registryPath}},
  {proposed_selector:{commit:latest,path:'data/ownership-selection.json'}}
 ])await assert.rejects(finalizeDelivery({...base,...extra},reader),/exclusive with additive, reference and selector changes/);
});
