import React from "react";

import { render, screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import { array, mixed, object } from "yup";

import { SelectMultipleFieldForm } from "@/components";

describe("Testing SelectMultipleFieldForm component in a form", () => {
  it("renders a SelectMultipleFieldForm with test id", () => {
    const Multiple = {
      A: "A",
      B: "B",
    };

    const multipleSelectValidator = {
      multipleField: array()
        .of(mixed().oneOf([...Object.keys(Multiple)]))
        .min(1, "min")
        .required("required"),
    };

    const initialFormState = {
      multipleField: [],
    };

    const validationSchema = object({
      ...multipleSelectValidator,
    });

    const fieldName = "multipleField";

    const fieldLabel = "multipleField";

    const testId = "test-id";

    render(
      <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <SelectMultipleFieldForm
              testId={testId}
              name={fieldName}
              options={Multiple}
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
