import { Car, Inbox, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Car,
  Inbox,
};

type Stat = {
  label: string;
  value: number;
  newCount: number;
  iconName: keyof typeof iconMap;
  href: string;
};

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((s) => {
        const Icon = iconMap[s.iconName];
        return (
          <a
            key={s.label}
            href={s.href}
            className="block rounded-xl border border-border bg-white p-5 transition-colors hover:border-accent"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="mt-2 text-3xl font-bold">{s.value}</p>
                {s.newCount > 0 && (
                  <p className="mt-1 text-xs font-medium text-accent">
                    {s.newCount} baru
                  </p>
                )}
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
