# Stickson — Agent / Developer Guide

## Project Overview

Stickson (`@web3stick/stickson`) is a JSON framework for making static pages.
- Package: https://www.npmjs.com/package/@web3stick/stickson
- Repo: https://github.com/web3stick/stickson
- Runtime: **bun** — use bun commands over npm/yarn/pnpm

## Coding Standards

### File Structure

- one function per file, clear_snake_case naming
- all things end with what they are: `_fun`, `_const`, `_interface`
- `// ============` section comments after imports and at bottom of every file
- NO `/* */` multi-line JS comments — use `//` only
- keep files under ~100 lines
- ALL_CAPS for consts, not mixed-case structs

### Console Logging

- console logs use `======` on both sides, same length as other logs in project
- console log only for data fetching/data, NOT nav actions

### Build and Type Check

- `bun run tsc --noEmit` — verify no type errors
- `bunx prettier . --write` — format code
- `bun run build` — compile TypeScript to `dist/`

### Tech Stack

- TypeScript (ESM, `"type": "module"` in package.json)
- Bun runtime
- chokidar for file watching
- express for dev server
- ajv + ajv-formats for JSON schema validation

## Workflow

### Before working on this project

1. Read `TODO.md` — note current phase and next incomplete task
2. Read `CHECKLIST.md` — for per-session checklist
3. Review relevant `docs/` files for current phase
4. Run `git status` to see current state

### After coding

1. `bun run tsc --noEmit` — verify no type errors
2. `bunx prettier . --write` — format code
3. `git add + commit` with message describing what was done
4. `git push` — push commits to origin
5. `git status` — confirm clean state

### Pre-flight (before publishing or after major changes)

```sh
bun run build
npm pack --dry-run
```

Verify output contains only: `dist/`, `bin/`, `schema/`, `themes/`, `README.md`, `package.json`.
If `src/`, `docs/`, `examples/`, `CHECKLIST.md`, `TODO.md`, `PROMPT.md` appear — fix `.npmignore`.

### Smoke test

```sh
bun run build
bun bin/stickson.js validate examples/home.json
bun bin/stickson.js build examples/home.json --out /tmp/stickson-test-out
```
