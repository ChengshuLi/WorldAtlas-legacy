# WorldAtlas

WorldAtlas is a polygon-based world-history atlas with stable territorial locations, a geographic hierarchy, dated evidence and interactive map modes. It distinguishes reference geography, political ownership and historical facts; unsupported values remain unknown.

## Run locally

Use Node.js 24 or later:

```sh
npm ci
npm run dev
```

By default open `http://localhost:3000`; set `PORT` to choose another port. `npm run dev` starts the local preview in `server.mjs`, which prepares and serves the canonical static atlas package; it does not connect to the hosted content API. Use `npm run` and `package.json` for available commands. Run tests with `npm test`; browser tests require the repository's Playwright setup. A preview is not a production deployment.

## Project guides

The sole agent entrypoint is [AGENTS.md](AGENTS.md). Its six domain guides cover development, geography, history, data architecture, validation and operations. Current behavior is defined by code, tests, machine schemas and accepted release records.
