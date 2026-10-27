/* Prepare a new physical-stage input that keeps raw-source and accepted-target
 * geometries distinct for the exact Baherden source-reference qualification. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';

const root=fs.realpathSync(process.cwd());
const TARGET='gb:TKM:ADM2:10190150B40000077655635';
const SOURCE_COMMIT='da5046903ea26e5445a5b631c2581e9bcd3dd9d3';
const ACCEPTED_COMMIT='d221c3054cef656efd4256626841651636c810b9';
const SOURCE_PATH='coordination/engineering/tkm-baherden53-source-fit-20261026/physical-001/original-stage-inputs.json';
const ACCEPTED_PATH='data/geography/part-23.json';
const DEST='coordination/engineering/tkm-baherden53-source-fit-20261026/physical-003/original-stage-inputs.json';
const {pinReader}=await import(pathToFileURL(path.join(root,'scripts/prepare-delivery-handoff.mjs')));
const reader=pinReader(root), need=(ok,msg)=>{if(!ok) throw Error(msg);};
const rawSourcePin=reader.pin(SOURCE_COMMIT,SOURCE_PATH);
need(rawSourcePin.bytes===9534&&rawSourcePin.sha256==='76cd7d1128730dcac1bab1c6e22d184089341fffee05afdf7dbce248ba3e3fcd','Original physical stage pin changed');
const acceptedPin=reader.pin(ACCEPTED_COMMIT,ACCEPTED_PATH);
need(acceptedPin.bytes===4962410&&acceptedPin.sha256==='d61082ccd69b319723fadc4cad582b8d5c8a8ced3e50b4f90f00b4eb17e6a9c2','Accepted current geography part pin changed');
const stages=JSON.parse(reader.read(rawSourcePin)), accepted=JSON.parse(reader.read(acceptedPin));
need(Array.isArray(stages)&&stages.length===1&&stages[0].target===TARGET&&stages[0].family==='gb:TKM:ADM2','Original stage target/family changed');
const stage=structuredClone(stages[0]);
need(stage.consumed?.properties?.shapeID==='10190150B40000077655635'&&stage.consumed?.properties?.shapeName==='Baherden','Raw source identity changed');
need(stage.consumed.geometry?.type==='Polygon'&&stage.consumed.geometry.coordinates?.[0]?.length===119,'Raw original geometry lineage changed');
need(stage.selected?.id===TARGET&&stage.selected.geometry?.type==='Polygon'&&stage.selected.geometry.coordinates?.[0]?.length===119,'Historical selected geometry mismatch');
const feature=accepted.features.find(row=>row.properties?.id===TARGET);
need(feature?.properties?.metadata?.topology_reconciled===true&&feature.geometry?.type==='Polygon'&&feature.geometry.coordinates?.[0]?.length===106,'Accepted topology-reconciled target geometry unavailable');
need(typeof feature.properties.parent_id==='string'&&feature.properties.parent_id.startsWith('framework:province:'),'Accepted target parent identity is not the pinned open framework parent');
stage.selected={id:TARGET,geometry:feature.geometry};
need(stage.consumed.geometry.coordinates[0].length===119&&stage.selected.geometry.coordinates[0].length===106,'Source/accepted geometry distinction lost');
const dest=path.join(root,DEST);fs.mkdirSync(path.dirname(dest),{recursive:true});
need(!fs.existsSync(dest),'Accepted-reference stage destination is not fresh');
const body=Buffer.from(JSON.stringify([stage],null,2)+'\n');fs.writeFileSync(dest,body,{flag:'wx'});
console.log(JSON.stringify({path:DEST,bytes:body.length,sha256:createHash('sha256').update(body).digest('hex'),target:TARGET,
  original_source:{commit:SOURCE_COMMIT,path:SOURCE_PATH,bytes:rawSourcePin.bytes,sha256:rawSourcePin.sha256,geometry_points:119},
  accepted_target:{commit:ACCEPTED_COMMIT,path:ACCEPTED_PATH,bytes:acceptedPin.bytes,sha256:acceptedPin.sha256,topology_reconciled:true,geometry_points:106},
  operation:'preserved consumed raw source geometry; replaced only selected geometry with exact accepted current feature'}));
