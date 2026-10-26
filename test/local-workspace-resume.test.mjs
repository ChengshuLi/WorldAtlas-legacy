import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {workspaceManager} from '../scripts/local-workspace.mjs';

const git='git';
const routingKeys=['GIT_DIR','GIT_WORK_TREE','GIT_INDEX_FILE','GIT_COMMON_DIR','GIT_OBJECT_DIRECTORY','GIT_ALTERNATE_OBJECT_DIRECTORIES'];
const cleanEnv=()=>{
  const env={...process.env}; for(const key of routingKeys) delete env[key];
  env.GIT_NO_LAZY_FETCH='1'; env.GIT_NO_REPLACE_OBJECTS='1'; return env;
};
const run=(cwd,args,env=cleanEnv())=>{
  const result=spawnSync(git,['-C',cwd,...args],{encoding:'utf8',env});
  if(result.status!==0) throw Error(result.stderr || `git ${args.join(' ')} failed`);
  return result.stdout.trim();
};
const temporary=()=>fs.mkdtempSync(path.join(os.tmpdir(),'worldatlas-resume-test-'));
const routed=(repo)=>Object.fromEntries(routingKeys.map(key=>[key,key==='GIT_DIR'||key==='GIT_WORK_TREE'?path.join(repo,'.git'):path.join(repo,'.git','index')]));

async function fixture(t,{profile='full',include=[],inheritRouting=false}={}){
  const root=temporary(); t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const origin=path.join(root,'origin.git'),repo=path.join(root,'repo'); fs.mkdirSync(repo);
  run(root,['init','--bare',origin]); run(repo,['init','-b','main']);
  run(repo,['config','user.name','Resume Test']); run(repo,['config','user.email','resume-test@example.invalid']);
  fs.writeFileSync(path.join(repo,'README.md'),'fixture\n');
  const outside=path.join(repo,'research','geography','unselected','outside.txt');fs.mkdirSync(path.dirname(outside),{recursive:true});fs.writeFileSync(outside,'must stay sparse\n');
  for(const prefix of include){const file=path.join(repo,prefix,'selected.json');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,'selected evidence\n');}
  run(repo,['add','.']); run(repo,['commit','-m','fixture']); run(repo,['remote','add','origin',origin]); run(repo,['push','-u','origin','main']);
  const sentinelPath=path.join(repo,'.git','info','sparse-checkout');
  const sentinel='PRIMARY-SPARSE-STATE-PRESERVE\n'; fs.writeFileSync(sentinelPath,sentinel);
  const saved={};
  if(inheritRouting) for(const [key,value] of Object.entries(routed(repo))){saved[key]=process.env[key];process.env[key]=value;}
  let manager,entry;
  try{manager=workspaceManager(repo);entry=await manager.allocate({worker:'cmr-resume-test',slot:'work',branch:'test/resume-cmr',profile,include});}
  finally{for(const key of Object.keys(saved)){if(saved[key]===undefined)delete process.env[key];else process.env[key]=saved[key];}}
  const destination=entry.path;
  // Simulate only this disposable fixture's post-worktree-add/pre-materialization state.
  run(destination,['read-tree','--empty']);
  for(const name of fs.readdirSync(destination)) if(name!=='.git') fs.rmSync(path.join(destination,name),{recursive:true,force:true});
  const stateFile=path.join(manager.report().registry,'state.json');
  const state=JSON.parse(fs.readFileSync(stateFile,'utf8')); state.entries[0].status='preparing';
  fs.writeFileSync(stateFile,JSON.stringify(state,null,2)+'\n');
  return {root,repo,manager,entry,destination,stateFile,sentinelPath,sentinel};
}
function editState(file,fn){const value=JSON.parse(fs.readFileSync(file,'utf8'));fn(value.entries[0]);fs.writeFileSync(file,JSON.stringify(value,null,2)+'\n');}
function status(file){return JSON.parse(fs.readFileSync(file,'utf8')).entries[0].status;}

test('resume requires exact owner token and preserves the preparing claim',async t=>{
  const f=await fixture(t); assert.throws(()=>f.manager.resume({worker:f.entry.worker,slot:'work',token:'wrong-token'}),/ownership token/);
  assert.equal(status(f.stateFile),'preparing'); assert.deepEqual(fs.readdirSync(f.destination),['.git']);
});

test('resume refuses nonempty checkout and preserves all files',async t=>{
  const f=await fixture(t); const file=path.join(f.destination,'unexpected.txt'); fs.writeFileSync(file,'preserve');
  assert.throws(()=>f.manager.resume({worker:f.entry.worker,slot:'work',token:f.entry.token}),/not empty/);
  assert.equal(fs.readFileSync(file,'utf8'),'preserve'); assert.equal(status(f.stateFile),'preparing');
});

test('resume refuses nonempty index',async t=>{
  const f=await fixture(t); const blob=run(f.repo,['rev-parse','HEAD:README.md']);
  run(f.destination,['update-index','--add','--cacheinfo',`100644,${blob},README.md`]);
  assert.throws(()=>f.manager.resume({worker:f.entry.worker,slot:'work',token:f.entry.token}),/index is not empty/); assert.equal(status(f.stateFile),'preparing');
});

test('resume refuses changed stored HEAD or a main branch',async t=>{
  const f=await fixture(t); editState(f.stateFile,e=>{e.head='1111111111111111111111111111111111111111';});
  assert.throws(()=>f.manager.resume({worker:f.entry.worker,slot:'work',token:f.entry.token}),/branch or HEAD changed/);
  editState(f.stateFile,e=>{e.head=f.entry.head;e.branch='main';});
  assert.throws(()=>f.manager.resume({worker:f.entry.worker,slot:'work',token:f.entry.token}),/identity is incomplete or changed/);
  assert.equal(status(f.stateFile),'preparing');
});

test('resume refuses actual branch drift',async t=>{
  const f=await fixture(t); run(f.destination,['symbolic-ref','HEAD','refs/heads/main']);
  assert.throws(()=>f.manager.resume({worker:f.entry.worker,slot:'work',token:f.entry.token}),/branch or HEAD changed/); assert.equal(status(f.stateFile),'preparing');
});

test('resume refuses symlinked checkout path without deleting its target',async t=>{
  const f=await fixture(t); const moved=f.destination+'.moved'; fs.renameSync(f.destination,moved); fs.symlinkSync(moved,f.destination);
  assert.throws(()=>f.manager.resume({worker:f.entry.worker,slot:'work',token:f.entry.token}),/Symlink directory refused/);
  assert.deepEqual(fs.readdirSync(moved),['.git']); assert.equal(status(f.stateFile),'preparing');
});

test('resume refuses a slot no longer preparing',async t=>{
  const f=await fixture(t); editState(f.stateFile,e=>{e.status='ready';});
  assert.throws(()=>f.manager.resume({worker:f.entry.worker,slot:'work',token:f.entry.token}),/preparing workspace/); assert.deepEqual(fs.readdirSync(f.destination),['.git']);
});

test('sparse resume survives inherited Git routing and preserves primary sparse state',async t=>{
  const include=['research/geography/cmr-source-holds-20261025']; const f=await fixture(t,{profile:'sparse',include,inheritRouting:true});
  const result=f.manager.resume({worker:f.entry.worker,slot:'work',token:f.entry.token});
  assert.equal(result.status,'ready'); assert.equal(fs.readFileSync(path.join(f.destination,'README.md'),'utf8'),'fixture\n');
  assert.equal(fs.readFileSync(path.join(f.destination,...include,'selected.json'),'utf8'),'selected evidence\n');
  assert.equal(fs.existsSync(path.join(f.destination,'research','geography','unselected','outside.txt')),false);
  assert.equal(fs.readFileSync(f.sentinelPath,'utf8'),f.sentinel); assert.equal(run(f.repo,['status','--porcelain']),'');
});

test('sparse materialization failure leaves claim preparing and primary untouched',async t=>{
  const include=['research/geography/cmr-source-holds-20261025']; const f=await fixture(t,{profile:'sparse',include});
  const realGit=spawnSync('which',['git'],{encoding:'utf8',env:cleanEnv()}).stdout.trim(); assert.ok(realGit);
  const wrapperDir=path.join(f.root,'git-wrapper');fs.mkdirSync(wrapperDir);
  const wrapper=path.join(wrapperDir,'git');
  fs.writeFileSync(wrapper,`#!/bin/sh\nfor arg in "$@"; do if [ "$arg" = "read-tree" ]; then echo 'injected isolated test failure' >&2; exit 73; fi; done\nexec ${JSON.stringify(realGit)} "$@"\n`,{mode:0o755});
  const saved={PATH:process.env.PATH}; process.env.PATH=wrapperDir+path.delimiter+process.env.PATH;
  const env=routed(f.repo); for(const [key,value] of Object.entries(env)) { saved[key]=process.env[key];process.env[key]=value; }
  let manager;
  try{manager=workspaceManager(f.repo);}finally{for(const [key,value] of Object.entries(saved)){if(value===undefined)delete process.env[key];else process.env[key]=value;}}
  assert.throws(()=>manager.resume({worker:f.entry.worker,slot:'work',token:f.entry.token}),/injected isolated test failure/);
  assert.equal(status(f.stateFile),'preparing'); assert.equal(fs.readFileSync(f.sentinelPath,'utf8'),f.sentinel);
  assert.equal(run(f.repo,['status','--porcelain']),''); assert.equal(run(f.repo,['branch','--show-current']),'main');
});
