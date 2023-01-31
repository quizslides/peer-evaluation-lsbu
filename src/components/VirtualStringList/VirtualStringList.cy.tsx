/// <reference types="cypress" />

import React from "react";

import { mount } from "@cypress/react";
import { cy, it } from "local-cypress";

import { VirtualStringList } from "@/components";

describe("Testing VirtualStringList component", () => {
  it("render an VirtualStringList component 10000 records and query by test id", () => {
    const testId = "test-virtual-string-list-component";

    const data = new Array(1000).fill(true).map((_, index) => index.toString());

    mount(<VirtualStringList testId={testId} data={data} height={500} maxWidth={250} itemSize={25} />);

    cy.get('[data-testid="test-virtual-string-list-component"]').children().scrollTo("bottom");

    cy.get(`[data-testid="virtual-string-list-${data.length - 1}"]`).contains(data.length - 1);
  });
});
