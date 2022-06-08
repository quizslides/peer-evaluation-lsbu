import prisma from "@/pages/api/prisma";

const getUserIdByEmail = async (email: string) => {
  return (
    await prisma.user.findFirst({
      select: {
        id: true,
      },
      where: {
        email: {
          equals: email,
        },
      },
    })
  )?.id;
};

export { getUserIdByEmail };
