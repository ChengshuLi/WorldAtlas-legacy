#!/usr/bin/env python3
"""Reproduce exact BRA ADM1 contact conservation and accepted-positive overlap."""

from __future__ import annotations

import gzip
import hashlib
import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
PACKET = ROOT / "coordination/engineering/argentina-repair-delivery-20261017"
HERE = Path(__file__).resolve().parent
PINS = json.loads((HERE / "pins.json").read_text(encoding="utf-8"))
BRA_IDS = (
    "gb:BRA:ADM1:14911670B30315977547221",
    "gb:BRA:ADM1:14911670B90188072957077",
    "gb:BRA:ADM1:14911670B68448774564157",
)


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def verify_file(record: dict, commit: str) -> bytes:
    path = record["path"]
    body = (ROOT / path).read_bytes()
    if len(body) != record["bytes"]:
        raise ValueError(f"byte-size mismatch: {path}")
    if hashlib.sha256(body).hexdigest() != record["sha256"]:
        raise ValueError(f"SHA-256 mismatch: {path}")
    oid = subprocess.check_output(
        ["git", "-C", str(ROOT), "rev-parse", f"{commit}:{path}"], text=True
    ).strip()
    if oid != record["blob_oid"]:
        raise ValueError(f"Git blob mismatch: {path}: {oid}")
    return body


def expand_patch(patch: dict) -> set[tuple[int, int, int]]:
    values = set()
    for row in patch["rows"]:
        y = row["y"]
        for x0, x1, owner in row["runs"]:
            values.update((y, x, owner) for x in range(x0, x1))
    return values


def target_candidate(source: dict) -> set[tuple[int, int, int]]:
    values = set()
    for target in source["targets"]:
        has_bra_exclusion = any(
            item["source_id"].startswith("gb:BRA:ADM1:")
            for item in target["territorial_exclusions"]
        )
        if not has_bra_exclusion:
            continue
        for row in target["coverage_rows"]:
            for x0, x1, _coverage_class in row["runs"]:
                values.update((row["y"], x, target["pixelIndex"]) for x in range(x0, x1))
    return values


def main() -> None:
    accepted = PINS["accepted_delivery"]
    accepted_commit = accepted["merge_commit"]
    for record in accepted["files"]:
        verify_file(record, accepted_commit)

    readback = PINS["selected_owner_readback"]
    observation_path = ROOT / readback["path"]
    compressed = observation_path.read_bytes()
    if len(compressed) != readback["compressed_bytes"]:
        raise ValueError("selected-owner gzip byte-size mismatch")
    if hashlib.sha256(compressed).hexdigest() != readback["compressed_sha256"]:
        raise ValueError("selected-owner gzip SHA-256 mismatch")
    observation_blob = subprocess.check_output(
        ["git", "-C", str(ROOT), "rev-parse", f"{readback['merge_commit']}:{readback['path']}"],
        text=True,
    ).strip()
    if observation_blob != readback["blob_oid"]:
        raise ValueError("selected-owner observation Git blob mismatch")
    decoded = gzip.decompress(compressed)
    if len(decoded) != readback["decoded_bytes"]:
        raise ValueError("selected-owner decoded byte-size mismatch")
    if hashlib.sha256(decoded).hexdigest() != readback["decoded_sha256"]:
        raise ValueError("selected-owner decoded SHA-256 mismatch")
    observation = json.loads(decoded)
    if observation.get("commit") != readback["code_and_data_commit"]:
        raise ValueError("selected-owner observation commit does not match its pin")
    if observation.get("scientific_qualification") is not False:
        raise ValueError("selected-owner readback must remain labeled non-qualifying")

    holds = load_json(PACKET / "original-scope/preliminary-source-holds.json")
    held_rows = load_json(PACKET / "source-review/complete-scope-002/held-original-keys.json")
    patch = load_json(PACKET / "native-config-002/native-qualified-patch.json")
    inputs_001 = load_json(PACKET / "native-inputs-001/source-evidence.json")
    inputs_002 = load_json(PACKET / "native-inputs-002/source-evidence.json")

    direct_rows = [
        row for row in holds["foreign_keys"]
        if any(source_id in BRA_IDS for source_id in row["original_source_ids"])
    ]
    direct_keys = {
        (row["y"], row["x"], row["pixelIndex"]): tuple(row["original_source_ids"])
        for row in direct_rows
    }
    if len(direct_rows) != len(direct_keys):
        raise ValueError("duplicate direct BRA source-contact key")
    if any(sum(source_id in row["original_source_ids"] for source_id in BRA_IDS) != 1 for row in direct_rows):
        raise ValueError("a direct contact row does not identify exactly one BRA source")

    per_id = {
        source_id: sum(source_id in row["original_source_ids"] for row in direct_rows)
        for source_id in BRA_IDS
    }
    expected_per_id = dict(zip(BRA_IDS, (245, 111, 24)))
    if per_id != expected_per_id or len(direct_keys) != 380:
        raise ValueError(f"unexpected direct BRA roster: {per_id}")

    held = {(row["y"], row["x"], row["pixelIndex"]) for row in held_rows}
    if len(held) != len(held_rows) or len(held_rows) != 6149:
        raise ValueError("held ledger is not the expected unique 6,149-key set")
    if not set(direct_keys).issubset(held):
        raise ValueError("a direct BRA contact is missing from the retained held ledger")

    accepted_patch = expand_patch(patch)
    accepted_patch_coords = {(y, x) for y, x, _owner in accepted_patch}
    observed_positive = {
        (row["y"], row["x"], row["accepted_additive_owner"])
        for row in observation["keys"]
        if row["accepted_additive_owner"]
    }
    if len(accepted_patch) != 22697 or len(accepted_patch_coords) != 22697:
        raise ValueError("accepted delivery patch does not contain 22,697 unique owner keys and coordinates")
    if accepted_patch != observed_positive:
        raise ValueError("merged-delivery patch differs from the pinned selected-owner readback")
    contact_coords = {(y, x) for y, x, _pixel in direct_keys}
    if contact_coords & accepted_patch_coords:
        raise ValueError("direct BRA source contacts overlap the accepted positive coordinates")

    candidate_001 = target_candidate(inputs_001)
    candidate_002 = target_candidate(inputs_002)
    broad_difference = candidate_001 - candidate_002
    extras = sorted(broad_difference - set(direct_keys))
    expected_extras = [(150587, 91324, 7828), (150758, 91285, 7828), (151063, 91245, 7890)]
    if len(candidate_001) != 1984 or len(candidate_002) != 1601:
        raise ValueError("unexpected target-associated BRA-exclusion candidate sizes")
    if len(broad_difference) != 383 or set(direct_keys) - broad_difference:
        raise ValueError("unexpected broad candidate difference or missing exact BRA contacts")
    if extras != expected_extras:
        raise ValueError(f"unexpected broad-only candidate records: {extras}")

    foreign_by_key = {
        (row["y"], row["x"], row["pixelIndex"]): tuple(row["original_source_ids"])
        for row in holds["foreign_keys"]
    }
    extra_source_ids = {";".join(foreign_by_key.get(key, ())) for key in extras}
    if extra_source_ids != {
        "gb:PRY:ADM1:63826900B70318852287741",
        "gb:PRY:ADM1:63826900B60028824512427",
    }:
        raise ValueError(f"unexpected original contact identities for extra candidates: {extra_source_ids}")

    result = {
        "kind": "argentina-bra-adm1-contact-reconciliation-v1",
        "scope": "source-contact and key-set conservation only",
        "accepted_delivery_pull_request": accepted["pull_request"],
        "accepted_delivery_merge_commit": accepted_commit,
        "selected_owner_readback_pull_request": readback["pull_request"],
        "direct_bra_source_ids": per_id,
        "direct_bra_contact_rows": len(direct_rows),
        "direct_bra_unique_keys_y_x_pixel_index": len(direct_keys),
        "direct_bra_keys_in_retained_held_ledger": len(direct_keys),
        "held_ledger_unique_keys": len(held),
        "accepted_positive_owner_keys": len(accepted_patch),
        "accepted_positive_unique_coordinates": len(accepted_patch_coords),
        "patch_equals_selected_owner_observation": True,
        "direct_bra_contact_positive_coordinate_overlap": 0,
        "target_associated_bra_candidate_input_001": len(candidate_001),
        "target_associated_bra_candidate_input_002": len(candidate_002),
        "target_candidate_difference": len(broad_difference),
        "direct_contacts_in_broad_difference": len(set(direct_keys) & broad_difference),
        "broad_only_candidate_records": [
            {"y": key[0], "x": key[1], "pixelIndex": key[2], "original_source_ids": foreign_by_key[key]}
            for key in extras
        ],
        "clearance_or_credit": False,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
