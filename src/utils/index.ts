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
import { IRoleScope, Role, RoleScope, isScopeAuthorized } from "@/utils/permissions";
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
  Role,
  RoleScope,
  roleValidator,
  successNotification,
};

export type { IRoleScope };
