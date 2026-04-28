# TODO

BIG FOCUS :: DO NOT TOUCH THIS SECTION

- working examples
- builds working, verify by checking output files
- docs
- keep this todo formatted this way, work on the to items check completed, rm completed from previous run, add new ones that focus on these four items. test, and verify that our package has the features we need

---

## TO DO
never leave this empy should always be task here, with check boxes, rm complted tasks from prevouse run and leave only fresh uncomplted tasks here

- [ ] **Document CLI spec**: write a spec covering all CLI commands (`build`, `validate`, `dev`, `serve`, `create`), their flags, arguments, input/output behavior. This should live in `docs/CLI.md` or similar so the team has a single source of truth and doesn't make breaking changes.
- [x] **Document output directory convention**: clarify that `build` outputs to `dist/` by default, not `out/`. Fixed `docs/INSTALL.md` `out/` → `dist/`. Note: CLI `--help` still says `default: ./out` — needs `cmd_build.ts` fix too.
- [x] **Validate all CLI commands work**: `build`, `validate`, `dev`, `serve` for both vanilla and sleet-css examples. All confirmed working. `serve` and `dev` require a JSON file path (not an output directory).
- [x] **Build output inspection**: verified built HTML files are correct and complete for both examples. vanilla outputs index.html, home.html, about.html. sleet-css outputs index.html. Content matches JSON input.
- [ ] **Fix examples/vanilla home.json**: `home.json` is an exact copy of `content.json` — both produce the "Welcome/Features" page. Either remove home.json or give it distinct content so the route actually makes sense.
- [ ] **Fix TUTORIAL.md**: still references `home.json` in the routes section (line 117) but the project structure example shows a 2-page site (content.json + about.json). Also the routes example uses `home.json` which doesn't match the actual example behavior.

=====================
<br/>
copyright 2026 by web3stick.near
