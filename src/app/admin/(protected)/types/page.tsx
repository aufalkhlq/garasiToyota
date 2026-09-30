import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllCarTypes } from "@/lib/cms";
import { deleteType, toggleTypeActive } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminTypesPage() {
  const types = await getAllCarTypes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Tipe Mobil</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola tipe mobil (SUV, MPV, Sedan, dll)</p>
        </div>
        <Link href="/admin/types/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Tambah Tipe
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border bg-muted/30">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Nama Tipe</th>
              <th className="px-4 py-3 font-medium text-center">Jumlah Mobil</th>
              <th className="px-4 py-3 font-medium text-center">Urutan</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {types.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  Belum ada tipe. <Link href="/admin/types/new" className="text-accent hover:underline">Tambah sekarang</Link>
                </td>
              </tr>
            )}
            {types.map((t, idx) => (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3 text-center">{t._count?.cars ?? 0}</td>
                <td className="px-4 py-3 text-center text-muted-foreground">{t.sortOrder}</td>
                <td className="px-4 py-3 text-center">
                  <form action={toggleTypeActive} className="inline-block">
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="isActive" value={String(!t.isActive)} />
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
                        t.isActive
                          ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {t.isActive ? "Aktif" : "Nonaktif"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/types/${t.id}`} className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-muted">
                      Edit
                    </Link>
                    <form
                      action={deleteType}
                      className="inline-block"
                    >
                      <input type="hidden" name="id" value={t.id} />
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
    </div>
  );
}

