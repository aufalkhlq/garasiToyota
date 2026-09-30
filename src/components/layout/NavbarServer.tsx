import { getSiteSettings, getSetting } from "@/lib/cms";
import Navbar from "./Navbar";

export default async function NavbarServer() {
  const settings = await getSiteSettings();
  const siteName = getSetting(settings, "site.name", "DealerKu");
  const phone = getSetting(settings, "contact.phone", "0812-3456-7890");
  const logo = getSetting(settings, "site.logo", "");
  const logoHeight = getSetting(settings, "site.logo_height", "40");

  const whatsapp = getSetting(settings, "contact.whatsapp", phone);
  const whatsappMsg = getSetting(settings, "whatsapp.message", "Halo, saya tertarik dengan penawaran mobil...");
  const waLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}`;

  return <Navbar siteName={siteName} phone={phone} logo={logo} logoHeight={logoHeight} waLink={waLink} />;
}
