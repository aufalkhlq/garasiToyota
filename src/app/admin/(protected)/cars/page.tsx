import Link from "next/link";
import { Plus, Edit, Search } from "lucide-react";
import { getCarsPaged } from "@/lib/cms-cars";
import { deleteCar, toggleCarActive } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCarsPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const q = searchParams.q || "";
  const page = parseInt(searchParams.page || "1", 10) || 1;
  const { cars, total, pages } = await getCarsPaged({ q, page, limit: 10 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-2">Daftar Mobil</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola mobil yang tampil di website</p>
        </div>
        <Link href="/admin/cars/new" className="btn-primary flex-shrink-0">
          <Plus className="h-4 w-4" />
          Tambah Mobil
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <form className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            name="q"
            defaultValue={q}
            placeholder="Cari mobil..." 
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </form>
      </div>

      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border bg-muted/30">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Brand</th>
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Tipe</th>
                <th className="px-4 py-3 font-medium text-right">Harga</th>
                <th className="px-4 py-3 font-medium text-center">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                    Belum ada mobil. <Link href="/admin/cars/new" className="text-accent hover:underline">Tambah sekarang</Link>
                  </td>
                </tr>
              )}
              {cars.map((c, idx) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">{(page - 1) * 10 + idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{c.brand}</td>
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3"><span className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs">{c.type}</span></td>
                  <td className="px-4 py-3 text-right font-semibold text-accent">Rp {c.price} Juta</td>
                  <td className="px-4 py-3 text-center">
                    <form action={toggleCarActive} className="inline-block">
                      <input type="hidden" name="id" value={c.id} />
                      <input type="hidden" name="isActive" value={String(!c.isActive)} />
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
                          c.isActive
                            ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                            : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {c.isActive ? "Aktif" : "Nonaktif"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/cars/${c.id}`} className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-muted">
                        <Edit className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <form action={deleteCar} className="inline-block">
                        <input type="hidden" name="id" value={c.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                        >
                          Hapus
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {pages > 1 && (
          <div className="border-t border-border px-4 py-3 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Menampilkan {(page - 1) * 10 + 1} - {Math.min(page * 10, total)} dari {total} mobil
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: pages }).map((_, i) => (
                <Link
                  key={i}
                  href={`/admin/cars?q=${q}&page=${i + 1}`}
                  className={`px-3 py-1 text-xs rounded-md border ${page === i + 1 ? "bg-accent text-white border-accent" : "bg-white border-border hover:bg-muted"}`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {pages <= 1 && <p className="text-xs text-muted-foreground">Total: {total} mobil</p>}
    </div>
  );
}

