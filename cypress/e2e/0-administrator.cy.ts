import { Cypress, after, before, beforeEach, cy, describe, it } from "local-cypress";

import { getFixturesPath } from "cypress/utils/tests";

describe("Create users as administrator", () => {
  before(() => {
    cy.mhDeleteAll();

    cy.signInAs(Cypress.env("users").test.email);
  });

  beforeEach(() => {
    cy.signInAs(Cypress.env("users").test.email);
  });

  after(() => {
    Cypress.session.clearCurrentSessionData();
  });

  it("Add users into the system as admin, lecturer and student", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-expandable-item-administrator-access").click();

    cy.get('[data-testid="menu-expandable-admin-users"]').click();

    cy.get('[data-testid="page-admin-users-floating-actions"]', { timeout: 20000 }).trigger("mouseover");

    cy.get('[data-testid="bulk-add-edit-users-icon"]').click();

    const adminUsersCSV = getFixturesPath("admin-users.csv");

    cy.get('[data-testid="upload-button-wrapper"]').click();

    cy.get("input[type=file]").selectFile(adminUsersCSV, { force: true });

    cy.contains(Cypress.env("users").administrator.email);

    cy.contains(Cypress.env("users").lecturer.email);

    cy.contains(Cypress.env("users").lecturerViewer.email);

    cy.contains(Cypress.env("users").lecturerEditor.email);

    cy.contains(Cypress.env("users").student.email);

    cy.get('[data-testid="user-bulk-dialog-right-button"]').click({ force: true });

    cy.contains("Bulk actions finished successfully", { timeout: 20000 }).should("be.visible");

    cy.contains(Cypress.env("users").administrator.email);

    cy.contains(Cypress.env("users").lecturer.email);

    cy.contains(Cypress.env("users").lecturerViewer.email);

    cy.contains(Cypress.env("users").lecturerEditor.email);

    cy.contains(Cypress.env("users").student.email);
  });
});
