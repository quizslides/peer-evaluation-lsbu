import { Session, User } from "next-auth";

import prisma from "@/pages/api/prisma";
import { ROLE } from "@/utils/permissions";

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

const getUserSessionWithRole = async (user: User, session: Session) => {
  if (user.email) {
    const response = await getUserData(user.email);
    session.user.role = response?.role as ROLE;
    return session;
  }

  return session;
};

const getUserData = async (userEmail: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  return result;
};

export { getUserData, getUserSessionWithRole, isAccountCreated };
