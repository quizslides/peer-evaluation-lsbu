import { DefaultSession } from "next-auth";

import { ROLE } from "@/utils/permissions";

declare module "next-auth" {
  interface Session {
    user: {
      role: ROLE;
    } & DefaultSession["user"];
  }
}
