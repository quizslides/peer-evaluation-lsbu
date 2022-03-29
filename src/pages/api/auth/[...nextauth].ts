import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { getUserSessionWithAdditionalDetails, isAccountCreated } from "@/pages/api/auth/utils";
import { sendSignInEmail } from "@/pages/api/email/index";
import prisma from "@/pages/api/prisma";
import routing from "@/routing";

const options: NextAuthOptions = {
  pages: {
    signIn: routing.auth.signIn,
    signOut: routing.home,
    error: routing.auth.error,
  },
  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
      maxAge: 24 * 60 * 60,
      sendVerificationRequest: async ({ identifier: email, url }) => await sendSignInEmail(email, url),
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user }) => await isAccountCreated(user.email),
    session: async ({ user, session }) => await getUserSessionWithAdditionalDetails(user, session),
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
