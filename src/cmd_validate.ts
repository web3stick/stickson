import { validate_file } from "./json_validator.js";

// ============================================================
export function run_validate(args: string[]) {
  if (args.includes("-h") || args.includes("--help")) {
    console.log(`Usage: stickson validate <file.json>
  Validate a JSON content file against the stickson schema.
  Example: stickson validate src/content.json`);
    process.exit(0);
  }

  const filePath = args[0];
  if (!filePath) {
    console.error("Usage: stickson validate <file.json>");
    process.exit(1);
  }

  console.log(`====== Validating: ${filePath} ======`);
  const result = validate_file(filePath);

  if (result.valid) {
    console.log("====== Validation passed ======");
    process.exit(0);
  }

  console.error("====== Validation failed ======");
  for (const err of result.errors) {
    console.error(`  ${err.path}: ${err.message}`);
  }
  process.exit(1);
}
