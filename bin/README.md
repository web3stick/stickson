# Run stickson directly with bun

After `bun install`, use the global `stickson` CLI:

```sh
stickson help
stickson create my-site
stickson validate examples/home.json
stickson build examples/home.json --out examples/out
stickson serve examples/home.json
stickson dev examples/home.json
```

Or run from source without installing:

```sh
bun bin/stickson.js help
bun bin/stickson.js serve examples/home.json
```
