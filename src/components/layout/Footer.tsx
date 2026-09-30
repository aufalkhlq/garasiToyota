import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { getSiteSettings, getSetting } from "@/lib/cms";

export default async function Footer() {
  const settings = await getSiteSettings();
  const siteName = getSetting(settings, "site.name", "DealerKu");
  const siteDescription = getSetting(settings, "site.description", "Dealer mobil terpercaya dengan koleksi terlengkap dan harga terbaik di Indonesia.");
  const phone = getSetting(settings, "contact.phone", "+62 812-3456-7890");
  const email = getSetting(settings, "contact.email", "info@dealerku.id");
  const address = getSetting(settings, "contact.address", "Jl. Sudirman No. 123, Jakarta Pusat, 10210");
  const hours = getSetting(settings, "contact.hours", "Senin - Sabtu: 08.00 - 20.00 WIB");
  const facebook = getSetting(settings, "social.facebook", "");
  const instagram = getSetting(settings, "social.instagram", "");
  const youtube = getSetting(settings, "social.youtube", "");
  const tiktok = getSetting(settings, "social.tiktok", "");
  const whatsapp = getSetting(settings, "contact.whatsapp", "6281234567890");
  const logo = getSetting(settings, "site.logo", "");
  const logoHeight = parseInt(getSetting(settings, "site.logo_height", "40"), 10) || 40;

  const whatsappMsg = getSetting(settings, "whatsapp.message", "Halo, saya tertarik dengan penawaran mobil...");
  const waLink = whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}` : "";

  const socials = [
    { href: facebook, Icon: Facebook, label: "Facebook" },
    { href: instagram, Icon: Instagram, label: "Instagram" },
    { href: youtube, Icon: Youtube, label: "YouTube" },
    { href: tiktok, Icon: MessageCircle, label: "TikTok" },
  ].filter((s) => s.href);


  return (
    <footer className="bg-muted border-t border-border">
      <div className="container-max py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              {logo ? (
                <Image
                  src={logo}
                  alt={siteName}
                  width={logoHeight * 3}
                  height={logoHeight}
                  className="object-contain"
                  style={{ height: logoHeight, width: 'auto' }}
                />
              ) : (
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
                  <span className="text-lg">{siteName.charAt(0).toUpperCase()}</span>
                </span>
              )}
              {!logo && <span>{siteName}</span>}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{siteDescription}</p>
            {socials.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                {socials.map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-accent transition-colors">Beranda</Link></li>
              <li><Link href="/pricelist" className="text-muted-foreground hover:text-accent transition-colors">Pricelist</Link></li>
              <li><Link href="/trade-in" className="text-muted-foreground hover:text-accent transition-colors">Trade In</Link></li>
              <li><Link href="/kontak" className="text-muted-foreground hover:text-accent transition-colors">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" /><span>{address}</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 flex-shrink-0" /><a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{phone}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 flex-shrink-0" /><a href={`mailto:${email}`} className="hover:text-accent transition-colors">{email}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Jam Operasional</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 flex-shrink-0" /><div className="font-medium text-primary-foreground">{hours}</div></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {siteName}. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}


