import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const settings = [
    { key: "pricelist.hero_title", value: "Harga Mobil Terbaru 2024", category: "pricelist", label: "Judul Hero Pricelist" },
    { key: "pricelist.hero_subtitle", value: "Daftar harga OTR (On The Road) untuk berbagai merk dan tipe mobil. Harga dapat berubah sewaktu-waktu, hubungi kami untuk info promo terkini.", category: "pricelist", label: "Subjudul Hero Pricelist" }
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s
    });
  }
  console.log("Added pricelist hero settings");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
