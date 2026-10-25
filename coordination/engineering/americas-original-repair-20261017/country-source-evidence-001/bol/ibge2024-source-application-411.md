# BOL 411 — IBGE 2024 contextual source application

This bounded package prepares 411 Brazil-contact cells for **positive source-applicability evaluation only**. It changes no owner, bank, credit, assignment, import status, or native hold; it does not claim legal boundary truth or final acceptance. The remaining 45 Brazil-contact cases are not included in this positive-evaluation scope and retain their separate adverse/uncertain treatment.

## Why this subset is distinct

The original 907-row Bolivia residual joins all 456 Rondônia/Mato Grosso/Mato Grosso do Sul contacts to the retained foreign Brazil ADM1 competitor, with interior contacts and no boundary hits. All 456 also retain their selected Bolivia ADM2 target and original `mapped_land_support` coverage. The original Brazil operand is a foreign competitor against the Bolivia target, not affirmative Bolivia evidence.

A new official current-state comparison found 411 of these 456 outside the corresponding IBGE 2024 Brazilian state polygons and inside the retained LSIB Bolivia ring. These 411 are the bounded positive-evaluation subset because the selected Bolivia target supports them and the two independent administrative comparisons do not place them in Brazil. The other 45 are deliberately excluded: 11 are inside both current Brazil and the Bolivia-side LSIB ring, 14 are outside both, and 20 are inside current Brazil but outside the LSIB Bolivia ring. No inference from this partition alone settles the historical boundary.

The exact 411-key join is privately pinned by sorted state/owner/native-cell tuple SHA-256 `d30f2d0db9d1bf8bb7d99c22f4d0b6368ffaaa59853423f3f30c6d505a4efe51`; the public machine applicability records retain the exact per-cell source/target identity and provenance needed for independent evaluation. No raw coordinates are reproduced in this note.

## Source and method

The source is IBGE's 2024 `Malha Municipal Digital` current administrative-state depiction. The official product metadata says the international frontier representation in IBGE meshes is supplied by Brazil's MRE boundary-demarcation commissions. The official 2024 state ZIPs were acquired from published IBGE directory links (RO, MT, MS) and checked privately. The source directory labels its files public; no separate license instrument was acquired, so raw ZIPs are not redistributed here.

The private bounded overlay uses the original normative native centers against the matching IBGE state polygons, EPSG:4674/SIRGAS 2000, with direct `Contains`/`Intersects`; no transformation, buffer, snapping, nearest-distance, or coordinate query was used. Exact private 456-row overlay SHA-256: `4d9e11938d235e19ea933368864363b9440c4f9b2babe7b99e52ba8053102bd8`. Aggregate result: RO 9 inside/181 outside; MT 18/218; MS 4/26. No boundary-only relation occurred.

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

The original source, physical result, land/water frame, full denominator, competing sources and source rights remain preserved. The physical/source producers were not rerun. No constructor, finalizer, bank change, public raw-source upload, or import ran. Independent exact-byte review and root scientific accounting remain necessary before any credit or acceptance.

## Public source references

- [IBGE 2024 state mesh directory](https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2024/UFs/)
- [IBGE Malha Municipal product page](https://www.ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais/15774-malhas.html)
