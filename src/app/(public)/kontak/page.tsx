import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/kontak/ContactForm";
import { getSiteSettings, getSetting } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Hubungi Kami - Dealer Mobil Terpercaya",
  description:
    "Hubungi dealer mobil kami untuk konsultasi, test drive, atau pertanyaan seputar harga dan promo. Tim sales siap melayani Anda.",
};

export default async function KontakPage() {
  const settings = await getSiteSettings();
  const phone = getSetting(settings, "contact.phone", "+62 812-3456-7890");
  const email = getSetting(settings, "contact.email", "info@dealerku.id");
  const addressText = getSetting(settings, "contact.address", "Jl. Sudirman No. 123, Jakarta Pusat, 10210");
  const whatsapp = getSetting(settings, "contact.whatsapp", "6281234567890");
  const whatsappMsg = getSetting(settings, "whatsapp.message", "Halo, saya tertarik dengan penawaran mobil...");
  const profilePhoto = getSetting(settings, "contact.photo", "");
  const profileName = getSetting(settings, "contact.profile_name", "Sales Executive");
  const profileRole = getSetting(settings, "contact.profile_role", "Marketing Dealer");
  const profileSize = getSetting(settings, "contact.profile_size", "medium");
  const profileLayout = getSetting(settings, "contact.profile_layout", "horizontal");
  const waLink = whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}` : "";


  const contactInfo = [
    { icon: MapPin, title: "Alamat Showroom", value: addressText },
    { icon: Mail, title: "Email", value: email, href: `mailto:${email}` },
    { icon: MessageCircle, title: "WhatsApp", value: phone, href: waLink },
  ];

  return (
    <>
      <section className="bg-muted border-b border-border">
        <div className="container-max py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider">Kontak</p>
            <h1 className="heading-1 mt-2">Hubungi Kami</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Tim sales kami siap melayani Anda. Hubungi kami melalui salah satu kanal di bawah ini atau kirim pesan melalui formulir.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          <h2 className="heading-3 mb-10">Informasi Kontak</h2>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-5">
              
              {profilePhoto && (
                <div className={`flex ${profileLayout === "vertical" ? "flex-col text-center" : "items-center"} gap-4 rounded-xl border border-border bg-white p-4 mb-4`}>
                  <div className={`relative overflow-hidden rounded-full border-2 border-border ${profileSize === "small" ? "h-24 w-24" : profileSize === "large" ? "h-64 w-64" : "h-40 w-40"} ${profileLayout === "vertical" ? "mx-auto" : ""}`}>
                    <Image src={profilePhoto} alt="Profil Penjual" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className={`${profileSize === "large" ? "text-2xl" : "text-lg"} font-semibold`}>{profileName}</h3>
                    <p className={`text-muted-foreground ${profileSize === "large" ? "text-base mt-1" : "text-sm"}`}>{profileRole}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-4 transition-colors hover:border-accent">
                      <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{info.title}</p>
                        <p className="text-sm text-muted-foreground break-words">{info.value}</p>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a key={info.title} href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={info.title}>{content}</div>
                  );
                })}
              </div>
{/* 
              <div className="rounded-xl border border-border bg-muted p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">Jam Operasional</h3>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Senin - Sabtu</span><span className="font-medium">08.00 - 20.00 WIB</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Minggu</span><span className="font-medium">09.00 - 17.00 WIB</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Hari Libur</span><span className="font-medium text-red-600">Tutup</span></div>
                </div>
              </div> */}
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
                <h2 className="heading-3">Kirim Pesan</h2>
                <p className="mt-2 text-sm text-muted-foreground">Isi formulir di bawah ini dan tim kami akan menghubungi Anda sesegera mungkin.</p>
                <div className="mt-6"><ContactForm /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="bg-muted display-none">
        <div className="container-max py-12">
          <h2 className="heading-3 text-center">Lokasi Showroom</h2>
          <p className="mt-2 text-center text-muted-foreground">Kunjungi showroom kami untuk melihat koleksi mobil secara langsung.</p>
          <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl border border-border bg-white">
            <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=106.7949%2C-6.2180%2C106.8349%2C-6.1880&layer=mapnik&marker=-6.2030%2C106.8149" className="h-full w-full" style={{ border: 0 }} loading="lazy" title="Lokasi Showroom" />
          </div>
        </div>
      </section> */}
    </>
  );
}

