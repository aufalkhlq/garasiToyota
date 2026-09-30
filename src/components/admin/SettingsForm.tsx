"use client";

import { updateSettings } from "@/app/admin/(protected)/settings/actions";
import { useState } from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";

type SettingRow = { id: number; key: string; value: string | null; label: string };
type Grouped = Record<string, SettingRow[]>;

const CATEGORY_LABELS: Record<string, string> = {
  identity: "Identitas Situs",
  hero: "Hero / Slide Utama",
  contact: "Kontak & Lokasi",
  hours: "Jam Operasional",
  social: "Media Sosial",
  whatsapp: "WhatsApp & CTA",
  pricelist: "Halaman Pricelist",
};

const CATEGORY_ORDER = ["identity", "hero", "pricelist", "contact", "hours", "social", "whatsapp"];

const ROW_FIELD_TYPE: Record<string, "input" | "textarea" | "image" | "select"> = {
  "site.description": "textarea",
  "hero.subtitle": "textarea",
  "contact.address": "textarea",
  "whatsapp.message": "textarea",
  "site.logo": "image",
  "contact.photo": "image",
  "contact.profile_size": "select",
  "contact.profile_layout": "select",
  "pricelist.image": "image",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Menyimpan..." : "Simpan Semua Pengaturan"}
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
        <div className="relative h-24 w-40 overflow-hidden rounded-lg border border-border bg-muted">
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

export default function SettingsForm({ grouped }: { grouped: Grouped }) {
  return (
    <form action={updateSettings} className="space-y-6">
      {CATEGORY_ORDER.map((cat) => {
        const rows = grouped[cat];
        if (!rows || rows.length === 0) return null;
        return (
          <section key={cat} className="rounded-xl border border-border bg-white p-6">
            <h2 className="heading-3 mb-4">{CATEGORY_LABELS[cat] ?? cat}</h2>
            <div className="space-y-4">
              {rows.map((r) => {
                const fieldType = ROW_FIELD_TYPE[r.key] || "input";
                return (
                  <div key={r.id}>
                    <label htmlFor={`s_${r.id}`} className="mb-1.5 block text-sm font-medium">
                      {r.label}
                      <span className="ml-2 text-xs font-mono text-muted-foreground">({r.key})</span>
                    </label>
                    {fieldType === "textarea" ? (
                      <textarea
                        id={`s_${r.id}`}
                        name={`setting_${r.id}`}
                        defaultValue={r.value ?? ""}
                        rows={3}
                        className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                    ) : fieldType === "image" ? (
                      <ImageInput row={r} />
                    ) : fieldType === "select" ? (
                      r.key === "contact.profile_size" ? (
                        <select id={`s_${r.id}`} name={`setting_${r.id}`} defaultValue={r.value ?? "medium"} className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                          <option value="small">Kecil (Small)</option>
                          <option value="medium">Sedang (Medium)</option>
                          <option value="large">Besar (Large)</option>
                        </select>
                      ) : r.key === "contact.profile_layout" ? (
                        <select id={`s_${r.id}`} name={`setting_${r.id}`} defaultValue={r.value ?? "horizontal"} className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                          <option value="horizontal">Horizontal (Ke Samping)</option>
                          <option value="vertical">Vertikal (Ke Bawah)</option>
                        </select>
                      ) : (
                        <input id={`s_${r.id}`} name={`setting_${r.id}`} type="text" defaultValue={r.value ?? ""} className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
                      )
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
        );
      })}

      <div className="rounded-xl border border-border bg-white p-3 flex items-center gap-3 shadow-sm">
        <SubmitButton />
        <a href="/admin" className="btn-secondary">Batal</a>
      </div>
    </form>
  );
}

