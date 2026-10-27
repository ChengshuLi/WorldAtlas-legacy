/* Bind the original consumed simplified Tejen source feature (catalogue) and the
 * accepted current target geometry for a distinct GSHHG physical stage. */
import fs from 'node:fs'; import path from 'node:path';
import {createHash} from 'node:crypto'; import {gunzipSync} from 'node:zlib';
import {pathToFileURL} from 'node:url';
const root=fs.realpathSync(process.cwd()), need=(v,m)=>{if(!v)throw Error(m)}, sha=b=>createHash('sha256').update(b).digest('hex');
const ACCEPTED='51d480361e22ac39fff4c2e20191002ebdae9d63';
const FAMILY='gb:TKM:ADM2', SHAPE='10190150B49022220136906', TARGET='gb:TKM:ADM2:'+SHAPE;
const CATALOGUE='coordination/engineering/original-geography-source-corpus-20261006/catalogue.json';
const PART23='data/geography/part-23.json';
const APP='/workspace/shared/worldatlas-TKM1759-qualification-20261026/.private/full-simplified-exact-center-application-v2.json';
const DEST='coordination/engineering/tkm-tejen207-current-qualification-20261027/physical-002/original-stage-inputs.json';
const {pinReader}=await import(pathToFileURL(path.join(root,'scripts/prepare-delivery-handoff.mjs'))); const reader=pinReader(root);
const cataloguePin=reader.pin(ACCEPTED,CATALOGUE), catalogue=JSON.parse(reader.read(cataloguePin));
const product=catalogue.products.find(p=>p.key===FAMILY);
need(product?.feature_count===59&&product.original_bytes===259969&&product.original_sha256==='af6d0ea1274198ae5579ef23c9da9c2a45bb1fcc4e77fa5532e18c47c778d27d','Original consumed simplified TKM family differs');
const pieces=product.parts.map(p=>{const pin=reader.pin(ACCEPTED,p.path),raw=reader.read(pin);need(pin.bytes===p.bytes&&pin.sha256===p.sha256,'Simplified source compressed pin differs');const d=gunzipSync(raw);need(d.length===p.uncompressed_bytes&&sha(d)===p.uncompressed_sha256,'Simplified source part decoded pin differs');return d;});
const raw=Buffer.concat(pieces);need(raw.length===product.original_bytes&&sha(raw)===product.original_sha256,'Complete original consumed source family differs');
const source=JSON.parse(raw), sourceRows=source.features.filter(f=>f.properties?.shapeID===SHAPE);
const targetPin=reader.pin(ACCEPTED,PART23), target=JSON.parse(reader.read(targetPin)), targetRows=target.features.filter(f=>f.properties?.id===TARGET);
need(sourceRows.length===1&&targetRows.length===1&&sourceRows[0].properties?.shapeName==='Tejen'&&targetRows[0].properties?.name==='Tejen','Unique Tejen source/target identity failed');
const appRaw=fs.readFileSync(APP);need(appRaw.length===990213&&sha(appRaw)==='e7b49e43f8df1427e8ec03e669302e9f988d90cb4139d9f4f1016afd5527c09c','Retained exact full/simplified application changed');
const app=JSON.parse(appRaw), ownerRows=app.per_key.filter(r=>r.owner===42144), sourceId=TARGET;
need(ownerRows.length===209&&ownerRows.filter(r=>r.full.includes(sourceId)&&r.simplified.includes(sourceId)&&r.source_tkm.includes(sourceId)&&!r.full_boundary_tie&&!r.simplified_boundary_tie).length===207&&ownerRows.filter(r=>!r.full.includes(sourceId)&&r.simplified.includes(sourceId)).length===2,'Exact Tejen full/simplified strata changed');
need(sourceRows[0].geometry.type==='Polygon'&&targetRows[0].geometry.type==='Polygon','Tejen geometries must be polygons');
const stage=[{family:FAMILY,target:TARGET,consumed:sourceRows[0],selected:{id:TARGET,geometry:targetRows[0].geometry}}];
const body=Buffer.from(JSON.stringify(stage,null,2)+'\n'), dest=path.join(root,DEST);need(!fs.existsSync(dest),'Stage output is not fresh');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,body,{flag:'wx'});
console.log(JSON.stringify({path:DEST,bytes:body.length,sha256:sha(body),accepted_commit:ACCEPTED,catalogue:{path:CATALOGUE,bytes:cataloguePin.bytes,sha256:cataloguePin.sha256,source_family:product.key,feature_count:product.feature_count,source_bytes:raw.length,source_sha256:sha(raw)},source:{shapeID:SHAPE,points:sourceRows[0].geometry.coordinates[0].length},target:{path:PART23,bytes:targetPin.bytes,sha256:targetPin.sha256,points:targetRows[0].geometry.coordinates[0].length},application:{path:APP,bytes:appRaw.length,sha256:sha(appRaw),owner42144_total:ownerRows.length,full_and_simplified_direct_unique:207,simplified_only:2},roles:'consumed is the original catalogued simplified feature; selected is accepted target geometry; 2 simplified-only keys preserved separately'}));
