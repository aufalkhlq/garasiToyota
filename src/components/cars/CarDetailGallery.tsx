"use client";

import { useState } from "react";
import Image from "next/image";

export function CarDetailGallery({ mainImage, images, promo, type }: { mainImage: string; images: string[]; promo?: string | null; type: string }) {
  const [activeImg, setActiveImg] = useState(mainImage);
  
  const gallery = [mainImage, ...images];
  if (gallery.length === 1) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-white">
        <Image
          src={mainImage}
          alt="Gambar Mobil"
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        {promo && (
          <span className="absolute top-4 left-4 inline-block px-3 py-1.5 text-xs font-semibold bg-accent text-white rounded-md shadow-sm">
            {promo}
          </span>
        )}
        <span className="absolute top-4 right-4 inline-block px-3 py-1.5 text-xs font-semibold bg-white/95 text-primary-foreground rounded-md shadow-sm">
          {type}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-white">
        <Image
          src={activeImg}
          alt="Gambar Mobil Utama"
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-opacity duration-300"
        />
        {promo && (
          <span className="absolute top-4 left-4 inline-block px-3 py-1.5 text-xs font-semibold bg-accent text-white rounded-md shadow-sm">
            {promo}
          </span>
        )}
        <span className="absolute top-4 right-4 inline-block px-3 py-1.5 text-xs font-semibold bg-white/95 text-primary-foreground rounded-md shadow-sm">
          {type}
        </span>
      </div>
      
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
        {gallery.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImg(img)}
            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 snap-start transition-all ${activeImg === img ? "border-accent shadow-md opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}
          >
            <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
