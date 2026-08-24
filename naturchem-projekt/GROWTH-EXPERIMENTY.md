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

### GA4

Období 26. 7.–22. 8. 2026:

- 161 aktivních uživatelů
- 270 relací
- 4 události `generate_lead` od 4 uživatelů
- Google organic: 111 relací a 1 přiřazená klíčová událost
- Seznam organic: 23 relací a 0 přiřazených klíčových událostí

Poznámka: přehled GA4 zobrazoval 3 přiřazené klíčové události, zatímco surový počet `generate_lead` byl 4. Pro vyhodnocení zdrojů proto používat atribuci GA4, pro kontrolu funkčnosti formuláře surový počet událostí.

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
| EXP-003 | Připravený commit `14b306b` | `hluková studie tepelné čerpadlo` → `/provozy-a-technologie/tepelna-cerpadla-vzt/` | 15 zobrazení, 0 kliknutí, pozice 14,1; varianta „tepelného čerpadla“ 7 zobrazení, pozice 15,1 | Přesnější titul a H1 „Hluková studie pro tepelné čerpadlo a VZT“ posílí shodu se studijním záměrem před instalací. | GSC po 28/56 dnech: obě varianty dotazu, CTR, pozice a cílová stránka. GA4: vstupy na stránku a následný `generate_lead`. |
| EXP-004 | Připravený commit `33aa093` | `měření vibrací` | 43 zobrazení, 0 kliknutí, pozice 44,8 | Přesný interní odkaz z odborného článku pomůže Googlu i uživateli rozpoznat hlavní službu pro měření vibrací. | GSC po 56 dnech: dotaz a `/sluzby/mereni-vibraci/`; sledovat, zda se cílová URL nemění a zda roste pozice. |
| EXP-005 | Připravený commit `f314b80` | `měření hluku tepelného čerpadla` → `/mereni-hluku-tepelneho-cerpadla-vzt/` | 13 zobrazení, 0 kliknutí, pozice 37,0; dotaz s „cena“ 10 zobrazení, 0 kliknutí, pozice 31,2 | Přesná jednotná formulace v title/H1, stručné rozlišení měření a studie, FAQ a jasné podklady pro nabídku zvýší relevanci a kvalifikované poptávky. | GSC po 28/56 dnech: oba dotazy a přesná URL. GA4: vstupy, `form_start` a `generate_lead` s touto landing page jako vstupní stránkou. |
| TECH-001 | Připravený commit `6962c6b` | Jazykový atribut všech HTML dokumentů | Před změnou byl jazyk opravován klientským skriptem | Serverově vykreslený `html lang` odstraní nejednoznačnost pro vyhledávače a asistivní technologie bez zvýšení ISR rozsahu. | Technická kontrola po nasazení: CS/EN/DE `html lang`, canonical, hreflang, 404 `noindex`, počet vygenerovaných stránek a Vercel usage. |
| DATA-001 | Připravený commit `e0d93a2` | Poptávkový formulář / `generate_lead` | 4 surové události za posledních 28 dní; honeypot vracel záměrně úspěšnou odpověď stejně jako přijatá poptávka | Klient při vyplněném honeypotu neodešle `generate_lead`, takže zablokovaný spam nezvýší počet obchodních konverzí. | Po nasazení průběžně porovnávat počet reálně přijatých poptávek s `generate_lead`; rozdíl musí mít vysvětlitelnou příčinu, například odmítnutý analytický souhlas. |

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
- U EXP-003 až EXP-005 zapsat termíny D+28 a D+56 až podle skutečného data produkčního nasazení.

## Kontrola po nasazení

- Úspěšný produkční build a známý rollback commit.
- HTTP 200 na změněných URL; canonical a hreflang odpovídají produkční doméně.
- Formulář odešle poptávku a `generate_lead` vznikne až po úspěšném přijetí serverem.
- GSC nemá nový indexační problém a sitemap zůstává dostupná.
- Vercel usage a ISR zápisy zůstávají v bezpečné rezervě tarifu.
