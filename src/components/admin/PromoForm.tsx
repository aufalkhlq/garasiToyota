"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Plus, X, ArrowUp, ArrowDown } from "lucide-react";
import { savePromo } from "@/app/admin/(protected)/promos/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Menyimpan..." : "Simpan"}
    </button>
  );
}

type PromoImage = { url: string; colSpan: number };

export function PromoForm({ initialData }: { initialData?: any }) {
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [images, setImages] = useState<PromoImage[]>(initialData?.images ? JSON.parse(initialData.images) : []);
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
    
    const newImages: PromoImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const data = await res.json();
          newImages.push({ url: data.url, colSpan: 1 });
        }
      } catch (err) {
        console.error("Gagal upload", err);
      }
    }
    
    setImages(prev => [...prev, ...newImages]);
    setUploading(false);
  };

  const removeGalleryImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const updateColSpan = (idx: number, span: number) => {
    setImages(prev => {
      const clone = [...prev];
      clone[idx] = { ...clone[idx], colSpan: span };
      return clone;
    });
  };

  const moveImage = (idx: number, direction: "up" | "down") => {
    setImages(prev => {
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
    <form action={savePromo} className="space-y-6">
      {initialData && <input type="hidden" name="id" value={initialData.id} />}
      <input type="hidden" name="image" value={imageUrl} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Judul Promo *</label>
          <input type="text" name="title" required defaultValue={initialData?.title} className="input-field" placeholder="Cth: Promo Akhir Tahun 2024" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Badge/Label Singkat</label>
          <input type="text" name="badge" defaultValue={initialData?.badge} className="input-field" placeholder="Cth: Hemat 25 Juta" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Deskripsi Lengkap *</label>
        <textarea name="description" required defaultValue={initialData?.description} rows={3} className="input-field" placeholder="Jelaskan detail promo..." />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Label Tombol (CTA)</label>
          <input type="text" name="ctaText" defaultValue={initialData?.ctaText} className="input-field" placeholder="Cth: Lihat Promo" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Link Tombol</label>
          <input type="text" name="ctaLink" defaultValue={initialData?.ctaLink} className="input-field" placeholder="Cth: /pricelist atau /trade-in" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Layout Utama Tampilan</label>
          <select name="layout" defaultValue={initialData?.layout || "image-top"} className="input-field">
            <option value="image-top">Gambar Utama di Atas</option>
            <option value="image-left">Gambar Utama di Kiri (Untuk 1 baris penuh)</option>
            <option value="no-image">Tanpa Gambar Utama</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Urutan Tampil (Makin kecil makin depan)</label>
          <input type="number" name="sortOrder" defaultValue={initialData?.sortOrder || 0} className="input-field" />
        </div>
      </div>

      <div className="space-y-4 border-t border-border pt-4">
        <label className="block text-sm font-medium">Gambar Utama (Thumbnail / Kiri)</label>
        {imageUrl && (
          <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-border">
            <Image src={imageUrl} alt="Preview" fill className="object-cover" />
          </div>
        )}
        <div className="flex items-center gap-4">
          <input type="file" accept="image/*" onChange={handleUploadMain} disabled={uploading} className="block w-full max-w-sm text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-accent-hover disabled:opacity-50" />
          {uploading && <span className="text-sm text-accent">Mengupload...</span>}
        </div>
      </div>

      <div className="space-y-4 border-t border-border pt-4">
        <div>
          <label className="block text-sm font-medium">Galeri Tambahan (Di bawah teks deskripsi)</label>
          <p className="text-xs text-muted-foreground mt-1">Anda bisa mengatur lebar masing-masing gambar dalam rentang 1 s/d 4 kolom.</p>
        </div>
        
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} style={{ gridColumn: `span ${img.colSpan} / span ${img.colSpan}` }} className="relative rounded-xl border border-border overflow-hidden group bg-muted aspect-video">
                <Image src={img.url} alt={`Gallery ${idx}`} fill className="object-cover" />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col p-2">
                  <div className="flex justify-between items-center mb-auto">
                    <div className="flex gap-1">
                      <button type="button" onClick={() => moveImage(idx, "up")} disabled={idx === 0} className="p-1.5 bg-white/20 hover:bg-white text-white hover:text-black rounded transition disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                      <button type="button" onClick={() => moveImage(idx, "down")} disabled={idx === images.length - 1} className="p-1.5 bg-white/20 hover:bg-white text-white hover:text-black rounded transition disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                    </div>
                    <button type="button" onClick={() => removeGalleryImage(idx)} className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition"><X className="h-3 w-3" /></button>
                  </div>
                  
                  <div className="mt-auto bg-black/80 rounded p-2 flex items-center justify-between gap-2">
                    <span className="text-white text-[10px] whitespace-nowrap">Lebar:</span>
                    <select 
                      value={img.colSpan} 
                      onChange={(e) => updateColSpan(idx, parseInt(e.target.value))} 
                      className="bg-transparent text-white text-[10px] w-full border border-white/30 rounded px-1 py-0.5 outline-none"
                    >
                      <option value={1} className="text-black">1 Kolom</option>
                      <option value={2} className="text-black">2 Kolom</option>
                      <option value={3} className="text-black">3 Kolom</option>
                      <option value={4} className="text-black">Penuh (4 Kolom)</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div>
          <input type="file" id="gallery-upload" multiple accept="image/*" onChange={handleUploadGallery} disabled={uploading} className="hidden" />
          <label htmlFor="gallery-upload" className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-primary-foreground text-sm font-semibold rounded-lg cursor-pointer border border-border transition-colors">
            <Plus className="h-4 w-4" />
            Tambah Gambar Galeri
          </label>
        </div>
      </div>

      <div className="space-y-2 border-t border-border pt-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="isActive" value="true" defaultChecked={initialData ? initialData.isActive : true} className="rounded border-border text-accent focus:ring-accent" />
          Promo Aktif
        </label>
      </div>

      <div className="flex gap-4 border-t border-border pt-6">
        <SubmitButton />
        <Link href="/admin/promos" className="btn-secondary">Batal</Link>
      </div>
    </form>
  );
}
