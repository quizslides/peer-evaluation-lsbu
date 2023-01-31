import { expect } from "@jest/globals";

import { RoleScope, isScopeAuthorized } from "@/utils";

describe("Permissions test by different scopes", () => {
  it("scope undefined return as true", () => {
    const scope = undefined;

    const role = RoleScope.ADMIN;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User is not unauthenticated", () => {
    const scope = RoleScope.UNAUTHENTICATED;

    const role = undefined;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as admin is authenticated and scope is authenticated", () => {
    const scope = RoleScope.AUTHENTICATED;

    const role = RoleScope.ADMIN;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as lecturer is authenticated and scope is authenticated", () => {
    const scope = [RoleScope.AUTHENTICATED];

    const role = RoleScope.LECTURER;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as student is authenticated and scope is authenticated", () => {
    const scope = [RoleScope.AUTHENTICATED];

    const role = RoleScope.STUDENT;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as student and scope is not included", () => {
    const scope = [RoleScope.ADMIN];

    const role = RoleScope.STUDENT;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeFalsy();
  });

  it("User as student and scope include student", () => {
    const scope = [RoleScope.STUDENT, RoleScope.LECTURER];

    const role = RoleScope.STUDENT;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });
});
