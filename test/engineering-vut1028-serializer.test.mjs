import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const corePath = fileURLToPath(new URL(
  '../coordination/engineering/vut-1028-source-relative-native-patch-private-20261028/vut1028_native_serializer_core.py',
  import.meta.url,
));
const python = process.env.PYTHON || 'python3';
const runCore = () => JSON.parse(execFileSync(python, ['-B', '-c', String.raw`
import base64, hashlib, importlib.util, json, sys
spec = importlib.util.spec_from_file_location('vut_core', sys.argv[1])
core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(core)
candidate = [[48791, 10, 4], [48791, 10, 5], [48793, 12, 2]]
misses = [[48791, 10, 6], [48794, 14, 1]]
remaining = candidate + misses
partition = core.validate_partition(candidate, misses, remaining,
    {48791: 2, 48793: 1}, {48791: 1, 48794: 1})
patch, encoded, reconstructed = core.canonical_native_patch(candidate, {48791, 48793, 48794})
patch_again, encoded_again, reconstructed_again = core.canonical_native_patch(candidate, {48791, 48793, 48794})
_patch_reordered, encoded_reordered, _reconstructed_reordered = core.canonical_native_patch(list(reversed(candidate)), {48791, 48793, 48794})
assert encoded == encoded_again == encoded_reordered and patch == patch_again
assert reconstructed == reconstructed_again == {(48791,10,4),(48791,10,5),(48793,12,2)}
raw = b'fixture bytes'
pin_ok = core.verify_bytes('fixture', raw, hashlib.sha256(raw).hexdigest(), len(raw))
checks = {'pin_ok': pin_ok == hashlib.sha256(raw).hexdigest()}
for name, fn in {
    'altered_pin': lambda: core.verify_bytes('fixture', raw, '0' * 64, len(raw)),
    'altered_size': lambda: core.verify_bytes('fixture', raw, hashlib.sha256(raw).hexdigest(), len(raw) + 1),
    'duplicate_key': lambda: core.unique_keys(candidate + [candidate[0]], 'candidate'),
    'unexpected_key': lambda: core.validate_partition(candidate, misses, remaining + [[999,99,99]]),
    'unexpected_owner': lambda: core.canonical_native_patch(candidate + [[999,1,1]], {48791,48793,48794}),
}.items():
    try: fn()
    except (TypeError, ValueError): checks[name] = True
    else: checks[name] = False
assert all(checks.values()), checks
print(json.dumps({'partition': partition, 'patch_b64': base64.b64encode(encoded).decode(),
    'patch_sha256': hashlib.sha256(encoded).hexdigest(), 'checks': checks}, sort_keys=True))
`, corePath], {encoding:'utf8'}));

test('VUT1028 shared serializer core is deterministic and rejects pin, partition, duplicate, and owner drift', () => {
  const first = runCore();
  const second = runCore();
  assert.deepEqual(first, second);
  assert.deepEqual(first.partition, {
    candidate: 3,
    misses: 2,
    remaining: 5,
    candidate_owner_counts: {48791: 2, 48793: 1},
    miss_owner_counts: {48791: 1, 48794: 1},
  });
  const expected = '{"rows":[{"runs":[[4,6,48791]],"y":10},{"runs":[[2,3,48793]],"y":12}]}\n';
  const actual = Buffer.from(first.patch_b64, 'base64').toString('utf8');
  assert.equal(actual, expected);
  assert.equal(first.patch_sha256, '191b201996cb3a05f6bb5c8a32ce08e06bdb99dac5708986448f1e17be7854f7');
  assert.deepEqual(first.checks, {
    pin_ok: true,
    altered_pin: true,
    altered_size: true,
    duplicate_key: true,
    unexpected_key: true,
    unexpected_owner: true,
  });
});
