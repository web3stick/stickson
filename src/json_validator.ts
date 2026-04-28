import Ajv from "ajv";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import addFormats from "ajv-formats";

// ============================================================
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCHEMA_PATH = path.resolve(__dirname, "../schema/content-schema.json");

const ajv = new Ajv({ allErrors: true, strict: true, allowUnionTypes: true });
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

  const errors = (validate.errors || []).map((err) => {
    let message = err.message || "Unknown error";

    // Build a user-friendly message based on the error keyword
    if (err.keyword === "required") {
      const paramKey = err.params?.missingProperty || "";
      message = `missing required field: '${paramKey}'`;
    } else if (err.keyword === "type") {
      const expected = err.params?.type || "";
      const received = typeof err.data;
      message = `expected ${expected}, got ${received}`;
    } else if (err.keyword === "enum") {
      const allowed = err.params?.allowedValues?.join(", ");
      message = `must be one of: ${allowed}`;
    } else if (err.keyword === "pattern") {
      message = `does not match required pattern`;
    } else if (err.keyword === "minimum" || err.keyword === "maximum") {
      message = err.message || message;
    }

    return {
      path: err.instancePath || "/",
      message,
    };
  });

  console.log("====== JSON validation failed ======");
  return { valid: false, errors };
}

export function validate_file(filePath: string): validate_result {
  console.log(`====== Validating file: ${filePath} ======`);
  const raw = fs.readFileSync(filePath, "utf-8");
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return {
      valid: false,
      errors: [{ path: filePath, message: `Invalid JSON: ${message}` }],
    };
  }
  return validate_content_json(json);
}
