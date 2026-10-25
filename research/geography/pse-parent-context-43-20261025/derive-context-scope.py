#!/usr/bin/env python3
"""Derive exact parent-only PSE keys from the retained interval and stock-contact records."""
import hashlib, json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]
PKG=ROOT/'coordination/engineering/pse-original-disposition-20261020'
DISP=PKG/'pse-disposition.json'
DIAG=PKG/'native-diagnostic-20261025-parent-context/native-diagnostic.json'
SOURCE=ROOT/'research/geography/pse-owner36955-parent-context-20261025/source-evidence.json'
MATRIX=Path('/Users/chengshuli/Documents/Codex/2026-10-20/task/inventory/pse-adm2-427-group-evidence-matrix-20261024.json')
CROSS=Path('/Users/chengshuli/Documents/Codex/2026-10-20/task/inventory/pse-adm2-427-group-source-qualification-crosswalk-20261024.json')
PARENT='gb:PSE:ADM1:83478781B28849486138516'
PARENT_SHA='d7d256d3cf9f2f133c997fd75128a2727c086eb7fcba88b28d1e8edc4155305c'
GROUPS=[(5,36953,52593,3,'Bethlehem'),(10,36956,52586,2,'Jenin'),(12,36961,52589,2,'Hebron')]
def read(p): return json.loads(p.read_text())
def pin(p):
 b=p.read_bytes(); return {'path':str(p.relative_to(ROOT)) if str(p).startswith(str(ROOT)) else str(p),'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)}
disp,diag,source=read(DISP),read(DIAG),read(SOURCE)
# Source interval rows define the original coordinates and exact feature vector.
selected=[]
for group,owner,candidate,ordinal,name in GROUPS:
 rows=[]
 for r in disp['rows']:
  y,x0,x1,owners,features,physical=r
  if owners==[owner] and tuple(features)==(52576,candidate) and physical=='land':
   rows.extend((y,x,owner) for x in range(x0,x1))
 assert len(rows)=={5:27,10:10,12:6}[group],(group,len(rows))
 selected.extend((group,owner,candidate,ordinal,name,y,x) for y,x,o in rows)
assert len(selected)==43
# Verify every selected key is still held and the one intended same-family parent contact is an interior hit.
held=set()
for r in diag['held_rows']:
 for x0,x1,owner in r['runs']:
  held.update((r['y'],x,owner) for x in range(x0,x1))
contacts={}
for r in diag['diagnostic_territorial_rows']:
 for x0,x1,owner,cs in r['runs']:
  for x in range(x0,x1): contacts[(r['y'],x,owner)]=cs
records=[]
for group,owner,candidate,ordinal,name,y,x in selected:
 assert (y,x,owner) in held,(group,y,x,owner,'not held')
 cs=contacts[(y,x,owner)]
 matches=[c for c in cs if c.get('original_source',{}).get('source_id')==PARENT and c.get('geometry_sha256')==PARENT_SHA and c.get('negative_ordinal')==ordinal and c.get('kinds')==['interior']]
 assert len(matches)==1,(group,y,x,[(c.get('original_source',{}).get('source_id'),c.get('negative_ordinal'),c.get('kinds')) for c in cs])
 # Original full source vector remains preserved in source-evidence; this adds only a contextual role decision.
 records.append({'matrix_group_id':group,'pixelIndex':owner,'y':y,'x':x,'role':'contextual','source_id':f'gb:PSE:ADM2:{ {52593:"87354302B24436251599031",52586:"87354302B37411468451868",52589:"87354302B80979559279056"}[candidate] }','target_id':f'gb:PSE:ADM2:{ {52593:"87354302B24436251599031",52586:"87354302B37411468451868",52589:"87354302B80979559279056"}[candidate] }','negative_ordinal':ordinal,'geometry_sha256':PARENT_SHA})
triples=[[r['y'],r['x'],r['pixelIndex']] for r in records]
keyhash=hashlib.sha256(json.dumps(triples,separators=(',',':')).encode()).hexdigest()
out=ROOT/'research/geography/pse-parent-context-43-20261025/scope.json'
scope={'version':1,'kind':'pse-parent-context-scope-v1','status':'exact original parent-only key scope for a source-relative stock diagnostic; no status change','package_id':'gb-PSE-ADM2--repair-evaluation','original_denominator':{'cells':427,'intervals':277,'requested_owners':11},'key_count':43,'key_set_sha256_y_x_owner':keyhash,'groups':{'matrix_group_05_bethlehem':27,'matrix_group_10_jenin':10,'matrix_group_12_hebron':6},'owner_source_vectors':{'36953':[52576,52593],'36956':[52576,52586],'36961':[52576,52589]},'records':records,'inputs':{'original_intervals':pin(DISP),'stock_native_diagnostic':pin(DIAG),'source_evidence':pin(SOURCE),'group_matrix':pin(MATRIX),'group_crosswalk':pin(CROSS)},'limits':['Only original land keys with the exact candidate and PSE ADM1 parent source-feature vector are included.','All other foreign competitor contacts remain present and continue to hold their keys.','The separate three Jerusalem-contact keys owned by 36955 are excluded.','This scope adds no source geometry and changes no native hold, selection, acceptance, legal or sovereignty status.']}
out.write_text(json.dumps(scope,indent=2,sort_keys=True)+'\n')
print(json.dumps({'records':len(records),'key_set_sha256_y_x_owner':keyhash,'group_counts':scope['groups'],'output':str(out),'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()},sort_keys=True))
