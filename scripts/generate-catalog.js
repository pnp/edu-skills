import { copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const skillsRoot = join(repositoryRoot, "skills");
const outputPath = join(repositoryRoot, "site", "public", "catalog.json");
const downloadsRoot = join(repositoryRoot, "site", "public", "downloads");
const mediaRoot = join(repositoryRoot, "site", "public", "media");
const excludedSkills = new Set([
  "education-onepager-review",
  "fill-education-onepager",
]);
const allowedMediaTypes = new Set(["image", "gif", "video"]);
const allowedCategories = new Set([
  "Teaching & Learning",
  "Data & Insights",
  "Planning & Operations",
  "Communication",
  "Accessibility",
]);
const appNames = {
  excel: "Excel",
  powerpoint: "PowerPoint",
  sharepoint: "SharePoint",
};

function parseFrontmatter(content, skillPath) {
  const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error(`${skillPath}: missing YAML frontmatter`);
  }

  const readField = (field) => match[1].match(new RegExp(`^${field}:\\s*(.+)$`, "m"))?.[1]?.trim();
  return {
    name: readField("name"),
    description: readField("description"),
  };
}

function titleFromMarkdown(content, fallback) {
  return content.match(/^#\s+(.+)$/m)?.[1]?.trim()
    ?? fallback.split("-").map((word) => `${word[0].toUpperCase()}${word.slice(1)}`).join(" ");
}

function validateMedia(media, metadataPath) {
  if (media === undefined) return;
  if (!media || typeof media !== "object" || Array.isArray(media)) {
    throw new Error(`${metadataPath}: media must be an object`);
  }
  if (!allowedMediaTypes.has(media.type)) {
    throw new Error(`${metadataPath}: media.type must be image, gif, or video`);
  }
  if (typeof media.src !== "string" || !media.src) {
    throw new Error(`${metadataPath}: media.src is required`);
  }
  if (typeof media.alt !== "string" || !media.alt) {
    throw new Error(`${metadataPath}: media.alt is required`);
  }
  if (media.type === "video" && (typeof media.poster !== "string" || !media.poster)) {
    throw new Error(`${metadataPath}: video media requires a poster`);
  }
  for (const field of ["src", "poster"]) {
    if (media[field] && /^[a-z][a-z\d+.-]*:/i.test(media[field]) && !media[field].startsWith("https://")) {
      throw new Error(`${metadataPath}: media.${field} remote URLs must use HTTPS`);
    }
  }
  if (media.caption !== undefined && typeof media.caption !== "string") {
    throw new Error(`${metadataPath}: media.caption must be a string`);
  }
}

function validateMetadata(metadata, metadataPath) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new Error(`${metadataPath}: catalog metadata must be an object`);
  }
  for (const field of ["title", "description", "icon", "prompt"]) {
    if (metadata[field] !== undefined && (typeof metadata[field] !== "string" || !metadata[field].trim())) {
      throw new Error(`${metadataPath}: ${field} must be a nonempty string`);
    }
  }
  if (metadata.category !== undefined && !allowedCategories.has(metadata.category)) {
    throw new Error(`${metadataPath}: category is not supported`);
  }
  if (metadata.audiences !== undefined && (!Array.isArray(metadata.audiences) || metadata.audiences.length === 0 || metadata.audiences.some((audience) => typeof audience !== "string" || !audience.trim()))) {
    throw new Error(`${metadataPath}: audiences must be a nonempty array of strings`);
  }
  if (metadata.featured !== undefined && typeof metadata.featured !== "boolean") {
    throw new Error(`${metadataPath}: featured must be true or false`);
  }
  if (metadata.updated !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(metadata.updated)) {
    throw new Error(`${metadataPath}: updated must use YYYY-MM-DD`);
  }
  validateMedia(metadata.media, metadataPath);
}

async function publishMedia(skillRoot, skillId, media) {
  if (!media) return undefined;
  const published = { ...media };

  for (const field of ["src", "poster"]) {
    if (!media[field] || /^(?:https?:)?\/\//i.test(media[field])) continue;
    if (isAbsolute(media[field])) {
      throw new Error(`${skillId}/catalog.json: media.${field} must be relative or an HTTPS URL`);
    }

    const sourcePath = resolve(skillRoot, media[field]);
    const sourceRelativePath = relative(skillRoot, sourcePath);
    if (sourceRelativePath.startsWith("..") || isAbsolute(sourceRelativePath)) {
      throw new Error(`${skillId}/catalog.json: media.${field} cannot leave the skill folder`);
    }

    const destinationRoot = join(mediaRoot, skillId);
    const fileName = basename(sourcePath);
    await mkdir(destinationRoot, { recursive: true });
    await copyFile(sourcePath, join(destinationRoot, fileName));
    published[field] = `./media/${skillId}/${fileName}`;
  }

  return published;
}

async function readMetadata(skillRoot) {
  const metadataPath = join(skillRoot, "catalog.json");
  try {
    const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
    validateMetadata(metadata, relative(repositoryRoot, metadataPath));
    return metadata;
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

async function discoverSkills() {
  const products = (await readdir(skillsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .sort((left, right) => left.name.localeCompare(right.name));
  const skills = [];
  const ids = new Set();

  for (const product of products) {
    const productRoot = join(skillsRoot, product.name);
    const folders = (await readdir(productRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .sort((left, right) => left.name.localeCompare(right.name));

    for (const folder of folders) {
      if (excludedSkills.has(folder.name)) {
        throw new Error(`Internal-only skill cannot be published: ${folder.name}`);
      }
      if (ids.has(folder.name)) {
        throw new Error(`Duplicate skill name: ${folder.name}`);
      }

      const skillRoot = join(productRoot, folder.name);
      const skillPath = join(skillRoot, "SKILL.md");
      const skillMarkdown = await readFile(skillPath, "utf8");
      const frontmatter = parseFrontmatter(skillMarkdown, relative(repositoryRoot, skillPath));
      if (frontmatter.name !== folder.name) {
        throw new Error(`${relative(repositoryRoot, skillPath)}: name must equal "${folder.name}"`);
      }

      const metadata = await readMetadata(skillRoot);
      const app = appNames[product.name];
      if (!app) {
        throw new Error(`Unsupported product folder: ${product.name}`);
      }
      const downloadRoot = join(downloadsRoot, product.name, folder.name);
      await mkdir(downloadRoot, { recursive: true });
      await copyFile(skillPath, join(downloadRoot, "SKILL.md"));
      ids.add(folder.name);
      skills.push({
        id: folder.name,
        title: metadata.title ?? titleFromMarkdown(skillMarkdown, folder.name),
        app,
        category: metadata.category ?? (app === "Excel" ? "Planning & Operations" : "Teaching & Learning"),
        audiences: metadata.audiences ?? ["Educator"],
        description: metadata.description ?? frontmatter.description,
        icon: metadata.icon,
        prompt: metadata.prompt ?? `@${folder.name}`,
        updated: metadata.updated,
        featured: metadata.featured ?? false,
        media: await publishMedia(skillRoot, folder.name, metadata.media),
        sourceUrl: `https://github.com/pnp/edu-skills/tree/main/skills/${product.name}/${folder.name}`,
        downloadUrl: `./downloads/${product.name}/${folder.name}/SKILL.md`,
      });
    }
  }

  return skills;
}

await Promise.all([
  rm(downloadsRoot, { recursive: true, force: true }),
  rm(mediaRoot, { recursive: true, force: true }),
]);
const skills = await discoverSkills();
const catalog = {
  version: 1,
  skills,
  apps: [...new Set(skills.map((skill) => skill.app))],
  categories: [...new Set(skills.map((skill) => skill.category))].sort(),
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Generated ${skills.length} public skills in ${relative(repositoryRoot, outputPath)}.`);