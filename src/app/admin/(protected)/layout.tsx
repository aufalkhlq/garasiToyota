import Link from "next/link";
import { redirect } from "next/navigation";
import { Car, Inbox, LayoutDashboard, LogOut, Tag, Settings, Layers, Image as ImageIcon, MessageSquareQuote, FileText } from "lucide-react";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const menuGroups = [
    {
      label: "Operasional",
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/trade-in", label: "Trade In", icon: Car },
        { href: "/admin/messages", label: "Pesan", icon: Inbox },
      ],
    },
    {
      label: "Manajemen Konten",
      items: [
        { href: "/admin/cars", label: "Daftar Mobil", icon: Tag },
        { href: "/admin/types", label: "Tipe Mobil", icon: Layers },
        { href: "/admin/promos", label: "Promo", icon: Tag },
        { href: "/admin/hero-slides", label: "Hero Slider", icon: ImageIcon },
        { href: "/admin/testimonials", label: "Testimoni", icon: MessageSquareQuote },
        { href: "/admin/pricelist-settings", label: "Hal. Pricelist", icon: FileText },
        { href: "/admin/settings", label: "Pengaturan", icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-160px)] bg-muted">
      <div className="container-max py-8">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="rounded-xl border border-border bg-white p-4 h-fit">
            <div className="mb-4 pb-4 border-b border-border">
              <p className="text-xs text-muted-foreground">Login sebagai</p>
              <p className="font-semibold text-sm truncate">{session.username}</p>
            </div>
            <nav className="space-y-4">
              {menuGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-muted transition-colors"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
              <form action={logoutAction} className="pt-2 border-t border-border">
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </form>
            </nav>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
