# Stickson Tutorial — Build Your First Site

This tutorial walks you through creating a stickson site from scratch.

## Prerequisites

- [Bun](https://bun.sh) installed

## 1. Install Stickson

```sh
bun add -g @web3stick/stickson
```

Verify the installation:

```sh
stickson --help
```

## 2. Create a New Project

Create a project directory and initialize it:

```sh
mkdir my-site && cd my-site
bun init -y
bun add -D @web3stick/stickson
```

## 3. Create Your First Page

Create `src/content.json` with your page content:

```json
{
  "version": "1.0",
  "meta": {
    "title": "My First Stickson Site",
    "description": "A site built with stickson",
    "lang": "en"
  },
  "page": {
    "head": [
      {
        "type": "style",
        "content": "body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }"
      }
    ],
    "body": [
      { "type": "h1", "content": "Hello World" },
      { "type": "p", "content": "Welcome to my stickson site." }
    ]
  }
}
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "build": "stickson build src/content.json --out dist",
    "dev": "stickson dev src/content.json",
    "validate": "stickson validate src/content.json"
  }
}
```

## 4. Validate and Build

Validate your JSON against the schema:

```sh
bun run validate
```

Build your static site:

```sh
bun run build
```

Output goes to `dist/index.html`.

## 5. Add Multi-page Navigation

Create a second page `src/about.json`:

```json
{
  "version": "1.0",
  "meta": {
    "title": "About",
    "lang": "en"
  },
  "page": {
    "head": [
      {
        "type": "style",
        "content": "body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }"
      }
    ],
    "body": [
      { "type": "h1", "content": "About" },
      { "type": "p", "content": "This is the about page." }
    ]
  }
}
```

Add routes to `content.json`:

```json
{
  "routes": {
    "home": "home.json",
    "about": "about.json"
  }
}
```

Link between pages using relative HTML filenames:

```json
{ "type": "a", "href": "about.html", "content": "About" }
```

Build again — all pages are output to `dist/`:

```sh
bun run build
```

## 6. Add Theming

Use a built-in theme:

```json
{
  "theme": {
    "name": "minimal"
  }
}
```

Or load a custom CSS file from CDN:

```json
{
  "theme": {
    "cssFile": "https://cdn.jsdelivr.net/npm/@sleet-css/sleet-css/css-out/main.css"
  }
}
```

Or inline custom CSS:

```json
{
  "theme": {
    "customCss": "body { background: #f0f0f0; }"
  }
}
```

## 7. Serve Locally

Start a development server with live reload:

```sh
bun run dev
```

This watches your JSON files and rebuilds on changes.

## Project Structure

A typical stickson project looks like this:

```
my-site/
├── src/
│   ├── content.json    # Main entry file (becomes index.html) + routes
│   ├── home.json       # Home page content (when linked via routes)
│   └── about.json      # About page content
├── dist/              # Built output (default)
├── package.json
└── README.md
```

The main entry file (`content.json`) defines routes to other JSON files. When you build, each route produces a corresponding HTML file:

## Common Element Types

| Element                 | Description                      |
| ----------------------- | -------------------------------- |
| `h1`, `h2`, ...         | Headings                         |
| `p`                     | Paragraph                        |
| `a`                     | Link (use `href`)                |
| `button`                | Button (use `onclick`)           |
| `img`                   | Image (use `src`, `alt`)         |
| `nav`, `section`, `div` | Containers with nested `content` |
| `ul`, `ol`              | Lists with `li` items            |
| `style`                 | Inline CSS in `<head>`           |
| `script`                | JavaScript (use `src`)           |
| `custom`                | Custom HTML tag (use `tag`)      |

## Next Steps

- Browse the [CSS Guide](CSS_GUIDE.md) for styling tips
- Check the [LLM Reference](LLM.md) for the full schema
- Use `bunx stickson create` to scaffold a new project

=====================
<br/>
copyright 2026 by web3stick.near
