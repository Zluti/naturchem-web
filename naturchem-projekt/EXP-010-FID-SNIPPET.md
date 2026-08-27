# EXP-010: FID produktový snippet

## Stav

Připraveno lokálně v samostatné větvi `codex/exp-010-fid-snippet`. Není nasazeno.

## Cíl a výchozí stav

Cílem je získat více kvalifikovaných návštěv zájemců o FID detektor bez změny URL, title, strukturovaných dat nebo navigace.

Google Search Console za 28 dní od 28. 7. do 24. 8. 2026:

- `fid detektor`: 25 zobrazení, 0 kliknutí, CTR 0 %, průměrná pozice 19,0;
- kategorie `/prodej/pcf-elettronica/detectors-fid-pid-tcd/`: 18 zobrazení na průměrné pozici 11,3;
- detail `/prodej/pcf-elettronica/fid-detector/`: 8 zobrazení na průměrné pozici 37,3;
- `detektor fid`: 33 zobrazení, 0 kliknutí, CTR 0 %, průměrná pozice 48,2; všechna zobrazení vedla na detail FID.

Součet řádků cílových stránek v GSC se u dotazu `fid detektor` liší od souhrnné hodnoty o dvě zobrazení; výchozí údaje jsou proto zapsány přesně tak, jak je rozhraní zobrazilo.

Živý Google SERP 27. 8. 2026 zobrazoval obě stránky NATURCHEM. Kategorie používala obecný technický popis a u detailu Google sestavil úryvek z části „Hlavní vlastnosti“ místo krátkého meta popisu „Podsystém plamenoionizačního detektoru“.

## Hypotéza a změna

Přesnější popis kategorie i detailu hned na začátku vysvětlí, že jde o detektory PCF pro integraci do GC a monitorovacích přístrojů. To může zvýšit relevanci úryvku pro produktový záměr a přivést více vhodných B2B návštěvníků.

- český popis kategorie začíná přesným pojmem FID detektory, zmiňuje provedení PID a TCD a stručně popisuje výběr podle analytu a aplikace;
- český lead detailu FID uvádí použití v GC a monitorovacích přístrojích a stávající ověřené vlastnosti: citlivost, stabilitu a detekci uhlovodíků a VOC;
- anglické a německé texty, title, H1, URL, canonical, hreflang, produktová data a CTA se nemění.

## Vyhodnocení

- první technická kontrola po případném nasazení: správný český meta description, H1, canonical a hreflang obou URL;
- GSC po 28 dnech: oba přesné dotazy, stránka, zobrazení, kliknutí, CTR a průměrná pozice;
- při nízkém objemu dat zopakovat kontrolu po 56 dnech;
- GA4: vstupní relace na obou URL a následné `click_inquiry_cta`, `form_start` a `generate_lead`;
- úspěch je kvalifikovaná poptávka nebo růst relevantních návštěv, ne samotné zobrazení.

## Technické ověření 27. 8. 2026

- český title a H1 obou stránek zůstaly beze změny;
- výsledný meta description odpovídá novému viditelnému leadu;
- canonical a všechny varianty hreflang `cs`, `en`, `de` a `x-default` jsou správné;
- mobilní kontrola při 390 × 844 px: bez vodorovného přetečení nebo ořezu leadu;
- lint: 0 chyb, 17 již existujících upozornění mimo rozsah změny;
- TypeScript a produkční Webpack build prošly; build vygeneroval 558 statických stránek;
- 499 URL ze sitemap a 141 dalších interních odkazů: 0 selhání;
- routing, canonical, hreflang, přesměrování, assety, 404 a validace kontaktního API: bez selhání.

Přesný příkaz `npm run verify` prošel lintem a TypeScriptem, ale jeho výchozí Turbopack build v izolovaném worktree odmítl sdílený junction `node_modules`, protože vede mimo kořen worktree. Jde o omezení ověřovacího prostředí; následný produkční build přes Webpack prošel.
