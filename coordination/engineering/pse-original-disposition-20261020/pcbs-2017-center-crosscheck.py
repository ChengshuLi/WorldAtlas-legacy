#!/usr/bin/env python3
"""Compare the original PSE request centers to a fetched official PCBS context layer.

The source GeoJSON is intentionally an external input. This script verifies its
response hash and does not copy or publish raw source geometry.
"""
from __future__ import annotations

import gzip
import hashlib
import json
import platform
import struct
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

import shapely
from shapely.geometry import Point, shape

GRID = 262166
PATCH_COMMIT = "e0e2c3cc03e2a5e4c0c9d6354c94b80ac9350e2f"
PATCH_PATH = "coordination/engineering/pse-original-disposition-20261020/native-requested-patch.json"
LAT_COMMIT = "5b32388df0501b013ac9a3ba97864932db493d59"
LAT_PATH = "coordination/engineering/native-grid-fidelity-1010-20261005-local15/results-v1/native-row-latitudes.f64le.gz"
PCBS_SHA256 = "65c1efcee5223d3ae6a0d7823d8e5a01b1cc9a03908a3237de5be71ecfb280b9"


def git_blob(commit: str, path: str) -> bytes:
    return subprocess.check_output(["git", "show", f"{commit}:{path}"])


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("usage: pcbs-2017-center-crosscheck.py PCBS_GOVERNORATES.geojson")
    source = Path(sys.argv[1]).read_bytes()
    source_hash = hashlib.sha256(source).hexdigest()
    if source_hash != PCBS_SHA256:
        raise SystemExit(f"unexpected PCBS response hash: {source_hash}")
    feature_collection = json.loads(source)
    if len(feature_collection.get("features", [])) != 16:
        raise SystemExit("expected 16 PCBS governorate features")
    polygons = [(feature["properties"], shape(feature["geometry"]))
                for feature in feature_collection["features"]]

    patch_bytes = git_blob(PATCH_COMMIT, PATCH_PATH)
    patch_hash = hashlib.sha256(patch_bytes).hexdigest()
    if patch_hash != "c5cdb04e5ad181593cfaeb0bb6270f6013ba8c3c20f7119b7b7ef36d9765dbcb":
        raise SystemExit(f"unexpected original patch hash: {patch_hash}")
    patch = json.loads(patch_bytes)

    compressed_latitudes = git_blob(LAT_COMMIT, LAT_PATH)
    if hashlib.sha256(compressed_latitudes).hexdigest() != "ab0becdda100da3473d7bb5d34ccda6510aa1c0490c407082072c7201ad1e147":
        raise SystemExit("unexpected native-latitude input hash")
    raw_latitudes = gzip.decompress(compressed_latitudes)
    if hashlib.sha256(raw_latitudes).hexdigest() != "66db3d02ede56a75e9c58426ad1388552be3bf7e5e4477476f198983b7436d23":
        raise SystemExit("unexpected decoded native-latitude hash")
    if len(raw_latitudes) != GRID * 8:
        raise SystemExit("invalid native-latitude table length")
    latitudes = struct.unpack(f"<{GRID}d", raw_latitudes)

    by_owner: dict[str, Counter[str]] = defaultdict(Counter)
    rows: list[dict] = []
    total = 0
    for row in patch["rows"]:
        y = row["y"]
        for start, end, owner in row["runs"]:  # x intervals are half-open
            for x in range(start, end):
                total += 1
                point = Point((x + 0.5) / GRID * 360 - 180, latitudes[y])
                inside = [props.get("NAME_EN") for props, polygon in polygons
                          if polygon.contains(point)]
                covered = [props.get("NAME_EN") for props, polygon in polygons
                           if polygon.covers(point)]
                label = inside[0] if len(inside) == 1 else "outside"
                if len(inside) > 1 or len(covered) != len(inside):
                    label = "boundary_or_multiple"
                by_owner[str(owner)][label] += 1
                rows.append({"owner": owner, "x": x, "y": y,
                             "inside": inside, "covered": covered})

    native = json.loads(git_blob(
        "93a184c3872096d328c10d0b947aee23de170d9a",
        "coordination/engineering/pse-original-disposition-20261020/native-authority-20261025/constructor-result.json"))
    candidate_keys = {(row["y"], x, run[2])
                      for ledger in native["ledger_rows"]
                      for row in ledger["native_rows"]
                      for run in row["runs"]
                      for x in range(run[0], run[1])}
    candidate_results = [r for r in rows if (r["y"], r["x"], r["owner"]) in candidate_keys]
    result = {
        "version": 1,
        "kind": "official-pcbs-2017-governorates-context-crosscheck",
        "scope": {"package_id": "gb-PSE-ADM2--repair-evaluation",
                  "original_cells": total, "original_intervals": 277,
                  "status_changed": False, "native_holds_removed": 0,
                  "repair_credit": 0},
        "source": {"url": "https://services8.arcgis.com/x3OYmfTujNHGdoex/arcgis/rest/services/Dissmenation_layer/FeatureServer/1/query",
                   "layer": "Governorates_LIST2017", "provider": "PCBS",
                   "recorded_layer_data_last_edit": "2017-11-16",
                   "query": {"where": "1=1", "outFields": "OBJECTID,GOV_CODE,NAME_EN,REGION_ID,DISTRICT",
                             "returnGeometry": True, "outSR": "4326", "f": "geojson"},
                   "features": len(polygons), "crs": "EPSG:4326", "http_status": 200,
                   "response_bytes": len(source), "response_sha256": source_hash,
                   "raw_source_geometry_included": False},
        "reference_inputs": {"original_native_patch": {"commit": PATCH_COMMIT, "path": PATCH_PATH,
                                                          "bytes": len(patch_bytes), "sha256": patch_hash},
                             "native_latitudes": {"commit": LAT_COMMIT, "path": LAT_PATH,
                                                 "compressed_sha256": hashlib.sha256(compressed_latitudes).hexdigest(),
                                                 "decoded_sha256": hashlib.sha256(raw_latitudes).hexdigest(),
                                                 "rows": GRID}},
        "method": {"point": "((x+0.5)/262166*360-180, native_latitude[y])",
                   "geometry_predicate": "Shapely contains; covers checked for boundary",
                   "runtime": {"python": platform.python_version(), "shapely": shapely.__version__},
                   "limitations": ["This unversioned current service response is contextual evidence, not a source-lineage bridge to the ODW/geoBoundaries 2017 ADM2 payload.",
                                   "Recorded layer metadata reports a 2017 data edit; this does not reconstruct a historical response.",
                                   "Outside the PCBS layer does not by itself invalidate the retained ODW/geoBoundaries candidate or establish a legal/sovereignty conclusion.",
                                   "No classification, hold, or acceptance status was changed."]},
        "results": {"total": total, "by_owner": {owner: dict(counts) for owner, counts in sorted(by_owner.items(), key=lambda x: int(x[0]))},
                    "inside": sum(counts.get("Tulkarm", 0) + counts.get("Jericho & Al Aghwar", 0) + counts.get("Khan Yunis", 0) + counts.get("Deir Al Balah", 0) + counts.get("Bethlehem", 0) + counts.get("Salfit", 0) + counts.get("Ramallah & Al Bireh", 0) + counts.get("Jenin", 0) + counts.get("Qalqiliya", 0) + counts.get("Tubas", 0) + counts.get("Hebron", 0) for counts in by_owner.values()),
                    "outside": sum(counts.get("outside", 0) for counts in by_owner.values()),
                    "boundary_or_multiple": sum(counts.get("boundary_or_multiple", 0) for counts in by_owner.values()),
                    "six_native_supported_candidates": {"total": len(candidate_results),
                        "by_owner": {owner: dict(Counter(r["inside"][0] if len(r["inside"]) == 1 else "outside"
                                                          for r in candidate_results if str(r["owner"]) == owner))
                                     for owner in sorted({str(r["owner"]) for r in candidate_results})}}}
    }
    print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
