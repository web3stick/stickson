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

## Project Structure / Examples

- [x] Delete current `examples/` files (home.json, about.json, blog.json + out/) — they are one multi-page site that needs replacing
- [x] New example creation flow via CLI: `stickson create my-site` scaffolds `src/content.json`, `package.json`, `README.md` with deps
- [x] Create example sites in `examples/` using different CSS approaches:
  - `examples/vanilla/` — plain HTML, no framework
  - `examples/sleet-css/` — uses a sleet-css theme (colorsnake-css, huggies-css, sticky-css, etc.)
  - Each example: self-contained folder with `src/`, `package.json`, `README.md`
- [ ] Future: support `bun create stickson@latest` style entry point as an alternative to `stickson create my-site`

## Schema / Content Issues

- [x] Schema is missing `article` element — added but verify all common HTML elements are covered (section, aside, figure, figcaption, etc.)
- [ ] Audit schema for missing HTML elements — check for: aside, figure, figcaption, details, summary, mark, time, abbr, cite, code, pre, blockquote, hr
- [ ] Consider: should the schema be more permissive (allow arbitrary HTML tags via `custom` type)?

## Repo Cleanliness / Structure

- [ ] `npm pack --dry-run` after any change to `package.json`, `files` field, or `.npmignore`
- [ ] Add `prepublishOnly` script to `package.json` that runs `bun run build` automatically before publish
- [ ] Type-check and lint: `bun run tsc --noEmit` and `bunx prettier . --write` should pass clean

## Docs / README

- [x] `examples/README.md` and `bin/README.md` created — verify they're accurate
- [x] Main README should document the full CLI usage (all commands and flags)
- [x] `docs/INSTALL.md` — verify accuracy after recent changes
- [x] Add dev dependency usage to `docs/INSTALL.md` — install as dev dependency with `npm install -D @web3stick/stickson`, use via npx or local binary
- [ ] Add `docs/DEV_DEPENDENCY.md` — full guide on using stickson as a local dev dependency with `file:` path

## Publishing / Distribution

- [x] `package.json` has correct `files`, `repository`, `homepage` for npm publish
- [x] Published v0.0.1 to npm: https://www.npmjs.com/package/@web3stick/stickson

=====================
<br/>
copyright 2026 by web3stick.near
