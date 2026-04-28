# TODO

## Bugs / Breaking Issues

- [x] `dev` command crashes on startup — uses `require()` but package.json is `"type": "module"` (ESM). Should use `import()` dynamic import instead.
- [x] `serve` does not build — it requires `out/` folder to exist with pre-built HTML. Does not build on the fly. User must run `build` first.
- [x] `dev` only watches the entry JSON file — doesn't watch linked JSONs (about.json, blog.json). Only re-builds when the entry file changes.

## CLI / UX Improvements

- [x] `build` should accept a directory and build all JSON files in it
- [x] `serve` / `dev` should build automatically if `out/` is stale or missing
- [x] `dev` should watch all linked JSON files (not just the entry file)
- [x] `dev` should serve the output (run an HTTP server with live reload) — currently it's just a file watcher that logs rebuilds
- [x] Error messages should be user-friendly (no stack traces for invalid JSON, schema validation should list which field failed)

## Schema / Content Issues

- [ ] Schema is missing `article` element — added but verify all common HTML elements are covered (section, aside, figure, figcaption, etc.)
- [ ] Consider: should the schema be more permissive (allow arbitrary HTML tags via `custom` type)?

## Docs / README

- [x] `examples/README.md` and `bin/README.md` created — verify they're accurate
- [x] Main README should document the full CLI usage (all commands and flags)
- [x] `docs/INSTALL.md` — verify accuracy after recent changes
- [ ] Add docs/DEV_DEPENDENCY.md — guide on using stickson as a dev dependency (not globally) in other projects

## Publishing / Distribution

- [x] `package.json` has correct `files`, `repository`, `homepage` for npm publish
- [x] Published v0.0.1 to npm: https://www.npmjs.com/package/@web3stick/stickson

## Agentic Workflow (for cron job self-improvement)

The cron job (`stickson bugs and improvements`, job id: 99b5b084334e) should follow this workflow:

1. **Test before and after** — run `bun run build` and `stickson validate examples/home.json` before and after any change
2. **Smoke test the CLI** — `bun bin/stickson.js build examples/home.json --out /tmp/stickson-test-out && bun bin/stickson.js validate examples/home.json`
3. **Real improvement loop**:
   - Find one real bug or UX issue per run
   - Fix it, verify it works
   - Commit + push
   - Mark the fix done in this TODO
4. **Ship Discord summary** — after each run, summarize what was tested, what was found, what was fixed

=====================
<br/>
copyright 2026 by web3stick.near
