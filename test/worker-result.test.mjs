import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {deliveryNextStep,renderWorkerResult,readWorkerResult} from '../scripts/worker-result.mjs';

const request={request_id:'request-unique-a',issue_number:26,worker_id:'worker-a',claim_id:'claim-unique-a',branch:'engineering/a',action:'renew'};
const bot=(body,id=1)=>({id,user:{login:'github-actions[bot]'},body});
const result=(extra={})=>({...request,accepted:true,...extra});

test('results are bound to the bot, request and issue, including denial',()=>{
 const comment=bot(renderWorkerResult('claim',result({accepted:false,reason:'Already held'})));
 assert.equal(readWorkerResult([comment],'claim',request.request_id,26).accepted,false);
 assert.equal(readWorkerResult([{...comment,user:{login:'human'}}],'claim',request.request_id,26),null);
 assert.equal(readWorkerResult([comment],'claim','another-request',26),null);
 assert.equal(readWorkerResult([comment],'claim',request.request_id,27),null);
});
test('latest matching response wins, unrelated or malformed comments cannot confer ownership',()=>{
 const early=bot(renderWorkerResult('claim',result()),2);
 const late=bot(renderWorkerResult('claim',result({accepted:false})),3);
 assert.equal(readWorkerResult([late,early],'claim',request.request_id,26).accepted,false);
 assert.equal(readWorkerResult([bot('**Reservation result:** malformed')],'claim',request.request_id,26),null);
});
test('merge responses retain exact PR binding with current and legacy fields, and escape embedded HTML',()=>{
 for(const legacy of [{},{retryable:false},{retryable:true}]) {
  const value={request_id:'merge-a',pr_number:31,accepted:false,reason:'contains <!-- and -->',...legacy};
  const body=renderWorkerResult('merge',value);
  assert.equal(readWorkerResult([bot(body)],'merge','merge-a',31).reason,value.reason);
  assert.equal(readWorkerResult([bot(body)],'merge','merge-a',32),null);
  assert.equal(body.includes('contains <!--'),false);
  assert.deepEqual(readWorkerResult([bot(body)],'merge','merge-a',31),{...value,result_source:'github-comment',result_comment_id:1});
 }
});

test('merge result exposes the exact pair, unmet condition, actionable next step and reusable validated request',()=>{
 const base='a'.repeat(40),head='b'.repeat(40);
 const plan={base,head,files:['test/final-bank-finalizer.test.mjs','test/final-bank-checkpoint.test.mjs']};
 const value={request_id:'merge-guidance',pr_number:31,phase:'prepare',accepted:false,status:'not-merged',
  supplied_pair:{base,head},current_pair:{base,head},observed_pr_pair:{base,head},
  unmet_condition:'combined geography report missing',validated_plan_request:plan};
 const body=renderWorkerResult('merge',value);
 assert.ok(body.includes('Supplied/tested pair: `'+base+'` → `'+head+'`'));
 assert.ok(body.includes('Current tested pair: `'+base+'` → `'+head+'`'));
 assert.match(body,/Unmet condition: combined geography report missing/);
 assert.match(body,/reuse this exact plan\.request/);
 assert.match(body,/Validated plan\.request: 2 test file\(s\)/);
 assert.match(body,/"files":\["test\/final-bank-finalizer\.test\.mjs","test\/final-bank-checkpoint\.test\.mjs"\]/);
 assert.deepEqual(readWorkerResult([bot(body)],'merge','merge-guidance',31),{...value,result_source:'github-comment',result_comment_id:1});
});

test('next step never treats an unvalidated or stale supplied plan as a validated current plan',()=>{
 const current={base:'a'.repeat(40),head:'b'.repeat(40)},plan={...current,files:['test/example.test.mjs']};
 assert.match(deliveryNextStep({phase:'prepare',current_pair:current,supplied_plan_request:plan,reason:'earlier preflight failed'}),/revalidate it against a fresh exact base\/head/);
 assert.match(deliveryNextStep({phase:'prepare',current_pair:current,validated_plan_request:plan,reason:'geography failed'}),/reuse this exact plan\.request/);
 assert.match(deliveryNextStep({phase:'prepare',current_pair:current,validated_plan_request:{...plan,base:'c'.repeat(40)}}),/does not match the observed pair/);
 assert.match(deliveryNextStep({phase:'prepare',supplied_pair:{base:'a'.repeat(40),head:current.head},reason:'could not read live PR'}),/Read the live main and PR head first/);
 assert.match(deliveryNextStep({phase:'merge',accepted:true}),/canonical terminal receipt/);
});

test('coordinator guide requires follow-through after delegation and preservation of blockers/receipts',()=>{
 const guide=fs.readFileSync(new URL('../docs/DEVELOPMENT.md',import.meta.url),'utf8');
 assert.match(guide,/Coordinators continue managing ready steps through completion/);
 assert.match(guide,/preserve blockers and terminal receipts/);
 assert.match(guide,/do not stop merely because work was delegated/);
});
