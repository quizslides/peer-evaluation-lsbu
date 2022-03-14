import React from "react";

import { render, screen } from "@testing-library/react";
import { Form, Formik } from "formik";
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

    render(
      <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={jest.fn()}>
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

    const element = screen.getByTestId(testId);

    expect(element).toBeInTheDocument();
  });
});
