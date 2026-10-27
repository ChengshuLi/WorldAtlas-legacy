import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {selectedBootstrap} from '../../../../scripts/check-effective-geographic-regression.mjs';
import {compareAcceptedFinalBank} from '../../../../coordination/engineering/selected-geography-effective-prevention-20261009/selected-checkpoint.mjs';
const repo=process.cwd();
const baseline='d473d1767343795ae8302747b3694332fd5e2433';
const candidate='880bc05520fb59c29d98d60e2e423d246034aedc';
const output='coordination/engineering/tkm-411-combined-20261027/full-bank-comparison-004/report.json';
const codePaths=['scripts/run-geographic-check.py','scripts/geography-prefetch.mjs','scripts/geography-routing-metadata.mjs','scripts/package-startup-ownership.mjs','src/ownership-assets.js','src/ownership-method.js','scripts/native-word-store.mjs','scripts/native-patch-store.mjs','scripts/check-effective-geographic-regression.mjs','src/native-grid.js','src/ownership-codec.js','coordination/engineering/selected-geography-effective-prevention-20261009/selected-neighbor-prevention.mjs','coordination/engineering/selected-geography-effective-prevention-20261009/selected-checkpoint.mjs','coordination/engineering/selected-geography-effective-prevention-20261009/selected-joint-entry.mjs','scripts/research-import-gate.mjs','src/regional-import-gate.js','scripts/selected-reference-metadata.mjs','src/reference-metadata.js'];
const git=(...args)=>execFileSync('git',['-c','core.hooksPath=/dev/null','-C',repo,...args],{env:{...process.env,GIT_NO_LAZY_FETCH:'1',GIT_NO_REPLACE_OBJECTS:'1'},maxBuffer:64*1024*1024}).toString().trim();
if(git('rev-parse','HEAD')!==candidate) throw new Error('candidate HEAD mismatch');
if(git('diff','--quiet',baseline,candidate,'--',...codePaths)!=='') throw new Error('candidate changed trusted comparison code');
for(const file of codePaths){
 const current=fs.readFileSync(path.join(repo,file));
 const base=execFileSync('git',['cat-file','blob',`${baseline}:${file}`],{env:{...process.env,GIT_NO_LAZY_FETCH:'1',GIT_NO_REPLACE_OBJECTS:'1'},maxBuffer:64*1024*1024});
 if(!current.equals(base)) throw new Error(`working code differs from baseline: ${file}`);
}
const bootstrap=selectedBootstrap(repo,baseline,candidate,{parentRuntimePath:'/opt/codex/runtimes/codex-primary-runtime/dependencies/python/bin/python3.12'});
const result=await compareAcceptedFinalBank({beforeReader:bootstrap.beforeReader,afterReader:bootstrap.afterReader});
const bytes=Buffer.from(JSON.stringify({...result,runtime:bootstrap.runtime,caller_runtime:bootstrap.callerRuntime,execution_runtimes:bootstrap.identities,code_path_count:codePaths.length})+'\n');
fs.writeFileSync(output,bytes,{flag:'wx',mode:0o600});
const summary={result_path:output,result_bytes:bytes.length,result_sha256:createHash('sha256').update(bytes).digest('hex'),method:result.method,status:result.status,requested_cells:result.requested_cells,supported_cells:result.supported_cells,held_cells:result.held_cells,added_cells:result.added_cells,removed_cells:result.removed_cells,reassigned_cells:result.reassigned_cells,lost_or_reassigned_cells:result.lost_or_reassigned_cells,affected_rows:result.affected_rows,baseline_commit:baseline,candidate_commit:candidate,trusted_code_paths_checked:codePaths.length};
console.log(JSON.stringify(summary));
