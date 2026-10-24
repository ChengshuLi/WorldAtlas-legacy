import test from 'node:test';
import assert from 'node:assert/strict';
import {supportedInputs, jsonBytes, digest} from '../scripts/prepare-delivery-handoff.mjs';

function fixture() {
  const files = new Map(), commit = 'a'.repeat(40), puts = [];
  const put = (path, value) => {
    const raw = jsonBytes(value), pin = {commit, path, mode: '100644', git_blob_oid: 'b'.repeat(40), bytes: raw.length, sha256: digest(raw)};
    files.set(path, {raw, pin}); puts.push(pin); return pin;
  };
  const read = pin => { const file = files.get(pin.path); assert.deepEqual(pin, file.pin); return file.raw; };
  const reader = {pin: (c, p) => {assert.equal(c, commit); return files.get(p).pin;}, read, json: p => JSON.parse(read(p))};
  const native_contract = {size: 262166};
  const cover = [{y: 10, runs: [[1, 2, 'mapped_land_support'], [2, 4, 'mapped_inland_water_support']]}];
  const target = (id, pixelIndex) => ({id, pixelIndex, base_geometry: {whole: id}, source_members: ['a', 'b'],
    territorial_exclusions: [{whole_negative: 1}, {source_id: 'foreign', feature_ordinal: 3, geometry_sha256: 'f'.repeat(64)}],
    coverage_rows: pixelIndex === 1 ? cover : [{y: 10, runs: [[6, 8, 'mapped_land_support']]}]});
  const source = {version: 1, kind: 'source-target-native-evidence-v1', native_contract, targets: [target('a', 1), target('b', 1), target('c', 2)],
    families: [{whole: 'original'}], physical_input: {whole: 'all physical members'}, negative_sources: [{whole: 'complete foreign family'}]};
  const pins = {source_evidence: put('source.json', source), native_patch: put('patch.json', {rows: [{y: 10, runs: [[1, 4, 1], [6, 8, 2]]}]})};
  const diagnostic = {version: 1, kind: 'source-target-native-diagnostic-v1', native_contract, original_pins: pins,
    rule_sha256: digest(jsonBytes({version: 1, kind: 'source-target-native-rule-v1', ...pins})),
    requested_rows: [{y: 10, runs: [[1, 4, 1], [6, 8, 2]]}], supported_rows: [{y: 10, runs: [[1, 3, 1]]}],
    held_rows: [{y: 10, runs: [[3, 4, 1], [6, 8, 2]]}],
    decision_rows: [{y: 10, runs: [[1, 3, 1, 'assigned_cells'], [3, 4, 1, 'boundary_cells'], [6, 8, 2, 'territorial_exclusion_cells']]}],
    requested_cells: 5, supported_cells: 2, held_cells: 3};
  put('diagnostic.json', diagnostic);
  const original = {rows: [{y: 10, runs: [[1, 4, 1], [6, 8, 2], [10, 12, 3]]}]}; put('original.json', original);
  const prior = {rows: [{y: 10, runs: [[2, 4, 1, 'prior-fitness'], [10, 12, 3, 'prior-identity']]}],
    assessments: [{original: 'whole retained prior assessment', unresolved: true}]}; put('prior.json', prior);
  const config = {version: 1, diagnostic: {commit, path: 'diagnostic.json'}, original_patch: {commit, path: 'original.json'},
    prior_holds: {commit, path: 'prior.json'}};
  const run = () => Object.fromEntries(Object.entries(supportedInputs(config, reader)).map(([p, raw]) => [p, JSON.parse(raw)]));
  return {put, files, reader, source, pins, diagnostic, original, prior, config, run};
}

test('supported-inputs joins full original, native and prior holds without changing whole operands', () => {
  const f = fixture(), before = structuredClone(f.source), result = f.run();
  assert.deepEqual(result['native-patch.json'], {rows: [{y: 10, runs: [[1, 2, 1]]}]});
  assert.deepEqual(result['held-original.json'], {rows: [{y: 10, runs: [[2, 3, 1, 'prior-fitness'], [3, 4, 1, 'boundary_cells'],
    [6, 8, 2, 'territorial_exclusion_cells'], [10, 12, 3, 'prior-identity']]}]});
  const expected = {...before, targets: before.targets.slice(0, 2).map(t => ({...t, coverage_rows: [{y: 10, runs: [[1, 2, 'mapped_land_support']]}]}))};
  assert.deepEqual(result['source-evidence.json'], expected);
  assert.deepEqual(f.source, before);
  const counts = result['original-scope-partition.json'];
  assert.equal(counts.original_cells, 7); assert.equal(counts.supported_cells, 1); assert.equal(counts.held_cells, 6);
  assert.equal(counts.prior_held_cells, 4); assert.equal(counts.prior_already_native_held_cells, 1);
  assert.deepEqual(counts.owners, [{owner: 1, original_cells: 3, supported_cells: 1, held_cells: 2},
    {owner: 2, original_cells: 2, supported_cells: 0, held_cells: 2}, {owner: 3, original_cells: 2, supported_cells: 0, held_cells: 2}]);
  assert.deepEqual(f.reader.json(counts.prior_holds), f.prior, 'complete prior assessments remain pinned');
  assert.deepEqual(counts.original_inputs, f.pins);
  assert(!Object.keys(result).some(name => /authority|proof|ledger/.test(name)));
});

test('supported-inputs defaults to complete diagnostic scope and preserves class boundaries', () => {
  const f = fixture(); delete f.config.original_patch; delete f.config.prior_holds;
  const result = f.run();
  assert.deepEqual(result['native-patch.json'].rows, f.diagnostic.supported_rows);
  assert.deepEqual(result['source-evidence.json'].targets[0].coverage_rows,
    [{y: 10, runs: [[1, 2, 'mapped_land_support'], [2, 3, 'mapped_inland_water_support']]}]);
  assert.equal(result['source-evidence.json'].targets.length, 2, 'both original member atoms survive');
});

test('supported-inputs preserves absent masks and accounts for an entirely held scope', () => {
  const f = fixture(); delete f.config.original_patch;
  for (const t of f.source.targets) delete t.coverage_rows;
  f.pins.source_evidence = f.put('source.json', f.source);
  f.diagnostic.rule_sha256 = digest(jsonBytes({version: 1, kind: 'source-target-native-rule-v1', ...f.pins}));
  f.put('diagnostic.json', f.diagnostic);
  f.put('prior.json', {rows: [{y: 10, runs: [[1, 4, 1, 'prior'], [6, 8, 2, 'prior']]}]});
  const result = f.run(); assert.deepEqual(result['native-patch.json'].rows, []);
  assert.deepEqual(result['source-evidence.json'].targets, []);
  assert.equal(result['original-scope-partition.json'].held_cells, 5);
  delete f.config.prior_holds;
  assert(f.run()['source-evidence.json'].targets.every(t => !('coverage_rows' in t)));
});

const changes = {
  'missing diagnostic row': f => f.diagnostic.decision_rows = [],
  'duplicate diagnostic row': f => f.diagnostic.decision_rows.push(f.diagnostic.decision_rows[0]),
  'overlapping diagnostic spans': f => f.diagnostic.decision_rows[0].runs[1][0] = 2,
  'altered native reason': f => f.diagnostic.decision_rows[0].runs[0][3] = 'foreign',
  'wrong original owner': f => f.original.rows[0].runs[0][2] = 9,
  'omitted original owner': f => f.original.rows[0].runs.pop(),
  'extra unaccounted original key': f => f.original.rows[0].runs.push([15, 16, 4]),
  'prior key outside original': f => f.prior.rows[0].runs.push([15, 16, 4, 'foreign']),
  'prior assignment claim': f => f.prior.rows[0].runs[0][3] = 'assigned_cells',
  'duplicate prior key': f => f.prior.rows[0].runs[1] = f.prior.rows[0].runs[0],
  'false diagnostic count': f => f.diagnostic.supported_cells++,
  'wrong rule binding': f => f.diagnostic.rule_sha256 = '0'.repeat(64),
  'wrong native extent': f => f.diagnostic.native_contract = {size: 262165},
  'wrong requested patch': f => f.diagnostic.requested_rows[0].runs[0][1] = 3,
  'out of grid': f => f.original.rows[0].runs.push([262166, 262167, 1]),
  'negative row': f => f.original.rows[0].y = -1,
};
for (const [name, change] of Object.entries(changes)) test('supported-inputs refuses ' + name, () => {
  const f = fixture(); change(f); f.put('diagnostic.json', f.diagnostic); f.put('original.json', f.original); f.put('prior.json', f.prior);
  assert.throws(f.run);
});

for (const [name, change] of Object.entries({
  'missing member owner': s => s.targets = s.targets.slice(0, 2),
  'duplicate member id': s => s.targets[1].id = s.targets[0].id,
  'conflicting sibling classes': s => s.targets[1].coverage_rows = [{y: 10, runs: [[1, 4, 'mapped_land_support']]}],
  'missing class coverage': s => s.targets[0].coverage_rows[0].runs.pop(),
  'invented class': s => s.targets[0].coverage_rows[0].runs[0][2] = 'invented',
  'extra class cell': s => s.targets[0].coverage_rows[0].runs[0][0] = 0,
})) test('supported-inputs refuses ' + name + ' with refreshed source binding', () => {
  const f = fixture(); change(f.source); f.pins.source_evidence = f.put('source.json', f.source);
  f.diagnostic.rule_sha256 = digest(jsonBytes({version: 1, kind: 'source-target-native-rule-v1', ...f.pins}));
  f.put('diagnostic.json', f.diagnostic); assert.throws(f.run);
});

test('supported-inputs authenticates original source bytes rather than accepting a supplied replacement', () => {
  const f = fixture(); f.put('source.json', {...f.source, families: []}); assert.throws(f.run);
  const other = fixture(); other.config.source_evidence = other.config.diagnostic; assert.throws(other.run);
});

test('supported-inputs operates on full-width intervals without expanding native cells', () => {
  const f=fixture();delete f.config.original_patch;delete f.config.prior_holds;
  const requested=[{y:262165,runs:[[0,262166,1]]}],supported=[{y:262165,runs:[[0,262165,1]]}],held=[{y:262165,runs:[[262165,262166,1]]}];
  f.source.targets=f.source.targets.slice(0,2).map(t=>({...t,coverage_rows:[{y:262165,runs:[[0,262166,'mapped_land_support']]}]}));
  f.pins.source_evidence=f.put('source.json',f.source);f.pins.native_patch=f.put('patch.json',{rows:requested});
  Object.assign(f.diagnostic,{requested_rows:requested,supported_rows:supported,held_rows:held,
    decision_rows:[{y:262165,runs:[[0,262165,1,'assigned_cells'],[262165,262166,1,'boundary_cells']]}],
    requested_cells:262166,supported_cells:262165,held_cells:1,
    rule_sha256:digest(jsonBytes({version:1,kind:'source-target-native-rule-v1',...f.pins}))});
  f.put('diagnostic.json',f.diagnostic);
  const result=f.run();assert.deepEqual(result['native-patch.json'],{rows:supported});
  assert.equal(result['original-scope-partition.json'].original_cells,262166);
  assert.deepEqual(result['source-evidence.json'].targets[1].coverage_rows,[{y:262165,runs:[[0,262165,'mapped_land_support']]}]);
});


function applicabilityFixture() {
 const f=fixture(),geometry={type:'Polygon',coordinates:[[[0,0],[1,0],[1,1],[0,0]]]};
 for(const target of f.source.targets)target.territorial_exclusions=[geometry];
 const decision=f.put('adoption.json',{decision:'explicit fixture'}),scope=f.put('scope.json',{original:'retained'}),negative=f.put('negative.json',geometry);
 const data={version:1,kind:'adopted-native-territorial-applicability-v1',
  provenance:[{id:'decision',role:'adoption',pin:decision},{id:'scope',role:'scope',pin:scope},
   {id:'source',role:'original-source',pin:negative},{id:'held-scope',role:'scope',pin:scope}],
  records:[['a',1,1],['b',1,1],['a',1,2],['c',2,6]].map(([id,pixelIndex,x],i)=>({
   role:'contextual',source_id:id,target_id:id,pixelIndex,y:10,x,negative_ordinal:0,geometry_sha256:digest(jsonBytes(geometry)),
   original_source:{id:'source',pointer:''},adoption:{id:'decision',pointer:'/decision'},
   scope:{id:i===3?'held-scope':'scope',pointer:'/'+i,owner_pointer:'/owner'}}))};
 const refresh=()=>{
  f.source.territorial_applicability=f.put('territorial.json',data);
  f.pins.source_evidence=f.put('source.json',f.source);
  f.diagnostic.rule_sha256=digest(jsonBytes({version:1,kind:'source-target-native-rule-v1',...f.pins}));
  f.put('diagnostic.json',f.diagnostic);
 };
 refresh();f.reader.git=()=>Buffer.from('a'.repeat(40));
 return {...f,data,refresh};
}

test('applicability preparation preserves simultaneous member decisions and prunes only unreachable provenance',()=>{
 const f=applicabilityFixture(),before=structuredClone(f.data),o=f.run();
 assert(!o['source-evidence.json']);assert(o['unbound-source-evidence.json']);
 assert.deepEqual(o['territorial-applicability.json'],{...before,records:before.records.slice(0,2),provenance:before.provenance.slice(0,3)});
 assert.deepEqual(o['original-scope-partition.json'].territorial_applicability.selected_record_ordinals,[0,1]);
 assert.deepEqual(o['original-scope-partition.json'].territorial_applicability.omitted_record_ordinals,[2,3]);
 assert.deepEqual(f.data,before);
});

test('unchanged applicability remains one-pass and rejects an unused projection locator',()=>{
 const f=applicabilityFixture();f.data.records=f.data.records.slice(0,2);f.data.provenance.pop();f.refresh();
 const o=f.run();assert.deepEqual(o['source-evidence.json'].territorial_applicability,f.source.territorial_applicability);
 assert(!o['territorial-applicability.json']);assert.equal(o['original-scope-partition.json'].territorial_applicability.status,'unchanged');
 f.config.territorial_applicability={commit:'a'.repeat(40),path:'territorial.json'};
 assert.throws(f.run,/Unused territorial applicability projection binding/);
});

for(const [name,change]of Object.entries({
 'duplicate omitted record':d=>d.records.push(d.records.at(-1)),
 'foreign omitted key':d=>d.records.at(-1).x=9,
 'foreign omitted owner':d=>d.records.at(-1).pixelIndex=99,
 'foreign omitted source':d=>d.records.at(-1).source_id='foreign',
 'foreign omitted target':d=>d.records.at(-1).target_id='foreign',
 'missing omitted negative':d=>d.records.at(-1).negative_ordinal=7,
 'wrong omitted negative identity':d=>d.records.at(-1).geometry_sha256='f'.repeat(64),
 'unknown omitted role':d=>d.records.at(-1).role='ignore',
 'extra omitted field':d=>d.records.at(-1).unverified=true,
 'missing original provenance':d=>d.provenance.pop(),
 'duplicate original provenance':d=>d.provenance.push(d.provenance[0]),
 'unused original provenance':d=>d.provenance.push({...d.provenance[0],id:'unused'}),
 'wrong provenance role':d=>d.provenance.at(-1).role='adoption',
 'nonordinary original provenance':d=>d.provenance.at(-1).pin={...d.provenance.at(-1).pin,mode:'120000'},
 'incomplete original provenance':d=>delete d.provenance.at(-1).pin.sha256,
 'extra provenance field':d=>d.provenance.at(-1).unchecked=true,
 'malformed omitted reference':d=>delete d.records.at(-1).scope.owner_pointer,
 'unknown omitted reference':d=>d.records.at(-1).adoption.id='missing'
}))test('applicability preparation refuses '+name+' before filtering',()=>{
 const f=applicabilityFixture();change(f.data);f.refresh();assert.throws(f.run,/territorial|Territorial/);
});

test('applicability projection rejects stale original and projected executing-tree custody',()=>{
 const f=applicabilityFixture(),originalPin=f.reader.pin;
 f.reader.pin=(commit,path)=>path==='territorial.json'?{...originalPin(commit,path),git_blob_oid:'c'.repeat(40)}:originalPin(commit,path);
 assert.throws(f.run,/current committed adoption/);f.reader.pin=originalPin;
 const output=supportedInputs(f.config,f.reader),pin=f.put('projected.json',JSON.parse(output['territorial-applicability.json']));
 f.config.territorial_applicability={commit:pin.commit,path:pin.path};
 let calls=0;f.reader.pin=(commit,path)=>path==='projected.json'&&++calls>1?{...originalPin(commit,path),sha256:'f'.repeat(64)}:originalPin(commit,path);
 assert.throws(f.run,/current committed input/);
});
