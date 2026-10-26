/* Bind the exact eight-target SYC stage to the accepted whole-target physical
 * producer and the complete previously captured GSHHG record/metadata inventory. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';

const repo = fs.realpathSync(process.cwd());
const BASE = 'bc905c2d294706a200d9501a314d36ee50b48f6f';
const STAGE = 'e8b1f61eae8c1c4c892514904f5ba4e65fd83ea5';
const COMPARISON = 'a285e89d0e2a7dd47a56abcbaaef15cd299a0bf8';
const PKG = 'coordination/engineering/seychelles-repair-delivery-20261026';
const sourceStage = 'coordination/engineering/seychelles-repair-delivery-20261026/source-stage-001/stage-data/original-stage-inputs.json';
const configPath = PKG + '/config/physical-001-runtime-complete.json';
const runtimePath = '/workspace/shared/worldatlas-SYC2458-source-audit-20261026/physical-runtime-inventory-002.json';
const need = (condition, message) => { if (!condition) throw new Error(message); };
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const {pinReader} = await import(pathToFileURL(path.join(repo,'scripts/prepare-delivery-handoff.mjs')));
const reader = pinReader(repo);
need(!fs.existsSync(path.join(repo,configPath)), 'Physical config destination must be fresh');
const originalConfig = reader.json(reader.pin(BASE,
  'coordination/engineering/denmark-repair-delivery-20261017/config/physical-001.json'));
need(originalConfig.version === 1 && originalConfig.physical.version === 1
  && originalConfig.physical.inputs.length === 25 && originalConfig.physical.roles.stages
  === 'coordination/engineering/denmark-repair-delivery-20261017/source-stage-001/original-stage-inputs.json',
'Accepted complete physical source/record template differs');
const runtimeBody = fs.readFileSync(runtimePath);
const runtime = JSON.parse(runtimeBody);
need(runtime.version === '3.12.14 (main, Aug 25 2026, 14:00:49) [Clang 22.1.3 ]'
  && runtime.numpy === '2.3.5' && runtime.shapely === '2.1.2' && runtime.geos === '3.13.1'
  && runtime.python.bytes > 0 && runtime.files.length > 0, 'Exact executed runtime inventory required');
const pins = new Map(originalConfig.physical.inputs.map(pin => [pin.path,pin]));
const stagePin = reader.pin(STAGE,sourceStage);
const previousStage = originalConfig.physical.roles.stages;
const previousDescriptor = pins.get(previousStage);
need(previousDescriptor && previousDescriptor.path === previousStage, 'Complete template stage locator missing');
pins.delete(previousStage); pins.set(sourceStage,stagePin);
const physical = structuredClone(originalConfig.physical);
physical.inputs = [...pins.values()].sort((a,b)=>a.path.localeCompare(b.path));
physical.roles.stages = sourceStage;
// The producer compares Python's full sys.version string, not just the
// semantic version; retain the exact runtime identity from the inventory.
physical.runtime = {python:runtime.version,numpy:runtime.numpy,shapely:runtime.shapely,geos:runtime.geos};
// Runtime proof is local and read-only: pin each actual executed file by exact
// current bytes. `sourceCohort` rechecks these identities before/after use.
const runtimeFiles = runtime.files.map(({path,bytes,sha256})=>({path,bytes,sha256}));
const runtimeInventory = {python:runtime.python,files:runtimeFiles};
need(runtimeInventory.files.some(f=>f.path===runtime.python.path&&f.bytes===runtime.python.bytes
  &&f.sha256===runtime.python.sha256),'Python executable must be an ordinary inventoried runtime file');
const config = {version:1,physical,runtime_inventory:runtimeInventory};
const body = Buffer.from(JSON.stringify(config,null,2)+'\n');
// Read each exact pinned scientific input now through the supported immutable
// reader (no broad checkout hydration); the physical worker later runs fail-closed.
for (const pin of physical.inputs) {
  const actual = reader.pin(pin.commit,pin.path);
  need(actual.git_blob_oid===pin.git_blob_oid&&actual.bytes===pin.bytes&&actual.sha256===pin.sha256,
    'Physical input locator differs: '+pin.path);
  reader.read(actual);
}
reader.read(stagePin);
for (const file of runtimeFiles) {
  const real = fs.realpathSync(file.path), st=fs.statSync(real), hash=createHash('sha256');
  const fd=fs.openSync(real,'r'),buf=Buffer.alloc(65536);let total=0;
  try{for(let n;(n=fs.readSync(fd,buf,0,buf.length,null));){total+=n;hash.update(buf.subarray(0,n));}}
  finally{fs.closeSync(fd);}
  need(total===file.bytes&&hash.digest('hex')===file.sha256,'Installed runtime file changed: '+file.path);
}
fs.mkdirSync(path.dirname(path.join(repo,configPath)),{recursive:true});
fs.writeFileSync(path.join(repo,configPath),body,{flag:'wx'});
console.log(JSON.stringify({config_path:configPath,bytes:body.length,sha256:sha(body),
  inputs:physical.inputs.length,source_stage:stagePin,physical_runtime:physical.runtime,
  runtime_file_count:runtimeFiles.length,template_commit:BASE,method_commit:STAGE}));
