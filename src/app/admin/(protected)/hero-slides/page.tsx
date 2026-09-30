import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllHeroSlides } from "@/lib/cms";
import { deleteSlide, toggleSlideActive } from "./actions";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminHeroSlidesPage() {
  const slides = await getAllHeroSlides();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Hero Slider</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola gambar dan teks slider halaman utama</p>
        </div>
        <Link href="/admin/hero-slides/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Tambah Slide
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border bg-muted/30">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Gambar</th>
              <th className="px-4 py-3 font-medium">Judul</th>
              <th className="px-4 py-3 font-medium text-center">Posisi Teks</th>
              <th className="px-4 py-3 font-medium text-center">Urutan</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {slides.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  Belum ada slide. <Link href="/admin/hero-slides/new" className="text-accent hover:underline">Tambah sekarang</Link>
                </td>
              </tr>
            )}
            {slides.map((s, idx) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                <td className="px-4 py-3">
                  <div className="relative h-12 w-20 rounded overflow-hidden border border-border">
                    <Image src={s.image} alt={s.title || "Slide"} fill className="object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{s.title || "-"}</td>
                <td className="px-4 py-3 text-center capitalize">{s.textPosition}</td>
                <td className="px-4 py-3 text-center text-muted-foreground">{s.sortOrder}</td>
                <td className="px-4 py-3 text-center">
                  <form action={toggleSlideActive} className="inline-block">
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="isActive" value={String(!s.isActive)} />
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
                        s.isActive
                          ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {s.isActive ? "Aktif" : "Nonaktif"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/hero-slides/${s.id}`} className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-muted">
                      Edit
                    </Link>
                    <form
                      action={deleteSlide}
                      className="inline-block"
                    >
                      <input type="hidden" name="id" value={s.id} />
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