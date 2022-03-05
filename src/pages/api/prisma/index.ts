import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

export { Prisma };

export default prisma;
