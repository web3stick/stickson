import * as path from "path";
import * as fs from "fs";
import { build_pages } from "./page_builder.js";

// ============================================================
export function run_build(args: string[]) {
  let single = false;
  let outDir: string | undefined;
  let inputFile: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--single") {
      single = true;
    } else if (arg === "--out" && i + 1 < args.length) {
      outDir = args[++i];
    } else if (!arg.startsWith("-")) {
      inputFile = arg;
    }
  }

  if (!inputFile) {
    const cwd = process.cwd();
    const defaultPath = path.join(cwd, "content.json");
    if (fs.existsSync(defaultPath)) {
      inputFile = defaultPath;
    } else {
      console.error(
        "Usage: stickson build [--single] [--out <dir>] [input.json|dir]",
      );
      console.error(
        "  --single    Output a single HTML file with inlined JS/CSS",
      );
      console.error("  --out <dir> Output directory (default: ./dist)");
      console.error("  If input is a directory, builds all .json files in it");
      process.exit(1);
    }
  }

  const resolvedInput = path.resolve(inputFile);
  let inputFiles: string[] = [];

  if (!fs.existsSync(resolvedInput)) {
    console.error(`Path does not exist: ${resolvedInput}`);
    process.exit(1);
  }

  if (fs.statSync(resolvedInput).isDirectory()) {
    // Collect all .json files in the directory
    const entries = fs.readdirSync(resolvedInput, { withFileTypes: true });
    inputFiles = entries
      .filter((e) => e.isFile() && e.name.endsWith(".json"))
      .map((e) => path.join(resolvedInput, e.name));

    if (inputFiles.length === 0) {
      console.error(`No .json files found in directory: ${resolvedInput}`);
      process.exit(1);
    }
    console.log(
      `====== Building ${inputFiles.length} files from directory ======`,
    );
  } else {
    inputFiles = [resolvedInput];
  }

  let allSuccess = true;

  for (const file of inputFiles) {
    console.log(`====== Building: ${file} ======`);
    const result = build_pages(file, { single, outDir });

    if (result.success) {
      console.log(`====== Build complete: ${result.pages.join(", ")} ======`);
    } else {
      console.error("====== Build failed ======");
      for (const err of result.errors) {
        console.error(`  ${err}`);
      }
      allSuccess = false;
    }
  }

  if (!allSuccess) {
    process.exit(1);
  }
}
