import NavbarServer from "@/components/layout/NavbarServer";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarServer />
      <main className="min-h-[calc(100vh-160px)]">{children}</main>
      <Footer />
    </>
  );
}

