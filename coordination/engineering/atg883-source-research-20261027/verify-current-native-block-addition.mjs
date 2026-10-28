import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {openNativeWordStore} from '../../../scripts/native-word-store.mjs';
import {ownershipRun} from '../../../src/pixel-ownership.js';

const repo=process.env.WORLDATLAS_REPO||process.cwd();
const packet='coordination/engineering/atg883-source-research-20261027';
const git=process.env.WORLDATLAS_GIT||'/opt/codex/runtimes/codex-primary-runtime/dependencies/bin/fallback/git';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const readJson=name=>JSON.parse(fs.readFileSync(path.join(repo,name),'utf8'));
const require=(ok,message)=>{if(!ok)throw Error(message);};
function gitShow(revision,name){
  return execFileSync(git,['-C',repo,'show',revision+':'+name],{maxBuffer:32*1024*1024,
    env:{...process.env,GIT_NO_LAZY_FETCH:'1',GIT_NO_REPLACE_OBJECTS:'1'}});
}
const currentCommit='001b1f977378fe365a1825161ae342e21f985f9e';
const currentCode='788cb4512efc6452f23e1a9767444eca1305c00f';
const obsPath=packet+'/current-selected-owner-observation-001b1f9.json';
const obsBytes=fs.readFileSync(path.join(repo,obsPath));
require(hash(obsBytes)==='308460f462bb9855734f2e2c4624dd46df836d5a57408c4ea070ff98111f58e1','Current observation SHA mismatch');
const obs=JSON.parse(obsBytes);
const proposal=readJson('coordination/engineering/atg-original-repair-20261021/factual-disposition-proposal.json');
const delta=readJson(packet+'/proposed-additive-delta-v1.json');
const cells=proposal.cell_rows, intervals=proposal.interval_rows;
require(obs.commit===currentCommit&&obs.code_commit===currentCode&&obs.version===2
  &&obs.ownership_profile==='selected-final-native-bank-v2'&&obs.scientific_qualification===false,
  'Observation is not the exact current-main selected-bank v2 result');
require(cells.length===883&&intervals.length===288&&obs.keys.length===883&&obs.query_count===883,'Original denominator changed');
const cellKeys=new Set(cells.map(([y,x])=>y+','+x));
require(cellKeys.size===883,'Duplicate original cell key');
for(let i=0;i<cells.length;i++){
  const [y,x]=cells[i],row=obs.keys[i];
  require(row.y===y&&row.x===x&&row.effective_selected_owner===0,
    'Current E is not zero for the ordered original key at '+y+','+x);
  require(row.base_owner===null&&row.accepted_additive_owner===null&&row.existing_product_overlap===null,
    'Current v2 observation must not invent historical columns');
}
require(delta.kind==='atg883-proposed-additive-delta-v1'&&delta.status.includes('not an accepted/production patch')
  &&delta.summary.applied===false&&delta.summary.hypothetical_reassigned_cells===0,
  'Candidate status or no-reassignment declaration changed');
require(delta.target.owner_index===7110&&delta.target.owner_id==='atlas:territory:ATG'
  &&delta.target.province_id==='framework:province:antigua-and-barbuda:f0b1983e7530',
  'Proposed target does not match original owner/target contract');
require(delta.source_contract.redonda_feature_1273_excluded===true
  &&JSON.stringify(delta.source_contract.selected_source_feature_indices)===JSON.stringify([1274,1275,1276,1277,1278,1279,1280]),
  'Source selector changed');
require(delta.proposed_addition_rows.length===intervals.length,'Candidate interval count differs');
let candidateCells=0;
for(let i=0;i<intervals.length;i++){
  const [y,start,end,owners,features,physical]=intervals[i],row=delta.proposed_addition_rows[i];
  require(row.y===y&&row.start===start&&row.end_exclusive===end&&row.target_owner_index===7110
    &&row.source_feature_index===features[0]&&physical==='land'&&owners.length===1&&owners[0]===7110,
    'Candidate row differs from original interval contract at row '+i);
  candidateCells+=end-start;
}
require(candidateCells===883,'Candidate intervals do not cover exactly the original 883 cells');

const bankPin=obs.final_bank_pin;
require(bankPin?.path==='data/canonical-grid/current-startup/index.json'
  &&bankPin.sha256==='8609ac63850ad4683bd5d73d0969c2b9bddf6ed8bf16af1e145caeb167a3a1ca',
  'Current selected final-bank pin mismatch');
const bankBytes=gitShow(currentCommit,bankPin.path);
require(bankBytes.length===bankPin.bytes&&hash(bankBytes)===bankPin.sha256,'Current selected index body differs');
const index=JSON.parse(bankBytes);
require(index.version===3&&index.pixelMap?.version===2&&index.pixelMap.size===262166
  &&index.pixelMap.method==='native-linear-evenodd-first-owner-v1','Unexpected selected bank/grid contract');
const block=28,rowStart=block*4096,rowEnd=rowStart+4096;
const prefix=path.posix.dirname(bankPin.path)+'/';
const rowPin=obs.row_member;
require(rowPin.kind==='rows'&&rowPin.words===index.pixelMap.size*2&&rowPin.offset===0,
  'Selected native row index pin differs');
const indexRow=index.pixelMap.parts.find(p=>p.kind==='rows');
require(indexRow&&indexRow.path===rowPin.path&&indexRow.words===rowPin.words
  &&indexRow.sha256===rowPin.sha256&&indexRow.decoded_sha256===rowPin.decoded_sha256,'Row index not in current final bank');
const rowBody=gitShow(currentCommit,prefix+rowPin.path);
require(rowBody.length===rowPin.bytes&&hash(rowBody)===rowPin.sha256,'Selected native row bytes/hash mismatch');
const rowStore=await openNativeWordStore([rowBody],rowPin,{directory:repo});
const runPins=obs.run_members;
require(runPins.length>=1,'Observation has no authenticated selected run members');
const runStores=[];
try{
  const indexedRuns=index.pixelMap.parts.filter(p=>p.kind==='runs');
  const runByStart=new Map();
  for(const pin of runPins){
    const indexed=indexedRuns.find(p=>p.offset===pin.offset&&p.path===pin.path);
    require(indexed&&indexed.words===pin.words&&indexed.sha256===pin.sha256
      &&indexed.decoded_sha256===pin.decoded_sha256,'Observed run member is not pinned by current index');
  }
  const rowOffsets=[];let cursor=0;
  for(let y=0;y<index.pixelMap.size;y++){
    const start=rowStore.get(2*y),count=rowStore.get(2*y+1);
    require(start===cursor,'Selected native row table has a gap at y='+y);
    cursor+=count;
    if(y>=rowStart&&y<rowEnd)rowOffsets.push({y,start:start*2,end:(start+count)*2});
  }
  require(cursor*2===index.pixelMap.runWords&&rowOffsets.length===4096,'Selected native row table incomplete for block');
  const neededRanges=rowOffsets.filter(row=>row.start<row.end);
  const blockMin=Math.min(...neededRanges.map(row=>row.start)),blockMax=Math.max(...neededRanges.map(row=>row.end));
  const intersecting=indexedRuns.filter(p=>p.offset<blockMax&&blockMin<p.offset+p.words);
  for(const indexed of intersecting){
    if(runByStart.has(indexed.offset))continue;
    // This is an exact selected-bank member required by the bounded block-28
    // interval; Git is no-lazy-fetch and no object is reconstructed or fetched.
    const pin={...indexed,decoded_bytes:indexed.words*4};
    const body=gitShow(currentCommit,prefix+pin.path);
  require(hash(body)===pin.sha256,'Selected block-28 run bytes/hash mismatch for '+pin.path);
    pin.bytes=body.length;
    const store=await openNativeWordStore([body],pin,{directory:repo});
    runStores.push(store);runByStart.set(pin.offset,{pin,store});
  }
  const oldRows=new Map(),beforeHash=createHash('sha256'),afterHash=createHash('sha256');
  const ownerCellsBefore=new Map(),ownerCellsAfter=new Map();
  const additionsByY=new Map();
  for(const row of delta.proposed_addition_rows){if(!additionsByY.has(row.y))additionsByY.set(row.y,[]);additionsByY.get(row.y).push([row.start,row.end_exclusive,row.target_owner_index]);}
  let checkedOldRuns=0,added=0,newRunCount=0;
  for(const row of rowOffsets){
    const old=[];
    for(let wi=row.start;wi<row.end;wi+=2){
      const pin=indexedRuns.find(p=>p.offset<=wi&&wi<p.offset+p.words);
      require(pin,'No selected run input for block-28 word '+wi);
      const stored=runByStart.get(pin.offset);require(stored,'Unobserved selected run member for word '+wi);
      const pair=Uint32Array.of(stored.store.get(wi-pin.offset),stored.store.get(wi-pin.offset+1));
      const decoded=ownershipRun({version:2,coordinateBits:index.pixelMap.coordinateBits,runs:pair},0);
      const run=[decoded.start,decoded.end,decoded.id];
      require(run[0]>=0&&run[1]>run[0]&&run[1]<=index.pixelMap.size&&run[2]>0,
        'Invalid selected native run at y='+row.y);
      const prior=old.at(-1);require(!prior||prior[1]<=run[0],'Overlapping selected native runs at y='+row.y);
      old.push(run);checkedOldRuns++;
      ownerCellsBefore.set(run[2],(ownerCellsBefore.get(run[2])||0)+run[1]-run[0]);
    }
    oldRows.set(row.y,old);
    const additions=additionsByY.get(row.y)||[];
    for(const a of additions){
      require(!old.some(run=>Math.max(run[0],a[0])<Math.min(run[1],a[1])),
        'Candidate addition overlaps a current owner at y='+row.y);
      added+=a[1]-a[0];
    }
    const combined=[...old,...additions].sort((a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2]);
    const merged=[];
    for(const run of combined){
      const previous=merged.at(-1);
      require(!previous||previous[1]<=run[0],'Candidate addition creates a foreign-owner overlap at y='+row.y);
      if(previous&&previous[1]===run[0]&&previous[2]===run[2])previous[1]=run[1];
      else merged.push([...run]);
    }
    for(const run of merged)ownerCellsAfter.set(run[2],(ownerCellsAfter.get(run[2])||0)+run[1]-run[0]);
    beforeHash.update(JSON.stringify([row.y,old])+'\n');
    afterHash.update(JSON.stringify([row.y,merged])+'\n');
    newRunCount+=merged.length;
  }
  require(added===883,'Virtual addition count differs from exact denominator');
  for(const [owner,count] of ownerCellsBefore){
    require(ownerCellsAfter.get(owner)===(count+(owner===7110?883:0)),
      'Candidate changes prior selected ownership for owner '+owner);
  }
  for(const [owner,count] of ownerCellsAfter){
    require(count===(ownerCellsBefore.get(owner)||0)+(owner===7110?883:0),
      'Unexpected native owner count after virtual addition for '+owner);
  }
  require(!ownerCellsBefore.has(7110)||ownerCellsAfter.get(7110)===ownerCellsBefore.get(7110)+883,
    'ATG target owner is not incremented by exact candidate count');
  const wholeWitnessPath=packet+'/whole-atg-source-physical-native-witness.json';
  const wholeWitnessBytes=fs.readFileSync(path.join(repo,wholeWitnessPath));
  const wholeWitness=JSON.parse(wholeWitnessBytes);
  require(wholeWitness.kind==='atg-whole-retained-source-physical-native-v1'
    &&wholeWitness.contract.original_owner_index===7110
    &&wholeWitness.contract.target_identity==='atlas:territory:ATG'
    &&wholeWitness.checks.every_owner0_candidate_cell_lies_inside_its_retained_native_source_geometry===true
    &&wholeWitness.checks.source_raster_owner0_cell_sum_equals_all_eight_feature_gap_candidates===true,
    'Whole-target retained source/native witness mismatch');
  const targetGeometryKeys=new Set(),currentSourceOwnerCounts=new Map(),sourceRowsByFeature={};
  const ownerAt=(runs,x)=>{
    let lo=0,hi=runs.length;
    while(lo<hi){const mid=(lo+hi)>>>1;if(runs[mid][1]<=x)lo=mid+1;else hi=mid;}
    return lo<runs.length&&runs[lo][0]<=x&&x<runs[lo][1]?runs[lo][2]:0;
  };
  let fullGeometryCellCount=0,sourceCellsOwnedByTarget=0,sourceCellsUnowned=0,sourceCellsOwnedByOthers=0;
  for(const feature of wholeWitness.feature_results){
    require(feature.recorded_owner_indices?.length===1&&feature.recorded_owner_indices[0]===7110
      &&feature.lineage_owner_indices?.length===1&&feature.lineage_owner_indices[0]===7110,
      'Whole-target source feature no longer resolves to the single recorded owner');
    const localCounts=new Map();let featureCells=0,featureOwner0CandidateCells=0;
    for(const [y,start,end] of feature.whole_source_native_intervals){
      require(y>=rowStart&&y<rowEnd&&end>start,'Source geometry interval outside bounded native rows');
      const runs=oldRows.get(y);require(runs,'Missing complete selected owner row for source geometry');
      for(let x=start;x<end;x++){
        const key=y+','+x;targetGeometryKeys.add(key);featureCells++;
        const owner=ownerAt(runs,x);localCounts.set(owner,(localCounts.get(owner)||0)+1);
        currentSourceOwnerCounts.set(owner,(currentSourceOwnerCounts.get(owner)||0)+1);
      }
    }
    for(const [y,start,end] of feature.owner0_candidate_intervals){
      require(y>=rowStart&&y<rowEnd&&end>start,'Owner-zero candidate interval outside bounded native rows');
      for(let x=start;x<end;x++){
        featureOwner0CandidateCells++;
        require(targetGeometryKeys.has(y+','+x)||feature.whole_source_native_intervals.some(row=>row[0]===y&&row[1]<=x&&x<row[2]),
          'Owner-zero gap candidate falls outside full target geometry');
      }
    }
    require(featureCells===feature.geometry_native_cells&&featureOwner0CandidateCells===feature.owner0_candidate_cells,
      'Whole-target source/native interval census differs for feature '+feature.index);
    sourceRowsByFeature[feature.index]={name:feature.name,selector_member:feature.selector_member,
      full_source_geometry_cells:featureCells,owner0_candidate_cells:featureOwner0CandidateCells,
      current_selected_owner_cells:Object.fromEntries([...localCounts].sort((a,b)=>a[0]-b[0]))};
    fullGeometryCellCount+=featureCells;
  }
  require(targetGeometryKeys.size===fullGeometryCellCount,'Source feature native geometries overlap at cell centers or repeat keys');
  for(const [owner,count] of currentSourceOwnerCounts){
    if(owner===7110)sourceCellsOwnedByTarget+=count;
    else if(owner===0)sourceCellsUnowned+=count;
    else sourceCellsOwnedByOthers+=count;
  }
  const output={
    kind:'atg883-current-native-block-virtual-addition-v1',
    status:'scoped evidence-only virtual comparison; not a production patch, not activated, no credit',
    pins:{current_selected_commit:currentCommit,current_code_commit:currentCode,
      current_selected_bank_index:{path:bankPin.path,bytes:bankBytes.length,sha256:hash(bankBytes)},
      native_rows:{commit:currentCommit,path:prefix+rowPin.path,bytes:rowBody.length,sha256:hash(rowBody),decoded_sha256:rowPin.decoded_sha256},
      selected_run_members:intersecting.map(pin=>({commit:currentCommit,path:prefix+pin.path,
        bytes:runByStart.get(pin.offset).pin.bytes,sha256:pin.sha256,decoded_sha256:pin.decoded_sha256})),
      whole_source_native_witness:{path:wholeWitnessPath,bytes:wholeWitnessBytes.length,sha256:hash(wholeWitnessBytes)},
      current_observation_sha256:hash(obsBytes),candidate_delta_sha256:hash(fs.readFileSync(path.join(repo,packet+'/proposed-additive-delta-v1.json')))},
    scope:{native_block:block,block_row_start:rowStart,block_row_end_exclusive:rowEnd,complete_rows_in_block:4096,
      original_owner_index:7110,original_cell_count:883,original_interval_count:288},
    checks:{current_selected_owner_zero_on_exact_candidate_keys:883,
      candidate_delta_equals_original_288_intervals:true,source_feature_and_land_predicates_carried_from_original_queue:true,
      full_native_row_table_partition:true,selected_block_28_native_rows_read:4096,selected_old_native_runs_read:checkedOldRuns,
      candidate_overlaps_existing_selected_owner_runs:0,candidate_added_cells:added,
      original_owner_cells_removed_or_reassigned:0,other_owner_cell_counts_unchanged_in_block:true,
      target_owner_7110_additional_cells:883,block28_before_sha256:beforeHash.digest('hex'),block28_after_virtual_addition_sha256:afterHash.digest('hex'),
      block28_virtual_run_count_after_addition:newRunCount,
      whole_retained_source_native_geometry_cells:fullGeometryCellCount,
      whole_source_geometry_current_selected_owner_cells:sourceCellsOwnedByTarget,
      whole_source_geometry_current_selected_owner_zero_cells:sourceCellsUnowned,
      whole_source_geometry_current_selected_other_owner_cells:sourceCellsOwnedByOthers,
      whole_source_geometry_other_owner_conflicts:sourceCellsOwnedByOthers,
      current_source_owner_counts_by_feature:sourceRowsByFeature},
    limits:['Only block 28 complete old/new native rows are compared; no full world bank was hydrated or regenerated.',
      'The addition is a temporary virtual overlay of the exact candidate intervals; no accepted additive asset or selected reference is changed.',
      'Current selected-bank E was measured directly; historical base/additive/overlap columns are null in this v2 evidence and are not reconstructed.',
      'This proves scoped numerical native non-overlap and conservation only, not source authority, rights, legal applicability, current physical adjudication, or science acceptance.',
      'Whole retained source feature native intervals and unassigned candidate mask classification are separately pinned in whole-atg-source-physical-native-witness.json; masks are not interpreted for already-owned source cells.',
      'This proves scoped numerical native non-overlap and conservation only, not source authority, rights, legal applicability, or science acceptance.']
  };
  const outPath=path.join(repo,packet,'current-native-block-virtual-addition.json');
  fs.writeFileSync(outPath,JSON.stringify(output,null,2)+'\n',{flag:'w',mode:0o644});
  process.stdout.write(JSON.stringify({kind:output.kind,block,rows:4096,old_runs:checkedOldRuns,additions:added,output:outPath})+'\n');
} finally {rowStore.close();for(const store of runStores)store.close();}
