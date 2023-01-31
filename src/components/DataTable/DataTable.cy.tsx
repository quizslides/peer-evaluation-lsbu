/// <reference types="cypress" />

import React from "react";

import { mount } from "@cypress/react";
import { cy, it } from "local-cypress";

import { DataTable } from "@/components";

describe("Testing DataTable component", () => {
  it("renders a DataTable with test id", () => {
    const testId = "datatable-test-id";

    const title = "Datable Test";

    mount(<DataTable isVisible={true} title={title} data={[]} columns={[]} options={undefined} testId={testId} />);

    cy.get(`[data-testid="${testId}"]`).should("be.visible").contains(title);
  });

  it("renders a DataTable not visible with test id", () => {
    const testId = "datatable-test-id";

    const title = "Datable Test";

    mount(<DataTable isVisible={false} title={title} data={[]} columns={[]} options={undefined} testId={testId} />);

    cy.get(`[data-testid="${testId}"]`).should("not.be.visible");
  });
});
