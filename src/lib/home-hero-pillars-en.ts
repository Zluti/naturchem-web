import type { HomeHeroPillar, HomeHeroPillarId } from "@/lib/home-hero-pillars";

export const homeHeroPillars: HomeHeroPillar[] = [
  {
    id: "mereni",
    label: "Measurements",
    theme: "homepage-mereni",
    detail: "Emissions, noise and workplace conditions for operations, authorities or building approval.",
    href: "/sluzby#mericke-sluzby"
  },
  {
    id: "studie",
    label: "Studies",
    theme: "homepage-studie",
    detail: "Dispersion and noise studies for projects, permits or EIA.",
    href: "/sluzby#studie-vypocty"
  },
  {
    id: "dokumentace",
    label: "Documentation",
    theme: "homepage-eia",
    detail: "EIA, expert reports, operating rules, IPPC and ISPOP for administrative proceedings.",
    href: "/sluzby#povolovaci-podklady"
  }
];

export type { HomeHeroPillarId, HomeHeroPillar };
