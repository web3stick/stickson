import * as fs from "fs";
import * as path from "path";

import {
  validate_content_json,
  type validate_result,
} from "./json_validator.js";
import { resolve_all_routes, type content_file } from "./route_resolver.js";
import { build_html, type content_data } from "./template_engine.js";
import { resolve_theme } from "./css_themer.js";

// ============================================================
export interface build_options {
  single?: boolean;
  outDir?: string;
  templateHtml?: string;
}

export interface build_result {
  success: boolean;
  pages: string[];
  errors: string[];
}

// ============================================================
export function build_pages(
  mainJsonPath: string,
  options: build_options = {},
): build_result {
  console.log("====== Building pages ======");
  console.log(`====== Input: ${mainJsonPath} ======`);

  const raw = fs.readFileSync(mainJsonPath, "utf-8");
  const jsonData = JSON.parse(raw) as content_file;

  const validation: validate_result = validate_content_json(jsonData);
  if (!validation.valid) {
    return {
      success: false,
      pages: [],
      errors: validation.errors.map((e) => `${e.path}: ${e.message}`),
    };
  }

  const outDir = options.outDir || path.join(path.dirname(mainJsonPath), "out");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const templateHtml = options.templateHtml || read_template(jsonData);

  if (jsonData.routes && Object.keys(jsonData.routes).length > 0) {
    const routes = resolve_all_routes(mainJsonPath, jsonData);
    const pages: string[] = [];

    for (const [name, data] of routes) {
      const { cssFile, customCss } = resolve_theme(data as content_data);
      const html = build_html(data as content_data, templateHtml);

      if (options.single) {
        const inlined = inline_theme(html, cssFile, customCss);
        const outPath =
          name === "main"
            ? path.join(outDir, "index.html")
            : path.join(outDir, `${name}.html`);
        fs.writeFileSync(outPath, inlined);
      } else {
        const outPath =
          name === "main"
            ? path.join(outDir, "index.html")
            : path.join(outDir, `${name}.html`);
        fs.writeFileSync(outPath, html);
      }
      pages.push(name);
    }

    console.log(`====== Built ${pages.length} pages ======`);
    return { success: true, pages, errors: [] };
  }

  const { cssFile, customCss } = resolve_theme(jsonData as content_data);
  let html = build_html(jsonData as content_data, templateHtml);

  if (options.single) {
    html = inline_theme(html, cssFile, customCss);
  }

  const outPath = path.join(outDir, "index.html");
  fs.writeFileSync(outPath, html);

  console.log(`====== Built 1 page ======`);
  return { success: true, pages: ["index"], errors: [] };
}

function read_template(data: content_file): string | undefined {
  if (data.template?.file) {
    if (fs.existsSync(data.template.file)) {
      return fs.readFileSync(data.template.file, "utf-8");
    }
  }
  return undefined;
}

function inline_theme(
  html: string,
  cssFile: string | null,
  customCss: string | null,
): string {
  if (cssFile && fs.existsSync(cssFile)) {
    const css = fs.readFileSync(cssFile, "utf-8");
    const themeTag = `<style>${css}</style>`;
    html = html.replace("{{THEME_CSS}}", themeTag);
  }

  if (customCss) {
    const customTag = `<style>${customCss}</style>`;
    html = html.replace("{{CUSTOM_CSS}}", customTag);
  }

  return html;
}
