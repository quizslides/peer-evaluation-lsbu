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
import { emailValidator, nameValidator, roleValidator } from "@/utils/validator";

export {
  blankNotification,
  dismissNotification,
  emailValidator,
  errorLogger,
  errorNotification,
  fetcher,
  infoLogger,
  isScopeAuthorized,
  loadingNotification,
  nameValidator,
  promiseNotification,
  ROLE,
  roleValidator,
  successNotification,
};

export type { RoleScope };
