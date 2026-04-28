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
│   ├── content.json    # Main entry point with routes
│   ├── home.json       # Home page content
│   └── about.json      # About page content
├── package.json
└── README.md
```

## Multi-page Pattern

This example demonstrates multi-page navigation using the `routes` field in `content.json`:

```json
{
  "routes": {
    "home": "home.json",
    "about": "about.json"
  }
}
```

Each page JSON file has its own `meta`, `page.head`, and `page.body`. Link between pages with relative HTML filenames:

```json
{ "type": "a", "href": "about.html", "content": "About" }
```

## Commands

- `bun run build` — build all pages to `dist/`
- `bun run dev` — watch for changes with live reload
- `bun run validate` — check JSON against the schema

## Customizing

Edit `src/home.json` or `src/about.json` to change content. Modify the `style` block in `head` to update CSS.
