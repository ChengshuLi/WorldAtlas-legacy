# BTN 256-key post-audit source-free proposal

**Status:** proposal only. The current root audit ledger records the original 256-key package as pending audit. Historical PR [#2605](https://github.com/ChengshuLi/WorldAtlas/pull/2605) and its receipt are not current acceptance or credit after the ledger suspension. This note recommends a researched-unresolved outcome for the same exact original cohort; it does not alter per-key status, acceptance, or accounting. Root retains acceptance authority.

## Exact scope and retained evidence

- Preserve all **256 original keys**, **124 intervals**, **nine recorded owners**, **19 source groups**, and **16 source-feature IDs**. Keep every original owner association, seven foreign contacts, land/water distinction, and source/physical hold unchanged. The separate one-cell source-conflict package remains excluded.
- The historical delivery reference is PR #2605, merge `d884410c7558eda9abfd9e8e9a8e2d2808b4a348`; its report SHA-256 is `3c75d07714b8a6caf2afc7a1fc4d860fbe2a35d234438e72abb9423f38846eb3`. Its root receipt is comment `6303763150`. The current suspension makes that receipt historical; it is not present-day credit.
- The original 256-row disposition SHA-256 is `142639158099e44db2e0c915eee4cba321741bff8415340b30b78a367b32a9cd`. The retained selected-owner observation is `a85b7fc27d72355b76b00222c96cfd40b5357cf2791ee880da85705e4bce8e6a` compressed and `b5ebf7e8c9d4896a290ec308bae96768348839d392b6d56350a87340d3c505de` decoded. These are prior evidence pins, not a new observation or current acceptance.

## Source assessment

The [original queue](https://github.com/ChengshuLi/WorldAtlas/blob/2d1fc6f430e756498908bf2c4e267356a13f5cc7/coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json) names `gb:BTN:ADM1` (BTN-ADM1-66845921) as its primary source. The [pinned administrative registry](https://github.com/ChengshuLi/WorldAtlas/blob/2d1fc6f430e756498908bf2c4e267356a13f5cc7/data/administrative-sources.json) identifies it as a geoBoundaries/Wikimedia Commons Dzongdeys layer, represented 2010, CC BY 3.0, with credit to Babbage. The [retained-source catalogue](https://github.com/ChengshuLi/WorldAtlas/blob/2d1fc6f430e756498908bf2c4e267356a13f5cc7/coordination/engineering/global-current-cell-work-queue-20261014/retained-source-catalogue.json) records the simplified GeoJSON URL `https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BTN/ADM1/geoBoundaries-BTN-ADM1_simplified.geojson` as consumed; the registry lists full GeoJSON and ZIP alternatives. Its source update and build metadata dates are 2023-05-03 and 2023-12-12, respectively, not the represented year. A separate [BTN ADM2 metadata record](https://github.com/ChengshuLi/WorldAtlas/blob/2d1fc6f430e756498908bf2c4e267356a13f5cc7/data/global-sources/BTN-ADM2-metadata.json) identifies OCHA ROAP/HDX Gewog boundaries represented 2020 under CC BY 3.0 IGO; it is not the packet's BTN ADM1 primary source or the NSDI candidate.

The inspected original queue, retained catalogue, and administrative registry do not identify a 2016 SPC resource ID or URL, or pin a 403 request. The generic 2016 SPC sentence in the retained source-free notes is not bound to a precise source record and is not used here as BTN source or access-denial evidence. The current NSDI layer remains a candidate comparison only: 192 original centers hit, 64 did not, and 70 hits use a different area name. These results do not establish legal boundaries or ownership at the 2010 ADM1 source date.

The retained NSDI output binds the original key roster and the candidate FeatureServer export, not the 2010 ADM1 full or simplified geometry. No full-versus-simplified-versus-NSDI application is retained, so the comparison does not establish how either 2010 ADM1 representation relates spatially to the NSDI candidate.

The NSDI item's creation and modification timestamps are item-record dates, not boundary vintage. Its ISO record cites 2013 creation and 2020 revision but does not establish a represented year. The service metadata reports EPSG:3857; the candidate GeoJSON was explicitly exported with `outSR=4326`. The item supplies no item-specific reuse license or attribution terms. The general 2018 policy does not grant reuse terms for this layer.

The candidate-only name differences remain a research lead, not a basis for reallocating keys. In particular, the Paro-to-Thimphu cluster is not seam-specific in the candidate geometry; nearby Thimphu-to-Gasa hits remain candidate-edge observations only. No coordinates or geometry are reproduced here.

## Proposed disposition and decision-changing evidence

Recommend a **researched-unresolved proposal for the original 256-key scope**, preserving every key and existing source/physical hold. Do not propose positive repairs from the current candidate layer. Any later reassessment requires an attributable source artifact with a documented date and origin, traceable administrative correspondence, applicable reuse terms, and an application to the exact original keys. The current record does not identify a particular 2016 SPC resource.

This proposal is not a root acceptance, a per-key status update, a package completion, or an accounting change. The current root audit ledger controls. The historical disposition remains associated with [issue #2603](https://github.com/ChengshuLi/WorldAtlas/issues/2603); the audit suspension and receipt reconciliation are tracked under [issue #2649](https://github.com/ChengshuLi/WorldAtlas/issues/2649).

## Source-free evidence pins

This correction uses retained metadata and the prior candidate output only; it does not fetch or reproduce geometry:

- `btn-source-free-assessment.md` — SHA-256 `a2c3f0914aaf51e4096994943575740a9e86995b5e5f54e714e3f9f650854116`.
- `btn-source-rights-evidence.md` — SHA-256 `324c10fd16ca41fc3618272aa32b72a3e466f4f4b6dfea4b23260057387a46ae`.
- Original contract records at commit `2d1fc6f430e756498908bf2c4e267356a13f5cc7`: `data/administrative-sources.json` blob `2747b845f0c5654765da3b951c9074e52f220077`; `coordination/engineering/global-current-cell-work-queue-20261014/retained-source-catalogue.json` blob `09afab19371f0814da61e79e5f310c5fb2405b6d`; `coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json` blob `9c9a9bc83627afd3e8435ff4009e39530543bf54`; and `data/global-sources/BTN-ADM2-metadata.json` blob `ecc6ec966192f7c5b71a1a977e73699252db1509`.
- Prior candidate output `/tmp/btn_nsdi_candidate_contains_256.json` — SHA-256 `0e6f465a011206c7fb3fc4aac91be983af4398194272a49ae082bdb643683408`; it binds the NSDI candidate GeoJSON export SHA-256 `dc622beef15c94ac1f0833c9cb4d5826f138728f3488a507bca95fe24ad8e91c`, not a 2010 ADM1 full/simplified-versus-NSDI application.

The generic 2016 SPC mention in the source-free notes is not a pinned resource identity or denial record; the source identification above controls this proposal.
