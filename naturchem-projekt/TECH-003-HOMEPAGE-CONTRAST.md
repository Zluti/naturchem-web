# TECH-003: Kontrast odkazů na odborné články na homepage

## Stav

Připraveno lokálně v samostatné větvi `codex/tech-003-home-contrast`. Není nasazeno.

## Výchozí důkaz

Oficiální PageSpeed Insights, produkční homepage, laboratorní měření z 27. 8. 2026 v 10:53 SELČ:

- mobilní přístupnost: 97/100;
- desktopová přístupnost: 97/100;
- nevyhovující prvek: textové CTA `.home-editorial-cta` u hlavního odborného článku;
- konkrétní stav při měření: kategorie Dokumentace používala na bílém podkladu světlou akcentní barvu `#b7792f`.

Ostatní laboratorní baseline stejného měření: mobilní výkon 88, LCP 3,5 s, CLS 0,013, TBT 20 ms; desktopový výkon 100 a LCP 0,5 s; SEO 100, doporučené postupy 100 a kontrola procházení agenty 3/3. GSC zatím nemá dostatek 90denních terénních dat pro Core Web Vitals.

## Hypotéza a změna

Tmavé varianty stávajících barev kategorií zvýší čitelnost textových odkazů bez změny vizuálního systému stránky.

- barevné okraje karet zůstávají ve stávajících akcentních barvách;
- text „Číst dále“ a šipky používají existující tmavé varianty pro Měření, Studie, Dokumentaci a výchozí zelenou kategorii;
- obsah, rozvržení, URL, metadata a měření konverzí se nemění.

## Ověření 27. 8. 2026

- kontrast všech čtyř tmavých variant vůči bílé: 7,24 : 1 až 8,79 : 1; splňuje WCAG AA i AAA pro běžný text;
- vizuální kontrola produkčního lokálního buildu při 1280 × 720 px a 390 × 844 px: bez vodorovného přetečení, ořezu textu nebo rozbití rozvržení;
- lint: 0 chyb, 17 již existujících upozornění mimo rozsah změny;
- TypeScript: prošel;
- produkční Webpack build: prošel, vygenerováno 558 statických stránek;
- kontrola 499 URL ze sitemap a 141 dalších interních odkazů: 0 selhání;
- routing, canonical, hreflang, přesměrování, assety, 404 a validace kontaktního API: bez selhání.

Přesný příkaz `npm run verify` prošel lintem a TypeScriptem, ale jeho výchozí Turbopack build v izolovaném worktree odmítl sdílený junction `node_modules`, protože vede mimo kořen worktree. Jde o omezení ověřovacího prostředí, ne o chybu změny; následný produkční build přes Webpack prošel.

Po případném nasazení zopakovat PageSpeed pro mobil i desktop a ověřit odstranění kontrastní chyby.
