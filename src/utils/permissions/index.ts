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

export interface IRoleScope {
  scope: RoleScope[] | undefined;
}

const isRoleAuthenticated = (scope: RoleScope[], role: RoleScope | undefined) => {
  return role && scope[0] === RoleScope.AUTHENTICATED;
};

const isUserUnauthenticated = (scope: RoleScope[], role: RoleScope | undefined) => {
  return !role && scope[0] === RoleScope.UNAUTHENTICATED;
};

const isRoleScopeAuthorized = (scope: RoleScope[], role: RoleScope | undefined) => {
  return role && scope.includes(role);
};

export const isScopeAuthorized = (scope: RoleScope[] | undefined, role: RoleScope | undefined): boolean => {
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
