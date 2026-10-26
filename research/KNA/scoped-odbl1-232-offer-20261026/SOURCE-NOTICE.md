# KNA 232-cell assignment table: scoped source and license notice

The two machine-readable files in this directory—the 232-cell assignment table and its schema—are offered under the Open Database License 1.0 (ODbL 1.0): <https://opendatacommons.org/licenses/odbl/1-0/>. This grant is scoped to those two files and does not change the repository-wide license or purport to license upstream source data. The ODbL license URI is provided with the table and associated documentation. Applicable source notices are preserved below.

## Attribution and provenance

Contains OpenStreetMap data © OpenStreetMap contributors. OpenStreetMap copyright and license information: <https://www.openstreetmap.org/copyright>; ODbL 1.0: <https://opendatacommons.org/licenses/odbl/1-0/>.

Source product: geoBoundaries, gbOpen, Saint Kitts and Nevis (KNA) ADM1, represented year 2021, 14-feature source family. geoBoundaries source and citation information: <https://www.geoboundaries.org/>. The geoBoundaries citation requests attribution to “geoBoundaries” with the site link and citations to the sources listed in the individual-file metadata. geoBoundaries' citation also states its project code and derivative works are under CC BY 4.0; see <https://creativecommons.org/licenses/by/4.0/>. These statements are preserved separately from the scoped ODbL grant for this output.

The source archive's `meta.txt` labels the source CC BY-SA 2.0 and names OpenStreetMap. Its bundled OSM notice distinguishes ODbL 1.0 for OSM data from CC BY-SA 2.0 for OSM documentation. The source sidecar records OSM-Boundaries dataset identifier `OSMB-5769933f0a034e85bc4d672674692358a33729f8` and processing dated 2021-06-14, but does not identify a versioned upstream OSM snapshot. The archived license statements conflict; this notice does not erase or resolve that provenance fact. No OSM documentation is included in these two files.

## Transformation and scope

The assignment table was derived from the geoBoundaries gbOpen KNA ADM1 source by testing native grid-cell representative points against the 14-feature consumed simplified boundaries and the pinned full-source comparison. It encodes only the 232 points interior to their assigned feature in both source versions as compact owner-index-7119 runs. The 16 points interior to the simplified source but outside the full-source comparator were excluded and remain held. The table contains cell keys and owner assignments, not polygon coordinates or boundary geometries.

This is a source-relative assignment proposal. It does not by itself establish legal boundary status, complete physical support, native-grid/selector acceptance, current-owner acceptance, or science credit. The previously accepted 57 Nevis keys are outside this table; the separate 154-cell physical companion is also excluded. Original KNA denominator: 305 keys in 125 intervals = 57 accepted Nevis + 232 included St Kitts assignments + 16 held St Kitts keys.
