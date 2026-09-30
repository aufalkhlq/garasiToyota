"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/pricelist", label: "Pricelist" },
  { href: "/trade-in", label: "Trade In" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar({
  siteName = "DealerKu",
  phone = "0812-3456-7890",
  logo = "",
  logoHeight = "40",
  waLink = "#",
}: {
  siteName?: string;
  phone?: string;
  logo?: string;
  logoHeight?: string;
  waLink?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);


  const numLogoHeight = parseInt(logoHeight, 10) || 40;

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-white border-b border-transparent"
      )}
    >
      <div className="container-max">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            {logo ? (
              <Image 
                src={logo} 
                alt={siteName} 
                width={numLogoHeight * 3} // allow wide aspect ratio 
                height={numLogoHeight}
                className="object-contain"
                style={{ height: numLogoHeight, width: 'auto' }}
              />
            ) : (
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
                <span className="text-lg">{siteName.charAt(0).toUpperCase()}</span>
              </span>
            )}
            {!logo && <span>{siteName}</span>}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx("text-sm font-medium transition-colors", isActive ? "text-accent" : "text-primary-foreground hover:text-accent")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <a href={waLink} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover">
            <Phone className="h-4 w-4" />
              Hubungi Kami
          </a>

          <button type="button" onClick={() => setIsOpen(!isOpen)} className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-primary-foreground hover:bg-muted" aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link key={link.href} href={link.href} className={clsx("rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive ? "bg-muted text-accent" : "text-primary-foreground hover:bg-muted")}>
                    {link.label}
                  </Link>
                );
              })}
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white">
                <Phone className="h-4 w-4" />
                Hubungi Kami
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

