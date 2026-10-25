# WorldAtlas

WorldAtlas is a polygon-based world-history atlas with stable territorial locations, a geographic hierarchy, dated evidence and interactive map modes. It distinguishes reference geography, political ownership and historical facts; unsupported values remain unknown.

## Run locally

Use Node.js 24 or later:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. The local preview uses bundled geography and examples; its ignored SQLite database is not synchronized with hosted services. See `npm run` and `package.json` for current commands. For tests use `npm test`; browser tests use the repository's documented Playwright setup. Do not publish local fixtures or treat a local preview as production state.

## Project guides

The sole agent entrypoint is [AGENTS.md](AGENTS.md). Its six domain guides cover development, geography, history, data architecture, validation and operations. Current behavior is defined by code, tests, machine schemas and accepted release records. Research, merge, scientific acceptance, issue completion and live publication are separate steps.
