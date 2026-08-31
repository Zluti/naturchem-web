/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Run trusted repository modules in Node scripts without a second implementation
// of publication dates or validation rules. Overrides are used only by tests.
module.exports = function createLoader(overrides = {}) {
  const root = path.resolve(__dirname, "../..");
  const cache = new Map();
  function load(file) {
    const resolved = [file, `${file}.ts`, `${file}.tsx`, `${file}.json`].find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
    if (!resolved) throw new Error(`Module not found: ${file}`);
    if (resolved.endsWith(".json")) return JSON.parse(fs.readFileSync(resolved, "utf8"));
    if (cache.has(resolved)) return cache.get(resolved).exports;
    const output = ts.transpileModule(fs.readFileSync(resolved, "utf8"), {
      fileName: resolved,
      compilerOptions: { esModuleInterop: true, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX }
    }).outputText;
    const mod = { exports: {} };
    cache.set(resolved, mod);
    const localRequire = (name) => {
      if (Object.hasOwn(overrides, name)) return overrides[name];
      if (name.startsWith("@/")) return load(path.join(root, "src", name.slice(2)));
      if (name.startsWith(".")) return load(path.resolve(path.dirname(resolved), name));
      return require(name);
    };
    new Function("require", "module", "exports", output)(localRequire, mod, mod.exports);
    return mod.exports;
  }
  return load;
};
