/* Build the exact eight-member SYC source/selected stage for the accepted
 * whole-target physical phase. This is a pinned identity join only: it does
 * not repair, simplify, transform, clip, or adjudicate geometry. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {pathToFileURL} from 'node:url';

const [repoArg, currentCommit, outputArg] = process.argv.slice(2);
if (!repoArg || !/^[a-f0-9]{40}$/.test(currentCommit ?? '') || !outputArg || process.argv.length !== 5)
  throw new Error('Usage: node prepare-source-stage.mjs ABSOLUTE_REPO CURRENT_COMMIT FRESH_OUTPUT');
const repo = fs.realpathSync(repoArg), output = path.resolve(repo, outputArg);
if (!output.startsWith(repo + path.sep) || fs.existsSync(output)) throw new Error('Require fresh output inside owned repository');
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const need = (condition, message) => { if (!condition) throw new Error(message); };
for (let at = path.dirname(output);; at = path.dirname(at)) {
  const st = fs.lstatSync(at);
  need(st.isDirectory() && fs.realpathSync(at) === at, 'Ordinary output ancestry required');
  if (at === repo) break;
  need(at.startsWith(repo + path.sep), 'Output escaped repository');
}
const {pinReader} = await import(pathToFileURL(path.join(repo, 'scripts/prepare-delivery-handoff.mjs')));
const reader = pinReader(repo), pins = new Map();
function pin(commit, file) {
  const result = reader.pin(commit, file); pins.set(`${commit}:${file}`, result); return result;
}
function read(commit, file) { return reader.read(pin(commit, file)); }
function json(commit, file, decoded = false) {
  const raw = read(commit, file); return JSON.parse(decoded ? gunzipSync(raw) : raw);
}
const originalCommit = '2d1fc6f430e756498908bf2c4e267356a13f5cc7';
const packagePath = 'coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json';
const rosterPath = 'coordination/engineering/global-current-cell-work-queue-20261014/source-feature-roster.json.gz';
const cataloguePath = 'coordination/engineering/original-geography-source-corpus-20261006/catalogue.json';
const metadataPath = 'data/administrative-sources.json';
const currentPartPath = 'data/geography/part-23.json';
const currentIndexPath = 'data/world-index.json';
const currentSelectorPath = 'data/ownership-selection.json';
const currentLineagePath = 'data/semantic-report.json';
const citationPath = 'coordination/engineering/original-geography-source-corpus-20261006/CITATION-AND-USE-geoBoundaries-original.txt';
const queue = json(originalCommit, packagePath);
const pkgRows = queue.packages.filter(row => row.package_id === 'gb-SYC-ADM2--repair-evaluation');
need(pkgRows.length === 1, 'Exact original SYC package row missing/duplicated');
const pkg = pkgRows[0];
need(pkg.primary_source === 'gb:SYC:ADM2' && pkg.source_family_index === 314
  && pkg.native_cells === 2458 && pkg.land_cells === 2458 && pkg.inland_water_cells === 0
  && pkg.interval_segments === 882 && pkg.location_count === 8
  && JSON.stringify(pkg.owners) === JSON.stringify([41018,41019,41020,41021,41022,41023,41024,41025])
  && JSON.stringify(pkg.source_families) === JSON.stringify([313,314]), 'Original full SYC denominator/lineage differs');
const roster = json(originalCommit, rosterPath, true);
const rosterById = new Map(roster.map(row => [row.source_id, row]));
need(roster.length > 0 && rosterById.size === roster.length, 'Original complete source roster is not unique');
const catalogue = json(originalCommit, cataloguePath);
const source = catalogue.products.find(product => product.key === 'gb:SYC:ADM2');
need(source && source.feature_count === 8 && source.parts.length === 1, 'Complete original direct SYC family required');
const sourceParts = source.parts.map((part, ordinal) => {
  const encoded = read(originalCommit, part.path);
  need(encoded.length === part.bytes && digest(encoded) === part.sha256 && part.ordinal === ordinal,
    'Encoded original SYC source pin differs');
  const decoded = gunzipSync(encoded, {maxOutputLength: part.uncompressed_bytes + 1});
  need(decoded.length === part.uncompressed_bytes && digest(decoded) === part.uncompressed_sha256,
    'Decoded original SYC source pin differs');
  return {...pin(originalCommit, part.path), decoded_bytes: decoded.length, decoded_sha256: digest(decoded)};
});
const raw = gunzipSync(read(originalCommit, source.parts[0].path));
need(raw.length === source.original_bytes && digest(raw) === source.original_sha256, 'Whole original SYC ADM2 family hash differs');
const fc = JSON.parse(raw);
need(fc.type === 'FeatureCollection' && fc.features.length === 8, 'Incomplete original SYC ADM2 feature collection');
const sourceById = new Map(fc.features.map(feature => [`gb:SYC:ADM2:${feature.properties?.shapeID}`, feature]));
need(sourceById.size === 8, 'Original SYC source identities are not unique');
const selectedPartPin = pin(currentCommit, currentPartPath);
const selectedPart = JSON.parse(reader.read(selectedPartPin));
const currentById = new Map(selectedPart.features.map(feature => [feature.id, feature]));
const currentMembers = selectedPart.features.filter(feature => feature.properties?.metadata?.source_id === 'gb:SYC:ADM2');
need(currentMembers.length === 8 && new Set(currentMembers.map(feature => feature.id)).size === 8,
  'Current canonical part does not contain the complete eight-member direct SYC cohort');
const metadata = json(currentCommit, metadataPath);
const sourceMeta = metadata['gb:SYC:ADM2'];
need(sourceMeta && sourceMeta.boundaryYearRepresented === '2020'
  && sourceMeta.boundaryCanonical === 'Regions'
  && sourceMeta.boundarySource === 'Seychelles National Bureau of Statistics, OCHA ROSEA'
  && sourceMeta.boundaryLicense === 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
  'Current pinned source metadata/terms differ');
const rosterOwners = new Map();
for (const item of roster) for (const owner of item.owners ?? []) {
  const list = rosterOwners.get(item.source_id) ?? []; list.push(owner); rosterOwners.set(item.source_id, list);
}
const stage = [], membership = [];
for (const owner of pkg.owners) {
  const candidates = [...sourceById.keys()].filter(id => (rosterOwners.get(id) ?? []).includes(owner));
  need(candidates.length === 1, `Original owner ${owner} lacks exactly one direct ADM2 source atom`);
  const sourceId = candidates[0], original = sourceById.get(sourceId), selected = currentById.get(sourceId);
  need(selected && selected.properties?.reference_owner === 'Seychelles'
    && selected.properties?.metadata?.source_id === 'gb:SYC:ADM2'
    && selected.properties?.metadata?.original_id === original.properties.shapeID,
  `Original/current direct target identity differs for owner ${owner}`);
  stage.push({target: sourceId, target_id: selected.id, pixelIndex: owner, consumed: original, selected});
  membership.push({source_id: sourceId, target_id: selected.id, pixelIndex: owner,
    source_family: 'gb:SYC:ADM2', source_role: 'direct 2020 region target; no tier or parent promotion'});
}
need(stage.length === 8 && new Set(stage.map(row => row.target)).size === 8,
  'Full original eight-target stage required');
const body = Buffer.from(JSON.stringify(stage) + '\n');
fs.mkdirSync(output, {recursive: false});
fs.writeFileSync(path.join(output, 'original-stage-inputs.json'), body, {flag:'wx'});
const membershipBody = Buffer.from(JSON.stringify(membership) + '\n');
fs.writeFileSync(path.join(output, 'source-target-membership.json'), membershipBody, {flag:'wx'});
const receipt = {
  version: 1, kind: 'SYC exact source/current identity stage; no source-relative or physical decision',
  current_commit: currentCommit, original_queue_commit: originalCommit,
  original_contract: {package_id: pkg.package_id, original_cells: pkg.native_cells,
    original_land_cells: pkg.land_cells, original_inland_water_cells: pkg.inland_water_cells,
    original_intervals: pkg.interval_segments, original_owners: pkg.owners,
    original_source_families: pkg.source_families, source_features: pkg.source_features},
  direct_source: {source_id: source.key, represented_year: sourceMeta.boundaryYearRepresented,
    canonical: sourceMeta.boundaryCanonical, source: sourceMeta.boundarySource,
    source_url: sourceMeta.boundarySourceURL, consumed_url: source.recorded_consumed_url,
    license: sourceMeta.boundaryLicense, license_source: sourceMeta.licenseSource,
    license_conflict: 'The retained 2020 metadata records CC BY 4.0; archived HDX image records Attribution 3.0 IGO. Both records are preserved; this stage relies on the actual pinned geoBoundaries consumed product and includes its attribution notice.'},
  source_families: {direct_current: {key:'gb:SYC:ADM2', count:8, parts:sourceParts,
      whole_original_bytes:source.original_bytes, whole_original_sha256:source.original_sha256},
    historical_context_only: {key:'gb:SYC:ADM1', feature_count:26, role:'historical/map context only; not a current owner family or territorial negative'}},
  current_pins: {world_index: pin(currentCommit,currentIndexPath), selector: pin(currentCommit,currentSelectorPath),
    semantic_lineage: pin(currentCommit,currentLineagePath), selected_geography_part: selectedPartPin,
    source_metadata: pin(currentCommit,metadataPath), geoBoundaries_attribution: pin(originalCommit,citationPath)},
  inputs: [...pins.values()],
  outputs: {original_stage_inputs: {path: path.relative(repo,path.join(output,'original-stage-inputs.json')),
      bytes:body.length,sha256:digest(body)},
    source_target_membership: {path:path.relative(repo,path.join(output,'source-target-membership.json')),
      bytes:membershipBody.length,sha256:digest(membershipBody)}},
  limits: ['Identity join only; no geometry repair, overlay, native qualification, whole-source completeness, legal boundary, or credit.',
    'Eight direct original region source features are joined to eight same-ID current selected features and original owner indices.',
    'Full original source bodies and other captured source families/physical/native operands remain separately pinned and unchanged.']
};
const receiptBody = Buffer.from(JSON.stringify(receipt,null,2)+'\n');
fs.writeFileSync(path.join(output,'stage-custody.json'),receiptBody,{flag:'wx'});
console.log(JSON.stringify({output:path.relative(repo,output),targets:stage.length,
  original_cells:pkg.native_cells,outputs:receipt.outputs,receipt_bytes:receiptBody.length,
  receipt_sha256:digest(receiptBody)}));
