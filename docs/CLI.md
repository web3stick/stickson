# Stickson CLI Reference

Complete reference for all `stickson` CLI commands.

## Global Flags

These flags work with every command:

| Flag           | Description               |
| -------------- | ------------------------- |
| `-h`, `--help` | Show help for any command |

## Commands

---

### `stickson create <name>`

Scaffold a new project directory with a minimal setup.

```bash
stickson create my-site
```

**Arguments:**

| Argument | Description                       |
| -------- | --------------------------------- |
| `name`   | Project directory name (required) |

**Behavior:**

- Creates `./<name>/` directory
- Creates `src/content.json` with a starter template
- Creates `package.json` with build/dev/validate scripts
- Creates `README.md`
- Runs `bun install` automatically

**Exit codes:** `0` success, `1` error (directory already exists or install failed)

---

### `stickson validate <file>`

Validate a JSON content file against the stickson schema.

```bash
stickson validate src/content.json
```

**Arguments:**

| Argument | Description                               |
| -------- | ----------------------------------------- |
| `file`   | Path to a `.json` content file (required) |

**Output:**

- Success: `====== Validation passed ======`
- Failure: `====== Validation failed ======` with per-error path and message

**Exit codes:** `0` valid, `1` invalid or file not found

---

### `stickson build [options] [input]`

Build static HTML pages from JSON content file(s).

```bash
stickson build                    # uses content.json in cwd
stickson build src/content.json   # single file
stickson build src/               # all .json in directory
```

**Arguments:**

| Argument | Description                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------ |
| `input`  | Path to `.json` file or directory of `.json` files (optional, defaults to `content.json` in cwd) |

**Options:**

| Option        | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| `--single`    | Output a single HTML file with inlined JS/CSS (default: separate files) |
| `--out <dir>` | Output directory (default: `./dist`)                                    |

**Output:**

- Per-file: `====== Building: <path> ======` then `====== Build complete: <pages> ======`
- On failure: `====== Build failed ======` with error messages

**Exit codes:** `0` all succeeded, `1` one or more failed

---

### `stickson dev <file>`

Watch JSON file(s) for changes and rebuild automatically with a live-reload HTTP server.

```bash
stickson dev src/content.json
```

**Arguments:**

| Argument | Description                                      |
| -------- | ------------------------------------------------ |
| `file`   | Path to the main `.json` content file (required) |

**Behavior:**

1. Parses routes from the JSON file to discover linked JSON files
2. Runs an initial build to `out/` (note: `dev` outputs to `out/`, not `dist/`)
3. Watches the main file and all linked files for changes
4. Rebuilds on every file change (500ms debounce)
5. Serves the output at `http://localhost:3000/`
6. Injects a live-reload script into served HTML — page auto-reloads after each rebuild

**Output directory:** `<json-dir>/out/` (hardcoded, not configurable)

**Port:** `3000` (hardcoded)

**Exit codes:** `1` if initial build fails (server does not start)

---

### `stickson serve <file>`

Build once and serve the result with a simple HTTP server. No live reload.

```bash
stickson serve src/content.json
```

**Arguments:**

| Argument | Description                               |
| -------- | ----------------------------------------- |
| `file`   | Path to a `.json` content file (required) |

**Behavior:**

1. Builds the file to `out/` (same as `dev`, outputs to `<json-dir>/out/`)
2. Starts HTTP server at `http://localhost:3000/`
3. Serves static files from the project directory and the `out/` directory

**Output directory:** `<json-dir>/out/` (hardcoded, not configurable)

**Port:** `3000` (hardcoded)

**Exit codes:** `1` if build fails

---

## Output Directory Summary

| Command | Output directory                  |
| ------- | --------------------------------- |
| `build` | `--out <dir>` (default: `./dist`) |
| `dev`   | `<json-dir>/out/`                 |
| `serve` | `<json-dir>/out/`                 |

**Note:** `dev` and `serve` output to `out/` alongside the input JSON file. `build` defaults to `dist/` at the current working directory.

---

## File Path Conventions

- `build` accepts a file path **or** a directory path
  - File: builds that single JSON
  - Directory: builds all `.json` files in it
- `dev` and `serve` require a single file path (the main content entry)
- All paths are resolved relative to the current working directory

---

## Routing

Routes are defined in `content.json` with a `routes` block:

```json
{
  "routes": {
    "home": "home.json",
    "about": "about.json"
  }
}
```

When building, each route produces a corresponding HTML file:

- `home.json` → `dist/home.html`
- `about.json` → `dist/about.html`

Navigation links should point to the output HTML filenames:

```json
{ "type": "a", "href": "about.html", "content": "About" }
```

---

## Exit Codes

| Code | Meaning                                                       |
| ---- | ------------------------------------------------------------- |
| `0`  | Success                                                       |
| `1`  | Error (file not found, validation failed, build failed, etc.) |

---

## Examples

```bash
# Scaffold a new project
stickson create my-site
cd my-site && bun install

# Validate content
stickson validate src/content.json

# Build to dist/ (default)
stickson build src/content.json

# Build to custom directory
stickson build src/content.json --out output/

# Single-file output
stickson build src/content.json --single --out dist/

# Build all JSON files in a directory
stickson build src/

# Watch with live reload
stickson dev src/content.json

# Serve static build
stickson serve src/content.json
```

=====================
<br/>
copyright 2026 by web3stick.near
