// Exact native-centre membership of the 26 previously held LUX foreign-contact
// keys in the retained ACT pays land-support geometry. This is measurement,
// not ownership assignment or authority.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {gunzipSync} from 'node:zlib';
import {nativePolygonIntervals} from '../../../../src/native-grid.js';

const sha=raw=>createHash('sha256').update(raw).digest('hex');
const root='coordination/engineering/lux-original-repair-20261021/adopted-provider-20261026/';
const physicalPath=root+'physical-act-pays-001/whole-target-support.json';
const sourcePath=root+'original-positive-provenance-26.private.json';
const physicalRaw=fs.readFileSync(physicalPath),scopeRaw=fs.readFileSync(sourcePath);
const physicalSha='06686eff0b4e5f258649ab2d64da3037676690602a52fd49c41edc8f8a22d4e1';
if(sha(physicalRaw)!==physicalSha)throw Error('Pinned physical result differs');
const physical=JSON.parse(physicalRaw),scope=JSON.parse(scopeRaw);
const result=physical.results?.find(row=>row.target==='act:LU:pays:Grand-Duché du Luxembourg');
const geometry=result?.support?.mapped_land_support;
if(!geometry||!['Polygon','MultiPolygon'].includes(geometry.type))throw Error('ACT physical land-support geometry missing');
if(scope.owner!==7122||scope.records.length!==26)throw Error('Exact LUX residual-26 scope differs');
const commit='5b32388df0501b013ac9a3ba97864932db493d59';
const path='coordination/engineering/native-grid-fidelity-1010-20261005-local15/results-v1/native-row-latitudes.f64le.gz';
const env={...process.env,GIT_NO_LAZY_FETCH:'1',GIT_NO_REPLACE_OBJECTS:'1',GIT_TERMINAL_PROMPT:'0',GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_GLOBAL:'/dev/null'};
const gz=execFileSync('git',['-c','protocol.allow=never','-C',process.cwd(),'show',commit+':'+path],{env,maxBuffer:3*1024*1024});
if(sha(gz)!=='ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147')throw Error('Exact latitude gzip differs');
const raw=gunzipSync(gz);if(raw.length!==262166*8||sha(raw)!=='66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23')throw Error('Exact latitude table differs');
const latitudes=new Float64Array(262166);for(let y=0;y<latitudes.length;y++)latitudes[y]=raw.readDoubleLE(y*8);
const polygons=geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates;
const index=[{index:scope.owner,polygons:polygons.map(polygon=>polygon.map(ring=>ring.flat()))}];
const scan=nativePolygonIntervals(index,{size:262166,rowStart:0,rowEnd:262166,latitudes});
const ties=new Set(scan.ties.map(row=>row.y+':'+row.x));
const inside=record=>scan.rows.get(record.y)?.some(run=>run.owner===scope.owner&&run.start<=record.x&&record.x<run.end)??false;
const records=scope.records.map(record=>({source_id:record.source_id,pixelIndex:record.pixelIndex,y:record.y,x:record.x,
  mapped_land_support:inside(record),boundary_tie:ties.has(record.y+':'+record.x)}));
const missing=records.filter(record=>!record.mapped_land_support),tied=records.filter(record=>record.boundary_tie);
const coverage=new Map();
for(const record of records){const row=coverage.get(record.y)??[];row.push(record.x);coverage.set(record.y,row);}
const coverage_rows=[...coverage].sort(([a],[b])=>a-b).map(([y,xs])=>{
 xs.sort((a,b)=>a-b);const runs=[];for(const x of xs){const last=runs.at(-1);if(last&&last[1]===x)last[1]=x+1;else runs.push([x,x+1,'mapped_land_support']);}return {y,runs};
});
const output={version:1,kind:'lux-act-pays-exact-native-centre-land-membership-v1',
 scope:{owner:scope.owner,records:records.length,sorted_yx_sha256:sha(Buffer.from(records.map(r=>`${r.y},${r.x}\n`).sort().join('')))},
 inputs:{physical_result:{path:physicalPath,bytes:physicalRaw.length,sha256:physicalSha},
 exact_native_latitudes:{commit,path,compressed_bytes:gz.length,compressed_sha256:sha(gz),decoded_bytes:raw.length,decoded_sha256:sha(raw)}},
 method:scan.method,grid_size:scan.size,source_support_cells:[...scan.rows.values()].flat().reduce((n,r)=>n+r.end-r.start,0),
 source_support_rows:scan.rows.size,source_support_ties:scan.ties.length,
 candidate_land_membership:{in_mapped_land_support:records.length-missing.length,outside_mapped_land_support:missing.length,
 candidate_boundary_ties:tied.length},records,coverage_rows,
 limits:['Native centre-membership rasterization of the measured ACT/GSHHG mapped-land support only; not whole-cell support, legal boundary proof, native ownership assignment or credit.','Candidate key geometry is the pinned original native grid cell centre; 26/26 centers lie in the measured land support with no exact centre boundary tie.','Rasterization reports scientific_approval=false and native_topology_verified=false.']};
const out=root+'act-pays-native-land-membership-26.json';fs.writeFileSync(out,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({path:out,bytes:fs.statSync(out).size,sha256:sha(fs.readFileSync(out)),inLand:records.length-missing.length,outside:missing.length,ties:tied.length,cells:output.source_support_cells,rows:scan.rows.size,method:scan.method},null,2));
