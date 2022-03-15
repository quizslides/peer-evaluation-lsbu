import React from "react";

import { mount } from "@cypress/react";
import { Form, Formik } from "formik";
import { cy, it } from "local-cypress";
import { object, string } from "yup";

import { WYSIWYGForm } from "@/components";

describe("Testing WYSIWYGForm component in a form", () => {
  it("renders a WYSIWYGForm with test id", () => {
    const editorValidator = {
      editor: string(),
    };

    const initialFormState = {
      editor: "",
    };

    const validationSchema = object({
      ...editorValidator,
    });

    const fieldName = "editor";

    const testId = "test-id";

    mount(
      <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={cy.stub()}>
        {() => (
          <Form>
            <WYSIWYGForm
              testId={testId}
              helperText={"helperText"}
              fieldName={fieldName}
              resetButtonText={"resetButtonText"}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );

    cy.get(`[data-testid="${testId}"]`).should("be.visible");
  });
});
