import { LocaleLink } from "@/lib/i18n/locale-link";
import type { Locale } from "@/lib/i18n/locales";
import { ServiceIcon } from "@/components/ServiceIcon";

const paths = [
  {
    href: "/mereni-pro-kolaudaci",
    icon: "povoleni",
    label: "Kolaudace",
    title: "Potřebuji měření pro kolaudaci",
    text: "Určíme rozsah měření podle projektu nebo požadavku úřadu.",
    cta: "Zjistit rozsah"
  },
  {
    href: "/mereni-pracovniho-prostredi-kategorizace-praci",
    icon: "pracovni-prostredi",
    label: "KHS a BOZP",
    title: "Potřebujeme kategorizaci prací",
    text: "Navrhneme měření a podklady pro KHS a BOZP.",
    cta: "Připravit podklady"
  },
  {
    href: "/pro-stavebni-firmy",
    icon: "investor",
    label: "Projekt a povolení",
    title: "Potřebuji dokumentaci k projektu",
    text: "Určíme potřebné studie, posudky a EIA podklady.",
    cta: "Zjistit podklady"
  }
] as const;

export function HomeDemandPaths({ locale }: { locale: Locale }) {
  if (locale !== "cs") return null;

  return (
    <section
      className="home-section home-demand-paths home-below-fold"
      aria-labelledby="home-demand-paths-heading"
    >
      <div className="container">
        <header className="section-header home-demand-paths-header">
          <p className="eyebrow">Začněte podle situace</p>
          <h2 id="home-demand-paths-heading">Co právě potřebujete vyřešit?</h2>
        </header>
        <ul className="home-demand-paths-list">
          {paths.map((item) => (
            <li key={item.href}>
              <LocaleLink href={item.href} className="home-demand-path-item">
                <span className="home-demand-path-topline">
                  <span className="home-demand-path-label">{item.label}</span>
                  <ServiceIcon
                    icon={item.icon}
                    size={24}
                    variant="plain"
                    className="home-demand-path-icon"
                  />
                </span>
                <span className="home-demand-path-copy">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                  <span className="home-demand-path-cta">
                    {item.cta} <span aria-hidden="true">→</span>
                  </span>
                </span>
              </LocaleLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
