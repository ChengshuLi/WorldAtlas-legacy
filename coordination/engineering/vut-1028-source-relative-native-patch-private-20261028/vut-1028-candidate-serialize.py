#!/usr/bin/env python3
"""Build a private deterministic native-row candidate from retained VUT receipts.

This is not a geometry/source replay and makes no qualification or credit claim.
The source-relative candidate is the intersection of the frozen simplified
membership roster with retained full-2017 selected-feature interior receipts.
"""
from collections import Counter, defaultdict
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).parent / 'vut-1116-private-evidence-handoff-20261028'
OUT = Path(__file__).parent
FILES = {
    'remaining_roster': ROOT / 'rosters/remaining-1116-exact.private.json',
    'vut_full_application': ROOT / 'rosters/vut890-source-application.private.json',
    'tanna_selected_application': ROOT / 'rosters/tanna226-full-source-selected-feature-application.private.json',
    'tanna_all_feature': ROOT / 'rosters/tanna226-all-six-feature-status.private.json',
    'source_evidence': ROOT / 'source/source-evidence-historical-80dd.json',
    'vut890_native_diagnostic': ROOT / 'native/vut890-run002/native-diagnostic.json',
    'tanna226_native_diagnostic': ROOT / 'native/tanna226-run001/native-diagnostic.json',
    'physical_support': ROOT / 'physical/physical-support-target-relations.json',
}
EXPECTED = {
    'remaining_roster': ('7950960096b3bc0bc50004eb97233a28427d943d4aee536845a6b9ddaf53ee64', 343157),
    'vut_full_application': ('d92e5b3b84773691895b16c46e66a4c7520157c51fd9d17d728f0127cdc8c802', 489690),
    'tanna_selected_application': ('d4f15646ad1969938cae8ae0f4228f51df855b50d1eba6d8a4e97648523fd754', 23591),
    'tanna_all_feature': ('6aef1daed7e1b076dbc434a5c083435041029443e3ecdc028f74383ba12b43f2', 335098),
    'source_evidence': ('e470ba8c709c6d82a690a2a3b1a33e2f2da56e635c80b9486674e052a10ebb5e', 23565),
    'vut890_native_diagnostic': ('0ac82f6f799ca161e5bdc1ffc82372f9d89552d0c056a3541991391da021a691', 72785),
    'tanna226_native_diagnostic': ('33d3b6125aa6e0df7ecfc9774dfd307989682bc4b5d2ea40a35dc50cd7ab2eb5', 27360),
    'physical_support': ('b3ed749f8e4fabe98e92c0493a285bf0459e5426cb347fb66212ce543471fea7', 996365),
}
VUT_SHAPES = {48791: '32282491B17169683382430', 48794: '32282491B7486560380604'}
TANNA_SHAPE = '32282491B61228346728599'
SOURCE_PIN = {
    'commit': '80dd96c04ccdb33b5be4b1a80cfb27cc934f76db',
    'path': 'coordination/engineering/vanuatu-native-repair-evaluation-20261016/source-evidence.json',
    'blob': 'aed551fd6649ed0c513543d5b4b1cd027e027756',
    'bytes': 23565,
    'sha256': EXPECTED['source_evidence'][0],
}
SIMPLIFIED_PRODUCT_PIN = {
    'commit': 'c7fa96a44f39310e0d070ca883c5c3593c8dfdfc',
    'path': 'coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-VUT-ADM1-000.bin.gz',
    'blob': 'b04cddf49b80b6e3d0458ba3dac5005e85acdc99',
    'bytes': 39881,
    'sha256': 'd889dc7af3e004f12ad4bb9a49de443d09a4bfe34beaba4af999fb6a8dc13258',
    'decoded_sha256': '63e1878b1a484787aafa029e3f2a8cb063d9d720b38e9d17884a999d28cd10f8',
}

def raw(path):
    b = path.read_bytes()
    return b, hashlib.sha256(b).hexdigest()

def compact(obj):
    return json.dumps(obj, ensure_ascii=False, separators=(',', ':')).encode('utf-8')

def sha(obj):
    return hashlib.sha256(compact(obj)).hexdigest()

loaded = {}
for name, path in FILES.items():
    data, digest = raw(path)
    expect_sha, expect_bytes = EXPECTED[name]
    assert len(data) == expect_bytes and digest == expect_sha, (name, len(data), digest)
    loaded[name] = json.loads(data)

roster_doc = loaded['remaining_roster']
roster = roster_doc['rows']
assert len(roster) == 1116 and roster_doc['scope']['accepted87_rows_included'] is False
assert roster_doc['scope']['original_denominator'] == 4366
assert roster_doc['scope']['previously_accepted_positive'] == 3163
assert roster_doc['scope']['previously_accepted_researched_unresolved'] == 87
roster_by_key = {}
for row in roster:
    key = (row['owner_index'], row['y'], row['x'])
    assert key not in roster_by_key
    roster_by_key[key] = row

source_evidence = loaded['source_evidence']
assert source_evidence['version'] == 1 and source_evidence['kind'] == 'source-target-native-evidence-v1'
assert {family['source_id'] for family in source_evidence['families']} == {'gb:VUT:ADM1'}
target_by_owner_shape = {}
for target in source_evidence['targets']:
    shape = target['id'].split(':')[-1]
    key = (target['pixelIndex'], shape)
    assert key not in target_by_owner_shape and target['source_family'] == 'gb:VUT:ADM1'
    assert target['base_geometry']['type'] in ('Polygon', 'MultiPolygon')
    target_by_owner_shape[key] = target
assert set(target_by_owner_shape) == {
    (48791, VUT_SHAPES[48791]), (48794, VUT_SHAPES[48794]), (48793, TANNA_SHAPE),
    (48792, '32282491B5439526076152'), (48795, '32282491B78905986242135'),
    (48796, '32282491B8417950609019')
}

vut_app = loaded['vut_full_application']
assert vut_app['scope']['keys'] == 890 and vut_app['scope']['intervals'] == 391
assert vut_app['input_pins']['source_sha256'] == '69f44b96d0690310c67a4a430488fb7a02d028bdec8bbc755436cdfb90962c8d'
vut_candidate, vut_miss = set(), set()
for row in vut_app['by_key']:
    key = (row['owner'], row['y'], row['x'])
    roster_row = roster_by_key.get(key)
    assert roster_row is not None and roster_row['cohort'] == 'vut890'
    assert roster_row['source_shape_id'] == row['source_shape_id'] == VUT_SHAPES[row['owner']]
    assert row['simplified_original'] == 'exact_match'
    assert (row['owner'], row['source_shape_id']) in target_by_owner_shape
    assert row['full_other_interior'] is False and row['full_other_boundary'] is False
    if row['full_selected'] == 'inside':
        vut_candidate.add(key)
    elif row['full_selected'] == 'outside':
        vut_miss.add(key)
    else:
        raise AssertionError(('unexpected VUT full status', row['full_selected']))
assert len(vut_candidate) == 826 and len(vut_miss) == 64 and not vut_candidate & vut_miss
assert Counter(roster_by_key[k]['owner_index'] for k in vut_candidate) == {48791: 504, 48794: 322}
assert Counter(roster_by_key[k]['owner_index'] for k in vut_miss) == {48791: 26, 48794: 38}

tanna_app = loaded['tanna_selected_application']
tanna_all = loaded['tanna_all_feature']
assert len(tanna_app['rows']) == len(tanna_all['rows']) == 226
assert tanna_all['source']['sha256'] == '69f44b96d0690310c67a4a430488fb7a02d028bdec8bbc755436cdfb90962c8d'
tanna_selected_by_key = {(r['owner_index'], r['y'], r['x']): r for r in tanna_app['rows']}
assert len(tanna_selected_by_key) == 226
tanna_candidate, tanna_miss = set(), set()
for row in tanna_all['rows']:
    key = (row['owner_index'], row['y'], row['x'])
    roster_row = roster_by_key.get(key)
    assert roster_row is not None and roster_row['cohort'] == 'tanna226'
    assert row['owner_index'] == 48793 and roster_row['source_shape_id'] == TANNA_SHAPE
    assert row['selected_feature_index'] == 6
    assert row['boundary_tie_records_for_key'] in (0, [])
    assert all(item['status'] == 'outside' for item in row['other_member_statuses'])
    assert key in tanna_selected_by_key
    if row['selected_feature_status'] == 'interior':
        assert tanna_selected_by_key[key]['full_tanna'] == 'inside'
        tanna_candidate.add(key)
    elif row['selected_feature_status'] == 'outside':
        assert tanna_selected_by_key[key]['full_tanna'] == 'miss'
        tanna_miss.add(key)
    else:
        raise AssertionError(('unexpected Tanna status', row['selected_feature_status']))
assert len(tanna_candidate) == 202 and len(tanna_miss) == 24 and not tanna_candidate & tanna_miss

candidate = vut_candidate | tanna_candidate
misses = vut_miss | tanna_miss
remaining_set = set(roster_by_key)
assert len(candidate) == 1028 and len(misses) == 88 and not candidate & misses
assert candidate | misses == remaining_set and len(remaining_set) == 1116
assert not (set(vut_candidate) & set(tanna_candidate))
assert Counter(roster_by_key[k]['owner_index'] for k in candidate) == {48791: 504, 48794: 322, 48793: 202}
assert Counter(roster_by_key[k]['owner_index'] for k in misses) == {48791: 26, 48794: 38, 48793: 24}

def key_commitment(keys):
    return sha([list(k) for k in sorted(keys)])

def interval_tuples(keys):
    out = set()
    for key in keys:
        row = roster_by_key[key]
        iy, x0, x1 = row['original_interval_yx_half_open']
        assert iy == row['y'] and x0 <= row['x'] < x1
        out.add((row['owner_index'], iy, x0, x1))
    return out

candidate_intervals = interval_tuples(candidate)
miss_intervals = interval_tuples(misses)
all_intervals = interval_tuples(remaining_set)
assert candidate_intervals | miss_intervals == all_intervals

# Emit canonical WorldAtlas native patch rows: sorted y rows and sorted,
# non-overlapping half-open x runs carrying their exact pixelIndex.
cells = defaultdict(list)
for owner, y, x in candidate:
    cells[(y, owner)].append(x)
rows_by_y = defaultdict(list)
for (y, owner), xs in sorted(cells.items()):
    xs = sorted(xs)
    start = prior = xs[0]
    for x in xs[1:]:
        if x == prior + 1:
            prior = x
        else:
            rows_by_y[y].append([start, prior + 1, owner])
            start = prior = x
    rows_by_y[y].append([start, prior + 1, owner])
patch = {'rows': [{'y': y, 'runs': sorted(runs)} for y, runs in sorted(rows_by_y.items())]}
reconstructed = set()
for row in patch['rows']:
    assert row['runs'] == sorted(row['runs'])
    for start, end, owner in row['runs']:
        assert start < end and owner in (48791, 48793, 48794)
        for x in range(start, end):
            key = (owner, row['y'], x)
            assert key not in reconstructed
            reconstructed.add(key)
assert reconstructed == candidate and len(reconstructed) == 1028
patch_bytes = (json.dumps(patch, ensure_ascii=False, sort_keys=True, separators=(',', ':')) + '\n').encode()
patch_sha = hashlib.sha256(patch_bytes).hexdigest()
patch_path = OUT / 'vut1028-source-relative-native-patch.private.json'
patch_path.write_bytes(patch_bytes)
patch_path.chmod(0o600)

serializer_bytes = Path(__file__).read_bytes()
serializer_sha = hashlib.sha256(serializer_bytes).hexdigest()
provenance = {
    'artifact_kind': 'private.worldatlas.vut1028-source-relative-native-patch.v1',
    'disposition': 'source-relative candidate preparation only; not authority, acceptance, status, or credit',
    'serializer': {'path': Path(__file__).name, 'sha256': serializer_sha, 'method': 'exact joins; interior-only source comparator selection; sorted compact JSON owner/y/x keys; coalesce contiguous x into half-open native runs'},
    'patch': {'path': patch_path.name, 'bytes': len(patch_bytes), 'sha256': patch_sha, 'row_count': len(patch['rows']), 'run_count': sum(len(r['runs']) for r in patch['rows']), 'cell_count': len(reconstructed), 'schema': {'rows': [{'y': 'integer grid row', 'runs': [['x_start_inclusive', 'x_end_exclusive', 'pixelIndex']]}]}},
    'scope': {
        'package_id': 'gb-VUT-ADM1--repair-evaluation', 'original_denominator': 4366,
        'accepted_positive': 3163, 'accepted_researched_unresolved': 87,
        'accepted87_ledger_sha256': 'cfc187547ba16e1cb381536e6107e215c1e7a6d5b7b76925ec1c6f97d3874125',
        'remaining': 1116, 'candidate': 1028, 'variant_miss': 88,
        'candidate_owner_counts': {'48791': 504, '48794': 322, '48793': 202},
        'miss_owner_counts': {'48791': 26, '48794': 38, '48793': 24},
        'candidate_key_sha256_owner_y_x': key_commitment(candidate),
        'miss_key_sha256_owner_y_x': key_commitment(misses),
        'candidate_distinct_original_intervals': len(candidate_intervals),
        'candidate_interval_sha256_owner_y_start_end': sha([list(k) for k in sorted(candidate_intervals)]),
        'variant_miss_distinct_original_intervals': len(miss_intervals),
        'variant_miss_interval_sha256_owner_y_start_end': sha([list(k) for k in sorted(miss_intervals)]),
        'candidate_miss_shared_original_intervals': len(candidate_intervals & miss_intervals),
        'remaining_distinct_original_intervals': len(all_intervals),
        'remaining_interval_sha256_owner_y_start_end': sha([list(k) for k in sorted(all_intervals)]),
        'all_remaining_key_commitment': key_commitment(remaining_set),
        'partition_check': 'candidate and variant-miss sets are disjoint and their exact key union equals the retained 1,116-row roster; accepted 87 and accepted 3,163 are not included',
    },
    'source_bindings': {
        'frozen_source_evidence': SOURCE_PIN,
        'frozen_simplified_product': SIMPLIFIED_PRODUCT_PIN,
        'source_target_map': {str(owner): target['id'] for (owner, _shape), target in sorted(target_by_owner_shape.items()) if owner in (48791,48793,48794)},
        'vut_application': {'sha256': EXPECTED['vut_full_application'][0], 'bytes': EXPECTED['vut_full_application'][1], 'method': vut_app['input_pins']['method'], 'full_source_sha256': vut_app['input_pins']['source_sha256'], 'full_source_size': vut_app['input_pins']['source_size'], 'application_driver_sha256_recorded': 'efc148063081a47f95d2d783348b4c2f56511b2607012145d927a3f9645944ae', 'simplified_original_exact_match': 890, 'full_selected_interior': 826, 'full_selected_miss': 64, 'other_full_feature_interior_or_boundary': 0},
        'tanna_selected_application': {'sha256': EXPECTED['tanna_selected_application'][0], 'bytes': EXPECTED['tanna_selected_application'][1], 'selected_feature': 'gb:VUT:ADM1:' + TANNA_SHAPE, 'full_selected_interior': 202, 'full_selected_miss': 24},
        'tanna_all_feature_status': {'sha256': EXPECTED['tanna_all_feature'][0], 'bytes': EXPECTED['tanna_all_feature'][1], 'features': 6, 'tanna_interior': 202, 'tanna_outside': 24, 'other_feature_interiors_or_boundaries': 0},
        'remaining_roster': {'sha256': EXPECTED['remaining_roster'][0], 'bytes': EXPECTED['remaining_roster'][1], 'key_count': 1116},
    },
    'screening_context': {
        'vut890_prior_diagnostic': {'sha256': EXPECTED['vut890_native_diagnostic'][0], 'bytes': EXPECTED['vut890_native_diagnostic'][1], 'requested': 890, 'supported': 890, 'held': 0, 'scope': 'declared mapped-land/adverse-mask screen only'},
        'tanna226_prior_diagnostic': {'sha256': EXPECTED['tanna226_native_diagnostic'][0], 'bytes': EXPECTED['tanna226_native_diagnostic'][1], 'requested': 226, 'supported': 226, 'held': 0, 'scope': 'declared mapped-land/adverse-mask screen only'},
        'physical_support': {'sha256': EXPECTED['physical_support'][0], 'bytes': EXPECTED['physical_support'][1], 'scope': 'target-level relations, not per-key clearance'},
    },
    'limits': [
        'Patch is a private deterministic source-relative candidate derived from retained exact input rows; no source/geometry was replayed.',
        'The original simplified 2017 product remains the frozen source-evidence baseline. Full-resolution results are comparator evidence and do not replace it.',
        'The 88 full-source variant misses remain separate and are not reassigned or treated as an automatic veto on the concordant 1,028.',
        'Prior diagnostics apply to their original declared cohorts and are not a new 1,028 diagnostic or physical clearance.',
        'Physical relations are target-level; owner observations are historical snapshots with null/unknown base-owner/additive/overlap fields.',
        'Scoped municipal/legal applicability remains unresolved where specific; no universal current-boundary certificate is required or inferred.',
        'No current owner assignment, selected-output conservation, authority, status, acceptance, repaired credit, or package-completion claim is made.',
        'Full-resolution raw source body is not included; body-specific reuse terms remain unverified. The original source role is recorded geoBoundaries/OSM/Wambacher, represented 2017, ODbL 1.0.',
    ],
}
manifest_bytes = (json.dumps(provenance, ensure_ascii=False, sort_keys=True, indent=2) + '\n').encode()
manifest_path = OUT / 'vut1028-source-relative-native-patch.provenance.private.json'
manifest_path.write_bytes(manifest_bytes)
manifest_path.chmod(0o600)
print(json.dumps({
    'patch_path': str(patch_path), 'patch_bytes': len(patch_bytes), 'patch_sha256': patch_sha,
    'provenance_path': str(manifest_path), 'provenance_bytes': len(manifest_bytes), 'provenance_sha256': hashlib.sha256(manifest_bytes).hexdigest(),
    'serializer_sha256': serializer_sha, 'candidate_keys': len(candidate), 'candidate_owners': dict(Counter(roster_by_key[k]['owner_index'] for k in candidate)),
    'candidate_distinct_original_intervals': len(candidate_intervals), 'variant_miss_keys': len(misses), 'variant_miss_distinct_original_intervals': len(miss_intervals), 'shared_intervals': len(candidate_intervals & miss_intervals),
    'patch_rows': len(patch['rows']), 'patch_runs': sum(len(r['runs']) for r in patch['rows']),
    'candidate_key_commitment': provenance['scope']['candidate_key_sha256_owner_y_x'],
    'candidate_interval_commitment': provenance['scope']['candidate_interval_sha256_owner_y_start_end'],
}, sort_keys=True))
