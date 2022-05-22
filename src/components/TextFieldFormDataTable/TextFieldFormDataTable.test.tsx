import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";
import { object, string } from "yup";

import { TextFieldFormDataTable } from "@/components";

describe("Testing TextFieldFormDataTable component in a form", () => {
  it("renders a TextFieldFormDataTable with test id", async () => {
    const initialFormState = {
      email: "",
    };

    const validationSchema = object({
      email: string().email("Invalid email").required("Email required"),
    });

    const fieldName = "email";

    const fieldLabel = "Email";

    const testId = "test-id";

    render(
      <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <TextFieldFormDataTable
              testId={testId}
              name={fieldName}
              props={{
                fullWidth: true,
                label: fieldLabel,
                type: "email",
                variant: "outlined",
              }}
              updateDataTableFormValue={jest.fn()}
              validationSchema={validationSchema}
              validationFieldPath={"email"}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );

    userEvent.type(screen.getByLabelText(/email/i), "test");

    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    const validationErrors = await screen.findByTestId(testId);

    // Note: Adding timeout as the error handler of TextFieldFormDataTable is async
    setTimeout(() => expect(validationErrors).toHaveTextContent("Invalid email"), 5000);
  });
});
