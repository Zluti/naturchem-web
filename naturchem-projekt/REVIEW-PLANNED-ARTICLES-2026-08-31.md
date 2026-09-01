# Odborná a obchodní revize dvou plánovaných článků

Datum revize: 31. 8. 2026. Výchozí kód: `1b398ce` na větvi
`codex/growth-followups-2026-08-31`. Uživatel dne 1. 9. 2026 potvrdil odbornou
revizi článků. Návrhy E1–E5 a K1–K5 byly následně zapracovány do zdrojových
článků; u dříve neprokázaného obchodního rozsahu bylo použito konzervativní
znění bez příslibu konkrétní autorizace nebo návštěvy provozovny. Veřejné slugy,
data a autor zůstaly zachovány. Commit ani deployment zatím neproběhl.

## Výchozí stav a obchodní účel

| Plánované vydání | Veřejný slug | Zdrojový soubor v content/articles | Rozsah těla |
|---|---|---|---|
| 2. 9. 2026 | `priprava-na-mereni-emisi` | `mereni-rozpoustedel-pracovniho-ovzdusi.md` | přibližně 1 252 slov, 12 nadpisů H2 |
| 8. 9. 2026 | `vyzva-khs-mereni-pracovniho-prostredi` | `vyzva-khs-mereni-pracovniho-prostredi.md` | přibližně 1 590 slov, 15 nadpisů H2 |

Počty jsou orientační tokenizace Markdownu podle bílých znaků, včetně tabulek
a značek, bez frontmatteru; nejde o přesný počet slov viditelných čtenáři.
Oba soubory mají `status: published`, ale budoucí datum. Obě jejich ostré URL
při kontrole 31. 8. vracejí 404. Nejsou to aktuálně dostupné odborné stránky.
Název emisního souboru se liší od veřejného slugu záměrně podle stávajícího CMS;
soubor nepřejmenovávat a neobnovovat dříve opravenou kolizi slugů.

Cílové situace: provozovatel objednává emisní měření; zaměstnavatel potřebuje
reagovat na výzvu KHS. Hypotéza: přesnější podmínky a krátký seznam podkladů
přivedou vhodnější poptávky a sníží chybná očekávání. Pro tyto dosud neveřejné
URL nebyl získán GSC baseline; nepřisuzovat jim návštěvnost nebo konverze
z jiných stránek. Po skutečném vydání hodnotit za 28/56 dní GSC konkrétní URL
a GA4 návaznost článek → služba → `generate_lead`; obchodní kvalitu ověřit
podle přijatých poptávek. Nezaměnit kliknutí do formuláře za poptávku.

## 1. Příprava zdroje na měření emisí

### E1 — doplnit postup při změně termínu (řádky 30–36)

Původní lhůty pěti pracovních dnů a jednoho pracovního dne odpovídají
§ 6 odst. 7 [zákona č. 201/2012 Sb.](https://e-sbirka.gov.cz/sb/2012/201),
aktuální znění od 1. 1. 2026. Chybí praktické rozlišení zrušení původního
termínu a nového řádného hlášení; čtenář by mohl mylně vztáhnout jednodenní
lhůtu také na nový termín. [ISPOP, FAQ 8.5](https://www.ispop.cz/casto-kladene-dotazy-faq/)
výslovně požaduje nové ohlášení s opětovným pětidenním předstihem.

Za odstavec o změně termínu doplnit tento návrh:

> Při změně termínu nestačí přepsat původní hlášení. V ISPOP zrušte původní
> termín a podejte nové řádné hlášení. I pro nový termín dodržte předstih
> nejméně pěti pracovních dnů.

Odkázat u této informace na FAQ ISPOP. Konkrétní kalendářní příklady zde
nepřidávat bez ověření počítání lhůt a svátků.

### E2 — přesně vymezit hranici zdroje (řádek 42)

Výraz „do 50 MW“ neurčuje příkon/výkon a zahrnuje nejasnou hranici.
Nahradit začátek věty formulací:

> U spalovacích stacionárních zdrojů s celkovým jmenovitým tepelným příkonem
> nižším než 50 MW…

Zbytek věty o stabilních podmínkách zachovat. Opora: § 4 odst. 8
[vyhlášky č. 415/2012 Sb.](https://e-sbirka.gov.cz/sb/2012/415), znění od 1. 7. 2026.

### E3 — nezobecňovat počet odběrů na všechny metody (řádky 50–58)

Pravidlo tří/šesti měření v § 4 odst. 3 má výslovně manuální rozsah;
§ 4 odst. 4–7 rozlišuje další postupy, doby a výjimky. První a pravidelné
měření nelze jednoduše zaměnit. Zdroj: [vyhláška 415/2012, § 4](https://e-sbirka.gov.cz/sb/2012/415).

Návrh náhrady odstavce začínajícího „Vyhláška stanovuje například“:

> U manuálních metod vyhláška stanovuje zpravidla nejméně tři jednotlivá
> měření při neměnných a šest při proměnlivých provozních podmínkách.
> Pro šaržovitou výrobu, jiné postupy a zvláštní případy platí další pravidla.
> Počet odběrů i potřebnou dobu provozu proto předem potvrďte s laboratoří.

Číselné příklady jedné, tří nebo šesti hodin v následujícím odstavci vypustit;
bez konkrétní metody a účelu mohou působit jako volitelné délky měření.
Výsledný odstavec nechat odborně potvrdit pro skutečně nabízené metody.

### E4 — nepodložené ekonomické a provozní přísliby

- Řádky 79 a 137: vypustit obecné cenové srovnání „podstatně dražší“ / „je
  levnější“. Náhradní shrnutí: „Kontrola před termínem pomáhá odhalit
  komplikace ještě před výjezdem měřicí skupiny.“ Neuvádět cenu ani úsporu.
- Řádky 149 a 151: `[OVERIT S HEZINOU]` Nabízí NATURCHEM předběžnou kontrolu
  dokumentace a samostatnou kontrolu měřicího místa v provozovně? Za jakých
  podmínek? Nepřidávat příslib bezplatnosti nebo dostupnosti do určitého data.

### E5 — kratší výňatek pro seznam článků

Návrh `excerpt`, nikoli změna titulku nebo slugu:

> Plánujete autorizované měření emisí? Připravte povolení, poslední protokol
> a informace o provozu. Před termínem ověřte hlášení v ISPOP a přístup
> k měřicímu místu.

### Co bylo ověřeno a není důvod „opravovat“

- Lhůta čtyř měsíců, resp. tří při tepelném zpracování odpadu, odpovídá
  § 3 odst. 1–2 [vyhlášky 415/2012](https://e-sbirka.gov.cz/sb/2012/415).
- Pravidlo měřicího místa a více výduchů odpovídá § 6 odst. 3
  [zákona 201/2012](https://e-sbirka.gov.cz/sb/2012/201), včetně výjimky podle povolení.
- Tato kontrola neověřuje všechny technické normy, bezpečnost konkrétního
  pracoviště ani úplný rozsah skutečných oprávnění firmy.

## 2. Výzva KHS k měření pracovního prostředí

### K1 — doplnit podmínky chemického kritéria (řádek 91)

Zmínka o 0,3 PEL není sama chybná, ale opomíjí NPK-P a další kritéria pro
směsi, zvláštní nebezpečnost a jiné cesty expozice. Nejde o univerzální
automatické zařazení. Opora: příloha 1, bod 2
[vyhlášky č. 432/2003 Sb.](https://e-sbirka.gov.cz/sb/2003/432), znění od 1. 1. 2026.

Náhrada druhé věty odstavce:

> Jedním z kritérií druhé kategorie je celosměnový průměr nad 0,3 PEL při
> nepřekročení PEL ani nejvyšší přípustné koncentrace (NPK-P). U směsí a látek
> se zvláštní nebezpečností se uplatňují další pravidla; samotný poměr k PEL
> proto nestačí.

### K2 — rozlišit odborné hodnocení a povinné měření (řádky 135–141)

§ 38 odst. 2–3 [zákona č. 258/2000 Sb.](https://e-sbirka.gov.cz/sb/2000/258),
aktuální znění od 12. 6. 2026, uvádí konkrétní výjimku při vyřazování rizikové
práce a povinnost po uznání nemoci z povolání nebo ohrožení nemocí z povolání.
Obecné „může být potřeba“ tuto povinnost nevystihuje.

Náhrada věty na řádku 139:

> Odborné hodnocení podle tohoto postupu nelze použít k vyřazení práce
> z rizikových prací. Při uznání nemoci z povolání nebo ohrožení nemocí
> z povolání pro tyto faktory musí zaměstnavatel předložit pro dotčenou práci
> protokol z měření do šesti měsíců od uznání.

Udržet návaznost na předchozí větu o příslušné autorizaci ve fyziologii práce.
Nenaznačovat, že NATURCHEM toto oprávnění vlastní, bez ověření níže.

### K3 — kratší výňatek bez garance výsledku (řádky 4–10)

Odstranit absolutní příslib „zabrání tomu“. Návrh celého `excerpt`:

> Přišla Vám výzva KHS k měření? Připravte výzvu, seznam pracovních pozic
> a popis činností. Vysvětlíme, podle čeho se určuje rozsah měření.

### K4 — zjednodušit modelovou matici, nikoli přidávat povinná měření

Tabulka na řádcích 74–79 má sedm sloupců a jednoznačné značky ✓/–, které
mohou být chápány jako hotový seznam povinností. Předchozí odstavec už uvádí
tři srozumitelné příklady. Navrhuji tabulku i její uvedení nahradit větou:

> Pro každou pozici sepište pracovní činnosti, jejich délku, používané stroje
> a chemické látky. Rozsah měření se určí podle skutečné práce a požadavku KHS.

Jde také o hypotézu lepší mobilní čitelnosti: současné mobilní CSS nastavuje
tabulkám pevné sloupce a malé písmo (`globals.css`, kolem řádku 7051).
Na tomto budoucím článku nebyl proveden mobilní vizuální test, takže nejde
o doloženou chybu přetoku. Nesahat kvůli jediné tabulce do globálního CSS.

### K5 — nepotvrzená četnost a rozsah služby

- Řádek 145 „Často ano“ nahradit: „Některá měření lze spojit. Záleží na
  rozsahu, provozu a podmínkách měření.“ Neznáme podíl zakázek zvládnutých
  za jeden den; netvrdit jej ani neslibovat termín.
- Řádky 41–42, 135–141 a 179: `[OVERIT S HEZINOU]` Zajišťuje NATURCHEM také
  fyzickou zátěž a pracovní polohy? Vlastním oprávněním, přes autorizovaného
  partnera, nebo pouze doporučí dalšího odborníka? Přehled akreditace v kódu
  uvádí ovzduší, mikroklima, osvětlení, vibrace a hluk; fyziologii práce v něm
  nenacházím. To není důkaz absence oprávnění nebo partnerství.
- `[OVERIT S HEZINOU]` Je příprava matice a kontrola podkladů pro KHS na řádku
  179 skutečnou součástí nabízené služby? Vyjasnit rozsah, neslibovat úspěch
  řízení nebo nemožnost dalších požadavků úřadu.

### Co bylo ověřeno a není důvod měnit bez příčiny

- Tabulka hluku 80–84,9 / 85–105 / nad 105 dB odpovídá uvedenému osmihodinovému
  kritériu pro ustálený/proměnný hluk. Pro přehlednost tak označit úvod tabulky;
  ponechat upozornění na špičkové hladiny impulsního hluku. Čísla neměnit.
  Zdroj: příloha 1, bod 3 [vyhlášky 432/2003](https://e-sbirka.gov.cz/sb/2003/432).
- Role zaměstnavatele a KHS při kategoriích 2 a 3/4 i podklady o charakteristické
  směně odpovídají § 37 [zákona 258/2000](https://e-sbirka.gov.cz/sb/2000/258).
- Nejde o úplný audit konkrétní kategorizace, všech PEL/NPK-P ani všech
  technických metod; ty vyžadují příslušné odborné posouzení.

## 3. Odkazy, které už fungují

Ostré HTTP kontroly dne 31. 8. potvrdily 200 a správný canonical u obou
navazujících služeb. V HTML je odkaz na kontakt s odpovídající předvolenou
službou; stejné názvy jsou v povoleném katalogu formuláře.

- [Měření emisí](https://www.naturchem.cz/sluzby/mereni-emisi/) → kontakt s volbou
  `Měření emisí`.
- [Pracovní prostředí](https://www.naturchem.cz/sluzby/pracovni-prostredi/) → kontakt
  s volbou `Měření pracovního prostředí`.
- Odkaz z KHS článku na [rozpouštědla a VOC](https://www.naturchem.cz/poradna/mereni-rozpoustedel-pracovniho-ovzdusi/)
  vede na správný existující článek, nikoli na budoucí emisní přípravu.

Není potřeba přidávat další generické CTA. Zachovat tematickou cestu na službu;
nový konverzní experiment teď nezakládat bez měření po vydání. Tento audit
neodesílal formulář ani analytické události a nedokazuje přijetí zákaznického e-mailu.

## 4. Zdrojová a publikační brána

Rozhodující paragrafy byly přečteny přímo ve vykreslené e-Sbírce přes Browser,
včetně data aktuálního znění; nespoléhalo se na datum uvedené ve výsledku
vyhledávání. ISPOP FAQ bylo čteno přímo na webu provozovatele systému.
Historické PDF a komerční právní agregátory nebyly použity jako rozhodující
důkaz aktuálního práva. Zbývající obecné odkazy 361/2007 a 272/2011 samy
o sobě nejsou důkazem ověření všech tvrzení článku.

Při aplikaci schválené revize nahradit nebo doplnit odkazy na rozhodující
zákony odkazy na e-Sbírku výše; ponechat dohledatelný paragraf u konkrétního
tvrzení. Neuvádět fiktivní datum kontroly autorem.

1. Ing. Hezina potvrdí odborné úpravy E1–E3, K1–K2 a skutečný obchodní rozsah.
2. Teprve poté upravit původní články. Zachovat veřejné slugy, plánovaná data
   a autora; nevydávat revizi asistenta za schválení uvedeným autorem.
3. Po aplikaci ověřit indexy, routování, mobilní zobrazení a `npm run verify`.
4. Publikace vyžaduje samostatně schválené nasazení; tato revize nezapíná
   plánovací workflow. Samotné dosažení data v plně statickém webu nestačí.
5. V den skutečného vydání ověřit článek, homepage, Poradnu, sitemap a veřejné
   indexy a zaznamenat skutečný začátek měřicího okna.

Kontrolní Git blob SHA současných souborů:

- Emisní příprava: `6e897941ab0c317616349b9d2360712ee823d797`.
- KHS: `079e672f5436f7e190fc0aeffbbff45f934f4a70`.

V této revizi vznikl pouze tento pracovní Markdown dokument mimo veřejný
obsah. Build proto nebyl opakován; předchozí úspěšné testy releasu `1b398ce`
nejsou vydávány za test dosud neaplikovaných redakčních návrhů.
