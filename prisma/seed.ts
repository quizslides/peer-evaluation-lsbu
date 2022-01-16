import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //   Prisma method
}

main()
  .catch((e) => {
    console.error(e.code);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
