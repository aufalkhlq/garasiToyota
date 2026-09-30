import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Trade-In Submissions
  const tradeIn1 = await prisma.tradeInSubmission.create({
    data: {
      customerName: "Budi Santoso",
      customerPhone: "081234567890",
      customerEmail: "budi@example.com",
      oldCarBrand: "Toyota",
      oldCarModel: "Avanza",
      oldCarYear: 2018,
      oldCarKm: 75000,
      oldCarCondition: "Baik",
      targetCar: "Toyota Calya / Daihatsu Sigra",
      notes: "Mau tukar tambah untuk keluarga",
      status: "baru",
    },
  });

  const tradeIn2 = await prisma.tradeInSubmission.create({
    data: {
      customerName: "Siti Aminah",
      customerPhone: "085712345678",
      oldCarBrand: "Honda",
      oldCarModel: "Jazz",
      oldCarYear: 2015,
      oldCarKm: 120000,
      oldCarCondition: "Cukup Baik",
      targetCar: "Honda HR-V",
      status: "diproses",
    },
  });

  // 2. Contact Messages
  const msg1 = await prisma.contactMessage.create({
    data: {
      name: "Andi Wijaya",
      email: "andi@example.com",
      phone: "081234567890",
      subject: "Tanya Promo Akhir Tahun",
      message: "Apakah ada diskon khusus untuk pembelian tunai di akhir tahun ini?",
      status: "baru",
    },
  });

  const msg2 = await prisma.contactMessage.create({
    data: {
      name: "Dewi Lestari",
      email: "dewi@example.com",
      subject: "Test Drive",
      message: "Saya ingin melakukan test drive untuk Mitsubishi Xpander pada akhir pekan.",
      status: "dibaca",
    },
  });



  // 3. Car Types
  const typeData = [
    { name: "SUV", sortOrder: 1 },
    { name: "MPV", sortOrder: 2 },
    { name: "Sedan", sortOrder: 3 },
    { name: "Hatchback", sortOrder: 4 },
    { name: "Pickup", sortOrder: 5 },
  ];

  const types: Record<string, number> = {};
  for (const t of typeData) {
    const created = await prisma.carType.upsert({
      where: { name: t.name },
      update: { sortOrder: t.sortOrder, isActive: true },
      create: { name: t.name, sortOrder: t.sortOrder, isActive: true },
    });
    types[t.name] = created.id;
  }

  // 4. Cars
  const carsData = [
    { brand: "Toyota", name: "Avanza 1.3 G MT", typeName: "MPV", price: 245, year: 2024, transmission: "Manual", fuel: "Bensin", image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80&auto=format&fit=crop", features: ["7 Penumpang", "AC Double Blower", "Power Steering"], promo: "DP Mulai 20 Juta", sortOrder: 1 },
    { brand: "Mitsubishi", name: "Xpander 1.5 Ultimate AT", typeName: "MPV", price: 312, year: 2024, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop", features: ["7 Penumpang", "Keyless Entry", "Push Start"], sortOrder: 2 },
    { brand: "Honda", name: "HR-V 1.5 SE CVT", typeName: "SUV", price: 385, year: 2024, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80&auto=format&fit=crop", features: ["Honda Sensing", "Sunroof", "Digital AC"], promo: "Cashback 10 Juta", sortOrder: 3 },
    { brand: "Toyota", name: "Calya 1.2 G MT", typeName: "MPV", price: 168, year: 2024, transmission: "Manual", fuel: "Bensin", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80&auto=format&fit=crop", features: ["7 Penumpang", "Irit BBM", "Sparepart Murah"], sortOrder: 4 },
    { brand: "Honda", name: "Jazz 1.5 RS CVT", typeName: "Hatchback", price: 295, year: 2024, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&auto=format&fit=crop", features: ["Honda Sensing", "Spacious Cabin", "Sporty Design"], sortOrder: 5 },
    { brand: "Honda", name: "Civic 1.5 TC CVT", typeName: "Sedan", price: 615, year: 2024, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80&auto=format&fit=crop", features: ["Turbo Engine", "Premium Audio", "Leather Seat"], promo: "Bunga 0%", sortOrder: 6 },
    { brand: "Toyota", name: "Hilux 2.4 G 4x4 MT", typeName: "Pickup", price: 488, year: 2024, transmission: "Manual", fuel: "Diesel", image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&q=80&auto=format&fit=crop", features: ["4WD", "Tangguh Offroad", "Daya Angkut Besar"], sortOrder: 7 },
    { brand: "Hyundai", name: "Creta 1.5 Prime IVT", typeName: "SUV", price: 421, year: 2024, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80&auto=format&fit=crop", features: ["ADAS Features", "Bose Audio", "Ventilated Seat"], promo: "Free Service 5 Tahun", sortOrder: 8 },
    { brand: "Toyota", name: "Innova Zenix 2.0 G HV", typeName: "MPV", price: 432, year: 2024, transmission: "Automatic", fuel: "Hybrid", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&auto=format&fit=crop", features: ["Hybrid Engine", "Captain Seat", "Toyota Safety Sense"], sortOrder: 9 },
  ];

  for (const c of carsData) {
    // Cari existing by brand+name agar idempotent
    const existing = await prisma.car.findFirst({
      where: { brand: c.brand, name: c.name },
    });
    if (existing) {
      await prisma.car.update({
        where: { id: existing.id },
        data: {
          typeId: types[c.typeName],
          price: c.price,
          year: c.year,
          transmission: c.transmission,
          fuel: c.fuel,
          image: c.image,
          features: JSON.stringify(c.features),
          promo: c.promo,
          sortOrder: c.sortOrder,
          isActive: true,
        },
      });
    } else {
      await prisma.car.create({
        data: {
          brand: c.brand,
          name: c.name,
          typeId: types[c.typeName],
          price: c.price,
          year: c.year,
          transmission: c.transmission,
          fuel: c.fuel,
          image: c.image,
          features: JSON.stringify(c.features),
          promo: c.promo,
          sortOrder: c.sortOrder,
          isActive: true,
        },
      });
    }
  }

  // 5. Site Settings
  const settings = [
    { key: "site.name", value: "Garasi Mobil", category: "identity", label: "Nama Situs" },
    { key: "site.title", value: "Garasi Mobil", category: "identity", label: "Judul Situs" },
    { key: "site.tagline", value: "Dealer Mobil Terpercaya #1 di Indonesia", category: "identity", label: "Tagline" },
    { key: "site.description", value: "Garasi Mobil adalah dealer mobil resmi yang menyediakan berbagai pilihan mobil baru dengan harga terbaik dan layanan profesional.", category: "identity", label: "Deskripsi Singkat" },
    { key: "site.logo", value: "/logo.svg", category: "identity", label: "Logo (path/URL)" },
    { key: "contact.phone", value: "+62 812-3456-7890", category: "contact", label: "Nomor Telepon" },
    { key: "contact.phone_display", value: "+62 812-3456-7890", category: "contact", label: "Tampilan Telepon" },
    { key: "contact.email", value: "info@garasimobil.com", category: "contact", label: "Email" },
    { key: "contact.address", value: "Jl. Sudirman No. 123, Jakarta Pusat, 10110", category: "contact", label: "Alamat" },
    { key: "contact.map_url", value: "", category: "contact", label: "URL Google Maps (embed)" },
    { key: "contact.whatsapp", value: "6281234567890", category: "whatsapp", label: "Nomor WhatsApp (format 62xxx)" },
    { key: "contact.hours", value: "Senin - Sabtu: 09.00 - 21.00 WIB", category: "hours", label: "Jam Operasional (Gabungan)" },
    { key: "hours.weekday", value: "Senin - Sabtu: 09.00 - 21.00 WIB", category: "hours", label: "Jam Weekday" },
    { key: "hours.weekend", value: "Minggu: 10.00 - 18.00 WIB", category: "hours", label: "Jam Weekend" },
    { key: "social.facebook", value: "https://facebook.com/garasimobil", category: "social", label: "Facebook URL" },
    { key: "social.instagram", value: "https://instagram.com/garasimobil", category: "social", label: "Instagram URL" },
    { key: "social.youtube", value: "https://youtube.com/@garasimobil", category: "social", label: "YouTube URL" },
    { key: "social.tiktok", value: "https://tiktok.com/@garasimobil", category: "social", label: "TikTok URL" },
    { key: "hero.title", value: "Temukan Mobil Impian Anda", category: "hero", label: "Judul Hero" },
    { key: "hero.subtitle", value: "Koleksi lengkap mobil baru dengan harga terbaik, garansi resmi, dan layanan purna jual terpercaya.", category: "hero", label: "Subtitle Hero" },
    { key: "hero.cta_label", value: "Lihat Katalog", category: "hero", label: "Label Tombol Hero" },
    { key: "hero.cta_href", value: "/pricelist", category: "hero", label: "URL Tombol Hero" },
    { key: "hero.cta_primary", value: "Lihat Katalog", category: "hero", label: "Tombol Utama (alias)" },
    { key: "hero.cta_secondary", value: "Konsultasi Gratis", category: "hero", label: "Tombol Kedua (alias)" },
    { key: "whatsapp.number", value: "6281234567890", category: "whatsapp", label: "Nomor WhatsApp" },
    { key: "whatsapp.message", value: "Halo, saya tertarik untuk trade in mobil", category: "whatsapp", label: "Pesan Default WhatsApp" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, category: s.category, label: s.label },
      create: s,
    });
  }

    // 6. Hero Slides
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&auto=format&fit=crop",
      title: "Temukan Mobil Impian Anda",
      subtitle: "Koleksi lengkap mobil baru dengan harga terbaik, garansi resmi, dan layanan purna jual terpercaya.",
      ctaLabel: "Lihat Katalog",
      ctaHref: "/pricelist",
      textPosition: "left",
      sortOrder: 1,
    },
    {
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80&auto=format&fit=crop",
      title: "Promo Spesial Bulan Ini",
      subtitle: "Dapatkan cashback hingga puluhan juta rupiah dan paket servis gratis selama 3 tahun.",
      ctaLabel: "Info Promo",
      ctaHref: "/kontak",
      textPosition: "center",
      sortOrder: 2,
    },
  ];

  for (const h of heroSlides) {
    await prisma.heroSlide.upsert({
      where: { id: h.sortOrder }, // dummy assumption for upsert based on ID if we wanted to be idempotent, but let's just create or update
      update: h,
      create: {
        id: h.sortOrder,
        ...h
      },
    });
  }

  console.log("Seed berhasil:", {
    tradeIn1: tradeIn1.id,
    tradeIn2: tradeIn2.id,
    msg1: msg1.id,
    msg2: msg2.id,
    carTypes: typeData.length,
    cars: carsData.length,
    settings: settings.length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


