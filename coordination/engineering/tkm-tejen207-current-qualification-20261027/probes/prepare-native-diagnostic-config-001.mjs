/* Pin the source-evidence output and original requested native patch for the
 * supported native-diagnostic phase. No authority or bank patch is emitted. */
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {pathToFileURL} from 'node:url';
const root=fs.realpathSync(process.cwd()),need=(v,m)=>{if(!v)throw Error(m)},sha=b=>createHash('sha256').update(b).digest('hex');
const PATCH_COMMIT='0e43a69227a61664009cd7f87f858e42c453ce5d',SOURCE_COMMIT='5db7a5a81cee7340256922069d337da9d9c5d260';
const BASE='coordination/engineering/tkm-tejen207-current-qualification-20261027/native-inputs-001',OUT='coordination/engineering/tkm-tejen207-current-qualification-20261027/config/native-diagnostic-001.json';
const {pinReader}=await import(pathToFileURL(path.join(root,'scripts/prepare-delivery-handoff.mjs')));const reader=pinReader(root);
const sourcePath=BASE+'/source-evidence-001/source-evidence.json',patchPath=BASE+'/native-patch-input.json';
const source=reader.pin(SOURCE_COMMIT,sourcePath),patch=reader.pin(PATCH_COMMIT,patchPath);
need(source.bytes===30185&&source.sha256==='dd67377114ce20664f4ade48f950cd4f7704e4da7b0051fcfdd9f2ce77437011','Tejen source evidence identity differs');
need(patch.bytes===6472&&patch.sha256==='0c0b6ada72620be76f56155a6dade1fba4ccd551080a6d436a7e821da9116211','Tejen native request identity differs');
const out={version:1,source_evidence:{commit:source.commit,path:source.path},native_patch:{commit:patch.commit,path:patch.path}};
const dest=path.join(root,OUT);need(!fs.existsSync(dest),'Native config destination is not fresh');fs.mkdirSync(path.dirname(dest),{recursive:true});const bytes=Buffer.from(JSON.stringify(out)+'\n');fs.writeFileSync(dest,bytes,{flag:'wx'});
console.log(JSON.stringify({path:OUT,bytes:bytes.length,sha256:sha(bytes),source_evidence:source,native_patch:patch}));
