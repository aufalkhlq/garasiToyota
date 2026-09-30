import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const settings = [
    { key: "contact.photo", value: "", category: "contact", label: "Foto Profil Penjual" },
    { key: "contact.profile_name", value: "April", category: "contact", label: "Nama Profil Penjual" },
    { key: "contact.profile_role", value: "Marketing Executive Nasmoco Semarang", category: "contact", label: "Jabatan / Role Profil" },
    { key: "contact.profile_size", value: "medium", category: "contact", label: "Ukuran Foto Profil (small, medium, large)" },
    { key: "contact.profile_layout", value: "horizontal", category: "contact", label: "Posisi Profil (horizontal, vertical)" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { category: s.category, label: s.label },
      create: s,
    });
  }
  console.log("Profile settings added!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
