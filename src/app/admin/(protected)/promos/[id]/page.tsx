import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PromoForm } from "@/components/admin/PromoForm";

export default async function EditPromoPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const item = await prisma.promo.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="heading-2">Edit Promo</h1>
        <p className="mt-1 text-sm text-muted-foreground">Perbarui detail promo ini</p>
      </div>
      <PromoForm initialData={item} />
    </div>
  );
}
