# ARG TDF Río Grande 607: AREF source-role application

## Scope

This source-free note covers only the 607 original held land keys for owner 8100 and consumed target `gb:ARG:ADM2:61730980B7053808465014`. The exact canonical key-set digest is `51ad423446675b79696e40c7662395462cafdb8192bcd2dce3b1ce2ed97aa15f`. The comparison used the retained original held-key and interval records; all 607 keys joined exactly once to an interval, and the interval source arrays were preserved. All 607 carry target source index 786 (Río Grande ADM2); 225 also carry parent source index 696 (Tierra del Fuego ADM1); no other source-index contact appears in these exact interval rows. The separate contact-payload digest is `a5a736e603540ec3d27b6a4e8345f74bb2b19b8bdb99b485e9646344fe9e069c`.

## Official AREF source

Law 1186 Articles 1–3 provide the retained primary context: Article 1 names five departments including Río Grande; Article 2 assigns preparation of the official map to the provincial cadastral office under AREF; Article 3 describes public/education use of the division map. The retained law page is `/tmp/arg-source-review_tdf-law-001_official-law-1186.html`, 38,893 B, SHA-256 `8ee9ce825c12ea965dbb031527d401440c5203f39db917bfdfa6a8e00cdc5185`.

The official AREF public map layer page identifies layer `catastrotdf.DBO.DEPARTAMENTOS_LEY2017`, service layer ID 12, display field `DEPARTAMEN`, source CRS EPSG:5344, and fields `OBJECTID_12`, `OBJECTID_1`, `OBJECTID`, `DEPARTAMEN`, `Shape`, area, and length. The layer metadata response has no description, copyright text, global ID field, data-vintage statement, stable-ID policy, or explicit license terms. The live record is therefore useful source-role evidence but its service object IDs are not asserted to be cross-system identifiers.

A single feature was retrieved by AREF service-scoped `OBJECTID_12=4035`, with label `RÍO GRANDE`, in the same public MapServer layer. Exact request URL:
`https://catastro.aref.gob.ar/arcgis/rest/services/publica/tdf_publica/MapServer/12/query?where=OBJECTID_12%3D4035&outFields=OBJECTID_12%2COBJECTID_1%2COBJECTID%2CDEPARTAMEN&returnGeometry=true&outSR=4326&f=json`

Response: HTTP 200, 313,961 B, SHA-256 `faabe4ac33617ca603c6d66edafca7de9e4ad6abbff0659e70ac5163be8d6d89`, Date 2026-10-26 20:43:37 GMT. The response contains exactly one feature and declares output spatial reference EPSG:4326; the source layer metadata declares EPSG:5344. Geometry is retained locally and is not included or redistributed. No access denial was encountered on this feature request; separate linked metadata-archive access previously failed TLS certificate validation and was not bypassed.

## Local application and result

The returned AREF feature was applied locally to the exact retained 607 center keys using the accepted `native-linear-evenodd-first-owner-v1` scanner (grid size 262,166; helper `/tmp/native-grid-pinned.mjs`, SHA-256 `66b453bbb2e001b9ff56bd754d55087f5919845dceeefd886016494cefa1d3e0`). The retained row-latitude table matched the helper's canonical latitude formula exactly for all 262,166 rows. The method gives explicit boundary ties; a boundary classification takes precedence over span membership.

| AREF response classification | Keys | Sorted `[owner,x,y]` key-set SHA-256 |
| --- | ---: | --- |
| Inside | 533 | `37f170f35470057e6a349863a5e4bfbaddfeec804cc60860f49d3d217b1baffb` |
| Outside | 74 | `ab62ec2083036135c381a0756fd277fb2f4942d68c3597b4c8933507e281a45b` |
| Boundary | 0 | `4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945` (empty set) |
| Ties | 0 | — |

Within the 225 original parent-ADM1-contact keys, 173 were inside and 52 outside the AREF response. Within the 382 target-only contact keys, 360 were inside and 22 outside. The per-key source-free roster is embedded in the local receipt; each row contains only a SHA-256 key token, result class, target-source-index marker, parent-contact marker, and physical class—no coordinates or geometry.

## Custody and limits

- Source-free application receipt: `/tmp/arg-aref-rio-grande-607-application-v2.json`, 153,329 B, SHA-256 `f19ba3d525b7618631c96a12b896133269bc2775b9a2cb7781e5041cf34b7ab0`.
- Current reproduction script: `/tmp/arg-aref-rio-grande-607-apply.mjs`, 8,259 B, SHA-256 `eac322c736cf693f7e08d336d2232463aa7189e53e89df6c55d43cb58d33a3bb`. This later version adds source-contact-digest assertion and per-key hashed rows; the initial 4,010 B v1 receipt remains preserved. No copy of the original 7,401 B script version was retained.
- Private AREF feature response: `/tmp/arg-aref-rio-grande-feature.json`; keep local because terms were not disclosed.

This is a comparison against the AREF layer's current service representation by department label and service-scoped record ID. No published stable feature ID or crosswalk ties it to the consumed 2020 geoBoundaries feature. The overlay does not establish legal sovereignty, temporal identity, feature equivalence, native physical ownership, source approval, scientific qualification, acceptance, status, or credit. All 607 keys remain held.
