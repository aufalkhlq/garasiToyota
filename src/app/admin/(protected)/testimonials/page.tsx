import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllTestimonials } from "@/lib/cms";
import { deleteTestimonial, toggleTestimonialActive } from "./actions";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const items = await getAllTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Testimoni (Slider)</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola gambar/screenshot testimoni pelanggan</p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Tambah Gambar
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border bg-muted/30">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Gambar</th>
              <th className="px-4 py-3 font-medium text-center">Urutan</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  Belum ada testimoni. <Link href="/admin/testimonials/new" className="text-accent hover:underline">Tambah sekarang</Link>
                </td>
              </tr>
            )}
            {items.map((item, idx) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                <td className="px-4 py-3">
                  <div className="relative h-12 w-20 rounded overflow-hidden border border-border bg-muted">
                    <Image src={item.image} alt="Testimonial" fill className="object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-muted-foreground">{item.sortOrder}</td>
                <td className="px-4 py-3 text-center">
                  <form action={toggleTestimonialActive} className="inline-block">
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="isActive" value={String(!item.isActive)} />
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
                        item.isActive
                          ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.isActive ? "Aktif" : "Nonaktif"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/testimonials/${item.id}`} className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-muted">
                      Edit
                    </Link>
                    <form
                      action={deleteTestimonial}
                      className="inline-block"
                    >
                      <input type="hidden" name="id" value={item.id} />
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