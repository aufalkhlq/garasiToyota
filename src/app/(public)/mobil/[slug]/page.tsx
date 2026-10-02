import type { Metadata } from "next";
import Image from "next/image";
import { CarDetailGallery } from "@/components/cars/CarDetailGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Fuel,
  Gauge,
  Settings2,
  CalendarDays,
  Tag,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  getCarBySlug,
  getRelatedCars,
  getSiteSettings,
  getSetting,
  carToSlug,
  formatPrice,
  getActiveCars,
} from "@/lib/cms";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function generateStaticParams() {
  const cars = await getActiveCars();
  return cars.map((car) => ({
    slug: carToSlug(car.brand, car.name),
  }));
}


type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await getCarBySlug(params.slug);
  if (!car) return { title: "Mobil Tidak Ditemukan" };
  return {
    title: `${car.brand} ${car.name} - Garasi Mobil`,
    description: `Spesifikasi, harga, dan promo ${car.brand} ${car.name} ${car.year}. ${car.transmission}, ${car.fuel}. ${formatPrice(car.price)}.`,
  };
}

export default async function CarDetailPage({ params }: Props) {
  const car = await getCarBySlug(params.slug);
  if (!car || !car.isActive) notFound();

  const [related, settings] = await Promise.all([
    getRelatedCars(car.typeId, car.id, 3),
    getSiteSettings(),
  ]);

  const waNumber = getSetting(settings, "whatsapp.number", "6281234567890").replace(/[^0-9]/g, "");
  const waDefault = getSetting(settings, "whatsapp.message", "Halo, saya tertarik untuk konsultasi mobil");
  const phoneDisplay = getSetting(settings, "contact.phone_display", "+62 812-3456-7890");
  const phoneTel = phoneDisplay.replace(/[^0-9+]/g, "");
  const waText = encodeURIComponent(`${waDefault} - ${car.brand} ${car.name}`);
  const waLink = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <div className="bg-muted">
      <div className="border-b border-border bg-white">
        <div className="container-max py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">Beranda</Link>
            <span>/</span>
            <Link href="/#katalog" className="hover:text-accent">Katalog</Link>
            <span>/</span>
            <span className="text-primary-foreground font-medium truncate">
              {car.brand} {car.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-max py-10">
        <Link href="/#katalog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Katalog
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <CarDetailGallery mainImage={car.image} images={car.images ? JSON.parse(car.images) : []} promo={car.promo} type={car.type} />

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {car.brand}
              </p>
              <h1 className="mt-1 text-2xl md:text-3xl font-bold leading-tight">
                {car.name}
              </h1>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-accent">
                  {formatPrice(car.price)}
                </span>
                <span className="text-sm text-muted-foreground">OTR</span>
              </div>
              {car.promo && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent">
                  <Tag className="h-4 w-4" />
                  {car.promo}
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3">
                <SpecItem icon={<CalendarDays className="h-4 w-4" />} label="Tahun" value={String(car.year)} />
                <SpecItem icon={<Settings2 className="h-4 w-4" />} label="Transmisi" value={car.transmission} />
                <SpecItem icon={<Fuel className="h-4 w-4" />} label="Bahan Bakar" value={car.fuel} />
                <SpecItem icon={<Gauge className="h-4 w-4" />} label="Tipe" value={car.type} />
              </div>

              <div className="mt-6 space-y-2">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                  <MessageCircle className="h-4 w-4" />
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

           {car.features && (
              <div className="rounded-2xl border border-border bg-white p-6 mt-10">
                <h2 className="heading-3 mb-4">Detail Promo & Benefit</h2>
                <div 
                  className="prose prose-sm max-w-none text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: car.features }}
                />
              </div>
            )}

        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between mb-6 border-b border-border pb-3">
              <h2 className="heading-3">Mobil Serupa ({car.type})</h2>
              <Link href="/#katalog" className="text-sm font-semibold text-accent hover:text-accent-hover">
                Lihat Semua &rarr;
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rc) => (
                <Link
                  key={rc.id}
                  href={`/mobil/${carToSlug(rc.brand, rc.name)}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg hover:border-accent"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={rc.image}
                      alt={`${rc.brand} ${rc.name}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      {rc.brand}
                    </p>
                    <h3 className="mt-1 font-semibold leading-tight">{rc.name}</h3>
                    <p className="mt-2 text-lg font-bold text-accent">
                      {formatPrice(rc.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SpecItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-1 font-semibold text-sm">{value}</p>
    </div>
  );
}
