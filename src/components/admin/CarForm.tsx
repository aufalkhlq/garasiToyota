"use client";

import { type CarListItem } from "@/lib/cms";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import RichTextEditor from "./RichTextEditor";
import { Plus, X, ArrowUp, ArrowDown } from "lucide-react";

type CarType = { id: number; name: string };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Menyimpan..." : label}
    </button>
  );
}

type CarFormProps = {
  car?: any;
  types: CarType[];
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

export default function CarForm({ car, types, action, submitLabel }: CarFormProps) {
  const [imageUrl, setImageUrl] = useState(car?.image || "");
  const [galleryUrls, setGalleryUrls] = useState<string[]>(car?.images ? JSON.parse(car.images) : []);
  const [uploading, setUploading] = useState(false);

  const handleUploadMain = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload gagal");
      const data = await res.json();
      setImageUrl(data.url);
    } catch (err) {
      alert("Gagal mengupload gambar utama");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    
    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const data = await res.json();
          newUrls.push(data.url);
        }
      } catch (err) {}
    }
    
    setGalleryUrls(prev => [...prev, ...newUrls]);
    setUploading(false);
  };

  const removeGalleryImage = (idx: number) => {
    setGalleryUrls(prev => prev.filter((_, i) => i !== idx));
  };

  const moveGalleryImage = (idx: number, direction: "up" | "down") => {
    setGalleryUrls(prev => {
      if (direction === "up" && idx === 0) return prev;
      if (direction === "down" && idx === prev.length - 1) return prev;
      const clone = [...prev];
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      const temp = clone[idx];
      clone[idx] = clone[swapIdx];
      clone[swapIdx] = temp;
      return clone;
    });
  };

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      <input type="hidden" name="image" value={imageUrl} />
      <input type="hidden" name="images" value={JSON.stringify(galleryUrls)} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Kolom Kiri: Informasi Dasar */}
        <div className="space-y-4">
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Merek</label>
              <input type="text" name="brand" required defaultValue={car?.brand} className="input-field" placeholder="Cth: Toyota" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Nama Mobil</label>
              <input type="text" name="name" required defaultValue={car?.name} className="input-field" placeholder="Cth: Avanza G 1.5 CVT" />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Tipe / Kategori</label>
              <select name="typeId" required defaultValue={car?.typeId || ""} className="input-field">
                <option value="" disabled>Pilih Tipe</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Harga (Juta Rp)</label>
              <input type="number" name="price" required min="0" defaultValue={car?.price} className="input-field" placeholder="Cth: 250" />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Tahun</label>
              <input type="number" name="year" required defaultValue={car?.year || new Date().getFullYear()} className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Transmisi</label>
              <select name="transmission" defaultValue={car?.transmission || "Manual"} className="input-field">
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="CVT">CVT</option>
                <option value="DCT">DCT</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Bahan Bakar</label>
              <select name="fuel" defaultValue={car?.fuel || "Bensin"} className="input-field">
                <option value="Bensin">Bensin</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Listrik">Listrik</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Fitur Utama (HTML didukung)</label>
            <RichTextEditor name="features" defaultValue={car?.features || ""} placeholder="Tulis deskripsi dan fitur unggulan mobil di sini..." />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Label Promo / Cashback (Opsional)</label>
            <input type="text" name="promo" defaultValue={car?.promo || ""} className="input-field" placeholder="Cth: Cashback 10 Juta!" />
          </div>
        </div>

        {/* Kolom Kanan: Gambar & Status */}
        <div className="space-y-6">
          <div className="space-y-2 rounded-xl border border-border p-4 bg-muted/30">
            <label className="block text-sm font-medium text-primary">Gambar Utama (Thumbnail) *</label>
            {imageUrl && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border">
                <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleUploadMain} disabled={uploading} className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-accent-hover disabled:opacity-50 mt-2" />
          </div>

          <div className="space-y-3 rounded-xl border border-border p-4 bg-muted/30">
            <div>
              <label className="block text-sm font-medium text-primary">Galeri Gambar (Slider Detail Mobil)</label>
              <p className="text-xs text-muted-foreground mt-1">Tambahkan gambar interior, eksterior, dan detail lainnya.</p>
            </div>
            
            {galleryUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {galleryUrls.map((url, idx) => (
                  <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-border group">
                    <Image src={url} alt={"Gallery " + idx} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1">
                      <div className="flex justify-between">
                        <button type="button" onClick={() => moveGalleryImage(idx, "up")} disabled={idx === 0} className="p-1 bg-white/20 hover:bg-white rounded disabled:opacity-30"><ArrowUp className="h-3 w-3 text-black" /></button>
                        <button type="button" onClick={() => moveGalleryImage(idx, "down")} disabled={idx === galleryUrls.length - 1} className="p-1 bg-white/20 hover:bg-white rounded disabled:opacity-30"><ArrowDown className="h-3 w-3 text-black" /></button>
                      </div>
                      <button type="button" onClick={() => removeGalleryImage(idx)} className="self-end p-1 bg-red-500 hover:bg-red-600 rounded"><X className="h-3 w-3 text-white" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <input type="file" id="car-gallery-upload" multiple accept="image/*" onChange={handleUploadGallery} disabled={uploading} className="hidden" />
              <label htmlFor="car-gallery-upload" className="inline-flex w-full justify-center items-center gap-2 px-4 py-2 bg-white hover:bg-muted text-sm font-medium rounded-lg cursor-pointer border border-border transition-colors">
                <Plus className="h-4 w-4" />
                Tambah Gambar Galeri
              </label>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2 rounded-xl border border-border p-4 bg-muted/30">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Urutan (Kecil = Depan)</label>
              <input type="number" name="sortOrder" defaultValue={car?.sortOrder || 0} className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-3">Status Mobil</label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" name="isActive" defaultChecked={car ? car.isActive : true} className="rounded border-border text-accent focus:ring-accent w-4 h-4" />
                Aktif & Ditampilkan
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-border pt-6">
        <Link href="/admin/cars" className="btn-secondary">
          Batal
        </Link>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
