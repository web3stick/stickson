# Stickson as a Local Dev Dependency

Use stickson as a local dev dependency while developing the stickson package itself, or to pin a specific version for your project.

## When to Use This

- Developing stickson itself (you want `stickson` to refer to your local source)
- Testing a local build of stickson in a real project before publishing
- Pinning a specific local path instead of a version from npm

## Setup

### 1. Add as a local dev dependency

In your project (or the stickson project itself), add the local path:

```bash
bun add -D file:/path/to/stickson
```

For the stickson project developing itself:

```bash
bun add -D file:../stickson
```

Or edit `package.json` directly:

```json
{
  "devDependencies": {
    "@web3stick/stickson": "file:../stickson"
  }
}
```

### 2. Install

```bash
bun install
```

### 3. Use the CLI

```bash
# Now the local stickson binary is available
bunx stickson build src/content.json --out dist
bunx stickson dev src/content.json
bunx stickson validate src/content.json
```

Or call it directly from `node_modules`:

```bash
./node_modules/.bin/stickson build src/content.json --out dist
```

## Using with the Examples

The `examples/vanilla/` and `examples/sleet-css/` directories use this pattern:

```json
{
  "devDependencies": {
    "@web3stick/stickson": "file:../../.."
  }
}
```

To test an example:

```bash
cd examples/vanilla
bun install
bun run build   # builds with the local stickson source
bun run dev     # live reload dev server
```

## Updating After Local Changes

If you make changes to the local stickson source, rebuild first:

```bash
# In the stickson project root
bun run build
git add -A && git commit -m "your changes"
```

Then the examples/dev dependencies that use `file:../..` will pick up the new build on their next `bun run build`.

## Removing the Local Dependency

To switch back to the published npm version:

```bash
bun remove @web3stick/stickson
bun add -D @web3stick/stickson
```

Or edit `package.json` and change the `file:` URL to a version range like `"^0.0.1"`.
