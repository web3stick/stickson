# LLM Guide for Stickson

Stickson is a JSON framework for generating static HTML pages.

## How It Works

1. User writes a `content.json` file with page structure
2. Stickson validates the JSON against a schema
3. A template engine inserts content into HTML
4. Output is generated as static HTML files

## Content JSON Schema

### Top-level Fields

```json
{
  "version": "1.0",
  "meta": { ... },
  "theme": { ... },
  "template": { ... },
  "routes": { ... },
  "page": { ... }
}
```

### Page Structure

```json
{
  "page": {
    "head": [
      { "type": "style", "content": "body { color: blue; }" }
    ],
    "body": [
      { "type": "h1", "content": "Hello" },
      { "type": "p", "content": "Paragraph text" },
      { "type": "a", "href": "/about", "content": "About" },
      { "type": "button", "content": "Click", "onclick": "doSomething()" },
      { "type": "img", "src": "/image.png", "alt": "An image" },
      { "type": "nav", "content": [...] },
      { "type": "section", "content": [...] },
      { "type": "div", "content": [...] },
      { "type": "ul", "content": [...] },
      { "type": "custom", "tag": "my-element", "content": "..." }
    ]
  }
}
```

### Supported Element Types

| Type                                    | Content             | Attributes                                |
| --------------------------------------- | ------------------- | ----------------------------------------- |
| p, h1-h6, span                          | string              | id, class, attrs                          |
| a                                       | string              | href, target, rel, id, class, attrs       |
| button                                  | string              | onclick, id, class, attrs                 |
| img                                     | -                   | src, alt, width, height, id, class, attrs |
| nav, section, div, header, footer, main | element[]           | id, class, attrs                          |
| ul, ol                                  | li[]                | id, class, attrs                          |
| li                                      | string or a         | id, class, attrs                          |
| script                                  | -                   | src, async, defer, id, class, attrs       |
| style                                   | string              | id, class, attrs                          |
| custom                                  | string or element[] | tag, id, class, attrs                     |

### Meta Fields

```json
{
  "meta": {
    "title": "Page Title",
    "description": "Page description for SEO",
    "author": "Author Name",
    "lang": "en",
    "favicon": "/favicon.ico",
    "ogImage": "/og-image.png"
  }
}
```

### Theme Configuration

```json
{
  "theme": {
    "name": "minimal",
    "cssFile": "/custom.css",
    "customCss": "body { background: #f0f0f0; }"
  }
}
```

### Routes

```json
{
  "routes": {
    "about": "about.json",
    "blog": "blog.json"
  }
}
```

## Generating Content

When generating pages with stickson, produce valid `content.json` following this schema. The page.body array can contain any of the element types listed above. Use routes to link between multiple pages.

## Code Style

Stickson code uses:

- snake_case for functions and variables
- ALL_CAPS for constants
- `//` single-line comments (no `/* */`)
- `======` wrapped console logs for data operations
