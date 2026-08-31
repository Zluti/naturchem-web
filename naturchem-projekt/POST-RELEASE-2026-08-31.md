# Kontrola po nasazení – 31. 8. 2026

## Ověřený stav

Produkce a vzdálený `main` používají commit `80e8d7dc3f4f859e114fdc5c995918076662d521`. Veřejná GitHub kontrola Vercel hlásí `success` / `Deployment has completed`, dokončeno 31. 8. 2026 v 08:53:38 SELČ.

Tento navazující audit je pouze kontrola a lokální dokumentace. Neproběhl další commit, push, deployment, změna tarifu ani změna obchodního obsahu.

## TECH-005: tři opakovaná měření produkční homepage

PageSpeed Insights, mobilní emulace Moto G Power, pomalé 4G, Lighthouse 13.4.1; desktopová emulace ve stejných reportech. Hodnoty v tabulce jsou zaokrouhlené stejně jako v UI.

| Měření / čas SELČ | Mobil skóre | Mobil FCP | Mobil LCP | Mobil TBT | Mobil CLS | Mobil SI | Desktop skóre | Desktop LCP |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| [1 – 08:58:47](https://pagespeed.web.dev/analysis/https-www-naturchem-cz/d11yvx01wj?form_factor=mobile) | 99 | 1,2 s | 1,7 s | 0 ms | 0,013 | 3,0 s | 100 | 0,5 s |
| [2 – 09:00:19](https://pagespeed.web.dev/analysis/https-www-naturchem-cz/tsj2fqpndw?form_factor=mobile) | 95 | 1,2 s | 2,9 s | 0 ms | 0,013 | 1,2 s | 100 | 0,5 s |
| [3 – 09:01:58](https://pagespeed.web.dev/analysis/https-www-naturchem-cz/f09asrb4hm?form_factor=mobile) | 91 | 1,2 s | 3,2 s | 20 ms | 0,013 | 4,1 s | 100 | 0,4 s |
| Medián | 95 | 1,2 s | 2,9 s | 0 ms | 0,013 | 3,0 s | 100 | 0,5 s |

- Odkazy na kalkulačku přímo v UI obsahovaly mobilní LCP 1 651 / 2 851 / 3 151 ms a desktopové LCP 481 / 521 / 421 ms.
- Desktop měl FCP 0,3 s ve všech bězích, TBT 0 / 0 / 10 ms, CLS 0 a SI 0,6 / 0,4 / 1,0 s.
- Přístupnost, doporučené postupy a SEO: ve všech šesti výsledcích 100. Procházení agenty: 3/3; nejde o měření skutečné viditelnosti v AI odpovědích.
- Předprodukční baseline 29. 8.: mobil 87, FCP 1,5 s, LCP 3,6 s, TBT 0 ms, CLS 0,013 a SI 4,6 s; desktop 100 a LCP 0,6 s.
- Laboratorní výsledek je lepší ve všech třech mobilních bězích, ale rozptyl 91–99 a LCP 1,7–3,2 s je podstatný. Nevykazovat nejlepší běh 99 jako stabilní výkon webu.
- CrUX/terénní data stále nejsou dostupná. Z těchto měření nelze prohlásit splnění Core Web Vitals u skutečných návštěvníků ani růst poptávek či pozic v Googlu.

Třetí běh potvrdil jako LCP správný `/hero/homepage-mereni-640.avif`. Rozklad: TTFB 10 ms, zpoždění před načtením 120 ms, načítání 800 ms, vykreslení 1 390 ms. Oproti baseline 320 ms je objevení obrázku dřívější, ale síťový a vykreslovací čas kolísají. Zbývající render-blocking CSS mělo odhad 530 ms (první běh 570 ms); první běh hlásil 24 KiB nepoužitého CSS a 23 KiB JavaScriptu. Tyto diagnostické odhady nejsou sčítatelnou zárukou dalšího zrychlení.

## TECH-004: Vercel usage a nulové nové ISR zápisy

Zdroj: přihlášený účet `ikaros277's projects`, plán Hobby. [Usage](https://vercel.com/ikaros277s-projects/~/usage), klouzavé poslední 30denní okno 1.–31. 8. 2026. Hodnoty přehledu jsou kromě přesného ISR součtu zaokrouhlené.

| Zdroj | Čerpání | Zahrnutý limit Hobby | Přibližný podíl |
|---|---:|---:|---:|
| ISR Write Units | 178 107 | 200 000 | 89,1 % |
| Fluid Active CPU | 2 h 52 min | 4 h | 71,9 % |
| Fast Origin Transfer | 5,24 GB | 10 GB | 52,4 % |
| Fast Data Transfer | 3,52 GB | 100 GB | 3,5 % |
| Edge Requests | 281 tis. | 1 mil. | 28,1 % |
| ISR Reads | 407 tis. | 1 mil. | 40,7 % |
| Function Invocations | 149 tis. | 1 mil. | 14,9 % |
| Image Transformations | 2 136 | 5 000 | 42,7 % |
| Image Cache Reads | 27 440 | 300 000 | 9,1 % |
| Image Cache Writes | 10 440 | 100 000 | 10,4 % |
| Speed Insights Events | 4 015 | 10 000 | 40,2 % |

Přesný součet ISR 178 107 je ověřen také v [detailu Writes](https://vercel.com/ikaros277s-projects/~/usage/isr-writes?period=daily). Rezerva je 21 893 jednotek. CPU je nižší než přibližně 3 h 13 min odečtených 27. 8.; rozdíl zahrnuje posun klouzavého okna, nelze jej celý přičíst jedné úpravě.

[Observability ISR](https://vercel.com/ikaros277s-projects/~/observability/isr?environment=all), všechna prostředí, 30. 8. 21:00–31. 8. 09:00:

- Write Units: 0; Time-based Revalidations: 0.
- Read Units: přibližně 6,1 tis.; projekt `web-naturchem` měl 641 čtení, 0 zápisů, 45,7 MB čtení a 0 B zápisu.
- Samostatný přehled Functions za posledních 12 hodin ukázal 2 invokace, 0,00019 GB-h a 0 % chyb i timeoutů. Audit sám poslal při předání pouze neplatný validační POST; invokace nejsou obchodní konverze.

Ověřena je absence nových časových ISR zápisů v dostupném 12hodinovém okně, nikoli garance celého budoucího provozu. Historické součty neodpadnou najednou na konci měsíce. Hobby UI nabízí delší Observability retenci jako placenou funkci; nebyla aktivována.

## Konverzní a organický kontrolní snímek

GA4, vlastnost `naturchem`, období 3.–30. 8. 2026:

- `generate_lead`: 5 surových událostí od 5 uživatelů, všechny v Česku; počet 5 není doložený počet kvalifikovaných obchodních případů.
- Přehled vstupních stránek: 302 relací, 164 aktivních a 160 nových uživatelů, průměrné zapojení 1:00 a 4 atribuované `generate_lead` (sloupec výslovně přepnut na tuto událost).
- Homepage: 165 relací, 82 aktivních uživatelů, 58 s zapojení na relaci a 2 atribuované `generate_lead`.
- `/sluzby/pracovni-prostredi`: 6 relací, 6 aktivních uživatelů, 1:32 zapojení a 1 atribuovaný lead.
- `/sluzby/mereni-emisi`: 2 relace, 2 aktivní uživatelé, 1:35 zapojení a 1 atribuovaný lead.
- `/poradna/provozni-rad-zdroje-znecistovani-ovzdusi`: 8 relací, 7 aktivních uživatelů, 47 s zapojení a 0 atribuovaných leadů. EXP-008 běží od 27. 8.; nové období je stále příliš krátké pro jeho vyhodnocení.

Rozdíl 5 surových a 4 atribuovaných událostí nadále evidovat odděleně. Tento audit neprovedl párování s přijatými e-maily, proto nepotvrzuje příčinu rozdílu ani obchodní kvalitu všech pěti poptávek. Čísla končí před dnešním nasazením, nejsou jeho výsledkem.

GSC, typ Web, posledních 28 dní = 1.–28. 8. 2026: 146 kliknutí, 5 753 zobrazení, CTR 2,5 % a průměrná pozice 10,7. Přesný dotaz `měření vibrací` měl 44 zobrazení, 0 kliknutí a pozici 44,7; všechna zobrazení patří `/sluzby/mereni-vibraci/`. To potvrzuje stabilní cílovou URL EXP-004, nikoli potřebu okamžitě přepisovat snippet. Okna GSC a GA4 mají jiný poslední dostupný den.

## Navazující kontrola skutečných poptávek a publikačních termínů

Dne 31. 8. byl zkontrolován aktuální kód `80e8d7d`: kontaktní API po validaci vytváří UUID, přidává je jako `ID poptávky` do interního oznámení a vrací `leadId` po úspěšné odpovědi Resendu. `ContactForm.tsx` připojuje stejné ID do `generate_lead` jen po úspěšné odpovědi API, nikoli při vyplněném honeypotu. Přijetí odeslání e-mailovou službou samo o sobě nepotvrzuje doručení do schránky ani obchodní kvalifikaci.

Relevantní oznámení se nepodařilo najít v připojeném Gmailu:

- první dotaz omezil srpnové zprávy na předmět `NATURCHEM poptávka`;
- druhý hledal značku a text `Nová poptávka z webu` nebo `ID poptávky` včetně spamu a koše;
- obě odpovědi měly prázdný výsledek bez další stránky. Žádná zpráva nebyla otevřena, změněna, označena, odeslána ani přeposlána.

Z toho nelze vyvozovat, že nebyla přijata žádná poptávka. Neověřili jsme, že připojený Gmail je cílovou firemní schránkou formuláře. DATA-001 a DATA-003 zůstávají obchodně neověřené; chybí relevantní oznámení nebo anonymizovaný přehled s datem, `lead_id` (je-li přítomné), službou a stavem poptávky. Pro první kontrolu nejsou potřeba jména, e-maily, telefony ani kompletní texty zpráv. Starší poptávky před nasazením ID nelze dodatečně deterministicky spárovat jen podle počtu.

Nejbližší plánované české články podle skutečného frontmatteru, nikoli podle názvu souboru:

| Datum | Název | Veřejná cesta po schváleném nasazení |
|---|---|---|
| 2. 9. 2026 | Jak připravit zdroj na autorizované měření emisí, aby se měření nemuselo opakovat | `/poradna/priprava-na-mereni-emisi/` |
| 8. 9. 2026 | Přišla výzva KHS k měření pracovního prostředí: jak sestavit správný rozsah | `/poradna/vyzva-khs-mereni-pracovniho-prostredi/` |

Oba mají uložený stav `published`, ale budoucí datum je do té doby skrývá. Tento technický audit neprovedl odborné schválení jejich textu ani nepovažuje stav souboru za novou produkční autorizaci. Při `revalidate = false` samo uplynutí data nezveřejní již sestavenou stránku: je nutné schválené nasazení v příslušný den nebo později. Nevznikl žádný plánovač, deploy hook ani další produkční nasazení.

Nasazené experimenty zatím nemají plná vyhodnocovací období. Nejbližší technická/konverzní kontrola homepage je 6. 9.; první plná okna začínají 20.–21. 9. a pro TECH-005 28. 9. Zachovat měřitelnost a neměnit znovu chráněné titulky, hlavní obsah a CTA jen kvůli malému průběžnému vzorku.

## Provozní priorita: vhodný tarif pro firemní web

Dne 31. 8. ověřeny přímo [podmínky Vercelu, článek 4 Hobby Plan](https://vercel.com/legal/terms), poslední aktualizace 1. 6. 2026: Hobby je omezen na osobní nebo nekomerční použití. [Oficiální ceník](https://vercel.com/pricing) v FAQ uvádí stejnou hranici a Pro určuje také firmám. Vzhledem k tomu, že NATURCHEM web nabízí placené B2B služby a získává poptávky, jde o nesoulad se zamýšleným použitím Hobby nezávisle na spotřebě kvót.

Pouhé splnění technických limitů tedy není dostatečným podkladem pro tvrzení, že lze firemní web dlouhodobě bezpečně provozovat zdarma na Hobby. Dřívější kontroly řešily kvóty; toto omezení je nutné doplnit do rozhodování o hostingu.

- Nejmenší provozní změna: Vercel Pro bez migrace aplikace. Ceník uvádí 20 USD měsíčně, 20 USD zahrnutého kreditu na spotřebu a další placené vývojářské místo za 20 USD měsíčně. Dodatečná spotřeba, případné doplňky a daně mohou cenu zvýšit; není to paušál bez dalších možných nákladů.
- Před případným přechodem ověřit výslednou cenu, počet míst, doplňky a nastavení rozpočtu. Tvrdý stop-limit může pozastavit projekty; jeho nastavení proto vyžaduje vědomé obchodní rozhodnutí.
- Pokud je podmínkou nulový pravidelný poplatek, nejprve samostatně ověřit hosting povolující komerční použití i podporu současných funkcí. Nelze předem slíbit beznákladovou a bezrizikovou migraci.
- Bez výslovného souhlasu uživatele neměnit tarif, fakturaci, poskytovatele, DNS ani produkční deployment. Stávající web nevypínat.

## Další rozhodnutí

1. Vyžádat rozhodnutí uživatele o firemním hostingu; jde o prioritu dostupnosti, nikoli další redesign.
2. Ponechat nasazené výkonové úpravy a chránit homepage, emise a pracovní prostředí před dalšími souběžnými obsahovými zásahy.
3. Po získání dalšího samostatného 12hodinového okna zkontrolovat ISR bez slibu trvalé nulové spotřeby. Pro TECH-005 vyhodnotit 28 dní po nasazení od 28. 9. 2026, při malém objemu 56 dní od 26. 10. 2026; respektovat zpoždění dat.
4. Další obchodní rozhodnutí opřít o kvalitu skutečných poptávek a párování `lead_id`, nikoli pouze pět událostí nebo PageSpeed skóre.
5. Pro EXP-004 a ostatní existující změny zachovat již domluvená vyhodnocovací okna. Nevytvářet další experiment jen kvůli krátkodobému kolísání skóre.
