import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dealer-mobil.example.com"),
  title: {
    default: "Dealer Mobil Terpercaya - Harga Terbaik & Promo Spesial",
    template: "%s | Dealer Mobil Terpercaya",
  },
  description:
    "Dealer mobil resmi dengan koleksi terlengkap, harga kompetitif, dan layanan trade-in terbaik. Dapatkan mobil impian Anda dengan mudah.",
  keywords: [
    "dealer mobil",
    "jual mobil",
    "mobil baru",
    "trade in mobil",
    "harga mobil",
    "promo mobil",
  ],
  authors: [{ name: "Dealer Mobil" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Dealer Mobil Terpercaya - Harga Terbaik & Promo Spesial",
    description:
      "Dealer mobil resmi dengan koleksi terlengkap, harga kompetitif, dan layanan trade-in terbaik.",
    siteName: "Dealer Mobil",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "DealerKu",
  image: "https://dealer-mobil.example.com/og-image.jpg",
  "@id": "https://dealer-mobil.example.com",
  url: "https://dealer-mobil.example.com",
  telephone: "+6281234567890",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Sudirman No. 123",
    addressLocality: "Jakarta Pusat",
    postalCode: "10210",
    addressCountry: "ID",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/dealerku",
    "https://www.instagram.com/dealerku",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={jakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-primary text-primary-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
