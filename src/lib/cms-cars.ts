import { prisma } from "./prisma";
import { carToSlug } from "./cms";

export async function getCarsPaged(params: { q?: string; page?: number; limit?: number }) {
  const { q = "", page = 1, limit = 10 } = params;
  
  const where = q
    ? {
        OR: [
          { name: { contains: q } },
          { brand: { contains: q } },
        ],
      }
    : {};

  const [total, rows] = await Promise.all([
    prisma.car.count({ where }),
    prisma.car.findMany({
      where,
      include: { type: { select: { id: true, name: true } } },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
    })
  ]);

  return {
    total,
    pages: Math.ceil(total / limit),
    page,
    cars: rows.map(r => {
      let featuresHtml = r.features || "";
      if (r.features?.startsWith("[")) {
        try {
          const parsed = JSON.parse(r.features);
          if (Array.isArray(parsed)) featuresHtml = parsed.map((p: string) => `<p>${p}</p>`).join("");
        } catch {}
      }
      return {
        ...r,
        type: r.type.name,
        features: featuresHtml,
      };
    })
  };
}
