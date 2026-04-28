# stickson

JSON framework for making static pages from JSON content files.

---

## Install

```sh
bun install -g @web3stick/stickson
```

Or run from source without installing:

```sh
bun install
bun bin/stickson.js --help
```

---

## Quick Start

Create a content file (`my-page.json`):

```json
{
  "version": "1.0",
  "meta": {
    "title": "My Page",
    "description": "Built with stickson"
  },
  "page": {
    "head": [
      { "type": "title", "content": "My Page" }
    ],
    "body": [
      { "type": "h1", "content": "Hello, stickson!" },
      { "type": "p", "content": "JSON in, HTML out." }
    ]
  }
}
```

Build to static HTML:

```sh
stickson build my-page.json --out dist
```

Serve locally with hot reload:

```sh
stickson dev my-page.json
```

Validate a content file:

```sh
stickson validate my-page.json
```

---

## Commands

### `stickson create <name>`

Scaffold a new stickson project.

### `stickson validate <file.json>`

Validate a content file against the stickson schema.

### `stickson build <file.json> --out <dir>`

Build a content file to static HTML output.

### `stickson serve <file.json>`

Serve a content file locally (auto-builds if needed).

### `stickson dev <file.json>`

Serve with hot reload — rebuilds on file changes.

### `stickson help`

Show all available commands.

---

## Project Structure

```
stickson/
├── bin/stickson.js       CLI entry point
├── dist/                 Compiled JS output
├── schema/               JSON content schemas
├── themes/               CSS themes
└── examples/             Example content files
```

---

## Content JSON Schema

Content files must conform to the schema in `schema/content-schema.json`. Validate with:

```sh
stickson validate examples/home.json
```

---

## License

MIT — copyright 2026 web3stick.near
