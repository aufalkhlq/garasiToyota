import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.siteSetting.upsert({
    where: { key: "pricelist.image" },
    update: {},
    create: {
      key: "pricelist.image",
      value: "",
      category: "pricelist",
      label: "Brosur / Gambar Pricelist",
    },
  });
  console.log("Added pricelist.image setting");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
