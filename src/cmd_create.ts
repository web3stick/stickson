import * as fs from "fs";
import * as path from "path";

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

  const pkgJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      build: "stickson build",
      dev: "stickson dev content.json",
      validate: "stickson validate content.json",
    },
    stickson: {
      input: "content.json",
    },
  };

  const schemaPath = path.join(projectPath, "schema");
  fs.mkdirSync(schemaPath, { recursive: true });

  const readmeContent = `# ${projectName}

A static site built with [stickson](https://github.com/sleet-ai/stickson).

## Commands

\`\`\`bash
npm run build    # Build the site
npm run dev      # Watch for changes
npm run validate # Validate content.json
\`\`\`

## Editing Content

Edit \`content.json\` to change your site's content.
`;

  fs.writeFileSync(
    path.join(projectPath, "content.json"),
    JSON.stringify(contentJson, null, 2),
  );
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(pkgJson, null, 2),
  );
  fs.writeFileSync(path.join(projectPath, "README.md"), readmeContent);

  console.log("====== Project created ======");
  console.log(`  cd ${projectName}`);
  console.log(`  npm install && npm run dev`);
}
