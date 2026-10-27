/* Bind the exact consumed Baherden target geometry to the retained complete GSHHG
 * physical corpus using the supported source/physical helper and pinned runtime. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const repo=fs.realpathSync(process.cwd());
const BASE='e69bae386808fcd63f4595ad06381c44aa10f759';
const STAGE='da5046903ea26e5445a5b631c2581e9bcd3dd9d3';
const SOURCE='coordination/engineering/tkm-baherden53-source-fit-20261026/physical-001/original-stage-inputs.json';
const PKG='coordination/engineering/tkm-baherden53-source-fit-20261026';
const DEST=PKG+'/config/physical-002.json';
const RUNTIME='/workspace/shared/worldatlas-TKM-Baherden53-runtime-inventory-002-20261026.json';
const need=(c,m)=>{if(!c)throw Error(m)};
const sha=b=>createHash('sha256').update(b).digest('hex');
const {pinReader}=await import(pathToFileURL(path.join(repo,'scripts/prepare-delivery-handoff.mjs')));
const reader=pinReader(repo);
need(!fs.existsSync(path.join(repo,DEST)),'Physical config destination must be fresh');
const templatePath='coordination/engineering/denmark-repair-delivery-20261017/config/physical-001.json';
const template=reader.json(reader.pin(BASE,templatePath));
need(template.version===1&&template.physical.version===1&&template.physical.inputs.length===25,'Accepted complete physical template differs');
const stagePin=reader.pin(STAGE,SOURCE);
const physical=structuredClone(template.physical);
const stagePath=physical.roles.stages;
const inputs=new Map(physical.inputs.map(p=>[p.path,p]));
need(inputs.has(stagePath),'Template stage pin missing');
inputs.delete(stagePath); inputs.set(SOURCE,stagePin);
physical.inputs=[...inputs.values()].sort((a,b)=>a.path.localeCompare(b.path));
physical.roles.stages=SOURCE;
const runtime=JSON.parse(fs.readFileSync(RUNTIME,'utf8'));
need(runtime.files.length>0&&runtime.python?.path&&runtime.numpy==='2.3.5'&&runtime.shapely==='2.1.2','Runtime inventory absent');
physical.runtime={python:runtime.version,numpy:runtime.numpy,shapely:runtime.shapely,geos:runtime.geos};
const runtimeInventory={python:runtime.python,files:runtime.files};
need(runtimeInventory.files.some(f=>f.path===runtime.python.path&&f.bytes===runtime.python.bytes&&f.sha256===runtime.python.sha256),'Python executable not pinned');
const config={version:1,physical,runtime_inventory:runtimeInventory};
const body=Buffer.from(JSON.stringify(config,null,2)+'\n');
for(const p of physical.inputs){const actual=reader.pin(p.commit,p.path);need(actual.git_blob_oid===p.git_blob_oid&&actual.bytes===p.bytes&&actual.sha256===p.sha256,'Input pin differs: '+p.path);reader.read(actual)}
reader.read(stagePin);
for(const f of runtime.files){const real=fs.realpathSync(f.path),st=fs.statSync(real),hash=createHash('sha256'),fd=fs.openSync(real,'r'),buf=Buffer.alloc(65536);let total=0;try{for(let n;(n=fs.readSync(fd,buf,0,buf.length,null));){total+=n;hash.update(buf.subarray(0,n));}}finally{fs.closeSync(fd)}need(total===f.bytes&&hash.digest('hex')===f.sha256,'Runtime pin changed: '+f.path)}
fs.writeFileSync(path.join(repo,DEST),body,{flag:'wx'});
console.log(JSON.stringify({config:DEST,bytes:body.length,sha256:sha(body),source_stage:stagePin,physical_inputs:physical.inputs.length,runtime_files:runtime.files.length,physical_commit:BASE,template_path:templatePath,runtime_sha256:sha(fs.readFileSync(RUNTIME))}));
