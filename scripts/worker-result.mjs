const prefix=kind=>kind==='claim'?'**Reservation result:**':'**Merge result:**';
const commit=value=>typeof value==='string'&&/^[a-f0-9]{40}$/.test(value);
const inline=value=>String(value).replace(/[\\`<>\r\n]/g,char=>({ '\\':'\\\\','`':'\\`','<':'&lt;','>':'&gt;','\r':' ','\n':' ' }[char]));
function pairLine(label,pair){
 if(!pair||typeof pair!=='object')return null;
 const base=commit(pair.base)?pair.base:null,head=commit(pair.head)?pair.head:null;
 if(base&&head)return `${label}: \`${base}\` → \`${head}\``;
 if(head)return `${label}: base unobserved; head \`${head}\``;
 if(base)return `${label}: base \`${base}\`; head unobserved`;
 return null;
}
export function deliveryNextStep(result){
 if(result?.accepted&&['merge','prepare'].includes(result?.phase))return 'Read back the canonical terminal receipt and verify the resulting accepted main; do not submit another request.';
 if(result?.phase==='prepare'&&result?.status==='testing')return 'Follow this request through its required trusted geography and integration jobs; do not create a duplicate queue entry.';
 const current=result?.current_pair;
 if(!current){
  if(result?.supplied_pair?.head&&result?.observed_pr_pair?.head&&result.supplied_pair.head!==result.observed_pr_pair.head)
   return 'The observed PR head differs from the supplied head. Read the live main and PR head, obtain exact-head review for the observed head, and preserve this receipt; do not retry or reuse a stale plan.';
  return 'Read the live main and PR head first; preserve this receipt and do not dispatch another request until the exact pair is confirmed.';
 }
 const validated=result?.validated_plan_request;
 const supplied=validated??result?.supplied_plan_request;
 if(validated&&validated.base===current.base&&validated.head===current.head)
  return 'Resolve the unmet condition, then reuse this exact plan.request only if a fresh check confirms the same base/head; do not regenerate it or create a duplicate queue entry.';
 if(supplied&&(supplied.base!==current.base||supplied.head!==current.head))
  return 'The supplied plan.request does not match the observed pair. Obtain an exact-pair review for the current base/head before a new trusted request; do not reuse this stale plan or switch routes by default.';
 if(supplied)return 'Preserve this supplied plan.request. Resolve the reported condition and revalidate it against a fresh exact base/head; do not regenerate the roster or dispatch a duplicate request.';
 return 'Resolve the unmet condition and obtain reviewer-sufficient routing for this exact pair; do not invent a roster or duplicate queue entry.';
}
function resultSummary(kind,result){
 if(kind!=='merge')return '';
 const lines=[];
 const supplied=pairLine('Supplied/tested pair',result.supplied_pair);
 const current=pairLine('Current tested pair',result.current_pair);
 const tested=pairLine('Validated tested pair',{base:result.tested_base,head:result.reviewed_head});
 const observed=pairLine('Observed PR pair',result.observed_pr_pair);
 if(supplied)lines.push(supplied);
 if(current)lines.push(current);
 else if(tested)lines.push(tested);
 else lines.push('Current pair: not observed; verify live main and PR head before retrying.');
 if(observed)lines.push(observed);
 const unmet=result.unmet_condition??(!result.accepted?result.reason:null);
 if(unmet)lines.push(`Unmet condition: ${inline(unmet).slice(0,600)}`);
 const next=result.next_step??deliveryNextStep(result);
 if(next)lines.push(`Next: ${inline(next).slice(0,600)}`);
 const plan=result.validated_plan_request??result.supplied_plan_request;
 if(plan&&typeof plan==='object'&&commit(plan.base)&&commit(plan.head)&&Array.isArray(plan.files)){
  const label=result.validated_plan_request?'Validated plan.request':'Supplied plan.request';
  const json=JSON.stringify(plan);
  lines.push(`${label}: ${plan.files.length} test file(s), bound to \`${plan.base}\` → \`${plan.head}\`.`);
  if(json.length<=2400)lines.push('```json',json,'```');
  else lines.push('Full request is preserved in the machine-readable receipt payload.');
 }
 return lines.join('\n');
}
export function renderWorkerResult(kind,result){
 if(!['claim','merge'].includes(kind))throw Error('Unknown worker result kind');
 const json=JSON.stringify(result).replaceAll('<','\\u003c');
 const summary=resultSummary(kind,result);
 return `${prefix(kind)} ${result.accepted?'accepted':'not accepted'}\n\nRequest: \`${inline(result.request_id)}\`${summary?`\n\n${summary}`:''}\n\n<!-- worldatlas-${kind}-result:v1\n${json}\n-->`;
}
export function readWorkerResult(comments,kind,request_id,number){
 const field=kind==='claim'?'issue_number':'pr_number';
 const matches=comments.filter(c=>c.user?.login==='github-actions[bot]'&&c.body?.startsWith(prefix(kind))).sort((a,b)=>b.id-a.id);
 for(const comment of matches){
  const match=new RegExp(`<!-- worldatlas-${kind}-result:v1\\n([\\s\\S]*?)\\n-->`).exec(comment.body);
  if(!match)continue;
  let result;try{result=JSON.parse(match[1]);}catch{continue;}
  if(result.request_id!==request_id||result[field]!==number)continue;
  if(typeof result.accepted!=='boolean')throw Error('Malformed worker result');
  return {...result,result_source:'github-comment',result_comment_id:comment.id};
 }
 return null;
}
// Shared by queue observation and accepted-checkpoint acquisition. A comment is
// insufficient: its reviewed head and merge identity must match the actual PR.
export function verifyAcceptedMergeResult(result, merged, head) {
  if (result?.accepted !== true || result.status !== 'merged' || !/^[a-f0-9]{40}$/.test(result.merge_commit ?? '') ||
      (result.expected_head !== undefined && result.expected_head !== head) ||
      (result.reviewed_head !== undefined && result.reviewed_head !== head))
    throw Error('Malformed or mismatched accepted merge receipt');
  if (!merged?.merged || merged.head?.sha !== head || merged.merge_commit_sha !== result.merge_commit)
    throw Error('Merge receipt differs from actual PR state');
  return result;
}
