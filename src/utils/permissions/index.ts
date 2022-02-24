export enum Role {
  ADMIN = "ADMIN",
  LECTURER = "LECTURER",
  STUDENT = "STUDENT",
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

export enum RoleSelect {
  ADMIN = "ADMIN",
  LECTURER = "LECTURER",
  STUDENT = "STUDENT",
}

export interface RoleScope {
  scope: Role[] | undefined;
}

const isRoleAuthenticated = (scope: Role[], role: Role | undefined) => {
  return role && scope[0] === Role.AUTHENTICATED;
};

const isUserUnauthenticated = (scope: Role[], role: Role | undefined) => {
  return !role && scope[0] === Role.UNAUTHENTICATED;
};

const isRoleScopeAuthorized = (scope: Role[], role: Role | undefined) => {
  return role && scope.includes(role);
};

export const isScopeAuthorized = (scope: Role[] | undefined, role: Role | undefined): boolean => {
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
