import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// ============================================================
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const THEMES_DIR = path.resolve(__dirname, "../themes");

export interface theme_config {
  name: string;
  cssFile: string;
  preview?: string;
  description?: string;
}

// ============================================================
export function list_themes(): theme_config[] {
  console.log("====== Listing available themes ======");
  if (!fs.existsSync(THEMES_DIR)) {
    return [];
  }

  const entries = fs.readdirSync(THEMES_DIR, { withFileTypes: true });
  const themes: theme_config[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const themePath = path.join(THEMES_DIR, entry.name);
      const cssPath = path.join(themePath, "theme.css");
      const previewPath = path.join(themePath, "preview.png");

      if (fs.existsSync(cssPath)) {
        themes.push({
          name: entry.name,
          cssFile: cssPath,
          preview: fs.existsSync(previewPath) ? previewPath : undefined,
        });
      }
    }
  }

  return themes;
}

export function get_theme_css(themeName: string): string | null {
  console.log(`====== Loading theme: ${themeName} ======`);
  const themePath = path.join(THEMES_DIR, themeName, "theme.css");

  if (!fs.existsSync(themePath)) {
    console.log(`====== Theme not found: ${themeName} ======`);
    return null;
  }

  return fs.readFileSync(themePath, "utf-8");
}

export function resolve_theme(data: {
  theme?: { name?: string; cssFile?: string; customCss?: string };
}): {
  cssFile: string | null;
  customCss: string | null;
} {
  if (!data.theme) {
    return { cssFile: null, customCss: null };
  }

  if (data.theme.cssFile) {
    return {
      cssFile: data.theme.cssFile,
      customCss: data.theme.customCss || null,
    };
  }

  if (data.theme.name) {
    const css = get_theme_css(data.theme.name);
    return { cssFile: css, customCss: data.theme.customCss || null };
  }

  if (data.theme.customCss) {
    return { cssFile: null, customCss: data.theme.customCss };
  }

  return { cssFile: null, customCss: null };
}
