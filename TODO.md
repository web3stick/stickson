# TODO

BIG FOUR

- working examples
- builds working, verify by checking output files
- docs
- keep this todo formatted this way, work on the to items check completed, rm completed from previous run, add new ones that focus on these four items. test, and verify that our package has the features we need

---

- [x] 1. README.md — REMOVE the entire "Examples" section (the vanilla + sleet-css code blocks). Those belong in each example's own README.

- [ ] 2. examples/README.md — CREATE:
  - Simple README for the examples folder with:
    - Overview of both examples (vanilla, sleet-css) pointing to each
    - Create command section:
      Short:
      ```sh
      bun bin/stickson.js create my-site
      ```
      Long (from project root):
      ```sh
      bun bin/stickson.js create examples/vanilla/my-site
      ```

- [ ] 3. examples/vanilla/README.md — SIMPLIFY:
  - Remove tree directory structure
  - Add two code blocks (short = run inside example folder, long = run from project root). Include ALL CLI commands: build, validate, serve, dev.
    Short:
    ```sh
    bun install
    bun run build
    bun run validate
    bun run dev
    bun run serve
    ```
    Long:
    ```sh
    bun bin/stickson.js build examples/vanilla/src/content.json --out examples/vanilla/dist
    bun bin/stickson.js validate examples/vanilla/src/content.json
    bun bin/stickson.js dev examples/vanilla/src/content.json
    bun bin/stickson.js serve examples/vanilla/src/content.json
    ```

- [ ] 4. examples/sleet-css/README.md — SIMPLIFY:
  - Remove tree directory structure
  - Add two code blocks (short = run inside example folder, long = run from project root). Include ALL CLI commands: build, validate, serve, dev.
    Short:
    ```sh
    bun install
    bun run build
    bun run validate
    bun run dev
    bun run serve
    ```
    Long:
    ```sh
    bun bin/stickson.js build examples/sleet-css/src/content.json --out examples/sleet-css/dist
    bun bin/stickson.js validate examples/sleet-css/src/content.json
    bun bin/stickson.js dev examples/sleet-css/src/content.json
    bun bin/stickson.js serve examples/sleet-css/src/content.json
    ```

=====================
<br/>
copyright 2026 by web3stick.near
