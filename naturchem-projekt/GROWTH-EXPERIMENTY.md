# Registr SEO a konverzních experimentů

> Interní provozní dokument. Aktualizovat podle živého webu, GSC a GA4. Starší projektové roadmapy mohou být neaktuální.

## Co považujeme za úspěch

- Primární konverze: úspěšně odeslaná poptávka (`generate_lead`).
- Sekundární signály: `form_start`, kliknutí na telefon a e-mail a kvalifikované kliknutí na CTA.
- Organický růst hodnotíme podle relevantních českých dotazů a cílových stránek, ne pouze podle celkové návštěvnosti.
- Zlepšení SEO nevyhlašujeme bez dostatečných dat. Standardní vyhodnocovací okno je 28 dní; u nízkého objemu 56 dní.
- Během vyhodnocovacího okna neměníme znovu stejný titul, H1, hero ani CTA, pokud nejde o chybu.

## Ověřená výchozí data

Data byla odečtena 23. 8. 2026 z aktuálních přehledů GSC a GA4.

### Google Search Console

Období 25. 7.–21. 8. 2026:

- 128 kliknutí
- 5 375 zobrazení
- CTR 2,4 %
- průměrná pozice 10,8

Předchozích 28 dní:

- 69 kliknutí
- 3 605 zobrazení
- CTR 1,9 %
- průměrná pozice 16,1

Kontrolní snímek odečtený 24. 8. 2026 za období 26. 7.–22. 8. 2026:

- 126 kliknutí
- 5 392 zobrazení
- CTR 2,3 %
- průměrná pozice 10,7

Jde o překrývající se kontrolní období, nikoli o vyhodnocení změn nasazených 23.–24. 8. 2026.

### GA4

Období 26. 7.–22. 8. 2026:

- 161 aktivních uživatelů
- 270 relací
- 4 události `generate_lead` od 4 uživatelů
- Google organic: 111 relací a 1 přiřazená klíčová událost
- Seznam organic: 23 relací a 0 přiřazených klíčových událostí

Poznámka: přehled GA4 zobrazoval 3 přiřazené klíčové události, zatímco surový počet `generate_lead` byl 4. Pro vyhodnocení zdrojů proto používat atribuci GA4, pro kontrolu funkčnosti formuláře surový počet událostí.

Kontrolní snímek odečtený 24. 8. 2026 za období 27. 7.–23. 8. 2026:

- 159 aktivních uživatelů a 272 relací
- 5 událostí `form_start` od 4 uživatelů
- 4 události `generate_lead` od 4 uživatelů
- homepage byla vstupní stránkou u 155 relací a získala 2 ze 3 přiřazených klíčových událostí

Při současném nízkém objemu dat není dokončení formuláře zjevné úzké místo: formulář zahájili 4 uživatelé a `generate_lead` odeslali rovněž 4 uživatelé. Prioritou zůstává přivést více kvalifikovaných návštěvníků na relevantní službu a kontaktní cestu. Událost `click_cta` se nepoužívá jako čistý krok konverzního trychtýře, protože ji současná implementace odesílá i pro některé interní navigační odkazy.

### Stav konverzního měření

- `generate_lead` je v GA4 označen jako klíčová událost; další běžné interakce nejsou zaměňovány za dokončenou poptávku.
- Vlastní dimenze `inquiry_category` a `service_interest` jsou v GA4 zaregistrované od 12. 8. 2026.
- GA4 je propojeno s doménovou službou Search Console pro naturchem.cz.
- Vstupní stránku vyhodnocovat jako dimenzi relace a konkrétní službu podle `service_interest`.

## Aktivní a připravené experimenty

| ID | Stav | Dotaz / stránka | Výchozí hodnota | Hypotéza a změna | Primární vyhodnocení |
|---|---|---|---|---|---|
| EXP-001 | Živý od 23. 8. 2026, pozorovat (`a309218`, obsažen v produkci `926d3e4`) | Homepage `/` | Předzměnový kontext: posledních 7 dní přibližně 60 relací, z toho 43 organic; 0 `form_start`, 0 klíčových událostí | Nová vizuální hierarchie a zkrácený obsah pomohou návštěvníkům rychleji vybrat situaci nebo službu. Homepage neměnit 14–28 dní od nasazení. | `generate_lead`, `form_start` a `click_cta` u relací začínajících na homepage; kvalitativně také rozložení kliknutí na hlavní navigační prvky. |
| EXP-002 | Živý od 23. 8. 2026, pozorovat (`d0e7599`) | `emise a imise` | Před změnou: 168 zobrazení, 0 kliknutí, pozice 12,1 za posledních 28 dní | Nasazená úprava snippetu lépe odpoví na informační záměr a zvýší CTR bez změny odborného významu. | GSC: dotaz, cílová stránka, kliknutí, CTR a pozice po 28 dnech oproti předchozím 28 dnům. |
| EXP-003 | Nasazen 24. 8. 2026 (`b335a8c`) | `hluková studie tepelné čerpadlo` → `/provozy-a-technologie/tepelna-cerpadla-vzt/` | 15 zobrazení, 0 kliknutí, pozice 14,1; varianta „tepelného čerpadla“ 7 zobrazení, pozice 15,1 | Přesnější titul a H1 „Hluková studie pro tepelné čerpadlo a VZT“ posílí shodu se studijním záměrem před instalací. | GSC po 28/56 dnech: obě varianty dotazu, CTR, pozice a cílová stránka. GA4: vstupy na stránku a následný `generate_lead`. |
| EXP-004 | Nasazen 24. 8. 2026 (`0aa4c97`) | `měření vibrací` | 43 zobrazení, 0 kliknutí, pozice 44,8 | Přesný interní odkaz z odborného článku pomůže Googlu i uživateli rozpoznat hlavní službu pro měření vibrací. | GSC po 56 dnech: dotaz a `/sluzby/mereni-vibraci/`; sledovat, zda se cílová URL nemění a zda roste pozice. |
| EXP-005 | Živý od 24. 8. 2026 (`f314b80`, produkce `b849a61`) | `měření hluku tepelného čerpadla` → `/mereni-hluku-tepelneho-cerpadla-vzt/` | 13 zobrazení, 0 kliknutí, pozice 37,0; dotaz s „cena“ 10 zobrazení, 0 kliknutí, pozice 31,2 | Přesná jednotná formulace v title/H1, stručné rozlišení měření a studie, FAQ a jasné podklady pro nabídku zvýší relevanci a kvalifikované poptávky. | GSC po 28/56 dnech: oba dotazy a přesná URL. GA4: vstupy, `form_start` a `generate_lead` s touto landing page jako vstupní stránkou. |
| TECH-001 | Živý od 24. 8. 2026 (`6962c6b`, produkce `b849a61`) | Jazykový atribut všech HTML dokumentů | Před změnou byl jazyk opravován klientským skriptem | Serverově vykreslený `html lang` odstraní nejednoznačnost pro vyhledávače a asistivní technologie bez zvýšení ISR rozsahu. | Technická kontrola po nasazení: CS/EN/DE `html lang`, canonical, hreflang, 404 `noindex`, počet vygenerovaných stránek a Vercel usage. |
| TECH-002 | Připraveno lokálně, nenasazeno | Směrování jazyků / Vercel Function CPU | Vercel za 25. 7.–24. 8. 2026: Active CPU 3 h 27 min z 4 h (86,5 %); middleware tvořil 1 h 40 min, tedy 48,4 %. ISR Writes byly současně na 168 564 z 200 000 jednotek (84,3 %). | Přesun českých redirectů a interních locale rewrites z middleware do statických pravidel Next/Vercel zachová veřejné URL a odstraní spuštění middleware funkce při běžném zobrazení stránky. | Po nasazení: CS/EN/DE URL, canonical, hreflang, API a assety; Vercel Active CPU podle typu po 24 h a v klouzavém 30denním okně. Cíl: middleware CPU se nepřičítá k novým požadavkům; celkový pokles nelze vyhlásit, dokud stará data nevypadnou z okna. |
| DATA-001 | Živý od 24. 8. 2026 (`e0d93a2`, produkce `b849a61`) | Poptávkový formulář / `generate_lead` | 4 surové události za posledních 28 dní; honeypot vracel záměrně úspěšnou odpověď stejně jako přijatá poptávka | Klient při vyplněném honeypotu neodešle `generate_lead`, takže zablokovaný spam nezvýší počet obchodních konverzí. | Po nasazení průběžně porovnávat počet reálně přijatých poptávek s `generate_lead`; rozdíl musí mít vysvětlitelnou příčinu, například odmítnutý analytický souhlas. |
| DATA-002 | Živý od 24. 8. 2026 (`eddd123`) | Kliknutí do poptávkové cesty | Za 27. 7.–23. 8. 2026 měl široký event `click_cta` 22 událostí od 15 uživatelů, ale zahrnoval také běžné interní odkazy se třídou `button` nebo `section-link-inline`. | Nový event `click_inquiry_cta` se odešle jen pro interní odkazy mířící přímo na `#poptavkovy-formular`; zachová `page_path`, text a URL odkazu a případně `service_interest` nebo `inquiry_category`. Stávající `click_cta` zůstane beze změny pro historickou návaznost. | Od data nasazení sledovat uživatele a relace v posloupnosti `click_inquiry_cta` → `form_start` → `generate_lead`, vždy se souhlasem se statistickými cookies. |

## Pravidla vyhodnocení

1. Zapsat přesný produkční commit a datum nasazení.
2. V GSC filtrovat zároveň dotaz i cílovou stránku; samotný souhrn webu nestačí.
3. Porovnat stejné délky období a zaznamenat i změnu průměrné pozice, aby CTR nebylo vytržené z kontextu.
4. V GA4 oddělit surový `generate_lead` od atribuovaných klíčových událostí podle zdroje.
5. U nízkého objemu nevyvozovat závěr z jednotek zobrazení nebo jedné konverze; prodloužit okno na 56 dní.
6. Každý další zásah do stejné stránky založit jako nový experiment, aby zůstal dohledatelný důvod změny.

## Nejbližší termíny kontroly

- 6. 9. 2026: pouze technická a konverzní kontrola homepage po 14 dnech; bez dalšího redesignu, pokud není zjištěna chyba.
- 20. 9. 2026: první plné 28denní vyhodnocení EXP-001 a EXP-002.
- 21. 9. 2026: první 28denní vyhodnocení EXP-005.
- 19. 10. 2026: 56denní vyhodnocení EXP-005 při nízkém objemu dat.
- 21. 9. 2026: první 28denní kontrola EXP-003 a EXP-004.
- 19. 10. 2026: 56denní vyhodnocení EXP-003 a EXP-004 při nízkém objemu dat.

## Záznam produkční kontroly

- 24. 8. 2026, produkce `b849a61`: nová landing page EXP-005 vrací HTTP 200 a zobrazuje správný H1.
- 24. 8. 2026, TECH-001: živé CS, EN a DE stránky vracejí serverový atribut `html lang` jako `cs`, `en` a `de`.
- 24. 8. 2026: produkční homepage zobrazuje aktuální článek z 24. 8. 2026; před nasazením prošlo 498 URL sitemap a 139 dalších interních odkazů bez chyby.
- DATA-001 se ověřuje porovnáním skutečných přijatých poptávek a GA4; produkční formulář nebyl při technické kontrole odeslán, aby nevznikla falešná obchodní konverze.

## Příležitosti z GSC auditu 24. 8. 2026

| Priorita | Dotaz / stránka | Důkaz za 28 dní | Rozhodnutí |
|---|---|---|---|
| 1 | `měření hluku české budějovice` | 50 zobrazení, 0 kliknutí, pozice 8,8. Homepage získala 35 zobrazení na pozici 10,3; přesná landing page 13 zobrazení na pozici 7,1. | Jde o kanibalizaci s lepším výkonem přesné landing page. Homepage během EXP-001 neměnit; znovu vyhodnotit 6. a 20. 9. 2026 a následně rozhodnout o přesnějším interním propojení. |
| 2 | `/poradna/protihlukova-opatreni-pred-merenim-hluku/` | Stránka 179 zobrazení, 3 kliknutí, CTR 1,7 %, pozice 8,4. Přesný dotaz `protihluková opatření`: 46 zobrazení, 0 kliknutí, pozice 6,3. | Připravit samostatný experiment s přesným odkazem na `/sluzby/mereni-hluku/`; neměnit současně titulek článku, aby šel vyhodnotit přenos na službu. |
| 3 | EXP-003, studie tepelného čerpadla | `/provozy-a-technologie/tepelna-cerpadla-vzt/`: 46 zobrazení, 0 kliknutí, pozice 11,5. Přesný dotaz má 15 zobrazení na pozici 14,1. | Připravenou úpravu title/H1 ponechat jako samostatný experiment odlišující studii před instalací od měření skutečného provozu. |
| 4 | EXP-004, `měření vibrací` | 43 zobrazení, 0 kliknutí, pozice 44,7; všechna zobrazení vedou na `/sluzby/mereni-vibraci/`. | Přesný interní odkaz z odborného článku je vhodný; cílová URL je stabilní a nedochází ke kanibalizaci. |

Další technické poznatky:

- GSC stále vykazuje starou URL `http://www.naturchem.cz/` (213 zobrazení a 2 kliknutí), ale živá URL se aktuálně přesměruje na `https://www.naturchem.cz/` a výsledná stránka má správný canonical. Sledovat pokles staré varianty, nyní bez zásahu do kódu.
- Mobilní zařízení měla 13 kliknutí z 1 220 zobrazení, CTR 1,1 % a pozici 8,3; počítače 112 kliknutí z 4 151 zobrazení, CTR 2,7 % a pozici 11,4. Mobilní dotazy jsou však z velké části informační a vícejazyčné, takže samotný rozdíl neprokazuje problém mobilního rozhraní.

## Kontrola po nasazení

- Úspěšný produkční build a známý rollback commit.
- HTTP 200 na změněných URL; canonical a hreflang odpovídají produkční doméně.
- Formulář odešle poptávku a `generate_lead` vznikne až po úspěšném přijetí serverem.
- GSC nemá nový indexační problém a sitemap zůstává dostupná.
- Vercel usage a ISR zápisy zůstávají v bezpečné rezervě tarifu.
