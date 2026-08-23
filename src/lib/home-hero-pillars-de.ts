import type { HomeHeroPillar, HomeHeroPillarId } from "@/lib/home-hero-pillars";

export const homeHeroPillars: HomeHeroPillar[] = [
  {
    id: "mereni",
    label: "Messungen",
    theme: "homepage-mereni",
    detail: "Emissionen, Lärm und Arbeitsplatzfaktoren für Betrieb, Behörden oder Bauabnahme.",
    href: "/sluzby#mericke-sluzby"
  },
  {
    id: "studie",
    label: "Studien",
    theme: "homepage-studie",
    detail: "Ausbreitungs- und Lärmstudien für Projekte, Genehmigungen oder UVP.",
    href: "/sluzby#studie-vypocty"
  },
  {
    id: "dokumentace",
    label: "Dokumentation",
    theme: "homepage-eia",
    detail: "UVP, Gutachten, Betriebsregeln, IPPC und ISPOP für Verwaltungsverfahren.",
    href: "/sluzby#povolovaci-podklady"
  }
];

export type { HomeHeroPillarId, HomeHeroPillar };
