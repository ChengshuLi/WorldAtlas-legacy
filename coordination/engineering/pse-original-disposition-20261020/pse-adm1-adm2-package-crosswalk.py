#!/usr/bin/env python3
"""Reproduce the PSE ADM1/ADM2 package crosswalk without retaining geometry.

Usage: python pse-adm1-adm2-package-crosswalk.py ADM1.zip ADM2.zip

The input ZIPs must be the two public sourceData archives at geoBoundaries
commit 9469f09. The script verifies their pinned SHA-256 hashes, reads the
already-retained 16-feature source-stage input, and writes only derived names,
IDs, containment ratios and area diagnostics to inventory/.
"""
import hashlib
import gzip
import json
import struct
import sys
import zipfile
from pathlib import Path

from shapely.geometry import Polygon, shape
from shapely.ops import unary_union


ROOT = Path(__file__).resolve().parents[3]
STAGE = ROOT / "coordination/engineering/pse-original-disposition-20261020/original-stage-inputs.json"
OUTPUT = ROOT / "inventory/pse-adm1-adm2-package-geometry-crosswalk-20261025.json"
PINNED = {
    "adm1": ("ce7bfcd6d2489088464f3b35f6f7ae7c07959251534b219749897ee90aa9fbfd", 1_070_020, "PSE_ADM1"),
    "adm2": ("e1c8c97a30d36721ef9c8864cdc9942e0d304dbce0307aed73e20c8547a937be", 1_654_707, "PSE_ADM2"),
}


def read_shapes(data):
    """Parse polygon SHP records, assigning counter-clockwise rings as holes."""
    pos, result = 100, []
    while pos < len(data):
        _, words = struct.unpack(">2i", data[pos : pos + 8])
        pos += 8
        record = data[pos : pos + words * 2]
        pos += words * 2
        shape_type = struct.unpack("<i", record[:4])[0]
        if shape_type == 0:
            result.append(None)
            continue
        if shape_type != 5:
            raise ValueError(f"Expected polygon shapefile type 5, found {shape_type}")
        part_count, point_count = struct.unpack("<2i", record[36:44])
        offset = 44
        starts = struct.unpack(f"<{part_count}i", record[offset : offset + 4 * part_count])
        offset += 4 * part_count
        points = [struct.unpack("<2d", record[offset + 16 * i : offset + 16 * (i + 1)]) for i in range(point_count)]
        rings = [points[start : starts[i + 1] if i + 1 < part_count else point_count] for i, start in enumerate(starts)]
        shells, holes = [], []
        for ring in rings:
            signed_area = sum(ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1] for i in range(len(ring) - 1)) / 2
            (shells if signed_area < 0 else holes).append(ring)
        polygons = []
        for shell in shells:
            shell_polygon = Polygon(shell)
            shell_holes = [hole for hole in holes if shell_polygon.contains(Polygon(hole).representative_point())]
            polygons.append(Polygon(shell, shell_holes))
        result.append(unary_union(polygons))
    return result


def read_dbf(data):
    count = struct.unpack("<I", data[4:8])[0]
    header_len = struct.unpack("<H", data[8:10])[0]
    record_len = struct.unpack("<H", data[10:12])[0]
    fields, offset = [], 32
    while data[offset] != 0x0D:
        field = data[offset : offset + 32]
        fields.append((field[:11].split(b"\0")[0].decode("ascii"), field[11:12].decode("ascii"), field[16]))
        offset += 32
    rows = []
    for row_number in range(count):
        record = data[header_len + row_number * record_len : header_len + (row_number + 1) * record_len]
        offset, row = 1, {}
        for name, _kind, width in fields:
            row[name] = record[offset : offset + width].decode("cp1252").strip()
            offset += width
        rows.append(row)
    return rows


def read_archive(path, kind):
    expected_hash, expected_bytes, stem = PINNED[kind]
    raw = Path(path).read_bytes()
    actual_hash = hashlib.sha256(raw).hexdigest()
    if len(raw) != expected_bytes or actual_hash != expected_hash:
        raise ValueError(f"{kind} ZIP pin mismatch: {len(raw)} bytes, SHA-256 {actual_hash}")
    with zipfile.ZipFile(path) as archive:
        rows = read_dbf(archive.read(stem + ".dbf"))
        geometries = read_shapes(archive.read(stem + ".shp"))
    if len(rows) != len(geometries):
        raise ValueError(f"{kind} DBF/SHP record count mismatch: {len(rows)} rows, {len(geometries)} shapes")
    if len({row["Name"] for row in rows}) != len(rows):
        raise ValueError(f"{kind} DBF names are not unique")
    if any(geom is None or geom.is_empty or not geom.is_valid for geom in geometries):
        raise ValueError(f"{kind} contains an empty or invalid polygon")
    return rows, geometries


def main():
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    adm1_rows, adm1_shapes = read_archive(sys.argv[1], "adm1")
    adm2_rows, adm2_shapes = read_archive(sys.argv[2], "adm2")
    stage_bytes = STAGE.read_bytes()
    stage_sha256 = hashlib.sha256(stage_bytes).hexdigest()
    if stage_sha256 != "7eba6afac3cc857f499346cef4a4b68b6a298fafe045b2dc720a5f16cf06b9bd":
        raise ValueError(f"Retained source-stage input pin mismatch: {stage_sha256}")
    stage = json.loads(stage_bytes)
    release = {row["consumed"]["properties"]["shapeName"]: row for row in stage}
    if len(release) != 16 or len({row["source_id"] for row in stage}) != 16 or len(adm1_rows) != 2 or len(adm2_rows) != 16:
        raise ValueError("Unexpected source family or package feature count")

    payload_dir = ROOT / "coordination/engineering/original-geography-source-corpus-20261006/payloads"
    release_adm1_gz = (payload_dir / "gb-PSE-ADM1-000.bin.gz").read_bytes()
    release_adm1 = gzip.decompress(release_adm1_gz)
    if hashlib.sha256(release_adm1_gz).hexdigest() != "74c1b0fe78a4dc5b1322ae909cc00d6d7e26e77ada47f80f6a531b434866dee7":
        raise ValueError("Retained PSE ADM1 gzip pin mismatch")
    if hashlib.sha256(release_adm1).hexdigest() != "2f065583a8be795533893fd4c62fed765959b47db2cf01e696cc795cc6c56b0a":
        raise ValueError("Retained PSE ADM1 decoded pin mismatch")
    release_adm1_features = json.loads(release_adm1)["features"]
    release_parents = {f["properties"]["shapeName"]: shape(f["geometry"]) for f in release_adm1_features}
    if set(release_parents) != {"West Bank", "Gaza"}:
        raise ValueError("Unexpected retained PSE ADM1 feature names")
    if any(geom.is_empty or not geom.is_valid for geom in release_parents.values()):
        raise ValueError("Invalid retained PSE ADM1 geometry")

    children = []
    for row, geom in zip(adm2_rows, adm2_shapes):
        item = release.get(row["Name"])
        if item is None:
            raise ValueError(f"No retained consumed feature matched {row['Name']!r}")
        if not geom.is_valid:
            raise ValueError(f"Invalid sourceData ADM2 polygon: {row['Name']}")
        fractions = [(geom.intersection(parent).area / geom.area, parent_row["Name"], parent_row["ISO_Code"])
                     for parent_row, parent in zip(adm1_rows, adm1_shapes)]
        best = max(fractions)
        consumed = shape(item["consumed"]["geometry"])
        if not consumed.is_valid:
            raise ValueError(f"Invalid retained consumed geometry: {row['Name']}")
        release_parent_fractions = {name: consumed.intersection(parent).area / consumed.area for name, parent in release_parents.items()}
        children.append({
            "adm2_name": row["Name"],
            "adm2_iso_code": row["ISO_Code"],
            "adm2_source_objectid": int(row["OBJECTID"]),
            "consumed_feature_id": item["source_id"],
            "source_data_adm2_fraction_in_parent": round(best[0], 12),
            "parent_name": best[1],
            "parent_iso_code": best[2],
            "consumed_release_adm2_fraction_in_west_bank": round(consumed.intersection(adm1_shapes[0]).area / consumed.area, 12),
            "consumed_release_adm2_fraction_in_gaza": round(consumed.intersection(adm1_shapes[1]).area / consumed.area, 12),
            "consumed_adm2_fraction_in_release_adm1_west_bank": round(release_parent_fractions["West Bank"], 12),
            "consumed_adm2_fraction_in_release_adm1_gaza": round(release_parent_fractions["Gaza"], 12),
            "source_data_geometry_valid": geom.is_valid,
            "release_geometry_valid": consumed.is_valid,
        })

    adm1_union, adm2_union = unary_union(adm1_shapes), unary_union(adm2_shapes)
    difference = adm1_union.symmetric_difference(adm2_union).area
    release_adm1_union = unary_union(list(release_parents.values()))
    release_adm2_geometries = [shape(row["consumed"]["geometry"]) for row in stage]
    release_adm2_union = unary_union(release_adm2_geometries)
    release_difference = release_adm1_union.symmetric_difference(release_adm2_union).area
    # Preserve the actual repo ref resolved for this audit, rather than silently tracking main.
    out = {
        "version": 1,
        "kind": "pse-adm1-adm2-source-package-geometry-crosswalk",
        "as_of": "2026-10-25",
        "scope": {"claim": "gb-PSE-ADM2--repair-evaluation", "original_cells": 427, "original_intervals": 277, "status_changed": False, "credit_changed": False},
        "sources": {
            "adm1": {"url": "https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09/sourceData/gbOpen/PSE_ADM1.zip", "repository_ref": "9469f09", "bytes": PINNED["adm1"][1], "sha256": PINNED["adm1"][0], "metadata_year": 2021, "features": len(adm1_rows), "feature_names": [row["Name"] for row in adm1_rows]},
            "adm2": {"url": "https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09/sourceData/gbOpen/PSE_ADM2.zip", "repository_ref": "9469f09", "bytes": PINNED["adm2"][1], "sha256": PINNED["adm2"][0], "metadata_year": 2017, "features": len(adm2_rows), "pinned_consumed_family_features": len(stage), "pinned_consumed_feature_ids": [row["source_id"] for row in stage]},
            "consumed_stage": {"path": str(STAGE.relative_to(ROOT)), "sha256": stage_sha256, "features": len(stage)},
            "processing_metadata": "PSE_ADM2 source-package shapefile XML identifies PSE_ADM1 as input to FeatureClassToFeatureClass on 2021-05-27, followed by Level=ADM2 and re-export on 2021-05-28; both archives are pinned from repository ref 9469f09.",
        },
        "method": {"geometry": "Polygon SHP records parsed from the two pinned ZIPs; the 16 retained consumed ADM2 geometries were separately compared with the two PSE_ADM1 source polygons using Shapely 2.1.2 planar area ratios in the source EPSG:4326 frame. This is a hierarchy/containment check, not a legal boundary or geodetic measurement.", "raw_geometry_retained": False, "raw_data_location": "temporary input archives only; this output contains no coordinates or source geometry."},
        "result": {
            "adm1_polygons_overlap_area_sq_degrees": adm1_shapes[0].intersection(adm1_shapes[1]).area,
            "adm2_union_vs_adm1_union_symmetric_difference_sq_degrees": difference,
            "relative_symmetric_difference": difference / adm1_union.area,
            "adm2_area_outside_adm1_union_sq_degrees": adm2_union.difference(adm1_union).area,
            "adm1_area_not_covered_by_adm2_sq_degrees": adm1_union.difference(adm2_union).area,
            "consumed_release_adm2_union_vs_retained_release_adm1_union_symmetric_difference_sq_degrees": release_difference,
            "consumed_release_relative_symmetric_difference": release_difference / release_adm1_union.area,
            "consumed_release_adm2_area_outside_retained_adm1_sq_degrees": release_adm2_union.difference(release_adm1_union).area,
            "retained_adm1_area_not_covered_by_consumed_release_adm2_sq_degrees": release_adm1_union.difference(release_adm2_union).area,
            "children": children,
        },
        "interpretation": {
            "establishes": ["The exact 9469f09 sourceData package contains two 2021-labeled territory features, West Bank and Gaza, and sixteen 2017-labeled governorate features.", "The PSE_ADM2 package processing metadata names PSE_ADM1 as its input feature class in 2021.", "All eleven West Bank and five Gaza sourceData governorate polygons overlap their matching territorial parent to effectively complete area: per-feature fractions range from 0.999999996121 to 1.0, with a positive 2.80565305539101e-11 square-degree area sliver outside the parent union. The aggregate sourceData union symmetric difference is 9.108530480009916e-10 square degrees.", "The sixteen retained simplified 9469f09 PSE ADM2 features map by unique same-name records to the corresponding sourceData ADM2 rows and intersect almost entirely with the matching retained release ADM1 parent; the per-feature ratios and aggregate simplified-boundary residual are reported."],
            "does_not_establish": ["The originating external source/version of the 2021 PSE_ADM1 feature class or why it is labeled 2021 while the ADM2 package is represented as 2017.", "A source-provenance bridge between these ODW-attributed sourceData polygons and PCBS Governorates_LIST2017 or its unversioned layer.", "Whether other retained Israel or Jordan contacts are source-relative territorial exclusions, or any sovereignty/legal conclusion.", "That any held key should be reclassified, any native hold removed, or any of the six candidates accepted."],
        },
        "disposition": "This closes the specific same-family feature hierarchy crosswalk identified by the reviewer, but not the separate PCBS linkage or foreign territorial-applicability questions. Preserve all 427 original outcomes, six candidates, 421 holds, and no credit change.",
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n")
    print(f"Wrote {OUTPUT} ({OUTPUT.stat().st_size} bytes; SHA-256 {hashlib.sha256(OUTPUT.read_bytes()).hexdigest()})")


if __name__ == "__main__":
    main()
