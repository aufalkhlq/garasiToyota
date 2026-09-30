import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SlideForm from "@/components/admin/SlideForm";
import { prisma } from "@/lib/prisma";

export default async function EditSlidePage({ params }: { params: { id: string } }) {
  const slide = await prisma.heroSlide.findUnique({
    where: { id: Number(params.id) }
  });

  if (!slide) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/hero-slides"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="heading-2">Edit Slide</h1>
          <p className="mt-1 text-sm text-muted-foreground">Ubah data slide hero</p>
        </div>
      </div>
      <SlideForm slide={slide} />
    </div>
  );
}