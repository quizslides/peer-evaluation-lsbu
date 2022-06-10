import { User } from "@prisma/client";

import content from "@/pages/api/email/content";
import { createEmailTransport, getEmailTemplate } from "@/pages/api/email/utils";
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
    const emailTransporter = createEmailTransport();

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

    emailTransporter.close();
  } catch (error: unknown) {
    const errorObject = error as Error;
    errorLogger(`Unable to send sign in email to ${email}. Error: ${errorObject.message}`);
  }
};

const sendWelcomeEmail = async (email: string, name: string, role: User["role"]) => {
  const isUserCreated = await isAccountCreated(email);

  if (!isUserCreated && role !== "STUDENT") {
    try {
      const emailTransporter = createEmailTransport();

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

      emailTransporter.close();
    } catch (error: unknown) {
      const errorObject = error as Error;
      errorLogger(`Unable to send welcome email to ${email}. Error: ${errorObject.message}`);
    }
  }
};

const sendWelcomeEmailBulk = async (users: [User]) => {
  for (const user of users) {
    const email = user.email;

    const name = user.name;

    const role = user.role;

    const isUserCreated = await isAccountCreated(email);

    if (!isUserCreated) {
      await sendWelcomeEmail(email, name, role);
    }
  }
};

export { sendSignInEmail, sendWelcomeEmail, sendWelcomeEmailBulk };
