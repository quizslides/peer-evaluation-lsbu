import { Cypress, after, before, beforeEach, cy, describe, expect, it } from "local-cypress";

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

  it("Create a peer evaluation with the default configuration", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-peer-evaluation-add"]', { timeout: 20000 }).click();

    cy.url().should("include", routing.lecturer.peerEvaluation.create);

    cy.get('[data-testid="peer-evaluation-form-title-field"]').type(Cypress.env("peerEvaluation").title);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-code-field"]').type(Cypress.env("peerEvaluation").code);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click();

    cy.contains(SchoolsDropdown.SCHOOL_OF_ENGINEERING).click();

    cy.get(".MuiBackdrop-root").click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation created successfully", { timeout: 20000 }).should("be.visible");
  });

  it("Add one student to the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-students-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-students-floating-actions"]').trigger("mouseover");

    cy.get('[data-testid="bulk-add-edit-students-icon"]').click();

    const peerEvaluationSingleStudentCSV = getFixturesPath("lecturer-peer-evaluation-single-student.csv");

    cy.get('[data-testid="upload-button-wrapper"]').click();

    cy.get("input[type=file]").selectFile(peerEvaluationSingleStudentCSV, { force: true });

    cy.contains(Cypress.env("users").student.email);

    cy.get('[data-testid="peer-evaluation-student-team-action-dialog-right-button"]').click();

    cy.contains("Bulk process ran successfully", { timeout: 30000 }).should("be.visible");

    cy.contains(Cypress.env("users").student.email);
  });

  it("Set peer evaluation with published status", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click();

    cy.contains(PeerEvaluationStatus.PUBLISHED).click({ force: true });

    cy.get(".MuiBackdrop-root").click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Complete a new peer evaluation as a student", () => {
    cy.signInAs(Cypress.env("users").student.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element) => {
      cy.wrap(element).click();

      // TODO: Create a random value between 1 and 5
      const randomCriteriaScore = Math.floor(Math.random() * 5) + 1;

      expect(element).to.have.value("");

      cy.wrap(element).get(`[data-value="${randomCriteriaScore}"]`).click();
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-comment"]').each((element) => {
      cy.wrap(element).click().focused().clear();

      cy.wrap(element).type(`Comment - ${Date.now()}`);
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-submit-button"]').click();

    cy.contains("Peer evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Edit the first column description without clearing results or marking as incomplete a peer evaluations", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="MUIDataTableBodyRow-0"] > .MuiTableCell-paddingCheckbox').click();

    cy.get('[data-testid="peer-evaluation-column-management-update-column"]').click();

    cy.get('[data-testid="column-form-description-field"]').clear().type("New column Description");

    cy.get('[data-testid="column-form-submit-button-button"]').click();

    cy.get('[data-testid="bulk-add-edit-dialog-left-button"]').click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]').should("contain", 1);
  });

  it("Edit the first column description clearing results and marking as incomplete peer evaluations", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

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

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element, index) => {
      // TODO: Update value
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

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]', {
      timeout: 20000,
    }).should("contain", 1);
  });

  it("Delete Peer Evaluation", () => {
    cy.signInAs(Cypress.env("users").lecturer.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-delete-icon"]').click();

    cy.get('[data-testid="peer-evaluation-dashboard-title-datatable-on-delete-accept-button"]').click();

    cy.contains("Peer Evaluation deleted successfully", { timeout: 20000 }).should("be.visible");
  });
});

describe("Updating Students/Teams and showing warning alert", () => {
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

  it("Create a peer evaluation with the default configuration", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-peer-evaluation-add"]', { timeout: 20000 }).click();

    cy.url().should("include", routing.lecturer.peerEvaluation.create);

    cy.get('[data-testid="peer-evaluation-form-title-field"]').type(Cypress.env("peerEvaluation").title);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-code-field"]').type(Cypress.env("peerEvaluation").code);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click();

    cy.contains(SchoolsDropdown.SCHOOL_OF_ENGINEERING).click();

    cy.get(".MuiBackdrop-root").click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation created successfully", { timeout: 20000 }).should("be.visible");
  });

  it("Show alert when updating students", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-students-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-students-floating-actions"]', { timeout: 20000 }).trigger(
      "mouseover"
    );

    cy.get('[data-testid="bulk-add-edit-students-icon"]').click();

    const peerEvaluationSingleStudentCSV = getFixturesPath("lecturer-peer-evaluation-single-student.csv");

    cy.get('[data-testid="upload-button-wrapper"]').click();

    cy.get("input[type=file]").selectFile(peerEvaluationSingleStudentCSV, { force: true });

    cy.contains(Cypress.env("users").student.email);

    cy.get(`[data-testid="peer-evaluation-student-team-action-dialog-component-alert"]`).should("not.exist");

    cy.get('[data-testid="peer-evaluation-student-team-action-dialog-right-button"]').click();

    cy.contains("Bulk process ran successfully", { timeout: 20000 }).should("be.visible");

    cy.contains(Cypress.env("users").student.email);

    cy.get('[data-testid="page-lecturer-peer-evaluation-students-floating-actions"]', { timeout: 20000 }).trigger(
      "mouseover"
    );

    cy.get('[data-testid="bulk-add-edit-students-icon"]').click();

    cy.get('[data-testid="upload-button-wrapper"]').click();

    cy.get("input[type=file]").selectFile(peerEvaluationSingleStudentCSV, { force: true });

    cy.contains(Cypress.env("users").student.email);

    cy.get('[data-testid="peer-evaluation-student-team-action-dialog-right-button"]').click();

    cy.get(`[data-testid="peer-evaluation-student-team-action-dialog-component-alert"]`).should("be.visible");

    cy.contains("Bulk process ran successfully", { timeout: 20000 }).should("be.visible");

    cy.contains(Cypress.env("users").student.email);
  });

  it("Delete Peer Evaluation", () => {
    cy.signInAs(Cypress.env("users").lecturer.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-delete-icon"]').click();

    cy.get('[data-testid="peer-evaluation-dashboard-title-datatable-on-delete-accept-button"]').click();

    cy.contains("Peer Evaluation deleted successfully", { timeout: 20000 }).should("be.visible");
  });
});

describe("Show info alert on new column added to peer evaluation", () => {
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

  it("Create a peer evaluation with the default configuration", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-peer-evaluation-add"]', { timeout: 20000 }).click();

    cy.url().should("include", routing.lecturer.peerEvaluation.create);

    cy.get('[data-testid="peer-evaluation-form-title-field"]').type(Cypress.env("peerEvaluation").title);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-code-field"]').type(Cypress.env("peerEvaluation").code);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click();

    cy.contains(SchoolsDropdown.SCHOOL_OF_ENGINEERING).click();

    cy.get(".MuiBackdrop-root").click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation created successfully", { timeout: 20000 }).should("be.visible");
  });

  it("Add one student to the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-students-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-students-floating-actions"]').trigger("mouseover");

    cy.get('[data-testid="bulk-add-edit-students-icon"]').click();

    const peerEvaluationSingleStudentCSV = getFixturesPath("lecturer-peer-evaluation-single-student.csv");

    cy.get('[data-testid="upload-button-wrapper"]').click();

    cy.get("input[type=file]").selectFile(peerEvaluationSingleStudentCSV, { force: true });

    cy.contains(Cypress.env("users").student.email);

    cy.get('[data-testid="peer-evaluation-student-team-action-dialog-right-button"]').click();

    cy.contains("Bulk process ran successfully", { timeout: 30000 }).should("be.visible");

    cy.contains(Cypress.env("users").student.email);
  });

  it("Set peer evaluation with published status", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click();

    cy.contains(PeerEvaluationStatus.PUBLISHED).click({ force: true });

    cy.get(".MuiBackdrop-root").click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Complete a new peer evaluation as a student", () => {
    cy.signInAs(Cypress.env("users").student.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element) => {
      cy.wrap(element).click();

      // TODO: Fix
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

  it("Add a new column to peer evaluation and set all peer evaluations as incomplete", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]', {
      timeout: 20000,
    }).should("contain", 1);

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-column-management-add-column"]', { timeout: 20000 }).click();

    cy.get(`[data-testid="peer-evaluation-column-form-info-component-alert"]`).should("be.visible");

    cy.get('[data-testid="column-form-description-field"]').clear().type("New column Description");

    cy.get('[data-testid="column-form-submit-button-button"]').click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]').should("contain", 0);
  });

  it("Complete the updated peer evaluation as a student with a new column", () => {
    cy.signInAs(Cypress.env("users").student.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element, index) => {
      // TODO
      const randomCriteriaScore = Math.floor(Math.random() * 5) + 1;

      if (index === 5) {
        expect(element).to.have.value("");

        cy.wrap(element).click();

        cy.wrap(element).get(`[data-value="${randomCriteriaScore}"]`).click();
      } else {
        cy.wrap(element).should("not.be.empty");
      }
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-submit-button"]').click();

    cy.contains("Peer evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Delete Peer Evaluation", () => {
    cy.signInAs(Cypress.env("users").lecturer.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-delete-icon"]').click();

    cy.get('[data-testid="peer-evaluation-dashboard-title-datatable-on-delete-accept-button"]').click();

    cy.contains("Peer Evaluation deleted successfully", { timeout: 20000 }).should("be.visible");
  });
});

describe("Show info alert on deleting column to peer evaluation", () => {
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

  it("Create a peer evaluation with the default configuration", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-peer-evaluation-add"]', { timeout: 20000 }).click();

    cy.url().should("include", routing.lecturer.peerEvaluation.create);

    cy.get('[data-testid="peer-evaluation-form-title-field"]').type(Cypress.env("peerEvaluation").title);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-code-field"]').type(Cypress.env("peerEvaluation").code);

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click();

    cy.contains(SchoolsDropdown.SCHOOL_OF_ENGINEERING).click();

    cy.get(".MuiBackdrop-root").click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation created successfully", { timeout: 20000 }).should("be.visible");
  });

  it("Add one student to the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-students-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-students-floating-actions"]').trigger("mouseover");

    cy.get('[data-testid="bulk-add-edit-students-icon"]').click();

    const peerEvaluationSingleStudentCSV = getFixturesPath("lecturer-peer-evaluation-single-student.csv");

    cy.get('[data-testid="upload-button-wrapper"]').click();

    cy.get("input[type=file]").selectFile(peerEvaluationSingleStudentCSV, { force: true });

    cy.contains(Cypress.env("users").student.email);

    cy.get('[data-testid="peer-evaluation-student-team-action-dialog-right-button"]').click();

    cy.contains("Bulk process ran successfully", { timeout: 30000 }).should("be.visible");

    cy.contains(Cypress.env("users").student.email);
  });

  it("Set peer evaluation with published status", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click();

    cy.contains(PeerEvaluationStatus.PUBLISHED).click({ force: true });

    cy.get(".MuiBackdrop-root").click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Complete a new peer evaluation as a student", () => {
    cy.signInAs(Cypress.env("users").student.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element) => {
      cy.wrap(element).click();

      expect(element).to.have.value("");

      cy.wrap(element).get(`[data-value="5"]`).click();
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-comment"]').each((element) => {
      cy.wrap(element).click().focused().clear();

      cy.wrap(element).type(`Comment - ${Date.now()}`);
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-submit-button"]').click();

    cy.contains("Peer evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Check marks are with a perfect score with the default peer evaluation configuration", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-peer-evaluations-teams-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-results-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-result-team-calculate-marks-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="-button-peer-evaluation-validity-button"]', { timeout: 30000 }).should("contain", 25);
  });

  it("Delete a column of the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]', {
      timeout: 20000,
    }).should("contain", 1);

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="MUIDataTableBodyRow-0"] > .MuiTableCell-paddingCheckbox', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-column-management-delete-column"]').click();

    cy.get('[data-testid="peer-evaluation-column-management-confirmation-delete-column-component-alert"]', {
      timeout: 20000,
    }).should("be.visible");

    cy.get('[data-testid="peer-evaluation-column-management-confirmation-delete-column-accept-button"]').click();

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click();

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]', {
      timeout: 20000,
    }).should("contain", 1);
  });

  it("Check marks are getting re-calculated after the column has been deleted", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-peer-evaluations-teams-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-results-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="-button-peer-evaluation-validity-button"]', { timeout: 30000 }).should("contain", 20);
  });

  it("Delete Peer Evaluation", () => {
    cy.signInAs(Cypress.env("users").lecturer.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-delete-icon"]').click();

    cy.get('[data-testid="peer-evaluation-dashboard-title-datatable-on-delete-accept-button"]').click();

    cy.contains("Peer Evaluation deleted successfully", { timeout: 20000 }).should("be.visible");
  });
});
