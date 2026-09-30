import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

type PromoImage = { url: string; colSpan: number };

export default async function PromoSection() {
  const promos = await prisma.promo.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  if (promos.length === 0) return null;

  return (
    <section className="section bg-white">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">
            Promo Spesial
          </p>
          <h2 className="heading-2 mt-2">Penawaran Terbaik Bulan Ini</h2>
          <p className="mt-3 text-muted-foreground">
            Manfaatkan berbagai promo menarik untuk mendapatkan mobil impian dengan harga yang lebih hemat.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {promos.map((promo) => {
            const hasImage = promo.image && promo.layout !== "no-image";
            const isHorizontal = promo.layout === "image-left";
            
            let gallery: PromoImage[] = [];
            try {
              if (promo.images) gallery = JSON.parse(promo.images);
            } catch (e) {}

            return (
              <div
                key={promo.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-white transition-all hover:border-accent hover:shadow-md"
              >
                <div className={`flex ${isHorizontal ? "flex-col md:flex-row" : "flex-col"}`}>
                  {hasImage && (
                    <div className={`relative ${isHorizontal ? "w-full md:w-5/12 lg:w-1/3 min-h-[300px]" : "w-full h-56 sm:h-72"} shrink-0 overflow-hidden`}>
                      <Image
                        src={promo.image!}
                        alt={promo.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className={`flex flex-1 flex-col p-6 sm:p-8 ${isHorizontal ? "justify-center" : ""}`}>
                    {promo.badge && (
                      <span className="mb-4 inline-block self-start px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-md">
                        {promo.badge}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold leading-snug">
                      {promo.title}
                    </h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {promo.description}
                    </p>

                    {promo.ctaText && (
                      <Link
                        href={promo.ctaLink || "/pricelist"}
                        className="mt-8 inline-flex self-start items-center gap-2 text-sm font-bold text-accent group-hover:gap-3 transition-all border border-accent/20 bg-accent/5 px-6 py-2.5 rounded-full hover:bg-accent hover:text-white"
                      >
                        {promo.ctaText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                {gallery.length > 0 && (
                  <div className="p-6 sm:p-8 pt-0 mt-4 md:mt-0 border-t border-border/50 bg-muted/20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      {gallery.map((img, idx) => (
                        <div 
                          key={idx} 
                          className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border shadow-sm"
                          style={{ 
                            gridColumn: `span ${img.colSpan} / span ${img.colSpan}` 
                          }}
                        >
                          <Image src={img.url} alt={`${promo.title} - ${idx}`} fill className="object-contain hover:scale-105 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
