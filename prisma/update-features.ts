import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newFeatures = JSON.stringify([
    "?? PROMO: Diskon Normal Rp. 30.000.000,-",
    "?? PROMO: FIESTA 64thn Nasmoco",
    "? BENEFIT: Trade In Rp. 2.000.000,-",
    "? BENEFIT: Subsidi Kredit Rp. 5.000.000,-",
    "? BENEFIT: Flash Sale Rp. 1.000.000,-",
    "? BENEFIT: Repeat Order Rp. 3.000.000,-",
    "? BENEFIT: T-Care Gratis Maintenance (Jasa, Oli & Part s.d 7x / 60.000 km)",
    "? BENEFIT: Body Paint Gratis Perawatan 21 Bulan",
    "?? FINANCE: Bunga 2,64% (1 Tahun), DP Mulai 20%",
    "?? PAKET 1 (DP Ringan): DP Rp. 107 Juta | Angsuran Rp. 13,5 Juta x 60 Bulan (TAF)",
    "?? PAKET 2 (Angsuran Ringan): DP Rp. 137 Juta | Angsuran Rp. 11,3 Juta x 60 Bulan (ACC)",
    "?? LEASING PARTNER: TAF, ACC, MTF, MUF, BCAF, Maybank, Adira, BNIF",
    "??? INSURANCE: Gratis Asuransi s.d 2 tahun (Ramayana, Cakrawala, Astrabuana, dll)"
  ]);

  const cars = await prisma.car.updateMany({
    data: {
      features: newFeatures
    }
  });

  console.log(`Updated ${cars.count} cars with new details.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
