import { Info } from "lucide-react";
import { getAllSettingsGrouped } from "@/lib/cms";
import PricelistSettingsForm from "./PricelistSettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminPricelistSettingsPage() {
  const grouped = await getAllSettingsGrouped();
  const pricelistSettings = grouped["pricelist"] || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Pengaturan Halaman Pricelist</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola hero section dan brosur pada halaman daftar harga.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        <p>Pengaturan ini khusus untuk tampilan publik pada halaman /pricelist.</p>
      </div>

      <PricelistSettingsForm rows={pricelistSettings} />
    </div>
  );
}
