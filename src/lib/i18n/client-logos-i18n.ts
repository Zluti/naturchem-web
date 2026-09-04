import type { Locale } from "@/lib/i18n/locales";
import { pickLocale } from "@/lib/i18n/locale-pick";

type ClientLogosLabels = {
  moreLabel: string;
  moreAriaLabel: string;
};

const labels: Record<Locale, ClientLogosLabels> = {
  cs: {
    moreLabel: "Další zákazníci",
    moreAriaLabel: "Zobrazit další zákazníky"
  },
  en: {
    moreLabel: "More clients",
    moreAriaLabel: "Show more clients"
  },
  de: {
    moreLabel: "Weitere Kunden",
    moreAriaLabel: "Weitere Kunden anzeigen"
  }
};

export function getClientLogosLabels(locale: Locale) {
  return pickLocale(locale, labels);
}
