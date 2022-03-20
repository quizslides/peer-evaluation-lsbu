export enum RoleScope {
  ADMIN = "ADMIN",
  LECTURER = "LECTURER",
  STUDENT = "STUDENT",
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

export enum Role {
  ADMIN = "ADMIN",
  LECTURER = "LECTURER",
  STUDENT = "STUDENT",
}

type TRoleScope = RoleScope | RoleScope[] | undefined;

type TRoleScopeDefined = RoleScope | RoleScope[];

export interface IRoleScope {
  scope: TRoleScope;
}

const isRoleAuthenticated = (scope: TRoleScopeDefined, role: RoleScope | undefined) => {
  const isScopeAuthorized = isScopeAuthorizedByRoles(scope, RoleScope.AUTHENTICATED);

  return role && isScopeAuthorized;
};

const isUserUnauthenticated = (scope: TRoleScopeDefined, role: RoleScope | undefined) => {
  const isScopeAuthorized = isScopeAuthorizedByRoles(scope, RoleScope.UNAUTHENTICATED);

  return !role && isScopeAuthorized;
};

const isRoleScopeAuthorized = (scope: TRoleScopeDefined, role: RoleScope | undefined) => {
  if (!role) {
    return false;
  }

  const isScopeAuthorized = isScopeAuthorizedByRoles(scope, role);

  return isScopeAuthorized || (role === RoleScope.ADMIN && !scope.includes(RoleScope.UNAUTHENTICATED));
};

const isScopeAuthorizedByRoles = (scope: TRoleScopeDefined, role: RoleScope) => {
  return typeof scope === "string" ? scope === role : scope.includes(role);
};

export const isScopeAuthorized = (scope: TRoleScope, role: RoleScope | undefined): boolean => {
  if (
    !scope ||
    isRoleAuthenticated(scope, role) ||
    isUserUnauthenticated(scope, role) ||
    isRoleScopeAuthorized(scope, role)
  ) {
    return true;
  }

  return false;
};
