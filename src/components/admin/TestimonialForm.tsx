"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { saveTestimonial } from "@/app/admin/(protected)/testimonials/actions";
import type { TestimonialItem } from "@/lib/cms";
import { useState } from "react";
import Image from "next/image";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Menyimpan..." : "Simpan"}
    </button>
  );
}

export default function TestimonialForm({ item }: { item?: TestimonialItem }) {
  const [imageUrl, setImageUrl] = useState(item?.image || "");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload gagal");

      const data = await response.json();
      setImageUrl(data.url);
    } catch (err) {
      alert("Gagal mengupload gambar");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form action={saveTestimonial} className="space-y-6 max-w-2xl">
      {item && <input type="hidden" name="id" value={item.id} />}
      
      <div className="rounded-xl border border-border bg-white p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Gambar Testimoni (Wajib)</label>
          <div className="space-y-3">
            {imageUrl && (
              <div className="relative h-40 w-full overflow-hidden rounded-lg border border-border">
                <Image src={imageUrl} alt="Preview" fill className="object-contain bg-muted" />
              </div>
            )}
            
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="https://... atau upload file"
                />
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  disabled={uploading}
                  className="btn-secondary h-[38px] px-4 whitespace-nowrap disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload File"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Urutan</label>
          <input
            type="number"
            name="sortOrder"
            defaultValue={item?.sortOrder ?? 0}
            required
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="isActive"
              value="true"
              defaultChecked={item ? item.isActive : true}
              className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
            />
            Aktifkan Testimoni
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <SubmitButton />
        <Link
          href="/admin/testimonials"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
