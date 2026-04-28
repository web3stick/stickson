# Examples

Run any example with the stickson CLI:

```sh
bun bin/stickson.js serve examples/home.json
bun bin/stickson.js serve examples/about.json
bun bin/stickson.js serve examples/blog.json
```

Or build all to HTML:

```sh
bun bin/stickson.js build examples/home.json --out examples/out
bun bin/stickson.js build examples/about.json --out examples/out
bun bin/stickson.js build examples/blog.json --out examples/out
```

Or use `dev` for watch mode with live reload:

```sh
bun bin/stickson.js dev examples/home.json
```

After `bun install`, the `stickson` command is available globally as a CLI.
