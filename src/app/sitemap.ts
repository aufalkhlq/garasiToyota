import type { MetadataRoute } from "next";
import { getActiveCars } from "@/lib/cms";
import { carToSlug } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://garasitoyota.com";

  const cars = await getActiveCars();
  
  const carUrls = cars.map((car) => ({
    url: `${baseUrl}/mobil/${carToSlug(car.brand, car.name)}`,
    lastModified: car.updatedAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricelist`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trade-in`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...carUrls,
  ];
}


