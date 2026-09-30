import { Users, MessageSquare, ArrowRight } from "lucide-react";

type RecentItem = {
  id: number;
  name: string;
  detail: string;
  status: string;
  statusColor: string;
};

const colorMap: Record<string, string> = {
  baru: "bg-blue-100 text-blue-700",
  diproses: "bg-yellow-100 text-yellow-700",
  selesai: "bg-green-100 text-green-700",
  dibaca: "bg-gray-100 text-gray-700",
  dibalas: "bg-green-100 text-green-700",
};

export function RecentTradeIn({ items }: { items: RecentItem[] }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Users className="h-4 w-4" />
          Trade In Terbaru
        </h2>
        <a
          href="/admin/trade-in"
          className="text-xs font-medium text-accent hover:text-accent-hover"
        >
          Lihat semua
        </a>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">
          Belum ada pengajuan
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((t) => (
            <li
              key={t.id}
              className="flex items-start justify-between gap-3 text-sm border-b border-border last:border-0 pb-3 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{t.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {t.detail}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-md flex-shrink-0 ${
                  colorMap[t.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {t.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function RecentMessages({ items }: { items: RecentItem[] }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Pesan Terbaru
        </h2>
        <a
          href="/admin/messages"
          className="text-xs font-medium text-accent hover:text-accent-hover"
        >
          Lihat semua
        </a>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">
          Belum ada pesan
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((m) => (
            <li
              key={m.id}
              className="flex items-start justify-between gap-3 text-sm border-b border-border last:border-0 pb-3 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{m.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {m.detail}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-md flex-shrink-0 ${
                  colorMap[m.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {m.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
