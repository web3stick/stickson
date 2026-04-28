# TODO

> **Note**: Fresh clone performed 2026-04-28. All examples need full verification on this clean environment before any new work.

BIG FOCUS :: DO NOT TOUCH THIS SECTION

- working examples
- builds working, verify by checking output files
- docs
- keep this todo formatted this way, work on the to items check completed, rm completed from previous run, add new ones that focus on these four items. test, and verify that our package has the features we need

---

## TO DO

never leave this empy should always be task here, with check boxes, rm complted tasks from prevouse run and leave only fresh uncomplted tasks here

- [x] **Fresh clone + example verification**: Clone to a clean directory (not existing repo), run `bun install && bun run build`, then test all examples. Verified: `validate` works for both vanilla and sleet-css examples, `build` works for vanilla (3 pages: main, home, about) and sleet-css (1 page: index). `dev` server runs correctly. Fresh `bun install` was needed before `tsc` worked.

- [x] **Schema audit - article element missing in template_engine**: The `article` element type was in the schema but had no handler in template_engine, rendering as `<!-- unknown element type: article -->`. Fixed. Also fixed: `pre` element content was not HTML-escaped (XSS risk).

- [x] **Schema coverage gap - 17 missing HTML elements**: Added form, input, select, option, textarea, label, fieldset, legend, table, thead, tbody, tfoot, tr, td, th, colgroup, col to both the schema and template engine.

- [x] **Docs improvements**: Ensure docs/CLI.md, docs/INSTALL.md, docs/TUTORIAL.md are consistent with current CLI behavior. Added `-h`/`--help` support to all CLI commands. Fixed project structure in INSTALL.md (was missing `src/`). Fixed serve vs dev descriptions. Added `create --help` examples. Fixed TUTORIAL.md project structure. Fixed CLI.md examples section.

- [x] **CLI help flag handling**: `stickson validate --help`, `stickson dev --help`, `stickson serve --help`, `stickson create --help` all silently failed (validate/dev tried to use `--help` as a file path, serve created a directory called `--help`). Fixed all four commands to properly detect `-h`/`--help` and print usage.

- [x] **Repo cleanliness**: `.gitignore` updated to include `--help/` (accidentally created when `create --help` was run before the fix). Other files clean.

- [ ] **Solidify spec for 0.0.2**: Review and lock down the JSON schema (schema/) — all element types fully covered, no ambiguity. Ensure the template engine behavior matches schema exactly. Confirm the published package surface area is minimal and correct.

=====================
<br/>
copyright 2026 by web3stick.near
