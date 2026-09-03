# NATURCHEM web MVP

Prvni verze firemniho webu postavena na Next.js (App Router, TypeScript).

## Spusteni lokalne

```bash
npm install
npm run dev
```

Web poběží na `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Kontaktní formulář (e-mail přes Resend)

Formular odesílá poptávky přes **Resend Node SDK** (`resend`) v `src/app/api/contact/route.ts`. API klíč se **nikdy** neukládá do repozitáře — použij proměnnou **`RESEND_API_KEY`** (lokálně `.env.local`, na Vercelu Environment Variables).

### Lokálně

1. V kořeni projektu spusť `npm install` (nainstaluje balíček `resend`).
2. Zkopíruj `.env.example` do `.env.local`.
3. V Resend vytvoř API klíč a doplň `RESEND_API_KEY=re_...` (**místo** zástupného textu vlož svůj skutečný klíč z Resend).
4. Nastav `CONTACT_FROM_EMAIL` a `CONTACT_TO_EMAILS` (viz příklad v `.env.example`).
5. Restartuj `npm run dev` a otestuj `/kontakt`.

### Vercel (produkce)

1. **Settings → Environment Variables** u projektu.
2. Přidej stejné proměnné pro prostředí **Production** (a případně Preview).
3. V Resend **ověř doménu** `naturchem.cz` a jako odesílatele použij např. `naturchem@naturchem.cz`.
4. **Redeploy** projektu (změny env se na starém buildu neprojeví).

Bez `RESEND_API_KEY` nebo bez potvrzeného ID odeslání od Resendu vrátí formulář viditelnou chybu a událost `generate_lead` nevznikne. Po přijetí e-mailu poskytovatelem se do serverového logu zapíše pouze neosobní ID poptávky, ID zprávy a počet příjemců; obsah poptávky ani kontaktní údaje se nelogují.

### Ochrana proti automatizovanému spamu

Kontaktní formulář podporuje Cloudflare Turnstile bez vizuálního CAPTCHA při běžném průchodu. V Cloudflare vytvoř widget pro `naturchem.cz` a na Vercelu nastav současně:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Klientský token se povinně ověřuje serverovým Siteverify API s akcí `contact` a hostname aktuálního webu; token je jednorázový a po chybě formulář načte nový widget. Pokud je nastaven jen jeden klíč, API záměrně vrátí konfigurační chybu. Pokud nejsou nastavené oba, ochrana zůstane vypnutá a formulář zachová dosavadní chování. Produkční klíče neukládej do repozitáře.

## Redakcni system (zdarma, bez Sanity)

Web pouziva Markdown clanky ulozene primo v repozitari ve slozce `content/articles`.
Detail clanku je na `/poradna/[slug]`.

### Co umi

- psani clanku v prohlizeci pres `/admin` (Decap CMS)
- nahravani obrazku do `public/uploads`
- publikace clanku do `/poradna/[slug]` bez placene sluzby

### Nastaveni

1. Vytvor GitHub OAuth App (`Settings -> Developer settings -> OAuth Apps`)
2. Nastav:
   - `Homepage URL`: `https://web-naturchem.vercel.app`
   - `Authorization callback URL`: `https://web-naturchem.vercel.app/api/decap/callback`
3. Ve Vercel Environment Variables nastav:
   - `NEXT_PUBLIC_SITE_URL=https://web-naturchem.vercel.app`
   - `GITHUB_OAUTH_CLIENT_ID=...`
   - `GITHUB_OAUTH_CLIENT_SECRET=...`
4. Redeploy projekt na Vercelu
5. Otevri `/admin`, prihlas se pres GitHub a publikuj clanek
6. Pri publikaci vznikne `.md` soubor ve `content/articles`

## Nasazeni na Vercel

1. Nahraj repozitar na GitHub.
2. Ve Vercel vytvor novy projekt z repozitare.
3. Framework nech `Next.js`.
4. Deploy.
5. Pro domenu `naturchem.cz` nastav DNS dle instrukci Vercel.
