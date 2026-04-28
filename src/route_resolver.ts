import * as fs from "fs";
import * as path from "path";

// ============================================================
export interface route_entry {
  name: string;
  jsonPath: string;
  outputPath: string;
}

export interface content_file {
  version: string;
  routes?: Record<string, string>;
  template?: {
    file?: string;
    headExtra?: string;
    bodyExtra?: string;
  };
  page: {
    head: unknown[];
    body: unknown[];
  };
  [key: string]: unknown;
}

// ============================================================
export function parse_routes(
  mainJsonPath: string,
  jsonData: content_file,
): route_entry[] {
  console.log("====== Parsing routes from JSON ======");
  const routes: route_entry[] = [];

  const baseDir = path.dirname(mainJsonPath);
  const outDir = path.join(baseDir, "out");

  routes.push({
    name: "main",
    jsonPath: mainJsonPath,
    outputPath: path.join(outDir, "index.html"),
  });

  if (jsonData.routes) {
    for (const [name, relPath] of Object.entries(jsonData.routes)) {
      const resolvedPath = path.resolve(baseDir, relPath);
      routes.push({
        name,
        jsonPath: resolvedPath,
        outputPath: path.join(
          outDir,
          name === "main" ? "index.html" : `${name}.html`,
        ),
      });
    }
  }

  console.log(`====== Found ${routes.length} routes ======`);
  return routes;
}

export function load_linked_json(jsonPath: string): content_file | null {
  console.log(`====== Loading linked JSON: ${jsonPath} ======`);

  if (!fs.existsSync(jsonPath)) {
    console.log(`====== File not found: ${jsonPath} ======`);
    return null;
  }

  try {
    const raw = fs.readFileSync(jsonPath, "utf-8");
    return JSON.parse(raw) as content_file;
  } catch (err) {
    console.log(`====== Failed to parse JSON: ${jsonPath} ======`);
    return null;
  }
}

export function resolve_all_routes(
  mainJsonPath: string,
  jsonData: content_file,
): Map<string, content_file> {
  const routes = parse_routes(mainJsonPath, jsonData);
  const resolved = new Map<string, content_file>();

  resolved.set("main", jsonData);

  if (jsonData.routes) {
    for (const [name, relPath] of Object.entries(jsonData.routes)) {
      const resolvedPath = path.resolve(path.dirname(mainJsonPath), relPath);
      const data = load_linked_json(resolvedPath);
      if (data) {
        resolved.set(name, data);
      }
    }
  }

  return resolved;
}
