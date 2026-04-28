# Stickson Sleet-CSS Example

A stickson site using the built-in minimal theme.

## Quick Start

```sh
npm install
npm run build
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

This example uses the `minimal` theme from stickson. You can switch themes by changing `theme.name` in `content.json` or by providing your own CSS via `theme.cssFile`.

Available themes:

- `minimal` — clean, light, centered layout
- `dark` — dark mode with subtle contrast

## Customizing

Edit `src/content.json` to change content. Add custom styles in the `head` style block to override or extend the theme.
