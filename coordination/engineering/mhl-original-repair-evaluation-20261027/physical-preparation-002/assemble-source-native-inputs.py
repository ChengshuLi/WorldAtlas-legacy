#!/usr/bin/env python3
import gzip, hashlib, json, pathlib, subprocess
SCRIPT=pathlib.Path(__file__).resolve()
OUT=SCRIPT.parent
R=OUT.parents[3]
OBS=OUT/'owner-observation.json'
CW=OUT/'current-target-bindings.json'
STAGE=OUT/'original-stage-inputs.json'
REPORT=OUT/'whole-target-support.json'
RECEIPT=pathlib.Path('/workspace/shared/worldatlas-MHL-physical-execution-receipt-20261027.json')
CENTER=OUT/'center-physical-application.json'
ORIG='23318dd9d70680495138297b9cc1a7533a466200'
CURRENT='e4c8c12d8aa93f15071f5a00c66542e9db586188'
PHYSICAL_CODE=CURRENT
QUEUE='coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json'
CATALOGUE='coordination/engineering/global-current-cell-work-queue-20261014/retained-source-catalogue.json'
SOURCE='coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-MHL-ADM1-000.bin.gz'
PART_PATH='data/geography/part-15.json'

def sha(b): return hashlib.sha256(b).hexdigest()
def readjson(p): return json.loads(pathlib.Path(p).read_bytes())
def git(*args): return subprocess.check_output(['/opt/codex/runtimes/codex-primary-runtime/dependencies/bin/fallback/git','-C',str(R),*args],env={**__import__('os').environ,'GIT_NO_LAZY_FETCH':'1','GIT_NO_REPLACE_OBJECTS':'1'})
def gitshow(commit,path): return git('show',f'{commit}:{path}')
def pin(commit,path):
    line=git('ls-tree','-l',commit,'--',path).decode().strip()
    assert line and line.endswith('\t'+path), (commit,path,line[:300])
    meta=line.split('\t',1)[0].split()
    mode,typ,oid=meta[:3]; n=int(meta[3])
    assert typ=='blob' and mode=='100644'
    raw=gitshow(commit,path); assert len(raw)==n
    return {'commit':commit,'path':path,'mode':mode,'git_blob_oid':oid,'bytes':len(raw),'sha256':sha(raw)}

def write(name,obj):
    p=OUT/name;p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(json.dumps(obj,separators=(',',':'),ensure_ascii=False)+'\n')
    return p

obs=readjson(OBS);cw=readjson(CW);stage=readjson(STAGE);report=readjson(REPORT);receipt=readjson(RECEIPT);center=readjson(CENTER);part_raw=gitshow(CURRENT,PART_PATH);part=json.loads(part_raw)
assert sha(OBS.read_bytes())=='8571fc4c2bc7a3e65445300a69d7c41e1a373fb50394892ebb71ccced73c4c43'
assert sha(CW.read_bytes())=='5cdbc83095aae6027ef6a261a0d0b1e92633db345345bb42c74b783f97c1a86f'
assert sha(STAGE.read_bytes())=='0b609a7313eec12d6e3fe8b04caf70c5cddbb1e0a69bbb0f3b3612657dae87d9'
assert sha(REPORT.read_bytes())=='8d9bfd14fac83a8dcf6229bfa5f1390ae5944ab2b8d2bd023d911f809d6b6743'
assert sha(RECEIPT.read_bytes())=='319210a3524fcde649d28f57f381a86f7a0e8ab087e16f63581b7cd20d6bbbeb'
assert sha(CENTER.read_bytes())=='117295a167041994ee1243ddc52986f9cd7b5d8c0c0e7094bf84e7a4964095c1'
assert obs['commit']==CURRENT and obs['original_package']['package_id']=='gb-MHL-ADM1--repair-evaluation'
assert obs['query_count']==1019 and obs['original_package']['land_cells']==1019 and obs['original_package']['interval_segments']==456
assert obs['original_intervals_sha256']==center['original_intervals_sha256'] and obs['original_intervals_sha256']=='cb7955ee827b914e36da60f00b94b2efdc6ab7834aa4a7e1da0f354b923cc10b'
assert cw['source_contract']['queue_commit']==ORIG and cw['source_contract']['package_id']==obs['original_package']['package_id']
assert cw['current_selected_geometry_contract']['selected_part_pin']['sha256']=='6f763059820d14a4eab78173a756a8869821dd810e94f77c20eb5510c6cfb1df'
assert sha(part_raw)==cw['current_selected_geometry_contract']['selected_part_pin']['sha256']
assert part['type']=='FeatureCollection' and len(part['features'])==1500
q=json.loads(gitshow(ORIG,QUEUE)); rows=[x for x in q['packages'] if x['package_id']=='gb-MHL-ADM1--repair-evaluation']
assert len(rows)==1; qrow=rows[0]
assert (qrow['land_cells'],qrow['inland_water_cells'],qrow['source_relative_cells'],qrow['interval_segments'])==(1019,0,0,456)
assert qrow['source_families']==[210] and len(qrow['owners'])==18 and len(qrow['source_features'])==18 and qrow['native_blocks']==[29,30,31]
source_gz=gitshow(ORIG,SOURCE); assert len(source_gz)==13024 and sha(source_gz)=='654ca6975c64c8e896e0a44b8f5e5615f554ea148943631536e765f8ad5ba426'
source_raw=gzip.decompress(source_gz); assert len(source_raw)==43531 and sha(source_raw)=='3d8796e20258f512b78a9ca77cb1008b6dbef227dcc89f600ebd81aacffd1390'
source=json.loads(source_raw)
assert source['type']=='FeatureCollection' and len(source['features'])==24
orig_by_id={f"gb:MHL:ADM1:{f['properties']['shapeID']}":f for f in source['features']}
assert len(orig_by_id)==24
crosswalk=cw['crosswalk']; assert len(crosswalk)==24
cw_by_id={r['source_feature_id']:r for r in crosswalk}; assert len(cw_by_id)==24 and set(cw_by_id)==set(orig_by_id)
current_by_id={f['id']:f for f in part['features'] if f.get('id') in cw_by_id}
assert len(current_by_id)==24 and set(current_by_id)==set(cw_by_id)
positive_indices=set(qrow['source_features']); positive_ids={r['source_feature_id'] for r in crosswalk if r['positive_repair_member']}
assert len(positive_indices)==len(positive_ids)==18
assert {r['source_feature_index'] for r in crosswalk if r['positive_repair_member']}==positive_indices
assert all(r['source_context_only']==(not r['positive_repair_member']) for r in crosswalk)
assert sum(r['source_context_only'] for r in crosswalk)==6
for sid,r in cw_by_id.items():
    src=orig_by_id[sid]; cur=current_by_id[sid]
    assert src['properties']['shapeName']==r['source_name'] and src['properties']['shapeID']==r['source_shape_id']
    assert cur['id']==r['current_target_id']==sid and cur['properties']['id']==sid
    assert cur['properties']['parent_id']==r['current_target_parent_id']
    assert r['current_owner_index'] in qrow['owners'] or not r['positive_repair_member']

feature_owner={};key_rows=[];by_y={};coverage={}
for block in obs['original_intervals']:
    assert block['block'] in [29,30,31]
    for row in block['rows']:
        assert len(row)==6
        y,x0,x1,owners,features,klass=row
        assert isinstance(y,int) and 0<=x0<x1<=262166 and klass=='land'
        assert len(owners)==len(features)==1
        owner,feature=owners[0],features[0]
        assert feature in positive_indices and owner in qrow['owners']
        prior=feature_owner.setdefault(feature,owner); assert prior==owner
        assert cw_by_id[next(r['source_feature_id'] for r in crosswalk if r['source_feature_index']==feature)]['current_owner_index']==owner
        by_y.setdefault(y,[]).append([x0,x1,owner])
        coverage.setdefault(owner,{}).setdefault(y,[]).append([x0,x1,'mapped_land_support'])
        key_rows.extend((owner,y,x) for x in range(x0,x1))
assert len(feature_owner)==18 and set(feature_owner)==positive_indices
assert len(key_rows)==1019 and len(set(key_rows))==1019
observed={(k['y'],k['x']) for k in obs['keys']}
assert observed=={(y,x) for _,y,x in key_rows}
query=json.dumps([{'x':k['x'],'y':k['y']} for k in obs['keys']],separators=(',',':'),ensure_ascii=False).encode()+b'\n'
assert sha(query)==obs['query_sha256']
assert len(obs['original_intervals'])==3 and sum(len(b['rows']) for b in obs['original_intervals'])==456
patch_rows=[]
for y,spans in sorted(by_y.items()):
    spans.sort()
    runs=[]
    for start,end,owner in spans:
        assert not runs or start>=runs[-1][1], (y,start,end,runs[-1])
        if runs and start==runs[-1][1] and owner==runs[-1][2]: runs[-1][1]=end
        else: runs.append([start,end,owner])
    patch_rows.append({'y':y,'runs':runs})
coverage_rows={}
for owner,yrows in coverage.items():
    rows=[]
    for y,spans in sorted(yrows.items()):
        spans.sort();runs=[]
        for start,end,kind in spans:
            assert not runs or start>=runs[-1][1]
            if runs and start==runs[-1][1] and kind==runs[-1][2]: runs[-1][1]=end
            else:runs.append([start,end,kind])
        rows.append({'y':y,'runs':runs})
    coverage_rows[owner]=rows
assert set(coverage_rows)==set(qrow['owners'])
physical_targets={x['target'] for x in report['results']}; assert physical_targets==positive_ids and len(report['results'])==18
assert receipt['complete'] is True and len(receipt['outputs'])==1
assert receipt['outputs'][0]['sha256']=='8d9bfd14fac83a8dcf6229bfa5f1390ae5944ab2b8d2bd023d911f809d6b6743'
assert receipt['outputs'][0]['path'].endswith('/whole-target-support.json')
assert receipt['inputs'][0]['sha256']=='0b609a7313eec12d6e3fe8b04caf70c5cddbb1e0a69bbb0f3b3612657dae87d9'
issues=[i for r in report['results'] for i in r.get('issues',[])]
reason_counts={}
for i in issues: reason_counts[i['reason']]=reason_counts.get(i['reason'],0)+1
assert len(issues)==14 and reason_counts.get('missing_reconstruction')==5 and reason_counts.get('extra_reconstruction')==9
assert center['center_application']['issue_contact_point_count']==0
assert center['center_application']['source_geometry_center_cover_count']==1019
assert center['center_application']['physical_support_center_counts']['mapped_land_support']==1019 and all(center['center_application']['physical_support_center_counts'][k]==0 for k in center['center_application']['physical_support_center_counts'] if k!='mapped_land_support')
# The retained physical producer's original stage remains immutable; this joined
# input adds only exact accepted current-target geometries for the later native evaluator.
stage_by_id={r['target']:r for r in stage}; assert len(stage_by_id)==18 and set(stage_by_id)==positive_ids
physical_inputs=[];targets=[]
for sid in sorted(positive_ids):
    src=orig_by_id[sid];cur=current_by_id[sid];r=cw_by_id[sid];owner=r['current_owner_index']
    assert stage_by_id[sid]['consumed']=={'geometry':src['geometry'],'properties':src['properties']}
    physical_inputs.append({'target':sid,'consumed':stage_by_id[sid]['consumed'],
      'selected':{'id':sid,'geometry':cur['geometry'],'properties':cur['properties']}})
    targets.append({'id':sid,'target_id':sid,'source_family':'gb:MHL:ADM1','pixelIndex':owner,
      'base_geometry':cur['geometry'],'source_receipt_sha256':'8d9bfd14fac83a8dcf6229bfa5f1390ae5944ab2b8d2bd023d911f809d6b6743',
      'coverage_classes':['mapped_land_support'],'coverage_rows':coverage_rows[owner]})
OUT.mkdir(parents=True,exist_ok=True)
write('physical-inputs.json',physical_inputs)
write('original-native-patch.json',{'rows':patch_rows})
write('source-targets.json',targets)
# The exact execution receipt stays private because its runtime inventory contains
# another worker's private virtual-environment paths. Publish a derived, pin-complete
# summary and retain the byte-exact receipt at its private shared keeper.
receipt_summary={'version':1,'kind':'mhl-gshhg-physical-execution-summary-v1',
 'source_receipt_sha256':sha(RECEIPT.read_bytes()),'source_receipt_bytes':RECEIPT.stat().st_size,
 'complete':receipt['complete'],'program':receipt['program'],'inputs':receipt['inputs'],'outputs':receipt['outputs'],
 'elapsed_seconds':receipt['elapsed_seconds'],'limits':receipt['limits'],
 'fresh_admission':{k:v for k,v in receipt['fresh_admission'].items() if k!='runtime_files'},
 'runtime_file_count':len(receipt['fresh_admission']['runtime_files']),'runtime':report.get('runtime')}
write('execution-summary.json',receipt_summary)

source_catalogue_pin=pin(CURRENT,CATALOGUE)
current_pins={p:pin(CURRENT,p) for p in ['data/world-index.json','data/semantic-report.json',PART_PATH]}
source_pin=pin(ORIG,SOURCE); source_pin.update(decoded_bytes=43531,decoded_sha256='3d8796e20258f512b78a9ca77cb1008b6dbef227dcc89f600ebd81aacffd1390')
queue_pin=pin(ORIG,QUEUE)
physical_code_pin=pin(PHYSICAL_CODE,'scripts/qualify-source-cohort.py')
assert physical_code_pin['sha256']=='abc801b9a35d20c9f0dfe3bbc9bb2cb7dc107f1758414970d9cde11380574a18'
# Copy the finite original queue record, not the complete source package registry.
write('frozen-queue-record.json',{'version':1,'kind':'mhl-original-queue-record-pin-v1','pin':queue_pin,'record':qrow})
script_path=SCRIPT
audit={'version':1,'kind':'mhl1019-source-physical-native-input-assembly-audit-v1',
 'status':'preparation-only; no native constructor, final-bank result, acceptance, or credit claimed',
 'original_scope':{'package_id':qrow['package_id'],'queue_commit':ORIG,'queue_pin':queue_pin,
   'primary_source':'gb:MHL:ADM1','source_family_index':210,'land_cells':1019,'inland_water_cells':0,
   'source_relative_cells':0,'interval_segments':456,'positive_owners':18,'positive_features':18,'native_blocks':[29,30,31]},
 'complete_original_family':{'key':'gb:MHL:ADM1','source_pin':source_pin,'feature_count':24,
   'positive_ids':sorted(positive_ids),'context_only_ids':sorted(set(orig_by_id)-positive_ids),
   'context_only_count':6,'companion_physical_interpretation_excluded':True},
 'current_membership':{'commit':CURRENT,'index':current_pins['data/world-index.json'],
   'lineage':current_pins['data/semantic-report.json'],'part':current_pins[PART_PATH],
   'direct_source_id_matches':24,'source_to_current_geometry_differences':sum(orig_by_id[s]['geometry']!=current_by_id[s]['geometry'] for s in orig_by_id),
   'crosswalk_path':'current-target-bindings.json','crosswalk_sha256':sha(CW.read_bytes()),'crosswalk_bytes':CW.stat().st_size,
   'current_target_role':'The actual selected current geometry is the base geometry; source geometry remains a separate consumed member.'},
 'exact_native_scope':{'owner_observation_path':'owner-observation.json','owner_observation_sha256':sha(OBS.read_bytes()),
   'owner_observation_bytes':OBS.stat().st_size,'query_count':len(obs['keys']),'query_sha256':obs['query_sha256'],
   'interval_evidence_sha256':obs['original_intervals_sha256'],'unique_expanded_original_keys':len(key_rows),
   'patch_run_rows':len(patch_rows),'coverage_owners':len(coverage_rows),'classes':['mapped_land_support'],
   'crosscheck':'Expanded original interval keys equal the exact retained owner-observer key set; each interval is land with one owner and one positive source index.'},
 'physical':{'report_path':'whole-target-support.json','report_sha256':sha(REPORT.read_bytes()),'report_bytes':REPORT.stat().st_size,
   'receipt_sha256':sha(RECEIPT.read_bytes()),'receipt_bytes':RECEIPT.stat().st_size,'receipt_private_keeper':True,
   'producer_program':physical_code_pin,'producer_original_stage_pin':receipt['inputs'][0],
   'targets':18,'issues':len(issues),'issues_by_reason':reason_counts,
   'center_application_path':'center-physical-application.json','center_application_sha256':sha(CENTER.read_bytes()),
   'center_land_support':1019,'center_issue_contacts':0,
   'limit':'Whole-target GSHHG reconstruction issues are retained; zero center issue contacts do not erase them.'},
 'derived_inputs':{},
 'limits':['Source represented-year and ODbL/attribution facts remain as recorded; no legal current-map certification is inferred.',
   'The six context-only source members are retained in the complete 24-feature competitor family but are not repair targets or denominator cells.',
   'Current selected-owner observation is separate and does not by itself qualify source applicability.',
   'No companion 4,110 source-relative package cells, settlement/population data, or unrelated owner scope are imported.']}
for n in ['physical-inputs.json','original-native-patch.json','source-targets.json','frozen-queue-record.json','execution-summary.json']:
    b=(OUT/n).read_bytes(); audit['derived_inputs'][n]={'bytes':len(b),'sha256':sha(b)}
audit['assembly_program']={'path':str(script_path.relative_to(R)),'sha256':sha(script_path.read_bytes())}
write('input-assembly-audit.json',audit)
print(json.dumps({'output':str(OUT),'files':[(p.name,p.stat().st_size,sha(p.read_bytes())) for p in sorted(OUT.iterdir())],
 'keys':len(key_rows),'patch_rows':len(patch_rows),'intervals':456,'targets':len(targets),'family_features':24,'context_only':6,'issues':len(issues),'issues_by_reason':reason_counts},separators=(',',':')))
