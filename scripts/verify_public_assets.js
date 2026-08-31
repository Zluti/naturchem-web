/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const publicRoot = path.join(root, "public");
// Decap CMS intentionally has a standalone entry point. Other site pages belong
// in src/app; saved source websites must not be served from our domain.
const allowedHtml = new Set(["admin/index.html"]);

function unexpectedHtml(files) {
  return files.filter((file) => /\.(?:html?|xhtml)$/i.test(file) && !allowedHtml.has(file));
}

function publicFiles(directory, prefix = "") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = prefix + entry.name;
    if (entry.isDirectory()) return publicFiles(path.join(directory, entry.name), relative + "/");
    return [relative];
  });
}

// Synthetic inputs prove the guard rejects nested and uppercase HTML copies,
// while leaving logo images and the explicit CMS entry point alone.
assert.deepEqual(unexpectedHtml(["admin/index.html", "loga-referenci/logo.svg", "logo.webp"]), []);
assert.deepEqual(
  unexpectedHtml(["loga-referenci/source.html", "nested/SOURCE.HTM", "source.xhtml", "admin/copy.html"]),
  ["loga-referenci/source.html", "nested/SOURCE.HTM", "source.xhtml", "admin/copy.html"]
);

const files = publicFiles(publicRoot);
assert.deepEqual(
  unexpectedHtml(files),
  [],
  "Unexpected public HTML: archive source websites outside public; review any intentional new standalone page."
);
assert.ok(files.includes("admin/index.html"), "Keep the Decap CMS entry point available.");

const load = require("./lib/load-typescript.js")();
const { referenceClients } = load(path.join(root, "src/lib/client-logos.ts"));
assert.ok(referenceClients.length > 0, "The reference-logo catalog must not be empty.");
for (const { name, logo } of referenceClients) {
  assert.match(logo, /^\/loga-referenci\/.+\.(?:svg|png|jpe?g|webp|avif)$/i, `Invalid logo for ${name}`);
  const logoPath = path.resolve(publicRoot, `.${logo}`);
  assert.ok(logoPath.startsWith(publicRoot + path.sep), `Logo escapes public: ${name}`);
  assert.ok(fs.existsSync(logoPath) && fs.statSync(logoPath).isFile(), `Missing public logo for ${name}`);
}

console.log(`PASS public asset checks: CMS preserved, ${referenceClients.length} reference logos available, no accidental HTML copies.`);
