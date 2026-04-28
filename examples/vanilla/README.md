# Stickson Vanilla Example

A minimal stickson site using plain CSS — no frameworks, no build tools.

## Quick Start

```sh
bun install
bun run build
```

Output goes to `dist/`.

## Structure

```
vanilla/
├── src/
│   └── content.json    # All page content in JSON
├── package.json
└── README.md
```

## Customizing

Edit `src/content.json` to change content. Modify the `style` block in `head` to update CSS.

## Commands

- `bun run build` — build the site to `dist/`
- `bun run dev` — watch for changes with live reload
- `bun run validate` — check JSON against the schema
