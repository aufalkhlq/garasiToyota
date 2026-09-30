import { PromoForm } from "@/components/admin/PromoForm";

export default function NewPromoPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="heading-2">Tambah Promo Baru</h1>
        <p className="mt-1 text-sm text-muted-foreground">Isi detail promo untuk ditampilkan di halaman depan</p>
      </div>
      <PromoForm />
    </div>
  );
}
