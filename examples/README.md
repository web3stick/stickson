# Stickson Examples

Two example sites demonstrating stickson in action.

## Examples

### [vanilla](./vanilla/)

Plain CSS, no frameworks. A minimal two-page site (home + about) using multi-file routing.

### [sleet-css](./sleet-css/)

Uses [@sleet-css/sleet-css](https://www.npmjs.com/package/@sleet-css/sleet-css) loaded from jsDelivr CDN.

## Create a New Project

Short (run inside an example folder after `bun install`):

```sh
bun run build
bun run validate
bun run dev
bun run serve
```

Long (run from the project root):

```sh
bun bin/stickson.js create my-site
```

Or build/validate from root:

```sh
bun bin/stickson.js build examples/vanilla/src/content.json --out examples/vanilla/dist
bun bin/stickson.js validate examples/vanilla/src/content.json
bun bin/stickson.js dev examples/vanilla/src/content.json
bun bin/stickson.js serve examples/vanilla/src/content.json
```

=====================
<br/>
copyright 2026 by web3stick.near
