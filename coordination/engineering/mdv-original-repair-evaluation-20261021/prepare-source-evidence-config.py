#!/usr/bin/env python3
"""Bind the retained MDV21 family and its 850 source rows to the supported native-evidence preparer."""
import gzip,hashlib,json,os,subprocess
from pathlib import Path
ROOT=Path.cwd(); BASE='a0b1d2d9164ffd61f9a8a20cb2eb7f259d47506f'; PHYS_COMMIT='09c3d13f516a8ebbc187df14138ea977fa137247'
P='coordination/engineering/mdv-original-repair-evaluation-20261021'; CATALOG='coordination/engineering/original-geography-source-corpus-20261006/catalogue.json'; SOURCE='coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-MDV-ADM1-000.bin.gz'; DISP=P+'/proposed-disposition.json'; PART='data/geography/part-13.json';
env={**os.environ,'GIT_NO_LAZY_FETCH':'1','GIT_NO_REPLACE_OBJECTS':'1','GIT_CONFIG_NOSYSTEM':'1','GIT_CONFIG_GLOBAL':'/dev/null'}
def git(*a): return subprocess.check_output(['git','-c','protocol.allow=never','-C',str(ROOT),*a],env=env)
def pin(commit,path):
 row=git('ls-tree','-z',commit,'--',path); head,name=row[:-1].split(b'\t',1);mode,typ,oid=head.decode().split(); assert name.decode()==path and mode=='100644' and typ=='blob'; raw=git('cat-file','blob',oid)
 return {'path':path,'commit':commit,'mode':mode,'git_blob_oid':oid,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()},raw
def local_pin(path,commit=PHYS_COMMIT):
 return pin(commit,path)[0]
cat,catraw=pin(BASE,CATALOG); catalogue=json.loads(catraw); src=next(r for r in catalogue['products'] if r['key']=='gb:MDV:ADM1')
family=[dict(src['parts'][0],commit=src['parts'][0].get('commit',BASE))]
# Ensure the catalogue's exact retained record matches the compressed source corpus payload.
sp=local_pin(SOURCE,BASE); assert sp['bytes']==5927 and sp['sha256']=='abdabbb643f6b8acf1df4c85083a4f77bdb471e1caad65030446584d6e8b713c'
disp_pin,dispraw=pin(BASE,DISP); disp=json.loads(dispraw); assert disp['package']['original_cells']==850
phys_pin=local_pin(P+'/physical-001/whole-target-support.json'); physical=json.loads(git('cat-file','blob',git('rev-parse',PHYS_COMMIT+':'+P+'/physical-001/whole-target-support.json').decode().strip()))
physin_pin=local_pin(P+'/source-canonical-centers-001/physical-stage-inputs.json')
# Selected accepted feature body is bound to the exact unchanged current part13.
partpin,partraw=pin(BASE,PART); part=json.loads(partraw); features={f['id']:f for f in part['features'] if f.get('id','').startswith('gb:MDV:ADM1:')}; assert len(features)==19
# Native owner patches are exact cells from original disposition; source feature-owner joins are retained.
by={}
for row in disp['intervals']:
 y,x0,x1=row['interval']; ident=(row['owner_id'],row['source_feature_id']);
 z=by.setdefault(ident,{})
 for x in range(x0,x1): z.setdefault(y,[]).append(x)
assert sum(len(xs) for rows in by.values() for xs in rows.values())==850
# Recheck canonical original bounds owner-index/source identity.
manifest_pin,manifestraw=pin(BASE,'coordination/engineering/arctic-three-retained-land-fit-repair-native-20261008/native-v9/manifest.json'); manifest=json.loads(manifestraw)
bounds_meta=manifest['original_assets']['bounds']; bz,_=pin(bounds_meta['commit'],bounds_meta['path']); bounds=json.loads(gzip.decompress(git('cat-file','blob',git('rev-parse',bounds_meta['commit']+':'+bounds_meta['path']).decode().strip())))
# Pin exact rows for current source membership and retained metadata lineage.
idx=pin(BASE,'data/world-index.json')[0]; lineage=pin(BASE,'data/semantic-report.json')[0]
# Candidate family parts are the one complete retained original simplified payload.
family=[{**sp,'decoded_bytes':20566,'decoded_sha256':'834d5c1f8bcaf9cb3733b5faed95a238e9efe6f4986b6197642aea094c6e4ef2'}]
targets=[]
for (owner,source_id), rows in sorted(by.items()):
 assert source_id in features and source_id.endswith(bounds[owner-1]['id']) and bounds[owner-1]['index']==owner
 row_runs=[]
 for y,xs in sorted(rows.items()):
  xs=sorted(xs); runs=[]
  for x in xs:
   if runs and runs[-1][1]==x: runs[-1][1]=x+1
   else:runs.append([x,x+1,'mapped_land_support'])
  row_runs.append({'y':y,'runs':runs})
 targets.append({'id':source_id,'target_id':source_id,'pixelIndex':owner,'base_geometry':features[source_id]['geometry'],'source_family':'gb:MDV:ADM1','source_receipt_sha256':phys_pin['sha256'],'coverage_classes':['mapped_land_support'],'coverage_rows':row_runs,'territorial_exclusions':[]})
assert len(targets)==6 and sum(sum(run[1]-run[0] for row in t['coverage_rows'] for run in row['runs']) for t in targets)==850
source_evidence={'version':1,'kind':'source-target-native-evidence-v1','owner_roster':{**bz,'encoding':'gzip','decoded_bytes':11096191,'decoded_sha256':'a8086008b7a072dd86483720a2a166785229753422769dbbe0749497d870f428'},'catalogue':cat,'families':[{'source_id':'gb:MDV:ADM1','parts':family}],
 'physical_evidence':phys_pin,'physical_input':physin_pin,'physical_reproduction':pin(BASE,'scripts/qualify-source-cohort.py')[0],
 'source_membership':{'index':idx,'lineage':lineage,'parts':[partpin]},'targets':targets}
config={'version':1,'selector':{'commit':BASE,'path':'data/ownership-selection.json'},'source_evidence':source_evidence}
out=ROOT/(P+'/source-evidence-002-config.json'); assert not out.exists(); raw=(json.dumps(config,separators=(',',':'),sort_keys=True)+'\n').encode();out.write_bytes(raw)
print(json.dumps({'path':out.relative_to(ROOT).as_posix(),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'source_payload':sp,'catalogue':cat,'physical_evidence':phys_pin,'physical_input':physin_pin,'targets':len(targets),'cells':850,'source_membership_part':partpin},sort_keys=True))
