# GSC audit komerčních dotazů — 3. 9. 2026

## Rozsah a omezení

- Zdroj: Google Search Console, doménová služba `naturchem.cz`, typ vyhledávání Web.
- Hlavní období: 4.–31. 8. 2026 (posledních dostupných 28 dní; data aktualizována přibližně 7,5 hodiny před odečtem).
- GSC část nízkoobjemových dotazů anonymizuje. Nula zobrazení přesného dotazu znamená, že NATURCHEM v daném období pro tento přesný dotaz nezískal zaznamenané zobrazení; sama o sobě neurčuje celkový objem hledání na trhu.
- Jde o pozorovaný stav, nikoli důkaz příčiny nebo budoucího SEO výsledku.

## Souhrn webu

| Metrika | Hodnota |
|---|---:|
| Kliknutí | 140 |
| Zobrazení | 5,7 tis. |
| CTR | 2,5 % |
| Průměrná pozice | 10,3 |

Značkový dotaz `naturchem` přinesl 23 kliknutí ze 41 zobrazení. Souhrnná čísla proto nelze číst jako výkon základních neznačkových služeb.

## Reprezentativní přesné dotazy

| Dotaz | Kliknutí | Zobrazení | Pozice | Pozorování |
|---|---:|---:|---:|---|
| `měření hluku české budějovice` | 0 | 55 | 8,4 | Reálná příležitost na první stránce, ale nulový proklik. |
| `měření vibrací` | 0 | 45 | 43,6 | Hlavní problém je nízká pozice; samotný snippet nebude stačit. |
| `autorizované měření emisí` | 0 | 2 | 49,0 | Velmi malý vzorek a nízká pozice. |
| `měření emisí` | 0 | 0 | 0 | Bez zaznamenaného zobrazení NATURCHEM; z GSC nelze určit tržní objem dotazu. |
| `měření pracovního prostředí` | 0 | 0 | 0 | Přesná fráze bez zobrazení, přesto cílová stránka získává výkon z anonymizovaných a delších variant. |
| `hluková studie` | 0 | 1 | 27,0 | Nedostatečný vzorek; pozice je mimo první dvě stránky. |
| `rozptylová studie` | 0 | 1 | 1,0 | Jediné zobrazení není dost pro závěr. |
| `měření hluku` | 0 | 1 | 8,0 | Jediné zobrazení není dost pro závěr. |

## Stránky s obchodním významem

| Stránka | Kliknutí | Zobrazení | CTR | Pozice | Rozhodnutí |
|---|---:|---:|---:|---:|---|
| `/sluzby/pracovni-prostredi/` | 7 | 77 | 9,1 % | 3,8 | Chránit title, H1 a hlavní CTA; jde o zdravý srovnávací příklad. |
| `/sluzby/mereni-emisi/` | 1 | 48 | 2,1 % | 3,4 | Jediný viditelný klik je značkový; agregovanou pozici nevykládat jako důkaz silného neznačkového rankingu. |
| `/mereni-hluku-ceske-budejovice/` | 0 | 58 | 0 % | 6,5 | Silná příležitost pro lokální komerční dotazy. |
| `/autorizovana-osoba-mereni-emisi/` | 2 | 14 | 14,3 % | 9,7 | Přesný dotaz `autorizované měření emisí` má jen 2 zobrazení na pozici 49; URL je stabilní a vhodná k posílení bez kanibalizace hlavní služby. |
| `/sluzby/hlukove-studie/` | 1 | 72 | 1,4 % | 10,3 | Dost zobrazení pro samostatný experiment s přesnějším title/H1 a nabídkou; nízký CTR nelze vykládat bez pozice. |
| `/sluzby/mereni-vibraci/` | 0 | 82 | 0 % | 31,1 | Přesný dotaz `měření vibrací` má 45 zobrazení; neměnit během vyhodnocování EXP-004. |
| `/sluzby/rozptylove-studie/` | 0 | 28 | 0 % | 4,2 | Dobrá průměrná pozice a malý vzorek; title/H1 nyní chránit před spekulativní změnou. |

Přesný dotaz `měření hluku české budějovice` se rozděluje mezi tři URL:

- přesná landing page: 31 zobrazení, 0 kliknutí, pozice 7,3;
- homepage HTTPS: 23 zobrazení, 0 kliknutí, pozice 11,3;
- stará homepage HTTP: 4 zobrazení, 0 kliknutí.

To potvrzuje přetrvávající rozdělení relevance mezi homepage a přesnou landing page. Podle dříve založeného experimentu znovu vyhodnotit nejdříve 6. 9. 2026, až budou dostupná novější data; homepage před tímto termínem nepřepisovat.

## Kde vznikají kliknutí

Nejvýkonnější stránky podle kliknutí byly homepage (23), článek o provozním řádu (14), pracovní prostředí (7), kontakt (6) a několik odborných článků. Organická viditelnost tedy existuje, ale velká část vede na značkové nebo informační vstupy místo základních komerčních služeb.

## Externí odkazy

GSC eviduje 315 externích odkazů: 313 míří na homepage a 2 na reference. Mezi nejčastějšími odkazujícími weby jsou `zivefirmy.cz`, `netkatalog.cz`, `cai.cz`, `ziveobce.cz` a `firmy.cz`. Cílové stránky služeb v souhrnu externích cílů chybí.

Pracovní hypotéza: další čistě technické on-page úpravy budou mít menší potenciál než získání několika skutečně relevantních odkazů a zmínek na konkrétní odborné služby z oborových, partnerských, profesních a regionálních zdrojů. Nejde o doporučení kupovat odkazy nebo vytvářet katalogový spam.

## Provozní zjištění mimo ranking

- Schválený článek `/poradna/priprava-na-mereni-emisi/` s datem 2. 9. 2026 vrací 3. 9. produkční 404. Statický web bez nového deploymentu budoucí článek sám nezveřejní.
- Produkční `main` je stále na commitu `1b398ce`; lokální odborná revize článků a lepší dohledatelnost doručení poptávek nejsou nasazeny.
- Firma nezaregistrovala dříve měřenou poptávku na hluk. Počet `generate_lead` proto nelze považovat za počet skutečně přijatých nebo kvalifikovaných poptávek.

## Doporučené pořadí

1. Nasadit již ověřený článek po datu vydání a opravu dohledatelnosti doručení poptávek, po novém buildu a kontrole aktuálního obsahu.
2. V Resend ověřit stav historické zprávy a po nasazení provést schválený interní test doručení; bez funkčního příjmu poptávek nemá vyšší návštěvnost plný obchodní efekt.
3. Dne 6. 9. znovu odečíst lokální hlukový dotaz a rozdělení URL. Pokud rozdělení přetrvá, založit jediný měřitelný experiment s přesnějším interním signálem na lokální landing page; neměnit současně homepage, title i obsah.
4. Pro `měření vibrací` budovat tematickou autoritu a relevantní interní i externí odkazy; vyhodnotit stávající EXP-004 po 56 dnech.
5. Připravit skutečný off-page plán pro jednotlivé služby: odborné asociace, dodavatelé technologií, partneři, reference a regionální odborné zdroje. Hodnotit získané relevantní domény a následný výkon cílových služeb, ne počet libovolných odkazů.

## Rozhodnutí k lokálním úpravám 3. 9. 2026

- Založen EXP-013 pro existující `/autorizovana-osoba-mereni-emisi/`. URL zůstává beze změny. Stránka dostává přesný název služby, vstupy, průběh, výstup, FAQ, odkazy na e-Sbírku a ISPOP a nejvyšší prioritu mezi souvisejícími stránkami hlavní služby měření emisí.
- Tři tematicky nejbližší články odkazují přesným textem na tutéž autorizovanou landing page. Obecná stránka `/sluzby/mereni-emisi/` zůstává hlavním rozcestníkem pro typy zdrojů a není přejmenována.
- Založen EXP-014 pro `/sluzby/hlukove-studie/`. Mění se jen český title/H1, meta description, stručný úvod a název rozsahu. Neuvádí se neověřená cena ani termín.
- Homepage, pracovní prostředí, vibrace a rozptylové studie zůstávají beze změny kvůli aktivním experimentům nebo dobrému aktuálnímu výkonu.

Inspirace z relevantní konkurence byla použita pouze na úrovni struktury: přesný název služby, autorizace přímo na stránce, konkrétní typy zdrojů, potřebné vstupy a zřetelný postup. Cizí reference, ceny, lhůty, oprávnění ani formulace nebyly převzaty.

## Lokální ověření

- `npm run verify`: úspěšně; lint bez chyb (16 dříve existujících varování), typová kontrola, testy formuláře, cache, článků, publikace a veřejných assetů a produkční build.
- Produkční build: 559 statických stránek; článek `/poradna/priprava-na-mereni-emisi/` je po datu vydání součástí buildu.
- Lokální SEO smoke: 501 URL ze sitemap a 213 dalších interních odkazů, 0 chyb.
- Routing smoke: canonical, hreflang, přesměrování, assety, 404/noindex a validační odpověď kontaktního API bez chyby.
- Renderovaný HTML výstup nové emisní stránky má správný produkční canonical a absolutní Open Graph URL, jedno H1, FAQ schema a interní odkaz z hlavní služby před ostatními emisními landing pages.
