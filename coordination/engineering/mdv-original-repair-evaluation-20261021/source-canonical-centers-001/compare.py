#!/usr/bin/env python3
"""Exact source-vintage vs accepted-selected-geometry native-center comparison."""
import gzip, hashlib, json, math, subprocess, sys, struct
from pathlib import Path
from shapely.geometry import shape, Point
import shapely

REPO = Path(sys.argv[1]).resolve()
BASE = 'a0b1d2d9164ffd61f9a8a20cb2eb7f259d47506f'
DISP_PATH = 'coordination/engineering/mdv-original-repair-evaluation-20261021/proposed-disposition.json'
MANIFEST_PATH = 'coordination/engineering/arctic-three-retained-land-fit-repair-native-20261008/native-v9/manifest.json'
SELECTION_PATH = 'data/ownership-selection.json'
SELECTED_GEOGRAPHY_PATH = 'coordination/engineering/arctic-three-retained-land-fit-repair-native-20261008/selected-geography-bank.json'
PART_PATH = 'data/geography/part-13.json'
ADMIN_PATH = 'data/administrative-sources.json'
SHA = lambda b: hashlib.sha256(b).hexdigest()

def git(*args):
    return subprocess.check_output(['git','-c','protocol.allow=never','-C',str(REPO),*args],
        env={**__import__('os').environ,'GIT_NO_LAZY_FETCH':'1','GIT_NO_REPLACE_OBJECTS':'1',
             'GIT_CONFIG_NOSYSTEM':'1','GIT_CONFIG_GLOBAL':'/dev/null'})

def read_pin(commit, path, expected=None):
    row=git('ls-tree','-z',commit,'--',path)
    head, name = row[:-1].split(b'\t',1)
    mode, typ, oid = head.decode().split(' ')
    assert name.decode()==path and mode=='100644' and typ=='blob'
    size=int(git('cat-file','-s',oid))
    raw=git('cat-file','blob',oid)
    assert len(raw)==size
    pin={'commit':commit,'path':path,'mode':mode,'git_blob_oid':oid,'bytes':size,'sha256':SHA(raw)}
    if expected:
        for k in ('git_blob_oid','bytes','sha256'):
            if k in expected: assert pin[k]==expected[k], (path,k,pin[k],expected[k])
    return raw,pin

disp_raw,disp_pin=read_pin(BASE,DISP_PATH,{'sha256':'53390d30b36b09911df7d8c4b28e123d533e9375c385ea3f5b1251e73b41fc4e'})
disp=json.loads(disp_raw)
assert disp['package']['id']=='gb-MDV-ADM1--repair-evaluation'
assert disp['package']['original_cells']==850 and disp['package']['original_intervals']==228

manifest_raw,manifest_pin=read_pin(BASE,MANIFEST_PATH,{'sha256':'d9954fa51d18e4ce785679f920e4b6ac1ebd3cf07ce03fa7e7e674cb2a42faba'})
manifest=json.loads(manifest_raw)
selection_raw,selection_pin=read_pin(BASE,SELECTION_PATH)
selection=json.loads(selection_raw)
bank_raw,bank_pin=read_pin(BASE,SELECTED_GEOGRAPHY_PATH,{'sha256':selection['native_selection']['selected_geography']['sha256']})
bank=json.loads(bank_raw)
part_entry=next(p for p in bank['unchanged_files'] if p['path']==PART_PATH)
assert not any(p.get('logical_path',p.get('path'))==PART_PATH for p in bank['overrides'])
part_raw,part_pin=read_pin(part_entry['commit'],PART_PATH,part_entry)
base_part_raw,base_part_pin=read_pin(BASE,PART_PATH)
assert part_raw==base_part_raw and part_pin['git_blob_oid']==base_part_pin['git_blob_oid']

source_pin=next(p for p in disp['input_pins'] if p['path']=='coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-MDV-ADM1-000.bin.gz')
source_gz,source_gz_pin=read_pin(source_pin['commit'],source_pin['path'],source_pin)
source_raw=gzip.decompress(source_gz)
assert len(source_raw)==disp['source_identity']['original_geometry_payload_bytes']
assert SHA(source_raw)==disp['source_identity']['original_geometry_payload_sha256']
source=json.loads(source_raw)
assert source['type']=='FeatureCollection' and len(source['features'])==21

lat_meta=manifest['native_latitudes']
lat_gz,lat_pin=read_pin(lat_meta['commit'],lat_meta['path'],lat_meta)
lat_raw=gzip.decompress(lat_gz)
assert len(lat_raw)==lat_meta['decoded_bytes'] and SHA(lat_raw)==lat_meta['decoded_sha256']
assert len(lat_raw)==manifest['size']*8 and manifest['size']==262166
lat=struct.unpack('<%dd'%manifest['size'],lat_raw)

bounds_meta=manifest['original_assets']['bounds']
bounds_gz,bounds_pin=read_pin(bounds_meta['commit'],bounds_meta['path'],bounds_meta)
bounds_raw=gzip.decompress(bounds_gz)
assert len(bounds_raw)==11096191 and SHA(bounds_raw)=='a8086008b7a072dd86483720a2a166785229753422769dbbe0749497d870f428'
bounds=json.loads(bounds_raw)

admin_raw,admin_pin=read_pin(BASE,ADMIN_PATH)
admin=json.loads(admin_raw)
admin_mdv=admin['gb:MDV:ADM1']
assert admin_mdv['boundaryYearRepresented']=='2017' and admin_mdv['boundaryCanonical']=='Unknown'

src={f"gb:MDV:ADM1:{f['properties']['shapeID']}":f for f in source['features']}
current=json.loads(part_raw)
cur={f['id']:f for f in current['features'] if f.get('id','').startswith('gb:MDV:ADM1:')}
assert len(src)==21 and len(cur)==19
assert sum(1 for f in source['features'] if not shape(f['geometry']).is_valid)==0
assert sum(1 for f in cur.values() if not shape(f['geometry']).is_valid)==0

cells=[]
for r in disp['intervals']:
    y,x0,x1=r['interval']
    assert x1-x0==r['width'] and r['source_feature_id'] in src
    for x in range(x0,x1):
        cells.append({'owner':r['owner_id'],'source_id':r['source_feature_id'],'y':y,'x':x,'class':r['queue_physical_class']})
assert len(cells)==850 and len({(c['owner'],c['y'],c['x']) for c in cells})==850
owner_ids=sorted({c['owner'] for c in cells})
for owner in owner_ids:
    # The original retained roster is zero-based by owner id; its stored row index is one-based.
    row=bounds[owner-1]
    assert row['index']==owner and row['id']==next(c['source_id'] for c in cells if c['owner']==owner)

from collections import Counter, defaultdict
candidate_counts=Counter(); missing_current=[]; source_miss=[]; current_any=0; current_target_hits=0; original_any=0; original_multi=0
for c in cells:
    lon=(360*c['x']+180-180*manifest['size'])/manifest['size']
    point=Point(lon,lat[c['y']])
    original_cover=[sid for sid,f in src.items() if shape(f['geometry']).covers(point)]
    current_cover=[sid for sid,f in cur.items() if shape(f['geometry']).covers(point)]
    candidate_counts[c['source_id']]+=1
    if c['source_id'] not in original_cover: source_miss.append((c['owner'],c['y'],c['x']))
    if original_cover: original_any+=1
    if len(original_cover)>1: original_multi+=1
    if c['source_id'] in cur and shape(cur[c['source_id']]['geometry']).covers(point): current_target_hits+=1
    if current_cover: current_any+=1
    if c['source_id'] not in cur: missing_current.append(c['source_id'])

missing_source_ids=sorted(set(src)-set(cur))
current_rows=[]
for sid,f in sorted(src.items()):
    cf=cur.get(sid)
    current_rows.append({'source_id':sid,'name':f['properties']['shapeName'],'current_feature_present':cf is not None,
      'source_geom_type':f['geometry']['type'],'current_geom_type':cf['geometry']['type'] if cf else None,
      'current_reference_year':cf.get('properties',{}).get('metadata',{}).get('reference_year') if cf else None,
      'current_source_role':cf.get('properties',{}).get('metadata',{}).get('source_role') if cf else None,
      'current_semantic_review':cf.get('properties',{}).get('metadata',{}).get('semantic_review',{}).get('status') if cf else None,
      'source_geometry_sha256':SHA(json.dumps(f['geometry'],ensure_ascii=False,separators=(',',':'),allow_nan=False).encode()),
      'current_geometry_sha256':SHA(json.dumps(cf['geometry'],ensure_ascii=False,separators=(',',':'),allow_nan=False).encode()) if cf else None})

tuple_payload=json.dumps(sorted([[c['owner'],c['y'],c['x']] for c in cells]),separators=(',',':')).encode()
report={'version':1,'kind':'mdv-original-current-native-center-comparison','status':'diagnostic-only','package_id':'gb-MDV-ADM1--repair-evaluation',
 'accepted_base':BASE,'original_scope':{'cells':850,'intervals':228,'cell_class_counts':{'land':850,'inland-water':0},'owners':owner_ids,
   'tuple_set_sha256':SHA(tuple_payload)},
 'inputs':{'disposition':disp_pin,'selected_ownership':selection_pin,'selected_geography_bank':bank_pin,
   'current_part13':part_pin,'original_simplified_source':{**source_gz_pin,'decoded_bytes':len(source_raw),'decoded_sha256':SHA(source_raw)},
   'original_native_manifest':manifest_pin,'native_latitudes':{**lat_pin,'decoded_bytes':len(lat_raw),'decoded_sha256':SHA(lat_raw)},
   'original_owner_bounds':{**bounds_pin,'decoded_bytes':len(bounds_raw),'decoded_sha256':SHA(bounds_raw)},'administrative_source_metadata':admin_pin},
 'source_product':{'family':'gb:MDV:ADM1','feature_count':21,'represented_year':'2017','recorded_source':admin_mdv['boundarySource'],
   'boundary_canonical':admin_mdv['boundaryCanonical'],'license':admin_mdv['boundaryLicense'],'rights_compliance_assessment':'not performed'},
 'selected_geometry_binding':{'selected_release_id':bank['release_id'],'selected_geography_kind':bank['kind'],
   'part13_source_commit':part_entry['commit'],'part13_blob':part_entry['git_blob_oid'],'part13_sha256':part_pin['sha256'],
   'part13_is_override':False,'current_mdv_feature_count':len(cur),'original_features_without_current_part13_counterpart':missing_source_ids},
 'owner_source_binding':{'checked_owner_ids':owner_ids,'bounds_roster_rows_match_exact_source_ids':True,
   'candidate_feature_counts':dict(sorted(candidate_counts.items()))},
 'center_test':{'method':'For each original one-cell queue tuple, longitude=(360*x+180-180*262166)/262166; latitude is the exact binary64 row value from the pinned normative native-latitude table. Shapely 2D Point.covers against the complete retained 2017 source family and the exact selected current part-13 MDV feature family.',
   'runtime':{'python':sys.version,'shapely':shapely.__version__,'geos':shapely.geos_version_string},
   'candidate_center_count':len(cells),'covered_by_own_2017_source_feature':len(cells)-len(source_miss),
   'covered_by_any_2017_source_family_feature':original_any,'covered_by_multiple_2017_source_features':original_multi,
   'covered_by_own_current_selected_feature':current_target_hits,'covered_by_any_current_selected_md v_family_feature'.replace(' ', ''):current_any,
   'cells_missing_from_current_feature':len(set(missing_current)),'per_source_feature':current_rows},
 'limits':['This tests source-relative original cell-center membership only; it does not establish whole-cell support, source uniqueness outside the complete retained 21-feature family, current law, territory status, rights compliance, or acceptance.',
   'The archived block-level land-support rows remain separate from a whole-target physical comparison; no physical producer result is claimed.',
   'Current feature metadata continues to identify the 2017 source vintage and open semantic review; source/canonical mismatch is a diagnostic, not a legal threshold or veto.',
   'No native authority patch, selected-owner acceptance, bank change, or credit is produced.']}
report['center_test']['all_candidate_points_within_own_2017_source_feature']=not source_miss
report['center_test']['all_candidate_points_within_any_current_selected_md v_family_feature'.replace(' ', '')]=current_any==len(cells)
report['center_test']['candidate_points_missing_from_own_current_feature']=len(cells)-current_target_hits
report['center_test']['original_source_family_feature_count']=len(src)
report['center_test']['current_selected_family_feature_count']=len(cur)
report['center_test']['current_family_features']=current_rows
outdir=REPO/'coordination/engineering/mdv-original-repair-evaluation-20261021/source-canonical-centers-001'
outdir.mkdir(exist_ok=True)
assert not (outdir/'report.json').exists() and not (outdir/'receipt.json').exists()
payload=(json.dumps(report,ensure_ascii=False,sort_keys=True,separators=(',',':'),allow_nan=False)+'\n').encode()
(outdir/'report.json').write_bytes(payload)
receipt={'version':1,'kind':'mdv-source-current-center-comparison-receipt','complete':True,'accepted_base':BASE,
 'code_path':'coordination/engineering/mdv-original-repair-evaluation-20261021/source-canonical-centers-001/compare.py',
 'code_sha256':SHA(Path(__file__).read_bytes()),'output_path':'coordination/engineering/mdv-original-repair-evaluation-20261021/source-canonical-centers-001/report.json',
 'output_bytes':len(payload),'output_sha256':SHA(payload),'source_centers_in_2017_candidate_geometry':len(cells)-len(source_miss),
 'source_centers_in_selected_current_family':current_any,'source_centers_in_own_selected_current_geometry':current_target_hits,
 'credit':0,'authority_emitted':False}
(outdir/'receipt.json').write_text(json.dumps(receipt,sort_keys=True,separators=(',',':'))+'\n')
print(json.dumps(receipt,sort_keys=True))
