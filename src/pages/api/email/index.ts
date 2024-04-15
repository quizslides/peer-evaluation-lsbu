import { User } from "@prisma/client";

import { content } from "@/pages/api/email/content";
import { createEmailTransport, getEmailTemplate } from "@/pages/api/email/utils";
import { prisma } from "@/pages/api/prisma";
import routing from "@/routing";
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

const sendSignInEmail = async (email: string, code: string, redirectUrl: string | null) => {
  try {
    const emailTransporter = createEmailTransport();

    let signInUrl = `${process.env.NEXTAUTH_URL}${routing.auth.signIn}?email=${email}`;

    if (redirectUrl) {
      signInUrl = `${signInUrl}&${redirectUrl}`;
    }

    await emailTransporter.sendMail({
      to: email,
      from: content.global.from,
      subject: content.emailTemplates.sendSignInEmail.subject,
      html: await getEmailTemplate("sign-in", {
        baseUrl: process.env.NEXTAUTH_URL,
        code,
        email,
        expireTime: content.emailTemplates.sendSignInEmail.variables.expireTime,
        expireTimeUnit: content.emailTemplates.sendSignInEmail.variables.expireTimeUnit,
        preHeader: content.emailTemplates.sendSignInEmail.variables.preHeader,
        signInUrl,
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
