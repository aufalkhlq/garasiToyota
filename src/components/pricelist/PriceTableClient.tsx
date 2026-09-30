"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

function formatPrice(priceInMillion: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(priceInMillion * 1000000);
}

function carToSlug(brand: string, name: string) {
  return `${brand} ${name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type CarItem = {
  id: number;
  brand: string;
  name: string;
  type: string;
  transmission: string;
  fuel: string;
  year: number;
  price: number;
  image: string;
  promo: string | null;
};

export default function PriceTableClient({ cars }: { cars: CarItem[] }) {
  const [q, setQ] = useState("");

  const filtered = cars.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.brand.toLowerCase().includes(q.toLowerCase()) ||
      c.type.toLowerCase().includes(q.toLowerCase())
  );

  const groupedCars = filtered.reduce<Record<string, CarItem[]>>((acc, car) => {
    if (!acc[car.brand]) acc[car.brand] = [];
    acc[car.brand].push(car);
    return acc;
  }, {});

  const brandNames = Object.keys(groupedCars).sort();

  return (
    <section className="section bg-white">
      <div className="container-max">
        <div className="mb-10 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari model, brand, atau tipe..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
          />
        </div>

        {brandNames.length === 0 ? (
          <p className="text-muted-foreground py-10 text-center">Mobil tidak ditemukan.</p>
        ) : (
          <div className="space-y-16">
            {brandNames.map((brand) => (
              <div key={brand}>
                <div className="flex items-end justify-between mb-6 border-b border-border pb-3">
                  <h2 className="heading-3">{brand}</h2>
                  <span className="text-sm text-muted-foreground">
                    {groupedCars[brand].length} model
                  </span>
                </div>

                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-3 pr-4 font-medium">Model</th>
                        <th className="py-3 pr-4 font-medium">Tipe</th>
                        <th className="py-3 pr-4 font-medium">Transmisi</th>
                        <th className="py-3 pr-4 font-medium">Bahan Bakar</th>
                        <th className="py-3 pr-4 font-medium">Tahun</th>
                        <th className="py-3 pr-4 font-medium text-right">Harga OTR</th>
                        <th className="py-3 pl-4 font-medium text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedCars[brand].map((car) => (
                        <tr key={car.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="font-semibold">{car.name}</div>
                            {car.promo && (
                              <span className="mt-1 inline-block text-xs text-accent font-medium">
                                {car.promo}
                              </span>
                            )}
                          </td>
                          <td className="py-4 pr-4">{car.type}</td>
                          <td className="py-4 pr-4">{car.transmission}</td>
                          <td className="py-4 pr-4">{car.fuel}</td>
                          <td className="py-4 pr-4">{car.year}</td>
                          <td className="py-4 pr-4 text-right font-bold text-accent">
                            {formatPrice(car.price)}
                          </td>
                          <td className="py-4 pl-4 text-right">
                            <Link
                              href={`/mobil/${carToSlug(car.brand, car.name)}`}
                              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
                            >
                              Detail &rarr;
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-4">
                  {groupedCars[brand].map((car) => (
                    <Link
                      key={car.id}
                      href={`/mobil/${carToSlug(car.brand, car.name)}`}
                      className="flex gap-4 rounded-xl border border-border bg-white p-4 hover:border-accent transition-colors"
                    >
                      <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {car.brand} - {car.type}
                        </p>
                        <h3 className="font-semibold text-sm leading-tight truncate">
                          {car.name}
                        </h3>
                        <p className="mt-1 font-bold text-accent text-sm">
                          {formatPrice(car.price)}
                        </p>
                        {car.promo && (
                          <p className="mt-0.5 text-xs text-accent font-medium">
                            {car.promo}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
