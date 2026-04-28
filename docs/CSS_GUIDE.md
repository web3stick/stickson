# @web3stick/stickson — CSS Guide

Stickson generates HTML with a predictable structure. This guide shows how to target each element.

## HTML Structure

```html
<body>
  <!-- page.body elements rendered here -->

  <header>
    <h1>...</h1>
    <nav>
      <a>...</a>
    </nav>
  </header>

  <main>
    <section>
      <h2>...</h2>
      <p>...</p>
    </section>
  </main>

  <footer>
    <p>...</p>
  </footer>
</body>
```

## Targeting Elements

### By HTML tag

```css
h1 {
  font-size: 2.5rem;
}
p {
  margin: 1em 0;
}
a {
  color: blue;
}
button {
  padding: 0.5rem 1rem;
}
```

### By class

Elements with `class` in JSON get that class:

```css
.hero-title {
  font-size: 3rem;
}
.nav-link {
  color: white;
}
```

```json
{ "type": "h1", "class": "hero-title", "content": "Welcome" }
```

### By ID

```css
#main-content {
  max-width: 800px;
}
#hero {
  background: cover;
}
```

```json
{ "type": "div", "id": "main-content", "content": [...] }
```

### By attribute

```css
a[href^="https"] {
  color: green;
}
img[width="100"] {
  max-width: 100%;
}
```

## Common Patterns

### Centered content

```css
body {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
```

### Navigation

```css
nav {
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  padding: 0.25rem 0.5rem;
}

nav a:hover {
  text-decoration: underline;
}
```

### Section spacing

```css
section {
  margin: 2rem 0;
}
```

### Footer at bottom

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

footer {
  margin-top: auto;
}
```

## Using Themes

Themes are stored in `themes/<name>/theme.css`. Apply via content.json:

```json
{
  "theme": {
    "name": "minimal"
  }
}
```

Or use a custom CSS file:

```json
{
  "theme": {
    "cssFile": "/my-theme.css"
  }
}
```

Or inline custom CSS:

```json
{
  "theme": {
    "customCss": "body { background: #1a1a1a; color: white; }"
  }
}
```

## Built-in Themes

### minimal

Clean, light theme with system fonts. Good starting point.

### dark

Dark background with light text. High contrast.
