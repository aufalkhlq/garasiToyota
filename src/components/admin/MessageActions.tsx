"use client";

import { useState, useTransition } from "react";
import { updateMessageStatus, deleteMessage } from "@/app/actions/admin";
import { Loader2, ChevronDown, Trash2 } from "lucide-react";

export function MessageStatusSelect({
  id,
  currentStatus,
}: {
  id: number;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const statuses = [
    { value: "baru", label: "Baru" },
    { value: "dibaca", label: "Dibaca" },
    { value: "dibalas", label: "Dibalas" },
  ];

  const handleChange = (newStatus: string) => {
    setOpen(false);
    if (newStatus === currentStatus) return;
    startTransition(async () => {
      await updateMessageStatus(id, newStatus);
    });
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2.5 py-1.5 text-xs font-medium hover:border-accent disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
        Status
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-40 rounded-md border border-border bg-white shadow-lg z-20">
            {statuses.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => handleChange(s.value)}
                className={`block w-full px-3 py-2 text-left text-xs hover:bg-muted ${
                  currentStatus === s.value ? "font-semibold text-accent" : ""
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function MessageDeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    startTransition(async () => {
      await deleteMessage(id);
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Trash2 className="h-3 w-3" />
      )}
      Hapus
    </button>
  );
}
