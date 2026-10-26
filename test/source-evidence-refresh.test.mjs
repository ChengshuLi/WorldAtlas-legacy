import test from 'node:test';
import assert from 'node:assert/strict';
import {pinReader,finalizeDelivery,prepareFinalizedStartupOwnership} from '../scripts/prepare-delivery-handoff.mjs';

const registryPath='coordination/engineering/tls-original-repair-20261026/compose-003/authority-registry.json';

test('source-evidence refresh prepares the exact 20 TLS members without changing the selected bank',async()=>{
 const root=process.cwd(),reader=pinReader(root),head=reader.git('rev-parse','HEAD').toString().trim();
 const refresh=reader.pin(head,registryPath),selected=reader.pin(head,'data/ownership-selection.json');
 const oldSelection=reader.json(selected),registry=reader.json(refresh);
 assert.equal(registry.entries.length,1);
 const binding=reader.json(registry.entries[0].source_authority),evidence=reader.json(binding.source_evidence);
 assert.equal(evidence.targets.length,20);
 const config={version:2,selector:{commit:head,path:selected.path},
  package_inputs:{commit:head,path:'.github/package-inputs.json'},source_evidence_refresh:{commit:head,path:refresh.path}};
 const outputs=finalizeDelivery(config,reader);
 await prepareFinalizedStartupOwnership(outputs,root);
 const next=JSON.parse(outputs['ownership-selection.json']),startup=JSON.parse(outputs['startup-ownership.json']);
 const expected={...oldSelection,change_evidence:refresh};
 assert.deepEqual(next,expected,'Only the change-evidence pin may change in the selector');
 assert.equal(startup.files.length,79);
 assert.deepEqual(outputs['package-inputs.json'],reader.read(reader.pin(head,'.github/package-inputs.json')));
 assert.deepEqual(outputs['startup-ownership.json'],reader.read(reader.pin(head,'data/canonical-grid/current-startup/index.json')),
  'The prepared startup bank must remain byte-identical');
});

test('source-evidence refresh cannot be combined with additive or unrelated selector changes',()=>{
 const root=process.cwd(),reader=pinReader(root),head=reader.git('rev-parse','HEAD').toString().trim();
 const base={version:2,selector:{commit:head,path:'data/ownership-selection.json'},
  package_inputs:{commit:head,path:'.github/package-inputs.json'},source_evidence_refresh:{commit:head,path:registryPath}};
 for(const extra of [
  {change_evidence:{commit:head,path:registryPath}},
  {reference_projection:{commit:head,path:registryPath}},
  {proposed_selector:{commit:head,path:'data/ownership-selection.json'}}
 ])assert.throws(()=>finalizeDelivery({...base,...extra},reader),/exclusive with additive, reference and selector changes/);
});
