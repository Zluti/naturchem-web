# Další odůvodněné optimalizace — 31. 8. 2026

Stav: balík na `codex/growth-followups-2026-08-31`, výchozí commit `80e8d7dc3f4f859e114fdc5c995918076662d521`. Dne 31. 8. uživatel schválil vytvoření commitu a push této připravené práce do `Ikaros277/naturchem-web`; výsledný hash bude v předání. Sloučení do main a produkční nasazení nejsou součástí tohoto kroku. Automatické publikování zůstává vypnuté. Žádná změna tarifu, DNS, tajných hodnot, CMS ani analytických nastavení.

## Co se mění a proč

Aktualizace po následném schválení produkce: `fd26dca` byl 31. 8. 2026 sloučen do main a nasazen jedním produkčním deploymentem; Vercel dokončení 11:20:24 SELČ. Produkční kontrola 500 URL, 212 dalších odkazů a mobilního formuláře prošla. Podrobný aktuální stav: [DEPLOYMENT-FD26DCA-2026-08-31.md](DEPLOYMENT-FD26DCA-2026-08-31.md). Publikační automatika nebyla aktivována. Původní úvod tohoto dokumentu zaznamenává dřívější fázi schválení samotného commitu/pushe.

### Spolehlivější a čitelnější poptávkový formulář — DATA-005

- Původně se nevyhovující přílohy odmítly teprve po přenosu na server. Nyní se jejich typ, počet a společná velikost kontrolují již v prohlížeči; server používá stejnou funkci. Stávající limity 5 souborů / 4 MiB se nezvyšují.
- Chybové hlášky k přílohám jsou lokalizované CS/EN/DE a přístupné čtečkám. Při chybě zůstane vyplněný text; chybějící kontakt přesune kurzor na e-mail. Mobilní pole mají 16 px místo 15,2 px.
- Synchronní zámek brání dvěma souběžným požadavkům z rychlého dvojkliku v jednom formuláři. Nejde o globální serverovou deduplikaci opakovaných pokusů z více zařízení nebo po obnovení stránky.
- `generate_lead` vyžaduje úspěšnou odpověď se serverovým `leadId` a prázdný honeypot. Kliknutí nadále není poptávka. Souhlas s analytikou a původní neosobní parametry zůstávají zachované.
- Odpověď stále čeká na úspěšné přijetí interního e-mailu službou Resend. Zdvořilostní potvrzení zákazníkovi se provádí až po odpovědi; jeho selhání nesmí změnit přijatou poptávku na chybu. Resend přijetí ještě nedokazuje doručení do cílové schránky.
- Během místního testu nefunkčních JS assetů se projevil výchozí HTML GET: syntetický obsah formuláře se objevil v URL. Explicitní POST na stávající API s multipart daty tomu zabrání i bez JavaScriptu. Bez JS se vrací prostá JSON odpověď API, nikoli plnohodnotná interaktivní potvrzovací obrazovka; nejde o kompletní bezskriptový redesign.

Hypotéza: méně přerušených mobilních pokusů a přesnější evidence přijatých poptávek. Skutečný počet dosavadních ztrát, duplicity ani zrychlení odpovědi nejsou změřeny. Po nasazení sledovat chyby API, mobilní `form_start` → `generate_lead` a anonymní shodu `lead_id` se skutečnými e-maily a obchodním stavem. Do repozitáře neukládat osobní údaje.

### Shodné veřejné seznamy článků — TECH-007

Před změnou měly web a vyhledávání 69 českých článků, ale jazyková mapa a `llms-articles.txt` 71, včetně budoucích URL na 2. a 8. 9. Regulární parser navíc zkracoval víceřádkové titulky a nezachoval některé výňatky.

Jeden Node generátor nyní používá gray-matter pro úplný YAML a skutečnou funkci pražských publikačních dat ze zdrojového kódu webu. Jazyková mapa, vyhledávání a AI index zahrnují stejný veřejný obsah: k 31. 8. CS 69 / EN 56 / DE 56. Koncepty, budoucí a neplatná data jsou vyřazena. Rozhoduje veřejný slug z frontmatteru, nikoli jen název souboru.

Build již pro tyto indexy nepotřebuje Python. Staré Python vstupní skripty zůstávají kompatibilními obálkami; kontrola potvrdila bajtově shodné výstupy. Nevznikly nové závislosti ani nové indexovatelné obsahové URL.

Cíl: neposílat návštěvníky ani roboty na dosud neveřejné články a zachovat úplné názvy ve vyhledávání. Přínos v AI citacích nebo pozicích není prokázán; technická shoda indexů sama o sobě není rankingový faktor ani obchodní výsledek.

### Jedna přesnější obchodní cesta IPPC — EXP-012

Nový odečet ze [Search Console](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Anaturchem.cz), Web, přesný dotaz `ippc povolení`:

- 1.–28. 8. 2026: 14 zobrazení, 0 kliknutí, CTR 0 %, pozice 17,4.
- 4. 7.–28. 8. 2026: 17 zobrazení, 0 kliknutí, CTR 0 %, pozice 17,6.
- V obou obdobích všechna zobrazení připadla na `/sluzby/ippc-integrovana-povoleni/`.

V článku `/poradna/ippc-kdy-provoz-potrebuje-integrovane-povoleni/` je jediný obecný odkaz na přehled služeb nahrazen přesným odkazem na IPPC. Stávající služba pokračuje do formuláře s viditelně zaškrtnutou volbou IPPC. Žádný další CTA box, změna title/H1 ani nový právní nebo odborný příslib.

Hypotéza: kratší cesta relevantního čtenáře k poptávce a jasnější interní tematická vazba. Vyhodnotit GSC a poptávkovou cestu v GA4 po 28/56 dnech od skutečného nasazení. Objem je zatím příliš malý pro spolehlivý závěr či další experiment se snippetem. EXP-001 až EXP-011 se obsahově nemění.

### Příprava publikování v den vydání bez časového ISR — TECH-006

Pouhé uplynutí budoucího data nevygeneruje nové statické HTML. Připravený workflow provede dvě kontroly denně, v 05:23 a 13:23 UTC (v létě 07:23 / 15:23 v Praze). Bez nově splatného článku nepožaduje deployment. GitHub cron může mít zpoždění, při přetížení může běh odpadnout a u veřejného neaktivního repozitáře se může po 60 dnech vypnout; přesnou hodinu ani bezpodmínečné vydání týž den neslibovat. Viz [GitHub — schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

Nový `/publication-state.json` vzniká při buildu, má `noindex`, není v sitemap a uvádí pouze veřejné identifikátory, data vydání, čas buildu a commit. Je plně statický (`revalidate = false`), nepřidává návštěvnickou funkci ani časové ISR.

Kontrola odmítne rozdílný produkční commit a main, chybějící starší článek, neplatný stav, změnu main během kontroly i čekající nebo neúspěšný Vercel status. Pokud už podle statusu proběhl build po datu vydání a článek přesto chybí, zastaví se. Jeden běh provede nejvýše jeden POST bez automatického opakování uvnitř běhu. Vzdálené stavy nejsou transakční: při nejistém výsledku je nutné automatiku vypnout a zkontrolovat Vercel, ne slepě znovu spouštět workflow.

#### Aktivace — pouze po samostatném souhlasu s produkční automatikou

1. Schválit a nasadit tento balík běžným kontrolovaným releasem; na produkci ověřit statický snímek a shodu commitu s main.
2. Ověřit správný projekt NATURCHEM ve Vercelu a vytvořit hook pro jeho produkční větev `main`. Uložit jej jako GitHub Actions secret `VERCEL_DEPLOY_HOOK` pouze v `Ikaros277/naturchem-web`. Hook URL je tajná a nepatří do repozitáře ani reportu. Formát URL samotný neprokazuje příslušnost k projektu — tu musí ověřit správce. Viz [Vercel — Deploy Hooks](https://vercel.com/docs/deploy-hooks).
3. Spustit `npm run publication:check` ze schváleného, čistého a nasazeného main. Před prvním nasazením snímek neexistuje a kontrola má skončit chybou bez deploymentu.
4. Až poté nastavit repository variable `ENABLE_SCHEDULED_PUBLICATION=true`. Výchozí chybějící/false proměnná celý job vypíná. Workflow má pouze čtecí GitHub oprávnění; deploy hook je jediná cesta k nasazení.
5. Zapnout upozornění na selhání workflow a při prvním skutečném vydání ověřit článek, homepage, Poradnu, sitemap a indexy. Neprovádět zkušební produkční deployment bez splatného článku.
6. Nouzové vypnutí: `ENABLE_SCHEDULED_PUBLICATION=false`. Při chybě/timeoutu nejprve prohlédnout Vercel deployment a stav článku; nerozjíždět opakované buildy naslepo.

Žádný z těchto aktivačních kroků nyní neproběhl. Nové články s dnešním datem mohou nadále projít stávajícím CMS Publish → commit → deployment postupem. Budoucí články bez zapnuté automatiky potřebují schválený deployment v den vydání nebo později.

## Náklady a hranice

- Nepřidává se časové ISR ani nový návštěvnický dynamický endpoint. Snímek je jeden malý statický soubor navíc.
- Dvě kontroly denně nejsou dva buildy denně; deployment se požaduje jen při zjištěném chybějícím splatném obsahu a splněných pojistkách. Kontroly spotřebovávají GitHub Actions prostředky a statické požadavky, skutečný build Vercel prostředky. Nejde o garanci všech free kvót.
- Potvrzovací e-mail přes [Next.js after](https://nextjs.org/docs/app/api-reference/functions/after) běží po odpovědi v téže invokaci, ale stále spotřebovává prostředky a podléhá limitu její délky. Není to externí trvalá fronta ani garantované doručení.
- Odmítnutí neplatných příloh před uploadem omezuje zbytečné přenosy; úspora v ostrém provozu zatím není změřena.
- Rozhodnutí o placeném hostingu se tímto balíkem nemění. Stav podmínek tarifu je oddělený v HOSTING-DECISION-2026-08-31.md.

## Ověření a předání

- `npm run verify` po finální úpravě mobilního písma: PASS, exit 0. Lint, TypeScript, testy předvyplnění, statického cache rozpočtu, routování článků, doručování a publikace i produkční build prošly.
- Finální build vytvořil 559 statických stran/výstupů včetně nového statického snímku; bez chyb, 16 existujících lint warnings a stávající metadataBase build warnings. Ve vygenerovaném HTML nebyl nalezen `content="http://localhost:3000`.
- Smoke na správném serveru `http://127.0.0.1:3103`: 500 URL a 212 dalších interních odkazů bez chyby, směrování CS/EN/DE, canonical, hreflang, redirecty, 404/noindex a neplatný API požadavek bez odeslání e-mailu prošly.
- 55 CSS/JS asset kontrol ze čtyř dotčených stránek vrátilo 200. Shoda veřejného snímku, všech search indexů, jazykové mapy a AI indexu prošla; opakované načtení neměnilo `builtAt`, v prerender manifestu je revalidace false.
- Browser: předvyplnění IPPC je viditelné, při chybějícím kontaktu zůstává text a fokus přejde na e-mail. Finální formulář má na 320/390 px skutečně 16px písmo a žádný horizontální přetok; kontrola desktopu 1440 px rovněž bez přetoku. Finální HTML potvrzuje explicitní POST / multipart. Homepage zůstává bez obsahových změn.
- Odesílání e-mailů, chyby poskytovatele, zákaznické potvrzení, dvojklik a deployment hook byly testovány s maketami bez externích zápisů. Nebyla odeslána skutečná poptávka ani testovací GA4 lead.
- `localhost:3103` během QA odpovídal jinou místní instancí s chybějícími assety; výsledky této adresy nejsou důkazem finálního sestavení. Použít explicitně IPv4 adresu testovacího procesu.

Před budoucím releasem znovu zkontrolovat diff a stav produkce. Nesouvisející pracovní soubory a `.agents/` z původního Cursor worktree zůstávají nedotčené. `src/app/[locale]/not-found.tsx` má prázdný obsahový diff a nepatří do balíku. Přiložená TECH-005/POST-RELEASE/HOSTING dokumentace zaznamenává dřívější audity, není novou implementační změnou ani souhlasem s placeným hostingem; její výroky o neprovedeném commitu/deploymentu se vztahují k okamžiku původního auditu.

Rollback: pokud byla aktivována automatika, nejprve ji vypnout. Obnovit předchozí ověřený produkční deployment `80e8d7d` nebo připravit reverzní commit tohoto budoucího releasu a schválený deployment. Žádné databázové migrace ani změny DNS. Předchozí verze vyžaduje ruční vydávání naplánovaných článků.
