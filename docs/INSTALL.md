# @web3stick/stickson — Install Guide

Stickson is a JSON framework for making static pages from JSON content files.

## Install globally

```bash
bun add -g @web3stick/stickson
```

## Install as dev dependency

In an existing project, add stickson as a dev dependency:

```bash
bun add -D @web3stick/stickson
```

Then use it via bunx or the local binary:

```bash
bunx stickson build content.json --out dist
# or from node_modules
./node_modules/.bin/stickson build content.json --out dist
```

With a package.json scripts section:

```json
{
  "scripts": {
    "build:site": "stickson build content.json --out dist",
    "dev:site": "stickson dev content.json"
  }
}
```

## Quick Start

```bash
# Install stickson globally
bun add -g @web3stick/stickson

# Create a new project
stickson create my-site
cd my-site
bun install

# Build the site
bun run build

# Or serve with live reload
bun run dev
```

## Project Structure

After creating a project, you'll have:

```
my-site/
├── content.json    # Your page content
├── package.json    # Project config
└── dist/           # Built output
```

## content.json

```json
{
  "version": "1.0",
  "meta": {
    "title": "My Site",
    "description": "A stickson site"
  },
  "page": {
    "head": [],
    "body": [
      { "type": "h1", "content": "Hello World" },
      { "type": "p", "content": "Welcome to my site." }
    ]
  }
}
```

## CLI Commands

- `bunx stickson create <name>` - Scaffold a new project
- `bunx stickson validate <file>` - Validate JSON against schema
- `bunx stickson build [--single]` - Build static pages
- `bunx stickson serve <file>` - Serve with live reload
- `bunx stickson dev <file>` - Watch and rebuild on changes

## Themes

Add a theme in `content.json`:

```json
{
  "theme": {
    "name": "dark"
  }
}
```

Or use custom CSS:

```json
{
  "theme": {
    "customCss": "body { background: #000; }"
  }
}
```

## Routes

Link to other JSON files:

```json
{
  "routes": {
    "about": "about.json",
    "blog": "blog.json"
  }
}
```
