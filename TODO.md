# TODO



- [ ] 👋 made some chages to this list sicne last run, ai did it make sure that eveything makes sice before doing, remmeber the goal to make this a more solid package
- [ ] Replace all npm references with bun in docs/INSTALL.md — `npm install` → `bun add`, `npm install -g` → `bun add -g`, `npm run` → `bun run`, etc. Keep npm package name references (e.g. `@web3stick/stickson` on npm). Do NOT change docs that are already correct.
- [ ] Replace all npm references with bun in docs/DEV_DEPENDENCY.md — same pattern as above. All `npm install`, `npm run`, `npm uninstall` commands should use bun equivalents.
- [ ] Fix sleet-css example to use @sleet-css/sleet-css via jsdelivr CDN — the `examples/sleet-css/src/content.json` currently uses `theme.name: "minimal"` with a local `cssFile` path that doesn't exist. Replace the `theme` block to use `theme.cssFile` pointing to the jsdelivr URL: `https://cdn.jsdelivr.net/npm/@sleet-css/sleet-css/css-out/main.css`. Update the `examples/sleet-css/README.md` to reflect this change and remove the "minimal/dark theme" mention since it's using the real @sleet-css package.
- [ ] Fix examples so they run without dependency installation issues — examples currently use `"@web3stick/stickson": "file:../../.."` which causes `bun install` to fail in the example directory. Fix by: removing the `devDependencies` with `file:` path from `examples/vanilla/package.json` and `examples/sleet-css/package.json`, updating the `build` script to use `bunx stickson` (globally installed or bunx) instead of relying on the local file dep, OR: keep the dep but change it so examples can be tested from the root project using `bun run build:examples` pattern. Goal: user should be able to run `bun bin/stickson.js build examples/vanilla/src/content.json --out /tmp/vanilla-test` without errors.
- [ ] Test examples build cleanly — after fixing examples, verify both `examples/vanilla/` and `examples/sleet-css/` build without errors using the updated approach.

=====================
<br/>
copyright 2026 by web3stick.near
