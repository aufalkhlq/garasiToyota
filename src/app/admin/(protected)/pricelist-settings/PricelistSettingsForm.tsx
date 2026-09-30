"use client";

import { updatePricelistSettings } from "./actions";
import { useState } from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";

type SettingRow = { id: number; key: string; value: string | null; label: string };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Menyimpan..." : "Simpan Pengaturan Pricelist"}
    </button>
  );
}

function ImageInput({ row }: { row: SettingRow }) {
  const [imageUrl, setImageUrl] = useState(row.value || "");
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
    <div className="space-y-3">
      {imageUrl && (
        <div className="relative h-32 w-48 overflow-hidden rounded-lg border border-border bg-muted">
          <Image src={imageUrl} alt="Preview" fill className="object-contain" />
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            id={`s_${row.id}`}
            name={`setting_${row.id}`}
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
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
            className="btn-secondary h-[38px] px-4 whitespace-nowrap disabled:opacity-50 border border-border bg-gray-50 hover:bg-gray-100"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PricelistSettingsForm({ rows }: { rows: SettingRow[] }) {
  if (!rows || rows.length === 0) return <p className="text-muted-foreground">Belum ada data pengaturan.</p>;

  return (
    <form action={updatePricelistSettings} className="space-y-6">
      <section className="rounded-xl border border-border bg-white p-6">
        <div className="space-y-4">
          {rows.map((r) => {
            const isTextarea = r.key.includes("subtitle");
            const isImage = r.key.includes("image");
            return (
              <div key={r.id}>
                <label htmlFor={`s_${r.id}`} className="mb-1.5 block text-sm font-medium">
                  {r.label}
                  <span className="ml-2 text-xs font-mono text-muted-foreground">({r.key})</span>
                </label>
                {isTextarea ? (
                  <textarea
                    id={`s_${r.id}`}
                    name={`setting_${r.id}`}
                    defaultValue={r.value ?? ""}
                    rows={4}
                    className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                ) : isImage ? (
                  <ImageInput row={r} />
                ) : (
                  <input
                    id={`s_${r.id}`}
                    name={`setting_${r.id}`}
                    type="text"
                    defaultValue={r.value ?? ""}
                    className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="rounded-xl border border-border bg-white p-3 flex items-center gap-3 shadow-sm">
        <SubmitButton />
        <a href="/admin" className="btn-secondary">Batal</a>
      </div>
    </form>
  );
}
