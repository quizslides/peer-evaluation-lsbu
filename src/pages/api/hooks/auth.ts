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

export { welcomeUserEmailHook };
