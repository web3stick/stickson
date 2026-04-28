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

- [ ] **Examples restructure**: Delete old example files, create clean `vanilla/` and `sleet-css/` example folders with minimal working content that demonstrates the core features.

- [ ] **Docs improvements**: Ensure docs/CLI.md, docs/INSTALL.md, docs/TUTORIAL.md are consistent with current CLI behavior. Add examples for routes, themes, and custom templates.

- [ ] **Repo cleanliness**: Verify `npm pack --dry-run` produces correct package contents, ensure `.gitignore` is complete, check all published files are clean.

=====================
<br/>
copyright 2026 by web3stick.near
