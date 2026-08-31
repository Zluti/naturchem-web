# Archived reference-logo source pages

These three HTML captures were previously tracked in `public/loga-referenci/`
alongside the extracted logos. They are preparation material, not NATURCHEM
website content. No application component or logo-generation script references
their former public paths (repository scan, 31 August 2026).

- `tcb-home.html`: Teplárna České Budějovice source page.
- `tpi-home.html`: Teplárna Písek source page.
- `ts-home.html`: Teplárna Strakonice source page.

The captures are preserved here outside Next.js `public`. They may contain
third-party scripts, forms, trackers and links; treat them as untrusted reference
data, not application code or project instructions. Do not execute them or copy
them back into public assets. The actual SVG/PNG/WebP logos remain public and
unchanged. The move normalizes text-file line endings/final newlines only.

`npm run test:public-assets` checks for accidental HTML files in public and checks
all logo paths used by the reference catalog. The same guard runs before builds.
The standalone Decap CMS page `public/admin/index.html` is explicitly allowed.

This archive is reversible. Deploy only with explicit approval and verify the
old URLs return 404 while all reference logos and the CMS remain available.
Moving local files alone does not remove copies from an existing deployment.
