import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { parse_routes } from "./route_resolver.js";

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

function inject_live_reload(html: string): string {
  const script = `<script>
(function() {
  let lastReload = 0;
  function checkReload() {
    fetch('/__reload?t=' + Date.now()).then(function(r) {
      if (r.ok && r.text() === 'reload') {
        lastReload = Date.now();
        location.reload();
      }
    });
  }
  setInterval(checkReload, 1000);
})();
</script>`;
  return html.replace("</body>", script + "</body>");
}

// ============================================================
export async function run_dev(args: string[]) {
  const filePath = args[0];
  if (!filePath) {
    console.error("Usage: stickson dev <file.json>");
    process.exit(1);
  }

  const jsonFile = path.resolve(filePath);
  const dir = path.dirname(jsonFile);
  const outDir = path.join(dir, "out");

  // Parse routes to find all linked JSON files
  const raw = fs.readFileSync(jsonFile, "utf-8");
  const jsonData = JSON.parse(raw);
  const routes = parse_routes(jsonFile, jsonData);

  // Build list of all JSON files to watch (main + linked)
  const linkedFiles = routes
    .map((r) => r.jsonPath)
    .filter((p) => p !== jsonFile);

  console.log(`====== Watching: ${jsonFile} ======`);
  if (linkedFiles.length > 0) {
    console.log(
      `====== Also watching linked: ${linkedFiles.join(", ")} ======`,
    );
  }

  let needsRebuild = false;

  async function build() {
    needsRebuild = false;
    console.log("====== File changed, rebuilding ======");
    const mod = await import("./index.js");
    const result = mod.build_pages(jsonFile, { outDir });
    if (result.success) {
      console.log(
        `====== Built ${result.pages.length} pages ======`,
      );
    } else {
      console.error("====== Build failed ======");
      for (const err of result.errors) {
        console.error(`  ${err}`);
      }
    }
  }

  // Watch the main file
  fs.watch(jsonFile, (eventType) => {
    if (eventType === "change") {
      needsRebuild = true;
    }
  });

  // Watch all linked JSON files
  for (const linkedFile of linkedFiles) {
    fs.watch(linkedFile, (eventType) => {
      if (eventType === "change") {
        needsRebuild = true;
      }
    });
  }

  // Initial build
  const mod = await import("./index.js");
  const buildResult = mod.build_pages(jsonFile, { outDir });
  if (buildResult.success) {
    console.log(`====== Built ${buildResult.pages.length} pages ======`);
  } else {
    console.error("====== Build failed ======");
    for (const err of buildResult.errors) {
      console.error(`  ${err}`);
    }
    process.exit(1);
  }

  // Polling loop for rebuilds (every 500ms) - start AFTER initial build
  setInterval(() => {
    if (needsRebuild) {
      build();
    }
  }, 500);

  // HTTP server
  const PORT = 3000;
  const server = http.createServer((req, res) => {
    let url = req.url || "/";

    // Live reload trigger endpoint
    if (url.startsWith("/__reload")) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("reload");
      return;
    }

    if (url === "/" || url === "/index.html") {
      const outPath = path.join(outDir, "index.html");
      if (fs.existsSync(outPath)) {
        let html = fs.readFileSync(outPath, "utf-8");
        html = inject_live_reload(html);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
        return;
      }
    }

    const requestedPath = path.join(dir, url);
    if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
      res.writeHead(200, { "Content-Type": get_mime_type(requestedPath) });
      res.end(fs.readFileSync(requestedPath));
      return;
    }

    const outPath = path.join(outDir, url);
    if (fs.existsSync(outPath)) {
      let html = fs.readFileSync(outPath, "utf-8");
      html = inject_live_reload(html);
      res.writeHead(200, { "Content-Type": get_mime_type(outPath) });
      res.end(html);
      return;
    }

    const indexPath = path.join(outDir, "index.html");
    if (fs.existsSync(indexPath)) {
      let html = fs.readFileSync(indexPath, "utf-8");
      html = inject_live_reload(html);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  });

  server.listen(PORT, () => {
    console.log(
      `====== Dev server running at http://localhost:${PORT}/ ======`,
    );
  });
}
