import HeroSection from "@/components/home/HeroSection";
import PromoSection from "@/components/home/PromoSection";
import CarCatalog from "@/components/home/CarCatalog";
import TestimonialSection from "@/components/home/TestimonialSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromoSection />
      <CarCatalog />
      <TestimonialSection />
    </>
  );
}

