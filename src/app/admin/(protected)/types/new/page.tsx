import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createType } from "../actions";
import TypeForm from "@/components/admin/TypeForm";

export const dynamic = "force-dynamic";

export default function NewTypePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/types" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent">
          <ChevronLeft className="h-4 w-4" /> Kembali
        </Link>
        <h1 className="heading-2 mt-2">Tambah Tipe Mobil</h1>
        <p className="mt-1 text-sm text-muted-foreground">Misalnya: SUV, MPV, Sedan, Hatchback, dll</p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 max-w-xl">
        <TypeForm action={createType} submitLabel="Simpan Tipe" />
      </div>
    </div>
  );
}

