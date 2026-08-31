import { preload } from "react-dom";

import { HomeHeroShell, type HomeHeroPhotoConfig } from "@/components/HomeHeroShell";
import { HomeLcpPhoto } from "@/components/HomeLcpPhoto";
import { getHeroImageConfig, getHeroLcpSources } from "@/lib/hero-images";
import type { HomeHeroPillar } from "@/lib/home-hero-pillars";

type Props = {
  title: string;
  lead: string;
  pillars: HomeHeroPillar[];
  ariaLabel: string;
  pillarsAriaLabel: string;
};

/** Server komponenta — H1, lead a LCP fotka v prvním HTML bez čekání na JS. */
export function HomeHeroSection({ title, lead, pillars, ariaLabel, pillarsAriaLabel }: Props) {
  const initialPillar = pillars[0];
  const { src, avifSrc, mobileAvifSrc } = getHeroLcpSources(initialPillar.theme);
  const photoConfigs: HomeHeroPhotoConfig[] = pillars.map((pillar) => {
    const { src: photoSrc, position = "center center" } = getHeroImageConfig(pillar.theme);
    return { id: pillar.id, src: photoSrc, position };
  });
  if (avifSrc && mobileAvifSrc) {
    preload(mobileAvifSrc, {
      as: "image",
      type: "image/avif",
      fetchPriority: "high",
      media: "(max-width: 767px)"
    });
    preload(avifSrc, {
      as: "image",
      type: "image/avif",
      fetchPriority: "high",
      media: "(min-width: 768px)"
    });
  } else {
    preload(src, { as: "image", fetchPriority: "high" });
  }

  return (
    <HomeHeroShell
      pillars={pillars}
      photoConfigs={photoConfigs}
      ariaLabel={ariaLabel}
      pillarsAriaLabel={pillarsAriaLabel}
      initialPhoto={<HomeLcpPhoto theme={initialPillar.theme} />}
    >
      <div className="hero-diagonal-spacer" aria-hidden="true" />
      <h1 className="home-hero-enter home-hero-enter-1">{title}</h1>
      <p className="hero-lead home-hero-enter home-hero-enter-2">{lead}</p>
    </HomeHeroShell>
  );
}
