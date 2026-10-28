import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {isDeepStrictEqual} from 'node:util';
import {ImmutableReader} from '../../../../scripts/check-effective-geographic-regression.mjs';
import {valueSha} from '../../selected-geography-effective-prevention-20261009/selected-neighbor-prevention.mjs';

const need = (ok, message) => { if (!ok) throw Error(message); };
const sha = raw => createHash('sha256').update(raw).digest('hex');
const root = process.cwd();
const base = 'f2c44658278b1ebbbca37bc659b05a3885b2e2e7';
const targetId = 'atlas:territory:ATG';
const sourceCommit = 'ea099024c1d175842e4d323db752b49d9f7a5825';
const sourcePath = 'coordination/engineering/original-geography-source-corpus-20261006/payloads/gb-ATG-ADM1-000.bin.gz';
const sourcePin = {bytes: 9157, sha256: '28c9286241b38663e4c2c3f24c21810e60e54b7c645569840805f6fd0b8be8e5',
  decoded_bytes: 26215, decoded_sha256: '021f6ca73869807bcb04d3b71ea1f26d630eb11707522ff1a0db5f3d86e40c8d'};
const targetPin = {commit: base, path: 'data/geography/part-28.json', mode: '100644',
  git_blob_oid: 'a9e03cb07194a73f643af85d1e6db94abe3b5fc9', bytes: 6613963,
  sha256: '2aab2f36aeeb651ee8e6cc656e9541ad14e2ced2ea8160e8700ad4dc950c379d'};
const paths = {
  stage: 'coordination/engineering/atg883-source-research-20261027/physical-preparation/original-stage-inputs.json',
  manifest: 'coordination/engineering/atg883-source-research-20261027/physical-preparation/source-feature-manifest.json',
  lookup: 'coordination/engineering/atg883-source-research-20261027/physical-preparation/canonical-target-lookup.json',
};
const manifest = JSON.parse(fs.readFileSync(paths.manifest));
const lookup = JSON.parse(fs.readFileSync(paths.lookup));
const stagesRaw = fs.readFileSync(paths.stage);
const stages = JSON.parse(stagesRaw);
const expectedSourceIds = [
  'gb:ATG:ADM1:74100532B54294973205276', 'gb:ATG:ADM1:74100532B52002127383103',
  'gb:ATG:ADM1:74100532B54588500691901', 'gb:ATG:ADM1:74100532B56248932917605',
  'gb:ATG:ADM1:74100532B19516932260818', 'gb:ATG:ADM1:74100532B93709990123087',
  'gb:ATG:ADM1:74100532B3675352926720', 'gb:ATG:ADM1:74100532B88993889644511',
];
need(manifest.kind === 'atg883-original-source-stage-manifest-v2' && lookup.kind === 'atg883-exact-canonical-target-lookup-v1',
  'Unexpected ATG physical-stage evidence versions');
need(manifest.source.commit === sourceCommit && manifest.source.path === sourcePath
  && manifest.source.encoded_bytes === sourcePin.bytes && manifest.source.encoded_sha256 === sourcePin.sha256
  && manifest.source.decoded_bytes === sourcePin.decoded_bytes && manifest.source.decoded_sha256 === sourcePin.decoded_sha256,
'Retained ATG original source pin differs');
need(manifest.canonical_target_part.commit === targetPin.commit && manifest.canonical_target_part.path === targetPin.path
  && manifest.canonical_target_part.mode === targetPin.mode && manifest.canonical_target_part.git_blob_oid === targetPin.git_blob_oid
  && manifest.canonical_target_part.bytes === targetPin.bytes && manifest.canonical_target_part.sha256 === targetPin.sha256,
'Canonical ATG target part pin differs');
need(manifest.canonical_target.id === targetId && manifest.canonical_target.feature_id === targetId
  && manifest.canonical_target.geometry_type === 'MultiPolygon' && stages.length === 8
  && manifest.stage.bytes === stagesRaw.length && manifest.stage.sha256 === sha(stagesRaw),
'Canonical target or stage file identity differs');

const git = process.env.WORLDATLAS_GIT ?? '/opt/codex/runtimes/codex-primary-runtime/dependencies/bin/fallback/git';
const reader = new ImmutableReader(root, base, {gitExecutable: git});
await reader.acquirePinned(targetPin);
const targetRaw = reader.read(targetPin.path, {version: base, expected: targetPin.sha256});
need(targetRaw.length === targetPin.bytes && sha(targetRaw) === targetPin.sha256, 'Canonical ATG target part bytes differ');
const targetCollection = JSON.parse(targetRaw);
const matches = targetCollection.features.filter(feature => feature.id === targetId);
need(matches.length === 1, 'Canonical ATG target part has a missing or duplicated territory');
const canonical = matches[0];
need(canonical.properties?.id === targetId && canonical.geometry?.type === 'MultiPolygon'
  && valueSha(canonical.geometry) === manifest.canonical_target.geometry_sha256
  && valueSha(canonical.geometry) === lookup.target_geometry_sha256,
'Canonical ATG target geometry identity differs');
const canonicalMembers = canonical.properties?.metadata?.source_member_ids;
need(Array.isArray(canonicalMembers) && canonicalMembers.length === 8
  && isDeepStrictEqual([...canonicalMembers].sort(), [...expectedSourceIds].sort())
  && isDeepStrictEqual([...lookup.source_member_ids].sort(), [...expectedSourceIds].sort()),
'Canonical source-member inventory does not bind exactly all eight ATG members');

const sourceRaw = reader.git('--no-lazy-fetch', 'cat-file', 'blob',
  reader.descriptor(sourcePath, sourceCommit).git_blob_oid);
need(sourceRaw.length === sourcePin.bytes && sha(sourceRaw) === sourcePin.sha256, 'Original ATG encoded source differs');
const sourceDecoded = gunzipSync(sourceRaw);
need(sourceDecoded.length === sourcePin.decoded_bytes && sha(sourceDecoded) === sourcePin.decoded_sha256, 'Original ATG decoded source differs');
const source = JSON.parse(sourceDecoded);
need(source.type === 'FeatureCollection' && source.features?.length === 8, 'Original ATG feature denominator differs');
for (const [ordinal, row] of stages.entries()) {
  const feature = source.features[ordinal];
  const id = `gb:ATG:ADM1:${feature.properties?.shapeID}`;
  const manifestFeature = manifest.features[ordinal];
  need(row.target === id && id === expectedSourceIds[ordinal]
    && isDeepStrictEqual(row.consumed, feature)
    && manifestFeature.source_id === id && manifestFeature.feature_ordinal === ordinal
    && manifestFeature.source_feature_index === 1273 + ordinal
    && manifestFeature.geometry_sha256 === sha(Buffer.from(JSON.stringify(feature.geometry))),
  'Stage consumed member differs from complete retained source: ' + id);
  need(row.selected?.id === targetId && isDeepStrictEqual(row.selected.geometry, canonical.geometry),
    'Selected base geometry is not the exact accepted ATG territory for source member ' + id);
}
need(stages[0].consumed.properties.shapeName === 'Redonda'
  && manifest.scope.context_sibling_feature_index === 1273
  && manifest.scope.positive_feature_indices.join(',') === '1274,1275,1276,1277,1278,1279,1280'
  && manifest.scope.repair_cells === 883 && manifest.scope.intervals === 288
  && manifest.scope.excluded_physical_interpretation_cells === 130,
'ATG positive/context/out-of-scope denominator changed');
console.log(JSON.stringify({stage_rows: stages.length, source_feature_count: source.features.length,
  positive_member_rows: 7, same_owner_context_sibling_rows: 1, target_id: targetId,
  selected_geometry_rows_bound: stages.length, target_geometry_sha256: valueSha(canonical.geometry),
  canonical_source_member_count: canonicalMembers.length, stage_bytes: stagesRaw.length,
  stage_sha256: sha(stagesRaw), exact_part_reads: reader.inventory.size}, null, 2));
