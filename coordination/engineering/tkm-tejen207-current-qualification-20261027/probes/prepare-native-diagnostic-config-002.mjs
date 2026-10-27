/* Pin the source-evidence output and original requested native patch for the
 * supported native-diagnostic phase. No authority or bank patch is emitted. */
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {pathToFileURL} from 'node:url';
const root=fs.realpathSync(process.cwd()),need=(v,m)=>{if(!v)throw Error(m)},sha=b=>createHash('sha256').update(b).digest('hex');
const PATCH_COMMIT='b5cc0f6365a4f7e5afb82a7f9484a0344b0115a4',SOURCE_COMMIT='a2303df43073681cadbcb78b85f61a4badd22c42';
const BASE='coordination/engineering/tkm-tejen207-current-qualification-20261027/native-inputs-002',OUT='coordination/engineering/tkm-tejen207-current-qualification-20261027/config/native-diagnostic-002.json';
const {pinReader}=await import(pathToFileURL(path.join(root,'scripts/prepare-delivery-handoff.mjs')));const reader=pinReader(root);
const sourcePath=BASE+'/source-evidence-001/source-evidence.json',patchPath=BASE+'/native-patch-input.json';
const source=reader.pin(SOURCE_COMMIT,sourcePath),patch=reader.pin(PATCH_COMMIT,patchPath);
need(source.bytes===33822&&source.sha256==='3b3f9cdff40cffe7c39b86c72265ba0af52ea8e048797e50c32227fb270ed408','Tejen source evidence identity differs');
need(patch.bytes===6472&&patch.sha256==='0c0b6ada72620be76f56155a6dade1fba4ccd551080a6d436a7e821da9116211','Tejen native request identity differs');
const out={version:1,source_evidence:{commit:source.commit,path:source.path},native_patch:{commit:patch.commit,path:patch.path}};
const dest=path.join(root,OUT);need(!fs.existsSync(dest),'Native config destination is not fresh');fs.mkdirSync(path.dirname(dest),{recursive:true});const bytes=Buffer.from(JSON.stringify(out)+'\n');fs.writeFileSync(dest,bytes,{flag:'wx'});
console.log(JSON.stringify({path:OUT,bytes:bytes.length,sha256:sha(bytes),source_evidence:source,native_patch:patch}));
