export type Testimonial = {
  id: number;
  name: string;
  role: string;
  car: string;
  rating: number;
  content: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Pengusaha",
    car: "Toyota Innova Zenix",
    rating: 5,
    content:
      "Pelayanan sangat profesional. Sales-nya ramah, tidak memaksa, dan menjelaskan semua detail dengan jelas. Proses kredit pun cepat hanya 3 hari jadi.",
    avatar: "BS",
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "Dokter",
    car: "Honda HR-V",
    rating: 5,
    content:
      "Saya puas beli di sini. Harga sesuai dengan pasar, mobil yang diberikan berkualitas, dan ada garansi yang jelas. Pasti akan kembali untuk pembelian berikutnya.",
    avatar: "SA",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    role: "Karyawan Swasta",
    car: "Mitsubishi Xpander",
    rating: 5,
    content:
      "Trade in mobil lama saya diharga dengan sangat adil, dan mobil baru yang saya beli kondisinya sempurna. Recommended!",
    avatar: "AW",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    role: "Ibu Rumah Tangga",
    car: "Toyota Calya",
    rating: 5,
    content:
      "Saya yang awam tentang mobil dilayani dengan sangat sabar. Semua dijelaskan dengan detail, dari fitur sampai tips perawatan. Terima kasih DealerKu!",
    avatar: "DL",
  },
  {
    id: 5,
    name: "Riko Pratama",
    role: "Programmer",
    car: "Honda Civic",
    rating: 5,
    content:
      "Showroom-nya bersih, modern, dan nyaman. Test drive juga fleksibel bisa menyesuaikan waktu. Pengalaman beli mobil terbaik yang pernah saya rasakan.",
    avatar: "RP",
  },
  {
    id: 6,
    name: "Lina Marlina",
    role: "Guru",
    car: "Hyundai Creta",
    rating: 5,
    content:
      "Setelah banding-banding ke beberapa dealer, akhirnya beli di sini karena memang paling transparan dan harga terbaik. Plus bonus service yang sangat membantu.",
    avatar: "LM",
  },
];
