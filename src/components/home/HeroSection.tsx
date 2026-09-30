import { getActiveHeroSlides, getSiteSettings, getSetting } from "@/lib/cms";
import HeroSlider from "./HeroSlider";
import { promos } from "@/lib/promo";

export default async function HeroSection() {
  const slides = await getActiveHeroSlides();

  // Jika tabel hero_slides ada isinya, gunakan data dari db
  if (slides.length > 0) {
    const formattedSlides = slides.map((s) => ({
      id: s.id,
      title: s.title || "",
      description: s.subtitle || "",
      cta: s.ctaLabel || "Lihat Promo",
      ctaHref: s.ctaHref || "/pricelist",
      image: s.image,
      textPosition: s.textPosition,
    }));
    return <HeroSlider slides={formattedSlides} />;
  }

  // Fallback 1: Jika settings lama masih ada isinya (backward compatibility)
  const settings = await getSiteSettings();
  const heroTitle = getSetting(settings, "hero.title", "");
  const heroSubtitle = getSetting(settings, "hero.subtitle", "");
  const ctaLabel = getSetting(settings, "hero.cta_label", "Lihat Promo");
  const ctaHref = getSetting(settings, "hero.cta_href", "/pricelist");

  if (heroTitle) {
    const singleSlide = [
      {
        id: 0,
        title: heroTitle,
        description: heroSubtitle,
        cta: ctaLabel,
        ctaHref,
        image:
          promos[0]?.image ??
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&auto=format&fit=crop",
        textPosition: "left",
      },
    ];
    return <HeroSlider slides={singleSlide} />;
  }

  // Fallback 2: Data dummy/promo
  const promoSlides = promos.map(p => ({ ...p, textPosition: "left" }));
  return <HeroSlider slides={promoSlides} />;
}

