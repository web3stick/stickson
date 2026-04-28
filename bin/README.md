# Run stickson from source (no install)

After `bun install`, run directly from source with `bun bin/stickson.js`:

```sh
bun bin/stickson.js help
bun bin/stickson.js create my-site
bun bin/stickson.js validate examples/home.json
bun bin/stickson.js build examples/home.json --out examples/out
bun bin/stickson.js serve examples/home.json
bun bin/stickson.js dev examples/home.json
```

# Installed CLI (after `bun install -g`)

Once installed globally, use the `stickson` command:

```sh
stickson help
stickson create my-site
stickson validate examples/home.json
stickson build examples/home.json --out examples/out
stickson serve examples/home.json
stickson dev examples/home.json
```
