# Kiribati Map Portfolio: public item metadata check

Date: 2026-10-25. One targeted, unauthenticated CLI review of the official portfolio link already cited in `source-research-20261025.md`. No browser UI, geometry request, or repository/GitHub mutation.

## Result

The collection does link a stable ArcGIS Web Map, but the inspected map is not a primary district/council boundary source and does not provide a Kanton/source-component crosswalk.

- Public collection: [Kiribati Map Portfolio](https://storymaps.arcgis.com/collections/b49e0c786b2d41549873275a09882d13). Direct GET returned HTTP 200. Its embedded metadata identifies collection item `b49e0c786b2d41549873275a09882d13`, title “Kiribati Map Portfolio,” owner ID `6df508134a2d4bcb87ec24a181358420`, and modified 2026-10-19 17:06:16 UTC. The overview describes nine thematic areas and calls the collection authoritative national maps; it does not itself name an administrative-boundary dataset or give a collection license.
- The collection links the “Kiribati Cities & Communities” StoryMap, item `f9cad5dfd92e44b59cc8f325cc7e540f`. Its embedded story data points to web map item `a306e380545e4450a5d50f1e11cb4e44` (also titled “Kiribati Cities & Communities”). Direct public ArcGIS REST metadata returned HTTP 200: owner `kristianbajnar.sdg`, created 2026-10-19 10:08:46 UTC, modified 2026-10-19 15:41:43 UTC, access `public`, and no `licenseInfo` or `accessInformation` value. Its description says it is based on a Tuvalu layout with Kiribati-specific geographic filters and calls it an island-groups/EEZ-context thematic map.
- The public web-map configuration exposes a “Kiribati Island Groups” layer pointing to the ArcGIS Living Atlas `World_Administrative_Divisions/FeatureServer/0` service, plus an EEZ boundary layer and imagery. It does not expose a Kiribati council/district boundary service in the map configuration. The world administrative-divisions layer is a generic global layer and cannot establish local council geometry or legal authority. I did not request feature geometry.

## Qualification implication and limits

This is a useful stable lead for the portfolio’s thematic island-groups/communities visualization, not a primary administrative-boundary source. The item is public but carries no item-level reuse license in the metadata inspected; “public” access is not a reuse grant. No district/council polygon, source vintage/effective date, or original-component crosswalk was verified. No source-based qualification or credit follows.

Sources: [collection](https://storymaps.arcgis.com/collections/b49e0c786b2d41549873275a09882d13); [Cities & Communities story](https://storymaps.arcgis.com/stories/f9cad5dfd92e44b59cc8f325cc7e540f); [web-map item metadata](https://www.arcgis.com/sharing/rest/content/items/a306e380545e4450a5d50f1e11cb4e44?f=json); [public web-map configuration](https://www.arcgis.com/sharing/rest/content/items/a306e380545e4450a5d50f1e11cb4e44/data?f=json).
