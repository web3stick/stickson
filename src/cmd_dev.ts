import * as fs from "fs";
import * as path from "path";

// ============================================================
export function run_dev(args: string[]) {
  const filePath = args[0];
  if (!filePath) {
    console.error("Usage: stickson dev <file.json>");
    process.exit(1);
  }

  const jsonFile = path.resolve(filePath);
  const dir = path.dirname(jsonFile);

  console.log(`====== Watching: ${jsonFile} ======`);

  function build() {
    console.log("====== File changed, rebuilding ======");
    const { build_pages } = require("../index.js");
    build_pages(jsonFile, {});
    console.log("====== Watching for changes... ======");
  }

  fs.watch(jsonFile, (eventType) => {
    if (eventType === "change") {
      build();
    }
  });

  const { build_pages } = require("../index.js");
  build_pages(jsonFile, {});

  console.log("====== Watching for changes... ======");
}
