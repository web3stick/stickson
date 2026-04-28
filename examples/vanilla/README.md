# Stickson Vanilla Example

A minimal stickson site using plain CSS — no frameworks, no build tools. Demonstrates multi-file routing (home + about pages).

## Customizing

Edit `src/home.json` or `src/about.json` to change content. The `routes` field in `src/content.json` links pages together:

```json
{
  "routes": {
    "home": "home.json",
    "about": "about.json"
  }
}
```

## Commands

Short (run inside this folder):

```sh
bun install
bun run build
bun run validate
bun run dev
bun run serve
```

Long (run from project root):

```sh
bun bin/stickson.js build examples/vanilla/src/content.json --out examples/vanilla/dist
bun bin/stickson.js validate examples/vanilla/src/content.json
bun bin/stickson.js dev examples/vanilla/src/content.json
bun bin/stickson.js serve examples/vanilla/src/content.json
```

=====================
<br/>
copyright 2026 by web3stick.near
