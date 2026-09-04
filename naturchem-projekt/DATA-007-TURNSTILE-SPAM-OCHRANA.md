# DATA-007: Ochrana kontaktního formuláře pomocí Turnstile

## Důvod

Honeypot a paměťový rate limit serverless funkce nezastavily opakované automatizované zprávy. Jedna z těchto zpráv byla ve firemní schránce označena jako spam, což vyvolalo Resend complaint a následné potlačení všech interních oznámení na hlavního příjemce. Cílem je snížit spam bez přidání běžného vizuálního CAPTCHA a bez blokování návštěvníků před vstupem na web.

## Návrh

- Cloudflare Turnstile se načítá pouze na kontaktní stránce a používá režim `interaction-only`.
- Widget předá jednorázový token ve standardním poli `cf-turnstile-response`.
- Server token vždy ověří přes Siteverify, vyžaduje akci `contact` i hostname aktuálního webu a při chybě neodesílá e-mail ani `generate_lead`.
- Po neúspěšném odeslání se widget znovu vytvoří, protože token lze použít jen jednou.
- Zdvořilostní potvrzení odesílateli se posílá pouze po úspěšném Turnstile ověření. Dokud ochrana není produkčně aktivní, interní oznámení se chová beze změny, ale formulář se nepoužívá jako nechráněný automatický odpovídač na adresy dodané robotem.
- Každý interní příjemce dostane samostatný požadavek na odeslání. Selhání nebo suppression hlavní adresy tak nezablokuje nezávislou záložní adresu; úspěch API stačí pouze tehdy, když poskytovatel přijme alespoň jednu interní kopii. Samotné přijetí stále není důkaz následného doručení.
- Bez JavaScriptu se zobrazí přímý e-mail a telefon; formulář bez ověření se neodešle, pokud je ochrana produkčně aktivní.
- Aktivace je podmíněná současným nastavením `NEXT_PUBLIC_TURNSTILE_SITE_KEY` a `TURNSTILE_SECRET_KEY`. Bez obou klíčů se chování webu nemění.

## Ověření před nasazením

1. Automatické testy: platný token, chybějící token, neplatný token, nesoulad konfigurace a nulové odeslání e-mailu při zamítnutí.
2. Lokální vykreslení s oficiálními testovacími klíči Cloudflare na šířce 390 a 1440 px.
3. Produkční aktivaci provést v jediném deploymentu s klíči omezenými na hostname `naturchem.cz` a `www.naturchem.cz`.
4. Jeden schválený end-to-end test: interní oznámení `Delivered`, zpráva skutečně přijatá a shodné `lead_id`.

## Vyhodnocení

- Resend: počet interních zpráv, `suppressed`, complaint rate a poměr potvrzení odesílatelům vůči interním oznámením.
- GA4: `form_start` a `generate_lead`; pokles falešných leadů se nesmí vydávat za pokles skutečné poptávky.
- Obchod: počet skutečně přijatých a kvalifikovaných poptávek podle `lead_id`.
- Turnstile: počet výzev a solve rate; při problému na mobilu ochranu upravit nebo bezpečně vypnout odebráním obou klíčů a novým deploymentem.

## Externí kroky nutné k aktivaci

- potvrdit sledovaného záložního příjemce formuláře;
- odstranit hlavní adresu ze suppression listu až po potvrzení příčiny complaintu;
- vytvořit Turnstile widget a uložit oba klíče pouze do produkčních Vercel Environment Variables;
- přidat případné preview/local hostnames jen pro samostatné testovací klíče, ne do produkčního widgetu.

## Stav 4. 9. 2026

- Turnstile kód je na produkci, ale oba produkční klíče stále chybějí a widget se nezobrazuje.
- Resend nadále potlačuje interní oznámení pro `naturchem@naturchem.cz`; nové automatické zprávy současně dostávají doručené potvrzení na adresu odesílatele.
- Třicetidenní historie Resendu neobsahuje zprávu na `hezina@naturchem.cz`, `zilkova@naturchem.cz` ani veřejnou katalogovou adresu, takže jejich skutečné přijetí nelze odvodit jen z existence schránky. Dřívější víceadresátové souhrny na připojený Gmail byly doručené, ale po complaintu hlavního příjemce jsou nové společné zprávy označené jako `Suppressed`; to potvrzuje potřebu samostatného odeslání každému příjemci.
- Pojistka proti nechráněnému autoresponderu a nezávislé odesílání každému internímu příjemci jsou commitnuté pouze lokálně na větvi `codex/fix-inquiry-delivery-2026-09-04`. Kompletní `npm run verify` prošlo: lint bez chyb se 16 existujícími upozorněními, TypeScript, všechny automatické kontroly a produkční build 559 výstupů. Větev není pushnutá a změna není nasazená.
- K bezpečné produkční nápravě stále chybí potvrzený záložní příjemce, přihlášení do Cloudflare pro vytvoření Turnstile widgetu, odstranění suppression až po aktivaci ochrany a jeden kontrolovaný end-to-end test.

## Primární zdroje

- https://developers.cloudflare.com/turnstile/get-started/
- https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://developers.cloudflare.com/turnstile/plans/
