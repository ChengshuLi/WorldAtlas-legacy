import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';

const repo=process.env.WORLDATLAS_REPO||process.cwd();
const git=process.env.WORLDATLAS_GIT||'/opt/codex/runtimes/codex-primary-runtime/dependencies/bin/fallback/git';
const packet='coordination/engineering/atg883-source-research-20261027';
const noLazy={...process.env,GIT_NO_LAZY_FETCH:'1',GIT_NO_REPLACE_OBJECTS:'1'};
if(process.env.GIT_NO_LAZY_FETCH!=='1'||process.env.GIT_NO_REPLACE_OBJECTS!=='1')throw Error('Require no-lazy-fetch/no-replace mode');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const require=(ok,message)=>{if(!ok)throw Error(message);};
const gitShow=(rev,name)=>execFileSync(git,['-C',repo,'show',rev+':'+name],{maxBuffer:32*1024*1024,env:noLazy});
const readJson=name=>JSON.parse(fs.readFileSync(path.join(repo,name),'utf8'));
const proposal=readJson('coordination/engineering/atg-original-repair-20261021/factual-disposition-proposal.json');
const queue=readJson(packet+'/original-queue-record.json');
const evidence=new Map(proposal.evidence_pins.map(pin=>[pin[0],pin]));
function pinned(pathname){
  const pin=evidence.get(pathname);require(pin,'Missing original immutable pin: '+pathname);
  const [,commit,gitBlob,bytes,sha256]=pin,body=gitShow(commit,pathname);
  require(body.length===bytes&&hash(body)===sha256,'Pinned original input mismatch: '+pathname);
  const actualBlob=execFileSync(git,['-C',repo,'rev-parse',commit+':'+pathname],{encoding:'utf8',env:noLazy}).trim();
  require(actualBlob===gitBlob,'Pinned original Git blob differs: '+pathname);
  return {body,pin:{path:pathname,commit,git_blob_oid:gitBlob,bytes,sha256}};
}
const sourcePin=pinned('coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-ATG-ADM1-000.bin.gz');
const sourceBytes=gunzipSync(sourcePin.body);
require(hash(sourceBytes)==='021f6ca73869807bcb04d3b71ea1f26d630eb11707522ff1a0db5f3d86e40c8d','Retained source decode hash mismatch');
const collection=JSON.parse(sourceBytes);
require(collection.type==='FeatureCollection'&&collection.features.length===8,'Retained full ATG ADM1 source product changed');
const candidatePin=pinned('coordination/engineering/global-current-cell-work-queue-20261014/source-candidates-block-028.json.gz');
const landPin=pinned('coordination/engineering/global-current-cell-work-queue-20261014/physical-support-block-028.json.gz');
const waterPin=pinned('coordination/engineering/global-current-cell-work-queue-20261014/inland-water-support-block-028.json.gz');
const candidateRows=JSON.parse(gunzipSync(candidatePin.body)),landRows=JSON.parse(gunzipSync(landPin.body)),waterRows=JSON.parse(gunzipSync(waterPin.body));
const sourceSummary=pinned('coordination/engineering/global-current-cell-work-queue-20261014/source-raster-summary.json');
const summary=JSON.parse(sourceSummary.body),product=summary.products?.['12'];
require(product?.product==='gb:ATG:ADM1'&&product.features===8&&product.mapped_features===8,
  'Whole-source roster summary no longer binds to all eight mapped ATG features');
const dataCode='788cb4512efc6452f23e1a9767444eca1305c00f';
const code=gitShow(dataCode,'src/native-grid.js');
require(hash(code)==='0c35dbef6f88050970429ab08b22738d0aaac0afaa5f8d5e05b4e1cbefe41c91','Current native-grid code pin mismatch');
const nativeGrid=await import('data:text/javascript;base64,'+code.toString('base64'));
require(nativeGrid.NATIVE_GRID_METHOD==='native-linear-evenodd-first-owner-v1','Native-grid method mismatch');
const currentObservation=readJson(packet+'/current-selected-owner-observation-001b1f9.json');
const latitude=currentObservation.native_latitudes;
require(latitude?.path&&latitude.commit&&latitude.sha256,'Missing normative native latitude pin');
const latitudeEncoded=gitShow(latitude.commit,latitude.path);
require(latitudeEncoded.length===latitude.bytes&&hash(latitudeEncoded)===latitude.sha256,'Native latitude encoded pin mismatch');
const latitudeBody=gunzipSync(latitudeEncoded);
require(hash(latitudeBody)==='66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23'
  &&latitudeBody.length===2097328,'Native latitude operand mismatch');
const size=latitudeBody.length/8,latitudes=Float64Array.from({length:size},(_,i)=>latitudeBody.readDoubleLE(i*8));
const block=28,rowStart=block*4096,rowEnd=rowStart+4096;
const featureDictionary=proposal.feature_dictionary;
const features=collection.features.map((feature,index)=>{
  const sourceIndex=1273+index,record=featureDictionary[String(sourceIndex)];
  require(record&&record[2].length===1&&record[2][0]===7110&&record[3].length===1&&record[3][0]===7110,
    'Original retained source/owner lineage changed for feature '+sourceIndex);
  const geometry=feature.geometry;
  const polygons=geometry?.type==='Polygon'?[geometry.coordinates]:geometry?.type==='MultiPolygon'?geometry.coordinates:null;
  require(polygons,'Unsupported retained geometry for feature '+sourceIndex);
  return {sourceIndex,sourceId:record[0],name:record[1],recorded_owner_indices:record[2],lineage_owner_indices:record[3],polygons:polygons.map(p=>p.map(r=>Float64Array.from(r.flat())))};
});
const runsFor=rows=>new Map(rows.map(row=>[row.y,row.runs]));
const candidateByY=runsFor(candidateRows),landByY=runsFor(landRows),waterByY=runsFor(waterRows);
const contains=(runs,x)=>runs.find(run=>run[0]<=x&&x<run[1]);
const candidateByFeature=new Map(features.map(f=>[f.sourceIndex,new Set()]));
const candidateIntervalsByFeature=new Map(features.map(f=>[f.sourceIndex,[]]));
const candidateOwnersByFeature=new Map(features.map(f=>[f.sourceIndex,new Map()]));
const externalCompetitorCells=new Map(features.map(f=>[f.sourceIndex,0]));
const featureSet=new Set(features.map(f=>f.sourceIndex));
const candidateUnion=new Set(),candidateLand=new Set(),candidateWater=new Set(),candidateOffMask=new Set();
let physicalOverlap=0;
for(const row of candidateRows)for(const run of row.runs){
  const members=run[3].filter(id=>featureSet.has(id));if(!members.length)continue;
  for(const sourceIndex of members)candidateIntervalsByFeature.get(sourceIndex).push([row.y,run[0],run[1]]);
  for(let x=run[0];x<run[1];x++){
    const key=row.y+','+x;candidateUnion.add(key);
    const land=!!contains(landByY.get(row.y)||[],x),water=!!contains(waterByY.get(row.y)||[],x);
    if(land&&water)physicalOverlap++;
    if(land)candidateLand.add(key);else if(water)candidateWater.add(key);else candidateOffMask.add(key);
    for(const sourceIndex of members){
      const set=candidateByFeature.get(sourceIndex);require(!set.has(key),'Duplicate candidate feature key '+sourceIndex+' '+key);set.add(key);
      const ownerKey=JSON.stringify(run[2]);const owners=candidateOwnersByFeature.get(sourceIndex);owners.set(ownerKey,(owners.get(ownerKey)||0)+1);
      if(run[3].some(id=>!featureSet.has(id)))externalCompetitorCells.set(sourceIndex,externalCompetitorCells.get(sourceIndex)+1);
    }
  }
}
require(candidateUnion.size===candidateLand.size+candidateWater.size+candidateOffMask.size,'Physical mask categories do not partition ATG candidate union');
require(physicalOverlap===0,'Retained land/water supports overlap on ATG source candidates');
const perFeature=[],nativeUnion=new Set();let totalGeometryContacts=0,totalOwner0CandidateOutsideGeometry=0,totalGeometryNotOwner0Candidate=0,totalGeometryOutsideBlock=0,totalNativeTies=0;
for(const feature of features){
  const item={index:feature.sourceIndex,polygons:feature.polygons};
  const scan=nativeGrid.nativePolygonIntervals([item],{size,rowStart:0,rowEnd:size,latitudes});
  const geometry=new Set(),nativeIntervals=[];let candidateLandCount=0,candidateWaterCount=0,candidateNoMaskCount=0,firstY=Infinity,lastY=-Infinity;
  for(const [y,runs] of scan.rows){
    if(!runs.length)continue;firstY=Math.min(firstY,y);lastY=Math.max(lastY,y);
    if(y<rowStart||y>=rowEnd)totalGeometryOutsideBlock++;
    for(const run of runs){
      nativeIntervals.push([y,run.start,run.end]);
      for(let x=run.start;x<run.end;x++){
        const key=y+','+x;require(!geometry.has(key),'Duplicate source native key for feature '+feature.sourceIndex);geometry.add(key);nativeUnion.add(key);
      }
    }
  }
  const candidate=candidateByFeature.get(feature.sourceIndex);
  let missingCandidate=0,extraCandidate=0;
  for(const key of geometry)if(!candidate.has(key))missingCandidate++;
  for(const key of candidate)if(!geometry.has(key))extraCandidate++;
  const ties=scan.ties.reduce((sum,tie)=>sum+(tie.x!==undefined?1:Math.max(0,tie.end-tie.start)),0);
  for(const key of candidate){
    const [y,x]=key.split(',').map(Number),land=!!contains(landByY.get(y)||[],x),water=!!contains(waterByY.get(y)||[],x);
    if(land&&water)throw Error('Retained land/water overlap at ATG candidate '+key);
    if(land)candidateLandCount++;else if(water)candidateWaterCount++;else candidateNoMaskCount++;
  }
  totalGeometryContacts+=geometry.size;totalOwner0CandidateOutsideGeometry+=extraCandidate;
  totalGeometryNotOwner0Candidate+=missingCandidate;totalNativeTies+=ties;
  perFeature.push({index:feature.sourceIndex,id:feature.sourceId,name:feature.name,
    selector_member:feature.sourceIndex!==1273,recorded_owner_indices:feature.recorded_owner_indices,
    lineage_owner_indices:feature.lineage_owner_indices,geometry_native_cells:geometry.size,owner0_candidate_cells:candidate.size,
    geometry_cells_not_in_owner0_candidate:missingCandidate,owner0_candidate_cells_outside_source_geometry:extraCandidate,
    owner0_candidate_physical_support:{land:candidateLandCount,inland_water:candidateWaterCount,no_unassigned_support_mask:candidateNoMaskCount},
    candidate_owner_vectors:Object.fromEntries([...candidateOwnersByFeature.get(feature.sourceIndex)].sort()),
    candidate_cells_with_other_source_feature_competitors:externalCompetitorCells.get(feature.sourceIndex),
    native_row_extent:[firstY,lastY],native_boundary_contacts:ties,
    whole_source_native_intervals:nativeIntervals,owner0_candidate_intervals:candidateIntervalsByFeature.get(feature.sourceIndex)});
}
require(totalGeometryOutsideBlock===0,'ATG retained source geometry extends outside native block 28; whole-target block context incomplete');
const geometryNotOwner0Candidate=[...nativeUnion].filter(k=>!candidateUnion.has(k)).length;
const owner0CandidateOutsideGeometry=[...candidateUnion].filter(k=>!nativeUnion.has(k)).length;
const originalKeys=new Set(proposal.cell_rows.map(([y,x])=>y+','+x));
const sevenCandidate=new Set([...candidateByFeature].filter(([index])=>index!==1273).flatMap(([,keys])=>[...keys]));
const sevenLand=[...sevenCandidate].filter(key=>{const [y,x]=key.split(',').map(Number);return !!contains(landByY.get(y)||[],x);});
const sevenWater=[...sevenCandidate].filter(key=>{const [y,x]=key.split(',').map(Number);return !!contains(waterByY.get(y)||[],x);});
require(originalKeys.size===883&&sevenLand.length===883&&sevenWater.length===0
  &&sevenCandidate.size===1010&&new Set(sevenLand).size===883
  &&[...originalKeys].every(k=>sevenLand.includes(k))&&sevenLand.every(k=>originalKeys.has(k)),
  'Original selector/physical denominator no longer matches candidate∩land');
const candidateFeatureCellSum=[...candidateByFeature.values()].reduce((sum,set)=>sum+set.size,0);
require(candidateFeatureCellSum===product.source_owner0_cell_sum,
  'Block-28 ATG owner-zero feature cells differ from whole source raster summary');
const output={kind:'atg-whole-retained-source-physical-native-v1',status:'bounded source/physical witness; no acceptance, production patch or credit',
  contract:{package_id:'gb-ATG-ADM1--repair-evaluation',original_cells:883,original_intervals:288,
    original_owner_index:7110,target_identity:'atlas:territory:ATG',source_family:12,source_product:'gb:ATG:ADM1',
    selected_repair_features:[1274,1275,1276,1277,1278,1279,1280],full_product_features:[1273,1274,1275,1276,1277,1278,1279,1280],
    redonda_1273_in_original_repair_denominator:false},
  pins:{retained_source_payload:sourcePin.pin,source_candidate_block:candidatePin.pin,physical_land_block:landPin.pin,
    inland_water_block:waterPin.pin,source_product_summary:sourceSummary.pin,
    native_grid_code:{commit:dataCode,path:'src/native-grid.js',sha256:hash(code),method:nativeGrid.NATIVE_GRID_METHOD},
    native_latitudes:{commit:latitude.commit,path:latitude.path,bytes:latitude.bytes,sha256:latitude.sha256,decoded_bytes:latitudeBody.length,decoded_sha256:hash(latitudeBody)}},
  source_product_totals:{product:product.product,features:product.features,mapped_features:product.mapped_features,
    source_owner0_cell_sum_not_deduplicated:product.source_owner0_cell_sum,output_intervals:product.output_intervals,
    native_extent_rows_scanned:[0,size],all_retained_feature_native_cells_within_block28:totalGeometryOutsideBlock===0},
  checks:{all_eight_source_features_join_to_single_recorded_owner7110:true,
    every_owner0_candidate_cell_lies_inside_its_retained_native_source_geometry:totalOwner0CandidateOutsideGeometry===0,
    owner0_candidate_cells_outside_source_geometry:totalOwner0CandidateOutsideGeometry,
    full_native_source_geometry_cells_not_in_owner0_candidate:totalGeometryNotOwner0Candidate,
    native_geometry_union_cells:nativeUnion.size,owner0_candidate_feature_union_cells:candidateUnion.size,
    source_raster_owner0_cell_sum_equals_all_eight_feature_gap_candidates:candidateFeatureCellSum===product.source_owner0_cell_sum,
    all_eight_features_in_block28:true,source_feature_boundary_contacts:totalNativeTies,
    source_candidate_cells_with_land_support:candidateLand.size,source_candidate_cells_with_inland_water_support:candidateWater.size,
    source_candidate_cells_with_neither_physical_mask:candidateOffMask.size,land_water_mask_overlaps:physicalOverlap,
    selected_seven_feature_candidate_union:sevenCandidate.size,selected_seven_feature_land_cells:sevenLand.length,
    selected_seven_feature_water_cells:sevenWater.length,selected_seven_feature_neither_mask_cells:sevenCandidate.size-sevenLand.length-sevenWater.length,
    exact_original_keyset_equal_to_seven_feature_land_candidate_intersection:true},
  feature_results:perFeature,
  limits:['The whole retained gb:ATG:ADM1 source geometry is native-scanned across the complete grid and all eight features fall within block 28; the source-candidate table is an owner-zero gap table, not a full geometry coverage table.',
    'Physical-support and inland-water masks classify owner-zero gaps only. A missing mask outside the owner-zero candidate does not mean no physical support; those source-geometry cells require a separate physical observation if their physical type matters.',
    'All eight mapped source features include Redonda for whole-product context; the original repair selector remains exactly features1274–1280 and original 883 cells.',
    'The selected-main bank block-28 virtual-addition/conservation output is separately pinned in current-native-block-virtual-addition.json; no patch is activated or accepted.']};
const out=path.join(repo,packet,'whole-atg-source-physical-native-witness.json');
fs.writeFileSync(out,JSON.stringify(output,null,2)+'\n',{mode:0o644,flag:'w'});
process.stdout.write(JSON.stringify({kind:output.kind,sourceFeatures:features.length,geometryCells:nativeUnion.size,candidateCells:candidateUnion.size,
  land:candidateLand.size,water:candidateWater.size,neither:candidateOffMask.size,originalKeys:originalKeys.size,output:out})+'\n');
