import { Cypress, cy } from "local-cypress";

import "cypress-mailhog";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to sign in the user
       *
       * @param {string} email
       *
       * @example cy.signInAs("email@lsbupeerevaluation.software");
       */
      signInAs(email: string): Chainable<string>;
    }
  }
}

Cypress.Commands.add("signInAs", (email: string) => {
  cy.session(
    email,
    () => {
      cy.visit(Cypress.env("url").frontend);

      cy.get("[data-testid=navigation-menu-button]").click();

      cy.get('[data-testid="menu-item-sign-in"]').click();

      cy.get("[data-testid=signin-form-field-email]").type(email);

      cy.get("[data-testid=signin-form-submit-button]").click();

      cy.get('[data-testid="signin-email-link-sent"]', { timeout: 20000 }).should("be.visible");

      cy.visit(Cypress.env("url").mailHog);

      cy.get(".messages > :nth-child(1)").click();

      cy.mhGetAllMails()
        .mhFirst()
        .mhGetBody()
        .then((value) => {
          const data = value.replaceAll(/=\r\n/gm, "").replaceAll("=3D", "=");

          const domParser = new DOMParser();

          const htmlDocument = domParser.parseFromString(data, "text/html");

          const signInRedirectUrl = htmlDocument.getElementById("sign-in-url-fallback")?.innerText;

          if (signInRedirectUrl) {
            cy.visit(signInRedirectUrl);
          }
        });
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});
