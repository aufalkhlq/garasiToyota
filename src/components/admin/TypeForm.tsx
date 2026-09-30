import { type CarTypeItem } from "@/lib/cms";

export default function TypeForm({
  type,
  action,
  submitLabel,
}: {
  type?: CarTypeItem;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
}) {
  const isEdit = !!type;
  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Nama Tipe *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={type?.name ?? ""}
          placeholder="SUV"
          className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label htmlFor="sortOrder" className="mb-1.5 block text-sm font-medium">Urutan Tampil</label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={String(type?.sortOrder ?? 0)}
          placeholder="0"
          className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={type?.isActive ?? true}
            className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <span className="text-sm font-medium">Aktif (tampil di website)</span>
        </label>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <button type="submit" className="btn-primary">{submitLabel}</button>
        <a href="/admin/types" className="btn-secondary">Batal</a>
      </div>
    </form>
  );
}

