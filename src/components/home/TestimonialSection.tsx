import { getActiveTestimonials } from "@/lib/cms";
import TestimonialSlider from "./TestimonialSlider";

export default async function TestimonialSection() {
  const testimonials = await getActiveTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section bg-white">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">
            Testimoni
          </p>
          <h2 className="heading-2 mt-2">Galeri Penyerahan Kendaraan</h2>
          <p className="mt-3 text-muted-foreground">
            Ribuan pelanggan telah mempercayakan pembelian mobil impiannya bersama
            kami. Berikut adalah beberapa momen bahagia mereka.
          </p>
        </div>

        <TestimonialSlider items={testimonials} />
      </div>
    </section>
  );
}
