import { User } from "@prisma/client";

import content from "@/pages/api/email/content";
import { emailTransporter, getEmailTemplate } from "@/pages/api/email/utils";
import prisma from "@/pages/api/prisma";
import { errorLogger } from "@/utils/logger";

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

const sendSignInEmail = async (email: string, signInUrl: string) => {
  try {
    await emailTransporter.sendMail({
      to: email,
      from: content.global.from,
      subject: content.emailTemplates.sendSignInEmail.subject,
      html: await getEmailTemplate("sign-in", {
        preHeader: content.emailTemplates.sendSignInEmail.variables.preHeader,
        expireTime: content.emailTemplates.sendSignInEmail.variables.expireTime,
        expireTimeUnit: content.emailTemplates.sendSignInEmail.variables.expireTimeUnit,
        baseUrl: process.env.NEXTAUTH_URL,
        signInUrl,
        email,
      }),
    });
  } catch (error) {
    errorLogger(`Unable to send sign in email to ${email}`);
  }
};

const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    await emailTransporter.sendMail({
      from: content.global.from,
      to: email,
      subject: content.emailTemplates.sendWelcomeEmail.subject,
      html: await getEmailTemplate("account-created", {
        name,
        preHeader: content.emailTemplates.sendWelcomeEmail.variables.preHeader,
        baseUrl: process.env.NEXTAUTH_URL,
      }),
    });
  } catch (error) {
    errorLogger(`Unable to send welcome email to ${email}`);
  }
};

const sendWelcomeEmailBulk = async (users: [User]) => {
  for (let user of users) {
    let email = user.email;
    let name = user.name;

    let isUserCreated = await isAccountCreated(email);

    if (!isUserCreated) {
      await sendWelcomeEmail(email, name);
    }
  }
};

export { sendSignInEmail, sendWelcomeEmail, sendWelcomeEmailBulk };
