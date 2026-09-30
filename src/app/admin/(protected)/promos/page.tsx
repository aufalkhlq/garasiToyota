import Link from "next/link";
import { Plus, Layout } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deletePromo, togglePromoActive } from "./actions";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminPromosPage() {
  const items = await prisma.promo.findMany({
    orderBy: { sortOrder: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Promo Spesial</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola penawaran terbaik dan promo bulan ini</p>
        </div>
        <Link href="/admin/promos/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Tambah Promo
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border bg-muted/30">
              <th className="px-4 py-3 font-medium">Gambar</th>
              <th className="px-4 py-3 font-medium">Judul & Detail</th>
              <th className="px-4 py-3 font-medium text-center">Urutan</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  Belum ada promo. <Link href="/admin/promos/new" className="text-accent hover:underline">Tambah sekarang</Link>
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  {item.image ? (
                    <div className="relative h-12 w-20 rounded overflow-hidden border border-border bg-muted">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-12 w-20 flex flex-col items-center justify-center rounded border border-border bg-muted text-muted-foreground text-xs">
                      <Layout className="h-4 w-4 mb-1" />
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-primary-foreground">{item.title}</p>
                  {item.badge && <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold bg-accent/10 text-accent rounded">{item.badge}</span>}
                </td>
                <td className="px-4 py-3 text-center">{item.sortOrder}</td>
                <td className="px-4 py-3 text-center">
                  <form action={togglePromoActive}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="isActive" value={item.isActive ? "false" : "true"} />
                    <button type="submit" className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.isActive ? "Aktif" : "Nonaktif"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/promos/${item.id}`} className="text-accent hover:underline">Edit</Link>
                    <span className="text-border">|</span>
                    <form action={deletePromo}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="text-red-600 hover:underline" >Hapus</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
