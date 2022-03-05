/// <reference types="cypress" />

import { cy, it } from "local-cypress";

describe("HomePage test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("open home page and sign in button is visible", () => {
    cy.get("[data-testid=homepage-routing-sign-in-button").contains("Sign In");
  });
});
