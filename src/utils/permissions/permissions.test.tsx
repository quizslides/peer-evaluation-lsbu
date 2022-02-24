import { Role, isScopeAuthorized } from "@/utils";

describe("Permissions test by different scopes", () => {
  it("scope undefined return as true", () => {
    const scope = undefined;

    const role = Role.ADMIN;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User is not unauthenticated", () => {
    const scope = [Role.UNAUTHENTICATED];

    const role = undefined;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as admin is authenticated and scope is authenticated", () => {
    const scope = [Role.AUTHENTICATED];

    const role = Role.ADMIN;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as lecturer is authenticated and scope is authenticated", () => {
    const scope = [Role.AUTHENTICATED];

    const role = Role.LECTURER;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as student is authenticated and scope is authenticated", () => {
    const scope = [Role.AUTHENTICATED];

    const role = Role.STUDENT;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as student and scope is not included", () => {
    const scope = [Role.ADMIN];

    const role = Role.STUDENT;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeFalsy();
  });

  it("User as student and scope include student", () => {
    const scope = [Role.STUDENT, Role.LECTURER];

    const role = Role.STUDENT;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });
});
