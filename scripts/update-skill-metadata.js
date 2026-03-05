import { promises as fs } from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readPackageJson() {
  const pkgPath = path.join(__dirname, "..", "package.json");
  const raw = await fs.readFile(pkgPath, "utf8");
  const pkg = JSON.parse(raw);
  return {
    version: pkg.version ?? "",
  };
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile() && entry.name === "SKILL.md") {
      yield fullPath;
    }
  }
}

function updateVersionInFrontmatter(frontmatter, { version }) {
  const lines = frontmatter.split("\n");
  let inMetadata = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!inMetadata && line.trim().startsWith("metadata:")) {
      inMetadata = true;
      continue;
    }
    if (inMetadata) {
      const trimmed = line.trim();
      if (
        !trimmed.startsWith("author:") &&
        !trimmed.startsWith("version:") &&
        !line.startsWith(" ")
      ) {
        // left the metadata block
        inMetadata = false;
      } else if (trimmed.startsWith("version:")) {
        const indent = line.slice(0, line.indexOf("v"));
        lines[i] = `${indent}version: ${version}`;
        break;
      }
    }
  }

  return lines.join("\n");
}

async function processSkillFile(filePath, meta) {
  const content = await fs.readFile(filePath, "utf8");

  if (!content.startsWith("---")) {
    // Expecting frontmatter; if not present, leave file unchanged.
    return;
  }

  const secondDelimIndex = content.indexOf("\n---", 3);
  if (secondDelimIndex === -1) {
    // Malformed frontmatter; do not modify
    return;
  }

  const fmEnd = secondDelimIndex + "\n---".length;
  const frontmatter = content.slice(4, secondDelimIndex + 1); // between first and second '---\n' (skip initial newline)
  const body = content.slice(fmEnd + 1); // skip trailing newline after second '---'

  const updatedFrontmatter = updateVersionInFrontmatter(
    frontmatter.trimEnd(),
    meta,
  );
  const updated = ["---", updatedFrontmatter, "---", body].join("\n");
  await fs.writeFile(filePath, updated, "utf8");
}

async function main() {
  const meta = await readPackageJson();
  const cursorSkillsDir = path.join(__dirname, "..", ".cursor", "skills");

  try {
    await fs.access(cursorSkillsDir);
  } catch {
    console.error(`No .cursor/skills directory found at ${cursorSkillsDir}`);
    process.exit(1);
  }

  for await (const skillFile of walk(cursorSkillsDir)) {
    try {
      await processSkillFile(skillFile, meta);
      console.log(`Updated ${skillFile}`);
    } catch (err) {
      console.error(`Failed to update ${skillFile}:`, err);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
