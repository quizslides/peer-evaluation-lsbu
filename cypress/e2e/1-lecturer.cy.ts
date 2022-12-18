import { Cypress, after, before, beforeEach, cy, expect, it } from "local-cypress";

import routing from "@/routing";
import { PeerEvaluationStatus, SchoolsDropdown } from "@/types/peer-evaluation";
import { getFixturesPath } from "cypress/utils/tests";

describe("Edit column description configuration", () => {
  before(() => {
    cy.mhDeleteAll();

    cy.signInAs(Cypress.env("users").lecturer.email);
  });

  beforeEach(() => {
    cy.signInAs(Cypress.env("users").lecturer.email);
  });

  after(() => {
    Cypress.session.clearCurrentSessionData();
  });

  it("Create a peer evaluation with default configuration", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-peer-evaluation-add"]').click();

    cy.url().should("include", routing.lecturer.peerEvaluation.create);

    cy.get('[data-testid="peer-evaluation-form-title-field"]').type(Cypress.env("peerEvaluation").title);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-code-field"]').type(Cypress.env("peerEvaluation").code);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click();

    cy.contains(SchoolsDropdown.SCHOOL_OF_ENGINEERING).click();

    cy.get(".MuiBackdrop-root").click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();
  });

  it("Add one student to the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]').click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-students-button"]', { timeout: 5000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-students-floating-actions"]').trigger("mouseover");

    cy.get('[data-testid="bulk-add-edit-students-icon"]').click();

    const peerEvaluationSingleStudentCSV = getFixturesPath("lecturer-peer-evaluation-single-student.csv");

    cy.get('[data-testid="upload-button-wrapper"]').click();

    cy.get("input[type=file]").selectFile(peerEvaluationSingleStudentCSV, { force: true });

    cy.contains(Cypress.env("users").student.email);

    cy.get('[data-testid="peer-evaluation-student-team-action-dialog-right-button"]').click();

    cy.contains("Bulk process ran successfully", { timeout: 20000 }).should("be.visible");

    cy.contains(Cypress.env("users").student.email);
  });

  it("Set peer evaluation with published status", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]').click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click();

    cy.contains(PeerEvaluationStatus.PUBLISHED).click({ force: true });

    cy.get(".MuiBackdrop-root").click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation updated successfully", { timeout: 20000 }).should("be.visible");
  });

  it("Complete a new peer evaluation as a student", () => {
    cy.signInAs(Cypress.env("users").student.email);

    cy.visit("/");

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]').click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element) => {
      cy.wrap(element).click();

      const randomCriteriaScore = Math.floor(Math.random() * 5) + 1;

      expect(element).to.have.value("");

      cy.wrap(element).get(`[data-value="${randomCriteriaScore}"]`).click();
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-comment"]').each((element) => {
      cy.wrap(element).click().focused().clear();

      cy.wrap(element).type(`Comment - ${Date.now()}`);
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-submit-button"]').click();

    cy.contains("Peer evaluation updated successfully", { timeout: 20000 }).should("be.visible");
  });

  it("Edit the first column description without clearing results or marking as incomplete a peer evaluations", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]').click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="MUIDataTableBodyRow-0"] > .MuiTableCell-paddingCheckbox').click();

    cy.get('[data-testid="peer-evaluation-column-management-update-column"]').click();

    cy.get('[data-testid="column-form-description-field"]').clear().type("New column Description");

    cy.get('[data-testid="column-form-submit-button-button"]').click();

    cy.get('[data-testid="bulk-add-edit-dialog-left-button"]').click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation updated successfully", { timeout: 20000 }).should("be.visible");

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]').should("contain", 1);
  });

  it("Edit the first column description clearing results and marking as incomplete peer evaluations", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]').click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="MUIDataTableBodyRow-0"] > .MuiTableCell-paddingCheckbox').click();

    cy.get('[data-testid="peer-evaluation-column-management-update-column"]').click();

    cy.get('[data-testid="column-form-description-field"]').clear().type("New column Description - Clearing Results");

    cy.get('[data-testid="column-form-submit-button-button"]').click();

    cy.get('[data-testid="bulk-add-edit-dialog-right-button"]').click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation updated successfully", { timeout: 20000 }).should("be.visible");

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]').should("contain", 0);

    cy.signInAs(Cypress.env("users").student.email);

    cy.visit("/");

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]').click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element, index) => {
      const randomCriteriaScore = Math.floor(Math.random() * 5) + 1;

      if (!index) {
        expect(element).to.have.value("");

        cy.wrap(element).click();

        cy.wrap(element).get(`[data-value="${randomCriteriaScore}"]`).click();
      } else {
        cy.wrap(element).should("not.be.empty");
      }
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-submit-button"]').click();

    cy.contains("Peer evaluation updated successfully", { timeout: 20000 }).should("be.visible");

    cy.signInAs(Cypress.env("users").lecturer.email);

    cy.visit("/");

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]').click();

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]').should("contain", 1);
  });

  it("Delete Peer Evaluation", () => {
    cy.signInAs(Cypress.env("users").lecturer.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]").click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]').click();

    cy.get('[data-testid="peer-evaluation-view-delete-icon"]').click();

    cy.get('[data-testid="peer-evaluation-dashboard-title-datatable-on-delete-accept-button"]').click();

    cy.contains("Peer Evaluation deleted successfully", { timeout: 20000 }).should("be.visible");
  });
});
