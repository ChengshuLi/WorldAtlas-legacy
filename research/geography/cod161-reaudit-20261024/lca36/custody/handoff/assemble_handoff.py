"""Collect exact retained evidence and author recommendations. No geography execution."""
from pathlib import Path
import json, hashlib, shutil, collections
R=Path('/Users/chengshuli/Documents/Codex/2026-10-24/task')
O=Path(__file__).parent
Q=Path('/Users/chengshuli/Documents/Codex/2026-10-18/task-4/lca-proposal-20261021/qualification')
def read(p): return json.loads(p.read_text())
def write(n,v): (O/n).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def pin(p):
 b=p.read_bytes();return {'path':str(p),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
original=[json.loads(x) for x in (R/'lca36_reaudit/lca36-exact-pending-rows.jsonl').read_text().splitlines()]
visual=read(R/'lca36-cso-source-application/exact36-visual-assessment.json')
follow=read(R/'lca36-method-limits-followup/exact36-followup-results.json')['keys']
physical_map=read(R/'lca36-source-role-groundwork/ten-consumed-member-input-map.json')
physical={x['source_id']:x for x in physical_map}
obs=read(O/'retained/observation.json');obskeys={(7120,x['y'],x['x']):x for x in obs['keys']}
screen=read(O/'retained/screen.json')
projected={(7120,*x) for x in screen['projected_keys']};rounded={(7120,*x) for x in screen['rounded_keys']}
patch=read(O/'retained/stable_patch.json');accepted=[]
for row in patch['rows']:
 for a,b,owner in row['runs']:
  accepted.extend((owner,row['y'],x) for x in range(a,b))
accepted=set(accepted);pending={tuple(x['key']) for x in original}
assert len(accepted)==324 and len(pending)==36 and not accepted&pending
assert accepted|pending==set(obskeys) and accepted==projected&rounded
vmap={tuple(x['original_pending_row']['key']):x for x in visual};fmap={tuple(x['key']):x for x in follow}
assert pending==set(vmap)==set(fmap)
physical_file=O/'retained/physical-whole-consumed-target-support.json'
shutil.copyfile(Q/'physical-whole-target-support.json',physical_file)
for folder,name,dest in [
 ('lca36-method-limits-followup','physical-inputs.json','physical-inputs-with-selected-bindings.json'),
 ('lca36-method-limits-followup','physical-run-bindings.json','physical-run-bindings.json'),
 ('lca36-source-role-groundwork','selected-LCA-whole-feature.json','selected-LCA-whole-feature.json'),
 ('lca36-method-limits-followup','method-contract-findings.json','method-contract-findings.json'),
 ('lca36-method-limits-followup','held-sheet-control-inventory.json','held-sheet-control-inventory.json'),
 ('lca36-method-limits-followup','three-obscured-local-readings.json','three-obscured-local-readings.json')]:shutil.copyfile(R/folder/name,O/'retained'/dest)
write('accepted324-keys-preserved.json',{'receipt':'https://github.com/ChengshuLi/WorldAtlas/pull/2659#issuecomment-6317859071','keys':[list(k) for k in sorted(accepted)],'unchanged':True,'not_part_of_proposal':True})
write('whole-ten-target-physical-context.json',physical_map)
matrix=[]
for old in original:
 key=tuple(old['key']);v=vmap[key];f=fmap[key];stratum=old['source_comparison_stratum'];reading=f['updated_reading_class']
 precision=stratum=='projected_only_precision_sensitive'
 assert (key in projected and key not in rounded)==precision
 assert key not in accepted
 if precision:
  group='precision-sensitive-two'
  failed='Historically supported in the326-key native diagnostic, but projected-only corroboration is not stable across the two retained response representations; excluded from accepted324.'
 elif reading=='clear_seaward_conditional_reading':
  group='adverse-conditional-seaward-25';failed='Outside both retained any-member DoPDUR comparisons; actual conditional CSO reading adds a directly published outline context, without determining true shoreline, proving an independently surveyed lineage, or overriding the frozen physical witness.'
 elif reading=='boundary_symbol_adjacent':
  group='adverse-near-symbol-four';failed='Outside both retained any-member DoPDUR comparisons; actual controlled source reading is too close to the printed boundary symbol to resolve a side under the two retained operation positions.'
 else:
  group='adverse-datum-limited-five';failed='Outside both retained any-member DoPDUR comparisons. Actual inspection of all eight held PDF catalogs and five prior applicable viewports supplies no alternate placement; own2018 sheet declares NAD27 and no applicable StLucia operation is established. This is a performed reasonable source-application failure, not proof of object absence.'
 source_ids=[x['source_id'] for x in old['source_records']]
 future=('An authoritative clarification of the2018 CSO datum/control or a specifically identified applicable controlled sheet could decide the question. No such readable body or additional viewport was identified in the inspected custody; no contact is authorized or sent.' if group=='adverse-datum-limited-five' else 'A newly identified source-specific authoritative survey or documented boundary/shore-method record could change the assessment; no concrete unperformed readable deciding body is identified in the inspected custody.')
 row={'key':old['key'],'original_pending_row':old,'accepted324_disjoint':True,'group':group,
  'author_disposition':'propose_researched_unresolved_for_independent_review','acceptance_status':'pending_independent_review_and_root_acceptance','native_hold':'preserved',
  'historical_owner_observation':obskeys[key],
  'native_qualification_context':{'historical326_requested':precision,'historical326_result':'supported' if precision else 'not_requested','stable324_requested':False,'stable324_result':'not_requested','new_native_refusal_observed':False,'do_not_infer_failure_from_absent_request':True},
  'actual_comparator_context':{'projected_membership':key in projected,'rounded_membership':key in rounded,'comparison_scope':'any of ten published provider members, not district-name matching','screen_body':pin(O/'retained/screen.json'),'raw_DoPDUR_redistributed':False},
  'original_physical_support':{'land':old['retained_land'],'inland_water':old['retained_inland_water'],'whole_target_report':pin(physical_file),'targets':[physical[x] for x in source_ids],'per_key_reconstruction_failure_inferred':False},
  'actual_map_source_reading':{'prior_exact_reading':v,'updated_reading':f,'optional_display_followup':('retained/three-obscured-local-readings.json' if v['number'] in [16,17,18] else None),'coverage_inventory':('retained/held-sheet-control-inventory.json' if group=='adverse-datum-limited-five' else None)},
  'substantive_failed_qualification_argument':failed,
  'source_construction_relevance':'Consumed CC0 family is2022digitization of2005outline/olderdivisions and2015updateddivisions; represented2015 label does not establish coast survey date, accuracy or tidal convention. Alltenmembers belong to aggregateowner7120; internaldivision/name disagreement alone does not explain an adverse any-member union.',
  'contract_basis':'Original documented-exception alternative permits independent unresolved review without a positive repair result. Current consumer checks selected identity/base binding, already retained, but does not require a separately measured aggregate physical result.',
  'finite_remaining_question':future,'genuinely_deciding_feasible_unperformed_step_identified':False,
  'reason_not_marked_pending_new_lookup':'Named held-source opportunities have been read or subjected to a specific lawful failed application; unavailable unspecified future clarification is not imposed as a universal certificate. Reviewer may reject sufficiency or identify a concrete new step; holds remain.',
  'limits':['No sovereignty, full-footprint, legal shoreline or present physical truth clearance.','Conditional paper position is source evidence, not an admissible geographic predicate.','StLucia1955 operation onshore domains and unquantified map accuracy remain explicit; no NAD27 substitution.','No automatic credit from masks, ownerzero, noncontact, provenance or this proposal.']}
 matrix.append(row)
write('exact36-author-proposals.json',matrix)
groups=collections.defaultdict(list)
for x in matrix:groups[x['group']].append(x['key'])
assert sorted(map(len,groups.values()))==[2,4,5,25]
write('proposal.json',{'kind':'inert-LCA36-independent-review-author-handoff','package':'gb-LCA-ADM1--repair-evaluation','original_denominator':360,'accepted324_preserved':324,'held_original_keys':36,'separate134_nonland_excluded':True,'author_proposed_researched_unresolved':36,'already_accepted_researched_unresolved_from_this_handoff':0,'positive_repairs_proposed':0,'groups':dict(groups),'exact_per_key_evidence':'exact36-author-proposals.json','consumer_contract_findings':'retained/method-contract-findings.json','new_visual_totals':dict(collections.Counter(x['actual_map_source_reading']['updated_reading']['updated_reading_class'] for x in matrix)),'five_datum_limited_distinguished':True,'selection_of36_is_exact_original_minus_accepted324':True,'reviewer_decision_required':'Assess each group and key under original documented-exception rule. Nothing is accepted by this handoff; identify a concrete feasible deciding step if author sufficiency is rejected.','genuinely_deciding_feasible_unperformed_steps_identified_in_inspected_custody':[],'source_reruns':0,'new_observations':0,'new_transforms':0,'geometry_operations':0,'no_restricted_raw_DoPDUR_geometry':True,'publication_by_coordinator_only':'Normal owned-worktree Git push using configured repository/account/identity; no blob/tree/commit API reconstruction fallback.'})
references=[R/'lca36_reaudit/lca36-source-sufficiency-v3.md',R/'lca36_reaudit/lca36-dopdur-source-assessment-v2.md',R/'lca36_reaudit/dopdur-retained-metadata-and-representation-v2.json',R/'lca36_reaudit/lca36-reconciliation.json',R/'lca36_reaudit/retained-native-scope-assessment-v3.json',R/'lca36-cso-source-application/visual-assessment-v2.md',R/'lca36-cso-source-application/visual-receipt-v2.json',R/'lca36-method-limits-followup/assessment.md',R/'lca36-method-limits-followup/receipt.json',R/'lca36-source-role-groundwork/receipt.json']
write('existing-source-reading-references.json',[pin(p) for p in references])
write('manifest.json',{'kind':'exact-byte-author-review-custody','source_reading_references':'existing-source-reading-references.json','files':[pin(p) for p in sorted(O.rglob('*')) if p.is_file() and p.name!='manifest.json'],'accepted324_untouched':True,'pending_operations':[]})
print(json.dumps({'groups':{k:len(v) for k,v in groups.items()},'proposal':pin(O/'proposal.json'),'matrix':pin(O/'exact36-author-proposals.json'),'manifest':pin(O/'manifest.json')}))
