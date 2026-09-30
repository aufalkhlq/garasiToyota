import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Menghapus data mobil dan promo lama...");
  await prisma.car.deleteMany({});
  await prisma.heroSlide.deleteMany({});
  
  // Create Types
  const typeData = [
    { name: "MPV", sortOrder: 1 },
    { name: "SUV", sortOrder: 2 },
    { name: "Sedan", sortOrder: 3 },
    { name: "Hatchback", sortOrder: 4 },
    { name: "Electrified", sortOrder: 5 },
    { name: "Sport", sortOrder: 6 },
    { name: "Commercial", sortOrder: 7 },
  ];

  const typeMap: Record<string, number> = {};
  for (const t of typeData) {
    const created = await prisma.carType.upsert({
      where: { name: t.name },
      update: { sortOrder: t.sortOrder, isActive: true },
      create: { name: t.name, sortOrder: t.sortOrder, isActive: true },
    });
    typeMap[t.name] = created.id;
  }

  // Cars data
  const carsData = [
    // MPV
    { brand: "Toyota", name: "All New Voxy", typeName: "MPV", price: 600, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 1 },
    { brand: "Toyota", name: "All New Veloz", typeName: "MPV", price: 300, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 2 },
    { brand: "Toyota", name: "Kijang Innova Zenix", typeName: "MPV", price: 460, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 3 },
    { brand: "Toyota", name: "New Calya", typeName: "MPV", price: 180, year: 2024, transmission: "Manual", fuel: "Bensin", sortOrder: 4 },
    { brand: "Toyota", name: "All New Avanza", typeName: "MPV", price: 258, year: 2024, transmission: "Manual", fuel: "Bensin", sortOrder: 5 },
    { brand: "Toyota", name: "New Kijang Innova", typeName: "MPV", price: 442, year: 2024, transmission: "Manual", fuel: "Bensin", sortOrder: 6 },
    { brand: "Toyota", name: "Kijang Innova Zenix HEV", typeName: "MPV", price: 500, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 7 },
    { brand: "Toyota", name: "All New Vellfire HEV", typeName: "MPV", price: 2000, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 8 },
    
    // SUV
    { brand: "Toyota", name: "New Rush GR Sport", typeName: "SUV", price: 300, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 9 },
    { brand: "Toyota", name: "New Raize GR Sport", typeName: "SUV", price: 255, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 10 },
    { brand: "Toyota", name: "All New Land Cruiser", typeName: "SUV", price: 2700, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 11 },
    { brand: "Toyota", name: "New Fortuner GR Sport", typeName: "SUV", price: 715, year: 2024, transmission: "Automatic", fuel: "Diesel", sortOrder: 12 },
    
    // Sedan
    { brand: "Toyota", name: "All New Vios", typeName: "Sedan", price: 397, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 13 },
    { brand: "Toyota", name: "New Corolla Altis", typeName: "Sedan", price: 613, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 14 },
    
    // Hatchback
    { brand: "Toyota", name: "New Yaris GR Sport", typeName: "Hatchback", price: 365, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 15 },
    { brand: "Toyota", name: "New Agya Stylix", typeName: "Hatchback", price: 180, year: 2024, transmission: "Manual", fuel: "Bensin", sortOrder: 16 },
    { brand: "Toyota", name: "New Agya GR Sport", typeName: "Hatchback", price: 250, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 17 },
    
    // Electrified
    { brand: "Toyota", name: "All New Yaris Cross Hybrid EV", typeName: "Electrified", price: 460, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 18 },
    { brand: "Toyota", name: "All New Yaris Cross", typeName: "Electrified", price: 370, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 19 },
    { brand: "Toyota", name: "All New RAV4 GR Sport PHEV", typeName: "Electrified", price: 1000, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 20 },
    { brand: "Toyota", name: "All New Prius Hybrid EV", typeName: "Electrified", price: 800, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 21 },
    { brand: "Toyota", name: "New Corolla Cross GR Sport Hybrid EV", typeName: "Electrified", price: 675, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 22 },
    { brand: "Toyota", name: "New Corolla Cross Hybrid EV", typeName: "Electrified", price: 633, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 23 },
    { brand: "Toyota", name: "New Corolla Altis Hybrid EV", typeName: "Electrified", price: 669, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 24 },
    { brand: "Toyota", name: "New Camry Hybrid EV", typeName: "Electrified", price: 848, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 25 },
    { brand: "Toyota", name: "All New BZ4X BEV", typeName: "Electrified", price: 1190, year: 2024, transmission: "Automatic", fuel: "Electric", sortOrder: 26 },
    { brand: "Toyota", name: "All New Alphard Hybrid EV", typeName: "Electrified", price: 1700, year: 2024, transmission: "Automatic", fuel: "Hybrid", sortOrder: 27 },
    
    // Sport
    { brand: "Toyota", name: "New GR Yaris", typeName: "Sport", price: 1200, year: 2024, transmission: "Manual", fuel: "Bensin", sortOrder: 28 },
    { brand: "Toyota", name: "GR Supra", typeName: "Sport", price: 2300, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 29 },
    { brand: "Toyota", name: "All New GR Corolla", typeName: "Sport", price: 1300, year: 2024, transmission: "Manual", fuel: "Bensin", sortOrder: 30 },
    { brand: "Toyota", name: "New GR 86", typeName: "Sport", price: 1000, year: 2024, transmission: "Automatic", fuel: "Bensin", sortOrder: 31 },
    
    // Commercial
    { brand: "Toyota", name: "All New Hilux Rangga", typeName: "Commercial", price: 200, year: 2024, transmission: "Manual", fuel: "Diesel", sortOrder: 32 },
    { brand: "Toyota", name: "New Hilux Double Cabin", typeName: "Commercial", price: 490, year: 2024, transmission: "Manual", fuel: "Diesel", sortOrder: 33 },
    { brand: "Toyota", name: "New Hiace Premio", typeName: "Commercial", price: 700, year: 2024, transmission: "Manual", fuel: "Diesel", sortOrder: 34 },
    { brand: "Toyota", name: "New Hiace Commuter", typeName: "Commercial", price: 600, year: 2024, transmission: "Manual", fuel: "Diesel", sortOrder: 35 },
  ];

  for (const c of carsData) {
    await prisma.car.create({
      data: {
        brand: c.brand,
        name: c.name,
        typeId: typeMap[c.typeName],
        price: c.price,
        year: c.year,
        transmission: c.transmission,
        fuel: c.fuel,
        image: "", 
        sortOrder: c.sortOrder,
        isActive: true,
      }
    });
  }

  // Hero Slides (Promos)
  const heroSlides = [
    {
      image: "", 
      title: "Promo Toyota Spektakuler",
      subtitle: "Beli Mobil Toyota Banyak Untungnya! Nikmati beragam paket spesial untuk Avanza, Veloz, Rush, dan Raize.",
      ctaLabel: "Pesan Sekarang",
      ctaHref: "/kontak",
      textPosition: "left",
      sortOrder: 1,
    },
    {
      image: "",
      title: "Gratis Asuransi 2 Tahun!",
      subtitle: "Senilai Rp 16 juta. Berlaku untuk semua tipe Avanza, Veloz, dan Rush. DP mulai 10%, 15%, 20%, dan 25%.",
      ctaLabel: "Ambil Promo",
      ctaHref: "/kontak",
      textPosition: "center",
      sortOrder: 2,
    }
  ];

  for (const h of heroSlides) {
    await prisma.heroSlide.create({
      data: h
    });
  }
  
  // Settings Update
  await prisma.siteSetting.upsert({
    where: { key: "site.name" },
    update: { value: "Garasi Toyota" },
    create: { key: "site.name", value: "Garasi Toyota", category: "site", label: "Nama Situs" }
  });

  console.log("Seed Toyota data selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
