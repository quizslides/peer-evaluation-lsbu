import crypto from "crypto";

import { NextApiHandler } from "next";

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";

import { getUserSessionWithAdditionalDetails, isAccountCreated } from "@/pages/api/auth/utils";
import { sendSignInEmail } from "@/pages/api/email/index";
import prisma from "@/pages/api/prisma";
import routing from "@/routing";

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    session: async ({ user, session }) => await getUserSessionWithAdditionalDetails(user, session),
    signIn: async ({ user }) => await isAccountCreated(user.email),
  },
  pages: {
    error: routing.auth.error,
    signIn: routing.auth.signIn,
    signOut: routing.home,
  },
  providers: [
    EmailProvider({
      from: process.env.SMTP_FROM,
      generateVerificationToken: async () => Promise.resolve(crypto.randomInt(0, 1000000).toString().padStart(6, "0")),
      maxAge: 24 * 60 * 60,
      sendVerificationRequest: async ({ identifier: email, token, url }) => {
        let redirectUrl = null;

        if (url.includes("redirectUrl")) {
          redirectUrl = `redirectUrl${decodeURIComponent(url.split("redirectUrl")[1].split("&")[0])}`;
        }

        await sendSignInEmail(email, token, redirectUrl);
      },
      server: {
        auth: {
          pass: process.env.SMTP_PASSWORD,
          user: process.env.SMTP_USER,
        },
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
