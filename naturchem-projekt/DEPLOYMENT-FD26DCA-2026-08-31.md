# Produkční nasazení fd26dca — 31. 8. 2026

## Výsledek

Uživatel po schváleném commitu a pushi výslovně schválil také sloučení do main a jeden produkční deployment. Fast-forward push do `Ikaros277/naturchem-web:main` úspěšně posunul `80e8d7d` na `fd26dca0b9e629dd6d4ff46693c67d54ca23179b`. Práce zůstala na samostatné větvi `codex/growth-followups-2026-08-31`; žádná práce přímo v lokálním main.

[Vercel deployment 79jr5XEHLUrTDuGbtWhyFv8CTvBr](https://vercel.com/ikaros277s-projects/web-naturchem/79jr5XEHLUrTDuGbtWhyFv8CTvBr): Ready, Production, Current, Latest; zdroj main / fd26dca. Dokončen 31. 8. 2026 v 11:20:24 SELČ, trvání 1 min 32 s. Přiřazená ostrá doména [www.naturchem.cz](https://www.naturchem.cz/).

Jeden nový produkční deployment spustila stávající GitHub–Vercel integrace. Nebyl spuštěn ruční rebuild, druhý push do main, deploy hook, změna tarifu, DNS ani nastavení prostředí. Předchozí úspěšný náhled stejného commitu `7XGLkQ4xmYsDkgUYTLNHtiXoo2KQ` je Preview, ne dnešní produkční deployment.

## Co je na produkci

- EXP-012: přesný odkaz IPPC článek → IPPC služba → formulář s viditelně předvolenou službou.
- DATA-005: předběžná validace příloh, ochrana dvojkliku, konverze podmíněná serverovým leadId, explicitní POST a větší mobilní písmo. Interní oznámení se potvrzuje před odpovědí; zákaznické potvrzení je oddělené přes after.
- TECH-007: jednotné úplné YAML titulky a pouze veřejné články v search/AI/jazykových indexech.
- TECH-006: statický publication-state.json je nasazený; opt-in automatika nebyla aktivována, nebyl vytvořen ani nastaven deploy hook. Toto schválení se týkalo jediného nasazení, nikoli budoucích automatických deploymentů.

## Produkční ověření

Ověření dokončeno 31. 8. 2026 v 16:37:48 SELČ; opožděná kontrola nezměnila čas samotného nasazení.

- Veřejný publication-state.json vrací HTTP 200, noindex, commit fd26dca a builtAt `2026-08-31T09:19:47.347Z`; opakované načtení zachovalo čas buildu.
- Shoda veřejného snímku se search indexy: CS 69 / EN 56 / DE 56. AI index obsahuje jejich veřejné odkazy. Budoucí články na 2. a 8. 9. nejsou inzerované a jejich URL stále vracejí 404.
- 500 URL ze sitemap a doplňkových vstupů + 212 dalších interních odkazů: bez chyby. Binární přílohy se kontrolovaly přes HEAD, aby se zbytečně nestahovaly celé dokumenty.
- Kontrola CS/EN/DE jazyka, canonical a hreflang, českých a historických redirectů, 404/noindex, přesného IPPC odkazu, kontaktu a nepřítomnosti localhost metadat prošla.
- 17 odlišných CSS/JS assetů ze čtyř dotčených stránek vrací 200.
- Kontaktní API odmítá GET a jediný záměrně neplatný POST vrátil 400 / ok:false bez leadId. Nebyla odeslána skutečná poptávka ani testovací generate_lead. Doručení do firemní schránky tím není end-to-end ověřené.
- Celkem 789 automatických kontrol, 0 selhání, exit 0. Kontrolní skript je lokální provozní pomůcka `../verify-naturchem-live-release.cjs` mimo webový repozitář (ve složce outputs; cesta relativní k rootu worktree).
- Browser potvrdil ostrý přechod IPPC → předvyplněný formulář a 16px písmo na 390 px bez horizontálního přetoku. Šířky 320/390/1440 px byly ověřené lokálně před nasazením; dodatečná ostrá kontrola 320 px skončila timeoutem prohlížečového nástroje, její výsledek proto není potvrzený. Formulář nebyl vyplňován ani odeslán.

Původní Python 3.14 smoke skončil na místním ověřování certifikátu CA (Basic Constraints), ne na chybě odpovědi webu. Náhradní kontrola proběhla pomocí Node 24 se systémovým úložištěm důvěryhodných certifikátů (`--use-system-ca`), bez vypnutí kontroly TLS. Přístup k JSON souboru přímo v Browseru byl blokován klientem; standardní HTTPS kontrola potvrdila 200 a správný obsah. Dočasně odmítnutý zvýšený terminálový dotaz na GitHub nebyl opakován; stav produkce byl ověřen čtením Vercel UI a běžnými neprivilegovanými HTTPS kontrolami veřejného webu.

Před releasem stejné zdroje prošly npm run verify včetně produkčního buildu 559 výstupů a mockovaných testů doručování/publikování. Zůstává 16 dřívějších lint upozornění a známé buildové metadataBase výstrahy; nebyly zaměněny za úspěch bez výhrad.

## Měření přínosu a návrat

Toto je důkaz správného nasazení a funkčních technických cest, ne důkaz lepších pozic v Googlu/AI nebo vyššího počtu kvalifikovaných poptávek. Výchozí data a hypotézy zůstávají v RELEASE-GROWTH-FOLLOWUPS-2026-08-31.md a GROWTH-EXPERIMENTY.md. Nové změny vyhodnotit po 28/56 dnech od 31. 8., tedy od 28. 9. / 26. 10. s ohledem na zpoždění dat. U poptávek rozlišovat surové generate_lead, atribuci, skutečné přijaté e-maily a obchodní kvalifikaci.

Případný návrat: předchozí produkce `80e8d7d`, [Vercel 2Yt5V8Hv5Yyer2YPCpHxkdKnDFdn](https://vercel.com/ikaros277s-projects/web-naturchem/2Yt5V8Hv5Yyer2YPCpHxkdKnDFdn). Není databázová migrace ani změna DNS. Při později aktivované publikační automatice ji před rollbackem vypnout. Návrat nyní nebyl potřebný ani provedený.

Tento záznam a aktualizace stavů experimentů zůstávají lokální dokumentací, aby nevznikl druhý produkční deployment jen kvůli záznamu o prvním.
