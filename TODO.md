# TODO

## Phase 1 — Package scaffolding

- [x] design package.json (name, bin entry, deps, scripts)
- [x] create src/ folder structure: one function per file, clean snake_case names
- [x] create bin/ folder with cli entry point
- [x] create schema/ folder with JSON schema for content files
- [x] add console.log ===...=== logging (data fetching and data only, not nav actions)
- [x] run `bun run tsc --noEmit` and `bunx prettier . --write` after each phase
- [x] create docs/ folder: INSTALL.md (human), LLM.md (AI), CSS_GUIDE.md (how to write CSS)

## Phase 2 — Core library (src/)

- [x] json_validator.ts — validate content JSON against schema
- [x] template_engine.ts — insert content into HTML template
- [x] css_themer.ts — inject/select CSS theme
- [x] route_resolver.ts — parse routes from main.json, resolve linked JSON files
- [x] page_builder.ts — orchestrate build: validate → resolve → generate HTML/JS
- [x] single_file_output.ts — inline JS and content into single HTML file (default)
- [x] index.ts — re-export all public functions for programmatic use

## Phase 3 — CLI (bin/)

- [x] stickson create <project-name> — scaffold project (only content.json + package.json)
- [x] stickson validate <file.json> — check JSON against schema
- [x] stickson build [--single] — build to out/ directory
- [x] stickson serve <file.json> — serve with live reload
- [x] stickson dev <file.json> — watch JSON changes, rebuild automatically

## Phase 4 — Example content (examples/)

- [x] create examples/ folder
- [x] create example JSON files (home.json, about.json, blog.json) with varied content
- [x] create a demo HTML template used by examples

## Phase 5 — Demo CSS themes (themes/)

- [x] create themes/ folder with 2+ complete CSS themes (e.g. minimal, dark)
- [x] each theme: theme.css + preview screenshot/description
- [x] themes should be usable via --theme flag or in content.json

## Phase 6 — Docs

- [x] docs/INSTALL.md — install via bun/npm, quick start guide
- [x] docs/LLM.md — full prompt/context for AI agents to generate pages
- [x] docs/CSS_GUIDE.md — how to write CSS targeting stickson's HTML structure

## Phase 7 — README

- [ ] rewrite README.md to follow sleet-ai README.example.bun.md format

=====================
<br/>
copyright 2026 by web3stick.near
