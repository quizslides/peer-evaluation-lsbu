import { readFileSync } from "fs";
import path from "path";

import { Liquid } from "liquidjs";
import nodemailer from "nodemailer";

const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: process.env.SMTP_SECURE === "true",
});

type emailVariables = {
  [key: string]: string | number;
};

const getEmailTemplate = async (templateName: string, variables?: emailVariables) => {
  const emailsDirectory = path.resolve(process.cwd(), "src/pages/api/email/templates");

  const liquidEngine = new Liquid({
    root: [emailsDirectory],
    extname: ".liquid",
  });

  const emailFile = readFileSync(path.join(emailsDirectory, `${templateName}.liquid`), {
    encoding: "utf8",
  });

  return await liquidEngine.parseAndRender(emailFile, variables);
};

export { emailTransporter, getEmailTemplate };
