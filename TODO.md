# TODO

BIG FOCUS :: DO NOT TOUCH THIS SECTION

- working examples
- builds working, verify by checking output files
- docs
- keep this todo formatted this way, work on the to items check completed, rm completed from previous run, add new ones that focus on these four items. test, and verify that our package has the features we need

---

## TO DO

never leave this empy should always be task here, with check boxes, rm complted tasks from prevouse run and leave only fresh uncomplted tasks here

- [ ] **Fresh clone + example verification**: Clone to a clean directory (not existing repo), run `bun install && bun run build`, then test all examples (`bin/stickson.js dev examples/vanilla/src/content.json`, `bin/stickson.js dev examples/sleet-css/src/content.json`, `bin/stickson.js build`, `bin/stickson.js validate`). Must work out of the box on a fresh environment. User reports errors on their end that don't repro on dev machine.
- [x] **Document CLI spec**: write a spec covering all CLI commands (`build`, `validate`, `dev`, `serve`, `create`), their flags, arguments, input/output behavior. This lives in `docs/CLI.md`. Also fixed stale `--out` default in `bin/stickson.js` help text (said `./out`, should be `./dist`).
- [x] **Validate all CLI commands work**: `build`, `validate`, `dev`, `serve` for both vanilla and sleet-css examples. All confirmed working. `serve` and `dev` require a JSON file path (not an output directory).
- [x] **Build output inspection**: verified built HTML files are correct and complete for both examples. vanilla outputs index.html, home.html, about.html. sleet-css outputs index.html. Content matches JSON input.
- [x] **Fix examples/vanilla home.json**: removed the incorrect `routes` block from `home.json` (it was duplicating content from `content.json` and pointing to `src/home.json` instead of `src/about.json`). `home.json` is now a standalone route file without its own routes block.
- [x] **Fix TUTORIAL.md project structure**: updated the project structure section to correctly describe how `content.json` acts as the main entry with routes, and how `home.json` and `about.json` are linked pages.

=====================
<br/>
copyright 2026 by web3stick.near
