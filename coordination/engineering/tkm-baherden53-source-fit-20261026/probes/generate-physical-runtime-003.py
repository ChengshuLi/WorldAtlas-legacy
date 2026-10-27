"""Emit a fresh exact runtime inventory using qualify-source-cohort's own predicate."""
import argparse, collections, gzip, hashlib, importlib.util, io, json, os, pathlib, re, subprocess, sys, time, types
import numpy, shapely
from shapely.geometry import shape, mapping
from shapely.affinity import translate

HELPER='scripts/qualify-source-cohort.py'
OLD='/workspace/shared/worldatlas-TKM-Baherden53-runtime-inventory-002-20261026.json'
OUT='/workspace/shared/worldatlas-TKM-Baherden53-runtime-inventory-004-20261027.json'
spec=importlib.util.spec_from_file_location('qualify_source_cohort',HELPER)
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
old=json.loads(pathlib.Path(OLD).read_bytes())
old_pins={row['path']:row for row in old['files']}
actual=[name for name in module.runtime_paths() if name!=str(pathlib.Path(__file__).resolve())]
missing=[name for name in old_pins if not pathlib.Path(name).is_file()]
if missing != ['/tmp/tkm-runtime-inventory.py']:
    raise SystemExit('Unexpected missing old runtime files: '+repr(missing))
rows=[]
for name, old_row in old_pins.items():
    if name in missing:
        continue
    raw=pathlib.Path(name).read_bytes(); row={'path':name,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()}
    if old_row != row:
        raise SystemExit('Current exact runtime differs from old verified inventory: '+name)
    rows.append(row)
if not set(actual).issubset({row['path'] for row in rows}):
    raise SystemExit('Runtime inventory omitted currently loaded file')
if not rows or len(rows)!=len(set(row['path'] for row in rows)):
    raise SystemExit('Runtime path inventory empty or duplicated')
python=next(row for row in rows if row['path']==str(pathlib.Path(sys.executable).resolve()))
out={'python':python,'version':sys.version,'numpy':numpy.__version__,'shapely':shapely.__version__,
     'geos':shapely.geos_version_string,'files':rows,
     'method':{'helper':HELPER,'runtime_path_function':'runtime_paths','helper_sha256':hashlib.sha256(pathlib.Path(HELPER).read_bytes()).hexdigest(),
               'excluded_only_inventory_emitter':str(pathlib.Path(__file__).resolve()),
               'comparison_to_previous':{'previous_inventory':OLD,'omitted_unavailable_extra_not_loaded':'/tmp/tkm-runtime-inventory.py',
                 'previous_missing_count':1,'current_loaded_runtime_count':len(actual)}}}
raw=json.dumps(out,separators=(',',':')).encode()+b'\n'
pathlib.Path(OUT).write_bytes(raw)
print(json.dumps({'path':OUT,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'runtime_files':len(rows),
                  'currently_loaded_runtime_files':len(actual),'python':python,'missing_previous_extra':missing},separators=(',',':')))
