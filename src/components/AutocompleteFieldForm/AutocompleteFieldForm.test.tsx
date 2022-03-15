import React from "react";

import { render, screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import { object, string } from "yup";

import { AutocompleteFieldForm } from "@/components";

describe("Testing AutocompleteFieldForm component", () => {
  it("renders a AutocompleteFieldForm with test id", () => {
    const initialFormState = {
      text: null,
    };

    const validationSchema = object({
      text: string(),
    });

    const fieldName = "text";

    const fieldLabel = "text";

    const testId = "test-id";

    const testOptions = [{ label: "sample1" }, { label: "sample2" }, { label: "sample3" }];

    render(
      <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <AutocompleteFieldForm
              testId={testId}
              name={fieldName}
              options={testOptions}
              textFieldProps={{
                required: true,
                fullWidth: true,
                label: fieldLabel,
                type: "text",
                variant: "outlined",
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
