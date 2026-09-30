import { Phone, Car } from "lucide-react";
import { StatusSelect, DeleteButton } from "@/components/admin/TradeInActions";

type Submission = {
  id: number;
  customerName: string;
  customerPhone: string;
  oldCarBrand: string;
  oldCarModel: string;
  oldCarYear: number;
  oldCarKm: number;
  oldCarCondition: string;
  targetCar: string;
  createdAt: Date;
  status: string;
};

const statusColors: Record<string, string> = {
  baru: "bg-blue-100 text-blue-700",
  diproses: "bg-yellow-100 text-yellow-700",
  selesai: "bg-green-100 text-green-700",
};

export function TradeInMobileCards({ submissions }: { submissions: Submission[] }) {
  return (
    <div className="md:hidden space-y-3">
      {submissions.map((s) => (
        <article
          key={s.id}
          className="rounded-xl border border-border bg-white p-4 space-y-3"
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{s.customerName}</p>
              <p className="text-xs text-muted-foreground">
                {s.createdAt.toLocaleString("id-ID")}
              </p>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-md ${
                statusColors[s.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {s.status}
            </span>
          </div>

          <div className="space-y-1.5 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              <a
                href={`https://wa.me/${s.customerPhone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                {s.customerPhone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Car className="h-3.5 w-3.5 mt-0.5 text-muted-foreground" />
              <div>
                <div>
                  {s.oldCarBrand} {s.oldCarModel} ({s.oldCarYear})
                </div>
                <div className="text-xs text-muted-foreground">
                  {s.oldCarKm.toLocaleString("id-ID")} km • {s.oldCarCondition}
                </div>
              </div>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Incaran: </span>
              {s.targetCar}
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-border">
            <StatusSelect id={s.id} currentStatus={s.status} />
            <DeleteButton id={s.id} />
          </div>
        </article>
      ))}
    </div>
  );
}
