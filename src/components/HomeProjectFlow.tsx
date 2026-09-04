import type { Locale } from "@/lib/i18n/locales";

const copy = {
  cs: {
    eyebrow: "Postup spolupráce",
    title: "Průběh zakázky",
    imageAlt: "Měření emisí v průmyslovém provozu",
    imageLabel: "Měření emisí v provozu",
    steps: [
      { title: "Posouzení podkladů", text: "Projekt, rozhodnutí nebo požadavek úřadu." },
      { title: "Rozsah zakázky", text: "Potřebná měření, studie a dokumentace." },
      { title: "Provedení prací", text: "Měření v provozu nebo odborné zpracování." },
      { title: "Předání výstupu", text: "Protokol, studie nebo dokumentace." }
    ]
  },
  en: {
    eyebrow: "Cooperation process",
    title: "Project workflow",
    imageAlt: "Emission measurement in an industrial operation",
    imageLabel: "Emission measurement on site",
    steps: [
      { title: "Document review", text: "The project, decision or authority request." },
      { title: "Scope of work", text: "Required measurements, studies and documentation." },
      { title: "Work performed", text: "On-site measurement or technical preparation." },
      { title: "Deliverable", text: "A report, study or technical document." }
    ]
  },
  de: {
    eyebrow: "Ablauf der Zusammenarbeit",
    title: "Ablauf eines Auftrags",
    imageAlt: "Emissionsmessung in einem Industriebetrieb",
    imageLabel: "Emissionsmessung im Betrieb",
    steps: [
      { title: "Prüfung der Unterlagen", text: "Projekt, Bescheid oder Behördenanforderung." },
      { title: "Leistungsumfang", text: "Erforderliche Messungen, Studien und Dokumentation." },
      { title: "Durchführung", text: "Messung im Betrieb oder fachliche Ausarbeitung." },
      { title: "Übergabe", text: "Bericht, Studie oder Fachunterlage." }
    ]
  }
} as const;

export function HomeProjectFlow({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <section className="home-project-flow home-below-fold" aria-labelledby="home-project-flow-heading">
      <div className="container home-project-flow-grid">
        <div className="home-project-flow-media">
          {/* eslint-disable-next-line @next/next/no-img-element -- Static WebP is served directly to avoid image transformation usage. */}
          <img
            src="/hero/case-studies/mereni-emisi-lakovna.webp"
            alt={content.imageAlt}
            width="1024"
            height="576"
            loading="lazy"
            decoding="async"
          />
          <span className="home-project-flow-media-label">{content.imageLabel}</span>
          <span className="home-project-flow-reticle" aria-hidden="true" />
        </div>

        <div className="home-project-flow-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="home-project-flow-heading">{content.title}</h2>
          <ol className="home-project-flow-steps">
            {content.steps.map((step, index) => (
              <li key={step.title}>
                <span className="home-project-flow-step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{step.title}</strong>
                  <span>{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
