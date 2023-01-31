import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAdministratorUsers = async () => {
  await prisma.user.createMany({
    data: [
      {
        name: "Administrator",
        email: "local@lsbupeerevaluation.software",
        role: "ADMIN",
      },
      {
        name: "Test",
        email: "test@lsbupeerevaluation.software",
        role: "ADMIN",
      },
    ],
    skipDuplicates: true,
  });
};

const main = async () => {
  await createAdministratorUsers();
};

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
