import { Session } from "next-auth";

import { RoleScope } from "@/utils";

interface NextPagePros {
  protected: boolean;
  roles?: RoleScope[];
  session: Session | null;
}

export type { NextPagePros };
