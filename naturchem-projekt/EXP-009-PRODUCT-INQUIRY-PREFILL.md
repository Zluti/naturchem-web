# EXP-009: Zachování produktu v poptávce

## Stav

Připraveno lokálně v samostatné větvi `codex/exp-009-product-inquiry-prefill`. Není nasazeno.

## Výchozí data

Google Search Console, období 28. 7.–24. 8. 2026:

- produktová stránka FID detektoru: 67 zobrazení, 2 kliknutí, CTR 3,0 %, průměrná pozice 30,5;
- dotaz `detektor fid`: 33 zobrazení, 0 kliknutí, průměrná pozice 48,2;
- dotaz `fid detektor`: produktová stránka 8 zobrazení, kategorie 18 zobrazení a stránka PID 1 zobrazení.

Nízký objem dat neumožňuje přisoudit stránce poptávku ani vyvozovat závěr o výkonu konverzí. Dosavadní produktové CTA však otevírá pouze obecnou kategorii „Poptávka přístroje“ a do formuláře nepřenese název vybraného produktu.

## Hypotéza a změna

Pokud se po kliknutí z detailu produktu předvyplní kategorie přístroje i konkrétní název produktu, návštěvník nemusí informaci znovu opisovat a obchodní poptávka si zachová kontext zdrojové stránky.

Změna:

- produktové CTA předává do kontaktního formuláře kategorii `pristroj` a lokalizovanou zprávu s názvem produktu;
- česká, anglická a německá verze směřují na odpovídající jazykovou kontaktní stránku;
- katalogové kategorie a ostatní CTA zůstávají beze změny;
- hodnota z URL je oříznuta na 1 000 znaků a React ji vloží jako text, nikoli jako HTML.

## Ověření před nasazením

- `npm run verify` a produkční build;
- detail produktu v CS, EN a DE otevře správnou jazykovou kontaktní stránku;
- formulář zvolí kategorii přístroje a předvyplní přesný název produktu;
- URL bezpečně zakóduje mezery, diakritiku a další znaky;
- při kontrole se formulář neodešle, aby nevznikla falešná poptávka ani `generate_lead`.

## Vyhodnocení po případném nasazení

První kontrola po 28 dnech, při nízkém objemu rozhodnutí až po 56 dnech:

- posloupnost produktová stránka → `click_inquiry_cta` → `form_start` → `generate_lead`;
- `inquiry_category = pristroj`, zdrojová produktová stránka a zachovaný název produktu;
- skutečná kvalita přijatých produktových poptávek, nikoli pouze počet kliknutí;
- GSC zobrazení, kliknutí a cílová URL produktových dotazů pouze jako kontext návštěvnosti, ne jako důkaz konverzního přínosu.
