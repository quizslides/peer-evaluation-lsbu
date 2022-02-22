import { ROLE, isScopeAuthorized } from "@/utils";

describe("Permissions test by different scopes", () => {
  it("scope undefined return as true", () => {
    const scope = undefined;

    const role = ROLE.ADMIN;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User is not unauthenticated", () => {
    const scope = [ROLE.UNAUTHENTICATED];

    const role = undefined;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as admin is authenticated and scope is authenticated", () => {
    const scope = [ROLE.AUTHENTICATED];

    const role = ROLE.ADMIN;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as lecturer is authenticated and scope is authenticated", () => {
    const scope = [ROLE.AUTHENTICATED];

    const role = ROLE.LECTURER;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as student is authenticated and scope is authenticated", () => {
    const scope = [ROLE.AUTHENTICATED];

    const role = ROLE.STUDENT;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });

  it("User as student and scope is not included", () => {
    const scope = [ROLE.ADMIN];

    const role = ROLE.STUDENT;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeFalsy();
  });

  it("User as student and scope include student", () => {
    const scope = [ROLE.STUDENT, ROLE.LECTURER];

    const role = ROLE.STUDENT;

    const permission = isScopeAuthorized(scope, role);

    expect(permission).toBeTruthy();
  });
});
