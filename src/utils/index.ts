import { fetcher } from "@/utils/fetcher";
import { errorLogger, infoLogger } from "@/utils/logger";
import {
  blankNotification,
  dismissNotification,
  errorNotification,
  loadingNotification,
  promiseNotification,
  successNotification,
} from "@/utils/notifications";
import { ROLE, RoleScope, isScopeAuthorized } from "@/utils/permissions";

export {
  blankNotification,
  dismissNotification,
  errorLogger,
  errorNotification,
  fetcher,
  infoLogger,
  isScopeAuthorized,
  loadingNotification,
  promiseNotification,
  ROLE,
  successNotification,
};

export type { RoleScope };
