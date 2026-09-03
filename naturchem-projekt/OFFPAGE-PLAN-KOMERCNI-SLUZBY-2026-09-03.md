# Off-page plán pro komerční služby — 3. 9. 2026

## Cíl a výchozí stav

GSC eviduje 315 externích odkazů. Z toho 313 míří na homepage a 2 na stránku referencí. Mezi souhrnnými externími cíli nejsou stránky hlavních služeb. Cílem proto není počet libovolných odkazů, ale důvěryhodné oborové zmínky, které vedou na relevantní službu a mohou přivést B2B návštěvníka.

Výchozí stav pro měření:

| Metrika | 3. 9. 2026 |
|---|---:|
| Externí odkazy v GSC | 315 |
| Odkazy na homepage | 313 |
| Odkazy na reference | 2 |
| Hlavní servisní URL mezi externími cíli | 0 |

## Pořadí cílových stránek

1. `/autorizovana-osoba-mereni-emisi/` — provozovatelé kotelen, lakoven a technologií.
2. `/sluzby/hlukove-studie/` — projektanti, dodavatelé VZT a tepelných čerpadel, stavební a developerské zdroje.
3. `/mereni-hluku-ceske-budejovice/` — regionální profily a partneři; nejdříve po kontrole kanibalizace 6. 9.
4. `/sluzby/mereni-vibraci/` — BOZP/EHS partneři; obsah stránky neměnit během EXP-004.

## Ověřené profily a příležitosti

| Zdroj | Ověřený stav | Doporučená akce | Zamýšlený cíl | Závislost / riziko |
|---|---|---|---|---|
| Český institut pro akreditaci | Profil NATURCHEM č. 1599 uvádí IČO 27504379, osvědčení 562/2023 platné do 26. 10. 2028, rozsah měření a odkaz na homepage. | Zachovat jako hlavní nezávislý důkaz identity. Do `Organization` JSON-LD doplnit profil jako `sameAs` a DIČ jako `vatID`; IČO už zůstává samostatným identifikátorem. Nežádat účelový hluboký odkaz, pokud databáze dovoluje jen web organizace. | `/#organization` ↔ profil ČIA | Nízké riziko; údaje jsou ověřené na oficiálním profilu ČIA. Strukturovaná data sama negarantují lepší pozici. |
| Firmy.cz / Mapy.com | Profil existuje v kategoriích měření hluku a ekologické poradenství. Uvádí telefon `+420 736 778 391`, e-mail `naturchem@seznam.cz` a homepage. Oficiální nápověda dovoluje měnit kontakty, popis, kategorie, štítky a vlastní akční tlačítko s cílovou URL. | Přihlásit se do správy profilu. Nejdříve potvrdit, zda uvedený telefon a e-mail zůstávají záměrně veřejným obchodním kontaktem. Potom sjednotit primární údaje s webem a doplnit vlastní akci `Poptat měření hluku` na lokální landing page. | `/mereni-hluku-ceske-budejovice/` | `[OVERIT S HEZINOU]` primární telefon, e-mail, otevírací doba a vlastnictví profilu. Cílovou URL změnit až po GSC kontrole 6. 9. |
| Živéfirmy.cz | Profil obsahuje současná čísla `603 216 983` a `774 100 570`, dvě e-mailové adresy, tři provozovny, homepage a relevantní činnosti. Veřejný formulář `Opravit` slibuje vyřízení do tří pracovních dnů. Položka `Reference` vede znovu jen na homepage. | Potvrdit oba e-maily a provozní dobu. Po schválení požádat o nahrazení odkazu v položce `Reference` přesnou URL `/reference/` a o zachování relevantních činností emisí, hluku, vibrací a studií. | `/reference/`; profil identity | `[OVERIT S HEZINOU]` správnost druhého e-mailu, provozní doba a veřejné reference. Odeslání formuláře je externí změna a vyžaduje schválení. |
| Info‑Budějovice | Profil má adresu českobudějovické provozovny, `603 216 983`, `naturchem@naturchem.cz` a kategorii měření emisí. Údaje odpovídají webu. | Profil chránit; po přihlášení ověřit možnost rozšířit popis o hlukové studie a pracovní prostředí bez přidávání neověřených tvrzení. | Homepage nebo příslušná služba, dovolí-li profil více URL | Střední hodnota. Neplatit za profil bez doložených zobrazení či leadů. |
| Netkatalog | NATURCHEM se objevuje u relevantních měření, ale také na nerelevantní stránce `rozptyl popela na rozptylové loučce`. Text profilu navíc obsahuje překlep `anylýzy`. | Nepoužívat jako zdroj nových placených odkazů. Po schválení požádat o odstranění nerelevantního přiřazení a opravu textu; nejdříve chtít potvrzení výsledné kategorie a cílové URL. | Zachovat jen relevantní profil | Riziko tematického znečištění a nekvalitních automatických kategorií. |
| Živéobce.cz | NATURCHEM je uveden v českobudějovickém oborovém výpisu s adresou a homepage. | Ověřit detail profilu a kontakty. Hluboký odkaz prosazovat jen tehdy, pokud je přirozeně svázán s konkrétní kategorií služby. | `/mereni-hluku-ceske-budejovice/` nebo homepage | Nízká až střední hodnota; neplatit bez měřeného přínosu. |
| ALME | Asociace sdružuje autorizované laboratoře pro měření emisí a má veřejný seznam laboratoří s odkazy. NATURCHEM v aktuálním veřejném seznamu nalezen nebyl. Stránka `Výměna odkazů` obsahuje tematicky nesouvisející odkazy. | Nežádat o výměnu odkazů. Členství řešit jen tehdy, pokud má odborný a obchodní smysl nezávislý na SEO; poté žádat standardní profil člena. | `/autorizovana-osoba-mereni-emisi/` nebo homepage podle pravidel asociace | `[OVERIT S HEZINOU]` současné členství a odborný přínos. SEO samo není důvod ke členství. |
| Jihočeská hospodářská komora | Veřejný katalog členů existuje. NATURCHEM nebyl ve veřejně dohledatelných výsledcích potvrzen. | Nejprve ověřit členství. Pokud firma členem je, doplnit věcný profil a nabídnout odborný seminář pro výrobní firmy; pokud není, posoudit členství obchodně, ne kvůli odkazu. | Lokální hluk / pracovní prostředí podle tématu | `[OVERIT S HEZINOU]` členství. Náklady musí obhájit kontakty nebo leady, ne samotný odkaz. |
| TZB‑info | Portál přijímá odborné články, zveřejňuje pokyny pro autory a má redakci pro stavebnictví, vytápění a vzduchotechniku. Téma hluku zdrojů tepla je na portálu relevantní. | Nabídnout původní odborný článek nebo výrazně přepracovanou verzi po odborné revizi: `Hluk tepelného čerpadla a VZT před instalací: jaké podklady potřebuje projektant a KHS`. Autor Ing. František Hezina; odkaz má vést na tematický článek nebo hlukovou studii pouze tam, kde jej redakce považuje za užitečný. | `/sluzby/hlukove-studie/` a podpůrný článek | Vysoká tematická relevance, ale bez garance přijetí či odkazu. Neposílat bez odborného schválení textu a schválení oslovení redakce. |

## První balík kroků

1. `[OVERIT S HEZINOU]` Který telefon a e-mail mají být primární ve všech katalozích: web používá `603 216 983`, `774 100 570` a `naturchem@naturchem.cz`; Firmy.cz uvádí `736 778 391` a `naturchem@seznam.cz`.
2. Po GSC odečtu 6. 9. připravit přesnou úpravu Firmy.cz včetně akčního tlačítka na lokální měření hluku.
3. Připravit a po schválení odeslat opravu Živéfirmy: přesná URL referencí, potvrzené kontakty a provozní doba.
4. Po schválení požádat Netkatalog o odstranění nerelevantního zařazení k rozptylu popela a opravu překlepu.
5. Z existujícího odborného obsahu připravit osnovu pro TZB‑info. Každé odborné tvrzení a finální článek musí před odesláním schválit Ing. Hezina.
6. Vyžádat od firmy seznam 10–20 skutečných partnerů a 3–5 anonymizovatelných zakázek. Bez vztahu nebo souhlasu nikoho neoslovovat jménem klienta.

## Návrhy žádostí — zatím neodesílat

### Oprava katalogového profilu

> Dobrý den, prosíme o aktualizaci profilu společnosti NATURCHEM, s.r.o., IČO 27504379. Přikládáme přesné údaje a cílovou stránku odpovídající dané kategorii. Prosíme také o odstranění nerelevantních kategorií, které nepopisují naši činnost. Před zveřejněním nám prosím potvrďte výslednou podobu profilu. Děkujeme.

### Nabídka odborného článku

> Dobrý den, rádi bychom nabídli praktický odborný článek pro projektanty a provozovatele budov na téma hluku tepelných čerpadel a VZT před instalací. Text by vysvětlil potřebné vstupy, rozdíl mezi studií a následným měřením a nejčastější chyby v projektu. Autorem bude Ing. František Hezina z akreditované laboratoře NATURCHEM. Obsah přizpůsobíme Vašim pokynům pro autory a doplníme primární právní a metodické zdroje. Má pro Vaši redakci takové téma smysl?

## Co má nejvyšší hodnotu

- Ověřený profesní profil, který jednoznačně propojuje firmu, oprávnění a web.
- Odkaz od skutečného technologického, projekčního nebo BOZP partnera v kontextu společné práce.
- Anonymizovaná případová studie se souhlasem klienta nebo partnera.
- Původní odborný materiál pro relevantní profesní portál.
- Úplné a jednotné kontaktní údaje v profilech, které už Google zná.

## Čemu se vyhnout

- nákupu balíků odkazů, výměnným patičkám a nerelevantním katalogům;
- vytváření městských doorway stránek bez skutečné místní nabídky;
- přebírání oprávnění, členství, referencí, cen nebo termínů konkurence;
- hromadnému publikování téměř stejných článků;
- změně více prvků stejné cílové stránky během probíhajícího experimentu.

## Evidence a měření

Pro každý získaný nebo opravený profil zapisovat:

| Datum | Zdrojová doména | Typ zásahu | Cílová URL | Stav schválení | Referral sessions | `form_start` | ověřené leady | Kontrola 28/56 dní |
|---|---|---|---|---|---:|---:|---:|---|
| — | — | — | — | — | — | — | — | — |

Po 28 a 56 dnech kontrolovat GSC výkon konkrétní cílové stránky a tematických dotazů. V GA4 sledovat referral/organic vstupy, cestu do formuláře a pouze skutečně přijaté `generate_lead`. Samotný počet odkazů ani změna pozice bez poptávky není obchodní výsledek.

## Zdroje ověření

- ČIA — profil NATURCHEM č. 1599: `https://www.cai.cz/?subjekt=1599-naturchem-s-r-o`
- Firmy.cz — profil NATURCHEM: `https://www.firmy.cz/detail/1316006-naturchem-s-r-o-ceske-budejovice-4.html`
- Firmy.cz — oficiální nápověda k úpravě profilu: `https://napoveda.firmy.cz/firemni-profil/uprava-profilu/`
- Živéfirmy.cz — profil NATURCHEM: `https://www.zivefirmy.cz/naturchem_f1145135`
- Info‑Budějovice — profil NATURCHEM: `https://www.info-budejovice.cz/naturchem/index.html`
- Netkatalog — příklad nerelevantního zařazení: `https://www.netkatalog.cz/k/rozptyl-popela-na-rozptylove-loucce/ceske-budejovice/`
- ALME — veřejný seznam laboratoří: `https://alme.cz/laboratore`
- Jihočeská hospodářská komora — seznam členů: `https://www.jhk.cz/clenstvi/clenove`
- TZB‑info — kontakty a pokyny pro autory: `https://www.tzb-info.cz/kontakty`, `https://www.tzb-info.cz/pokyny-pro-autory-clanku-zpracovavanych-pro-tzb-info`
- Google Search Central — Organization structured data: `https://developers.google.com/search/docs/appearance/structured-data/organization`
