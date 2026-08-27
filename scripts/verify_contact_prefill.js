/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const projectRoot = path.resolve(__dirname, "..");
const moduleCache = new Map();

function resolveTypeScriptModule(specifier, parentFile) {
  let candidate;

  if (specifier.startsWith("@/")) {
    candidate = path.join(projectRoot, "src", specifier.slice(2));
  } else if (specifier.startsWith("./") || specifier.startsWith("../")) {
    candidate = path.resolve(path.dirname(parentFile), specifier);
  } else {
    return null;
  }

  for (const extension of ["", ".ts", ".tsx"]) {
    const filePath = `${candidate}${extension}`;
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return filePath;
  }

  return null;
}

function loadTypeScriptModule(filePath) {
  const resolvedPath = path.resolve(filePath);
  if (moduleCache.has(resolvedPath)) return moduleCache.get(resolvedPath).exports;

  const source = fs.readFileSync(resolvedPath, "utf8");
  const output = ts.transpileModule(source, {
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
    const localPath = resolveTypeScriptModule(specifier, resolvedPath);
    return localPath ? loadTypeScriptModule(localPath) : require(specifier);
  };
  const execute = new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    output
  );
  execute(localRequire, loadedModule, loadedModule.exports, resolvedPath, path.dirname(resolvedPath));

  return loadedModule.exports;
}

const { readContactUrlPrefill } = loadTypeScriptModule(
  path.join(projectRoot, "src", "lib", "contact-url-prefill.ts")
);
const { contactCategoryUrl } = loadTypeScriptModule(
  path.join(projectRoot, "src", "lib", "contact-url.ts")
);

const operatingRules = readContactUrlPrefill(
  "?service=Provozn%C3%AD%20%C5%99%C3%A1dy"
);
assert.deepEqual(operatingRules.initialServices, ["Provozní řády"]);
assert.equal(operatingRules.initialCategory, "studie");
assert.equal(operatingRules.initialMessage, "");

const productMessage = "Poptávka přístroje: FID detektor";
const productUrl = contactCategoryUrl("pristroj", productMessage);
const parsedProductUrl = new URL(productUrl, "https://www.naturchem.cz");
assert.equal(parsedProductUrl.pathname, "/kontakt");
assert.equal(parsedProductUrl.searchParams.get("category"), "pristroj");
assert.equal(parsedProductUrl.searchParams.get("message"), productMessage);
assert.equal(parsedProductUrl.hash, "#poptavkovy-formular");

const productPrefill = readContactUrlPrefill(parsedProductUrl.search);
assert.deepEqual(productPrefill.initialServices, []);
assert.equal(productPrefill.initialCategory, "pristroj");
assert.equal(productPrefill.initialMessage, productMessage);

const cappedMessage = readContactUrlPrefill(`?message=${"x".repeat(1200)}`);
assert.equal(cappedMessage.initialMessage.length, 1000);

console.log("PASS contact URL prefill checks");
