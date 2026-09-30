import { Phone, Mail } from "lucide-react";
import { StatusSelect, DeleteButton } from "@/components/admin/TradeInActions";

type Submission = {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
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

export function TradeInTable({ submissions }: { submissions: Submission[] }) {
  return (
    <div className="hidden md:block rounded-xl border border-border bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Pelanggan</th>
              <th className="px-4 py-3 font-medium">Mobil Lama</th>
              <th className="px-4 py-3 font-medium">Incaran</th>
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr
                key={s.id}
                className="border-b border-border last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">{s.customerName}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Phone className="h-3 w-3" />
                    <a
                      href={`https://wa.me/${s.customerPhone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent"
                    >
                      {s.customerPhone}
                    </a>
                  </div>
                  {s.customerEmail && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Mail className="h-3 w-3" />
                      {s.customerEmail}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">
                    {s.oldCarBrand} {s.oldCarModel}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {s.oldCarYear} • {s.oldCarKm.toLocaleString("id-ID")} km
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Kondisi: {s.oldCarCondition}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs">{s.targetCar}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                  {s.createdAt.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  <br />
                  {s.createdAt.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-md ${
                      statusColors[s.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <StatusSelect id={s.id} currentStatus={s.status} />
                    <DeleteButton id={s.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
