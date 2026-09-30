export type Promo = {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  badge?: string;
};

export const promos: Promo[] = [
  {
    id: 1,
    title: "Promo Akhir Tahun 2024",
    description:
      "Dapatkan diskon hingga 25 juta untuk pembelian mobil pilihan. Berlaku hingga 31 Desember 2024.",
    cta: "Lihat Promo",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&auto=format&fit=crop",
    badge: "Hemat 25 Juta",
  },
  {
    id: 2,
    title: "Bunga 0% untuk Kredit 3 Tahun",
    description:
      "Khusus pembelian mobil Honda, Toyota, dan Mitsubishi. Syarat dan ketentuan berlaku.",
    cta: "Ajukan Kredit",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80&auto=format&fit=crop",
    badge: "Bunga 0%",
  },
  {
    id: 3,
    title: "Trade In dengan Potongan hingga 15 Juta",
    description:
      "Tukar mobil lama Anda dengan harga terbaik. Proses cepat, bayar langsung cash.",
    cta: "Tukar Sekarang",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=80&auto=format&fit=crop",
    badge: "Trade In",
  },
];
