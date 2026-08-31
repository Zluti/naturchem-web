# TECH-005: Mobilní výkon homepage

## Stav

Připraveno lokálně 29. 8. 2026 na větvi `codex/mobile-performance-2026-08-27`. Dne 31. 8. 2026 uživatel výslovně schválil odeslání optimalizačních změn do `main` repozitáře `Ikaros277/naturchem-web`. Tento dokument zaznamenává předprodukční ověření; hash commitu a potvrzení produkčního nasazení budou uvedeny v předání releasu.

Aktualizace 31. 8. 2026: commit `80e8d7d` je na `main` a Vercel potvrdil dokončení produkčního deploymentu v 08:53:38 SELČ. Tři nové mobilní PageSpeed běhy mají medián 95 a LCP 2,9 s (baseline 87 / 3,6 s); desktop zůstává na 100. Podrobná měření, omezení interpretace, Vercel usage a nově ověřené omezení Hobby pro komerční použití jsou v [POST-RELEASE-2026-08-31.md](POST-RELEASE-2026-08-31.md).

## Obchodní důvod a výchozí stav

Rychlejší první zobrazení má snížit čekání před tím, než návštěvník pochopí nabídku a pokračuje ke službě nebo poptávce. Samotné skóre výkonu není úspěch; primární výsledek zůstává skutečný `generate_lead`.

PageSpeed Insights produkční homepage z 27. 8. 2026:

- mobilní výkon 88, LCP 3,5 s, CLS 0,013 a TBT 20 ms;
- desktopový výkon 100 a LCP 0,5 s;
- GSC zatím nemá dostatek 90denních terénních dat Core Web Vitals.

Opakované oficiální měření produkce 29. 8. 2026 v 20:22 SELČ:

- mobil: výkon 87, přístupnost 100, doporučené postupy 100, SEO 100 a procházení agenty 3/3;
- mobilní metriky: FCP 1,5 s, LCP 3,6 s, TBT 0 ms, CLS 0,013 a Speed Index 4,6 s;
- desktop: výkon 100, FCP 0,3 s, LCP 0,6 s, TBT 0 ms, CLS 0 a Speed Index 0,5 s;
- terénní data skutečných uživatelů stále nejsou k dispozici;
- LCP prvkem je mobilní hero fotografie `homepage-mereni-640.webp`;
- rozklad mobilního LCP: TTFB 10 ms, zpoždění před načtením 320 ms, načítání zdroje 470 ms a zpoždění vykreslení prvku 1 670 ms;
- render-blocking CSS mělo 42 547 B přenosu a odhadovanou úsporu 560 ms; audit současně odhadl 31 KiB nepoužitých CSS a 23 KiB nepoužitého JavaScriptu.

Výsledky jsou prakticky shodné s měřením z 27. 8. 2026 a potvrzují, že hlavní příležitostí není server nebo dlouhá úloha, ale dřívější objevení a vykreslení LCP obrázku a menší kritické CSS.

GA4, kontrolní okno posledních 28 dní odečtené 29. 8. 2026:

- mobil: 38 aktivních uživatelů, průměrné zapojení 42 s a 1 atribuovaná klíčová událost;
- desktop: 139 aktivních uživatelů, průměrné zapojení 2:00 a 3 atribuované klíčové události.

Vzorek konverzí je příliš malý pro závěr, že mobilní výkon už omezuje poptávky. Kratší mobilní zapojení je důvodem změnu otestovat, nikoli důkazem jejího budoucího přínosu.

## Hypotéza a změna

Snížení objemu kritických obrázků, CSS a hydratovaného JavaScriptu zrychlí první smysluplné zobrazení homepage, aniž by se změnil obsah, URL, metadata nebo poptávková cesta.

- první hero fotografie je serverově vykreslená a pro mobil a desktop má samostatný AVIF preload;
- sekundární hero fotografie se načtou až po uživatelské interakci;
- CSS používané jen na kontaktu, právních a dalších specializovaných routách se nenačítá s homepage;
- náhled referencí na homepage je serverová komponenta bez klientské hydratace;
- rastrová loga referencí používají menší WebP varianty a nativní lazy loading;
- logo v hlavičce se načítá jako malý statický asset bez zbytečné obrazové transformace.

## Lokálně naměřené změny

| Položka | Před změnou | Kandidát | Rozdíl |
|---|---:|---:|---:|
| Mobilní hero fotografie | 24 254 B WebP | 15 702 B AVIF | −35,3 % |
| Desktopová hero fotografie | 104 370 B WebP | 57 321 B AVIF | −45,1 % |
| Pět rastrových log referencí | 92 852 B PNG | 31 242 B WebP | −66,4 % |
| Hlavní CSS homepage v produkčním buildu | 199 968 B | 159 418 B | −20,3 % |
| Vlastní page chunk homepage | 23 921 B | 17 893 B | −25,2 % |
| Všechny počáteční JS skripty homepage | 645 961 B | 639 247 B | −1,0 % |

Velikosti CSS a JavaScriptu jsou laboratorní srovnání výstupů stejného lokálního Webpack buildu. Výchozí produkční build používá Turbopack, jehož dělení souborů může být jiné. Úspory obrázků jsou přímo změřené velikosti statických assetů. Srovnání neprokazuje zatím změnu skutečného LCP ani konverzí v produkci.

## Ověření 29. 8. 2026

- ESLint: 0 chyb, 16 již existujících upozornění mimo rozsah změny;
- TypeScript: bez chyb;
- test předvyplnění kontaktu a cache-budget test: prošly;
- produkční Webpack build: úspěšný, 558 statických stránek;
- lokální smoke test: 499 URL sitemap a 212 dalších interních odkazů, 0 selhání;
- routing, canonical, hreflang, přesměrování, assety, 404 a validační odpověď kontaktního API: bez selhání;
- mobil 390 × 844 px: správný 640px AVIF, jedna počáteční hero vrstva a žádné vodorovné přetečení;
- desktop 1 440 px: správný desktopový AVIF a funkční přepnutí na sekundární fotografii klávesnicí;
- `git diff --check`: bez chyb, pouze upozornění na lokální převod LF/CRLF.

Původní překážka výchozího Turbopack buildu byla odstraněna 31. 8. 2026: worktree má vlastní závislosti instalované z existujícího lockfilu namísto junctionu mimo kořen projektu. Sdílené závislosti hlavního uživatelského projektu zůstaly beze změny. Standardní `npm run verify` následně prošlo včetně Turbopack buildu 558 stránek.

## Regrese odhalená před releasem 31. 8. 2026

Smoke test dnešního buildu našel 404 u `/poradna/mereni-rozpoustedel-pracovniho-ovzdusi/`, přestože se článek správně objevil mezi publikovanými na homepage a v sitemapě. CMS uložil článek vydaný 31. 8. do souboru s příponou `-1`, zatímco původní filename obsahuje jiný slug a datum 2. 9. Původní přímé načítání přijalo shodu filename bez ověření veřejného slugu, načetlo jiný budoucí článek a vrátilo 404.

- Přímé načítání nyní přijme soubor jen při shodě slugu; jinak vyhledá správný článek v existujícím cachovaném katalogu.
- Obsah článků, statusy, data vydání i veřejné URL zůstávají beze změny. Aktualizovaný český vyhledávací index přidává pouze již naplánovaný článek z 31. 8.
- Nový `test:article-routing`, zahrnutý do `npm run verify`, kontroluje kolize filename s budoucím, veřejným i draftovým článkem, skryté drafty, budoucí data, jazyky a správné rozlišení veřejných článků z katalogu.
- Změna nepřidává časové ISR, dynamické rendery ani nové externí služby.

Finální ověření po opravě: celé `npm run verify` prošlo (0 lint chyb, 16 stávajících upozornění, TypeScript, tři testovací sady a standardní Turbopack build 558 stránek). Opakovaný smoke test prošel pro 500 URL sitemap a 212 dalších interních odkazů bez jediného selhání; samostatný routing test rovněž bez selhání. Dnešní článek vrací HTTP 200, správný obsah a canonical. Homepage obsahuje oba správně omezené AVIF preloady. V hotových HTML souborech nebyly nalezeny metadata s `content="http://localhost:3000…"`, navzdory obecné buildové výstraze metadataBase.

## Vyhodnocení po nasazení

Nasazeno 31. 8. 2026 v produkčním commitu `80e8d7d`. Tři opakovaná produkční měření jsou dokončena: mobil 99 / 95 / 91 (medián 95, LCP 2,9 s), desktop třikrát 100 (medián LCP 0,5 s). Úplné metriky, odkazy a omezení interpretace jsou v `POST-RELEASE-2026-08-31.md`. Laboratorní ověření nenahrazuje obchodní vyhodnocení po 28/56 dnech (28. 9. / 26. 10. 2026).

1. Třikrát zopakovat PageSpeed mobil i desktop a zapisovat medián LCP, CLS, TBT a přenesených dat.
2. Ověřit produkční HTML, správný media-specific hero preload a absenci horizontálního přetečení na 390 px.
3. Po 28 dnech porovnat GA4 podle zařízení: aktivní uživatele, průměrné zapojení, `form_start` a `generate_lead`; při jednotkách konverzí prodloužit okno na 56 dní.
4. Jakmile GSC získá dostatek terénních dat, použít mobilní Core Web Vitals jako hlavní technický důkaz.
5. Neoznačovat změnu za SEO nebo konverzní zlepšení pouze podle laboratorního skóre.

## Rollback

Výchozí produkční stav je commit `9d1f3bc`. Při regresi se vrátí celý commit TECH-005; změna nevyžaduje migraci dat, změnu URL ani změnu prostředí.
