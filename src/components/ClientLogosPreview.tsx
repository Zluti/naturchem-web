import {
  clientLogoItemClass,
  referenceClients,
  type ClientLogo
} from "@/lib/client-logos";
import { getClientLogosLabels } from "@/lib/i18n/client-logos-i18n";
import type { Locale } from "@/lib/i18n/locales";
import { LocaleLink } from "@/lib/i18n/locale-link";

type Props = {
  locale: Locale;
  clients?: ClientLogo[];
  moreHref: string;
};

function ClientLogoLink({ client }: { client: ClientLogo }) {
  return (
    <a
      href={client.website}
      className={clientLogoItemClass(client)}
      target="_blank"
      rel="noopener noreferrer"
      title={client.name}
      aria-label={client.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Logos are pre-sized static SVG/WebP assets and must not consume image transformations. */}
      <img
        src={client.logo}
        alt={client.name}
        width={client.wide ? 160 : 120}
        height={client.wide ? 44 : 40}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="client-logo-img"
      />
    </a>
  );
}

/**
 * Homepage logo preview without hydration. CSS chooses 11/7/19 logos for
 * mobile/tablet/desktop and keeps the final grid slot for the references link.
 */
export function ClientLogosPreview({ locale, clients = referenceClients, moreHref }: Props) {
  const { moreLabel, moreAriaLabel } = getClientLogosLabels(locale);

  return (
    <div className="client-logos-grid client-logos-grid--responsive-preview">
      {clients.map((client) => (
        <ClientLogoLink key={client.name} client={client} />
      ))}
      <LocaleLink href={moreHref} className="client-logo-item client-logo-more" aria-label={moreAriaLabel}>
        <span className="client-logo-more-text" aria-hidden="true">
          {moreLabel}
        </span>
      </LocaleLink>
    </div>
  );
}
