import { prisma } from "@/lib/prisma";
import { Car } from "lucide-react";
import { TradeInTable } from "@/components/admin/TradeInTable";
import { TradeInMobileCards } from "@/components/admin/TradeInMobileCards";

export const dynamic = "force-dynamic";

export default async function TradeInListPage() {
  const submissions = await prisma.tradeInSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const mapped = submissions.map((s) => ({
    id: s.id,
    customerName: s.customerName,
    customerPhone: s.customerPhone,
    customerEmail: s.customerEmail,
    oldCarBrand: s.oldCarBrand,
    oldCarModel: s.oldCarModel,
    oldCarYear: s.oldCarYear,
    oldCarKm: s.oldCarKm,
    oldCarCondition: s.oldCarCondition,
    targetCar: s.targetCar,
    createdAt: s.createdAt,
    status: s.status,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengajuan Trade In</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Total {submissions.length} pengajuan
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-12 text-center">
          <Car className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">
            Belum ada pengajuan trade in
          </p>
        </div>
      ) : (
        <>
          <TradeInTable submissions={mapped} />
          <TradeInMobileCards submissions={mapped} />
        </>
      )}
    </div>
  );
}
