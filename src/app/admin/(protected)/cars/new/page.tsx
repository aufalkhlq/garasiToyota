import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getAllCarTypes } from "@/lib/cms";
import { createCar } from "../actions";
import CarForm from "@/components/admin/CarForm";

export const dynamic = "force-dynamic";

export default async function NewCarPage() {
  const types = await getAllCarTypes();
  const activeTypes = types.filter((t) => t.isActive);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/cars" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent">
          <ChevronLeft className="h-4 w-4" /> Kembali
        </Link>
        <h1 className="heading-2 mt-2">Tambah Mobil Baru</h1>
        <p className="mt-1 text-sm text-muted-foreground">Isi formulir di bawah untuk menambah mobil baru</p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6">
        {activeTypes.length === 0 ? (
          <p className="text-sm text-red-600">Belum ada tipe mobil aktif. <Link href="/admin/types/new" className="underline">Tambah tipe dulu</Link>.</p>
        ) : (
          <CarForm types={activeTypes} action={createCar} submitLabel="Simpan Mobil" />
        )}
      </div>
    </div>
  );
}

