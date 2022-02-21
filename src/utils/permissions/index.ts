export enum ROLE {
  ADMIN = "ADMIN",
  LECTURER = "LECTURER",
  STUDENT = "STUDENT",
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

export interface RoleScope {
  scope: ROLE[] | undefined;
}

const isRoleAuthenticated = (scope: ROLE[], role: ROLE | undefined) => {
  return role && scope[0] === ROLE.AUTHENTICATED;
};

const isUserUnauthenticated = (scope: ROLE[], role: ROLE | undefined) => {
  return !role && scope[0] === ROLE.UNAUTHENTICATED;
};

const isRoleScopeAuthorized = (scope: ROLE[], role: ROLE | undefined) => {
  return role && scope.includes(role);
};

export const isScopeAuthorized = (scope: ROLE[] | undefined, role: ROLE | undefined): boolean => {
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
