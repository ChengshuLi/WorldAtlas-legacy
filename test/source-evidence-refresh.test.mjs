import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {pinReader,finalizeDelivery,prepareFinalizedStartupOwnership} from '../scripts/prepare-delivery-handoff.mjs';

const registryPath='coordination/engineering/tls-original-repair-20261026/compose-003/authority-registry.json';
const priorRegistryPath='coordination/engineering/tls-original-repair-20261026/compose-002/authority-registry.json';

function withPriorSelector(reader,commit,selection){
 const path='data/ownership-selection.json',raw=Buffer.from(JSON.stringify(selection)+'\n');
 const oid=createHash('sha1').update(`blob ${raw.length}\0`).update(raw).digest('hex');
 const pin={commit,path,mode:'100644',git_blob_oid:oid,bytes:raw.length,
  sha256:createHash('sha256').update(raw).digest('hex')};
 let overlay;
 overlay=new Proxy(reader,{get(target,key){
  if(key==='pin')return (at,name)=>at===commit&&name===path?pin:target.pin(at,name);
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
  const value=target[key];return typeof value==='function'?value.bind(target):value;
 }});
 return overlay;
}

test('source-evidence refresh prepares the exact 20 TLS members without changing the selected bank',async()=>{
 const root=process.cwd(),reader=pinReader(root),latest=reader.git('rev-parse','HEAD').toString().trim();
 const registry=reader.json(reader.pin(latest,registryPath)),refresh=reader.pin(latest,registryPath);
 const priorRegistry=reader.pin(latest,priorRegistryPath),selected=reader.pin(latest,'data/ownership-selection.json');
 const oldSelection={...reader.json(selected),change_evidence:priorRegistry};
 const priorReader=withPriorSelector(reader,latest,oldSelection);
 assert.equal(registry.entries.length,1);
 const binding=reader.json(registry.entries[0].source_authority),evidence=reader.json(binding.source_evidence);
 assert.equal(evidence.targets.length,20);
 const config={version:2,selector:{commit:latest,path:selected.path},
  package_inputs:{commit:latest,path:'.github/package-inputs.json'},
  source_evidence_refresh:{commit:latest,path:registryPath}};
 const outputs=finalizeDelivery(config,priorReader);
 await prepareFinalizedStartupOwnership(outputs,root);
 const next=JSON.parse(outputs['ownership-selection.json']),startup=JSON.parse(outputs['startup-ownership.json']);
 const expected={...oldSelection,change_evidence:refresh};
 assert.deepEqual(next,expected,'Only the change-evidence pin may change in the selector');
 assert.equal(startup.files.length,79);
 assert.deepEqual(outputs['package-inputs.json'],reader.read(reader.pin(latest,'.github/package-inputs.json')));
 assert.deepEqual(outputs['startup-ownership.json'],reader.read(reader.pin(latest,'data/canonical-grid/current-startup/index.json')),
  'The prepared startup bank must remain byte-identical');
});

test('source-evidence refresh cannot be combined with additive or unrelated selector changes',()=>{
 const root=process.cwd(),reader=pinReader(root),latest=reader.git('rev-parse','HEAD').toString().trim();
 const base={version:2,selector:{commit:latest,path:'data/ownership-selection.json'},
  package_inputs:{commit:latest,path:'.github/package-inputs.json'},source_evidence_refresh:{commit:latest,path:registryPath}};
 for(const extra of [
  {change_evidence:{commit:latest,path:registryPath}},
  {reference_projection:{commit:latest,path:registryPath}},
  {proposed_selector:{commit:latest,path:'data/ownership-selection.json'}}
 ])assert.throws(()=>finalizeDelivery({...base,...extra},reader),/exclusive with additive, reference and selector changes/);
});
