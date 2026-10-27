#!/usr/bin/env python3
"""Apply retained MDV whole-target physical support/issue geometries to exact source centers."""
import gzip, hashlib, json, os, struct, subprocess
from pathlib import Path
from shapely.geometry import Point, shape
from shapely import __version__ as shapely_version, geos_version_string
BASE='a0b1d2d9164ffd61f9a8a20cb2eb7f259d47506f'
ROOT=Path.cwd()
PKG='coordination/engineering/mdv-original-repair-evaluation-20261021'
PHYS=f'{PKG}/physical-001/whole-target-support.json'
INPUTS=f'{PKG}/source-canonical-centers-001/physical-stage-inputs.json'
DISP=f'{PKG}/proposed-disposition.json'
MANIFEST='coordination/engineering/arctic-three-retained-land-fit-repair-native-20261008/native-v9/manifest.json'
sha=lambda b:hashlib.sha256(b).hexdigest()
env={**os.environ,'GIT_NO_LAZY_FETCH':'1','GIT_NO_REPLACE_OBJECTS':'1','GIT_CONFIG_NOSYSTEM':'1','GIT_CONFIG_GLOBAL':'/dev/null'}
def git(*args): return subprocess.check_output(['git','-c','protocol.allow=never','-C',str(ROOT),*args],env=env)
def pin(commit,path):
 row=git('ls-tree','-z',commit,'--',path); h,n=row[:-1].split(b'\t',1); mode,typ,oid=h.decode().split()
 assert n.decode()==path and mode=='100644' and typ=='blob'
 raw=git('cat-file','blob',oid)
 return raw,{'commit':commit,'path':path,'mode':mode,'git_blob_oid':oid,'bytes':len(raw),'sha256':sha(raw)}
def filepin(path):
 raw=(ROOT/path).read_bytes(); return raw,{'path':path,'bytes':len(raw),'sha256':sha(raw)}
phys_raw,phys_pin=filepin(PHYS); phys=json.loads(phys_raw)
in_raw,in_pin=filepin(INPUTS); inputs=json.loads(in_raw)
disp_raw,disp_pin=pin(BASE,DISP); disp=json.loads(disp_raw)
man_raw,man_pin=pin(BASE,MANIFEST); manifest=json.loads(man_raw)
lat_meta=manifest['native_latitudes']; lat_gz,lat_pin=pin(lat_meta['commit'],lat_meta['path']); lat_raw=gzip.decompress(lat_gz)
assert len(lat_raw)==lat_meta['decoded_bytes'] and sha(lat_raw)==lat_meta['decoded_sha256']
lat=struct.unpack('<%dd'%(len(lat_raw)//8),lat_raw); n=len(lat)
assert n==262166
assert len(phys['results'])==len(inputs)==6
# Index physical result and exact source stage input by actual target identifier.
pr={r['target']:r for r in phys['results']}; ir={r['target']:r for r in inputs}
assert set(pr)==set(ir)
# Collect original interval tuples exactly as retained; no recomputed scope.
cells=[]
for row in disp['intervals']:
 y,x0,x1=row['interval']; assert x1-x0==row['width']
 for x in range(x0,x1): cells.append({'owner':row['owner_id'],'y':y,'x':x,'target':row['source_feature_id'],'class':row['queue_physical_class']})
assert len(cells)==850 and len({(c['owner'],c['y'],c['x']) for c in cells})==850

def gshape(g): return shape(g)
def point(c):
 # Same native-cell center formula as pinned accepted comparator.
 lon=(360*c['x']+180-180*n)/n
 return Point(lon,lat[c['y']])
# Categories are direct center-in-physical-output checks, not whole-cell/support certification.
categories=['mapped_land_support','mapped_inland_water_support','outside_mapped_L1_context','hierarchy_disagreements','missing_reconstruction','extra_reconstruction','contradictory_land_water_support']
counts={k:0 for k in categories}; hits={k:[] for k in categories}; per_target={}
for c in cells:
 r=pr[c['target']]; p=point(c); h={}
 for name in categories:
  geom=r['support'][name]
  inside=False
  if geom and geom.get('type') and (geom.get('coordinates') or geom.get('geometries')):
   inside=gshape(geom).covers(p)
  if inside:
   counts[name]+=1; hits[name].append([c['owner'],c['y'],c['x']]); h[name]=True
 # Issues array repeats some support geometry by reason; report separately and cross-check.
 issue_reasons=[]
 for issue in r['issues']:
  if gshape(issue['geometry']).covers(p): issue_reasons.append(issue['reason'])
 if issue_reasons: h['reported_issue_records']=sorted(issue_reasons)
 tid=c['target']; t=per_target.setdefault(tid,{'owner':c['owner'],'class_counts':{},'center_hits':{k:0 for k in categories},'issue_record_count':len(r['issues'])})
 t['class_counts'][c['class']]=t['class_counts'].get(c['class'],0)+1
 for k in h:
  if k in categories: t['center_hits'][k]+=1
# Confirm complete categorical hit lists and report record-level issues distinctly.
issue_records=[]
for tid,r in sorted(pr.items()):
 for i,issue in enumerate(r['issues']):
  issue_records.append({'target':tid,'owner_id':ir[tid]['owner_id'],'issue_index':i,'reason':issue['reason'],'geometry_sha256':sha(json.dumps(issue['geometry'],sort_keys=True,separators=(',',':')).encode())})
# Every center belongs exactly to input target owner; native source-family coverage separately retained in prior report.
assert all(c['target'] in pr and c['owner']==ir[c['target']]['owner_id'] for c in cells)
# Query-level report's explicit issues and named support geometries must agree on center hits.
for tid,r in sorted(pr.items()):
 for reason in ('missing_reconstruction','extra_reconstruction'):
  sup=r['support'][reason]
  n1=sum(gshape(sup).covers(point(c)) for c in cells if c['target']==tid) if sup and (sup.get('coordinates') or sup.get('geometries')) else 0
  n2=sum(any(i['reason']==reason and gshape(i['geometry']).covers(point(c)) for i in r['issues']) for c in cells if c['target']==tid)
  assert n1==n2,(tid,reason,n1,n2)
keyhash=sha(json.dumps(sorted([[c['owner'],c['y'],c['x']] for c in cells]),separators=(',',':')).encode())
report={'version':1,'kind':'mdv-whole-target-physical-center-application','status':'source-relative-center-screen-only','package_id':'gb-MDV-ADM1--repair-evaluation','accepted_input_base':BASE,
 'scope':{'cells':len(cells),'intervals':disp['package']['original_intervals'],'land_cells':850,'inland_water_cells':0,'owners':sorted({c['owner'] for c in cells}),'exact_tuple_sha256':keyhash},
 'inputs':{'whole_target_support':phys_pin,'physical_stage_inputs':in_pin,'original_disposition':disp_pin,'native_manifest':man_pin,'native_latitude_compressed':lat_pin,'native_latitude_decoded_bytes':len(lat_raw),'native_latitude_decoded_sha256':sha(lat_raw)},
 'method':{'predicate':'Shapely geometry covers exact normative native-cell center','longitude_formula':'(360*x+180-180*262166)/262166','latitude':'exact binary64 row from pinned native latitude table','runtime':{'python':subprocess.check_output(['python3','--version']).decode().strip(),'shapely':shapely_version,'geos':geos_version_string},'physical_operation_replayed':False},
 'whole_target_issue_records':{'count':len(issue_records),'records':issue_records},
 'candidate_center_intersections':{'counts_by_physical_output_geometry':counts,'keys_by_geometry':hits,'per_target':per_target},
 'limitations':['This applies reported whole-target physical support and issue geometries only to original candidate cell centers. It does not establish whole-cell support, lawful or current administrative applicability, rights compliance, source uniqueness outside the retained comparison set, native authority, selected ownership, bank acceptance, or credit.','Whole-target issue records remain contextual evidence even when no candidate center intersects them; absence of center intersections does not negate target-level issues.','The earlier block-support result and source-versus-current geometry comparison are separate operands. No producer/source geometry was rerun in this step.']}
out=Path(PKG)/'physical-001/center-application.json'; payload=(json.dumps(report,sort_keys=True,separators=(',',':'),allow_nan=False)+'\n').encode(); out.write_bytes(payload)
receipt={'version':1,'kind':'mdv-physical-center-application-receipt','complete':True,'code_path':f'{PKG}/physical-001/apply-centers.py','code_sha256':sha(Path(__file__).read_bytes()),'output_path':out.as_posix(),'output_bytes':len(payload),'output_sha256':sha(payload),'tuple_count':len(cells),'tuple_sha256':keyhash,'physical_producer_replayed':False,'native_authority_emitted':False,'acceptance_or_credit':0}
rp=Path(PKG)/'physical-001/center-application-receipt.json'; rb=(json.dumps(receipt,sort_keys=True,separators=(',',':'))+'\n').encode(); rp.write_bytes(rb)
print(json.dumps(receipt,sort_keys=True)); print(json.dumps({'center_hits':counts,'issue_record_count':len(issue_records),'per_target':per_target},sort_keys=True))
