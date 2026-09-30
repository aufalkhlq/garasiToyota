"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TestimonialItem } from "@/lib/cms";

export default function TestimonialSlider({ items }: { items: TestimonialItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2, align: "start" },
        "(min-width: 1024px)": { slidesToScroll: 3, align: "start" },
      }
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const showControls = items.length > 1;

  if (items.length === 0) return null;

  return (
    <div className="relative mt-12 px-4 sm:px-14 lg:px-16">
      <div className="overflow-hidden py-4" ref={emblaRef}>
        <div className="flex -ml-4">
          {items.map((t) => (
            <div
              key={t.id}
              className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-lg transition-all duration-300 group">
                <Image
                  src={t.image}
                  alt="Testimoni Pelanggan"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white border border-border text-primary shadow-md hover:shadow-lg hover:text-accent hover:border-accent transition-all duration-300 hover:scale-110 active:scale-95 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white border border-border text-primary shadow-md hover:shadow-lg hover:text-accent hover:border-accent transition-all duration-300 hover:scale-110 active:scale-95 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}