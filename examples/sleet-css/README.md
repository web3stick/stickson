# Stickson Sleet-CSS Example

A stickson site using @sleet-css/sleet-css for styling via CDN.

## Quick Start

```sh
bun install
bun run build
```

Output goes to `dist/`.

## Structure

```
sleet-css/
├── src/
│   └── content.json    # All page content in JSON
├── package.json
└── README.md
```

## Theming

This example uses @sleet-css/sleet-css loaded from jsDelivr CDN. The `theme.cssFile` in `content.json` points to the CDN URL:

```json
{
  "theme": {
    "cssFile": "https://cdn.jsdelivr.net/npm/@sleet-css/sleet-css/css-out/main.css"
  }
}
```

You can switch to a different CSS file by changing `theme.cssFile` or by providing your own CSS via `theme.customCss`.

## Customizing

Edit `src/content.json` to change content. Add custom styles in the `head` style block to override or extend the theme.

## Commands

- `bun run build` — build the site to `dist/`
- `bun run dev` — watch for changes with live reload
- `bun run validate` — check JSON against the schema
