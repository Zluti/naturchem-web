/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const appRoot = path.join(projectRoot, "src", "app");

function collectSourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(fullPath);
    return /\.(?:ts|tsx)$/.test(entry.name) ? [fullPath] : [];
  });
}

const timeBasedRevalidations = [];
for (const filePath of collectSourceFiles(appRoot)) {
  const source = fs.readFileSync(filePath, "utf8");
  for (const match of source.matchAll(/export const revalidate\s*=\s*(\d+)/g)) {
    timeBasedRevalidations.push({
      file: path.relative(projectRoot, filePath).replaceAll("\\", "/"),
      seconds: Number(match[1])
    });
  }
}

assert.deepEqual(
  timeBasedRevalidations,
  [],
  `Time-based ISR would consume Hobby write units: ${JSON.stringify(timeBasedRevalidations)}`
);

const staticPublishingRoutes = [
  "src/app/[locale]/page.tsx",
  "src/app/[locale]/poradna/page.tsx",
  "src/app/[locale]/poradna/[slug]/page.tsx",
  "src/app/sitemap.ts"
];

for (const relativePath of staticPublishingRoutes) {
  const source = fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
  assert.match(
    source,
    /export const revalidate\s*=\s*false/,
    `${relativePath} must remain static between CMS-triggered deployments`
  );
}

console.log("PASS static cache-budget checks");
