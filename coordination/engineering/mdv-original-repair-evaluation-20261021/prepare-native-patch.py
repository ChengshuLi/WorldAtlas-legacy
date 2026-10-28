#!/usr/bin/env python3
"""Transcribe exact retained 850-cell candidate into the existing native patch schema."""
import hashlib,json,subprocess
from pathlib import Path
BASE='a0b1d2d9164ffd61f9a8a20cb2eb7f259d47506f'; P='coordination/engineering/mdv-original-repair-evaluation-20261021'; ROOT=Path.cwd()
def git(*a):return subprocess.check_output(['git','-c','protocol.allow=never','-C',str(ROOT),'cat-file',*a])
oid=subprocess.check_output(['git','-c','protocol.allow=never','-C',str(ROOT),'rev-parse',BASE+':'+P+'/proposed-disposition.json']).decode().strip(); raw=git('blob',oid); d=json.loads(raw)
by={}
for r in d['intervals']:
 owner=r['owner_id']; y,x0,x1=r['interval']; assert x1-x0==r['width']
 for x in range(x0,x1): by.setdefault(y,[]).append((x,owner))
rows=[]; n=0
for y, cells in sorted(by.items()):
 cells.sort(); runs=[]
 for x,owner in cells:
  if runs and runs[-1][1]==x and runs[-1][2]==owner:runs[-1][1]=x+1
  else:runs.append([x,x+1,owner])
 n+=sum(b-a for a,b,_ in runs); rows.append({'y':y,'runs':runs})
assert n==850 and len(rows)>0
out={'rows':rows}; dest=ROOT/(P+'/native-patch-001.json'); assert not dest.exists(); body=(json.dumps(out,sort_keys=True,separators=(',',':'))+'\n').encode(); dest.write_bytes(body)
print(json.dumps({'path':dest.relative_to(ROOT).as_posix(),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'cells':n,'rows':len(rows),'run_count':sum(len(r['runs']) for r in rows)},sort_keys=True))
