# TODO

## Phase 1 — Package scaffolding
- [ ] design package.json (name, bin entry, deps, scripts)
- [ ] create src/ folder structure: one function per file, clean snake_case names
- [ ] create bin/ folder with cli entry point
- [ ] create schema/ folder with JSON schema for content files
- [ ] add console.log ===...=== logging (data fetching and data only, not nav actions)
- [ ] run `bun run tsc --noEmit` and `bunx prettier . --write` after each phase
- [ ] create docs/ folder: INSTALL.md (human), LLM.md (AI), CSS_GUIDE.md (how to write CSS)

## Phase 2 — Core library (src/)
- [ ] json_validator.ts — validate content JSON against schema
- [ ] template_engine.ts — insert content into HTML template
- [ ] css_themer.ts — inject/select CSS theme
- [ ] route_resolver.ts — parse routes from main.json, resolve linked JSON files
- [ ] page_builder.ts — orchestrate build: validate → resolve → generate HTML/JS
- [ ] single_file_output.ts — inline JS and content into single HTML file (default)
- [ ] index.ts — re-export all public functions for programmatic use

## Phase 3 — CLI (bin/)
- [ ] stickson create <project-name> — scaffold project (only content.json + package.json)
- [ ] stickson validate <file.json> — check JSON against schema
- [ ] stickson build [--single] — build to out/ directory
- [ ] stickson serve <file.json> — serve with live reload
- [ ] stickson dev <file.json> — watch JSON changes, rebuild automatically

## Phase 4 — Example content (examples/)
- [ ] create examples/ folder
- [ ] create example JSON files (home.json, about.json, blog.json) with varied content
- [ ] create a demo HTML template used by examples

## Phase 5 — Demo CSS themes (themes/)
- [ ] create themes/ folder with 2+ complete CSS themes (e.g. minimal, dark)
- [ ] each theme: theme.css + preview screenshot/description
- [ ] themes should be usable via --theme flag or in content.json

## Phase 6 — Docs
- [ ] docs/INSTALL.md — install via bun/npm, quick start guide
- [ ] docs/LLM.md — full prompt/context for AI agents to generate pages
- [ ] docs/CSS_GUIDE.md — how to write CSS targeting stickson's HTML structure

## Phase 7 — README
- [ ] rewrite README.md to follow sleet-ai README.example.bun.md format

=====================
<br/>
copyright 2026 by web3stick.near
