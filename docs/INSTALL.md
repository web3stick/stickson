# Stickson - Install Guide

Stickson is a JSON framework for making static pages.

## Quick Start

```bash
# Install stickson globally
npm install -g stickson

# Create a new project
stickson create my-site
cd my-site
npm install

# Build the site
npm run build

# Or serve with live reload
npm run dev
```

## Project Structure

After creating a project, you'll have:

```
my-site/
├── content.json    # Your page content
├── package.json    # Project config
└── out/            # Built output
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

- `stickson create <name>` - Scaffold a new project
- `stickson validate <file>` - Validate JSON against schema
- `stickson build [--single]` - Build static pages
- `stickson serve <file>` - Serve with live reload
- `stickson dev <file>` - Watch and rebuild on changes

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
