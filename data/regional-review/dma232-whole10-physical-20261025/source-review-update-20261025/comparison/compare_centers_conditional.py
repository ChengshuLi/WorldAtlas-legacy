from pathlib import Path
import json, hashlib, collections, sys
import shapely
from shapely.geometry import Point
from shapely.ops import nearest_points
R=Path('/Users/chengshuli/Documents/Codex/2026-10-24/task');O=R/'dma232-uscb-outline-comparison'
source=R/'dma232-source-application/display-context232.json';ctx=json.loads(source.read_text())
keys=json.loads((R/'dma232-physical-input-draft/exact232-original-keys.json').read_text())['keys']
assert len(ctx['rows'])==232 and len({tuple(x['key']) for x in ctx['rows']})==232
assert {tuple(k) for k in keys}=={tuple(x['key']) for x in ctx['rows']}
sub=json.loads((R/'dma232-source-application/reading-subsets.json').read_text()); groups={}
for g in sub['conspicuous_positive_mainland_context']:
 for k in g['keys']:groups[tuple(k)]={'CHARIM_class':'favorable','context':g['context']}
for g in json.loads((R/'dma156-coastline-lineage/exact156-context-questions.json').read_text())['groups']:
 for k in g['keys']:groups[tuple(k)]={'CHARIM_class':'mixed','context':g['actual_previously_read_context'],'original_source_id':g['source_id']}
assert set(groups)=={tuple(k) for k in keys}
g=shapely.from_wkb((O/'USCB-national-original.wkb').read_bytes())
assert g.geom_type=='MultiPolygon'
valid=bool(shapely.is_valid(g)); reason=shapely.is_valid_reason(g)
assert not valid and reason.startswith("Ring Self-intersection"), reason
# Deliberately separate NON-QUALIFYING source diagnostic after the first guarded run.
# No repair; every predicate result below retains the invalid-source caveat.
boundary=g.boundary
rows=[]
for r in ctx['rows']:
 lon=r['longitude_from_original_cell_center_rule'];lat=r['latitude_from_original_observer'];p=Point(lon,lat)
 inside=bool(g.contains(p));on=bool(boundary.intersects(p));near=nearest_points(p,boundary)[1]
 rows.append({'key':r['key'],'parish':r['parish'],'longitude':lon,'latitude':lat,**groups[tuple(r['key'])],'USCB_center_relation':'conditional-inside' if inside else 'conditional-boundary' if on else 'conditional-outside','distance_to_USCB_boundary_degrees_planar':p.distance(boundary),'nearest_boundary_coordinate_lon_lat':[near.x,near.y],'meaning':'Raw GEOS point query on original INVALID source geometry, not a reliable membership certificate. Source ambiguity preserved; no full-cell, acceptance or physical-class result'})
def count(rr):return dict(collections.Counter(x['USCB_center_relation'] for x in rr))
summary={'scope':232,'separate174_included':False,'runtime':{'executable':sys.executable,'shapely':shapely.__version__,'GEOS':shapely.geos_version_string},'geometry':{'valid':valid,'validity_reason':reason,'components':len(g.geoms),'interior_rings':sum(len(p.interiors) for p in g.geoms),'bounds':list(g.bounds)},'all':count(rows),'by_CHARIM_context':{c:count([x for x in rows if x['CHARIM_class']==c]) for c in ['favorable','mixed']},'by_parish':{n:count([x for x in rows if x['parish']==n]) for n in sorted({x['parish'] for x in rows})},'by_named_context':{c:count([x for x in rows if x['context']==c]) for c in sorted({x['context'] for x in rows})},'method':'Unchanged WGS84 source WKB and retained literal longitude/latitude; Shapely point contains and boundary intersects, plus planar angular nearest-boundary diagnostic. No repair, simplify, union, reproject, raster or whole-cell test. Distances are degrees and are not accuracy tolerances.','coordinate_input':{'path':str(source),'bytes':source.stat().st_size,'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'original_observer_blob':ctx['original_observer_blob'],'original_observer_sha256':ctx['original_observer_sha256'],'grid_blob':ctx['pixel_grid_blob'],'longitude_rule':ctx['longitude_rule']},'original_key_set_equality':True,'stock_runs':0,'adoption':False,'all_relations_conditional_on_invalid_original':True,'first_guarded_run':'exit1 at validity assertion before per-key queries; this is a distinct exploratory source diagnostic, not a stock rerun'}
(O/'center-comparison232.json').write_text(json.dumps(rows,indent=2)+'\n');(O/'comparison-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps(summary,indent=2))
