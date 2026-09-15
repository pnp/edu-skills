import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const skillsRoot = fileURLToPath(new URL("../skills/", import.meta.url));
const categories = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
  .map((entry) => entry.name);
const kebabCase = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const errors = [];
let skillCount = 0;

for (const category of categories) {
  const categoryPath = join(skillsRoot, category);

  if (!existsSync(categoryPath)) {
    errors.push(`Missing category folder: skills/${category}`);
    continue;
  }

  const skillFolders = readdirSync(categoryPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  for (const folder of skillFolders) {
    skillCount += 1;
    const relativePath = `skills/${category}/${folder.name}`;
    const skillPath = join(categoryPath, folder.name, "SKILL.md");

    if (!kebabCase.test(folder.name)) {
      errors.push(`${relativePath}: folder name must use kebab-case`);
    }

    if (!existsSync(skillPath)) {
      errors.push(`${relativePath}: missing SKILL.md`);
      continue;
    }

    const content = readFileSync(skillPath, "utf8");
    const frontmatter = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);

    if (!frontmatter) {
      errors.push(`${relativePath}/SKILL.md: missing YAML frontmatter`);
      continue;
    }

    const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
    const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();

    if (name !== folder.name) {
      errors.push(`${relativePath}/SKILL.md: name must equal "${folder.name}"`);
    }

    if (!description || description.length < 40) {
      errors.push(`${relativePath}/SKILL.md: description must be at least 40 characters`);
    }
  }
}

if (categories.length === 0) {
  errors.push("No skill category folders found");
} else if (skillCount === 0) {
  errors.push("No contributed skills found");
}

if (errors.length > 0) {
  console.error(`Skill validation failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Validated ${skillCount} skill${skillCount === 1 ? "" : "s"}.`);