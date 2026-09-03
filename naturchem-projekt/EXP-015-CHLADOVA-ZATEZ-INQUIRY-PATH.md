# EXP-015: Chladová zátěž → přesná poptávka

## Cíl

Zkrátit cestu návštěvníka, který řeší chladírnu, mrazírnu, nevytápěnou halu, KHS nebo kategorizaci práce, k poptávce správného měření. Odborný obsah, title, H1 a indexační URL se nemění.

## Výchozí stav

- GSC, 5. 8.–1. 9. 2026: `/poradna/chladova-zatez-na-pracovisti/` má 4 kliknutí a 126 zobrazení.
- GA4, 6. 8.–2. 9. 2026: 6 relací z `google / organic`, 5 aktivních uživatelů, průměrné zapojení 9 sekund a 0 atribuovaných klíčových událostí.
- Článek odkazuje na detail služby až u konce. Detail `/sluzby/mereni-tepelna-chladova-zatez/` dosud předvolí pouze obecné `Měření pracovního prostředí`, takže analytika i interní oznámení ztrácejí přesný obchodní kontext, pokud jej návštěvník znovu nenapíše.

## Změna a hypotéza

1. Po první praktické odpovědi v článku vložit jediný informační box s konkrétními vstupy: pracoviště, operace, doba pobytu a případný požadavek KHS.
2. Odkaz vede přímo na formulář s přesnou předvolbou `Měření tepelné a chladové zátěže`.
3. Stejnou předvolbu použít na CS, EN a DE detailu služby. Ve výchozím krátkém seznamu formuláře se nová volba nepřidá; zobrazí se jen při relevantním příchodu.

Hypotéza: návštěvník rychleji pozná, co poslat, a firma dostane přesnější kontext bez prodlužování formuláře pro ostatní uživatele.

## Ochranné podmínky

- Neměnit odborná tvrzení, právní odkazy, title, H1 ani URL článku.
- Nepřidávat další CTA do téhož článku.
- Nevyhodnocovat úspěch podle kliknutí na box samotného.
- `generate_lead` započítat obchodně až po shodě `lead_id` s přijatou a kvalifikovanou poptávkou.

## Vyhodnocení

Po skutečném nasazení zapsat produkční commit a datum. Po 28 a při nízkém objemu po 56 dnech porovnat:

- GSC: kliknutí, zobrazení, CTR a pozici článku i detailu služby;
- GA4: `click_inquiry_cta` → `form_start` → `generate_lead`, kde `service_interest = Měření tepelné a chladové zátěže`;
- obchod: počet skutečně přijatých a kvalifikovaných poptávek s odpovídajícím `lead_id`.
