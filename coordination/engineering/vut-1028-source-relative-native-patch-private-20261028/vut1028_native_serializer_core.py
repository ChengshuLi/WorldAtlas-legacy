"""Pure validation and canonicalization helpers for the VUT1028 serializer."""
from collections import Counter, defaultdict
import hashlib
import json


def verify_bytes(label, data, expected_sha256, expected_bytes):
    if not isinstance(data, bytes):
        raise TypeError(f'{label}: input must be bytes')
    digest = hashlib.sha256(data).hexdigest()
    if type(expected_bytes) is not int or expected_bytes < 0:
        raise ValueError(f'{label}: invalid expected byte count')
    if len(data) != expected_bytes or digest != expected_sha256:
        raise ValueError(f'{label}: input pin mismatch')
    return digest


def unique_keys(rows, label='keys'):
    keys = []
    for row in rows:
        if not isinstance(row, (tuple, list)) or len(row) != 3:
            raise ValueError(f'{label}: key must be [owner, y, x]')
        owner, y, x = row
        if any(type(value) is not int for value in (owner, y, x)):
            raise ValueError(f'{label}: key coordinates must be integers')
        keys.append((owner, y, x))
    if len(keys) != len(set(keys)):
        raise ValueError(f'{label}: duplicate key')
    return set(keys)


def validate_partition(candidate_rows, miss_rows, remaining_rows,
                        candidate_owner_counts=None, miss_owner_counts=None):
    candidate = unique_keys(candidate_rows, 'candidate')
    misses = unique_keys(miss_rows, 'misses')
    remaining = unique_keys(remaining_rows, 'remaining roster')
    if candidate & misses:
        raise ValueError('candidate and misses overlap')
    if candidate | misses != remaining:
        raise ValueError('candidate/miss partition does not equal remaining roster')
    actual_candidate_counts = dict(sorted(Counter(owner for owner, _y, _x in candidate).items()))
    actual_miss_counts = dict(sorted(Counter(owner for owner, _y, _x in misses).items()))
    if candidate_owner_counts is not None and actual_candidate_counts != {
            int(owner): count for owner, count in candidate_owner_counts.items()}:
        raise ValueError('candidate owner counts mismatch')
    if miss_owner_counts is not None and actual_miss_counts != {
            int(owner): count for owner, count in miss_owner_counts.items()}:
        raise ValueError('miss owner counts mismatch')
    return {
        'candidate': len(candidate),
        'misses': len(misses),
        'remaining': len(remaining),
        'candidate_owner_counts': actual_candidate_counts,
        'miss_owner_counts': actual_miss_counts,
    }


def canonical_native_patch(candidate_rows, allowed_owners):
    candidate = unique_keys(candidate_rows, 'candidate')
    allowed = set(allowed_owners)
    if any(owner not in allowed for owner, _y, _x in candidate):
        raise ValueError('candidate contains unexpected owner')
    cells = defaultdict(list)
    for owner, y, x in candidate:
        cells[(y, owner)].append(x)
    rows_by_y = defaultdict(list)
    for (y, owner), xs in sorted(cells.items()):
        xs.sort()
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
        if row['runs'] != sorted(row['runs']):
            raise ValueError('native runs are not sorted')
        for start, end, owner in row['runs']:
            if start >= end or owner not in allowed:
                raise ValueError('invalid native run')
            for x in range(start, end):
                key = (owner, row['y'], x)
                if key in reconstructed:
                    raise ValueError('native runs duplicate a key')
                reconstructed.add(key)
    if reconstructed != candidate:
        raise ValueError('native runs do not reproduce candidate keys')
    patch_bytes = (json.dumps(patch, ensure_ascii=False, sort_keys=True, separators=(',', ':')) + '\n').encode('utf-8')
    return patch, patch_bytes, reconstructed
