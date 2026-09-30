"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

export default function PricelistImageGallery({ imageUrl }: { imageUrl: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!imageUrl) return null;

  return (
    <>
      <section className="bg-white py-12 border-b border-border">
        <div className="container-max text-center">
          <h2 className="heading-3 mb-6">Brosur Pricelist</h2>
          <div 
            className="relative mx-auto max-w-2xl overflow-hidden rounded-xl border border-border shadow-sm cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative aspect-[4/3] w-full bg-muted">
              <Image 
                src={imageUrl} 
                alt="Pricelist Image" 
                fill 
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-accent p-3 rounded-full shadow-lg">
                <ZoomIn className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 p-2 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-5xl h-[85vh]">
            <Image 
              src={imageUrl} 
              alt="Pricelist Full" 
              fill 
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
