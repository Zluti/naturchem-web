# Hosting NATURCHEM: rozhodovací podklad k 31. 8. 2026

## Doporučení a rozsah

Pro současný web doporučuji jako nejméně rizikovou změnu Vercel Pro po schválení výsledné ceny uživatelem. Netlify Free je technicky relevantní alternativa, ale nelze jej doporučit jako zaručeně bezplatný a nepřetržitě dostupný produkční hosting. Netlify Personal může být levnější placená alternativa; vyžaduje ověření migrace a skutečné spotřeby.

Jde o posouzení kódu a veřejných podmínek, nikoli provedenou migraci. Nezměnil jsem hosting, tarif, fakturaci, DNS, tajné hodnoty, CMS ani produkční deployment. Pro další externí změny je nutný výslovný souhlas. Produkční optimalizace `80e8d7d` zůstává nasazená.

Obchodní cíl: zachovat dostupnost poptávkového formuláře a publikovaných stránek bez zbytečných provozních nákladů. Přesun hostingu sám o sobě není SEO experiment ani doložený zdroj nových poptávek.

## Varianty

| Varianta | Základní měsíční cena | Hlavní rozhodovací hledisko |
|---|---:|---|
| Vercel Hobby nyní | 0 USD | Podmínky omezují Hobby na osobní nebo nekomerční použití. Firemní získávání poptávek tomuto určení neodpovídá, i když se web vejde do kvót. |
| Vercel Pro | od 20 USD | Bez změny poskytovatele, URL a běhového prostředí. Zahrnuje 20 USD kreditu na spotřebu; nejde o neomezený paušál. |
| Netlify Free | 0 USD / 300 kreditů | Komerční projekty jsou podle oficiálního oznámení povoleny; kreditový limit znamená riziko pozastavení. Nutná migrace a ověření. |
| Netlify Personal | 9 USD / 1 000 kreditů | Nižší základní cena než Pro u Vercelu, ale stejné migrační požadavky jako Netlify Free. |

Zdroje: [Vercel – podmínky, část Hobby](https://vercel.com/legal/terms), [Vercel – ceník](https://vercel.com/pricing), [Netlify – aktuální ceník](https://www.netlify.com/pricing/). Ceny jsou v USD, bez dopočtu případných daní, doplňků a další spotřeby. Před schválením ověřit konečnou nabídku v účtu.

[Oficiální oznámení Netlify Free](https://www.netlify.com/blog/introducing-netlify-free-plan/) výslovně připouští komerční projekty. Je z listopadu 2024: jeho staré číselné kvóty nepoužívat. Výpočet níže vychází z aktuálního kreditového ceníku pro nové účty, nikoli z historických tarifů.

U Vercel Pro před přechodem zkontrolovat počet placených vývojářských míst a doplňky, zejména Speed Insights Plus (ceník uvádí 10 USD za projekt měsíčně). Ověřit i účtování sestavení aplikace. Nezapínat automaticky doplňky ani tvrdé zastavení při dosažení rozpočtu: to může ovlivnit dostupnost webu. Aktuální konečná cena upgradu nebyla potvrzena v platebním formuláři.

## Netlify Free: orientační model rezervy

Vstupem je dříve odečtená spotřeba Vercelu za posledních 30 dnů: 3,52 GB Fast Data Transfer a přibližně 281 000 Edge Requests. Podrobnosti jsou v `POST-RELEASE-2026-08-31.md`. Je to orientační náhrada vstupů, nikoli naměřená spotřeba na Netlify; poskytovatelé počítají provoz odlišně a souhrn zahrnuje i provoz před optimalizacemi.

Aktuální sazby: přenos 20 kreditů/GB, požadavky 2 kredity/10 000, úspěšné produkční nasazení 15 kreditů a výpočty 10 kreditů/GB-h. Model přenosu a požadavků: `3,52 × 20 + 281 000 / 10 000 × 2 = 126,6` kreditu.

| Produkční nasazení za měsíc – scénář, ne zjištěná četnost | Kredity včetně modelového provozu, bez výpočtů | Rezerva do 300 |
|---:|---:|---:|
| 8 | 246,6 | 53,4 |
| 10 | 276,6 | 23,4 |
| 11 | 291,6 | 8,4 |
| 12 | 306,6 | −6,6 |

Při těchto předpokladech 12 nasazení překročí Free ještě před výpočty; ani 11 není bezpečný rozpočet. Náhledová nasazení nemají poplatek za nasazení, jejich provoz se ale účtuje. Vyčerpání kreditů pozastaví všechny projekty účtu. Free nemá automatické dokoupení kreditů; u placených plánů je ve výchozím stavu vypnuté. [Zdroj sazeb a pozastavení](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/).

Nejde o prognózu příštího měsíce ani pevnou kvótu 11 nasazení. Výpočet nezahrnuje růst návštěvnosti, boty, výpočty ani další projekty. Vercel CPU, paměťové a ISR jednotky nelze bez měření přímo převést na spotřebu Netlify.

## Požadavky aplikace a ověření případné migrace

Kontrola aktuálního kódu na `80e8d7d`:

| Součást NATURCHEM | Co musí zůstat funkční |
|---|---|
| Next.js 16, App Router, React 19 | Produkční build, serverové komponenty a statické stránky. |
| `next.config.ts`, `src/lib/redirects.ts` | Česká URL bez `/cs`, jazykové verze, trvalá přesměrování, koncová lomítka, bezpečnostní a cache hlavičky. |
| Články z lokálních Markdown souborů, `revalidate = false` | Stejné datum zveřejnění, neveřejné koncepty, dostupnost souborů a správné zahřátí cache po nasazení. |
| `/api/contact`, `/api/satisfaction-survey` | Node route handlers, validace, Resend a skutečné doručení; `generate_lead` až po úspěchu. |
| Decap CMS a GitHub OAuth | Callback, bezpečná cookie, oprávnění repozitáře a správná základní doména. Náhled nesmí omylem publikovat do `main`. |
| `next/image`, statické AVIF/WebP a fonty | Správné rozměry, formáty, MIME, cache a výkon na mobilu. |
| Vercel Speed Insights | Rozhodnout o náhradě či podmíněném vypnutí; zachovat GA4 a souhlasy. |
| `prebuild` skripty | Dostupný Python a reprodukovatelné generování mapy článků, vyhledávání a podkladů pro roboty. |

Netlify deklaruje podporu hlavních použitých funkcí včetně App Routeru, ISR, route handlers, obrázků, přesměrování a Turbopacku. Jeho adaptér ale může při prvním přístupu ke statické stránce po nasazení použít funkci pro čtení route cache. Nelze tedy přenést závěr „nulové nové ISR zápisy na Vercelu“ na náklady jiné platformy. Experimentální funkce nejsou zaručeně stabilní; náš `globalNotFound` vyžaduje test. Dokumentace také omezuje rewrites do statických souborů `public`; současné české rewrites směřují do aplikačních cest, nikoli do těchto souborů. [Oficiální podpora a omezení Next.js](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/).

Názvy potřebných proměnných (bez hodnot): `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAILS`, `SATISFACTION_TO_EMAILS`, `NEXT_PUBLIC_SITE_URL`, `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`. Do migračního náhledu nepřenášet produkční oprávnění bez potřeby a schválení.

## Publikování článků

Při současné statické architektuře se obsah aktualizuje nasazením, ne pouhým uplynutím data. Kód výslovně vyžaduje build v den publikace nebo později. V české složce jsou nyní nalezena zářijová data 2. 9. a 8. 9.; neznamená to samo o sobě souhlas s publikací ani ověření odborného obsahu. Tento audit jejich obsah, stav ani datum nemění.

Denní prázdné sestavování není potřebné doporučovat bez rozmyslu: na Netlify by i 30 úspěšných produkčních nasazení představovalo 450 kreditů před návštěvností. Pro případnou automatizaci nejprve schválit publikační politiku a spouštět nasazení pouze při skutečně splatném schváleném obsahu. V tomto auditu nevznikla automatizace ani deploy hook.

## Rozhodnutí a bezpečný další krok

1. Uživatel rozhodne, zda schvaluje placený Vercel, nebo chce nejprve samostatný neprodukční pilot jiné platformy. Z tohoto dokumentu neplyne souhlas s platbou nebo migrací.
2. U Pro před potvrzením ověřit konečnou cenu, doplňky a rozpočtovou politiku. Nechat doménu i aplikaci beze změny.
3. U migrace nejprve izolovaný náhled bez indexace a bez zápisu do produkčního CMS; `npm run verify`, sitemap/routing smoke testy, canonical/hreflang/schema, 404, mobil, formulář a OAuth. Odeslání skutečného testovacího e-mailu předem vymezit a odlišit od obchodních leadů.
4. DNS a produkční přepnutí až po schválení, s návratem na dosavadní ověřené nasazení. Původní poskytovatele nevypínat před ověřením funkčnosti a návratové cesty.

Dokument je lokální podklad. Neproběhl nový commit ani push, aby samotná dokumentace nespustila další produkční build.
