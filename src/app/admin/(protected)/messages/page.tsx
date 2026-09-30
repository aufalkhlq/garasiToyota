import { prisma } from "@/lib/prisma";
import { Inbox } from "lucide-react";
import { MessagesList } from "@/components/admin/MessagesList";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pesan Masuk</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Total {messages.length} pesan
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-12 text-center">
          <Inbox className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">
            Belum ada pesan masuk
          </p>
        </div>
      ) : (
        <MessagesList messages={messages} />
      )}
    </div>
  );
}
