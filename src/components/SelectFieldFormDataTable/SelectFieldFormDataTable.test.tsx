import React from "react";

import { render, screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { SelectFieldFormDataTable } from "@/components";
import { Role, userRoleValidator } from "@/utils";

describe("Testing SelectFieldFormDataTable component in a form", () => {
  it("renders a SelectFieldFormDataTable with test id", async () => {
    const initialFormState = {
      role: "",
    };

    const validationSchema = object({
      ...userRoleValidator,
    });

    const fieldName = "role";

    const fieldLabel = "Role";

    const testId = "test-id";

    render(
      <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <SelectFieldFormDataTable
              testId={testId}
              name={fieldName}
              options={Role}
              props={{
                fullWidth: true,
                label: fieldLabel,
              }}
              updateDataTableFormValue={jest.fn()}
              validationSchema={validationSchema}
              validationFieldPath={""}
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
