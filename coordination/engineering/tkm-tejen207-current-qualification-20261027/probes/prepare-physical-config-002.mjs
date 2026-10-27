/* Rebind the already accepted Tejen physical configuration only to the exact
 * original consumed simplified stage; all 24 other physical pins are identical. */
import fs from 'node:fs'; import path from 'node:path';
import {createHash} from 'node:crypto'; import {pathToFileURL} from 'node:url';
const root=fs.realpathSync(process.cwd()), need=(v,m)=>{if(!v)throw Error(m)}, sha=b=>createHash('sha256').update(b).digest('hex');
const CONFIG_COMMIT='92135f2ae8e5b227f31111153f2d05addefe1928';
const STAGE_COMMIT='111f29b763dbbbcd3a334a8dd87cf1641772cd60';
const PKG='coordination/engineering/tkm-tejen207-current-qualification-20261027';
const OLD=PKG+'/physical-001/original-stage-inputs.json', STAGE=PKG+'/physical-002/original-stage-inputs.json';
const CONFIG=PKG+'/config/physical-001.json', DEST=PKG+'/config/physical-002.json';
const {pinReader}=await import(pathToFileURL(path.join(root,'scripts/prepare-delivery-handoff.mjs'))); const reader=pinReader(root);
const priorPin=reader.pin(CONFIG_COMMIT,CONFIG), config=JSON.parse(reader.read(priorPin));
need(config.version===1&&config.physical.version===1&&config.physical.inputs.length===25,'Existing accepted physical configuration changed');
const old=config.physical.inputs.find(pin=>pin.path===OLD); need(old&&config.physical.roles.stages===OLD,'Original physical stage binding changed');
const newStage=reader.pin(STAGE_COMMIT,STAGE);need(newStage.bytes===41322&&newStage.sha256==='d4572d9eee1522c5a7d652856bffa6cfb40861ceb68afeeba3d3135e5adb6454','Consumed simplified stage pin differs');
config.physical.inputs=config.physical.inputs.filter(pin=>pin.path!==OLD);config.physical.inputs.push(newStage);config.physical.inputs.sort((a,b)=>a.path.localeCompare(b.path));config.physical.roles.stages=STAGE;
need(config.physical.inputs.length===25&&config.physical.inputs.filter(pin=>pin.path===STAGE).length===1,'Unexpected physical inventory diff');
const body=Buffer.from(JSON.stringify(config,null,2)+'\n'), dest=path.join(root,DEST);need(!fs.existsSync(dest),'Config destination is not fresh');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,body,{flag:'wx'});
console.log(JSON.stringify({path:DEST,bytes:body.length,sha256:sha(body),previous_config:{commit:CONFIG_COMMIT,path:CONFIG,bytes:priorPin.bytes,sha256:priorPin.sha256},stage:{commit:STAGE_COMMIT,path:STAGE,bytes:newStage.bytes,sha256:newStage.sha256},physical_input_count:25,only_changed_physical_role:'stages; 24 other pins unchanged',runtime_file_count:config.runtime_inventory.files.length}));
