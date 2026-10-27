#!/usr/bin/env python3
"""Apply retained whole-target physical witnesses to the exact original MLT tuples.
This is a bounded diagnostic, not a qualification or acceptance writer.
"""
import gzip, hashlib, json, math, pathlib, struct, sys
from shapely.geometry import Point, shape
from shapely import __version__ as shapely_version, geos_version_string

ROOT=pathlib.Path(__file__).resolve().parents[4]
PKG='coordination/engineering/malta1196-repair-evaluation-20261027'
OBS=f'{PKG}/owner-observation-001/owner-observation.json'
COMPARISON=f'{PKG}/source-comparison-002.json'
STAGE=f'{PKG}/physical-001/member-stage-inputs.json'
PHYSICAL=f'{PKG}/physical-001/result-members-001/whole-target-support.json'
LAT={'commit':'5b32388df0501b013ac9a3ba97864932db493d59','path':'coordination/engineering/native-grid-fidelity-1010-20261005-local15/results-v1/native-row-latitudes.f64le.gz','bytes':1851757,'sha256':'ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147','decoded_bytes':2097328,'decoded_sha256':'66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23'}
GRID=262166

def sha(b): return hashlib.sha256(b).hexdigest()
def ordinary(rel):
    p=ROOT/rel
    if p.is_symlink() or not p.is_file(): raise ValueError(f'ordinary pinned file required: {rel}')
    b=p.read_bytes()
    return b, {'path':rel,'bytes':len(b),'sha256':sha(b)}
def main():
    obs_raw,obs_pin=ordinary(OBS); obs=json.loads(obs_raw)
    comp_raw,comp_pin=ordinary(COMPARISON); comp=json.loads(comp_raw)
    stage_raw,stage_pin=ordinary(STAGE); stage=json.loads(stage_raw)
    phys_raw,phys_pin=ordinary(PHYSICAL); physical=json.loads(phys_raw)
    if obs['query_count']!=1196 or len(obs['keys'])!=1196: raise ValueError('original tuple denominator mismatch')
    if comp['target_contract']['requested_cells']!=1196 or comp['selected_center_application']['tuple_count']!=1196: raise ValueError('prior source comparison denominator mismatch')
    if comp['selected_center_application']['full_miss_count']!=61: raise ValueError('full-product miss result changed')
    if len(stage)!=68 or len({s['target'] for s in stage})!=68: raise ValueError('complete unique 68-member source stage required')
    if any(s['selected']['id']!='atlas:territory:MLT' or s['selected']['source_member_count']!=68 for s in stage): raise ValueError('canonical aggregate target binding mismatch')
    stage_by_member={s['target']:s for s in stage}
    if any(s['consumed']['properties']['source_id']!=s['target'] or s['consumed']['properties']['owner_index']!=7124 for s in stage): raise ValueError('source-member/owner binding mismatch')
    source_index_to_member={44815+s['consumed']['properties']['source_feature_ordinal']:s['target'] for s in stage}
    if len(source_index_to_member)!=68: raise ValueError('duplicate source-feature ordinal')
    if len(physical['results'])!=68 or {r['target'] for r in physical['results']}!=set(stage_by_member): raise ValueError('whole-target member physical result roster mismatch')
    # Read the exact immutable native latitude operand without materializing it.
    import subprocess
    env={'GIT_NO_LAZY_FETCH':'1','GIT_NO_REPLACE_OBJECTS':'1','GIT_OPTIONAL_LOCKS':'0','GIT_CONFIG_NOSYSTEM':'1','GIT_CONFIG_GLOBAL':'/dev/null','GIT_TERMINAL_PROMPT':'0'}
    oid=subprocess.check_output(['git','-C',str(ROOT),'rev-parse',f"{LAT['commit']}:{LAT['path']}"],env=env).decode().strip()
    blob=subprocess.check_output(['git','-C',str(ROOT),'cat-file','blob',oid],env=env)
    if len(blob)!=LAT['bytes'] or sha(blob)!=LAT['sha256']: raise ValueError('native latitude compressed pin mismatch')
    lat_raw=gzip.decompress(blob)
    if len(lat_raw)!=LAT['decoded_bytes'] or sha(lat_raw)!=LAT['decoded_sha256']: raise ValueError('native latitude decoded pin mismatch')
    lats=struct.unpack('<'+('d'*(len(lat_raw)//8)),lat_raw)
    # Rebuild exact source-feature index from the recorded 1196 original intervals.
    source_for={}
    for block in obs['original_intervals']:
        for y,start,end,owners,ids,physical_class in block['rows']:
            if owners!=[7124] or len(ids)!=1 or physical_class!='land': raise ValueError('original owner/source/class tuple changed')
            for x in range(start,end):
                k=(x,y)
                if k in source_for: raise ValueError('duplicate original cell tuple')
                source_for[k]=ids[0]
    if len(source_for)!=1196 or set(source_for)!={(k['x'],k['y']) for k in obs['keys']}: raise ValueError('original interval/key tuple mismatch')
    # Check the retained exact latitudes, then apply each physical category/issue.
    physical_by_member={r['target']:r for r in physical['results']}
    first_support=physical['results'][0]['support']
    categories=['mapped_land_support','mapped_inland_water_support','outside_mapped_L1_context','missing_reconstruction','extra_reconstruction','contradictory_land_water_support',*('hierarchy:'+k for k in first_support['hierarchy_disagreements'])]
    counts={k:0 for k in categories}; issue_count=0; out=[]; latitude_rows=set(); queried_ids=set(); query_counts={'source_id_query_references':0,'queries':0,'intersects':0,'disjoint':0,'explicit_issues':0}
    stage_geom=shape(stage[0]['selected']['geometry']); target_cover=0
    for k in sorted(obs['keys'],key=lambda a:(a['y'],a['x'])):
        x,y=k['x'],k['y']; lat=lats[y]; latitude_rows.add(y)
        if k['latitude']!=lat: raise ValueError('owner observation latitude differs from normative native row table')
        lon=(x+0.5)/GRID*360-180; point=Point(lon,lat)
        source_index=source_for[(x,y)]; source_id=source_index_to_member[source_index]; result=physical_by_member[source_id]; support=result['support']
        geoms={k:shape(support['hierarchy_disagreements'][k.split(':',1)[1]]) if k.startswith('hierarchy:') else shape(support[k]) for k in categories}
        issues=[(i,shape(item['geometry'])) for i,item in enumerate(result['issues']) if 'geometry' in item]
        queried_ids.update(result['source_id_queries']);query_counts['source_id_query_references']+=len(result['source_id_queries'])
        query_counts['queries']+=len(result['query_relations']);query_counts['intersects']+=sum(bool(q['intersects']) for q in result['query_relations'])
        query_counts['disjoint']+=sum(bool(q['disjoint']) for q in result['query_relations']);query_counts['explicit_issues']+=len(result['issues'])
        hits=[name for name,g in geoms.items() if g.covers(point)]
        for name in hits: counts[name]+=1
        ihits=[i for i,g in issues if g.intersects(point)]
        issue_count+=len(ihits)
        if stage_geom.covers(point): target_cover+=1
        out.append({'x':x,'y':y,'owner':7124,'source_feature_index':source_index,'source_id':source_id,'physical_witnesses':hits,'issue_indices':ihits})
    body={'version':1,'kind':'malta1196-original-center-physical-application-v2','scope':'Exact original 1196 tuple diagnostic against member-keyed whole-target GSHHG physical witnesses; not qualification or acceptance.',
      'program':{'path':f'{PKG}/physical-001/apply-physical-centers.py','bytes':len(pathlib.Path(__file__).read_bytes()),'sha256':sha(pathlib.Path(__file__).read_bytes())},
      'original_tuple_count':1196,'original_tuple_set_sha256':comp['selected_center_application']['tuple_set_sha256'],
      'target':'atlas:territory:MLT','owner_index':7124,'canonical_target':'atlas:territory:MLT','source_member_count':68,
      'inputs':{'owner_observation':obs_pin,'source_comparison_002':comp_pin,'whole_target_stage':stage_pin,'whole_target_physical':phys_pin,
                'native_latitudes':{**LAT,'git_blob_oid':oid}},
      'physical_query_summary':{**query_counts,'distinct_gshhg_source_ids_queried':len(queried_ids)},
      'full_product_comparator':{'full_miss_count':61,'full_miss_tuple_set_sha256':comp['selected_center_application']['full_miss_tuple_set_sha256'],
                                 'separate_from_consumed_simplified_product':True},
      'center_witness_counts':counts,'issue_contact_count':issue_count,'canonical_target_center_cover_count':target_cover,
      'normative_latitude_rows_checked':len(latitude_rows),'rows':out,
      'runtime':{'python':sys.version.split()[0],'shapely':shapely_version,'geos':geos_version_string},
      'limits':['GSHHG source-relative physical witnesses do not adjudicate authority or law.','No source, selected-output, ownership, or acceptance claim is made.','The 61 full-product comparator misses are preserved independently of simplified-product hits.']}
    raw=(json.dumps(body,separators=(',',':'),ensure_ascii=False)+'\n').encode()
    outpath=ROOT/f'{PKG}/physical-001/result-members-001/physical-center-application.json'
    if outpath.exists(): raise ValueError('refusing to overwrite existing physical-center application')
    outpath.write_bytes(raw)
    print(json.dumps({'path':str(outpath.relative_to(ROOT)),'bytes':len(raw),'sha256':sha(raw),'center_witness_counts':counts,'issue_contact_count':issue_count,'canonical_target_center_cover_count':target_cover,'normative_latitude_rows_checked':len(latitude_rows),'full_miss_count':61},separators=(',',':')))
if __name__=='__main__': main()
