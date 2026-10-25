# Popokabaka 20-key Uíge source-version crosscheck

Status: bounded source comparison only. All 20 original COD keys remain held as `territorial_exclusion_cells`; there is no repair, owner change, hold removal, acceptance, or credit in this note. The exact owner-14501 roster and per-key bindings are in `exact-roster-and-crosscheck.json`.

## Original scope and retained evidence

The retained 930-key partition contains exactly 20 original land keys for target `gb:COD:ADM2:63176286B47421332346835` (Popokabaka), owner 14501. Each is held and marked unaccepted/zero credit. The retained source-center overlay reports all 20 centers inside the pinned 2021 geoBoundaries Uíge candidate (source index 449, feature `gb:AGO:ADM1:26408823B906914650007`) and all 20 inside the pinned 2019 Popokabaka feature (index 18916). Five also hit the separate 2017 Kwango ADM1 candidate (index 18738). All 20 have physical-support=true and inland-water-support=false in the existing frozen mask join; this reuses prior physical evidence and is not a new observation.

This is an exact target/key group, separate from the previously accepted COD scope names Irumu, Kimvula, Rutshuru, Aru, Moxico, Lunda Sul, Oïcha, Kasongo-Lunda, Mahagi and Gbadolite, and separate from pending Okoro28, Kahemba47, Bondo57 and Padyere1. The full exact keys are in the JSON.

## New official Census comparison

The U.S. Census Bureau's current [Angola subnational population and boundary page](https://www.census.gov/geographies/mapping-files/time-series/demo/international-programs/subnationalpopulation.html) lists an Angola administrative-boundary archive. The linked archive is `angola-adm1-adm2-adm3-uscb-aug24.zip` (11,480,383 bytes; SHA-256 `48c3b457b38909396ca2bed7880400876c3c91ddbc13f6af6bcfd8be99787713`). Its ADM1 shapefile is WGS84 and contains 18 features, including Uíge (`AO-UIG`). In a bounded point-in-polygon comparison using the 20 centers from the already-retained overlay, 17 centers fall inside the 2024 Uíge feature and three fall outside by ray casting. The three outside points are near the current linework: approximate nearest-edge distances are about 1.14 m, 40.58 m and 79.04 m. These margins are descriptive only; this calculation is not the stock qualification method, and the first point is especially close to the line. The key roster gives each exact key and result.

The Census Bureau states that older subnational products may use names and boundaries different from those currently in use on its [previous-products page](https://www.census.gov/geographies/mapping-files/time-series/demo/international-programs/previous-subnationalpopulation.html). That page's current Angola archive listing does not expose the exact earlier ADM1 file cited by the 2021 geoBoundaries metadata. The current 2024 file is therefore a meaningful official temporal comparator, but it does not establish the exact 2021 source body or explain the three center-side differences.

A separate September 2024 Census Demobase technical report says its Angola/Namibia subnational boundaries were acquired from HDX 2024 and its international boundaries aligned to U.S. State Department LSIB before topology checks ([technical report](https://www2.census.gov/programs-surveys/international-programs/mapping-files/time-series/Angola-Namibia-Technical-Document.pdf), section 2.1). This is a description of that Demobase workflow, not proof that the downloaded current archive or the older geoBoundaries Uíge feature has that exact lineage, and it is not a legal adjudication.

## What this changes

This new check establishes a specific version-sensitive source conflict: all 20 original centers hit both pinned 2021 Uíge and 2019 Popokabaka, while only 17 hit the 2024 Uíge comparator (three are very near the 2024 edge). The exact complementary result is: the same three centers outside the 2024 USCB Angola Uíge feature are inside the 2024 USCB DRC Popokabaka feature; the other 17 are inside Uíge and outside every DRC ADM2 feature in that archive. Exact DRC-side keys are [14501,135347,143089], [14501,135350,143072], and [14501,135354,143074].

The Census archive metadata provides important lineage context. It says its 164 DRC territory/city polygons were downloaded from UN OCHA DRC on 2021-02-24, match the 2017 Annuaire Statistique, and were not changed by Census staff; USCB aligned the national boundary to the U.S. State Department LSIB. It also states Census cannot guarantee boundary placement accuracy. The target's pinned geoBoundaries metadata independently names RGC/OCHA DRC, so this USCB product is a related OCHA-derived comparison, not independent evidence that the 2019 target geometry is authoritative. The complementary 3/17 split is consistent with a later national-border cut, but does not settle whether the original contract treats the older all-20 source overlaps as applicable exclusions, nor identify the exact provenance of the 2021 Uíge geometry. All 20 therefore remain pending and held; no stock diagnostic was rerun.

## Provenance pins

The JSON binds the exact 20-key roster, physical-mask join, complete-family center overlay, source catalogue, official source archive, feature attributes, and the relevant geospatial method. It excludes source polygons, shapefiles, and archive payloads from this derived packet.


## 2024 USCB DRC source binding

The Census Bureau's current-products page lists an 8.1 MB DRC territories boundary ZIP. The downloaded file was 8,357,535 bytes, SHA-256 `f7a9ef69f55b77a656beef308f8db482cb6bf82565fed85f5e760f35dd26b3f9`. ADM2 feature index 4 is `KWANGO / POPOKABAKA` (`COD_01_05`, `CD3108`), one part and 1,233 vertices, in the retained WGS84 shapefile. The full archive remains local and is not part of this derived evidence packet. The JSON records the exact 20-key classifications and the source/method binding.


## Retained 2019 USCB Angola comparison

The already-retained official U.S. Census Bureau October 2019 Angola archive (`angola-adm1-adm2-uscb-oct19.zip`; 6,042,844 bytes; SHA-256 `c700d2f72d3c32dda77a89308930443eadd79005d5cb32d674ee681dadabe4af`) contains the WGS84 ADM1 Uíge feature (`AO-UIG`; 1,779 vertices). Applying the same fixed 20 centers yields 17 inside and the same three outside as the 2024 USCB Uíge polygon. Those three are precisely the centers inside 2024 USCB DRC Popokabaka; the 17 others are inside Uíge and outside every 2024 DRC ADM2 feature.

The 2019 Census metadata states that the Angola ADM1 boundaries were dissolved from an HDX/OCHA/GADM/INE source archive named `ago_admbnda_adm2_gadm_ine_ocha_20180904.zip` (downloaded by Census on 2019-09-09) and aligned to 2018 U.S. State Department LSIB; it warns that Census cannot guarantee boundary placement accuracy. Therefore, the 2019 and 2024 USCB comparisons show the same center partition in two Census releases, but they do not identify why the pinned geoBoundaries 2021 Uíge feature differs or prove its exact source snapshot. Together with the 2024 DRC comparison, the result is a useful historical/current-version cross-check, not a legal or contract applicability determination.


## Independent review and remaining bounded source step

The existing independent reviewer assessed the 20-key 2019/2024 comparison. It strengthens a version-conflict finding, not an applicability decision: the 2019 and 2024 USCB AO-UIG geometries yield the same 17/3 center split, and the same three centers lie in USCB 2024 DRC Popokabaka. The pinned 2021 geoBoundaries Uíge feature and pinned 2019 RGC Popokabaka feature still both include all 20 centers. The DRC USCB source is OCHA-derived and the Angola Census snapshots are HDX/OCHA-derived, so this is not independent validation of either pinned candidate. The existing original hold remains on every key; no acceptance, credit, repair, or hold removal is proposed.

The only bounded remaining source question identified by the reviewer is an exact official U.S. Census Bureau 2021 Angola ADM1 product or its archived metadata/download locator, followed by a full Uíge geometry comparison against the pinned 2021 geoBoundaries feature if that exact source is found. The reviewed Census current-products page lists the Aug-2024 Angola archive; the Census Previous Products page does not list Angola; the Census time-series directory lists the retained 2019 archive and current 2024 archive but no 2021 Angola ADM1 archive. This targeted listing check did not prove that no such archived product exists. No broad search, access bypass, stock rerun, or change to any key's status was made.


## Targeted check for the pinned 2021 USCB snapshot

I checked the official Census Bureau current-products page, Previous Subnational Population Products page, and public time-series directory for an exact 2021 Angola ADM1 archive. The current-products page lists the Aug-2024 Angola archive; the directory exposes the retained Oct-2019 and Aug-2024 Angola archives; the Previous Products page does not list Angola. The Sept-2024 Census Demobase report says its then-current Angola subnational boundaries came from HDX 2024, which is not the pinned 2021 snapshot. The cited HDX geoBoundaries Angola dataset page returned HTTP 403 on its ordinary public page request; no alternate route or repeated request was used. Thus the exact 2021 product or archived locator remains unidentified, not proven nonexistent.

The reviewer therefore supports retaining the source-version conflict and all 20 pending/held. The next bounded step, only if an exact official 2021 Census archive/metadata locator becomes available through a lawful ordinary source, is to compare its full Uíge feature with the pinned 2021 geoBoundaries feature. The public listings checked here did not furnish that artifact. This evidence is not a legal ruling, a stock diagnostic, or a credit proposal.

## Additional primary catalog check: geoBoundaries historical archive

The geoBoundaries archival-access page documents versioned GitHub releases for research replication. It lists geoBoundaries 4.0.0 dated 31 August 2021 and links its single-country archive to repository `wmgeolab/geoBoundariesArchive_4_0_0`, commit `299e00623ece6c03bcb9a751eda6094b1eac85a6` ([archive documentation](https://www.geoboundaries.org/api.html), [release commit](https://github.com/wmgeolab/geoBoundariesArchive_4_0_0/tree/299e00623ece6c03bcb9a751eda6094b1eac85a6)). The same page says earlier files can be retrieved from dated commits and that API metadata includes source and static download URLs. This supplies an exact dated archival catalog locator relevant to the pinned 2021 geoBoundaries layer, but the repository tree could not be read in this session, so I have not confirmed the exact `AGO/ADM1` file or that release's feature ID/source record. The web fetch for that GitHub tree returned a tool-level “restricted URL” error; I did not try another access route or download geometry. The locator narrows the next ordinary source check, but does not establish that geoBoundaries 4.0.0 contains the exact pinned feature or resolve the 20-key source conflict. All 20 remain held and pending.
