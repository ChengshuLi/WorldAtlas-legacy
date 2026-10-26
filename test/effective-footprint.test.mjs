import test from 'node:test';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {sha256} from '@noble/hashes/sha2.js';
import {canonicalValue} from '../src/native-grid.js';
import {finalBankSelection,scientificNativeSelection} from '../src/reference-metadata.js';
import {effectivePrimitiveGeometries, effectiveFootprintValue, effectiveFootprintBounds, assertLegacyFootprint, canonicalFootprintJsonChunks, canonicalFootprintValueEqual, footprintValueSha256, bindPreparedNativeFeatures, finishEffectiveFootprint, finishedReleaseFootprintDigest, effectiveNativeAdditionRows, effectiveNativeRuntimeIndex,mergeUnassignedNativeIntervals,extendFinishedNativeFootprint} from '../src/effective-footprint.js';
const rectangle = (a,b,c,d) => ({type:'Polygon',coordinates:[[[a,b],[c,b],[c,d],[a,d],[a,b]]]});
const old = {id:'A',pixelIndex:1,properties:{parent_id:'P',name:'original'},geometry:rectangle(0,0,1,1)};
const oldFootprintDigest = value => Array.from(sha256(new TextEncoder().encode(JSON.stringify(canonicalValue(value)) + '\n')),
 byte => byte.toString(16).padStart(2,'0')).join('');
test('streamed footprint digest is byte-equivalent to canonical JSON serialization',()=>{
 const numeric=Object.create(null);Object.assign(numeric,{'4294967295':'upper-not-index','10':'ten','2':'two','01':'leading-zero','4294967294':'last-index','__proto__':'plain-key'});
 Object.defineProperty(numeric,'__proto__',{value:'own-proto-key',enumerable:true,configurable:true});
 const value={z:'Unicode 🧭 and lone surrogate \ud800',negativeZero:-0,small:1e-7,large:1e21,numeric,
  array:[,0,-0,1.25,'\u2028\n',false,null,Symbol('array-symbol'),function omitted(){}],
  omitSymbol:Symbol('object-symbol'),omitFunction(){}};
 const streamed=Buffer.from([...canonicalFootprintJsonChunks(value),'\n'].join(''));
 const legacy=Buffer.from(JSON.stringify(canonicalValue(value))+'\n');
 assert.deepEqual(streamed,legacy);
 assert.equal(footprintValueSha256(value),oldFootprintDigest(value));
 const nodeHash=createHash('sha256');for(const piece of canonicalFootprintJsonChunks(value))nodeHash.update(piece,'utf8');nodeHash.update('\n','utf8');
 assert.equal(nodeHash.digest('hex'),oldFootprintDigest(value));
 assert.equal(footprintValueSha256(Symbol('root')),oldFootprintDigest(Symbol('root')));
 assert.equal(footprintValueSha256(function root(){}),oldFootprintDigest(function root(){}));
 const withToJSON={a:1,toJSON(){return {serialized:'legacy toJSON'}}};
 assert.deepEqual(Buffer.from([...canonicalFootprintJsonChunks(withToJSON), '\n'].join('')),Buffer.from(JSON.stringify(canonicalValue(withToJSON))+'\n'));
 assert.equal(footprintValueSha256(withToJSON),oldFootprintDigest(withToJSON));
 const accessor=Object.create(null);let reads=0;Object.defineProperty(accessor,'10',{enumerable:true,get(){return ++reads;}});Object.defineProperty(accessor,'2',{enumerable:true,get(){return ++reads;}});
 reads=0;const accessorLegacy=JSON.stringify(canonicalValue(accessor))+'\n';reads=0;
 assert.equal([...canonicalFootprintJsonChunks(accessor),'\n'].join(''),accessorLegacy);
 for(const invalid of [undefined,NaN,Infinity,-Infinity,{bad:undefined},[undefined]]){
  assert.throws(()=>footprintValueSha256(invalid));assert.throws(()=>oldFootprintDigest(invalid));
 }
 assert.throws(()=>footprintValueSha256(1n));assert.throws(()=>oldFootprintDigest(1n));
});

test('streamed canonical equality preserves eager validation and JSON ordering',()=>{
 const left={z:[null,[-0,1e-7,1e21]],a:{'4294967295':'upper','10':'ten','2':'two','01':'leading','4294967294':'last-index'},text:'Unicode 🧭 lone \ud800'};
 const right={text:'Unicode 🧭 lone \ud800',a:{'2':'two','10':'ten','4294967294':'last-index','01':'leading','4294967295':'upper'},z:[null,[0,1e-7,1e21]]};
 const legacy=(a,b)=>JSON.stringify(canonicalValue(a))===JSON.stringify(canonicalValue(b));
 assert.equal(canonicalFootprintValueEqual(left,right),legacy(left,right));
 assert.equal(canonicalFootprintValueEqual(left,left),true);
 const nestedJSON={a:{toJSON(key){return {serializedKey:key};}}};
 const nestedLegacy=JSON.stringify(canonicalValue(nestedJSON));
 assert.equal([...canonicalFootprintJsonChunks(nestedJSON)].join(''),nestedLegacy);
 const nestedJSONCopy={a:{toJSON(key){return {serializedKey:key};}}};
 assert.equal(canonicalFootprintValueEqual(nestedJSON,nestedJSONCopy),true);
 const events=[];
 const getterValue=label=>Object.defineProperty({},'value',{enumerable:true,get(){events.push(label);return 1;}});
 const leftEffects={one:getterValue('left-one'),two:getterValue('left-two')};
 const rightEffects={one:getterValue('right-one'),two:getterValue('right-two')};
 assert.equal(canonicalFootprintValueEqual(leftEffects,rightEffects),true);
 assert.deepEqual(events,['left-one','left-two','right-one','right-two']);
 const customMap=[1];customMap.map=function(callback){return [callback(7,0,this)];};
 assert.deepEqual([...canonicalFootprintJsonChunks(customMap)].join(''),JSON.stringify(canonicalValue(customMap)));
 assert.equal(canonicalFootprintValueEqual(customMap,[7]),true);
 const sparse=new Array(2),prior=Array.prototype[0];
 try{Array.prototype[0]='inherited';const expected=JSON.stringify(canonicalValue(sparse));assert.equal([...canonicalFootprintJsonChunks(sparse)].join(''),expected);assert.equal(canonicalFootprintValueEqual(sparse,structuredClone(sparse)),true);}
 finally{if(prior===undefined)delete Array.prototype[0];else Array.prototype[0]=prior;}
 assert.equal(canonicalFootprintValueEqual({...left,z:[2]},right),false);
 for(const invalid of [undefined,NaN,Infinity,-Infinity,{bad:undefined},[undefined],{nested:[{bad:NaN}]}]){
  assert.throws(()=>canonicalFootprintValueEqual(invalid,invalid));
  assert.throws(()=>canonicalFootprintValueEqual({a:0,z:invalid},{a:1,z:null}));
 }
 assert.throws(()=>canonicalFootprintValueEqual(1n,1n));
});
test('prepared feature binding uses validated streamed equality for distinct contexts',()=>{
 const geometry=rectangle(0,0,1,1),base={id:'geography:base',footprints_sha256:'a'.repeat(64),hierarchy_sha256:'b'.repeat(64)};
 const feature={id:'A',pixelIndex:1,properties:{parent_id:'P'},geometry};
 const context={id:'A',pixelIndex:1,geometry:structuredClone(geometry),properties:{id:'A',parent_id:'P'},gridBounds:[0,0,1,1]};
 const ownerBytes=new TextEncoder().encode(JSON.stringify([[feature.pixelIndex,feature.id]]));
 const ownerDigest=Array.from(sha256(ownerBytes),byte=>byte.toString(16).padStart(2,'0')).join('');
 const proof={version:3,owners:1,context_parts:[{features:1}],base_reference:base,
  effective_reference:{footprints_sha256:finishedReleaseFootprintDigest(base,[feature],footprintValueSha256)},reference_owner_sha256:ownerDigest};
 assert.equal(bindPreparedNativeFeatures({preparedOwnership:proof},[feature],[[context]])[0].geometry.coordinates[0][0][0],0);
 const changed=structuredClone(context);changed.geometry.coordinates[0][1][0]=0.5;
 assert.throws(()=>bindPreparedNativeFeatures({preparedOwnership:proof},[feature],[[changed]]),/Prepared base geometry differs/);
});
test('large canonical equality never serializes a whole object or skips late validation',()=>{
 const large=()=>Array.from({length:5000},(_,index)=>({id:`owner-${index}`,geometry:{type:'Polygon',coordinates:[[[index,index],[index+1,index],[index+1,index+1],[index,index+1],[index,index]]]}}));
 const left=large(),equal=structuredClone(left),unequal=structuredClone(left);unequal.at(-1).geometry.coordinates[0][4][0]++;
 const stringify=JSON.stringify;let whole=false;
 JSON.stringify=function(value,...args){if(value!==null&&(typeof value==='object'||typeof value==='bigint'))whole=true;return stringify.call(this,value,...args);};
 try{
  assert.equal(canonicalFootprintValueEqual(left,equal),true);
  assert.equal(canonicalFootprintValueEqual(left,unequal),false);
  const shared={nested:{value:1}},sharedLeft={first:shared,second:shared},sharedRight={first:{nested:{value:1}},second:{nested:{value:1}}};
  assert.equal(canonicalFootprintValueEqual(sharedLeft,sharedRight),true);
  assert.equal(whole,false);
 }finally{JSON.stringify=stringify;}
 const early={a:'x',z:{invalid:undefined}},other={a:'a much longer value',z:{valid:true}};
 assert.throws(()=>canonicalFootprintValueEqual(early,other));
 assert.throws(()=>canonicalFootprintValueEqual(other,early));
});
test('large footprint digest encodes bounded chunks instead of one canonical-document buffer',()=>{
 const value=Array.from({length:8000},(_,index)=>({id:`owner-${index}`,pixelIndex:index+1,
  geometry:{type:'Polygon',coordinates:[[[index,index],[index+1,index],[index+1,index+1],[index,index+1],[index,index]]]},
  native_rows:[{y:index,runs:[[index,index+1]]}]}));
 let pieceCount=0,maxPieceCharacters=0;
 for(const piece of canonicalFootprintJsonChunks(value)){pieceCount++;maxPieceCharacters=Math.max(maxPieceCharacters,piece.length);}
 assert.ok(pieceCount>100000);assert.ok(maxPieceCharacters<256,`serializer emitted a large piece: ${maxPieceCharacters}`);
 const OriginalTextEncoder=globalThis.TextEncoder, originalStringify=JSON.stringify;
 let maxEncodedCharacters=0,maxSerializedValue=0;
 globalThis.TextEncoder=class extends OriginalTextEncoder { encode(input,...args){maxEncodedCharacters=Math.max(maxEncodedCharacters,input.length);return super.encode(input,...args);} };
 JSON.stringify=function(...args){const result=originalStringify(...args);if(typeof result==='string')maxSerializedValue=Math.max(maxSerializedValue,result.length);return result;};
 try { assert.match(footprintValueSha256(value),/^[a-f0-9]{64}$/); }
 finally { globalThis.TextEncoder=OriginalTextEncoder;JSON.stringify=originalStringify; }
 assert.ok(maxEncodedCharacters<=16*1024,`encoded chunk exceeded 16 KiB: ${maxEncodedCharacters}`);
 assert.ok(maxSerializedValue<256,`a whole structure was serialized at once: ${maxSerializedValue}`);
});
function additive() { return {...old, additiveFootprint:{version:1,kind:'retained-base-plus-additions',baseline_release_sha256:'a'.repeat(64),base_geometry_sha256:footprintValueSha256(old.geometry),ledger_sha256:'b'.repeat(64),rule_sha256:'c'.repeat(64),additions:[{component_id:'gap-1',geometry:rectangle(1,0,2,1),geometry_sha256:footprintValueSha256(rectangle(1,0,2,1)),source_receipt_sha256:'d'.repeat(64)}]}}; }
test('legacy geometry/digest input is literal and additive primitives keep complete base',()=>{
 assert.equal(effectiveFootprintValue(old),old.geometry); const feature=additive(), raw=JSON.stringify(old);
 const parts=effectivePrimitiveGeometries(feature);assert.equal(parts[0],old.geometry);assert.equal(parts.length,2);
 assert.deepEqual(effectiveFootprintBounds(feature),[0,0,2,1]);assert.equal(JSON.stringify(old),raw);
 assert.equal(effectiveFootprintValue(feature).kind,'retained-base-plus-additions');assert.throws(()=>assertLegacyFootprint(feature),/effective-footprint consumer/);
});
test('actual whole representation rejects drift, missing/duplicate/foreign/unsupported fields and complete pointsets',()=>{
 for (const mutate of [f=>f.geometry.coordinates[0][0][0]=.1,f=>f.additiveFootprint.ledger_sha256='bad',f=>f.additiveFootprint.rule_sha256='bad',f=>f.additiveFootprint.additions=[],f=>f.additiveFootprint.additions.push(structuredClone(f.additiveFootprint.additions[0])),f=>f.additiveFootprint.additions[0].geometry.coordinates[0][1][0]=5,f=>delete f.additiveFootprint.additions[0].source_receipt_sha256,f=>f.additiveFootprint.extra=true,f=>f.additiveFootprint.additions[0].geometry.type='GeometryCollection',f=>f.additiveFootprint.additions[0].geometry.coordinates[0].pop()]) {
  const f=structuredClone(additive()); mutate(f);assert.throws(()=>effectivePrimitiveGeometries(f));
 }
});

const finishedBase = {id:'geography:reference',footprints_sha256:'a'.repeat(64),hierarchy_sha256:'b'.repeat(64)};
function nativeFootprint() {
 const feature = structuredClone(old), component = (id, rows, bounds) => ({representation:'native-cells',component_id:id,
  target_id:feature.id,pixelIndex:feature.pixelIndex,disposition:'assigned',base_geometry:feature.geometry,
  base_geometry_sha256:footprintValueSha256(feature.geometry),native_rows:rows,native_bounds:bounds,
  native_cells:rows.reduce((n,row)=>n+row.runs.reduce((m,[a,b])=>m+b-a,0),0),
  source_receipt_sha256:'c'.repeat(64),authority_sha256:'d'.repeat(64),rule_sha256:'e'.repeat(64)});
 feature.additiveFootprint={version:2,kind:'retained-base-plus-additions',baseline_release_sha256:'a'.repeat(64),
  base_geometry_sha256:footprintValueSha256(feature.geometry),ledger_sha256:'f'.repeat(64),authority_registry_sha256:'1'.repeat(64),
  components:[component('n1',[{y:10,runs:[[2,4,1],[12,14,1]]},{y:12,runs:[[1,2,1]]}],[-4,-2,3,5]),
   component('n2',[{y:10,runs:[[4,7,1]]},{y:11,runs:[[8,9,1]]}],[-5,-1,6,4])]};
 return feature;
}
test('finished representation preserves complete primitive ring grouping and order without repair metadata',()=>{
 const feature=additive();
 feature.geometry={type:'Polygon',coordinates:[...feature.geometry.coordinates,rectangle(.2,.2,.8,.8).coordinates[0]]};
 feature.additiveFootprint.base_geometry_sha256=footprintValueSha256(feature.geometry);
 const addition=feature.additiveFootprint.additions[0];addition.geometry={type:'MultiPolygon',coordinates:[rectangle(1,0,2,1).coordinates,rectangle(3,0,4,1).coordinates]};
 addition.geometry_sha256=footprintValueSha256(addition.geometry);
 const before=JSON.stringify(feature), primitives=effectivePrimitiveGeometries(feature), result=finishEffectiveFootprint(feature);
 assert.equal(JSON.stringify(feature),before);assert.ok(!Object.hasOwn(result,'additiveFootprint'));
 assert.equal(result.geometry,feature.geometry);assert.deepEqual(result.properties,feature.properties);
 assert.deepEqual(result.finishedFootprint.geometry.coordinates,[primitives[0].coordinates,...primitives[1].coordinates]);
 assert.deepEqual(effectiveNativeRuntimeIndex([result]),effectiveNativeRuntimeIndex([feature]));
 assert.deepEqual(effectiveFootprintBounds(result),effectiveFootprintBounds(feature));
 assert.deepEqual(effectiveNativeAdditionRows(result),[]);assert.equal(result.finishedFootprint.native_bounds,null);
 assert.equal(finishEffectiveFootprint(result),result);assert.throws(()=>assertLegacyFootprint(result),/effective-footprint consumer/);
 assert.deepEqual(Object.keys(result.finishedFootprint).sort(),['version','kind','reference_geometry_sha256','geometry','native_rows','native_bounds'].sort());
});
test('finished native coverage is the exact half-open union, and intervals, bounds and owner affect its digest',()=>{
 const feature=nativeFootprint(), result=finishEffectiveFootprint(feature), original=JSON.stringify(feature);
 assert.deepEqual(effectiveNativeAdditionRows(result),[{y:10,runs:[[2,7],[12,14]]},{y:11,runs:[[8,9]]},{y:12,runs:[[1,2]]}]);
 assert.deepEqual(result.finishedFootprint.native_bounds,[-5,-2,6,5]);
 const cells=rows=>new Set(rows.flatMap(({y,runs})=>runs.flatMap(([a,b])=>Array.from({length:b-a},(_,i)=>y+':'+(a+i)))));
 assert.deepEqual(cells(effectiveNativeAdditionRows(result)),cells(effectiveNativeAdditionRows(feature)));
 assert.deepEqual(effectiveFootprintBounds(result),effectiveFootprintBounds(feature));
 const digest=finishedReleaseFootprintDigest(finishedBase,[result]);
 for(const mutate of [f=>f.finishedFootprint.native_rows[0].runs[0][1]++,f=>f.finishedFootprint.native_bounds[0]--,
  f=>f.id='other',f=>f.pixelIndex++,f=>f.finishedFootprint.geometry.coordinates[0][0][1][0]+=.1]){
  const changed=structuredClone(result);changed.geometry=structuredClone(changed.geometry);mutate(changed);assert.notEqual(finishedReleaseFootprintDigest(finishedBase,[changed]),digest);
 }
 assert.equal(JSON.stringify(feature),original);
});
test('finished context refuses unrelated dated geometry, mixed historical components and malformed complete coverage',()=>{
 const result=finishEffectiveFootprint(nativeFootprint());
 for(const mutate of [f=>f.geometry=rectangle(3,3,4,4),f=>f.additiveFootprint=nativeFootprint().additiveFootprint,
  f=>f.finishedFootprint.extra=true,f=>f.finishedFootprint.version=2,f=>f.finishedFootprint.geometry.coordinates[0][0].pop(),
  f=>f.finishedFootprint.native_rows[0].runs=[[2,4],[4,7]],f=>f.finishedFootprint.native_rows.reverse(),
  f=>f.finishedFootprint.native_rows[0].runs[0].push(1),f=>f.finishedFootprint.native_bounds=null]){
  const changed=structuredClone(result);mutate(changed);assert.throws(()=>effectivePrimitiveGeometries(changed));
 }
 const dated={...result,geometry:structuredClone(result.geometry)};
 assert.deepEqual(effectivePrimitiveGeometries(dated),effectivePrimitiveGeometries(result));
});

test('original native selection refuses unknown profile versions instead of legacy fallback',()=>{
 const old={version:1,method:'native-linear-evenodd-first-owner-v1',sha256:'a'.repeat(64),additive_release:{},reference_projection:{}};
 assert.deepEqual(scientificNativeSelection(old),{version:1,method:old.method,sha256:old.sha256});
 for(const version of [undefined,null,0,3,'1','2'])assert.throws(()=>scientificNativeSelection({...old,version}),/Unsupported final ownership selection/);
 assert.throws(()=>scientificNativeSelection({...old,version:2}),/final ownership selection/);
});

test('final selector retains original N and refuses current-profile downgrade',()=>{
 const native={version:1,method:'native-linear-evenodd-first-owner-v1',manifest_path:'data/canonical-grid/native/manifest.json',sha256:'a'.repeat(64),release_id:'geography:native',selected_geography:{kind:'complete-world-index-with-exact-encoded-overrides'},artifact_consumption:{}};
 const selected={version:2,kind:'selected-final-native-bank-v2',native_selection:native,prepared_bank:{path:'data/canonical-grid/current-startup/index.json',bytes:123,sha256:'b'.repeat(64)},reference:{id:'geography:final:test',footprints_sha256:'c'.repeat(64),hierarchy_sha256:'d'.repeat(64)}};
 assert.equal(finalBankSelection(selected),selected.prepared_bank);assert.equal(scientificNativeSelection(selected),native);
 for(const field of ['kind','native_selection','prepared_bank','reference','change_evidence'])assert.throws(()=>scientificNativeSelection({...native,[field]:selected[field]??{}}),/Malformed legacy ownership selection/);
 for(const mutate of [s=>s.version=1,s=>s.kind='unknown',s=>s.prepared_bank.path='data/other.json',s=>s.native_selection.manifest_path='data/nativeXjson']){
  const value=structuredClone(selected);mutate(value);assert.throws(()=>finalBankSelection(value));
 }
});

test('factored interval arithmetic preserves occupied words and admits only disjoint zero-to-owner cells',()=>{
 const rows=new Uint32Array(262166*2);rows[21]=1;for(let y=11;y<262166;y++)rows[y*2]=1;
 const base={version:2,method:'native-linear-evenodd-first-owner-v1',size:262166,coordinateBits:19,rows,runs:new Uint32Array([2**19+10,19])};
 const scope={owners:new Set([1,2]),allowed:new Set([1,2])};
 const result=mergeUnassignedNativeIntervals(base,[{y:10,runs:[[20,25,1],[30,35,2]]}],scope);
 assert.deepEqual([...result.runs],[2**19+10,24,2*2**19+30,34]);assert.equal(result.rows[21],2);assert.equal(result.rows[22],2);assert.equal(result.addedCells,10);
 assert.deepEqual([...base.runs],[2**19+10,19]);assert.equal(base.rows[21],1);assert.equal(base.rows[22],1);
 for(const additions of [[{y:10,runs:[[19,25,2]]}],[{y:10,runs:[[30,35,3]]}],[{y:-1,runs:[[30,35,2]]}]])assert.throws(()=>mergeUnassignedNativeIntervals(base,additions,scope));
 const empty=mergeUnassignedNativeIntervals(base,[],scope);assert.deepEqual(empty.rows,rows);assert.deepEqual(empty.runs,base.runs);assert.equal(empty.addedCells,0);
});


test('new native context extends the complete accepted footprint without retaining repair components',()=>{
 const legacy=nativeFootprint(),before=finishEffectiveFootprint(legacy),raw=JSON.stringify(before);
 const component={...legacy.additiveFootprint.components[0],component_id:'new',native_rows:[{y:10,runs:[[20,22,1]]}],native_cells:2,native_bounds:[-6,-3,7,8]};
 const after=extendFinishedNativeFootprint(before,[component]);
 assert.equal(JSON.stringify(before),raw);assert.equal(after.geometry,before.geometry);
 assert.equal(after.finishedFootprint.geometry,before.finishedFootprint.geometry);
 assert.deepEqual(after.finishedFootprint.native_rows,[{y:10,runs:[[2,7],[12,14],[20,22]]},{y:11,runs:[[8,9]]},{y:12,runs:[[1,2]]}]);
 assert.deepEqual(after.finishedFootprint.native_bounds,[-6,-3,7,8]);
 assert.ok(!Object.hasOwn(after,'additiveFootprint'));assert.equal(extendFinishedNativeFootprint(after,[]),after);
 const first=extendFinishedNativeFootprint({...old},[component]);
 assert.deepEqual(first.finishedFootprint.geometry.coordinates,[old.geometry.coordinates]);
 assert.deepEqual(first.finishedFootprint.native_rows,[{y:10,runs:[[20,22]]}]);
 for(const bad of [{...component,target_id:'other'},{...component,pixelIndex:2},{...component,base_geometry_sha256:'0'.repeat(64)}])
  assert.throws(()=>extendFinishedNativeFootprint(before,[bad]));
});
