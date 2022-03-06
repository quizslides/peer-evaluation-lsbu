import { PrismaClient } from "@prisma/client";

import { errorLogger } from "@/utils";

const prisma = new PrismaClient();

const createAdministratorUser = async () => {
  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "local@gmail.com",
      role: "ADMIN",
    },
  });
};

const main = async () => {
  await createAdministratorUser();
};

main()
  .catch((error) => {
    const errorSeed = error;
    errorLogger(errorSeed.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
