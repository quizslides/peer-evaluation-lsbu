import { Cypress, after, before, beforeEach, cy, describe, expect, it } from "local-cypress";

import content from "@/content";
import routing from "@/routing";
import {
  PeerEvaluationStatus,
  PeerEvaluationStatusDefinition,
  PeerEvaluationTeachingMemberRoles,
  SchoolsDropdown,
} from "@/types/peer-evaluation";
import { getDateLocaleString } from "@/utils/date";
import validatorContent from "@/utils/validator/content";
import { getFixturesPath, getRandomScore } from "cypress/utils/tests";

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

      const randomCriteriaScore = getRandomScore(1, 5);

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

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 20000 }).should("be.visible");

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]').should("contain", 0);

    cy.signInAs(Cypress.env("users").student.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element, index) => {
      const randomCriteriaScore = getRandomScore(1, 5);

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

      const randomCriteriaScore = getRandomScore(1, 5);

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

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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
      const randomCriteriaScore = getRandomScore(1, 5);

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Complete a new peer evaluation as a student with perfect score", () => {
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

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

describe("Update criteria score range and reset peer evaluations submitted", () => {
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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

      const randomCriteriaScore = getRandomScore(1, 5);

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

  it("Update criteria score, show alert and reset peer evaluations submitted", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]', {
      timeout: 20000,
    }).should("contain", 1);

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-criteria-score-range-max-field"]').click();

    cy.get('[data-value="6"]').click();

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-criteria-score-range-max-field"]').click({
      force: true,
    });

    cy.contains(content.containers.peerEvaluationForm.form.criteriaScoreRangeMax.alertOnChange, {
      timeout: 30000,
    }).should("be.visible");

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-criteria-score-range-max-field"]').click({
      force: true,
    });

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-criteria-score-range-max-field"]').click();

    cy.get('[data-value="5"]').click();

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-criteria-score-range-max-field"]').click({
      force: true,
    });

    cy.contains(content.containers.peerEvaluationForm.form.criteriaScoreRangeMax.alertOnReset, {
      timeout: 30000,
    }).should("be.visible");

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-criteria-score-range-max-field"]').click();

    cy.get('[data-value="6"]').click();

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-criteria-score-range-max-field"]').click({
      force: true,
    });

    cy.contains(content.containers.peerEvaluationForm.form.criteriaScoreRangeMax.alertOnChange, {
      timeout: 30000,
    }).should("be.visible");

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");

    cy.get('[data-testid="container-peer-evaluation-dashboard-total-completed-peer-evaluations"]', {
      timeout: 20000,
    }).should("contain", 0);
  });

  it("Complete a peer evaluation as a student after criteria score updated", () => {
    cy.signInAs(Cypress.env("users").student.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element) => {
      cy.wrap(element).click();

      const randomCriteriaScore = getRandomScore(1, 6);

      expect(element).to.have.value("");

      cy.wrap(element).get(`[data-value="${randomCriteriaScore}"]`).click();
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

describe("Show definition for each peer evaluation status in-line", () => {
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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation created successfully", { timeout: 20000 }).should("be.visible");
  });

  it("Check definition for each peer evaluation status", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    const listStatus = [
      [PeerEvaluationStatus.PUBLISHED, PeerEvaluationStatusDefinition.PUBLISHED],

      [PeerEvaluationStatus.DRAFT, PeerEvaluationStatusDefinition.DRAFT],
      [PeerEvaluationStatus.SUBMISSIONS_LOCKED, PeerEvaluationStatusDefinition.SUBMISSIONS_LOCKED],
    ];

    for (const status of listStatus) {
      cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click();

      cy.contains(status[0]).click({ force: true });

      cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click({ force: true });

      cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').should("contain", status[1]);
    }
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

describe("Lecturer as a viewer cannot edit the teams page", () => {
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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

  it("Add a lecturer with a viewer role to the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-member-add-icon"]').click();

    cy.get('[data-testid="peer-evaluation-member-form-email-field-text-field"]')
      .type(Cypress.env("users").lecturerViewer.email)
      .type("{enter}");

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Validate lecturer permission is read-only", () => {
    cy.signInAs(Cypress.env("users").lecturerViewer.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-peer-evaluations-teams-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-teams-team-name"]', { timeout: 20000 })
      .get(":button")
      .should("be.disabled");

    cy.get('[data-testid="page-lecturer-peer-evaluation-teams-team-mark"]', { timeout: 20000 })
      .get(":button")
      .should("be.disabled");

    cy.get('[data-testid="page-lecturer-peer-evaluation-teams-team-comment"]', { timeout: 20000 }).should(
      "not.be.disabled"
    );
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

describe("A lecturer as an editor/viewer cannot delete a peer evaluation", () => {
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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation created successfully", { timeout: 20000 }).should("be.visible");
  });

  it("Add lecturer with viewer role to the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-member-add-icon"]').click();

    cy.get('[data-testid="peer-evaluation-member-form-email-field-text-field"]')
      .type(Cypress.env("users").lecturerViewer.email)
      .type("{enter}");

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Add lecturer with editor role to the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-member-add-icon"]').click();

    cy.get('[data-testid="peer-evaluation-member-form-role-field"]').click();

    cy.get(`[data-value="${PeerEvaluationTeachingMemberRoles["EDITOR"]}"]`).click();

    cy.get('[data-testid="peer-evaluation-member-form-email-field-text-field"]')
      .type(Cypress.env("users").lecturerEditor.email)
      .type("{enter}");

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("A lecturer with a viewer role cannot delete a peer evaluation", () => {
    cy.signInAs(Cypress.env("users").lecturerViewer.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-delete-icon"]').should("not.exist");
  });

  it("A lecturer with an editor role cannot delete a peer evaluation", () => {
    cy.signInAs(Cypress.env("users").lecturerEditor.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-delete-icon"]').should("not.exist");
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

describe("A lecturer as editor doing operations to teaching members of a peer evaluation", () => {
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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation created successfully", { timeout: 20000 }).should("be.visible");
  });

  it("Add a lecturer with owner role to the peer evaluation - peer evaluation can have multiple owners", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-member-add-icon"]').click();

    cy.get('[data-testid="peer-evaluation-member-form-role-field"]').click();

    cy.get(`[data-value="${PeerEvaluationTeachingMemberRoles["OWNER"]}"]`).click();

    cy.get('[data-testid="peer-evaluation-member-form-email-field-text-field"]')
      .type(Cypress.env("users").lecturerOwner.email)
      .type("{enter}");

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Add a lecturer with editor role to the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-member-add-icon"]').click();

    cy.get('[data-testid="peer-evaluation-member-form-role-field"]').click();

    cy.get(`[data-value="${PeerEvaluationTeachingMemberRoles["EDITOR"]}"]`).click();

    cy.get('[data-testid="peer-evaluation-member-form-email-field-text-field"]')
      .type(Cypress.env("users").lecturerEditor.email)
      .type("{enter}");

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Add a lecturer with viewer role to the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-member-add-icon"]').click();

    cy.get('[data-testid="peer-evaluation-member-form-email-field-text-field"]')
      .type(Cypress.env("users").lecturerViewer.email)
      .type("{enter}");

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("A peer evaluation must always have at least one owner", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    for (let index = 0; index < 2; index++) {
      cy.get(
        `[data-testid="peer-evaluation-form-peer-evaluation-member-field-datatable"] > .MuiPaper-elevation4 > .tss-1cdcmys-MUIDataTable-responsiveBase > .MuiTable-root > .MuiTableBody-root > [data-testid="MUIDataTableBodyRow-0"] > .MuiTableCell-paddingCheckbox`
      ).click();

      cy.get('[data-testid="peer-evaluation-member-delete"]').click();

      cy.get('[data-testid="peer-evaluation-member-confirmation-delete-accept-button"]').click();
    }

    cy.contains(validatorContent.peerEvaluationTeachingMembers.minLength).should("exist");
  });

  it("Lecturer editor cannot add a lecturer owner", () => {
    cy.signInAs(Cypress.env("users").lecturerEditor.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get('[data-testid="peer-evaluation-member-add-icon"]').click();

    cy.get('[data-testid="peer-evaluation-member-form-role-field"]').click();

    cy.get(`[data-value="${PeerEvaluationTeachingMemberRoles["OWNER"]}"]`).should("not.exist");
  });

  it("Lecturer editor cannot edit a lecturer owner", () => {
    cy.signInAs(Cypress.env("users").lecturerEditor.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get(
      `[data-testid="peer-evaluation-form-peer-evaluation-member-field-datatable"] > .MuiPaper-elevation4 > .tss-1cdcmys-MUIDataTable-responsiveBase > .MuiTable-root > .MuiTableBody-root > [data-testid="MUIDataTableBodyRow-0"] > .MuiTableCell-paddingCheckbox`
    ).click();

    cy.get('[data-testid="peer-evaluation-member-update"]').click();

    cy.contains("Whoops... You cannot edit an owner of a peer evaluation", { timeout: 20000 }).should("be.visible");
  });

  it("Only an owner can edit another owner user", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get(
      `[data-testid="peer-evaluation-form-peer-evaluation-member-field-datatable"] > .MuiPaper-elevation4 > .tss-1cdcmys-MUIDataTable-responsiveBase > .MuiTable-root > .MuiTableBody-root > [data-testid="MUIDataTableBodyRow-2"] > .MuiTableCell-paddingCheckbox`
    ).click();

    cy.get('[data-testid="peer-evaluation-member-update"]').click();

    cy.get('[data-testid="peer-evaluation-member-form-role-field"]').click();

    cy.get(`[data-value="${PeerEvaluationTeachingMemberRoles["VIEWER"]}"]`).click();

    cy.get('[data-testid="peer-evaluation-member-form-submit-button-button"]').click();
  });

  it("Lecturer editor cannot delete a lecturer owner ", () => {
    cy.signInAs(Cypress.env("users").lecturerEditor.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get(
      `[data-testid="peer-evaluation-form-peer-evaluation-member-field-datatable"] > .MuiPaper-elevation4 > .tss-1cdcmys-MUIDataTable-responsiveBase > .MuiTable-root > .MuiTableBody-root > [data-testid="MUIDataTableBodyRow-0"] > .MuiTableCell-paddingCheckbox`
    ).click();

    cy.get('[data-testid="peer-evaluation-member-delete"]').click();

    cy.contains("Whoops... You cannot delete an owner of a peer evaluation", { timeout: 20000 }).should("be.visible");
  });

  it("Only an owner can delete another owner user", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-view-update"]').click();

    cy.get(
      `[data-testid="peer-evaluation-form-peer-evaluation-member-field-datatable"] > .MuiPaper-elevation4 > .tss-1cdcmys-MUIDataTable-responsiveBase > .MuiTable-root > .MuiTableBody-root > [data-testid="MUIDataTableBodyRow-0"] > .MuiTableCell-paddingCheckbox`
    ).click();

    cy.get('[data-testid="peer-evaluation-member-delete"]').click();

    cy.get('[data-testid="peer-evaluation-member-confirmation-delete-accept-button"]').click();
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

describe("The peer evaluation student table updatedAt value is only updated after a student submits", () => {
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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("A lecturer opens the student peer evaluation before the first submission and the updatedAt value is not set", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-students-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-student-peer-evaluation-result-container-peer-evaluation-info-last-updated"]', {
      timeout: 20000,
    }).should("contain", "N/A");
  });

  it("Student submits a peer evaluation and the updatedAt value is updated after the submission", () => {
    cy.signInAs(Cypress.env("users").student.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-student-peer-container-peer-evaluation-info-last-updated"]').should("contain", "N/A");

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element) => {
      cy.wrap(element).click();

      const randomCriteriaScore = getRandomScore(1, 5);

      expect(element).to.have.value("");

      cy.wrap(element).get(`[data-value="${randomCriteriaScore}"]`).click();
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-comment"]').each((element) => {
      cy.wrap(element).click().focused().clear();

      cy.wrap(element).type(`Comment - ${Date.now()}`);
    });

    cy.get('[data-testid="container-peer-evaluation-student-table-submit-button"]').click();

    cy.contains("Peer evaluation updated successfully", { timeout: 20000 }).should("be.visible");

    cy.get('[data-testid="page-student-peer-container-peer-evaluation-info-last-updated"]', { timeout: 20000 }).should(
      "not.contain",
      "N/A"
    );

    const dateSubstring = getDateLocaleString(new Date()).split(" ")[0];

    cy.get('[data-testid="page-student-peer-container-peer-evaluation-info-last-updated"]', {
      timeout: 20000,
    }).contains(dateSubstring);
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

describe("Handling gracefully when a peer evaluation is not found by its id", () => {
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

  it("Open a peer evaluation that does not exist showing a handled message", () => {
    cy.visit(`${Cypress.env("url").frontend}/${routing.lecturer.peerEvaluation.view}/${Date.now()}`);

    cy.get('[data-testid="page-lecturer-peer-evaluation-not-found-peer-evaluation"]', { timeout: 20000 }).should(
      "be.visible"
    );
  });
});

describe("Download the report of the team's mark", () => {
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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-school-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

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

    cy.get('[data-testid="peer-evaluation-form-peer-evaluation-status-field"]').click({ force: true });

    cy.get('[data-testid="peer-evaluation-form-submit-button"]').click({ force: true });

    cy.contains("Peer Evaluation updated successfully", { timeout: 30000 }).should("be.visible");
  });

  it("Download the mark’s report before a student has completed the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-peer-evaluations-teams-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-results-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-result-team-calculate-marks-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="DownloadCSV-iconButton"]', { timeout: 30000 }).click();

    cy.verifyDownload(".csv", { contains: true });
    cy.verifyDownload("TeamOne", { contains: true });
  });

  it("Complete a new peer evaluation as a student", () => {
    cy.signInAs(Cypress.env("users").student.email);

    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-student]").click();

    cy.get('[data-testid="page-student-peer-evaluations-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="container-peer-evaluation-student-table-criteria-score"]').each((element) => {
      cy.wrap(element).click();

      const randomCriteriaScore = getRandomScore(1, 5);

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

  it("Download the mark’s report after a student has completed the peer evaluation", () => {
    cy.visit(Cypress.env("url").frontend);

    cy.get("[data-testid=navigation-menu-button]", { timeout: 20000 }).click();

    cy.get("[data-testid=menu-item-dashboard-lecturer]").click();

    cy.get('[data-testid="page-peer-evaluations-view-action-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="peer-evaluation-dashboard-total-peer-evaluations-teams-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="page-lecturer-peer-evaluation-results-button"]', { timeout: 20000 }).click();

    cy.get('[data-testid="DownloadCSV-iconButton"]', { timeout: 30000 }).click();

    cy.verifyDownload(".csv", { contains: true });
    cy.verifyDownload("TeamOne", { contains: true });
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
