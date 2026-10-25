#!/usr/bin/env python3
"""Extend the adopted contextual-role records with the audited 43-key scope."""
import hashlib,json,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]
GIT='/Users/chengshuli/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/git/bin/git'
old=ROOT/'research/geography/pse-owner36955-parent-context-20261025/adopted-territorial-applicability.json'
scope_path=ROOT/'research/geography/pse-parent-context-43-20261025/scope.json'
decision_path=ROOT/'research/geography/pse-parent-context-43-20261025/decision.json'
commit=subprocess.check_output([GIT,'rev-parse','HEAD'],cwd=ROOT,text=True).strip()
def pin(path):
 rel=str(path.relative_to(ROOT)); data=path.read_bytes(); tree=subprocess.check_output([GIT,'ls-tree',commit,rel],cwd=ROOT,text=True).strip().split()
 assert tree[1]=='blob' and tree[3]==rel,(rel,tree)
 return {'path':rel,'commit':commit,'git_blob_oid':tree[2],'mode':tree[0],'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
x=json.loads(old.read_text())
assert not any(p['id'] in ('parent43-scope','parent43-adoption') for p in x['provenance'])
assert not any(r.get('scope',{}).get('id')=='parent43-scope' for r in x['records'])
scope=json.loads(scope_path.read_text())
x['provenance'].extend([{'id':'parent43-scope','role':'scope','pin':pin(scope_path)},{'id':'parent43-adoption','role':'adoption','pin':pin(decision_path)}])
for i,r in enumerate(scope['records']):
 x['records'].append({'adoption':{'id':'parent43-adoption','pointer':'/decision'},'geometry_sha256':r['geometry_sha256'],'negative_ordinal':r['negative_ordinal'],'original_source':{'id':'original','pointer':'/features/0/geometry'},'pixelIndex':r['pixelIndex'],'role':'contextual','scope':{'id':'parent43-scope','owner_pointer':'/pixelIndex','pointer':f'/records/{i}'},'source_id':r['source_id'],'target_id':r['target_id'],'x':r['x'],'y':r['y']})
assert len(x['records'])==226,len(x['records'])
out=ROOT/'research/geography/pse-parent-context-43-20261025/adopted-territorial-applicability.json'
out.write_text(json.dumps(x,indent=2,sort_keys=True)+'\n')
print(json.dumps({'path':str(out),'commit_for_scope_pins':commit,'records':len(x['records']),'added':len(scope['records']),'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'provenance':x['provenance'][-2:]},sort_keys=True))
