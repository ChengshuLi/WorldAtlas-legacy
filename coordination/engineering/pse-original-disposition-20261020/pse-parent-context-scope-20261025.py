#!/usr/bin/env python3
"""Derive the exact PSE-03/05/09 parent-context scope from pinned records."""
import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
PACKAGE = ROOT / "coordination/engineering/pse-original-disposition-20261020"
DIAGNOSTIC = PACKAGE / "native-diagnostic-20261025/native-diagnostic.json"
CROSSCUT = ROOT / "inventory/pse-inland-water-held-interval-contact-crosscut-20261025.json"
SOURCE = PACKAGE / "source-evidence-20261025/source-evidence.json"
OUTPUT = ROOT / "inventory/pse-adm1-parent-context-scope-20261025.json"

PARENT = "gb:PSE:ADM1:83478781B28849486138516"
PARENT_SHA256 = "d7d256d3cf9f2f133c997fd75128a2727c086eb7fcba88b28d1e8edc4155305c"
GROUPS = {"PSE-03", "PSE-05", "PSE-09"}

def read(path):
    return json.loads(path.read_text())

diag, crosscut, source = map(read, (DIAGNOSTIC, CROSSCUT, SOURCE))
requested = set()
for group in crosscut["held_groups"]:
    if group["question_id"] not in GROUPS:
        continue
    assert group["physical_class"] == "inland-water"
    for interval in group["exact_intervals"]:
        for x in range(interval["x_start"], interval["x_end_exclusive"]):
            requested.add((interval["y"], x, interval["owner_indices"][0], group["question_id"]))
assert len(requested) == 149

diagnostic = {}
for row in diag["diagnostic_territorial_rows"]:
    y = row["y"]
    for x0, x1, owner, contacts in row["runs"]:
        for x in range(x0, x1):
            diagnostic[(y, x, owner)] = contacts

targets = {t["pixelIndex"]: t for t in source["targets"]}
records = []
for y, x, owner, group in sorted(requested):
    target = targets[owner]
    matches = [c for c in diagnostic[(y, x, owner)]
               if c.get("original_source", {}).get("source_id") == PARENT
               and c.get("geometry_sha256") == PARENT_SHA256
               and c.get("kinds") == ["interior"]]
    assert len(matches) == 1, (y, x, owner, len(matches))
    hit = matches[0]
    ordinal = hit["negative_ordinal"]
    operand = target["territorial_exclusions"][ordinal]
    assert operand["source_id"] == PARENT and operand["geometry_sha256"] == PARENT_SHA256
    records.append({
        "pixelIndex": owner,
        "y": y,
        "x": x,
        "question_id": group,
        "source_id": target["id"],
        "target_id": target["target_id"],
        "negative_ordinal": ordinal,
        "geometry_sha256": PARENT_SHA256,
    })

triples = [[r["y"], r["x"], r["pixelIndex"]] for r in records]
key_hash = hashlib.sha256(json.dumps(triples, separators=(",", ":")).encode()).hexdigest()
assert key_hash == "e90c42deadc957614cf9069b37b17964cad1c1ff2cdba426df15343c77d0ed81", key_hash
assert Counter((r["question_id"] for r in records)) == {"PSE-03": 9, "PSE-05": 23, "PSE-09": 117}
body = {
    "version": 1,
    "kind": "pse-adm1-parent-context-scope-v1",
    "status": "exact derived request-key scope; no native status change",
    "package_id": "gb-PSE-ADM2--repair-evaluation",
    "original_denominator": {"cells": 427, "intervals": 277, "requested_owners": 11},
    "selection": "Only exact PSE-03, PSE-05 and PSE-09 inland-water request keys with a measured interior hit on the same-release PSE ADM1 West Bank operand are listed.",
    "parent_source_id": PARENT,
    "parent_geometry_sha256": PARENT_SHA256,
    "key_count": len(records),
    "key_set_sha256_y_x_owner": key_hash,
    "groups": {g: sum(r["question_id"] == g for r in records) for g in sorted(GROUPS)},
    "inputs": {
        "diagnostic": {"path": str(DIAGNOSTIC.relative_to(ROOT)), "sha256": hashlib.sha256(DIAGNOSTIC.read_bytes()).hexdigest()},
        "crosscut": {"path": str(CROSSCUT.relative_to(ROOT)), "sha256": hashlib.sha256(CROSSCUT.read_bytes()).hexdigest()},
        "source_evidence": {"path": str((PACKAGE / "source-evidence-20261025/source-evidence.json").relative_to(ROOT)), "sha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest()},
    },
    "records": records,
    "limits": [
        "The scope contains no geometry and does not delete or alter any negative operand.",
        "PSE-03 retains its separate Jordan Balqa interior contact; this scope cannot clear its nine cells.",
        "Every Israel/Jordan operand remains in the complete source evidence and continues to veto its own matching interior or boundary contact.",
        "No status, constructor result, acceptance, sovereignty conclusion or whole-source clearance is claimed.",
    ],
}
OUTPUT.write_text(json.dumps(body, indent=2, sort_keys=True) + "\n")
print(json.dumps({"output": str(OUTPUT), "bytes": OUTPUT.stat().st_size,
                  "sha256": hashlib.sha256(OUTPUT.read_bytes()).hexdigest(),
                  "records": len(records), "groups": body["groups"],
                  "key_set_sha256_y_x_owner": key_hash}, sort_keys=True))

