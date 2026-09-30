# DealerKu - Website Dealer Mobil

Website dealer mobil modern dengan Next.js 14, Prisma, dan **MySQL**. Sudah termasuk panel admin untuk mengelola pengajuan trade-in dan pesan masuk.

## ✨ Fitur

### Halaman Publik
- **Beranda** - Hero slider, promo, katalog mobil dengan filter tipe, testimoni
- **Pricelist** - Daftar harga OTR dikelompokkan per merk
- **Trade In** - Formulir pengajuan tukar tambah dengan validasi
- **Kontak** - Info dealer, jam operasional, peta, dan formulir pesan

### Panel Admin (`/admin`)
- **Login aman** dengan session cookie (HMAC signed)
- **Dashboard** dengan ringkasan statistik
- **Manajemen Trade In** - Lihat, ubah status, hapus pengajuan
- **Manajemen Pesan** - Lihat, balas via email, ubah status, hapus
- **Responsif** - Tampilan optimal di mobile, tablet, dan desktop

### Optimasi SEO & Performa
- **Server Components** by default (zero JS overhead)
- **Image optimization** dengan next/image (WebP/AVIF otomatis)
- **Plus Jakarta Sans** via next/font (no layout shift)
- **Metadata dinamis** per halaman
- **JSON-LD** schema AutoDealer
- **Sitemap & robots.txt** otomatis
- **Mobile-first** responsive design
- **A11y-friendly** semantic HTML

## 🎨 Design System

- **Font:** Plus Jakarta Sans (300, 400, 500, 600, 700, 800)
- **Primary:** Putih (`#FFFFFF`)
- **Accent:** Biru elegan (`#1E40AF`) - SOLID, tanpa gradient
- **Teks:** Abu-abu gelap (`#1E293B`)
- **Muted:** Abu-abu terang (`#F8FAFC`)
- **Border:** Abu-abu (`#E2E8F0`)

## 🚀 Cara Menjalankan

### 1. Install dependensi
```bash
cd dealer-mobil
npm install
```

### 2. Setup MySQL

Pastikan MySQL sudah berjalan (XAMPP/Laragon/MAMP/Docker).

**Buat database** (lewati jika sudah ada):
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS dealer_mobil CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

**Atau di Laragon/XAMPP phpMyAdmin** — buat database baru bernama `dealer_mobil` dengan collation `utf8mb4_unicode_ci`.

### 3. Konfigurasi `.env`
```env
# Sesuaikan user/password/host MySQL Anda
DATABASE_URL="mysql://root:@localhost:3306/dealer_mobil"
```

Lihat `.env.example` untuk template lengkap (XAMPP, Laragon, MAMP, Docker, cloud).

### 4. Push schema & seed
```bash
npx prisma db push      # Buat tabel di MySQL
npx prisma generate     # Generate Prisma Client
npm run db:seed         # Isi data dummy
```

### 5. Jalankan development server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat website.

### 6. Akses admin
Buka [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Kredensial default:**
- Username: `admin`
- Password: `admin123`

> ⚠️ **Penting:** Segera ubah `ADMIN_USERNAME`, `ADMIN_PASSWORD`, dan `SESSION_SECRET` di file `.env` sebelum production!

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS 3
- **Database:** MySQL 8 + Prisma ORM
- **Auth:** HMAC-signed session cookie
- **Icon:** Lucide React
- **Slider:** Embla Carousel
- **Form:** React useFormState + Server Actions

## 📁 Struktur Folder

```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Beranda
│   │   ├── pricelist/page.tsx
│   │   ├── trade-in/page.tsx
│   │   └── kontak/page.tsx
│   ├── admin/
│   │   ├── login/page.tsx        # Login (tidak diproteksi)
│   │   └── (protected)/          # Route group dengan auth
│   │       ├── layout.tsx        # Sidebar + cek session
│   │       ├── page.tsx          # Dashboard
│   │       ├── trade-in/page.tsx
│   │       └── messages/page.tsx
│   ├── actions/                  # Server actions
│   │   ├── auth.ts
│   │   ├── contact.ts
│   │   ├── tradein.ts
│   │   └── admin.ts
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── home/                     # Hero, Promo, Cars, Testimoni
│   ├── pricelist/
│   ├── tradein/
│   ├── kontak/
│   └── admin/
├── lib/
│   ├── auth.ts                   # Auth helpers (Node crypto)
│   ├── prisma.ts                 # Prisma client
│   ├── cars.ts                   # Data mobil
│   ├── promo.ts                  # Data promo
│   └── testimonials.ts           # Data testimoni
└── middleware.ts                 # Proteksi /admin/* (Web Crypto untuk Edge runtime)
```

## 🔐 Catatan Keamanan

1. **Password admin default** ada di `.env` (ubah sebelum deploy)
2. **SessionSecret** juga di `.env` (generate yang kuat untuk production)
3. **Middleware** otomatis memproteksi semua route di `/admin/*` kecuali `/admin/login`
4. **Validasi input** dilakukan di server action dengan tipe dan format
5. **Edge runtime middleware** menggunakan Web Crypto API (bukan `node:crypto` yang tidak tersedia di Edge). `src/lib/auth.ts` tetap pakai `node:crypto` karena berjalan di Node runtime (Server Components/Server Actions).
6. **Fallback secret** di middleware dan auth harus sinkron — jika Anda mengubah `SESSION_SECRET` di `.env`, fallback di kedua file juga harus diubah agar signature cocok.

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Build untuk production
npm run start        # Jalankan production build
npm run lint         # ESLint
npm run db:push      # Push schema Prisma ke database
npm run db:seed      # Seed data dummy
```

## 🚢 Deploy

Website ini siap deploy ke **Vercel**, **Netlify**, atau platform Node.js lainnya.

Untuk production, pertimbangkan:
- Gunakan MySQL/PostgreSQL managed (PlanetScale, AWS RDS, Railway)
- Set `DATABASE_URL` dari environment variable (jangan commit `.env`)
- Tambahkan rate limiting
- Tambahkan captcha untuk form publik
- Setup email notification saat ada submission baru
- Ganti bcrypt untuk hash password admin
- Setup backup otomatis untuk MySQL
