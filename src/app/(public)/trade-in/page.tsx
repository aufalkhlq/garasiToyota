import type { Metadata } from "next";
import { RefreshCw, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import TradeInForm from "@/components/tradein/TradeInForm";
import { getSiteSettings, getSetting } from "@/lib/cms";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Trade In Mobil Lama - Tukar Tambah Mudah",
  description:
    "Tukar mobil lama Anda dengan mobil baru idaman. Proses cepat, harga adil, dan aman. Dapatkan penawaran terbaik dari dealer kami.",
};

const benefits = [
  {
    icon: RefreshCw,
    title: "Proses Cepat",
    desc: "Pengecekan mobil hanya 1 jam, langsung dapat penawaran.",
  },
  {
    icon: CheckCircle2,
    title: "Harga Adil",
    desc: "Penawaran mengikuti harga pasar dengan transparan.",
  },
  {
    icon: ShieldCheck,
    title: "Aman & Terpercaya",
    desc: "Semua proses dilakukan secara resmi dan terdokumentasi.",
  },
  {
    icon: Clock,
    title: "Hemat Waktu",
    desc: "Tidak perlu pasang iklan sendiri, kami yang mencarikan pembeli.",
  },
];

export default async function TradeInPage() {
  const settings = await getSiteSettings();
  const waNumber = getSetting(settings, "whatsapp.number", "6281234567890");
  const waMessage = getSetting(settings, "whatsapp.message", "Halo, saya tertarik untuk trade in mobil");
  const phoneDisplay = getSetting(settings, "contact.phone_display", "+62 812-3456-7890");

  return (
    <>
      <section className="bg-muted border-b border-border">
        <div className="container-max py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider">
              Trade In
            </p>
            <h1 className="heading-1 mt-2">Tukar Mobil Lama, Hemat Lebih Banyak</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Tukar tambah mobil lama Anda dengan mobil baru idaman. Proses
              mudah, harga terbaik, dan langsung dapat cashback.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Benefits */}
            <aside className="lg:col-span-2">
              <h2 className="heading-3">Mengapa Trade In di Sini?</h2>
              <div className="mt-6 space-y-5">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{b.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-xl border border-border bg-muted p-5">
                <p className="text-sm font-semibold">Butuh Bantuan?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hubungi kami di {phoneDisplay} untuk konsultasi gratis.
                </p>
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  <button className="bg-accent text-white hover:bg-accent-hover py-2 px-4 rounded-lg">
                    Chat WhatsApp
                  </button>
                </a>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
                <h2 className="heading-3">Form Pengajuan Trade In</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Isi formulir di bawah ini dengan data yang benar. Tim kami
                  akan menghubungi Anda dalam 1x24 jam.
                </p>
                <div className="mt-8">
                  <TradeInForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
