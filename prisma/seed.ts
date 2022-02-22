import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAdministratorUser = async () => {
  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "first@local.com",
      role: "ADMIN",
    },
  });
};

const main = async () => {
  await createAdministratorUser();
};

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
