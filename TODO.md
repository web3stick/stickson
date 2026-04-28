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
- [ ] **Document output directory convention**: clarify that `build` outputs to `dist/` by default, not `out/`. Note how `serve` and `dev` resolve the output path — they need to know where build artifacts live. This changed from `out` to `dist` and affects serve. Update any docs that still reference `out/`.
- [ ] **Validate all CLI commands work**: `build`, `validate`, `dev`, `serve` for both vanilla and sleet-css examples. `dev` and `serve` not yet tested — server startup/response unverified.
- [ ] **Build output inspection**: verify built HTML files are correct and complete — confirm the actual output structure matches what docs claim.

=====================
<br/>
copyright 2026 by web3stick.near
