import { prisma } from "./prisma";

// ============================================================================
// Types
// ============================================================================

export type CarListItem = {
  id: number;
  brand: string;
  name: string;
  type: string;
  typeId: number;
  price: number;
  year: number;
  transmission: string;
  fuel: string;
  image: string;
  images: string | null;
  features: string;
  promo: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CarTypeItem = {
  id: number;
  name: string;
  sortOrder: number;
  isActive: boolean;
  _count?: { cars: number };
};

export type SiteSettingsMap = Record<string, string>;

export type HeroSlideItem = {
  id: number;
  image: string;
  title: string | null;
  subtitle: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  textPosition: string;
  sortOrder: number;
  isActive: boolean;
};

export type TestimonialItem = {
  id: number;
  image: string;
  sortOrder: number;
  isActive: boolean;
};

// ============================================================================
// Public read functions
// ============================================================================

export async function getActiveHeroSlides(): Promise<HeroSlideItem[]> {
  const rows = await prisma.heroSlide.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  return rows;
}

export async function getActiveTestimonials(): Promise<TestimonialItem[]> {
  const rows = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  return rows;
}

export async function getActiveCars(): Promise<CarListItem[]> {
  const rows = await prisma.car.findMany({
    where: { isActive: true },
    include: { type: { select: { id: true, name: true } } },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  return rows.map(toCarListItem);
}

export async function getActiveCarTypes(): Promise<CarTypeItem[]> {
  const rows = await prisma.carType.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    include: { _count: { select: { cars: { where: { isActive: true } } } } },
  });
  return rows;
}

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  const rows = await prisma.siteSetting.findMany();
  const map: SiteSettingsMap = {};
  for (const r of rows) {
    if (r.value != null) map[r.key] = r.value;
  }
  return map;
}

export function getSetting(map: SiteSettingsMap, key: string, fallback = ""): string {
  return map[key] ?? fallback;
}

// ============================================================================
// Admin read functions
// ============================================================================

export async function getAllCars(): Promise<CarListItem[]> {
  const rows = await prisma.car.findMany({
    include: { type: { select: { id: true, name: true } } },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  return rows.map(toCarListItem);
}

export async function getAllTestimonials(): Promise<TestimonialItem[]> {
  const rows = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  return rows;
}

export async function getAllCarTypes(): Promise<CarTypeItem[]> {
  const rows = await prisma.carType.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    include: { _count: { select: { cars: true } } },
  });
  return rows;
}

export async function getAllHeroSlides(): Promise<HeroSlideItem[]> {
  const rows = await prisma.heroSlide.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  return rows;
}

export async function getCarById(id: number): Promise<CarListItem | null> {
  const row = await prisma.car.findUnique({
    where: { id },
    include: { type: { select: { id: true, name: true } } },
  });
  return row ? toCarListItem(row) : null;
}

export async function getCarBySlug(slug: string): Promise<CarListItem | null> {
  const all = await prisma.car.findMany({
    include: { type: { select: { id: true, name: true } } },
  });
  for (const row of all) {
    if (carToSlug(row.brand, row.name) === slug) {
      return toCarListItem(row);
    }
  }
  return null;
}

export async function getRelatedCars(
  typeId: number,
  excludeId: number,
  limit = 3
): Promise<CarListItem[]> {
  const rows = await prisma.car.findMany({
    where: { typeId, isActive: true, NOT: { id: excludeId } },
    include: { type: { select: { id: true, name: true } } },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    take: limit,
  });
  return rows.map(toCarListItem);
}

export async function getAllSettingsGrouped(): Promise<
  Record<string, { id: number; key: string; value: string | null; label: string }[]>
> {
  const rows = await prisma.siteSetting.findMany({
    orderBy: [{ category: "asc" }, { key: "asc" }],
  });
  const grouped: Record<string, { id: number; key: string; value: string | null; label: string }[]> = {};
  for (const r of rows) {
    if (!grouped[r.category]) grouped[r.category] = [];
    grouped[r.category].push({ id: r.id, key: r.key, value: r.value, label: r.label });
  }
  return grouped;
}

// ============================================================================
// Helpers
// ============================================================================

function toCarListItem(row: {
  id: number;
  brand: string;
  name: string;
  typeId: number;
  type: { id: number; name: string };
  price: number;
  year: number;
  transmission: string;
  fuel: string;
  image: string;
  images: string | null;
  features: string | null;
  promo: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}): CarListItem {
  let featuresHtml = row.features || "";
  if (row.features?.startsWith("[")) {
    try {
      const parsed = JSON.parse(row.features);
      if (Array.isArray(parsed)) featuresHtml = parsed.map((p: string) => `<p>${p}</p>`).join("");
    } catch {}
  }
  return {
    id: row.id,
    brand: row.brand,
    name: row.name,
    type: row.type.name,
    typeId: row.typeId,
    price: row.price,
    year: row.year,
    transmission: row.transmission,
    fuel: row.fuel,
    image: row.image,
    features: featuresHtml,
    images: row.images,
    promo: row.promo,
    sortOrder: row.sortOrder,
    isActive: row.isActive,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function formatPrice(priceInJuta: number): string {
  if (priceInJuta >= 1000) {
    return `Rp ${(priceInJuta / 1000).toFixed(2)} M`;
  }
  return `Rp ${priceInJuta} Juta`;
}

/**
 * Generate URL-friendly slug dari brand + name.
 * "Toyota" + "Avanza 1.3 G MT" -> "toyota-avanza-1-3-g-mt"
 */
export function carToSlug(brand: string, name: string): string {
  const combined = `${brand} ${name}`.toLowerCase();
  return combined
    .replace(/\./g, "-")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

