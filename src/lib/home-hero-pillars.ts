import type { HeroTheme } from "@/lib/hero-images";

export type HomeHeroPillarId = "mereni" | "studie" | "dokumentace";

export type HomeHeroPillar = {
  id: HomeHeroPillarId;
  label: string;
  theme: HeroTheme;
  /** Jedna věta pod chipy — co pro zákazníka uděláme (aktivní sloveso) */
  detail: string;
  href: string;
};

export const homeHeroPillars: HomeHeroPillar[] = [
  {
    id: "mereni",
    label: "Měření",
    theme: "homepage-mereni",
    detail: "Emise, hluk a pracovní prostředí pro provoz, KHS, ČIŽP nebo kolaudaci.",
    href: "/sluzby#mericke-sluzby"
  },
  {
    id: "studie",
    label: "Studie",
    theme: "homepage-studie",
    detail: "Rozptylové a hlukové studie pro projekt, povolení nebo EIA.",
    href: "/sluzby#studie-vypocty"
  },
  {
    id: "dokumentace",
    label: "Dokumentace",
    theme: "homepage-eia",
    detail: "EIA, posudky, provozní řády, IPPC a ISPOP pro správní řízení.",
    href: "/sluzby#povolovaci-podklady"
  }
];
