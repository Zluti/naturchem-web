# Navazující kontrola: veřejné podklady a měření poptávek

Datum auditu: 31. 8. 2026 odpoledne. Výchozí produkce při auditu byla `fd26dca`.
Práce na větvi `codex/growth-followups-2026-08-31`. Audit nejprve vznikl bez
commitu, pushe a nasazení. Následný souhlas uživatele se nyní uplatňuje na commit,
push do `Ikaros277/naturchem-web:main` a jeden deployment tohoto technického
úklidu TECH-008. Nezahrnuje publikaci budoucích odborných článků, zapnutí
publikační automatiky ani změnu tarifu. Produkční výsledek ověřit po pushi;
původní souhlas s deploymentem `fd26dca` nebyl sám o sobě souhlasem s tímto releasem.

## Nově ověřené obchodní měření — DATA-003

V [GA4, událost generate_lead](https://analytics.google.com/analytics/web/#/a150315823p214236443/reports/dashboard?params=_r..dimension-value%3D%7B%22dimension%22:%22eventName%22,%22value%22:%22generate_lead%22%7D%26_u.comparisonOption%3Ddisabled%26_u.date00%3D20260824%26_u.date01%3D20260830&restoreUserState=true&r=events-overview)
bylo přečteno skutečné naplnění vlastní dimenze Anonymní ID poptávky:

- 3.–30. 8.: 5 událostí od 5 uživatelů, jedna s UUID a čtyři `(not set)`.
- Cílené období 24.–30. 8.: právě jedna událost od jednoho uživatele; kategorie
  `mereni`, služba `Měření hluku a akustika`, UUID vyplněné. Starší čtyři události
  proto nelze používat jako důkaz, že nové měření ID selhává.
- Karta hlásí 100 % dostupných dat bez vzorkování. Výstraha u hlavní karty
  vysvětluje chybějící srovnávací data; sama nevysvětluje rozdíl mezi surovými
  událostmi a atribuovanými klíčovými událostmi.
- Přesné hledání tohoto UUID v připojeném Gmailu včetně spamu a koše nevrátilo
  zprávu. Připojený Gmail není ověřený jako cílová firemní schránka; z nulového
  výsledku nelze usuzovat na nedoručení.

Technická část DATA-003 (ID se objeví v GA4) je tím potvrzená pro jeden případ.
Párování s interním e-mailem a obchodní kvalifikace zůstávají otevřené. Jedna
událost není důkaz růstu zákazníků. Plné UUID ani zákaznické osobní údaje se do
repozitáře neukládají; minimální podklad pro uživatele je mimo repozitář ve výstupech.
Nebylo změněno nastavení GA4 ani odeslána/označena/založena e-mailová zpráva.

### Doplnění atribuce, 31. 8. v 17:16 SELČ

Ve standardním [přehledu vstupních stránek GA4](https://analytics.google.com/analytics/web/#/a150315823p214236443/reports/explorer?ruid=d8c8784d-2426-42a7-b3ea-6fcd0f752ce8&restoreUserState=true&r=landing-page&params=_u.comparisonOption%3Ddisabled%26_u.date00%3D20260824%26_u.date01%3D20260830%26_r.explorerCard..columnFilters%3D%7B%22conversionEvent%22:%22generate_lead%22%7D%26_r.explorerCard..startRow%3D0%26_r.explorerCard..rowsPerPage%3D50%26_r.explorerCard..seldim%3D%5B%22landingPageMinusQueryString%22,%22sessionSourceMedium%22%5D)
bylo vybráno stejné období 24.–30. 8., metrika klíčových událostí omezena na
`generate_lead` a přidána sekundární dimenze `Relace – zdroj/médium`.

- Celý přehled: 77 relací, 43 aktivních uživatelů a jedna atribuovaná klíčová
  událost `generate_lead`; pro tuto tabulku GA4 uvádí 100 % dostupných dat.
- Jediný řádek s touto konverzí: `/sluzby/pracovni-prostredi` + `google / organic`,
  jedna relace, jeden aktivní uživatel, jedna klíčová událost.
- Bylo přečteno všech 23 vstupních stránek, po přidání zdroje všech 34 kombinací.
  Homepage měla 40 relací a v tomto krátkém okně nula přiřazených poptávek; nejde
  o důvod k novému redesignu ani o vyhodnocení EXP-001.

V tomto týdenním okně se tedy surový počet 1 a atribuovaný počet 1 shodují.
Historický rozdíl 5 versus 4 za delší období tím není vysvětlený. Událostní
přehled výše u jediného měřeného případu obsahuje službu Měření hluku a akustika.
Souvislost s touto vstupní stránkou je podložená agregovanou atribucí, nikoli
ještě přímým filtrem stejného UUID: panel přesného filtru se kvůli omezení
ovládání prohlížeče nepodařilo dokončit. Filtr nebyl aplikován; přehled byl
znovu otevřen bez něj. Nebyla vytvořena uložená analýza ani změněn sběr dat.

Rozhodnutí: chránit funkční stránku pracovního prostředí a poptávkovou cestu.
Nový signál podporuje prioritu přesných komerčních stránek, ale nedokazuje
konkrétní vyhledávací dotaz, vliv určité úpravy ani kvalifikovaného zákazníka.
Další obchodní rozhodnutí vyžaduje potvrzení přijaté poptávky od firmy.

## Kontrolní GSC snímek, nikoli vyhodnocení čerstvých změn

[GSC, doména naturchem.cz](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Anaturchem.cz),
Web, 2.–29. 8.: 142 kliknutí, 5 736 zobrazení, CTR 2,5 %, průměrná pozice 10,6.
Jde o novější a překrývající se okno, nikoli o porovnání s obdobím před změnou.

- `měření hluku české budějovice`: 55 zobrazení / 0 kliknutí / pozice 8,4.
- `emise a imise`: 176 / 0 / 11,5.
- `měření vibrací`: 44 / 0 / 43,5.
- `ippc povolení`: 13 / 0 / 17,3.

Nejsilnější z těchto obchodních příležitostí zůstává lokální hluk. Nezasahovat
teď do homepage nebo probíhajících experimentů jen kvůli krátkodobému kolísání.

Indexační přehled hlásí 503 indexovaných a 126 neindexovaných URL, ale má datum
aktualizace 21. 8. 2026. Nemůže potvrdit stav dnešního nasazení. Mezi 12 příklady
„Procházeno – momentálně neindexováno“ jsou PDF, obrazové/technické URL i historické
jazykové varianty; nejde o 12 automaticky chybných obchodních stránek. U české URL
`/provozy-a-technologie/zemedelske-provozy/` veřejná kontrola potvrdila 200,
správný canonical a `index, follow`. Nebyla odeslána žádost o indexaci ani spuštěno
ověřování opravy bez doložené opravy.

## TECH-008 — pracovní HTML kopie mimo veřejnou část

Výchozí stav přímo na produkci:

| Veřejná URL | HTTP | Titulek cizího webu | Velikost těla |
|---|---|---|---|
| `/loga-referenci/tcb-home.html` | 200 | Teplárna České Budějovice, a.s. \| Čisté teplo bez starostí | 289 870 B |
| `/loga-referenci/tpi-home.html` | 200 | TPI – Teplárna Písek | 10 057 B |
| `/loga-referenci/ts-home.html` | 200 | Teplárna Strakonice | 76 921 B |

Jde o uložené HTML podklady pro loga z dřívějšího commitu `dcf2184`, nikoli obsah
NATURCHEM. TCB má canonical na cizí doménu. Soubory mohou obsahovat cizí skripty,
formuláře a neplatné relativní odkazy. Kontrola přes HTTPS pouze četla jejich
odpovědi, nespouštěla uložené stránky v prohlížeči. Není prokázáno, že tyto tři
URL Google indexuje, ani že jejich odstranění zlepší pozice.

Lokální změna:

- Zachované kopie jsou přesunuty do `scripts/reference-sources/`, mimo `public`.
  Text je shodný s HEAD kromě konců řádků a závěrečného nového řádku.
- Žádný aplikační komponent ani skript pro loga na staré HTML cesty neodkazuje.
  Obrázky, katalog 19 referenčních log, obchodní stránky a metadata se nemění.
- Nový `test:public-assets` odmítá neodsouhlasené `.html`, `.htm` a `.xhtml`
  soubory ve veřejné složce, včetně velkých přípon a vnořených složek.
  Zachovává výslovnou výjimku pro Decap CMS a ověřuje všechny používané obrázky log.
- Kontrola je zapojena do `verify` i `prebuild`; žádná nová runtime závislost,
  funkce, časové ISR, redirect na homepage nebo návštěvnická analytická událost.

Cíl: nehostovat cizí pracovní HTML jako vlastní obsah a zabránit jeho návratu.
Je to technická prevence obsahového balastu, nikoli doložené zrychlení homepage
nebo předpověď počtu zákazníků. Veřejný objem klesne o přibližně 368 KiB až po
schváleném nasazení; úspora návštěvnických přenosů záleží na požadavcích na tyto URL.

## Ověření a případné nasazení

Předrelease opakování po souhlasu uživatele, 31. 8. kolem 17:30 SELČ:
`npm.cmd run verify` znovu prošlo (exit 0, 559 výstupů), routing smoke i všech
500 URL a 212 dalších odkazů bez selhání. Samostatná lokální kontrola potvrdila
74 podmínek včetně všech log, neveřejného archivu, CMS, CS/EN/DE stránek,
17 CSS/JS assetů a shody veřejných search/AI indexů. Lokální snímek má očekávaně
commit null bez prostředí Vercelu; na produkci kontrola vyžaduje přesný release hash.
Nebyla odeslána skutečná poptávka. Podrobnosti a rollback níže stále platí.

- `npm.cmd run verify`: PASS, včetně všech regresních testů a buildu 559 výstupů.
  Zůstává 16 existujících lint upozornění a dosavadní metadataBase výstrahy.
- Lokální produkční server `http://127.0.0.1:3105`: všechny routing smoke kontroly
  prošly; CS/EN/DE, canonical/hreflang, redirecty, CMS, statické assety a neplatný
  požadavek formuláře bez odeslání e-mailu.
- Cílené HTTP kontroly: 3 staré HTML cesty a 3 cesty archivu vracejí 404/noindex;
  všech 19 log vrací 200 s obrazovým MIME; CMS vrací 200. Celkem 26 kontrol bez chyby.
- Plný sitemap smoke: 500 URL a 212 dalších interních odkazů, 0 selhání; exit 0.
- Při cílených 404 kontrolách lokální Next server loguje `Internal: NoFallbackError`.
  Izolované opakování potvrdilo stejný log pro dávno neexistující syntetickou HTML
  cestu i pro přesunutou kopii; obě odpovědi byly 404/noindex, nikoli 500. Není to
  důkaz bezvýhradně čistých runtime logů; tento úklid nemění kód směrování a chování
  chybových stránek. Před případným nasazením neplést tento jev s chybou log či CMS.

Následné schválení bylo přijato; před pushem byl vzdálený main znovu ověřen
na `fd26dca0b9e629dd6d4ff46693c67d54ca23179b`, shodném s veřejným produkčním snímkem.
Po nasazení ověřit 404 tří starých cest, loga, homepage a CMS. Při případném
rollbacku lze obnovit předchozí deployment `fd26dca`; podklady jsou zachované
v archivu i v historii. Není migrace, změna DNS ani trvalá ztráta zdrojových dat.
