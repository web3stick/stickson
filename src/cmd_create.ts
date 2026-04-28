import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

// ============================================================
export function run_create(args: string[]) {
  const projectName = args[0];
  if (!projectName) {
    console.error("Usage: stickson create <project-name>");
    process.exit(1);
  }

  const projectPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Error: Directory "${projectName}" already exists`);
    process.exit(1);
  }

  console.log(`====== Creating project: ${projectName} ======`);

  fs.mkdirSync(projectPath, { recursive: true });

  // ---- src/ directory and content.json ----
  const srcPath = path.join(projectPath, "src");
  fs.mkdirSync(srcPath, { recursive: true });

  const contentJson = {
    version: "1.0",
    meta: {
      title: "My Stickson Site",
      description: "A static site built with stickson",
      lang: "en",
    },
    page: {
      head: [],
      body: [
        {
          type: "header",
          content: [
            { type: "h1", content: "Welcome to Stickson" },
            {
              type: "nav",
              content: [
                { type: "a", href: "#about", content: "About" },
                { type: "a", href: "#contact", content: "Contact" },
              ],
            },
          ],
        },
        {
          type: "main",
          content: [
            { type: "h2", content: "Getting Started" },
            {
              type: "p",
              content: "Edit this content.json file to build your static site.",
            },
            {
              type: "button",
              content: "Get Started",
              onclick: "alert('Hello from stickson!')",
            },
          ],
        },
        {
          type: "footer",
          content: [{ type: "p", content: "Built with stickson" }],
        },
      ],
    },
  };

  // ---- schema/ directory ----
  const schemaPath = path.join(projectPath, "schema");
  fs.mkdirSync(schemaPath, { recursive: true });

  // ---- package.json ----
  const pkgJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      build: "stickson build",
      dev: "stickson dev src/content.json",
      validate: "stickson validate src/content.json",
    },
    dependencies: {
      "@web3stick/stickson": "latest",
    },
    stickson: {
      input: "src/content.json",
    },
  };

  // ---- README.md ----
  const readmeContent = `# ${projectName}

A static site built with [stickson](https://github.com/sleet-ai/stickson).

## Getting Started

\`\`\`bash
bun install
bun run dev
\`\`\`

## Commands

\`\`\`bash
bun run build    # Build the site
bun run dev      # Watch for changes with live reload
bun run validate # Validate src/content.json
\`\`\`

## Editing Content

Edit \`src/content.json\` to change your site's content.
`;

  // ---- Write files ----
  fs.writeFileSync(
    path.join(srcPath, "content.json"),
    JSON.stringify(contentJson, null, 2),
  );
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(pkgJson, null, 2),
  );
  fs.writeFileSync(path.join(projectPath, "README.md"), readmeContent);

  // ---- Install dependencies ----
  console.log("====== Installing dependencies ======");
  try {
    execSync("bun install", { cwd: projectPath, stdio: "inherit" });
  } catch {
    console.error("Warning: bun install failed, run it manually");
  }

  console.log("====== Project created ======");
  console.log(`  cd ${projectName}`);
  console.log(`  bun run dev`);
}
