import { Session, User } from "next-auth";

import prisma from "@/pages/api/prisma";
import { Role } from "@/utils/permissions";

const isAccountCreated = async (userEmail: string | null | undefined) => {
  if (typeof userEmail === "string" && userEmail.length > 0) {
    const result = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        email: true,
      },
    });

    return result?.email === userEmail;
  }
  return false;
};

const getUserData = async (userEmail: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  return result;
};

const getUserSessionWithAdditionalDetails = async (user: User, session: Session) => {
  if (user.email) {
    const response = await getUserData(user.email);
    session.user.role = response?.role as Role;
    session.user.id = response?.id as string;
    return session;
  }

  return session;
};

export { getUserData, getUserSessionWithAdditionalDetails, isAccountCreated };
