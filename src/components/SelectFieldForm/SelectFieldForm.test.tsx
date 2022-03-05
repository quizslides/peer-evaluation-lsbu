import React from "react";

import { render, screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { SelectFieldForm } from "@/components";
import { Role, roleValidator } from "@/utils";

describe("Testing SelectFieldForm component in a form", () => {
  it("renders a SelectFieldForm with test id", () => {
    const initialFormState = {
      role: "",
    };

    const validationSchema = object({
      ...roleValidator,
    });

    const fieldName = "role";

    const fieldLabel = "Role";

    const testId = "test-id";

    render(
      <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={() => {}}>
        {() => (
          <Form>
            <SelectFieldForm
              testId={testId}
              name={fieldName}
              options={Role}
              props={{
                fullWidth: true,
                label: fieldLabel,
              }}
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
