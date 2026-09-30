import { Info } from "lucide-react";
import { getAllSettingsGrouped } from "@/lib/cms";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const grouped = await getAllSettingsGrouped();
  const totalSettings = Object.values(grouped).reduce((acc, rows) => acc + rows.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Pengaturan Situs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Konfigurasi identitas, hero, kontak, jam buka, dan media sosial. Total {totalSettings} pengaturan.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        <p>Perubahan langsung berlaku di seluruh website. Logo (saat ini via URL) akan tampil di navbar & footer. Untuk upload logo, gunakan URL gambar hosting lain dulu.</p>
      </div>

      <SettingsForm grouped={grouped} />
    </div>
  );
}

