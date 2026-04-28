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

- [ ] **Schema audit - missing `article` in template_engine**: The schema defines an `article` element type but the template engine has no `case "article":` handler, causing it to silently render as `<!-- unknown element type: article -->`. Also fixed: `pre` element content was not HTML-escaped (XSS risk). Fix template_engine.ts to handle `article` type, add schema coverage for missing form/input/table elements.

- [ ] **Examples restructure**: Delete old example files, create clean `vanilla/` and `sleet-css/` example folders with minimal working content that demonstrates the core features.

- [ ] **Schema coverage gap**: Missing form, input, select, textarea, table, thead, tbody, tr, td, th elements in both schema and template engine. Add these common HTML elements.

- [ ] **Docs improvements**: Ensure docs/CLI.md, docs/INSTALL.md, docs/TUTORIAL.md are consistent with current CLI behavior. Add examples for routes, themes, and custom templates.

- [ ] **Repo cleanliness**: Verify `npm pack --dry-run` produces correct package contents, ensure `.gitignore` is complete, check all published files are clean.

=====================
<br/>
copyright 2026 by web3stick.near
