"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";
import { type CarListItem, formatPrice, carToSlug } from "@/lib/cms";
import { clsx } from "clsx";

type CarType = { id: number; name: string };

export default function CarCatalogView({
  cars,
  types,
}: {
  cars: CarListItem[];
  types: CarType[];
}) {
  const typeNames = useMemo(() => {
    return types.map((t) => t.name);
  }, [types]);

  const [activeType, setActiveType] = useState<string>(typeNames[0] || "");

  const filteredCars = useMemo(() => {
    if (!activeType) return cars;
    return cars.filter((c) => c.type === activeType);
  }, [activeType, cars]);

  const countByType = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of types) {
      map[t.name] = cars.filter((c) => c.type === t.name).length;
    }
    return map;
  }, [cars, types]);

  return (
    <section className="section bg-muted">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">
            Katalog Mobil
          </p>
          <h2 className="heading-2 mt-2">Temukan Mobil Impian Anda</h2>
          <p className="mt-3 text-muted-foreground">
            Pilih dari berbagai tipe mobil yang sesuai dengan kebutuhan dan
            budget Anda.
          </p>
        </div>

        {/* Filter Tipe Mobil */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {typeNames.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={clsx(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeType === type
                  ? "bg-accent text-white"
                  : "bg-white border border-border text-primary-foreground hover:border-accent hover:text-accent"
              )}
            >
              {type}
              {type !== "Semua" && (
                <span className="ml-1.5 text-xs opacity-70">({countByType[type] ?? 0})</span>
              )}
            </button>
          ))}
        </div>

        {/* Grid Mobil */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <Link
              key={car.id}
              href={`/mobil/${carToSlug(car.brand, car.name)}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg hover:border-accent"
            >
              <div className="relative aspect-[4/2] overflow-hidden bg-muted">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
                {car.promo && (
                  <span className="absolute top-3 left-3 inline-block px-2.5 py-1 text-xs font-semibold bg-accent text-white rounded-md">
                    {car.promo}
                  </span>
                )}
                <span className="absolute top-3 right-3 inline-block px-2.5 py-1 text-xs font-semibold bg-white/95 text-primary-foreground rounded-md">
                  {car.type}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs font-medium text-muted-foreground uppercase">
                  {car.brand}
                </div>
                <h3 className="mt-1 text-lg font-bold leading-tight">
                  {car.name}
                </h3>

                <div className="mt-auto flex items-end justify-between pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Harga Mulai</p>
                    <p className="text-lg font-bold text-accent">
                      {formatPrice(car.price)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            Tidak ada mobil untuk tipe ini.
          </p>
        )}

        <div className="mt-10 text-center">
          <Link href="/pricelist" className="btn-secondary">
            Lihat Semua Pricelist
          </Link>
        </div>
      </div>
    </section>
  );
}

