# TLS selected-owner observation — finalize-007

This records selected-owner conservation for the original TLS package scope. It is an observation of the selected native bank, not source qualification, physical qualification, legal-boundary validation, or credit.

## Original scope

- Package: `gb-TLS-ADM2--repair-evaluation`
- Exact original scope: 562 keys in 337 intervals
- Frozen interval commitment SHA-256: `ac5206324585780f9b18140fd8affd94a327349c1747af468ec9b7869dfa7384`
- Ordered query commitment SHA-256: `c433f52769c67d340f7a323b6b8b5ba43e1c2f1b5178ebbb65b4071ec8590c3c`

## Observation and independent reconciliation

The supported `observe-selected-owners.mjs` command read the finalized candidate at commit `1b152566019d7c13aacfc82f6c3fb2aae4410bd7` using profile `selected-final-native-bank-v2`. The observation returned 562 rows. Independent SGP reconciliation against the frozen roster found 562/562 rows joined: 482 assigned across 20 unique owner indices, 80 unassigned, and zero duplicate, missing, or conflicting assignments. Compared with the pre-TKM candidate observation, there were zero owner-assignment changes.

This result reports only selected-owner conservation for the frozen query set. It does not qualify any source, establish physical predicates, or claim science credit.

## Reproducibility pins

- Candidate selector: 2,262 bytes; Git blob `6d7f7aac19fe3cf73b92f7287a5d3483574a8a1d`; SHA-256 `b2b02e05960a30085399c39e8e953bf14854b5e44b6439bffd9c96982bacdfbe`.
- Native manifest SHA-256: `d9954fa51d18e4ce785679f920e4b6ac1ebd3cf07ce03fa7e7e674cb2a42faba`.
- Final startup ownership index: 49,610 bytes; SHA-256 `2877c86af916a2a82a3a279c70dcddd8dfa579ef88137e660bd2715728dfe5a2`; it lists 79 files.
- Finalize config SHA-256: `d5353ce75ee8b6e1f39da041fd25e5c23f6b13a49f3a5f09257e04fb3a7e80ca`.
- Finalize preparation receipt SHA-256: `817cab4d6c048a32b7761306635945a2d596ba09375494138cbc3efcb4a8c916`.
- Finalize startup ownership SHA-256: `2877c86af916a2a82a3a279c70dcddd8dfa579ef88137e660bd2715728dfe5a2`.
- Private observation JSON: 158,202 bytes; SHA-256 `8abae4b0c7f8f517e0869a47f9b760bc88c29987137cef92f4ae6c547c598be7`.
- Private observation manifest: 1,780 bytes; SHA-256 `91fc9879d235e6a755ab665d1d5c10901a4ae40f06587a3b96da4c55493d696c`.

The row-level observation and its supporting files remain in the private task handoff; this summary publishes no keys, coordinates, or geometry.

## Later finalize-012 observation

The statement above describes only the historical finalize-007 row-level handoff. A later selected-owner observation is separately published at `coordination/engineering/tls-original-repair-20261026/finalize-012/observation.json` (158,202 bytes; SHA-256 `975311a616673c238eb75b946239a47970154ddf7c7d7d1e46bbd5d48f7c7645`). It is bound to candidate bank commit `3328633a9697a891579b7e3dcac53a14044370f1` and records `scientific_qualification: false`. The finalize-007 pins above remain historical and unchanged.
