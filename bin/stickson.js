#!/usr/bin/env node

// ============================================================
// stickson CLI entry point
// ============================================================

import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, "../dist");

async function load_command(command) {
  const cmd_path = path.join(SRC_DIR, `${command}.js`);
  if (fs.existsSync(cmd_path)) {
    return await import(cmd_path);
  }
  return null;
}

const args = process.argv.slice(2);
const command = args[0] || "help";

async function main() {
  switch (command) {
    case "create": {
      const mod = await load_command("cmd_create");
      if (mod) mod.run_create(args.slice(1));
      else {
        console.error("create command not found");
        process.exit(1);
      }
      break;
    }
    case "validate": {
      const mod = await load_command("cmd_validate");
      if (mod) mod.run_validate(args.slice(1));
      else {
        console.error("validate command not found");
        process.exit(1);
      }
      break;
    }
    case "build": {
      const mod = await load_command("cmd_build");
      if (mod) mod.run_build(args.slice(1));
      else {
        console.error("build command not found");
        process.exit(1);
      }
      break;
    }
    case "serve": {
      const mod = await load_command("cmd_serve");
      if (mod) mod.run_serve(args.slice(1));
      else {
        console.error("serve command not found");
        process.exit(1);
      }
      break;
    }
    case "dev": {
      const mod = await load_command("cmd_dev");
      if (mod) mod.run_dev(args.slice(1));
      else {
        console.error("dev command not found");
        process.exit(1);
      }
      break;
    }
    case "help":
    default:
      console.log(`Stickson - JSON framework for making static pages

Usage: stickson <command> [options]

Commands:
  create <name>     Scaffold a new project
  validate <file>   Validate JSON content file against schema
  build [options]   Build static pages from JSON
  serve <file>      Serve a JSON file (no live reload)
  dev <file>        Watch JSON changes and rebuild automatically

Options for build:
  --single          Output single HTML file with inlined JS/CSS
  --out <dir>       Output directory (default: ./dist)

Examples:
  stickson create my-site
  stickson validate content.json
  stickson build --single
  stickson serve content.json
  stickson dev content.json
`);
      break;
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
