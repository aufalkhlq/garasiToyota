"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import type { Promo } from "@/lib/promo";

type Slide = {
  id: number;
  title: string;
  description: string;
  cta: string;
  ctaHref?: string;
  image: string;
  badge?: string;
  textPosition?: string;
};

export default function HeroSlider({ slides }: { slides: Slide[] | Promo[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const showControls = slides.length > 1;

  return (
    <section className="relative bg-muted">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((s, idx) => {
            const ctaHref = "ctaHref" in s && s.ctaHref ? s.ctaHref : "/pricelist";
            const pos = "textPosition" in s ? s.textPosition : "left";
            return (
              <div key={s.id} className="relative flex-[0_0_100%] min-w-0">
                <div className="relative h-[420px] md:h-[520px] lg:h-[600px] w-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/55" />
                  <div className="container-max h-full">
                    <div className={clsx(
                      "relative h-full flex flex-col justify-center",
                      pos === "center" ? "items-center text-center" : 
                      pos === "right" ? "items-end text-right" : "items-start text-left"
                    )}>
                      <div className="max-w-2xl text-white">
                        {s.badge && (
                          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-accent text-white rounded-md">
                            {s.badge}
                          </span>
                        )}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                          {s.title}
                        </h1>
                        <p className={clsx(
                          "mt-4 text-base md:text-lg text-white/90 max-w-xl",
                          pos === "center" ? "mx-auto" : 
                          pos === "right" ? "ml-auto" : "mr-auto"
                        )}>
                          {s.description}
                        </p>
                        <div className={clsx(
                          "mt-8 flex flex-wrap gap-3",
                          pos === "center" ? "justify-center" : 
                          pos === "right" ? "justify-end" : "justify-start"
                        )}>
                          <Link href={ctaHref} className="btn-primary">
                            {s.cta}
                          </Link>
                          <Link
                            href="/kontak"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                          >
                            Hubungi Kami
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showControls && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white text-primary-foreground shadow-md transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white text-primary-foreground shadow-md transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </section>
  );
}
