# BOL 411 — IBGE 2024 contextual source application

This bounded package prepares 411 Brazil-contact cells for **positive source-applicability evaluation only**; it does not claim legal boundary truth, scientific acceptance, or credit. The source assessment alone changes no legal owner, assignment, import status, or native hold. A separately pinned candidate selected bank has now been prepared for review; it remains unaccepted and undeployed. The remaining 45 Brazil-contact cases are not included in this positive-evaluation scope and retain their separate adverse/uncertain treatment.

## Why this subset is distinct

The original 907-row Bolivia residual joins all 456 Rondônia/Mato Grosso/Mato Grosso do Sul contacts to the retained foreign Brazil ADM1 competitor, with interior contacts and no boundary hits. All 456 also retain their selected Bolivia ADM2 target and original `mapped_land_support` coverage. The original Brazil operand is a foreign competitor against the Bolivia target, not affirmative Bolivia evidence.

A new official current-state comparison found 411 of these 456 outside the corresponding IBGE 2024 Brazilian state polygons and inside the retained LSIB Bolivia ring. These 411 are the bounded positive-evaluation subset because the selected Bolivia target supports them and the two independent administrative comparisons do not place them in Brazil. The other 45 are deliberately excluded: 11 are inside both current Brazil and the Bolivia-side LSIB ring, 14 are outside both, and 20 are inside current Brazil but outside the LSIB Bolivia ring. No inference from this partition alone settles the historical boundary.

The exact 411-key join is privately pinned by sorted state/owner/native-cell tuple SHA-256 `d30f2d0db9d1bf8bb7d99c22f4d0b6368ffaaa59853423f3f30c6d505a4efe51`; the public machine applicability records retain the exact per-cell source/target identity and provenance needed for independent evaluation. No raw coordinates are reproduced in this note.

## Source and method

The source is IBGE's 2024 `Malha Municipal Digital` current administrative-state depiction. Official product-page indexed metadata (the direct product-page fetch returned 403, so no page body was acquired) says the international frontier representation in IBGE meshes is supplied by Brazil's MRE boundary-demarcation commissions. The three state ZIPs were new ordinary GETs from links actually published in IBGE's public directory; the directory labels its files public. No separate license instrument was acquired, so raw ZIPs are retained privately and not redistributed here. All archives passed integrity checks; selected state shapefiles are one-feature EPSG:4674/SIRGAS 2000 polygons, with DBF update date 2025-03-06.

The private bounded overlay uses the original normative native centers against the matching IBGE state polygons, EPSG:4674/SIRGAS 2000, with direct `Contains`/`Intersects`; no transformation, buffer, snapping, nearest-distance, or coordinate query was used. Exact private 456-row overlay SHA-256: `4d9e11938d235e19ea933368864363b9440c4f9b2babe7b99e52ba8053102bd8`. Aggregate result: RO 9 inside/181 outside; MT 18/218; MS 4/26. No boundary-only relation occurred.

| Published input | Bytes | Retained private ZIP SHA-256 |
|---|---:|---|
| [RO 2024 mesh](https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2024/UFs/RO/RO_UF_2024.zip) | 113,745 | `37d11882bb1f94d1e5ef14178e3bc261aa062cfdeefdc9b22959fa28d282d8f9` |
| [MT 2024 mesh](https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2024/UFs/MT/MT_UF_2024.zip) | 304,944 | `032802e4b8180fbaab1a6aeef8059b418bf9b63ef7ccb361c4b29ea5ad6c96de` |
| [MS 2024 mesh](https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2024/UFs/MS/MS_UF_2024.zip) | 231,229 | `03538e45b35bfe0b3adf425b323b2172426b93dd201c7227bb3e93bf1dd58a35` |

The selected Brazil ADM1 metadata represents 2006 and has 2023 source-update/build dates, but names only GeoBoundaries/Wikimedia Commons and gives a generic Commons URL. IBGE's 2024 administrative depiction is relevant current context, not proof of the old feature's construction lineage, historical effective date, statutory basis, or a per-feature treaty-boundary source. The retained treaty/reach and source-specific caveats remain in force; this package does not replace them.

## Exact machine outputs and accounting

The committed evidence chain consists of the immutable 411 decision and scope records, the adopted contextual applicability packet, the supported `source-evidence` output, the full-request native diagnostic and the selected-current-selector supported-input partition. Their exact contents, input pins, hashes and preparation receipts are recorded beside this note.

The native diagnostic retains the full original 11,311-cell request. Relative to its retained prior diagnostic (10,404 supported/907 held), this source application promotes exactly the 411 adopted cells from held to supported; no prior supported cell is demoted, and the promoted set exactly equals the adopted 411-cell set. The new diagnostic is 10,815 supported/496 held. The separate current-selector partition narrows new candidate additions to 411, records already-present cells separately, and preserves all 496 current native holds. Machine results are evidence for review, not scientific credit or authorization to change the selected bank.

| Artifact | Committed output | Size | SHA-256 |
|---|---|---:|---|
| 411 decision | commit `5ae9b3ec8b7d593edc470fa3d7dc9aee6ca951cb` | 156,117 B | `f2a79ff067f61ce3f02ac2a86c8c79953a6a538d58a9e4eca467a2a6f0f0b1ec` |
| 411 scope | commit `5ae9b3ec8b7d593edc470fa3d7dc9aee6ca951cb` | 87,803 B | `cef34e2de5f2cd7d94b63a3e84c977b416722238f6f5b623175694acb8858954` |
| Adopted applicability packet | commit `3daf971fded8a22879dbb2326a0a2ce8422bbed9` | 199,426 B | `37d1704b1495d2bc3915a58e4fa3a5b48cafbb35629f10fc07e7b8855784f8ef` |
| Prepared source evidence | commit `6d0c7eaa967718a24d4dd9d96958cd54040dbec3` | 489,456 B | `2c030d6ef0fb9956b51d78b664d70f8bd640c6e71402d79505762af5f75b5450` |
| Full-request native diagnostic | commit `d8f89d59a2e283cf5e846e8560c34dcf5236765a` | 9,714,181 B | `cf03839d152d5fbe625e00382e8c4429d7d7f166569f14d2c02a4571d5121c96` |
| Current-selector partition | commit `52b06eaf400eef93610e0e82877048c64d7bfb3b` | 27,733 B | `c72e3cf124b4277553df2bd56fabb55de9f0a50fc3817327032028de43b77c84` |
| Candidate native patch (411) | commit `52b06eaf400eef93610e0e82877048c64d7bfb3b` | 8,141 B | `641de05eaeead15593e871de31013f897143acc4b779772d7aec2d8b9e9719e7` |
| Current-selector prior-present rows | commit `52b06eaf400eef93610e0e82877048c64d7bfb3b` | 124,455 B | `c0e4e9bb6e907992f428057e20272e269aba7ec1a9fe0cb74c344d1916a47c2b` |
| Current-selector held rows | commit `52b06eaf400eef93610e0e82877048c64d7bfb3b` | 18,127 B | `8f62d436f82cdb6bb8affab8b0ab4f946492c2df501150cdacf1c7f5d6056278` |

The original source, physical result, land/water frame, full denominator, competing sources and source rights remain preserved. The physical/source producers were not rerun. The existing native-authority constructor, authority composition and finalizer ran once from the pinned outputs below; they do not establish scientific acceptance or credit. The candidate bank is not yet delivered or imported. Independent exact-head review, stock delivery and root scientific accounting remain necessary before any credit or acceptance.

## Native authority and candidate final-bank outputs

The following existing stages consumed the adopted 411-cell records and previously retained source/physical products; no source or physical producer was replayed. These are candidate delivery artifacts, not acceptance, assignment credit, or production import.

| Stage/artifact | Commit or binding | Size | SHA-256 |
|---|---|---:|---|
| Native-authority constructor result | commit `35751329a993643b950cd67d926318a0283da228` | 306,051 B | `3a20e327464bfe74bfbd8d66b7f5860120ea9da123dd5a76db125e53cf5a6df7` |
| Native-authority binding | same commit | — | `6615f31ec0ee3d2cf9b4b62a787aeaaf2ed31f1b316b3ea7596bee3a8f6a0ae8` |
| Composed authority registry | commit `09dc348b2b9b1437d30b4db9cae290f436a05ad1` | 1,488 B | `e7229601a08ebc7bedec4fbbf116a94b03500eaadb40abd3ca10da292a52d3b8` |
| Final selected-bank index / finalizer `startup-ownership.json` | selector and package inputs pinned at commit `d5ed8c1126782dfd3fa0ea00525f38b5c89f3289` | 49,610 B | `d88695ab34ae31729838b66c19a3559db8ba5dc3062b931094b60531e441bdda` |
| Finalizer selection | `finalize-411-output-001/ownership-selection.json` | 2,310 B | `1f2ba152430affa49b3900c80695b872c9334284791d636e8872b439e83f6ee5` |
| Finalizer expectation sidecar | `finalize-411-output-001/selected-delivery-expectations.json` | 485 B | `83f2cc91e74e9520030ef09995c3a6cc73fc46aa9c1459c657a216d27fd44d1d` |
| Full selected-bank conservation receipt | `selected-bank-conservation-411.json` | 1,966 B | `bdfc3cfd735d76cfbed532c6a9be27c6ee3822eca9fda02330d5fcdbfc12a71d` |

On the current accepted base `cb42e0875c31b9f0169cf91f6870c5ed3fd2121f`, both selected-bank indexes declare 79 members. Exact pinned-body comparison verified 75 unchanged members, four new bodies against the final index, and four retired members. A full decoded interval sweep found exactly 411 newly assigned cells (203 intervals), zero losses and zero owner reassignments; the additions equal the emitted 411-cell native patch exactly. The 49,625-owner roster and owner-mapping digest remain unchanged. This is a technical bank-conservation result; the source-supported candidate cells remain subject to independent review, stock delivery, and root accounting. The 45 other Brazil contacts and the 496 currently held diagnostic cells were not included in the 411 patch.

## Public source references

- [IBGE 2024 state mesh directory](https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2024/UFs/)
- [IBGE Malha Municipal product page](https://www.ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais/15774-malhas.html)
