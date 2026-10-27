import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {mergeUnassignedNativeIntervals,mergeUnassignedNativeIntervalStream} from '../src/effective-footprint.js';
import {encodeFinalOwnershipWords} from '../scripts/package-startup-ownership.mjs';

const size=262166,coordinateBits=19,ownerBase=2**(32-coordinateBits),mask=2**coordinateBits-1;
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
function packedRun(begin,end,owner){return [owner%ownerBase*2**coordinateBits+begin,Math.floor(owner/ownerBase)*2**coordinateBits+end-1];}
function baseFor(runs){
  const rows=new Uint32Array(size*2),pairCount=runs.length/2;
  rows[21]=pairCount;
  for(let y=11;y<size;y++)rows[y*2]=pairCount;
  return {version:2,method:'native-linear-evenodd-first-owner-v1',size,coordinateBits,rows,
    runs:Uint32Array.from(runs),runWords:runs.length,native_latitudes:{},reference_owner_sha256:'a'.repeat(64)};
}
function unpack(words){
  const result=[];
  for(let i=0;i<words.length;i+=2){const a=words[i],b=words[i+1];
    result.push([(a>>>coordinateBits)+(b>>>coordinateBits)*ownerBase,a&mask,(b&mask)+1]);}
  return result;
}
function collect(stream){const parts=[...stream.runSegments()];const length=parts.reduce((sum,part)=>sum+part.length,0),words=new Uint32Array(length);let offset=0;
  for(const part of parts){words.set(part,offset);offset+=part.length;}return words;}
async function encodePair(t,materialized,streamed){
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'native-interval-stream-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
  const results=[];
  for(const [name,ownership] of [['materialized',materialized],['streamed',streamed]]){
    const destination=path.join(root,name);await fs.mkdir(destination);
    results.push(await encodeFinalOwnershipWords({ownership,destination}));
  }
  assert.deepEqual(results[0].pixelMap,results[1].pixelMap);
  assert.deepEqual(results[0].outputs,results[1].outputs);
  assert.equal(results[0].rows_sha256,results[1].rows_sha256);
  assert.equal(results[0].runs_word_stream_sha256,results[1].runs_word_stream_sha256);
  for(const output of results[0].outputs){
    const left=await fs.readFile(path.join(root,'materialized',output.path));
    const right=await fs.readFile(path.join(root,'streamed',output.path));
    assert.deepEqual(right,left);assert.equal(digest(right),output.sha256);
  }
}

for(const scenario of [
  {name:'zero change retains the exact baseline stream',base:[...packedRun(10,15,1)],additions:[],expected:[[1,10,15]],delta:0},
  {name:'separate insertion grows the run count',base:[...packedRun(10,15,1),...packedRun(30,35,2)],additions:[{y:10,runs:[[20,23,3]]}],expected:[[1,10,15],[3,20,23],[2,30,35]],delta:1},
  {name:'adjacent same-owner insertion coalesces two runs',base:[...packedRun(10,15,1),...packedRun(16,21,1)],additions:[{y:10,runs:[[15,16,1]]}],expected:[[1,10,21]],delta:-1}
]){
  test(`streamed final bank bytes match materialized merge: ${scenario.name}`,async t=>{
    const base=baseFor(scenario.base),owners=new Set([1,2,3]),allowed=new Set([1,2,3]);
    const materialized=mergeUnassignedNativeIntervals(base,scenario.additions,{owners,allowed});
    const streamed=mergeUnassignedNativeIntervalStream(base,scenario.additions,{owners,allowed});
    assert.equal(streamed.runWords,materialized.runs.length);
    assert.equal(streamed.runWords-base.runs.length,scenario.delta*2);
    assert.equal(streamed.addedCells,scenario.additions.reduce((n,row)=>n+row.runs.reduce((m,[a,b])=>m+b-a,0),0));
    assert.deepEqual(unpack(collect(streamed)),scenario.expected);
    assert.deepEqual(collect(streamed),materialized.runs);
    assert.deepEqual(streamed.rows,materialized.rows);
    assert.equal(digest(Buffer.from(streamed.rows.buffer)),digest(Buffer.from(materialized.rows.buffer)));
    assert.equal(digest(Buffer.from(collect(streamed).buffer)),digest(Buffer.from(materialized.runs.buffer)));
    const streamOwnership={...base,...streamed};delete streamOwnership.runs;
    await encodePair(t,{...base,...materialized,runWords:materialized.runs.length},streamOwnership);
  });
}

test('stream encoder rejects truncated, excess and malformed segments',async t=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'native-interval-stream-invalid-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
  const base=baseFor([...packedRun(10,15,1)]),rows=base.rows,runWords=base.runs.length;
  const bad=[
    ['truncated',function*(){yield base.runs;},runWords+2],
    ['excess',function*(){yield Uint32Array.of(...base.runs,123,124);},runWords],
    ['odd segment',function*(){yield Uint32Array.of(...base.runs,123);},runWords+1]
  ];
  for(const [name,runSegments,declaredWords] of bad){
    const destination=path.join(root,name);await fs.mkdir(destination);
    const ownership={...base,rows,runWords:declaredWords,runSegments};delete ownership.runs;
    await assert.rejects(encodeFinalOwnershipWords({ownership,destination}));
  }
});

test('fixed encoder chunk boundary is identical across differently sized segments',async t=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'native-interval-stream-boundary-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
  const runWords=4194304+6,rows=new Uint32Array(size*2),runs=new Uint32Array(runWords);
  for(let i=0;i<runs.length;i++)runs[i]=(i*1664525+1013904223)>>>0;
  const base={version:2,method:'native-linear-evenodd-first-owner-v1',size,coordinateBits,rows,runWords,
    native_latitudes:{},reference_owner_sha256:'a'.repeat(64)};
  function* runSegments(){yield runs.subarray(0,1000000);yield runs.subarray(1000000,4194306);yield runs.subarray(4194306);}
  const materialized={...base,runs},streamed={...base,runSegments};
  await encodePair(t,materialized,streamed);
  const destination=path.join(root,'stream-index');await fs.mkdir(destination);
  const result=await encodeFinalOwnershipWords({ownership:streamed,destination});
  assert.deepEqual(result.pixelMap.parts.filter(part=>part.kind==='runs').map(({offset,words})=>({offset,words})),
    [{offset:0,words:4194304},{offset:4194304,words:6}]);
});
