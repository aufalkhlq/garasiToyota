import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateType } from "../actions";
import TypeForm from "@/components/admin/TypeForm";

export const dynamic = "force-dynamic";

export default async function EditTypePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) notFound();

  const type = await prisma.carType.findUnique({ where: { id } });
  if (!type) notFound();

  const action = updateType.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/types" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent">
          <ChevronLeft className="h-4 w-4" /> Kembali
        </Link>
        <h1 className="heading-2 mt-2">Edit Tipe Mobil</h1>
        <p className="mt-1 text-sm text-muted-foreground">{type.name}</p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 max-w-xl">
        <TypeForm
          type={{ id: type.id, name: type.name, sortOrder: type.sortOrder, isActive: type.isActive }}
          action={action}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}

