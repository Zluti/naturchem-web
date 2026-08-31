/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const projectRoot = path.resolve(__dirname, "..");
const moduleCache = new Map();

function article(slug, { date = "2000-01-01", status = "published" } = {}) {
  return `---\nslug: ${slug}\ntitle: ${slug}\npublishedAt: ${date}\nstatus: ${status}\n---\nTest body.\n`;
}

// Reproduce the CMS filename collision without changing real editorial content.
const fixtureFiles = new Map([
  ["public-target.md", article("another-scheduled-slug", { date: "2999-01-01" })],
  ["public-target-1.md", article("public-target")],
  ["published-target.md", article("another-public-slug")],
  ["published-target-1.md", article("published-target")],
  ["draft-collision.md", article("another-draft-slug", { status: "draft" })],
  ["draft-collision-1.md", article("draft-collision")],
  ["normal.md", article("normal")],
  ["private.md", article("private", { status: "draft" })],
  ["future.md", article("future", { date: "2999-01-01" })],
  ["encoded-file.md", article("měření-test")]
]);

const fixtureFs = {
  async readdir(directory) {
    return path.basename(directory) === "articles" ? [...fixtureFiles.keys()] : [];
  },
  async readFile(filePath) {
    const source = path.basename(path.dirname(filePath)) === "articles"
      ? fixtureFiles.get(path.basename(filePath))
      : undefined;
    if (source === undefined) throw new Error("ENOENT: fixture not found");
    return source;
  }
};

function loadTypeScriptModule(filePath) {
  const resolvedPath = path.resolve(filePath);
  if (moduleCache.has(resolvedPath)) return moduleCache.get(resolvedPath).exports;

  const output = ts.transpileModule(fs.readFileSync(resolvedPath, "utf8"), {
    fileName: resolvedPath,
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;
  const loadedModule = { exports: {} };
  moduleCache.set(resolvedPath, loadedModule);

  const localRequire = (specifier) => {
    if (specifier === "node:fs/promises") return fixtureFs;
    // Exercise actual loader logic outside a Next request; no external cache writes.
    if (specifier === "react") return { cache: (fn) => fn };
    if (specifier === "next/cache") return { unstable_cache: (fn) => fn };
    if (specifier.startsWith("@/")) {
      return loadTypeScriptModule(path.join(projectRoot, "src", `${specifier.slice(2)}.ts`));
    }
    if (specifier.startsWith(".")) {
      return loadTypeScriptModule(path.resolve(path.dirname(resolvedPath), `${specifier}.ts`));
    }
    return require(specifier);
  };
  const execute = new Function("require", "module", "exports", output);
  execute(localRequire, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

async function main() {
  const { getArticleBySlug, getArticles, getArticleStaticParams } = loadTypeScriptModule(
    path.join(projectRoot, "src", "lib", "articles.ts")
  );

  for (const slug of ["public-target", "published-target", "draft-collision", "normal"]) {
    assert.equal((await getArticleBySlug(slug, "cs"))?.slug, slug, `Correct article at ${slug}`);
  }
  for (const slug of ["private", "future", "another-scheduled-slug", "another-draft-slug", "missing"]) {
    assert.equal(await getArticleBySlug(slug, "cs"), null, `${slug} must remain non-public`);
  }
  assert.equal((await getArticleBySlug(encodeURIComponent("měření-test"), "cs"))?.slug, "měření-test");
  assert.equal(await getArticleBySlug("%invalid", "cs"), null);
  assert.equal(await getArticleBySlug("normal", "en"), null);

  for (const listedArticle of await getArticles("cs")) {
    assert.equal((await getArticleBySlug(listedArticle.slug, "cs"))?.slug, listedArticle.slug);
  }
  const params = await getArticleStaticParams();
  assert.ok(params.some(({ slug }) => slug === "public-target"));
  assert.ok(params.some(({ slug }) => slug === "future"));
  assert.ok(!params.some(({ slug }) => slug === "private"));
  console.log("PASS article routing: CMS filename collisions, public catalog, drafts, scheduled dates and locales");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
