import { prisma } from "@/lib/prisma";
import { StatCards } from "@/components/admin/StatCard";
import { RecentTradeIn, RecentMessages } from "@/components/admin/RecentItems";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [tradeInCount, tradeInBarus, messageCount, messageBarus] =
    await Promise.all([
      prisma.tradeInSubmission.count(),
      prisma.tradeInSubmission.count({ where: { status: "baru" } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "baru" } }),
    ]);

  const [recentTradeIn, recentMessages] = await Promise.all([
    prisma.tradeInSubmission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = [
    {
      label: "Total Pengajuan Trade In",
      value: tradeInCount,
      newCount: tradeInBarus,
      iconName: "Car" as const,
      href: "/admin/trade-in",
    },
    {
      label: "Total Pesan Masuk",
      value: messageCount,
      newCount: messageBarus,
      iconName: "Inbox" as const,
      href: "/admin/messages",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ringkasan data dan aktivitas terbaru
        </p>
      </div>

      <StatCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentTradeIn
          items={recentTradeIn.map((t) => ({
            id: t.id,
            name: t.customerName,
            detail: `${t.oldCarBrand} ${t.oldCarModel} → ${t.targetCar}`,
            status: t.status,
            statusColor: t.status,
          }))}
        />
        <RecentMessages
          items={recentMessages.map((m) => ({
            id: m.id,
            name: m.name,
            detail: m.subject,
            status: m.status,
            statusColor: m.status,
          }))}
        />
      </div>
    </div>
  );
}
