# Audit doručení poptávek přes Resend — 3. 9. 2026

## Obchodní závěr

Interní oznámení kontaktního formuláře se od 1. 9. 2026 nedoručují do hlavní firemní schránky. Resend má adresu `naturchem@naturchem.cz` na účtovém suppression listu s důvodem `Complaint`. Kontaktní API přesto při pokusu o odeslání získá ID zprávy a může návštěvníkovi vrátit úspěch; následný `generate_lead` proto není důkaz doručení firmě.

## Ověřené skutečnosti

- Odesílací doména `naturchem.cz` je v Resendu `Verified`.
- Suppression detail uvádí adresu `naturchem@naturchem.cz`, původ `Complaint` a přidání 1. 9. 2026 v 19:23.
- Zdrojová interní zpráva byla odeslána a doručena v 19:21, v 19:23 označena jako stížnost a následně potlačena. Její obsah byl zjevný finanční spam; osobní a kontaktní údaje odesílatele se do tohoto auditu neukládají.
- Novější interní zprávy kontaktního formuláře mají stav `Suppressed`; zdvořilostní potvrzení na adresy odesílatelů se přitom mohou zobrazovat jako `Delivered`.
- V rozhraní Vercelu jsou `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` a `CONTACT_TO_EMAILS` přítomné pro produkci. Historie Resendu ukazuje interní zprávy formuláře pouze pro jednoho příjemce, takže v současnosti chybí funkční druhá doručovací cesta.
- Souhrn Resendu za 20. 8.–3. 9. eviduje 46 odesílaných e-mailů, 0 bounce a 1 complaint; complaint rate je 2,17 % a rozhraní ji označuje jako rizikovou.
- V posledních 15 dnech jsou vedle zjevného spamu vidět také dříve doručená oznámení s tématy měření hluku, osvětlení a pracovního prostředí. Z pouhého předmětu nelze určit jejich obchodní kvalitu ani to, zda je pracovník firmy zpracoval.

## Příčina

Interní oznámení chodilo ze stejné adresy, na kterou bylo doručováno. Když byla jedna zjevně spamová poptávka v poště označena jako spam, poskytovatel zaregistroval complaint pro příjemce. Resend od té chvíle další zásilky na tuto adresu preventivně potlačuje. Podle dokumentace Resendu je suppression po complaintu záměrná ochrana reputace odesílatele a platí pro celý účetní region.

## Bezpečný postup nápravy

1. Potvrdit, že complaint vznikl označením spamové poptávky ve firemní schránce a že `naturchem@naturchem.cz` má nadále přijímat formulářové zprávy.
2. Až potom odstranit adresu ze suppression listu. Pokud by příčina nebyla vyřešená a adresa si znovu stěžovala, suppression se vrátí a opakované complainty poškodí reputaci odesílací domény.
3. Nastavit v `CONTACT_TO_EMAILS` druhého skutečně sledovaného firemního příjemce. Konkrétní adresu nelze zvolit bez potvrzení vlastníka; web uvádí také `hezina@naturchem.cz`, katalog Firmy.cz však používá `naturchem@seznam.cz`.
4. Po obnovení provést jeden předem schválený interní end-to-end test s jedinečným ID a ověřit stav `Delivered` v Resendu i přijetí v obou schránkách.
5. Odděleně posílit ochranu formuláře proti botům. Honeypot a serverless paměťový rate limit zjevný automatizovaný spam nezastavily; volit ochranu s nízkým třením pro skutečné B2B návštěvníky.
6. Pro dlouhodobou kontrolu použít podepsaný Resend webhook pro `email.delivered`, `email.suppressed`, `email.bounced`, `email.failed` a `email.complained`; samotné přijetí `POST /emails` neznamená doručení.

## Co nebylo provedeno

- Adresa nebyla ze suppression listu odstraněna.
- Nebyla změněna produkční proměnná příjemců.
- Nebyla odeslána testovací ani skutečná poptávka.
- Nebyly kopírovány hodnoty API klíčů ani jiné tajné proměnné.

## Primární zdroje

- Resend: https://resend.com/docs/dashboard/emails/email-suppressions
- Resend webhook `email.suppressed`: https://resend.com/docs/webhooks/emails/suppressed
- Resend event types: https://resend.com/docs/webhooks/event-types
- Resend retrieve email (`last_event`): https://resend.com/docs/api-reference/emails/retrieve-email
