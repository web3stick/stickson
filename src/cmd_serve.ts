import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { build_pages } from "./page_builder.js";

// ============================================================
function get_mime_type(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mime_types: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };
  return mime_types[ext] || "application/octet-stream";
}

function serve_file(res: http.ServerResponse, filePath: string): void {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }
    res.writeHead(200, { "Content-Type": get_mime_type(filePath) });
    res.end(data);
  });
}

export function run_serve(args: string[]) {
  if (args.includes("-h") || args.includes("--help")) {
    console.log(`Usage: stickson serve <file.json>
  Build once and serve the result with a simple HTTP server (no live reload).
  Example: stickson serve src/content.json`);
    return;
  }

  const filePath = args[0];
  if (!filePath) {
    console.error("Usage: stickson serve <file.json>");
    process.exit(1);
  }

  const jsonFile = path.resolve(filePath);
  const dir = path.dirname(jsonFile);
  const outDir = path.join(dir, "out");

  console.log(`====== Building: ${jsonFile} ======`);
  const result = build_pages(jsonFile, { outDir });

  if (!result.success) {
    console.error("====== Build failed ======");
    for (const err of result.errors) {
      console.error(`  ${err}`);
    }
    process.exit(1);
  }

  console.log(`====== Serving: ${jsonFile} ======`);

  const PORT = 3000;
  const server = http.createServer((req, res) => {
    let url = req.url || "/";

    if (url === "/" || url === "/index.html") {
      const outPath = path.join(dir, "out", "index.html");
      if (fs.existsSync(outPath)) {
        serve_file(res, outPath);
        return;
      }
      serve_file(res, jsonFile);
      return;
    }

    if (url === "/content.json") {
      serve_file(res, jsonFile);
      return;
    }

    const requestedPath = path.join(dir, url);
    if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
      serve_file(res, requestedPath);
      return;
    }

    const outPath = path.join(dir, "out", url);
    if (fs.existsSync(outPath)) {
      serve_file(res, outPath);
      return;
    }

    const indexPath = path.join(dir, "out", "index.html");
    if (fs.existsSync(indexPath)) {
      serve_file(res, indexPath);
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  });

  server.listen(PORT, () => {
    console.log(`====== Server running at http://localhost:${PORT}/ ======`);
  });
}
