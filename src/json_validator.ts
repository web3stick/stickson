import Ajv from "ajv";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import addFormats from "ajv-formats";

// ============================================================
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCHEMA_PATH = path.resolve(__dirname, "../schema/content-schema.json");

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

let schemaCache: object | null = null;

function load_schema(): object {
  if (schemaCache) return schemaCache;
  console.log("====== Loading content schema ======");
  const raw = fs.readFileSync(SCHEMA_PATH, "utf-8");
  schemaCache = JSON.parse(raw);
  return schemaCache!;
}

// ============================================================
export interface validate_result {
  valid: boolean;
  errors: Array<{ path: string; message: string }>;
}

export function validate_content_json(json: object): validate_result {
  const schema = load_schema();
  const validate = ajv.compile(schema);
  const valid = validate(json);

  if (valid) {
    console.log("====== JSON validation passed ======");
    return { valid: true, errors: [] };
  }

  const errors = (validate.errors || []).map((err) => ({
    path: err.instancePath || "/",
    message: err.message || "Unknown error",
  }));

  console.log("====== JSON validation failed ======");
  return { valid: false, errors };
}

export function validate_file(filePath: string): validate_result {
  console.log(`====== Validating file: ${filePath} ======`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(raw);
  return validate_content_json(json);
}
