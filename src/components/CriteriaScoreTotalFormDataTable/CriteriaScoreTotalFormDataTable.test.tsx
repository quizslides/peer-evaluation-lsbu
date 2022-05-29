import React from "react";

import { render, screen } from "@testing-library/react";
import { Form, Formik } from "formik";

import { CriteriaScoreTotalFormDataTable } from "@/components";

describe("Testing CriteriaScoreTotalFormDataTable component", () => {
  it("renders a CriteriaScoreTotalFormDataTable with test id", () => {
    const initialFormState = {
      role: "",
    };

    const fieldName = "role";

    const testId = "test-id";

    render(
      <Formik initialValues={initialFormState} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <CriteriaScoreTotalFormDataTable
              testId={testId}
              initialValue={""}
              updatedValue={""}
              updateDataTableFormValue={jest.fn()}
              name={fieldName}
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
