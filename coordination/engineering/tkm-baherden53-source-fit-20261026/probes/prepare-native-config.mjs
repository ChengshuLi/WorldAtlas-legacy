/* Exact 53-key Baherden native diagnostic inputs, using retained original contacts and physical output. */
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {pinReader} from '../../../../scripts/prepare-delivery-handoff.mjs';
const [R, OUT] = process.argv.slice(2);
const H='3d69f381f2e1e270eafa407d49177bef110e7808';
const STAGE='da5046903ea26e5445a5b631c2581e9bcd3dd9d3';
const PHYS='e52acbc9e1dd76759da9a43a970263c455065dd0';
const P='coordination/engineering/tkm-baherden53-source-fit-20261026';
const SOURCE='gb:TKM:ADM2:10190150B40000077655635';
const FAMILY='gb:TKM:ADM2';
const need=(v,m)=>{if(!v)throw Error(m)};
const sha=b=>createHash('sha256').update(b).digest('hex');
const reader=pinReader(R);
const pin=(p,c=H)=>reader.pin(c,p);
const json=(p,c=H)=>JSON.parse(reader.read(pin(p,c)));
const compressedPin=(p,c=H,decodedBytes,decodedSha)=>({...pin(p,c),decoded_bytes:decodedBytes,decoded_sha256:decodedSha});
need(path.resolve(R)===R,'absolute canonical repo root required');
need(fs.statSync(path.dirname(OUT)).isDirectory()&&!fs.lstatSync(OUT,{throwIfNoEntry:false}),'destination parent/fresh output required');
fs.mkdirSync(OUT);
const stage=json(`${P}/physical-001/original-stage-inputs.json`,STAGE);
need(stage.length===1&&stage[0].target===SOURCE&&stage[0].family===FAMILY,'exact one source target stage');
const physical=json(`${P}/physical-002/result-001/whole-target-support.json`,PHYS);
need(physical.results.length===1&&physical.results[0].target===SOURCE&&physical.results[0].issues.length===0,'complete physical result/no issues');
const candidate=JSON.parse(fs.readFileSync('/workspace/shared/worldatlas-TKM-Baherden53-native-delta-candidate-20261026.json','utf8'));
need(candidate.kind==='tkm-source-relative-native-patch-candidate-not-authority-v1'&&candidate.added_cells===53,'candidate remains non-authority input');
const requested=candidate.rows;
need(requested.reduce((n,r)=>n+r.runs.reduce((m,[a,b])=>m+b-a,0),0)===53&&requested.every(r=>r.runs.every(run=>run[2]===42138)),'exact requested cells');
const selector=json('data/ownership-selection.json');
const startupIndex=json(selector.prepared_bank.path);
need(selector.native_selection.manifest_path==='coordination/engineering/arctic-three-retained-land-fit-repair-native-20261008/native-v9/manifest.json'
  &&startupIndex.native_manifest_sha256===selector.native_selection.sha256,'exact selected native manifest/current startup binding');
const currentOwnerPart=startupIndex.preparedOwnership.context_parts.find(p=>42138-1>=p.offset&&42138-1<p.offset+p.features);
need(currentOwnerPart,'current startup context part covers original owner index');
const currentOwnerBytes=reader.read(pin(`data/canonical-grid/current-startup/${currentOwnerPart.path}`));
need(sha(currentOwnerBytes)===currentOwnerPart.sha256,'current startup owner-context compressed bytes');
const currentOwnerRaw=gunzipSync(currentOwnerBytes);
need(currentOwnerRaw.length===currentOwnerPart.decoded_bytes&&sha(currentOwnerRaw)===currentOwnerPart.decoded_sha256,'current startup owner-context decoded bytes');
const currentOwner=JSON.parse(currentOwnerRaw.toString('utf8'))[42138-1-currentOwnerPart.offset];
need(currentOwner?.id===SOURCE&&currentOwner.pixelIndex===42138,'original owner index resolves to exact current startup target');
const cataloguePath='coordination/engineering/original-geography-source-corpus-20261006/catalogue.json';
const catalogue=json(cataloguePath);
const product=catalogue.products.find(p=>p.key===FAMILY);
need(product?.feature_count===59&&product.parts.length===1,'complete consumed simplified family');
const familyParts=product.parts.map(p=>compressedPin(p.path,H,p.uncompressed_bytes,p.uncompressed_sha256));
const projectionPath='data/macro-foundation/world-review-projection.json';
const projection=json(projectionPath);
const cohortParts=projection.location_parts.map(p=>pin('data/'+p));
const world=pin('data/world-index.json');
const canonical=reader.json(pin('data/geography/part-23.json')).features.find(f=>f.id===SOURCE);
need(canonical&&canonical.properties.reference_owner==='Turkmenistan','current canonical target identity');
const byY=new Map(requested.map(row=>[row.y,row.runs.map(([a,b])=>[a,b,'mapped_land_support'])]));
const target={id:SOURCE,target_id:SOURCE,pixelIndex:42138,base_geometry:stage[0].selected.geometry,source_family:FAMILY,
  source_receipt_sha256:pin(`${P}/physical-002/result-001/whole-target-support.json`,PHYS).sha256,
  coverage_classes:['mapped_land_support'],coverage_rows:[...byY].map(([y,runs])=>({y,runs})),territorial_exclusions:[]};

const manifest=reader.json(pin(selector.native_selection.manifest_path));
const ownerPin=reader.pin(manifest.original_assets.bounds.commit,manifest.original_assets.bounds.path);
const ownerRaw=reader.read(ownerPin),ownerDecoded=gunzipSync(ownerRaw);
const ownerRoster={...ownerPin,encoding:'gzip',decoded_bytes:ownerDecoded.length,decoded_sha256:sha(ownerDecoded)};
need(ownerRoster.sha256===manifest.original_assets.bounds.sha256,'exact accepted owner-roster pin');
const config={version:1,compact_territorial_exclusions:true,
 territorial_exclusion_families:['gb:AFG:ADM1','gb:KAZ:ADM1','gb:UZB:ADM1'],
 selector:{commit:H,path:'data/ownership-selection.json'},
 source_evidence:{version:1,kind:'source-target-native-evidence-v1',owner_roster:ownerRoster,catalogue:pin(cataloguePath),
  families:[{source_id:FAMILY,parts:familyParts}],physical_evidence:pin(`${P}/physical-002/result-001/whole-target-support.json`,PHYS),
  physical_input:pin(`${P}/physical-001/original-stage-inputs.json`,STAGE),physical_reproduction:pin('scripts/qualify-source-cohort.py'),
  source_membership:{index:world,lineage:pin('data/semantic-report.json'),parts:[pin('data/geography/part-23.json')],cohort_inventory:{index:pin(projectionPath),parts:cohortParts}},targets:[target]}};
// The accepted native diagnostic consumes a patch body whose only top-level
// field is rows; broader candidate metadata remains in its private receipt.
const candidateOut={rows:requested};
const configOut={version:1,source_evidence:{commit:PHYS,path:`${P}/source-evidence-001/source-evidence.json`},
 native_patch:{commit:PHYS,path:`${P}/native-diagnostic-001/native-patch-input.json`}};
for(const [rel,obj] of [['source-evidence-config.json',config],['native-patch-input.json',candidateOut],['native-diagnostic-config.json',configOut]]){
 const p=path.join(OUT,rel);fs.writeFileSync(p,JSON.stringify(obj)+'\n',{flag:'wx'});
}
console.log(JSON.stringify({candidate_cells:53,physical_issues:physical.results[0].issues.length,target:SOURCE,positive_family_parts:familyParts.length,foreign_negative_families:config.territorial_exclusion_families,canonical_geometry_exact:true,config_hashes:Object.fromEntries(['source-evidence-config.json','native-patch-input.json','native-diagnostic-config.json'].map(f=>[f,sha(fs.readFileSync(path.join(OUT,f)))]))}));
