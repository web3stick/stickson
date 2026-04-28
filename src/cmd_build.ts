import * as path from "path";
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
    if (require("fs").existsSync(defaultPath)) {
      inputFile = defaultPath;
    } else {
      console.error(
        "Usage: stickson build [--single] [--out <dir>] [input.json]",
      );
      console.error(
        "  --single    Output a single HTML file with inlined JS/CSS",
      );
      console.error("  --out <dir> Output directory (default: ./out)");
      process.exit(1);
    }
  }

  console.log(`====== Building: ${inputFile} ======`);
  const result = build_pages(inputFile, { single, outDir });

  if (result.success) {
    console.log(`====== Build complete: ${result.pages.join(", ")} ======`);
  } else {
    console.error("====== Build failed ======");
    for (const err of result.errors) {
      console.error(`  ${err}`);
    }
    process.exit(1);
  }
}
