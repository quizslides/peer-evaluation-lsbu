import { DefaultSession } from "next-auth";

import { Role } from "@/utils/permissions";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}
