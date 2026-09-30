import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import PriceTable from "@/components/pricelist/PriceTable";
import PricelistImageGallery from "@/components/pricelist/PricelistImageGallery";
import { getSiteSettings, getSetting } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Pricelist Mobil Lengkap",
  description:
    "Daftar harga mobil terbaru 2024. Bandingkan harga OTR berbagai merk dan tipe mobil untuk menemukan yang sesuai dengan budget Anda.",
};

export default async function PricelistPage() {
  const settings = await getSiteSettings();
  const pricelistImage = getSetting(settings, "pricelist.image", "");
  const heroTitle = getSetting(settings, "pricelist.hero_title", "Harga Mobil Terbaru 2024");
  const heroSubtitle = getSetting(settings, "pricelist.hero_subtitle", "Daftar harga OTR (On The Road) untuk berbagai merk dan tipe mobil. Harga dapat berubah sewaktu-waktu, hubungi kami untuk info promo terkini.");
  const whatsappMsg = getSetting(settings, "whatsapp.message", "Halo, saya tertarik dengan penawaran mobil...");
  const phone = getSetting(settings, "contact.phone", "+62 812-3456-7890");

  return (
    <>
      <section className="bg-muted border-b border-border">
        <div className="container-max py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider">
              Pricelist
            </p>
            <h1 className="heading-1 mt-2">{heroTitle}</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {pricelistImage && <PricelistImageGallery imageUrl={pricelistImage} />}


      <section className="bg-muted">
        <div className="container-max py-12 text-center">
          <h2 className="heading-3">Butuh Penawaran Spesial?</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Tim sales kami siap membantu Anda mendapatkan harga terbaik.
            Hubungi kami sekarang untuk konsultasi gratis.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Phone className="h-4 w-4" />
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
