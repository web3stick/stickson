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

- [ ] `examples/README.md` and `bin/README.md` created — verify they're accurate
- [ ] Main README should document the full CLI usage (all commands and flags)
- [ ] `docs/INSTALL.md` — verify accuracy after recent changes

## Nice to Have

- [ ] `create` command — test it actually works
- [ ] `validate` command — test it reports useful errors
- [ ] `--theme` flag in `build` — does it actually apply themes?
- [ ] `--single` flag — verify it inlines JS/CSS into a single HTML file
- [ ] `package.json` scripts: add `start` script that runs `bun bin/stickson.js dev examples/home.json`

=====================
<br/>
copyright 2026 by web3stick.near
