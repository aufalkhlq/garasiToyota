import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getAllCarTypes, getCarById } from "@/lib/cms";
import { updateCar } from "../actions";
import CarForm from "@/components/admin/CarForm";

export const dynamic = "force-dynamic";

export default async function EditCarPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) notFound();

  const [car, types] = await Promise.all([getCarById(id), getAllCarTypes()]);
  if (!car) notFound();

  const action = updateCar.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/cars" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent">
          <ChevronLeft className="h-4 w-4" /> Kembali
        </Link>
        <h1 className="heading-2 mt-2">Edit Mobil</h1>
        <p className="mt-1 text-sm text-muted-foreground">{car.brand} {car.name}</p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6">
        <CarForm car={car} types={types} action={action} submitLabel="Simpan Perubahan" />
      </div>
    </div>
  );
}

