/* Bind one exact Tejen original source feature and accepted target geometry for the
 * bounded GSHHG physical stage. This prepares inputs only; it emits no qualification. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const root=fs.realpathSync(process.cwd());
const ACCEPTED='51d480361e22ac39fff4c2e20191002ebdae9d63';
const TARGET_PATH='data/geography/part-23.json';
const SOURCE_PATH='/workspace/shared/worldatlas-TKM1759-qualification-20261026/.private/full-2009-source.geojson';
const TARGET='gb:TKM:ADM2:10190150B49022220136906';
const SHAPE='10190150B49022220136906';
const DEST='coordination/engineering/tkm-tejen207-current-qualification-20261027/physical-001/original-stage-inputs.json';
const sha=b=>createHash('sha256').update(b).digest('hex');
const need=(v,m)=>{if(!v)throw new Error(m)};
const {pinReader}=await import(pathToFileURL(path.join(root,'scripts/prepare-delivery-handoff.mjs')));
const reader=pinReader(root), targetPin=reader.pin(ACCEPTED,TARGET_PATH), targetBody=JSON.parse(reader.read(targetPin));
need(targetPin.bytes===4962410&&targetPin.sha256==='d61082ccd69b319723fadc4cad582b8d5c8a8ced3e50b4f90f00b4eb17e6a9c2','Accepted Tejen target file pin changed');
const targetRows=targetBody.features.filter(f=>f.properties?.id===TARGET);
const sourceRaw=fs.readFileSync(SOURCE_PATH);
need(sourceRaw.length===271437&&sha(sourceRaw)==='0d0b3745e275bfadb1d0137fbca014b56f2ed72cb83b0a98dd0e2f0632e7c507','Original full source body identity changed');
const sourceBody=JSON.parse(sourceRaw), sourceRows=sourceBody.features.filter(f=>f.properties?.shapeID===SHAPE);
need(targetRows.length===1&&sourceRows.length===1,'Tejen target/source ID is not unique');
need(targetRows[0].properties.name==='Tejen'&&sourceRows[0].properties.shapeName==='Tejen','Tejen name mismatch');
need(targetRows[0].geometry.type==='Polygon'&&sourceRows[0].geometry.type==='Polygon','Expected Polygon geometry');
const stage=[{family:'gb:TKM:ADM2',target:TARGET,consumed:sourceRows[0],selected:{id:TARGET,geometry:targetRows[0].geometry}}];
const out=Buffer.from(JSON.stringify(stage,null,2)+'\n');
const dest=path.join(root,DEST);need(!fs.existsSync(dest),'Stage destination is not fresh');fs.writeFileSync(dest,out,{flag:'wx'});
console.log(JSON.stringify({path:DEST,bytes:out.length,sha256:sha(out),accepted_commit:ACCEPTED,target_pin:targetPin,target_feature_count:targetRows.length,target_geometry_points:targetRows[0].geometry.coordinates[0].length,source:{path:SOURCE_PATH,bytes:sourceRaw.length,sha256:sha(sourceRaw),features:sourceRows.length,source_feature_shapeID:SHAPE,source_geometry_points:sourceRows[0].geometry.coordinates[0].length},roles:'consumed is original full source feature; selected is accepted current target feature; no qualification emitted'}));
