"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, ChevronDown } from "lucide-react";
import {
  MessageStatusSelect,
  MessageDeleteButton,
} from "@/components/admin/MessageActions";

type Message = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  createdAt: Date;
  status: string;
};

const statusColors: Record<string, string> = {
  baru: "bg-blue-100 text-blue-700",
  dibaca: "bg-gray-100 text-gray-700",
  dibalas: "bg-green-100 text-green-700",
};

export function MessagesList({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <MessageItem key={m.id} m={m} />
      ))}
    </div>
  );
}

function MessageItem({ m }: { m: Message }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-xl border border-border bg-white p-4 md:p-5">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <MessageSquare className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold truncate">{m.subject}</h3>
              <div className="mt-0.5 text-sm text-muted-foreground">
                Dari: <span className="font-medium text-primary-foreground">{m.name}</span>
              </div>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-md flex-shrink-0 ${
                statusColors[m.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {m.status}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <a
              href={`mailto:${m.email}`}
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              <Mail className="h-3.5 w-3.5" />
              {m.email}
            </a>
            {m.phone && (
              <a
                href={`https://wa.me/${m.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent"
              >
                <Phone className="h-3.5 w-3.5" />
                {m.phone}
              </a>
            )}
            <span className="text-muted-foreground">
              {m.createdAt.toLocaleString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover"
          >
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
            {expanded ? "Sembunyikan" : "Lihat"} Pesan
          </button>

          {expanded && (
            <div className="mt-3 rounded-lg border border-border bg-muted p-3 text-sm whitespace-pre-wrap">
              {m.message}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-border">
            <MessageStatusSelect id={m.id} currentStatus={m.status} />
            <MessageDeleteButton id={m.id} />
            <a
              href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1.5 text-xs font-medium text-white hover:bg-accent-hover"
            >
              Balas via Email
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
