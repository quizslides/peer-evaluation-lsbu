import { User } from "@prisma/client";

import { sendWelcomeEmail, sendWelcomeEmailBulk } from "@/pages/api/email/index";
import { Prisma } from "@/pages/api/prisma";

const welcomeUserEmailHook = async (params: Prisma.MiddlewareParams) => {
  switch (params.action) {
    case "create":
      await sendWelcomeEmail(params.args.data.email, params.args.data.name, params.args.data.role);
      break;
    case "createMany":
      await sendWelcomeEmailBulk(params.args.data);
      break;
  }
};

const sanitizeUserEmail = (params: Prisma.MiddlewareParams) => {
  switch (params.action) {
    case "create":
      params.args.data.email = params.args.data.email.toLowerCase();
      break;
    case "update":
      if ("email" in params.args.data) {
        params.args.data.email.set = params.args.data.email.set.toLowerCase();
      }
      break;
    case "createMany":
      params.args.data = params.args.data.map((user: User) => ({
        ...user,
        email: user.email.toLowerCase(),
      }));
      break;
  }

  return params;
};

export { sanitizeUserEmail, welcomeUserEmailHook };
