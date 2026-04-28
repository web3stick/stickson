# Stickson Sleet-CSS Example

A stickson site using [@sleet-css/sleet-css](https://www.npmjs.com/package/@sleet-css/sleet-css) loaded from jsDelivr CDN.

## Theming

The `theme.cssFile` in `src/content.json` points to the CDN URL:

```json
{
  "theme": {
    "cssFile": "https://cdn.jsdelivr.net/npm/@sleet-css/sleet-css/css-out/main.css"
  }
}
```

Switch themes or provide your own CSS by changing `theme.cssFile`.

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
bun bin/stickson.js build examples/sleet-css/src/content.json --out examples/sleet-css/dist
bun bin/stickson.js validate examples/sleet-css/src/content.json
bun bin/stickson.js dev examples/sleet-css/src/content.json
bun bin/stickson.js serve examples/sleet-css/src/content.json
```

=====================
<br/>
copyright 2026 by web3stick.near
