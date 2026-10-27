/* Bind the unchanged 53-cell native patch to recomputed accepted-geometry evidence. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const root=fs.realpathSync(process.cwd()),need=(ok,msg)=>{if(!ok)throw Error(msg);};
const {pinReader}=await import(pathToFileURL(path.join(root,'scripts/prepare-delivery-handoff.mjs'))),reader=pinReader(root);
const SOURCE_COMMIT='c11556825a22ed5d0b5c5b9668db400ee3962ce8';
const SOURCE_PATH='coordination/engineering/tkm-baherden53-source-fit-20261026/source-evidence-004/source-evidence.json';
const PATCH_COMMIT='f43db162c3843f489db007b40f583dc9c35df194';
const PATCH_PATH='coordination/engineering/tkm-baherden53-source-fit-20261026/config/native-inputs-001/generated-003/native-patch-input.json';
const DEST='coordination/engineering/tkm-baherden53-source-fit-20261026/config/native-inputs-003/native-diagnostic-config.json';
const source=reader.pin(SOURCE_COMMIT,SOURCE_PATH),patch=reader.pin(PATCH_COMMIT,PATCH_PATH);
const evidence=JSON.parse(reader.read(source)),nativePatch=JSON.parse(reader.read(patch));
need(evidence.version===1&&evidence.kind==='source-target-native-evidence-v1','Source evidence version/kind changed');
need(evidence.targets?.length===1&&evidence.targets[0].id==='gb:TKM:ADM2:10190150B40000077655635','Source evidence target changed');
need(Array.isArray(nativePatch.rows),'Native patch rows unavailable');
const keys=new Set();for(const row of nativePatch.rows)for(const run of row.runs){need(Number.isSafeInteger(row.y)&&Number.isSafeInteger(run[0])&&Number.isSafeInteger(run[1])&&run[1]>run[0],'Malformed native run');for(let x=run[0];x<run[1];x++)keys.add(`${x},${row.y}`);}
need(keys.size===53,'Prior native patch no longer has exact53-key scope');
const config={version:1,source_evidence:source,native_patch:patch};
const dest=path.join(root,DEST);fs.mkdirSync(path.dirname(dest),{recursive:true});need(!fs.existsSync(dest),'Config destination not fresh');
const body=Buffer.from(JSON.stringify(config)+'\n');fs.writeFileSync(dest,body,{flag:'wx'});
console.log(JSON.stringify({path:DEST,bytes:body.length,sha256:createHash('sha256').update(body).digest('hex'),source,patch,patch_cells:keys.size}));
